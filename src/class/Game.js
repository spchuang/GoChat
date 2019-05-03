// @flow

'use strict';

import Weiqi from 'weiqi';
import GoBoard from '../utils/GoBoard';
import models from './schema';
import GameBase from './base/GameBase';
import {GameStatus} from './ClassEnums';
import Promise from 'bluebird';
import type {SequelizeModel} from './schema';
import GameImageRendererUtils from '../utils/images/GameImageRendererUtils';
import WeiqiSerializer from '../utils/WeiqiSerializer';
import invariant from 'invariant';
import User from './User';
import config from '../config';

const ColorText = {
  BLACK: 'Black',
  WHITE: 'White',
};

const PASS_MOVE = 'PASS_MOVE';

class GoGame extends GameBase {
  _board: GoBoard;
  _blackUser: User;
  _whiteUser: User;
  constructor(gameModel: SequelizeModel): void {
    super(gameModel);
    this._board = GoBoard.createFromGame(this);;
  }

  isOver(): boolean {
    return this.getStatus() !== GameStatus.PLAYING && this.getStatus() !== GameStatus.COUNT_SCORE;
  }

  isCountingScore(): boolean {
    return this.getStatus() === GameStatus.COUNT_SCORE;
  }

  isUserTurn(userID: number): bool {
    return this.isSelfPlayingGame() ||
      (this.getIsBlackTurn() && userID === this.getBlackUserID()) ||
      (!this.getIsBlackTurn() && userID === this.getWhiteUserID());
  }

  isSelfPlayingGame(): boolean {
    return this.getBlackUserID() === this.getWhiteUserID();
  }

  enforceUser(userID: number): void {
    invariant(
      userID === this.getBlackUserID() || userID === this.getWhiteUserID(),
      'Invalid user ID for the game'
    );
  }

  async genOpponentUser(userID: number): Promise<User> {
    return this.getBlackUserID() === userID
      ? await this.genWhiteUser()
      : await this.genBlackUser();
  }

  getOpponentUserID(userID: number): number {
    return this.getBlackUserID() === userID
      ? this.getWhiteUserID()
      : this.getBlackUserID();
  }

  getUserColorText(userID: number): 'Black' | 'White' {
    this.enforceUser(userID);

    return userID === this.getBlackUserID()
      ? ColorText.BLACK
      : ColorText.WHITE;
  }

  getPreviousMoveColorText(): 'Black' | 'White' {
    return this.getIsBlackTurn()
      ? ColorText.WHITE
      : ColorText.BLACK;
  }

  getCurrentMoveColorText(): 'Black' | 'White' {
    return this.getIsBlackTurn()
      ? ColorText.BLACK
      : ColorText.WHITE;
  }

  getScoreText(): ?string {
    if (!this.isOver()) {
      return null;
    }

    const winsBy = this.getWinsBy();

    if (!winsBy) {
      return this.getStatus() === GameStatus.BLACK_WINS ? 'B+R' : 'W+R';
    }

    return this.getStatus() === GameStatus.BLACK_WINS ? `B+${winsBy}` : `W+${winsBy}`;
  }

  getCanUserUndo(userID: number): boolean {
    if (this.isCountingScore()) {
      return false;
    }
    const stones = this.getStonesHistory();
    // for non self playing game, need to have at least 2 stones.
    const hasEnoughStones = this.isSelfPlayingGame()
      ? stones.length > 0
      : stones.length > 1;

    return this.isUserTurn(userID) && hasEnoughStones;
  }

  // NOTE this is different from getLastStonePlayed
  getLastNonPassMovePlayed(): ?Stone {
    const moves = this.getStonesHistory();
    for (let i = moves.length -1; i >= 0; i--) {
      const move = moves[i];
      if (!move) {
        break;
      }
      if (move !== 'PASS_MOVE') {
        return {
          x: move[0],
          y: move[1],
          color: this.getIsBlackTurn() ? 'white' : 'black',
        };
      }
    }
    return null;
  }

  getStones(): Array<Stone> {
    // convert weiqi history to our own format
    var weiqiStones = this._board.getStones();
    return WeiqiSerializer.getStonesFromWeiqiStones(weiqiStones);
  }

  getLastStonePlayed(): ?StoneMove {
    const moves = this.getStonesHistory();
    if (moves.length === 0) {
      return null;
    }
    return moves[moves.length - 1];
  }

  getCaptures(): [number, number] {
    let moves = this.getStonesHistory();
    moves = moves.filter(move => move !== PASS_MOVE);
    const board = this.getWeiqiBoard();

    // capture = total stone - stone left
    let whiteLeft = 0;
    let blackLeft = 0;
    for (const stone of board.stones) {
      if (stone.color === 'o') {
        whiteLeft++;
      } else {
        blackLeft++;
      }
    }
    blackLeft -= this.getHandicap();

    // if we have handicap, white starts first.
    let blackTotal, whiteTotal;
    if (this.getHandicap() > 0) {
      blackTotal = Math.ceil(moves.length / 2);
      whiteTotal = moves.length - blackTotal;
    } else {
      whiteTotal = Math.ceil(moves.length / 2);
      blackTotal = moves.length - whiteTotal;
    }

    return [
      whiteTotal - whiteLeft,
      blackTotal - blackLeft,
    ];
  }

  async genBlackUser(): Promise<User> {
    if (this._blackUser) {
      return this._blackUser;
    }
    this._blackUser = await User.genByUserID(this.getBlackUserID());
    return this._blackUser;
  }

  async genWhiteUser(): Promise<User> {
    if (this._whiteUser) {
      return this._whiteUser;
    }
    this._whiteUser = await User.genByUserID(this.getWhiteUserID());
    return this._whiteUser;
  }

  async genUndo(userID: number): Promise<void> {
    this.enforceUser(userID);
    invariant(this.getCanUserUndo(userID), 'User can undo');

    let stones = this.getStonesHistory();
    if (stones.length === 0) {
      return;
    }

    // undo to the previous turn for the player (1 for self-playing and 2 for multi)
    stones.pop();
    if (!this.isSelfPlayingGame()) {
      stones.pop();
    }

    // replay all the moves
    this._board = GoBoard.createFromStones(stones, this.getWeiqiBoardSize());
    this.setDataFromGoBoard();
    await this.genSave();
  }

  async genWins(gameStatus: GameStatusType, winsBy: number): Promise<void> {
    this.setStatus(gameStatus);
    this.setWinsBy(winsBy);

    let gens = null;
    if (this.isSelfPlayingGame()) {
      var user = await User.genByUserID(this.getBlackUserID());
      gens = [user.genFinishGame(this.getID())];
    } else {
      var [blackUser, whiteUser] = await Promise.all([
        User.genByUserID(this.getBlackUserID()),
        User.genByUserID(this.getWhiteUserID()),
      ]);

      gens = [
        blackUser.genFinishGame(this.getID()),
        whiteUser.genFinishGame(this.getID()),
      ];
    }
    gens.push(this.genSave());
    await Promise.all(gens);
  }

  async genResignGame(userID: number): Promise<void> {
    this.enforceUser(userID);

    let gens = null;
    if (this.isSelfPlayingGame()) {
      var user = await User.genByUserID(this.getBlackUserID());
      gens = [user.genQuitGame(this.getID())];
    } else {
      var [blackUser, whiteUser] = await Promise.all([
        User.genByUserID(this.getBlackUserID()),
        User.genByUserID(this.getWhiteUserID()),
      ]);

      gens = [
        blackUser.genQuitGame(this.getID()),
        whiteUser.genQuitGame(this.getID()),
      ];
    }

    // Winner is the opponent color
    if (userID === this.getBlackUserID()) {
      this.setStatus(GameStatus.WHITE_WINS);
    } else {
      this.setStatus(GameStatus.BLACK_WINS);
    }
    gens.push(this.genSave());
    await Promise.all(gens);
  }

  // Images utilities
  getCurrentBoardString(): string {
    const boardSize = this.getWeiqiBoardSize();
    const lastMove = this.getLastNonPassMovePlayed();

    const boardString = WeiqiSerializer.createBoardString(this.getStones(), boardSize);
    if (lastMove) {
      return `${boardString}-${lastMove.x}-${lastMove.y}-${this.getStatus()}`;
    }
    return `${boardString}-${this.getStatus()}`;
  }

  setDataFromGoBoard(): void {
    this.setStonesHistory(this._board.getStoneMoves());
    this.setIsBlackTurn(this._board.getIsBlackTurn());
    this.setWeiqiConsecutivePasses(this._board.getConsectutivePasses());
    this.setWeiqiBoard(this._board.getWeiqiBoard());

    // we actually only need to prev board state in history to detect ko.
    this.setWeiqiHistory(this._board.getWeiqiBoardHistory());
    if (this._board.getConsectutivePasses() === 2) {
      this.setStatus(GameStatus.COUNT_SCORE);
    }
  }

  // either make a play a stone or pass the round
  async _weiqiAction(userID: number, position: ?StonePosition): Promise<void> {
    this.enforceUser(userID);
    try {
      var color;
      // if it's self-playing game, just keep alternating stone
      if (this.isSelfPlayingGame()) {
        color = this.getIsBlackTurn()
          ? Weiqi.BLACK
          : Weiqi.WHITE;
      } else {
        color = userID === this.getBlackUserID()
          ? Weiqi.BLACK
          : Weiqi.WHITE;
      }

      if (position) {
        this._board.play(color, position);
      } else {
        this._board.pass(color);
      }

      this.setDataFromGoBoard();
      await this.genSave();
    } catch (err) {
      switch(err) {
        case 'Violation of Ko':
          throw new TypedError(EXCEPTION.VIOLATION_OF_KO);
        case 'Intersection occupied by existing stone':
          throw new TypedError(EXCEPTION.PLAY_ON_EXISTING_STONE);
        case 'Intersection out of bounds':
          throw new TypedError(EXCEPTION.PLAY_OUT_OF_BOUND);
        case 'Not player\'s turn':
          throw new TypedError(EXCEPTION.NOT_PLAYER_TURN);
        default:
          throw err;
      }
    }
  }

  async genPass(userID: number): Promise<void> {
    await this._weiqiAction(userID);
  }

  async genPlay(userID: number, position: StonePosition): Promise<void> {
    await this._weiqiAction(userID, position);
  }

  async genBoardImageURL(): Promise<string> {
    // We don't want to generate image for test
    if (config.test) {
      return '/test_image.jpg';
    }
    return await GameImageRendererUtils.genBoardImageURL(this);
  }

  static fromModel(gameModel: SequelizeModel, user?: SequelizeModel): GoGame {
    let game = new GoGame(gameModel);

    if (user) {
      if (game.getWhiteUserID() === user.getID()) {
        game._whiteUser = user;
      }
      if (game.getBlackUserID() === user.getID()) {
        game._blackUser = user;
      }
    }
    return game;
  }

  async genMiniGameImageURL(): Promise<string> {
    if (config.test) {
      return 'test_mini_image.jpg';
    }
    return await GameImageRendererUtils.genMiniBoardImageURL(this);
  }

  async genSGF(): Promise<string> {
    return WeiqiSerializer.genCreateSGFFromGame(this);
  }

  static genFinishedGamesForUser(user: User, moreCondition: ?Object): Promise<Array<GoGame>> {
    return models.Game.findAll({
        where: {
          $or: [{whiteUserID: user.getID()}, {blackUserID: user.getID()}],
          $not: {status: [GameStatus.PLAYING, GameStatus.COUNT_SCORE]},
          ...moreCondition,
        },
        order: [['updatedAt', 'DESC']],
      }).then((models: Array<SequelizeModel>): Array<GoGame> => {
        return models.map((m) => GoGame.fromModel(m, user));
      });
  }

  // return a list of active games for the user, always put the focused game in the front
  static genActiveGamesForUser(user: User, moreCondition: ?Object): Promise<Array<GoGame>> {
    return models.Game.findAll({
        where: {
          $or: [{whiteUserID: user.getID()}, {blackUserID: user.getID()}],
          status: [GameStatus.PLAYING, GameStatus.COUNT_SCORE],
          ...moreCondition,
        },
        order: [['updatedAt', 'DESC']],
      }).then((models: Array<SequelizeModel>): Array<GoGame> => {
        const games = models.map((m) => GoGame.fromModel(m, user));
        // move current game to the front
        const currentGameIndex = games.findIndex(game => game.getID() === user.getCurrentGameID());
        if (currentGameIndex !== -1) {
          const currentGame = games[currentGameIndex];
          games.splice(currentGameIndex, 1);
          games.unshift(currentGame);
        }
        return games;
      });
  }

  static async _genCreateGame(
    blackUserID: number,
    whiteUserID: number,
    boardSize: BoardSize,
    handicap: number,
    komi: number,
  ): Promise<GoGame> {
    const board = GoBoard.createNewBoard(boardSize, handicap);
    return models.Game.create({
      blackUserID: blackUserID,
      whiteUserID: whiteUserID,
      isBlackTurn: board.getIsBlackTurn(),
      weiqiConsecutivePasses: 0,
      weiqiHistory: JSON.stringify(board.getWeiqiBoardHistory()),
      weiqiBoard: JSON.stringify(board.getWeiqiBoard()),
      weiqiBoardSize: boardSize,
      boardImageURL: '../../images/emptyBoard-min.jpg',
      status: GameStatus.PLAYING,
      stonesHistory: JSON.stringify(board.getStoneMoves()),
      handicap: handicap,
      komi: komi,
    }).then((gameModel: SequelizeModel): GoGame => {
      return GoGame.fromModel(gameModel);
    });
  }

  static async genCreateGame(
    blackUser: User,
    whiteUser: User,
    boardSize: BoardSize,
    handicap: number,
    komi: number,
  ): Promise<GoGame> {
    var game = await GoGame._genCreateGame(
      blackUser.getID(),
      whiteUser.getID(),
      boardSize,
      handicap,
      komi,
    );

    // for performance,
    game._blackUser = blackUser;
    game._whiteUser = whiteUser;

    // set the user states
    if (game.isSelfPlayingGame()) {
      await blackUser.genSetPlayGame(game);
    } else {
      await Promise.all([
        blackUser.genSetPlayGame(game),
        whiteUser.genSetPlayGame(game),
      ]);
    }
    return game;
  }
}

export default GoGame;

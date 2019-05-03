// @flow

'use strict';

import GameScoringBase from './base/GameScoringBase';
import {GameScoringRequestStatus, GameStatus} from './ClassEnums';
import models from './schema';
import GoGame from './Game';
import User from './User';
import Promise from 'bluebird';
import type {SequelizeModel} from './schema';

class GameScoring extends GameScoringBase {
  _game: GoGame;
  constructor(model: SequelizeModel): void {
    super(model);

    if (this._model.Game) {
      this._game = GoGame.fromModel(this._model.Game);
    }
  }

  getGame(): GoGame {
    return this._game;
  }

  toJson(): Object {
    return {
      id: this.getID(),
      blackTerritory: this.getBlackTerritory(),
      blackCapture: this.getBlackCapture(),
      whiteTerritory: this.getWhiteTerritory(),
      whiteCapture: this.getWhiteCapture(),
      board: this.getBoard(),
      status: this.getStatus(),
      creatorID: this.getCreatorID(),
    };
  }

  getWhiteAndBlackScores(): [number, number] {
    const whiteAll = this.getWhiteTerritory() + this.getWhiteCapture() + this._game.getKomi();
    const blackAll = this.getBlackTerritory() + this.getBlackCapture();
    return [whiteAll, blackAll];
  }

  async genAccept(): Promise<void> {
    this.setStatus(GameScoringRequestStatus.ACCEPTED);
    const [whiteScore, blackScore] = this.getWhiteAndBlackScores();
    const gameStatus = whiteScore > blackScore ? GameStatus.WHITE_WINS : GameStatus.BLACK_WINS;
    const winsBy = Math.abs(whiteScore - blackScore);

    await Promise.all([
      this._game.genWins(gameStatus, winsBy),
      this.genSave(),
    ]);
  }

  async genCreator(): Promise<User> {
    return await User.genByUserID(this.getCreatorID());
  }

  static fromModel(model: SequelizeModel): GameScoring {
    return new GameScoring(model);
  }

  static genByIDAndGameID(id: number, gameID: number): Promise<GameScoring> {
    return GameScoring.genBy({id, gameID});
  }

  static async genBy(condition: Object): Promise<GameScoring> {
    return await this._genBy({
      where: condition,
      include: [{
        model: models.Game,
      }],
    });
  }

  static async genAllByGameID(gameID: number): Promise<Array<GameScoring>> {
    return await this._genAllBy({
      where: {
        gameID: gameID,
      },
      include: [{
        model: models.Game,
      }],
    });
  }

  static async genCreate(
    userID: number,
    gameID: number,
    blackTerritory: number,
    blackCapture: number,
    whiteTerritory: number,
    whiteCapture: number,
    board: Object,
  ): Promise<GameScoring> {

    return models.GameScoring.create({
      creatorID: userID,
      gameID,
      blackTerritory,
      blackCapture,
      whiteTerritory,
      whiteCapture,
      board: JSON.stringify(board),
      status: GameScoringRequestStatus.PENDING,
    }).then((model: SequelizeModel): GameScoring => {
      return GameScoring.fromModel(model);
    });
  }
}

export default GameScoring;

// @flow
// this should be my own definition of the go board.

'use strict'

import Weiqi from 'weiqi';
import GoGame from '../class/Game';
import WeiqiSerializer from './WeiqiSerializer'

const ColorText = {
  BLACK: 'Black',
  WHITE: 'White',
};

const PASS_MOVE = 'PASS_MOVE';

class GoBoard {
  _weiqi: Object;
  _previousBoard: Object;
  _handicap: number;
  _moves: Array<StoneMove>;

  static createNewBoard(size: BoardSize, handicap: number): GoBoard {
    // TODO: need to use serializer help
    const board = new GoBoard();
    board._handicap = handicap ? handicap : 0;
    const weiqiBoard = {
      stones: WeiqiSerializer.getWeiqiBoardStonesWithHandicap(size, handicap),
    };

    board._weiqi = WeiqiSerializer.createWeiqiGame(
      size,
      {history: [weiqiBoard]},
      weiqiBoard,
      0, // weiqiConsectutivePasses
      handicap === 0, // isBlackTurn
    );
    board._previousBoard = board.getStones();
    board._moves = [];
    return board;
  }

  static createFromStones(stones: Array<StoneMove>, size: BoardSize): GoBoard {
    const board = GoBoard.createNewBoard(size, 0);

    let color = Weiqi.BLACK;
    stones.forEach((stone: StoneMove, index: number) => {
      // for second to last move, get the board state
      if (index === stones.length - 2) {
        board._previousBoard = board.getStones();
      }

      if (stone === PASS_MOVE) {
        board.pass(color);
      } else {
        board.play(color, stone);
      }

      color = color === Weiqi.BLACK ? Weiqi.WHITE : Weiqi.BLACK
    });
    return board;
  }

  static createFromGame(game: GoGame): GoBoard {
    const board = new GoBoard();
    board._weiqi = WeiqiSerializer.createWeiqiGame(
      game.getWeiqiBoardSize(),
      game.getWeiqiHistory(),
      game.getWeiqiBoard(),
      game.getWeiqiConsecutivePasses(),
      game.getIsBlackTurn(),
    );
    board._moves = game.getStonesHistory();
    // a bit hacky
    board._previousBoard = game.getWeiqiHistory().history.length === 0
      ? {'stones':[]}
      : game.getWeiqiHistory().history[0].stones;

    return board;
  }

  getStoneMoves(): Array<StoneMove> {
    return this._moves;
  }

  getPreviousBoard(): Object {
    return this._previousBoard;
  }

  pass(color: string): void {
    this._previousBoard = this.getStones();
    this._weiqi = this._weiqi.pass(color);
    this._moves.push(PASS_MOVE);
  }

  play(color: string, position: StoneMove): void {
    this._previousBoard = this.getStones();
    this._weiqi = this._weiqi.play(color, position);
    this._moves.push(position);
  }

  getIsBlackTurn(): boolean {
    return this.getCurrentColor() === Weiqi.BLACK;
  }

  getCurrentColor(): string {
    return this._weiqi.currentColor;
  }

  getConsectutivePasses(): number {
    return this._weiqi.consectutivePasses;
  }

  getStones(): Object {
    return this._weiqi.getBoard().stones;
  }

  getWeiqiBoardHistory(): Object {
    return WeiqiSerializer.createBoardHistoryObject(this.getPreviousBoard());
  }

  getWeiqiBoard(): Object {
    return WeiqiSerializer.createBoardObject(this.getStones());
  }
}

module.exports = GoBoard;

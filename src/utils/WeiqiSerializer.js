// @flow

'use strict';

const Immutable = require('immutable');
import Weiqi from 'weiqi';
import Promise from 'bluebird';
import GoGame from '../class/Game';
import ParseUtil from './ParseUtil';

const STONE_COLOR = {
  EMPTY: '0',
  BLACK: '1',
  WHITE: '2',
};

class Point extends Immutable.Record({i: 0, j: 0}) {
  constructor(i, j) {
    super({i: i, j: j});
  }
}

function _createWeiqiBoard(historyEntryJson: Object): Object {
  var stonesEntry = [];
  for(var stone of historyEntryJson['stones']) {
    var stoneLocation = new Point(stone.location[0], stone.location[1]);
    stonesEntry.push([stoneLocation, stone.color]);
  }
  return Immutable.Map(stonesEntry);
}

function _createWeiqiHistory(historyJson: Object): Object {
  return Immutable.Set(historyJson['history'].map(_createWeiqiBoard));
}

function _replaceAt(index: number, character: string, input: string): string {
  return input.substr(0, index) + character + input.substr(index + 1, input.length);
}

const WeiqiSerializer = {
  createWeiqiStonesFromHistoryJson: _createWeiqiBoard,
  STONE_COLOR,

  createWeiqiGame(
    weiqiBoardSize: BoardSize,
    weiqiHistory: Object,
    weiqiBoard: Object,
    weiqiConsectutivePasses: number,
    isBlackTurn: boolean,
  ): Object {
    var color = isBlackTurn ? Weiqi.BLACK : Weiqi.WHITE;
    var history = _createWeiqiHistory(weiqiHistory);
    var stones = _createWeiqiBoard(weiqiBoard);
    var board = Weiqi.createBoard(weiqiBoardSize, stones);
    var values = {
      currentColor: color,
      consectutivePasses: weiqiConsectutivePasses,
      history: history,
      board: board,
    };
    return Weiqi.createGame(weiqiBoardSize, values);
  },

  // weiqiBoardStones is a state of the board, specifically, it is the stones
  // object in the board object of weiqi object. The output is serializable format to be
  // saved in db.
  // input: Map { {"i":2,"j":2}: "x", {"i":6,"j":7}: "o" }
  // output: {"stones":[{"location":[2,2],"color":"x"},{"location":[6,7],"color":"o"}]}
  createBoardObject(weiqiBoardStones: Object): Object {
    // keys of the map
    var stoneLocation = weiqiBoardStones.keySeq().toArray();
    // values of the map
    var stoneColors = weiqiBoardStones.toArray();

    var jsonifiedHistoryEntry = [];
    for(var i = 0, len = stoneLocation.length; i < len; i++) {
      jsonifiedHistoryEntry.push({
        'location': [stoneLocation[i].i, stoneLocation[i].j],
        'color': stoneColors[i],
      });
    }
    return {
      'stones': jsonifiedHistoryEntry,
    };
  },

  createBoardHistoryObject(weiqiBoardStones: Object): Object {
    return {
      'history': [this.createBoardObject(weiqiBoardStones)],
    };
  },

  getStoneFromBoardPosition(pos: string, index: number, boardSize: BoardSize): Stone {
    return {
      x: index % boardSize,
      y: Math.floor(index / boardSize),
      color: pos === STONE_COLOR.BLACK ? 'black' : 'white',
    };
  },

  getStonesFromWeiqiStones(weiqiStones: Object): Array<Stone> {
    let stones = [];
    weiqiStones.forEach((val, key) => {
      stones.push({
        color: val === 'x' ? 'black' : 'white',
        x: key.i,
        y: key.j,
      });
    });
    return stones;
  },

  // from https://github.com/yishn/Sabaki/blob/master/src/modules/board.js
  // handicap in range of [0, 9]
  getWeiqiBoardStonesWithHandicap(size: BoardSize, handicap?: number): Array<WeiqiStone> {
    let nearX = size >= 13 ? 3 : 2
    let nearY = size >= 13 ? 3 : 2
    let farX = size - nearX - 1
    let farY = size - nearY - 1

    let result = [[nearX, farY], [farX, nearY], [nearX, nearY], [farX, farY]]
    let middleX = (size - 1) / 2
    let middleY = (size - 1) / 2

    if (size % 2 !== 0 && size % 2 !== 0) {
        if (handicap === 5) result.push([middleX, middleY])
        result.push([nearX, middleY], [farX, middleY])

        if (handicap === 7) result.push([middleX, middleY])
        result.push([middleX, nearY], [middleX, farY], [middleX, middleY])
    } else if (size % 2 !== 0) {
        result.push([middleX, nearY], [middleX, farY])
    } else if (this.height % 2 !== 0) {
        result.push([nearX, middleY], [farX, middleY])
    }

    return result.slice(0, handicap).map((stone: StonePosition) => {
      return {
        location: stone,
        color: 'x',
      };
    });
  },

  /*
   * Create string representation of board. Used for board image url. 0 - empty, 1 - 'x', 2 - 'o'
   * example output: 011111.....
   */
  createBoardString(stones: Array<Stone>, boardSize: BoardSize): string {
    // N x N string size. Start from bottom up, if bottom left corner is black then 200000....
    var boardString = STONE_COLOR.EMPTY.repeat(Math.pow(boardSize, 2));
    stones.forEach((stone: Stone) => {
      var stoneColor = stone.color === 'black' ? STONE_COLOR.BLACK : STONE_COLOR.WHITE;
      var stoneIndexInString = (stone.y * boardSize) + stone.x;
      boardString = _replaceAt(stoneIndexInString, stoneColor, boardString);
    })
    return boardString;
  },

  async genCreateSGFFromGame(game: GoGame): Promise<string> {
    const size = game.getWeiqiBoardSize();
    const stones = game.getStonesHistory();
    const handicap = game.getHandicap();
    const [blackUser, whiteUser] = await Promise.all([
      game.genBlackUser(),
      game.genWhiteUser(),
    ]);
    let sgf = '(;';
    sgf += `SZ[${size}]KM[${game.getKomi()}]`;

    if (handicap > 0) {
      sgf += `HA[${handicap}]AB`;
      const handicapStones = this.getWeiqiBoardStonesWithHandicap(size, handicap);
      handicapStones.forEach((stone) => {
        sgf += `[${ParseUtil.convertStoneMoveToSGFMove(stone.location, size)}]`;
      });
    }

    sgf += `PB[${blackUser.getFirstName()}]PW[${whiteUser.getFirstName()}]`;
    const scoreText = game.getScoreText();
    if (scoreText) {
      sgf += `RE[${scoreText}]`;
    }

    // for sgf B[xy], x is left to right, y is top to down
    const sgfMoves = [];
    stones.forEach((stone, i) => {
      if (stone === 'PASS_MOVE') {
        return;
      }
      const prefix = i % 2 === 0 ? 'B' : 'W';
      // type cast stone type
      const position = ParseUtil.convertStoneMoveToSGFMove(stone, size);
      sgfMoves.push(`${prefix}[${position}]`);
    });
    if (sgfMoves.length > 0) {
      sgf += ';' + sgfMoves.join(';');
    }
    sgf += ')';
    return sgf;
  },

  emptyHistory: JSON.stringify({'history':[{'stones':[]}]}),
  emptyBoard: JSON.stringify({'stones':[]}),
  emptyStonesHistoryString: JSON.stringify([]),
};

module.exports = WeiqiSerializer;

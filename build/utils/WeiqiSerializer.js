

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _weiqi = require('weiqi');

var _weiqi2 = _interopRequireDefault(_weiqi);

var _Game = require('../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _ParseUtil = require('./ParseUtil');

var _ParseUtil2 = _interopRequireDefault(_ParseUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Immutable = require('immutable');


var STONE_COLOR = {
  EMPTY: '0',
  BLACK: '1',
  WHITE: '2'
};

var Point = function (_Immutable$Record) {
  _inherits(Point, _Immutable$Record);

  function Point(i, j) {
    _classCallCheck(this, Point);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Point).call(this, { i: i, j: j }));
  }

  return Point;
}(Immutable.Record({ i: 0, j: 0 }));

function _createWeiqiBoard(historyEntryJson) {
  var stonesEntry = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = historyEntryJson['stones'][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var stone = _step.value;

      var stoneLocation = new Point(stone.location[0], stone.location[1]);
      stonesEntry.push([stoneLocation, stone.color]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Immutable.Map(stonesEntry);
}

function _createWeiqiHistory(historyJson) {
  return Immutable.Set(historyJson['history'].map(_createWeiqiBoard));
}

function _replaceAt(index, character, input) {
  return input.substr(0, index) + character + input.substr(index + 1, input.length);
}

var WeiqiSerializer = {
  createWeiqiStonesFromHistoryJson: _createWeiqiBoard,
  STONE_COLOR: STONE_COLOR,

  createWeiqiGame: function createWeiqiGame(weiqiBoardSize, weiqiHistory, weiqiBoard, weiqiConsectutivePasses, isBlackTurn) {
    var color = isBlackTurn ? _weiqi2.default.BLACK : _weiqi2.default.WHITE;
    var history = _createWeiqiHistory(weiqiHistory);
    var stones = _createWeiqiBoard(weiqiBoard);
    var board = _weiqi2.default.createBoard(weiqiBoardSize, stones);
    var values = {
      currentColor: color,
      consectutivePasses: weiqiConsectutivePasses,
      history: history,
      board: board
    };
    return _weiqi2.default.createGame(weiqiBoardSize, values);
  },


  // weiqiBoardStones is a state of the board, specifically, it is the stones
  // object in the board object of weiqi object. The output is serializable format to be
  // saved in db.
  // input: Map { {"i":2,"j":2}: "x", {"i":6,"j":7}: "o" }
  // output: {"stones":[{"location":[2,2],"color":"x"},{"location":[6,7],"color":"o"}]}
  createBoardObject: function createBoardObject(weiqiBoardStones) {
    // keys of the map
    var stoneLocation = weiqiBoardStones.keySeq().toArray();
    // values of the map
    var stoneColors = weiqiBoardStones.toArray();

    var jsonifiedHistoryEntry = [];
    for (var i = 0, len = stoneLocation.length; i < len; i++) {
      jsonifiedHistoryEntry.push({
        'location': [stoneLocation[i].i, stoneLocation[i].j],
        'color': stoneColors[i]
      });
    }
    return {
      'stones': jsonifiedHistoryEntry
    };
  },
  createBoardHistoryObject: function createBoardHistoryObject(weiqiBoardStones) {
    return {
      'history': [this.createBoardObject(weiqiBoardStones)]
    };
  },
  getStoneFromBoardPosition: function getStoneFromBoardPosition(pos, index, boardSize) {
    return {
      x: index % boardSize,
      y: Math.floor(index / boardSize),
      color: pos === STONE_COLOR.BLACK ? 'black' : 'white'
    };
  },
  getStonesFromWeiqiStones: function getStonesFromWeiqiStones(weiqiStones) {
    var stones = [];
    weiqiStones.forEach(function (val, key) {
      stones.push({
        color: val === 'x' ? 'black' : 'white',
        x: key.i,
        y: key.j
      });
    });
    return stones;
  },


  // from https://github.com/yishn/Sabaki/blob/master/src/modules/board.js
  // handicap in range of [0, 9]
  getWeiqiBoardStonesWithHandicap: function getWeiqiBoardStonesWithHandicap(size, handicap) {
    var nearX = size >= 13 ? 3 : 2;
    var nearY = size >= 13 ? 3 : 2;
    var farX = size - nearX - 1;
    var farY = size - nearY - 1;

    var result = [[nearX, farY], [farX, nearY], [nearX, nearY], [farX, farY]];
    var middleX = (size - 1) / 2;
    var middleY = (size - 1) / 2;

    if (size % 2 !== 0 && size % 2 !== 0) {
      if (handicap === 5) result.push([middleX, middleY]);
      result.push([nearX, middleY], [farX, middleY]);

      if (handicap === 7) result.push([middleX, middleY]);
      result.push([middleX, nearY], [middleX, farY], [middleX, middleY]);
    } else if (size % 2 !== 0) {
      result.push([middleX, nearY], [middleX, farY]);
    } else if (this.height % 2 !== 0) {
      result.push([nearX, middleY], [farX, middleY]);
    }

    return result.slice(0, handicap).map(function (stone) {
      return {
        location: stone,
        color: 'x'
      };
    });
  },


  /*
   * Create string representation of board. Used for board image url. 0 - empty, 1 - 'x', 2 - 'o'
   * example output: 011111.....
   */
  createBoardString: function createBoardString(stones, boardSize) {
    // N x N string size. Start from bottom up, if bottom left corner is black then 200000....
    var boardString = STONE_COLOR.EMPTY.repeat(Math.pow(boardSize, 2));
    stones.forEach(function (stone) {
      var stoneColor = stone.color === 'black' ? STONE_COLOR.BLACK : STONE_COLOR.WHITE;
      var stoneIndexInString = stone.y * boardSize + stone.x;
      boardString = _replaceAt(stoneIndexInString, stoneColor, boardString);
    });
    return boardString;
  },
  genCreateSGFFromGame: function genCreateSGFFromGame(game) {
    var _this2 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
      var size, stones, handicap, _ref, _ref2, blackUser, whiteUser, sgf, handicapStones, scoreText, sgfMoves;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              size = game.getWeiqiBoardSize();
              stones = game.getStonesHistory();
              handicap = game.getHandicap();
              _context.next = 5;
              return _bluebird2.default.all([game.genBlackUser(), game.genWhiteUser()]);

            case 5:
              _ref = _context.sent;
              _ref2 = _slicedToArray(_ref, 2);
              blackUser = _ref2[0];
              whiteUser = _ref2[1];
              sgf = '(;';

              sgf += 'SZ[' + size + ']KM[' + game.getKomi() + ']';

              if (handicap > 0) {
                sgf += 'HA[' + handicap + ']AB';
                handicapStones = _this2.getWeiqiBoardStonesWithHandicap(size, handicap);

                handicapStones.forEach(function (stone) {
                  sgf += '[' + _ParseUtil2.default.convertStoneMoveToSGFMove(stone.location, size) + ']';
                });
              }

              sgf += 'PB[' + blackUser.getFirstName() + ']PW[' + whiteUser.getFirstName() + ']';
              scoreText = game.getScoreText();

              if (scoreText) {
                sgf += 'RE[' + scoreText + ']';
              }

              // for sgf B[xy], x is left to right, y is top to down
              sgfMoves = [];

              stones.forEach(function (stone, i) {
                if (stone === 'PASS_MOVE') {
                  return;
                }
                var prefix = i % 2 === 0 ? 'B' : 'W';
                // type cast stone type
                var position = _ParseUtil2.default.convertStoneMoveToSGFMove(stone, size);
                sgfMoves.push(prefix + '[' + position + ']');
              });
              if (sgfMoves.length > 0) {
                sgf += ';' + sgfMoves.join(';');
              }
              sgf += ')';
              return _context.abrupt('return', sgf);

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }))();
  },


  emptyHistory: JSON.stringify({ 'history': [{ 'stones': [] }] }),
  emptyBoard: JSON.stringify({ 'stones': [] }),
  emptyStonesHistoryString: JSON.stringify([])
};

module.exports = WeiqiSerializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9XZWlxaVNlcmlhbGl6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7QUFHQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUpBLElBQU0sWUFBWSxRQUFRLFdBQVIsQ0FBbEI7OztBQU1BLElBQU0sY0FBYztBQUNsQixTQUFPLEdBRFc7QUFFbEIsU0FBTyxHQUZXO0FBR2xCLFNBQU87QUFIVyxDQUFwQjs7SUFNTSxLOzs7QUFDSixpQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQjtBQUFBOztBQUFBLG9GQUNWLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBRFU7QUFFakI7OztFQUhpQixVQUFVLE1BQVYsQ0FBaUIsRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFBakIsQzs7QUFNcEIsU0FBUyxpQkFBVCxDQUEyQixnQkFBM0IsRUFBNkQ7QUFDM0QsTUFBSSxjQUFjLEVBQWxCO0FBRDJEO0FBQUE7QUFBQTs7QUFBQTtBQUUzRCx5QkFBaUIsaUJBQWlCLFFBQWpCLENBQWpCLDhIQUE2QztBQUFBLFVBQXJDLEtBQXFDOztBQUMzQyxVQUFJLGdCQUFnQixJQUFJLEtBQUosQ0FBVSxNQUFNLFFBQU4sQ0FBZSxDQUFmLENBQVYsRUFBNkIsTUFBTSxRQUFOLENBQWUsQ0FBZixDQUE3QixDQUFwQjtBQUNBLGtCQUFZLElBQVosQ0FBaUIsQ0FBQyxhQUFELEVBQWdCLE1BQU0sS0FBdEIsQ0FBakI7QUFDRDtBQUwwRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU0zRCxTQUFPLFVBQVUsR0FBVixDQUFjLFdBQWQsQ0FBUDtBQUNEOztBQUVELFNBQVMsbUJBQVQsQ0FBNkIsV0FBN0IsRUFBMEQ7QUFDeEQsU0FBTyxVQUFVLEdBQVYsQ0FBYyxZQUFZLFNBQVosRUFBdUIsR0FBdkIsQ0FBMkIsaUJBQTNCLENB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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5Q3pELEdBaktxQjs7O0FBbUt0QixnQkFBYyxLQUFLLFNBQUwsQ0FBZSxFQUFDLFdBQVUsQ0FBQyxFQUFDLFVBQVMsRUFBVixFQUFELENBQVgsRUFBZixDQW5LUTtBQW9LdEIsY0FBWSxLQUFLLFNBQUwsQ0FBZSxFQUFDLFVBQVMsRUFBVixFQUFmLENBcEtVO0FBcUt0Qiw0QkFBMEIsS0FBSyxTQUFMLENBQWUsRUFBZjtBQXJLSixDQUF4Qjs7QUF3S0EsT0FBTyxPQUFQLEdBQWlCLGVBQWpCIiwiZmlsZSI6IldlaXFpU2VyaWFsaXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgSW1tdXRhYmxlID0gcmVxdWlyZSgnaW1tdXRhYmxlJyk7XG5pbXBvcnQgV2VpcWkgZnJvbSAnd2VpcWknO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEdvR2FtZSBmcm9tICcuLi9jbGFzcy9HYW1lJztcbmltcG9ydCBQYXJzZVV0aWwgZnJvbSAnLi9QYXJzZVV0aWwnO1xuXG5jb25zdCBTVE9ORV9DT0xPUiA9IHtcbiAgRU1QVFk6ICcwJyxcbiAgQkxBQ0s6ICcxJyxcbiAgV0hJVEU6ICcyJyxcbn07XG5cbmNsYXNzIFBvaW50IGV4dGVuZHMgSW1tdXRhYmxlLlJlY29yZCh7aTogMCwgajogMH0pIHtcbiAgY29uc3RydWN0b3IoaSwgaikge1xuICAgIHN1cGVyKHtpOiBpLCBqOiBqfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVdlaXFpQm9hcmQoaGlzdG9yeUVudHJ5SnNvbjogT2JqZWN0KTogT2JqZWN0IHtcbiAgdmFyIHN0b25lc0VudHJ5ID0gW107XG4gIGZvcih2YXIgc3RvbmUgb2YgaGlzdG9yeUVudHJ5SnNvblsnc3RvbmVzJ10pIHtcbiAgICB2YXIgc3RvbmVMb2NhdGlvbiA9IG5ldyBQb2ludChzdG9uZS5sb2NhdGlvblswXSwgc3RvbmUubG9jYXRpb25bMV0pO1xuICAgIHN0b25lc0VudHJ5LnB1c2goW3N0b25lTG9jYXRpb24sIHN0b25lLmNvbG9yXSk7XG4gIH1cbiAgcmV0dXJuIEltbXV0YWJsZS5NYXAoc3RvbmVzRW50cnkpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlV2VpcWlIaXN0b3J5KGhpc3RvcnlKc29uOiBPYmplY3QpOiBPYmplY3Qge1xuICByZXR1cm4gSW1tdXRhYmxlLlNldChoaXN0b3J5SnNvblsnaGlzdG9yeSddLm1hcChfY3JlYXRlV2VpcWlCb2FyZCkpO1xufVxuXG5mdW5jdGlvbiBfcmVwbGFjZUF0KGluZGV4OiBudW1iZXIsIGNoYXJhY3Rlcjogc3RyaW5nLCBpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlucHV0LnN1YnN0cigwLCBpbmRleCkgKyBjaGFyYWN0ZXIgKyBpbnB1dC5zdWJzdHIoaW5kZXggKyAxLCBpbnB1dC5sZW5ndGgpO1xufVxuXG5jb25zdCBXZWlxaVNlcmlhbGl6ZXIgPSB7XG4gIGNyZWF0ZVdlaXFpU3RvbmVzRnJvbUhpc3RvcnlKc29uOiBfY3JlYXRlV2VpcWlCb2FyZCxcbiAgU1RPTkVfQ09MT1IsXG5cbiAgY3JlYXRlV2VpcWlHYW1lKFxuICAgIHdlaXFpQm9hcmRTaXplOiBCb2FyZFNpemUsXG4gICAgd2VpcWlIaXN0b3J5OiBPYmplY3QsXG4gICAgd2VpcWlCb2FyZDogT2JqZWN0LFxuICAgIHdlaXFpQ29uc2VjdHV0aXZlUGFzc2VzOiBudW1iZXIsXG4gICAgaXNCbGFja1R1cm46IGJvb2xlYW4sXG4gICk6IE9iamVjdCB7XG4gICAgdmFyIGNvbG9yID0gaXNCbGFja1R1cm4gPyBXZWlxaS5CTEFDSyA6IFdlaXFpLldISVRFO1xuICAgIHZhciBoaXN0b3J5ID0gX2NyZWF0ZVdlaXFpSGlzdG9yeSh3ZWlxaUhpc3RvcnkpO1xuICAgIHZhciBzdG9uZXMgPSBfY3JlYXRlV2VpcWlCb2FyZCh3ZWlxaUJvYXJkKTtcbiAgICB2YXIgYm9hcmQgPSBXZWlxaS5jcmVhdGVCb2FyZCh3ZWlxaUJvYXJkU2l6ZSwgc3RvbmVzKTtcbiAgICB2YXIgdmFsdWVzID0ge1xuICAgICAgY3VycmVudENvbG9yOiBjb2xvcixcbiAgICAgIGNvbnNlY3R1dGl2ZVBhc3Nlczogd2VpcWlDb25zZWN0dXRpdmVQYXNzZXMsXG4gICAgICBoaXN0b3J5OiBoaXN0b3J5LFxuICAgICAgYm9hcmQ6IGJvYXJkLFxuICAgIH07XG4gICAgcmV0dXJuIFdlaXFpLmNyZWF0ZUdhbWUod2VpcWlCb2FyZFNpemUsIHZhbHVlcyk7XG4gIH0sXG5cbiAgLy8gd2VpcWlCb2FyZFN0b25lcyBpcyBhIHN0YXRlIG9mIHRoZSBib2FyZCwgc3BlY2lmaWNhbGx5LCBpdCBpcyB0aGUgc3RvbmVzXG4gIC8vIG9iamVjdCBpbiB0aGUgYm9hcmQgb2JqZWN0IG9mIHdlaXFpIG9iamVjdC4gVGhlIG91dHB1dCBpcyBzZXJpYWxpemFibGUgZm9ybWF0IHRvIGJlXG4gIC8vIHNhdmVkIGluIGRiLlxuICAvLyBpbnB1dDogTWFwIHsge1wiaVwiOjIsXCJqXCI6Mn06IFwieFwiLCB7XCJpXCI6NixcImpcIjo3fTogXCJvXCIgfVxuICAvLyBvdXRwdXQ6IHtcInN0b25lc1wiOlt7XCJsb2NhdGlvblwiOlsyLDJdLFwiY29sb3JcIjpcInhcIn0se1wibG9jYXRpb25cIjpbNiw3XSxcImNvbG9yXCI6XCJvXCJ9XX1cbiAgY3JlYXRlQm9hcmRPYmplY3Qod2VpcWlCb2FyZFN0b25lczogT2JqZWN0KTogT2JqZWN0IHtcbiAgICAvLyBrZXlzIG9mIHRoZSBtYXBcbiAgICB2YXIgc3RvbmVMb2NhdGlvbiA9IHdlaXFpQm9hcmRTdG9uZXMua2V5U2VxKCkudG9BcnJheSgpO1xuICAgIC8vIHZhbHVlcyBvZiB0aGUgbWFwXG4gICAgdmFyIHN0b25lQ29sb3JzID0gd2VpcWlCb2FyZFN0b25lcy50b0FycmF5KCk7XG5cbiAgICB2YXIganNvbmlmaWVkSGlzdG9yeUVudHJ5ID0gW107XG4gICAgZm9yKHZhciBpID0gMCwgbGVuID0gc3RvbmVMb2NhdGlvbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAganNvbmlmaWVkSGlzdG9yeUVudHJ5LnB1c2goe1xuICAgICAgICAnbG9jYXRpb24nOiBbc3RvbmVMb2NhdGlvbltpXS5pLCBzdG9uZUxvY2F0aW9uW2ldLmpdLFxuICAgICAgICAnY29sb3InOiBzdG9uZUNvbG9yc1tpXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgJ3N0b25lcyc6IGpzb25pZmllZEhpc3RvcnlFbnRyeSxcbiAgICB9O1xuICB9LFxuXG4gIGNyZWF0ZUJvYXJkSGlzdG9yeU9iamVjdCh3ZWlxaUJvYXJkU3RvbmVzOiBPYmplY3QpOiBPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICAnaGlzdG9yeSc6IFt0aGlzLmNyZWF0ZUJvYXJkT2JqZWN0KHdlaXFpQm9hcmRTdG9uZXMpXSxcbiAgICB9O1xuICB9LFxuXG4gIGdldFN0b25lRnJvbUJvYXJkUG9zaXRpb24ocG9zOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGJvYXJkU2l6ZTogQm9hcmRTaXplKTogU3RvbmUge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBpbmRleCAlIGJvYXJkU2l6ZSxcbiAgICAgIHk6IE1hdGguZmxvb3IoaW5kZXggLyBib2FyZFNpemUpLFxuICAgICAgY29sb3I6IHBvcyA9PT0gU1RPTkVfQ09MT1IuQkxBQ0sgPyAnYmxhY2snIDogJ3doaXRlJyxcbiAgICB9O1xuICB9LFxuXG4gIGdldFN0b25lc0Zyb21XZWlxaVN0b25lcyh3ZWlxaVN0b25lczogT2JqZWN0KTogQXJyYXk8U3RvbmU+IHtcbiAgICBsZXQgc3RvbmVzID0gW107XG4gICAgd2VpcWlTdG9uZXMuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgIHN0b25lcy5wdXNoKHtcbiAgICAgICAgY29sb3I6IHZhbCA9PT0gJ3gnID8gJ2JsYWNrJyA6ICd3aGl0ZScsXG4gICAgICAgIHg6IGtleS5pLFxuICAgICAgICB5OiBrZXkuaixcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBzdG9uZXM7XG4gIH0sXG5cbiAgLy8gZnJvbSBodHRwczovL2dpdGh1Yi5jb20veWlzaG4vU2FiYWtpL2Jsb2IvbWFzdGVyL3NyYy9tb2R1bGVzL2JvYXJkLmpzXG4gIC8vIGhhbmRpY2FwIGluIHJhbmdlIG9mIFswLCA5XVxuICBnZXRXZWlxaUJvYXJkU3RvbmVzV2l0aEhhbmRpY2FwKHNpemU6IEJvYXJkU2l6ZSwgaGFuZGljYXA/OiBudW1iZXIpOiBBcnJheTxXZWlxaVN0b25lPiB7XG4gICAgbGV0IG5lYXJYID0gc2l6ZSA+PSAxMyA/IDMgOiAyXG4gICAgbGV0IG5lYXJZID0gc2l6ZSA+PSAxMyA/IDMgOiAyXG4gICAgbGV0IGZhclggPSBzaXplIC0gbmVhclggLSAxXG4gICAgbGV0IGZhclkgPSBzaXplIC0gbmVhclkgLSAxXG5cbiAgICBsZXQgcmVzdWx0ID0gW1tuZWFyWCwgZmFyWV0sIFtmYXJYLCBuZWFyWV0sIFtuZWFyWCwgbmVhclldLCBbZmFyWCwgZmFyWV1dXG4gICAgbGV0IG1pZGRsZVggPSAoc2l6ZSAtIDEpIC8gMlxuICAgIGxldCBtaWRkbGVZID0gKHNpemUgLSAxKSAvIDJcblxuICAgIGlmIChzaXplICUgMiAhPT0gMCAmJiBzaXplICUgMiAhPT0gMCkge1xuICAgICAgICBpZiAoaGFuZGljYXAgPT09IDUpIHJlc3VsdC5wdXNoKFttaWRkbGVYLCBtaWRkbGVZXSlcbiAgICAgICAgcmVzdWx0LnB1c2goW25lYXJYLCBtaWRkbGVZXSwgW2ZhclgsIG1pZGRsZVldKVxuXG4gICAgICAgIGlmIChoYW5kaWNhcCA9PT0gNykgcmVzdWx0LnB1c2goW21pZGRsZVgsIG1pZGRsZVldKVxuICAgICAgICByZXN1bHQucHVzaChbbWlkZGxlWCwgbmVhclldLCBbbWlkZGxlWCwgZmFyWV0sIFttaWRkbGVYLCBtaWRkbGVZXSlcbiAgICB9IGVsc2UgaWYgKHNpemUgJSAyICE9PSAwKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFttaWRkbGVYLCBuZWFyWV0sIFttaWRkbGVYLCBmYXJZXSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVpZ2h0ICUgMiAhPT0gMCkge1xuICAgICAgICByZXN1bHQucHVzaChbbmVhclgsIG1pZGRsZVldLCBbZmFyWCwgbWlkZGxlWV0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdC5zbGljZSgwLCBoYW5kaWNhcCkubWFwKChzdG9uZTogU3RvbmVQb3NpdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbG9jYXRpb246IHN0b25lLFxuICAgICAgICBjb2xvcjogJ3gnLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfSxcblxuICAvKlxuICAgKiBDcmVhdGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGJvYXJkLiBVc2VkIGZvciBib2FyZCBpbWFnZSB1cmwuIDAgLSBlbXB0eSwgMSAtICd4JywgMiAtICdvJ1xuICAgKiBleGFtcGxlIG91dHB1dDogMDExMTExLi4uLi5cbiAgICovXG4gIGNyZWF0ZUJvYXJkU3RyaW5nKHN0b25lczogQXJyYXk8U3RvbmU+LCBib2FyZFNpemU6IEJvYXJkU2l6ZSk6IHN0cmluZyB7XG4gICAgLy8gTiB4IE4gc3RyaW5nIHNpemUuIFN0YXJ0IGZyb20gYm90dG9tIHVwLCBpZiBib3R0b20gbGVmdCBjb3JuZXIgaXMgYmxhY2sgdGhlbiAyMDAwMDAuLi4uXG4gICAgdmFyIGJvYXJkU3RyaW5nID0gU1RPTkVfQ09MT1IuRU1QVFkucmVwZWF0KE1hdGgucG93KGJvYXJkU2l6ZSwgMikpO1xuICAgIHN0b25lcy5mb3JFYWNoKChzdG9uZTogU3RvbmUpID0+IHtcbiAgICAgIHZhciBzdG9uZUNvbG9yID0gc3RvbmUuY29sb3IgPT09ICdibGFjaycgPyBTVE9ORV9DT0xPUi5CTEFDSyA6IFNUT05FX0NPTE9SLldISVRFO1xuICAgICAgdmFyIHN0b25lSW5kZXhJblN0cmluZyA9IChzdG9uZS55ICogYm9hcmRTaXplKSArIHN0b25lLng7XG4gICAgICBib2FyZFN0cmluZyA9IF9yZXBsYWNlQXQoc3RvbmVJbmRleEluU3RyaW5nLCBzdG9uZUNvbG9yLCBib2FyZFN0cmluZyk7XG4gICAgfSlcbiAgICByZXR1cm4gYm9hcmRTdHJpbmc7XG4gIH0sXG5cbiAgYXN5bmMgZ2VuQ3JlYXRlU0dGRnJvbUdhbWUoZ2FtZTogR29HYW1lKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzaXplID0gZ2FtZS5nZXRXZWlxaUJvYXJkU2l6ZSgpO1xuICAgIGNvbnN0IHN0b25lcyA9IGdhbWUuZ2V0U3RvbmVzSGlzdG9yeSgpO1xuICAgIGNvbnN0IGhhbmRpY2FwID0gZ2FtZS5nZXRIYW5kaWNhcCgpO1xuICAgIGNvbnN0IFtibGFja1VzZXIsIHdoaXRlVXNlcl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnYW1lLmdlbkJsYWNrVXNlcigpLFxuICAgICAgZ2FtZS5nZW5XaGl0ZVVzZXIoKSxcbiAgICBdKTtcbiAgICBsZXQgc2dmID0gJyg7JztcbiAgICBzZ2YgKz0gYFNaWyR7c2l6ZX1dS01bJHtnYW1lLmdldEtvbWkoKX1dYDtcblxuICAgIGlmIChoYW5kaWNhcCA+IDApIHtcbiAgICAgIHNnZiArPSBgSEFbJHtoYW5kaWNhcH1dQUJgO1xuICAgICAgY29uc3QgaGFuZGljYXBTdG9uZXMgPSB0aGlzLmdldFdlaXFpQm9hcmRTdG9uZXNXaXRoSGFuZGljYXAoc2l6ZSwgaGFuZGljYXApO1xuICAgICAgaGFuZGljYXBTdG9uZXMuZm9yRWFjaCgoc3RvbmUpID0+IHtcbiAgICAgICAgc2dmICs9IGBbJHtQYXJzZVV0aWwuY29udmVydFN0b25lTW92ZVRvU0dGTW92ZShzdG9uZS5sb2NhdGlvbiwgc2l6ZSl9XWA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzZ2YgKz0gYFBCWyR7YmxhY2tVc2VyLmdldEZpcnN0TmFtZSgpfV1QV1ske3doaXRlVXNlci5nZXRGaXJzdE5hbWUoKX1dYDtcbiAgICBjb25zdCBzY29yZVRleHQgPSBnYW1lLmdldFNjb3JlVGV4dCgpO1xuICAgIGlmIChzY29yZVRleHQpIHtcbiAgICAgIHNnZiArPSBgUkVbJHtzY29yZVRleHR9XWA7XG4gICAgfVxuXG4gICAgLy8gZm9yIHNnZiBCW3h5XSwgeCBpcyBsZWZ0IHRvIHJpZ2h0LCB5IGlzIHRvcCB0byBkb3duXG4gICAgY29uc3Qgc2dmTW92ZXMgPSBbXTtcbiAgICBzdG9uZXMuZm9yRWFjaCgoc3RvbmUsIGkpID0+IHtcbiAgICAgIGlmIChzdG9uZSA9PT0gJ1BBU1NfTU9WRScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJlZml4ID0gaSAlIDIgPT09IDAgPyAnQicgOiAnVyc7XG4gICAgICAvLyB0eXBlIGNhc3Qgc3RvbmUgdHlwZVxuICAgICAgY29uc3QgcG9zaXRpb24gPSBQYXJzZVV0aWwuY29udmVydFN0b25lTW92ZVRvU0dGTW92ZShzdG9uZSwgc2l6ZSk7XG4gICAgICBzZ2ZNb3Zlcy5wdXNoKGAke3ByZWZpeH1bJHtwb3NpdGlvbn1dYCk7XG4gICAgfSk7XG4gICAgaWYgKHNnZk1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNnZiArPSAnOycgKyBzZ2ZNb3Zlcy5qb2luKCc7Jyk7XG4gICAgfVxuICAgIHNnZiArPSAnKSc7XG4gICAgcmV0dXJuIHNnZjtcbiAgfSxcblxuICBlbXB0eUhpc3Rvcnk6IEpTT04uc3RyaW5naWZ5KHsnaGlzdG9yeSc6W3snc3RvbmVzJzpbXX1dfSksXG4gIGVtcHR5Qm9hcmQ6IEpTT04uc3RyaW5naWZ5KHsnc3RvbmVzJzpbXX0pLFxuICBlbXB0eVN0b25lc0hpc3RvcnlTdHJpbmc6IEpTT04uc3RyaW5naWZ5KFtdKSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV2VpcWlTZXJpYWxpemVyO1xuIl19
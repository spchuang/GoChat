

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameScoringBase2 = require('./base/GameScoringBase');

var _GameScoringBase3 = _interopRequireDefault(_GameScoringBase2);

var _ClassEnums = require('./ClassEnums');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameScoring = function (_GameScoringBase) {
  _inherits(GameScoring, _GameScoringBase);

  function GameScoring(model) {
    _classCallCheck(this, GameScoring);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameScoring).call(this, model));

    if (_this._model.Game) {
      _this._game = _Game2.default.fromModel(_this._model.Game);
    }
    return _this;
  }

  _createClass(GameScoring, [{
    key: 'getGame',
    value: function getGame() {
      return this._game;
    }
  }, {
    key: 'toJson',
    value: function toJson() {
      return {
        id: this.getID(),
        blackTerritory: this.getBlackTerritory(),
        blackCapture: this.getBlackCapture(),
        whiteTerritory: this.getWhiteTerritory(),
        whiteCapture: this.getWhiteCapture(),
        board: this.getBoard(),
        status: this.getStatus(),
        creatorID: this.getCreatorID()
      };
    }
  }, {
    key: 'getWhiteAndBlackScores',
    value: function getWhiteAndBlackScores() {
      var whiteAll = this.getWhiteTerritory() + this.getWhiteCapture() + this._game.getKomi();
      var blackAll = this.getBlackTerritory() + this.getBlackCapture();
      return [whiteAll, blackAll];
    }
  }, {
    key: 'genAccept',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
        var _getWhiteAndBlackScor, _getWhiteAndBlackScor2, whiteScore, blackScore, gameStatus, winsBy;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setStatus(_ClassEnums.GameScoringRequestStatus.ACCEPTED);
                _getWhiteAndBlackScor = this.getWhiteAndBlackScores();
                _getWhiteAndBlackScor2 = _slicedToArray(_getWhiteAndBlackScor, 2);
                whiteScore = _getWhiteAndBlackScor2[0];
                blackScore = _getWhiteAndBlackScor2[1];
                gameStatus = whiteScore > blackScore ? _ClassEnums.GameStatus.WHITE_WINS : _ClassEnums.GameStatus.BLACK_WINS;
                winsBy = Math.abs(whiteScore - blackScore);
                _context.next = 9;
                return _bluebird2.default.all([this._game.genWins(gameStatus, winsBy), this.genSave()]);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genAccept() {
        return ref.apply(this, arguments);
      }

      return genAccept;
    }()
  }, {
    key: 'genCreator',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _User2.default.genByUserID(this.getCreatorID());

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genCreator() {
        return ref.apply(this, arguments);
      }

      return genCreator;
    }()
  }], [{
    key: 'fromModel',
    value: function fromModel(model) {
      return new GameScoring(model);
    }
  }, {
    key: 'genByIDAndGameID',
    value: function genByIDAndGameID(id, gameID) {
      return GameScoring.genBy({ id: id, gameID: gameID });
    }
  }, {
    key: 'genBy',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(condition) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._genBy({
                  where: condition,
                  include: [{
                    model: _schema2.default.Game
                  }]
                });

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genBy(_x) {
        return ref.apply(this, arguments);
      }

      return genBy;
    }()
  }, {
    key: 'genAllByGameID',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(gameID) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._genAllBy({
                  where: {
                    gameID: gameID
                  },
                  include: [{
                    model: _schema2.default.Game
                  }]
                });

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function genAllByGameID(_x2) {
        return ref.apply(this, arguments);
      }

      return genAllByGameID;
    }()
  }, {
    key: 'genCreate',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(userID, gameID, blackTerritory, blackCapture, whiteTerritory, whiteCapture, board) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', _schema2.default.GameScoring.create({
                  creatorID: userID,
                  gameID: gameID,
                  blackTerritory: blackTerritory,
                  blackCapture: blackCapture,
                  whiteTerritory: whiteTerritory,
                  whiteCapture: whiteCapture,
                  board: JSON.stringify(board),
                  status: _ClassEnums.GameScoringRequestStatus.PENDING
                }).then(function (model) {
                  return GameScoring.fromModel(model);
                }));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function genCreate(_x3, _x4, _x5, _x6, _x7, _x8, _x9) {
        return ref.apply(this, arguments);
      }

      return genCreate;
    }()
  }]);

  return GameScoring;
}(_GameScoringBase3.default);

exports.default = GameScoring;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzcy9HYW1lU2NvcmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFJTSxXOzs7QUFFSix1QkFBWSxLQUFaLEVBQXlDO0FBQUE7O0FBQUEsK0ZBQ2pDLEtBRGlDOztBQUd2QyxRQUFJLE1BQUssTUFBTCxDQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFlBQUssS0FBTCxHQUFhLGVBQU8sU0FBUCxDQUFpQixNQUFLLE1BQUwsQ0FBWSxJQUE3QixDQUFiO0FBQ0Q7QUFMc0M7QUFNeEM7Ozs7OEJBRWlCO0FBQ2hCLGFBQU8sS0FBSyxLQUFaO0FBQ0Q7Ozs2QkFFZ0I7QUFDZixhQUFPO0FBQ0wsWUFBSSxLQUFLLEtBQUwsRUFEQztBQUVMLHdCQUFnQixLQUFLLGlCQUFMLEVBRlg7QUFHTCxzQkFBYyxLQUFLLGVBQUwsRUFIVDtBQUlMLHdCQUFnQixLQUFLLGlCQUFMLEVBSlg7QUFLTCxzQkFBYyxLQUFLLGVBQUwsRUFMVDtBQU1MLGVBQU8sS0FBSyxRQUFMLEVBTkY7QUFPTCxnQkFBUSxLQUFLLFNBQUwsRUFQSDtBQVFMLG1CQUFXLEtBQUssWUFBTDtBQVJOLE9BQVA7QUFVRDs7OzZDQUUwQztBQUN6QyxVQUFNLFdBQVcsS0FBSyxpQkFBTCxLQUEyQixLQUFLLGVBQUwsRUFBM0IsR0FBb0QsS0FBSyxLQUFMLENBQVcsT0FBWCxFQUFyRTtBQUNBLFVBQU0sV0FBVyxLQUFLLGlCQUFMLEtBQTJCLEtBQUssZUFBTCxFQUE1QztBQUNBLGFBQU8sQ0FBQyxRQUFELEVBQVcsUUFBWCxDQUFQO0FBQ0Q7Ozs7OzJEQUlRLFUsRUFBWSxVLEVBQ2IsVSxFQUNBLE07Ozs7OztBQUhOLHFCQUFLLFNBQUwsQ0FBZSxxQ0FBeUIsUUFBeEM7d0NBQ2lDLEtBQUssc0JBQUwsRTs7QUFBMUIsMEI7QUFBWSwwQjtBQUNiLDBCLEdBQWEsYUFBYSxVQUFiLEdBQTBCLHVCQUFXLFVBQXJDLEdBQWtELHVCQUFXLFU7QUFDMUUsc0IsR0FBUyxLQUFLLEdBQUwsQ0FBUyxhQUFhLFVBQXRCLEM7O3VCQUVULG1CQUFRLEdBQVIsQ0FBWSxDQUNoQixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLFVBQW5CLEVBQStCLE1BQS9CLENBRGdCLEVBRWhCLEtBQUssT0FBTCxFQUZnQixDQUFaLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBT08sZUFBSyxXQUFMLENBQWlCLEtBQUssWUFBTCxFQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBR0UsSyxFQUFvQztBQUNuRCxhQUFPLElBQUksV0FBSixDQUFnQixLQUFoQixDQUFQO0FBQ0Q7OztxQ0FFdUIsRSxFQUFZLE0sRUFBc0M7QUFDeEUsYUFBTyxZQUFZLEtBQVosQ0FBa0IsRUFBQyxNQUFELEVBQUssY0FBTCxFQUFsQixDQUFQO0FBQ0Q7Ozs7bUZBRWtCLFM7Ozs7Ozt1QkFDSixLQUFLLE1BQUwsQ0FBWTtBQUN2Qix5QkFBTyxTQURnQjtBQUV2QiwyQkFBUyxDQUFDO0FBQ1IsMkJBQU8saUJBQU87QUFETixtQkFBRDtBQUZjLGlCQUFaLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUZBUWEsTTs7Ozs7O3VCQUNiLEtBQUssU0FBTCxDQUFlO0FBQzFCLHlCQUFPO0FBQ0wsNEJBQVE7QUFESCxtQkFEbUI7QUFJMUIsMkJBQVMsQ0FBQztBQUNSLDJCQUFPLGlCQUFPO0FBRE4sbUJBQUQ7QUFKaUIsaUJBQWYsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFXYixNLEVBQ0EsTSxFQUNBLGMsRUFDQSxZLEVBQ0EsYyxFQUNBLFksRUFDQSxLOzs7OztrREFHTyxpQkFBTyxXQUFQLENBQW1CLE1BQW5CLENBQTBCO0FBQy9CLDZCQUFXLE1BRG9CO0FBRS9CLGdDQUYrQjtBQUcvQixnREFIK0I7QUFJL0IsNENBSitCO0FBSy9CLGdEQUwrQjtBQU0vQiw0Q0FOK0I7QUFPL0IseUJBQU8sS0FBSyxTQUFMLENBQWUsS0FBZixDQVB3QjtBQVEvQiwwQkFBUSxxQ0FBeUI7QUFSRixpQkFBMUIsRUFTSixJQVRJLENBU0MsVUFBQyxLQUFELEVBQXdDO0FBQzlDLHlCQUFPLFlBQVksU0FBWixDQUFzQixLQUF0QixDQUFQO0FBQ0QsaUJBWE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWVJLFciLCJmaWxlIjoiR2FtZVNjb3JpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBHYW1lU2NvcmluZ0Jhc2UgZnJvbSAnLi9iYXNlL0dhbWVTY29yaW5nQmFzZSc7XG5pbXBvcnQge0dhbWVTY29yaW5nUmVxdWVzdFN0YXR1cywgR2FtZVN0YXR1c30gZnJvbSAnLi9DbGFzc0VudW1zJztcbmltcG9ydCBtb2RlbHMgZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IEdvR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB0eXBlIHtTZXF1ZWxpemVNb2RlbH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5jbGFzcyBHYW1lU2NvcmluZyBleHRlbmRzIEdhbWVTY29yaW5nQmFzZSB7XG4gIF9nYW1lOiBHb0dhbWU7XG4gIGNvbnN0cnVjdG9yKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IHZvaWQge1xuICAgIHN1cGVyKG1vZGVsKTtcblxuICAgIGlmICh0aGlzLl9tb2RlbC5HYW1lKSB7XG4gICAgICB0aGlzLl9nYW1lID0gR29HYW1lLmZyb21Nb2RlbCh0aGlzLl9tb2RlbC5HYW1lKTtcbiAgICB9XG4gIH1cblxuICBnZXRHYW1lKCk6IEdvR2FtZSB7XG4gICAgcmV0dXJuIHRoaXMuX2dhbWU7XG4gIH1cblxuICB0b0pzb24oKTogT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuZ2V0SUQoKSxcbiAgICAgIGJsYWNrVGVycml0b3J5OiB0aGlzLmdldEJsYWNrVGVycml0b3J5KCksXG4gICAgICBibGFja0NhcHR1cmU6IHRoaXMuZ2V0QmxhY2tDYXB0dXJlKCksXG4gICAgICB3aGl0ZVRlcnJpdG9yeTogdGhpcy5nZXRXaGl0ZVRlcnJpdG9yeSgpLFxuICAgICAgd2hpdGVDYXB0dXJlOiB0aGlzLmdldFdoaXRlQ2FwdHVyZSgpLFxuICAgICAgYm9hcmQ6IHRoaXMuZ2V0Qm9hcmQoKSxcbiAgICAgIHN0YXR1czogdGhpcy5nZXRTdGF0dXMoKSxcbiAgICAgIGNyZWF0b3JJRDogdGhpcy5nZXRDcmVhdG9ySUQoKSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0V2hpdGVBbmRCbGFja1Njb3JlcygpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBjb25zdCB3aGl0ZUFsbCA9IHRoaXMuZ2V0V2hpdGVUZXJyaXRvcnkoKSArIHRoaXMuZ2V0V2hpdGVDYXB0dXJlKCkgKyB0aGlzLl9nYW1lLmdldEtvbWkoKTtcbiAgICBjb25zdCBibGFja0FsbCA9IHRoaXMuZ2V0QmxhY2tUZXJyaXRvcnkoKSArIHRoaXMuZ2V0QmxhY2tDYXB0dXJlKCk7XG4gICAgcmV0dXJuIFt3aGl0ZUFsbCwgYmxhY2tBbGxdO1xuICB9XG5cbiAgYXN5bmMgZ2VuQWNjZXB0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuc2V0U3RhdHVzKEdhbWVTY29yaW5nUmVxdWVzdFN0YXR1cy5BQ0NFUFRFRCk7XG4gICAgY29uc3QgW3doaXRlU2NvcmUsIGJsYWNrU2NvcmVdID0gdGhpcy5nZXRXaGl0ZUFuZEJsYWNrU2NvcmVzKCk7XG4gICAgY29uc3QgZ2FtZVN0YXR1cyA9IHdoaXRlU2NvcmUgPiBibGFja1Njb3JlID8gR2FtZVN0YXR1cy5XSElURV9XSU5TIDogR2FtZVN0YXR1cy5CTEFDS19XSU5TO1xuICAgIGNvbnN0IHdpbnNCeSA9IE1hdGguYWJzKHdoaXRlU2NvcmUgLSBibGFja1Njb3JlKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuX2dhbWUuZ2VuV2lucyhnYW1lU3RhdHVzLCB3aW5zQnkpLFxuICAgICAgdGhpcy5nZW5TYXZlKCksXG4gICAgXSk7XG4gIH1cblxuICBhc3luYyBnZW5DcmVhdG9yKCk6IFByb21pc2U8VXNlcj4ge1xuICAgIHJldHVybiBhd2FpdCBVc2VyLmdlbkJ5VXNlcklEKHRoaXMuZ2V0Q3JlYXRvcklEKCkpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Nb2RlbChtb2RlbDogU2VxdWVsaXplTW9kZWwpOiBHYW1lU2NvcmluZyB7XG4gICAgcmV0dXJuIG5ldyBHYW1lU2NvcmluZyhtb2RlbCk7XG4gIH1cblxuICBzdGF0aWMgZ2VuQnlJREFuZEdhbWVJRChpZDogbnVtYmVyLCBnYW1lSUQ6IG51bWJlcik6IFByb21pc2U8R2FtZVNjb3Jpbmc+IHtcbiAgICByZXR1cm4gR2FtZVNjb3JpbmcuZ2VuQnkoe2lkLCBnYW1lSUR9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5CeShjb25kaXRpb246IE9iamVjdCk6IFByb21pc2U8R2FtZVNjb3Jpbmc+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2VuQnkoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICAgIGluY2x1ZGU6IFt7XG4gICAgICAgIG1vZGVsOiBtb2RlbHMuR2FtZSxcbiAgICAgIH1dLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbkFsbEJ5R2FtZUlEKGdhbWVJRDogbnVtYmVyKTogUHJvbWlzZTxBcnJheTxHYW1lU2NvcmluZz4+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2VuQWxsQnkoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgZ2FtZUlEOiBnYW1lSUQsXG4gICAgICB9LFxuICAgICAgaW5jbHVkZTogW3tcbiAgICAgICAgbW9kZWw6IG1vZGVscy5HYW1lLFxuICAgICAgfV0sXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuQ3JlYXRlKFxuICAgIHVzZXJJRDogbnVtYmVyLFxuICAgIGdhbWVJRDogbnVtYmVyLFxuICAgIGJsYWNrVGVycml0b3J5OiBudW1iZXIsXG4gICAgYmxhY2tDYXB0dXJlOiBudW1iZXIsXG4gICAgd2hpdGVUZXJyaXRvcnk6IG51bWJlcixcbiAgICB3aGl0ZUNhcHR1cmU6IG51bWJlcixcbiAgICBib2FyZDogT2JqZWN0LFxuICApOiBQcm9taXNlPEdhbWVTY29yaW5nPiB7XG5cbiAgICByZXR1cm4gbW9kZWxzLkdhbWVTY29yaW5nLmNyZWF0ZSh7XG4gICAgICBjcmVhdG9ySUQ6IHVzZXJJRCxcbiAgICAgIGdhbWVJRCxcbiAgICAgIGJsYWNrVGVycml0b3J5LFxuICAgICAgYmxhY2tDYXB0dXJlLFxuICAgICAgd2hpdGVUZXJyaXRvcnksXG4gICAgICB3aGl0ZUNhcHR1cmUsXG4gICAgICBib2FyZDogSlNPTi5zdHJpbmdpZnkoYm9hcmQpLFxuICAgICAgc3RhdHVzOiBHYW1lU2NvcmluZ1JlcXVlc3RTdGF0dXMuUEVORElORyxcbiAgICB9KS50aGVuKChtb2RlbDogU2VxdWVsaXplTW9kZWwpOiBHYW1lU2NvcmluZyA9PiB7XG4gICAgICByZXR1cm4gR2FtZVNjb3JpbmcuZnJvbU1vZGVsKG1vZGVsKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lU2NvcmluZztcbiJdfQ==
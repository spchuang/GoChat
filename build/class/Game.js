

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weiqi = require('weiqi');

var _weiqi2 = _interopRequireDefault(_weiqi);

var _GoBoard = require('../utils/GoBoard');

var _GoBoard2 = _interopRequireDefault(_GoBoard);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _GameBase2 = require('./base/GameBase');

var _GameBase3 = _interopRequireDefault(_GameBase2);

var _ClassEnums = require('./ClassEnums');

var _GameImageRendererUtils = require('../utils/images/GameImageRendererUtils');

var _GameImageRendererUtils2 = _interopRequireDefault(_GameImageRendererUtils);

var _WeiqiSerializer = require('../utils/WeiqiSerializer');

var _WeiqiSerializer2 = _interopRequireDefault(_WeiqiSerializer);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorText = {
  BLACK: 'Black',
  WHITE: 'White'
};

var PASS_MOVE = 'PASS_MOVE';

var GoGame = function (_GameBase) {
  _inherits(GoGame, _GameBase);

  function GoGame(gameModel) {
    _classCallCheck(this, GoGame);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GoGame).call(this, gameModel));

    _this._board = _GoBoard2.default.createFromGame(_this);;
    return _this;
  }

  _createClass(GoGame, [{
    key: 'isOver',
    value: function isOver() {
      return this.getStatus() !== _ClassEnums.GameStatus.PLAYING && this.getStatus() !== _ClassEnums.GameStatus.COUNT_SCORE;
    }
  }, {
    key: 'isCountingScore',
    value: function isCountingScore() {
      return this.getStatus() === _ClassEnums.GameStatus.COUNT_SCORE;
    }
  }, {
    key: 'isUserTurn',
    value: function isUserTurn(userID) {
      return this.isSelfPlayingGame() || this.getIsBlackTurn() && userID === this.getBlackUserID() || !this.getIsBlackTurn() && userID === this.getWhiteUserID();
    }
  }, {
    key: 'isSelfPlayingGame',
    value: function isSelfPlayingGame() {
      return this.getBlackUserID() === this.getWhiteUserID();
    }
  }, {
    key: 'enforceUser',
    value: function enforceUser(userID) {
      (0, _invariant2.default)(userID === this.getBlackUserID() || userID === this.getWhiteUserID(), 'Invalid user ID for the game');
    }
  }, {
    key: 'genOpponentUser',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(userID) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.getBlackUserID() === userID)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return this.genWhiteUser();

              case 3:
                _context.t0 = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.next = 8;
                return this.genBlackUser();

              case 8:
                _context.t0 = _context.sent;

              case 9:
                return _context.abrupt('return', _context.t0);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genOpponentUser(_x) {
        return ref.apply(this, arguments);
      }

      return genOpponentUser;
    }()
  }, {
    key: 'getOpponentUserID',
    value: function getOpponentUserID(userID) {
      return this.getBlackUserID() === userID ? this.getWhiteUserID() : this.getBlackUserID();
    }
  }, {
    key: 'getUserColorText',
    value: function getUserColorText(userID) {
      this.enforceUser(userID);

      return userID === this.getBlackUserID() ? ColorText.BLACK : ColorText.WHITE;
    }
  }, {
    key: 'getPreviousMoveColorText',
    value: function getPreviousMoveColorText() {
      return this.getIsBlackTurn() ? ColorText.WHITE : ColorText.BLACK;
    }
  }, {
    key: 'getCurrentMoveColorText',
    value: function getCurrentMoveColorText() {
      return this.getIsBlackTurn() ? ColorText.BLACK : ColorText.WHITE;
    }
  }, {
    key: 'getScoreText',
    value: function getScoreText() {
      if (!this.isOver()) {
        return null;
      }

      var winsBy = this.getWinsBy();

      if (!winsBy) {
        return this.getStatus() === _ClassEnums.GameStatus.BLACK_WINS ? 'B+R' : 'W+R';
      }

      return this.getStatus() === _ClassEnums.GameStatus.BLACK_WINS ? 'B+' + winsBy : 'W+' + winsBy;
    }
  }, {
    key: 'getCanUserUndo',
    value: function getCanUserUndo(userID) {
      if (this.isCountingScore()) {
        return false;
      }
      var stones = this.getStonesHistory();
      // for non self playing game, need to have at least 2 stones.
      var hasEnoughStones = this.isSelfPlayingGame() ? stones.length > 0 : stones.length > 1;

      return this.isUserTurn(userID) && hasEnoughStones;
    }

    // NOTE this is different from getLastStonePlayed

  }, {
    key: 'getLastNonPassMovePlayed',
    value: function getLastNonPassMovePlayed() {
      var moves = this.getStonesHistory();
      for (var i = moves.length - 1; i >= 0; i--) {
        var move = moves[i];
        if (!move) {
          break;
        }
        if (move !== 'PASS_MOVE') {
          return {
            x: move[0],
            y: move[1],
            color: this.getIsBlackTurn() ? 'white' : 'black'
          };
        }
      }
      return null;
    }
  }, {
    key: 'getStones',
    value: function getStones() {
      // convert weiqi history to our own format
      var weiqiStones = this._board.getStones();
      return _WeiqiSerializer2.default.getStonesFromWeiqiStones(weiqiStones);
    }
  }, {
    key: 'getLastStonePlayed',
    value: function getLastStonePlayed() {
      var moves = this.getStonesHistory();
      if (moves.length === 0) {
        return null;
      }
      return moves[moves.length - 1];
    }
  }, {
    key: 'getCaptures',
    value: function getCaptures() {
      var moves = this.getStonesHistory();
      moves = moves.filter(function (move) {
        return move !== PASS_MOVE;
      });
      var board = this.getWeiqiBoard();

      // capture = total stone - stone left
      var whiteLeft = 0;
      var blackLeft = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = board.stones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var stone = _step.value;

          if (stone.color === 'o') {
            whiteLeft++;
          } else {
            blackLeft++;
          }
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

      blackLeft -= this.getHandicap();

      // if we have handicap, white starts first.
      var blackTotal = void 0,
          whiteTotal = void 0;
      if (this.getHandicap() > 0) {
        blackTotal = Math.ceil(moves.length / 2);
        whiteTotal = moves.length - blackTotal;
      } else {
        whiteTotal = Math.ceil(moves.length / 2);
        blackTotal = moves.length - whiteTotal;
      }

      return [whiteTotal - whiteLeft, blackTotal - blackLeft];
    }
  }, {
    key: 'genBlackUser',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._blackUser) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', this._blackUser);

              case 2:
                _context2.next = 4;
                return _User2.default.genByUserID(this.getBlackUserID());

              case 4:
                this._blackUser = _context2.sent;
                return _context2.abrupt('return', this._blackUser);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genBlackUser() {
        return ref.apply(this, arguments);
      }

      return genBlackUser;
    }()
  }, {
    key: 'genWhiteUser',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._whiteUser) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', this._whiteUser);

              case 2:
                _context3.next = 4;
                return _User2.default.genByUserID(this.getWhiteUserID());

              case 4:
                this._whiteUser = _context3.sent;
                return _context3.abrupt('return', this._whiteUser);

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genWhiteUser() {
        return ref.apply(this, arguments);
      }

      return genWhiteUser;
    }()
  }, {
    key: 'genUndo',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(userID) {
        var stones;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.enforceUser(userID);
                (0, _invariant2.default)(this.getCanUserUndo(userID), 'User can undo');

                stones = this.getStonesHistory();

                if (!(stones.length === 0)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return');

              case 5:

                // undo to the previous turn for the player (1 for self-playing and 2 for multi)
                stones.pop();
                if (!this.isSelfPlayingGame()) {
                  stones.pop();
                }

                // replay all the moves
                this._board = _GoBoard2.default.createFromStones(stones, this.getWeiqiBoardSize());
                this.setDataFromGoBoard();
                _context4.next = 11;
                return this.genSave();

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function genUndo(_x2) {
        return ref.apply(this, arguments);
      }

      return genUndo;
    }()
  }, {
    key: 'genWins',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(gameStatus, winsBy) {
        var gens, user, _ref, _ref2, blackUser, whiteUser;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.setStatus(gameStatus);
                this.setWinsBy(winsBy);

                gens = null;

                if (!this.isSelfPlayingGame()) {
                  _context5.next = 10;
                  break;
                }

                _context5.next = 6;
                return _User2.default.genByUserID(this.getBlackUserID());

              case 6:
                user = _context5.sent;

                gens = [user.genFinishGame(this.getID())];
                _context5.next = 17;
                break;

              case 10:
                _context5.next = 12;
                return _bluebird2.default.all([_User2.default.genByUserID(this.getBlackUserID()), _User2.default.genByUserID(this.getWhiteUserID())]);

              case 12:
                _ref = _context5.sent;
                _ref2 = _slicedToArray(_ref, 2);
                blackUser = _ref2[0];
                whiteUser = _ref2[1];


                gens = [blackUser.genFinishGame(this.getID()), whiteUser.genFinishGame(this.getID())];

              case 17:
                gens.push(this.genSave());
                _context5.next = 20;
                return _bluebird2.default.all(gens);

              case 20:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function genWins(_x3, _x4) {
        return ref.apply(this, arguments);
      }

      return genWins;
    }()
  }, {
    key: 'genResignGame',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(userID) {
        var gens, user, _ref3, _ref4, blackUser, whiteUser;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.enforceUser(userID);

                gens = null;

                if (!this.isSelfPlayingGame()) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 5;
                return _User2.default.genByUserID(this.getBlackUserID());

              case 5:
                user = _context6.sent;

                gens = [user.genQuitGame(this.getID())];
                _context6.next = 16;
                break;

              case 9:
                _context6.next = 11;
                return _bluebird2.default.all([_User2.default.genByUserID(this.getBlackUserID()), _User2.default.genByUserID(this.getWhiteUserID())]);

              case 11:
                _ref3 = _context6.sent;
                _ref4 = _slicedToArray(_ref3, 2);
                blackUser = _ref4[0];
                whiteUser = _ref4[1];


                gens = [blackUser.genQuitGame(this.getID()), whiteUser.genQuitGame(this.getID())];

              case 16:

                // Winner is the opponent color
                if (userID === this.getBlackUserID()) {
                  this.setStatus(_ClassEnums.GameStatus.WHITE_WINS);
                } else {
                  this.setStatus(_ClassEnums.GameStatus.BLACK_WINS);
                }
                gens.push(this.genSave());
                _context6.next = 20;
                return _bluebird2.default.all(gens);

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function genResignGame(_x5) {
        return ref.apply(this, arguments);
      }

      return genResignGame;
    }()

    // Images utilities

  }, {
    key: 'getCurrentBoardString',
    value: function getCurrentBoardString() {
      var boardSize = this.getWeiqiBoardSize();
      var lastMove = this.getLastNonPassMovePlayed();

      var boardString = _WeiqiSerializer2.default.createBoardString(this.getStones(), boardSize);
      if (lastMove) {
        return boardString + '-' + lastMove.x + '-' + lastMove.y + '-' + this.getStatus();
      }
      return boardString + '-' + this.getStatus();
    }
  }, {
    key: 'setDataFromGoBoard',
    value: function setDataFromGoBoard() {
      this.setStonesHistory(this._board.getStoneMoves());
      this.setIsBlackTurn(this._board.getIsBlackTurn());
      this.setWeiqiConsecutivePasses(this._board.getConsectutivePasses());
      this.setWeiqiBoard(this._board.getWeiqiBoard());

      // we actually only need to prev board state in history to detect ko.
      this.setWeiqiHistory(this._board.getWeiqiBoardHistory());
      if (this._board.getConsectutivePasses() === 2) {
        this.setStatus(_ClassEnums.GameStatus.COUNT_SCORE);
      }
    }

    // either make a play a stone or pass the round

  }, {
    key: '_weiqiAction',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(userID, position) {
        var color;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.enforceUser(userID);
                _context7.prev = 1;

                // if it's self-playing game, just keep alternating stone
                if (this.isSelfPlayingGame()) {
                  color = this.getIsBlackTurn() ? _weiqi2.default.BLACK : _weiqi2.default.WHITE;
                } else {
                  color = userID === this.getBlackUserID() ? _weiqi2.default.BLACK : _weiqi2.default.WHITE;
                }

                if (position) {
                  this._board.play(color, position);
                } else {
                  this._board.pass(color);
                }

                this.setDataFromGoBoard();
                _context7.next = 7;
                return this.genSave();

              case 7:
                _context7.next = 19;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7['catch'](1);
                _context7.t1 = _context7.t0;
                _context7.next = _context7.t1 === 'Violation of Ko' ? 14 : _context7.t1 === 'Intersection occupied by existing stone' ? 15 : _context7.t1 === 'Intersection out of bounds' ? 16 : _context7.t1 === 'Not player\'s turn' ? 17 : 18;
                break;

              case 14:
                throw new TypedError(EXCEPTION.VIOLATION_OF_KO);

              case 15:
                throw new TypedError(EXCEPTION.PLAY_ON_EXISTING_STONE);

              case 16:
                throw new TypedError(EXCEPTION.PLAY_OUT_OF_BOUND);

              case 17:
                throw new TypedError(EXCEPTION.NOT_PLAYER_TURN);

              case 18:
                throw _context7.t0;

              case 19:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 9]]);
      }));

      function _weiqiAction(_x6, _x7) {
        return ref.apply(this, arguments);
      }

      return _weiqiAction;
    }()
  }, {
    key: 'genPass',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(userID) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._weiqiAction(userID);

              case 2:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function genPass(_x8) {
        return ref.apply(this, arguments);
      }

      return genPass;
    }()
  }, {
    key: 'genPlay',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(userID, position) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._weiqiAction(userID, position);

              case 2:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function genPlay(_x9, _x10) {
        return ref.apply(this, arguments);
      }

      return genPlay;
    }()
  }, {
    key: 'genBoardImageURL',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!_config2.default.test) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt('return', '/test_image.jpg');

              case 2:
                _context10.next = 4;
                return _GameImageRendererUtils2.default.genBoardImageURL(this);

              case 4:
                return _context10.abrupt('return', _context10.sent);

              case 5:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function genBoardImageURL() {
        return ref.apply(this, arguments);
      }

      return genBoardImageURL;
    }()
  }, {
    key: 'genMiniGameImageURL',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!_config2.default.test) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt('return', 'test_mini_image.jpg');

              case 2:
                _context11.next = 4;
                return _GameImageRendererUtils2.default.genMiniBoardImageURL(this);

              case 4:
                return _context11.abrupt('return', _context11.sent);

              case 5:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function genMiniGameImageURL() {
        return ref.apply(this, arguments);
      }

      return genMiniGameImageURL;
    }()
  }, {
    key: 'genSGF',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt('return', _WeiqiSerializer2.default.genCreateSGFFromGame(this));

              case 1:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function genSGF() {
        return ref.apply(this, arguments);
      }

      return genSGF;
    }()
  }], [{
    key: 'fromModel',
    value: function fromModel(gameModel, user) {
      var game = new GoGame(gameModel);

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
  }, {
    key: 'genFinishedGamesForUser',
    value: function genFinishedGamesForUser(user, moreCondition) {
      return _schema2.default.Game.findAll({
        where: _extends({
          $or: [{ whiteUserID: user.getID() }, { blackUserID: user.getID() }],
          $not: { status: [_ClassEnums.GameStatus.PLAYING, _ClassEnums.GameStatus.COUNT_SCORE] }
        }, moreCondition),
        order: [['updatedAt', 'DESC']]
      }).then(function (models) {
        return models.map(function (m) {
          return GoGame.fromModel(m, user);
        });
      });
    }

    // return a list of active games for the user, always put the focused game in the front

  }, {
    key: 'genActiveGamesForUser',
    value: function genActiveGamesForUser(user, moreCondition) {
      return _schema2.default.Game.findAll({
        where: _extends({
          $or: [{ whiteUserID: user.getID() }, { blackUserID: user.getID() }],
          status: [_ClassEnums.GameStatus.PLAYING, _ClassEnums.GameStatus.COUNT_SCORE]
        }, moreCondition),
        order: [['updatedAt', 'DESC']]
      }).then(function (models) {
        var games = models.map(function (m) {
          return GoGame.fromModel(m, user);
        });
        // move current game to the front
        var currentGameIndex = games.findIndex(function (game) {
          return game.getID() === user.getCurrentGameID();
        });
        if (currentGameIndex !== -1) {
          var currentGame = games[currentGameIndex];
          games.splice(currentGameIndex, 1);
          games.unshift(currentGame);
        }
        return games;
      });
    }
  }, {
    key: '_genCreateGame',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee13(blackUserID, whiteUserID, boardSize, handicap, komi) {
        var board;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                board = _GoBoard2.default.createNewBoard(boardSize, handicap);
                return _context13.abrupt('return', _schema2.default.Game.create({
                  blackUserID: blackUserID,
                  whiteUserID: whiteUserID,
                  isBlackTurn: board.getIsBlackTurn(),
                  weiqiConsecutivePasses: 0,
                  weiqiHistory: JSON.stringify(board.getWeiqiBoardHistory()),
                  weiqiBoard: JSON.stringify(board.getWeiqiBoard()),
                  weiqiBoardSize: boardSize,
                  boardImageURL: '../../images/emptyBoard-min.jpg',
                  status: _ClassEnums.GameStatus.PLAYING,
                  stonesHistory: JSON.stringify(board.getStoneMoves()),
                  handicap: handicap,
                  komi: komi
                }).then(function (gameModel) {
                  return GoGame.fromModel(gameModel);
                }));

              case 2:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function _genCreateGame(_x11, _x12, _x13, _x14, _x15) {
        return ref.apply(this, arguments);
      }

      return _genCreateGame;
    }()
  }, {
    key: 'genCreateGame',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee14(blackUser, whiteUser, boardSize, handicap, komi) {
        var game;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return GoGame._genCreateGame(blackUser.getID(), whiteUser.getID(), boardSize, handicap, komi);

              case 2:
                game = _context14.sent;


                // for performance,
                game._blackUser = blackUser;
                game._whiteUser = whiteUser;

                // set the user states

                if (!game.isSelfPlayingGame()) {
                  _context14.next = 10;
                  break;
                }

                _context14.next = 8;
                return blackUser.genSetPlayGame(game);

              case 8:
                _context14.next = 12;
                break;

              case 10:
                _context14.next = 12;
                return _bluebird2.default.all([blackUser.genSetPlayGame(game), whiteUser.genSetPlayGame(game)]);

              case 12:
                return _context14.abrupt('return', game);

              case 13:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function genCreateGame(_x16, _x17, _x18, _x19, _x20) {
        return ref.apply(this, arguments);
      }

      return genCreateGame;
    }()
  }]);

  return GoGame;
}(_GameBase3.default);

exports.default = GoGame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzcy9HYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sWUFBWTtBQUNoQixTQUFPLE9BRFM7QUFFaEIsU0FBTztBQUZTLENBQWxCOztBQUtBLElBQU0sWUFBWSxXQUFsQjs7SUFFTSxNOzs7QUFJSixrQkFBWSxTQUFaLEVBQTZDO0FBQUE7O0FBQUEsMEZBQ3JDLFNBRHFDOztBQUUzQyxVQUFLLE1BQUwsR0FBYyxrQkFBUSxjQUFSLE9BQWQsQ0FBMkM7QUFGQTtBQUc1Qzs7Ozs2QkFFaUI7QUFDaEIsYUFBTyxLQUFLLFNBQUwsT0FBcUIsdUJBQVcsT0FBaEMsSUFBMkMsS0FBSyxTQUFMLE9BQXFCLHVCQUFXLFdBQWxGO0FBQ0Q7OztzQ0FFMEI7QUFDekIsYUFBTyxLQUFLLFNBQUwsT0FBcUIsdUJBQVcsV0FBdkM7QUFDRDs7OytCQUVVLE0sRUFBc0I7QUFDL0IsYUFBTyxLQUFLLGlCQUFMLE1BQ0osS0FBSyxjQUFMLE1BQXlCLFdBQVcsS0FBSyxjQUFMLEVBRGhDLElBRUosQ0FBQyxLQUFLLGNBQUwsRUFBRCxJQUEwQixXQUFXLEtBQUssY0FBTCxFQUZ4QztBQUdEOzs7d0NBRTRCO0FBQzNCLGFBQU8sS0FBSyxjQUFMLE9BQTBCLEtBQUssY0FBTCxFQUFqQztBQUNEOzs7Z0NBRVcsTSxFQUFzQjtBQUNoQywrQkFDRSxXQUFXLEtBQUssY0FBTCxFQUFYLElBQW9DLFdBQVcsS0FBSyxjQUFMLEVBRGpELEVBRUUsOEJBRkY7QUFJRDs7OztrRkFFcUIsTTs7Ozs7c0JBQ2IsS0FBSyxjQUFMLE9BQTBCLE07Ozs7Ozt1QkFDdkIsS0FBSyxZQUFMLEU7Ozs7Ozs7Ozt1QkFDQSxLQUFLLFlBQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7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eEIsK0JBQWEsV0FEVztBQUV4QiwrQkFBYSxXQUZXO0FBR3hCLCtCQUFhLE1BQU0sY0FBTixFQUhXO0FBSXhCLDBDQUF3QixDQUpBO0FBS3hCLGdDQUFjLEtBQUssU0FBTCxDQUFlLE1BQU0sb0JBQU4sRUFBZixDQUxVO0FBTXhCLDhCQUFZLEtBQUssU0FBTCxDQUFlLE1BQU0sYUFBTixFQUFmLENBTlk7QUFPeEIsa0NBQWdCLFNBUFE7QUFReEIsaUNBQWUsaUNBUlM7QUFTeEIsMEJBQVEsdUJBQVcsT0FUSztBQVV4QixpQ0FBZSxLQUFLLFNBQUwsQ0FBZSxNQUFNLGFBQU4sRUFBZixDQVZTO0FBV3hCLDRCQUFVLFFBWGM7QUFZeEIsd0JBQU07QUFaa0IsaUJBQW5CLEVBYUosSUFiSSxDQWFDLFVBQUMsU0FBRCxFQUF1QztBQUM3Qyx5QkFBTyxPQUFPLFNBQVAsQ0FBaUIsU0FBakIsQ0FBUDtBQUNELGlCQWZNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0ZBbUJQLFMsRUFDQSxTLEVBQ0EsUyxFQUNBLFEsRUFDQSxJO1lBRUksSTs7Ozs7O3VCQUFhLE9BQU8sY0FBUCxDQUNmLFVBQVUsS0FBVixFQURlLEVBRWYsVUFBVSxLQUFWLEVBRmUsRUFHZixTQUhlLEVBSWYsUUFKZSxFQUtmLElBTGUsQzs7O0FBQWIsb0I7Ozs7QUFTSixxQkFBSyxVQUFMLEdBQWtCLFNBQWxCO0FBQ0EscUJBQUssVUFBTCxHQUFrQixTQUFsQjs7OztxQkFHSSxLQUFLLGlCQUFMLEU7Ozs7Ozt1QkFDSSxVQUFVLGNBQVYsQ0FBeUIsSUFBekIsQzs7Ozs7Ozs7dUJBRUEsbUJBQVEsR0FBUixDQUFZLENBQ2hCLFVBQVUsY0FBVixDQUF5QixJQUF6QixDQURnQixFQUVoQixVQUFVLGNBQVYsQ0FBeUIsSUFBekIsQ0FGZ0IsQ0FBWixDOzs7bURBS0QsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQUlJLE0iLCJmaWxlIjoiR2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFdlaXFpIGZyb20gJ3dlaXFpJztcbmltcG9ydCBHb0JvYXJkIGZyb20gJy4uL3V0aWxzL0dvQm9hcmQnO1xuaW1wb3J0IG1vZGVscyBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgR2FtZUJhc2UgZnJvbSAnLi9iYXNlL0dhbWVCYXNlJztcbmltcG9ydCB7R2FtZVN0YXR1c30gZnJvbSAnLi9DbGFzc0VudW1zJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB0eXBlIHtTZXF1ZWxpemVNb2RlbH0gZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IEdhbWVJbWFnZVJlbmRlcmVyVXRpbHMgZnJvbSAnLi4vdXRpbHMvaW1hZ2VzL0dhbWVJbWFnZVJlbmRlcmVyVXRpbHMnO1xuaW1wb3J0IFdlaXFpU2VyaWFsaXplciBmcm9tICcuLi91dGlscy9XZWlxaVNlcmlhbGl6ZXInO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3QgQ29sb3JUZXh0ID0ge1xuICBCTEFDSzogJ0JsYWNrJyxcbiAgV0hJVEU6ICdXaGl0ZScsXG59O1xuXG5jb25zdCBQQVNTX01PVkUgPSAnUEFTU19NT1ZFJztcblxuY2xhc3MgR29HYW1lIGV4dGVuZHMgR2FtZUJhc2Uge1xuICBfYm9hcmQ6IEdvQm9hcmQ7XG4gIF9ibGFja1VzZXI6IFVzZXI7XG4gIF93aGl0ZVVzZXI6IFVzZXI7XG4gIGNvbnN0cnVjdG9yKGdhbWVNb2RlbDogU2VxdWVsaXplTW9kZWwpOiB2b2lkIHtcbiAgICBzdXBlcihnYW1lTW9kZWwpO1xuICAgIHRoaXMuX2JvYXJkID0gR29Cb2FyZC5jcmVhdGVGcm9tR2FtZSh0aGlzKTs7XG4gIH1cblxuICBpc092ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U3RhdHVzKCkgIT09IEdhbWVTdGF0dXMuUExBWUlORyAmJiB0aGlzLmdldFN0YXR1cygpICE9PSBHYW1lU3RhdHVzLkNPVU5UX1NDT1JFO1xuICB9XG5cbiAgaXNDb3VudGluZ1Njb3JlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldFN0YXR1cygpID09PSBHYW1lU3RhdHVzLkNPVU5UX1NDT1JFO1xuICB9XG5cbiAgaXNVc2VyVHVybih1c2VySUQ6IG51bWJlcik6IGJvb2wge1xuICAgIHJldHVybiB0aGlzLmlzU2VsZlBsYXlpbmdHYW1lKCkgfHxcbiAgICAgICh0aGlzLmdldElzQmxhY2tUdXJuKCkgJiYgdXNlcklEID09PSB0aGlzLmdldEJsYWNrVXNlcklEKCkpIHx8XG4gICAgICAoIXRoaXMuZ2V0SXNCbGFja1R1cm4oKSAmJiB1c2VySUQgPT09IHRoaXMuZ2V0V2hpdGVVc2VySUQoKSk7XG4gIH1cblxuICBpc1NlbGZQbGF5aW5nR2FtZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCbGFja1VzZXJJRCgpID09PSB0aGlzLmdldFdoaXRlVXNlcklEKCk7XG4gIH1cblxuICBlbmZvcmNlVXNlcih1c2VySUQ6IG51bWJlcik6IHZvaWQge1xuICAgIGludmFyaWFudChcbiAgICAgIHVzZXJJRCA9PT0gdGhpcy5nZXRCbGFja1VzZXJJRCgpIHx8IHVzZXJJRCA9PT0gdGhpcy5nZXRXaGl0ZVVzZXJJRCgpLFxuICAgICAgJ0ludmFsaWQgdXNlciBJRCBmb3IgdGhlIGdhbWUnXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGdlbk9wcG9uZW50VXNlcih1c2VySUQ6IG51bWJlcik6IFByb21pc2U8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLmdldEJsYWNrVXNlcklEKCkgPT09IHVzZXJJRFxuICAgICAgPyBhd2FpdCB0aGlzLmdlbldoaXRlVXNlcigpXG4gICAgICA6IGF3YWl0IHRoaXMuZ2VuQmxhY2tVc2VyKCk7XG4gIH1cblxuICBnZXRPcHBvbmVudFVzZXJJRCh1c2VySUQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QmxhY2tVc2VySUQoKSA9PT0gdXNlcklEXG4gICAgICA/IHRoaXMuZ2V0V2hpdGVVc2VySUQoKVxuICAgICAgOiB0aGlzLmdldEJsYWNrVXNlcklEKCk7XG4gIH1cblxuICBnZXRVc2VyQ29sb3JUZXh0KHVzZXJJRDogbnVtYmVyKTogJ0JsYWNrJyB8ICdXaGl0ZScge1xuICAgIHRoaXMuZW5mb3JjZVVzZXIodXNlcklEKTtcblxuICAgIHJldHVybiB1c2VySUQgPT09IHRoaXMuZ2V0QmxhY2tVc2VySUQoKVxuICAgICAgPyBDb2xvclRleHQuQkxBQ0tcbiAgICAgIDogQ29sb3JUZXh0LldISVRFO1xuICB9XG5cbiAgZ2V0UHJldmlvdXNNb3ZlQ29sb3JUZXh0KCk6ICdCbGFjaycgfCAnV2hpdGUnIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJc0JsYWNrVHVybigpXG4gICAgICA/IENvbG9yVGV4dC5XSElURVxuICAgICAgOiBDb2xvclRleHQuQkxBQ0s7XG4gIH1cblxuICBnZXRDdXJyZW50TW92ZUNvbG9yVGV4dCgpOiAnQmxhY2snIHwgJ1doaXRlJyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SXNCbGFja1R1cm4oKVxuICAgICAgPyBDb2xvclRleHQuQkxBQ0tcbiAgICAgIDogQ29sb3JUZXh0LldISVRFO1xuICB9XG5cbiAgZ2V0U2NvcmVUZXh0KCk6ID9zdHJpbmcge1xuICAgIGlmICghdGhpcy5pc092ZXIoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgd2luc0J5ID0gdGhpcy5nZXRXaW5zQnkoKTtcblxuICAgIGlmICghd2luc0J5KSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTdGF0dXMoKSA9PT0gR2FtZVN0YXR1cy5CTEFDS19XSU5TID8gJ0IrUicgOiAnVytSJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRTdGF0dXMoKSA9PT0gR2FtZVN0YXR1cy5CTEFDS19XSU5TID8gYEIrJHt3aW5zQnl9YCA6IGBXKyR7d2luc0J5fWA7XG4gIH1cblxuICBnZXRDYW5Vc2VyVW5kbyh1c2VySUQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmlzQ291bnRpbmdTY29yZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHN0b25lcyA9IHRoaXMuZ2V0U3RvbmVzSGlzdG9yeSgpO1xuICAgIC8vIGZvciBub24gc2VsZiBwbGF5aW5nIGdhbWUsIG5lZWQgdG8gaGF2ZSBhdCBsZWFzdCAyIHN0b25lcy5cbiAgICBjb25zdCBoYXNFbm91Z2hTdG9uZXMgPSB0aGlzLmlzU2VsZlBsYXlpbmdHYW1lKClcbiAgICAgID8gc3RvbmVzLmxlbmd0aCA+IDBcbiAgICAgIDogc3RvbmVzLmxlbmd0aCA+IDE7XG5cbiAgICByZXR1cm4gdGhpcy5pc1VzZXJUdXJuKHVzZXJJRCkgJiYgaGFzRW5vdWdoU3RvbmVzO1xuICB9XG5cbiAgLy8gTk9URSB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIGdldExhc3RTdG9uZVBsYXllZFxuICBnZXRMYXN0Tm9uUGFzc01vdmVQbGF5ZWQoKTogP1N0b25lIHtcbiAgICBjb25zdCBtb3ZlcyA9IHRoaXMuZ2V0U3RvbmVzSGlzdG9yeSgpO1xuICAgIGZvciAobGV0IGkgPSBtb3Zlcy5sZW5ndGggLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBtb3ZlID0gbW92ZXNbaV07XG4gICAgICBpZiAoIW1vdmUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAobW92ZSAhPT0gJ1BBU1NfTU9WRScpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiBtb3ZlWzBdLFxuICAgICAgICAgIHk6IG1vdmVbMV0sXG4gICAgICAgICAgY29sb3I6IHRoaXMuZ2V0SXNCbGFja1R1cm4oKSA/ICd3aGl0ZScgOiAnYmxhY2snLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFN0b25lcygpOiBBcnJheTxTdG9uZT4ge1xuICAgIC8vIGNvbnZlcnQgd2VpcWkgaGlzdG9yeSB0byBvdXIgb3duIGZvcm1hdFxuICAgIHZhciB3ZWlxaVN0b25lcyA9IHRoaXMuX2JvYXJkLmdldFN0b25lcygpO1xuICAgIHJldHVybiBXZWlxaVNlcmlhbGl6ZXIuZ2V0U3RvbmVzRnJvbVdlaXFpU3RvbmVzKHdlaXFpU3RvbmVzKTtcbiAgfVxuXG4gIGdldExhc3RTdG9uZVBsYXllZCgpOiA/U3RvbmVNb3ZlIHtcbiAgICBjb25zdCBtb3ZlcyA9IHRoaXMuZ2V0U3RvbmVzSGlzdG9yeSgpO1xuICAgIGlmIChtb3Zlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbW92ZXNbbW92ZXMubGVuZ3RoIC0gMV07XG4gIH1cblxuICBnZXRDYXB0dXJlcygpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBsZXQgbW92ZXMgPSB0aGlzLmdldFN0b25lc0hpc3RvcnkoKTtcbiAgICBtb3ZlcyA9IG1vdmVzLmZpbHRlcihtb3ZlID0+IG1vdmUgIT09IFBBU1NfTU9WRSk7XG4gICAgY29uc3QgYm9hcmQgPSB0aGlzLmdldFdlaXFpQm9hcmQoKTtcblxuICAgIC8vIGNhcHR1cmUgPSB0b3RhbCBzdG9uZSAtIHN0b25lIGxlZnRcbiAgICBsZXQgd2hpdGVMZWZ0ID0gMDtcbiAgICBsZXQgYmxhY2tMZWZ0ID0gMDtcbiAgICBmb3IgKGNvbnN0IHN0b25lIG9mIGJvYXJkLnN0b25lcykge1xuICAgICAgaWYgKHN0b25lLmNvbG9yID09PSAnbycpIHtcbiAgICAgICAgd2hpdGVMZWZ0Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBibGFja0xlZnQrKztcbiAgICAgIH1cbiAgICB9XG4gICAgYmxhY2tMZWZ0IC09IHRoaXMuZ2V0SGFuZGljYXAoKTtcblxuICAgIC8vIGlmIHdlIGhhdmUgaGFuZGljYXAsIHdoaXRlIHN0YXJ0cyBmaXJzdC5cbiAgICBsZXQgYmxhY2tUb3RhbCwgd2hpdGVUb3RhbDtcbiAgICBpZiAodGhpcy5nZXRIYW5kaWNhcCgpID4gMCkge1xuICAgICAgYmxhY2tUb3RhbCA9IE1hdGguY2VpbChtb3Zlcy5sZW5ndGggLyAyKTtcbiAgICAgIHdoaXRlVG90YWwgPSBtb3Zlcy5sZW5ndGggLSBibGFja1RvdGFsO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGl0ZVRvdGFsID0gTWF0aC5jZWlsKG1vdmVzLmxlbmd0aCAvIDIpO1xuICAgICAgYmxhY2tUb3RhbCA9IG1vdmVzLmxlbmd0aCAtIHdoaXRlVG90YWw7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIHdoaXRlVG90YWwgLSB3aGl0ZUxlZnQsXG4gICAgICBibGFja1RvdGFsIC0gYmxhY2tMZWZ0LFxuICAgIF07XG4gIH1cblxuICBhc3luYyBnZW5CbGFja1VzZXIoKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgaWYgKHRoaXMuX2JsYWNrVXNlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX2JsYWNrVXNlcjtcbiAgICB9XG4gICAgdGhpcy5fYmxhY2tVc2VyID0gYXdhaXQgVXNlci5nZW5CeVVzZXJJRCh0aGlzLmdldEJsYWNrVXNlcklEKCkpO1xuICAgIHJldHVybiB0aGlzLl9ibGFja1VzZXI7XG4gIH1cblxuICBhc3luYyBnZW5XaGl0ZVVzZXIoKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgaWYgKHRoaXMuX3doaXRlVXNlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX3doaXRlVXNlcjtcbiAgICB9XG4gICAgdGhpcy5fd2hpdGVVc2VyID0gYXdhaXQgVXNlci5nZW5CeVVzZXJJRCh0aGlzLmdldFdoaXRlVXNlcklEKCkpO1xuICAgIHJldHVybiB0aGlzLl93aGl0ZVVzZXI7XG4gIH1cblxuICBhc3luYyBnZW5VbmRvKHVzZXJJRDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5lbmZvcmNlVXNlcih1c2VySUQpO1xuICAgIGludmFyaWFudCh0aGlzLmdldENhblVzZXJVbmRvKHVzZXJJRCksICdVc2VyIGNhbiB1bmRvJyk7XG5cbiAgICBsZXQgc3RvbmVzID0gdGhpcy5nZXRTdG9uZXNIaXN0b3J5KCk7XG4gICAgaWYgKHN0b25lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB1bmRvIHRvIHRoZSBwcmV2aW91cyB0dXJuIGZvciB0aGUgcGxheWVyICgxIGZvciBzZWxmLXBsYXlpbmcgYW5kIDIgZm9yIG11bHRpKVxuICAgIHN0b25lcy5wb3AoKTtcbiAgICBpZiAoIXRoaXMuaXNTZWxmUGxheWluZ0dhbWUoKSkge1xuICAgICAgc3RvbmVzLnBvcCgpO1xuICAgIH1cblxuICAgIC8vIHJlcGxheSBhbGwgdGhlIG1vdmVzXG4gICAgdGhpcy5fYm9hcmQgPSBHb0JvYXJkLmNyZWF0ZUZyb21TdG9uZXMoc3RvbmVzLCB0aGlzLmdldFdlaXFpQm9hcmRTaXplKCkpO1xuICAgIHRoaXMuc2V0RGF0YUZyb21Hb0JvYXJkKCk7XG4gICAgYXdhaXQgdGhpcy5nZW5TYXZlKCk7XG4gIH1cblxuICBhc3luYyBnZW5XaW5zKGdhbWVTdGF0dXM6IEdhbWVTdGF0dXNUeXBlLCB3aW5zQnk6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuc2V0U3RhdHVzKGdhbWVTdGF0dXMpO1xuICAgIHRoaXMuc2V0V2luc0J5KHdpbnNCeSk7XG5cbiAgICBsZXQgZ2VucyA9IG51bGw7XG4gICAgaWYgKHRoaXMuaXNTZWxmUGxheWluZ0dhbWUoKSkge1xuICAgICAgdmFyIHVzZXIgPSBhd2FpdCBVc2VyLmdlbkJ5VXNlcklEKHRoaXMuZ2V0QmxhY2tVc2VySUQoKSk7XG4gICAgICBnZW5zID0gW3VzZXIuZ2VuRmluaXNoR2FtZSh0aGlzLmdldElEKCkpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIFtibGFja1VzZXIsIHdoaXRlVXNlcl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIFVzZXIuZ2VuQnlVc2VySUQodGhpcy5nZXRCbGFja1VzZXJJRCgpKSxcbiAgICAgICAgVXNlci5nZW5CeVVzZXJJRCh0aGlzLmdldFdoaXRlVXNlcklEKCkpLFxuICAgICAgXSk7XG5cbiAgICAgIGdlbnMgPSBbXG4gICAgICAgIGJsYWNrVXNlci5nZW5GaW5pc2hHYW1lKHRoaXMuZ2V0SUQoKSksXG4gICAgICAgIHdoaXRlVXNlci5nZW5GaW5pc2hHYW1lKHRoaXMuZ2V0SUQoKSksXG4gICAgICBdO1xuICAgIH1cbiAgICBnZW5zLnB1c2godGhpcy5nZW5TYXZlKCkpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGdlbnMpO1xuICB9XG5cbiAgYXN5bmMgZ2VuUmVzaWduR2FtZSh1c2VySUQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZW5mb3JjZVVzZXIodXNlcklEKTtcblxuICAgIGxldCBnZW5zID0gbnVsbDtcbiAgICBpZiAodGhpcy5pc1NlbGZQbGF5aW5nR2FtZSgpKSB7XG4gICAgICB2YXIgdXNlciA9IGF3YWl0IFVzZXIuZ2VuQnlVc2VySUQodGhpcy5nZXRCbGFja1VzZXJJRCgpKTtcbiAgICAgIGdlbnMgPSBbdXNlci5nZW5RdWl0R2FtZSh0aGlzLmdldElEKCkpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIFtibGFja1VzZXIsIHdoaXRlVXNlcl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIFVzZXIuZ2VuQnlVc2VySUQodGhpcy5nZXRCbGFja1VzZXJJRCgpKSxcbiAgICAgICAgVXNlci5nZW5CeVVzZXJJRCh0aGlzLmdldFdoaXRlVXNlcklEKCkpLFxuICAgICAgXSk7XG5cbiAgICAgIGdlbnMgPSBbXG4gICAgICAgIGJsYWNrVXNlci5nZW5RdWl0R2FtZSh0aGlzLmdldElEKCkpLFxuICAgICAgICB3aGl0ZVVzZXIuZ2VuUXVpdEdhbWUodGhpcy5nZXRJRCgpKSxcbiAgICAgIF07XG4gICAgfVxuXG4gICAgLy8gV2lubmVyIGlzIHRoZSBvcHBvbmVudCBjb2xvclxuICAgIGlmICh1c2VySUQgPT09IHRoaXMuZ2V0QmxhY2tVc2VySUQoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0dXMoR2FtZVN0YXR1cy5XSElURV9XSU5TKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0dXMoR2FtZVN0YXR1cy5CTEFDS19XSU5TKTtcbiAgICB9XG4gICAgZ2Vucy5wdXNoKHRoaXMuZ2VuU2F2ZSgpKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChnZW5zKTtcbiAgfVxuXG4gIC8vIEltYWdlcyB1dGlsaXRpZXNcbiAgZ2V0Q3VycmVudEJvYXJkU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3QgYm9hcmRTaXplID0gdGhpcy5nZXRXZWlxaUJvYXJkU2l6ZSgpO1xuICAgIGNvbnN0IGxhc3RNb3ZlID0gdGhpcy5nZXRMYXN0Tm9uUGFzc01vdmVQbGF5ZWQoKTtcblxuICAgIGNvbnN0IGJvYXJkU3RyaW5nID0gV2VpcWlTZXJpYWxpemVyLmNyZWF0ZUJvYXJkU3RyaW5nKHRoaXMuZ2V0U3RvbmVzKCksIGJvYXJkU2l6ZSk7XG4gICAgaWYgKGxhc3RNb3ZlKSB7XG4gICAgICByZXR1cm4gYCR7Ym9hcmRTdHJpbmd9LSR7bGFzdE1vdmUueH0tJHtsYXN0TW92ZS55fS0ke3RoaXMuZ2V0U3RhdHVzKCl9YDtcbiAgICB9XG4gICAgcmV0dXJuIGAke2JvYXJkU3RyaW5nfS0ke3RoaXMuZ2V0U3RhdHVzKCl9YDtcbiAgfVxuXG4gIHNldERhdGFGcm9tR29Cb2FyZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFN0b25lc0hpc3RvcnkodGhpcy5fYm9hcmQuZ2V0U3RvbmVNb3ZlcygpKTtcbiAgICB0aGlzLnNldElzQmxhY2tUdXJuKHRoaXMuX2JvYXJkLmdldElzQmxhY2tUdXJuKCkpO1xuICAgIHRoaXMuc2V0V2VpcWlDb25zZWN1dGl2ZVBhc3Nlcyh0aGlzLl9ib2FyZC5nZXRDb25zZWN0dXRpdmVQYXNzZXMoKSk7XG4gICAgdGhpcy5zZXRXZWlxaUJvYXJkKHRoaXMuX2JvYXJkLmdldFdlaXFpQm9hcmQoKSk7XG5cbiAgICAvLyB3ZSBhY3R1YWxseSBvbmx5IG5lZWQgdG8gcHJldiBib2FyZCBzdGF0ZSBpbiBoaXN0b3J5IHRvIGRldGVjdCBrby5cbiAgICB0aGlzLnNldFdlaXFpSGlzdG9yeSh0aGlzLl9ib2FyZC5nZXRXZWlxaUJvYXJkSGlzdG9yeSgpKTtcbiAgICBpZiAodGhpcy5fYm9hcmQuZ2V0Q29uc2VjdHV0aXZlUGFzc2VzKCkgPT09IDIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdHVzKEdhbWVTdGF0dXMuQ09VTlRfU0NPUkUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVpdGhlciBtYWtlIGEgcGxheSBhIHN0b25lIG9yIHBhc3MgdGhlIHJvdW5kXG4gIGFzeW5jIF93ZWlxaUFjdGlvbih1c2VySUQ6IG51bWJlciwgcG9zaXRpb246ID9TdG9uZVBvc2l0aW9uKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5lbmZvcmNlVXNlcih1c2VySUQpO1xuICAgIHRyeSB7XG4gICAgICB2YXIgY29sb3I7XG4gICAgICAvLyBpZiBpdCdzIHNlbGYtcGxheWluZyBnYW1lLCBqdXN0IGtlZXAgYWx0ZXJuYXRpbmcgc3RvbmVcbiAgICAgIGlmICh0aGlzLmlzU2VsZlBsYXlpbmdHYW1lKCkpIHtcbiAgICAgICAgY29sb3IgPSB0aGlzLmdldElzQmxhY2tUdXJuKClcbiAgICAgICAgICA/IFdlaXFpLkJMQUNLXG4gICAgICAgICAgOiBXZWlxaS5XSElURTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbG9yID0gdXNlcklEID09PSB0aGlzLmdldEJsYWNrVXNlcklEKClcbiAgICAgICAgICA/IFdlaXFpLkJMQUNLXG4gICAgICAgICAgOiBXZWlxaS5XSElURTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuX2JvYXJkLnBsYXkoY29sb3IsIHBvc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JvYXJkLnBhc3MoY29sb3IpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldERhdGFGcm9tR29Cb2FyZCgpO1xuICAgICAgYXdhaXQgdGhpcy5nZW5TYXZlKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzd2l0Y2goZXJyKSB7XG4gICAgICAgIGNhc2UgJ1Zpb2xhdGlvbiBvZiBLbyc6XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVkRXJyb3IoRVhDRVBUSU9OLlZJT0xBVElPTl9PRl9LTyk7XG4gICAgICAgIGNhc2UgJ0ludGVyc2VjdGlvbiBvY2N1cGllZCBieSBleGlzdGluZyBzdG9uZSc6XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVkRXJyb3IoRVhDRVBUSU9OLlBMQVlfT05fRVhJU1RJTkdfU1RPTkUpO1xuICAgICAgICBjYXNlICdJbnRlcnNlY3Rpb24gb3V0IG9mIGJvdW5kcyc6XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVkRXJyb3IoRVhDRVBUSU9OLlBMQVlfT1VUX09GX0JPVU5EKTtcbiAgICAgICAgY2FzZSAnTm90IHBsYXllclxcJ3MgdHVybic6XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVkRXJyb3IoRVhDRVBUSU9OLk5PVF9QTEFZRVJfVFVSTik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdlblBhc3ModXNlcklEOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl93ZWlxaUFjdGlvbih1c2VySUQpO1xuICB9XG5cbiAgYXN5bmMgZ2VuUGxheSh1c2VySUQ6IG51bWJlciwgcG9zaXRpb246IFN0b25lUG9zaXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl93ZWlxaUFjdGlvbih1c2VySUQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIGFzeW5jIGdlbkJvYXJkSW1hZ2VVUkwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIGdlbmVyYXRlIGltYWdlIGZvciB0ZXN0XG4gICAgaWYgKGNvbmZpZy50ZXN0KSB7XG4gICAgICByZXR1cm4gJy90ZXN0X2ltYWdlLmpwZyc7XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCBHYW1lSW1hZ2VSZW5kZXJlclV0aWxzLmdlbkJvYXJkSW1hZ2VVUkwodGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU1vZGVsKGdhbWVNb2RlbDogU2VxdWVsaXplTW9kZWwsIHVzZXI/OiBTZXF1ZWxpemVNb2RlbCk6IEdvR2FtZSB7XG4gICAgbGV0IGdhbWUgPSBuZXcgR29HYW1lKGdhbWVNb2RlbCk7XG5cbiAgICBpZiAodXNlcikge1xuICAgICAgaWYgKGdhbWUuZ2V0V2hpdGVVc2VySUQoKSA9PT0gdXNlci5nZXRJRCgpKSB7XG4gICAgICAgIGdhbWUuX3doaXRlVXNlciA9IHVzZXI7XG4gICAgICB9XG4gICAgICBpZiAoZ2FtZS5nZXRCbGFja1VzZXJJRCgpID09PSB1c2VyLmdldElEKCkpIHtcbiAgICAgICAgZ2FtZS5fYmxhY2tVc2VyID0gdXNlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdhbWU7XG4gIH1cblxuICBhc3luYyBnZW5NaW5pR2FtZUltYWdlVVJMKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKGNvbmZpZy50ZXN0KSB7XG4gICAgICByZXR1cm4gJ3Rlc3RfbWluaV9pbWFnZS5qcGcnO1xuICAgIH1cbiAgICByZXR1cm4gYXdhaXQgR2FtZUltYWdlUmVuZGVyZXJVdGlscy5nZW5NaW5pQm9hcmRJbWFnZVVSTCh0aGlzKTtcbiAgfVxuXG4gIGFzeW5jIGdlblNHRigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBXZWlxaVNlcmlhbGl6ZXIuZ2VuQ3JlYXRlU0dGRnJvbUdhbWUodGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZ2VuRmluaXNoZWRHYW1lc0ZvclVzZXIodXNlcjogVXNlciwgbW9yZUNvbmRpdGlvbjogP09iamVjdCk6IFByb21pc2U8QXJyYXk8R29HYW1lPj4ge1xuICAgIHJldHVybiBtb2RlbHMuR2FtZS5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAkb3I6IFt7d2hpdGVVc2VySUQ6IHVzZXIuZ2V0SUQoKX0sIHtibGFja1VzZXJJRDogdXNlci5nZXRJRCgpfV0sXG4gICAgICAgICAgJG5vdDoge3N0YXR1czogW0dhbWVTdGF0dXMuUExBWUlORywgR2FtZVN0YXR1cy5DT1VOVF9TQ09SRV19LFxuICAgICAgICAgIC4uLm1vcmVDb25kaXRpb24sXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyOiBbWyd1cGRhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIH0pLnRoZW4oKG1vZGVsczogQXJyYXk8U2VxdWVsaXplTW9kZWw+KTogQXJyYXk8R29HYW1lPiA9PiB7XG4gICAgICAgIHJldHVybiBtb2RlbHMubWFwKChtKSA9PiBHb0dhbWUuZnJvbU1vZGVsKG0sIHVzZXIpKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gcmV0dXJuIGEgbGlzdCBvZiBhY3RpdmUgZ2FtZXMgZm9yIHRoZSB1c2VyLCBhbHdheXMgcHV0IHRoZSBmb2N1c2VkIGdhbWUgaW4gdGhlIGZyb250XG4gIHN0YXRpYyBnZW5BY3RpdmVHYW1lc0ZvclVzZXIodXNlcjogVXNlciwgbW9yZUNvbmRpdGlvbjogP09iamVjdCk6IFByb21pc2U8QXJyYXk8R29HYW1lPj4ge1xuICAgIHJldHVybiBtb2RlbHMuR2FtZS5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAkb3I6IFt7d2hpdGVVc2VySUQ6IHVzZXIuZ2V0SUQoKX0sIHtibGFja1VzZXJJRDogdXNlci5nZXRJRCgpfV0sXG4gICAgICAgICAgc3RhdHVzOiBbR2FtZVN0YXR1cy5QTEFZSU5HLCBHYW1lU3RhdHVzLkNPVU5UX1NDT1JFXSxcbiAgICAgICAgICAuLi5tb3JlQ29uZGl0aW9uLFxuICAgICAgICB9LFxuICAgICAgICBvcmRlcjogW1sndXBkYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICB9KS50aGVuKChtb2RlbHM6IEFycmF5PFNlcXVlbGl6ZU1vZGVsPik6IEFycmF5PEdvR2FtZT4gPT4ge1xuICAgICAgICBjb25zdCBnYW1lcyA9IG1vZGVscy5tYXAoKG0pID0+IEdvR2FtZS5mcm9tTW9kZWwobSwgdXNlcikpO1xuICAgICAgICAvLyBtb3ZlIGN1cnJlbnQgZ2FtZSB0byB0aGUgZnJvbnRcbiAgICAgICAgY29uc3QgY3VycmVudEdhbWVJbmRleCA9IGdhbWVzLmZpbmRJbmRleChnYW1lID0+IGdhbWUuZ2V0SUQoKSA9PT0gdXNlci5nZXRDdXJyZW50R2FtZUlEKCkpO1xuICAgICAgICBpZiAoY3VycmVudEdhbWVJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50R2FtZSA9IGdhbWVzW2N1cnJlbnRHYW1lSW5kZXhdO1xuICAgICAgICAgIGdhbWVzLnNwbGljZShjdXJyZW50R2FtZUluZGV4LCAxKTtcbiAgICAgICAgICBnYW1lcy51bnNoaWZ0KGN1cnJlbnRHYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2FtZXM7XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBfZ2VuQ3JlYXRlR2FtZShcbiAgICBibGFja1VzZXJJRDogbnVtYmVyLFxuICAgIHdoaXRlVXNlcklEOiBudW1iZXIsXG4gICAgYm9hcmRTaXplOiBCb2FyZFNpemUsXG4gICAgaGFuZGljYXA6IG51bWJlcixcbiAgICBrb21pOiBudW1iZXIsXG4gICk6IFByb21pc2U8R29HYW1lPiB7XG4gICAgY29uc3QgYm9hcmQgPSBHb0JvYXJkLmNyZWF0ZU5ld0JvYXJkKGJvYXJkU2l6ZSwgaGFuZGljYXApO1xuICAgIHJldHVybiBtb2RlbHMuR2FtZS5jcmVhdGUoe1xuICAgICAgYmxhY2tVc2VySUQ6IGJsYWNrVXNlcklELFxuICAgICAgd2hpdGVVc2VySUQ6IHdoaXRlVXNlcklELFxuICAgICAgaXNCbGFja1R1cm46IGJvYXJkLmdldElzQmxhY2tUdXJuKCksXG4gICAgICB3ZWlxaUNvbnNlY3V0aXZlUGFzc2VzOiAwLFxuICAgICAgd2VpcWlIaXN0b3J5OiBKU09OLnN0cmluZ2lmeShib2FyZC5nZXRXZWlxaUJvYXJkSGlzdG9yeSgpKSxcbiAgICAgIHdlaXFpQm9hcmQ6IEpTT04uc3RyaW5naWZ5KGJvYXJkLmdldFdlaXFpQm9hcmQoKSksXG4gICAgICB3ZWlxaUJvYXJkU2l6ZTogYm9hcmRTaXplLFxuICAgICAgYm9hcmRJbWFnZVVSTDogJy4uLy4uL2ltYWdlcy9lbXB0eUJvYXJkLW1pbi5qcGcnLFxuICAgICAgc3RhdHVzOiBHYW1lU3RhdHVzLlBMQVlJTkcsXG4gICAgICBzdG9uZXNIaXN0b3J5OiBKU09OLnN0cmluZ2lmeShib2FyZC5nZXRTdG9uZU1vdmVzKCkpLFxuICAgICAgaGFuZGljYXA6IGhhbmRpY2FwLFxuICAgICAga29taToga29taSxcbiAgICB9KS50aGVuKChnYW1lTW9kZWw6IFNlcXVlbGl6ZU1vZGVsKTogR29HYW1lID0+IHtcbiAgICAgIHJldHVybiBHb0dhbWUuZnJvbU1vZGVsKGdhbWVNb2RlbCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuQ3JlYXRlR2FtZShcbiAgICBibGFja1VzZXI6IFVzZXIsXG4gICAgd2hpdGVVc2VyOiBVc2VyLFxuICAgIGJvYXJkU2l6ZTogQm9hcmRTaXplLFxuICAgIGhhbmRpY2FwOiBudW1iZXIsXG4gICAga29taTogbnVtYmVyLFxuICApOiBQcm9taXNlPEdvR2FtZT4ge1xuICAgIHZhciBnYW1lID0gYXdhaXQgR29HYW1lLl9nZW5DcmVhdGVHYW1lKFxuICAgICAgYmxhY2tVc2VyLmdldElEKCksXG4gICAgICB3aGl0ZVVzZXIuZ2V0SUQoKSxcbiAgICAgIGJvYXJkU2l6ZSxcbiAgICAgIGhhbmRpY2FwLFxuICAgICAga29taSxcbiAgICApO1xuXG4gICAgLy8gZm9yIHBlcmZvcm1hbmNlLFxuICAgIGdhbWUuX2JsYWNrVXNlciA9IGJsYWNrVXNlcjtcbiAgICBnYW1lLl93aGl0ZVVzZXIgPSB3aGl0ZVVzZXI7XG5cbiAgICAvLyBzZXQgdGhlIHVzZXIgc3RhdGVzXG4gICAgaWYgKGdhbWUuaXNTZWxmUGxheWluZ0dhbWUoKSkge1xuICAgICAgYXdhaXQgYmxhY2tVc2VyLmdlblNldFBsYXlHYW1lKGdhbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGJsYWNrVXNlci5nZW5TZXRQbGF5R2FtZShnYW1lKSxcbiAgICAgICAgd2hpdGVVc2VyLmdlblNldFBsYXlHYW1lKGdhbWUpLFxuICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiBnYW1lO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdvR2FtZTtcbiJdfQ==
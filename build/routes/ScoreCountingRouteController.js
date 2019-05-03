

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var genScoringJson = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(scoring, user) {
    var fields, opponentUser, language;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fields = scoring.toJson();
            _context.next = 3;
            return scoring.genCreator();

          case 3:
            opponentUser = _context.sent;
            language = user.getLanguage();
            return _context.abrupt('return', _extends({}, fields, {
              isCreator: fields.creatorID === user.getID(),
              requestedByText: (0, _Translator.got)('countScore.requestedByLabel', language, { name: opponentUser.getFirstName() })
            }));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function genScoringJson(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _Translator = require('../translations/Translator');

var _Game = require('../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _GameScoring = require('../class/GameScoring');

var _GameScoring2 = _interopRequireDefault(_GameScoring);

var _PostBackUtils = require('../response/PostBackUtils');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

var _GameUtils = require('../utils/GameUtils');

var _GameUtils2 = _interopRequireDefault(_GameUtils);

var _ClassEnums = require('../class/ClassEnums');

var _RouteControllerBase2 = require('./RouteControllerBase');

var _RouteControllerBase3 = _interopRequireDefault(_RouteControllerBase2);

var _ResignGameHandler = require('../response/game/ResignGameHandler');

var _ResignGameHandler2 = _interopRequireDefault(_ResignGameHandler);

var _LoggingEnums = require('../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoreCountingRouteController = function (_RouteControllerBase) {
  _inherits(ScoreCountingRouteController, _RouteControllerBase);

  function ScoreCountingRouteController() {
    _classCallCheck(this, ScoreCountingRouteController);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoreCountingRouteController).apply(this, arguments));
  }

  _createClass(ScoreCountingRouteController, [{
    key: 'getName',
    value: function getName() {
      return 'countScore';
    }
  }, {
    key: 'getRouterEvent',
    value: function getRouterEvent() {
      return _LoggingEnums.LoggingEvent.LOAD_COUNT_SCORE_VIEW;
    }
  }, {
    key: 'getLoadMessengerExtension',
    value: function getLoadMessengerExtension() {
      return true;
    }
  }, {
    key: 'getPageTitle',
    value: function getPageTitle(lan) {
      return (0, _Translator.got)('button.countScore', lan);
    }
  }, {
    key: 'genClientContainerParams',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user, req) {
        var language, game, _ref, _ref2, gameInfo, scorings, scoringsJson;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                language = user.getLanguage();
                _context2.next = 3;
                return _Game2.default.genEnforce(req.query.gameID);

              case 3:
                game = _context2.sent;
                _context2.next = 6;
                return _bluebird2.default.all([_GameUtils2.default.genGameInfo(user.getID(), language, game), _GameScoring2.default.genAllByGameID(game.getID())]);

              case 6:
                _ref = _context2.sent;
                _ref2 = _slicedToArray(_ref, 2);
                gameInfo = _ref2[0];
                scorings = _ref2[1];
                _context2.next = 12;
                return _bluebird2.default.all(scorings.map(function (s) {
                  return genScoringJson(s, user);
                }));

              case 12:
                scoringsJson = _context2.sent;


                gameInfo = _extends({}, gameInfo, {
                  // handle resigned game info,
                  isOver: game.isOver(),
                  scoreText: game.getScoreText()
                });

                return _context2.abrupt('return', {
                  gameInfo: gameInfo,
                  scorings: scoringsJson,
                  defaultScoringID: parseInt(req.query.defaultScoringID, 10),
                  text: {
                    submitButton: (0, _Translator.got)('button.sendScoreRequest', language),
                    createNewScoreButton: (0, _Translator.got)('countScore.createNewScoringButton', language),
                    doYouAgreeScoringText: (0, _Translator.got)('countScore.doYouAgreeScoringText', language),
                    explainInfoText: (0, _Translator.got)('countScore.explainInfoText', language),
                    updateButton: (0, _Translator.got)('button.updateScore', language),
                    acceptButton: (0, _Translator.got)('countScore.acceptButton', language),
                    rejectButton: (0, _Translator.got)('countScore.rejectButton', language),
                    pendingLabel: (0, _Translator.got)('countScore.pendingLabel', language),
                    rejectedLabel: (0, _Translator.got)('countScore.rejectedLabel', language),
                    black: (0, _Translator.got)('Black', language),
                    white: (0, _Translator.got)('White', language),
                    totalScore: (0, _Translator.got)('countScore.totalScore', language),
                    cancelButton: (0, _Translator.got)('button.cancel', language),
                    scoringListHeader: (0, _Translator.got)('countScore.scoringListHeader', language)
                  }
                });

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genClientContainerParams(_x3, _x4) {
        return ref.apply(this, arguments);
      }

      return genClientContainerParams;
    }()
  }, {
    key: 'getJS',
    value: function getJS() {
      return ['vendor/wgo.min.js', 'vendor/wgo.player.min.js', 'web/ScoreCountingContainer.' + _config2.default.env + '.js'];
    }
  }, {
    key: 'getCSS',
    value: function getCSS() {
      return ['webviewCommon.css', 'simulateBoard.css', 'vendor/wgo.player.css'];
    }
  }]);

  return ScoreCountingRouteController;
}(_RouteControllerBase3.default);

var controller = new ScoreCountingRouteController();

controller.post('create', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(user, params, res) {
    var game, scorings, scoring, opponent, winnerColor, opponentName, _game, _opponent, language, _scoring$getWhiteAndB, _scoring$getWhiteAndB2, whiteScore, blackScore, _winnerColor;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Game2.default.genEnforce(params.gameID);

          case 2:
            game = _context3.sent;

            game.enforceUser(user.getID());

            if (game.isCountingScore()) {
              _context3.next = 6;
              break;
            }

            throw new Error('Game is not finished yet');

          case 6:
            _context3.next = 8;
            return _GameScoring2.default.genAllByGameID(params.gameID);

          case 8:
            scorings = _context3.sent;

            if (!(scorings.length > 0 && scorings[0].getCreatorID() === user.getID())) {
              _context3.next = 11;
              break;
            }

            throw new Error('User already created scoring for the game');

          case 11:
            _context3.next = 13;
            return _GameScoring2.default.genCreate(user.getID(), params.gameID, parseInt(params.blackTerritory, 10), parseInt(params.blackCapture, 10), parseInt(params.whiteTerritory, 10), parseInt(params.whiteCapture, 10), JSON.parse(params.board));

          case 13:
            scoring = _context3.sent;

            if (!game.isSelfPlayingGame()) {
              _context3.next = 36;
              break;
            }

            _context3.next = 17;
            return _GameScoring2.default.genByIDAndGameID(scoring.getID(), params.gameID);

          case 17:
            scoring = _context3.sent;
            _context3.next = 20;
            return scoring.genAccept();

          case 20:
            _context3.next = 22;
            return _Game2.default.genEnforce(params.gameID);

          case 22:
            game = _context3.sent;
            _context3.next = 25;
            return game.genOpponentUser(user.getID());

          case 25:
            opponent = _context3.sent;


            // send message to self
            winnerColor = game.getStatus() === _ClassEnums.GameStatus.BLACK_WINS ? (0, _Translator.got)('Black', user.getLanguage()) : (0, _Translator.got)('White', user.getLanguage());
            opponentName = (0, _Translator.got)('inGameMessage.self', user.getLanguage());

            _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('countScore.winsByText', user.getLanguage(), { opponentName: opponentName, color: winnerColor, score: game.getWinsBy() }));

            _context3.next = 31;
            return _User2.default.genByUserID(user.getID());

          case 31:
            user = _context3.sent;
            _context3.next = 34;
            return _ResignGameHandler2.default.genSendEndGameMessage(user);

          case 34:
            _context3.next = 52;
            break;

          case 36:
            _context3.next = 38;
            return _GameScoring2.default.genByIDAndGameID(scoring.getID(), params.gameID);

          case 38:
            scoring = _context3.sent;
            _context3.next = 41;
            return _Game2.default.genEnforce(params.gameID);

          case 41:
            _game = _context3.sent;
            _context3.next = 44;
            return _game.genOpponentUser(user.getID());

          case 44:
            _opponent = _context3.sent;
            language = _opponent.getLanguage();
            _scoring$getWhiteAndB = scoring.getWhiteAndBlackScores();
            _scoring$getWhiteAndB2 = _slicedToArray(_scoring$getWhiteAndB, 2);
            whiteScore = _scoring$getWhiteAndB2[0];
            blackScore = _scoring$getWhiteAndB2[1];
            _winnerColor = blackScore > whiteScore ? (0, _Translator.got)('Black', language) : (0, _Translator.got)('White', language);


            _fbLocalChatBot2.default.sendButtons(_opponent.getFBID(), (0, _Translator.got)('countScore.createdScoringMessage', language, { opponentName: user.getFirstName(), color: _winnerColor, score: Math.abs(whiteScore - blackScore) }), [(0, _PostBackUtils.getCountScoreURLButton)((0, _Translator.got)('countScore.seeScoringButton', language), _opponent, { gameID: _game.getID(), defaultScoringID: scoring.getID() })]);

          case 52:
            res.send('');

          case 53:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));
  return function (_x5, _x6, _x7) {
    return ref.apply(this, arguments);
  };
}());

controller.post('update', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(user, params, res) {
    var scoring, game, opponent, _scoring$getWhiteAndB3, _scoring$getWhiteAndB4, whiteScore, blackScore, language, winnerColor;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _GameScoring2.default.genByIDAndGameID(params.scoringID, params.gameID);

          case 2:
            scoring = _context4.sent;

            if (scoring) {
              _context4.next = 5;
              break;
            }

            throw new Error('Scoring doesn\'t exist');

          case 5:
            if (!(scoring.getCreatorID() !== user.getID())) {
              _context4.next = 7;
              break;
            }

            throw new Error('Only creator can update the score');

          case 7:
            if (!(scoring.getStatus() === _ClassEnums.GameScoringRequestStatus.ACCEPTED)) {
              _context4.next = 9;
              break;
            }

            throw new Error('Can only update pending or rejected scoring');

          case 9:

            scoring.setBlackTerritory(parseInt(params.blackTerritory, 10));
            scoring.setBlackCapture(parseInt(params.blackCapture, 10));
            scoring.setWhiteTerritory(parseInt(params.whiteTerritory, 10));
            scoring.setWhiteCapture(parseInt(params.whiteCapture, 10));
            scoring.setBoard(JSON.parse(params.board));
            scoring.setStatus(_ClassEnums.GameScoringRequestStatus.PENDING);

            if (!scoring._model.changed()) {
              _context4.next = 34;
              break;
            }

            _context4.next = 18;
            return scoring.genSave();

          case 18:
            _context4.next = 20;
            return _Game2.default.genEnforce(params.gameID);

          case 20:
            game = _context4.sent;
            _context4.next = 23;
            return game.genOpponentUser(user.getID());

          case 23:
            opponent = _context4.sent;
            _context4.next = 26;
            return _GameScoring2.default.genByIDAndGameID(scoring.getID(), params.gameID);

          case 26:
            scoring = _context4.sent;
            _scoring$getWhiteAndB3 = scoring.getWhiteAndBlackScores();
            _scoring$getWhiteAndB4 = _slicedToArray(_scoring$getWhiteAndB3, 2);
            whiteScore = _scoring$getWhiteAndB4[0];
            blackScore = _scoring$getWhiteAndB4[1];
            language = opponent.getLanguage();
            winnerColor = blackScore > whiteScore ? (0, _Translator.got)('Black', language) : (0, _Translator.got)('White', language);


            _fbLocalChatBot2.default.sendButtons(opponent.getFBID(), (0, _Translator.got)('countScore.updatedScoringMessage', language, { opponentName: user.getFirstName(), color: winnerColor, score: Math.abs(whiteScore - blackScore) }), [(0, _PostBackUtils.getCountScoreURLButton)((0, _Translator.got)('countScore.seeScoringButton', language), opponent, { gameID: game.getID(), defaultScoringID: scoring.getID() })]);

          case 34:
            res.send('');

          case 35:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));
  return function (_x8, _x9, _x10) {
    return ref.apply(this, arguments);
  };
}());

controller.post('accept', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(user, params, res) {
    var game, scoring, opponent, winnerColor, language;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Game2.default.genEnforce(params.gameID);

          case 2:
            game = _context5.sent;

            game.enforceUser(user.getID());

            _context5.next = 6;
            return _GameScoring2.default.genByIDAndGameID(params.scoringID, params.gameID);

          case 6:
            scoring = _context5.sent;

            if (scoring) {
              _context5.next = 9;
              break;
            }

            throw new Error('Scoring doesn\'t exist');

          case 9:
            if (!(scoring.getCreatorID() === user.getID())) {
              _context5.next = 11;
              break;
            }

            throw new Error('Can not accept your own scoring!');

          case 11:
            _context5.next = 13;
            return scoring.genAccept();

          case 13:
            _context5.next = 15;
            return _Game2.default.genEnforce(params.gameID);

          case 15:
            game = _context5.sent;
            _context5.next = 18;
            return game.genOpponentUser(user.getID());

          case 18:
            opponent = _context5.sent;


            // send message to self
            winnerColor = game.getStatus() === _ClassEnums.GameStatus.BLACK_WINS ? (0, _Translator.got)('Black', user.getLanguage()) : (0, _Translator.got)('White', user.getLanguage());

            _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('countScore.winsByText', user.getLanguage(), { opponentName: opponent.getFirstName(), color: winnerColor, score: game.getWinsBy() }));
            _context5.next = 23;
            return _User2.default.genByUserID(user.getID());

          case 23:
            user = _context5.sent;

            _ResignGameHandler2.default.genSendEndGameMessage(user);

            // send message to opponent
            language = opponent.getLanguage();

            winnerColor = game.getStatus() === _ClassEnums.GameStatus.BLACK_WINS ? (0, _Translator.got)('Black', language) : (0, _Translator.got)('White', language);

            _fbLocalChatBot2.default.sendText(opponent.getFBID(), (0, _Translator.got)('countScore.acceptSelfScoringMessage', language, { opponentName: user.getFirstName() }) + (0, _Translator.got)('countScore.winsByText', language, { opponentName: user.getFirstName(), color: winnerColor, score: game.getWinsBy() }));
            _ResignGameHandler2.default.genSendEndGameMessage(opponent);
            res.send('');

          case 30:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));
  return function (_x11, _x12, _x13) {
    return ref.apply(this, arguments);
  };
}());

controller.post('reject', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(user, params, res) {
    var game, scoring, opponent, language;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Game2.default.genEnforce(params.gameID);

          case 2:
            game = _context6.sent;

            game.enforceUser(user.getID());

            _context6.next = 6;
            return _GameScoring2.default.genByIDAndGameID(params.scoringID, params.gameID);

          case 6:
            scoring = _context6.sent;

            if (scoring) {
              _context6.next = 9;
              break;
            }

            throw new Error('Scoring doesn\'t exist');

          case 9:
            if (!(scoring.getCreatorID() === user.getID())) {
              _context6.next = 11;
              break;
            }

            throw new Error('Cannot reject your own scoring!');

          case 11:

            scoring.setStatus(_ClassEnums.GameScoringRequestStatus.REJECTED);

            if (!scoring._model.changed()) {
              _context6.next = 20;
              break;
            }

            _context6.next = 15;
            return scoring.genSave();

          case 15:
            _context6.next = 17;
            return game.genOpponentUser(user.getID());

          case 17:
            opponent = _context6.sent;
            language = opponent.getLanguage();

            _fbLocalChatBot2.default.sendButtons(opponent.getFBID(), (0, _Translator.got)('countScore.rejectScoringMessage', language, { opponentName: user.getFirstName() }), [(0, _PostBackUtils.getCountScoreURLButton)((0, _Translator.got)('countScore.seeScoringButton', language), opponent, { gameID: game.getID(), defaultScoringID: scoring.getID() })]);

          case 20:
            res.send('');

          case 21:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));
  return function (_x14, _x15, _x16) {
    return ref.apply(this, arguments);
  };
}());
module.exports = controller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvU2NvcmVDb3VudGluZ1JvdXRlQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7Ozs7Ozs7OzZEQWdCQSxpQkFBOEIsT0FBOUIsRUFBb0QsSUFBcEQ7QUFBQSxRQUNRLE1BRFIsRUFFUSxZQUZSLEVBR1EsUUFIUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1Esa0JBRFIsR0FDaUIsUUFBUSxNQUFSLEVBRGpCO0FBQUE7QUFBQSxtQkFFNkIsUUFBUSxVQUFSLEVBRjdCOztBQUFBO0FBRVEsd0JBRlI7QUFHUSxvQkFIUixHQUdtQixLQUFLLFdBQUwsRUFIbkI7QUFBQSwwREFNTyxNQU5QO0FBT0kseUJBQVcsT0FBTyxTQUFQLEtBQXFCLEtBQUssS0FBTCxFQVBwQztBQVFJLCtCQUFpQixxQkFBSSw2QkFBSixFQUFtQyxRQUFuQyxFQUE2QyxFQUFDLE1BQU0sYUFBYSxZQUFiLEVBQVAsRUFBN0M7QUFSckI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRztrQkFBZSxjOzs7OztBQWJmOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQWNNLDRCOzs7Ozs7Ozs7Ozs4QkFDYztBQUNoQixhQUFPLFlBQVA7QUFDRDs7O3FDQUV3QjtBQUN2QixhQUFPLDJCQUFhLHFCQUFwQjtBQUNEOzs7Z0RBRW9DO0FBQ25DLGFBQU8sSUFBUDtBQUNEOzs7aUNBRVksRyxFQUFxQjtBQUNoQyxhQUFPLHFCQUFJLG1CQUFKLEVBQXlCLEdBQXpCLENBQVA7QUFDRDs7OzttRkFFOEIsSSxFQUFZLEc7WUFDbkMsUSxFQUNBLEksZUFDRCxRLEVBQVUsUSxFQUlULFk7Ozs7OztBQU5BLHdCLEdBQVcsS0FBSyxXQUFMLEU7O3VCQUNFLGVBQU8sVUFBUCxDQUFrQixJQUFJLEtBQUosQ0FB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REYsRUFFRSxxQkFBSSxpQ0FBSixFQUF1QyxRQUF2QyxFQUFpRCxFQUFDLGNBQWMsS0FBSyxZQUFMLEVBQWYsRUFBakQsQ0FGRixFQUdFLENBQ0UsMkNBQ0UscUJBQUksNkJBQUosRUFBbUMsUUFBbkMsQ0FERixFQUNnRCxRQURoRCxFQUMwRCxFQUFDLFFBQVEsS0FBSyxLQUFMLEVBQVQsRUFBdUIsa0JBQWtCLFFBQVEsS0FBUixFQUF6QyxFQUQxRCxDQURGLENBSEY7O0FBdEJzQjtBQWdDeEIsZ0JBQUksSUFBSixDQUFTLEVBQVQ7O0FBaEN3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0NBLE9BQU8sT0FBUCxHQUFpQixVQUFqQiIsImZpbGUiOiJTY29yZUNvdW50aW5nUm91dGVDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCB7Z290fSBmcm9tICcuLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRvcic7XG5pbXBvcnQgR29HYW1lIGZyb20gJy4uL2NsYXNzL0dhbWUnO1xuaW1wb3J0IEdhbWVTY29yaW5nIGZyb20gJy4uL2NsYXNzL0dhbWVTY29yaW5nJztcbmltcG9ydCB7Z2V0Q291bnRTY29yZVVSTEJ1dHRvbn0gZnJvbSAnLi4vcmVzcG9uc2UvUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBHYW1lVXRpbHMgZnJvbSAnLi4vdXRpbHMvR2FtZVV0aWxzJztcbmltcG9ydCB7R2FtZVNjb3JpbmdSZXF1ZXN0U3RhdHVzLCBHYW1lU3RhdHVzfSBmcm9tICcuLi9jbGFzcy9DbGFzc0VudW1zJztcbmltcG9ydCBSb3V0ZUNvbnRyb2xsZXJCYXNlIGZyb20gJy4vUm91dGVDb250cm9sbGVyQmFzZSc7XG5pbXBvcnQgUmVzaWduR2FtZUhhbmRsZXIgZnJvbSAnLi4vcmVzcG9uc2UvZ2FtZS9SZXNpZ25HYW1lSGFuZGxlcic7XG5pbXBvcnQge0xvZ2dpbmdFdmVudH0gZnJvbSAnLi4vbG9nZ2luZy9Mb2dnaW5nRW51bXMnO1xuXG5hc3luYyBmdW5jdGlvbiBnZW5TY29yaW5nSnNvbihzY29yaW5nOiBHYW1lU2NvcmluZywgdXNlcjogVXNlcik6IFByb21pc2U8T2JqZWN0PiB7XG4gIGNvbnN0IGZpZWxkcyA9IHNjb3JpbmcudG9Kc29uKCk7XG4gIGNvbnN0IG9wcG9uZW50VXNlciA9IGF3YWl0IHNjb3JpbmcuZ2VuQ3JlYXRvcigpO1xuICBjb25zdCBsYW5ndWFnZSA9IHVzZXIuZ2V0TGFuZ3VhZ2UoKTtcblxuICByZXR1cm4ge1xuICAgIC4uLmZpZWxkcyxcbiAgICBpc0NyZWF0b3I6IGZpZWxkcy5jcmVhdG9ySUQgPT09IHVzZXIuZ2V0SUQoKSxcbiAgICByZXF1ZXN0ZWRCeVRleHQ6IGdvdCgnY291bnRTY29yZS5yZXF1ZXN0ZWRCeUxhYmVsJywgbGFuZ3VhZ2UsIHtuYW1lOiBvcHBvbmVudFVzZXIuZ2V0Rmlyc3ROYW1lKCl9KSxcbiAgfTtcbn1cblxuY2xhc3MgU2NvcmVDb3VudGluZ1JvdXRlQ29udHJvbGxlciBleHRlbmRzIFJvdXRlQ29udHJvbGxlckJhc2Uge1xuICBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdjb3VudFNjb3JlJztcbiAgfVxuXG4gIGdldFJvdXRlckV2ZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIExvZ2dpbmdFdmVudC5MT0FEX0NPVU5UX1NDT1JFX1ZJRVc7XG4gIH1cblxuICBnZXRMb2FkTWVzc2VuZ2VyRXh0ZW5zaW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0UGFnZVRpdGxlKGxhbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ290KCdidXR0b24uY291bnRTY29yZScsIGxhbik7XG4gIH1cblxuICBhc3luYyBnZW5DbGllbnRDb250YWluZXJQYXJhbXModXNlcjogVXNlciwgcmVxOiBPYmplY3QpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIGNvbnN0IGxhbmd1YWdlID0gdXNlci5nZXRMYW5ndWFnZSgpO1xuICAgIGNvbnN0IGdhbWUgPSBhd2FpdCBHb0dhbWUuZ2VuRW5mb3JjZShyZXEucXVlcnkuZ2FtZUlEKTtcbiAgICBsZXQgW2dhbWVJbmZvLCBzY29yaW5nc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBHYW1lVXRpbHMuZ2VuR2FtZUluZm8odXNlci5nZXRJRCgpLCBsYW5ndWFnZSwgZ2FtZSksXG4gICAgICBHYW1lU2NvcmluZy5nZW5BbGxCeUdhbWVJRChnYW1lLmdldElEKCkpLFxuICAgIF0pO1xuICAgIGNvbnN0IHNjb3JpbmdzSnNvbiA9IGF3YWl0IFByb21pc2UuYWxsKHNjb3JpbmdzLm1hcChzID0+IGdlblNjb3JpbmdKc29uKHMsIHVzZXIpKSk7XG5cbiAgICBnYW1lSW5mbyA9IHtcbiAgICAgIC4uLmdhbWVJbmZvLFxuICAgICAgLy8gaGFuZGxlIHJlc2lnbmVkIGdhbWUgaW5mbyxcbiAgICAgIGlzT3ZlcjogZ2FtZS5pc092ZXIoKSxcbiAgICAgIHNjb3JlVGV4dDogZ2FtZS5nZXRTY29yZVRleHQoKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdhbWVJbmZvLFxuICAgICAgc2NvcmluZ3M6IHNjb3JpbmdzSnNvbixcbiAgICAgIGRlZmF1bHRTY29yaW5nSUQ6IHBhcnNlSW50KHJlcS5xdWVyeS5kZWZhdWx0U2NvcmluZ0lELCAxMCksXG4gICAgICB0ZXh0OiB7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbjogZ290KCdidXR0b24uc2VuZFNjb3JlUmVxdWVzdCcsIGxhbmd1YWdlKSxcbiAgICAgICAgY3JlYXRlTmV3U2NvcmVCdXR0b246IGdvdCgnY291bnRTY29yZS5jcmVhdGVOZXdTY29yaW5nQnV0dG9uJywgbGFuZ3VhZ2UpLFxuICAgICAgICBkb1lvdUFncmVlU2NvcmluZ1RleHQ6IGdvdCgnY291bnRTY29yZS5kb1lvdUFncmVlU2NvcmluZ1RleHQnLCBsYW5ndWFnZSksXG4gICAgICAgIGV4cGxhaW5JbmZvVGV4dDogZ290KCdjb3VudFNjb3JlLmV4cGxhaW5JbmZvVGV4dCcsIGxhbmd1YWdlKSxcbiAgICAgICAgdXBkYXRlQnV0dG9uOiBnb3QoJ2J1dHRvbi51cGRhdGVTY29yZScsIGxhbmd1YWdlKSxcbiAgICAgICAgYWNjZXB0QnV0dG9uOiBnb3QoJ2NvdW50U2NvcmUuYWNjZXB0QnV0dG9uJywgbGFuZ3VhZ2UpLFxuICAgICAgICByZWplY3RCdXR0b246IGdvdCgnY291bnRTY29yZS5yZWplY3RCdXR0b24nLCBsYW5ndWFnZSksXG4gICAgICAgIHBlbmRpbmdMYWJlbDogZ290KCdjb3VudFNjb3JlLnBlbmRpbmdMYWJlbCcsIGxhbmd1YWdlKSxcbiAgICAgICAgcmVqZWN0ZWRMYWJlbDogZ290KCdjb3VudFNjb3JlLnJlamVjdGVkTGFiZWwnLCBsYW5ndWFnZSksXG4gICAgICAgIGJsYWNrOiBnb3QoJ0JsYWNrJywgbGFuZ3VhZ2UpLFxuICAgICAgICB3aGl0ZTogZ290KCdXaGl0ZScsIGxhbmd1YWdlKSxcbiAgICAgICAgdG90YWxTY29yZTogZ290KCdjb3VudFNjb3JlLnRvdGFsU2NvcmUnLCBsYW5ndWFnZSksXG4gICAgICAgIGNhbmNlbEJ1dHRvbjogZ290KCdidXR0b24uY2FuY2VsJywgbGFuZ3VhZ2UpLFxuICAgICAgICBzY29yaW5nTGlzdEhlYWRlcjogZ290KCdjb3VudFNjb3JlLnNjb3JpbmdMaXN0SGVhZGVyJywgbGFuZ3VhZ2UpLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SlMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIFtcbiAgICAgICd2ZW5kb3Ivd2dvLm1pbi5qcycsXG4gICAgICAndmVuZG9yL3dnby5wbGF5ZXIubWluLmpzJyxcbiAgICAgIGB3ZWIvU2NvcmVDb3VudGluZ0NvbnRhaW5lci4ke2NvbmZpZy5lbnZ9LmpzYCxcbiAgICBdO1xuICB9XG5cbiAgZ2V0Q1NTKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBbXG4gICAgICAnd2Vidmlld0NvbW1vbi5jc3MnLFxuICAgICAgJ3NpbXVsYXRlQm9hcmQuY3NzJyxcbiAgICAgICd2ZW5kb3Ivd2dvLnBsYXllci5jc3MnLFxuICAgIF07XG4gIH1cbn1cblxuY29uc3QgY29udHJvbGxlciA9IG5ldyBTY29yZUNvdW50aW5nUm91dGVDb250cm9sbGVyKCk7XG5cbmNvbnRyb2xsZXIucG9zdCgnY3JlYXRlJywgYXN5bmMgKHVzZXI6IFVzZXIsIHBhcmFtczogT2JqZWN0LCByZXM6IE9iamVjdCkgPT4ge1xuICBsZXQgZ2FtZSA9IGF3YWl0IEdvR2FtZS5nZW5FbmZvcmNlKHBhcmFtcy5nYW1lSUQpO1xuICBnYW1lLmVuZm9yY2VVc2VyKHVzZXIuZ2V0SUQoKSk7XG5cbiAgaWYgKCFnYW1lLmlzQ291bnRpbmdTY29yZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdHYW1lIGlzIG5vdCBmaW5pc2hlZCB5ZXQnKTtcbiAgfVxuXG4gIGNvbnN0IHNjb3JpbmdzID0gYXdhaXQgR2FtZVNjb3JpbmcuZ2VuQWxsQnlHYW1lSUQocGFyYW1zLmdhbWVJRCk7XG4gIGlmIChzY29yaW5ncy5sZW5ndGggPiAwICYmIHNjb3JpbmdzWzBdLmdldENyZWF0b3JJRCgpID09PSB1c2VyLmdldElEKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VzZXIgYWxyZWFkeSBjcmVhdGVkIHNjb3JpbmcgZm9yIHRoZSBnYW1lJyk7XG4gIH1cblxuICBsZXQgc2NvcmluZyA9IGF3YWl0IEdhbWVTY29yaW5nLmdlbkNyZWF0ZShcbiAgICB1c2VyLmdldElEKCksXG4gICAgcGFyYW1zLmdhbWVJRCxcbiAgICBwYXJzZUludChwYXJhbXMuYmxhY2tUZXJyaXRvcnksIDEwKSxcbiAgICBwYXJzZUludChwYXJhbXMuYmxhY2tDYXB0dXJlLCAxMCksXG4gICAgcGFyc2VJbnQocGFyYW1zLndoaXRlVGVycml0b3J5LCAxMCksXG4gICAgcGFyc2VJbnQocGFyYW1zLndoaXRlQ2FwdHVyZSwgMTApLFxuICAgIEpTT04ucGFyc2UocGFyYW1zLmJvYXJkKSxcbiAgKTtcblxuICBpZiAoZ2FtZS5pc1NlbGZQbGF5aW5nR2FtZSgpKSB7XG4gICAgc2NvcmluZyA9IGF3YWl0IEdhbWVTY29yaW5nLmdlbkJ5SURBbmRHYW1lSUQoc2NvcmluZy5nZXRJRCgpLCBwYXJhbXMuZ2FtZUlEKTtcbiAgICBhd2FpdCBzY29yaW5nLmdlbkFjY2VwdCgpO1xuXG4gICAgZ2FtZSA9IGF3YWl0IEdvR2FtZS5nZW5FbmZvcmNlKHBhcmFtcy5nYW1lSUQpOyAvLyBnZXQgdXBkYXRlZCBnYW1lXG4gICAgY29uc3Qgb3Bwb25lbnQgPSBhd2FpdCBnYW1lLmdlbk9wcG9uZW50VXNlcih1c2VyLmdldElEKCkpO1xuXG4gICAgLy8gc2VuZCBtZXNzYWdlIHRvIHNlbGZcbiAgICBjb25zdCB3aW5uZXJDb2xvciA9IGdhbWUuZ2V0U3RhdHVzKCkgPT09IEdhbWVTdGF0dXMuQkxBQ0tfV0lOU1xuICAgICAgPyBnb3QoJ0JsYWNrJywgdXNlci5nZXRMYW5ndWFnZSgpKVxuICAgICAgOiBnb3QoJ1doaXRlJywgdXNlci5nZXRMYW5ndWFnZSgpKTtcbiAgICBjb25zdCBvcHBvbmVudE5hbWUgPSBnb3QoJ2luR2FtZU1lc3NhZ2Uuc2VsZicsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSk7XG4gICAgQm90LnNlbmRUZXh0KFxuICAgICAgdXNlci5nZXRGQklEKCksXG4gICAgICBnb3QoJ2NvdW50U2NvcmUud2luc0J5VGV4dCcsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSwge29wcG9uZW50TmFtZSwgY29sb3I6IHdpbm5lckNvbG9yLCBzY29yZTogZ2FtZS5nZXRXaW5zQnkoKX0pLFxuICAgICk7XG5cbiAgICB1c2VyID0gYXdhaXQgVXNlci5nZW5CeVVzZXJJRCh1c2VyLmdldElEKCkpO1xuICAgIGF3YWl0IFJlc2lnbkdhbWVIYW5kbGVyLmdlblNlbmRFbmRHYW1lTWVzc2FnZSh1c2VyKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBzZW5kIG1lc3NhZ2UgdG8gb3Bwb25lbnRcbiAgICBzY29yaW5nID0gYXdhaXQgR2FtZVNjb3JpbmcuZ2VuQnlJREFuZEdhbWVJRChzY29yaW5nLmdldElEKCksIHBhcmFtcy5nYW1lSUQpO1xuICAgIGNvbnN0IGdhbWUgPSBhd2FpdCBHb0dhbWUuZ2VuRW5mb3JjZShwYXJhbXMuZ2FtZUlEKTtcbiAgICBjb25zdCBvcHBvbmVudCA9IGF3YWl0IGdhbWUuZ2VuT3Bwb25lbnRVc2VyKHVzZXIuZ2V0SUQoKSk7XG5cbiAgICBjb25zdCBsYW5ndWFnZSA9IG9wcG9uZW50LmdldExhbmd1YWdlKCk7XG4gICAgY29uc3QgW3doaXRlU2NvcmUsIGJsYWNrU2NvcmVdID0gc2NvcmluZy5nZXRXaGl0ZUFuZEJsYWNrU2NvcmVzKCk7XG4gICAgY29uc3Qgd2lubmVyQ29sb3IgPSBibGFja1Njb3JlID4gd2hpdGVTY29yZVxuICAgICAgPyBnb3QoJ0JsYWNrJywgbGFuZ3VhZ2UpXG4gICAgICA6IGdvdCgnV2hpdGUnLCBsYW5ndWFnZSk7XG5cbiAgICBCb3Quc2VuZEJ1dHRvbnMoXG4gICAgICBvcHBvbmVudC5nZXRGQklEKCksXG4gICAgICBnb3QoJ2NvdW50U2NvcmUuY3JlYXRlZFNjb3JpbmdNZXNzYWdlJywgbGFuZ3VhZ2UsIHtvcHBvbmVudE5hbWU6IHVzZXIuZ2V0Rmlyc3ROYW1lKCksIGNvbG9yOiB3aW5uZXJDb2xvciwgc2NvcmU6IE1hdGguYWJzKHdoaXRlU2NvcmUgLSBibGFja1Njb3JlKX0pLFxuICAgICAgW1xuICAgICAgICBnZXRDb3VudFNjb3JlVVJMQnV0dG9uKFxuICAgICAgICAgIGdvdCgnY291bnRTY29yZS5zZWVTY29yaW5nQnV0dG9uJywgbGFuZ3VhZ2UpLCBvcHBvbmVudCwge2dhbWVJRDogZ2FtZS5nZXRJRCgpLCBkZWZhdWx0U2NvcmluZ0lEOiBzY29yaW5nLmdldElEKCl9LFxuICAgICAgICApLFxuICAgICAgXSxcbiAgICApO1xuICB9XG4gIHJlcy5zZW5kKCcnKTtcbn0pO1xuXG5jb250cm9sbGVyLnBvc3QoJ3VwZGF0ZScsIGFzeW5jICh1c2VyOiBVc2VyLCBwYXJhbXM6IE9iamVjdCwgcmVzOiBPYmplY3QpID0+IHtcbiAgbGV0IHNjb3JpbmcgPSBhd2FpdCBHYW1lU2NvcmluZy5nZW5CeUlEQW5kR2FtZUlEKHBhcmFtcy5zY29yaW5nSUQsIHBhcmFtcy5nYW1lSUQpO1xuICBpZiAoIXNjb3JpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Njb3JpbmcgZG9lc25cXCd0IGV4aXN0Jyk7XG4gIH1cblxuICBpZiAoc2NvcmluZy5nZXRDcmVhdG9ySUQoKSAhPT0gdXNlci5nZXRJRCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IGNyZWF0b3IgY2FuIHVwZGF0ZSB0aGUgc2NvcmUnKTtcbiAgfVxuXG4gIGlmIChzY29yaW5nLmdldFN0YXR1cygpID09PSBHYW1lU2NvcmluZ1JlcXVlc3RTdGF0dXMuQUNDRVBURUQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBvbmx5IHVwZGF0ZSBwZW5kaW5nIG9yIHJlamVjdGVkIHNjb3JpbmcnKTtcbiAgfVxuXG4gIHNjb3Jpbmcuc2V0QmxhY2tUZXJyaXRvcnkocGFyc2VJbnQocGFyYW1zLmJsYWNrVGVycml0b3J5LCAxMCkpO1xuICBzY29yaW5nLnNldEJsYWNrQ2FwdHVyZShwYXJzZUludChwYXJhbXMuYmxhY2tDYXB0dXJlLCAxMCkpO1xuICBzY29yaW5nLnNldFdoaXRlVGVycml0b3J5KHBhcnNlSW50KHBhcmFtcy53aGl0ZVRlcnJpdG9yeSwgMTApKTtcbiAgc2NvcmluZy5zZXRXaGl0ZUNhcHR1cmUocGFyc2VJbnQocGFyYW1zLndoaXRlQ2FwdHVyZSwgMTApKTtcbiAgc2NvcmluZy5zZXRCb2FyZChKU09OLnBhcnNlKHBhcmFtcy5ib2FyZCkpO1xuICBzY29yaW5nLnNldFN0YXR1cyhHYW1lU2NvcmluZ1JlcXVlc3RTdGF0dXMuUEVORElORyk7XG5cbiAgaWYgKHNjb3JpbmcuX21vZGVsLmNoYW5nZWQoKSkge1xuICAgIGF3YWl0IHNjb3JpbmcuZ2VuU2F2ZSgpO1xuXG4gICAgLy8gc2VuZCBtZXNzYWdlIHRvIG9wcG9uZW50XG4gICAgY29uc3QgZ2FtZSA9IGF3YWl0IEdvR2FtZS5nZW5FbmZvcmNlKHBhcmFtcy5nYW1lSUQpO1xuICAgIGNvbnN0IG9wcG9uZW50ID0gYXdhaXQgZ2FtZS5nZW5PcHBvbmVudFVzZXIodXNlci5nZXRJRCgpKTtcbiAgICBzY29yaW5nID0gYXdhaXQgR2FtZVNjb3JpbmcuZ2VuQnlJREFuZEdhbWVJRChzY29yaW5nLmdldElEKCksIHBhcmFtcy5nYW1lSUQpO1xuXG4gICAgY29uc3QgW3doaXRlU2NvcmUsIGJsYWNrU2NvcmVdID0gc2NvcmluZy5nZXRXaGl0ZUFuZEJsYWNrU2NvcmVzKCk7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBvcHBvbmVudC5nZXRMYW5ndWFnZSgpO1xuXG4gICAgY29uc3Qgd2lubmVyQ29sb3IgPSBibGFja1Njb3JlID4gd2hpdGVTY29yZVxuICAgICAgPyBnb3QoJ0JsYWNrJywgbGFuZ3VhZ2UpXG4gICAgICA6IGdvdCgnV2hpdGUnLCBsYW5ndWFnZSk7XG5cbiAgICBCb3Quc2VuZEJ1dHRvbnMoXG4gICAgICBvcHBvbmVudC5nZXRGQklEKCksXG4gICAgICBnb3QoJ2NvdW50U2NvcmUudXBkYXRlZFNjb3JpbmdNZXNzYWdlJywgbGFuZ3VhZ2UsIHtvcHBvbmVudE5hbWU6IHVzZXIuZ2V0Rmlyc3ROYW1lKCksIGNvbG9yOiB3aW5uZXJDb2xvciwgc2NvcmU6IE1hdGguYWJzKHdoaXRlU2NvcmUgLSBibGFja1Njb3JlKX0pLFxuICAgICAgW1xuICAgICAgICBnZXRDb3VudFNjb3JlVVJMQnV0dG9uKFxuICAgICAgICAgIGdvdCgnY291bnRTY29yZS5zZWVTY29yaW5nQnV0dG9uJywgbGFuZ3VhZ2UpLCBvcHBvbmVudCwge2dhbWVJRDogZ2FtZS5nZXRJRCgpLCBkZWZhdWx0U2NvcmluZ0lEOiBzY29yaW5nLmdldElEKCl9LFxuICAgICAgICApLFxuICAgICAgXSxcbiAgICApO1xuICB9XG4gIHJlcy5zZW5kKCcnKTtcbn0pO1xuXG5jb250cm9sbGVyLnBvc3QoJ2FjY2VwdCcsIGFzeW5jICh1c2VyOiBVc2VyLCBwYXJhbXM6IE9iamVjdCwgcmVzOiBPYmplY3QpID0+IHtcbiAgbGV0IGdhbWUgPSBhd2FpdCBHb0dhbWUuZ2VuRW5mb3JjZShwYXJhbXMuZ2FtZUlEKTtcbiAgZ2FtZS5lbmZvcmNlVXNlcih1c2VyLmdldElEKCkpO1xuXG4gIGNvbnN0IHNjb3JpbmcgPSBhd2FpdCBHYW1lU2NvcmluZy5nZW5CeUlEQW5kR2FtZUlEKHBhcmFtcy5zY29yaW5nSUQsIHBhcmFtcy5nYW1lSUQpO1xuICBpZiAoIXNjb3JpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Njb3JpbmcgZG9lc25cXCd0IGV4aXN0Jyk7XG4gIH1cblxuICBpZiAoc2NvcmluZy5nZXRDcmVhdG9ySUQoKSA9PT0gdXNlci5nZXRJRCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VwdCB5b3VyIG93biBzY29yaW5nIScpO1xuICB9XG5cbiAgYXdhaXQgc2NvcmluZy5nZW5BY2NlcHQoKTtcbiAgZ2FtZSA9IGF3YWl0IEdvR2FtZS5nZW5FbmZvcmNlKHBhcmFtcy5nYW1lSUQpOyAvLyBnZXQgdXBkYXRlZCBnYW1lXG4gIGNvbnN0IG9wcG9uZW50ID0gYXdhaXQgZ2FtZS5nZW5PcHBvbmVudFVzZXIodXNlci5nZXRJRCgpKTtcblxuICAvLyBzZW5kIG1lc3NhZ2UgdG8gc2VsZlxuICBsZXQgd2lubmVyQ29sb3IgPSBnYW1lLmdldFN0YXR1cygpID09PSBHYW1lU3RhdHVzLkJMQUNLX1dJTlNcbiAgICA/IGdvdCgnQmxhY2snLCB1c2VyLmdldExhbmd1YWdlKCkpXG4gICAgOiBnb3QoJ1doaXRlJywgdXNlci5nZXRMYW5ndWFnZSgpKTtcbiAgQm90LnNlbmRUZXh0KFxuICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgIGdvdCgnY291bnRTY29yZS53aW5zQnlUZXh0JywgdXNlci5nZXRMYW5ndWFnZSgpLCB7b3Bwb25lbnROYW1lOiBvcHBvbmVudC5nZXRGaXJzdE5hbWUoKSwgY29sb3I6IHdpbm5lckNvbG9yLCBzY29yZTogZ2FtZS5nZXRXaW5zQnkoKX0pLFxuICApO1xuICB1c2VyID0gYXdhaXQgVXNlci5nZW5CeVVzZXJJRCh1c2VyLmdldElEKCkpO1xuICBSZXNpZ25HYW1lSGFuZGxlci5nZW5TZW5kRW5kR2FtZU1lc3NhZ2UodXNlcik7XG5cbiAgLy8gc2VuZCBtZXNzYWdlIHRvIG9wcG9uZW50XG4gIGNvbnN0IGxhbmd1YWdlID0gb3Bwb25lbnQuZ2V0TGFuZ3VhZ2UoKTtcbiAgd2lubmVyQ29sb3IgPSBnYW1lLmdldFN0YXR1cygpID09PSBHYW1lU3RhdHVzLkJMQUNLX1dJTlNcbiAgICA/IGdvdCgnQmxhY2snLCBsYW5ndWFnZSlcbiAgICA6IGdvdCgnV2hpdGUnLCBsYW5ndWFnZSk7XG5cbiAgQm90LnNlbmRUZXh0KFxuICAgIG9wcG9uZW50LmdldEZCSUQoKSxcbiAgICBnb3QoJ2NvdW50U2NvcmUuYWNjZXB0U2VsZlNjb3JpbmdNZXNzYWdlJywgbGFuZ3VhZ2UsIHtvcHBvbmVudE5hbWU6IHVzZXIuZ2V0Rmlyc3ROYW1lKCl9KSArXG4gICAgICBnb3QoJ2NvdW50U2NvcmUud2luc0J5VGV4dCcsIGxhbmd1YWdlLCB7b3Bwb25lbnROYW1lOiB1c2VyLmdldEZpcnN0TmFtZSgpLCBjb2xvcjogd2lubmVyQ29sb3IsIHNjb3JlOiBnYW1lLmdldFdpbnNCeSgpfSksXG4gICk7XG4gIFJlc2lnbkdhbWVIYW5kbGVyLmdlblNlbmRFbmRHYW1lTWVzc2FnZShvcHBvbmVudCk7XG4gIHJlcy5zZW5kKCcnKTtcbn0pO1xuXG5jb250cm9sbGVyLnBvc3QoJ3JlamVjdCcsIGFzeW5jICh1c2VyOiBVc2VyLCBwYXJhbXM6IE9iamVjdCwgcmVzOiBPYmplY3QpID0+IHtcbiAgY29uc3QgZ2FtZSA9IGF3YWl0IEdvR2FtZS5nZW5FbmZvcmNlKHBhcmFtcy5nYW1lSUQpO1xuICBnYW1lLmVuZm9yY2VVc2VyKHVzZXIuZ2V0SUQoKSk7XG5cbiAgY29uc3Qgc2NvcmluZyA9IGF3YWl0IEdhbWVTY29yaW5nLmdlbkJ5SURBbmRHYW1lSUQocGFyYW1zLnNjb3JpbmdJRCwgcGFyYW1zLmdhbWVJRCk7XG4gIGlmICghc2NvcmluZykge1xuICAgIHRocm93IG5ldyBFcnJvcignU2NvcmluZyBkb2VzblxcJ3QgZXhpc3QnKTtcbiAgfVxuXG4gIGlmIChzY29yaW5nLmdldENyZWF0b3JJRCgpID09PSB1c2VyLmdldElEKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZWplY3QgeW91ciBvd24gc2NvcmluZyEnKTtcbiAgfVxuXG4gIHNjb3Jpbmcuc2V0U3RhdHVzKEdhbWVTY29yaW5nUmVxdWVzdFN0YXR1cy5SRUpFQ1RFRCk7XG5cbiAgaWYgKHNjb3JpbmcuX21vZGVsLmNoYW5nZWQoKSkge1xuICAgIGF3YWl0IHNjb3JpbmcuZ2VuU2F2ZSgpO1xuXG4gICAgLy8gc2VuZCBtZXNzYWdlIHRvIG9wcG9uZW50XG4gICAgY29uc3Qgb3Bwb25lbnQgPSBhd2FpdCBnYW1lLmdlbk9wcG9uZW50VXNlcih1c2VyLmdldElEKCkpO1xuXG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBvcHBvbmVudC5nZXRMYW5ndWFnZSgpO1xuICAgIEJvdC5zZW5kQnV0dG9ucyhcbiAgICAgIG9wcG9uZW50LmdldEZCSUQoKSxcbiAgICAgIGdvdCgnY291bnRTY29yZS5yZWplY3RTY29yaW5nTWVzc2FnZScsIGxhbmd1YWdlLCB7b3Bwb25lbnROYW1lOiB1c2VyLmdldEZpcnN0TmFtZSgpfSksXG4gICAgICBbXG4gICAgICAgIGdldENvdW50U2NvcmVVUkxCdXR0b24oXG4gICAgICAgICAgZ290KCdjb3VudFNjb3JlLnNlZVNjb3JpbmdCdXR0b24nLCBsYW5ndWFnZSksIG9wcG9uZW50LCB7Z2FtZUlEOiBnYW1lLmdldElEKCksIGRlZmF1bHRTY29yaW5nSUQ6IHNjb3JpbmcuZ2V0SUQoKX0sXG4gICAgICAgICksXG4gICAgICBdLFxuICAgICk7XG4gIH1cbiAgcmVzLnNlbmQoJycpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRyb2xsZXI7XG4iXX0=
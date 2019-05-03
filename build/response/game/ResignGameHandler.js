

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MessageHandlerBase2 = require('../MessageHandlerBase');

var _MessageHandlerBase3 = _interopRequireDefault(_MessageHandlerBase2);

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _User = require('../../class/User');

var _User2 = _interopRequireDefault(_User);

var _Game = require('../../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _PostBackUtils = require('../PostBackUtils');

var _Translator = require('../../translations/Translator');

var _Logger = require('../../logging/Logger');

var _LoggingEnums = require('../../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResignGameHandler = function (_MessageHandlerBase) {
  _inherits(ResignGameHandler, _MessageHandlerBase);

  function ResignGameHandler() {
    _classCallCheck(this, ResignGameHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ResignGameHandler).apply(this, arguments));
  }

  _createClass(ResignGameHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.RESIGN_GAME;
    }
  }, {
    key: 'getParamObjectFromPostback',
    value: function getParamObjectFromPostback(paramsArray) {
      return {
        gameID: parseInt(paramsArray[0], 10)
      };
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user, params) {
        var gameID, game;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                gameID = params.gameID;

                if (user.isPlaying()) {
                  _context.next = 4;
                  break;
                }

                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('normalMessage.youAreNotPlayingAnyGame', user.getLanguage()));
                return _context.abrupt('return');

              case 4:
                if (!gameID) {
                  _context.next = 10;
                  break;
                }

                _context.next = 7;
                return _Game2.default.genEnforce(gameID);

              case 7:
                _context.t0 = _context.sent;
                _context.next = 11;
                break;

              case 10:
                _context.t0 = user.getCurrentGame();

              case 11:
                game = _context.t0;

                if (!game.isOver()) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return');

              case 14:
                _context.next = 16;
                return game.genResignGame(user.getID());

              case 16:
                _context.next = 18;
                return this.genSendMessage(game, user);

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genHandle(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return genHandle;
    }()
  }, {
    key: 'genSendEndGameMessage',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user) {
        var currentGame, language, _ref, _ref2, userActiveGames, userGameOpponent, opponentName, activeGameText;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                currentGame = user.getCurrentGame();
                language = user.getLanguage();

                if (!currentGame) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 5;
                return _bluebird2.default.all([_Game2.default.genActiveGamesForUser(user), currentGame.genOpponentUser(user.getID())]);

              case 5:
                _ref = _context2.sent;
                _ref2 = _slicedToArray(_ref, 2);
                userActiveGames = _ref2[0];
                userGameOpponent = _ref2[1];
                opponentName = currentGame.isSelfPlayingGame() ? (0, _Translator.got)('inGameMessage.self', language) : userGameOpponent.getFirstName();
                activeGameText = '';

                if (userActiveGames.length > 1) {
                  activeGameText = (0, _Translator.got)('inGameMessage.activeGameText', language, { numActiveGames: userActiveGames.length });
                }

                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('inGameMessage.focusOnGameWith', language, { opponentName: opponentName }) + ' ' + activeGameText);
                _context2.next = 16;
                break;

              case 15:
                (0, _PostBackUtils.sendNormalHelpMenu)(user, (0, _Translator.got)('inGameMessage.notPlayingWhatDoYouWantToDo', language));

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genSendEndGameMessage(_x3) {
        return ref.apply(this, arguments);
      }

      return genSendEndGameMessage;
    }()
  }, {
    key: 'genSendMessage',


    // game complete from counting
    /*
    (new Logger(user))
      .setEvent(LoggingEvent.GAME_FINISH)
      .setTargetClass(LoggingTargetClass.GAME)
      .setTargetID(game.getID())
      .log();
      */
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(game, user) {
        var opponentUserID, opponentUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('inGameMessage.selfQuitGame', user.getLanguage()));

                _context3.next = 3;
                return _User2.default.genByUserID(user.getID());

              case 3:
                user = _context3.sent;
                _context3.next = 6;
                return this.genSendEndGameMessage(user);

              case 6:
                if (game.isSelfPlayingGame()) {
                  _context3.next = 14;
                  break;
                }

                opponentUserID = game.getOpponentUserID(user.getID());
                _context3.next = 10;
                return _User2.default.genByUserID(opponentUserID);

              case 10:
                opponentUser = _context3.sent;


                _fbLocalChatBot2.default.sendText(opponentUser.getFBID(), (0, _Translator.got)('inGameMessage.enemyQuitGame', opponentUser.getLanguage(), { enemy: user.getFirstName() }));
                _context3.next = 14;
                return this.genSendEndGameMessage(opponentUser);

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genSendMessage(_x4, _x5) {
        return ref.apply(this, arguments);
      }

      return genSendMessage;
    }()
  }]);

  return ResignGameHandler;
}(_MessageHandlerBase3.default);

module.exports = new ResignGameHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL1Jlc2lnbkdhbWVIYW5kbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBTU0saUI7Ozs7Ozs7Ozs7O3NDQUNzQjtBQUN4QixhQUFPLDZCQUFjLFdBQXJCO0FBQ0Q7OzsrQ0FFMEIsVyxFQUFvQztBQUM3RCxhQUFPO0FBQ0wsZ0JBQVEsU0FBUyxZQUFZLENBQVosQ0FBVCxFQUF5QixFQUF6QjtBQURILE9BQVA7QUFHRDs7OztrRkFFZSxJLEVBQVksTTtZQUNwQixNLEVBTUEsSTs7Ozs7QUFOQSxzQixHQUFTLE9BQU8sTTs7b0JBQ2pCLEtBQUssU0FBTCxFOzs7OztBQUNILHlDQUFJLFFBQUosQ0FBYSxLQUFLLE9BQUwsRUFBYixFQUE2QixxQkFBSSx1Q0FBSixFQUE2QyxLQUFLLFdBQUwsRUFBN0MsQ0FBN0I7Ozs7cUJBSVcsTTs7Ozs7O3VCQUNILGVBQU8sVUFBUCxDQUFrQixNQUFsQixDOzs7Ozs7Ozs4QkFDTixLQUFLLGNBQUwsRTs7O0FBRkUsb0I7O3FCQUlGLEtBQUssTUFBTCxFOzs7Ozs7Ozs7dUJBSUUsS0FBSyxhQUFMLENBQW1CLEtBQUssS0FBTCxFQUFuQixDOzs7O3VCQUNBLEtBQUssY0FBTCxDQUFvQixJQUFwQixFQUEwQixJQUExQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21GQUdvQixJO1lBQ3BCLFcsRUFDQSxRLGVBR0csZSxFQUFpQixnQixFQUtwQixZLEVBSUEsYzs7Ozs7O0FBYkEsMkIsR0FBYyxLQUFLLGNBQUwsRTtBQUNkLHdCLEdBQVcsS0FBSyxXQUFMLEU7O3FCQUViLFc7Ozs7Ozt1QkFDZ0QsbUJBQVEsR0FBUixDQUFZLENBQzVELGVBQU8scUJBQVAsQ0FBNkIsSUFBN0IsQ0FENEQsRUFFNUQsWUFBWSxlQUFaLENBQTRCLEtBQUssS0FBTCxFQUE1QixDQUY0RCxDQUFaLEM7Ozs7O0FBQTNDLCtCO0FBQWlCLGdDO0FBS3BCLDRCLEdBQWUsWUFBWSxpQkFBWixLQUNmLHFCQUFJLG9CQUFKLEVBQTBCLFFBQTFCLENBRGUsR0FFZixpQkFBaUIsWUFBakIsRTtBQUVBLDhCLEdBQWlCLEU7O0FBQ3JCLG9CQUFJLGdCQUFnQixNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM5QixtQ0FBaUIscUJBQUksOEJBQUosRUFBb0MsUUFBcEMsRUFBOEMsRUFBQyxnQkFBZ0IsZ0JBQWdCLE1BQWpDLEVBQTlDLENBQWpCO0FBQ0Q7O0FBRUQseUNBQUksUUFBSixDQUNFLEtBQUssT0FBTCxFQURGLEVBRUUscUJBQUksK0JBQUosRUFBcUMsUUFBckMsRUFBK0MsRUFBQywwQkFBRCxFQUEvQyxJQUFpRSxHQUFqRSxHQUF1RSxjQUZ6RTs7Ozs7QUFLQSx1REFDRSxJQURGLEVBRUUscUJBQUksMkNBQUosRUFBaUQsUUFBakQsQ0FGRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUZBZ0JpQixJLEVBQWMsSTtZQVV6QixjLEVBQ0EsWTs7Ozs7QUFWUix5Q0FBSSxRQUFKLENBQ0UsS0FBSyxPQUFMLEVBREYsRUFFRSxxQkFBSSw0QkFBSixFQUFrQyxLQUFLLFdBQUwsRUFBbEMsQ0FGRjs7O3VCQUthLGVBQUssV0FBTCxDQUFpQixLQUFLLEtBQUwsRUFBakIsQzs7O0FBQWIsb0I7O3VCQUNNLEtBQUsscUJBQUwsQ0FBMkIsSUFBM0IsQzs7O29CQUVELEtBQUssaUJBQUwsRTs7Ozs7QUFDRyw4QixHQUFpQixLQUFLLGlCQUFMLENBQXVCLEtBQUssS0FBTCxFQUF2QixDOzt1QkFDSSxlQUFLLFdBQUwsQ0FBaUIsY0FBakIsQzs7O0FBQXJCLDRCOzs7QUFFTix5Q0FBSSxRQUFKLENBQ0UsYUFBYSxPQUFiLEVBREYsRUFFRSxxQkFBSSw2QkFBSixFQUFtQyxhQUFhLFdBQWIsRUFBbkMsRUFBK0QsRUFBQyxPQUFPLEtBQUssWUFBTCxFQUFSLEVBQS9ELENBRkY7O3VCQUlNLEtBQUsscUJBQUwsQ0FBMkIsWUFBM0IsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1osT0FBTyxPQUFQLEdBQWlCLElBQUksaUJBQUosRUFBakIiLCJmaWxlIjoiUmVzaWduR2FtZUhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBNZXNzYWdlSGFuZGxlckJhc2UgZnJvbSAnLi4vTWVzc2FnZUhhbmRsZXJCYXNlJztcbmltcG9ydCBCb3QgZnJvbSAnZmItbG9jYWwtY2hhdC1ib3QnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vLi4vY2xhc3MvVXNlcic7XG5pbXBvcnQgR29HYW1lIGZyb20gJy4uLy4uL2NsYXNzL0dhbWUnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtQb3N0QmFja1R5cGVzLCBzZW5kTm9ybWFsSGVscE1lbnV9IGZyb20gJy4uL1Bvc3RCYWNrVXRpbHMnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi8uLi9sb2dnaW5nL0xvZ2dlcic7XG5pbXBvcnQge0xvZ2dpbmdFdmVudCwgTG9nZ2luZ1RhcmdldENsYXNzfSBmcm9tICcuLi8uLi9sb2dnaW5nL0xvZ2dpbmdFbnVtcyc7XG5cbnR5cGUgUGFyYW1zID0ge1xuICBnYW1lSUQ/OiA/bnVtYmVyO1xufTtcblxuY2xhc3MgUmVzaWduR2FtZUhhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5SRVNJR05fR0FNRTtcbiAgfVxuXG4gIGdldFBhcmFtT2JqZWN0RnJvbVBvc3RiYWNrKHBhcmFtc0FycmF5OiBBcnJheTxzdHJpbmc+KTogUGFyYW1zIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2FtZUlEOiBwYXJzZUludChwYXJhbXNBcnJheVswXSwgMTApLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZW5IYW5kbGUodXNlcjogVXNlciwgcGFyYW1zOiBQYXJhbXMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBnYW1lSUQgPSBwYXJhbXMuZ2FtZUlEO1xuICAgIGlmICghdXNlci5pc1BsYXlpbmcoKSkge1xuICAgICAgQm90LnNlbmRUZXh0KHVzZXIuZ2V0RkJJRCgpLCBnb3QoJ25vcm1hbE1lc3NhZ2UueW91QXJlTm90UGxheWluZ0FueUdhbWUnLCB1c2VyLmdldExhbmd1YWdlKCkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBnYW1lID0gZ2FtZUlEXG4gICAgICA/IGF3YWl0IEdvR2FtZS5nZW5FbmZvcmNlKGdhbWVJRClcbiAgICAgIDogdXNlci5nZXRDdXJyZW50R2FtZSgpO1xuXG4gICAgaWYgKGdhbWUuaXNPdmVyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBnYW1lLmdlblJlc2lnbkdhbWUodXNlci5nZXRJRCgpKTtcbiAgICBhd2FpdCB0aGlzLmdlblNlbmRNZXNzYWdlKGdhbWUsIHVzZXIpO1xuICB9XG5cbiAgYXN5bmMgZ2VuU2VuZEVuZEdhbWVNZXNzYWdlKHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjdXJyZW50R2FtZSA9IHVzZXIuZ2V0Q3VycmVudEdhbWUoKTtcbiAgICBjb25zdCBsYW5ndWFnZSA9IHVzZXIuZ2V0TGFuZ3VhZ2UoKTtcblxuICAgIGlmIChjdXJyZW50R2FtZSkge1xuICAgICAgY29uc3QgW3VzZXJBY3RpdmVHYW1lcywgdXNlckdhbWVPcHBvbmVudF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIEdvR2FtZS5nZW5BY3RpdmVHYW1lc0ZvclVzZXIodXNlciksXG4gICAgICAgIGN1cnJlbnRHYW1lLmdlbk9wcG9uZW50VXNlcih1c2VyLmdldElEKCkpLFxuICAgICAgXSk7XG5cbiAgICAgIGxldCBvcHBvbmVudE5hbWUgPSBjdXJyZW50R2FtZS5pc1NlbGZQbGF5aW5nR2FtZSgpXG4gICAgICAgID8gZ290KCdpbkdhbWVNZXNzYWdlLnNlbGYnLCBsYW5ndWFnZSlcbiAgICAgICAgOiB1c2VyR2FtZU9wcG9uZW50LmdldEZpcnN0TmFtZSgpO1xuXG4gICAgICBsZXQgYWN0aXZlR2FtZVRleHQgPSAnJztcbiAgICAgIGlmICh1c2VyQWN0aXZlR2FtZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBhY3RpdmVHYW1lVGV4dCA9IGdvdCgnaW5HYW1lTWVzc2FnZS5hY3RpdmVHYW1lVGV4dCcsIGxhbmd1YWdlLCB7bnVtQWN0aXZlR2FtZXM6IHVzZXJBY3RpdmVHYW1lcy5sZW5ndGh9KTtcbiAgICAgIH1cblxuICAgICAgQm90LnNlbmRUZXh0KFxuICAgICAgICB1c2VyLmdldEZCSUQoKSxcbiAgICAgICAgZ290KCdpbkdhbWVNZXNzYWdlLmZvY3VzT25HYW1lV2l0aCcsIGxhbmd1YWdlLCB7b3Bwb25lbnROYW1lfSkgKyAnICcgKyBhY3RpdmVHYW1lVGV4dCxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbmROb3JtYWxIZWxwTWVudShcbiAgICAgICAgdXNlcixcbiAgICAgICAgZ290KCdpbkdhbWVNZXNzYWdlLm5vdFBsYXlpbmdXaGF0RG9Zb3VXYW50VG9EbycsIGxhbmd1YWdlKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gZ2FtZSBjb21wbGV0ZSBmcm9tIGNvdW50aW5nXG4gICAgLypcbiAgICAobmV3IExvZ2dlcih1c2VyKSlcbiAgICAgIC5zZXRFdmVudChMb2dnaW5nRXZlbnQuR0FNRV9GSU5JU0gpXG4gICAgICAuc2V0VGFyZ2V0Q2xhc3MoTG9nZ2luZ1RhcmdldENsYXNzLkdBTUUpXG4gICAgICAuc2V0VGFyZ2V0SUQoZ2FtZS5nZXRJRCgpKVxuICAgICAgLmxvZygpO1xuICAgICAgKi9cbiAgfVxuXG4gIGFzeW5jIGdlblNlbmRNZXNzYWdlKGdhbWU6IEdvR2FtZSwgdXNlcjogVXNlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIEJvdC5zZW5kVGV4dChcbiAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgZ290KCdpbkdhbWVNZXNzYWdlLnNlbGZRdWl0R2FtZScsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSksXG4gICAgKTtcblxuICAgIHVzZXIgPSBhd2FpdCBVc2VyLmdlbkJ5VXNlcklEKHVzZXIuZ2V0SUQoKSk7XG4gICAgYXdhaXQgdGhpcy5nZW5TZW5kRW5kR2FtZU1lc3NhZ2UodXNlcik7XG5cbiAgICBpZiAoIWdhbWUuaXNTZWxmUGxheWluZ0dhbWUoKSkge1xuICAgICAgY29uc3Qgb3Bwb25lbnRVc2VySUQgPSBnYW1lLmdldE9wcG9uZW50VXNlcklEKHVzZXIuZ2V0SUQoKSk7XG4gICAgICBjb25zdCBvcHBvbmVudFVzZXIgPSBhd2FpdCBVc2VyLmdlbkJ5VXNlcklEKG9wcG9uZW50VXNlcklEKTtcblxuICAgICAgQm90LnNlbmRUZXh0KFxuICAgICAgICBvcHBvbmVudFVzZXIuZ2V0RkJJRCgpLFxuICAgICAgICBnb3QoJ2luR2FtZU1lc3NhZ2UuZW5lbXlRdWl0R2FtZScsIG9wcG9uZW50VXNlci5nZXRMYW5ndWFnZSgpLCB7ZW5lbXk6IHVzZXIuZ2V0Rmlyc3ROYW1lKCl9KVxuICAgICAgKTtcbiAgICAgIGF3YWl0IHRoaXMuZ2VuU2VuZEVuZEdhbWVNZXNzYWdlKG9wcG9uZW50VXNlcik7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFJlc2lnbkdhbWVIYW5kbGVyKCk7XG4iXX0=
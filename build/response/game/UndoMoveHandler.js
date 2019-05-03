

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

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

var _ShowCurrentGameStatusHandler = require('./ShowCurrentGameStatusHandler');

var _ShowCurrentGameStatusHandler2 = _interopRequireDefault(_ShowCurrentGameStatusHandler);

var _Logger = require('../../logging/Logger');

var _LoggingEnums = require('../../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UndoMoveHandler = function (_MessageHandlerBase) {
  _inherits(UndoMoveHandler, _MessageHandlerBase);

  function UndoMoveHandler() {
    _classCallCheck(this, UndoMoveHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UndoMoveHandler).apply(this, arguments));
  }

  _createClass(UndoMoveHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.UNDO_MOVE;
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

                if (game.getCanUserUndo(user.getID())) {
                  _context.next = 15;
                  break;
                }

                if (!game.isUserTurn(user.getID())) {
                  _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('inGameMessage.notYourTurnToUndo', user.getLanguage()));
                }
                return _context.abrupt('return');

              case 15:
                _context.prev = 15;
                _context.next = 18;
                return game.genUndo(user.getID());

              case 18:
                _context.next = 20;
                return this.genSendMessage(game, user);

              case 20:
                _context.next = 26;
                break;

              case 22:
                _context.prev = 22;
                _context.t1 = _context['catch'](15);

                error('An error occured while trying to undo for game: ' + game.getID(), _context.t1);
                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('typedException.undoError', user.getLanguage()));

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[15, 22]]);
      }));

      function genHandle(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return genHandle;
    }()
  }, {
    key: 'genSendMessage',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(game, user) {
        var opponentUser, opponentFocusedOnGame, opponentColor, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('inGameMessage.selfUndoMove', user.getLanguage()));
                _context2.next = 3;
                return _ShowCurrentGameStatusHandler2.default.genHandle(user, { gameID: game.getID() });

              case 3:
                if (game.isSelfPlayingGame()) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 6;
                return _User2.default.genByUserID(game.getOpponentUserID(user.getID()));

              case 6:
                opponentUser = _context2.sent;
                opponentFocusedOnGame = opponentUser.getCurrentGameID() === game.getID();
                opponentColor = (0, _Translator.got)(game.getUserColorText(user.getID()), opponentUser.getLanguage());
                message = (0, _Translator.got)('inGameMessage.enemyUndoMove', opponentUser.getLanguage(), { enemy: user.getFirstName(), color: opponentColor });

                (0, _PostBackUtils.sendFocusedGameMessage)(opponentUser, game, message, opponentFocusedOnGame);
                _context2.next = 13;
                return _ShowCurrentGameStatusHandler2.default.genHandle(opponentUser, { gameID: game.getID() });

              case 13:

                new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.GAME_UNDO_MOVE).setTargetClass(_LoggingEnums.LoggingTargetClass.GAME).setTargetID(game.getID()).log();

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genSendMessage(_x3, _x4) {
        return ref.apply(this, arguments);
      }

      return genSendMessage;
    }()
  }]);

  return UndoMoveHandler;
}(_MessageHandlerBase3.default);

module.exports = new UndoMoveHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL1VuZG9Nb3ZlSGFuZGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQU1NLGU7Ozs7Ozs7Ozs7O3NDQUNzQjtBQUN4QixhQUFPLDZCQUFjLFNBQXJCO0FBQ0Q7OzsrQ0FFMEIsVyxFQUFvQztBQUM3RCxhQUFPO0FBQ0wsZ0JBQVEsU0FBUyxZQUFZLENBQVosQ0FBVCxFQUF5QixFQUF6QjtBQURILE9BQVA7QUFHRDs7OztrRkFFZSxJLEVBQVksTTtZQUNwQixNLEVBTUEsSTs7Ozs7QUFOQSxzQixHQUFTLE9BQU8sTTs7b0JBQ2pCLEtBQUssU0FBTCxFOzs7OztBQUNILHlDQUFJLFFBQUosQ0FBYSxLQUFLLE9BQUwsRUFBYixFQUE2QixxQkFBSSx1Q0FBSixFQUE2QyxLQUFLLFdBQUwsRUFBN0MsQ0FBN0I7Ozs7cUJBSVcsTTs7Ozs7O3VCQUNILGVBQU8sVUFBUCxDQUFrQixNQUFsQixDOzs7Ozs7Ozs4QkFDTixLQUFLLGNBQUwsRTs7O0FBRkUsb0I7O29CQUtELEtBQUssY0FBTCxDQUFvQixLQUFLLEtBQUwsRUFBcEIsQzs7Ozs7QUFDSCxvQkFBSSxDQUFDLEtBQUssVUFBTCxDQUFnQixLQUFLLEtBQUwsRUFBaEIsQ0FBTCxFQUFvQztBQUNsQywyQ0FBSSxRQUFKLENBQWEsS0FBSyxPQUFMLEVBQWIsRUFBNkIscUJBQUksaUNBQUosRUFBdUMsS0FBSyxXQUFMLEVBQXZDLENBQTdCO0FBQ0Q7Ozs7Ozt1QkFLSyxLQUFLLE9BQUwsQ0FBYSxLQUFLLEtBQUwsRUFBYixDOzs7O3VCQUNBLEtBQUssY0FBTCxDQUFvQixJQUFwQixFQUEwQixJQUExQixDOzs7Ozs7Ozs7O0FBRU4sc0JBQU0scURBQXFELEtBQUssS0FBTCxFQUEzRDtBQUNBLHlDQUFJLFFBQUosQ0FBYSxLQUFLLE9BQUwsRUFBYixFQUE2QixxQkFBSSwwQkFBSixFQUFnQyxLQUFLLFdBQUwsRUFBaEMsQ0FBN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUZBSWlCLEksRUFBYyxJO1lBTXpCLFksRUFDQSxxQixFQUNBLGEsRUFDQSxPOzs7OztBQVJSLHlDQUFJLFFBQUosQ0FBYSxLQUFLLE9BQUwsRUFBYixFQUE2QixxQkFBSSw0QkFBSixFQUFrQyxLQUFLLFdBQUwsRUFBbEMsQ0FBN0I7O3VCQUNNLHVDQUE2QixTQUE3QixDQUF1QyxJQUF2QyxFQUE2QyxFQUFDLFFBQVEsS0FBSyxLQUFMLEVBQVQsRUFBN0MsQzs7O29CQUdELEtBQUssaUJBQUwsRTs7Ozs7O3VCQUN3QixlQUFLLFdBQUwsQ0FBaUIsS0FBSyxpQkFBTCxDQUF1QixLQUFLLEtBQUwsRUFBdkIsQ0FBakIsQzs7O0FBQXJCLDRCO0FBQ0EscUMsR0FBd0IsYUFBYSxnQkFBYixPQUFvQyxLQUFLLEtBQUwsRTtBQUM1RCw2QixHQUFnQixxQkFBSSxLQUFLLGdCQUFMLENBQXNCLEtBQUssS0FBTCxFQUF0QixDQUFKLEVBQXlDLGFBQWEsV0FBYixFQUF6QyxDO0FBQ2hCLHVCLEdBQVUscUJBQ2QsNkJBRGMsRUFFZCxhQUFhLFdBQWIsRUFGYyxFQUdkLEVBQUMsT0FBTyxLQUFLLFlBQUwsRUFBUixFQUE2QixPQUFPLGFBQXBDLEVBSGMsQzs7QUFLaEIsMkRBQXVCLFlBQXZCLEVBQXFDLElBQXJDLEVBQTJDLE9BQTNDLEVBQW9ELHFCQUFwRDs7dUJBQ00sdUNBQTZCLFNBQTdCLENBQXVDLFlBQXZDLEVBQXFELEVBQUMsUUFBUSxLQUFLLEtBQUwsRUFBVCxFQUFyRCxDOzs7O0FBR1AsbUNBQVcsSUFBWCxDQUFELENBQ0csUUFESCxDQUNZLDJCQUFhLGNBRHpCLEVBRUcsY0FGSCxDQUVrQixpQ0FBbUIsSUFGckMsRUFHRyxXQUhILENBR2UsS0FBSyxLQUFMLEVBSGYsRUFJRyxHQUpIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRSixPQUFPLE9BQVAsR0FBaUIsSUFBSSxlQUFKLEVBQWpCIiwiZmlsZSI6IlVuZG9Nb3ZlSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE1lc3NhZ2VIYW5kbGVyQmFzZSBmcm9tICcuLi9NZXNzYWdlSGFuZGxlckJhc2UnO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBHb0dhbWUgZnJvbSAnLi4vLi4vY2xhc3MvR2FtZSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQge1Bvc3RCYWNrVHlwZXMsIHNlbmRGb2N1c2VkR2FtZU1lc3NhZ2V9IGZyb20gJy4uL1Bvc3RCYWNrVXRpbHMnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCBTaG93Q3VycmVudEdhbWVTdGF0dXNIYW5kbGVyIGZyb20gJy4vU2hvd0N1cnJlbnRHYW1lU3RhdHVzSGFuZGxlcic7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi4vLi4vbG9nZ2luZy9Mb2dnZXInO1xuaW1wb3J0IHtMb2dnaW5nRXZlbnQsIExvZ2dpbmdUYXJnZXRDbGFzc30gZnJvbSAnLi4vLi4vbG9nZ2luZy9Mb2dnaW5nRW51bXMnO1xuXG50eXBlIFBhcmFtcyA9IHtcbiAgZ2FtZUlEPzogP251bWJlcjtcbn07XG5cbmNsYXNzIFVuZG9Nb3ZlSGFuZGxlciBleHRlbmRzIE1lc3NhZ2VIYW5kbGVyQmFzZSB7XG4gIGdldFBvc3RCYWNrVHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBQb3N0QmFja1R5cGVzLlVORE9fTU9WRTtcbiAgfVxuXG4gIGdldFBhcmFtT2JqZWN0RnJvbVBvc3RiYWNrKHBhcmFtc0FycmF5OiBBcnJheTxzdHJpbmc+KTogUGFyYW1zIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2FtZUlEOiBwYXJzZUludChwYXJhbXNBcnJheVswXSwgMTApLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZW5IYW5kbGUodXNlcjogVXNlciwgcGFyYW1zOiBQYXJhbXMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBnYW1lSUQgPSBwYXJhbXMuZ2FtZUlEO1xuICAgIGlmICghdXNlci5pc1BsYXlpbmcoKSkge1xuICAgICAgQm90LnNlbmRUZXh0KHVzZXIuZ2V0RkJJRCgpLCBnb3QoJ25vcm1hbE1lc3NhZ2UueW91QXJlTm90UGxheWluZ0FueUdhbWUnLCB1c2VyLmdldExhbmd1YWdlKCkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBnYW1lID0gZ2FtZUlEXG4gICAgICA/IGF3YWl0IEdvR2FtZS5nZW5FbmZvcmNlKGdhbWVJRClcbiAgICAgIDogdXNlci5nZXRDdXJyZW50R2FtZSgpO1xuXG4gICAgLy8gc2lsZW50IHRoZSB0aGUgYWN0aW9uIGlmIHVzZXIgc2hvdWxkbid0IGJlIHVuZG9pbmcgdGhlIG1vdmUgKGUuZy4gbm90IGhpcyB0dXJuKVxuICAgIGlmICghZ2FtZS5nZXRDYW5Vc2VyVW5kbyh1c2VyLmdldElEKCkpKSB7XG4gICAgICBpZiAoIWdhbWUuaXNVc2VyVHVybih1c2VyLmdldElEKCkpKSB7XG4gICAgICAgIEJvdC5zZW5kVGV4dCh1c2VyLmdldEZCSUQoKSwgZ290KCdpbkdhbWVNZXNzYWdlLm5vdFlvdXJUdXJuVG9VbmRvJywgdXNlci5nZXRMYW5ndWFnZSgpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGdhbWUuZ2VuVW5kbyh1c2VyLmdldElEKCkpO1xuICAgICAgYXdhaXQgdGhpcy5nZW5TZW5kTWVzc2FnZShnYW1lLCB1c2VyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGVycm9yKCdBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byB1bmRvIGZvciBnYW1lOiAnICsgZ2FtZS5nZXRJRCgpLCBlcnIpO1xuICAgICAgQm90LnNlbmRUZXh0KHVzZXIuZ2V0RkJJRCgpLCBnb3QoJ3R5cGVkRXhjZXB0aW9uLnVuZG9FcnJvcicsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSkpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdlblNlbmRNZXNzYWdlKGdhbWU6IEdvR2FtZSwgdXNlcjogVXNlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIEJvdC5zZW5kVGV4dCh1c2VyLmdldEZCSUQoKSwgZ290KCdpbkdhbWVNZXNzYWdlLnNlbGZVbmRvTW92ZScsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSkpO1xuICAgIGF3YWl0IFNob3dDdXJyZW50R2FtZVN0YXR1c0hhbmRsZXIuZ2VuSGFuZGxlKHVzZXIsIHtnYW1lSUQ6IGdhbWUuZ2V0SUQoKX0pO1xuXG4gICAgLy8gc2VuZCBtZXNzYWdlIHRvIG9wcG9uZW50XG4gICAgaWYgKCFnYW1lLmlzU2VsZlBsYXlpbmdHYW1lKCkpIHtcbiAgICAgIGNvbnN0IG9wcG9uZW50VXNlciA9IGF3YWl0IFVzZXIuZ2VuQnlVc2VySUQoZ2FtZS5nZXRPcHBvbmVudFVzZXJJRCh1c2VyLmdldElEKCkpKTtcbiAgICAgIGNvbnN0IG9wcG9uZW50Rm9jdXNlZE9uR2FtZSA9IG9wcG9uZW50VXNlci5nZXRDdXJyZW50R2FtZUlEKCkgPT09IGdhbWUuZ2V0SUQoKTtcbiAgICAgIGNvbnN0IG9wcG9uZW50Q29sb3IgPSBnb3QoZ2FtZS5nZXRVc2VyQ29sb3JUZXh0KHVzZXIuZ2V0SUQoKSksIG9wcG9uZW50VXNlci5nZXRMYW5ndWFnZSgpKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBnb3QoXG4gICAgICAgICdpbkdhbWVNZXNzYWdlLmVuZW15VW5kb01vdmUnLFxuICAgICAgICBvcHBvbmVudFVzZXIuZ2V0TGFuZ3VhZ2UoKSxcbiAgICAgICAge2VuZW15OiB1c2VyLmdldEZpcnN0TmFtZSgpLCBjb2xvcjogb3Bwb25lbnRDb2xvcn0sXG4gICAgICApO1xuICAgICAgc2VuZEZvY3VzZWRHYW1lTWVzc2FnZShvcHBvbmVudFVzZXIsIGdhbWUsIG1lc3NhZ2UsIG9wcG9uZW50Rm9jdXNlZE9uR2FtZSk7XG4gICAgICBhd2FpdCBTaG93Q3VycmVudEdhbWVTdGF0dXNIYW5kbGVyLmdlbkhhbmRsZShvcHBvbmVudFVzZXIsIHtnYW1lSUQ6IGdhbWUuZ2V0SUQoKX0pO1xuICAgIH1cblxuICAgIChuZXcgTG9nZ2VyKHVzZXIpKVxuICAgICAgLnNldEV2ZW50KExvZ2dpbmdFdmVudC5HQU1FX1VORE9fTU9WRSlcbiAgICAgIC5zZXRUYXJnZXRDbGFzcyhMb2dnaW5nVGFyZ2V0Q2xhc3MuR0FNRSlcbiAgICAgIC5zZXRUYXJnZXRJRChnYW1lLmdldElEKCkpXG4gICAgICAubG9nKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVW5kb01vdmVIYW5kbGVyKCk7XG4iXX0=
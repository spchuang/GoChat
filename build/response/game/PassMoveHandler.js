

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

var _Logger = require('../../logging/Logger');

var _LoggingEnums = require('../../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PassMoveHandler = function (_MessageHandlerBase) {
  _inherits(PassMoveHandler, _MessageHandlerBase);

  function PassMoveHandler() {
    _classCallCheck(this, PassMoveHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PassMoveHandler).apply(this, arguments));
  }

  _createClass(PassMoveHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.PASS_MOVE;
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
        var gameID, game, errorMessage;
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

                if (!game.isCountingScore()) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return');

              case 14:
                _context.prev = 14;
                _context.next = 17;
                return game.genPass(user.getID());

              case 17:
                _context.next = 26;
                break;

              case 19:
                _context.prev = 19;
                _context.t1 = _context['catch'](14);

                error('An error occured while trying to pass for game: ' + game.getID(), _context.t1);

                errorMessage = (0, _Translator.got)('typedException.invalidMove', user.getLanguage()) + ' ';


                if (_context.t1.name === 'TypedError') {
                  errorMessage += (0, _Translator.got)(_context.t1.getErrorName(), user.getLanguage());
                } else {
                  errorMessage += (0, _Translator.got)(_context.t1, user.getLanguage());
                }
                _fbLocalChatBot2.default.sendText(user.getFBID(), errorMessage);
                return _context.abrupt('return');

              case 26:
                _context.next = 28;
                return this.genSendMessage(game, user);

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[14, 19]]);
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
        var nextColor, opponentUser, firstSentence, opponentName, opponentFocusedOnGame, message, _message;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                nextColor = (0, _Translator.got)(game.getCurrentMoveColorText(), user.getLanguage());
                _context2.next = 3;
                return game.genOpponentUser(user.getID());

              case 3:
                opponentUser = _context2.sent;
                firstSentence = (0, _Translator.got)('inGameMessage.selfPassMove', user.getLanguage());

                if (game.isCountingScore()) {
                  // enters score counting mode
                  opponentName = game.isSelfPlayingGame() ? (0, _Translator.got)('inGameMessage.self', user.getLanguage()) : opponentUser.getFirstName();


                  _fbLocalChatBot2.default.sendButtons(user.getFBID(), firstSentence + ' ' + (0, _Translator.got)('inGameMessage.gameInScoreCounting', user.getLanguage(), { opponentName: opponentName }), [(0, _PostBackUtils.getCountScoreURLButton)((0, _Translator.got)('button.countScore', user.getLanguage()), user, { gameID: game.getID() })]);
                } else {
                  _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('inGameMessage.selfPassMove', user.getLanguage()) + ' ' + (0, _Translator.got)('inGameMessage.enemyTurnToPlay', user.getLanguage(), { color: nextColor, enemy: opponentUser.getFirstName() }));
                }

                if (!game.isSelfPlayingGame()) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return');

              case 8:
                opponentFocusedOnGame = opponentUser.getCurrentGameID() === game.getID();

                firstSentence = (0, _Translator.got)('inGameMessage.enemyPassMove', opponentUser.getLanguage(), { enemy: user.getFirstName() });
                if (game.isCountingScore()) {
                  message = firstSentence + ' ' + (0, _Translator.got)('inGameMessage.gameInScoreCounting', opponentUser.getLanguage(), { opponentName: user.getFirstName() });

                  if (opponentFocusedOnGame) {
                    _fbLocalChatBot2.default.sendButtons(opponentUser.getFBID(), message, [(0, _PostBackUtils.getCountScoreURLButton)((0, _Translator.got)('button.countScore', opponentUser.getLanguage()), opponentUser, { gameID: game.getID() })]);
                  } else {
                    (0, _PostBackUtils.sendFocusedGameMessage)(opponentUser, game, message, false);
                  }
                } else {
                  nextColor = (0, _Translator.got)(game.getCurrentMoveColorText(), opponentUser.getLanguage());
                  _message = firstSentence + ' ' + (0, _Translator.got)('inGameMessage.selfTurnToPlay', opponentUser.getLanguage(), { color: nextColor });


                  (0, _PostBackUtils.sendFocusedGameMessage)(opponentUser, game, _message, opponentFocusedOnGame);
                }

                new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.GAME_PASS).setTargetClass(_LoggingEnums.LoggingTargetClass.GAME).setTargetID(game.getID()).log();

              case 12:
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

  return PassMoveHandler;
}(_MessageHandlerBase3.default);

module.exports = new PassMoveHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL1Bhc3NNb3ZlSGFuZGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFNTSxlOzs7Ozs7Ozs7OztzQ0FDc0I7QUFDeEIsYUFBTyw2QkFBYyxTQUFyQjtBQUNEOzs7K0NBRTBCLFcsRUFBb0M7QUFDN0QsYUFBTztBQUNMLGdCQUFRLFNBQVMsWUFBWSxDQUFaLENBQVQsRUFBeUIsRUFBekI7QUFESCxPQUFQO0FBR0Q7Ozs7a0ZBRWUsSSxFQUFZLE07WUFDcEIsTSxFQU1BLEksRUFZQSxZOzs7OztBQWxCQSxzQixHQUFTLE9BQU8sTTs7b0JBQ2pCLEtBQUssU0FBTCxFOzs7OztBQUNILHlDQUFJLFFBQUosQ0FBYSxLQUFLLE9BQUwsRUFBYixFQUE2QixxQkFBSSx1Q0FBSixFQUE2QyxLQUFLLFdBQUwsRUFBN0MsQ0FBN0I7Ozs7cUJBSVcsTTs7Ozs7O3VCQUNILGVBQU8sVUFBUCxDQUFrQixNQUFsQixDOzs7Ozs7Ozs4QkFDTixLQUFLLGNBQUwsRTs7O0FBRkUsb0I7O3FCQUlGLEtBQUssZUFBTCxFOzs7Ozs7Ozs7O3VCQUlJLEtBQUssT0FBTCxDQUFhLEtBQUssS0FBTCxFQUFiLEM7Ozs7Ozs7Ozs7QUFFTixzQkFBTSxxREFBcUQsS0FBSyxLQUFMLEVBQTNEOztBQUVJLDRCLEdBQWUscUJBQUksNEJBQUosRUFBa0MsS0FBSyxXQUFMLEVBQWxDLElBQXdELEc7OztBQUUzRSxvQkFBSSxZQUFJLElBQUosS0FBYSxZQUFqQixFQUErQjtBQUM3QixrQ0FBZ0IscUJBQUksWUFBSSxZQUFKLEVBQUosRUFBd0IsS0FBSyxXQUFMLEVBQXhCLENBQWhCO0FBQ0QsaUJBRkQsTUFFTztBQUNMLGtDQUFnQixrQ0FBUyxLQUFLLFdBQUwsRUFBVCxDQUFoQjtBQUNEO0FBQ0QseUNB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ckMsRUFHRyxXQUhILENBR2UsS0FBSyxLQUFMLEVBSGYsRUFJRyxHQUpIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRSixPQUFPLE9BQVAsR0FBaUIsSUFBSSxlQUFKLEVBQWpCIiwiZmlsZSI6IlBhc3NNb3ZlSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE1lc3NhZ2VIYW5kbGVyQmFzZSBmcm9tICcuLi9NZXNzYWdlSGFuZGxlckJhc2UnO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBHb0dhbWUgZnJvbSAnLi4vLi4vY2xhc3MvR2FtZSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQge3NlbmRGb2N1c2VkR2FtZU1lc3NhZ2UsIFBvc3RCYWNrVHlwZXMsIGdldENvdW50U2NvcmVVUkxCdXR0b259IGZyb20gJy4uL1Bvc3RCYWNrVXRpbHMnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi8uLi9sb2dnaW5nL0xvZ2dlcic7XG5pbXBvcnQge0xvZ2dpbmdFdmVudCwgTG9nZ2luZ1RhcmdldENsYXNzfSBmcm9tICcuLi8uLi9sb2dnaW5nL0xvZ2dpbmdFbnVtcyc7XG5cbnR5cGUgUGFyYW1zID0ge1xuICBnYW1lSUQ/OiA/bnVtYmVyO1xufTtcblxuY2xhc3MgUGFzc01vdmVIYW5kbGVyIGV4dGVuZHMgTWVzc2FnZUhhbmRsZXJCYXNlIHtcbiAgZ2V0UG9zdEJhY2tUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFBvc3RCYWNrVHlwZXMuUEFTU19NT1ZFO1xuICB9XG5cbiAgZ2V0UGFyYW1PYmplY3RGcm9tUG9zdGJhY2socGFyYW1zQXJyYXk6IEFycmF5PHN0cmluZz4pOiBQYXJhbXMge1xuICAgIHJldHVybiB7XG4gICAgICBnYW1lSUQ6IHBhcnNlSW50KHBhcmFtc0FycmF5WzBdLCAxMCksXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdlbkhhbmRsZSh1c2VyOiBVc2VyLCBwYXJhbXM6IFBhcmFtcyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGdhbWVJRCA9IHBhcmFtcy5nYW1lSUQ7XG4gICAgaWYgKCF1c2VyLmlzUGxheWluZygpKSB7XG4gICAgICBCb3Quc2VuZFRleHQodXNlci5nZXRGQklEKCksIGdvdCgnbm9ybWFsTWVzc2FnZS55b3VBcmVOb3RQbGF5aW5nQW55R2FtZScsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGdhbWUgPSBnYW1lSURcbiAgICAgID8gYXdhaXQgR29HYW1lLmdlbkVuZm9yY2UoZ2FtZUlEKVxuICAgICAgOiB1c2VyLmdldEN1cnJlbnRHYW1lKCk7XG5cbiAgICBpZiAoZ2FtZS5pc0NvdW50aW5nU2NvcmUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZ2FtZS5nZW5QYXNzKHVzZXIuZ2V0SUQoKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBlcnJvcignQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gcGFzcyBmb3IgZ2FtZTogJyArIGdhbWUuZ2V0SUQoKSwgZXJyKTtcblxuICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGdvdCgndHlwZWRFeGNlcHRpb24uaW52YWxpZE1vdmUnLCB1c2VyLmdldExhbmd1YWdlKCkpICsgJyAnO1xuXG4gICAgICBpZiAoZXJyLm5hbWUgPT09ICdUeXBlZEVycm9yJykge1xuICAgICAgICBlcnJvck1lc3NhZ2UgKz0gZ290KGVyci5nZXRFcnJvck5hbWUoKSwgdXNlci5nZXRMYW5ndWFnZSgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSArPSBnb3QoZXJyLCB1c2VyLmdldExhbmd1YWdlKCkpO1xuICAgICAgfVxuICAgICAgQm90LnNlbmRUZXh0KFxuICAgICAgICB1c2VyLmdldEZCSUQoKSxcbiAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5nZW5TZW5kTWVzc2FnZShnYW1lLCB1c2VyKTtcbiAgfVxuXG4gIGFzeW5jIGdlblNlbmRNZXNzYWdlKGdhbWU6IEdvR2FtZSwgdXNlcjogVXNlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBuZXh0Q29sb3IgPSBnb3QoZ2FtZS5nZXRDdXJyZW50TW92ZUNvbG9yVGV4dCgpLCB1c2VyLmdldExhbmd1YWdlKCkpO1xuICAgIGNvbnN0IG9wcG9uZW50VXNlciA9IGF3YWl0IGdhbWUuZ2VuT3Bwb25lbnRVc2VyKHVzZXIuZ2V0SUQoKSk7XG5cbiAgICBsZXQgZmlyc3RTZW50ZW5jZSA9IGdvdCgnaW5HYW1lTWVzc2FnZS5zZWxmUGFzc01vdmUnLCB1c2VyLmdldExhbmd1YWdlKCkpO1xuICAgIGlmIChnYW1lLmlzQ291bnRpbmdTY29yZSgpKSB7XG4gICAgICAvLyBlbnRlcnMgc2NvcmUgY291bnRpbmcgbW9kZVxuICAgICAgY29uc3Qgb3Bwb25lbnROYW1lID0gZ2FtZS5pc1NlbGZQbGF5aW5nR2FtZSgpXG4gICAgICAgID8gZ290KCdpbkdhbWVNZXNzYWdlLnNlbGYnLCB1c2VyLmdldExhbmd1YWdlKCkpXG4gICAgICAgIDogb3Bwb25lbnRVc2VyLmdldEZpcnN0TmFtZSgpO1xuXG4gICAgICBCb3Quc2VuZEJ1dHRvbnMoXG4gICAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgICBmaXJzdFNlbnRlbmNlICsgJyAnICsgZ290KCdpbkdhbWVNZXNzYWdlLmdhbWVJblNjb3JlQ291bnRpbmcnLCB1c2VyLmdldExhbmd1YWdlKCksIHtvcHBvbmVudE5hbWV9KSxcbiAgICAgICAgW1xuICAgICAgICAgIGdldENvdW50U2NvcmVVUkxCdXR0b24oZ290KCdidXR0b24uY291bnRTY29yZScsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSksIHVzZXIsIHtnYW1lSUQ6IGdhbWUuZ2V0SUQoKX0pLFxuICAgICAgICBdLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQm90LnNlbmRUZXh0KFxuICAgICAgICB1c2VyLmdldEZCSUQoKSxcbiAgICAgICAgZ290KCdpbkdhbWVNZXNzYWdlLnNlbGZQYXNzTW92ZScsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSkgKyAnICcgK1xuICAgICAgICAgIGdvdCgnaW5HYW1lTWVzc2FnZS5lbmVteVR1cm5Ub1BsYXknLCB1c2VyLmdldExhbmd1YWdlKCksIHtjb2xvcjogbmV4dENvbG9yLCBlbmVteTogb3Bwb25lbnRVc2VyLmdldEZpcnN0TmFtZSgpfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChnYW1lLmlzU2VsZlBsYXlpbmdHYW1lKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvcHBvbmVudEZvY3VzZWRPbkdhbWUgPSBvcHBvbmVudFVzZXIuZ2V0Q3VycmVudEdhbWVJRCgpID09PSBnYW1lLmdldElEKCk7XG4gICAgZmlyc3RTZW50ZW5jZSA9IGdvdCgnaW5HYW1lTWVzc2FnZS5lbmVteVBhc3NNb3ZlJywgb3Bwb25lbnRVc2VyLmdldExhbmd1YWdlKCksIHtlbmVteTogdXNlci5nZXRGaXJzdE5hbWUoKX0pO1xuICAgIGlmIChnYW1lLmlzQ291bnRpbmdTY29yZSgpKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZmlyc3RTZW50ZW5jZSArICcgJyArIGdvdCgnaW5HYW1lTWVzc2FnZS5nYW1lSW5TY29yZUNvdW50aW5nJywgb3Bwb25lbnRVc2VyLmdldExhbmd1YWdlKCksIHtvcHBvbmVudE5hbWU6IHVzZXIuZ2V0Rmlyc3ROYW1lKCl9KTtcbiAgICAgIGlmIChvcHBvbmVudEZvY3VzZWRPbkdhbWUpIHtcbiAgICAgICAgQm90LnNlbmRCdXR0b25zKFxuICAgICAgICAgIG9wcG9uZW50VXNlci5nZXRGQklEKCksXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBnZXRDb3VudFNjb3JlVVJMQnV0dG9uKGdvdCgnYnV0dG9uLmNvdW50U2NvcmUnLCBvcHBvbmVudFVzZXIuZ2V0TGFuZ3VhZ2UoKSksIG9wcG9uZW50VXNlciwge2dhbWVJRDogZ2FtZS5nZXRJRCgpfSksXG4gICAgICAgICAgXSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbmRGb2N1c2VkR2FtZU1lc3NhZ2Uob3Bwb25lbnRVc2VyLCBnYW1lLCBtZXNzYWdlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRDb2xvciA9IGdvdChnYW1lLmdldEN1cnJlbnRNb3ZlQ29sb3JUZXh0KCksIG9wcG9uZW50VXNlci5nZXRMYW5ndWFnZSgpKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICBmaXJzdFNlbnRlbmNlICsgJyAnICsgZ290KCdpbkdhbWVNZXNzYWdlLnNlbGZUdXJuVG9QbGF5Jywgb3Bwb25lbnRVc2VyLmdldExhbmd1YWdlKCksIHtjb2xvcjogbmV4dENvbG9yfSk7XG5cbiAgICAgIHNlbmRGb2N1c2VkR2FtZU1lc3NhZ2Uob3Bwb25lbnRVc2VyLCBnYW1lLCBtZXNzYWdlLCBvcHBvbmVudEZvY3VzZWRPbkdhbWUpO1xuICAgIH1cblxuICAgIChuZXcgTG9nZ2VyKHVzZXIpKVxuICAgICAgLnNldEV2ZW50KExvZ2dpbmdFdmVudC5HQU1FX1BBU1MpXG4gICAgICAuc2V0VGFyZ2V0Q2xhc3MoTG9nZ2luZ1RhcmdldENsYXNzLkdBTUUpXG4gICAgICAuc2V0VGFyZ2V0SUQoZ2FtZS5nZXRJRCgpKVxuICAgICAgLmxvZygpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3NNb3ZlSGFuZGxlcigpO1xuIl19
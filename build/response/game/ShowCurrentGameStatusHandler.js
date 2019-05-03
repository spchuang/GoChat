

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

var _ClassEnums = require('../../class/ClassEnums');

var _ParseUtil = require('../../utils/ParseUtil');

var _ParseUtil2 = _interopRequireDefault(_ParseUtil);

var _PostBackUtils = require('../PostBackUtils');

var _TranslationConstants = require('../../translations/TranslationConstants');

var _Translator = require('../../translations/Translator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowCurrentGameStatusHandler = function (_MessageHandlerBase) {
  _inherits(ShowCurrentGameStatusHandler, _MessageHandlerBase);

  function ShowCurrentGameStatusHandler() {
    _classCallCheck(this, ShowCurrentGameStatusHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ShowCurrentGameStatusHandler).apply(this, arguments));
  }

  _createClass(ShowCurrentGameStatusHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SHOW_CURRENT_GAME_STATUS;
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
        var gameID, game, isUserTurn, currentColor, _ref, _ref2, opponentUser, imageURL, message, lastStone, lastStoneText, opponentName;

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
                isUserTurn = game.isUserTurn(user.getID());
                currentColor = (0, _Translator.got)(game.getCurrentMoveColorText(), user.getLanguage());
                _context.next = 16;
                return _bluebird2.default.all([_User2.default.genByUserID(game.getOpponentUserID(user.getID())), game.genBoardImageURL()]);

              case 16:
                _ref = _context.sent;
                _ref2 = _slicedToArray(_ref, 2);
                opponentUser = _ref2[0];
                imageURL = _ref2[1];

                // send text if game is not over yet

                if (game.getStatus() === _ClassEnums.GameStatus.PLAYING) {
                  message = isUserTurn ? (0, _Translator.got)('inGameMessage.selfTurnToPlay', user.getLanguage(), { color: currentColor }) : (0, _Translator.got)('inGameMessage.enemyTurnToPlay', user.getLanguage(), { color: currentColor, enemy: opponentUser.getFirstName() });
                  lastStone = game.getLastStonePlayed();

                  if (lastStone && lastStone !== 'PASS_MOVE') {
                    lastStoneText = _ParseUtil2.default.convertNumberPositionToString([lastStone[0], lastStone[1]]);

                    message += (0, _Translator.got)('inGameMessage.lastStone', user.getLanguage(), { lastStoneText: lastStoneText });
                  }

                  _fbLocalChatBot2.default.sendText(user.getFBID(), message);
                } else if (game.isCountingScore()) {
                  opponentName = game.isSelfPlayingGame() ? (0, _Translator.got)('inGameMessage.self', user.getLanguage()) : opponentUser.getFirstName();

                  _fbLocalChatBot2.default.sendButtons(user.getFBID(), (0, _Translator.got)('inGameMessage.gameInScoreCounting', user.getLanguage(), { opponentName: opponentName }), [(0, _PostBackUtils.getCountScoreURLButton)((0, _Translator.got)('button.countScore', user.getLanguage()), user, { gameID: game.getID() })]);
                }
                _fbLocalChatBot2.default.sendImage(user.getFBID(), imageURL);

              case 22:
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
  }]);

  return ShowCurrentGameStatusHandler;
}(_MessageHandlerBase3.default);

module.exports = new ShowCurrentGameStatusHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL1Nob3dDdXJyZW50R2FtZVN0YXR1c0hhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQU1NLDRCOzs7Ozs7Ozs7OztzQ0FDc0I7QUFDeEIsYUFBTyw2QkFBYyx3QkFBckI7QUFDRDs7OytDQUUwQixXLEVBQW9DO0FBQzdELGFBQU87QUFDTCxnQkFBUSxTQUFTLFlBQVksQ0FBWixDQUFULEVBQXlCLEVBQXpCO0FBREgsT0FBUDtBQUdEOzs7O2tGQUVlLEksRUFBWSxNO1lBQ3BCLE0sRUFPQSxJLEVBSUEsVSxFQUNBLFksZUFFQyxZLEVBQWMsUSxFQU9mLE8sRUFJRSxTLEVBRUUsYSxFQVNGLFk7Ozs7OztBQXBDRixzQixHQUFTLE9BQU8sTTs7b0JBRWpCLEtBQUssU0FBTCxFOzs7OztBQUNILHlDQUFJLFFBQUosQ0FBYSxLQUFLLE9BQUwsRUFBYixFQUE2QixxQkFBSSx1Q0FBSixFQUE2QyxLQUFLLFdBQUwsRUFBN0MsQ0FBN0I7Ozs7cUJBSVcsTTs7Ozs7O3VCQUNILGVBQU8sVUFBUCxDQUFrQixNQUFsQixDOzs7Ozs7Ozs4QkFDTixLQUFLLGNBQUwsRTs7O0FBRkUsb0I7QUFJQSwwQixHQUFhLEtBQUssVUFBTCxDQUFnQixLQUFLLEtBQUwsRUFBaEIsQztBQUNiLDRCLEdBQWUscUJBQUksS0FBSyx1QkFBTCxFQUFKLEVBQW9DLEtBQUssV0FBTCxFQUFwQyxDOzt1QkFFa0IsbUJBQVEsR0FBUixDQUFZLENBQ2pELGVBQUssV0FBTCxDQUFpQixLQUFLLGlCQUFMLENBQXVCLEtBQUssS0FBTCxFQUF2QixDQUFqQixDQURpRCxFQUVqRCxLQUFLLGdCQUFMLEVBRmlELENBQVosQzs7Ozs7QUFBaEMsNEI7QUFBYyx3Qjs7OztBQU1yQixvQkFBSSxLQUFLLFNBQUwsT0FBcUIsdUJBQVcsT0FBcEMsRUFBNkM7QUFDdkMseUJBRHVDLEdBQzdCLGFBQ1YscUJBQUksOEJBQUosRUFBb0MsS0FBSyxXQUFMLEVBQXBDLEVBQXdELEVBQUMsT0FBTyxZQUFSLEVBQXhELENBRFUsR0FFVixxQkFBSSwrQkFBSixFQUFxQyxLQUFLLFdBQUwsRUFBckMsRUFBeUQsRUFBQyxPQUFPLFlBQVIsRUFBc0IsT0FBTyxhQUFhLFlBQWIsRUFBN0IsRUFBekQsQ0FIdUM7QUFLckMsMkJBTHFDLEdBS3pCLEtBQUssa0JBQUwsRUFMeUI7O0FBTTNDLHNCQUFJLGFBQWEsY0FBYyxXQUEvQixFQUE0QztBQUNwQyxpQ0FEb0MsR0FDcEIsb0JBQVUsNkJBQVYsQ0FBd0MsQ0FBQyxVQUFVLENBQVYsQ0FBRCxFQUFlLFVBQVUsQ0FBVixDQUFmLENBQXhDLENBRG9COztBQUUxQywrQkFBVyxxQkFBSSx5QkFBSixFQUErQixLQUFLLFdBQUwsRUFBL0IsRUFBbUQsRUFBQyxlQUFlLGFBQWhCLEVBQW5ELENBQVg7QUFDRDs7QUFFRCwyQ0FBSSxRQUFKLENBQ0UsS0FBSyxPQUFMLEVBREYsRUFFRSxPQUZGO0FBSUQsaUJBZkQsTUFlTyxJQUFJLEtBQUssZUFBTCxFQUFKLEVBQTRCO0FBQzNCLDhCQUQyQixHQUNaLEtBQUssaUJBQUwsS0FDakIscUJBQUksb0JBQUosRUFBMEIsS0FBSyxXQUFMLEVBQTFCLENBRGlCLEdBRWpCLGFBQWEsWUFBYixFQUg2Qjs7QUFJakMsMkNBQUksV0FBSixDQUNFLEtBQUssT0FBTCxFQURGLEVBRUUscUJBQUksbUNBQUosRUFBeUMsS0FBSyxXQUFMLEVBQXpDLEVBQTZELEVBQUMsMEJBQUQsRUFBN0QsQ0FGRixFQUdFLENBQ0UsMkNBQXVCLHFCQUFJLG1CQUFKLEVBQXlCLEtBQUssV0FBTCxFQUF6QixDQUF2QixFQUFxRSxJQUFyRSxFQUEyRSxFQUFDLFFBQVEsS0FBSyxLQUFMLEVBQVQsRUFBM0UsQ0FERixDQUhGO0FBT0Q7QUFDRCx5Q0FBSSxTQUFKLENBQWMsS0FBSyxPQUFMLEVBQWQsRUFBOEIsUUFBOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlKLE9BQU8sT0FBUCxHQUFpQixJQUFJLDRCQUFKLEVBQWpCIiwiZmlsZSI6IlNob3dDdXJyZW50R2FtZVN0YXR1c0hhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBNZXNzYWdlSGFuZGxlckJhc2UgZnJvbSAnLi4vTWVzc2FnZUhhbmRsZXJCYXNlJztcbmltcG9ydCBCb3QgZnJvbSAnZmItbG9jYWwtY2hhdC1ib3QnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vLi4vY2xhc3MvVXNlcic7XG5pbXBvcnQgR29HYW1lIGZyb20gJy4uLy4uL2NsYXNzL0dhbWUnO1xuaW1wb3J0IHtHYW1lU3RhdHVzfSBmcm9tICcuLi8uLi9jbGFzcy9DbGFzc0VudW1zJztcbmltcG9ydCBQYXJzZVV0aWwgZnJvbSAnLi4vLi4vdXRpbHMvUGFyc2VVdGlsJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7UG9zdEJhY2tUeXBlcywgZ2V0Q291bnRTY29yZVVSTEJ1dHRvbn0gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge0xBTkdVQUdFX1RPX05BTUVfTUFQfSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRpb25Db25zdGFudHMnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcblxudHlwZSBQYXJhbXMgPSB7XG4gIGdhbWVJRD86ID9udW1iZXI7XG59O1xuXG5jbGFzcyBTaG93Q3VycmVudEdhbWVTdGF0dXNIYW5kbGVyIGV4dGVuZHMgTWVzc2FnZUhhbmRsZXJCYXNlIHtcbiAgZ2V0UG9zdEJhY2tUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFBvc3RCYWNrVHlwZXMuU0hPV19DVVJSRU5UX0dBTUVfU1RBVFVTO1xuICB9XG5cbiAgZ2V0UGFyYW1PYmplY3RGcm9tUG9zdGJhY2socGFyYW1zQXJyYXk6IEFycmF5PHN0cmluZz4pOiBQYXJhbXMge1xuICAgIHJldHVybiB7XG4gICAgICBnYW1lSUQ6IHBhcnNlSW50KHBhcmFtc0FycmF5WzBdLCAxMCksXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdlbkhhbmRsZSh1c2VyOiBVc2VyLCBwYXJhbXM6IFBhcmFtcyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGdhbWVJRCA9IHBhcmFtcy5nYW1lSUQ7XG5cbiAgICBpZiAoIXVzZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIEJvdC5zZW5kVGV4dCh1c2VyLmdldEZCSUQoKSwgZ290KCdub3JtYWxNZXNzYWdlLnlvdUFyZU5vdFBsYXlpbmdBbnlHYW1lJywgdXNlci5nZXRMYW5ndWFnZSgpKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ2FtZSA9IGdhbWVJRFxuICAgICAgPyBhd2FpdCBHb0dhbWUuZ2VuRW5mb3JjZShnYW1lSUQpXG4gICAgICA6IHVzZXIuZ2V0Q3VycmVudEdhbWUoKTtcblxuICAgIGNvbnN0IGlzVXNlclR1cm4gPSBnYW1lLmlzVXNlclR1cm4odXNlci5nZXRJRCgpKTtcbiAgICBjb25zdCBjdXJyZW50Q29sb3IgPSBnb3QoZ2FtZS5nZXRDdXJyZW50TW92ZUNvbG9yVGV4dCgpLCB1c2VyLmdldExhbmd1YWdlKCkpO1xuXG4gICAgY29uc3QgW29wcG9uZW50VXNlciwgaW1hZ2VVUkxdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgVXNlci5nZW5CeVVzZXJJRChnYW1lLmdldE9wcG9uZW50VXNlcklEKHVzZXIuZ2V0SUQoKSkpLFxuICAgICAgZ2FtZS5nZW5Cb2FyZEltYWdlVVJMKCksXG4gICAgXSk7XG5cbiAgICAvLyBzZW5kIHRleHQgaWYgZ2FtZSBpcyBub3Qgb3ZlciB5ZXRcbiAgICBpZiAoZ2FtZS5nZXRTdGF0dXMoKSA9PT0gR2FtZVN0YXR1cy5QTEFZSU5HKSB7XG4gICAgICBsZXQgbWVzc2FnZSA9IGlzVXNlclR1cm5cbiAgICAgICAgPyBnb3QoJ2luR2FtZU1lc3NhZ2Uuc2VsZlR1cm5Ub1BsYXknLCB1c2VyLmdldExhbmd1YWdlKCksIHtjb2xvcjogY3VycmVudENvbG9yfSlcbiAgICAgICAgOiBnb3QoJ2luR2FtZU1lc3NhZ2UuZW5lbXlUdXJuVG9QbGF5JywgdXNlci5nZXRMYW5ndWFnZSgpLCB7Y29sb3I6IGN1cnJlbnRDb2xvciwgZW5lbXk6IG9wcG9uZW50VXNlci5nZXRGaXJzdE5hbWUoKX0pO1xuXG4gICAgICBjb25zdCBsYXN0U3RvbmUgPSBnYW1lLmdldExhc3RTdG9uZVBsYXllZCgpO1xuICAgICAgaWYgKGxhc3RTdG9uZSAmJiBsYXN0U3RvbmUgIT09ICdQQVNTX01PVkUnKSB7XG4gICAgICAgIGNvbnN0IGxhc3RTdG9uZVRleHQgPSBQYXJzZVV0aWwuY29udmVydE51bWJlclBvc2l0aW9uVG9TdHJpbmcoW2xhc3RTdG9uZVswXSwgbGFzdFN0b25lWzFdXSk7XG4gICAgICAgIG1lc3NhZ2UgKz0gZ290KCdpbkdhbWVNZXNzYWdlLmxhc3RTdG9uZScsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSwge2xhc3RTdG9uZVRleHQ6IGxhc3RTdG9uZVRleHR9KTtcbiAgICAgIH1cblxuICAgICAgQm90LnNlbmRUZXh0KFxuICAgICAgICB1c2VyLmdldEZCSUQoKSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChnYW1lLmlzQ291bnRpbmdTY29yZSgpKSB7XG4gICAgICBjb25zdCBvcHBvbmVudE5hbWUgPSBnYW1lLmlzU2VsZlBsYXlpbmdHYW1lKClcbiAgICAgICAgPyBnb3QoJ2luR2FtZU1lc3NhZ2Uuc2VsZicsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSlcbiAgICAgICAgOiBvcHBvbmVudFVzZXIuZ2V0Rmlyc3ROYW1lKCk7XG4gICAgICBCb3Quc2VuZEJ1dHRvbnMoXG4gICAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgICBnb3QoJ2luR2FtZU1lc3NhZ2UuZ2FtZUluU2NvcmVDb3VudGluZycsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSwge29wcG9uZW50TmFtZX0pLFxuICAgICAgICBbXG4gICAgICAgICAgZ2V0Q291bnRTY29yZVVSTEJ1dHRvbihnb3QoJ2J1dHRvbi5jb3VudFNjb3JlJywgdXNlci5nZXRMYW5ndWFnZSgpKSwgdXNlciwge2dhbWVJRDogZ2FtZS5nZXRJRCgpfSksXG4gICAgICAgIF0sXG4gICAgICApO1xuICAgIH1cbiAgICBCb3Quc2VuZEltYWdlKHVzZXIuZ2V0RkJJRCgpLCBpbWFnZVVSTCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2hvd0N1cnJlbnRHYW1lU3RhdHVzSGFuZGxlcigpO1xuIl19
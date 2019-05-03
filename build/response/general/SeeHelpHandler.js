

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SeeHelpHandler = function (_MessageHandlerBase) {
  _inherits(SeeHelpHandler, _MessageHandlerBase);

  function SeeHelpHandler() {
    _classCallCheck(this, SeeHelpHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SeeHelpHandler).apply(this, arguments));
  }

  _createClass(SeeHelpHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SEE_HELP;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user.isPlaying()) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.genHandleInPlay(user);

              case 3:
                _context.next = 6;
                break;

              case 5:
                this.handleNormal(user);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genHandle(_x) {
        return ref.apply(this, arguments);
      }

      return genHandle;
    }()
  }, {
    key: 'genHandleInPlay',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user) {
        var game, gameID, language, buttons, _ref, _ref2, activeGames, opponent, opponentName, activeGameText;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                game = user.getCurrentGame();
                gameID = game.getID();
                language = user.getLanguage();
                buttons = [(0, _PostBackUtils.createQuickReplyButton)((0, _Translator.got)('button.showCurrentBoard', language), _PostBackUtils.PostBackTypes.SHOW_CURRENT_GAME_STATUS, [gameID]), (0, _PostBackUtils.createQuickReplyButton)((0, _Translator.got)('button.resignGame', language), _PostBackUtils.PostBackTypes.RESIGN_GAME, [gameID]), (0, _PostBackUtils.createQuickReplyButton)((0, _Translator.got)('button.playAnotherGame', language), _PostBackUtils.PostBackTypes.PLAY_ANOTHER_GAME)];


                if (!game.isCountingScore()) {
                  buttons.splice(1 /* index */
                  , 0, (0, _PostBackUtils.createQuickReplyButton)((0, _Translator.got)('button.passMove', language), _PostBackUtils.PostBackTypes.PASS_MOVE, [gameID]));
                }

                // for game with another person, add send messageData
                // if (!game.isSelfPlayingGame()) {
                //   buttons.splice(
                //     1 /* index */,
                //     0,
                //     createQuickReplyButton(got('button.sendMessage', language), PostBackTypes.SHOW_MESSAGE_VIEW),
                //   );
                // }

                if (game.getCanUserUndo(user.getID())) {
                  buttons.splice(1 /* index */
                  , 0, (0, _PostBackUtils.createQuickReplyButton)((0, _Translator.got)('button.undoMove', language), _PostBackUtils.PostBackTypes.UNDO_MOVE, [gameID]));
                }
                _context2.next = 8;
                return _bluebird2.default.all([_Game2.default.genActiveGamesForUser(user), game.genOpponentUser(user.getID())]);

              case 8:
                _ref = _context2.sent;
                _ref2 = _slicedToArray(_ref, 2);
                activeGames = _ref2[0];
                opponent = _ref2[1];
                opponentName = game.isSelfPlayingGame() ? (0, _Translator.got)('inGameMessage.self', user.getLanguage()) : opponent.getFirstName();
                activeGameText = '';

                if (activeGames.length > 1) {
                  activeGameText = (0, _Translator.got)('inGameMessage.activeGameText', language, { numActiveGames: activeGames.length }) + ' ';
                  buttons.splice(-1 /* index */
                  , 0, (0, _PostBackUtils.createQuickReplyButton)((0, _Translator.got)('button.showActiveGames', language), _PostBackUtils.PostBackTypes.SHOW_ACTIVE_GAMES));
                }

                _fbLocalChatBot2.default.sendQuickReplyWithText(user.getFBID(), (0, _Translator.got)('inGameMessage.focusOnGameWith', language, { opponentName: opponentName }) + ' ' + activeGameText + (0, _Translator.got)('inGameMessage.inGameHelp', language), buttons);

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genHandleInPlay(_x2) {
        return ref.apply(this, arguments);
      }

      return genHandleInPlay;
    }()
  }, {
    key: 'handleNormal',
    value: function handleNormal(user) {
      (0, _PostBackUtils.sendNormalHelpMenu)(user, (0, _Translator.got)('normalMessage.welcome', user.getLanguage()));
    }
  }]);

  return SeeHelpHandler;
}(_MessageHandlerBase3.default);

module.exports = new SeeHelpHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL1NlZUhlbHBIYW5kbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBRU0sYzs7Ozs7Ozs7Ozs7c0NBQ3NCO0FBQ3hCLGFBQU8sNkJBQWMsUUFBckI7QUFDRDs7OztrRkFFZSxJOzs7OztxQkFDVixLQUFLLFNBQUwsRTs7Ozs7O3VCQUNJLEtBQUssZUFBTCxDQUFxQixJQUFyQixDOzs7Ozs7O0FBRU4scUJBQUssWUFBTCxDQUFrQixJQUFsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFJa0IsSTtZQUNkLEksRUFDQSxNLEVBQ0EsUSxFQUNBLE8sZUE4QkMsVyxFQUFhLFEsRUFLZCxZLEVBSUYsYzs7Ozs7O0FBMUNFLG9CLEdBQU8sS0FBSyxjQUFMLEU7QUFDUCxzQixHQUFTLEtBQUssS0FBTCxFO0FBQ1Qsd0IsR0FBVyxLQUFLLFdBQUwsRTtBQUNYLHVCLEdBQVUsQ0FDZCwyQ0FBdUIscUJBQUkseUJBQUosRUFBK0IsUUFBL0IsQ0FBdkIsRUFBaUUsNkJBQWMsd0JBQS9FLEVBQXlHLENBQUMsTUFBRCxDQUF6RyxDQURjLEVBRWQsMkNBQXVCLHFCQUFJLG1CQUFKLEVBQXlCLFFBQXpCLENBQXZCLEVBQTJELDZCQUFjLFdBQXpFLEVBQXNGLENBQUMsTUFBRCxDQUF0RixDQUZjLEVBR2QsMkNBQXVCLHFCQUFJLHdCQUFKLEVBQThCLFFBQTlCLENBQXZCLEVBQWdFLDZCQUFjLGlCQUE5RSxDQUhjLEM7OztBQU1oQixvQkFBSSxDQUFDLEtBQUssZUFBTCxFQUFMLEVBQTZCO0FBQzNCLDBCQUFRLE1BQVIsQ0FDRSxDO0FBREYsb0JBRUUsQ0FGRixFQUdFLDJDQUF1QixxQkFBSSxpQkFBSixFQUF1QixRQUF2QixDQUF2QixFQUF5RCw2QkFBYyxTQUF2RSxFQUFrRixDQUFDLE1BQUQsQ0FBbEYsQ0FIRjtBQUtEOzs7Ozs7Ozs7OztBQVdELG9CQUFJLEtBQUssY0FBTCxDQUFvQixLQUFLLEtBQUwsRUFBcEIsQ0FBSixFQUF1QztBQUNyQywwQkFBUSxNQUFSLENBQ0UsQztBQURGLG9CQUVFLENBRkYsRUFHRSwyQ0FBdUIscUJBQUksaUJBQUosRUFBdUIsUUFBdkIsQ0FBdkIsRUFBeUQsNkJBQWMsU0FBdkUsRUFBa0YsQ0FBQyxNQUFELENBQWxGLENBSEY7QUFLRDs7dUJBQ3FDLG1CQUFRLEdBQVIsQ0FBWSxDQUNoRCxlQUFPLHFCQUFQLENBQTZCLElBQTdCLENBRGdELEVBRWhELEtBQUssZUFBTCxDQUFxQixLQUFLLEtBQUwsRUFBckIsQ0FGZ0QsQ0FBWixDOzs7OztBQUEvQiwyQjtBQUFhLHdCO0FBS2QsNEIsR0FBZSxLQUFLLGlCQUFMLEtBQ2pCLHFCQUFJLG9CQUFKLEVBQTBCLEtBQUssV0FBTCxFQUExQixDQURpQixHQUVqQixTQUFTLFlBQVQsRTtBQUVBLDhCLEdBQWlCLEU7O0FBQ3JCLG9CQUFJLFlBQVksTUFBWixHQUFxQixDQUF6QixFQUE0QjtBQUMxQixtQ0FBaUIscUJBQUksOEJBQUosRUFBb0MsUUFBcEMsRUFBOEMsRUFBQyxnQkFBZ0IsWUFBWSxNQUE3QixFQUE5QyxJQUFzRixHQUF2RztBQUNBLDBCQUFRLE1BQVIsQ0FDRSxDQUFDLEM7QUFESCxvQkFFRSxDQUZGLEVBR0UsMkNBQXVCLHFCQUFJLHdCQUFKLEVBQThCLFFBQTlCLENBQXZCLEVBQWdFLDZCQUFjLGlCQUE5RSxDQUhGO0FBS0Q7O0FBRUQseUNBQUksc0JBQUosQ0FDRSxLQUFLLE9BQUwsRUFERixFQUVFLHFCQUFJLCtCQUFKLEVBQXFDLFFBQXJDLEVBQStDLEVBQUMsMEJBQUQsRUFBL0MsSUFBaUUsR0FBakUsR0FDRSxjQURGLEdBRUUscUJBQUksMEJBQUosRUFBZ0MsUUFBaEMsQ0FKSixFQUtFLE9BTEY7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FTVyxJLEVBQWtCO0FBQzdCLDZDQUFtQixJQUFuQixFQUF5QixxQkFBSSx1QkFBSixFQUE2QixLQUFLLFdBQUwsRUFBN0IsQ0FBekI7QUFDRDs7Ozs7O0FBR0gsT0FBTyxPQUFQLEdBQWlCLElBQUksY0FBSixFQUFqQiIsImZpbGUiOiJTZWVIZWxwSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE1lc3NhZ2VIYW5kbGVyQmFzZSBmcm9tICcuLi9NZXNzYWdlSGFuZGxlckJhc2UnO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBHb0dhbWUgZnJvbSAnLi4vLi4vY2xhc3MvR2FtZSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQge3NlbmROb3JtYWxIZWxwTWVudSwgUG9zdEJhY2tUeXBlcywgY3JlYXRlUXVpY2tSZXBseUJ1dHRvbn0gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuXG5jbGFzcyBTZWVIZWxwSGFuZGxlciBleHRlbmRzIE1lc3NhZ2VIYW5kbGVyQmFzZSB7XG4gIGdldFBvc3RCYWNrVHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBQb3N0QmFja1R5cGVzLlNFRV9IRUxQO1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodXNlci5pc1BsYXlpbmcoKSkge1xuICAgICAgYXdhaXQgdGhpcy5nZW5IYW5kbGVJblBsYXkodXNlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFuZGxlTm9ybWFsKHVzZXIpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdlbkhhbmRsZUluUGxheSh1c2VyOiBVc2VyKTogUHJvbWlzZTx2b2lkPntcbiAgICBjb25zdCBnYW1lID0gdXNlci5nZXRDdXJyZW50R2FtZSgpO1xuICAgIGNvbnN0IGdhbWVJRCA9IGdhbWUuZ2V0SUQoKTtcbiAgICBjb25zdCBsYW5ndWFnZSA9IHVzZXIuZ2V0TGFuZ3VhZ2UoKTtcbiAgICBjb25zdCBidXR0b25zID0gW1xuICAgICAgY3JlYXRlUXVpY2tSZXBseUJ1dHRvbihnb3QoJ2J1dHRvbi5zaG93Q3VycmVudEJvYXJkJywgbGFuZ3VhZ2UpLCBQb3N0QmFja1R5cGVzLlNIT1dfQ1VSUkVOVF9HQU1FX1NUQVRVUywgW2dhbWVJRF0pLFxuICAgICAgY3JlYXRlUXVpY2tSZXBseUJ1dHRvbihnb3QoJ2J1dHRvbi5yZXNpZ25HYW1lJywgbGFuZ3VhZ2UpLCBQb3N0QmFja1R5cGVzLlJFU0lHTl9HQU1FLCBbZ2FtZUlEXSksXG4gICAgICBjcmVhdGVRdWlja1JlcGx5QnV0dG9uKGdvdCgnYnV0dG9uLnBsYXlBbm90aGVyR2FtZScsIGxhbmd1YWdlKSwgUG9zdEJhY2tUeXBlcy5QTEFZX0FOT1RIRVJfR0FNRSksXG4gICAgXTtcblxuICAgIGlmICghZ2FtZS5pc0NvdW50aW5nU2NvcmUoKSkge1xuICAgICAgYnV0dG9ucy5zcGxpY2UoXG4gICAgICAgIDEgLyogaW5kZXggKi8sXG4gICAgICAgIDAsXG4gICAgICAgIGNyZWF0ZVF1aWNrUmVwbHlCdXR0b24oZ290KCdidXR0b24ucGFzc01vdmUnLCBsYW5ndWFnZSksIFBvc3RCYWNrVHlwZXMuUEFTU19NT1ZFLCBbZ2FtZUlEXSksXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGZvciBnYW1lIHdpdGggYW5vdGhlciBwZXJzb24sIGFkZCBzZW5kIG1lc3NhZ2VEYXRhXG4gICAgLy8gaWYgKCFnYW1lLmlzU2VsZlBsYXlpbmdHYW1lKCkpIHtcbiAgICAvLyAgIGJ1dHRvbnMuc3BsaWNlKFxuICAgIC8vICAgICAxIC8qIGluZGV4ICovLFxuICAgIC8vICAgICAwLFxuICAgIC8vICAgICBjcmVhdGVRdWlja1JlcGx5QnV0dG9uKGdvdCgnYnV0dG9uLnNlbmRNZXNzYWdlJywgbGFuZ3VhZ2UpLCBQb3N0QmFja1R5cGVzLlNIT1dfTUVTU0FHRV9WSUVXKSxcbiAgICAvLyAgICk7XG4gICAgLy8gfVxuXG4gICAgaWYgKGdhbWUuZ2V0Q2FuVXNlclVuZG8odXNlci5nZXRJRCgpKSkge1xuICAgICAgYnV0dG9ucy5zcGxpY2UoXG4gICAgICAgIDEgLyogaW5kZXggKi8sXG4gICAgICAgIDAsXG4gICAgICAgIGNyZWF0ZVF1aWNrUmVwbHlCdXR0b24oZ290KCdidXR0b24udW5kb01vdmUnLCBsYW5ndWFnZSksIFBvc3RCYWNrVHlwZXMuVU5ET19NT1ZFLCBbZ2FtZUlEXSksXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBbYWN0aXZlR2FtZXMsIG9wcG9uZW50XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIEdvR2FtZS5nZW5BY3RpdmVHYW1lc0ZvclVzZXIodXNlciksXG4gICAgICBnYW1lLmdlbk9wcG9uZW50VXNlcih1c2VyLmdldElEKCkpLFxuICAgIF0pO1xuXG4gICAgY29uc3Qgb3Bwb25lbnROYW1lID0gZ2FtZS5pc1NlbGZQbGF5aW5nR2FtZSgpXG4gICAgICA/IGdvdCgnaW5HYW1lTWVzc2FnZS5zZWxmJywgdXNlci5nZXRMYW5ndWFnZSgpKVxuICAgICAgOiBvcHBvbmVudC5nZXRGaXJzdE5hbWUoKTtcblxuICAgIGxldCBhY3RpdmVHYW1lVGV4dCA9ICcnO1xuICAgIGlmIChhY3RpdmVHYW1lcy5sZW5ndGggPiAxKSB7XG4gICAgICBhY3RpdmVHYW1lVGV4dCA9IGdvdCgnaW5HYW1lTWVzc2FnZS5hY3RpdmVHYW1lVGV4dCcsIGxhbmd1YWdlLCB7bnVtQWN0aXZlR2FtZXM6IGFjdGl2ZUdhbWVzLmxlbmd0aH0pICsgJyAnO1xuICAgICAgYnV0dG9ucy5zcGxpY2UoXG4gICAgICAgIC0xIC8qIGluZGV4ICovLFxuICAgICAgICAwLFxuICAgICAgICBjcmVhdGVRdWlja1JlcGx5QnV0dG9uKGdvdCgnYnV0dG9uLnNob3dBY3RpdmVHYW1lcycsIGxhbmd1YWdlKSwgUG9zdEJhY2tUeXBlcy5TSE9XX0FDVElWRV9HQU1FUyksXG4gICAgICApO1xuICAgIH1cblxuICAgIEJvdC5zZW5kUXVpY2tSZXBseVdpdGhUZXh0KFxuICAgICAgdXNlci5nZXRGQklEKCksXG4gICAgICBnb3QoJ2luR2FtZU1lc3NhZ2UuZm9jdXNPbkdhbWVXaXRoJywgbGFuZ3VhZ2UsIHtvcHBvbmVudE5hbWV9KSArICcgJyArXG4gICAgICAgIGFjdGl2ZUdhbWVUZXh0ICtcbiAgICAgICAgZ290KCdpbkdhbWVNZXNzYWdlLmluR2FtZUhlbHAnLCBsYW5ndWFnZSksXG4gICAgICBidXR0b25zLFxuICAgICk7XG4gIH1cblxuICBoYW5kbGVOb3JtYWwodXNlcjogVXNlcik6IHZvaWQge1xuICAgIHNlbmROb3JtYWxIZWxwTWVudSh1c2VyLCBnb3QoJ25vcm1hbE1lc3NhZ2Uud2VsY29tZScsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSkpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNlZUhlbHBIYW5kbGVyKCk7XG4iXX0=
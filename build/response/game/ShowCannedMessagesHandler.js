

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

var _PostBackUtils = require('../PostBackUtils');

var _TranslationConstants = require('../../translations/TranslationConstants');

var _Translator = require('../../translations/Translator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowCannedMessagesHandler = function (_MessageHandlerBase) {
  _inherits(ShowCannedMessagesHandler, _MessageHandlerBase);

  function ShowCannedMessagesHandler() {
    _classCallCheck(this, ShowCannedMessagesHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ShowCannedMessagesHandler).apply(this, arguments));
  }

  _createClass(ShowCannedMessagesHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SHOW_CANNED_MESSAGES;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        var language, buttonKeys, buttons;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (user.isPlaying()) {
                  _context.next = 3;
                  break;
                }

                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('normalMessage.youAreNotPlayingAnyGame', user.getLanguage()));
                return _context.abrupt('return');

              case 3:
                language = user.getLanguage();
                buttonKeys = ['button.messageHurryUp', 'button.messageGoodMove', 'button.messageOops', 'button.messageThankYou', 'button.messageGoodGame'];
                buttons = buttonKeys.map(function (key) {
                  return (0, _PostBackUtils.createQuickReplyButton)((0, _Translator.got)(key, language), _PostBackUtils.PostBackTypes.SEND_CANNED_MESSAGE, [key]);
                });


                _fbLocalChatBot2.default.sendQuickReplyWithText(user.getFBID(), (0, _Translator.got)('inGameMessage.whatDoYouWantToSay', language), buttons);

              case 7:
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
  }]);

  return ShowCannedMessagesHandler;
}(_MessageHandlerBase3.default);

module.exports = new ShowCannedMessagesHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL1Nob3dDYW5uZWRNZXNzYWdlc0hhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVNLHlCOzs7Ozs7Ozs7OztzQ0FDc0I7QUFDeEIsYUFBTyw2QkFBYyxvQkFBckI7QUFDRDs7OztrRkFFZSxJO1lBTVIsUSxFQUNBLFUsRUFJQSxPOzs7OztvQkFWRCxLQUFLLFNBQUwsRTs7Ozs7QUFDSCx5Q0FBSSxRQUFKLENBQWEsS0FBSyxPQUFMLEVBQWIsRUFBNkIscUJBQUksdUNBQUosRUFBNkMsS0FBSyxXQUFMLEVBQTdDLENBQTdCOzs7O0FBSUksd0IsR0FBVyxLQUFLLFdBQUwsRTtBQUNYLDBCLEdBQWEsQ0FDakIsdUJBRGlCLEVBQ1Esd0JBRFIsRUFFakIsb0JBRmlCLEVBRUssd0JBRkwsRUFFK0Isd0JBRi9CLEM7QUFJYix1QixHQUFVLFdBQVcsR0FBWCxDQUFlLFVBQUMsR0FBRCxFQUFTO0FBQ3RDLHlCQUFPLDJDQUF1QixxQkFBSSxHQUFKLEVBQVMsUUFBVCxDQUF2QixFQUEyQyw2QkFBYyxtQkFBekQsRUFBOEUsQ0FBQyxHQUFELENBQTlFLENBQVA7QUFDRCxpQkFGZSxDOzs7QUFJaEIseUNBQUksc0JBQUosQ0FDRSxLQUFLLE9BQUwsRUFERixFQUVFLHFCQUFJLGtDQUFKLEVBQXdDLFFBQXhDLENBRkYsRUFHRSxPQUhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRSixPQUFPLE9BQVAsR0FBaUIsSUFBSSx5QkFBSixFQUFqQiIsImZpbGUiOiJTaG93Q2FubmVkTWVzc2FnZXNIYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWVzc2FnZUhhbmRsZXJCYXNlIGZyb20gJy4uL01lc3NhZ2VIYW5kbGVyQmFzZSc7XG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCBVc2VyIGZyb20gJy4uLy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtQb3N0QmFja1R5cGVzLCBjcmVhdGVRdWlja1JlcGx5QnV0dG9ufSBmcm9tICcuLi9Qb3N0QmFja1V0aWxzJztcbmltcG9ydCB7TEFOR1VBR0VfVE9fTkFNRV9NQVB9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdGlvbkNvbnN0YW50cyc7XG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuXG5jbGFzcyBTaG93Q2FubmVkTWVzc2FnZXNIYW5kbGVyIGV4dGVuZHMgTWVzc2FnZUhhbmRsZXJCYXNlIHtcbiAgZ2V0UG9zdEJhY2tUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFBvc3RCYWNrVHlwZXMuU0hPV19DQU5ORURfTUVTU0FHRVM7XG4gIH1cblxuICBhc3luYyBnZW5IYW5kbGUodXNlcjogVXNlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdXNlci5pc1BsYXlpbmcoKSkge1xuICAgICAgQm90LnNlbmRUZXh0KHVzZXIuZ2V0RkJJRCgpLCBnb3QoJ25vcm1hbE1lc3NhZ2UueW91QXJlTm90UGxheWluZ0FueUdhbWUnLCB1c2VyLmdldExhbmd1YWdlKCkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsYW5ndWFnZSA9IHVzZXIuZ2V0TGFuZ3VhZ2UoKTtcbiAgICBjb25zdCBidXR0b25LZXlzID0gW1xuICAgICAgJ2J1dHRvbi5tZXNzYWdlSHVycnlVcCcsICdidXR0b24ubWVzc2FnZUdvb2RNb3ZlJyxcbiAgICAgICdidXR0b24ubWVzc2FnZU9vcHMnLCAnYnV0dG9uLm1lc3NhZ2VUaGFua1lvdScsICdidXR0b24ubWVzc2FnZUdvb2RHYW1lJyxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBidXR0b25LZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICByZXR1cm4gY3JlYXRlUXVpY2tSZXBseUJ1dHRvbihnb3Qoa2V5LCBsYW5ndWFnZSksIFBvc3RCYWNrVHlwZXMuU0VORF9DQU5ORURfTUVTU0FHRSwgW2tleV0pO1xuICAgIH0pO1xuXG4gICAgQm90LnNlbmRRdWlja1JlcGx5V2l0aFRleHQoXG4gICAgICB1c2VyLmdldEZCSUQoKSxcbiAgICAgIGdvdCgnaW5HYW1lTWVzc2FnZS53aGF0RG9Zb3VXYW50VG9TYXknLCBsYW5ndWFnZSksXG4gICAgICBidXR0b25zLFxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2hvd0Nhbm5lZE1lc3NhZ2VzSGFuZGxlcigpO1xuIl19
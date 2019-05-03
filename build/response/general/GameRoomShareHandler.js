

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

var _GameRoom = require('../../class/GameRoom');

var _GameRoom2 = _interopRequireDefault(_GameRoom);

var _PostBackUtils = require('../PostBackUtils');

var _Translator = require('../../translations/Translator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameRoomShareHandler = function (_MessageHandlerBase) {
  _inherits(GameRoomShareHandler, _MessageHandlerBase);

  function GameRoomShareHandler() {
    _classCallCheck(this, GameRoomShareHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameRoomShareHandler).apply(this, arguments));
  }

  _createClass(GameRoomShareHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SEND_GAME_ROOM_SHARE;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        var language, room, element;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                language = user.getLanguage();
                _context.next = 3;
                return _GameRoom2.default.genByUser(user.getID());

              case 3:
                room = _context.sent;

                // create a share attachment for the code
                element = _fbLocalChatBot2.default.createGenericTemplateElement((0, _Translator.got)('shareFriendPlayBubbleTitle', language, { name: user.getFirstName() }), null, // itemUrl
                null, // defaultAction
                'https://www.playmessengergo.com/web/images/fb_share_logo.png', (0, _Translator.got)('shareFriendPlayBubbleContent', language, { code: room.getCode() }), [_fbLocalChatBot2.default.createShareButton()]);


                _fbLocalChatBot2.default.sendGenericTemplate(user.getFBID(), [element]);

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
  }]);

  return GameRoomShareHandler;
}(_MessageHandlerBase3.default);

module.exports = new GameRoomShareHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL0dhbWVSb29tU2hhcmVIYW5kbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUVNLG9COzs7Ozs7Ozs7OztzQ0FDc0I7QUFDeEIsYUFBTyw2QkFBYyxvQkFBckI7QUFDRDs7OztrRkFFZSxJO1lBQ1IsUSxFQUNBLEksRUFFQSxPOzs7OztBQUhBLHdCLEdBQVcsS0FBSyxXQUFMLEU7O3VCQUNFLG1CQUFTLFNBQVQsQ0FBbUIsS0FBSyxLQUFMLEVBQW5CLEM7OztBQUFiLG9COzs7QUFFQSx1QixHQUFVLHlCQUFJLDRCQUFKLENBQ2QscUJBQUksNEJBQUosRUFBa0MsUUFBbEMsRUFBNEMsRUFBQyxNQUFNLEtBQUssWUFBTCxFQUFQLEVBQTVDLENBRGMsRUFFZCxJQUZjLEU7QUFHZCxvQkFIYyxFO0FBSWQsOEVBSmMsRUFLZCxxQkFBSSw4QkFBSixFQUFvQyxRQUFwQyxFQUE4QyxFQUFDLE1BQU0sS0FBSyxPQUFMLEVBQVAsRUFBOUMsQ0FMYyxFQU1kLENBQUMseUJBQUksaUJBQUosRUFBRCxDQU5jLEM7OztBQVNoQix5Q0FBSSxtQkFBSixDQUNFLEtBQUssT0FBTCxFQURGLEVBRUUsQ0FBQyxPQUFELENBRkY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9KLE9BQU8sT0FBUCxHQUFpQixJQUFJLG9CQUFKLEVBQWpCIiwiZmlsZSI6IkdhbWVSb29tU2hhcmVIYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWVzc2FnZUhhbmRsZXJCYXNlIGZyb20gJy4uL01lc3NhZ2VIYW5kbGVyQmFzZSc7XG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCBVc2VyIGZyb20gJy4uLy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IEdhbWVSb29tIGZyb20gJy4uLy4uL2NsYXNzL0dhbWVSb29tJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7UG9zdEJhY2tUeXBlc30gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuXG5jbGFzcyBHYW1lUm9vbVNoYXJlSGFuZGxlciBleHRlbmRzIE1lc3NhZ2VIYW5kbGVyQmFzZSB7XG4gIGdldFBvc3RCYWNrVHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBQb3N0QmFja1R5cGVzLlNFTkRfR0FNRV9ST09NX1NIQVJFO1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBsYW5ndWFnZSA9IHVzZXIuZ2V0TGFuZ3VhZ2UoKTtcbiAgICBjb25zdCByb29tID0gYXdhaXQgR2FtZVJvb20uZ2VuQnlVc2VyKHVzZXIuZ2V0SUQoKSk7XG4gICAgLy8gY3JlYXRlIGEgc2hhcmUgYXR0YWNobWVudCBmb3IgdGhlIGNvZGVcbiAgICBjb25zdCBlbGVtZW50ID0gQm90LmNyZWF0ZUdlbmVyaWNUZW1wbGF0ZUVsZW1lbnQoXG4gICAgICBnb3QoJ3NoYXJlRnJpZW5kUGxheUJ1YmJsZVRpdGxlJywgbGFuZ3VhZ2UsIHtuYW1lOiB1c2VyLmdldEZpcnN0TmFtZSgpfSksXG4gICAgICBudWxsLCAvLyBpdGVtVXJsXG4gICAgICBudWxsLCAvLyBkZWZhdWx0QWN0aW9uXG4gICAgICAnaHR0cHM6Ly93d3cucGxheW1lc3NlbmdlcmdvLmNvbS93ZWIvaW1hZ2VzL2ZiX3NoYXJlX2xvZ28ucG5nJyxcbiAgICAgIGdvdCgnc2hhcmVGcmllbmRQbGF5QnViYmxlQ29udGVudCcsIGxhbmd1YWdlLCB7Y29kZTogcm9vbS5nZXRDb2RlKCl9KSxcbiAgICAgIFtCb3QuY3JlYXRlU2hhcmVCdXR0b24oKV0sXG4gICAgKTtcblxuICAgIEJvdC5zZW5kR2VuZXJpY1RlbXBsYXRlKFxuICAgICAgdXNlci5nZXRGQklEKCksXG4gICAgICBbZWxlbWVudF0sXG4gICAgKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBHYW1lUm9vbVNoYXJlSGFuZGxlcigpO1xuIl19
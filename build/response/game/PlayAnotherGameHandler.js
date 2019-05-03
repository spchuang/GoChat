

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MessageHandlerBase2 = require('../MessageHandlerBase');

var _MessageHandlerBase3 = _interopRequireDefault(_MessageHandlerBase2);

var _User = require('../../class/User');

var _User2 = _interopRequireDefault(_User);

var _PostBackUtils = require('../PostBackUtils');

var _TranslationConstants = require('../../translations/TranslationConstants');

var _Translator = require('../../translations/Translator');

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayAnotherGameHandler = function (_MessageHandlerBase) {
  _inherits(PlayAnotherGameHandler, _MessageHandlerBase);

  function PlayAnotherGameHandler() {
    _classCallCheck(this, PlayAnotherGameHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlayAnotherGameHandler).apply(this, arguments));
  }

  _createClass(PlayAnotherGameHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.PLAY_ANOTHER_GAME;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _PostBackUtils.sendNormalHelpMenu)(user, (0, _Translator.got)('normalMessage.startAnotherGame', user.getLanguage()));
                _fbLocalChatBot2.default.send(user.getFBID(), { sender_action: 'typing_on' });

              case 2:
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

  return PlayAnotherGameHandler;
}(_MessageHandlerBase3.default);

module.exports = new PlayAnotherGameHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL1BsYXlBbm90aGVyR2FtZUhhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLHNCOzs7Ozs7Ozs7OztzQ0FDc0I7QUFDeEIsYUFBTyw2QkFBYyxpQkFBckI7QUFDRDs7OztrRkFFZSxJOzs7OztBQUNkLHVEQUFtQixJQUFuQixFQUF5QixxQkFBSSxnQ0FBSixFQUFzQyxLQUFLLFdBQUwsRUFBdEMsQ0FBekI7QUFDQSx5Q0FBSSxJQUFKLENBQVMsS0FBSyxPQUFMLEVBQVQsRUFBeUIsRUFBQyxlQUFlLFdBQWhCLEVBQXpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJSixPQUFPLE9BQVAsR0FBaUIsSUFBSSxzQkFBSixFQUFqQiIsImZpbGUiOiJQbGF5QW5vdGhlckdhbWVIYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWVzc2FnZUhhbmRsZXJCYXNlIGZyb20gJy4uL01lc3NhZ2VIYW5kbGVyQmFzZSc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7c2VuZE5vcm1hbEhlbHBNZW51LCBQb3N0QmFja1R5cGVzfSBmcm9tICcuLi9Qb3N0QmFja1V0aWxzJztcbmltcG9ydCB7TEFOR1VBR0VfVE9fTkFNRV9NQVB9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdGlvbkNvbnN0YW50cyc7XG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5cbmNsYXNzIFBsYXlBbm90aGVyR2FtZUhhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5QTEFZX0FOT1RIRVJfR0FNRTtcbiAgfVxuXG4gIGFzeW5jIGdlbkhhbmRsZSh1c2VyOiBVc2VyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgc2VuZE5vcm1hbEhlbHBNZW51KHVzZXIsIGdvdCgnbm9ybWFsTWVzc2FnZS5zdGFydEFub3RoZXJHYW1lJywgdXNlci5nZXRMYW5ndWFnZSgpKSk7XG4gICAgQm90LnNlbmQodXNlci5nZXRGQklEKCksIHtzZW5kZXJfYWN0aW9uOiAndHlwaW5nX29uJ30pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBsYXlBbm90aGVyR2FtZUhhbmRsZXIoKTtcbiJdfQ==
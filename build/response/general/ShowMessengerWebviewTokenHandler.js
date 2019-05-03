

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

var _EncryptUtils = require('../../utils/EncryptUtils');

var _EncryptUtils2 = _interopRequireDefault(_EncryptUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowMessengerWebviewTokenHandler = function (_MessageHandlerBase) {
  _inherits(ShowMessengerWebviewTokenHandler, _MessageHandlerBase);

  function ShowMessengerWebviewTokenHandler() {
    _classCallCheck(this, ShowMessengerWebviewTokenHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ShowMessengerWebviewTokenHandler).apply(this, arguments));
  }

  _createClass(ShowMessengerWebviewTokenHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SHOW_MESSENGER_WEBVIEW_TOKEN;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        var encryptID;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                encryptID = _EncryptUtils2.default.encrypt(user.getFBID());


                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('normalMessage.copyAndPasteToken', user.getLanguage()));

                _fbLocalChatBot2.default.sendText(user.getFBID(), encryptID);

              case 3:
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

  return ShowMessengerWebviewTokenHandler;
}(_MessageHandlerBase3.default);

module.exports = new ShowMessengerWebviewTokenHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL1Nob3dNZXNzZW5nZXJXZWJ2aWV3VG9rZW5IYW5kbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLGdDOzs7Ozs7Ozs7OztzQ0FDc0I7QUFDeEIsYUFBTyw2QkFBYyw0QkFBckI7QUFDRDs7OztrRkFFZSxJO1lBQ1IsUzs7Ozs7QUFBQSx5QixHQUFZLHVCQUFhLE9BQWIsQ0FBcUIsS0FBSyxPQUFMLEVBQXJCLEM7OztBQUVsQix5Q0FBSSxRQUFKLENBQ0UsS0FBSyxPQUFMLEVBREYsRUFFRSxxQkFBSSxpQ0FBSixFQUF1QyxLQUFLLFdBQUwsRUFBdkMsQ0FGRjs7QUFLQSx5Q0FBSSxRQUFKLENBQ0UsS0FBSyxPQUFMLEVBREYsRUFFRSxTQUZGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPSixPQUFPLE9BQVAsR0FBaUIsSUFBSSxnQ0FBSixFQUFqQiIsImZpbGUiOiJTaG93TWVzc2VuZ2VyV2Vidmlld1Rva2VuSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE1lc3NhZ2VIYW5kbGVyQmFzZSBmcm9tICcuLi9NZXNzYWdlSGFuZGxlckJhc2UnO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7UG9zdEJhY2tUeXBlc30gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge0xBTkdVQUdFX1RPX05BTUVfTUFQfSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRpb25Db25zdGFudHMnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCBFbmNyeXB0VXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvRW5jcnlwdFV0aWxzJztcblxuY2xhc3MgU2hvd01lc3NlbmdlcldlYnZpZXdUb2tlbkhhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5TSE9XX01FU1NFTkdFUl9XRUJWSUVXX1RPS0VOO1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBlbmNyeXB0SUQgPSBFbmNyeXB0VXRpbHMuZW5jcnlwdCh1c2VyLmdldEZCSUQoKSk7XG5cbiAgICBCb3Quc2VuZFRleHQoXG4gICAgICB1c2VyLmdldEZCSUQoKSxcbiAgICAgIGdvdCgnbm9ybWFsTWVzc2FnZS5jb3B5QW5kUGFzdGVUb2tlbicsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSksXG4gICAgKTtcblxuICAgIEJvdC5zZW5kVGV4dChcbiAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgZW5jcnlwdElELFxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2hvd01lc3NlbmdlcldlYnZpZXdUb2tlbkhhbmRsZXIoKTtcbiJdfQ==
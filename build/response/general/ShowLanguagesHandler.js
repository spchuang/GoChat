

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

var ShowLanguagesHandler = function (_MessageHandlerBase) {
  _inherits(ShowLanguagesHandler, _MessageHandlerBase);

  function ShowLanguagesHandler() {
    _classCallCheck(this, ShowLanguagesHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ShowLanguagesHandler).apply(this, arguments));
  }

  _createClass(ShowLanguagesHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SHOW_LANGUAGES;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        var postBackButtons;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                postBackButtons = Object.keys(_TranslationConstants.LANGUAGE_TO_NAME_MAP).map(function (code) {
                  return (0, _PostBackUtils.createQuickReplyButton)(_TranslationConstants.LANGUAGE_TO_NAME_MAP[code], _PostBackUtils.PostBackTypes.SET_LANGUAGE, [code]);
                });


                _fbLocalChatBot2.default.sendQuickReplyWithText(user.getFBID(), (0, _Translator.got)('normalMessage.whichLanguage', user.getLanguage()), postBackButtons);

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

  return ShowLanguagesHandler;
}(_MessageHandlerBase3.default);

module.exports = new ShowLanguagesHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL1Nob3dMYW5ndWFnZXNIYW5kbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFTSxvQjs7Ozs7Ozs7Ozs7c0NBQ3NCO0FBQ3hCLGFBQU8sNkJBQWMsY0FBckI7QUFDRDs7OztrRkFFZSxJO1lBQ1IsZTs7Ozs7QUFBQSwrQixHQUFrQixPQUFPLElBQVAsNkNBQWtDLEdBQWxDLENBQXNDLFVBQUMsSUFBRCxFQUFrQjtBQUM5RSx5QkFBTywyQ0FBdUIsMkNBQXFCLElBQXJCLENBQXZCLEVBQW1ELDZCQUFjLFlBQWpFLEVBQStFLENBQUMsSUFBRCxDQUEvRSxDQUFQO0FBQ0QsaUJBRnVCLEM7OztBQUl4Qix5Q0FBSSxzQkFBSixDQUNFLEtBQUssT0FBTCxFQURGLEVBRUUscUJBQUksNkJBQUosRUFBbUMsS0FBSyxXQUFMLEVBQW5DLENBRkYsRUFHRSxlQUhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRSixPQUFPLE9BQVAsR0FBaUIsSUFBSSxvQkFBSixFQUFqQiIsImZpbGUiOiJTaG93TGFuZ3VhZ2VzSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE1lc3NhZ2VIYW5kbGVyQmFzZSBmcm9tICcuLi9NZXNzYWdlSGFuZGxlckJhc2UnO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7UG9zdEJhY2tUeXBlcywgY3JlYXRlUXVpY2tSZXBseUJ1dHRvbn0gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge0xBTkdVQUdFX1RPX05BTUVfTUFQfSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRpb25Db25zdGFudHMnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcblxuY2xhc3MgU2hvd0xhbmd1YWdlc0hhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5TSE9XX0xBTkdVQUdFUztcbiAgfVxuXG4gIGFzeW5jIGdlbkhhbmRsZSh1c2VyOiBVc2VyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcG9zdEJhY2tCdXR0b25zID0gT2JqZWN0LmtleXMoTEFOR1VBR0VfVE9fTkFNRV9NQVApLm1hcCgoY29kZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gY3JlYXRlUXVpY2tSZXBseUJ1dHRvbihMQU5HVUFHRV9UT19OQU1FX01BUFtjb2RlXSwgUG9zdEJhY2tUeXBlcy5TRVRfTEFOR1VBR0UsIFtjb2RlXSk7XG4gICAgfSk7XG5cbiAgICBCb3Quc2VuZFF1aWNrUmVwbHlXaXRoVGV4dChcbiAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgZ290KCdub3JtYWxNZXNzYWdlLndoaWNoTGFuZ3VhZ2UnLCB1c2VyLmdldExhbmd1YWdlKCkpLFxuICAgICAgcG9zdEJhY2tCdXR0b25zLFxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2hvd0xhbmd1YWdlc0hhbmRsZXIoKTtcbiJdfQ==
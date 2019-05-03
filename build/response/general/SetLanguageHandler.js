

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

var _Translator = require('../../translations/Translator');

var _Logger = require('../../logging/Logger');

var _LoggingEnums = require('../../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SetLanguageHandler = function (_MessageHandlerBase) {
  _inherits(SetLanguageHandler, _MessageHandlerBase);

  function SetLanguageHandler() {
    _classCallCheck(this, SetLanguageHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SetLanguageHandler).apply(this, arguments));
  }

  _createClass(SetLanguageHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SET_LANGUAGE;
    }
  }, {
    key: 'getParamObjectFromPostback',
    value: function getParamObjectFromPostback(paramsArray) {
      return {
        language: paramsArray[0]
      };
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user, params) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user.setLanguage(params.language);
                _context.next = 3;
                return user.genSave();

              case 3:

                new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.UPDATE_LANGUAGE).log();

                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('normalMessage.languageSaved', user.getLanguage()));

              case 5:
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

  return SetLanguageHandler;
}(_MessageHandlerBase3.default);

module.exports = new SetLanguageHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL1NldExhbmd1YWdlSGFuZGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBTU0sa0I7Ozs7Ozs7Ozs7O3NDQUNzQjtBQUN4QixhQUFPLDZCQUFjLFlBQXJCO0FBQ0Q7OzsrQ0FFMEIsVyxFQUFvQztBQUM3RCxhQUFPO0FBQ0wsa0JBQVUsWUFBWSxDQUFaO0FBREwsT0FBUDtBQUdEOzs7O2tGQUVlLEksRUFBWSxNOzs7OztBQUMxQixxQkFBSyxXQUFMLENBQWlCLE9BQU8sUUFBeEI7O3VCQUNNLEtBQUssT0FBTCxFOzs7O0FBRUwsbUNBQVcsSUFBWCxDQUFELENBQ0csUUFESCxDQUNZLDJCQUFhLGVBRHpCLEVBRUcsR0FGSDs7QUFJQSx5Q0FBSSxRQUFKLENBQ0UsS0FBSyxPQUFMLEVBREYsRUFFRSxxQkFBSSw2QkFBSixFQUFtQyxLQUFLLFdBQUwsRUFBbkMsQ0FGRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0osT0FBTyxPQUFQLEdBQWlCLElBQUksa0JBQUosRUFBakIiLCJmaWxlIjoiU2V0TGFuZ3VhZ2VIYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWVzc2FnZUhhbmRsZXJCYXNlIGZyb20gJy4uL01lc3NhZ2VIYW5kbGVyQmFzZSc7XG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCBVc2VyIGZyb20gJy4uLy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtQb3N0QmFja1R5cGVzfSBmcm9tICcuLi9Qb3N0QmFja1V0aWxzJztcbmltcG9ydCB7Z290fSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRvcic7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi4vLi4vbG9nZ2luZy9Mb2dnZXInO1xuaW1wb3J0IHtMb2dnaW5nRXZlbnR9IGZyb20gJy4uLy4uL2xvZ2dpbmcvTG9nZ2luZ0VudW1zJztcblxudHlwZSBQYXJhbXMgPSB7XG4gIGxhbmd1YWdlOiBzdHJpbmc7XG59O1xuXG5jbGFzcyBTZXRMYW5ndWFnZUhhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5TRVRfTEFOR1VBR0U7XG4gIH1cblxuICBnZXRQYXJhbU9iamVjdEZyb21Qb3N0YmFjayhwYXJhbXNBcnJheTogQXJyYXk8c3RyaW5nPik6IFBhcmFtcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhbmd1YWdlOiBwYXJhbXNBcnJheVswXSxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIsIHBhcmFtczogUGFyYW1zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdXNlci5zZXRMYW5ndWFnZShwYXJhbXMubGFuZ3VhZ2UpO1xuICAgIGF3YWl0IHVzZXIuZ2VuU2F2ZSgpO1xuXG4gICAgKG5ldyBMb2dnZXIodXNlcikpXG4gICAgICAuc2V0RXZlbnQoTG9nZ2luZ0V2ZW50LlVQREFURV9MQU5HVUFHRSlcbiAgICAgIC5sb2coKTtcblxuICAgIEJvdC5zZW5kVGV4dChcbiAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgZ290KCdub3JtYWxNZXNzYWdlLmxhbmd1YWdlU2F2ZWQnLCB1c2VyLmdldExhbmd1YWdlKCkpLFxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2V0TGFuZ3VhZ2VIYW5kbGVyKCk7XG4iXX0=
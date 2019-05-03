

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

var _Logger = require('../../logging/Logger');

var _LoggingEnums = require('../../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShareHandler = function (_MessageHandlerBase) {
  _inherits(ShareHandler, _MessageHandlerBase);

  function ShareHandler() {
    _classCallCheck(this, ShareHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ShareHandler).apply(this, arguments));
  }

  _createClass(ShareHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SHARE;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        var element;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                element = _fbLocalChatBot2.default.createGenericTemplateElement('GoChat: Play Go in Messenger', null, // itemUrl
                null, // defaultAction
                'https://www.playmessengergo.com/web/images/fb_share_logo.png', 'Play Go with your friends and people around the world using Facebook Messenger', [_fbLocalChatBot2.default.createShareButton()]);


                new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.SHARE).log();

                _fbLocalChatBot2.default.sendGenericTemplate(user.getFBID(), [element]);

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

  return ShareHandler;
}(_MessageHandlerBase3.default);

module.exports = new ShareHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL1NoYXJlSGFuZGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRU0sWTs7Ozs7Ozs7Ozs7c0NBQ3NCO0FBQ3hCLGFBQU8sNkJBQWMsS0FBckI7QUFDRDs7OztrRkFFZSxJO1lBQ1IsTzs7Ozs7QUFBQSx1QixHQUFVLHlCQUFJLDRCQUFKLENBQ2QsOEJBRGMsRUFFZCxJQUZjLEU7QUFHZCxvQkFIYyxFO0FBSWQsOEVBSmMsRUFLZCxnRkFMYyxFQU1kLENBQUMseUJBQUksaUJBQUosRUFBRCxDQU5jLEM7OztBQVNmLG1DQUFXLElBQVgsQ0FBRCxDQUNHLFFBREgsQ0FDWSwyQkFBYSxLQUR6QixFQUVHLEdBRkg7O0FBSUEseUNBQUksbUJBQUosQ0FDRSxLQUFLLE9BQUwsRUFERixFQUVFLENBQUMsT0FBRCxDQUZGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPSixPQUFPLE9BQVAsR0FBaUIsSUFBSSxZQUFKLEVBQWpCIiwiZmlsZSI6IlNoYXJlSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE1lc3NhZ2VIYW5kbGVyQmFzZSBmcm9tICcuLi9NZXNzYWdlSGFuZGxlckJhc2UnO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7UG9zdEJhY2tUeXBlc30gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi4vLi4vbG9nZ2luZy9Mb2dnZXInO1xuaW1wb3J0IHtMb2dnaW5nRXZlbnR9IGZyb20gJy4uLy4uL2xvZ2dpbmcvTG9nZ2luZ0VudW1zJztcblxuY2xhc3MgU2hhcmVIYW5kbGVyIGV4dGVuZHMgTWVzc2FnZUhhbmRsZXJCYXNlIHtcbiAgZ2V0UG9zdEJhY2tUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFBvc3RCYWNrVHlwZXMuU0hBUkU7XG4gIH1cblxuICBhc3luYyBnZW5IYW5kbGUodXNlcjogVXNlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBCb3QuY3JlYXRlR2VuZXJpY1RlbXBsYXRlRWxlbWVudChcbiAgICAgICdHb0NoYXQ6IFBsYXkgR28gaW4gTWVzc2VuZ2VyJyxcbiAgICAgIG51bGwsIC8vIGl0ZW1VcmxcbiAgICAgIG51bGwsIC8vIGRlZmF1bHRBY3Rpb25cbiAgICAgICdodHRwczovL3d3dy5wbGF5bWVzc2VuZ2VyZ28uY29tL3dlYi9pbWFnZXMvZmJfc2hhcmVfbG9nby5wbmcnLFxuICAgICAgJ1BsYXkgR28gd2l0aCB5b3VyIGZyaWVuZHMgYW5kIHBlb3BsZSBhcm91bmQgdGhlIHdvcmxkIHVzaW5nIEZhY2Vib29rIE1lc3NlbmdlcicsXG4gICAgICBbQm90LmNyZWF0ZVNoYXJlQnV0dG9uKCldLFxuICAgICk7XG5cbiAgICAobmV3IExvZ2dlcih1c2VyKSlcbiAgICAgIC5zZXRFdmVudChMb2dnaW5nRXZlbnQuU0hBUkUpXG4gICAgICAubG9nKCk7XG5cbiAgICBCb3Quc2VuZEdlbmVyaWNUZW1wbGF0ZShcbiAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgW2VsZW1lbnRdLFxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2hhcmVIYW5kbGVyKCk7XG4iXX0=
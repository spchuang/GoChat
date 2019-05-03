

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SendCannedMessageHandler = function (_MessageHandlerBase) {
  _inherits(SendCannedMessageHandler, _MessageHandlerBase);

  function SendCannedMessageHandler() {
    _classCallCheck(this, SendCannedMessageHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SendCannedMessageHandler).apply(this, arguments));
  }

  _createClass(SendCannedMessageHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SEND_CANNED_MESSAGE;
    }
  }, {
    key: 'getParamObjectFromPostback',
    value: function getParamObjectFromPostback(paramsArray) {
      return {
        cannedMessage: paramsArray[0]
      };
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user, params) {
        var game, opponent, language;
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
                game = user.getCurrentGame();
                // if (game.isSelfPlayingGame()) {
                //   Bot.sendText(user.getFBID(), got('inGameMessage.noSendMessageToSelf', user.getLanguage()));
                //   return;
                // }

                _context.next = 6;
                return game.genOpponentUser(user.getID());

              case 6:
                opponent = _context.sent;
                language = opponent.getLanguage();


                _fbLocalChatBot2.default.sendText(opponent.getFBID(), (0, _Translator.got)('inGameMessage.receivedMessageFromOpponent', language,
                // $FlowFixMe: dont have a good way to do type conversion
                { enemy: user.getFirstName(), message: (0, _Translator.got)(params.cannedMessage, language) }));

              case 9:
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

  return SendCannedMessageHandler;
}(_MessageHandlerBase3.default);

module.exports = new SendCannedMessageHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL1NlbmRDYW5uZWRNZXNzYWdlSGFuZGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBTU0sd0I7Ozs7Ozs7Ozs7O3NDQUNzQjtBQUN4QixhQUFPLDZCQUFjLG1CQUFyQjtBQUNEOzs7K0NBRTBCLFcsRUFBb0M7QUFDN0QsYUFBTztBQUNMLHVCQUFlLFlBQVksQ0FBWjtBQURWLE9BQVA7QUFHRDs7OztrRkFFZSxJLEVBQVksTTtZQU1wQixJLEVBTUEsUSxFQUNBLFE7Ozs7O29CQVpELEtBQUssU0FBTCxFOzs7OztBQUNILHlDQUFJLFFBQUosQ0FBYSxLQUFLLE9BQUwsRUFBYixFQUE2QixxQkFBSSx1Q0FBSixFQUE2QyxLQUFLLFdBQUwsRUFBN0MsQ0FBN0I7Ozs7QUFJSSxvQixHQUFPLEtBQUssY0FBTCxFOzs7Ozs7O3VCQU1VLEtBQUssZUFBTCxDQUFxQixLQUFLLEtBQUwsRUFBckIsQzs7O0FBQWpCLHdCO0FBQ0Esd0IsR0FBVyxTQUFTLFdBQVQsRTs7O0FBRWpCLHlDQUFJLFFBQUosQ0FDRSxTQUFTLE9BQVQsRUFERixFQUVFLHFCQUNFLDJDQURGLEVBRUUsUUFGRjs7QUFJRSxrQkFBQyxPQUFPLEtBQUssWUFBTCxFQUFSLEVBQTZCLFNBQVMscUJBQUksT0FBTyxhQUFYLEVBQTBCLFFBQTFCLENBQXRDLEVBSkYsQ0FGRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUosT0FBTyxPQUFQLEdBQWlCLElBQUksd0JBQUosRUFBakIiLCJmaWxlIjoiU2VuZENhbm5lZE1lc3NhZ2VIYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWVzc2FnZUhhbmRsZXJCYXNlIGZyb20gJy4uL01lc3NhZ2VIYW5kbGVyQmFzZSc7XG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCBVc2VyIGZyb20gJy4uLy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtQb3N0QmFja1R5cGVzfSBmcm9tICcuLi9Qb3N0QmFja1V0aWxzJztcbmltcG9ydCB7Z290fSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRvcic7XG5cbnR5cGUgUGFyYW1zID0ge1xuICBjYW5uZWRNZXNzYWdlOiBzdHJpbmc7XG59O1xuXG5jbGFzcyBTZW5kQ2FubmVkTWVzc2FnZUhhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5TRU5EX0NBTk5FRF9NRVNTQUdFO1xuICB9XG5cbiAgZ2V0UGFyYW1PYmplY3RGcm9tUG9zdGJhY2socGFyYW1zQXJyYXk6IEFycmF5PHN0cmluZz4pOiBQYXJhbXMge1xuICAgIHJldHVybiB7XG4gICAgICBjYW5uZWRNZXNzYWdlOiBwYXJhbXNBcnJheVswXSxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIsIHBhcmFtczogUGFyYW1zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF1c2VyLmlzUGxheWluZygpKSB7XG4gICAgICBCb3Quc2VuZFRleHQodXNlci5nZXRGQklEKCksIGdvdCgnbm9ybWFsTWVzc2FnZS55b3VBcmVOb3RQbGF5aW5nQW55R2FtZScsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGdhbWUgPSB1c2VyLmdldEN1cnJlbnRHYW1lKCk7XG4gICAgLy8gaWYgKGdhbWUuaXNTZWxmUGxheWluZ0dhbWUoKSkge1xuICAgIC8vICAgQm90LnNlbmRUZXh0KHVzZXIuZ2V0RkJJRCgpLCBnb3QoJ2luR2FtZU1lc3NhZ2Uubm9TZW5kTWVzc2FnZVRvU2VsZicsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSkpO1xuICAgIC8vICAgcmV0dXJuO1xuICAgIC8vIH1cblxuICAgIGNvbnN0IG9wcG9uZW50ID0gYXdhaXQgZ2FtZS5nZW5PcHBvbmVudFVzZXIodXNlci5nZXRJRCgpKTtcbiAgICBjb25zdCBsYW5ndWFnZSA9IG9wcG9uZW50LmdldExhbmd1YWdlKCk7XG5cbiAgICBCb3Quc2VuZFRleHQoXG4gICAgICBvcHBvbmVudC5nZXRGQklEKCksXG4gICAgICBnb3QoXG4gICAgICAgICdpbkdhbWVNZXNzYWdlLnJlY2VpdmVkTWVzc2FnZUZyb21PcHBvbmVudCcsXG4gICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAvLyAkRmxvd0ZpeE1lOiBkb250IGhhdmUgYSBnb29kIHdheSB0byBkbyB0eXBlIGNvbnZlcnNpb25cbiAgICAgICAge2VuZW15OiB1c2VyLmdldEZpcnN0TmFtZSgpLCBtZXNzYWdlOiBnb3QocGFyYW1zLmNhbm5lZE1lc3NhZ2UsIGxhbmd1YWdlKX0sXG4gICAgICApLFxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2VuZENhbm5lZE1lc3NhZ2VIYW5kbGVyKCk7XG4iXX0=
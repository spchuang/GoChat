

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

var _Game = require('../../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _PostBackUtils = require('../PostBackUtils');

var _Translator = require('../../translations/Translator');

var _ShowCurrentGameStatusHandler = require('./ShowCurrentGameStatusHandler');

var _ShowCurrentGameStatusHandler2 = _interopRequireDefault(_ShowCurrentGameStatusHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FocusGameHandler = function (_MessageHandlerBase) {
  _inherits(FocusGameHandler, _MessageHandlerBase);

  function FocusGameHandler() {
    _classCallCheck(this, FocusGameHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FocusGameHandler).apply(this, arguments));
  }

  _createClass(FocusGameHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.FOCUS_ON_GAME;
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
        var gameID, game;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                gameID = params.gameID;

                if (!(user.getCurrentGameID() === gameID)) {
                  _context.next = 4;
                  break;
                }

                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('inGameMessage.alreadyFocusedOnTheGame', user.getLanguage()));
                return _context.abrupt('return');

              case 4:
                _context.next = 6;
                return _Game2.default.genEnforce(gameID);

              case 6:
                game = _context.sent;

                if (!game.isOver()) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt('return');

              case 9:

                user.setCurrentGameID(gameID);
                _context.next = 12;
                return user.genSave();

              case 12:
                _context.next = 14;
                return _ShowCurrentGameStatusHandler2.default.genHandle(user, { gameID: gameID });

              case 14:
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

  return FocusGameHandler;
}(_MessageHandlerBase3.default);

module.exports = new FocusGameHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL0ZvY3VzR2FtZUhhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFNTSxnQjs7Ozs7Ozs7Ozs7c0NBQ3NCO0FBQ3hCLGFBQU8sNkJBQWMsYUFBckI7QUFDRDs7OytDQUUwQixXLEVBQW9DO0FBQzdELGFBQU87QUFDTCxnQkFBUSxTQUFTLFlBQVksQ0FBWixDQUFULEVBQXlCLEVBQXpCO0FBREgsT0FBUDtBQUdEOzs7O2tGQUVlLEksRUFBWSxNO1lBQ3BCLE0sRUFNQSxJOzs7OztBQU5BLHNCLEdBQVMsT0FBTyxNOztzQkFDbEIsS0FBSyxnQkFBTCxPQUE0QixNOzs7OztBQUM5Qix5Q0FBSSxRQUFKLENBQWEsS0FBSyxPQUFMLEVBQWIsRUFBNkIscUJBQUksdUNBQUosRUFBNkMsS0FBSyxXQUFMLEVBQTdDLENBQTdCOzs7Ozt1QkFJaUIsZUFBTyxVQUFQLENBQWtCLE1BQWxCLEM7OztBQUFiLG9COztxQkFDRixLQUFLLE1BQUwsRTs7Ozs7Ozs7O0FBSUoscUJBQUssZ0JBQUwsQ0FBc0IsTUFBdEI7O3VCQUNNLEtBQUssT0FBTCxFOzs7O3VCQUNBLHVDQUE2QixTQUE3QixDQUF1QyxJQUF2QyxFQUE2QyxFQUFDLGNBQUQsRUFBN0MsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSVYsT0FBTyxPQUFQLEdBQWlCLElBQUksZ0JBQUosRUFBakIiLCJmaWxlIjoiRm9jdXNHYW1lSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE1lc3NhZ2VIYW5kbGVyQmFzZSBmcm9tICcuLi9NZXNzYWdlSGFuZGxlckJhc2UnO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBHb0dhbWUgZnJvbSAnLi4vLi4vY2xhc3MvR2FtZSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQge1Bvc3RCYWNrVHlwZXN9IGZyb20gJy4uL1Bvc3RCYWNrVXRpbHMnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCBTaG93Q3VycmVudEdhbWVTdGF0dXNIYW5kbGVyIGZyb20gJy4vU2hvd0N1cnJlbnRHYW1lU3RhdHVzSGFuZGxlcic7XG5cbnR5cGUgUGFyYW1zID0ge1xuICBnYW1lSUQ6IG51bWJlcjtcbn07XG5cbmNsYXNzIEZvY3VzR2FtZUhhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5GT0NVU19PTl9HQU1FO1xuICB9XG5cbiAgZ2V0UGFyYW1PYmplY3RGcm9tUG9zdGJhY2socGFyYW1zQXJyYXk6IEFycmF5PHN0cmluZz4pOiBQYXJhbXMge1xuICAgIHJldHVybiB7XG4gICAgICBnYW1lSUQ6IHBhcnNlSW50KHBhcmFtc0FycmF5WzBdLCAxMCksXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdlbkhhbmRsZSh1c2VyOiBVc2VyLCBwYXJhbXM6IFBhcmFtcyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGdhbWVJRCA9IHBhcmFtcy5nYW1lSUQ7XG4gICAgaWYgKHVzZXIuZ2V0Q3VycmVudEdhbWVJRCgpID09PSBnYW1lSUQpIHtcbiAgICAgIEJvdC5zZW5kVGV4dCh1c2VyLmdldEZCSUQoKSwgZ290KCdpbkdhbWVNZXNzYWdlLmFscmVhZHlGb2N1c2VkT25UaGVHYW1lJywgdXNlci5nZXRMYW5ndWFnZSgpKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ2FtZSA9IGF3YWl0IEdvR2FtZS5nZW5FbmZvcmNlKGdhbWVJRCk7XG4gICAgaWYgKGdhbWUuaXNPdmVyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB1c2VyLnNldEN1cnJlbnRHYW1lSUQoZ2FtZUlEKTtcbiAgICBhd2FpdCB1c2VyLmdlblNhdmUoKTtcbiAgICBhd2FpdCBTaG93Q3VycmVudEdhbWVTdGF0dXNIYW5kbGVyLmdlbkhhbmRsZSh1c2VyLCB7Z2FtZUlEfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRm9jdXNHYW1lSGFuZGxlcigpO1xuIl19
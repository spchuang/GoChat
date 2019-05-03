

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MessageHandlerBase2 = require('../MessageHandlerBase');

var _MessageHandlerBase3 = _interopRequireDefault(_MessageHandlerBase2);

var _User = require('../../class/User');

var _User2 = _interopRequireDefault(_User);

var _Game = require('../../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _GameRoom = require('../../class/GameRoom');

var _GameRoom2 = _interopRequireDefault(_GameRoom);

var _ParseUtil = require('../../utils/ParseUtil');

var _ParseUtil2 = _interopRequireDefault(_ParseUtil);

var _PostBackUtils = require('../PostBackUtils');

var _CreateGameMessage = require('./CreateGameMessage');

var _CreateGameMessage2 = _interopRequireDefault(_CreateGameMessage);

var _Logger = require('../../logging/Logger');

var _LoggingEnums = require('../../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JoinGameRoomHandler = function (_MessageHandlerBase) {
  _inherits(JoinGameRoomHandler, _MessageHandlerBase);

  function JoinGameRoomHandler() {
    _classCallCheck(this, JoinGameRoomHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(JoinGameRoomHandler).apply(this, arguments));
  }

  _createClass(JoinGameRoomHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.JOIN_GAME_WITH_CODE;
    }
  }, {
    key: 'getParamObjectFromPostback',
    value: function getParamObjectFromPostback(paramsArray) {
      return {
        code: paramsArray[0]
      };
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user, params) {
        var code, room, owner, blackPlayer, whitePlayer, game, logger;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                code = params.code;

                if (_ParseUtil2.default.isProperGameRoomCode(code)) {
                  _context.next = 3;
                  break;
                }

                throw new TypedError(EXCEPTION.NOT_PROPER_GAME_CODE);

              case 3:
                _context.next = 5;
                return _GameRoom2.default.genByCode(code);

              case 5:
                room = _context.sent;

                if (room) {
                  _context.next = 8;
                  break;
                }

                throw new TypedError(EXCEPTION.NO_ROOM_WITH_CODE, { code: code });

              case 8:
                if (!(room.getOwnerID() === user.getID())) {
                  _context.next = 10;
                  break;
                }

                throw new TypedError(EXCEPTION.CANT_JOIN_OWN_ROOM);

              case 10:
                _context.next = 12;
                return _User2.default.genByUserID(room.getOwnerID());

              case 12:
                owner = _context.sent;
                blackPlayer = void 0, whitePlayer = void 0;

                if (room.getIsOwnerBlack()) {
                  blackPlayer = owner;
                  whitePlayer = user;
                } else {
                  blackPlayer = user;
                  whitePlayer = owner;
                }

                _context.next = 17;
                return _Game2.default.genCreateGame(blackPlayer, whitePlayer, room.getBoardSize(), room.getHandicap(), room.getKomi());

              case 17:
                game = _context.sent;
                logger = new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.JOIN_GAME_ROOM).setTargetClass(_LoggingEnums.LoggingTargetClass.GAME_ROOM).setTargetID(room.getID());

                // remove game room

                _context.next = 21;
                return _GameRoom2.default.genRemoveRoomForUser(owner);

              case 21:
                _context.next = 23;
                return _CreateGameMessage2.default.genSend(game);

              case 23:

                logger.log();

              case 24:
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

  return JoinGameRoomHandler;
}(_MessageHandlerBase3.default);

module.exports = new JoinGameRoomHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL0pvaW5HYW1lUm9vbUhhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQU1NLG1COzs7Ozs7Ozs7OztzQ0FDc0I7QUFDeEIsYUFBTyw2QkFBYyxtQkFBckI7QUFDRDs7OytDQUUwQixXLEVBQW9DO0FBQzdELGFBQU87QUFDTCxjQUFNLFlBQVksQ0FBWjtBQURELE9BQVA7QUFHRDs7OztrRkFFZSxJLEVBQVksTTtZQUNwQixJLEVBS0YsSSxFQWFFLEssRUFDRixXLEVBQWEsVyxFQVNYLEksRUFRQSxNOzs7OztBQXBDQSxvQixHQUFPLE9BQU8sSTs7b0JBQ2Ysb0JBQVUsb0JBQVYsQ0FBK0IsSUFBL0IsQzs7Ozs7c0JBQ0csSUFBSSxVQUFKLENBQWUsVUFBVSxvQkFBekIsQzs7Ozt1QkFHUyxtQkFBUyxTQUFULENBQW1CLElBQW5CLEM7OztBQUFiLG9COztvQkFFQyxJOzs7OztzQkFDRyxJQUFJLFVBQUosQ0FDSixVQUFVLGlCQUROLEVBRUosRUFBQyxNQUFNLElBQVAsRUFGSSxDOzs7c0JBTUosS0FBSyxVQUFMLE9BQXNCLEtBQUssS0FBTCxFOzs7OztzQkFDbEIsSUFBSSxVQUFKLENBQWUsVUFBVSxrQkFBekIsQzs7Ozt1QkFHWSxlQUFLLFdBQUwsQ0FBaUIsS0FBSyxVQUFMLEVBQWpCLEM7OztBQUFkLHFCO0FBQ0YsMkIsV0FBYSxXOztBQUNqQixvQkFBSSxLQUFLLGVBQUwsRUFBSixFQUE0QjtBQUMxQixnQ0FBYyxLQUFkO0FBQ0EsZ0NBQWMsSUFBZDtBQUNELGlCQUhELE1BR087QUFDTCxnQ0FBYyxJQUFkO0FBQ0EsZ0NBQWMsS0FBZDtBQUNEOzs7dUJBRWtCLGVBQU8sYUFBUCxDQUNqQixXQURpQixFQUVqQixXQUZpQixFQUdqQixLQUFLLFlBQUwsRUFIaUIsRUFJakIsS0FBSyxXQUFMLEVBSmlCLEVBS2pCLEtBQUssT0FBTCxFQUxpQixDOzs7QUFBYixvQjtBQVFBLHNCLEdBQVUsbUJBQVcsSUFBWCxDQUFELENBQ1osUUFEWSxDQUNILDJCQUFhLGNBRFYsRUFFWixjQUZZLENBRUcsaUNBQW1CLFNBRnRCLEVBR1osV0FIWSxDQUdBLEtBQUssS0FBTCxFQUhBLEM7Ozs7O3VCQU1ULG1CQUFTLG9CQUFULENBQThCLEtBQTlCLEM7Ozs7dUJBQ0EsNEJBQWtCLE9BQWxCLENBQTBCLElBQTFCLEM7Ozs7QUFFTix1QkFBTyxHQUFQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJSixPQUFPLE9BQVAsR0FBaUIsSUFBSSxtQkFBSixFQUFqQiIsImZpbGUiOiJKb2luR2FtZVJvb21IYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWVzc2FnZUhhbmRsZXJCYXNlIGZyb20gJy4uL01lc3NhZ2VIYW5kbGVyQmFzZSc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBHb0dhbWUgZnJvbSAnLi4vLi4vY2xhc3MvR2FtZSc7XG5pbXBvcnQgR2FtZVJvb20gZnJvbSAnLi4vLi4vY2xhc3MvR2FtZVJvb20nO1xuaW1wb3J0IFBhcnNlVXRpbCBmcm9tICcuLi8uLi91dGlscy9QYXJzZVV0aWwnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtQb3N0QmFja1R5cGVzfSBmcm9tICcuLi9Qb3N0QmFja1V0aWxzJztcbmltcG9ydCBDcmVhdGVHYW1lTWVzc2FnZSBmcm9tICcuL0NyZWF0ZUdhbWVNZXNzYWdlJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi8uLi9sb2dnaW5nL0xvZ2dlcic7XG5pbXBvcnQge0xvZ2dpbmdFdmVudCwgTG9nZ2luZ1RhcmdldENsYXNzfSBmcm9tICcuLi8uLi9sb2dnaW5nL0xvZ2dpbmdFbnVtcyc7XG5cbnR5cGUgUGFyYW1zID0ge1xuICBjb2RlOiBzdHJpbmc7XG59O1xuXG5jbGFzcyBKb2luR2FtZVJvb21IYW5kbGVyIGV4dGVuZHMgTWVzc2FnZUhhbmRsZXJCYXNlIHtcbiAgZ2V0UG9zdEJhY2tUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFBvc3RCYWNrVHlwZXMuSk9JTl9HQU1FX1dJVEhfQ09ERTtcbiAgfVxuXG4gIGdldFBhcmFtT2JqZWN0RnJvbVBvc3RiYWNrKHBhcmFtc0FycmF5OiBBcnJheTxzdHJpbmc+KTogUGFyYW1zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29kZTogcGFyYW1zQXJyYXlbMF0sXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdlbkhhbmRsZSh1c2VyOiBVc2VyLCBwYXJhbXM6IFBhcmFtcyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvZGUgPSBwYXJhbXMuY29kZTtcbiAgICBpZiAoIVBhcnNlVXRpbC5pc1Byb3BlckdhbWVSb29tQ29kZShjb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVkRXJyb3IoRVhDRVBUSU9OLk5PVF9QUk9QRVJfR0FNRV9DT0RFKTtcbiAgICB9XG5cbiAgICB2YXIgcm9vbSA9IGF3YWl0IEdhbWVSb29tLmdlbkJ5Q29kZShjb2RlKTtcbiAgICAvLyBtYWtlIHN1cmUgdXNlciBkb2Vzbid0IGhhdmUgYW55IGdhbWUgcm9vbSBvcGVuXG4gICAgaWYgKCFyb29tKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZWRFcnJvcihcbiAgICAgICAgRVhDRVBUSU9OLk5PX1JPT01fV0lUSF9DT0RFLFxuICAgICAgICB7Y29kZTogY29kZX0sXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChyb29tLmdldE93bmVySUQoKSA9PT0gdXNlci5nZXRJRCgpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZWRFcnJvcihFWENFUFRJT04uQ0FOVF9KT0lOX09XTl9ST09NKTtcbiAgICB9XG5cbiAgICBjb25zdCBvd25lciA9IGF3YWl0IFVzZXIuZ2VuQnlVc2VySUQocm9vbS5nZXRPd25lcklEKCkpO1xuICAgIGxldCBibGFja1BsYXllciwgd2hpdGVQbGF5ZXI7XG4gICAgaWYgKHJvb20uZ2V0SXNPd25lckJsYWNrKCkpIHtcbiAgICAgIGJsYWNrUGxheWVyID0gb3duZXI7XG4gICAgICB3aGl0ZVBsYXllciA9IHVzZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJsYWNrUGxheWVyID0gdXNlcjtcbiAgICAgIHdoaXRlUGxheWVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgY29uc3QgZ2FtZSA9IGF3YWl0IEdvR2FtZS5nZW5DcmVhdGVHYW1lKFxuICAgICAgYmxhY2tQbGF5ZXIsXG4gICAgICB3aGl0ZVBsYXllcixcbiAgICAgIHJvb20uZ2V0Qm9hcmRTaXplKCksXG4gICAgICByb29tLmdldEhhbmRpY2FwKCksXG4gICAgICByb29tLmdldEtvbWkoKSxcbiAgICApO1xuXG4gICAgY29uc3QgbG9nZ2VyID0gKG5ldyBMb2dnZXIodXNlcikpXG4gICAgICAuc2V0RXZlbnQoTG9nZ2luZ0V2ZW50LkpPSU5fR0FNRV9ST09NKVxuICAgICAgLnNldFRhcmdldENsYXNzKExvZ2dpbmdUYXJnZXRDbGFzcy5HQU1FX1JPT00pXG4gICAgICAuc2V0VGFyZ2V0SUQocm9vbS5nZXRJRCgpKTtcblxuICAgIC8vIHJlbW92ZSBnYW1lIHJvb21cbiAgICBhd2FpdCBHYW1lUm9vbS5nZW5SZW1vdmVSb29tRm9yVXNlcihvd25lcilcbiAgICBhd2FpdCBDcmVhdGVHYW1lTWVzc2FnZS5nZW5TZW5kKGdhbWUpO1xuXG4gICAgbG9nZ2VyLmxvZygpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEpvaW5HYW1lUm9vbUhhbmRsZXIoKTtcbiJdfQ==
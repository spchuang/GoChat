

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

var _CommonUtils = require('../../utils/CommonUtils');

var _GameRoomShareHandler = require('../general/GameRoomShareHandler');

var _GameRoomShareHandler2 = _interopRequireDefault(_GameRoomShareHandler);

var _Logger = require('../../logging/Logger');

var _LoggingEnums = require('../../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateGameRoomHandler = function (_MessageHandlerBase) {
  _inherits(CreateGameRoomHandler, _MessageHandlerBase);

  function CreateGameRoomHandler() {
    _classCallCheck(this, CreateGameRoomHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CreateGameRoomHandler).apply(this, arguments));
  }

  _createClass(CreateGameRoomHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.CREATE_PRIVATE_ROOM;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        var language;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // this is unit test only
                language = user.getLanguage();
                _context.prev = 1;
                _context.next = 4;
                return this.genCreatePrivateRoom(user, 19, 'black', 0, 6.5);

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](1);

                if (_context.t0.code === EXCEPTION.ROOM_ALREADY_CREATED) {
                  _fbLocalChatBot2.default.sendButtons(user.getFBID(), _context.t0.getErrorMessage(language), [(0, _PostBackUtils.createPostbackButton)((0, _Translator.got)('button.shareRoom', language), _PostBackUtils.PostBackTypes.SEND_GAME_ROOM_SHARE)]);
                }

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6]]);
      }));

      function genHandle(_x) {
        return ref.apply(this, arguments);
      }

      return genHandle;
    }()
  }, {
    key: 'genCreatePrivateRoom',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user, size, color, handicap, komi) {
        var language, room, code, roomWithCode;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                language = user.getLanguage();
                _context2.next = 3;
                return _GameRoom2.default.genByUser(user.getID());

              case 3:
                room = _context2.sent;

                if (!room) {
                  _context2.next = 6;
                  break;
                }

                throw new TypedError(EXCEPTION.ROOM_ALREADY_CREATED, { roomCode: room.getCode() });

              case 6:

                // randomly gnerate a game code right away.
                code = '';
                roomWithCode = void 0;

              case 8:
                code = (0, _CommonUtils.getRandomGameCode)();
                _context2.next = 11;
                return _GameRoom2.default.genByCode(code);

              case 11:
                roomWithCode = _context2.sent;

              case 12:
                if (
                // if room already, exists try again
                roomWithCode) {
                  _context2.next = 8;
                  break;
                }

              case 13:
                _context2.next = 15;
                return _GameRoom2.default.genCreatePrivateRoom(user.getID(), code, size, color, handicap, komi);

              case 15:
                room = _context2.sent;


                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('normalMessage.roomCreated', language, { code: room.getCode() }));
                _context2.next = 19;
                return _GameRoomShareHandler2.default.genHandle(user);

              case 19:

                new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.CREATE_GAME_ROOM).setTargetClass(_LoggingEnums.LoggingTargetClass.GAME_ROOM).setTargetID(room.getID()).setExtraData({ size: size, color: color, komi: komi, handicap: handicap }).log();

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genCreatePrivateRoom(_x2, _x3, _x4, _x5, _x6) {
        return ref.apply(this, arguments);
      }

      return genCreatePrivateRoom;
    }()
  }]);

  return CreateGameRoomHandler;
}(_MessageHandlerBase3.default);

module.exports = new CreateGameRoomHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL0NyZWF0ZUdhbWVSb29tSGFuZGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVNLHFCOzs7Ozs7Ozs7OztzQ0FDc0I7QUFDeEIsYUFBTyw2QkFBYyxtQkFBckI7QUFDRDs7OztrRkFFZSxJO1lBRVIsUTs7Ozs7O0FBQUEsd0IsR0FBVyxLQUFLLFdBQUwsRTs7O3VCQUVULEtBQUssb0JBQUwsQ0FBMEIsSUFBMUIsRUFBZ0MsRUFBaEMsRUFBb0MsT0FBcEMsRUFBNkMsQ0FBN0MsRUFBZ0QsR0FBaEQsQzs7Ozs7Ozs7OztBQUVOLG9CQUFJLFlBQUksSUFBSixLQUFhLFVBQVUsb0JBQTNCLEVBQWlEO0FBQy9DLDJDQUFJLFdBQUosQ0FDRSxLQUFLLE9BQUwsRUFERixFQUVFLFlBQUksZUFBSixDQUFvQixRQUFwQixDQUZGLEVBR0UsQ0FDRSx5Q0FDRSxxQkFBSSxrQkFBSixFQUF3QixRQUF4QixDQURGLEVBRUUsNkJBQWMsb0JBRmhCLENBREYsQ0FIRjtBQVVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21GQUtILEksRUFDQSxJLEVBQ0EsSyxFQUNBLFEsRUFDQSxJO1lBRU0sUSxFQUNGLEksRUFTQSxJLEVBQ0EsWTs7Ozs7QUFYRSx3QixHQUFXLEtBQUssV0FBTCxFOzt1QkFDQSxtQkFBUyxTQUFULENBQW1CLEtBQUssS0FBTCxFQUFuQixDOzs7QUFBYixvQjs7cUJBQ0EsSTs7Ozs7c0JBQ0ksSUFBSSxVQUFKLENBQ0osVUFBVSxvQkFETixFQUVKLEVBQUMsVUFBVSxLQUFLLE9BQUwsRUFBWCxFQUZJLEM7Ozs7O0FBT0osb0IsR0FBTyxFO0FBQ1AsNEI7OztBQUVGLHVCQUFPLHFDQUFQOzt1QkFDcUIsbUJBQVMsU0FBVCxDQUFtQixJQUFuQixDOzs7QUFBckIsNEI7Ozs7O0FBRU8sNEI7Ozs7Ozs7dUJBRUksbUJBQVMsb0JBQVQsQ0FDWCxLQUFLLEtBQUwsRUFEVyxFQUVYLElBRlcsRUFHWCxJQUhXLEVBSVgsS0FKVyxFQUtYLFFBTFcsRUFNWCxJQU5XLEM7OztBQUFiLG9COzs7QUFTQSx5Q0FBSSxRQUFKLENBQ0UsS0FBSyxPQUFMLEVBREYsRUFFRSxxQkFBSSwyQkFBSixFQUFpQyxRQUFqQyxFQUEyQyxFQUFDLE1BQU0sS0FBSyxPQUFMLEVBQVAsRUFBM0MsQ0FGRjs7dUJBSU0sK0JBQXFCLFNBQXJCLENBQStCLElBQS9CLEM7Ozs7QUFFTCxtQ0FBVyxJQUFYLENBQUQsQ0FDRyxRQURILENBQ1ksMkJBQWEsZ0JBRHpCLEVBRUcsY0FGSCxDQUVrQixpQ0FBbUIsU0FGckMsRUFHRyxXQUhILENBR2UsS0FBSyxLQUFMLEVBSGYsRUFJRyxZQUpILENBSWdCLEVBQUMsVUFBRCxFQUFPLFlBQVAsRUFBYyxVQUFkLEVBQW9CLGtCQUFwQixFQUpoQixFQUtHLEdBTEg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNKLE9BQU8sT0FBUCxHQUFpQixJQUFJLHFCQUFKLEVBQWpCIiwiZmlsZSI6IkNyZWF0ZUdhbWVSb29tSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE1lc3NhZ2VIYW5kbGVyQmFzZSBmcm9tICcuLi9NZXNzYWdlSGFuZGxlckJhc2UnO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBHYW1lUm9vbSBmcm9tICcuLi8uLi9jbGFzcy9HYW1lUm9vbSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQge2NyZWF0ZVBvc3RiYWNrQnV0dG9uLCBQb3N0QmFja1R5cGVzfSBmcm9tICcuLi9Qb3N0QmFja1V0aWxzJztcbmltcG9ydCB7Z290fSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRvcic7XG5pbXBvcnQge2dldFJhbmRvbUdhbWVDb2RlfSBmcm9tICcuLi8uLi91dGlscy9Db21tb25VdGlscyc7XG5pbXBvcnQgR2FtZVJvb21TaGFyZUhhbmRsZXIgZnJvbSAnLi4vZ2VuZXJhbC9HYW1lUm9vbVNoYXJlSGFuZGxlcic7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi4vLi4vbG9nZ2luZy9Mb2dnZXInO1xuaW1wb3J0IHtMb2dnaW5nRXZlbnQsIExvZ2dpbmdUYXJnZXRDbGFzc30gZnJvbSAnLi4vLi4vbG9nZ2luZy9Mb2dnaW5nRW51bXMnO1xuXG5jbGFzcyBDcmVhdGVHYW1lUm9vbUhhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5DUkVBVEVfUFJJVkFURV9ST09NO1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyB0aGlzIGlzIHVuaXQgdGVzdCBvbmx5XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSB1c2VyLmdldExhbmd1YWdlKCk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuZ2VuQ3JlYXRlUHJpdmF0ZVJvb20odXNlciwgMTksICdibGFjaycsIDAsIDYuNSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyLmNvZGUgPT09IEVYQ0VQVElPTi5ST09NX0FMUkVBRFlfQ1JFQVRFRCkge1xuICAgICAgICBCb3Quc2VuZEJ1dHRvbnMoXG4gICAgICAgICAgdXNlci5nZXRGQklEKCksXG4gICAgICAgICAgZXJyLmdldEVycm9yTWVzc2FnZShsYW5ndWFnZSksXG4gICAgICAgICAgW1xuICAgICAgICAgICAgY3JlYXRlUG9zdGJhY2tCdXR0b24oXG4gICAgICAgICAgICAgIGdvdCgnYnV0dG9uLnNoYXJlUm9vbScsIGxhbmd1YWdlKSxcbiAgICAgICAgICAgICAgUG9zdEJhY2tUeXBlcy5TRU5EX0dBTUVfUk9PTV9TSEFSRSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgXVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdlbkNyZWF0ZVByaXZhdGVSb29tKFxuICAgIHVzZXI6IFVzZXIsXG4gICAgc2l6ZTogQm9hcmRTaXplLFxuICAgIGNvbG9yOiBHYW1lQ29sb3JPcHRpb24sXG4gICAgaGFuZGljYXA6IG51bWJlcixcbiAgICBrb21pOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGxhbmd1YWdlID0gdXNlci5nZXRMYW5ndWFnZSgpO1xuICAgIHZhciByb29tID0gYXdhaXQgR2FtZVJvb20uZ2VuQnlVc2VyKHVzZXIuZ2V0SUQoKSk7XG4gICAgaWYgKHJvb20pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlZEVycm9yKFxuICAgICAgICBFWENFUFRJT04uUk9PTV9BTFJFQURZX0NSRUFURUQsXG4gICAgICAgIHtyb29tQ29kZTogcm9vbS5nZXRDb2RlKCl9LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyByYW5kb21seSBnbmVyYXRlIGEgZ2FtZSBjb2RlIHJpZ2h0IGF3YXkuXG4gICAgbGV0IGNvZGUgPSAnJztcbiAgICBsZXQgcm9vbVdpdGhDb2RlO1xuICAgIGRvIHtcbiAgICAgIGNvZGUgPSBnZXRSYW5kb21HYW1lQ29kZSgpO1xuICAgICAgcm9vbVdpdGhDb2RlID0gYXdhaXQgR2FtZVJvb20uZ2VuQnlDb2RlKGNvZGUpXG4gICAgICAvLyBpZiByb29tIGFscmVhZHksIGV4aXN0cyB0cnkgYWdhaW5cbiAgICB9IHdoaWxlIChyb29tV2l0aENvZGUpO1xuXG4gICAgcm9vbSA9IGF3YWl0IEdhbWVSb29tLmdlbkNyZWF0ZVByaXZhdGVSb29tKFxuICAgICAgdXNlci5nZXRJRCgpLFxuICAgICAgY29kZSxcbiAgICAgIHNpemUsXG4gICAgICBjb2xvcixcbiAgICAgIGhhbmRpY2FwLFxuICAgICAga29taSxcbiAgICApO1xuXG4gICAgQm90LnNlbmRUZXh0KFxuICAgICAgdXNlci5nZXRGQklEKCksXG4gICAgICBnb3QoJ25vcm1hbE1lc3NhZ2Uucm9vbUNyZWF0ZWQnLCBsYW5ndWFnZSwge2NvZGU6IHJvb20uZ2V0Q29kZSgpfSksXG4gICAgKTtcbiAgICBhd2FpdCBHYW1lUm9vbVNoYXJlSGFuZGxlci5nZW5IYW5kbGUodXNlcik7XG5cbiAgICAobmV3IExvZ2dlcih1c2VyKSlcbiAgICAgIC5zZXRFdmVudChMb2dnaW5nRXZlbnQuQ1JFQVRFX0dBTUVfUk9PTSlcbiAgICAgIC5zZXRUYXJnZXRDbGFzcyhMb2dnaW5nVGFyZ2V0Q2xhc3MuR0FNRV9ST09NKVxuICAgICAgLnNldFRhcmdldElEKHJvb20uZ2V0SUQoKSlcbiAgICAgIC5zZXRFeHRyYURhdGEoe3NpemUsIGNvbG9yLCBrb21pLCBoYW5kaWNhcH0pXG4gICAgICAubG9nKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQ3JlYXRlR2FtZVJvb21IYW5kbGVyKCk7XG4iXX0=


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

var _PostBackUtils = require('../PostBackUtils');

var _CreateGameMessage = require('./CreateGameMessage');

var _CreateGameMessage2 = _interopRequireDefault(_CreateGameMessage);

var _GoAIUtils = require('../../utils/GoAIUtils');

var _GoAIUtils2 = _interopRequireDefault(_GoAIUtils);

var _PlayMoveHandler = require('../game/PlayMoveHandler');

var _PlayMoveHandler2 = _interopRequireDefault(_PlayMoveHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateGameWithAIHandler = function (_MessageHandlerBase) {
  _inherits(CreateGameWithAIHandler, _MessageHandlerBase);

  function CreateGameWithAIHandler() {
    _classCallCheck(this, CreateGameWithAIHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CreateGameWithAIHandler).apply(this, arguments));
  }

  _createClass(CreateGameWithAIHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.PLAY_WITH_AI;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.genStartGameWithAI(user, 19, 'black');

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
  }, {
    key: 'genStartGameWithAI',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user, size, color) {
        var AIUser, blackUser, whiteUser, game;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                info('Start game with AI');
                _context2.next = 3;
                return _User2.default.genByUserID(_GoAIUtils2.default.getAIUserID());

              case 3:
                AIUser = _context2.sent;
                blackUser = color === 'black' ? user : AIUser;
                whiteUser = color === 'black' ? AIUser : user;
                _context2.next = 8;
                return _Game2.default.genCreateGame(blackUser, whiteUser, size, 0, // handicap
                6.5);

              case 8:
                game = _context2.sent;
                _context2.next = 11;
                return _CreateGameMessage2.default.genSend(game);

              case 11:
                if (!(game.getBlackUserID() === AIUser.getID())) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 14;
                return _PlayMoveHandler2.default.genAIHandle(AIUser, game);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genStartGameWithAI(_x2, _x3, _x4) {
        return ref.apply(this, arguments);
      }

      return genStartGameWithAI;
    }()
  }]);

  return CreateGameWithAIHandler;
}(_MessageHandlerBase3.default);

module.exports = new CreateGameWithAIHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL0NyZWF0ZUdhbWVXaXRoQUlIYW5kbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSx1Qjs7Ozs7Ozs7Ozs7c0NBQ3NCO0FBQ3hCLGFBQU8sNkJBQWMsWUFBckI7QUFDRDs7OztrRkFFZSxJOzs7Ozs7dUJBRVIsS0FBSyxrQkFBTCxDQUF3QixJQUF4QixFQUE4QixFQUE5QixFQUFrQyxPQUFsQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21GQUdpQixJLEVBQVksSSxFQUFpQixLO1lBRWhELE0sRUFDQSxTLEVBQ0EsUyxFQUNFLEk7Ozs7O0FBSk4scUJBQUssb0JBQUw7O3VCQUNtQixlQUFLLFdBQUwsQ0FBaUIsb0JBQVUsV0FBVixFQUFqQixDOzs7QUFBZixzQjtBQUNBLHlCLEdBQVksVUFBVSxPQUFWLEdBQW1CLElBQW5CLEdBQXlCLE07QUFDckMseUIsR0FBWSxVQUFVLE9BQVYsR0FBbUIsTUFBbkIsR0FBMkIsSTs7dUJBQ3hCLGVBQU8sYUFBUCxDQUNqQixTQURpQixFQUVqQixTQUZpQixFQUdqQixJQUhpQixFQUlqQixDQUppQixFO0FBS2pCLG1CQUxpQixDOzs7QUFBYixvQjs7dUJBT0EsNEJBQWtCLE9BQWxCLENBQTBCLElBQTFCLEM7OztzQkFDRixLQUFLLGNBQUwsT0FBMEIsT0FBTyxLQUFQLEU7Ozs7Ozt1QkFDdEIsMEJBQWdCLFdBQWhCLENBQTRCLE1BQTVCLEVBQW9DLElBQXBDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtaLE9BQU8sT0FBUCxHQUFpQixJQUFJLHVCQUFKLEVBQWpCIiwiZmlsZSI6IkNyZWF0ZUdhbWVXaXRoQUlIYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWVzc2FnZUhhbmRsZXJCYXNlIGZyb20gJy4uL01lc3NhZ2VIYW5kbGVyQmFzZSc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBHb0dhbWUgZnJvbSAnLi4vLi4vY2xhc3MvR2FtZSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQge1Bvc3RCYWNrVHlwZXN9IGZyb20gJy4uL1Bvc3RCYWNrVXRpbHMnO1xuaW1wb3J0IENyZWF0ZUdhbWVNZXNzYWdlIGZyb20gJy4vQ3JlYXRlR2FtZU1lc3NhZ2UnO1xuaW1wb3J0IEdvQUlVdGlscyBmcm9tICcuLi8uLi91dGlscy9Hb0FJVXRpbHMnO1xuaW1wb3J0IFBsYXlNb3ZlSGFuZGxlciBmcm9tICcuLi9nYW1lL1BsYXlNb3ZlSGFuZGxlcic7XG5cbmNsYXNzIENyZWF0ZUdhbWVXaXRoQUlIYW5kbGVyIGV4dGVuZHMgTWVzc2FnZUhhbmRsZXJCYXNlIHtcbiAgZ2V0UG9zdEJhY2tUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFBvc3RCYWNrVHlwZXMuUExBWV9XSVRIX0FJO1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyB1c2VkIGZvciB1bml0IHRlc3Qgb25seVxuICAgIGF3YWl0IHRoaXMuZ2VuU3RhcnRHYW1lV2l0aEFJKHVzZXIsIDE5LCAnYmxhY2snKTtcbiAgfVxuXG4gIGFzeW5jIGdlblN0YXJ0R2FtZVdpdGhBSSh1c2VyOiBVc2VyLCBzaXplOiBCb2FyZFNpemUsIGNvbG9yOiBHYW1lQ29sb3JPcHRpb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpbmZvKCdTdGFydCBnYW1lIHdpdGggQUknKVxuICAgIHZhciBBSVVzZXIgPSBhd2FpdCBVc2VyLmdlbkJ5VXNlcklEKEdvQUlVdGlscy5nZXRBSVVzZXJJRCgpKTtcbiAgICB2YXIgYmxhY2tVc2VyID0gY29sb3IgPT09ICdibGFjayc/IHVzZXI6IEFJVXNlcjtcbiAgICB2YXIgd2hpdGVVc2VyID0gY29sb3IgPT09ICdibGFjayc/IEFJVXNlcjogdXNlcjtcbiAgICBjb25zdCBnYW1lID0gYXdhaXQgR29HYW1lLmdlbkNyZWF0ZUdhbWUoXG4gICAgICBibGFja1VzZXIsXG4gICAgICB3aGl0ZVVzZXIsXG4gICAgICBzaXplLFxuICAgICAgMCwgLy8gaGFuZGljYXBcbiAgICAgIDYuNSwgLy8ga29taVxuICAgICk7XG4gICAgYXdhaXQgQ3JlYXRlR2FtZU1lc3NhZ2UuZ2VuU2VuZChnYW1lKTtcbiAgICBpZiAoZ2FtZS5nZXRCbGFja1VzZXJJRCgpID09PSBBSVVzZXIuZ2V0SUQoKSkge1xuICAgICAgYXdhaXQgUGxheU1vdmVIYW5kbGVyLmdlbkFJSGFuZGxlKEFJVXNlciwgZ2FtZSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IENyZWF0ZUdhbWVXaXRoQUlIYW5kbGVyKCk7XG4iXX0=
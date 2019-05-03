

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateGameWithSelfHandler = function (_MessageHandlerBase) {
  _inherits(CreateGameWithSelfHandler, _MessageHandlerBase);

  function CreateGameWithSelfHandler() {
    _classCallCheck(this, CreateGameWithSelfHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CreateGameWithSelfHandler).apply(this, arguments));
  }

  _createClass(CreateGameWithSelfHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.PLAY_WITH_SELF;
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
                return this.genStartGameWithSelf(user, 19, 0, 6.5);

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
    key: 'genStartGameWithSelf',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user, size, handicap, komi) {
        var game;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Game2.default.genCreateGame(user /* blackUser */
                , user /* whiteUser */
                , size, handicap, komi);

              case 2:
                game = _context2.sent;
                _context2.next = 5;
                return _CreateGameMessage2.default.genSend(game);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genStartGameWithSelf(_x2, _x3, _x4, _x5) {
        return ref.apply(this, arguments);
      }

      return genStartGameWithSelf;
    }()
  }]);

  return CreateGameWithSelfHandler;
}(_MessageHandlerBase3.default);

module.exports = new CreateGameWithSelfHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL0NyZWF0ZUdhbWVXaXRoU2VsZkhhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0seUI7Ozs7Ozs7Ozs7O3NDQUNzQjtBQUN4QixhQUFPLDZCQUFjLGNBQXJCO0FBQ0Q7Ozs7a0ZBRWUsSTs7Ozs7O3VCQUVSLEtBQUssb0JBQUwsQ0FBMEIsSUFBMUIsRUFBZ0MsRUFBaEMsRUFBb0MsQ0FBcEMsRUFBdUMsR0FBdkMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFJTixJLEVBQ0EsSSxFQUNBLFEsRUFDQSxJO1lBRU0sSTs7Ozs7O3VCQUFhLGVBQU8sYUFBUCxDQUNqQixJO0FBRGlCLGtCQUVqQixJO0FBRmlCLGtCQUdqQixJQUhpQixFQUlqQixRQUppQixFQUtqQixJQUxpQixDOzs7QUFBYixvQjs7dUJBT0EsNEJBQWtCLE9BQWxCLENBQTBCLElBQTFCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlWLE9BQU8sT0FBUCxHQUFpQixJQUFJLHlCQUFKLEVBQWpCIiwiZmlsZSI6IkNyZWF0ZUdhbWVXaXRoU2VsZkhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBNZXNzYWdlSGFuZGxlckJhc2UgZnJvbSAnLi4vTWVzc2FnZUhhbmRsZXJCYXNlJztcbmltcG9ydCBVc2VyIGZyb20gJy4uLy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IEdvR2FtZSBmcm9tICcuLi8uLi9jbGFzcy9HYW1lJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7UG9zdEJhY2tUeXBlc30gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQgQ3JlYXRlR2FtZU1lc3NhZ2UgZnJvbSAnLi9DcmVhdGVHYW1lTWVzc2FnZSc7XG5cbmNsYXNzIENyZWF0ZUdhbWVXaXRoU2VsZkhhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5QTEFZX1dJVEhfU0VMRjtcbiAgfVxuXG4gIGFzeW5jIGdlbkhhbmRsZSh1c2VyOiBVc2VyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gdXNlZCBmb3IgdW5pdCB0ZXN0IG9ubHlcbiAgICBhd2FpdCB0aGlzLmdlblN0YXJ0R2FtZVdpdGhTZWxmKHVzZXIsIDE5LCAwLCA2LjUpO1xuICB9XG5cbiAgYXN5bmMgZ2VuU3RhcnRHYW1lV2l0aFNlbGYoXG4gICAgdXNlcjogVXNlcixcbiAgICBzaXplOiBCb2FyZFNpemUsXG4gICAgaGFuZGljYXA6IG51bWJlcixcbiAgICBrb21pOiBudW1iZXIsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGdhbWUgPSBhd2FpdCBHb0dhbWUuZ2VuQ3JlYXRlR2FtZShcbiAgICAgIHVzZXIgLyogYmxhY2tVc2VyICovLFxuICAgICAgdXNlciAvKiB3aGl0ZVVzZXIgKi8sXG4gICAgICBzaXplLFxuICAgICAgaGFuZGljYXAsXG4gICAgICBrb21pLFxuICAgICk7XG4gICAgYXdhaXQgQ3JlYXRlR2FtZU1lc3NhZ2UuZ2VuU2VuZChnYW1lKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBDcmVhdGVHYW1lV2l0aFNlbGZIYW5kbGVyKCk7XG4iXX0=
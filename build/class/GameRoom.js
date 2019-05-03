

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameRoomBase2 = require('./base/GameRoomBase');

var _GameRoomBase3 = _interopRequireDefault(_GameRoomBase2);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameRoom = function (_GameRoomBase) {
  _inherits(GameRoom, _GameRoomBase);

  function GameRoom() {
    _classCallCheck(this, GameRoom);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameRoom).apply(this, arguments));
  }

  _createClass(GameRoom, null, [{
    key: 'fromModel',
    value: function fromModel(model) {
      return new GameRoom(model);
    }
  }, {
    key: 'genRemoveRoomForUser',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        var room;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return GameRoom.genByUser(user.getID());

              case 2:
                room = _context.sent;

                if (!room) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return room.genDelete();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genRemoveRoomForUser(_x) {
        return ref.apply(this, arguments);
      }

      return genRemoveRoomForUser;
    }()
  }, {
    key: 'genCreatePrivateRoom',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(userID, code, size, color, handicap, komi) {
        var isOwnerBlack;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                isOwnerBlack = void 0;

                if (color === 'random') {
                  isOwnerBlack = Math.random() > 0.5;
                } else {
                  isOwnerBlack = color === 'black';
                }

                return _context2.abrupt('return', _schema2.default.GameRoom.create({
                  ownerID: userID,
                  boardSize: size,
                  isPrivate: true,
                  code: code,
                  isOwnerBlack: isOwnerBlack,
                  komi: komi,
                  handicap: handicap
                }).then(function (model) {
                  return GameRoom.fromModel(model);
                }));

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genCreatePrivateRoom(_x2, _x3, _x4, _x5, _x6, _x7) {
        return ref.apply(this, arguments);
      }

      return genCreatePrivateRoom;
    }()
  }, {
    key: 'genByCode',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(code) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return GameRoom._genBy({
                  where: {
                    code: code
                  }
                });

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genByCode(_x8) {
        return ref.apply(this, arguments);
      }

      return genByCode;
    }()
  }, {
    key: 'genByUser',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(userID) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return GameRoom._genBy({
                  where: {
                    ownerID: userID
                  }
                });

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function genByUser(_x9) {
        return ref.apply(this, arguments);
      }

      return genByUser;
    }()
  }, {
    key: 'genByUserOrCode',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(userID, code) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return GameRoom._genBy({
                  where: {
                    $or: [{
                      ownerID: userID
                    }, {
                      code: code
                    }]
                  }
                });

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function genByUserOrCode(_x10, _x11) {
        return ref.apply(this, arguments);
      }

      return genByUserOrCode;
    }()
  }]);

  return GameRoom;
}(_GameRoomBase3.default);

exports.default = GameRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzcy9HYW1lUm9vbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUlNLFE7Ozs7Ozs7Ozs7OzhCQUNhLEssRUFBaUM7QUFDaEQsYUFBTyxJQUFJLFFBQUosQ0FBYSxLQUFiLENBQVA7QUFDRDs7OztrRkFFaUMsSTtZQUM1QixJOzs7Ozs7dUJBQWEsU0FBUyxTQUFULENBQW1CLEtBQUssS0FBTCxFQUFuQixDOzs7QUFBYixvQjs7cUJBQ0EsSTs7Ozs7O3VCQUNJLEtBQUssU0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21GQUtSLE0sRUFDQSxJLEVBQ0EsSSxFQUNBLEssRUFDQSxRLEVBQ0EsSTtZQUVJLFk7Ozs7O0FBQUEsNEI7O0FBQ0osb0JBQUksVUFBVSxRQUFkLEVBQXdCO0FBQ3RCLGlDQUFlLEtBQUssTUFBTCxLQUFnQixHQUEvQjtBQUNELGlCQUZELE1BRU87QUFDTCxpQ0FBZSxVQUFVLE9BQXpCO0FBQ0Q7O2tEQUVNLGlCQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUI7QUFDNUIsMkJBQVMsTUFEbUI7QUFFNUIsNkJBQVcsSUFGaUI7QUFHNUIsNkJBQVcsSUFIaUI7QUFJNUIsd0JBQU0sSUFKc0I7QUFLNUIsZ0NBQWMsWUFMYztBQU01Qix3QkFBTSxJQU5zQjtBQU81Qiw0QkFBVTtBQVBrQixpQkFBdkIsRUFRSixJQVJJLENBUUMsVUFBQyxLQUFELEVBQXFDO0FBQzNDLHlCQUFPLFNBQVMsU0FBVCxDQUFtQixLQUFuQixDQUFQO0FBQ0QsaUJBVk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFhYyxJOzs7Ozs7dUJBQ1IsU0FBUyxNQUFULENBQWdCO0FBQzNCLHlCQUFPO0FBQ0wsMEJBQU07QUFERDtBQURvQixpQkFBaEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFPUSxNOzs7Ozs7dUJBQ1IsU0FBUyxNQUFULENBQWdCO0FBQzNCLHlCQUFPO0FBQ0wsNkJBQVM7QUFESjtBQURvQixpQkFBaEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFPYyxNLEVBQWdCLEk7Ozs7Ozt1QkFDOUIsU0FBUyxNQUFULENBQWdCO0FBQzNCLHlCQUFPO0FBQ0wseUJBQUssQ0FDSDtBQUNFLCtCQUFTO0FBRFgscUJBREcsRUFJSDtBQUNFLDRCQUFNO0FBRFIscUJBSkc7QUFEQTtBQURvQixpQkFBaEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWVGLFEiLCJmaWxlIjoiR2FtZVJvb20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBHYW1lUm9vbUJhc2UgZnJvbSAnLi9iYXNlL0dhbWVSb29tQmFzZSc7XG5pbXBvcnQgbW9kZWxzIGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCBVc2VyIGZyb20gJy4vVXNlcic7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgdHlwZSB7U2VxdWVsaXplTW9kZWx9IGZyb20gJy4vc2NoZW1hJztcblxuY2xhc3MgR2FtZVJvb20gZXh0ZW5kcyBHYW1lUm9vbUJhc2Uge1xuICBzdGF0aWMgZnJvbU1vZGVsKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IEdhbWVSb29tIHtcbiAgICByZXR1cm4gbmV3IEdhbWVSb29tKG1vZGVsKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5SZW1vdmVSb29tRm9yVXNlcih1c2VyOiBVc2VyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdmFyIHJvb20gPSBhd2FpdCBHYW1lUm9vbS5nZW5CeVVzZXIodXNlci5nZXRJRCgpKTtcbiAgICBpZiAocm9vbSkge1xuICAgICAgYXdhaXQgcm9vbS5nZW5EZWxldGUoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuQ3JlYXRlUHJpdmF0ZVJvb20oXG4gICAgdXNlcklEOiBudW1iZXIsXG4gICAgY29kZTogc3RyaW5nLFxuICAgIHNpemU6IEJvYXJkU2l6ZSxcbiAgICBjb2xvcjogR2FtZUNvbG9yT3B0aW9uLFxuICAgIGhhbmRpY2FwOiBudW1iZXIsXG4gICAga29taTogbnVtYmVyLFxuICApOiBQcm9taXNlPEdhbWVSb29tPiB7XG4gICAgbGV0IGlzT3duZXJCbGFjaztcbiAgICBpZiAoY29sb3IgPT09ICdyYW5kb20nKSB7XG4gICAgICBpc093bmVyQmxhY2sgPSBNYXRoLnJhbmRvbSgpID4gMC41O1xuICAgIH0gZWxzZSB7XG4gICAgICBpc093bmVyQmxhY2sgPSBjb2xvciA9PT0gJ2JsYWNrJztcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kZWxzLkdhbWVSb29tLmNyZWF0ZSh7XG4gICAgICBvd25lcklEOiB1c2VySUQsXG4gICAgICBib2FyZFNpemU6IHNpemUsXG4gICAgICBpc1ByaXZhdGU6IHRydWUsXG4gICAgICBjb2RlOiBjb2RlLFxuICAgICAgaXNPd25lckJsYWNrOiBpc093bmVyQmxhY2ssXG4gICAgICBrb21pOiBrb21pLFxuICAgICAgaGFuZGljYXA6IGhhbmRpY2FwLFxuICAgIH0pLnRoZW4oKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IEdhbWVSb29tID0+IHtcbiAgICAgIHJldHVybiBHYW1lUm9vbS5mcm9tTW9kZWwobW9kZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbkJ5Q29kZShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPD9HYW1lUm9vbT4ge1xuICAgIHJldHVybiBhd2FpdCBHYW1lUm9vbS5fZ2VuQnkoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgY29kZTogY29kZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuQnlVc2VyKHVzZXJJRDogbnVtYmVyKTogUHJvbWlzZTw/R2FtZVJvb20+IHtcbiAgICByZXR1cm4gYXdhaXQgR2FtZVJvb20uX2dlbkJ5KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIG93bmVySUQ6IHVzZXJJRCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuQnlVc2VyT3JDb2RlKHVzZXJJRDogbnVtYmVyLCBjb2RlOiBzdHJpbmcpOiBQcm9taXNlPD9HYW1lUm9vbT4ge1xuICAgIHJldHVybiBhd2FpdCBHYW1lUm9vbS5fZ2VuQnkoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgJG9yOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgb3duZXJJRDogdXNlcklELFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lUm9vbTtcbiJdfQ==
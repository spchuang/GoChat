

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MessageBase2 = require('./base/MessageBase');

var _MessageBase3 = _interopRequireDefault(_MessageBase2);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_MessageBase) {
  _inherits(Message, _MessageBase);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Message).apply(this, arguments));
  }

  _createClass(Message, null, [{
    key: 'genLatestMessagesForGame',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(game) {
        var limit = arguments.length <= 1 || arguments[1] === undefined ? 15 : arguments[1];
        var userOneID, userTwoID;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userOneID = game.getBlackUserID();
                userTwoID = game.getWhiteUserID();
                _context.next = 4;
                return Message.genForUsers(userOneID, userTwoID, limit, {}, // extra query
                ['id', 'DESC']);

              case 4:
                return _context.abrupt('return', _context.sent);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genLatestMessagesForGame(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return genLatestMessagesForGame;
    }()
  }, {
    key: 'genForUsersBeforeID',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(userOneID, userTwoID, limit, id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Message.genForUsers(userOneID, userTwoID, limit, { id: { $lt: id } }, ['id', 'DESC']);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genForUsersBeforeID(_x4, _x5, _x6, _x7) {
        return ref.apply(this, arguments);
      }

      return genForUsersBeforeID;
    }()
  }, {
    key: 'genForUsersAfterID',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(userOneID, userTwoID, limit, id) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Message.genForUsers(userOneID, userTwoID, limit, { id: { $gt: id } }, ['id', 'ASC']);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genForUsersAfterID(_x8, _x9, _x10, _x11) {
        return ref.apply(this, arguments);
      }

      return genForUsersAfterID;
    }()
  }, {
    key: 'genForUsers',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(userOneID, userTwoID, limit, extraQuery, order) {
        var query;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = {
                  where: _extends({
                    $or: [{ $and: [{ receiverID: userOneID }, { senderID: userTwoID }] }, { $and: [{ receiverID: userTwoID }, { senderID: userOneID }] }]
                  }, extraQuery),
                  limit: limit,
                  order: [order]
                };
                _context4.next = 3;
                return this._genAllBy(query);

              case 3:
                return _context4.abrupt('return', _context4.sent);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function genForUsers(_x12, _x13, _x14, _x15, _x16) {
        return ref.apply(this, arguments);
      }

      return genForUsers;
    }()
  }, {
    key: 'genSend',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(senderID, receiverID, content) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', _schema2.default.Message.create({
                  senderID: senderID,
                  receiverID: receiverID,
                  content: content
                }).then(function (model) {
                  return new _this2(model);
                }));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function genSend(_x17, _x18, _x19) {
        return ref.apply(this, arguments);
      }

      return genSend;
    }()
  }]);

  return Message;
}(_MessageBase3.default);

exports.default = Message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzcy9NZXNzYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUdNLE87Ozs7Ozs7Ozs7OztrRkFFRixJO1lBQ0EsSyx5REFBZ0IsRTtZQUVWLFMsRUFDQSxTOzs7OztBQURBLHlCLEdBQVksS0FBSyxjQUFMLEU7QUFDWix5QixHQUFZLEtBQUssY0FBTCxFOzt1QkFDTCxRQUFRLFdBQVIsQ0FDWCxTQURXLEVBRVgsU0FGVyxFQUdYLEtBSFcsRUFJWCxFQUpXLEU7QUFLWCxpQkFBQyxJQUFELEVBQU8sTUFBUCxDQUxXLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUZBVWIsUyxFQUNBLFMsRUFDQSxLLEVBQ0EsRTs7Ozs7O3VCQUVhLFFBQVEsV0FBUixDQUNYLFNBRFcsRUFFWCxTQUZXLEVBR1gsS0FIVyxFQUlYLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBTixFQUFMLEVBSlcsRUFLWCxDQUFDLElBQUQsRUFBTyxNQUFQLENBTFcsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFVYixTLEVBQ0EsUyxFQUNBLEssRUFDQSxFOzs7Ozs7dUJBRWEsUUFBUSxXQUFSLENBQ1gsU0FEVyxFQUVYLFNBRlcsRUFHWCxLQUhXLEVBSVgsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFOLEVBQUwsRUFKVyxFQUtYLENBQUMsSUFBRCxFQUFPLEtBQVAsQ0FMVyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21GQVViLFMsRUFDQSxTLEVBQ0EsSyxFQUNBLFUsRUFDQSxLO1lBRU0sSzs7Ozs7QUFBQSxxQixHQUFnQjtBQUNwQjtBQUNFLHlCQUFLLENBQ0gsRUFBQyxNQUFNLENBQUMsRUFBQyxZQUFZLFNBQWIsRUFBRCxFQUEwQixFQUFDLFVBQVUsU0FBWCxFQUExQixDQUFQLEVBREcsRUFFSCxFQUFDLE1BQU0sQ0FBQyxFQUFDLFlBQVksU0FBYixFQUFELEVBQTBCLEVBQUMsVUFBVSxTQUFYLEVBQTFCLENBQVAsRUFGRztBQURQLHFCQUtLLFVBTEwsQ0FEb0I7QUFRcEIsOEJBUm9CO0FBU3BCLHlCQUFPLENBQUMsS0FBRDtBQVRhLGlCOzt1QkFZVCxLQUFLLFNBQUwsQ0FBZSxLQUFmLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUZBSWIsUSxFQUNBLFUsRUFDQSxPOzs7Ozs7O2tEQUVPLGlCQUFPLE9BQVAsQ0FBZSxNQUFmLENBQXNCO0FBQzNCLG9DQUQyQjtBQUUzQix3Q0FGMkI7QUFHM0I7QUFIMkIsaUJBQXRCLEVBSUosSUFKSSxDQUlDLFVBQUMsS0FBRCxFQUEyQjtBQUNqQyx5QkFBTyxXQUFTLEtBQVQsQ0FBUDtBQUNELGlCQU5NLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFVSSxPIiwiZmlsZSI6Ik1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBNZXNzYWdlQmFzZSBmcm9tICcuL2Jhc2UvTWVzc2FnZUJhc2UnO1xuaW1wb3J0IG1vZGVscyBmcm9tICcuL3NjaGVtYSdcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBHb0dhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBVc2VyIGZyb20gJy4vVXNlcic7XG5pbXBvcnQgdHlwZSB7U2VxdWVsaXplTW9kZWx9IGZyb20gJy4vc2NoZW1hJztcblxuY2xhc3MgTWVzc2FnZSBleHRlbmRzIE1lc3NhZ2VCYXNlIHtcbiAgc3RhdGljIGFzeW5jIGdlbkxhdGVzdE1lc3NhZ2VzRm9yR2FtZShcbiAgICBnYW1lOiBHb0dhbWUsXG4gICAgbGltaXQ6IG51bWJlciA9IDE1LFxuICApOiBQcm9taXNlPEFycmF5PE1lc3NhZ2U+PiB7XG4gICAgY29uc3QgdXNlck9uZUlEID0gZ2FtZS5nZXRCbGFja1VzZXJJRCgpO1xuICAgIGNvbnN0IHVzZXJUd29JRCA9IGdhbWUuZ2V0V2hpdGVVc2VySUQoKTtcbiAgICByZXR1cm4gYXdhaXQgTWVzc2FnZS5nZW5Gb3JVc2VycyhcbiAgICAgIHVzZXJPbmVJRCxcbiAgICAgIHVzZXJUd29JRCxcbiAgICAgIGxpbWl0LFxuICAgICAge30sIC8vIGV4dHJhIHF1ZXJ5XG4gICAgICBbJ2lkJywgJ0RFU0MnXSxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbkZvclVzZXJzQmVmb3JlSUQoXG4gICAgdXNlck9uZUlEOiBudW1iZXIsXG4gICAgdXNlclR3b0lEOiBudW1iZXIsXG4gICAgbGltaXQ6IG51bWJlcixcbiAgICBpZDogbnVtYmVyLFxuICApOiBQcm9taXNlPEFycmF5PE1lc3NhZ2U+PiB7XG4gICAgcmV0dXJuIGF3YWl0IE1lc3NhZ2UuZ2VuRm9yVXNlcnMoXG4gICAgICB1c2VyT25lSUQsXG4gICAgICB1c2VyVHdvSUQsXG4gICAgICBsaW1pdCxcbiAgICAgIHtpZDogeyRsdDogaWR9fSxcbiAgICAgIFsnaWQnLCAnREVTQyddLFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuRm9yVXNlcnNBZnRlcklEKFxuICAgIHVzZXJPbmVJRDogbnVtYmVyLFxuICAgIHVzZXJUd29JRDogbnVtYmVyLFxuICAgIGxpbWl0OiBudW1iZXIsXG4gICAgaWQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxBcnJheTxNZXNzYWdlPj4ge1xuICAgIHJldHVybiBhd2FpdCBNZXNzYWdlLmdlbkZvclVzZXJzKFxuICAgICAgdXNlck9uZUlELFxuICAgICAgdXNlclR3b0lELFxuICAgICAgbGltaXQsXG4gICAgICB7aWQ6IHskZ3Q6IGlkfX0sXG4gICAgICBbJ2lkJywgJ0FTQyddLFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuRm9yVXNlcnMoXG4gICAgdXNlck9uZUlEOiBudW1iZXIsXG4gICAgdXNlclR3b0lEOiBudW1iZXIsXG4gICAgbGltaXQ6IG51bWJlcixcbiAgICBleHRyYVF1ZXJ5OiBPYmplY3QsXG4gICAgb3JkZXI6IEFycmF5PHN0cmluZz4sXG4gICk6IFByb21pc2U8QXJyYXk8TWVzc2FnZT4+IHtcbiAgICBjb25zdCBxdWVyeTogT2JqZWN0ID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgJG9yOiBbXG4gICAgICAgICAgeyRhbmQ6IFt7cmVjZWl2ZXJJRDogdXNlck9uZUlEfSwge3NlbmRlcklEOiB1c2VyVHdvSUR9XX0sXG4gICAgICAgICAgeyRhbmQ6IFt7cmVjZWl2ZXJJRDogdXNlclR3b0lEfSwge3NlbmRlcklEOiB1c2VyT25lSUR9XX0sXG4gICAgICAgIF0sXG4gICAgICAgIC4uLmV4dHJhUXVlcnksXG4gICAgICB9LFxuICAgICAgbGltaXQsXG4gICAgICBvcmRlcjogW29yZGVyXSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2dlbkFsbEJ5KHF1ZXJ5KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5TZW5kKFxuICAgIHNlbmRlcklEOiBudW1iZXIsXG4gICAgcmVjZWl2ZXJJRDogbnVtYmVyLFxuICAgIGNvbnRlbnQ6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxNZXNzYWdlPiB7XG4gICAgcmV0dXJuIG1vZGVscy5NZXNzYWdlLmNyZWF0ZSh7XG4gICAgICBzZW5kZXJJRCxcbiAgICAgIHJlY2VpdmVySUQsXG4gICAgICBjb250ZW50LFxuICAgIH0pLnRoZW4oKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzKG1vZGVsKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlO1xuIl19
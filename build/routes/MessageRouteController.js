

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _Translator = require('../translations/Translator');

var _Game = require('../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _Message = require('../class/Message');

var _Message2 = _interopRequireDefault(_Message);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteControllerBase2 = require('./RouteControllerBase');

var _RouteControllerBase3 = _interopRequireDefault(_RouteControllerBase2);

var _LoggingEnums = require('../logging/LoggingEnums');

var _EncryptUtils = require('../utils/EncryptUtils');

var _EncryptUtils2 = _interopRequireDefault(_EncryptUtils);

var _PostBackUtils = require('../response/PostBackUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageRouteController = function (_RouteControllerBase) {
  _inherits(MessageRouteController, _RouteControllerBase);

  function MessageRouteController() {
    _classCallCheck(this, MessageRouteController);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MessageRouteController).apply(this, arguments));
  }

  _createClass(MessageRouteController, [{
    key: 'getName',
    value: function getName() {
      return 'message';
    }
  }, {
    key: 'getRouterEvent',
    value: function getRouterEvent() {
      return _LoggingEnums.LoggingEvent.LOAD_MESSAGE_VIEW;
    }
  }, {
    key: 'getLoadMessengerExtension',
    value: function getLoadMessengerExtension() {
      return true;
    }
  }, {
    key: 'getPageTitle',
    value: function getPageTitle(lan) {
      return 'GoChat'; // TODO
    }
  }, {
    key: 'genClientContainerParams',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user, req) {
        var language, game, limit, messages, hasMore;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                language = user.getLanguage();
                game = user.getCurrentGame();
                limit = 10;

                // overfetch and show whether there are more

                _context.next = 5;
                return _Message2.default.genLatestMessagesForGame(game, limit + 1);

              case 5:
                messages = _context.sent;
                hasMore = messages.length > limit;
                return _context.abrupt('return', {
                  messages: messages.slice(0, limit).map(function (x) {
                    return x.getData();
                  }),
                  receiverID: game.getOpponentUserID(user.getID()),
                  hasMore: hasMore,
                  text: {
                    messageInputPlaceholder: (0, _Translator.got)('chat.messageInputPlaceholder', language)
                  }
                });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genClientContainerParams(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return genClientContainerParams;
    }()
  }, {
    key: 'getJS',
    value: function getJS() {
      return ['web/MessageContainer.' + _config2.default.env + '.js?i=3'];
    }
  }, {
    key: 'getCSS',
    value: function getCSS() {
      return ['webviewCommon.css', 'message.css?id=3'];
    }
  }]);

  return MessageRouteController;
}(_RouteControllerBase3.default);

var controller = new MessageRouteController();

controller.post('send', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user, params, res) {
    var receiverID, content, _ref, _ref2, message, opponent, lan, messageData;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            receiverID = params.receiverID;
            content = params.content;

            (0, _invariant2.default)(receiverID && content, 'receiverID and content are required');
            receiverID = parseInt(receiverID, 10);
            _context2.next = 6;
            return _bluebird2.default.all([_Message2.default.genSend(user.getID(), receiverID, content), _User2.default.genByUserID(receiverID)]);

          case 6:
            _ref = _context2.sent;
            _ref2 = _slicedToArray(_ref, 2);
            message = _ref2[0];
            opponent = _ref2[1];


            res.json({ message: message.getData() });

            // send message to opponent
            lan = opponent.getLanguage();
            messageData = {
              attachment: {
                'type': 'template',
                'payload': {
                  'template_type': 'button',
                  'text': (0, _Translator.got)('inGameMessage.receivedMessageFromOpponent', lan, { enemy: user.getFirstName(), message: content }),
                  'buttons': [(0, _PostBackUtils.getMessageURLButton)((0, _Translator.got)('button.replyMessage', lan), lan, user.getID(), _EncryptUtils2.default.encrypt(opponent.getFBID()))]
                }
              }
            };


            _fbLocalChatBot2.default.send(opponent.getFBID(), messageData);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));
  return function (_x3, _x4, _x5) {
    return ref.apply(this, arguments);
  };
}());

controller.get('getBefore', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(user, params, res) {
    var beforeMessageID, receiverID, query, limit, messages, hasMore;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            beforeMessageID = params.beforeMessageID;
            receiverID = params.receiverID;

            (0, _invariant2.default)(receiverID, 'receiverID are required');

            query = {};

            if (beforeMessageID) {
              beforeMessageID = parseInt(beforeMessageID, 10);
            }
            receiverID = parseInt(receiverID, 10);

            limit = 5;
            _context3.next = 9;
            return _Message2.default.genForUsersBeforeID(user.getID(), receiverID, limit + 1, beforeMessageID);

          case 9:
            messages = _context3.sent;
            hasMore = messages.length > limit;

            res.json({
              messages: messages.slice(0, limit).map(function (x) {
                return x.getData();
              }),
              hasMore: hasMore
            });

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));
  return function (_x6, _x7, _x8) {
    return ref.apply(this, arguments);
  };
}());

controller.get('getAfter', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(user, params, res) {
    var afterMessageID, receiverID, query, messages;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            afterMessageID = params.afterMessageID;
            receiverID = params.receiverID;

            (0, _invariant2.default)(receiverID, 'receiverID are required');

            query = {};

            if (afterMessageID) {
              afterMessageID = parseInt(afterMessageID, 10);
            }
            receiverID = parseInt(receiverID, 10);
            _context4.next = 8;
            return _Message2.default.genForUsersAfterID(user.getID(), receiverID, 5, afterMessageID);

          case 8:
            messages = _context4.sent;

            res.json({
              messages: messages.map(function (x) {
                return x.getData();
              })
            });

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));
  return function (_x9, _x10, _x11) {
    return ref.apply(this, arguments);
  };
}());

module.exports = controller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvTWVzc2FnZVJvdXRlQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRU0sc0I7Ozs7Ozs7Ozs7OzhCQUNjO0FBQ2hCLGFBQU8sU0FBUDtBQUNEOzs7cUNBRXdCO0FBQ3ZCLGFBQU8sMkJBQWEsaUJBQXBCO0FBQ0Q7OztnREFFb0M7QUFDbkMsYUFBTyxJQUFQO0FBQ0Q7OztpQ0FFWSxHLEVBQXFCO0FBQ2hDLGFBQU8sUUFBUCxDO0FBQ0Q7Ozs7a0ZBRThCLEksRUFBWSxHO1lBQ25DLFEsRUFDQSxJLEVBQ0EsSyxFQUdBLFEsRUFDQSxPOzs7OztBQU5BLHdCLEdBQVcsS0FBSyxXQUFMLEU7QUFDWCxvQixHQUFPLEtBQUssY0FBTCxFO0FBQ1AscUIsR0FBUSxFOzs7Ozt1QkFHUyxrQkFBUSx3QkFBUixDQUFpQyxJQUFqQyxFQUF1QyxRQUFRLENBQS9DLEM7OztBQUFqQix3QjtBQUNBLHVCLEdBQVUsU0FBUyxNQUFULEdBQWtCLEs7aURBRTNCO0FBQ0wsNEJBQVUsU0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQixLQUFsQixFQUF5QixHQUF6QixDQUE2QjtBQUFBLDJCQUFLLEVBQUUsT0FBRixFQUFMO0FBQUEsbUJBQTdCLENBREw7QUFFTCw4QkFBWSxLQUFLLGlCQUFMLENBQXVCLEtBQUssS0FBTCxFQUF2QixDQUZQO0FBR0wsa0NBSEs7QUFJTCx3QkFBTTtBQUNKLDZDQUF5QixxQkFBSSw4QkFBSixFQUFvQyxRQUFwQztBQURyQjtBQUpELGlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBVWM7QUFDckIsYUFBTywyQkFDbUIsaUJBQU8sR0FEMUIsYUFBUDtBQUdEOzs7NkJBRXVCO0FBQ3RCLGFBQU8sQ0FDTCxtQkFESyxFQUVM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O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF3QkEsV0FBVyxHQUFYLENBQWUsVUFBZjtBQUFBLDZEQUEyQixrQkFBTyxJQUFQLEVBQW1CLE1BQW5CLEVBQW1DLEdBQW5DO0FBQUEsUUFDcEIsY0FEb0IsRUFDSixVQURJLEVBSW5CLEtBSm1CLEVBU25CLFFBVG1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDcEIsMEJBRG9CLEdBQ1UsTUFEVixDQUNwQixjQURvQjtBQUNKLHNCQURJLEdBQ1UsTUFEVixDQUNKLFVBREk7O0FBRXpCLHFDQUFVLFVBQVYsRUFBc0IseUJBQXRCOztBQUVNLGlCQUptQixHQUlILEVBSkc7O0FBS3pCLGdCQUFJLGNBQUosRUFBb0I7QUFDbEIsK0JBQWlCLFNBQVMsY0FBVCxFQUF5QixFQUF6QixDQUFqQjtBQUNEO0FBQ0QseUJBQWEsU0FBUyxVQUFULEVBQXFCLEVBQXJCLENBQWI7QUFSeUI7QUFBQSxtQkFTRixrQkFBUSxrQkFBUixDQUNyQixLQUFLLEtBQUwsRUFEcUIsRUFFckIsVUFGcUIsRUFHckIsQ0FIcUIsRUFJckIsY0FKcUIsQ0FURTs7QUFBQTtBQVNuQixvQkFUbUI7O0FBZXpCLGdCQUFJLElBQUosQ0FBUztBQUNQLHdCQUFVLFNBQVMsR0FBVCxDQUFhO0FBQUEsdUJBQUssRUFBRSxPQUFGLEVBQUw7QUFBQSxlQUFiO0FBREgsYUFBVDs7QUFmeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFvQkEsT0FBTyxPQUFQLEdBQWlCLFVBQWpCIiwiZmlsZSI6Ik1lc3NhZ2VSb3V0ZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCb3QgZnJvbSAnZmItbG9jYWwtY2hhdC1ib3QnXG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEdvR2FtZSBmcm9tICcuLi9jbGFzcy9HYW1lJztcbmltcG9ydCBNZXNzYWdlIGZyb20gJy4uL2NsYXNzL01lc3NhZ2UnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vY2xhc3MvVXNlcic7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgUm91dGVDb250cm9sbGVyQmFzZSBmcm9tICcuL1JvdXRlQ29udHJvbGxlckJhc2UnO1xuaW1wb3J0IHtMb2dnaW5nRXZlbnR9IGZyb20gJy4uL2xvZ2dpbmcvTG9nZ2luZ0VudW1zJztcbmltcG9ydCBFbmNyeXB0VXRpbHMgZnJvbSAnLi4vdXRpbHMvRW5jcnlwdFV0aWxzJztcbmltcG9ydCB7Z2V0TWVzc2FnZVVSTEJ1dHRvbn0gZnJvbSAnLi4vcmVzcG9uc2UvUG9zdEJhY2tVdGlscydcblxuY2xhc3MgTWVzc2FnZVJvdXRlQ29udHJvbGxlciBleHRlbmRzIFJvdXRlQ29udHJvbGxlckJhc2Uge1xuICBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdtZXNzYWdlJztcbiAgfVxuXG4gIGdldFJvdXRlckV2ZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIExvZ2dpbmdFdmVudC5MT0FEX01FU1NBR0VfVklFVztcbiAgfVxuXG4gIGdldExvYWRNZXNzZW5nZXJFeHRlbnNpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXRQYWdlVGl0bGUobGFuOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAnR29DaGF0JzsgLy8gVE9ET1xuICB9XG5cbiAgYXN5bmMgZ2VuQ2xpZW50Q29udGFpbmVyUGFyYW1zKHVzZXI6IFVzZXIsIHJlcTogT2JqZWN0KTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICBjb25zdCBsYW5ndWFnZSA9IHVzZXIuZ2V0TGFuZ3VhZ2UoKTtcbiAgICBjb25zdCBnYW1lID0gdXNlci5nZXRDdXJyZW50R2FtZSgpO1xuICAgIGNvbnN0IGxpbWl0ID0gMTA7XG5cbiAgICAvLyBvdmVyZmV0Y2ggYW5kIHNob3cgd2hldGhlciB0aGVyZSBhcmUgbW9yZVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgTWVzc2FnZS5nZW5MYXRlc3RNZXNzYWdlc0ZvckdhbWUoZ2FtZSwgbGltaXQgKyAxKTtcbiAgICBjb25zdCBoYXNNb3JlID0gbWVzc2FnZXMubGVuZ3RoID4gbGltaXQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzLnNsaWNlKDAsIGxpbWl0KS5tYXAoeCA9PiB4LmdldERhdGEoKSksXG4gICAgICByZWNlaXZlcklEOiBnYW1lLmdldE9wcG9uZW50VXNlcklEKHVzZXIuZ2V0SUQoKSksXG4gICAgICBoYXNNb3JlLFxuICAgICAgdGV4dDoge1xuICAgICAgICBtZXNzYWdlSW5wdXRQbGFjZWhvbGRlcjogZ290KCdjaGF0Lm1lc3NhZ2VJbnB1dFBsYWNlaG9sZGVyJywgbGFuZ3VhZ2UpLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SlMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGB3ZWIvTWVzc2FnZUNvbnRhaW5lci4ke2NvbmZpZy5lbnZ9LmpzP2k9M2AsXG4gICAgXTtcbiAgfVxuXG4gIGdldENTUygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3dlYnZpZXdDb21tb24uY3NzJyxcbiAgICAgICdtZXNzYWdlLmNzcz9pZD0zJyxcbiAgICBdO1xuICB9XG59XG5cbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgTWVzc2FnZVJvdXRlQ29udHJvbGxlcigpXG5cbmNvbnRyb2xsZXIucG9zdCgnc2VuZCcsIGFzeW5jICh1c2VyOiBVc2VyLCBwYXJhbXM6IE9iamVjdCwgcmVzOiBPYmplY3QpID0+IHtcbiAgbGV0IHtyZWNlaXZlcklELCBjb250ZW50fSA9IHBhcmFtcztcbiAgaW52YXJpYW50KHJlY2VpdmVySUQgJiYgY29udGVudCwgJ3JlY2VpdmVySUQgYW5kIGNvbnRlbnQgYXJlIHJlcXVpcmVkJyk7XG4gIHJlY2VpdmVySUQgPSBwYXJzZUludChyZWNlaXZlcklELCAxMCk7XG4gIGNvbnN0IFttZXNzYWdlLCBvcHBvbmVudF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgTWVzc2FnZS5nZW5TZW5kKHVzZXIuZ2V0SUQoKSwgcmVjZWl2ZXJJRCwgY29udGVudCksXG4gICAgVXNlci5nZW5CeVVzZXJJRChyZWNlaXZlcklEKSxcbiAgXSk7XG5cbiAgcmVzLmpzb24oe21lc3NhZ2U6IG1lc3NhZ2UuZ2V0RGF0YSgpfSk7XG5cbiAgLy8gc2VuZCBtZXNzYWdlIHRvIG9wcG9uZW50XG4gIGNvbnN0IGxhbiA9IG9wcG9uZW50LmdldExhbmd1YWdlKCk7XG4gIGNvbnN0IG1lc3NhZ2VEYXRhID0ge1xuICAgIGF0dGFjaG1lbnQ6IHtcbiAgICAgICd0eXBlJzondGVtcGxhdGUnLFxuICAgICAgJ3BheWxvYWQnOiB7XG4gICAgICAgICd0ZW1wbGF0ZV90eXBlJzogJ2J1dHRvbicsXG4gICAgICAgICd0ZXh0JzogZ290KFxuICAgICAgICAgICdpbkdhbWVNZXNzYWdlLnJlY2VpdmVkTWVzc2FnZUZyb21PcHBvbmVudCcsXG4gICAgICAgICAgbGFuLFxuICAgICAgICAgIHtlbmVteTogdXNlci5nZXRGaXJzdE5hbWUoKSwgbWVzc2FnZTogY29udGVudH0sXG4gICAgICAgICksXG4gICAgICAgICdidXR0b25zJzogW1xuICAgICAgICAgIGdldE1lc3NhZ2VVUkxCdXR0b24oXG4gICAgICAgICAgICBnb3QoJ2J1dHRvbi5yZXBseU1lc3NhZ2UnLCBsYW4pLFxuICAgICAgICAgICAgbGFuLFxuICAgICAgICAgICAgdXNlci5nZXRJRCgpLFxuICAgICAgICAgICAgRW5jcnlwdFV0aWxzLmVuY3J5cHQob3Bwb25lbnQuZ2V0RkJJRCgpKSxcbiAgICAgICAgICApLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIEJvdC5zZW5kKG9wcG9uZW50LmdldEZCSUQoKSwgbWVzc2FnZURhdGEpO1xufSk7XG5cbmNvbnRyb2xsZXIuZ2V0KCdnZXRCZWZvcmUnLCBhc3luYyAodXNlcjogVXNlciwgcGFyYW1zOiBPYmplY3QsIHJlczogT2JqZWN0KSA9PiB7XG4gIGxldCB7YmVmb3JlTWVzc2FnZUlELCByZWNlaXZlcklEfSA9IHBhcmFtcztcbiAgaW52YXJpYW50KHJlY2VpdmVySUQsICdyZWNlaXZlcklEIGFyZSByZXF1aXJlZCcpO1xuXG4gIGNvbnN0IHF1ZXJ5OiBPYmplY3QgPSB7fTtcbiAgaWYgKGJlZm9yZU1lc3NhZ2VJRCkge1xuICAgIGJlZm9yZU1lc3NhZ2VJRCA9IHBhcnNlSW50KGJlZm9yZU1lc3NhZ2VJRCwgMTApO1xuICB9XG4gIHJlY2VpdmVySUQgPSBwYXJzZUludChyZWNlaXZlcklELCAxMCk7XG5cbiAgY29uc3QgbGltaXQgPSA1O1xuICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IE1lc3NhZ2UuZ2VuRm9yVXNlcnNCZWZvcmVJRChcbiAgICB1c2VyLmdldElEKCksXG4gICAgcmVjZWl2ZXJJRCxcbiAgICBsaW1pdCArIDEsXG4gICAgYmVmb3JlTWVzc2FnZUlELFxuICApO1xuICBjb25zdCBoYXNNb3JlID0gbWVzc2FnZXMubGVuZ3RoID4gbGltaXQ7XG4gIHJlcy5qc29uKHtcbiAgICBtZXNzYWdlczogbWVzc2FnZXMuc2xpY2UoMCwgbGltaXQpLm1hcCh4ID0+IHguZ2V0RGF0YSgpKSxcbiAgICBoYXNNb3JlLFxuICB9KTtcbn0pO1xuXG5jb250cm9sbGVyLmdldCgnZ2V0QWZ0ZXInLCBhc3luYyAodXNlcjogVXNlciwgcGFyYW1zOiBPYmplY3QsIHJlczogT2JqZWN0KSA9PiB7XG4gIGxldCB7YWZ0ZXJNZXNzYWdlSUQsIHJlY2VpdmVySUR9ID0gcGFyYW1zO1xuICBpbnZhcmlhbnQocmVjZWl2ZXJJRCwgJ3JlY2VpdmVySUQgYXJlIHJlcXVpcmVkJyk7XG5cbiAgY29uc3QgcXVlcnk6IE9iamVjdCA9IHt9O1xuICBpZiAoYWZ0ZXJNZXNzYWdlSUQpIHtcbiAgICBhZnRlck1lc3NhZ2VJRCA9IHBhcnNlSW50KGFmdGVyTWVzc2FnZUlELCAxMCk7XG4gIH1cbiAgcmVjZWl2ZXJJRCA9IHBhcnNlSW50KHJlY2VpdmVySUQsIDEwKTtcbiAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBNZXNzYWdlLmdlbkZvclVzZXJzQWZ0ZXJJRChcbiAgICB1c2VyLmdldElEKCksXG4gICAgcmVjZWl2ZXJJRCxcbiAgICA1LFxuICAgIGFmdGVyTWVzc2FnZUlELFxuICApO1xuICByZXMuanNvbih7XG4gICAgbWVzc2FnZXM6IG1lc3NhZ2VzLm1hcCh4ID0+IHguZ2V0RGF0YSgpKSxcbiAgfSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb250cm9sbGVyO1xuIl19
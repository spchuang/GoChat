

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JoinGameRoomHandler = require('../response/general/JoinGameRoomHandler');

var _JoinGameRoomHandler2 = _interopRequireDefault(_JoinGameRoomHandler);

var _Translator = require('../translations/Translator');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

var _RouteControllerBase2 = require('./RouteControllerBase');

var _RouteControllerBase3 = _interopRequireDefault(_RouteControllerBase2);

var _LoggingEnums = require('../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JoinGameRouteController = function (_RouteControllerBase) {
  _inherits(JoinGameRouteController, _RouteControllerBase);

  function JoinGameRouteController() {
    _classCallCheck(this, JoinGameRouteController);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(JoinGameRouteController).apply(this, arguments));
  }

  _createClass(JoinGameRouteController, [{
    key: 'getName',
    value: function getName() {
      return 'joinGame';
    }
  }, {
    key: 'getRouterEvent',
    value: function getRouterEvent() {
      return _LoggingEnums.LoggingEvent.LOAD_JOIN_GAME_VIEW;
    }
  }, {
    key: 'getLoadMessengerExtension',
    value: function getLoadMessengerExtension() {
      return true;
    }
  }, {
    key: 'getPageTitle',
    value: function getPageTitle(lan) {
      return (0, _Translator.got)('button.joinARoom', lan);
    }
  }, {
    key: 'genClientContainerParams',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        var language;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                language = user.getLanguage();
                return _context.abrupt('return', {
                  text: {
                    enterCodeForRoom: (0, _Translator.got)('normalMessage.enterCodeForRoom', language),
                    joinButton: (0, _Translator.got)('button.join', language)
                  }
                });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genClientContainerParams(_x) {
        return ref.apply(this, arguments);
      }

      return genClientContainerParams;
    }()
  }, {
    key: 'getJS',
    value: function getJS() {
      return ['web/JoinGameContainer.' + _config2.default.env + '.js'];
    }
  }, {
    key: 'getCSS',
    value: function getCSS() {
      return ['createGame.css', 'webviewCommon.css'];
    }
  }]);

  return JoinGameRouteController;
}(_RouteControllerBase3.default);

var controller = new JoinGameRouteController();

controller.post('join', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user, params, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _JoinGameRoomHandler2.default.genHandle(user, { code: params.code });

          case 2:
            res.send('');

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));
  return function (_x2, _x3, _x4) {
    return ref.apply(this, arguments);
  };
}());

module.exports = controller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvSm9pbkdhbWVSb3V0ZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRU0sdUI7Ozs7Ozs7Ozs7OzhCQUNjO0FBQ2hCLGFBQU8sVUFBUDtBQUNEOzs7cUNBRXdCO0FBQ3ZCLGFBQU8sMkJBQWEsbUJBQXBCO0FBQ0Q7OztnREFFb0M7QUFDbkMsYUFBTyxJQUFQO0FBQ0Q7OztpQ0FFWSxHLEVBQXFCO0FBQ2hDLGFBQU8scUJBQUksa0JBQUosRUFBd0IsR0FBeEIsQ0FBUDtBQUNEOzs7O2tGQUU4QixJO1lBQ3ZCLFE7Ozs7O0FBQUEsd0IsR0FBVyxLQUFLLFdBQUwsRTtpREFDVjtBQUNMLHdCQUFNO0FBQ0osc0NBQWtCLHFCQUFJLGdDQUFKLEVBQXNDLFFBQXRDLENBRGQ7QUFFSixnQ0FBWSxxQkFBSSxhQUFKLEVBQW1CLFFBQW5CO0FBRlI7QUFERCxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQVFjO0FBQ3JCLGFBQU8sNEJBQ29CLGlCQUFPLEdBRDNCLFNBQVA7QUFHRDs7OzZCQUV1QjtBQUN0QixhQUFPLENBQ0wsZ0JBREssRUFFTCxtQkFGSyxDQUFQO0FBSUQ7Ozs7OztBQUdILElBQU0sYUFBYSxJQUFJLHVCQUFKLEVBQW5COztBQUVBLFdBQVcsSUFBWCxDQUFnQixNQUFoQjtBQUFBLDZEQUF3QixrQkFBTyxJQUFQLEVBQW1CLE1BQW5CLEVBQW1DLEdBQW5DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNoQiw4QkFBb0IsU0FBcEIsQ0FBOEIsSUFBOUIsRUFBb0MsRUFBQyxNQUFNLE9BQU8sSUFBZCxFQUFwQyxDQURnQjs7QUFBQTtBQUV0QixnQkFBSSxJQUFKLENBQVMsRUFBVDs7QUFGc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLQSxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiSm9pbkdhbWVSb3V0ZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBKb2luR2FtZVJvb21IYW5kbGVyIGZyb20gJy4uL3Jlc3BvbnNlL2dlbmVyYWwvSm9pbkdhbWVSb29tSGFuZGxlcic7XG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vY2xhc3MvVXNlcic7XG5pbXBvcnQgUm91dGVDb250cm9sbGVyQmFzZSBmcm9tICcuL1JvdXRlQ29udHJvbGxlckJhc2UnO1xuaW1wb3J0IHtMb2dnaW5nRXZlbnR9IGZyb20gJy4uL2xvZ2dpbmcvTG9nZ2luZ0VudW1zJztcblxuY2xhc3MgSm9pbkdhbWVSb3V0ZUNvbnRyb2xsZXIgZXh0ZW5kcyBSb3V0ZUNvbnRyb2xsZXJCYXNlIHtcbiAgZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnam9pbkdhbWUnO1xuICB9XG5cbiAgZ2V0Um91dGVyRXZlbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTG9nZ2luZ0V2ZW50LkxPQURfSk9JTl9HQU1FX1ZJRVc7XG4gIH1cblxuICBnZXRMb2FkTWVzc2VuZ2VyRXh0ZW5zaW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0UGFnZVRpdGxlKGxhbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ290KCdidXR0b24uam9pbkFSb29tJywgbGFuKTtcbiAgfVxuXG4gIGFzeW5jIGdlbkNsaWVudENvbnRhaW5lclBhcmFtcyh1c2VyOiBVc2VyKTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICBjb25zdCBsYW5ndWFnZSA9IHVzZXIuZ2V0TGFuZ3VhZ2UoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdGV4dDoge1xuICAgICAgICBlbnRlckNvZGVGb3JSb29tOiBnb3QoJ25vcm1hbE1lc3NhZ2UuZW50ZXJDb2RlRm9yUm9vbScsIGxhbmd1YWdlKSxcbiAgICAgICAgam9pbkJ1dHRvbjogZ290KCdidXR0b24uam9pbicsIGxhbmd1YWdlKSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGdldEpTKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBbXG4gICAgICBgd2ViL0pvaW5HYW1lQ29udGFpbmVyLiR7Y29uZmlnLmVudn0uanNgLFxuICAgIF07XG4gIH1cblxuICBnZXRDU1MoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjcmVhdGVHYW1lLmNzcycsXG4gICAgICAnd2Vidmlld0NvbW1vbi5jc3MnLFxuICAgIF07XG4gIH1cbn1cblxuY29uc3QgY29udHJvbGxlciA9IG5ldyBKb2luR2FtZVJvdXRlQ29udHJvbGxlcigpO1xuXG5jb250cm9sbGVyLnBvc3QoJ2pvaW4nLCBhc3luYyAodXNlcjogVXNlciwgcGFyYW1zOiBPYmplY3QsIHJlczogT2JqZWN0KSA9PiB7XG4gIGF3YWl0IEpvaW5HYW1lUm9vbUhhbmRsZXIuZ2VuSGFuZGxlKHVzZXIsIHtjb2RlOiBwYXJhbXMuY29kZX0pO1xuICByZXMuc2VuZCgnJyk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb250cm9sbGVyO1xuIl19
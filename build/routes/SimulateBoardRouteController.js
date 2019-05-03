

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Translator = require('../translations/Translator');

var _Game = require('../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _GameUtils = require('../utils/GameUtils');

var _GameUtils2 = _interopRequireDefault(_GameUtils);

var _RouteControllerBase2 = require('./RouteControllerBase');

var _RouteControllerBase3 = _interopRequireDefault(_RouteControllerBase2);

var _LoggingEnums = require('../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimulateBoardRouteController = function (_RouteControllerBase) {
  _inherits(SimulateBoardRouteController, _RouteControllerBase);

  function SimulateBoardRouteController() {
    _classCallCheck(this, SimulateBoardRouteController);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimulateBoardRouteController).apply(this, arguments));
  }

  _createClass(SimulateBoardRouteController, [{
    key: 'getName',
    value: function getName() {
      return 'simulateBoard';
    }
  }, {
    key: 'getRouterEvent',
    value: function getRouterEvent() {
      return _LoggingEnums.LoggingEvent.LOAD_SIMULATE_GAME_VIEW;
    }
  }, {
    key: 'getLoadMessengerExtension',
    value: function getLoadMessengerExtension() {
      return true;
    }
  }, {
    key: 'getPageTitle',
    value: function getPageTitle(lan) {
      return (0, _Translator.got)('button.simulateGame', lan);
    }
  }, {
    key: 'genClientContainerParams',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(user, req) {
        var _this2 = this;

        var language, loadSingleGameOnly, gameInfos, focusOnGameID, loadGameID, game, gameInfo;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                language = user.getLanguage();
                loadSingleGameOnly = false;

                // if game ID is provided, only load that game.

                gameInfos = void 0;
                focusOnGameID = void 0;
                // Note we dont pass loadGameID in anymore

                loadGameID = req.query.gameID;

                if (!loadGameID) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 8;
                return _Game2.default.genEnforce(loadGameID);

              case 8:
                game = _context3.sent;

                (0, _invariant2.default)(!!game, 'Game should exist!');
                _context3.next = 12;
                return _GameUtils2.default.genGameInfo(user.getID(), language, game);

              case 12:
                gameInfo = _context3.sent;

                gameInfos = [gameInfo];
                loadSingleGameOnly = true;
                focusOnGameID = game.getID();
                _context3.next = 19;
                break;

              case 18:
                return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
                  var games, userID;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return _Game2.default.genActiveGamesForUser(user);

                        case 2:
                          games = _context2.sent;
                          userID = user.getID();
                          _context2.next = 6;
                          return _bluebird2.default.all(games.map(function () {
                            var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(game) {
                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      return _context.abrupt('return', _GameUtils2.default.genGameInfo(userID, language, game));

                                    case 1:
                                    case 'end':
                                      return _context.stop();
                                  }
                                }
                              }, _callee, _this2);
                            }));
                            return function (_x3) {
                              return ref.apply(this, arguments);
                            };
                          }()));

                        case 6:
                          gameInfos = _context2.sent;

                          focusOnGameID = user.getCurrentGameID();

                        case 8:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this2);
                })(), 't0', 19);

              case 19:
                return _context3.abrupt('return', {
                  focusedOnGameID: focusOnGameID,
                  games: gameInfos,
                  loadSingleGameOnly: loadSingleGameOnly,
                  text: {
                    noGameMessage: (0, _Translator.got)('simulateBoard.noGameMessage', language),
                    emptyBoardOption: (0, _Translator.got)('simulateBoard.emptyBoardOption', language),
                    selectGameLabel: (0, _Translator.got)('simulateBoard.selectGameLabel', language),
                    selectBoardSizeLabel: (0, _Translator.got)('simulateBoard.selectBoardSizeLabel', language)
                  }
                });

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genClientContainerParams(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return genClientContainerParams;
    }()
  }, {
    key: 'getJS',
    value: function getJS() {
      return ['vendor/wgo.min.js', 'vendor/wgo.player.min.js', 'web/SimulateBoardContainer.' + _config2.default.env + '.js'];
    }
  }, {
    key: 'getCSS',
    value: function getCSS() {
      return ['webviewCommon.css', 'simulateBoard.css', 'vendor/wgo.player.css'];
    }
  }]);

  return SimulateBoardRouteController;
}(_RouteControllerBase3.default);

module.exports = new SimulateBoardRouteController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvU2ltdWxhdGVCb2FyZFJvdXRlQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUVBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRU0sNEI7Ozs7Ozs7Ozs7OzhCQUNjO0FBQ2hCLGFBQU8sZUFBUDtBQUNEOzs7cUNBRXdCO0FBQ3ZCLGFBQU8sMkJBQWEsdUJBQXBCO0FBQ0Q7OztnREFFb0M7QUFDbkMsYUFBTyxJQUFQO0FBQ0Q7OztpQ0FFWSxHLEVBQXFCO0FBQ2hDLGFBQU8scUJBQUkscUJBQUosRUFBMkIsR0FBM0IsQ0FBUDtBQUNEOzs7O21GQUU4QixJLEVBQVksRzs7O1lBQ25DLFEsRUFDRixrQixFQUdBLFMsRUFDQSxhLEVBRUUsVSxFQUVFLEksRUFFQSxROzs7OztBQVhGLHdCLEdBQVcsS0FBSyxXQUFMLEU7QUFDYixrQyxHQUFxQixLOzs7O0FBR3JCLHlCO0FBQ0EsNkI7OztBQUVFLDBCLEdBQWEsSUFBSSxLQUFKLENBQVUsTTs7cUJBQ3pCLFU7Ozs7Ozt1QkFDaUIsZUFBTyxVQUFQLENBQWtCLFVBQWxCLEM7OztBQUFiLG9COztBQUNOLHlDQUFVLENBQUMsQ0FBQyxJQUFaLEVBQWtCLG9CQUFsQjs7dUJBQ3VCLG9CQUFVLFdBQVYsQ0FBc0IsS0FBSyxLQUFMLEVBQXRCLEVBQW9DLFFBQXBDLEVBQThDLElBQTlDLEM7OztBQUFqQix3Qjs7QUFDTiw0QkFBWSxDQUFDLFFBQUQsQ0FBWjtBQUNBLHFDQUFxQixJQUFyQjtBQUNBLGdDQUFnQixLQUFLLEtBQUwsRUFBaEI7Ozs7OztzQkFFTSxLLEVBQ0EsTTs7Ozs7O2lDQURjLGVBQU8scUJBQVAsQ0FBNkIsSUFBN0IsQzs7O0FBQWQsK0I7QUFDQSxnQyxHQUFTLEtBQUssS0FBTCxFOztpQ0FDRyxtQkFBUSxHQUFSLENBQ2hCLE1BQU0sR0FBTjtBQUFBLHVGQUFVLGlCQUFPLElBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVFQUFnQixvQkFBVSxXQUFWLENBQXNCLE1BQXRCLEVBQThCLFFBQTlCLEVBQXdDLElBQXhDLENBQWhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEJBRGdCLEM7OztBQUFsQixtQzs7QUFHQSwwQ0FBZ0IsS0FBSyxnQkFBTCxFQUFoQjs7Ozs7Ozs7Ozs7a0RBR0s7QUFDTCxtQ0FBaUIsYUFEWjtBQUVMLHlCQUFPLFNBRkY7QUFHTCxzQ0FBb0Isa0JBSGY7QUFJTCx3QkFBTTtBQUNKLG1DQUFlLHFCQUFJLDZCQUFKLEVBQW1DLFFBQW5DLENBRFg7QUFFSixzQ0FBa0IscUJBQUksZ0NBQUosRUFBc0MsUUFBdEMsQ0FGZDtBQUdKLHFDQUFpQixxQkFBSSwrQkFBSixFQUFxQyxRQUFyQyxDQUhiO0FBSUosMENBQXNCLHFCQUFJLG9DQUFKLEVBQTBDLFFBQTFDO0FBSmxCO0FBSkQsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFhYztBQUNyQixhQUFPLENBQ0wsbUJBREssRUFFTCwwQkFGSyxrQ0FHeUIsaUJBQU8sR0FIaEMsU0FBUDtBQUtEOzs7NkJBRXVCO0FBQ3RCLGFBQU8sQ0FDTCxtQkFESyxFQUVMLG1CQUZLLEVBR0wsdUJBSEssQ0FBUDtBQUtEOzs7Ozs7QUFHSCxPQUFPLE9BQVAsR0FBaUIsSUFBSSw0QkFBSixFQUFqQiIsImZpbGUiOiJTaW11bGF0ZUJvYXJkUm91dGVDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEdvR2FtZSBmcm9tICcuLi9jbGFzcy9HYW1lJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IEdhbWVVdGlscyBmcm9tICcuLi91dGlscy9HYW1lVXRpbHMnO1xuaW1wb3J0IFJvdXRlQ29udHJvbGxlckJhc2UgZnJvbSAnLi9Sb3V0ZUNvbnRyb2xsZXJCYXNlJztcbmltcG9ydCB7TG9nZ2luZ0V2ZW50fSBmcm9tICcuLi9sb2dnaW5nL0xvZ2dpbmdFbnVtcyc7XG5cbmNsYXNzIFNpbXVsYXRlQm9hcmRSb3V0ZUNvbnRyb2xsZXIgZXh0ZW5kcyBSb3V0ZUNvbnRyb2xsZXJCYXNlIHtcbiAgZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnc2ltdWxhdGVCb2FyZCc7XG4gIH1cblxuICBnZXRSb3V0ZXJFdmVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBMb2dnaW5nRXZlbnQuTE9BRF9TSU1VTEFURV9HQU1FX1ZJRVc7XG4gIH1cblxuICBnZXRMb2FkTWVzc2VuZ2VyRXh0ZW5zaW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0UGFnZVRpdGxlKGxhbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ290KCdidXR0b24uc2ltdWxhdGVHYW1lJywgbGFuKTtcbiAgfVxuXG4gIGFzeW5jIGdlbkNsaWVudENvbnRhaW5lclBhcmFtcyh1c2VyOiBVc2VyLCByZXE6IE9iamVjdCk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSB1c2VyLmdldExhbmd1YWdlKCk7XG4gICAgbGV0IGxvYWRTaW5nbGVHYW1lT25seSA9IGZhbHNlO1xuXG4gICAgLy8gaWYgZ2FtZSBJRCBpcyBwcm92aWRlZCwgb25seSBsb2FkIHRoYXQgZ2FtZS5cbiAgICBsZXQgZ2FtZUluZm9zO1xuICAgIGxldCBmb2N1c09uR2FtZUlEO1xuICAgIC8vIE5vdGUgd2UgZG9udCBwYXNzIGxvYWRHYW1lSUQgaW4gYW55bW9yZVxuICAgIGNvbnN0IGxvYWRHYW1lSUQgPSByZXEucXVlcnkuZ2FtZUlEO1xuICAgIGlmIChsb2FkR2FtZUlEKSB7XG4gICAgICBjb25zdCBnYW1lID0gYXdhaXQgR29HYW1lLmdlbkVuZm9yY2UobG9hZEdhbWVJRClcbiAgICAgIGludmFyaWFudCghIWdhbWUsICdHYW1lIHNob3VsZCBleGlzdCEnKTtcbiAgICAgIGNvbnN0IGdhbWVJbmZvID0gYXdhaXQgR2FtZVV0aWxzLmdlbkdhbWVJbmZvKHVzZXIuZ2V0SUQoKSwgbGFuZ3VhZ2UsIGdhbWUpO1xuICAgICAgZ2FtZUluZm9zID0gW2dhbWVJbmZvXTtcbiAgICAgIGxvYWRTaW5nbGVHYW1lT25seSA9IHRydWU7XG4gICAgICBmb2N1c09uR2FtZUlEID0gZ2FtZS5nZXRJRCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYW1lcyA9IGF3YWl0IEdvR2FtZS5nZW5BY3RpdmVHYW1lc0ZvclVzZXIodXNlcik7XG4gICAgICBjb25zdCB1c2VySUQgPSB1c2VyLmdldElEKCk7XG4gICAgICBnYW1lSW5mb3MgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgZ2FtZXMubWFwKGFzeW5jIChnYW1lKSA9PiBHYW1lVXRpbHMuZ2VuR2FtZUluZm8odXNlcklELCBsYW5ndWFnZSwgZ2FtZSkpLFxuICAgICAgKTtcbiAgICAgIGZvY3VzT25HYW1lSUQgPSB1c2VyLmdldEN1cnJlbnRHYW1lSUQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZE9uR2FtZUlEOiBmb2N1c09uR2FtZUlELFxuICAgICAgZ2FtZXM6IGdhbWVJbmZvcyxcbiAgICAgIGxvYWRTaW5nbGVHYW1lT25seTogbG9hZFNpbmdsZUdhbWVPbmx5LFxuICAgICAgdGV4dDoge1xuICAgICAgICBub0dhbWVNZXNzYWdlOiBnb3QoJ3NpbXVsYXRlQm9hcmQubm9HYW1lTWVzc2FnZScsIGxhbmd1YWdlKSxcbiAgICAgICAgZW1wdHlCb2FyZE9wdGlvbjogZ290KCdzaW11bGF0ZUJvYXJkLmVtcHR5Qm9hcmRPcHRpb24nLCBsYW5ndWFnZSksXG4gICAgICAgIHNlbGVjdEdhbWVMYWJlbDogZ290KCdzaW11bGF0ZUJvYXJkLnNlbGVjdEdhbWVMYWJlbCcsIGxhbmd1YWdlKSxcbiAgICAgICAgc2VsZWN0Qm9hcmRTaXplTGFiZWw6IGdvdCgnc2ltdWxhdGVCb2FyZC5zZWxlY3RCb2FyZFNpemVMYWJlbCcsIGxhbmd1YWdlKSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGdldEpTKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBbXG4gICAgICAndmVuZG9yL3dnby5taW4uanMnLFxuICAgICAgJ3ZlbmRvci93Z28ucGxheWVyLm1pbi5qcycsXG4gICAgICBgd2ViL1NpbXVsYXRlQm9hcmRDb250YWluZXIuJHtjb25maWcuZW52fS5qc2AsXG4gICAgXTtcbiAgfVxuXG4gIGdldENTUygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3dlYnZpZXdDb21tb24uY3NzJyxcbiAgICAgICdzaW11bGF0ZUJvYXJkLmNzcycsXG4gICAgICAndmVuZG9yL3dnby5wbGF5ZXIuY3NzJyxcbiAgICBdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNpbXVsYXRlQm9hcmRSb3V0ZUNvbnRyb2xsZXIoKTtcbiJdfQ==
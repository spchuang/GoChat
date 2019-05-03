

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Translator = require('../translations/Translator');

var _RouteUtils = require('./RouteUtils');

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

var _EncryptUtils = require('../utils/EncryptUtils');

var _EncryptUtils2 = _interopRequireDefault(_EncryptUtils);

var _Logger = require('../logging/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteControllerBase = function () {
  function RouteControllerBase() {
    _classCallCheck(this, RouteControllerBase);

    this._subRoutes = [];

    // $FlowFixMe: https://github.com/facebook/flow/issues/1152
    if (new.target === RouteControllerBase) {
      throw new TypeError('Cannot construct RouteControllerBase instance directly');
    }
  }

  _createClass(RouteControllerBase, [{
    key: 'getRouterEvent',
    value: function getRouterEvent() {
      throw new TypeError('Must override getRouterEvent');
    }
  }, {
    key: 'getName',
    value: function getName() {
      throw new TypeError('Must override getName');
    }
  }, {
    key: 'post',
    value: function post(name, callback) {
      this._subRoutes.push({ name: name, method: 'post', callback: callback });
    }
  }, {
    key: 'get',
    value: function get(name, callback) {
      this._subRoutes.push({ name: name, method: 'get', callback: callback });
    }
  }, {
    key: 'genClientContainerParams',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(_1, _2) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new TypeError('Must override genClientContainerProps');

              case 1:
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
    key: '_genClientContainerParams',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user, req) {
        var props, encryptID;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.genClientContainerParams(user, req);

              case 2:
                props = _context2.sent;
                encryptID = _EncryptUtils2.default.encrypt(user.getFBID());
                return _context2.abrupt('return', _extends({
                  userID: encryptID
                }, props));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _genClientContainerParams(_x3, _x4) {
        return ref.apply(this, arguments);
      }

      return _genClientContainerParams;
    }()
  }, {
    key: 'getCSS',
    value: function getCSS() {
      return [];
    }
  }, {
    key: 'getJS',
    value: function getJS() {
      return [];
    }
  }, {
    key: 'getLoadMessengerExtension',
    value: function getLoadMessengerExtension() {
      return false;
    }
  }, {
    key: 'getPageTitle',
    value: function getPageTitle(_) {
      throw new TypeError('Must override getPageTitle');
    }
  }, {
    key: 'genRouter',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6() {
        var _this = this;

        var router, routeName, getPropsURL, _loop, i;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                router = _express2.default.Router();
                routeName = this.getName();
                getPropsURL = '/' + routeName + '/_json';

                // register json get route

                router.get(getPropsURL, function () {
                  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res, next) {
                    var user, props;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            user = void 0;

                            if (!req.query.u) {
                              _context3.next = 7;
                              break;
                            }

                            _context3.next = 4;
                            return (0, _RouteUtils.getUserFromEncryptID)(req.query.u);

                          case 4:
                            user = _context3.sent;
                            _context3.next = 11;
                            break;

                          case 7:
                            if (!req.query.fbid) {
                              _context3.next = 11;
                              break;
                            }

                            _context3.next = 10;
                            return _User2.default.genByFBID(req.query.fbid);

                          case 10:
                            user = _context3.sent;

                          case 11:
                            if (user) {
                              _context3.next = 13;
                              break;
                            }

                            return _context3.abrupt('return', next(new Error('invalid user')));

                          case 13:
                            _context3.next = 15;
                            return _this._genClientContainerParams(user, req);

                          case 15:
                            props = _context3.sent;

                            res.json(props);

                            new _Logger.Logger(user).setEvent(_this.getRouterEvent()).log();

                          case 18:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this);
                  }));
                  return function (_x5, _x6, _x7) {
                    return ref.apply(this, arguments);
                  };
                }());

                // register get route
                router.get('/' + routeName, function () {
                  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(req, res, next) {
                    var user, defaultLanguage, props;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return (0, _RouteUtils.getUserFromEncryptID)(req.query.u);

                          case 2:
                            user = _context4.sent;
                            defaultLanguage = void 0;
                            props = void 0;

                            if (!user) {
                              _context4.next = 14;
                              break;
                            }

                            req.userID = user.getID();
                            req.userLanguage = user.getLanguage();
                            defaultLanguage = user.getLanguage();
                            _context4.next = 11;
                            return _this._genClientContainerParams(user, req);

                          case 11:
                            props = _context4.sent;
                            _context4.next = 16;
                            break;

                          case 14:
                            defaultLanguage = req.query.language || 'en';
                            props = {
                              text: {
                                notSupportedText: (0, _Translator.got)('normalMessage.NeedToInputTokenForWebView', defaultLanguage),
                                enterButton: (0, _Translator.got)('button.enter', defaultLanguage)
                              }
                            };

                          case 16:

                            res.render('web/common', {
                              title: _this.getPageTitle(defaultLanguage),
                              props: props,
                              loadMessengerExtension: _this.getLoadMessengerExtension(),
                              js: _this.getJS(),
                              css: _this.getCSS(),
                              getPropsURL: getPropsURL
                            });

                            if (user) {
                              new _Logger.Logger(user).setEvent(_this.getRouterEvent()).log();
                            }

                          case 18:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this);
                  }));
                  return function (_x8, _x9, _x10) {
                    return ref.apply(this, arguments);
                  };
                }());

                // register extra sub routes

                _loop = function _loop(i) {
                  var subRoute = _this._subRoutes[i];
                  var subRouteName = subRoute.name;

                  var handleRoute = function () {
                    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(req, res, next) {
                      var param, user;
                      return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              param = _extends({}, req.query, req.body);
                              _context5.next = 3;
                              return (0, _RouteUtils.getUserFromEncryptID)(param.u);

                            case 3:
                              user = _context5.sent;

                              if (user) {
                                _context5.next = 6;
                                break;
                              }

                              return _context5.abrupt('return', next(new Error('invalid user')));

                            case 6:

                              req.userID = user.getID();
                              req.userLanguage = user.getLanguage();

                              _context5.prev = 8;
                              _context5.next = 11;
                              return subRoute.callback(user, param, res, next);

                            case 11:
                              _context5.next = 17;
                              break;

                            case 13:
                              _context5.prev = 13;
                              _context5.t0 = _context5['catch'](8);

                              error('Error handling post requests for ' + routeName + ' - ' + subRouteName, _context5.t0);
                              return _context5.abrupt('return', next(_context5.t0));

                            case 17:
                            case 'end':
                              return _context5.stop();
                          }
                        }
                      }, _callee5, _this, [[8, 13]]);
                    }));
                    return function handleRoute(_x11, _x12, _x13) {
                      return ref.apply(this, arguments);
                    };
                  }();

                  // register post routes
                  if (subRoute.method === 'post') {
                    router.post('/' + routeName + '/' + subRouteName, handleRoute);
                  } else {
                    router.get('/' + routeName + '/' + subRouteName, handleRoute);
                  }
                };

                for (i = 0; i < this._subRoutes.length; i++) {
                  _loop(i);
                }
                return _context6.abrupt('return', router);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function genRouter() {
        return ref.apply(this, arguments);
      }

      return genRouter;
    }()
  }]);

  return RouteControllerBase;
}();

module.exports = RouteControllerBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvUm91dGVDb250cm9sbGVyQmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7Ozs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNLG1CO0FBR0osaUNBQWM7QUFBQTs7QUFBQSxTQUZkLFVBRWMsR0FGYyxFQUVkOzs7QUFFWixRQUFJLElBQUksTUFBSixLQUFlLG1CQUFuQixFQUF3QztBQUN0QyxZQUFNLElBQUksU0FBSixDQUFjLHdEQUFkLENBQU47QUFDRDtBQUNGOzs7O3FDQUV3QjtBQUN2QixZQUFNLElBQUksU0FBSixDQUFjLDhCQUFkLENBQU47QUFDRDs7OzhCQUVpQjtBQUNoQixZQUFNLElBQUksU0FBSixDQUFjLHVCQUFkLENBQU47QUFDRDs7O3lCQUdDLEksRUFDQSxRLEVBQ007QUFDTixXQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsRUFBQyxVQUFELEVBQU8sUUFBUSxNQUFmLEVBQXVCLGtCQUF2QixFQUFyQjtBQUNEOzs7d0JBR0MsSSxFQUNBLFEsRUFDTTtBQUNOLFdBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixFQUFDLFVBQUQsRUFBTyxRQUFRLEtBQWYsRUFBc0Isa0JBQXRCLEVBQXJCO0FBQ0Q7Ozs7a0ZBRThCLEUsRUFBVSxFOzs7OztzQkFDakMsSUFBSSxTQUFKLENBQWMsdUNBQWQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFHd0IsSSxFQUFZLEc7WUFDcEMsSyxFQUNBLFM7Ozs7Ozt1QkFEYyxLQUFLLHdCQUFMLENBQThCLElBQTlCLEVBQW9DLEdBQXBDLEM7OztBQUFkLHFCO0FBQ0EseUIsR0FBWSx1QkFBYSxPQUFiLENBQXFCLEtBQUssT0FBTCxFQUFyQixDOztBQUVoQiwwQkFBUTttQkFDTCxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBSWlCO0FBQ3RCLGFBQU8sRUFBUDtBQUNEOzs7NEJBRXNCO0FBQ3JCLGFBQU8sRUFBUDtB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QWYsU0FBNEIsWUFBNUIsRUFBNEMsV0FBNUM7QUFDRDs7O0FBM0JILHFCQUFTLENBQVQsR0FBYSxDQUFiLEVBQWdCLElBQUksS0FBSyxVQUFMLENBQWdCLE1BQXBDLEVBQTRDLEdBQTVDLEVBQWlEO0FBQUEsd0JBQXhDLENBQXdDO0FBNEJoRDtrREFDTSxNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJWCxPQUFPLE9BQVAsR0FBaUIsbUJBQWpCIiwiZmlsZSI6IlJvdXRlQ29udHJvbGxlckJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCB7Z2V0VXNlckZyb21FbmNyeXB0SUR9IGZyb20gJy4vUm91dGVVdGlscyc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBFbmNyeXB0VXRpbHMgZnJvbSAnLi4vdXRpbHMvRW5jcnlwdFV0aWxzJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi9sb2dnaW5nL0xvZ2dlcic7XG5cbmNsYXNzIFJvdXRlQ29udHJvbGxlckJhc2Uge1xuICBfc3ViUm91dGVzOiBBcnJheTxPYmplY3Q+ID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gJEZsb3dGaXhNZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzExNTJcbiAgICBpZiAobmV3LnRhcmdldCA9PT0gUm91dGVDb250cm9sbGVyQmFzZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnN0cnVjdCBSb3V0ZUNvbnRyb2xsZXJCYXNlIGluc3RhbmNlIGRpcmVjdGx5Jyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Um91dGVyRXZlbnQoKTogc3RyaW5nIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNdXN0IG92ZXJyaWRlIGdldFJvdXRlckV2ZW50Jyk7XG4gIH1cblxuICBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBvdmVycmlkZSBnZXROYW1lJyk7XG4gIH1cblxuICBwb3N0KFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBjYWxsYmFjazogKHVzZXI6IFVzZXIsIHBhcmFtczogT2JqZWN0LCByZXM6IE9iamVjdCwgXzogRnVuY3Rpb24pID0+IFByb21pc2U8dm9pZD4sXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX3N1YlJvdXRlcy5wdXNoKHtuYW1lLCBtZXRob2Q6ICdwb3N0JywgY2FsbGJhY2t9KTtcbiAgfVxuXG4gIGdldChcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgY2FsbGJhY2s6ICh1c2VyOiBVc2VyLCBwYXJhbXM6IE9iamVjdCwgcmVzOiBPYmplY3QsIF86IEZ1bmN0aW9uKSA9PiBQcm9taXNlPHZvaWQ+LFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJSb3V0ZXMucHVzaCh7bmFtZSwgbWV0aG9kOiAnZ2V0JywgY2FsbGJhY2t9KTtcbiAgfVxuXG4gIGFzeW5jIGdlbkNsaWVudENvbnRhaW5lclBhcmFtcyhfMTogVXNlciwgXzI6IE9iamVjdCk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBvdmVycmlkZSBnZW5DbGllbnRDb250YWluZXJQcm9wcycpO1xuICB9XG5cbiAgYXN5bmMgX2dlbkNsaWVudENvbnRhaW5lclBhcmFtcyh1c2VyOiBVc2VyLCByZXE6IE9iamVjdCk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgY29uc3QgcHJvcHMgPSBhd2FpdCB0aGlzLmdlbkNsaWVudENvbnRhaW5lclBhcmFtcyh1c2VyLCByZXEpO1xuICAgIGNvbnN0IGVuY3J5cHRJRCA9IEVuY3J5cHRVdGlscy5lbmNyeXB0KHVzZXIuZ2V0RkJJRCgpKTtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcklEOiBlbmNyeXB0SUQsXG4gICAgICAuLi5wcm9wcyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0Q1NTKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEpTKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldExvYWRNZXNzZW5nZXJFeHRlbnNpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0UGFnZVRpdGxlKF86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBvdmVycmlkZSBnZXRQYWdlVGl0bGUnKTtcbiAgfVxuXG4gIGFzeW5jIGdlblJvdXRlcigpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgIGxldCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuICAgIGNvbnN0IHJvdXRlTmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuICAgIGNvbnN0IGdldFByb3BzVVJMID0gYC8ke3JvdXRlTmFtZX0vX2pzb25gO1xuXG4gICAgLy8gcmVnaXN0ZXIganNvbiBnZXQgcm91dGVcbiAgICByb3V0ZXIuZ2V0KGdldFByb3BzVVJMLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgIGxldCB1c2VyO1xuXG4gICAgICBpZiAocmVxLnF1ZXJ5LnUpIHtcbiAgICAgICAgdXNlciA9IGF3YWl0IGdldFVzZXJGcm9tRW5jcnlwdElEKHJlcS5xdWVyeS51KTtcbiAgICAgIH0gZWxzZSBpZiAocmVxLnF1ZXJ5LmZiaWQpIHtcbiAgICAgICAgdXNlciA9IGF3YWl0IFVzZXIuZ2VuQnlGQklEKHJlcS5xdWVyeS5mYmlkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KG5ldyBFcnJvcignaW52YWxpZCB1c2VyJykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9wcyA9IGF3YWl0IHRoaXMuX2dlbkNsaWVudENvbnRhaW5lclBhcmFtcyh1c2VyLCByZXEpO1xuICAgICAgcmVzLmpzb24ocHJvcHMpO1xuXG4gICAgICAobmV3IExvZ2dlcih1c2VyKSlcbiAgICAgICAgLnNldEV2ZW50KHRoaXMuZ2V0Um91dGVyRXZlbnQoKSlcbiAgICAgICAgLmxvZygpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVnaXN0ZXIgZ2V0IHJvdXRlXG4gICAgcm91dGVyLmdldChgLyR7cm91dGVOYW1lfWAsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJGcm9tRW5jcnlwdElEKHJlcS5xdWVyeS51KTtcblxuICAgICAgbGV0IGRlZmF1bHRMYW5ndWFnZTtcbiAgICAgIGxldCBwcm9wcztcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHJlcS51c2VySUQgPSB1c2VyLmdldElEKCk7XG4gICAgICAgIHJlcS51c2VyTGFuZ3VhZ2UgPSB1c2VyLmdldExhbmd1YWdlKCk7XG4gICAgICAgIGRlZmF1bHRMYW5ndWFnZSA9IHVzZXIuZ2V0TGFuZ3VhZ2UoKTtcbiAgICAgICAgcHJvcHMgPSBhd2FpdCB0aGlzLl9nZW5DbGllbnRDb250YWluZXJQYXJhbXModXNlciwgcmVxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmF1bHRMYW5ndWFnZSA9IHJlcS5xdWVyeS5sYW5ndWFnZSB8fCAnZW4nO1xuICAgICAgICBwcm9wcyA9IHtcbiAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICBub3RTdXBwb3J0ZWRUZXh0OiBnb3QoJ25vcm1hbE1lc3NhZ2UuTmVlZFRvSW5wdXRUb2tlbkZvcldlYlZpZXcnLCBkZWZhdWx0TGFuZ3VhZ2UpLFxuICAgICAgICAgICAgZW50ZXJCdXR0b246IGdvdCgnYnV0dG9uLmVudGVyJywgZGVmYXVsdExhbmd1YWdlKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXMucmVuZGVyKFxuICAgICAgICAnd2ViL2NvbW1vbicsXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogdGhpcy5nZXRQYWdlVGl0bGUoZGVmYXVsdExhbmd1YWdlKSxcbiAgICAgICAgICBwcm9wczogcHJvcHMsXG4gICAgICAgICAgbG9hZE1lc3NlbmdlckV4dGVuc2lvbjogdGhpcy5nZXRMb2FkTWVzc2VuZ2VyRXh0ZW5zaW9uKCksXG4gICAgICAgICAganM6IHRoaXMuZ2V0SlMoKSxcbiAgICAgICAgICBjc3M6IHRoaXMuZ2V0Q1NTKCksXG4gICAgICAgICAgZ2V0UHJvcHNVUkw6IGdldFByb3BzVVJMLFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgKG5ldyBMb2dnZXIodXNlcikpXG4gICAgICAgICAgLnNldEV2ZW50KHRoaXMuZ2V0Um91dGVyRXZlbnQoKSlcbiAgICAgICAgICAubG9nKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyByZWdpc3RlciBleHRyYSBzdWIgcm91dGVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zdWJSb3V0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHN1YlJvdXRlID0gdGhpcy5fc3ViUm91dGVzW2ldO1xuICAgICAgY29uc3Qgc3ViUm91dGVOYW1lID0gc3ViUm91dGUubmFtZTtcblxuICAgICAgY29uc3QgaGFuZGxlUm91dGUgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW0gPSB7Li4ucmVxLnF1ZXJ5LCAuLi5yZXEuYm9keX07XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyRnJvbUVuY3J5cHRJRChwYXJhbS51KTtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQobmV3IEVycm9yKCdpbnZhbGlkIHVzZXInKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXEudXNlcklEID0gdXNlci5nZXRJRCgpO1xuICAgICAgICByZXEudXNlckxhbmd1YWdlID0gdXNlci5nZXRMYW5ndWFnZSgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgc3ViUm91dGUuY2FsbGJhY2sodXNlciwgcGFyYW0sIHJlcywgbmV4dCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGVycm9yKGBFcnJvciBoYW5kbGluZyBwb3N0IHJlcXVlc3RzIGZvciAke3JvdXRlTmFtZX0gLSAke3N1YlJvdXRlTmFtZX1gLCBlcnIpO1xuICAgICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVnaXN0ZXIgcG9zdCByb3V0ZXNcbiAgICAgIGlmIChzdWJSb3V0ZS5tZXRob2QgPT09ICdwb3N0Jykge1xuICAgICAgICByb3V0ZXIucG9zdChgLyR7cm91dGVOYW1lfS8ke3N1YlJvdXRlTmFtZX1gLCBoYW5kbGVSb3V0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3V0ZXIuZ2V0KGAvJHtyb3V0ZU5hbWV9LyR7c3ViUm91dGVOYW1lfWAsIGhhbmRsZVJvdXRlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJvdXRlcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlQ29udHJvbGxlckJhc2U7XG4iXX0=
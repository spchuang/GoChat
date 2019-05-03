'use strict';

var _bluebird = require('bluebird');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _CreateGameRouteController = require('./CreateGameRouteController');

var _CreateGameRouteController2 = _interopRequireDefault(_CreateGameRouteController);

var _JoinGameRouteController = require('./JoinGameRouteController');

var _JoinGameRouteController2 = _interopRequireDefault(_JoinGameRouteController);

var _InternalRoutes = require('./internal/InternalRoutes');

var _InternalRoutes2 = _interopRequireDefault(_InternalRoutes);

var _SimulateBoardRouteController = require('./SimulateBoardRouteController');

var _SimulateBoardRouteController2 = _interopRequireDefault(_SimulateBoardRouteController);

var _ScoreCountingRouteController = require('./ScoreCountingRouteController');

var _ScoreCountingRouteController2 = _interopRequireDefault(_ScoreCountingRouteController);

var _MessageRouteController = require('./MessageRouteController');

var _MessageRouteController2 = _interopRequireDefault(_MessageRouteController);

var _st = require('st');

var _st2 = _interopRequireDefault(_st);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routeControllers = [_SimulateBoardRouteController2.default, _CreateGameRouteController2.default, _JoinGameRouteController2.default, _ScoreCountingRouteController2.default, _MessageRouteController2.default];

var appRouter = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(app) {
    var cacheOptions, mount, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, controller, router;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // load home page
            app.get('/', function (req, res) {
              res.sendFile('web/index.html', { root: APP_ROOT + '/public' });
            });

            app.use('/webhook', _fbLocalChatBot2.default.router());

            cacheOptions = _config2.default.env === 'dev' ? false : {
              fd: {
                max: 1000, // number of fd's to hang on to
                maxAge: 1000 * 60 * 60 },
              // 1 hour
              stat: {
                max: 5000, // number of stat objects to hang on to
                maxAge: 1000 * 60 },
              // 1 mins
              content: {
                max: 1024 * 1024 * 32, // 32 mb
                maxAge: 1000 * 60 * 10, // 10 mins
                cacheControl: 'public, max-age=18000' }
            };

            // set up static content serving

            // 5 hours
            mount = (0, _st2.default)({
              path: APP_ROOT + '/public/web',
              url: '/web',
              cache: cacheOptions,
              index: false,
              gzip: true
            });

            app.use(mount);

            // register routes
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            _iterator = routeControllers[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 19;
              break;
            }

            controller = _step.value;
            _context.next = 14;
            return controller.genRouter();

          case 14:
            router = _context.sent;

            app.use('/', router);

          case 16:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context['catch'](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 25:
            _context.prev = 25;
            _context.prev = 26;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 28:
            _context.prev = 28;

            if (!_didIteratorError) {
              _context.next = 31;
              break;
            }

            throw _iteratorError;

          case 31:
            return _context.finish(28);

          case 32:
            return _context.finish(25);

          case 33:

            // add internal routes
            app.use('/internal', _InternalRoutes2.default);

            // error handling
            app.use(function (err, req, res, next) {
              if (res.headersSent) {
                return next(err);
              }
              error(err);

              if (err.name === 'TypedError') {
                res.status(400).send({
                  error: {
                    code: err.code,
                    message: err.getErrorMessage(req.userLanguage)
                  }
                });
              } else {
                res.status(400).send(err.message);
              }
            });

          case 35:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[8, 21, 25, 33], [26,, 28, 32]]);
  }));
  return function appRouter(_x) {
    return ref.apply(this, arguments);
  };
}();

module.exports = appRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sbUJBQW1CLDBMQUF6Qjs7QUFRQSxJQUFNO0FBQUEsNkRBQVksaUJBQU8sR0FBUDtBQUFBLFFBU1YsWUFUVSxFQTRCVixLQTVCVSxrRkFzQ0wsVUF0Q0ssRUF1Q1IsTUF2Q1E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUdoQixnQkFBSSxHQUFKLENBQVEsR0FBUixFQUFhLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUN6QixrQkFBSSxRQUFKLENBQWEsZ0JBQWIsRUFBK0IsRUFBQyxNQUFNLFdBQVcsU0FBbEIsRUFBL0I7QUFDRCxhQUZEOztBQUlBLGdCQUFJLEdBQUosQ0FBUSxVQUFSLEVBQW9CLHlCQUFJLE1BQUosRUFBcEI7O0FBRU0sd0JBVFUsR0FTSyxpQkFBTyxHQUFQLEtBQWUsS0FBZixHQUNqQixLQURpQixHQUVqQjtBQUNFLGtCQUFJO0FBQ0YscUJBQUssSUFESCxFO0FBRUYsd0JBQVEsT0FBSyxFQUFMLEdBQVEsRUFGZCxFQUROOztBQUtFLG9CQUFNO0FBQ0oscUJBQUssSUFERCxFO0FBRUosd0JBQVEsT0FBTyxFQUZYLEVBTFI7O0FBU0UsdUJBQVM7QUFDUCxxQkFBSyxPQUFLLElBQUwsR0FBVSxFQURSLEU7QUFFUCx3QkFBUSxPQUFPLEVBQVAsR0FBWSxFQUZiLEU7QUFHUCw4QkFBYyx1QkFIUDtBQVRYLGFBWFk7Ozs7O0FBNEJWLGlCQTVCVSxHQTRCRixrQkFBRztBQUNmLG9CQUFNLFdBQVcsYUFERjtBQUVmLG1CQUFLLE1BRlU7QUFHZixxQkFBTyxZQUhRO0FBSWYscUJBQU8sS0FKUTtBQUtmLG9CQUFNO0FBTFMsYUFBSCxDQTVCRTs7QUFtQ2hCLGdCQUFJLEdBQUosQ0FBUSxLQUFSOzs7QUFuQ2dCO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBc0NTLGdCQXRDVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXNDTCxzQkF0Q0s7QUFBQTtBQUFBLG1CQXVDTyxXQUFXLFNBQVgsRUF2Q1A7O0FBQUE7QUF1Q1Isa0JBdkNROztBQXdDZCxnQkFBSSxHQUFKLENBQVEsR0FBUixFQUFhLE1BQWI7O0FBeENjO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7OztBQTRDaEIsZ0JBQUksR0FBSixDQUFRLFdBQVI7OztBQUdBLGdCQUFJLEdBQUosQ0FBUSxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixJQUFoQixFQUF5QjtBQUMvQixrQkFBSSxJQUFJLFdBQVIsRUFBcUI7QUFDbkIsdUJBQU8sS0FBSyxHQUFMLENBQVA7QUFDRDtBQUNELG9CQUFNLEdBQU47O0FBRUEsa0JBQUksSUFBSSxJQUFKLEtBQWEsWUFBakIsRUFBK0I7QUFDN0Isb0JBQUksTUFBSixDQUFXLEdBQVgsRUFBZ0IsSUFBaEIsQ0FBcUI7QUFDbkIseUJBQU87QUFDTCwwQkFBTSxJQUFJLElBREw7QUFFTCw2QkFBUyxJQUFJLGVBQUosQ0FBb0IsSUFBSSxZQUF4QjtBQUZKO0FBRFksaUJBQXJCO0FBTUQsZUFQRCxNQU9PO0FBQ0wsb0JBQUksTUFBSixDQUFXLEdBQVgsRUFBZ0IsSUFBaEIsQ0FBcUIsSUFBSSxPQUF6QjtBQUNEO0FBQ0YsYUFoQkQ7O0FBL0NnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFrRUEsT0FBTyxPQUFQLEdBQWlCLFNBQWpCIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCBCb3QgZnJvbSAnZmItbG9jYWwtY2hhdC1ib3QnO1xuaW1wb3J0IENyZWF0ZUdhbWVSb3V0ZUNvbnRyb2xsZXIgZnJvbSAnLi9DcmVhdGVHYW1lUm91dGVDb250cm9sbGVyJztcbmltcG9ydCBKb2luR2FtZVJvdXRlQ29udHJvbGxlciBmcm9tICcuL0pvaW5HYW1lUm91dGVDb250cm9sbGVyJztcbmltcG9ydCBJbnRlcm5hbFJvdXRlcyBmcm9tICcuL2ludGVybmFsL0ludGVybmFsUm91dGVzJztcbmltcG9ydCBTaW11bGF0ZUJvYXJkUm91dGVDb250cm9sbGVyIGZyb20gJy4vU2ltdWxhdGVCb2FyZFJvdXRlQ29udHJvbGxlcic7XG5pbXBvcnQgU2NvcmVDb3VudGluZ1JvdXRlQ29udHJvbGxlciBmcm9tICcuL1Njb3JlQ291bnRpbmdSb3V0ZUNvbnRyb2xsZXInO1xuaW1wb3J0IE1lc3NhZ2VSb3V0ZUNvbnRyb2xsZXIgZnJvbSAnLi9NZXNzYWdlUm91dGVDb250cm9sbGVyJztcbmltcG9ydCBzdCBmcm9tICdzdCc7XG5cbmNvbnN0IHJvdXRlQ29udHJvbGxlcnMgPSBbXG4gIFNpbXVsYXRlQm9hcmRSb3V0ZUNvbnRyb2xsZXIsXG4gIENyZWF0ZUdhbWVSb3V0ZUNvbnRyb2xsZXIsXG4gIEpvaW5HYW1lUm91dGVDb250cm9sbGVyLFxuICBTY29yZUNvdW50aW5nUm91dGVDb250cm9sbGVyLFxuICBNZXNzYWdlUm91dGVDb250cm9sbGVyLFxuXTtcblxuY29uc3QgYXBwUm91dGVyID0gYXN5bmMgKGFwcDogT2JqZWN0KSA9PiB7XG5cbiAgLy8gbG9hZCBob21lIHBhZ2VcbiAgYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zZW5kRmlsZSgnd2ViL2luZGV4Lmh0bWwnLCB7cm9vdDogQVBQX1JPT1QgKyAnL3B1YmxpYyd9KTtcbiAgfSk7XG5cbiAgYXBwLnVzZSgnL3dlYmhvb2snLCBCb3Qucm91dGVyKCkpO1xuXG4gIGNvbnN0IGNhY2hlT3B0aW9ucyA9IGNvbmZpZy5lbnYgPT09ICdkZXYnXG4gICAgPyBmYWxzZVxuICAgIDoge1xuICAgICAgICBmZDoge1xuICAgICAgICAgIG1heDogMTAwMCwgLy8gbnVtYmVyIG9mIGZkJ3MgdG8gaGFuZyBvbiB0b1xuICAgICAgICAgIG1heEFnZTogMTAwMCo2MCo2MCwgLy8gMSBob3VyXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXQ6IHtcbiAgICAgICAgICBtYXg6IDUwMDAsIC8vIG51bWJlciBvZiBzdGF0IG9iamVjdHMgdG8gaGFuZyBvbiB0b1xuICAgICAgICAgIG1heEFnZTogMTAwMCAqIDYwLCAvLyAxIG1pbnNcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudDoge1xuICAgICAgICAgIG1heDogMTAyNCoxMDI0KjMyLCAvLyAzMiBtYlxuICAgICAgICAgIG1heEFnZTogMTAwMCAqIDYwICogMTAsIC8vIDEwIG1pbnNcbiAgICAgICAgICBjYWNoZUNvbnRyb2w6ICdwdWJsaWMsIG1heC1hZ2U9MTgwMDAnLCAvLyA1IGhvdXJzXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gIC8vIHNldCB1cCBzdGF0aWMgY29udGVudCBzZXJ2aW5nXG4gIGNvbnN0IG1vdW50ID0gc3Qoe1xuICAgIHBhdGg6IEFQUF9ST09UICsgJy9wdWJsaWMvd2ViJyxcbiAgICB1cmw6ICcvd2ViJyxcbiAgICBjYWNoZTogY2FjaGVPcHRpb25zLFxuICAgIGluZGV4OiBmYWxzZSxcbiAgICBnemlwOiB0cnVlLFxuICB9KTtcbiAgYXBwLnVzZShtb3VudCk7XG5cbiAgLy8gcmVnaXN0ZXIgcm91dGVzXG4gIGZvciAoY29uc3QgY29udHJvbGxlciBvZiByb3V0ZUNvbnRyb2xsZXJzKSB7XG4gICAgY29uc3Qgcm91dGVyID0gYXdhaXQgY29udHJvbGxlci5nZW5Sb3V0ZXIoKTtcbiAgICBhcHAudXNlKCcvJywgcm91dGVyKTtcbiAgfVxuXG4gIC8vIGFkZCBpbnRlcm5hbCByb3V0ZXNcbiAgYXBwLnVzZSgnL2ludGVybmFsJywgSW50ZXJuYWxSb3V0ZXMpO1xuXG4gIC8vIGVycm9yIGhhbmRsaW5nXG4gIGFwcC51c2UoKGVyciwgcmVxLCByZXMsIG5leHQpID0+IHtcbiAgICBpZiAocmVzLmhlYWRlcnNTZW50KSB7XG4gICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgIH1cbiAgICBlcnJvcihlcnIpO1xuXG4gICAgaWYgKGVyci5uYW1lID09PSAnVHlwZWRFcnJvcicpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICBjb2RlOiBlcnIuY29kZSxcbiAgICAgICAgICBtZXNzYWdlOiBlcnIuZ2V0RXJyb3JNZXNzYWdlKHJlcS51c2VyTGFuZ3VhZ2UpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcHBSb3V0ZXI7XG4iXX0=
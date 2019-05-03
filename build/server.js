

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var makeServer = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee10() {
    var _this = this;

    // Bot.storePersistentMenu();
    /*
      User.genByFBID('743742272394998').then(user => {
        if (user) {
          ProfileImageUtils.genProfilePicAndSave(user);
        }
      })
    */

    var genHandle = function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(senderID, callback) {
        var user, errorMessage;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return callback();

              case 3:
                _context.next = 14;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);
                _context.next = 10;
                return _User2.default.genOrCreateByFBID(senderID);

              case 10:
                user = _context.sent;
                errorMessage = (0, _Translator.got)('typedException.SOMETHING_IS_WRONG', user.getLanguage());
                /*
                if (err.name !== 'SequelizeDatabaseError' && err.name !== 'TypeError') {
                  errorMessage += ' ' + err;
                }
                */

                _context.next = 14;
                return _fbLocalChatBot2.default.sendText(senderID, errorMessage.substring(0, 320));

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));
      return function genHandle(_x3, _x4) {
        return ref.apply(this, arguments);
      };
    }();

    var silent = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
    var app, hbs, server;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            app = (0, _express2.default)();

            // Register Handlebar templating engine

            hbs = _expressHandlebars2.default.create({
              // Specify helpers which are only registered on this instance.
              helpers: {
                env: function env() {
                  return _config2.default.env;
                },
                json: function json(s) {
                  return JSON.stringify(s);
                }
              },
              defaultLayout: 'main',
              layoutsDir: APP_ROOT + '/templates/layouts',
              partialsDir: APP_ROOT + '/templates'
            });

            app.engine('handlebars', hbs.engine);
            app.set('view engine', 'handlebars');
            app.set('views', APP_ROOT + '/templates');
            app.use(addMyHeaders);

            app.use(_bodyParser2.default.json());
            app.use(_bodyParser2.default.urlencoded({ extended: true }));

            // init messenger bot api
            _fbLocalChatBot2.default.init(_config2.default.FBChatToken || '', 'SETUP_PLAY_GO_THIS_IS_RIGHT', _config2.default.useFBChatLocalTest || false, _config2.default.useMessenger);

            _fbLocalChatBot2.default.setPersistentMenu(_PersistentMenuDefinition2.default.getMenus());

            _fbLocalChatBot2.default.on('text', function () {
              var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(event) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return genHandle(event.sender.id, (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2() {
                          return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  _context2.next = 2;
                                  return _ResponseHandler2.default.handleText(event.sender.id, event.message.text);

                                case 2:
                                  return _context2.abrupt('return', _context2.sent);

                                case 3:
                                case 'end':
                                  return _context2.stop();
                              }
                            }
                          }, _callee2, _this);
                        })));

                      case 2:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }));
              return function (_x5) {
                return ref.apply(this, arguments);
              };
            }());

            _fbLocalChatBot2.default.on('attachments', function () {
              var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(event) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return genHandle(event.sender.id, (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4() {
                          return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return _ResponseHandler2.default.handleAttachment(event.sender.id, event.message.attachments);

                                case 2:
                                case 'end':
                                  return _context4.stop();
                              }
                            }
                          }, _callee4, _this);
                        })));

                      case 2:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, _this);
              }));
              return function (_x6) {
                return ref.apply(this, arguments);
              };
            }());

            _fbLocalChatBot2.default.on('postback', function () {
              var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(event) {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return genHandle(event.sender.id, (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6() {
                          return regeneratorRuntime.wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  _context6.next = 2;
                                  return _ResponseHandler2.default.handlePostback(event.sender.id, event.postback.payload);

                                case 2:
                                case 'end':
                                  return _context6.stop();
                              }
                            }
                          }, _callee6, _this);
                        })));

                      case 2:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, _this);
              }));
              return function (_x7) {
                return ref.apply(this, arguments);
              };
            }());

            _fbLocalChatBot2.default.on('quick_reply', function () {
              var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(event) {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return genHandle(event.sender.id, (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8() {
                          return regeneratorRuntime.wrap(function _callee8$(_context8) {
                            while (1) {
                              switch (_context8.prev = _context8.next) {
                                case 0:
                                  _context8.next = 2;
                                  return _ResponseHandler2.default.handlePostback(event.sender.id, event.message.quick_reply.payload);

                                case 2:
                                case 'end':
                                  return _context8.stop();
                              }
                            }
                          }, _callee8, _this);
                        })));

                      case 2:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                }, _callee9, _this);
              }));
              return function (_x8) {
                return ref.apply(this, arguments);
              };
            }());

            // configure routes with node app
            _context10.next = 16;
            return require('./routes/routes.js')(app);

          case 16:
            _context10.next = 18;
            return _schema2.default.sequelize.sync();

          case 18:
            _context10.next = 20;
            return _GK2.default.init();

          case 20:
            server = app.listen(5000, function () {
              if (!silent) {
                console.log('Listening on port %s...', server.address().port);
              }

              (0, _Logger.setUpLoggingJobs)();
            });

            // await createPersistedMenu.genSave();

            if (_config2.default.env === 'dev' && !_config2.default.test) {
              printRoutes('', app._router.stack);
              // TODO: analyze why startup take so much memory
              // const usage = process.memoryUsage();
              // console.log('RSS: ' + bytesToSize(usage.rss, 3), 'and Heap:', bytesToSize(usage.heapUsed, 3), 'of', bytesToSize(usage.heapTotal, 3), 'total');
            }

            return _context10.abrupt('return', server);

          case 23:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));
  return function makeServer(_x) {
    return ref.apply(this, arguments);
  };
}();

require('./global');

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _schema = require('./class/schema');

var _schema2 = _interopRequireDefault(_schema);

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _GK = require('./utils/GK');

var _GK2 = _interopRequireDefault(_GK);

var _Translator = require('./translations/Translator');

var _Logger = require('./logging/Logger');

var _User = require('./class/User');

var _User2 = _interopRequireDefault(_User);

var _ResponseHandler = require('./response/ResponseHandler');

var _ResponseHandler2 = _interopRequireDefault(_ResponseHandler);

var _PersistentMenuDefinition = require('./utils/PersistentMenuDefinition');

var _PersistentMenuDefinition2 = _interopRequireDefault(_PersistentMenuDefinition);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_process2.default.title = 'GoChat';

// if (config.env === 'dev') {
//   Promise.config({
//     longStackTraces: true,
//   });
// }

// Override send functions to be no-op for AI user
_fbLocalChatBot2.default.oldSend = _fbLocalChatBot2.default.send;
_fbLocalChatBot2.default.send = function (recipientID, messageData) {
  if (recipientID === '0' || !recipientID) {
    return;
  }

  // local chat wouldn't require promise
  var promise = _fbLocalChatBot2.default.oldSend(recipientID, messageData);
  if (promise) {
    promise.then(function () {
      info('Done send message for user ' + recipientID);
    });
  }
};
_fbLocalChatBot2.default.oldSendSenderAction = _fbLocalChatBot2.default.sendSenderAction;
_fbLocalChatBot2.default.sendSenderAction = function (recipientID, action) {
  if (recipientID === '0' || !recipientID) {
    return;
  }
  _fbLocalChatBot2.default.oldSendSenderAction(recipientID, action);
};

var XFRAME_WHITELIST = ['https://www.messenger.com/', 'https://www.facebook.com/'];
function addMyHeaders(req, res, next) {
  if (XFRAME_WHITELIST.indexOf(req.query.domain) !== -1) {
    res.header('X-FRAME-OPTIONS', 'ALLOW-FROM ' + req.query.domain);
  }
  next();
}

function printRoutes(baseUrl, routes) {
  var Table = require('cli-table');
  var table = new Table({ head: ["", "regex", "Path"] });
  console.log('\nAPI for ' + baseUrl);
  console.log('\n********************************************');

  routes.forEach(function (route) {
    if (route.name !== 'router') {
      return;
    }

    route.handle.stack.forEach(function (stack) {
      var val = stack.route;
      if (!val) {
        return;
      }

      var _o = {};
      _o[val.stack[0].method] = [route.regexp, baseUrl + val.path];
      table.push(_o);
    });
  });

  console.log(table.toString());
};

// var unit = ['', 'K', 'M', 'G', 'T', 'P'];
// function bytesToSize(input, precision) {
//     var index = Math.floor(Math.log(input) / Math.log(1024));
//     if (unit >= unit.length) {
//       return input + ' B';
//     }
//     return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B'
// }

module.exports = makeServer;
//# sourceMappingURL=data:application/json;base64,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TUFBTSxNQUFQLEVBQWUsVUFBVSxJQUFJLElBQTdCLENBQTNCO0FBQ0EsWUFBTSxJQUFOLENBQVcsRUFBWDtBQUNELEtBVEQ7QUFVRCxHQWZEOztBQWlCQSxVQUFRLEdBQVIsQ0FBWSxNQUFNLFFBQU4sRUFBWjtBQUNEOzs7Ozs7Ozs7OztBQVdELE9BQU8sT0FBUCxHQUFpQixVQUFqQiIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnLi9nbG9iYWwnO1xuaW1wb3J0IHByb2Nlc3MgZnJvbSAncHJvY2Vzcyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBleHBoYnMgZnJvbSdleHByZXNzLWhhbmRsZWJhcnMnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IG1vZGVscyBmcm9tICcuL2NsYXNzL3NjaGVtYSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCBHSyBmcm9tICcuL3V0aWxzL0dLJztcbmltcG9ydCB7Z290fSBmcm9tICcuL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCB7c2V0VXBMb2dnaW5nSm9ic30gZnJvbSAgJy4vbG9nZ2luZy9Mb2dnZXInO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBSZXNwb25zZUhhbmRsZXIgZnJvbSAnLi9yZXNwb25zZS9SZXNwb25zZUhhbmRsZXInO1xuaW1wb3J0IFBlcnNpc3RlbnRNZW51RGVmaW5pdGlvbiBmcm9tICcuL3V0aWxzL1BlcnNpc3RlbnRNZW51RGVmaW5pdGlvbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxucHJvY2Vzcy50aXRsZSA9ICdHb0NoYXQnXG5cbi8vIGlmIChjb25maWcuZW52ID09PSAnZGV2Jykge1xuLy8gICBQcm9taXNlLmNvbmZpZyh7XG4vLyAgICAgbG9uZ1N0YWNrVHJhY2VzOiB0cnVlLFxuLy8gICB9KTtcbi8vIH1cblxuLy8gT3ZlcnJpZGUgc2VuZCBmdW5jdGlvbnMgdG8gYmUgbm8tb3AgZm9yIEFJIHVzZXJcbkJvdC5vbGRTZW5kID0gQm90LnNlbmQ7XG5Cb3Quc2VuZCA9IGZ1bmN0aW9uKHJlY2lwaWVudElEOiBzdHJpbmcsIG1lc3NhZ2VEYXRhOiBPYmplY3QpOiBQcm9taXNlIHtcbiAgaWYgKHJlY2lwaWVudElEID09PSAnMCcgfHwgIXJlY2lwaWVudElEKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gbG9jYWwgY2hhdCB3b3VsZG4ndCByZXF1aXJlIHByb21pc2VcbiAgY29uc3QgcHJvbWlzZSA9IEJvdC5vbGRTZW5kKHJlY2lwaWVudElELCBtZXNzYWdlRGF0YSk7XG4gIGlmIChwcm9taXNlKSB7XG4gICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIGluZm8oYERvbmUgc2VuZCBtZXNzYWdlIGZvciB1c2VyICR7cmVjaXBpZW50SUR9YCk7XG4gICAgfSk7XG4gIH1cbn1cbkJvdC5vbGRTZW5kU2VuZGVyQWN0aW9uID0gQm90LnNlbmRTZW5kZXJBY3Rpb247XG5Cb3Quc2VuZFNlbmRlckFjdGlvbiA9IGZ1bmN0aW9uKHJlY2lwaWVudElEOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nKTogUHJvbWlzZSB7XG4gIGlmIChyZWNpcGllbnRJRCA9PT0gJzAnIHx8ICFyZWNpcGllbnRJRCkge1xuICAgIHJldHVybjtcbiAgfVxuICBCb3Qub2xkU2VuZFNlbmRlckFjdGlvbihyZWNpcGllbnRJRCwgYWN0aW9uKTtcbn1cblxuY29uc3QgWEZSQU1FX1dISVRFTElTVCA9IFsgJ2h0dHBzOi8vd3d3Lm1lc3Nlbmdlci5jb20vJywgJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS8nIF07XG5mdW5jdGlvbiBhZGRNeUhlYWRlcnMocmVxLCByZXMsIG5leHQpe1xuICBpZiAoWEZSQU1FX1dISVRFTElTVC5pbmRleE9mKHJlcS5xdWVyeS5kb21haW4pICE9PSAtMSkge1xuICAgICAgcmVzLmhlYWRlcignWC1GUkFNRS1PUFRJT05TJywgJ0FMTE9XLUZST00gJyArIHJlcS5xdWVyeS5kb21haW4pO1xuICB9XG4gIG5leHQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFrZVNlcnZlcihzaWxlbnQ6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8T2JqZWN0PiB7XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuICAvLyBSZWdpc3RlciBIYW5kbGViYXIgdGVtcGxhdGluZyBlbmdpbmVcbiAgY29uc3QgaGJzID0gZXhwaGJzLmNyZWF0ZSh7XG4gICAgLy8gU3BlY2lmeSBoZWxwZXJzIHdoaWNoIGFyZSBvbmx5IHJlZ2lzdGVyZWQgb24gdGhpcyBpbnN0YW5jZS5cbiAgICBoZWxwZXJzOiB7XG4gICAgICBlbnY6ICgpID0+IGNvbmZpZy5lbnYsXG4gICAgICBqc29uOiAoczogc3RyaW5nKSA9PiBKU09OLnN0cmluZ2lmeShzKSxcbiAgICB9LFxuICAgIGRlZmF1bHRMYXlvdXQ6ICdtYWluJyxcbiAgICBsYXlvdXRzRGlyOiBBUFBfUk9PVCArICcvdGVtcGxhdGVzL2xheW91dHMnLFxuICAgIHBhcnRpYWxzRGlyOiBBUFBfUk9PVCArICcvdGVtcGxhdGVzJyxcbiAgfSk7XG4gIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaGFuZGxlYmFycycpO1xuICBhcHAuc2V0KCd2aWV3cycsIEFQUF9ST09UICsgJy90ZW1wbGF0ZXMnKTtcbiAgYXBwLnVzZShhZGRNeUhlYWRlcnMpXG5cbiAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogdHJ1ZX0pKTtcblxuICAvLyBpbml0IG1lc3NlbmdlciBib3QgYXBpXG4gIEJvdC5pbml0KFxuICAgIGNvbmZpZy5GQkNoYXRUb2tlbiB8fCAnJyxcbiAgICAnU0VUVVBfUExBWV9HT19USElTX0lTX1JJR0hUJyxcbiAgICBjb25maWcudXNlRkJDaGF0TG9jYWxUZXN0IHx8IGZhbHNlLFxuICAgIGNvbmZpZy51c2VNZXNzZW5nZXIsXG4gICk7XG5cbiAgQm90LnNldFBlcnNpc3RlbnRNZW51KFBlcnNpc3RlbnRNZW51RGVmaW5pdGlvbi5nZXRNZW51cygpKTtcbiAgLy8gQm90LnN0b3JlUGVyc2lzdGVudE1lbnUoKTtcbi8qXG4gIFVzZXIuZ2VuQnlGQklEKCc3NDM3NDIyNzIzOTQ5OTgnKS50aGVuKHVzZXIgPT4ge1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBQcm9maWxlSW1hZ2VVdGlscy5nZW5Qcm9maWxlUGljQW5kU2F2ZSh1c2VyKTtcbiAgICB9XG4gIH0pXG4qL1xuICBhc3luYyBmdW5jdGlvbiBnZW5IYW5kbGUoc2VuZGVySUQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNhbGxiYWNrKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZ2VuT3JDcmVhdGVCeUZCSUQoc2VuZGVySUQpO1xuICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGdvdCgndHlwZWRFeGNlcHRpb24uU09NRVRISU5HX0lTX1dST05HJywgdXNlci5nZXRMYW5ndWFnZSgpKTtcbiAgICAgIC8qXG4gICAgICBpZiAoZXJyLm5hbWUgIT09ICdTZXF1ZWxpemVEYXRhYmFzZUVycm9yJyAmJiBlcnIubmFtZSAhPT0gJ1R5cGVFcnJvcicpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9ICcgJyArIGVycjtcbiAgICAgIH1cbiAgICAgICovXG4gICAgICBhd2FpdCBCb3Quc2VuZFRleHQoc2VuZGVySUQsIGVycm9yTWVzc2FnZS5zdWJzdHJpbmcoMCwgMzIwKSk7XG4gICAgfVxuICB9XG5cbiAgQm90Lm9uKCd0ZXh0JywgYXN5bmMgKGV2ZW50OiBPYmplY3QpID0+IHtcbiAgICBhd2FpdCBnZW5IYW5kbGUoXG4gICAgICBldmVudC5zZW5kZXIuaWQsXG4gICAgICBhc3luYyAoKSA9PiBhd2FpdCBSZXNwb25zZUhhbmRsZXIuaGFuZGxlVGV4dChldmVudC5zZW5kZXIuaWQsIGV2ZW50Lm1lc3NhZ2UudGV4dCksXG4gICAgKTtcbiAgfSk7XG5cbiAgQm90Lm9uKCdhdHRhY2htZW50cycsIGFzeW5jIChldmVudDogT2JqZWN0KSA9PiB7XG4gICAgYXdhaXQgZ2VuSGFuZGxlKFxuICAgICAgZXZlbnQuc2VuZGVyLmlkLFxuICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBSZXNwb25zZUhhbmRsZXIuaGFuZGxlQXR0YWNobWVudChcbiAgICAgICAgICBldmVudC5zZW5kZXIuaWQsXG4gICAgICAgICAgZXZlbnQubWVzc2FnZS5hdHRhY2htZW50cyxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfSk7XG5cbiAgQm90Lm9uKCdwb3N0YmFjaycsIGFzeW5jIChldmVudDogT2JqZWN0KSA9PiB7XG4gICAgYXdhaXQgZ2VuSGFuZGxlKFxuICAgICAgZXZlbnQuc2VuZGVyLmlkLFxuICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBSZXNwb25zZUhhbmRsZXIuaGFuZGxlUG9zdGJhY2soXG4gICAgICAgICAgZXZlbnQuc2VuZGVyLmlkLFxuICAgICAgICAgIGV2ZW50LnBvc3RiYWNrLnBheWxvYWQsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICk7XG4gIH0pO1xuXG4gIEJvdC5vbigncXVpY2tfcmVwbHknLCBhc3luYyAoZXZlbnQ6IE9iamVjdCkgPT4ge1xuICAgIGF3YWl0IGdlbkhhbmRsZShcbiAgICAgIGV2ZW50LnNlbmRlci5pZCxcbiAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgUmVzcG9uc2VIYW5kbGVyLmhhbmRsZVBvc3RiYWNrKFxuICAgICAgICAgIGV2ZW50LnNlbmRlci5pZCxcbiAgICAgICAgICBldmVudC5tZXNzYWdlLnF1aWNrX3JlcGx5LnBheWxvYWQsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICk7XG4gIH0pO1xuXG4gIC8vIGNvbmZpZ3VyZSByb3V0ZXMgd2l0aCBub2RlIGFwcFxuICBhd2FpdCByZXF1aXJlKCcuL3JvdXRlcy9yb3V0ZXMuanMnKShhcHApO1xuXG4gIGF3YWl0IG1vZGVscy5zZXF1ZWxpemUuc3luYygpO1xuICBhd2FpdCBHSy5pbml0KCk7XG5cbiAgdmFyIHNlcnZlciA9IGFwcC5saXN0ZW4oNTAwMCwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdMaXN0ZW5pbmcgb24gcG9ydCAlcy4uLicsIHNlcnZlci5hZGRyZXNzKCkucG9ydCk7XG4gICAgfVxuXG4gICAgc2V0VXBMb2dnaW5nSm9icygpO1xuICB9KTtcblxuXG4gIC8vIGF3YWl0IGNyZWF0ZVBlcnNpc3RlZE1lbnUuZ2VuU2F2ZSgpO1xuICBpZiAoY29uZmlnLmVudiA9PT0gJ2RldicgJiYgIWNvbmZpZy50ZXN0KSB7XG4gICAgcHJpbnRSb3V0ZXMoJycsIGFwcC5fcm91dGVyLnN0YWNrKTtcbiAgICAvLyBUT0RPOiBhbmFseXplIHdoeSBzdGFydHVwIHRha2Ugc28gbXVjaCBtZW1vcnlcbiAgICAvLyBjb25zdCB1c2FnZSA9IHByb2Nlc3MubWVtb3J5VXNhZ2UoKTtcbiAgICAvLyBjb25zb2xlLmxvZygnUlNTOiAnICsgYnl0ZXNUb1NpemUodXNhZ2UucnNzLCAzKSwgJ2FuZCBIZWFwOicsIGJ5dGVzVG9TaXplKHVzYWdlLmhlYXBVc2VkLCAzKSwgJ29mJywgYnl0ZXNUb1NpemUodXNhZ2UuaGVhcFRvdGFsLCAzKSwgJ3RvdGFsJyk7XG4gIH1cblxuICByZXR1cm4gc2VydmVyO1xufVxuXG5mdW5jdGlvbiBwcmludFJvdXRlcyhiYXNlVXJsLCByb3V0ZXMpIHtcbiAgdmFyIFRhYmxlID0gcmVxdWlyZSgnY2xpLXRhYmxlJyk7XG4gIHZhciB0YWJsZSA9IG5ldyBUYWJsZSh7IGhlYWQ6IFtcIlwiLCBcInJlZ2V4XCIsIFwiUGF0aFwiXSB9KTtcbiAgY29uc29sZS5sb2coJ1xcbkFQSSBmb3IgJyArIGJhc2VVcmwpO1xuICBjb25zb2xlLmxvZygnXFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcblxuICByb3V0ZXMuZm9yRWFjaChyb3V0ZSA9PiB7XG4gICAgaWYgKHJvdXRlLm5hbWUgIT09ICdyb3V0ZXInKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcm91dGUuaGFuZGxlLnN0YWNrLmZvckVhY2goc3RhY2sgPT4ge1xuICAgICAgY29uc3QgdmFsID0gc3RhY2sucm91dGU7XG4gICAgICBpZiAoIXZhbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBfbyA9IHt9O1xuICAgICAgX29bdmFsLnN0YWNrWzBdLm1ldGhvZF0gID0gW3JvdXRlLnJlZ2V4cCwgYmFzZVVybCArIHZhbC5wYXRoXTtcbiAgICAgIHRhYmxlLnB1c2goX28pO1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zb2xlLmxvZyh0YWJsZS50b1N0cmluZygpKTtcbn07XG5cbi8vIHZhciB1bml0ID0gWycnLCAnSycsICdNJywgJ0cnLCAnVCcsICdQJ107XG4vLyBmdW5jdGlvbiBieXRlc1RvU2l6ZShpbnB1dCwgcHJlY2lzaW9uKSB7XG4vLyAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLmxvZyhpbnB1dCkgLyBNYXRoLmxvZygxMDI0KSk7XG4vLyAgICAgaWYgKHVuaXQgPj0gdW5pdC5sZW5ndGgpIHtcbi8vICAgICAgIHJldHVybiBpbnB1dCArICcgQic7XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiAoaW5wdXQgLyBNYXRoLnBvdygxMDI0LCBpbmRleCkpLnRvRml4ZWQocHJlY2lzaW9uKSArICcgJyArIHVuaXRbaW5kZXhdICsgJ0InXG4vLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gbWFrZVNlcnZlcjtcbiJdfQ==
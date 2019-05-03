

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _genGKs = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _schema2.default.Gatekeeper.findAll({}).then(function (gkModels) {
              return gkModels.map(function (model) {
                return {
                  id: model.get('id'),
                  name: model.get('name'),
                  rules: JSON.parse(model.get('rules')) || [],
                  userIDWhitelist: JSON.parse(model.get('userIDWhitelist')) || [],
                  userIDBlacklist: JSON.parse(model.get('userIDBlacklist')) || []
                };
              });
            }).catch(function (err) {
              throw err;
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function _genGKs() {
    return ref.apply(this, arguments);
  };
}();

var _genLoad = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3() {
    var _this = this;

    var gks;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //info('Start loading GKs');
            _loading = true;
            _context3.prev = 1;
            _context3.next = 4;
            return _genGKs();

          case 4:
            gks = _context3.sent;


            _gks = {};
            gks.forEach(function (gk) {
              _gks[gk.name] = gk;
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](1);

            error('Error querying GKs ', _context3.t0);

          case 12:

            //info('Done loading GKs: ' + JSON.stringify(_gks, null, 2));
            _loading = false;

            setTimeout((0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _genLoad();

                    case 2:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this);
            })), LOAD_INTERVAL);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[1, 9]]);
  }));
  return function _genLoad() {
    return ref.apply(this, arguments);
  };
}();

var _schema = require('../class/schema');

var _schema2 = _interopRequireDefault(_schema);

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This class defines the gatekeeper that allows us to roll out features partially and control who sees the new features. For now, I will only use it to simply check for user ID. I'm desigining it to be a bit more complex (e.g. handlig multiple rules, multiple rule types) to accomodate potential future use-cases.
 */
var LOAD_INTERVAL = 600000; // refresh every 10 mins

var _loading = false;
var _gks = {};

function _getValFromGKType(field, user) {
  switch (field) {
    case 'id':
      return user.getID();
    default:
      return null;
  }
}

function _evaluate(rule, user) {
  var inputVal = _getValFromGKType(rule.name, user);

  if (inputVal === null) {
    return false;
  }

  var compareVal = rule.value;
  switch (rule.type) {
    case 'includes':
      if (!(compareVal instanceof Array)) {
        return false;
      }
      return compareVal.indexOf(inputVal) !== -1;
  }
  return false;
}

var GK = {
  init: function () {
    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _genLoad();

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function init() {
      return ref.apply(this, arguments);
    }

    return init;
  }(),

  forGKAndUser: function forGKAndUser(name, user) {
    var gk = _gks[name];
    if (!gk) {
      return false;
    }

    if (gk.userIDBlacklist.indexOf(user.getID()) !== -1) {
      return false;
    }
    if (gk.userIDWhitelist.indexOf(user.getID()) !== -1) {
      return true;
    }

    // loop through all the rules and check if any matches
    for (var i = 0; i < gk.rules.length; i++) {
      if (_evaluate(gk.rules[i], user)) {
        return true;
      }
    }
    return false;
  }
};

module.exports = GK;
//# sourceMappingURL=data:application/json;base64,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QkFLSSxJQUxKLEVBS3NCLElBTHRCLEVBSzJDO0FBQ2xELFFBQU0sS0FBSyxLQUFLLElBQUwsQ0FBWDtBQUNBLFFBQUksQ0FBQyxFQUFMLEVBQVM7QUFDUCxhQUFPLEtBQVA7QUFDRDs7QUFFRCxRQUFJLEdBQUcsZUFBSCxDQUFtQixPQUFuQixDQUEyQixLQUFLLEtBQUwsRUFBM0IsTUFBNkMsQ0FBQyxDQUFsRCxFQUFxRDtBQUNuRCxhQUFPLEtBQVA7QUFDRDtBQUNELFFBQUksR0FBRyxlQUFILENBQW1CLE9BQW5CLENBQTJCLEtBQUssS0FBTCxFQUEzQixNQUE2QyxDQUFDLENBQWxELEVBQXFEO0FBQ25ELGFBQU8sSUFBUDtBQUNEOzs7QUFHRCxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksR0FBRyxLQUFILENBQVMsTUFBN0IsRUFBcUMsR0FBckMsRUFBMEM7QUFDeEMsVUFBSSxVQUFVLEdBQUcsS0FBSCxDQUFTLENBQVQsQ0FBVixFQUF1QixJQUF2QixDQUFKLEVBQWtDO0FBQ2hDLGVBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRCxXQUFPLEtBQVA7QUFDRDtBQXpCUSxDQUFYOztBQTRCQSxPQUFPLE9BQVAsR0FBaUIsRUFBakIiLCJmaWxlIjoiR0suanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtb2RlbHMgZnJvbSAnLi4vY2xhc3Mvc2NoZW1hJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHR5cGUge1NlcXVlbGl6ZU1vZGVsfSBmcm9tICcuLi9jbGFzcy9zY2hlbWEnO1xuLypcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyB0aGUgZ2F0ZWtlZXBlciB0aGF0IGFsbG93cyB1cyB0byByb2xsIG91dCBmZWF0dXJlcyBwYXJ0aWFsbHkgYW5kIGNvbnRyb2wgd2hvIHNlZXMgdGhlIG5ldyBmZWF0dXJlcy4gRm9yIG5vdywgSSB3aWxsIG9ubHkgdXNlIGl0IHRvIHNpbXBseSBjaGVjayBmb3IgdXNlciBJRC4gSSdtIGRlc2lnaW5pbmcgaXQgdG8gYmUgYSBiaXQgbW9yZSBjb21wbGV4IChlLmcuIGhhbmRsaWcgbXVsdGlwbGUgcnVsZXMsIG11bHRpcGxlIHJ1bGUgdHlwZXMpIHRvIGFjY29tb2RhdGUgcG90ZW50aWFsIGZ1dHVyZSB1c2UtY2FzZXMuXG4gKi9cbmNvbnN0IExPQURfSU5URVJWQUwgPSA2MDAwMDA7IC8vIHJlZnJlc2ggZXZlcnkgMTAgbWluc1xuXG50eXBlIEdLTmFtZVR5cGUgPSBzdHJpbmc7XG50eXBlIEdLUnVsZUNvbXBhcmlzb25UeXBlID0gJ2luY2x1ZGVzJyB8ICdncmVhdGVyVGhhbicgfCAnbGVzc1RoYW4nO1xudHlwZSBHS1J1bGVGaWVsZFR5cGUgPSAnaWQnO1xudHlwZSBHS0lERmllbGRSdWxlVHlwZSA9IHtcbiAgbmFtZTogJ2lkJyxcbiAgdHlwZTogR0tSdWxlQ29tcGFyaXNvblR5cGUsXG4gIHZhbHVlOiBhbnksXG59O1xudHlwZSBHS1J1bGVUeXBlID0gR0tJREZpZWxkUnVsZVR5cGU7XG50eXBlIEdLVHlwZSA9IHtcbiAgaWQ6IG51bWJlcixcbiAgbmFtZTogR0tOYW1lVHlwZSxcbiAgcnVsZXM6IEFycmF5PEdLUnVsZVR5cGU+LFxuICB1c2VySURXaGl0ZWxpc3Q6IEFycmF5PG51bWJlcj4sXG4gIHVzZXJJREJsYWNrbGlzdDogQXJyYXk8bnVtYmVyPixcbn07XG5cbmxldCBfbG9hZGluZyA9IGZhbHNlO1xubGV0IF9na3M6IHtbbmFtZTpzdHJpbmddOiBHS1R5cGV9ID0ge307XG5cbmFzeW5jIGZ1bmN0aW9uIF9nZW5HS3MoKTogUHJvbWlzZTxBcnJheTxHS1R5cGU+PiB7XG4gIHJldHVybiBtb2RlbHMuR2F0ZWtlZXBlci5maW5kQWxsKHtcbiAgfSkudGhlbigoZ2tNb2RlbHM6IEFycmF5PFNlcXVlbGl6ZU1vZGVsPik6IEFycmF5PEdLVHlwZT4gPT4ge1xuICAgIHJldHVybiBna01vZGVscy5tYXAobW9kZWwgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IG1vZGVsLmdldCgnaWQnKSxcbiAgICAgICAgbmFtZTogbW9kZWwuZ2V0KCduYW1lJyksXG4gICAgICAgIHJ1bGVzOiBKU09OLnBhcnNlKG1vZGVsLmdldCgncnVsZXMnKSkgfHwgW10sXG4gICAgICAgIHVzZXJJRFdoaXRlbGlzdDogSlNPTi5wYXJzZShtb2RlbC5nZXQoJ3VzZXJJRFdoaXRlbGlzdCcpKSB8fCBbXSxcbiAgICAgICAgdXNlcklEQmxhY2tsaXN0OiBKU09OLnBhcnNlKG1vZGVsLmdldCgndXNlcklEQmxhY2tsaXN0JykpIHx8IFtdLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgIHRocm93IGVycjtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9nZW5Mb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAvL2luZm8oJ1N0YXJ0IGxvYWRpbmcgR0tzJyk7XG4gIF9sb2FkaW5nID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBsZXQgZ2tzOiBBcnJheTxHS1R5cGU+ID0gYXdhaXQgX2dlbkdLcygpO1xuXG4gICAgX2drcyA9IHt9O1xuICAgIGdrcy5mb3JFYWNoKChnazogR0tUeXBlKSA9PiB7XG4gICAgICBfZ2tzW2drLm5hbWVdID0gZ2s7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGV4cCkge1xuICAgIGVycm9yKCdFcnJvciBxdWVyeWluZyBHS3MgJywgZXhwKTtcbiAgfVxuXG4gIC8vaW5mbygnRG9uZSBsb2FkaW5nIEdLczogJyArIEpTT04uc3RyaW5naWZ5KF9na3MsIG51bGwsIDIpKTtcbiAgX2xvYWRpbmcgPSBmYWxzZTtcblxuICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBfZ2VuTG9hZCgpO1xuICB9LCBMT0FEX0lOVEVSVkFMKTtcbn1cblxuZnVuY3Rpb24gX2dldFZhbEZyb21HS1R5cGUoZmllbGQ6IEdLUnVsZUZpZWxkVHlwZSwgdXNlcjogVXNlcik6ID9hbnkge1xuICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgY2FzZSAnaWQnOlxuICAgICAgcmV0dXJuIHVzZXIuZ2V0SUQoKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2V2YWx1YXRlKHJ1bGU6IEdLUnVsZVR5cGUsIHVzZXI6IFVzZXIpOiBib29sZWFuIHtcbiAgY29uc3QgaW5wdXRWYWwgPSBfZ2V0VmFsRnJvbUdLVHlwZShydWxlLm5hbWUsIHVzZXIpO1xuXG4gIGlmIChpbnB1dFZhbCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNvbXBhcmVWYWwgPSBydWxlLnZhbHVlO1xuICBzd2l0Y2ggKHJ1bGUudHlwZSkge1xuICAgIGNhc2UgJ2luY2x1ZGVzJzpcbiAgICAgIGlmICghKGNvbXBhcmVWYWwgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbXBhcmVWYWwuaW5kZXhPZihpbnB1dFZhbCkgIT09IC0xO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuY29uc3QgR0sgPSB7XG4gIGluaXQ6IGFzeW5jIGZ1bmN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IF9nZW5Mb2FkKCk7XG4gIH0sXG5cbiAgZm9yR0tBbmRVc2VyKG5hbWU6IEdLTmFtZVR5cGUsIHVzZXI6IFVzZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBnayA9IF9na3NbbmFtZV07XG4gICAgaWYgKCFnaykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChnay51c2VySURCbGFja2xpc3QuaW5kZXhPZih1c2VyLmdldElEKCkpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZ2sudXNlcklEV2hpdGVsaXN0LmluZGV4T2YodXNlci5nZXRJRCgpKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIHJ1bGVzIGFuZCBjaGVjayBpZiBhbnkgbWF0Y2hlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2sucnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChfZXZhbHVhdGUoZ2sucnVsZXNbaV0sIHVzZXIpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdLO1xuIl19
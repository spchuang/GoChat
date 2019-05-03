

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Logging = require('../class/Logging');

var _Logging2 = _interopRequireDefault(_Logging);

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _schema = require('../class/schema');

var _schema2 = _interopRequireDefault(_schema);

var _locks = require('locks');

var _locks2 = _interopRequireDefault(_locks);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// keep logs in a memory and store in db every once in a while.
var tempLogs = [];
var mutex = _locks2.default.createMutex();

var Logger = function () {
  function Logger(user) {
    _classCallCheck(this, Logger);

    this._logged = false;

    this._data = {
      userID: user.getID(),
      userFBID: user.getFBID(),
      userLanguage: user.getLanguage()
    };
  }

  _createClass(Logger, [{
    key: 'setEvent',
    value: function setEvent(val) {
      this._data.event = val;
      return this;
    }
  }, {
    key: 'setTargetID',
    value: function setTargetID(val) {
      this._data.targetID = val;
      return this;
    }
  }, {
    key: 'setTargetClass',
    value: function setTargetClass(val) {
      this._data.targetClass = val;
      return this;
    }
  }, {
    key: 'setExtraData',
    value: function setExtraData(val) {
      this._data.extraData = JSON.stringify(val);
      return this;
    }
  }, {
    key: 'log',
    value: function log() {
      var _this = this;

      (0, _invariant2.default)(!this._logged, 'can only call log once');
      (0, _invariant2.default)(this._data.event !== null, 'logging required fields');

      var time = new Date();
      this._data.createdAt = time;
      this._data.updatedAt = time;

      mutex.lock(function () {
        if (_config2.default.env === 'dev') {
          info(_this._data);
        }
        tempLogs.push(_this._data);
        mutex.unlock();
      });
    }
  }]);

  return Logger;
}();

function saveLoggingToDB(done) {
  mutex.lock(function () {
    var logs = tempLogs;
    tempLogs = [];
    mutex.unlock();

    _schema2.default.Logging.bulkCreate(logs).then(function () {
      info('save ' + logs.length + ' logs');
      done();
    }).catch(function (e) {
      error('Problems saving logs ${logs}', e);
      done();
    });
  });
}

function setUpLoggingJobs() {
  if (_config2.default.test) {
    return;
  }
  saveLoggingToDB(function () {
    // repeat
    setTimeout(setUpLoggingJobs, _config2.default.loggingFlushInterval);
  });
}

module.exports = {
  Logger: Logger,
  setUpLoggingJobs: setUpLoggingJobs
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnaW5nL0xvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7QUFNQSxJQUFJLFdBQXFDLEVBQXpDO0FBQ0EsSUFBSSxRQUFRLGdCQUFNLFdBQU4sRUFBWjs7SUFFTSxNO0FBSUosa0JBQVksSUFBWixFQUE4QjtBQUFBOztBQUFBLFNBSDlCLE9BRzhCLEdBSFgsS0FHVzs7QUFDNUIsU0FBSyxLQUFMLEdBQWE7QUFDWCxjQUFRLEtBQUssS0FBTCxFQURHO0FBRVgsZ0JBQVUsS0FBSyxPQUFMLEVBRkM7QUFHWCxvQkFBYyxLQUFLLFdBQUw7QUFISCxLQUFiO0FBS0Q7Ozs7NkJBRVEsRyxFQUE2QjtBQUNwQyxXQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLEdBQW5CO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OztnQ0FFVyxHLEVBQW1CO0FBQzdCLFdBQUssS0FBTCxDQUFXLFFBQVgsR0FBc0IsR0FBdEI7QUFDQSxhQUFPLElBQVA7QUFDRDs7O21DQUVjLEcsRUFBbUI7QUFDaEMsV0FBSyxLQUFMLENBQVcsV0FBWCxHQUF5QixHQUF6QjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7aUNBRVksRyxFQUFtQjtBQUM5QixXQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBdkI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzBCQUVXO0FBQUE7O0FBQ1YsK0JBQVUsQ0FBQyxLQUFLLE9BQWhCLEVBQXlCLHdCQUF6QjtBQUNBLCtCQUFVLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsSUFBL0IsRUFBcUMseUJBQXJDOztBQUVBLFVBQU0sT0FBTyxJQUFJLElBQUosRUFBYjtBQUNBLFdBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsSUFBdkI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLElBQXZCOztBQUVBLFlBQU0sSUFBTixDQUFXLFlBQU07QUFDZixZQUFJLGlCQUFPLEdBQVAsS0FBZSxLQUFuQixFQUEwQjtBQUN4QixlQUFLLE1BQUssS0FBVjtBQUNEO0FBQ0QsaUJBQVMsSUFBVCxDQUFjLE1BQUssS0FBbkI7QUFDQSxjQUFNLE1BQU47QUFDRCxPQU5EO0FBT0Q7Ozs7OztBQUdILFNBQVMsZUFBVCxDQUF5QixJQUF6QixFQUFpRDtBQUMvQyxRQUFNLElBQU4sQ0FBVyxZQUFNO0FBQ2YsUUFBTSxPQUFPLFFBQWI7QUFDQSxlQUFXLEVBQVg7QUFDQSxVQUFNLE1BQU47O0FBRUEscUJBQU8sT0FBUCxDQUFlLFVBQWYsQ0FBMEIsSUFBMUIsRUFBZ0MsSUFBaEMsQ0FBcUMsWUFBVztBQUM5QyxxQkFBYSxLQUFLLE1BQWxCO0FBQ0E7QUFDRCxLQUhELEVBR0csS0FISCxDQUdTLGFBQUs7QUFDWixZQUFNLDhCQUFOLEVBQXNDLENBQXRDO0FBQ0E7QUFDRCxLQU5EO0FBT0QsR0FaRDtBQWFEOztBQUVELFNBQVMsZ0JBQVQsR0FBa0M7QUFDaEMsTUFBSSxpQkFBTyxJQUFYLEVBQWlCO0FBQ2Y7QUFDRDtBQUNELGtCQUFnQixZQUFNOztBQUVwQixlQUFXLGdCQUFYLEVBQTZCLGlCQUFPLG9CQUFwQztBQUNELEdBSEQ7QUFJRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUI7QUFDZixnQkFEZTtBQUVmO0FBRmUsQ0FBakIiLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTG9nZ2luZyBmcm9tICcuLi9jbGFzcy9Mb2dnaW5nJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IG1vZGVscyBmcm9tICcuLi9jbGFzcy9zY2hlbWEnO1xuaW1wb3J0IGxvY2tzIGZyb20gJ2xvY2tzJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuaW1wb3J0IHR5cGUge0xvZ2dpbmdFdmVudFR5cGV9IGZyb20gJy4vTG9nZ2luZ0VudW1zJztcbmltcG9ydCB0eXBlIHtMb2dnaW5nQXR0cmlidXRlc30gZnJvbSAnLi4vY2xhc3MvYmFzZS9Mb2dnaW5nQmFzZSc7XG5cbi8vIGtlZXAgbG9ncyBpbiBhIG1lbW9yeSBhbmQgc3RvcmUgaW4gZGIgZXZlcnkgb25jZSBpbiBhIHdoaWxlLlxubGV0IHRlbXBMb2dzOiBBcnJheTxMb2dnaW5nQXR0cmlidXRlcz4gPSBbXTtcbmxldCBtdXRleCA9IGxvY2tzLmNyZWF0ZU11dGV4KCk7XG5cbmNsYXNzIExvZ2dlciB7XG4gIF9sb2dnZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2RhdGE6IExvZ2dpbmdBdHRyaWJ1dGVzO1xuXG4gIGNvbnN0cnVjdG9yKHVzZXI6IFVzZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRhID0ge1xuICAgICAgdXNlcklEOiB1c2VyLmdldElEKCksXG4gICAgICB1c2VyRkJJRDogdXNlci5nZXRGQklEKCksXG4gICAgICB1c2VyTGFuZ3VhZ2U6IHVzZXIuZ2V0TGFuZ3VhZ2UoKSxcbiAgICB9O1xuICB9XG5cbiAgc2V0RXZlbnQodmFsOiBMb2dnaW5nRXZlbnRUeXBlKTogdGhpcyB7XG4gICAgdGhpcy5fZGF0YS5ldmVudCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRhcmdldElEKHZhbDogbnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5fZGF0YS50YXJnZXRJRCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRhcmdldENsYXNzKHZhbDogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fZGF0YS50YXJnZXRDbGFzcyA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldEV4dHJhRGF0YSh2YWw6IE9iamVjdCk6IHRoaXMge1xuICAgIHRoaXMuX2RhdGEuZXh0cmFEYXRhID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxvZygpOiB2b2lkIHtcbiAgICBpbnZhcmlhbnQoIXRoaXMuX2xvZ2dlZCwgJ2NhbiBvbmx5IGNhbGwgbG9nIG9uY2UnKTtcbiAgICBpbnZhcmlhbnQodGhpcy5fZGF0YS5ldmVudCAhPT0gbnVsbCwgJ2xvZ2dpbmcgcmVxdWlyZWQgZmllbGRzJyk7XG5cbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLl9kYXRhLmNyZWF0ZWRBdCA9IHRpbWU7XG4gICAgdGhpcy5fZGF0YS51cGRhdGVkQXQgPSB0aW1lO1xuXG4gICAgbXV0ZXgubG9jaygoKSA9PiB7XG4gICAgICBpZiAoY29uZmlnLmVudiA9PT0gJ2RldicpIHtcbiAgICAgICAgaW5mbyh0aGlzLl9kYXRhKTtcbiAgICAgIH1cbiAgICAgIHRlbXBMb2dzLnB1c2godGhpcy5fZGF0YSk7XG4gICAgICBtdXRleC51bmxvY2soKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzYXZlTG9nZ2luZ1RvREIoZG9uZTogKCkgPT4gdm9pZCk6IHZvaWQge1xuICBtdXRleC5sb2NrKCgpID0+IHtcbiAgICBjb25zdCBsb2dzID0gdGVtcExvZ3M7XG4gICAgdGVtcExvZ3MgPSBbXTtcbiAgICBtdXRleC51bmxvY2soKTtcblxuICAgIG1vZGVscy5Mb2dnaW5nLmJ1bGtDcmVhdGUobG9ncykudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGluZm8oYHNhdmUgJHtsb2dzLmxlbmd0aH0gbG9nc2ApO1xuICAgICAgZG9uZSgpO1xuICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgZXJyb3IoJ1Byb2JsZW1zIHNhdmluZyBsb2dzICR7bG9nc30nLCBlKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFVwTG9nZ2luZ0pvYnMoKTogdm9pZCB7XG4gIGlmIChjb25maWcudGVzdCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzYXZlTG9nZ2luZ1RvREIoKCkgPT4ge1xuICAgIC8vIHJlcGVhdFxuICAgIHNldFRpbWVvdXQoc2V0VXBMb2dnaW5nSm9icywgY29uZmlnLmxvZ2dpbmdGbHVzaEludGVydmFsKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBMb2dnZXIsXG4gIHNldFVwTG9nZ2luZ0pvYnMsXG59O1xuIl19
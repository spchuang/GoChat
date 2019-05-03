'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE: make sure to update flow-typed/global and and .eslintrc

// PlayGo root directory
global.APP_ROOT = _path2.default.resolve(__dirname) + '/..';

// logging code
global.info = function (message) {
  if (!_config2.default.logging) {
    return;
  }
  if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
    console.log('[INFO]', JSON.stringify(message, null, 2));
  } else {
    console.log('[INFO]', message);
  }
};

global.error = function (message, error) {
  if (!_config2.default.logging) {
    return;
  }

  if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
    console.log('[ERROR]', JSON.stringify(message, null, 2));

    // if passing Error class to first param.
    if (message && message.name === 'Error') {
      console.log(message.stack);
    }
  } else {
    console.log('[ERROR]', message);
  }

  if (error) {
    console.log(error.stack);
  }
};

global.EXCEPTION = _errors.EXCEPTION;
global.EXCEPTION_MESSAGE = _errors.EXCEPTION_MESSAGE;
global.TypedError = _errors.TypedError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nbG9iYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OztBQUtBLE9BQU8sUUFBUCxHQUFrQixlQUFLLE9BQUwsQ0FBYSxTQUFiLElBQTBCLEtBQTVDOzs7QUFHQSxPQUFPLElBQVAsR0FBYyxVQUFTLE9BQVQsRUFBK0I7QUFDM0MsTUFBSSxDQUFDLGlCQUFPLE9BQVosRUFBcUI7QUFDbkI7QUFDRDtBQUNELE1BQUksUUFBTyxPQUFQLHlDQUFPLE9BQVAsT0FBb0IsUUFBeEIsRUFBa0M7QUFDaEMsWUFBUSxHQUFSLENBQVksUUFBWixFQUFzQixLQUFLLFNBQUwsQ0FBZSxPQUFmLEVBQXdCLElBQXhCLEVBQThCLENBQTlCLENBQXRCO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsWUFBUSxHQUFSLENBQVksUUFBWixFQUFzQixPQUF0QjtBQUNEO0FBQ0YsQ0FURDs7QUFXQSxPQUFPLEtBQVAsR0FBZSxVQUFTLE9BQVQsRUFBeUIsS0FBekIsRUFBOEM7QUFDM0QsTUFBSSxDQUFDLGlCQUFPLE9BQVosRUFBcUI7QUFDbkI7QUFDRDs7QUFFRCxNQUFJLFFBQU8sT0FBUCx5Q0FBTyxPQUFQLE9BQW9CLFFBQXhCLEVBQWtDO0FBQ2hDLFlBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBSyxTQUFMLENBQWUsT0FBZixFQUF3QixJQUF4QixFQUE4QixDQUE5QixDQUF2Qjs7O0FBR0EsUUFBSSxXQUFXLFFBQVEsSUFBUixLQUFpQixPQUFoQyxFQUF5QztBQUN2QyxjQUFRLEdBQVIsQ0FBWSxRQUFRLEtBQXBCO0FBQ0Q7QUFDRixHQVBELE1BT087QUFDTCxZQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE9BQXZCO0FBQ0Q7O0FBRUQsTUFBSSxLQUFKLEVBQVc7QUFDVCxZQUFRLEdBQVIsQ0FBWSxNQUFNLEtBQWxCO0FBQ0Q7QUFDRixDQW5CRDs7QUFxQkEsT0FBTyxTQUFQO0FBQ0EsT0FBTyxpQkFBUDtBQUNBLE9BQU8sVUFBUCIsImZpbGUiOiJnbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHtFWENFUFRJT04sIEVYQ0VQVElPTl9NRVNTQUdFLCBUeXBlZEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8vIE5PVEU6IG1ha2Ugc3VyZSB0byB1cGRhdGUgZmxvdy10eXBlZC9nbG9iYWwgYW5kIGFuZCAuZXNsaW50cmNcblxuLy8gUGxheUdvIHJvb3QgZGlyZWN0b3J5XG5nbG9iYWwuQVBQX1JPT1QgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lKSArICcvLi4nO1xuXG4vLyBsb2dnaW5nIGNvZGVcbmdsb2JhbC5pbmZvID0gZnVuY3Rpb24obWVzc2FnZTogbWl4ZWQpOiB2b2lkIHtcbiAgaWYgKCFjb25maWcubG9nZ2luZykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mKG1lc3NhZ2UpID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnNvbGUubG9nKCdbSU5GT10nLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlLCBudWxsLCAyKSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ1tJTkZPXScsIG1lc3NhZ2UpO1xuICB9XG59XG5cbmdsb2JhbC5lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2U6IG1peGVkLCBlcnJvcjogP0Vycm9yKTogdm9pZCB7XG4gIGlmICghY29uZmlnLmxvZ2dpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZW9mKG1lc3NhZ2UpID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnNvbGUubG9nKCdbRVJST1JdJywgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSwgbnVsbCwgMikpO1xuXG4gICAgLy8gaWYgcGFzc2luZyBFcnJvciBjbGFzcyB0byBmaXJzdCBwYXJhbS5cbiAgICBpZiAobWVzc2FnZSAmJiBtZXNzYWdlLm5hbWUgPT09ICdFcnJvcicpIHtcbiAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2Uuc3RhY2spO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnW0VSUk9SXScsIG1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICB9XG59XG5cbmdsb2JhbC5FWENFUFRJT04gPSBFWENFUFRJT047XG5nbG9iYWwuRVhDRVBUSU9OX01FU1NBR0UgPSBFWENFUFRJT05fTUVTU0FHRTtcbmdsb2JhbC5UeXBlZEVycm9yID0gVHlwZWRFcnJvcjtcbiJdfQ==
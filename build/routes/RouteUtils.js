

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var getUserFromEncryptID = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(id) {
    var userFBID;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userFBID = _EncryptUtils2.default.decrypt(id);

            if (userFBID) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', null);

          case 3:
            _context.next = 5;
            return _User2.default.genByFBID(userFBID);

          case 5:
            return _context.abrupt('return', _context.sent);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function getUserFromEncryptID(_x) {
    return ref.apply(this, arguments);
  };
}();

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

var _EncryptUtils = require('../utils/EncryptUtils');

var _EncryptUtils2 = _interopRequireDefault(_EncryptUtils);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasInternAccess(req) {
  if (_config2.default.env === 'dev') {
    return true;
  }

  if (req.query.token === getAccessToken()) {
    return true;
  }

  return false;
}

function getAccessToken() {
  return 'sam12345';
}

module.exports = {
  getUserFromEncryptID: getUserFromEncryptID,
  hasInternAccess: hasInternAccess,
  getAccessToken: getAccessToken
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvUm91dGVVdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OzZEQU9BLGlCQUFvQyxFQUFwQztBQUFBLFFBQ1EsUUFEUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1Esb0JBRFIsR0FDbUIsdUJBQWEsT0FBYixDQUFxQixFQUFyQixDQURuQjs7QUFBQSxnQkFFTyxRQUZQO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQUdXLElBSFg7O0FBQUE7QUFBQTtBQUFBLG1CQUtlLGVBQUssU0FBTCxDQUFlLFFBQWYsQ0FMZjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7a0JBQWUsb0I7Ozs7O0FBTGY7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFVQSxTQUFTLGVBQVQsQ0FBeUIsR0FBekIsRUFBK0M7QUFDN0MsTUFBSSxpQkFBTyxHQUFQLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsTUFBSSxJQUFJLEtBQUosQ0FBVSxLQUFWLEtBQW9CLGdCQUF4QixFQUEwQztBQUN4QyxXQUFPLElBQVA7QUFDRDs7QUFFRCxTQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFTLGNBQVQsR0FBa0M7QUFDaEMsU0FBTyxVQUFQO0FBQ0Q7O0FBRUQsT0FBTyxPQUFQLEdBQWlCO0FBQ2YsNENBRGU7QUFFZixrQ0FGZTtBQUdmO0FBSGUsQ0FBakIiLCJmaWxlIjoiUm91dGVVdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vY2xhc3MvVXNlcic7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgRW5jcnlwdFV0aWxzIGZyb20gJy4uL3V0aWxzL0VuY3J5cHRVdGlscyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVzZXJGcm9tRW5jcnlwdElEKGlkOiBzdHJpbmcpOiBQcm9taXNlPD9Vc2VyPiB7XG4gIGNvbnN0IHVzZXJGQklEID0gRW5jcnlwdFV0aWxzLmRlY3J5cHQoaWQpO1xuICBpZiAoIXVzZXJGQklEKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGF3YWl0IFVzZXIuZ2VuQnlGQklEKHVzZXJGQklEKTtcbn1cblxuZnVuY3Rpb24gaGFzSW50ZXJuQWNjZXNzKHJlcTogT2JqZWN0KTogYm9vbGVhbiB7XG4gIGlmIChjb25maWcuZW52ID09PSAnZGV2Jykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHJlcS5xdWVyeS50b2tlbiA9PT0gZ2V0QWNjZXNzVG9rZW4oKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRBY2Nlc3NUb2tlbigpOiBzdHJpbmcge1xuICByZXR1cm4gJ3NhbTEyMzQ1Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldFVzZXJGcm9tRW5jcnlwdElELFxuICBoYXNJbnRlcm5BY2Nlc3MsXG4gIGdldEFjY2Vzc1Rva2VuLFxufTtcbiJdfQ==
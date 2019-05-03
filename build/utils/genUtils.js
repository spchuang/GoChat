

'use strict';

var _bluebird = require('bluebird');

var invariant = require('invariant');

module.exports = {
  gen_nullthrows: function () {
    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(gen) {
      var val;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return gen;

            case 2:
              val = _context.sent;

              invariant(val, 'Cannot be null');
              return _context.abrupt('return', val);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function gen_nullthrows(_x) {
      return ref.apply(this, arguments);
    }

    return gen_nullthrows;
  }()
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZW5VdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBRUEsSUFBTSxZQUFZLFFBQVEsV0FBUixDQUFsQjs7QUFFQSxPQUFPLE9BQVAsR0FBaUI7QUFDZjtBQUFBLCtEQUFnQixpQkFBa0IsR0FBbEI7QUFBQSxVQUNSLEdBRFE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ0ksR0FESjs7QUFBQTtBQUNSLGlCQURROztBQUVkLHdCQUFVLEdBQVYsRUFBZSxnQkFBZjtBQUZjLCtDQUdQLEdBSE87O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBaEI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFEZSxDQUFqQiIsImZpbGUiOiJnZW5VdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZW5fbnVsbHRocm93czogYXN5bmMgZnVuY3Rpb248VD4oZ2VuOiBQcm9taXNlPD9UPik6IFByb21pc2U8VD4ge1xuICAgIGNvbnN0IHZhbCA9IGF3YWl0IGdlbjtcbiAgICBpbnZhcmlhbnQodmFsLCAnQ2Fubm90IGJlIG51bGwnKTtcbiAgICByZXR1cm4gdmFsO1xuICB9LFxufTtcbiJdfQ==


'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageHandlerBase = function () {
  function MessageHandlerBase() {
    _classCallCheck(this, MessageHandlerBase);

    // $FlowFixMe: https://github.com/facebook/flow/issues/1152
    if (new.target === MessageHandlerBase) {
      throw new TypeError('Cannot construct MessageHandlerBase instance directly');
    }
  }

  _createClass(MessageHandlerBase, [{
    key: 'getParamObjectFromPostback',
    value: function getParamObjectFromPostback(_) {
      return {};
    }
  }, {
    key: 'getPostBackType',
    value: function getPostBackType() {
      return null;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user, _) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new TypeError('Must override genHandle');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genHandle(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return genHandle;
    }()
  }]);

  return MessageHandlerBase;
}();

module.exports = MessageHandlerBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zZS9NZXNzYWdlSGFuZGxlckJhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7QUFHQTs7Ozs7Ozs7SUFFTSxrQjtBQUNKLGdDQUFjO0FBQUE7OztBQUVaLFFBQUksSUFBSSxNQUFKLEtBQWUsa0JBQW5CLEVBQXVDO0FBQ3JDLFlBQU0sSUFBSSxTQUFKLENBQWMsdURBQWQsQ0FBTjtBQUNEO0FBQ0Y7Ozs7K0NBRTBCLEMsRUFBMEI7QUFDbkQsYUFBTyxFQUFQO0FBQ0Q7OztzQ0FFMEI7QUFDekIsYUFBTyxJQUFQO0FBQ0Q7Ozs7a0ZBRWUsSSxFQUFZLEM7Ozs7O3NCQUNwQixJQUFJLFNBQUosQ0FBYyx5QkFBZCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJVixPQUFPLE9BQVAsR0FBaUIsa0JBQWpCIiwiZmlsZSI6Ik1lc3NhZ2VIYW5kbGVyQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vY2xhc3MvVXNlcic7XG5cbmNsYXNzIE1lc3NhZ2VIYW5kbGVyQmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vICRGbG93Rml4TWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xMTUyXG4gICAgaWYgKG5ldy50YXJnZXQgPT09IE1lc3NhZ2VIYW5kbGVyQmFzZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnN0cnVjdCBNZXNzYWdlSGFuZGxlckJhc2UgaW5zdGFuY2UgZGlyZWN0bHknKTtcbiAgICB9XG4gIH1cblxuICBnZXRQYXJhbU9iamVjdEZyb21Qb3N0YmFjayhfOiBBcnJheTxzdHJpbmc+KTogT2JqZWN0IHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBnZXRQb3N0QmFja1R5cGUoKTogP3N0cmluZyB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhc3luYyBnZW5IYW5kbGUodXNlcjogVXNlciwgXzogT2JqZWN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBvdmVycmlkZSBnZW5IYW5kbGUnKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lc3NhZ2VIYW5kbGVyQmFzZTtcbiJdfQ==
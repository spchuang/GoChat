

'use strict';

var _GK = require('./GK');

var _GK2 = _interopRequireDefault(_GK);

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoGating = {
  useNewCreateFlow: function useNewCreateFlow(user) {
    return _GK2.default.forGKAndUser('new_create_game_flow', user);
  },
  canPlayWithAI: function canPlayWithAI(user) {
    return _GK2.default.forGKAndUser('play_with_ai', user);
  }
};

module.exports = GoGating;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Hb0dhdGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sV0FBVztBQUNmLG9CQUFrQiwwQkFBQyxJQUFELEVBQXlCO0FBQ3pDLFdBQU8sYUFBRyxZQUFILENBQWdCLHNCQUFoQixFQUF3QyxJQUF4QyxDQUFQO0FBQ0QsR0FIYztBQUlmLGlCQUFlLHVCQUFDLElBQUQsRUFBeUI7QUFDdEMsV0FBTyxhQUFHLFlBQUgsQ0FBZ0IsY0FBaEIsRUFBZ0MsSUFBaEMsQ0FBUDtBQUNEO0FBTmMsQ0FBakI7O0FBU0EsT0FBTyxPQUFQLEdBQWlCLFFBQWpCIiwiZmlsZSI6IkdvR2F0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgR0sgZnJvbSAnLi9HSyc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzcy9Vc2VyJztcblxuY29uc3QgR29HYXRpbmcgPSB7XG4gIHVzZU5ld0NyZWF0ZUZsb3c6ICh1c2VyOiBVc2VyKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIEdLLmZvckdLQW5kVXNlcignbmV3X2NyZWF0ZV9nYW1lX2Zsb3cnLCB1c2VyKTtcbiAgfSxcbiAgY2FuUGxheVdpdGhBSTogKHVzZXI6IFVzZXIpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gR0suZm9yR0tBbmRVc2VyKCdwbGF5X3dpdGhfYWknLCB1c2VyKTtcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR29HYXRpbmc7XG4iXX0=
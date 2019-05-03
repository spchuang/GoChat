'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var genGameInfo = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(userID, language, game) {
    var _ref, _ref2, sgf, opponentUser, opponentName;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bluebird2.default.all([game.genSGF(), game.genOpponentUser(userID)]);

          case 2:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 2);
            sgf = _ref2[0];
            opponentUser = _ref2[1];
            opponentName = opponentUser.getID() === userID ? (0, _Translator.got)('inGameMessage.self', language) : opponentUser.getFirstName();
            return _context.abrupt('return', {
              sgf: sgf,
              opponentName: opponentName,
              move: game.getStonesHistory().length,
              id: game.getID(),
              komi: game.getKomi()
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function genGameInfo(_x, _x2, _x3) {
    return ref.apply(this, arguments);
  };
}();

var _Translator = require('../translations/Translator');

var _Game = require('../class/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  genGameInfo: genGameInfo
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9HYW1lVXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OzZEQU1BLGlCQUEyQixNQUEzQixFQUEyQyxRQUEzQyxFQUE2RCxJQUE3RDtBQUFBLHFCQUNTLEdBRFQsRUFDYyxZQURkLEVBS1EsWUFMUjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ29DLG1CQUFRLEdBQVIsQ0FBWSxDQUM1QyxLQUFLLE1BQUwsRUFENEMsRUFFNUMsS0FBSyxlQUFMLENBQXFCLE1BQXJCLENBRjRDLENBQVosQ0FEcEM7O0FBQUE7QUFBQTtBQUFBO0FBQ1MsZUFEVDtBQUNjLHdCQURkO0FBS1Esd0JBTFIsR0FLdUIsYUFBYSxLQUFiLE9BQXlCLE1BQXpCLEdBQ2pCLHFCQUFJLG9CQUFKLEVBQTBCLFFBQTFCLENBRGlCLEdBRWpCLGFBQWEsWUFBYixFQVBOO0FBQUEsNkNBU1M7QUFDTCxzQkFESztBQUVMLHdDQUZLO0FBR0wsb0JBQU0sS0FBSyxnQkFBTCxHQUF3QixNQUh6QjtBQUlMLGtCQUFJLEtBQUssS0FBTCxFQUpDO0FBS0wsb0JBQU0sS0FBSyxPQUFMO0FBTEQsYUFUVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHO2tCQUFlLFc7Ozs7O0FBSmY7O0FBRUE7Ozs7OztBQW9CQSxPQUFPLE9BQVAsR0FBaUI7QUFDZjtBQURlLENBQWpCIiwiZmlsZSI6IkdhbWVVdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCB7Z290fSBmcm9tICcuLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRvcic7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgR29HYW1lIGZyb20gJy4uL2NsYXNzL0dhbWUnO1xuXG5hc3luYyBmdW5jdGlvbiBnZW5HYW1lSW5mbyh1c2VySUQ6IG51bWJlciwgbGFuZ3VhZ2U6IHN0cmluZywgZ2FtZTogR29HYW1lKTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgY29uc3QgW3NnZiwgb3Bwb25lbnRVc2VyXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBnYW1lLmdlblNHRigpLFxuICAgIGdhbWUuZ2VuT3Bwb25lbnRVc2VyKHVzZXJJRClcbiAgXSlcbiAgY29uc3Qgb3Bwb25lbnROYW1lID0gb3Bwb25lbnRVc2VyLmdldElEKCkgPT09IHVzZXJJRFxuICAgID8gZ290KCdpbkdhbWVNZXNzYWdlLnNlbGYnLCBsYW5ndWFnZSlcbiAgICA6IG9wcG9uZW50VXNlci5nZXRGaXJzdE5hbWUoKTtcblxuICByZXR1cm4ge1xuICAgIHNnZixcbiAgICBvcHBvbmVudE5hbWUsXG4gICAgbW92ZTogZ2FtZS5nZXRTdG9uZXNIaXN0b3J5KCkubGVuZ3RoLFxuICAgIGlkOiBnYW1lLmdldElEKCksXG4gICAga29taTogZ2FtZS5nZXRLb21pKCksXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZW5HYW1lSW5mbyxcbn07XG4iXX0=
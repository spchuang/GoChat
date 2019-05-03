

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MessageHandlerBase2 = require('../MessageHandlerBase');

var _MessageHandlerBase3 = _interopRequireDefault(_MessageHandlerBase2);

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _User = require('../../class/User');

var _User2 = _interopRequireDefault(_User);

var _Game = require('../../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _PostBackUtils = require('../PostBackUtils');

var _TranslationConstants = require('../../translations/TranslationConstants');

var _S3Utils = require('../../utils/S3Utils');

var _S3Utils2 = _interopRequireDefault(_S3Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowCurrentGameStatusHandler = function (_MessageHandlerBase) {
  _inherits(ShowCurrentGameStatusHandler, _MessageHandlerBase);

  function ShowCurrentGameStatusHandler() {
    _classCallCheck(this, ShowCurrentGameStatusHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ShowCurrentGameStatusHandler).apply(this, arguments));
  }

  _createClass(ShowCurrentGameStatusHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.DOWNLOAD_SGF;
    }
  }, {
    key: 'getParamObjectFromPostback',
    value: function getParamObjectFromPostback(paramsArray) {
      return {
        gameID: parseInt(paramsArray[0], 10)
      };
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user, params) {
        var game, _ref, _ref2, sgf, opponentUser, fileName, url;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Game2.default.genEnforce(params.gameID);

              case 2:
                game = _context.sent;

                if (game) {
                  _context.next = 6;
                  break;
                }

                _fbLocalChatBot2.default.sendText(user.getFBID(), 'Game doesn\'t exists');
                return _context.abrupt('return');

              case 6:
                _context.next = 8;
                return _bluebird2.default.all([game.genSGF(), game.genOpponentUser(user.getID())]);

              case 8:
                _ref = _context.sent;
                _ref2 = _slicedToArray(_ref, 2);
                sgf = _ref2[0];
                opponentUser = _ref2[1];
                fileName = 'game-' + game.getID() + '-' + user.getFirstName() + '-' + opponentUser.getFirstName() + '.sgf';
                _context.next = 15;
                return _S3Utils2.default.genUploadBuffer(new Buffer(sgf), fileName, 'text/plain');

              case 15:
                url = _context.sent;


                _fbLocalChatBot2.default.sendFile(user.getFBID(), url);

              case 17:
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

  return ShowCurrentGameStatusHandler;
}(_MessageHandlerBase3.default);

module.exports = new ShowCurrentGameStatusHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL0Rvd25sb2FkR2FtZVNHRkhhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQU1NLDRCOzs7Ozs7Ozs7OztzQ0FDc0I7QUFDeEIsYUFBTyw2QkFBYyxZQUFyQjtBQUNEOzs7K0NBRTBCLFcsRUFBb0M7QUFDN0QsYUFBTztBQUNMLGdCQUFRLFNBQVMsWUFBWSxDQUFaLENBQVQsRUFBeUIsRUFBekI7QUFESCxPQUFQO0FBR0Q7Ozs7a0ZBRWUsSSxFQUFZLE07WUFDcEIsSSxlQU1DLEcsRUFBSyxZLEVBS04sUSxFQUNBLEc7Ozs7Ozs7dUJBWmEsZUFBTyxVQUFQLENBQWtCLE9BQU8sTUFBekIsQzs7O0FBQWIsb0I7O29CQUNELEk7Ozs7O0FBQ0gseUNBQUksUUFBSixDQUFhLEtBQUssT0FBTCxFQUFiLEVBQTZCLHNCQUE3Qjs7Ozs7dUJBSWdDLG1CQUFRLEdBQVIsQ0FBWSxDQUM1QyxLQUFLLE1BQUwsRUFENEMsRUFFNUMsS0FBSyxlQUFMLENBQXFCLEtBQUssS0FBTCxFQUFyQixDQUY0QyxDQUFaLEM7Ozs7O0FBQTNCLG1CO0FBQUssNEI7QUFLTix3QixhQUFtQixLQUFLLEtBQUwsRSxTQUFnQixLQUFLLFlBQUwsRSxTQUF1QixhQUFhLFlBQWIsRTs7dUJBQzlDLGtCQUFRLGVBQVIsQ0FBd0IsSUFBSSxNQUFKLENBQVcsR0FBWCxDQUF4QixFQUF5QyxRQUF6QyxFQUFtRCxZQUFuRCxDOzs7QUFBWixtQjs7O0FBRU4seUNBQUksUUFBSixDQUFhLEtBQUssT0FBTCxFQUFiLEVBQTZCLEdBQTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJSixPQUFPLE9BQVAsR0FBaUIsSUFBSSw0QkFBSixFQUFqQiIsImZpbGUiOiJEb3dubG9hZEdhbWVTR0ZIYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWVzc2FnZUhhbmRsZXJCYXNlIGZyb20gJy4uL01lc3NhZ2VIYW5kbGVyQmFzZSc7XG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCBVc2VyIGZyb20gJy4uLy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IEdvR2FtZSBmcm9tICcuLi8uLi9jbGFzcy9HYW1lJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7UG9zdEJhY2tUeXBlc30gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge0xBTkdVQUdFX1RPX05BTUVfTUFQfSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRpb25Db25zdGFudHMnO1xuaW1wb3J0IFMzVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvUzNVdGlscyc7XG5cbnR5cGUgUGFyYW1zID0ge1xuICBnYW1lSUQ6IG51bWJlcjtcbn07XG5cbmNsYXNzIFNob3dDdXJyZW50R2FtZVN0YXR1c0hhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBnZXRQb3N0QmFja1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUG9zdEJhY2tUeXBlcy5ET1dOTE9BRF9TR0Y7XG4gIH1cblxuICBnZXRQYXJhbU9iamVjdEZyb21Qb3N0YmFjayhwYXJhbXNBcnJheTogQXJyYXk8c3RyaW5nPik6IFBhcmFtcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdhbWVJRDogcGFyc2VJbnQocGFyYW1zQXJyYXlbMF0sIDEwKSxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIsIHBhcmFtczogUGFyYW1zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZ2FtZSA9IGF3YWl0IEdvR2FtZS5nZW5FbmZvcmNlKHBhcmFtcy5nYW1lSUQpXG4gICAgaWYgKCFnYW1lKSB7XG4gICAgICBCb3Quc2VuZFRleHQodXNlci5nZXRGQklEKCksICdHYW1lIGRvZXNuXFwndCBleGlzdHMnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBbc2dmLCBvcHBvbmVudFVzZXJdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZ2FtZS5nZW5TR0YoKSxcbiAgICAgIGdhbWUuZ2VuT3Bwb25lbnRVc2VyKHVzZXIuZ2V0SUQoKSksXG4gICAgXSk7XG5cbiAgICBjb25zdCBmaWxlTmFtZSA9IGBnYW1lLSR7Z2FtZS5nZXRJRCgpfS0ke3VzZXIuZ2V0Rmlyc3ROYW1lKCl9LSR7b3Bwb25lbnRVc2VyLmdldEZpcnN0TmFtZSgpfS5zZ2ZgO1xuICAgIGNvbnN0IHVybCA9IGF3YWl0IFMzVXRpbHMuZ2VuVXBsb2FkQnVmZmVyKG5ldyBCdWZmZXIoc2dmKSwgZmlsZU5hbWUsICd0ZXh0L3BsYWluJyk7XG5cbiAgICBCb3Quc2VuZEZpbGUodXNlci5nZXRGQklEKCksIHVybCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2hvd0N1cnJlbnRHYW1lU3RhdHVzSGFuZGxlcigpO1xuIl19
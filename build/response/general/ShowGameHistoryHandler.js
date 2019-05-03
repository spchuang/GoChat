

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

var _EncryptUtils = require('../../utils/EncryptUtils');

var _EncryptUtils2 = _interopRequireDefault(_EncryptUtils);

var _Translator = require('../../translations/Translator');

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getDate(date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
}

var ShowGameHistoryHandler = function (_MessageHandlerBase) {
  _inherits(ShowGameHistoryHandler, _MessageHandlerBase);

  function ShowGameHistoryHandler() {
    _classCallCheck(this, ShowGameHistoryHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ShowGameHistoryHandler).apply(this, arguments));
  }

  _createClass(ShowGameHistoryHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SHOW_GAME_HISTORY;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user) {
        var games, encryptID, language, elementsGen, _loop, i, elements;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Game2.default.genFinishedGamesForUser(user);

              case 2:
                games = _context2.sent;

                games = games.slice(0, 10); // FB limit to 10 elements

                encryptID = _EncryptUtils2.default.encrypt(user.getFBID());
                language = user.getLanguage();
                elementsGen = [];

                _loop = function _loop(i) {
                  var gen = function () {
                    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
                      var game, gameID, _ref, _ref2, boardURL, opponent, opponentName;

                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              game = games[i];
                              gameID = game.getID();
                              _context.next = 4;
                              return _bluebird2.default.all([game.genMiniGameImageURL(), game.genOpponentUser(user.getID())]);

                            case 4:
                              _ref = _context.sent;
                              _ref2 = _slicedToArray(_ref, 2);
                              boardURL = _ref2[0];
                              opponent = _ref2[1];
                              opponentName = game.isSelfPlayingGame() ? (0, _Translator.got)('inGameMessage.self', user.getLanguage()) : opponent.getFirstName();
                              return _context.abrupt('return', _fbLocalChatBot2.default.createGenericTemplateElement((0, _Translator.got)('inGameMessage.activeGameElementTitle', language, { opponentName: opponentName }), null, null, boardURL, getDate(game.getUpdatedAt()), [(0, _PostBackUtils.getBoardURLButton)((0, _Translator.got)('button.replayGame', language), _querystring2.default.stringify({ u: encryptID, gameID: gameID })), (0, _PostBackUtils.createPostbackButton)((0, _Translator.got)('button.downloadSGF', language), _PostBackUtils.PostBackTypes.DOWNLOAD_SGF, [gameID])]));

                            case 10:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee, this);
                    }));
                    return function gen() {
                      return ref.apply(this, arguments);
                    };
                  }();
                  elementsGen.push(gen());
                };

                for (i = 0; i < games.length; i++) {
                  _loop(i);
                }
                _context2.next = 11;
                return _bluebird2.default.all(elementsGen);

              case 11:
                elements = _context2.sent;

                _fbLocalChatBot2.default.sendGenericTemplate(user.getFBID(), elements);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genHandle(_x) {
        return ref.apply(this, arguments);
      }

      return genHandle;
    }()
  }]);

  return ShowGameHistoryHandler;
}(_MessageHandlerBase3.default);

module.exports = new ShowGameHistoryHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL1Nob3dHYW1lSGlzdG9yeUhhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsU0FBUyxPQUFULENBQWlCLElBQWpCLEVBQXFDO0FBQ25DLE1BQUksS0FBSyxLQUFLLFFBQUwsS0FBa0IsQ0FBM0IsQztBQUNBLE1BQUksS0FBSyxLQUFLLE9BQUwsRUFBVDs7QUFFQSxTQUFPLENBQUMsS0FBSyxXQUFMLEVBQUQsRUFDQyxDQUFDLEtBQUcsQ0FBSCxHQUFPLEVBQVAsR0FBWSxHQUFiLElBQW9CLEVBRHJCLEVBRUMsQ0FBQyxLQUFHLENBQUgsR0FBTyxFQUFQLEdBQVksR0FBYixJQUFvQixFQUZyQixFQUdDLElBSEQsQ0FHTSxHQUhOLENBQVA7QUFJRDs7SUFFSyxzQjs7Ozs7Ozs7Ozs7c0NBQ3NCO0FBQ3hCLGFBQU8sNkJBQWMsaUJBQXJCO0FBQ0Q7Ozs7bUZBRWUsSTtZQUVWLEssRUFHRSxTLEVBRUEsUSxFQUNBLFcsU0FDRSxDLEVBMkJGLFE7Ozs7Ozs7dUJBbENZLGVBQU8sdUJBQVAsQ0FBK0IsSUFBL0IsQzs7O0FBQWQscUI7O0FBQ0osd0JBQVEsTUFBTSxLQUFOLENBQVksQ0FBWixFQUFlLEVBQWYsQ0FBUixDOztBQUVNLHlCLEdBQVksdUJBQWEsT0FBYixDQUFxQixLQUFLLE9BQUwsRUFBckIsQztBQUVaLHdCLEdBQVcsS0FBSyxXQUFMLEU7QUFDWCwyQixHQUFjLEU7O3VDQUNaLEM7QUFDTixzQkFBTTtBQUFBLCtFQUFNO0FBQUEsMEJBQ0osSUFESSxFQUVKLE1BRkksZUFHSCxRQUhHLEVBR08sUUFIUCxFQVFKLFlBUkk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDSixrQ0FESSxHQUNHLE1BQU0sQ0FBTixDQURIO0FBRUosb0NBRkksR0FFSyxLQUFLLEtBQUwsRUFGTDtBQUFBO0FBQUEscUNBR3lCLG1CQUFRLEdBQVIsQ0FBWSxDQUM3QyxLQUFLLG1CQUFMLEVBRDZDLEVBRTdDLEtBQUssZUFBTCxDQUFxQixLQUFLLEtBQUwsRUFBckIsQ0FGNkMsQ0FBWixDQUh6Qjs7QUFBQTtBQUFBO0FBQUE7QUFHSCxzQ0FIRztBQUdPLHNDQUhQO0FBUUosMENBUkksR0FRVyxLQUFLLGlCQUFMLEtBQ2pCLHFCQUFJLG9CQUFKLEVBQTBCLEtBQUssV0FBTCxFQUExQixDQURpQixHQUVqQixTQUFTLFlBQVQsRUFWTTtBQUFBLCtEQVlILHlCQUFJLDRCQUFKLENBQ0wscUJBQUksc0NBQUosRUFBNEMsUUFBNUMsRUFBc0QsRUFBQywwQkFBRCxFQUF0RCxDQURLLEVBRUwsSUFGSyxFQUdMLElBSEssRUFJTCxRQUpLLEVBS0wsUUFBUSxLQUFLLFlBQUwsRUFBUixDQUxLLEVBTUwsQ0FDRSxzQ0FBa0IscUJBQUksbUJBQUosRUFBeUIsUUFBekIsQ0FBbEIsRUFBc0Qsc0JBQVksU0FBWixDQUFzQixFQUFDLEdBQUcsU0FBSixFQUFlLFFBQVEsTUFBdkIsRUFBdEIsQ0FBdEQsQ0FERixFQUVFLHlDQUFxQixxQkFBSSxvQkFBSixFQUEwQixRQUExQixDQUFyQixFQUEwRCw2QkFBYyxZQUF4RSxFQUFzRixDQUFDLE1BQUQsQ0FBdEYsQ0FGRixDQU5LLENBWkc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBTjtBQXdCQSw4QkFBWSxJQUFaLENBQWlCLEtBQWpCOzs7QUF6QkYscUJBQVEsQ0FBUixHQUFZLENBQVosRUFBZSxJQUFJLE1BQU0sTUFBekIsRUFBaUMsR0FBakMsRUFBc0M7QUFBQSx3QkFBOUIsQ0FBOEI7QUEwQnJDOzt1QkFDc0IsbUJBQVEsR0FBUixDQUFZLFdBQVosQzs7O0FBQWpCLHdCOztBQUNOLHlDQUFJLG1CQUFKLENBQ0UsS0FBSyxPQUFMLEVBREYsRUFFRSxRQUZGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPSixPQUFPLE9BQVAsR0FBaUIsSUFBSSxzQkFBSixFQUFqQiIsImZpbGUiOiJTaG93R2FtZUhpc3RvcnlIYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWVzc2FnZUhhbmRsZXJCYXNlIGZyb20gJy4uL01lc3NhZ2VIYW5kbGVyQmFzZSc7XG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCBVc2VyIGZyb20gJy4uLy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IEdvR2FtZSBmcm9tICcuLi8uLi9jbGFzcy9HYW1lJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7UG9zdEJhY2tUeXBlcywgZ2V0Qm9hcmRVUkxCdXR0b24sIGNyZWF0ZVBvc3RiYWNrQnV0dG9ufSBmcm9tICcuLi9Qb3N0QmFja1V0aWxzJztcbmltcG9ydCB7TEFOR1VBR0VfVE9fTkFNRV9NQVB9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdGlvbkNvbnN0YW50cyc7XG5pbXBvcnQgRW5jcnlwdFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL0VuY3J5cHRVdGlscyc7XG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcblxuZnVuY3Rpb24gZ2V0RGF0ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgdmFyIG1tID0gZGF0ZS5nZXRNb250aCgpICsgMTsgLy8gZ2V0TW9udGgoKSBpcyB6ZXJvLWJhc2VkXG4gIHZhciBkZCA9IGRhdGUuZ2V0RGF0ZSgpO1xuXG4gIHJldHVybiBbZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgIChtbT45ID8gJycgOiAnMCcpICsgbW0sXG4gICAgICAgICAgKGRkPjkgPyAnJyA6ICcwJykgKyBkZFxuICAgICAgICBdLmpvaW4oJy0nKTtcbn1cblxuY2xhc3MgU2hvd0dhbWVIaXN0b3J5SGFuZGxlciBleHRlbmRzIE1lc3NhZ2VIYW5kbGVyQmFzZSB7XG4gIGdldFBvc3RCYWNrVHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBQb3N0QmFja1R5cGVzLlNIT1dfR0FNRV9ISVNUT1JZO1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgIGxldCBnYW1lcyA9IGF3YWl0IEdvR2FtZS5nZW5GaW5pc2hlZEdhbWVzRm9yVXNlcih1c2VyKTtcbiAgICBnYW1lcyA9IGdhbWVzLnNsaWNlKDAsIDEwKTsgLy8gRkIgbGltaXQgdG8gMTAgZWxlbWVudHNcblxuICAgIGNvbnN0IGVuY3J5cHRJRCA9IEVuY3J5cHRVdGlscy5lbmNyeXB0KHVzZXIuZ2V0RkJJRCgpKTtcblxuICAgIGNvbnN0IGxhbmd1YWdlID0gdXNlci5nZXRMYW5ndWFnZSgpO1xuICAgIGNvbnN0IGVsZW1lbnRzR2VuID0gW107XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBnZW4gPSBhc3luYyBmdW5jdGlvbigpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgICAgICBjb25zdCBnYW1lID0gZ2FtZXNbaV07XG4gICAgICAgIGNvbnN0IGdhbWVJRCA9IGdhbWUuZ2V0SUQoKTtcbiAgICAgICAgY29uc3QgW2JvYXJkVVJMLCBvcHBvbmVudF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgZ2FtZS5nZW5NaW5pR2FtZUltYWdlVVJMKCksXG4gICAgICAgICAgZ2FtZS5nZW5PcHBvbmVudFVzZXIodXNlci5nZXRJRCgpKSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3Qgb3Bwb25lbnROYW1lID0gZ2FtZS5pc1NlbGZQbGF5aW5nR2FtZSgpXG4gICAgICAgICAgPyBnb3QoJ2luR2FtZU1lc3NhZ2Uuc2VsZicsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSlcbiAgICAgICAgICA6IG9wcG9uZW50LmdldEZpcnN0TmFtZSgpO1xuXG4gICAgICAgIHJldHVybiBCb3QuY3JlYXRlR2VuZXJpY1RlbXBsYXRlRWxlbWVudChcbiAgICAgICAgICBnb3QoJ2luR2FtZU1lc3NhZ2UuYWN0aXZlR2FtZUVsZW1lbnRUaXRsZScsIGxhbmd1YWdlLCB7b3Bwb25lbnROYW1lfSksXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIGJvYXJkVVJMLFxuICAgICAgICAgIGdldERhdGUoZ2FtZS5nZXRVcGRhdGVkQXQoKSksXG4gICAgICAgICAgW1xuICAgICAgICAgICAgZ2V0Qm9hcmRVUkxCdXR0b24oZ290KCdidXR0b24ucmVwbGF5R2FtZScsIGxhbmd1YWdlKSwgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHt1OiBlbmNyeXB0SUQsIGdhbWVJRDogZ2FtZUlEfSkpLFxuICAgICAgICAgICAgY3JlYXRlUG9zdGJhY2tCdXR0b24oZ290KCdidXR0b24uZG93bmxvYWRTR0YnLCBsYW5ndWFnZSksIFBvc3RCYWNrVHlwZXMuRE9XTkxPQURfU0dGLCBbZ2FtZUlEXSksXG4gICAgICAgICAgXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZWxlbWVudHNHZW4ucHVzaChnZW4oKSk7XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZWxlbWVudHNHZW4pO1xuICAgIEJvdC5zZW5kR2VuZXJpY1RlbXBsYXRlKFxuICAgICAgdXNlci5nZXRGQklEKCksXG4gICAgICBlbGVtZW50cyxcbiAgICApO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNob3dHYW1lSGlzdG9yeUhhbmRsZXIoKTtcbiJdfQ==
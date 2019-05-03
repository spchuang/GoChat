

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

var _Translator = require('../../translations/Translator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowActiveGamesHandler = function (_MessageHandlerBase) {
  _inherits(ShowActiveGamesHandler, _MessageHandlerBase);

  function ShowActiveGamesHandler() {
    _classCallCheck(this, ShowActiveGamesHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ShowActiveGamesHandler).apply(this, arguments));
  }

  _createClass(ShowActiveGamesHandler, [{
    key: 'getPostBackType',
    value: function getPostBackType() {
      return _PostBackUtils.PostBackTypes.SHOW_ACTIVE_GAMES;
    }
  }, {
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user) {
        var activeGames, language, elementsGen, _loop, i, elements;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (user.isPlaying()) {
                  _context2.next = 3;
                  break;
                }

                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('normalMessage.youAreNotPlayingAnyGame', user.getLanguage()));
                return _context2.abrupt('return');

              case 3:
                _context2.next = 5;
                return _Game2.default.genActiveGamesForUser(user);

              case 5:
                activeGames = _context2.sent;

                activeGames = activeGames.slice(0, 10); // FB limit to 10 elements
                language = user.getLanguage();
                elementsGen = [];

                _loop = function _loop(i) {
                  var gen = function () {
                    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
                      var game, gameID, _ref, _ref2, boardURL, opponent, opponentName, focusedMark;

                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              game = activeGames[i];
                              gameID = game.getID();
                              _context.next = 4;
                              return _bluebird2.default.all([game.genMiniGameImageURL(), game.genOpponentUser(user.getID())]);

                            case 4:
                              _ref = _context.sent;
                              _ref2 = _slicedToArray(_ref, 2);
                              boardURL = _ref2[0];
                              opponent = _ref2[1];
                              opponentName = game.isSelfPlayingGame() ? (0, _Translator.got)('inGameMessage.self', user.getLanguage()) : opponent.getFirstName();
                              focusedMark = gameID === user.getCurrentGameID() ? ' 👈 👈 🤔' : '';
                              return _context.abrupt('return', _fbLocalChatBot2.default.createGenericTemplateElement((0, _Translator.got)('inGameMessage.activeGameElementTitle', language, { opponentName: opponentName }) + focusedMark, null, null, boardURL, null, [(0, _PostBackUtils.createPostbackButton)((0, _Translator.got)('button.focusOnGame', language), _PostBackUtils.PostBackTypes.FOCUS_ON_GAME, [gameID]), (0, _PostBackUtils.createPostbackButton)((0, _Translator.got)('button.showBoard', language), _PostBackUtils.PostBackTypes.SHOW_CURRENT_GAME_STATUS, [gameID]), (0, _PostBackUtils.createPostbackButton)((0, _Translator.got)('button.resignGame', language), _PostBackUtils.PostBackTypes.RESIGN_GAME, [gameID])]));

                            case 11:
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

                for (i = 0; i < activeGames.length; i++) {
                  _loop(i);
                }
                _context2.next = 13;
                return _bluebird2.default.all(elementsGen);

              case 13:
                elements = _context2.sent;

                _fbLocalChatBot2.default.sendGenericTemplate(user.getFBID(), elements);

              case 15:
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

  return ShowActiveGamesHandler;
}(_MessageHandlerBase3.default);

module.exports = new ShowActiveGamesHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL1Nob3dBY3RpdmVHYW1lc0hhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFTSxzQjs7Ozs7Ozs7Ozs7c0NBQ3NCO0FBQ3hCLGFBQU8sNkJBQWMsaUJBQXJCO0FBQ0Q7Ozs7bUZBRWUsSTtZQU1WLFcsRUFFRSxRLEVBRUEsVyxTQUNFLEMsRUErQkYsUTs7Ozs7O29CQXpDRCxLQUFLLFNBQUwsRTs7Ozs7QUFDSCx5Q0FBSSxRQUFKLENBQWEsS0FBSyxPQUFMLEVBQWIsRUFBNkIscUJBQUksdUNBQUosRUFBNkMsS0FBSyxXQUFMLEVBQTdDLENBQTdCOzs7Ozt1QkFJc0IsZUFBTyxxQkFBUCxDQUE2QixJQUE3QixDOzs7QUFBcEIsMkI7O0FBQ0osOEJBQWMsWUFBWSxLQUFaLENBQWtCLENBQWxCLEVBQXFCLEVBQXJCLENBQWQsQztBQUNNLHdCLEdBQVcsS0FBSyxXQUFMLEU7QUFFWCwyQixHQUFjLEU7O3VDQUNaLEM7QUFDTixzQkFBTTtBQUFBLCtFQUFNO0FBQUEsMEJBQ0osSUFESSxFQUVKLE1BRkksZUFHSCxRQUhHLEVBR08sUUFIUCxFQVFKLFlBUkksRUFXSixXQVhJOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0osa0NBREksR0FDRyxZQUFZLENBQVosQ0FESDtBQUVKLG9DQUZJLEdBRUssS0FBSyxLQUFMLEVBRkw7QUFBQTtBQUFBLHFDQUd5QixtQkFBUSxHQUFSLENBQVksQ0FDN0MsS0FBSyxtQkFBTCxFQUQ2QyxFQUU3QyxLQUFLLGVBQUwsQ0FBcUIsS0FBSyxLQUFMLEVBQXJCLENBRjZDLENBQVosQ0FIekI7O0FBQUE7QUFBQTtBQUFBO0FBR0gsc0NBSEc7QUFHTyxzQ0FIUDtBQVFKLDBDQVJJLEdBUVcsS0FBSyxpQkFBTCxLQUNqQixxQkFBSSxvQkFBSixFQUEwQixLQUFLLFdBQUwsRUFBMUIsQ0FEaUIsR0FFakIsU0FBUyxZQUFULEVBVk07QUFXSix5Q0FYSSxHQVdVLFdBQVcsS0FBSyxnQkFBTCxFQUFYLEdBQ2hCLFdBRGdCLEdBRWhCLEVBYk07QUFBQSwrREFlSCx5QkFBSSw0QkFBSixDQUNMLHFCQUFJLHNDQUFKLEVBQTRDLFFBQTVDLEVBQXNELEVBQUMsMEJBQUQsRUFBdEQsSUFBd0UsV0FEbkUsRUFFTCxJQUZLLEVBR0wsSUFISyxFQUlMLFFBSkssRUFLTCxJQUxLLEVBTUwsQ0FDRSx5Q0FBcUIscUJBQUksb0JBQUosRUFBMEIsUUFBMUIsQ0FBckIsRUFBMEQsNkJBQWMsYUFBeEUsRUFBdUYsQ0FBQyxNQUFELENBQXZGLENBREYsRUFFRSx5Q0FBcUIscUJBQUksa0JBQUosRUFBd0IsUUFBeEIsQ0FBckIsRUFBd0QsNkJBQWMsd0JBQXRFLEVBQWdHLENBQUMsTUFBRCxDQUFoRyxDQUZGLEVBR0UseUNBQXFCLHFCQUFJLG1CQUFKLEVBQXlCLFFBQXpCLENBQXJCLEVBQXlELDZCQUFjLFdBQXZFLEVBQW9GLENBQUMsTUFBRCxDQUFwRixDQUhGLENBTkssQ0FmRzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFOO0FBNEJBLDhCQUFZLElBQVosQ0FBaUIsS0FBakI7OztBQTdCRixxQkFBUSxDQUFSLEdBQVksQ0FBWixFQUFlLElBQUksWUFBWSxNQUEvQixFQUF1QyxHQUF2QyxFQUE0QztBQUFBLHdCQUFwQyxDQUFvQztBQThCM0M7O3VCQUNzQixtQkFBUSxHQUFSLENBQVksV0FBWixDOzs7QUFBakIsd0I7O0FBQ04seUNBQUksbUJBQUosQ0FDRSxLQUFLLE9BQUwsRUFERixFQUVFLFFBRkY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9KLE9BQU8sT0FBUCxHQUFpQixJQUFJLHNCQUFKLEVBQWpCIiwiZmlsZSI6IlNob3dBY3RpdmVHYW1lc0hhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBNZXNzYWdlSGFuZGxlckJhc2UgZnJvbSAnLi4vTWVzc2FnZUhhbmRsZXJCYXNlJztcbmltcG9ydCBCb3QgZnJvbSAnZmItbG9jYWwtY2hhdC1ib3QnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vLi4vY2xhc3MvVXNlcic7XG5pbXBvcnQgR29HYW1lIGZyb20gJy4uLy4uL2NsYXNzL0dhbWUnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtQb3N0QmFja1R5cGVzLCBjcmVhdGVQb3N0YmFja0J1dHRvbn0gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge0xBTkdVQUdFX1RPX05BTUVfTUFQfSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRpb25Db25zdGFudHMnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcblxuY2xhc3MgU2hvd0FjdGl2ZUdhbWVzSGFuZGxlciBleHRlbmRzIE1lc3NhZ2VIYW5kbGVyQmFzZSB7XG4gIGdldFBvc3RCYWNrVHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBQb3N0QmFja1R5cGVzLlNIT1dfQUNUSVZFX0dBTUVTO1xuICB9XG5cbiAgYXN5bmMgZ2VuSGFuZGxlKHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXVzZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIEJvdC5zZW5kVGV4dCh1c2VyLmdldEZCSUQoKSwgZ290KCdub3JtYWxNZXNzYWdlLnlvdUFyZU5vdFBsYXlpbmdBbnlHYW1lJywgdXNlci5nZXRMYW5ndWFnZSgpKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFjdGl2ZUdhbWVzID0gYXdhaXQgR29HYW1lLmdlbkFjdGl2ZUdhbWVzRm9yVXNlcih1c2VyKTtcbiAgICBhY3RpdmVHYW1lcyA9IGFjdGl2ZUdhbWVzLnNsaWNlKDAsIDEwKTsgLy8gRkIgbGltaXQgdG8gMTAgZWxlbWVudHNcbiAgICBjb25zdCBsYW5ndWFnZSA9IHVzZXIuZ2V0TGFuZ3VhZ2UoKTtcblxuICAgIGNvbnN0IGVsZW1lbnRzR2VuID0gW107XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFjdGl2ZUdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBnZW4gPSBhc3luYyBmdW5jdGlvbigpOiBQcm9taXNlPE9iamVjdD4ge1xuICAgICAgICBjb25zdCBnYW1lID0gYWN0aXZlR2FtZXNbaV07XG4gICAgICAgIGNvbnN0IGdhbWVJRCA9IGdhbWUuZ2V0SUQoKTtcbiAgICAgICAgY29uc3QgW2JvYXJkVVJMLCBvcHBvbmVudF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgZ2FtZS5nZW5NaW5pR2FtZUltYWdlVVJMKCksXG4gICAgICAgICAgZ2FtZS5nZW5PcHBvbmVudFVzZXIodXNlci5nZXRJRCgpKSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3Qgb3Bwb25lbnROYW1lID0gZ2FtZS5pc1NlbGZQbGF5aW5nR2FtZSgpXG4gICAgICAgICAgPyBnb3QoJ2luR2FtZU1lc3NhZ2Uuc2VsZicsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSlcbiAgICAgICAgICA6IG9wcG9uZW50LmdldEZpcnN0TmFtZSgpO1xuICAgICAgICBjb25zdCBmb2N1c2VkTWFyayA9IGdhbWVJRCA9PT0gdXNlci5nZXRDdXJyZW50R2FtZUlEKClcbiAgICAgICAgICA/ICcg8J+RiCDwn5GIIPCfpJQnXG4gICAgICAgICAgOiAnJztcblxuICAgICAgICByZXR1cm4gQm90LmNyZWF0ZUdlbmVyaWNUZW1wbGF0ZUVsZW1lbnQoXG4gICAgICAgICAgZ290KCdpbkdhbWVNZXNzYWdlLmFjdGl2ZUdhbWVFbGVtZW50VGl0bGUnLCBsYW5ndWFnZSwge29wcG9uZW50TmFtZX0pICsgZm9jdXNlZE1hcmssXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIGJvYXJkVVJMLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgW1xuICAgICAgICAgICAgY3JlYXRlUG9zdGJhY2tCdXR0b24oZ290KCdidXR0b24uZm9jdXNPbkdhbWUnLCBsYW5ndWFnZSksIFBvc3RCYWNrVHlwZXMuRk9DVVNfT05fR0FNRSwgW2dhbWVJRF0pLFxuICAgICAgICAgICAgY3JlYXRlUG9zdGJhY2tCdXR0b24oZ290KCdidXR0b24uc2hvd0JvYXJkJywgbGFuZ3VhZ2UpLCBQb3N0QmFja1R5cGVzLlNIT1dfQ1VSUkVOVF9HQU1FX1NUQVRVUywgW2dhbWVJRF0pLFxuICAgICAgICAgICAgY3JlYXRlUG9zdGJhY2tCdXR0b24oZ290KCdidXR0b24ucmVzaWduR2FtZScsIGxhbmd1YWdlKSwgUG9zdEJhY2tUeXBlcy5SRVNJR05fR0FNRSwgW2dhbWVJRF0pLFxuICAgICAgICAgIF1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnRzR2VuLnB1c2goZ2VuKCkpO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50cyA9IGF3YWl0IFByb21pc2UuYWxsKGVsZW1lbnRzR2VuKTtcbiAgICBCb3Quc2VuZEdlbmVyaWNUZW1wbGF0ZShcbiAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgZWxlbWVudHMsXG4gICAgKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaG93QWN0aXZlR2FtZXNIYW5kbGVyKCk7XG4iXX0=
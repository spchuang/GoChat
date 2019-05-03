

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

var _ParseUtil = require('../../utils/ParseUtil');

var _ParseUtil2 = _interopRequireDefault(_ParseUtil);

var _Translator = require('../../translations/Translator');

var _PostBackUtils = require('../PostBackUtils');

var _GoAIUtils = require('../../utils/GoAIUtils');

var _GoAIUtils2 = _interopRequireDefault(_GoAIUtils);

var _Logger = require('../../logging/Logger');

var _LoggingEnums = require('../../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayMoveHandler = function (_MessageHandlerBase) {
  _inherits(PlayMoveHandler, _MessageHandlerBase);

  function PlayMoveHandler() {
    _classCallCheck(this, PlayMoveHandler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlayMoveHandler).apply(this, arguments));
  }

  _createClass(PlayMoveHandler, [{
    key: 'genHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user, params) {
        var game, opponentUser, opponentName, position, errorMessage;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (user.isPlaying()) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                game = user.getCurrentGame();

                if (!game.isCountingScore()) {
                  _context.next = 10;
                  break;
                }

                _context.next = 6;
                return game.genOpponentUser(user.getID());

              case 6:
                opponentUser = _context.sent;
                opponentName = game.isSelfPlayingGame() ? (0, _Translator.got)('inGameMessage.self', user.getLanguage()) : opponentUser.getFirstName();

                _fbLocalChatBot2.default.sendButtons(user.getFBID(), (0, _Translator.got)('inGameMessage.gameInScoreCounting', user.getLanguage(), { opponentName: opponentName }), [(0, _PostBackUtils.getCountScoreURLButton)((0, _Translator.got)('button.countScore', user.getLanguage()), user, { gameID: game.getID() })]);
                return _context.abrupt('return');

              case 10:
                if (!game.isOver()) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return');

              case 12:
                position = params.position;
                // Need to create exception class for Weiqi: https://github.com/cjlarose/weiqi.js/issues/24

                _context.prev = 13;
                _context.next = 16;
                return game.genPlay(user.getID(), position);

              case 16:
                _context.next = 25;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](13);

                error('An error occured while trying to play a stone for game: ' + game.getID(), _context.t0);
                errorMessage = (0, _Translator.got)('typedException.invalidMove', user.getLanguage()) + ' ';


                if (_context.t0.name === 'TypedError') {
                  errorMessage += (0, _Translator.got)(_context.t0.getErrorName(), user.getLanguage());
                } else {
                  errorMessage += (0, _Translator.got)(_context.t0, user.getLanguage());
                }
                _fbLocalChatBot2.default.sendText(user.getFBID(), errorMessage);

                return _context.abrupt('return');

              case 25:
                _context.next = 27;
                return this.genSendMessage(game, user, position);

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[13, 18]]);
      }));

      function genHandle(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return genHandle;
    }()

    // We are asking the caller to pass in the game object since from
    // the AI user, we can only get the currentGame but the AI could be
    // playing multiple games at the same time.

  }, {
    key: 'genAIHandle',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(AIUser, game) {
        var AIMovePosition;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!game.isOver()) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return _GoAIUtils2.default.genNextMove(game);

              case 5:
                AIMovePosition = _context2.sent;
                _context2.next = 8;
                return game.genPlay(AIUser.getID(), AIMovePosition);

              case 8:
                _context2.next = 10;
                return this.genSendMessage(game, AIUser, AIMovePosition);

              case 10:
                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](2);

                // Catch AI errors
                info('AI move error.');
                info(_context2.t0);

                /*
                if (err.name === 'TypedError') {
                  errorMessage += got(err.getErrorName(), user.getLanguage());
                } else {
                  errorMessage += got(err, user.getLanguage());
                }
                Bot.sendText(
                  user.getFBID(),
                  errorMessage,
                );
                return;
                */

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 12]]);
      }));

      function genAIHandle(_x3, _x4) {
        return ref.apply(this, arguments);
      }

      return genAIHandle;
    }()
  }, {
    key: 'genSendMessage',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(game, user, position) {
        var positionText, _ref, _ref2, opponentUser, imageURL, currentColor, prevColor, turnToPlayMessage, message, opponentFocusedOnGame;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                positionText = _ParseUtil2.default.convertNumberPositionToString(position);
                _context3.next = 3;
                return _bluebird2.default.all([_User2.default.genByUserID(game.getOpponentUserID(user.getID())), game.genBoardImageURL()]);

              case 3:
                _ref = _context3.sent;
                _ref2 = _slicedToArray(_ref, 2);
                opponentUser = _ref2[0];
                imageURL = _ref2[1];
                currentColor = (0, _Translator.got)(game.getCurrentMoveColorText(), user.getLanguage());
                prevColor = (0, _Translator.got)(game.getPreviousMoveColorText(), user.getLanguage());
                turnToPlayMessage = game.isSelfPlayingGame() ? (0, _Translator.got)('inGameMessage.selfTurnToPlay', user.getLanguage(), { color: currentColor }) : (0, _Translator.got)('inGameMessage.enemyTurnToPlay', user.getLanguage(), { color: currentColor, enemy: opponentUser.getFirstName() });

                _fbLocalChatBot2.default.sendText(user.getFBID(), (0, _Translator.got)('inGameMessage.selfPlayMove', user.getLanguage(), { color: prevColor, positionText: positionText }) + ' ' + turnToPlayMessage);
                _fbLocalChatBot2.default.sendImage(user.getFBID(), imageURL);

                if (!game.isSelfPlayingGame()) {
                  currentColor = (0, _Translator.got)(game.getCurrentMoveColorText(), opponentUser.getLanguage());
                  prevColor = (0, _Translator.got)(game.getPreviousMoveColorText(), opponentUser.getLanguage());
                  message = (0, _Translator.got)('inGameMessage.enemyPlayMove', opponentUser.getLanguage(), { color: prevColor, positionText: positionText, enemy: user.getFirstName() }) + ' ' + (0, _Translator.got)('inGameMessage.selfTurnToPlay', opponentUser.getLanguage(), { color: currentColor });
                  opponentFocusedOnGame = opponentUser.getCurrentGameID() === game.getID();


                  (0, _PostBackUtils.sendFocusedGameMessage)(opponentUser, game, message, opponentFocusedOnGame);
                  _fbLocalChatBot2.default.sendImage(opponentUser.getFBID(), imageURL);
                }

                new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.GAME_PLAY_MOVE).setTargetClass(_LoggingEnums.LoggingTargetClass.GAME).setTargetID(game.getID()).setExtraData({ position: position }).log();

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genSendMessage(_x5, _x6, _x7) {
        return ref.apply(this, arguments);
      }

      return genSendMessage;
    }()
  }]);

  return PlayMoveHandler;
}(_MessageHandlerBase3.default);

module.exports = new PlayMoveHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nYW1lL1BsYXlNb3ZlSGFuZGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFNTSxlOzs7Ozs7Ozs7Ozs7a0ZBQ1ksSSxFQUFZLE07WUFJdEIsSSxFQUdJLFksRUFDQSxZLEVBaUJGLFEsRUFNQSxZOzs7OztvQkE5QkQsS0FBSyxTQUFMLEU7Ozs7Ozs7O0FBR0Qsb0IsR0FBTyxLQUFLLGNBQUwsRTs7cUJBRVAsS0FBSyxlQUFMLEU7Ozs7Ozt1QkFDeUIsS0FBSyxlQUFMLENBQXFCLEtBQUssS0FBTCxFQUFyQixDOzs7QUFBckIsNEI7QUFDQSw0QixHQUFlLEtBQUssaUJBQUwsS0FDakIscUJBQUksb0JBQUosRUFBMEIsS0FBSyxXQUFMLEVBQTFCLENBRGlCLEdBRWpCLGFBQWEsWUFBYixFOztBQUNKLHlDQUFJLFdBQUosQ0FDRSxLQUFLLE9BQUwsRUFERixFQUVFLHFCQUFJLG1DQUFKLEVBQXlDLEtBQUssV0FBTCxFQUF6QyxFQUE2RCxFQUFDLDBCQUFELEVBQTdELENBRkYsRUFHRSxDQUNFLDJDQUF1QixxQkFBSSxtQkFBSixFQUF5QixLQUFLLFdBQUwsRUFBekIsQ0FBdkIsRUFBcUUsSUFBckUsRUFBMkUsRUFBQyxRQUFRLEtBQUssS0FBTCxFQUFULEVBQTNFLENBREYsQ0FIRjs7OztxQkFVRSxLQUFLLE1BQUwsRTs7Ozs7Ozs7QUFJRSx3QixHQUFXLE9BQU8sUTs7Ozs7dUJBR2hCLEtBQUssT0FBTCxDQUFhLEtBQUssS0FBTCxFQUFiLEVBQTJCLFFBQTNCLEM7Ozs7Ozs7Ozs7QUFFTixzQkFBTSw2REFBNkQsS0FBSyxLQUFMLEVBQW5FO0FBQ0ksNEIsR0FBZSxxQkFBSSw0QkFBSixFQUFrQyxLQUFLLFdBQUwsRUFBbEMsSUFBd0Qs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QUFwRDtBQUNBLDJDQUFJLFNBQUosQ0FBYyxhQUFhLE9BQWIsRUFBZCxFQUFzQyxRQUF0QztBQUNEOztBQUVBLG1DQUFXLElBQVgsQ0FBRCxDQUNHLFFBREgsQ0FDWSwyQkFBYSxjQUR6QixFQUVHLGNBRkgsQ0FFa0IsaUNBQW1CLElBRnJDLEVBR0csV0FISCxDQUdlLEtBQUssS0FBTCxFQUhmLEVBSUcsWUFKSCxDQUlnQixFQUFDLGtCQUFELEVBSmhCLEVBS0csR0FMSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0osT0FBTyxPQUFQLEdBQWlCLElBQUksZUFBSixFQUFqQiIsImZpbGUiOiJQbGF5TW92ZUhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBNZXNzYWdlSGFuZGxlckJhc2UgZnJvbSAnLi4vTWVzc2FnZUhhbmRsZXJCYXNlJztcbmltcG9ydCBCb3QgZnJvbSAnZmItbG9jYWwtY2hhdC1ib3QnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vLi4vY2xhc3MvVXNlcic7XG5pbXBvcnQgR29HYW1lIGZyb20gJy4uLy4uL2NsYXNzL0dhbWUnO1xuaW1wb3J0IFBhcnNlVXRpbCBmcm9tICcuLi8uLi91dGlscy9QYXJzZVV0aWwnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCB7c2VuZEZvY3VzZWRHYW1lTWVzc2FnZSwgZ2V0Q291bnRTY29yZVVSTEJ1dHRvbn0gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQgR29BSVV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL0dvQUlVdGlscyc7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi4vLi4vbG9nZ2luZy9Mb2dnZXInO1xuaW1wb3J0IHtMb2dnaW5nRXZlbnQsIExvZ2dpbmdUYXJnZXRDbGFzc30gZnJvbSAnLi4vLi4vbG9nZ2luZy9Mb2dnaW5nRW51bXMnO1xuXG50eXBlIFBhcmFtcyA9IHtcbiAgcG9zaXRpb246IFN0b25lUG9zaXRpb247XG59O1xuXG5jbGFzcyBQbGF5TW92ZUhhbmRsZXIgZXh0ZW5kcyBNZXNzYWdlSGFuZGxlckJhc2Uge1xuICBhc3luYyBnZW5IYW5kbGUodXNlcjogVXNlciwgcGFyYW1zOiBQYXJhbXMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXVzZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGdhbWUgPSB1c2VyLmdldEN1cnJlbnRHYW1lKCk7XG5cbiAgICBpZiAoZ2FtZS5pc0NvdW50aW5nU2NvcmUoKSkge1xuICAgICAgY29uc3Qgb3Bwb25lbnRVc2VyID0gYXdhaXQgZ2FtZS5nZW5PcHBvbmVudFVzZXIodXNlci5nZXRJRCgpKTtcbiAgICAgIGNvbnN0IG9wcG9uZW50TmFtZSA9IGdhbWUuaXNTZWxmUGxheWluZ0dhbWUoKVxuICAgICAgICA/IGdvdCgnaW5HYW1lTWVzc2FnZS5zZWxmJywgdXNlci5nZXRMYW5ndWFnZSgpKVxuICAgICAgICA6IG9wcG9uZW50VXNlci5nZXRGaXJzdE5hbWUoKTtcbiAgICAgIEJvdC5zZW5kQnV0dG9ucyhcbiAgICAgICAgdXNlci5nZXRGQklEKCksXG4gICAgICAgIGdvdCgnaW5HYW1lTWVzc2FnZS5nYW1lSW5TY29yZUNvdW50aW5nJywgdXNlci5nZXRMYW5ndWFnZSgpLCB7b3Bwb25lbnROYW1lfSksXG4gICAgICAgIFtcbiAgICAgICAgICBnZXRDb3VudFNjb3JlVVJMQnV0dG9uKGdvdCgnYnV0dG9uLmNvdW50U2NvcmUnLCB1c2VyLmdldExhbmd1YWdlKCkpLCB1c2VyLCB7Z2FtZUlEOiBnYW1lLmdldElEKCl9KSxcbiAgICAgICAgXSxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGdhbWUuaXNPdmVyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHBhcmFtcy5wb3NpdGlvbjtcbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSBleGNlcHRpb24gY2xhc3MgZm9yIFdlaXFpOiBodHRwczovL2dpdGh1Yi5jb20vY2psYXJvc2Uvd2VpcWkuanMvaXNzdWVzLzI0XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGdhbWUuZ2VuUGxheSh1c2VyLmdldElEKCksIHBvc2l0aW9uKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGVycm9yKCdBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBwbGF5IGEgc3RvbmUgZm9yIGdhbWU6ICcgKyBnYW1lLmdldElEKCksIGVycik7XG4gICAgICBsZXQgZXJyb3JNZXNzYWdlID0gZ290KCd0eXBlZEV4Y2VwdGlvbi5pbnZhbGlkTW92ZScsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSkgKyAnICc7XG5cbiAgICAgIGlmIChlcnIubmFtZSA9PT0gJ1R5cGVkRXJyb3InKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSArPSBnb3QoZXJyLmdldEVycm9yTmFtZSgpLCB1c2VyLmdldExhbmd1YWdlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9IGdvdChlcnIsIHVzZXIuZ2V0TGFuZ3VhZ2UoKSk7XG4gICAgICB9XG4gICAgICBCb3Quc2VuZFRleHQoXG4gICAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICApO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuZ2VuU2VuZE1lc3NhZ2UoZ2FtZSwgdXNlciwgcG9zaXRpb24pO1xuICB9XG5cbiAgLy8gV2UgYXJlIGFza2luZyB0aGUgY2FsbGVyIHRvIHBhc3MgaW4gdGhlIGdhbWUgb2JqZWN0IHNpbmNlIGZyb21cbiAgLy8gdGhlIEFJIHVzZXIsIHdlIGNhbiBvbmx5IGdldCB0aGUgY3VycmVudEdhbWUgYnV0IHRoZSBBSSBjb3VsZCBiZVxuICAvLyBwbGF5aW5nIG11bHRpcGxlIGdhbWVzIGF0IHRoZSBzYW1lIHRpbWUuXG4gIGFzeW5jIGdlbkFJSGFuZGxlKEFJVXNlcjogVXNlciwgZ2FtZTogR29HYW1lKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGdhbWUuaXNPdmVyKCkpe1xuICAgICAgLy8gVE9ETzogdGhpbmsgYWJvdXQgaG93IGVuZCBnYW1lIGlzIGhhbmRsZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgQUlNb3ZlUG9zaXRpb24gPSBhd2FpdCBHb0FJVXRpbHMuZ2VuTmV4dE1vdmUoZ2FtZSk7XG4gICAgICBhd2FpdCBnYW1lLmdlblBsYXkoQUlVc2VyLmdldElEKCksIEFJTW92ZVBvc2l0aW9uKVxuXG4gICAgICBhd2FpdCB0aGlzLmdlblNlbmRNZXNzYWdlKGdhbWUsIEFJVXNlciwgQUlNb3ZlUG9zaXRpb24pO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAvLyBDYXRjaCBBSSBlcnJvcnNcbiAgICAgIGluZm8oJ0FJIG1vdmUgZXJyb3IuJylcbiAgICAgIGluZm8oZXJyKVxuXG4gICAgICAvKlxuICAgICAgaWYgKGVyci5uYW1lID09PSAnVHlwZWRFcnJvcicpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9IGdvdChlcnIuZ2V0RXJyb3JOYW1lKCksIHVzZXIuZ2V0TGFuZ3VhZ2UoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvck1lc3NhZ2UgKz0gZ290KGVyciwgdXNlci5nZXRMYW5ndWFnZSgpKTtcbiAgICAgIH1cbiAgICAgIEJvdC5zZW5kVGV4dChcbiAgICAgICAgdXNlci5nZXRGQklEKCksXG4gICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgICAqL1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdlblNlbmRNZXNzYWdlKGdhbWU6IEdvR2FtZSwgdXNlcjogVXNlciwgcG9zaXRpb246IFN0b25lUG9zaXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwb3NpdGlvblRleHQgPSBQYXJzZVV0aWwuY29udmVydE51bWJlclBvc2l0aW9uVG9TdHJpbmcocG9zaXRpb24pO1xuICAgIGNvbnN0IFtvcHBvbmVudFVzZXIsIGltYWdlVVJMXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIFVzZXIuZ2VuQnlVc2VySUQoZ2FtZS5nZXRPcHBvbmVudFVzZXJJRCh1c2VyLmdldElEKCkpKSxcbiAgICAgIGdhbWUuZ2VuQm9hcmRJbWFnZVVSTCgpLFxuICAgIF0pO1xuXG4gICAgbGV0IGN1cnJlbnRDb2xvciA9IGdvdChnYW1lLmdldEN1cnJlbnRNb3ZlQ29sb3JUZXh0KCksIHVzZXIuZ2V0TGFuZ3VhZ2UoKSk7XG4gICAgbGV0IHByZXZDb2xvciA9IGdvdChnYW1lLmdldFByZXZpb3VzTW92ZUNvbG9yVGV4dCgpLCB1c2VyLmdldExhbmd1YWdlKCkpO1xuXG4gICAgY29uc3QgdHVyblRvUGxheU1lc3NhZ2UgPSBnYW1lLmlzU2VsZlBsYXlpbmdHYW1lKClcbiAgICAgID8gZ290KCdpbkdhbWVNZXNzYWdlLnNlbGZUdXJuVG9QbGF5JywgdXNlci5nZXRMYW5ndWFnZSgpLCB7Y29sb3I6IGN1cnJlbnRDb2xvcn0pXG4gICAgICA6IGdvdCgnaW5HYW1lTWVzc2FnZS5lbmVteVR1cm5Ub1BsYXknLCB1c2VyLmdldExhbmd1YWdlKCksIHtjb2xvcjogY3VycmVudENvbG9yLCBlbmVteTogb3Bwb25lbnRVc2VyLmdldEZpcnN0TmFtZSgpfSlcbiAgICBCb3Quc2VuZFRleHQoXG4gICAgICB1c2VyLmdldEZCSUQoKSxcbiAgICAgIGdvdCgnaW5HYW1lTWVzc2FnZS5zZWxmUGxheU1vdmUnLCB1c2VyLmdldExhbmd1YWdlKCksIHtjb2xvcjogcHJldkNvbG9yLCBwb3NpdGlvblRleHQ6IHBvc2l0aW9uVGV4dH0pICsgJyAnICsgdHVyblRvUGxheU1lc3NhZ2UsXG4gICAgKTtcbiAgICBCb3Quc2VuZEltYWdlKHVzZXIuZ2V0RkJJRCgpLCBpbWFnZVVSTCk7XG5cbiAgICBpZiAoIWdhbWUuaXNTZWxmUGxheWluZ0dhbWUoKSkge1xuICAgICAgY3VycmVudENvbG9yID0gZ290KGdhbWUuZ2V0Q3VycmVudE1vdmVDb2xvclRleHQoKSwgb3Bwb25lbnRVc2VyLmdldExhbmd1YWdlKCkpO1xuICAgICAgcHJldkNvbG9yID0gZ290KGdhbWUuZ2V0UHJldmlvdXNNb3ZlQ29sb3JUZXh0KCksIG9wcG9uZW50VXNlci5nZXRMYW5ndWFnZSgpKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICBnb3QoXG4gICAgICAgICAgJ2luR2FtZU1lc3NhZ2UuZW5lbXlQbGF5TW92ZScsXG4gICAgICAgICAgb3Bwb25lbnRVc2VyLmdldExhbmd1YWdlKCksXG4gICAgICAgICAge2NvbG9yOiBwcmV2Q29sb3IsIHBvc2l0aW9uVGV4dDogcG9zaXRpb25UZXh0LCBlbmVteTogdXNlci5nZXRGaXJzdE5hbWUoKX0sXG4gICAgICAgICkgKyAnICcgK1xuICAgICAgICBnb3QoXG4gICAgICAgICAgJ2luR2FtZU1lc3NhZ2Uuc2VsZlR1cm5Ub1BsYXknLFxuICAgICAgICAgIG9wcG9uZW50VXNlci5nZXRMYW5ndWFnZSgpLFxuICAgICAgICAgIHtjb2xvcjogY3VycmVudENvbG9yfSxcbiAgICAgICAgKTtcbiAgICAgIGNvbnN0IG9wcG9uZW50Rm9jdXNlZE9uR2FtZSA9IG9wcG9uZW50VXNlci5nZXRDdXJyZW50R2FtZUlEKCkgPT09IGdhbWUuZ2V0SUQoKTtcblxuICAgICAgc2VuZEZvY3VzZWRHYW1lTWVzc2FnZShvcHBvbmVudFVzZXIsIGdhbWUsIG1lc3NhZ2UsIG9wcG9uZW50Rm9jdXNlZE9uR2FtZSk7XG4gICAgICBCb3Quc2VuZEltYWdlKG9wcG9uZW50VXNlci5nZXRGQklEKCksIGltYWdlVVJMKTtcbiAgICB9XG5cbiAgICAobmV3IExvZ2dlcih1c2VyKSlcbiAgICAgIC5zZXRFdmVudChMb2dnaW5nRXZlbnQuR0FNRV9QTEFZX01PVkUpXG4gICAgICAuc2V0VGFyZ2V0Q2xhc3MoTG9nZ2luZ1RhcmdldENsYXNzLkdBTUUpXG4gICAgICAuc2V0VGFyZ2V0SUQoZ2FtZS5nZXRJRCgpKVxuICAgICAgLnNldEV4dHJhRGF0YSh7cG9zaXRpb259KVxuICAgICAgLmxvZygpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBsYXlNb3ZlSGFuZGxlcigpO1xuIl19
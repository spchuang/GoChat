

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _ParseUtil = require('../utils/ParseUtil');

var _ParseUtil2 = _interopRequireDefault(_ParseUtil);

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

var _PostBackUtils = require('./PostBackUtils');

var _Translator = require('../translations/Translator');

var _PlayMoveHandler = require('./game/PlayMoveHandler');

var _PlayMoveHandler2 = _interopRequireDefault(_PlayMoveHandler);

var _UndoMoveHandler = require('./game/UndoMoveHandler');

var _UndoMoveHandler2 = _interopRequireDefault(_UndoMoveHandler);

var _ResignGameHandler = require('./game/ResignGameHandler');

var _ResignGameHandler2 = _interopRequireDefault(_ResignGameHandler);

var _PassMoveHandler = require('./game/PassMoveHandler');

var _PassMoveHandler2 = _interopRequireDefault(_PassMoveHandler);

var _ShowMessengerWebviewTokenHandler = require('./general/ShowMessengerWebviewTokenHandler');

var _ShowMessengerWebviewTokenHandler2 = _interopRequireDefault(_ShowMessengerWebviewTokenHandler);

var _Logger = require('../logging/Logger');

var _LoggingEnums = require('../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostBackHandlers = {};
var folders = ['game', 'general'];
folders.forEach(function (folder) {
  var files = _fs2.default.readdirSync(__dirname + '/' + folder);
  files.forEach(function (file) {
    if (file.indexOf('Handler.js') < 0) {
      return;
    }

    // $FlowFixMe: flow can't handle dynamic import
    var handler = require(_path2.default.join(__dirname + '/' + folder + '/' + file));
    if (!handler.getPostBackType()) {
      return;
    }
    PostBackHandlers[handler.getPostBackType()] = handler;
  });
});

var textResponseHandler = {
  _handleNormal: function _handleNormal(user, text) {
    var _this = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(text === 'token')) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return _ShowMessengerWebviewTokenHandler2.default.genHandle(user);

            case 3:
              return _context.abrupt('return');

            case 4:
              _context.next = 6;
              return PostBackHandlers[_PostBackUtils.PostBackTypes.SEE_HELP].genHandle(user);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  _handleInGame: function _handleInGame(user, text) {
    var _this2 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2() {
      var position, game, opponentUser;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!_ParseUtil2.default.isHelpCommand(text)) {
                _context2.next = 6;
                break;
              }

              _context2.next = 3;
              return PostBackHandlers[_PostBackUtils.PostBackTypes.SEE_HELP].genHandle(user);

            case 3:
              return _context2.abrupt('return');

            case 6:
              if (!_ParseUtil2.default.isPassCommand(text)) {
                _context2.next = 12;
                break;
              }

              _context2.next = 9;
              return _PassMoveHandler2.default.genHandle(user, {});

            case 9:
              return _context2.abrupt('return');

            case 12:
              if (!_ParseUtil2.default.isQuitCommand(text)) {
                _context2.next = 18;
                break;
              }

              _context2.next = 15;
              return _ResignGameHandler2.default.genHandle(user, {});

            case 15:
              return _context2.abrupt('return');

            case 18:
              if (!(text === 'token')) {
                _context2.next = 24;
                break;
              }

              _context2.next = 21;
              return _ShowMessengerWebviewTokenHandler2.default.genHandle(user);

            case 21:
              return _context2.abrupt('return');

            case 24:
              if (!_ParseUtil2.default.isUndoCommand(text)) {
                _context2.next = 28;
                break;
              }

              _context2.next = 27;
              return _UndoMoveHandler2.default.genHandle(user, {});

            case 27:
              return _context2.abrupt('return');

            case 28:
              _context2.prev = 28;

              position = _ParseUtil2.default.parsePositionText(text);
              _context2.next = 36;
              break;

            case 32:
              _context2.prev = 32;
              _context2.t0 = _context2['catch'](28);

              _fbLocalChatBot2.default.sendButtons(user.getFBID(), (0, _Translator.got)('typedException.notProperMove', user.getLanguage()), [(0, _PostBackUtils.createPostbackButton)((0, _Translator.got)('button.helpMenu', user.getLanguage()), _PostBackUtils.PostBackTypes.SEE_HELP)]);
              return _context2.abrupt('return');

            case 36:
              _context2.next = 38;
              return _PlayMoveHandler2.default.genHandle(user, { position: position });

            case 38:

              // See if the opponent is AI, and it's AI's turn
              game = user.getCurrentGame();
              _context2.next = 41;
              return game.genOpponentUser(user.getID());

            case 41:
              opponentUser = _context2.sent;

              if (!(opponentUser.getIsAI() && !game.isUserTurn(user.getID()))) {
                _context2.next = 45;
                break;
              }

              _context2.next = 45;
              return _PlayMoveHandler2.default.genAIHandle(opponentUser, game);

            case 45:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[28, 32]]);
    }))();
  }
};
/*
async function backfill() {
  const users = await User.genAll();
  users.forEach((user) => {
    if (user.getFirstName()) {
      return;
    }
    console.log(user.getID(), user.getFBID());
    Bot.getUserProfile(user.getFBID()).then((data) => {
      user.setFirstName(data.first_name);
      user.setLastName(data.last_name);
      user.setProfilePic(data.profile_pic);
      user.setLocale(data.locale);
      user.genSave().catch(e => console.log(e));
    }).catch(function (e) {
      console.log(e);
    });
  });
}
*/

var ResponseHandler = {
  handleText: function handleText(senderID, text) {
    var _this3 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3() {
      var user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              info('Receive from ' + senderID + ', text: ' + text);
              _fbLocalChatBot2.default.saveSenderMessageToLocalChat(senderID, text);

              _context3.next = 4;
              return _User2.default.genOrCreateByFBID(senderID);

            case 4:
              user = _context3.sent;


              new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.TEXT_SEND).setExtraData({ text: text }).log();

              if (!user.isPlaying()) {
                _context3.next = 11;
                break;
              }

              _context3.next = 9;
              return textResponseHandler._handleInGame(user, text);

            case 9:
              _context3.next = 13;
              break;

            case 11:
              _context3.next = 13;
              return textResponseHandler._handleNormal(user, text);

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  },
  handleAttachment: function handleAttachment(senderID, attachments) {
    var _this4 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4() {
      var user;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // no matter what the attachments are, we always show the help menu
              info('Receive from ' + senderID + ', attachments');
              info(attachments);
              _context4.next = 4;
              return _User2.default.genOrCreateByFBID(senderID);

            case 4:
              user = _context4.sent;
              _context4.next = 7;
              return PostBackHandlers[_PostBackUtils.PostBackTypes.SEE_HELP].genHandle(user);

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  },
  handlePostback: function handlePostback(senderID, payload) {
    var _this5 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5() {
      var params, payloadType, user, handler, paramObject;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              info('Receive postback from ' + senderID + ', payload: ' + payload);
              params = payload.split(':');
              payloadType = params.shift();

              if (payloadType in _PostBackUtils.PostBackTypes) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt('return');

            case 5:
              _context5.next = 7;
              return _User2.default.genOrCreateByFBID(senderID);

            case 7:
              user = _context5.sent;


              new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.POST_BACK_SEND).setExtraData({ payload: payload }).log();

              if (!(payloadType in PostBackHandlers)) {
                _context5.next = 15;
                break;
              }

              handler = PostBackHandlers[payloadType];
              paramObject = handler.getParamObjectFromPostback(params);
              _context5.next = 14;
              return handler.genHandle(user, paramObject);

            case 14:
              return _context5.abrupt('return');

            case 15:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5);
    }))();
  }
};

module.exports = ResponseHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zZS9SZXNwb25zZUhhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU0sbUJBQW1CLEVBQXpCO0FBQ0EsSUFBTSxVQUFVLENBQUMsTUFBRCxFQUFTLFNBQVQsQ0FBaEI7QUFDQSxRQUFRLE9BQVIsQ0FBZ0Isa0JBQVU7QUFDeEIsTUFBSSxRQUFRLGFBQUcsV0FBSCxDQUFrQixTQUFsQixTQUErQixNQUEvQixDQUFaO0FBQ0EsUUFBTSxPQUFOLENBQWMsZ0JBQVE7QUFDcEIsUUFBSSxLQUFLLE9BQUwsQ0FBYSxZQUFiLElBQTZCLENBQWpDLEVBQW9DO0FBQ2xDO0FBQ0Q7OztBQUdELFFBQU0sVUFBVSxRQUFRLGVBQUssSUFBTCxDQUFhLFNBQWIsU0FBMEIsTUFBMUIsU0FBb0MsSUFBcEMsQ0FBUixDQUFoQjtBQUNBLFFBQUksQ0FBQyxRQUFRLGVBQVIsRUFBTCxFQUFnQztBQUM5QjtBQUNEO0FBQ0QscUJBQWlCLFFBQVEsZUFBUixFQUFqQixJQUE4QyxPQUE5QztBQUNELEdBWEQ7QUFZRCxDQWREOztBQWdCQSxJQUFNLHNCQUFzQjtBQUNwQixlQURvQix5QkFDTixJQURNLEVBQ00sSUFETixFQUNtQztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFDdkQsU0FBUyxPQUQ4QztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQUVuRCwyQ0FBaUMsU0FBakMsQ0FBMkMsSUFBM0MsQ0FGbUQ7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBTXJELGlCQUFpQiw2QkFBYyxRQUEvQixFQUF5QyxTQUF6QyxDQUFtRCxJQUFuRCxDQU5xRDs7QUFBQTtBQUFBO0FBQUE7QUFB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O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBT2xELGVBQUssaUJBQUwsQ0FBdUIsUUFBdkIsQ0FQa0Q7O0FBQUE7QUFPL0Qsa0JBUCtEOzs7QUFTcEUsaUNBQVcsSUFBWCxDQUFELENBQ0csUUFESCxDQUNZLDJCQUFhLGNBRHpCLEVBRUcsWUFGSCxDQUVnQixFQUFDLGdCQUFELEVBRmhCLEVBR0csR0FISDs7QUFUcUUsb0JBY2pFLGVBQWUsZ0JBZGtEO0FBQUE7QUFBQTtBQUFBOztBQWU3RCxxQkFmNkQsR0FlbkQsaUJBQWlCLFdBQWpCLENBZm1EO0FBZ0I3RCx5QkFoQjZELEdBZ0IvQyxRQUFRLDBCQUFSLENBQW1DLE1BQW5DLENBaEIrQztBQUFBO0FBQUEscUJBaUI3RCxRQUFRLFNBQVIsQ0FBa0IsSUFBbEIsRUFBd0IsV0FBeEIsQ0FqQjZEOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQnRFO0FBL0NxQixDQUF4Qjs7QUFrREEsT0FBTyxPQUFQLEdBQWlCLGVBQWpCIiwiZmlsZSI6IlJlc3BvbnNlSGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IEJvdCBmcm9tICdmYi1sb2NhbC1jaGF0LWJvdCc7XG5pbXBvcnQgUGFyc2VVdGlsIGZyb20gJy4uL3V0aWxzL1BhcnNlVXRpbCc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7UG9zdEJhY2tUeXBlcywgY3JlYXRlUG9zdGJhY2tCdXR0b259IGZyb20gJy4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuaW1wb3J0IFBsYXlNb3ZlSGFuZGxlciBmcm9tICcuL2dhbWUvUGxheU1vdmVIYW5kbGVyJztcbmltcG9ydCBVbmRvTW92ZUhhbmRsZXIgZnJvbSAnLi9nYW1lL1VuZG9Nb3ZlSGFuZGxlcic7XG5pbXBvcnQgUmVzaWduR2FtZUhhbmRsZXIgZnJvbSAnLi9nYW1lL1Jlc2lnbkdhbWVIYW5kbGVyJztcbmltcG9ydCBQYXNzTW92ZUhhbmRsZXIgZnJvbSAnLi9nYW1lL1Bhc3NNb3ZlSGFuZGxlcic7XG5pbXBvcnQgU2hvd01lc3NlbmdlcldlYnZpZXdUb2tlbkhhbmRsZXIgZnJvbSAnLi9nZW5lcmFsL1Nob3dNZXNzZW5nZXJXZWJ2aWV3VG9rZW5IYW5kbGVyJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi9sb2dnaW5nL0xvZ2dlcic7XG5pbXBvcnQge0xvZ2dpbmdFdmVudH0gZnJvbSAnLi4vbG9nZ2luZy9Mb2dnaW5nRW51bXMnO1xuXG5jb25zdCBQb3N0QmFja0hhbmRsZXJzID0ge307XG5jb25zdCBmb2xkZXJzID0gWydnYW1lJywgJ2dlbmVyYWwnXTtcbmZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICB2YXIgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhgJHtfX2Rpcm5hbWV9LyR7Zm9sZGVyfWApO1xuICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgIGlmIChmaWxlLmluZGV4T2YoJ0hhbmRsZXIuanMnKSA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyAkRmxvd0ZpeE1lOiBmbG93IGNhbid0IGhhbmRsZSBkeW5hbWljIGltcG9ydFxuICAgIGNvbnN0IGhhbmRsZXIgPSByZXF1aXJlKHBhdGguam9pbihgJHtfX2Rpcm5hbWV9LyR7Zm9sZGVyfS8ke2ZpbGV9YCkpO1xuICAgIGlmICghaGFuZGxlci5nZXRQb3N0QmFja1R5cGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBQb3N0QmFja0hhbmRsZXJzW2hhbmRsZXIuZ2V0UG9zdEJhY2tUeXBlKCldID0gaGFuZGxlcjtcbiAgfSk7XG59KTtcblxuY29uc3QgdGV4dFJlc3BvbnNlSGFuZGxlciA9IHtcbiAgYXN5bmMgX2hhbmRsZU5vcm1hbCh1c2VyOiBVc2VyLCB0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGV4dCA9PT0gJ3Rva2VuJykge1xuICAgICAgYXdhaXQgU2hvd01lc3NlbmdlcldlYnZpZXdUb2tlbkhhbmRsZXIuZ2VuSGFuZGxlKHVzZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBkZWZhdWx0IHRvIGhlbHAgbWVudVxuICAgIGF3YWl0IFBvc3RCYWNrSGFuZGxlcnNbUG9zdEJhY2tUeXBlcy5TRUVfSEVMUF0uZ2VuSGFuZGxlKHVzZXIpO1xuICB9LFxuXG4gIGFzeW5jIF9oYW5kbGVJbkdhbWUodXNlcjogVXNlciwgdGV4dDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKFBhcnNlVXRpbC5pc0hlbHBDb21tYW5kKHRleHQpKSB7XG4gICAgICBhd2FpdCBQb3N0QmFja0hhbmRsZXJzW1Bvc3RCYWNrVHlwZXMuU0VFX0hFTFBdLmdlbkhhbmRsZSh1c2VyKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKFBhcnNlVXRpbC5pc1Bhc3NDb21tYW5kKHRleHQpKSB7XG4gICAgICBhd2FpdCBQYXNzTW92ZUhhbmRsZXIuZ2VuSGFuZGxlKHVzZXIsIHt9KTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKFBhcnNlVXRpbC5pc1F1aXRDb21tYW5kKHRleHQpKSB7XG4gICAgICBhd2FpdCBSZXNpZ25HYW1lSGFuZGxlci5nZW5IYW5kbGUodXNlciwge30pO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGV4dCA9PT0gJ3Rva2VuJykge1xuICAgICAgYXdhaXQgU2hvd01lc3NlbmdlcldlYnZpZXdUb2tlbkhhbmRsZXIuZ2VuSGFuZGxlKHVzZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoUGFyc2VVdGlsLmlzVW5kb0NvbW1hbmQodGV4dCkpIHtcbiAgICAgIGF3YWl0IFVuZG9Nb3ZlSGFuZGxlci5nZW5IYW5kbGUodXNlciwge30pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBwb3NpdGlvbjtcbiAgICB0cnkge1xuICAgICAgcG9zaXRpb24gPSBQYXJzZVV0aWwucGFyc2VQb3NpdGlvblRleHQodGV4dCk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBCb3Quc2VuZEJ1dHRvbnMoXG4gICAgICAgIHVzZXIuZ2V0RkJJRCgpLFxuICAgICAgICBnb3QoJ3R5cGVkRXhjZXB0aW9uLm5vdFByb3Blck1vdmUnLCB1c2VyLmdldExhbmd1YWdlKCkpLFxuICAgICAgICBbXG4gICAgICAgICAgY3JlYXRlUG9zdGJhY2tCdXR0b24oZ290KCdidXR0b24uaGVscE1lbnUnLCB1c2VyLmdldExhbmd1YWdlKCkpLCBQb3N0QmFja1R5cGVzLlNFRV9IRUxQKSxcbiAgICAgICAgXSxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZGVmYXVsdCB0byBoYW5kbGUgcGxheSBNb3ZlXG4gICAgYXdhaXQgUGxheU1vdmVIYW5kbGVyLmdlbkhhbmRsZSh1c2VyLCB7cG9zaXRpb259KTtcblxuICAgIC8vIFNlZSBpZiB0aGUgb3Bwb25lbnQgaXMgQUksIGFuZCBpdCdzIEFJJ3MgdHVyblxuICAgIGNvbnN0IGdhbWUgPSB1c2VyLmdldEN1cnJlbnRHYW1lKCk7XG4gICAgY29uc3Qgb3Bwb25lbnRVc2VyID0gYXdhaXQgZ2FtZS5nZW5PcHBvbmVudFVzZXIodXNlci5nZXRJRCgpKTtcbiAgICBpZiAob3Bwb25lbnRVc2VyLmdldElzQUkoKSAmJiAhZ2FtZS5pc1VzZXJUdXJuKHVzZXIuZ2V0SUQoKSkpIHtcbiAgICAgIGF3YWl0IFBsYXlNb3ZlSGFuZGxlci5nZW5BSUhhbmRsZShvcHBvbmVudFVzZXIsIGdhbWUpO1xuICAgIH1cbiAgfSxcbn07XG4vKlxuYXN5bmMgZnVuY3Rpb24gYmFja2ZpbGwoKSB7XG4gIGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlci5nZW5BbGwoKTtcbiAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgIGlmICh1c2VyLmdldEZpcnN0TmFtZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHVzZXIuZ2V0SUQoKSwgdXNlci5nZXRGQklEKCkpO1xuICAgIEJvdC5nZXRVc2VyUHJvZmlsZSh1c2VyLmdldEZCSUQoKSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdXNlci5zZXRGaXJzdE5hbWUoZGF0YS5maXJzdF9uYW1lKTtcbiAgICAgIHVzZXIuc2V0TGFzdE5hbWUoZGF0YS5sYXN0X25hbWUpO1xuICAgICAgdXNlci5zZXRQcm9maWxlUGljKGRhdGEucHJvZmlsZV9waWMpO1xuICAgICAgdXNlci5zZXRMb2NhbGUoZGF0YS5sb2NhbGUpO1xuICAgICAgdXNlci5nZW5TYXZlKCkuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlKSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH0pO1xuICB9KTtcbn1cbiovXG5cbmNvbnN0IFJlc3BvbnNlSGFuZGxlciA9IHtcbiAgYXN5bmMgaGFuZGxlVGV4dChzZW5kZXJJRDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpbmZvKCdSZWNlaXZlIGZyb20gJyArIHNlbmRlcklEICsgJywgdGV4dDogJyArIHRleHQpO1xuICAgIEJvdC5zYXZlU2VuZGVyTWVzc2FnZVRvTG9jYWxDaGF0KHNlbmRlcklELCB0ZXh0KTtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmdlbk9yQ3JlYXRlQnlGQklEKHNlbmRlcklEKTtcblxuICAgIChuZXcgTG9nZ2VyKHVzZXIpKVxuICAgICAgLnNldEV2ZW50KExvZ2dpbmdFdmVudC5URVhUX1NFTkQpXG4gICAgICAuc2V0RXh0cmFEYXRhKHt0ZXh0fSlcbiAgICAgIC5sb2coKTtcblxuICAgIGlmICh1c2VyLmlzUGxheWluZygpKSB7XG4gICAgICBhd2FpdCB0ZXh0UmVzcG9uc2VIYW5kbGVyLl9oYW5kbGVJbkdhbWUodXNlciwgdGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRleHRSZXNwb25zZUhhbmRsZXIuX2hhbmRsZU5vcm1hbCh1c2VyLCB0ZXh0KTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgaGFuZGxlQXR0YWNobWVudChzZW5kZXJJRDogc3RyaW5nLCBhdHRhY2htZW50czogQXJyYXk8T2JqZWN0Pik6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIG5vIG1hdHRlciB3aGF0IHRoZSBhdHRhY2htZW50cyBhcmUsIHdlIGFsd2F5cyBzaG93IHRoZSBoZWxwIG1lbnVcbiAgICBpbmZvKCdSZWNlaXZlIGZyb20gJyArIHNlbmRlcklEICsgJywgYXR0YWNobWVudHMnKTtcbiAgICBpbmZvKGF0dGFjaG1lbnRzKTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5nZW5PckNyZWF0ZUJ5RkJJRChzZW5kZXJJRCk7XG4gICAgYXdhaXQgUG9zdEJhY2tIYW5kbGVyc1tQb3N0QmFja1R5cGVzLlNFRV9IRUxQXS5nZW5IYW5kbGUodXNlcik7XG4gIH0sXG5cbiAgYXN5bmMgaGFuZGxlUG9zdGJhY2soc2VuZGVySUQ6IHN0cmluZywgcGF5bG9hZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaW5mbygnUmVjZWl2ZSBwb3N0YmFjayBmcm9tICcgKyBzZW5kZXJJRCArICcsIHBheWxvYWQ6ICcgKyBwYXlsb2FkKTtcbiAgICBsZXQgcGFyYW1zID0gcGF5bG9hZC5zcGxpdCgnOicpO1xuICAgIGNvbnN0IHBheWxvYWRUeXBlID0gcGFyYW1zLnNoaWZ0KCk7XG4gICAgaWYgKCEocGF5bG9hZFR5cGUgaW4gUG9zdEJhY2tUeXBlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZ2VuT3JDcmVhdGVCeUZCSUQoc2VuZGVySUQpO1xuXG4gICAgKG5ldyBMb2dnZXIodXNlcikpXG4gICAgICAuc2V0RXZlbnQoTG9nZ2luZ0V2ZW50LlBPU1RfQkFDS19TRU5EKVxuICAgICAgLnNldEV4dHJhRGF0YSh7cGF5bG9hZH0pXG4gICAgICAubG9nKCk7XG5cbiAgICBpZiAocGF5bG9hZFR5cGUgaW4gUG9zdEJhY2tIYW5kbGVycykge1xuICAgICAgY29uc3QgaGFuZGxlciA9IFBvc3RCYWNrSGFuZGxlcnNbcGF5bG9hZFR5cGVdO1xuICAgICAgY29uc3QgcGFyYW1PYmplY3QgPSBoYW5kbGVyLmdldFBhcmFtT2JqZWN0RnJvbVBvc3RiYWNrKHBhcmFtcyk7XG4gICAgICBhd2FpdCBoYW5kbGVyLmdlbkhhbmRsZSh1c2VyLCBwYXJhbU9iamVjdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXNwb25zZUhhbmRsZXI7XG4iXX0=
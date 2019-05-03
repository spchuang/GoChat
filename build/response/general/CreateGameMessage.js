'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _Game = require('../../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _PostBackUtils = require('../PostBackUtils');

var _Translator = require('../../translations/Translator');

var _Logger = require('../../logging/Logger');

var _LoggingEnums = require('../../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateGameMessage = {
  genSend: function genSend(game) {
    var _this = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
      var _ref, _ref2, blackUser, whiteUser, imageURL, nextColor, selfEnemy, blackFocusedOnGame, blackMessage, enemy, whiteFocusedOnGame, whiteMessage;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _bluebird2.default.all([game.genBlackUser(), game.genWhiteUser(), game.genBoardImageURL()]);

            case 2:
              _ref = _context.sent;
              _ref2 = _slicedToArray(_ref, 3);
              blackUser = _ref2[0];
              whiteUser = _ref2[1];
              imageURL = _ref2[2];
              nextColor = game.getCurrentMoveColorText();
              selfEnemy = game.isSelfPlayingGame() ? (0, _Translator.got)('inGameMessage.self', blackUser.getLanguage()) : whiteUser.getFirstName();
              blackFocusedOnGame = blackUser.getCurrentGameID() === game.getID();
              blackMessage = (0, _Translator.got)('inGameMessage.startNewGame', blackUser.getLanguage(), {
                nextColor: (0, _Translator.got)(nextColor, blackUser.getLanguage()),
                enemy: selfEnemy,
                nextUser: game.getIsBlackTurn() ? (0, _Translator.got)('You', blackUser.getLanguage()) : game.isSelfPlayingGame() ? (0, _Translator.got)('You', blackUser.getLanguage()) : whiteUser.getFirstName()
              });

              (0, _PostBackUtils.sendFocusedGameMessage)(blackUser, game, blackMessage, blackFocusedOnGame);
              _fbLocalChatBot2.default.sendImage(blackUser.getFBID(), imageURL);

              if (!game.isSelfPlayingGame()) {
                enemy = blackUser.getFirstName();
                whiteFocusedOnGame = whiteUser.getCurrentGameID() === game.getID();
                whiteMessage = (0, _Translator.got)('inGameMessage.startNewGame', whiteUser.getLanguage(), {
                  nextColor: (0, _Translator.got)(nextColor, whiteUser.getLanguage()),
                  enemy: enemy,
                  nextUser: game.getIsBlackTurn() ? enemy : (0, _Translator.got)('You', whiteUser.getLanguage())
                });

                (0, _PostBackUtils.sendFocusedGameMessage)(whiteUser, game, whiteMessage, whiteFocusedOnGame);
                _fbLocalChatBot2.default.sendImage(whiteUser.getFBID(), imageURL);

                new _Logger.Logger(whiteUser).setEvent(_LoggingEnums.LoggingEvent.CREATE_GAME).setTargetClass(_LoggingEnums.LoggingTargetClass.GAME).setTargetID(game.getID()).log();
              }

              new _Logger.Logger(blackUser).setEvent(_LoggingEnums.LoggingEvent.CREATE_GAME).setTargetClass(_LoggingEnums.LoggingTargetClass.GAME).setTargetID(game.getID()).log();

              return _context.abrupt('return', game);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

module.exports = CreateGameMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXNwb25zZS9nZW5lcmFsL0NyZWF0ZUdhbWVNZXNzYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxvQkFBb0I7QUFDbEIsU0FEa0IsbUJBQ1YsSUFEVSxFQUNxQjtBQUFBOztBQUFBO0FBQUEsdUJBQ3BDLFNBRG9DLEVBQ3pCLFNBRHlCLEVBQ2QsUUFEYyxFQU9yQyxTQVBxQyxFQVFyQyxTQVJxQyxFQVdyQyxrQkFYcUMsRUFZckMsWUFacUMsRUEyQm5DLEtBM0JtQyxFQTRCbkMsa0JBNUJtQyxFQTZCbkMsWUE3Qm1DOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDSSxtQkFBUSxHQUFSLENBQVksQ0FDekQsS0FBSyxZQUFMLEVBRHlELEVBRXpELEtBQUssWUFBTCxFQUZ5RCxFQUd6RCxLQUFLLGdCQUFMLEVBSHlELENBQVosQ0FESjs7QUFBQTtBQUFBO0FBQUE7QUFDcEMsdUJBRG9DO0FBQ3pCLHVCQUR5QjtBQUNkLHNCQURjO0FBT3JDLHVCQVBxQyxHQU96QixLQUFLLHVCQUFMLEVBUHlCO0FBUXJDLHVCQVJxQyxHQVF6QixLQUFLLGlCQUFMLEtBQ2QscUJBQUksb0JBQUosRUFBMEIsVUFBVSxXQUFWLEVBQTFCLENBRGMsR0FFZCxVQUFVLFlBQVYsRUFWdUM7QUFXckMsZ0NBWHFDLEdBV2hCLFVBQVUsZ0JBQVYsT0FBaUMsS0FBSyxLQUFMLEVBWGpCO0FBWXJDLDBCQVpxQyxHQVl0QixxQkFDbkIsNEJBRG1CLEVBRW5CLFVBQVUsV0FBVixFQUZtQixFQUduQjtBQUNFLDJCQUFXLHFCQUFJLFNBQUosRUFBZSxVQUFVLFdBQVYsRUFBZixDQURiO0FBRUUsdUJBQU8sU0FGVDtBQUdFLDBCQUFVLEtBQUssY0FBTCxLQUNOLHFCQUFJLEtBQUosRUFBVyxVQUFVLFdBQVYsRUFBWCxDQURNLEdBRU4sS0FBSyxpQkFBTCxLQUEyQixxQkFBSSxLQUFKLEVBQVcsVUFBVSxXQUFWLEVBQVgsQ0FBM0IsR0FBaUUsVUFBVSxZQUFWO0FBTHZFLGVBSG1CLENBWnNCOztBQXVCM0MseURBQXVCLFNBQXZCLEVBQWtDLElBQWxDLEVBQXdDLFlBQXhDLEVBQXNELGtCQUF0RDtBQUNBLHVDQUFJLFNBQUosQ0FBYyxVQUFVLE9BQVYsRUFBZCxFQUFtQyxRQUFuQzs7QUFFQSxrQkFBSSxDQUFDLEtBQUssaUJBQUwsRUFBTCxFQUErQjtBQUN2QixxQkFEdUIsR0FDZixVQUFVLFlBQVYsRUFEZTtBQUV2QixrQ0FGdUIsR0FFRixVQUFVLGdCQUFWLE9BQWlDLEtBQUssS0FBTCxFQUYvQjtBQUd2Qiw0QkFIdUIsR0FHUixxQkFDbkIsNEJBRG1CLEVBRW5CLFVBQVUsV0FBVixFQUZtQixFQUduQjtBQUNFLDZCQUFXLHFCQUFJLFNBQUosRUFBZSxVQUFVLFdBQVYsRUFBZixDQURiO0FBRUUsOEJBRkY7QUFHRSw0QkFBVSxLQUFLLGNBQUwsS0FDTixLQURNLEdBRU4scUJBQUksS0FBSixFQUFXLFVBQVUsV0FBVixFQUFYO0FBTE4saUJBSG1CLENBSFE7O0FBYzdCLDJEQUF1QixTQUF2QixFQUFrQyxJQUFsQyxFQUF3QyxZQUF4QyxFQUFzRCxrQkFBdEQ7QUFDQSx5Q0FBSSxTQUFKLENBQWMsVUFBVSxPQUFWLEVBQWQsRUFBbUMsUUFBbkM7O0FBRUMsbUNBQVcsU0FBWCxDQUFELENBQ0csUUFESCxDQUNZLDJCQUFhLFdBRHpCLEVBRUcsY0FGSCxDQUVrQixpQ0FBbUIsSUFGckMsRUFHRyxXQUhILENBR2UsS0FBSyxLQUFMLEVBSGYsRUFJRyxHQUpIO0FBS0Q7O0FBRUEsaUNBQVcsU0FBWCxDQUFELENBQ0csUUFESCxDQUNZLDJCQUFhLFdBRHpCLEVBRUcsY0FGSCxDQUVrQixpQ0FBbUIsSUFGckMsRUFHRyxXQUhILENBR2UsS0FBSyxLQUFMLEVBSGYsRUFJRyxHQUpIOztBQWxEMkMsK0NBd0RwQyxJQXhEb0M7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5RDVDO0FBMUR1QixDQUExQjs7QUE2REEsT0FBTyxPQUFQLEdBQWlCLGlCQUFqQiIsImZpbGUiOiJDcmVhdGVHYW1lTWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCBCb3QgZnJvbSAnZmItbG9jYWwtY2hhdC1ib3QnO1xuaW1wb3J0IEdvR2FtZSBmcm9tICcuLi8uLi9jbGFzcy9HYW1lJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7c2VuZEZvY3VzZWRHYW1lTWVzc2FnZX0gZnJvbSAnLi4vUG9zdEJhY2tVdGlscyc7XG5pbXBvcnQge2dvdH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0b3InO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4uLy4uL2xvZ2dpbmcvTG9nZ2VyJztcbmltcG9ydCB7TG9nZ2luZ0V2ZW50LCBMb2dnaW5nVGFyZ2V0Q2xhc3N9IGZyb20gJy4uLy4uL2xvZ2dpbmcvTG9nZ2luZ0VudW1zJztcblxuY29uc3QgQ3JlYXRlR2FtZU1lc3NhZ2UgPSB7XG4gIGFzeW5jIGdlblNlbmQoZ2FtZTogR29HYW1lKTogUHJvbWlzZTxHb0dhbWU+IHtcbiAgICBjb25zdCBbYmxhY2tVc2VyLCB3aGl0ZVVzZXIsIGltYWdlVVJMXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGdhbWUuZ2VuQmxhY2tVc2VyKCksXG4gICAgICBnYW1lLmdlbldoaXRlVXNlcigpLFxuICAgICAgZ2FtZS5nZW5Cb2FyZEltYWdlVVJMKCksXG4gICAgXSk7XG5cbiAgICBjb25zdCBuZXh0Q29sb3IgPSBnYW1lLmdldEN1cnJlbnRNb3ZlQ29sb3JUZXh0KCk7XG4gICAgY29uc3Qgc2VsZkVuZW15ID0gZ2FtZS5pc1NlbGZQbGF5aW5nR2FtZSgpXG4gICAgICA/IGdvdCgnaW5HYW1lTWVzc2FnZS5zZWxmJywgYmxhY2tVc2VyLmdldExhbmd1YWdlKCkpXG4gICAgICA6IHdoaXRlVXNlci5nZXRGaXJzdE5hbWUoKTtcbiAgICBjb25zdCBibGFja0ZvY3VzZWRPbkdhbWUgPSBibGFja1VzZXIuZ2V0Q3VycmVudEdhbWVJRCgpID09PSBnYW1lLmdldElEKCk7XG4gICAgY29uc3QgYmxhY2tNZXNzYWdlID0gZ290KFxuICAgICAgJ2luR2FtZU1lc3NhZ2Uuc3RhcnROZXdHYW1lJyxcbiAgICAgIGJsYWNrVXNlci5nZXRMYW5ndWFnZSgpLFxuICAgICAge1xuICAgICAgICBuZXh0Q29sb3I6IGdvdChuZXh0Q29sb3IsIGJsYWNrVXNlci5nZXRMYW5ndWFnZSgpKSxcbiAgICAgICAgZW5lbXk6IHNlbGZFbmVteSxcbiAgICAgICAgbmV4dFVzZXI6IGdhbWUuZ2V0SXNCbGFja1R1cm4oKVxuICAgICAgICAgID8gZ290KCdZb3UnLCBibGFja1VzZXIuZ2V0TGFuZ3VhZ2UoKSlcbiAgICAgICAgICA6IGdhbWUuaXNTZWxmUGxheWluZ0dhbWUoKSA/IGdvdCgnWW91JywgYmxhY2tVc2VyLmdldExhbmd1YWdlKCkpIDogd2hpdGVVc2VyLmdldEZpcnN0TmFtZSgpLFxuICAgICAgfSxcbiAgICApO1xuICAgIHNlbmRGb2N1c2VkR2FtZU1lc3NhZ2UoYmxhY2tVc2VyLCBnYW1lLCBibGFja01lc3NhZ2UsIGJsYWNrRm9jdXNlZE9uR2FtZSk7XG4gICAgQm90LnNlbmRJbWFnZShibGFja1VzZXIuZ2V0RkJJRCgpLCBpbWFnZVVSTCk7XG5cbiAgICBpZiAoIWdhbWUuaXNTZWxmUGxheWluZ0dhbWUoKSkge1xuICAgICAgY29uc3QgZW5lbXkgPSBibGFja1VzZXIuZ2V0Rmlyc3ROYW1lKCk7XG4gICAgICBjb25zdCB3aGl0ZUZvY3VzZWRPbkdhbWUgPSB3aGl0ZVVzZXIuZ2V0Q3VycmVudEdhbWVJRCgpID09PSBnYW1lLmdldElEKCk7XG4gICAgICBjb25zdCB3aGl0ZU1lc3NhZ2UgPSBnb3QoXG4gICAgICAgICdpbkdhbWVNZXNzYWdlLnN0YXJ0TmV3R2FtZScsXG4gICAgICAgIHdoaXRlVXNlci5nZXRMYW5ndWFnZSgpLFxuICAgICAgICB7XG4gICAgICAgICAgbmV4dENvbG9yOiBnb3QobmV4dENvbG9yLCB3aGl0ZVVzZXIuZ2V0TGFuZ3VhZ2UoKSksXG4gICAgICAgICAgZW5lbXksXG4gICAgICAgICAgbmV4dFVzZXI6IGdhbWUuZ2V0SXNCbGFja1R1cm4oKVxuICAgICAgICAgICAgPyBlbmVteVxuICAgICAgICAgICAgOiBnb3QoJ1lvdScsIHdoaXRlVXNlci5nZXRMYW5ndWFnZSgpKSxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICBzZW5kRm9jdXNlZEdhbWVNZXNzYWdlKHdoaXRlVXNlciwgZ2FtZSwgd2hpdGVNZXNzYWdlLCB3aGl0ZUZvY3VzZWRPbkdhbWUpO1xuICAgICAgQm90LnNlbmRJbWFnZSh3aGl0ZVVzZXIuZ2V0RkJJRCgpLCBpbWFnZVVSTCk7XG5cbiAgICAgIChuZXcgTG9nZ2VyKHdoaXRlVXNlcikpXG4gICAgICAgIC5zZXRFdmVudChMb2dnaW5nRXZlbnQuQ1JFQVRFX0dBTUUpXG4gICAgICAgIC5zZXRUYXJnZXRDbGFzcyhMb2dnaW5nVGFyZ2V0Q2xhc3MuR0FNRSlcbiAgICAgICAgLnNldFRhcmdldElEKGdhbWUuZ2V0SUQoKSlcbiAgICAgICAgLmxvZygpO1xuICAgIH1cblxuICAgIChuZXcgTG9nZ2VyKGJsYWNrVXNlcikpXG4gICAgICAuc2V0RXZlbnQoTG9nZ2luZ0V2ZW50LkNSRUFURV9HQU1FKVxuICAgICAgLnNldFRhcmdldENsYXNzKExvZ2dpbmdUYXJnZXRDbGFzcy5HQU1FKVxuICAgICAgLnNldFRhcmdldElEKGdhbWUuZ2V0SUQoKSlcbiAgICAgIC5sb2coKTtcblxuICAgIHJldHVybiBnYW1lO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDcmVhdGVHYW1lTWVzc2FnZTtcbiJdfQ==
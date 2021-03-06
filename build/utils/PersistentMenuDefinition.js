

'use strict';

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _Translator = require('../translations/Translator');

var _PostBackUtils = require('../response/PostBackUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPersistentMenu(locale, lan) {
  return _fbLocalChatBot2.default.createPersistentMenu(locale, false, /* composerInputDisabled */
  [_fbLocalChatBot2.default.createPostbackButton((0, _Translator.got)('button.helpMenu', lan), _PostBackUtils.PostBackTypes.SEE_HELP), _fbLocalChatBot2.default.createNestedMenuItem((0, _Translator.got)('persistedMenu.generalTopMenu', lan), [(0, _PostBackUtils.getCreateGameURLButton)(lan), (0, _PostBackUtils.getJoinGameURLButton)(lan), _fbLocalChatBot2.default.createPostbackButton((0, _Translator.got)('button.showActiveGames', lan), _PostBackUtils.PostBackTypes.SHOW_ACTIVE_GAMES), _fbLocalChatBot2.default.createPostbackButton((0, _Translator.got)('button.gameHistory', lan), _PostBackUtils.PostBackTypes.SHOW_GAME_HISTORY), _fbLocalChatBot2.default.createNestedMenuItem((0, _Translator.got)('persistedMenu.more', lan), [_fbLocalChatBot2.default.createPostbackButton((0, _Translator.got)('button.share', lan), _PostBackUtils.PostBackTypes.SHARE), _fbLocalChatBot2.default.createPostbackButton((0, _Translator.got)('button.setLanguage', lan), _PostBackUtils.PostBackTypes.SHOW_LANGUAGES)])]), _fbLocalChatBot2.default.createNestedMenuItem((0, _Translator.got)('persistedMenu.currentGameMenu', lan), [_fbLocalChatBot2.default.createPostbackButton((0, _Translator.got)('button.showCurrentBoard', lan), _PostBackUtils.PostBackTypes.SHOW_CURRENT_GAME_STATUS), (0, _PostBackUtils.getSimulateBoardURLButton)(lan), (0, _PostBackUtils.getMessageURLButton)((0, _Translator.got)('button.sendMessage', lan), lan), _fbLocalChatBot2.default.createPostbackButton((0, _Translator.got)('button.undoMove', lan), _PostBackUtils.PostBackTypes.UNDO_MOVE), _fbLocalChatBot2.default.createPostbackButton((0, _Translator.got)('button.passMove', lan), _PostBackUtils.PostBackTypes.PASS_MOVE)])]);
}

module.exports = {
  getMenus: function getMenus() {
    // Match TranslationConstants
    var locales = [{
      name: 'default',
      lan: 'en'
    }, {
      name: 'zh_tw',
      lan: 'zh_tw'
    }, {
      name: 'zh_cn',
      lan: 'zh_cn'
    }, {
      name: 'ja_jp',
      lan: 'jp'
    }];
    return locales.map(function (locale) {
      return getPersistentMenu(locale.name, locale.lan);
    });
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9QZXJzaXN0ZW50TWVudURlZmluaXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBU0EsU0FBUyxpQkFBVCxDQUEyQixNQUEzQixFQUEyQyxHQUEzQyxFQUFnRTtBQUM5RCxTQUFPLHlCQUFJLG9CQUFKLENBQ0wsTUFESyxFQUVMLEtBRkssRTtBQUdMLEdBQ0UseUJBQUksb0JBQUosQ0FBeUIscUJBQUksaUJBQUosRUFBdUIsR0FBdkIsQ0FBekIsRUFBc0QsNkJBQWMsUUFBcEUsQ0FERixFQUVFLHlCQUFJLG9CQUFKLENBQXlCLHFCQUFJLDhCQUFKLEVBQW9DLEdBQXBDLENBQXpCLEVBQW1FLENBQ2pFLDJDQUF1QixHQUF2QixDQURpRSxFQUVqRSx5Q0FBcUIsR0FBckIsQ0FGaUUsRUFHakUseUJBQUksb0JBQUosQ0FBeUIscUJBQUksd0JBQUosRUFBOEIsR0FBOUIsQ0FBekIsRUFBNkQsNkJBQWMsaUJBQTNFLENBSGlFLEVBSWpFLHlCQUFJLG9CQUFKLENBQXlCLHFCQUFJLG9CQUFKLEVBQTBCLEdBQTFCLENBQXpCLEVBQXlELDZCQUFjLGlCQUF2RSxDQUppRSxFQUtqRSx5QkFBSSxvQkFBSixDQUF5QixxQkFBSSxvQkFBSixFQUEwQixHQUExQixDQUF6QixFQUF5RCxDQUN2RCx5QkFBSSxvQkFBSixDQUF5QixxQkFBSSxjQUFKLEVBQW9CLEdBQXBCLENBQXpCLEVBQW1ELDZCQUFjLEtBQWpFLENBRHVELEVBRXZELHlCQUFJLG9CQUFKLENBQXlCLHFCQUFJLG9CQUFKLEVBQTBCLEdBQTFCLENBQXpCLEVBQXlELDZCQUFjLGNBQXZFLENBRnVELENBQXpELENBTGlFLENBQW5FLENBRkYsRUFZRSx5QkFBSSxvQkFBSixDQUF5QixxQkFBSSwrQkFBSixFQUFxQyxHQUFyQyxDQUF6QixFQUFvRSxDQUNsRSx5QkFBSSxvQkFBSixDQUF5QixxQkFBSSx5QkFBSixFQUErQixHQUEvQixDQUF6QixFQUE4RCw2QkFBYyx3QkFBNUUsQ0FEa0UsRUFFbEUsOENBQTBCLEdBQTFCLENBRmtFLEVBR2xFLHdDQUFvQixxQkFBSSxvQkFBSixFQUEwQixHQUExQixDQUFwQixFQUFvRCxHQUFwRCxDQUhrRSxFQUlsRSx5QkFBSSxvQkFBSixDQUF5QixxQkFBSSxpQkFBSixFQUF1QixHQUF2QixDQUF6QixFQUFzRCw2QkFBYyxTQUFwRSxDQUprRSxFQUtsRSx5QkFBSSxvQkFBSixDQUF5QixxQkFBSSxpQkFBSixFQUF1QixHQUF2QixDQUF6QixFQUFzRCw2QkFBYyxTQUFwRSxDQUxrRSxDQUFwRSxDQVpGLENBSEssQ0FBUDtBQXdCRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUI7QUFDZixZQUFVLG9CQUEwQjs7QUFFbEMsUUFBTSxVQUFVLENBQ2Q7QUFDRSxZQUFNLFNBRFI7QUFFRSxXQUFLO0FBRlAsS0FEYyxFQUtkO0FBQ0UsWUFBTSxPQURSO0FBRUUsV0FBSztBQUZQLEtBTGMsRUFTZDtBQUNFLFlBQU0sT0FEUjtBQUVFLFdBQUs7QUFGUCxLQVRjLEVBYWQ7QUFDRSxZQUFNLE9BRFI7QUFFRSxXQUFLO0FBRlAsS0FiYyxDQUFoQjtBQWtCQSxXQUFPLFFBQVEsR0FBUixDQUFZO0FBQUEsYUFBVSxrQkFBa0IsT0FBTyxJQUF6QixFQUErQixPQUFPLEdBQXRDLENBQVY7QUFBQSxLQUFaLENBQVA7QUFDRDtBQXRCYyxDQUFqQiIsImZpbGUiOiJQZXJzaXN0ZW50TWVudURlZmluaXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCb3QgZnJvbSAnZmItbG9jYWwtY2hhdC1ib3QnO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCB7XG4gIFBvc3RCYWNrVHlwZXMsXG4gIGNyZWF0ZVBvc3RiYWNrQnV0dG9uLFxuICBnZXRDcmVhdGVHYW1lVVJMQnV0dG9uLFxuICBnZXRKb2luR2FtZVVSTEJ1dHRvbixcbiAgZ2V0TWVzc2FnZVVSTEJ1dHRvbixcbiAgZ2V0U2ltdWxhdGVCb2FyZFVSTEJ1dHRvbixcbn0gZnJvbSAnLi4vcmVzcG9uc2UvUG9zdEJhY2tVdGlscyc7XG5cbmZ1bmN0aW9uIGdldFBlcnNpc3RlbnRNZW51KGxvY2FsZTogc3RyaW5nLCBsYW46IHN0cmluZyk6IE9iamVjdCB7XG4gIHJldHVybiBCb3QuY3JlYXRlUGVyc2lzdGVudE1lbnUoXG4gICAgbG9jYWxlLFxuICAgIGZhbHNlLCAvKiBjb21wb3NlcklucHV0RGlzYWJsZWQgKi9cbiAgICBbXG4gICAgICBCb3QuY3JlYXRlUG9zdGJhY2tCdXR0b24oZ290KCdidXR0b24uaGVscE1lbnUnLCBsYW4pLCBQb3N0QmFja1R5cGVzLlNFRV9IRUxQKSxcbiAgICAgIEJvdC5jcmVhdGVOZXN0ZWRNZW51SXRlbShnb3QoJ3BlcnNpc3RlZE1lbnUuZ2VuZXJhbFRvcE1lbnUnLCBsYW4pLCBbXG4gICAgICAgIGdldENyZWF0ZUdhbWVVUkxCdXR0b24obGFuKSxcbiAgICAgICAgZ2V0Sm9pbkdhbWVVUkxCdXR0b24obGFuKSxcbiAgICAgICAgQm90LmNyZWF0ZVBvc3RiYWNrQnV0dG9uKGdvdCgnYnV0dG9uLnNob3dBY3RpdmVHYW1lcycsIGxhbiksIFBvc3RCYWNrVHlwZXMuU0hPV19BQ1RJVkVfR0FNRVMpLFxuICAgICAgICBCb3QuY3JlYXRlUG9zdGJhY2tCdXR0b24oZ290KCdidXR0b24uZ2FtZUhpc3RvcnknLCBsYW4pLCBQb3N0QmFja1R5cGVzLlNIT1dfR0FNRV9ISVNUT1JZKSxcbiAgICAgICAgQm90LmNyZWF0ZU5lc3RlZE1lbnVJdGVtKGdvdCgncGVyc2lzdGVkTWVudS5tb3JlJywgbGFuKSwgW1xuICAgICAgICAgIEJvdC5jcmVhdGVQb3N0YmFja0J1dHRvbihnb3QoJ2J1dHRvbi5zaGFyZScsIGxhbiksIFBvc3RCYWNrVHlwZXMuU0hBUkUpLFxuICAgICAgICAgIEJvdC5jcmVhdGVQb3N0YmFja0J1dHRvbihnb3QoJ2J1dHRvbi5zZXRMYW5ndWFnZScsIGxhbiksIFBvc3RCYWNrVHlwZXMuU0hPV19MQU5HVUFHRVMpLFxuICAgICAgICBdKSxcbiAgICAgIF0pLFxuICAgICAgQm90LmNyZWF0ZU5lc3RlZE1lbnVJdGVtKGdvdCgncGVyc2lzdGVkTWVudS5jdXJyZW50R2FtZU1lbnUnLCBsYW4pLCBbXG4gICAgICAgIEJvdC5jcmVhdGVQb3N0YmFja0J1dHRvbihnb3QoJ2J1dHRvbi5zaG93Q3VycmVudEJvYXJkJywgbGFuKSwgUG9zdEJhY2tUeXBlcy5TSE9XX0NVUlJFTlRfR0FNRV9TVEFUVVMpLFxuICAgICAgICBnZXRTaW11bGF0ZUJvYXJkVVJMQnV0dG9uKGxhbiksXG4gICAgICAgIGdldE1lc3NhZ2VVUkxCdXR0b24oZ290KCdidXR0b24uc2VuZE1lc3NhZ2UnLCBsYW4pLCBsYW4pLFxuICAgICAgICBCb3QuY3JlYXRlUG9zdGJhY2tCdXR0b24oZ290KCdidXR0b24udW5kb01vdmUnLCBsYW4pLCBQb3N0QmFja1R5cGVzLlVORE9fTU9WRSksXG4gICAgICAgIEJvdC5jcmVhdGVQb3N0YmFja0J1dHRvbihnb3QoJ2J1dHRvbi5wYXNzTW92ZScsIGxhbiksIFBvc3RCYWNrVHlwZXMuUEFTU19NT1ZFKSxcbiAgICAgIF0pLFxuICAgIF0sXG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRNZW51czogZnVuY3Rpb24oKTogQXJyYXk8T2JqZWN0PiB7XG4gICAgLy8gTWF0Y2ggVHJhbnNsYXRpb25Db25zdGFudHNcbiAgICBjb25zdCBsb2NhbGVzID0gW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnZGVmYXVsdCcsXG4gICAgICAgIGxhbjogJ2VuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICd6aF90dycsXG4gICAgICAgIGxhbjogJ3poX3R3JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICd6aF9jbicsXG4gICAgICAgIGxhbjogJ3poX2NuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdqYV9qcCcsXG4gICAgICAgIGxhbjogJ2pwJyxcbiAgICAgIH0sXG4gICAgXTtcbiAgICByZXR1cm4gbG9jYWxlcy5tYXAobG9jYWxlID0+IGdldFBlcnNpc3RlbnRNZW51KGxvY2FsZS5uYW1lLCBsb2NhbGUubGFuKSk7XG4gIH0sXG59O1xuIl19
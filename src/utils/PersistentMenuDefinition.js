// @flow

'use strict';

import Bot from 'fb-local-chat-bot';
import {got} from '../translations/Translator';
import {
  PostBackTypes,
  createPostbackButton,
  getCreateGameURLButton,
  getJoinGameURLButton,
  getMessageURLButton,
  getSimulateBoardURLButton,
} from '../response/PostBackUtils';

function getPersistentMenu(locale: string, lan: string): Object {
  return Bot.createPersistentMenu(
    locale,
    false, /* composerInputDisabled */
    [
      Bot.createPostbackButton(got('button.helpMenu', lan), PostBackTypes.SEE_HELP),
      Bot.createNestedMenuItem(got('persistedMenu.generalTopMenu', lan), [
        getCreateGameURLButton(lan),
        getJoinGameURLButton(lan),
        Bot.createPostbackButton(got('button.showActiveGames', lan), PostBackTypes.SHOW_ACTIVE_GAMES),
        Bot.createPostbackButton(got('button.gameHistory', lan), PostBackTypes.SHOW_GAME_HISTORY),
        Bot.createNestedMenuItem(got('persistedMenu.more', lan), [
          Bot.createPostbackButton(got('button.share', lan), PostBackTypes.SHARE),
          Bot.createPostbackButton(got('button.setLanguage', lan), PostBackTypes.SHOW_LANGUAGES),
        ]),
      ]),
      Bot.createNestedMenuItem(got('persistedMenu.currentGameMenu', lan), [
        Bot.createPostbackButton(got('button.showCurrentBoard', lan), PostBackTypes.SHOW_CURRENT_GAME_STATUS),
        getSimulateBoardURLButton(lan),
        getMessageURLButton(got('button.sendMessage', lan), lan),
        Bot.createPostbackButton(got('button.undoMove', lan), PostBackTypes.UNDO_MOVE),
        Bot.createPostbackButton(got('button.passMove', lan), PostBackTypes.PASS_MOVE),
      ]),
    ],
  );
}

module.exports = {
  getMenus: function(): Array<Object> {
    // Match TranslationConstants
    const locales = [
      {
        name: 'default',
        lan: 'en',
      },
      {
        name: 'zh_tw',
        lan: 'zh_tw',
      },
      {
        name: 'zh_cn',
        lan: 'zh_cn',
      },
      {
        name: 'ja_jp',
        lan: 'jp',
      },
    ];
    return locales.map(locale => getPersistentMenu(locale.name, locale.lan));
  },
};

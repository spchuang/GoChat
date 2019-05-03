// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import Promise from 'bluebird';
import {PostBackTypes, createQuickReplyButton} from '../PostBackUtils';
import {LANGUAGE_TO_NAME_MAP} from '../../translations/TranslationConstants';
import {got} from '../../translations/Translator';

class ShowLanguagesHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SHOW_LANGUAGES;
  }

  async genHandle(user: User): Promise<void> {
    const postBackButtons = Object.keys(LANGUAGE_TO_NAME_MAP).map((code: string) => {
      return createQuickReplyButton(LANGUAGE_TO_NAME_MAP[code], PostBackTypes.SET_LANGUAGE, [code]);
    });

    Bot.sendQuickReplyWithText(
      user.getFBID(),
      got('normalMessage.whichLanguage', user.getLanguage()),
      postBackButtons,
    );
  }
}

module.exports = new ShowLanguagesHandler();

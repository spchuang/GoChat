// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import Promise from 'bluebird';
import {PostBackTypes, createQuickReplyButton} from '../PostBackUtils';
import {LANGUAGE_TO_NAME_MAP} from '../../translations/TranslationConstants';
import {got} from '../../translations/Translator';

class ShowCannedMessagesHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SHOW_CANNED_MESSAGES;
  }

  async genHandle(user: User): Promise<void> {
    if (!user.isPlaying()) {
      Bot.sendText(user.getFBID(), got('normalMessage.youAreNotPlayingAnyGame', user.getLanguage()));
      return;
    }

    const language = user.getLanguage();
    const buttonKeys = [
      'button.messageHurryUp', 'button.messageGoodMove',
      'button.messageOops', 'button.messageThankYou', 'button.messageGoodGame',
    ];
    const buttons = buttonKeys.map((key) => {
      return createQuickReplyButton(got(key, language), PostBackTypes.SEND_CANNED_MESSAGE, [key]);
    });

    Bot.sendQuickReplyWithText(
      user.getFBID(),
      got('inGameMessage.whatDoYouWantToSay', language),
      buttons,
    );
  }
}

module.exports = new ShowCannedMessagesHandler();

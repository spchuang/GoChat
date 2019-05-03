// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import User from '../../class/User';
import Promise from 'bluebird';
import {sendNormalHelpMenu, PostBackTypes} from '../PostBackUtils';
import {LANGUAGE_TO_NAME_MAP} from '../../translations/TranslationConstants';
import {got} from '../../translations/Translator';
import Bot from 'fb-local-chat-bot';

class PlayAnotherGameHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.PLAY_ANOTHER_GAME;
  }

  async genHandle(user: User): Promise<void> {
    sendNormalHelpMenu(user, got('normalMessage.startAnotherGame', user.getLanguage()));
    Bot.send(user.getFBID(), {sender_action: 'typing_on'});
  }
}

module.exports = new PlayAnotherGameHandler();

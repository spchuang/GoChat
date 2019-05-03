// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import {LANGUAGE_TO_NAME_MAP} from '../../translations/TranslationConstants';
import {got} from '../../translations/Translator';
import EncryptUtils from '../../utils/EncryptUtils';

class ShowMessengerWebviewTokenHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SHOW_MESSENGER_WEBVIEW_TOKEN;
  }

  async genHandle(user: User): Promise<void> {
    const encryptID = EncryptUtils.encrypt(user.getFBID());

    Bot.sendText(
      user.getFBID(),
      got('normalMessage.copyAndPasteToken', user.getLanguage()),
    );

    Bot.sendText(
      user.getFBID(),
      encryptID,
    );
  }
}

module.exports = new ShowMessengerWebviewTokenHandler();

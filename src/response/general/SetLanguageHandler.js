// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import {got} from '../../translations/Translator';
import {Logger} from '../../logging/Logger';
import {LoggingEvent} from '../../logging/LoggingEnums';

type Params = {
  language: string;
};

class SetLanguageHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SET_LANGUAGE;
  }

  getParamObjectFromPostback(paramsArray: Array<string>): Params {
    return {
      language: paramsArray[0],
    };
  }

  async genHandle(user: User, params: Params): Promise<void> {
    user.setLanguage(params.language);
    await user.genSave();

    (new Logger(user))
      .setEvent(LoggingEvent.UPDATE_LANGUAGE)
      .log();

    Bot.sendText(
      user.getFBID(),
      got('normalMessage.languageSaved', user.getLanguage()),
    );
  }
}

module.exports = new SetLanguageHandler();

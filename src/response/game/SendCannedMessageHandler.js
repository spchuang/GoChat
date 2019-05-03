// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import {got} from '../../translations/Translator';

type Params = {
  cannedMessage: string;
};

class SendCannedMessageHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SEND_CANNED_MESSAGE;
  }

  getParamObjectFromPostback(paramsArray: Array<string>): Params {
    return {
      cannedMessage: paramsArray[0],
    };
  }

  async genHandle(user: User, params: Params): Promise<void> {
    if (!user.isPlaying()) {
      Bot.sendText(user.getFBID(), got('normalMessage.youAreNotPlayingAnyGame', user.getLanguage()));
      return;
    }

    const game = user.getCurrentGame();
    // if (game.isSelfPlayingGame()) {
    //   Bot.sendText(user.getFBID(), got('inGameMessage.noSendMessageToSelf', user.getLanguage()));
    //   return;
    // }

    const opponent = await game.genOpponentUser(user.getID());
    const language = opponent.getLanguage();

    Bot.sendText(
      opponent.getFBID(),
      got(
        'inGameMessage.receivedMessageFromOpponent',
        language,
        // $FlowFixMe: dont have a good way to do type conversion
        {enemy: user.getFirstName(), message: got(params.cannedMessage, language)},
      ),
    );
  }
}

module.exports = new SendCannedMessageHandler();

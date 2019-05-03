// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import {LANGUAGE_TO_NAME_MAP} from '../../translations/TranslationConstants';
import S3Utils from '../../utils/S3Utils';

type Params = {
  gameID: number;
};

class ShowCurrentGameStatusHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.DOWNLOAD_SGF;
  }

  getParamObjectFromPostback(paramsArray: Array<string>): Params {
    return {
      gameID: parseInt(paramsArray[0], 10),
    };
  }

  async genHandle(user: User, params: Params): Promise<void> {
    const game = await GoGame.genEnforce(params.gameID)
    if (!game) {
      Bot.sendText(user.getFBID(), 'Game doesn\'t exists');
      return;
    }

    const [sgf, opponentUser] = await Promise.all([
      game.genSGF(),
      game.genOpponentUser(user.getID()),
    ]);

    const fileName = `game-${game.getID()}-${user.getFirstName()}-${opponentUser.getFirstName()}.sgf`;
    const url = await S3Utils.genUploadBuffer(new Buffer(sgf), fileName, 'text/plain');

    Bot.sendFile(user.getFBID(), url);
  }
}

module.exports = new ShowCurrentGameStatusHandler();

// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import {got} from '../../translations/Translator';
import ShowCurrentGameStatusHandler from './ShowCurrentGameStatusHandler';

type Params = {
  gameID: number;
};

class FocusGameHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.FOCUS_ON_GAME;
  }

  getParamObjectFromPostback(paramsArray: Array<string>): Params {
    return {
      gameID: parseInt(paramsArray[0], 10),
    };
  }

  async genHandle(user: User, params: Params): Promise<void> {
    const gameID = params.gameID;
    if (user.getCurrentGameID() === gameID) {
      Bot.sendText(user.getFBID(), got('inGameMessage.alreadyFocusedOnTheGame', user.getLanguage()));
      return;
    }

    const game = await GoGame.genEnforce(gameID);
    if (game.isOver()) {
      return;
    }

    user.setCurrentGameID(gameID);
    await user.genSave();
    await ShowCurrentGameStatusHandler.genHandle(user, {gameID});
  }
}

module.exports = new FocusGameHandler();

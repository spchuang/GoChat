// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {PostBackTypes, getBoardURLButton, createPostbackButton} from '../PostBackUtils';
import {LANGUAGE_TO_NAME_MAP} from '../../translations/TranslationConstants';
import EncryptUtils from '../../utils/EncryptUtils';
import {got} from '../../translations/Translator';
import querystring from 'querystring';

function getDate(date: Date): string {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [date.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('-');
}

class ShowGameHistoryHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SHOW_GAME_HISTORY;
  }

  async genHandle(user: User): Promise<void> {

    let games = await GoGame.genFinishedGamesForUser(user);
    games = games.slice(0, 10); // FB limit to 10 elements

    const encryptID = EncryptUtils.encrypt(user.getFBID());

    const language = user.getLanguage();
    const elementsGen = [];
    for(let i = 0; i < games.length; i++) {
      const gen = async function(): Promise<Object> {
        const game = games[i];
        const gameID = game.getID();
        const [boardURL, opponent] = await Promise.all([
          game.genMiniGameImageURL(),
          game.genOpponentUser(user.getID()),
        ]);

        const opponentName = game.isSelfPlayingGame()
          ? got('inGameMessage.self', user.getLanguage())
          : opponent.getFirstName();

        return Bot.createGenericTemplateElement(
          got('inGameMessage.activeGameElementTitle', language, {opponentName}),
          null,
          null,
          boardURL,
          getDate(game.getUpdatedAt()),
          [
            getBoardURLButton(got('button.replayGame', language), querystring.stringify({u: encryptID, gameID: gameID})),
            createPostbackButton(got('button.downloadSGF', language), PostBackTypes.DOWNLOAD_SGF, [gameID]),
          ]
        );
      }
      elementsGen.push(gen());
    }
    const elements = await Promise.all(elementsGen);
    Bot.sendGenericTemplate(
      user.getFBID(),
      elements,
    );
  }
}

module.exports = new ShowGameHistoryHandler();

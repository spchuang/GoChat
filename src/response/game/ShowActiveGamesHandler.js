// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {PostBackTypes, createPostbackButton} from '../PostBackUtils';
import {LANGUAGE_TO_NAME_MAP} from '../../translations/TranslationConstants';
import {got} from '../../translations/Translator';

class ShowActiveGamesHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SHOW_ACTIVE_GAMES;
  }

  async genHandle(user: User): Promise<void> {
    if (!user.isPlaying()) {
      Bot.sendText(user.getFBID(), got('normalMessage.youAreNotPlayingAnyGame', user.getLanguage()));
      return;
    }

    let activeGames = await GoGame.genActiveGamesForUser(user);
    activeGames = activeGames.slice(0, 10); // FB limit to 10 elements
    const language = user.getLanguage();

    const elementsGen = [];
    for(let i = 0; i < activeGames.length; i++) {
      const gen = async function(): Promise<Object> {
        const game = activeGames[i];
        const gameID = game.getID();
        const [boardURL, opponent] = await Promise.all([
          game.genMiniGameImageURL(),
          game.genOpponentUser(user.getID()),
        ]);

        const opponentName = game.isSelfPlayingGame()
          ? got('inGameMessage.self', user.getLanguage())
          : opponent.getFirstName();
        const focusedMark = gameID === user.getCurrentGameID()
          ? ' 👈 👈 🤔'
          : '';

        return Bot.createGenericTemplateElement(
          got('inGameMessage.activeGameElementTitle', language, {opponentName}) + focusedMark,
          null,
          null,
          boardURL,
          null,
          [
            createPostbackButton(got('button.focusOnGame', language), PostBackTypes.FOCUS_ON_GAME, [gameID]),
            createPostbackButton(got('button.showBoard', language), PostBackTypes.SHOW_CURRENT_GAME_STATUS, [gameID]),
            createPostbackButton(got('button.resignGame', language), PostBackTypes.RESIGN_GAME, [gameID]),
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

module.exports = new ShowActiveGamesHandler();

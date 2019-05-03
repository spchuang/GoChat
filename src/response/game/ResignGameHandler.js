// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {PostBackTypes, sendNormalHelpMenu} from '../PostBackUtils';
import {got} from '../../translations/Translator';
import {Logger} from '../../logging/Logger';
import {LoggingEvent, LoggingTargetClass} from '../../logging/LoggingEnums';

type Params = {
  gameID?: ?number;
};

class ResignGameHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.RESIGN_GAME;
  }

  getParamObjectFromPostback(paramsArray: Array<string>): Params {
    return {
      gameID: parseInt(paramsArray[0], 10),
    };
  }

  async genHandle(user: User, params: Params): Promise<void> {
    const gameID = params.gameID;
    if (!user.isPlaying()) {
      Bot.sendText(user.getFBID(), got('normalMessage.youAreNotPlayingAnyGame', user.getLanguage()));
      return;
    }

    const game = gameID
      ? await GoGame.genEnforce(gameID)
      : user.getCurrentGame();

    if (game.isOver()) {
      return;
    }

    await game.genResignGame(user.getID());
    await this.genSendMessage(game, user);
  }

  async genSendEndGameMessage(user: User): Promise<void> {
    const currentGame = user.getCurrentGame();
    const language = user.getLanguage();

    if (currentGame) {
      const [userActiveGames, userGameOpponent] = await Promise.all([
        GoGame.genActiveGamesForUser(user),
        currentGame.genOpponentUser(user.getID()),
      ]);

      let opponentName = currentGame.isSelfPlayingGame()
        ? got('inGameMessage.self', language)
        : userGameOpponent.getFirstName();

      let activeGameText = '';
      if (userActiveGames.length > 1) {
        activeGameText = got('inGameMessage.activeGameText', language, {numActiveGames: userActiveGames.length});
      }

      Bot.sendText(
        user.getFBID(),
        got('inGameMessage.focusOnGameWith', language, {opponentName}) + ' ' + activeGameText,
      );
    } else {
      sendNormalHelpMenu(
        user,
        got('inGameMessage.notPlayingWhatDoYouWantToDo', language),
      );
    }

    // game complete from counting
    /*
    (new Logger(user))
      .setEvent(LoggingEvent.GAME_FINISH)
      .setTargetClass(LoggingTargetClass.GAME)
      .setTargetID(game.getID())
      .log();
      */
  }

  async genSendMessage(game: GoGame, user: User): Promise<void> {
    Bot.sendText(
      user.getFBID(),
      got('inGameMessage.selfQuitGame', user.getLanguage()),
    );

    user = await User.genByUserID(user.getID());
    await this.genSendEndGameMessage(user);

    if (!game.isSelfPlayingGame()) {
      const opponentUserID = game.getOpponentUserID(user.getID());
      const opponentUser = await User.genByUserID(opponentUserID);

      Bot.sendText(
        opponentUser.getFBID(),
        got('inGameMessage.enemyQuitGame', opponentUser.getLanguage(), {enemy: user.getFirstName()})
      );
      await this.genSendEndGameMessage(opponentUser);
    }
  }
}

module.exports = new ResignGameHandler();

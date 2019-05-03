// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {sendFocusedGameMessage, PostBackTypes, getCountScoreURLButton} from '../PostBackUtils';
import {got} from '../../translations/Translator';
import {Logger} from '../../logging/Logger';
import {LoggingEvent, LoggingTargetClass} from '../../logging/LoggingEnums';

type Params = {
  gameID?: ?number;
};

class PassMoveHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.PASS_MOVE;
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

    if (game.isCountingScore()) {
      return;
    }
    try {
      await game.genPass(user.getID());
    } catch (err) {
      error('An error occured while trying to pass for game: ' + game.getID(), err);

      let errorMessage = got('typedException.invalidMove', user.getLanguage()) + ' ';

      if (err.name === 'TypedError') {
        errorMessage += got(err.getErrorName(), user.getLanguage());
      } else {
        errorMessage += got(err, user.getLanguage());
      }
      Bot.sendText(
        user.getFBID(),
        errorMessage,
      );
      return;
    }
    await this.genSendMessage(game, user);
  }

  async genSendMessage(game: GoGame, user: User): Promise<void> {
    let nextColor = got(game.getCurrentMoveColorText(), user.getLanguage());
    const opponentUser = await game.genOpponentUser(user.getID());

    let firstSentence = got('inGameMessage.selfPassMove', user.getLanguage());
    if (game.isCountingScore()) {
      // enters score counting mode
      const opponentName = game.isSelfPlayingGame()
        ? got('inGameMessage.self', user.getLanguage())
        : opponentUser.getFirstName();

      Bot.sendButtons(
        user.getFBID(),
        firstSentence + ' ' + got('inGameMessage.gameInScoreCounting', user.getLanguage(), {opponentName}),
        [
          getCountScoreURLButton(got('button.countScore', user.getLanguage()), user, {gameID: game.getID()}),
        ],
      );
    } else {
      Bot.sendText(
        user.getFBID(),
        got('inGameMessage.selfPassMove', user.getLanguage()) + ' ' +
          got('inGameMessage.enemyTurnToPlay', user.getLanguage(), {color: nextColor, enemy: opponentUser.getFirstName()}),
      );
    }

    if (game.isSelfPlayingGame()) {
      return;
    }

    const opponentFocusedOnGame = opponentUser.getCurrentGameID() === game.getID();
    firstSentence = got('inGameMessage.enemyPassMove', opponentUser.getLanguage(), {enemy: user.getFirstName()});
    if (game.isCountingScore()) {
      const message = firstSentence + ' ' + got('inGameMessage.gameInScoreCounting', opponentUser.getLanguage(), {opponentName: user.getFirstName()});
      if (opponentFocusedOnGame) {
        Bot.sendButtons(
          opponentUser.getFBID(),
          message,
          [
            getCountScoreURLButton(got('button.countScore', opponentUser.getLanguage()), opponentUser, {gameID: game.getID()}),
          ],
        );
      } else {
        sendFocusedGameMessage(opponentUser, game, message, false);
      }
    } else {
      nextColor = got(game.getCurrentMoveColorText(), opponentUser.getLanguage());
      const message =
        firstSentence + ' ' + got('inGameMessage.selfTurnToPlay', opponentUser.getLanguage(), {color: nextColor});

      sendFocusedGameMessage(opponentUser, game, message, opponentFocusedOnGame);
    }

    (new Logger(user))
      .setEvent(LoggingEvent.GAME_PASS)
      .setTargetClass(LoggingTargetClass.GAME)
      .setTargetID(game.getID())
      .log();
  }
}

module.exports = new PassMoveHandler();

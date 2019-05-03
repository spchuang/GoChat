// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import ParseUtil from '../../utils/ParseUtil';
import Promise from 'bluebird';
import {got} from '../../translations/Translator';
import {sendFocusedGameMessage, getCountScoreURLButton} from '../PostBackUtils';
import GoAIUtils from '../../utils/GoAIUtils';
import {Logger} from '../../logging/Logger';
import {LoggingEvent, LoggingTargetClass} from '../../logging/LoggingEnums';

type Params = {
  position: StonePosition;
};

class PlayMoveHandler extends MessageHandlerBase {
  async genHandle(user: User, params: Params): Promise<void> {
    if (!user.isPlaying()) {
      return;
    }
    var game = user.getCurrentGame();

    if (game.isCountingScore()) {
      const opponentUser = await game.genOpponentUser(user.getID());
      const opponentName = game.isSelfPlayingGame()
        ? got('inGameMessage.self', user.getLanguage())
        : opponentUser.getFirstName();
      Bot.sendButtons(
        user.getFBID(),
        got('inGameMessage.gameInScoreCounting', user.getLanguage(), {opponentName}),
        [
          getCountScoreURLButton(got('button.countScore', user.getLanguage()), user, {gameID: game.getID()}),
        ],
      );
      return;
    }

    if (game.isOver()) {
      return;
    }

    const position = params.position;
    // Need to create exception class for Weiqi: https://github.com/cjlarose/weiqi.js/issues/24
    try {
      await game.genPlay(user.getID(), position);
    } catch (err) {
      error('An error occured while trying to play a stone for game: ' + game.getID(), err);
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
    await this.genSendMessage(game, user, position);
  }

  // We are asking the caller to pass in the game object since from
  // the AI user, we can only get the currentGame but the AI could be
  // playing multiple games at the same time.
  async genAIHandle(AIUser: User, game: GoGame): Promise<void> {
    if (game.isOver()){
      // TODO: think about how end game is handled
      return;
    }

    try {
      const AIMovePosition = await GoAIUtils.genNextMove(game);
      await game.genPlay(AIUser.getID(), AIMovePosition)

      await this.genSendMessage(game, AIUser, AIMovePosition);
    } catch(err) {
      // Catch AI errors
      info('AI move error.')
      info(err)

      /*
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
      */
    }
  }

  async genSendMessage(game: GoGame, user: User, position: StonePosition): Promise<void> {
    const positionText = ParseUtil.convertNumberPositionToString(position);
    const [opponentUser, imageURL] = await Promise.all([
      User.genByUserID(game.getOpponentUserID(user.getID())),
      game.genBoardImageURL(),
    ]);

    let currentColor = got(game.getCurrentMoveColorText(), user.getLanguage());
    let prevColor = got(game.getPreviousMoveColorText(), user.getLanguage());

    const turnToPlayMessage = game.isSelfPlayingGame()
      ? got('inGameMessage.selfTurnToPlay', user.getLanguage(), {color: currentColor})
      : got('inGameMessage.enemyTurnToPlay', user.getLanguage(), {color: currentColor, enemy: opponentUser.getFirstName()})
    Bot.sendText(
      user.getFBID(),
      got('inGameMessage.selfPlayMove', user.getLanguage(), {color: prevColor, positionText: positionText}) + ' ' + turnToPlayMessage,
    );
    Bot.sendImage(user.getFBID(), imageURL);

    if (!game.isSelfPlayingGame()) {
      currentColor = got(game.getCurrentMoveColorText(), opponentUser.getLanguage());
      prevColor = got(game.getPreviousMoveColorText(), opponentUser.getLanguage());
      const message =
        got(
          'inGameMessage.enemyPlayMove',
          opponentUser.getLanguage(),
          {color: prevColor, positionText: positionText, enemy: user.getFirstName()},
        ) + ' ' +
        got(
          'inGameMessage.selfTurnToPlay',
          opponentUser.getLanguage(),
          {color: currentColor},
        );
      const opponentFocusedOnGame = opponentUser.getCurrentGameID() === game.getID();

      sendFocusedGameMessage(opponentUser, game, message, opponentFocusedOnGame);
      Bot.sendImage(opponentUser.getFBID(), imageURL);
    }

    (new Logger(user))
      .setEvent(LoggingEvent.GAME_PLAY_MOVE)
      .setTargetClass(LoggingTargetClass.GAME)
      .setTargetID(game.getID())
      .setExtraData({position})
      .log();
  }
}

module.exports = new PlayMoveHandler();

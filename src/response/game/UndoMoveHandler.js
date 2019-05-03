// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {PostBackTypes, sendFocusedGameMessage} from '../PostBackUtils';
import {got} from '../../translations/Translator';
import ShowCurrentGameStatusHandler from './ShowCurrentGameStatusHandler';
import {Logger} from '../../logging/Logger';
import {LoggingEvent, LoggingTargetClass} from '../../logging/LoggingEnums';

type Params = {
  gameID?: ?number;
};

class UndoMoveHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.UNDO_MOVE;
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

    // silent the the action if user shouldn't be undoing the move (e.g. not his turn)
    if (!game.getCanUserUndo(user.getID())) {
      if (!game.isUserTurn(user.getID())) {
        Bot.sendText(user.getFBID(), got('inGameMessage.notYourTurnToUndo', user.getLanguage()));
      }
      return;
    }

    try {
      await game.genUndo(user.getID());
      await this.genSendMessage(game, user);
    } catch (err) {
      error('An error occured while trying to undo for game: ' + game.getID(), err);
      Bot.sendText(user.getFBID(), got('typedException.undoError', user.getLanguage()));
    }
  }

  async genSendMessage(game: GoGame, user: User): Promise<void> {
    Bot.sendText(user.getFBID(), got('inGameMessage.selfUndoMove', user.getLanguage()));
    await ShowCurrentGameStatusHandler.genHandle(user, {gameID: game.getID()});

    // send message to opponent
    if (!game.isSelfPlayingGame()) {
      const opponentUser = await User.genByUserID(game.getOpponentUserID(user.getID()));
      const opponentFocusedOnGame = opponentUser.getCurrentGameID() === game.getID();
      const opponentColor = got(game.getUserColorText(user.getID()), opponentUser.getLanguage());
      const message = got(
        'inGameMessage.enemyUndoMove',
        opponentUser.getLanguage(),
        {enemy: user.getFirstName(), color: opponentColor},
      );
      sendFocusedGameMessage(opponentUser, game, message, opponentFocusedOnGame);
      await ShowCurrentGameStatusHandler.genHandle(opponentUser, {gameID: game.getID()});
    }

    (new Logger(user))
      .setEvent(LoggingEvent.GAME_UNDO_MOVE)
      .setTargetClass(LoggingTargetClass.GAME)
      .setTargetID(game.getID())
      .log();
  }
}

module.exports = new UndoMoveHandler();

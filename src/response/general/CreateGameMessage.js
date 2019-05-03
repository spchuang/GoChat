// @flow

import Bot from 'fb-local-chat-bot';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {sendFocusedGameMessage} from '../PostBackUtils';
import {got} from '../../translations/Translator';
import {Logger} from '../../logging/Logger';
import {LoggingEvent, LoggingTargetClass} from '../../logging/LoggingEnums';

const CreateGameMessage = {
  async genSend(game: GoGame): Promise<GoGame> {
    const [blackUser, whiteUser, imageURL] = await Promise.all([
      game.genBlackUser(),
      game.genWhiteUser(),
      game.genBoardImageURL(),
    ]);

    const nextColor = game.getCurrentMoveColorText();
    const selfEnemy = game.isSelfPlayingGame()
      ? got('inGameMessage.self', blackUser.getLanguage())
      : whiteUser.getFirstName();
    const blackFocusedOnGame = blackUser.getCurrentGameID() === game.getID();
    const blackMessage = got(
      'inGameMessage.startNewGame',
      blackUser.getLanguage(),
      {
        nextColor: got(nextColor, blackUser.getLanguage()),
        enemy: selfEnemy,
        nextUser: game.getIsBlackTurn()
          ? got('You', blackUser.getLanguage())
          : game.isSelfPlayingGame() ? got('You', blackUser.getLanguage()) : whiteUser.getFirstName(),
      },
    );
    sendFocusedGameMessage(blackUser, game, blackMessage, blackFocusedOnGame);
    Bot.sendImage(blackUser.getFBID(), imageURL);

    if (!game.isSelfPlayingGame()) {
      const enemy = blackUser.getFirstName();
      const whiteFocusedOnGame = whiteUser.getCurrentGameID() === game.getID();
      const whiteMessage = got(
        'inGameMessage.startNewGame',
        whiteUser.getLanguage(),
        {
          nextColor: got(nextColor, whiteUser.getLanguage()),
          enemy,
          nextUser: game.getIsBlackTurn()
            ? enemy
            : got('You', whiteUser.getLanguage()),
        },
      );
      sendFocusedGameMessage(whiteUser, game, whiteMessage, whiteFocusedOnGame);
      Bot.sendImage(whiteUser.getFBID(), imageURL);

      (new Logger(whiteUser))
        .setEvent(LoggingEvent.CREATE_GAME)
        .setTargetClass(LoggingTargetClass.GAME)
        .setTargetID(game.getID())
        .log();
    }

    (new Logger(blackUser))
      .setEvent(LoggingEvent.CREATE_GAME)
      .setTargetClass(LoggingTargetClass.GAME)
      .setTargetID(game.getID())
      .log();

    return game;
  },
};

module.exports = CreateGameMessage;

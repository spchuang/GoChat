// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import {GameStatus} from '../../class/ClassEnums';
import ParseUtil from '../../utils/ParseUtil';
import Promise from 'bluebird';
import {PostBackTypes, getCountScoreURLButton} from '../PostBackUtils';
import {LANGUAGE_TO_NAME_MAP} from '../../translations/TranslationConstants';
import {got} from '../../translations/Translator';

type Params = {
  gameID?: ?number;
};

class ShowCurrentGameStatusHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SHOW_CURRENT_GAME_STATUS;
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

    const isUserTurn = game.isUserTurn(user.getID());
    const currentColor = got(game.getCurrentMoveColorText(), user.getLanguage());

    const [opponentUser, imageURL] = await Promise.all([
      User.genByUserID(game.getOpponentUserID(user.getID())),
      game.genBoardImageURL(),
    ]);

    // send text if game is not over yet
    if (game.getStatus() === GameStatus.PLAYING) {
      let message = isUserTurn
        ? got('inGameMessage.selfTurnToPlay', user.getLanguage(), {color: currentColor})
        : got('inGameMessage.enemyTurnToPlay', user.getLanguage(), {color: currentColor, enemy: opponentUser.getFirstName()});

      const lastStone = game.getLastStonePlayed();
      if (lastStone && lastStone !== 'PASS_MOVE') {
        const lastStoneText = ParseUtil.convertNumberPositionToString([lastStone[0], lastStone[1]]);
        message += got('inGameMessage.lastStone', user.getLanguage(), {lastStoneText: lastStoneText});
      }

      Bot.sendText(
        user.getFBID(),
        message,
      );
    } else if (game.isCountingScore()) {
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
    }
    Bot.sendImage(user.getFBID(), imageURL);
  }
}

module.exports = new ShowCurrentGameStatusHandler();

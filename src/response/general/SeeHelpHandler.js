// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {sendNormalHelpMenu, PostBackTypes, createQuickReplyButton} from '../PostBackUtils';
import {got} from '../../translations/Translator';

class SeeHelpHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SEE_HELP;
  }

  async genHandle(user: User): Promise<void> {
    if (user.isPlaying()) {
      await this.genHandleInPlay(user);
    } else {
      this.handleNormal(user);
    }
  }

  async genHandleInPlay(user: User): Promise<void>{
    const game = user.getCurrentGame();
    const gameID = game.getID();
    const language = user.getLanguage();
    const buttons = [
      createQuickReplyButton(got('button.showCurrentBoard', language), PostBackTypes.SHOW_CURRENT_GAME_STATUS, [gameID]),
      createQuickReplyButton(got('button.resignGame', language), PostBackTypes.RESIGN_GAME, [gameID]),
      createQuickReplyButton(got('button.playAnotherGame', language), PostBackTypes.PLAY_ANOTHER_GAME),
    ];

    if (!game.isCountingScore()) {
      buttons.splice(
        1 /* index */,
        0,
        createQuickReplyButton(got('button.passMove', language), PostBackTypes.PASS_MOVE, [gameID]),
      );
    }

    // for game with another person, add send messageData
    // if (!game.isSelfPlayingGame()) {
    //   buttons.splice(
    //     1 /* index */,
    //     0,
    //     createQuickReplyButton(got('button.sendMessage', language), PostBackTypes.SHOW_MESSAGE_VIEW),
    //   );
    // }

    if (game.getCanUserUndo(user.getID())) {
      buttons.splice(
        1 /* index */,
        0,
        createQuickReplyButton(got('button.undoMove', language), PostBackTypes.UNDO_MOVE, [gameID]),
      );
    }
    const [activeGames, opponent] = await Promise.all([
      GoGame.genActiveGamesForUser(user),
      game.genOpponentUser(user.getID()),
    ]);

    const opponentName = game.isSelfPlayingGame()
      ? got('inGameMessage.self', user.getLanguage())
      : opponent.getFirstName();

    let activeGameText = '';
    if (activeGames.length > 1) {
      activeGameText = got('inGameMessage.activeGameText', language, {numActiveGames: activeGames.length}) + ' ';
      buttons.splice(
        -1 /* index */,
        0,
        createQuickReplyButton(got('button.showActiveGames', language), PostBackTypes.SHOW_ACTIVE_GAMES),
      );
    }

    Bot.sendQuickReplyWithText(
      user.getFBID(),
      got('inGameMessage.focusOnGameWith', language, {opponentName}) + ' ' +
        activeGameText +
        got('inGameMessage.inGameHelp', language),
      buttons,
    );
  }

  handleNormal(user: User): void {
    sendNormalHelpMenu(user, got('normalMessage.welcome', user.getLanguage()));
  }
}

module.exports = new SeeHelpHandler();

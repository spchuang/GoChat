// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import CreateGameMessage from './CreateGameMessage';
import GoAIUtils from '../../utils/GoAIUtils';
import PlayMoveHandler from '../game/PlayMoveHandler';

class CreateGameWithAIHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.PLAY_WITH_AI;
  }

  async genHandle(user: User): Promise<void> {
    // used for unit test only
    await this.genStartGameWithAI(user, 19, 'black');
  }

  async genStartGameWithAI(user: User, size: BoardSize, color: GameColorOption): Promise<void> {
    info('Start game with AI')
    var AIUser = await User.genByUserID(GoAIUtils.getAIUserID());
    var blackUser = color === 'black'? user: AIUser;
    var whiteUser = color === 'black'? AIUser: user;
    const game = await GoGame.genCreateGame(
      blackUser,
      whiteUser,
      size,
      0, // handicap
      6.5, // komi
    );
    await CreateGameMessage.genSend(game);
    if (game.getBlackUserID() === AIUser.getID()) {
      await PlayMoveHandler.genAIHandle(AIUser, game);
    }
  }
}

module.exports = new CreateGameWithAIHandler();

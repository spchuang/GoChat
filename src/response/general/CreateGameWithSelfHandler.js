// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import User from '../../class/User';
import GoGame from '../../class/Game';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import CreateGameMessage from './CreateGameMessage';

class CreateGameWithSelfHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.PLAY_WITH_SELF;
  }

  async genHandle(user: User): Promise<void> {
    // used for unit test only
    await this.genStartGameWithSelf(user, 19, 0, 6.5);
  }

  async genStartGameWithSelf(
    user: User,
    size: BoardSize,
    handicap: number,
    komi: number,
  ): Promise<void> {
    const game = await GoGame.genCreateGame(
      user /* blackUser */,
      user /* whiteUser */,
      size,
      handicap,
      komi,
    );
    await CreateGameMessage.genSend(game);
  }
}

module.exports = new CreateGameWithSelfHandler();

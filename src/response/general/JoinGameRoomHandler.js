// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import User from '../../class/User';
import GoGame from '../../class/Game';
import GameRoom from '../../class/GameRoom';
import ParseUtil from '../../utils/ParseUtil';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import CreateGameMessage from './CreateGameMessage';
import {Logger} from '../../logging/Logger';
import {LoggingEvent, LoggingTargetClass} from '../../logging/LoggingEnums';

type Params = {
  code: string;
};

class JoinGameRoomHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.JOIN_GAME_WITH_CODE;
  }

  getParamObjectFromPostback(paramsArray: Array<string>): Params {
    return {
      code: paramsArray[0],
    };
  }

  async genHandle(user: User, params: Params): Promise<void> {
    const code = params.code;
    if (!ParseUtil.isProperGameRoomCode(code)) {
      throw new TypedError(EXCEPTION.NOT_PROPER_GAME_CODE);
    }

    var room = await GameRoom.genByCode(code);
    // make sure user doesn't have any game room open
    if (!room) {
      throw new TypedError(
        EXCEPTION.NO_ROOM_WITH_CODE,
        {code: code},
      );
    }

    if (room.getOwnerID() === user.getID()) {
      throw new TypedError(EXCEPTION.CANT_JOIN_OWN_ROOM);
    }

    const owner = await User.genByUserID(room.getOwnerID());
    let blackPlayer, whitePlayer;
    if (room.getIsOwnerBlack()) {
      blackPlayer = owner;
      whitePlayer = user;
    } else {
      blackPlayer = user;
      whitePlayer = owner;
    }

    const game = await GoGame.genCreateGame(
      blackPlayer,
      whitePlayer,
      room.getBoardSize(),
      room.getHandicap(),
      room.getKomi(),
    );

    const logger = (new Logger(user))
      .setEvent(LoggingEvent.JOIN_GAME_ROOM)
      .setTargetClass(LoggingTargetClass.GAME_ROOM)
      .setTargetID(room.getID());

    // remove game room
    await GameRoom.genRemoveRoomForUser(owner)
    await CreateGameMessage.genSend(game);

    logger.log();
  }
}

module.exports = new JoinGameRoomHandler();

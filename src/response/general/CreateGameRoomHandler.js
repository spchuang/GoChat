// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GameRoom from '../../class/GameRoom';
import Promise from 'bluebird';
import {createPostbackButton, PostBackTypes} from '../PostBackUtils';
import {got} from '../../translations/Translator';
import {getRandomGameCode} from '../../utils/CommonUtils';
import GameRoomShareHandler from '../general/GameRoomShareHandler';
import {Logger} from '../../logging/Logger';
import {LoggingEvent, LoggingTargetClass} from '../../logging/LoggingEnums';

class CreateGameRoomHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.CREATE_PRIVATE_ROOM;
  }

  async genHandle(user: User): Promise<void> {
    // this is unit test only
    const language = user.getLanguage();
    try {
      await this.genCreatePrivateRoom(user, 19, 'black', 0, 6.5);
    } catch (err) {
      if (err.code === EXCEPTION.ROOM_ALREADY_CREATED) {
        Bot.sendButtons(
          user.getFBID(),
          err.getErrorMessage(language),
          [
            createPostbackButton(
              got('button.shareRoom', language),
              PostBackTypes.SEND_GAME_ROOM_SHARE,
            ),
          ]
        );
      }
    }
  }

  async genCreatePrivateRoom(
    user: User,
    size: BoardSize,
    color: GameColorOption,
    handicap: number,
    komi: number,
  ): Promise<void> {
    const language = user.getLanguage();
    var room = await GameRoom.genByUser(user.getID());
    if (room) {
      throw new TypedError(
        EXCEPTION.ROOM_ALREADY_CREATED,
        {roomCode: room.getCode()},
      );
    }

    // randomly gnerate a game code right away.
    let code = '';
    let roomWithCode;
    do {
      code = getRandomGameCode();
      roomWithCode = await GameRoom.genByCode(code)
      // if room already, exists try again
    } while (roomWithCode);

    room = await GameRoom.genCreatePrivateRoom(
      user.getID(),
      code,
      size,
      color,
      handicap,
      komi,
    );

    Bot.sendText(
      user.getFBID(),
      got('normalMessage.roomCreated', language, {code: room.getCode()}),
    );
    await GameRoomShareHandler.genHandle(user);

    (new Logger(user))
      .setEvent(LoggingEvent.CREATE_GAME_ROOM)
      .setTargetClass(LoggingTargetClass.GAME_ROOM)
      .setTargetID(room.getID())
      .setExtraData({size, color, komi, handicap})
      .log();
  }
}

module.exports = new CreateGameRoomHandler();

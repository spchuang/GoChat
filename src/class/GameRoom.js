// @flow

'use strict';

import GameRoomBase from './base/GameRoomBase';
import models from './schema';
import User from './User';
import Promise from 'bluebird';
import type {SequelizeModel} from './schema';

class GameRoom extends GameRoomBase {
  static fromModel(model: SequelizeModel): GameRoom {
    return new GameRoom(model);
  }

  static async genRemoveRoomForUser(user: User): Promise<void> {
    var room = await GameRoom.genByUser(user.getID());
    if (room) {
      await room.genDelete();
    }
  }

  static async genCreatePrivateRoom(
    userID: number,
    code: string,
    size: BoardSize,
    color: GameColorOption,
    handicap: number,
    komi: number,
  ): Promise<GameRoom> {
    let isOwnerBlack;
    if (color === 'random') {
      isOwnerBlack = Math.random() > 0.5;
    } else {
      isOwnerBlack = color === 'black';
    }

    return models.GameRoom.create({
      ownerID: userID,
      boardSize: size,
      isPrivate: true,
      code: code,
      isOwnerBlack: isOwnerBlack,
      komi: komi,
      handicap: handicap,
    }).then((model: SequelizeModel): GameRoom => {
      return GameRoom.fromModel(model);
    });
  }

  static async genByCode(code: string): Promise<?GameRoom> {
    return await GameRoom._genBy({
      where: {
        code: code,
      },
    });
  }

  static async genByUser(userID: number): Promise<?GameRoom> {
    return await GameRoom._genBy({
      where: {
        ownerID: userID,
      },
    });
  }

  static async genByUserOrCode(userID: number, code: string): Promise<?GameRoom> {
    return await GameRoom._genBy({
      where: {
        $or: [
          {
            ownerID: userID,
          },
          {
            code: code,
          },
        ],
      },
    });
  }
}

export default GameRoom;

// @flow

'use strict';

import MessageBase from './base/MessageBase';
import models from './schema'
import Promise from 'bluebird';
import GoGame from './Game';
import User from './User';
import type {SequelizeModel} from './schema';

class Message extends MessageBase {
  static async genLatestMessagesForGame(
    game: GoGame,
    limit: number = 15,
  ): Promise<Array<Message>> {
    const userOneID = game.getBlackUserID();
    const userTwoID = game.getWhiteUserID();
    return await Message.genForUsers(
      userOneID,
      userTwoID,
      limit,
      {}, // extra query
      ['id', 'DESC'],
    );
  }

  static async genForUsersBeforeID(
    userOneID: number,
    userTwoID: number,
    limit: number,
    id: number,
  ): Promise<Array<Message>> {
    return await Message.genForUsers(
      userOneID,
      userTwoID,
      limit,
      {id: {$lt: id}},
      ['id', 'DESC'],
    );
  }

  static async genForUsersAfterID(
    userOneID: number,
    userTwoID: number,
    limit: number,
    id: number,
  ): Promise<Array<Message>> {
    return await Message.genForUsers(
      userOneID,
      userTwoID,
      limit,
      {id: {$gt: id}},
      ['id', 'ASC'],
    );
  }

  static async genForUsers(
    userOneID: number,
    userTwoID: number,
    limit: number,
    extraQuery: Object,
    order: Array<string>,
  ): Promise<Array<Message>> {
    const query: Object = {
      where: {
        $or: [
          {$and: [{receiverID: userOneID}, {senderID: userTwoID}]},
          {$and: [{receiverID: userTwoID}, {senderID: userOneID}]},
        ],
        ...extraQuery,
      },
      limit,
      order: [order],
    };

    return await this._genAllBy(query);
  }

  static async genSend(
    senderID: number,
    receiverID: number,
    content: string,
  ): Promise<Message> {
    return models.Message.create({
      senderID,
      receiverID,
      content,
    }).then((model: SequelizeModel) => {
      return new this(model);
    });
  }
}

export default Message;

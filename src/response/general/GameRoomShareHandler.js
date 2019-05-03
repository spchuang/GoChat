// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import GameRoom from '../../class/GameRoom';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import {got} from '../../translations/Translator';

class GameRoomShareHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SEND_GAME_ROOM_SHARE;
  }

  async genHandle(user: User): Promise<void> {
    const language = user.getLanguage();
    const room = await GameRoom.genByUser(user.getID());
    // create a share attachment for the code
    const element = Bot.createGenericTemplateElement(
      got('shareFriendPlayBubbleTitle', language, {name: user.getFirstName()}),
      null, // itemUrl
      null, // defaultAction
      'https://www.playmessengergo.com/web/images/fb_share_logo.png',
      got('shareFriendPlayBubbleContent', language, {code: room.getCode()}),
      [Bot.createShareButton()],
    );

    Bot.sendGenericTemplate(
      user.getFBID(),
      [element],
    );
  }
}

module.exports = new GameRoomShareHandler();

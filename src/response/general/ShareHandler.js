// @flow

'use strict';

import MessageHandlerBase from '../MessageHandlerBase';
import Bot from 'fb-local-chat-bot';
import User from '../../class/User';
import Promise from 'bluebird';
import {PostBackTypes} from '../PostBackUtils';
import {Logger} from '../../logging/Logger';
import {LoggingEvent} from '../../logging/LoggingEnums';

class ShareHandler extends MessageHandlerBase {
  getPostBackType(): string {
    return PostBackTypes.SHARE;
  }

  async genHandle(user: User): Promise<void> {
    const element = Bot.createGenericTemplateElement(
      'GoChat: Play Go in Messenger',
      null, // itemUrl
      null, // defaultAction
      'https://www.playmessengergo.com/web/images/fb_share_logo.png',
      'Play Go with your friends and people around the world using Facebook Messenger',
      [Bot.createShareButton()],
    );

    (new Logger(user))
      .setEvent(LoggingEvent.SHARE)
      .log();

    Bot.sendGenericTemplate(
      user.getFBID(),
      [element],
    );
  }
}

module.exports = new ShareHandler();

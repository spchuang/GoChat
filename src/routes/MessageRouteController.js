// @flow

'use strict';

import Bot from 'fb-local-chat-bot'
import {got} from '../translations/Translator';
import Promise from 'bluebird';
import GoGame from '../class/Game';
import Message from '../class/Message';
import config from '../config';
import User from '../class/User';
import invariant from 'invariant';
import RouteControllerBase from './RouteControllerBase';
import {LoggingEvent} from '../logging/LoggingEnums';
import EncryptUtils from '../utils/EncryptUtils';
import {getMessageURLButton} from '../response/PostBackUtils'

class MessageRouteController extends RouteControllerBase {
  getName(): string {
    return 'message';
  }

  getRouterEvent(): string {
    return LoggingEvent.LOAD_MESSAGE_VIEW;
  }

  getLoadMessengerExtension(): boolean {
    return true;
  }

  getPageTitle(lan: string): string {
    return 'GoChat'; // TODO
  }

  async genClientContainerParams(user: User, req: Object): Promise<Object> {
    const language = user.getLanguage();
    const game = user.getCurrentGame();
    const limit = 10;

    // overfetch and show whether there are more
    const messages = await Message.genLatestMessagesForGame(game, limit + 1);
    const hasMore = messages.length > limit;

    return {
      messages: messages.slice(0, limit).map(x => x.getData()),
      receiverID: game.getOpponentUserID(user.getID()),
      hasMore,
      text: {
        messageInputPlaceholder: got('chat.messageInputPlaceholder', language),
      },
    };
  }

  getJS(): Array<string> {
    return [
      `web/MessageContainer.${config.env}.js?i=3`,
    ];
  }

  getCSS(): Array<string> {
    return [
      'webviewCommon.css',
      'message.css?id=3',
    ];
  }
}

const controller = new MessageRouteController()

controller.post('send', async (user: User, params: Object, res: Object) => {
  let {receiverID, content} = params;
  invariant(receiverID && content, 'receiverID and content are required');
  receiverID = parseInt(receiverID, 10);
  const [message, opponent] = await Promise.all([
    Message.genSend(user.getID(), receiverID, content),
    User.genByUserID(receiverID),
  ]);

  res.json({message: message.getData()});

  // send message to opponent
  const lan = opponent.getLanguage();
  const messageData = {
    attachment: {
      'type':'template',
      'payload': {
        'template_type': 'button',
        'text': got(
          'inGameMessage.receivedMessageFromOpponent',
          lan,
          {enemy: user.getFirstName(), message: content},
        ),
        'buttons': [
          getMessageURLButton(
            got('button.replyMessage', lan),
            lan,
            user.getID(),
            EncryptUtils.encrypt(opponent.getFBID()),
          ),
        ],
      },
    },
  };

  Bot.send(opponent.getFBID(), messageData);
});

controller.get('getBefore', async (user: User, params: Object, res: Object) => {
  let {beforeMessageID, receiverID} = params;
  invariant(receiverID, 'receiverID are required');

  const query: Object = {};
  if (beforeMessageID) {
    beforeMessageID = parseInt(beforeMessageID, 10);
  }
  receiverID = parseInt(receiverID, 10);

  const limit = 5;
  const messages = await Message.genForUsersBeforeID(
    user.getID(),
    receiverID,
    limit + 1,
    beforeMessageID,
  );
  const hasMore = messages.length > limit;
  res.json({
    messages: messages.slice(0, limit).map(x => x.getData()),
    hasMore,
  });
});

controller.get('getAfter', async (user: User, params: Object, res: Object) => {
  let {afterMessageID, receiverID} = params;
  invariant(receiverID, 'receiverID are required');

  const query: Object = {};
  if (afterMessageID) {
    afterMessageID = parseInt(afterMessageID, 10);
  }
  receiverID = parseInt(receiverID, 10);
  const messages = await Message.genForUsersAfterID(
    user.getID(),
    receiverID,
    5,
    afterMessageID,
  );
  res.json({
    messages: messages.map(x => x.getData()),
  });
});

module.exports = controller;

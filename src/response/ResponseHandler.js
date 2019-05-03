// @flow

'use strict';

import fs from 'fs';
import path from 'path';
import Bot from 'fb-local-chat-bot';
import ParseUtil from '../utils/ParseUtil';
import User from '../class/User';
import Promise from 'bluebird';
import {PostBackTypes, createPostbackButton} from './PostBackUtils';
import {got} from '../translations/Translator';
import PlayMoveHandler from './game/PlayMoveHandler';
import UndoMoveHandler from './game/UndoMoveHandler';
import ResignGameHandler from './game/ResignGameHandler';
import PassMoveHandler from './game/PassMoveHandler';
import ShowMessengerWebviewTokenHandler from './general/ShowMessengerWebviewTokenHandler';
import {Logger} from '../logging/Logger';
import {LoggingEvent} from '../logging/LoggingEnums';

const PostBackHandlers = {};
const folders = ['game', 'general'];
folders.forEach(folder => {
  var files = fs.readdirSync(`${__dirname}/${folder}`);
  files.forEach(file => {
    if (file.indexOf('Handler.js') < 0) {
      return;
    }

    // $FlowFixMe: flow can't handle dynamic import
    const handler = require(path.join(`${__dirname}/${folder}/${file}`));
    if (!handler.getPostBackType()) {
      return;
    }
    PostBackHandlers[handler.getPostBackType()] = handler;
  });
});

const textResponseHandler = {
  async _handleNormal(user: User, text: string): Promise<void> {
    if (text === 'token') {
      await ShowMessengerWebviewTokenHandler.genHandle(user);
      return;
    }
    // default to help menu
    await PostBackHandlers[PostBackTypes.SEE_HELP].genHandle(user);
  },

  async _handleInGame(user: User, text: string): Promise<void> {
    if (ParseUtil.isHelpCommand(text)) {
      await PostBackHandlers[PostBackTypes.SEE_HELP].genHandle(user);
      return;
    } else if (ParseUtil.isPassCommand(text)) {
      await PassMoveHandler.genHandle(user, {});
      return;
    } else if (ParseUtil.isQuitCommand(text)) {
      await ResignGameHandler.genHandle(user, {});
      return;
    } else if (text === 'token') {
      await ShowMessengerWebviewTokenHandler.genHandle(user);
      return;
    } else if (ParseUtil.isUndoCommand(text)) {
      await UndoMoveHandler.genHandle(user, {});
      return;
    }

    var position;
    try {
      position = ParseUtil.parsePositionText(text);
    } catch(e) {
      Bot.sendButtons(
        user.getFBID(),
        got('typedException.notProperMove', user.getLanguage()),
        [
          createPostbackButton(got('button.helpMenu', user.getLanguage()), PostBackTypes.SEE_HELP),
        ],
      );
      return;
    }

    // default to handle play Move
    await PlayMoveHandler.genHandle(user, {position});

    // See if the opponent is AI, and it's AI's turn
    const game = user.getCurrentGame();
    const opponentUser = await game.genOpponentUser(user.getID());
    if (opponentUser.getIsAI() && !game.isUserTurn(user.getID())) {
      await PlayMoveHandler.genAIHandle(opponentUser, game);
    }
  },
};
/*
async function backfill() {
  const users = await User.genAll();
  users.forEach((user) => {
    if (user.getFirstName()) {
      return;
    }
    console.log(user.getID(), user.getFBID());
    Bot.getUserProfile(user.getFBID()).then((data) => {
      user.setFirstName(data.first_name);
      user.setLastName(data.last_name);
      user.setProfilePic(data.profile_pic);
      user.setLocale(data.locale);
      user.genSave().catch(e => console.log(e));
    }).catch(function (e) {
      console.log(e);
    });
  });
}
*/

const ResponseHandler = {
  async handleText(senderID: string, text: string): Promise<void> {
    info('Receive from ' + senderID + ', text: ' + text);
    Bot.saveSenderMessageToLocalChat(senderID, text);

    const user = await User.genOrCreateByFBID(senderID);

    (new Logger(user))
      .setEvent(LoggingEvent.TEXT_SEND)
      .setExtraData({text})
      .log();

    if (user.isPlaying()) {
      await textResponseHandler._handleInGame(user, text);
    } else {
      await textResponseHandler._handleNormal(user, text);
    }
  },

  async handleAttachment(senderID: string, attachments: Array<Object>): Promise<void> {
    // no matter what the attachments are, we always show the help menu
    info('Receive from ' + senderID + ', attachments');
    info(attachments);
    const user = await User.genOrCreateByFBID(senderID);
    await PostBackHandlers[PostBackTypes.SEE_HELP].genHandle(user);
  },

  async handlePostback(senderID: string, payload: string): Promise<void> {
    info('Receive postback from ' + senderID + ', payload: ' + payload);
    let params = payload.split(':');
    const payloadType = params.shift();
    if (!(payloadType in PostBackTypes)) {
      return;
    }
    const user = await User.genOrCreateByFBID(senderID);

    (new Logger(user))
      .setEvent(LoggingEvent.POST_BACK_SEND)
      .setExtraData({payload})
      .log();

    if (payloadType in PostBackHandlers) {
      const handler = PostBackHandlers[payloadType];
      const paramObject = handler.getParamObjectFromPostback(params);
      await handler.genHandle(user, paramObject);
      return;
    }
  },
};

module.exports = ResponseHandler;

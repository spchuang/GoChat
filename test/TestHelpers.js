// @flow

'use strict';

import Promise from 'bluebird';
import {expect} from 'chai';
import User from '../src/class/User';
import EncryptUtils from '../src/utils/EncryptUtils';
import rp from 'request-promise';
import Bot from 'fb-local-chat-bot';

var mochaAsync = (fn: Function) => {
  return async (done: Function) => {
    try {
      await fn();
      done();
    } catch (err) {
      done(err);
    }
  };
};

async function genSendRequest(userID: string, url: string, method: string, data: Object): Promise<Object> {
  const encryptID = EncryptUtils.encrypt(userID);
  return await rp({
    uri: 'http://localhost:5000' + url,
    body: {
      ...data,
      u: encryptID,
    },
    method: method,
    json: true,
  });
}

async function genSendUpdateScoringRequest(userID: string, data: Object): Promise<Object> {
  return await genSendRequest(userID, '/countScore/update', 'POST', data);
}

async function genSendAcceptScoringRequest(userID: string, data: Object): Promise<Object> {
  return await genSendRequest(userID, '/countScore/accept', 'POST', data);
}

async function genSendRejectScoringRequest(userID: string, data: Object): Promise<Object> {
  return await genSendRequest(userID, '/countScore/reject', 'POST', data);
}

async function genSendCreateScoringRequest(userID: string, data: Object): Promise<Object> {
  return await genSendRequest(userID, '/countScore/create', 'POST', data);
}

async function genSendJoinGameRequest(userID: string, code: string): Promise<Object> {
  return await genSendRequest(userID, '/joinGame/join', 'POST', {code});
}

async function genSendCreateGameRequest(userID: string, data: Object): Promise<Object> {
  return await genSendRequest(userID, '/game/create', 'POST', data);
}

function getLastMessageForUser(userID: string): Object {
  var messages = Bot.getLocalChatMessagesForUser(userID);
  return messages[messages.length - 1].message;
}

function getLastMessagesForUser(userID: string, length: number): Array<Object> {
  var messages = Bot.getLocalChatMessagesForUser(userID);
  return messages.slice(length * -1).map(messageObj => messageObj.message);
}

function expectImage(message: Object): void {
  expect(message.attachment.type).to.equal('image');
}

module.exports = {
  mochaAsync,
  getLastMessageForUser,
  getLastMessagesForUser,
  genSendCreateGameRequest,
  genSendCreateScoringRequest,
  genSendUpdateScoringRequest,
  genSendAcceptScoringRequest,
  genSendRejectScoringRequest,
  expectImage,
  genSendJoinGameRequest,
};

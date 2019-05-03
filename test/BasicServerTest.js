// @flow

'use strict';

import 'babel-polyfill';
import {expect} from 'chai';
import makeServer from '../src/server';
import {mochaAsync, getLastMessageForUser} from './TestHelpers';
import request from "supertest-as-promised";
import User from '../src/class/User';
import ResponseHandler from '../src/response/ResponseHandler';
import Bot from 'fb-local-chat-bot';

describe('Basic server test', function() {
  this.timeout(1000);
  var server;
  var userID = 'testUser';
  beforeEach(mochaAsync(async () => {
    server = await makeServer(true /* silent */);
  }));

  afterEach(function (done) {
    Bot.clearLocalChatMessages();
    Bot.removeAllListeners();
    server.close(done);
  });

  it('Server healthy', mochaAsync(async () => {
    await request(server).get('/')
      .expect(200);
  }));

  it('Test help', mochaAsync(async () => {
    await ResponseHandler.handleText(userID, "help");

    let messages = Bot.getLocalChatMessagesForUser(userID);
    expect(messages.length).to.equal(2);
  }));
});

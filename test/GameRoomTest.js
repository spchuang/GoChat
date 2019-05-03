// @flow

'use strict';

import 'babel-polyfill';
import {expect} from 'chai';
import makeServer from '../src/server';
import {mochaAsync, getLastMessagesForUser, getLastMessageForUser} from './TestHelpers';
import User from '../src/class/User';
import GameRoom from '../src/class/GameRoom';
import Game from '../src/class/Game';
import {GameStatus} from '../src/class/ClassEnums';
import ResponseHandler from '../src/response/ResponseHandler';
import CreateGameRoomHandler from '../src/response/general/CreateGameRoomHandler';
import Bot from 'fb-local-chat-bot';
import {PostBackTypes} from '../src/response/PostBackUtils';
import {got} from '../src/translations/Translator';

describe('Game room interaction test', function() {
  this.timeout(10000);
  var server;
  var userOneID = 'testUser1';
  var userTwoID = 'testUser2';
  var roomCode;
  var lan = 'en';
  beforeEach(mochaAsync(async () => {
    server = await makeServer(true /* silent */);
  }));

  afterEach(function (done) {
    Bot.clearLocalChatMessages();
    Bot.removeAllListeners();
    server.close(done);
  });

  it('Test create game room', mochaAsync(async () => {
    await ResponseHandler.handleText(userOneID, "help");
    await ResponseHandler.handlePostback(userOneID, PostBackTypes.CREATE_PRIVATE_ROOM);

    var user = await User.genByFBID(userOneID);
    expect(user.isInactive()).to.be.true;

    var room = await GameRoom.genByUser(user.getID());
    const messages = getLastMessagesForUser(userOneID, 2);
    expect(messages[0].text).to.equal(got('normalMessage.roomCreated', lan, {code: room.getCode()}));
    expect(messages[1].attachment.payload.elements[0].title)
      .to.equal(got('shareFriendPlayBubbleTitle', lan, {name: null}));
    expect(messages[1].attachment.payload.elements[0].subtitle)
      .to.equal(got('shareFriendPlayBubbleContent', lan, {code: room.getCode()}));
    expect(room).to.not.equal(null);
    expect(room.getIsPrivate()).to.be.true;
  }));

  it('Test create different size room', mochaAsync(async () => {
    await ResponseHandler.handleText(userOneID, "help");
    var user = await User.genByFBID(userOneID);
    await CreateGameRoomHandler.genCreatePrivateRoom(user, 13, 'white', 0, 6.5);

    var room = await GameRoom.genByUser(user.getID());
    const messages = getLastMessagesForUser(userOneID, 2);
    expect(messages[0].text).to.equal(got('normalMessage.roomCreated', lan, {code: room.getCode()}));
    expect(messages[1].attachment.payload.elements[0].title)
      .to.equal(got('shareFriendPlayBubbleTitle', lan, {name: null}));
    expect(messages[1].attachment.payload.elements[0].subtitle)
      .to.equal(got('shareFriendPlayBubbleContent', lan, {code: room.getCode()}));
    expect(room).to.not.equal(null);
    expect(room.getIsPrivate()).to.be.true;
    expect(room.getBoardSize()).to.equal(13);
    expect(room.getIsOwnerBlack()).to.be.false;
  }));

  describe('Post room creation', function() {
    beforeEach(mochaAsync(async () => {
      // create a room
      await ResponseHandler.handleText(userOneID, "help");
      await ResponseHandler.handlePostback(userOneID, PostBackTypes.CREATE_PRIVATE_ROOM);
      var user = await User.genByFBID(userOneID);
      var room = await GameRoom.genByUser(user.getID());
      roomCode = room.getCode();
    }));

    afterEach(function () {});

    it('Cant create room again', mochaAsync(async () => {
      // try create room again
      await ResponseHandler.handlePostback(userOneID, PostBackTypes.CREATE_PRIVATE_ROOM);

      expect(getLastMessageForUser(userOneID).attachment.payload.text).to.equal(got('typedException.ROOM_ALREADY_CREATED', lan, {roomCode: roomCode}));
      let user = await User.genByFBID(userOneID);
      expect(user.isInactive()).to.be.true;
    }));

    it('Okay another player create room', mochaAsync(async () => {
      // create second room
      await ResponseHandler.handleText(userTwoID, "help");
      await ResponseHandler.handlePostback(userTwoID, PostBackTypes.CREATE_PRIVATE_ROOM);

      const userTwo = await User.genByFBID(userTwoID);
      expect(userTwo.isInactive()).to.be.true;

      const roomTwo = await GameRoom.genByUser(userTwo.getID());
      expect(roomTwo).to.not.equal(null);
      expect(roomTwo.getIsPrivate()).to.be.true;
      const roomCodeTwo = roomTwo.getCode();

      const messages = getLastMessagesForUser(userTwoID, 2);
      expect(messages[0].text).to.equal(got('normalMessage.roomCreated', lan, {code: roomCodeTwo}));
    }));
  });
});

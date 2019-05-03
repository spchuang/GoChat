// @flow

'use strict';

import 'babel-polyfill';
import {expect} from 'chai';
import makeServer from '../src/server';
import {
  mochaAsync,
  getLastMessageForUser,
  getLastMessagesForUser,
  expectImage,
  genSendJoinGameRequest,
} from './TestHelpers';
import GameRoom from '../src/class/GameRoom';
import User from '../src/class/User';
import ResponseHandler from '../src/response/ResponseHandler';
import Bot from 'fb-local-chat-bot';
import {PostBackTypes} from '../src/response/PostBackUtils';
import ParseUtil from '../src/utils/ParseUtil';
import WeiqiSerializer from '../src/utils/WeiqiSerializer';
import {got} from '../src/translations/Translator';
import fs from 'fs';
import sgf from 'smartgame';

const DEFAULT_NUM_BUTTON = 5;

describe('Undo move test', function() {
  this.timeout(100000);
  let server;

  // self playing
  let userID = 'testUser';
  // friends playing
  let userOneID = 'testUser1';
  let userTwoID = 'testUser2';
  let roomCode = 'testRoomCode';
  let lan = 'en';

  beforeEach(mochaAsync(async () => {
    server = await makeServer(true /* silent */);
  }));

  afterEach(function (done) {
    Bot.clearLocalChatMessages();
    Bot.removeAllListeners();
    server.close(done);
  });

  it('self-playing - Undo button', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);

    // empty game shouldn't have undo button
    await ResponseHandler.handleText(userID, '?');
    let buttons = getLastMessageForUser(userID).quick_replies;
    expect(buttons.length).to.equal(DEFAULT_NUM_BUTTON-1); // -1 because it is self playing

    // non-empty games should have undo button
    await ResponseHandler.handleText(userID, 'D5');
    await ResponseHandler.handleText(userID, '?');
    buttons = getLastMessageForUser(userID).quick_replies;
    expect(buttons.length).to.equal(DEFAULT_NUM_BUTTON); // -1 because it is self playing
  }));

  it('friends playing - Undo button not show up for < 2 moves', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userOneID, PostBackTypes.CREATE_PRIVATE_ROOM);
    var user = await User.genByFBID(userOneID);
    var room = await GameRoom.genByUser(user.getID());
    roomCode = room.getCode();

    // join game room for user 2
    await ResponseHandler.handleText(userTwoID, "help");
    await genSendJoinGameRequest(userTwoID, roomCode);
    await ResponseHandler.handleText(userOneID, "d4");

    // neither player should see undo
    await ResponseHandler.handleText(userTwoID, '?');
    let buttons = getLastMessageForUser(userTwoID).quick_replies;
    expect(buttons.length).to.equal(DEFAULT_NUM_BUTTON-1);

    await ResponseHandler.handleText(userOneID, '?');
    buttons = getLastMessageForUser(userOneID).quick_replies;
    expect(buttons.length).to.equal(DEFAULT_NUM_BUTTON-1);

    // play one more move, then the next player should see
    await ResponseHandler.handleText(userTwoID, "d5");
    await ResponseHandler.handleText(userTwoID, '?');
    buttons = getLastMessageForUser(userTwoID).quick_replies;
    expect(buttons.length).to.equal(DEFAULT_NUM_BUTTON-1);

    await ResponseHandler.handleText(userOneID, '?');
    buttons = getLastMessageForUser(userOneID).quick_replies;
    expect(buttons.length).to.equal(DEFAULT_NUM_BUTTON);
  }));

  it('Self playing - Undo simple move', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);
    await ResponseHandler.handleText(userID, 'D5'); // 3 4
    await ResponseHandler.handleText(userID, 'D6'); // 3 5
    await ResponseHandler.handleText(userID, 'D7'); // 3 6
    await ResponseHandler.handleText(userID, 'D8'); // 3 7
    let user = await User.genByFBID(userID);
    expect(user.isPlaying()).to.be.true;
    let game = user.getCurrentGame();
    expect(game.getStonesHistory()).to.deep.equal([[3, 4], [3, 5], [3, 6], [3, 7]]);

    await ResponseHandler.handlePostback(userID, PostBackTypes.UNDO_MOVE);

    // verify messages sent are correct
    const messages = getLastMessagesForUser(userID, 3);
    expect(messages[0].text).to.equal(got('inGameMessage.selfUndoMove', lan));
    expect(messages[1].text).to.equal(
      got('inGameMessage.selfTurnToPlay', lan, {color: got('White', lan)}) +
      got('inGameMessage.lastStone', lan, {lastStoneText: 'D, 7'})
    );
    expectImage(messages[2]);

    user = await User.genByFBID(userID);
    game = user.getCurrentGame();
    expect(game.getStonesHistory()).to.deep.equal([[3, 4], [3, 5], [3, 6]]);
  }));

  it('Self playing - Undo move and play more and undo', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);
    await ResponseHandler.handleText(userID, 'D5'); // 3 4
    await ResponseHandler.handleText(userID, 'D6'); // 3 5
    await ResponseHandler.handleText(userID, 'D7'); // 3 6
    await ResponseHandler.handleText(userID, 'D8'); // 3 7

    await ResponseHandler.handlePostback(userID, PostBackTypes.UNDO_MOVE);
    await ResponseHandler.handlePostback(userID, PostBackTypes.UNDO_MOVE);

    await ResponseHandler.handleText(userID, 'D9');
    await ResponseHandler.handleText(userID, 'D10');

    await ResponseHandler.handlePostback(userID, PostBackTypes.UNDO_MOVE);
    await ResponseHandler.handlePostback(userID, PostBackTypes.UNDO_MOVE);
    await ResponseHandler.handlePostback(userID, PostBackTypes.UNDO_MOVE);
    await ResponseHandler.handlePostback(userID, PostBackTypes.UNDO_MOVE);

    await ResponseHandler.handleText(userID, 'D11');

    let user = await User.genByFBID(userID);
    let game = user.getCurrentGame();
    expect(game.getStonesHistory()).to.deep.equal([[3, 10]]);
  }));

  describe('Test friend game', function() {
    beforeEach(mochaAsync(async () => {
      // create game room for user 1
      await ResponseHandler.handleText(userOneID, "help");
      await ResponseHandler.handlePostback(userOneID, PostBackTypes.CREATE_PRIVATE_ROOM);
      var user = await User.genByFBID(userOneID);
      var room = await GameRoom.genByUser(user.getID());
      roomCode = room.getCode();

      // join game room for user 2
      await ResponseHandler.handleText(userTwoID, "help");
      await genSendJoinGameRequest(userTwoID, roomCode);
      await ResponseHandler.handleText(userTwoID, roomCode);

      await ResponseHandler.handleText(userOneID, "d4");
      await ResponseHandler.handleText(userTwoID, "d5");
    }));

    it('Undo button not showing up for waiting player', mochaAsync(async () => {
      await ResponseHandler.handleText(userTwoID, '?');
      let buttons = getLastMessageForUser(userTwoID).quick_replies;
      expect(buttons.length).to.equal(DEFAULT_NUM_BUTTON-1);
    }));

    it('Undo at wrong term is wrong message', mochaAsync(async () => {
      await ResponseHandler.handlePostback(userTwoID, PostBackTypes.UNDO_MOVE);

      const message = getLastMessageForUser(userTwoID);
      expect(message.text).to.equal(got('inGameMessage.notYourTurnToUndo', lan));
    }));

    it('Undo Messages', mochaAsync(async () => {
      await ResponseHandler.handlePostback(userOneID, PostBackTypes.UNDO_MOVE);

      let user = await User.genByFBID(userOneID);
      let game = user.getCurrentGame();
      expect(game.getIsBlackTurn()).to.be.true;

      // verify messages for current player
      let messages = getLastMessagesForUser(userOneID, 3);
      expect(messages[0].text).to.equal(got('inGameMessage.selfUndoMove', lan));
      expect(messages[1].text).to.equal(
        got('inGameMessage.selfTurnToPlay', lan, {color: got('Black', lan)})
      );
      expectImage(messages[2]);

      // verify message for opponent
      messages = getLastMessagesForUser(userTwoID, 3);
      expect(messages[0].text).to.equal(got('inGameMessage.enemyUndoMove', lan, {enemy: 'null', color: got('Black', lan)}));
      expect(messages[1].text).to.equal(
        got('inGameMessage.enemyTurnToPlay', lan, {enemy: 'null', color: got('Black', lan)})
      );
      expectImage(messages[2]);
    }));
  });
});

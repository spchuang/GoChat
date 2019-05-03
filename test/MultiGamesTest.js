// @flow

'use strict';

import 'babel-polyfill';
import {expect} from 'chai';
import makeServer from '../src/server';
import User from '../src/class/User';
import {
  mochaAsync,
  getLastMessageForUser,
  getLastMessagesForUser,
  genSendCreateGameRequest,
  expectImage,
  genSendJoinGameRequest,
} from './TestHelpers';
import GameRoom from '../src/class/GameRoom';
import Game from '../src/class/Game';
import {GameStatus} from '../src/class/ClassEnums';
import ResponseHandler from '../src/response/ResponseHandler';
import Bot from 'fb-local-chat-bot';
import {PostBackTypes, createPostbackButton} from '../src/response/PostBackUtils';
import {got} from '../src/translations/Translator';

describe('Multi games test', function() {
  this.timeout(50000);

  let server;
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

  describe('Test friend game', function() {
    beforeEach(mochaAsync(async () => {
      // create a self-playing game first
      await ResponseHandler.handleText(userOneID, "help");
      await genSendCreateGameRequest(
        userOneID,
        {gameType: 'self', boardSize: 9, komi: 6.5, handicap: 0},
      );

      // create another game room with friend
      await genSendCreateGameRequest(
        userOneID,
        {gameType: 'friend', boardSize: 13, color: 'white', komi: 6.5, handicap: 0},
      );
      var user = await User.genByFBID(userOneID);
      var room = await GameRoom.genByUser(user.getID());
      roomCode = room.getCode();

      // join game room for user 2
      await ResponseHandler.handleText(userTwoID, "help");
      await genSendJoinGameRequest(userTwoID, roomCode);
    }));

    afterEach(function () {});

    it('Check game creation message', mochaAsync(async () => {
      const userOne = await User.genByFBID(userOneID);
      const userTwo = await User.genByFBID(userTwoID);
      const gameTwo = userTwo.getCurrentGame();

      // expect user 1 message to ask for focus
      let messagesOne = getLastMessagesForUser(userOneID, 2);
      expect(messagesOne[0].attachment.payload.buttons)
        .to.deep.equal([createPostbackButton(got('button.focusOnGame', lan), PostBackTypes.FOCUS_ON_GAME, [gameTwo.getID()])])
      expect(messagesOne[0].attachment.payload.text)
        .to.equal(
          got('inGameMessage.startNewGame', lan, {enemy: 'null', nextColor: got('Black', lan), nextUser: 'null'}) + ' ' + got('inGameMessage.newGameMoveAskUserToFocus', lan)
        );
      expectImage(messagesOne[1]);

      // expect user 2 message normal
      let messagesTwo = getLastMessagesForUser(userTwoID, 2);
      expect(messagesTwo[0].text)
        .to.equal(got('inGameMessage.startNewGame', lan, {enemy: 'null', nextColor: got('Black', lan), nextUser: got('You', lan)}));
      expectImage(messagesTwo[1]);

      // verify both users are in game

      expect(userOne.isPlaying()).to.be.true;
      expect(userTwo.isPlaying()).to.be.true;
      expect(userOne.getCurrentGame().getWeiqiBoardSize()).to.equal(9);
      expect(userOne.getCurrentGameID()).to.not.equal(userTwo.getCurrentGameID());
      expect(userTwo.getCurrentGame().getWeiqiBoardSize()).to.equal(13);

      const userOneGames = await Game.genActiveGamesForUser(userOne);
      const userTwoGames = await Game.genActiveGamesForUser(userTwo);

      expect(userOneGames.length).to.equal(2);
      expect(userTwoGames.length).to.equal(1);
    }));

    it('Check play move message', mochaAsync(async () => {
      await ResponseHandler.handleText(userTwoID, "d4");
      const userTwo = await User.genByFBID(userTwoID);
      const gameTwo = userTwo.getCurrentGame();

      // check first move messages
      let messagesTwo = getLastMessagesForUser(userTwoID, 2);
      let expectPlayMsgTwo = got('inGameMessage.selfPlayMove', lan, {color: got('Black', lan), positionText: 'D, 4'}) + ' ' +
        got('inGameMessage.enemyTurnToPlay', lan, {enemy: 'null', color: got('White', lan)});
      expect(messagesTwo[0].text).to.equal(expectPlayMsgTwo);
      expectImage(messagesTwo[1]);

      let messagesOne = getLastMessagesForUser(userOneID, 2);
      expect(messagesOne[0].attachment.payload.buttons)
        .to.deep.equal([createPostbackButton(got('button.focusOnGame', lan), PostBackTypes.FOCUS_ON_GAME, [gameTwo.getID()])])
      expect(messagesOne[0].attachment.payload.text)
        .to.equal(got('inGameMessage.enemyPlayMove', lan, {enemy: 'null', color: got('Black', lan), positionText: 'D, 4'}) + ' ' +
          got('inGameMessage.selfTurnToPlay', lan, {color: got('White', lan)})  + ' ' +
          got('inGameMessage.newGameMoveAskUserToFocus', lan));
      expectImage(messagesOne[1]);
    }));

    it('Check help buttons when > 1 active game', mochaAsync(async () => {
      // empty game shouldn't have undo button
      await ResponseHandler.handleText(userOneID, '?');
      let buttons = getLastMessageForUser(userOneID).quick_replies;
      expect(buttons.length).to.equal(5);
    }));

    it('Click showActiveGames button response', mochaAsync(async () => {
      const userOne = await User.genByFBID(userOneID);
      const userOneGames = await Game.genActiveGamesForUser(userOne);
      const userTwo = await User.genByFBID(userTwoID);

      await ResponseHandler.handlePostback(userOneID, PostBackTypes.SHOW_ACTIVE_GAMES);
      const message = getLastMessageForUser(userOneID);
      expect(message.attachment.type).to.equal('template');
      expect(message.attachment.payload.template_type).to.equal('generic');
      const elements = message.attachment.payload.elements;
      expect(elements.length).to.equal(userOneGames.length);
      expect(elements[0].title).to.equal(
        got('inGameMessage.activeGameElementTitle', lan, {opponentName: got('inGameMessage.self', lan)}) + ' 👈 👈 🤔'
      );
      expect(elements[1].title).to.equal(got('inGameMessage.activeGameElementTitle', lan, {opponentName: userTwo.getFirstName()}));
    }));

    it('Focus on another game', mochaAsync(async () => {
      const userTwo = await User.genByFBID(userTwoID);
      const gameTwo = userTwo.getCurrentGame();
      await ResponseHandler.handlePostback(userOneID, PostBackTypes.FOCUS_ON_GAME+':'+gameTwo.getID());

      const userOne = await User.genByFBID(userOneID);
      expect(userOne.getCurrentGameID()).to.equal(gameTwo.getID());
      const messages = getLastMessagesForUser(userOneID, 2);
      expect(messages[0].text)
        .to.equal(got('inGameMessage.enemyTurnToPlay', lan, {enemy: 'null', color: got('Black', lan)}));
      expectImage(messages[1]);
    }));

    it('Focus on same game', mochaAsync(async () => {
      const userTwo = await User.genByFBID(userTwoID);
      const gameTwo = userTwo.getCurrentGame();
      await ResponseHandler.handlePostback(userOneID, PostBackTypes.FOCUS_ON_GAME+':'+gameTwo.getID());
      await ResponseHandler.handlePostback(userOneID, PostBackTypes.FOCUS_ON_GAME+':'+gameTwo.getID())

      const messages = getLastMessageForUser(userOneID);
      expect(messages.text).to.equal(got('inGameMessage.alreadyFocusedOnTheGame', lan));
    }));
  });
});

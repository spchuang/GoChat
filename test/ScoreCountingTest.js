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
  genSendCreateScoringRequest,
  genSendUpdateScoringRequest,
  genSendAcceptScoringRequest,
  genSendRejectScoringRequest,
} from './TestHelpers';
import GameRoom from '../src/class/GameRoom';
import GameScoring from '../src/class/GameScoring';
import GoGame from '../src/class/Game';
import {GameStatus, GameScoringRequestStatus} from '../src/class/ClassEnums';
import ResponseHandler from '../src/response/ResponseHandler';
import Bot from 'fb-local-chat-bot';
import {PostBackTypes, createPostbackButton} from '../src/response/PostBackUtils';
import {got} from '../src/translations/Translator';

describe('Count Scoring test', function() {
  this.timeout(50000);

  let server;
  let userOneID = 'testUser1';
  let userTwoID = 'testUser2';
  let userOneName = 'Sam';
  let userTwoName = 'Michael';
  let roomCode = 'testRoomCode';
  let lan = 'en';

  beforeEach(mochaAsync(async () => {
    server = await makeServer(true /* silent */);

    // create user
    await ResponseHandler.handleText(userOneID, "help");
    await ResponseHandler.handleText(userTwoID, "help");
    const userOne = await User.genByFBID(userOneID);
    const userTwo = await User.genByFBID(userTwoID);

    // set their name
    userOne.setFirstName(userOneName);
    userTwo.setFirstName(userTwoName);

    await userOne.genSave();
    await userTwo.genSave();
  }));

  afterEach(function (done) {
    Bot.clearLocalChatMessages();
    Bot.removeAllListeners();
    server.close(done);
  });

  describe('Test self playing game', function() {
    beforeEach(mochaAsync(async () => {
      // create a self-playing game first
      await ResponseHandler.handleText(userOneID, "help");
      await genSendCreateGameRequest(
        userOneID,
        {gameType: 'self', boardSize: 19, komi: 6.5, handicap: 0},
      );

      await ResponseHandler.handlePostback(userOneID, PostBackTypes.PASS_MOVE);
      await ResponseHandler.handlePostback(userOneID, PostBackTypes.PASS_MOVE);
    }));

    afterEach(function () {});

    it('Scoring works', mochaAsync(async () => {
      const user = await User.genByFBID(userOneID);
      const gameID = user.getCurrentGame().getID();
      await genSendCreateScoringRequest(userOneID, {
        gameID,
        blackTerritory: 100,
        blackCapture: 5,
        whiteTerritory: 50,
        whiteCapture: 10,
        board: '[]',
      });

      const game = await GoGame.genEnforce(gameID);
      const scorings = await GameScoring.genAllByGameID(gameID);

      expect(game.getStatus()).to.equal(GameStatus.BLACK_WINS);
      expect(game.getWinsBy()).to.equal(38.5);
      expect(game.getScoreText()).to.equal('B+38.5');

      expect(scorings.length).to.equal(1);
      const scoring = scorings[0];
      expect(scoring.getBlackTerritory()).to.equal(100);
      expect(scoring.getBlackCapture()).to.equal(5);
      expect(scoring.getWhiteTerritory()).to.equal(50);
      expect(scoring.getWhiteCapture()).to.equal(10);
      expect(scoring.getBoard()).to.deep.equal([]);
      expect(scoring.getGameID()).to.equal(gameID);
      expect(scoring.getCreatorID()).to.equal(user.getID());
      expect(scoring.getStatus()).to.equal(GameScoringRequestStatus.ACCEPTED);

      const messages = getLastMessagesForUser(userOneID, 2);
      expect(messages[0].text).to.equal(
        got('countScore.winsByText', lan, {opponentName: got('inGameMessage.self', lan), color: got('Black', lan), score: 38.5}));
      expect(messages[1].attachment.payload.text).to.equal(got('inGameMessage.notPlayingWhatDoYouWantToDo', lan));
    }));
  });

  describe('Test 2 player game', function() {
    beforeEach(mochaAsync(async () => {
      // create another game room with friend
      await genSendCreateGameRequest(
        userOneID,
        {gameType: 'friend', boardSize: 19, color: 'white', handicap: 0, komi: 6.5},
      );
      var user = await User.genByFBID(userOneID);
      var room = await GameRoom.genByUser(user.getID());
      roomCode = room.getCode();

      // join game room for user 2
      await ResponseHandler.handleText(userTwoID, "help");
      await genSendJoinGameRequest(userTwoID, roomCode);

      await ResponseHandler.handleText(userOneID, "d6");
      await ResponseHandler.handleText(userTwoID, "d7");

      await ResponseHandler.handlePostback(userOneID, PostBackTypes.PASS_MOVE);
      await ResponseHandler.handlePostback(userTwoID, PostBackTypes.PASS_MOVE);

      // note user 1 has 2 active games
      await genSendCreateGameRequest(
        userOneID,
        {gameType: 'self', boardSize: 13, komi: 6.5, handicap: 0},
      );
    }));

    afterEach(function () {});

    // self playing: make 2 passes, mock a score create request -> verify score is created, game is over, user is focussing on other games
    it('end to end flow', mochaAsync(async () => {
      const userOne = await User.genByFBID(userOneID);
      const gameID = userOne.getCurrentGame().getID();
      await genSendCreateScoringRequest(userOneID, {
        gameID,
        blackTerritory: 100,
        blackCapture: 5,
        whiteTerritory: 50,
        whiteCapture: 10,
        board: '[]',
      });

      // check opponent receiving message
      let message = getLastMessageForUser(userTwoID);
      expect(message.attachment.payload.text).to.equal(
        got('countScore.createdScoringMessage', lan, {opponentName: userOneName, color: got('Black', lan), score: 38.5}));
      expect(message.attachment.payload.buttons.length).to.equal(1);
      expect(message.attachment.payload.buttons[0].title).to.equal(got('countScore.seeScoringButton', lan));
      expect(message.attachment.payload.buttons[0].type).to.equal('web_url');

      let userOneScoring = await GameScoring.genBy({gameID, creatorID: userOne.getID()});
      expect(userOneScoring.getStatus()).to.equal(GameScoringRequestStatus.PENDING);

      // user 2 send reject
      await genSendRejectScoringRequest(userTwoID, {
        gameID,
        scoringID: userOneScoring.getID(),
      });

      message = getLastMessageForUser(userOneID);
      expect(message.attachment.payload.text).to.equal(
        got('countScore.rejectScoringMessage', lan, {opponentName: userTwoName}));
      expect(message.attachment.payload.buttons.length).to.equal(1);
      expect(message.attachment.payload.buttons[0].title).to.equal(got('countScore.seeScoringButton', lan));
      expect(message.attachment.payload.buttons[0].type).to.equal('web_url');
      userOneScoring = await GameScoring.genByIDAndGameID(userOneScoring.getID(), gameID);
      expect(userOneScoring.getStatus()).to.equal(GameScoringRequestStatus.REJECTED);

      // user 1 update
      await genSendUpdateScoringRequest(userOneID, {
        gameID,
        scoringID: userOneScoring.getID(),
        blackTerritory: 70,
        blackCapture: 5,
        whiteTerritory: 90,
        whiteCapture: 10,
        board: '[]',
      });
      message = getLastMessageForUser(userTwoID);
      expect(message.attachment.payload.text).to.equal(
        got('countScore.updatedScoringMessage', lan, {opponentName: userOneName, color: got('White', lan), score: 31.5}));
      expect(message.attachment.payload.buttons.length).to.equal(1);
      expect(message.attachment.payload.buttons[0].title).to.equal(got('countScore.seeScoringButton', lan));
      expect(message.attachment.payload.buttons[0].type).to.equal('web_url');
      userOneScoring = await GameScoring.genByIDAndGameID(userOneScoring.getID(), gameID);
      expect(userOneScoring.getStatus()).to.equal(GameScoringRequestStatus.PENDING);

      // user 2 create again
      await genSendCreateScoringRequest(userTwoID, {
        gameID,
        blackTerritory: 200,
        blackCapture: 5,
        whiteTerritory: 50,
        whiteCapture: 10,
        board: '[]',
      });

      const userTwo = await User.genByFBID(userTwoID);
      let userTwoScoring = await GameScoring.genBy({gameID, creatorID: userTwo.getID()});
      expect(userTwoScoring.getStatus()).to.equal(GameScoringRequestStatus.PENDING);

      message = getLastMessageForUser(userOneID);
      expect(message.attachment.payload.text).to.equal(
        got('countScore.createdScoringMessage', lan, {opponentName: userTwoName, color: got('Black', lan), score: 138.5}));
      expect(message.attachment.payload.buttons.length).to.equal(1);
      expect(message.attachment.payload.buttons[0].title).to.equal(got('countScore.seeScoringButton', lan));
      expect(message.attachment.payload.buttons[0].type).to.equal('web_url');

      // user 2 accept
      await genSendAcceptScoringRequest(userTwoID, {
        gameID,
        scoringID: userOneScoring.getID(),
      });

      userOneScoring = await GameScoring.genByIDAndGameID(userOneScoring.getID(), gameID);
      expect(userOneScoring.getStatus()).to.equal(GameScoringRequestStatus.ACCEPTED);
      const game = await GoGame.genEnforce(gameID);
      expect(game.getStatus()).to.equal(GameStatus.WHITE_WINS);
      expect(game.getWinsBy()).to.equal(31.5);
      expect(game.getScoreText()).to.equal('W+31.5');

      // check final messages
      let userOneMessages = getLastMessagesForUser(userOneID, 2);
      expect(userOneMessages[0].text).to.equal(
        got('countScore.acceptSelfScoringMessage', lan, {opponentName: userTwoName}) +
          got('countScore.winsByText', lan, {opponentName: userTwoName, color: got('White', lan), score: 31.5}));
      expect(userOneMessages[1].text).to.equal(
        got('inGameMessage.focusOnGameWith', lan, {opponentName: got('inGameMessage.self', lan)}) + ' ');

      let userTWoMessages = getLastMessagesForUser(userTwoID, 2);
      expect(userTWoMessages[0].text).to.equal(
        got('countScore.winsByText', lan, {opponentName: userOneName, color: got('White', lan), score: 31.5}));
      expect(userTWoMessages[1].attachment.payload.text).to.equal(got('inGameMessage.notPlayingWhatDoYouWantToDo', lan));
    }));

    it('validate errors', mochaAsync(async () => {
        // verify user1 create, user1 cannot reject/accept
        const userOne = await User.genByFBID(userOneID);
        const gameID = userOne.getCurrentGame().getID();
        await genSendCreateScoringRequest(userOneID, {
          gameID,
          blackTerritory: 100,
          blackCapture: 5,
          whiteTerritory: 50,
          whiteCapture: 10,
          board: '[]',
        });

        let userOneScoring = await GameScoring.genBy({gameID, creatorID: userOne.getID()});

        let exception = null;
        try {
          await genSendAcceptScoringRequest(userOneID, {
            gameID,
            scoringID: userOneScoring.getID(),
          });
        } catch (err) {
          exception = err;
        }
        expect(exception).to.not.be.null;

        exception = null;
        try {
          await genSendRejectScoringRequest(userOneID, {
            gameID,
            scoringID: userOneScoring.getID(),
          });
        } catch (err) {
          exception = err;
        }
        expect(exception).to.not.be.null;

        // verify user 1 cannot create again
        exception = null;
        try {
          await genSendCreateScoringRequest(userOneID, {
            gameID,
            blackTerritory: 130,
            blackCapture: 25,
            whiteTerritory: 30,
            whiteCapture: 10,
            board: '[]',
          });
        } catch (err) {
          exception = err;
        }
        expect(exception).to.not.be.null;

        // verify user 2 cannot update uesr 1's scoring
        exception = null;
        try {
          await genSendUpdateScoringRequest(userTwoID, {
            gameID,
            scoringID: userOneScoring.getID(),
            blackTerritory: 20,
            blackCapture: 5,
            whiteTerritory: 90,
            whiteCapture: 10,
            board: '[]',
          });
        } catch (err) {
          exception = err;
        }
        expect(exception).to.not.be.null;
    }));
  });
});

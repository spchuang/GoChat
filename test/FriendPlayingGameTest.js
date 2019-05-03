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
  expectImage,
  genSendCreateGameRequest,
  genSendJoinGameRequest,
} from './TestHelpers';
import GameRoom from '../src/class/GameRoom';
import Game from '../src/class/Game';
import {GameStatus} from '../src/class/ClassEnums';
import ResponseHandler from '../src/response/ResponseHandler';
import Bot from 'fb-local-chat-bot';
import {PostBackTypes} from '../src/response/PostBackUtils';
import {got} from '../src/translations/Translator';

describe('Friend playing game test', function() {
  this.timeout(60000);
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

    // create game room for user 1
    await genSendCreateGameRequest(
      userOneID,
      {gameType: 'friend', boardSize: 19, komi: 6.5, handicap: 0, color: 'black'},
    );
    var room = await GameRoom.genByUser(userOne.getID());
    roomCode = room.getCode();

    // join game room for user 2
    await genSendJoinGameRequest(userTwoID, roomCode);
  }));

  afterEach(function (done) {
    Bot.clearLocalChatMessages();
    Bot.removeAllListeners();
    server.close(done);
  });

  it ('Start handicap game with friend', mochaAsync(async () => {
    let userOne = await User.genByFBID(userOneID);
    // quit the game first
    await ResponseHandler.handleText(userOneID, "quit");

    await genSendCreateGameRequest(
      userOneID,
      {gameType: 'friend', boardSize: 19, komi: 0, handicap: 3, color: 'white'},
    );
    var room = await GameRoom.genByUser(userOne.getID());
    roomCode = room.getCode();
    await genSendJoinGameRequest(userTwoID, roomCode);

    // expect proper message
    let messagesOne = getLastMessagesForUser(userOneID, 2);
    expect(messagesOne[0].text)
      .to.equal(got('inGameMessage.startNewGame', lan, {enemy: userTwoName, nextColor: got('White', lan), nextUser: got('You', lan)}));
    expectImage(messagesOne[1]);
    let messagesTwo = getLastMessagesForUser(userTwoID, 2);
    expect(messagesTwo[0].text)
      .to.equal(got('inGameMessage.startNewGame', lan, {enemy: userOneName, nextColor: got('White', lan), nextUser: userOneName}));
    expectImage(messagesTwo[1]);

    userOne = await User.genByFBID(userOneID);
    let userTwo = await User.genByFBID(userTwoID);
    let gameOne = userOne.getCurrentGame();
    let gameTwo = userTwo.getCurrentGame();
    expect(gameOne.getID()).to.equal(gameTwo.getID()); // both are playing the same game
    expect(gameOne.getBlackUserID()).to.equal(userTwo.getID());
    expect(gameOne.getWhiteUserID()).to.equal(userOne.getID());
    expect(gameOne.getStatus()).to.equal(GameStatus.PLAYING);
    expect(gameOne.getIsBlackTurn()).to.be.false;
    expect(gameOne.getKomi()).to.equal(0);
    expect(gameOne.getHandicap()).to.equal(3);
    expect(gameOne.getStonesHistory()).to.deep.equal([]);
    const board = {
      stones: [
        {"location":[3,15],"color":"x"},
        {"location":[15,3],"color":"x"},
        {"location":[3,3],"color":"x"},
      ],
    };
    expect(gameOne.getWeiqiHistory()).to.deep.equal({history: [board]});
    expect(gameOne.getWeiqiBoard()).to.deep.equal(board);
  }));

  it('Should play the same game', mochaAsync(async () => {
    // expect proper message
    let messagesOne = getLastMessagesForUser(userOneID, 2);
    expect(messagesOne[0].text)
      .to.equal(got('inGameMessage.startNewGame', lan, {enemy: userTwoName, nextColor: got('Black', lan), nextUser: got('You', lan)}));
    expectImage(messagesOne[1]);
    let messagesTwo = getLastMessagesForUser(userTwoID, 2);
    expect(messagesTwo[0].text)
      .to.equal(got('inGameMessage.startNewGame', lan, {enemy: userOneName, nextColor: got('Black', lan), nextUser: userOneName}));
    expectImage(messagesTwo[1]);

    // verify both users are in game
    let userOne = await User.genByFBID(userOneID);
    let userTwo = await User.genByFBID(userTwoID);
    expect(userOne.isPlaying()).to.be.true;
    expect(userTwo.isPlaying()).to.be.true;

    let gameOne = userOne.getCurrentGame();
    let gameTwo = userTwo.getCurrentGame();
    expect(gameOne.getID()).to.equal(gameTwo.getID()); // both are playing the same game
    expect(gameOne.getBlackUserID()).to.equal(userOne.getID());
    expect(gameOne.getWhiteUserID()).to.equal(userTwo.getID());
    expect(gameOne.getStatus()).to.equal(GameStatus.PLAYING);
  }));

  it('Game turn function',  mochaAsync(async () => {
    let userOne = await User.genByFBID(userOneID);
    let userTwo = await User.genByFBID(userTwoID);

    await ResponseHandler.handleText(userOneID, "d4");

    let user = await User.genByFBID(userTwoID);
    let game = user.getCurrentGame();
    expect(game.getIsBlackTurn()).to.be.false;
    expect(game.isUserTurn(userOne.getID())).to.be.false;
    expect(game.isUserTurn(userTwo.getID())).to.be.true;

    await ResponseHandler.handleText(userTwoID, "d5");
    user = await User.genByFBID(userOneID);
    game = user.getCurrentGame();
    expect(game.getIsBlackTurn()).to.be.true;
    expect(game.isUserTurn(userOne.getID())).to.be.true;
    expect(game.isUserTurn(userTwo.getID())).to.be.false;
  }));

  it('Okay to play moves', mochaAsync(async () => {
    await ResponseHandler.handleText(userOneID, "d4");

    // check first move messages
    let messagesOne = getLastMessagesForUser(userOneID, 2);
    let expectPlayMsgOne = got('inGameMessage.selfPlayMove', lan, {color: got('Black', lan), positionText: 'D, 4'}) + ' ' +
      got('inGameMessage.enemyTurnToPlay', lan, {enemy: userTwoName, color: got('White', lan)});
    expect(messagesOne[0].text).to.equal(expectPlayMsgOne);
    expectImage(messagesOne[1]);

    let messagesTwo = getLastMessagesForUser(userTwoID, 2);
    let expectPlayMsgTwo = got('inGameMessage.enemyPlayMove', lan, {enemy: userOneName, color: got('Black', lan), positionText: 'D, 4'}) + ' ' +
      got('inGameMessage.selfTurnToPlay', lan, {color: got('White', lan)});
    expect(messagesTwo[0].text).to.equal(expectPlayMsgTwo);
    expectImage(messagesTwo[1]);

    await ResponseHandler.handleText(userTwoID, "d5");

    // check second move messages
    messagesOne = getLastMessagesForUser(userOneID, 2);
    expectPlayMsgOne = got('inGameMessage.enemyPlayMove', lan, {enemy: userTwoName, color: got('White', lan), positionText: 'D, 5'}) + ' ' +
      got('inGameMessage.selfTurnToPlay', lan, {color: got('Black', lan)});
    expect(messagesOne[0].text).to.equal(expectPlayMsgOne);
    expectImage(messagesOne[1]);

    messagesTwo = getLastMessagesForUser(userTwoID, 2);
    expectPlayMsgTwo = got('inGameMessage.selfPlayMove', lan, {color: got('White', lan), positionText: 'D, 5'}) + ' ' +
      got('inGameMessage.enemyTurnToPlay', lan, {enemy: userOneName, color: got('Black', lan)});
    expect(messagesTwo[0].text).to.equal(expectPlayMsgTwo);
    expectImage(messagesTwo[1]);

    // check game state
    let user = await User.genByFBID(userOneID);
    let game = user.getCurrentGame();
    expect(game.getCurrentMoveColorText()).to.equal('Black');
    expect(game.getStones()).to.deep.equal([
      { color: 'black', x: 3, y: 3 },
      { color: 'white', x: 3, y: 4 },
    ]);
  }));

  it('Okay to pass moves', mochaAsync(async () => {
    await ResponseHandler.handleText(userOneID, "d4");
    await ResponseHandler.handleText(userTwoID, "d5");

    await ResponseHandler.handleText(userOneID, "d6");
    await ResponseHandler.handleText(userTwoID, "d7");

    await ResponseHandler.handlePostback(userOneID, PostBackTypes.PASS_MOVE);
    await ResponseHandler.handlePostback(userTwoID, PostBackTypes.PASS_MOVE);

    // check messages
    let messagesOne = getLastMessagesForUser(userOneID, 2);
    expect(messagesOne[0].text).to.equal(got('inGameMessage.selfPassMove', lan) + ' ' +
      got('inGameMessage.enemyTurnToPlay', lan, {color: got('White', lan), enemy: userTwoName}));
    expect(messagesOne[1].attachment.payload.text).to.equal(
      got('inGameMessage.enemyPassMove', lan, {enemy: userTwoName}) + ' ' +
        got('inGameMessage.gameInScoreCounting', lan, {opponentName: userTwoName}));
    expect(messagesOne[1].attachment.payload.buttons[0].title).to.equal(got('button.countScore', lan));
    expect(messagesOne[1].attachment.payload.buttons[0].type).to.equal('web_url');


    let messagesTwo = getLastMessagesForUser(userTwoID, 2);
    expect(messagesTwo[0].text).to.equal(got('inGameMessage.enemyPassMove', lan, {enemy: userOneName}) + ' ' +
      got('inGameMessage.selfTurnToPlay', lan, {color: got('White', lan)}));
    expect(messagesTwo[1].attachment.payload.text).to.equal(got('inGameMessage.selfPassMove', lan) + ' ' +
      got('inGameMessage.gameInScoreCounting', lan, {opponentName: userOneName}));
    expect(messagesTwo[1].attachment.payload.buttons[0].title).to.equal(got('button.countScore', lan));
    expect(messagesTwo[1].attachment.payload.buttons[0].type).to.equal('web_url');

    let user = await User.genByFBID(userOneID);
    let game = user.getCurrentGame();
  }));

  it('Okay for current turn to quit', mochaAsync(async () => {
    await ResponseHandler.handleText(userOneID, "d4");
    await ResponseHandler.handleText(userTwoID, "d5");
    let userOne = await User.genByFBID(userOneID);
    let gameID = userOne.getCurrentGameID();

    // current turn quits
    await ResponseHandler.handleText(userOneID, "q");
    userOne = await User.genByFBID(userOneID);
    let userTwo = await User.genByFBID(userTwoID);
    expect(userOne.isInactive()).to.be.true;
    expect(userTwo.isInactive()).to.be.true;

    // opponent wins (black quits)
    let game = await Game.genEnforce(gameID);
    expect(game.getStatus()).to.equal(GameStatus.WHITE_WINS);

    // check messages
    let messagesOne = getLastMessagesForUser(userOneID, 2);
    expect(messagesOne[0].text).to.equal(got('inGameMessage.selfQuitGame', lan));
    expect(messagesOne[1].attachment.payload.text).to.equal(got('inGameMessage.notPlayingWhatDoYouWantToDo', lan));

    let messagesTwo = getLastMessagesForUser(userTwoID, 2);
    expect(messagesTwo[0].text).to.equal(got('inGameMessage.enemyQuitGame', lan, {enemy: userOneName}));
    expect(messagesTwo[1].attachment.payload.text).to.equal(got('inGameMessage.notPlayingWhatDoYouWantToDo', lan));
  }));

  it('Okay for other turn to quit', mochaAsync(async () => {
    await ResponseHandler.handleText(userOneID, "d4");
    await ResponseHandler.handleText(userTwoID, "d5");
    let userOne = await User.genByFBID(userOneID);
    let gameID = userOne.getCurrentGameID();

    await ResponseHandler.handleText(userTwoID, "q");
    userOne = await User.genByFBID(userOneID);
    let userTwo = await User.genByFBID(userTwoID);
    expect(userOne.isInactive()).to.be.true;
    expect(userTwo.isInactive()).to.be.true;

    // current turn wins (white quits)
    let game = await Game.genEnforce(gameID);
    expect(game.getStatus()).to.equal(GameStatus.BLACK_WINS);

    // check messages
    let messagesTwo = getLastMessagesForUser(userTwoID, 2);
    expect(messagesTwo[0].text).to.equal(got('inGameMessage.selfQuitGame', lan));
    expect(messagesTwo[1].attachment.payload.text).to.equal(got('inGameMessage.notPlayingWhatDoYouWantToDo', lan));

    let messagesOne = getLastMessagesForUser(userOneID, 2);
    expect(messagesOne[0].text).to.equal(got('inGameMessage.enemyQuitGame', lan, {enemy: userTwoName}));
    expect(messagesOne[1].attachment.payload.text).to.equal(got('inGameMessage.notPlayingWhatDoYouWantToDo', lan));
  }));

  // spchuang 12/4: deprecate this for now until we figure out a better way to use it
  // it('send in-game message', mochaAsync(async () => {
  //   await ResponseHandler.handleText(userOneID, '?');
  //   let buttons = getLastMessageForUser(userOneID).quick_replies;
  //   expect(buttons.length).to.equal(5);
  //
  //   await ResponseHandler.handlePostback(userOneID, PostBackTypes.SHOW_CANNED_MESSAGES);
  //   buttons = getLastMessageForUser(userOneID).quick_replies;
  //   expect(buttons.length).to.equal(5);
  //
  //   await ResponseHandler.handlePostback(userOneID, buttons[0].payload);
  //
  //   const messageTwo = getLastMessageForUser(userTwoID);
  //   expect(messageTwo.text).to.equal(
  //     got('inGameMessage.receivedMessageFromOpponent', lan,
  //       {enemy: userOneName, message: got('button.messageHurryUp', lan)},
  //     ));
  // }));
});

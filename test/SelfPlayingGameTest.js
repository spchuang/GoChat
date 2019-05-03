// @flow

'use strict';

import 'babel-polyfill';
import {expect} from 'chai';
import makeServer from '../src/server';
import {
  mochaAsync,
  getLastMessageForUser,
  getLastMessagesForUser,
  genSendCreateGameRequest,
  expectImage
} from './TestHelpers';
import User from '../src/class/User';
import ResponseHandler from '../src/response/ResponseHandler';
import Bot from 'fb-local-chat-bot';
import {PostBackTypes} from '../src/response/PostBackUtils';
import ParseUtil from '../src/utils/ParseUtil';
import WeiqiSerializer from '../src/utils/WeiqiSerializer';
import {got} from '../src/translations/Translator';
import fs from 'fs';
import sgf from 'smartgame';

describe('Self playing game test', function() {
  this.timeout(50000);
  let server;
  let userID = 'testUser';
  let lan = 'en';
  beforeEach(mochaAsync(async () => {
    server = await makeServer(true /* silent */);
  }));

  afterEach(function (done) {
    Bot.clearLocalChatMessages();
    Bot.removeAllListeners();
    server.close(done);
  });

  it('Start game', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);

    let messages = getLastMessagesForUser(userID, 2);
    expect(messages[0].text).to.equal(
      got('inGameMessage.startNewGame', lan, {enemy: got('inGameMessage.self', lan), nextColor: got('Black', lan), nextUser: got('You', lan)}));
    expectImage(messages[1]);

    let user = await User.genByFBID(userID);
    expect(user.isPlaying()).to.be.true;
    let game = user.getCurrentGame();
    expect(game.isSelfPlayingGame()).to.be.true;
    expect(game.getWhiteUserID()).to.equal(user.getID());
    expect(game.getBlackUserID()).to.equal(user.getID());
    expect(game.getIsBlackTurn()).to.be.true;
    expect(game.getStonesHistory()).to.deep.equal([]);
    expect(game.getWeiqiBoardSize()).to.equal(19);
    expect(game.getWeiqiConsecutivePasses()).to.equal(0);
    expect(JSON.stringify(game.getWeiqiHistory())).to.deep.equal(WeiqiSerializer.emptyHistory);
    expect(JSON.stringify(game.getWeiqiBoard())).to.deep.equal(WeiqiSerializer.emptyBoard);
  }));

  it('Start handicap game', mochaAsync(async () => {
    await ResponseHandler.handleText(userID, "help");
    await genSendCreateGameRequest(
      userID,
      {gameType: 'self', boardSize: 19, komi: 0, handicap: 3},
    );

    let messages = getLastMessagesForUser(userID, 2);
    expect(messages[0].text).to.equal(
      got('inGameMessage.startNewGame', lan, {enemy: got('inGameMessage.self', lan), nextColor: got('White', lan), nextUser: got('You', lan)}));
    expectImage(messages[1]);

    let user = await User.genByFBID(userID);
    expect(user.isPlaying()).to.be.true;
    let game = user.getCurrentGame();
    expect(game.isSelfPlayingGame()).to.be.true;
    expect(game.getWhiteUserID()).to.equal(user.getID());
    expect(game.getBlackUserID()).to.equal(user.getID());
    expect(game.getIsBlackTurn()).to.be.false;
    expect(game.getStonesHistory()).to.deep.equal([]);
    expect(game.getWeiqiBoardSize()).to.equal(19);
    expect(game.getKomi()).to.equal(0);
    expect(game.getHandicap()).to.equal(3);
    expect(game.getWeiqiConsecutivePasses()).to.equal(0);
    const board = {
      stones: [
        {"location":[3,15],"color":"x"},
        {"location":[15,3],"color":"x"},
        {"location":[3,3],"color":"x"},
      ],
    };
    expect(game.getWeiqiHistory()).to.deep.equal({history: [board]});
    expect(game.getWeiqiBoard()).to.deep.equal(board);
  }));

  it('quit game', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);
    await ResponseHandler.handlePostback(userID, PostBackTypes.RESIGN_GAME);

    let messages = getLastMessagesForUser(userID, 2);
    expect(messages[0].text).to.equal(got('inGameMessage.selfQuitGame', lan));
    expect(messages[1].attachment.payload.text).to.equal(got('inGameMessage.notPlayingWhatDoYouWantToDo', lan));
    let user = await User.genByFBID(userID);
    expect(user.isInactive()).to.be.true;
    let game = user.getCurrentGame();
    expect(game).to.not.exist;
  }));

  it('show help in game', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);
    await ResponseHandler.handleText(userID, "help");

    expect(getLastMessageForUser(userID).text)
      .to.equal(
        got('inGameMessage.focusOnGameWith', lan, {opponentName: got('inGameMessage.self', lan)}) + ' ' +
          got('inGameMessage.inGameHelp', lan));
  }));

  it('pass', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);
    await ResponseHandler.handlePostback(userID, PostBackTypes.PASS_MOVE);

    let expectText =
      got('inGameMessage.selfPassMove', lan) + ' ' +
      got('inGameMessage.enemyTurnToPlay', lan, {enemy: 'null', color: got('White', lan)});
    expect(getLastMessageForUser(userID).text).to.equal(expectText);
    let user = await User.genByFBID(userID);
    let game = user.getCurrentGame();
    expect(game.getIsBlackTurn()).to.be.false;
  }));

  it('Play message', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);

    // play black move
    await ResponseHandler.handleText(userID, 'D5');

    let messages = getLastMessagesForUser(userID, 2);
    let expectPlayMsg = got('inGameMessage.selfPlayMove', lan, {color: got('Black', lan), positionText: 'D, 5'}) + ' ' +
      got('inGameMessage.selfTurnToPlay', lan, {color: got('White', lan)});
    expect(messages[0].text).to.equal(expectPlayMsg);
    expectImage(messages[1]);

    // play white move
    await ResponseHandler.handleText(userID, 'D6');
    messages = getLastMessagesForUser(userID, 2);
    expectPlayMsg = got('inGameMessage.selfPlayMove', lan, {color: got('White', lan), positionText: 'D, 6'}) + ' ' +
      got('inGameMessage.selfTurnToPlay', lan, {color: got('Black', lan)});
    expect(messages[0].text).to.equal(expectPlayMsg);
    expectImage(messages[1]);
  }));

  it('bad move - stone already taken', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);
    await ResponseHandler.handleText(userID, 'D5');
    await ResponseHandler.handleText(userID, 'D5');

    const expectText = got('typedException.invalidMove', lan) + ' ' + got('typedException.PLAY_ON_EXISTING_STONE', lan);
    expect(getLastMessageForUser(userID).text).to.equal(expectText);
  }));

  it('bad move - stone out of board boundary', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);
    await ResponseHandler.handleText(userID, 'D20');

    const expectText = got('typedException.invalidMove', lan) + ' ' + got('typedException.PLAY_OUT_OF_BOUND', lan);
    expect(getLastMessageForUser(userID).text).to.equal(expectText);
  }));

  it('play a lot of move - verify last move is correct', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);
    let moves = ['D1', 'D2', 'D3', 'D4','D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12','D13', 'D14', 'D15', 'D16'];
    for (let m of moves) {
      await ResponseHandler.handleText(userID, m);
    }

    let user = await User.genByFBID(userID);
    let game = user.getCurrentGame();
    expect(game.getLastStonePlayed()).to.deep.equal([3, 15]);
  }));

  it('Play till the end', mochaAsync(async () => {
    await ResponseHandler.handlePostback(userID, PostBackTypes.PLAY_WITH_SELF);
    let example = fs.readFileSync(__dirname + '/sgf/Fan_Hui_AlphaGo_10-03-2016.sgf', { encoding: 'utf8' });
    let collection = sgf.parse(example);
    let sgfMoves = collection.gameTrees[0].nodes;
    sgfMoves.shift();

    // now moves is an array of moves [{B: 'pd'}, {W: 'dd'}...]
    let color = 'B';
    let i = 15;
    for (let move of sgfMoves) {
      let moveText = ParseUtil.convertSGFMovetoString(move[color]);
      await ResponseHandler.handleText(userID, moveText);

      color = color === 'B' ? 'W' : 'B';
      // only play till 10 moves
      i--;
      if (i < 0) {
        break;
      }
    }
  }));

  it('Show error when send in-game only commands (pass, undo, show board, resign)', mochaAsync(async () => {
    await ResponseHandler.handleText(userID, "help");

    const expectedMessage = got('normalMessage.youAreNotPlayingAnyGame', lan);
    await ResponseHandler.handlePostback(userID, PostBackTypes.SHOW_CURRENT_GAME_STATUS);

    expect(getLastMessageForUser(userID).text).to.equal(expectedMessage);

    await ResponseHandler.handlePostback(userID, PostBackTypes.PASS_MOVE);
    expect(getLastMessageForUser(userID).text).to.equal(expectedMessage);

    await ResponseHandler.handlePostback(userID, PostBackTypes.UNDO_MOVE);
    expect(getLastMessageForUser(userID).text).to.equal(expectedMessage);

    await ResponseHandler.handlePostback(userID, PostBackTypes.RESIGN_GAME);
    expect(getLastMessageForUser(userID).text).to.equal(expectedMessage);

    await ResponseHandler.handlePostback(userID, PostBackTypes.SHOW_ACTIVE_GAMES);
    expect(getLastMessageForUser(userID).text).to.equal(expectedMessage);

    await ResponseHandler.handlePostback(userID, PostBackTypes.SHOW_CANNED_MESSAGES);
    expect(getLastMessageForUser(userID).text).to.equal(expectedMessage);

    await ResponseHandler.handlePostback(userID, PostBackTypes.SEND_CANNED_MESSAGE);
    expect(getLastMessageForUser(userID).text).to.equal(expectedMessage);
  }));
});

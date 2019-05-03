// @flow

'use strict';

const expect = require('chai').expect;
const WeiqiSerializer = require('../build/utils/WeiqiSerializer.js');
const Weiqi = require('Weiqi');
const Immutable = require('immutable');

describe('WeiqiSerializer', function() {
  /*
  describe('createWeiqiGame', function() {
    let weiqiBoardSize = 19;
    let weiqiGame = Weiqi.createGame(weiqiBoardSize)
    .play(Weiqi.BLACK, [2,2])
    .play(Weiqi.WHITE, [6,7])
    .play(Weiqi.BLACK, [9,9])
    .play(Weiqi.WHITE, [10,10])
    .pass(Weiqi.BLACK)  // black passes
    .pass(Weiqi.WHITE); // white passes

    let weiqiHistory = WeiqiSerializer.createBoardHistoryObject(weiqiGame.history);
    let weiqiBoard = WeiqiSerializer.createBoardObject(weiqiGame.board.stones);
    let weiqiConsectutivePasses = weiqiGame.consectutivePasses;
    let isBlackTurn = weiqiGame.currentColor == Weiqi.BLACK ? true : false;

    let testGame = WeiqiSerializer.createWeiqiGame(weiqiBoardSize, weiqiHistory, weiqiBoard, weiqiConsectutivePasses, isBlackTurn);

    it('game created from createWeiqiGame should have the same board size', function() {
      expect(testGame.board.size).to.equal(weiqiGame.board.size);
    });
    it('game created from createWeiqiGame should have the same stones in the board object', function() {
      expect(Immutable.is(testGame.board.stones, weiqiGame.board.stones)).to.be.true;
    });
    it('game created from createWeiqiGame should have the same history', function() {
      expect(Immutable.is(testGame.history, weiqiGame.history)).to.be.true;
    });
    it('game created from createWeiqiGame should have the same number of conescutive passes', function() {
      expect(testGame.consectutivePasses).to.equal(weiqiGame.consectutivePasses);
    });
    it('game created from createWeiqiGame should have the same currentColor', function() {
      expect(testGame.currentColor).to.equal(weiqiGame.currentColor);
    });
  });
  describe('createBoardHistoryObject', function() {
    let weiqiBoardSize = 19;
    let weiqiGame = Weiqi.createGame(weiqiBoardSize);
    it('empty board history be corret', function() {
      expect(JSON.stringify(WeiqiSerializer.createBoardHistoryObject(weiqiGame.board.stones)))
        .to.equal("{\"history\":[{\"stones\":[]}]}");
    });

    let weiqiGamePlayed = weiqiGame.play(Weiqi.BLACK, [2,2]);
    it('passing non empty board state', function() {
      expect(JSON.stringify(WeiqiSerializer.createBoardHistoryObject(weiqiGamePlayed.board.stones)))
        .to.equal("{\"history\":[{\"stones\":[{\"location\":[2,2],\"color\":\"x\"}]}]}");
    });
  });
  */
  describe('createBoardString', function() {
    let weiqiBoardSize = 19;
    let weiqiGame = Weiqi.createGame(weiqiBoardSize);
    let boardString = '1000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000002'
    weiqiGame = weiqiGame.play(Weiqi.BLACK, [5,6]);
    weiqiGame = weiqiGame.play(Weiqi.WHITE, [7,8]);
    weiqiGame = weiqiGame.play(Weiqi.BLACK, [0,18]);
    weiqiGame = weiqiGame.play(Weiqi.WHITE, [18,0]);
    weiqiGame = weiqiGame.play(Weiqi.BLACK, [0,0]);
    weiqiGame = weiqiGame.play(Weiqi.WHITE, [18,18]);
    const stones = [
      {x: 5, y: 6, color: 'black'},
      {x: 7, y: 8, color: 'white'},
      {x: 0, y: 18, color: 'black'},
      {x: 18, y: 0, color: 'white'},
      {x: 0, y: 0, color: 'black'},
      {x: 18, y: 18, color: 'white'},
    ];
    // weiqiGame.play(Weiqi.WHITE, [8,9]);
    it('After playing a few stones, createBoardString should return the right string representation', function(){
      expect(WeiqiSerializer.createBoardString(stones, weiqiBoardSize)).to.equal(boardString);
    })
  });
});

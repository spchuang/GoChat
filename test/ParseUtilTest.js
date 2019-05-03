// @flow

'use strict';

const expect = require('chai').expect;
const ParseUtil = require('../build/utils/ParseUtil.js');

describe('ParseUtil', function() {
  describe('isPlayCommand', function() {
    it('should return true', function() {
      expect(ParseUtil.isPlayCommand('PLAY')).to.be.true;
      expect(ParseUtil.isPlayCommand('play')).to.be.true;
      expect(ParseUtil.isPlayCommand('p')).to.be.true;
      expect(ParseUtil.isPlayCommand('P')).to.be.true;
      expect(ParseUtil.isPlayCommand('go')).to.be.true;
    });
  });
  describe('isHelpCommand', function() {
    it('should return true', function() {
      expect(ParseUtil.isHelpCommand('help')).to.be.true;
      expect(ParseUtil.isHelpCommand('h')).to.be.true;
      expect(ParseUtil.isHelpCommand('?')).to.be.true;
      expect(ParseUtil.isHelpCommand('menu')).to.be.true;
      expect(ParseUtil.isHelpCommand('m')).to.be.true;
    });
  });
  describe('isQuitCommand', function() {
    it('should return true', function() {
      expect(ParseUtil.isQuitCommand('q')).to.be.true;
      expect(ParseUtil.isQuitCommand('quit')).to.be.true;
    });
  });

  describe('isPassCommand', function() {
    it('should return true', function() {
      expect(ParseUtil.isPassCommand('p')).to.be.true;
      expect(ParseUtil.isPassCommand('pass')).to.be.true;
    });
  });

  describe('isProperGameRoomCode', function() {
    it('should return true', function() {
      expect(ParseUtil.isProperGameRoomCode('1234')).to.be.true;

    });
    it('should return false', function() {
      expect(ParseUtil.isProperGameRoomCode('TEST 123 - 432')).to.be.false;
      expect(ParseUtil.isProperGameRoomCode('!@#')).to.be.false;
    });
  });

  describe('parsePositionText', function() {
    it('should parse correctly', function() {
      expect(ParseUtil.parsePositionText('A,4')).to.eql([0,3]);
      expect(ParseUtil.parsePositionText('A4')).to.eql([0,3]);
      expect(ParseUtil.parsePositionText('A-4')).to.eql([0,3]);
      expect(ParseUtil.parsePositionText('A,    4')).to.eql([0,3]);
      expect(ParseUtil.parsePositionText('A14')).to.eql([0,13]);
      expect(ParseUtil.parsePositionText('A.4')).to.eql([0,3]);
      expect(ParseUtil.parsePositionText('A,14')).to.eql([0,13]);
      expect(ParseUtil.parsePositionText('a    4')).to.eql([0,3]);
    });

    it('should throw', function() {
      expect(ParseUtil.parsePositionText.bind('a,4,5')).to.throw(Error);
      expect(ParseUtil.parsePositionText.bind('ab 5')).to.throw(Error);
      expect(ParseUtil.parsePositionText.bind('a 156')).to.throw(Error);
      expect(ParseUtil.parsePositionText.bind('a')).to.throw(Error);
      expect(ParseUtil.parsePositionText.bind('aaa')).to.throw(Error);
    });
  });
});

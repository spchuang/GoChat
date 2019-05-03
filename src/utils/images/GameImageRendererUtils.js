// @flow

'use strict';

import sharp from 'sharp';
import S3Utils from '../S3Utils';
import rp from 'request-promise';
import TextToSVG from 'text-to-svg';
import Promise from 'bluebird';
import BoardImageRendererUtils from './BoardImageRendererUtils';
import ProfileImageUtils from './ProfileImageUtils';
import SimpleCache from '../SimpleCache';
import ImageUtils from './ImageUtils';
import GoGame from '../../class/Game';

const GameCache = new SimpleCache();

const textToSVG = TextToSVG.loadSync();

const BOARD_TOP_PADDING = 150;
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 1000 + BOARD_TOP_PADDING;

const GAME_MINI_WIDTH = 955;
const GAME_MINI_HEIGHT = 500;
const GAME_MINI_BOARD_SIZE = 460;
const GAME_MINI_BOARD_PADDING = 20;
const GAME_MINI_LEFT_HALF_WITDTH = GAME_MINI_WIDTH - GAME_MINI_BOARD_SIZE - GAME_MINI_BOARD_PADDING * 2;

function _getShortname(name: string, maxLength: number): string {
  // if character length is greater than max, we try to split the name further
  // last resort is to slice
  if (name.length <= maxLength) {
    return name;
  }
  let split = name.split(' ');
  if (split.length > 1) {
    return split[0].substring(0, maxLength);
  }
  split = name.split('-');
  if (split.length > 1) {
    return split[0].substring(0, maxLength);
  }
  return name.substring(0, maxLength);
}

function _getTextBuffer(
  text: string,
  fontSize: number,
): Buffer {
  const attributes = {fill: 'black', stroke: 'black'};
  const options = {x: 0, y: 0, fontSize: fontSize, anchor: 'top', attributes: attributes};
  const svg = textToSVG.getSVG(text, options);
  return new Buffer(svg);
}

async function _genBaseImageComponents(
  game: GoGame,
  stoneSize: number,
  profileSize: number,
  fontSize: number,
  maxNameLength: number,
): Promise<[Buffer, Buffer, Buffer, Buffer, Buffer, Buffer]> {
  const [blackStone, whiteStone, blackUser, whiteUser] = await Promise.all([
    sharp(ImageUtils.getPath('black')).resize(stoneSize, stoneSize).toBuffer(),
    sharp(ImageUtils.getPath('white')).resize(stoneSize, stoneSize).toBuffer(),
    game.genBlackUser(),
    game.genWhiteUser(),
  ]);

  const [blackUserProfile, whiteUserProfile] = await Promise.all([
    ProfileImageUtils.genProfilePicBuffer(blackUser, profileSize),
    ProfileImageUtils.genProfilePicBuffer(whiteUser, profileSize),
  ]);

  const blackName = _getShortname(blackUser.getFirstName() || 'No Name', maxNameLength);
  const whiteName = _getShortname(whiteUser.getFirstName() || 'No Name', maxNameLength);
  return [
    blackStone,
    whiteStone,
    _getTextBuffer(blackName, fontSize),
    _getTextBuffer(whiteName, fontSize),
    blackUserProfile,
    whiteUserProfile,
  ];
}

// TODO: think of a way to refactor duplicate logic
async function _genGameMiniBaseImageBuffer(game: GoGame): Promise<Buffer> {
  const baseBoardString = `game-${game.getID()}-mini-3base`;
  const buffer = GameCache.get(baseBoardString);
  if (buffer) {
    return buffer;
  }

  const exists = await S3Utils.genExists(baseBoardString);
  if (exists) {
    return await rp({url: S3Utils.getURL(baseBoardString), encoding: null});
  }

  const stoneSize = 50;
  const profileSize = 75;
  const profileMargin = 10;
  const [blackStone, whiteStone, blackUserName, whiteUserName, blackProfile, whiteProfile] =
    await _genBaseImageComponents(game, stoneSize, profileSize, 55 /*fontSize*/, 12 /*maxNameLength*/);
  const [whiteUserNameMeta, blackUserNameMeta] = await Promise.all([
    sharp(whiteUserName).metadata(),
    sharp(blackUserName).metadata(),
  ]);
  const blackLeft = Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - (blackUserNameMeta.width + profileSize + profileMargin) / 2);
  const whiteLeft = Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - (whiteUserNameMeta.width + profileSize + profileMargin) / 2);

  const overlays = [
    {
      option: {top: 107, left: Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - stoneSize / 2)},
      image: blackStone,
    },
    {
      option: {top: 165, left: blackLeft},
      image: blackProfile,
    },
    {
      option: {top: 175, left: blackLeft + profileSize + profileMargin},
      image: blackUserName,
    },
    {
      option: {top: 287, left: Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - stoneSize / 2)},
      image: whiteStone,
    },
    {
      option: {top: 345, left: whiteLeft},
      image: whiteProfile,
    },
    {
      option: {top: 355, left: whiteLeft + profileSize + profileMargin},
      image: whiteUserName,
    },
  ];
  const emptyImageBuffer = await ImageUtils.genCreateEmptyImageBuffer(GAME_MINI_WIDTH, GAME_MINI_HEIGHT);
  const baseBuffer = await ImageUtils.genApplyOverlays(emptyImageBuffer, overlays);
  S3Utils.genUploadImage(baseBuffer, baseBoardString);
  GameCache.put(baseBoardString, baseBuffer);
  return baseBuffer;
}

async function _genGameBaseImageBuffer(game: GoGame): Promise<Buffer> {
  const baseBoardString = `game-${game.getID()}-3base`;

  const buffer = GameCache.get(baseBoardString);
  if (buffer) {
    return buffer;
  }

  const exists = await S3Utils.genExists(baseBoardString);
  if (exists) {
    return await rp({url: S3Utils.getURL(baseBoardString), encoding: null});
  }

  const [blackStone, whiteStone, blackUserName, whiteUserName, blackProfile, whiteProfile] =
    await _genBaseImageComponents(game, 45 /*stoneSize*/ , 75 /*profileSize*/, 60 /*fontSize*/, 11 /*maxNameLength*/);
  const overlays = [
    {
      option: {top: 28, left: 15},
      image: blackStone,
    },
    {
      option: {top: 28, left: 515},
      image: whiteStone,
    },
    {
      option: {top: 25, left: 150},
      image: blackUserName,
    },
    {
      option: {top: 25, left: 650},
      image: whiteUserName,
    },
    {
      option: {top: 14, left: 69},
      image: blackProfile,
    },
    {
      option: {top: 14, left: 569},
      image: whiteProfile,
    },
  ];
  const emptyImageBuffer = await ImageUtils.genCreateEmptyImageBuffer(BOARD_WIDTH, BOARD_HEIGHT);
  const baseBuffer = await ImageUtils.genApplyOverlays(emptyImageBuffer, overlays);

  S3Utils.genUploadImage(baseBuffer, baseBoardString);
  GameCache.put(baseBoardString, baseBuffer);
  return baseBuffer;
}

const GameImageRendererUtils = {
  // Board url is: 'game-<gameID>-<boardString>'
  async genBoardImageURL(game: GoGame): Promise<string> {
    const boardString = `game-${game.getID()}-${game.getCurrentBoardString()}`;
    const exists = await S3Utils.genExists(boardString);
    if (exists) {
      info('The board image for the board already exists');
      return S3Utils.getURL(boardString);
    }

    info('The board image for the board does not exist, creating it and uploading');
    // create base buffer and board buffer separately
    const [baseBuffer, boardBuffer] = await Promise.all([
      _genGameBaseImageBuffer(game),
      BoardImageRendererUtils.genBoardBuffer(game),
    ]);

    const [blackCaptures, whiteCapture] = game.getCaptures();
    const blackCaptureText = _getTextBuffer('captures: ' + blackCaptures, 40);
    const whiteCaptureText = _getTextBuffer('captures: ' + whiteCapture, 40);
    const overlays = [
      {
        option: {top: BOARD_TOP_PADDING, left: 0},
        image: boardBuffer,
      },
      {
        option: {top: 100, left: 15},
        image: blackCaptureText,
      },
      {
        option: {top: 100, left: 515},
        image: whiteCaptureText,
      },
    ];
    const imageBuffer = await ImageUtils.genApplyOverlays(baseBuffer, overlays);

    const url = await S3Utils.genUploadImage(imageBuffer, boardString);
    info('Successfully uploaded new board image to S3');
    return url;
  },

  // Mini board url: 'game-mini-<gameID>-<boardString>'
  async genMiniBoardImageURL(game: GoGame): Promise<string> {
    const boardString = `game-mini-${game.getID()}-${game.getCurrentBoardString()}`;
    const exists = await S3Utils.genExists(boardString);
    if (exists) {
      return S3Utils.getURL(boardString);
    }
    const [baseBuffer, boardBuffer] = await Promise.all([
      _genGameMiniBaseImageBuffer(game),
      BoardImageRendererUtils.genBoardBuffer(game, GAME_MINI_BOARD_SIZE),
    ]);

    const overlays = [
      {
        option: {top: GAME_MINI_BOARD_PADDING, left: GAME_MINI_WIDTH - GAME_MINI_BOARD_SIZE - GAME_MINI_BOARD_PADDING / 2},
        image: boardBuffer,
      },
    ];

    const scoreText = game.getScoreText();
    // overlay score information (i.e. B+R)
    if (scoreText) {
      const scoreTextBuffer = _getTextBuffer(scoreText, 50);
      const scoreTextMeta = await sharp(scoreTextBuffer).metadata();
      const scoreLeft = Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - (scoreTextMeta.width) / 2);
      overlays.push({
        option: {top: 35, left: scoreLeft},
        image: scoreTextBuffer,
      });
    }
    const imageBuffer = await ImageUtils.genApplyOverlays(baseBuffer, overlays);
    const url = await S3Utils.genUploadImage(imageBuffer, boardString);
    return url;
  },
};

module.exports = GameImageRendererUtils;

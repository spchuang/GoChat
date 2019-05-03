// @flow

'use strict';

import lwip from 'lwip';
import sharp from 'sharp';
import Promise from 'bluebird';
import {STONE_COLOR} from '../WeiqiSerializer';
import ImageUtils from './ImageUtils';
import GoGame from '../../class/Game';

type LwipImage = Object;

// original 53.5, 42.5, 36.5
const STONE_DISTANCE_19 = 49;
const BOARD_TOP_LEFT_X_19 = 39;
const BOARD_TOP_LEFT_Y_19 = 33.5;

// original 53.5, 42.5, 44.5
const STONE_DISTANCE_13 = 69.5
const BOARD_TOP_LEFT_X_13 = 55.25;
const BOARD_TOP_LEFT_Y_13 = 57.9;

// original 53.5, 42.5, 39.5
const STONE_DISTANCE_9 = 96.5;
const BOARD_TOP_LEFT_X_9 = 76.5;
const BOARD_TOP_LEFT_Y_9 = 71;

const BOARD_SIZE = [9, 13, 19];
const STONE_SIZE = {'9': 83, '13': 60, '19': 42};
const CIRCLE_PREFIX = 'circle';
const CIRCLE_WIDTH = {'9': 3, '13': 3, '19': 2};
const LAST_STONE_OVER_CIRCLE_SIZE_CONFIG = {};
['black', 'white'].forEach((color: StoneColor) => {
  BOARD_SIZE.forEach((size: BoardSize) => {
    const key = _getStoneOverlayCircleKey(size, color);
    LAST_STONE_OVER_CIRCLE_SIZE_CONFIG[key] = {
      radius: Math.floor(STONE_SIZE[size.toString()] / 4), // circle is half the stone size
      color: color === 'black' ? 'white' : 'black',
      width: CIRCLE_WIDTH[size.toString()],
    };
  })
})
/*
 * Convert stone coordinate to pixel coordinate on the board image.
 */
function _getStoneOverlayOptions(x: number, y: number, size: BoardSize): {left: number, top: number} {
  //size = parseInt(size)// temp fix for size being string
  // convert 18/12/11 to 0 (0 indexed) 0 -> 18/12/11
  const xMultiplier = parseInt(x, 10 /* radix */);
  const yMultiplier = (size - 1) - parseInt(y, 10 /* radix */);

  switch(size) {
    case 19:
      return {
        left: Math.round(BOARD_TOP_LEFT_X_19 + xMultiplier * STONE_DISTANCE_19),
        top: Math.round(BOARD_TOP_LEFT_Y_19 + yMultiplier * STONE_DISTANCE_19),
      };
    case 13:
      return {
        left: Math.round(BOARD_TOP_LEFT_X_13 + xMultiplier * STONE_DISTANCE_13),
        top: Math.round(BOARD_TOP_LEFT_Y_13 + yMultiplier * STONE_DISTANCE_13),
      };
    case 9:
      return {
        left: Math.round(BOARD_TOP_LEFT_X_9 + xMultiplier * STONE_DISTANCE_9),
        top: Math.round(BOARD_TOP_LEFT_Y_9 + yMultiplier * STONE_DISTANCE_9),
      };
    default:
      throw new Error(`Invalid board size input ${size}`);
  }
}

function _getStoneCircleOverlayOption(x: number, y: number, size: BoardSize): {left: number, top: number} {
  // offset based on original stone overlay position
  const {left, top} = _getStoneOverlayOptions(x, y, size);
  // since circle is half the size, offset by a 1/4 of stone size
  const offset = Math.round(STONE_SIZE[size] / 4) - CIRCLE_WIDTH[size.toString()] + 1;
  var a = {left: left + offset, top: top + offset};
  return a;
}

// LWIP promise implementation
async function _genLWipImage(source: string | Buffer, type: string): Promise<LwipImage> {
  return new Promise((resolve, reject) => {
    lwip.open(source, type, function(err, image) {
      if(err) {
        return reject(err);
      }
      return resolve(image);
    });
  });
}

async function _genCloneImage(image: LwipImage): Promise<LwipImage> {
  return new Promise((resolve, reject) => {
    image.clone(function(err, clone){
      if(err) {
        return reject(err);
      }
      return resolve(clone);
    });
  });
}

async function _genPasteImage(base: LwipImage, pasteImage: LwipImage, left: number, top: number): Promise<LwipImage> {
  return new Promise((resolve, reject) => {
    base.paste(left, top, pasteImage, function(err, image) {
      if(err) {
        return reject(err);
      }
      return resolve(image);
    });
  });
}

// == Main Code ==

function _getStoneOverlayCircleKey(size: BoardSize, color: StoneColor): string {
  return `${CIRCLE_PREFIX}-${color}-${size}`.toLowerCase();
}

async function _genLastStoneOverlayCircleBuffer(key: string): Promise<Buffer> {
  const config = LAST_STONE_OVER_CIRCLE_SIZE_CONFIG[key];
  // need extra pixels for width
  const xy = config.radius + config.width - 1;
  const svg = new Buffer(
    `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <circle cx="${xy}" cy="${xy}" r="${config.radius}" stroke="${config.color}" stroke-width="${config.width}" fill="none" />
    </svg>`,
  );
  //sharp(svg).png().toFile('/tmp/testCircle.png');
  return await sharp(svg).toBuffer();
}

const _imageCache = {};
async function _genImageCache(key: string): Promise<LwipImage> {
  if (_imageCache[key]) {
    return _imageCache[key];
  }
  // check if this is for stone circle
  if (key.includes(CIRCLE_PREFIX)) {
    const buffer = await _genLastStoneOverlayCircleBuffer(key);
    _imageCache[key] = await _genLWipImage(buffer, 'png');
  } else {
    const fileName = ImageUtils.getPath(key);
    _imageCache[key] = await _genLWipImage(fileName, fileName.split('.').pop());
  }
  return _imageCache[key];
}

async function _genPasteStone(stone: Stone, size: BoardSize, boardImage: LwipImage): Promise<LwipImage> {
  const stoneImage = await _genImageCache(`${stone.color}-${size}`);
  const {left, top} = _getStoneOverlayOptions(stone.x, stone.y, size);
  return await _genPasteImage(boardImage, stoneImage, left, top);
}

const BoardImageRendererUtils = {
  // return a 1000 x 1000 board
  async genBoardBuffer(
    game: GoGame,
    resizeTo?: number,
  ): Promise<Buffer> {
    const lastStone = game.getLastNonPassMovePlayed();

    const board = await this.genBoardBufferFromScratchUsingLwip(
      game.getWeiqiBoardSize(),
      game.getStones(),
      lastStone,
    );

    if (resizeTo) {
      return await sharp(board).resize(resizeTo, resizeTo).toBuffer();
    }
    return board;
  },

  // NOTE: multiple composition with Sharp is extremely slow because of constant buffer conversion.
  async genBoardBufferFromScrapUsingSharp(size: BoardSize, stones: Array<Stone>): Promise<Buffer> {
    let board = await sharp(ImageUtils.getPath(size.toString())).toBuffer();

    const overlays = stones.map((stone: Stone) => {
      return {
        option: _getStoneOverlayOptions(stone.x, stone.y, size),
        image: ImageUtils.getPath(`${stone.color}-${size}`),
      };
    });
    return await ImageUtils.genApplyOverlays(board, overlays);
  },

  async genBoardBufferFromScratchUsingLwip(
    size: BoardSize,
    stones: Array<Stone>,
    lastStone: ?Stone,
  ): Promise<Buffer> {
    let boardImage = await _genImageCache(size.toString());

    // clone boardImage so we don't mess up with original cache. Not doing it in cache level
    // since we don't need to clone for stone images
    boardImage = await _genCloneImage(boardImage);
    for (let i = 0; i < stones.length; i++) {
      boardImage = await _genPasteStone(stones[i], size, boardImage);
    }

    // overlay last stone circle to indicate last move
    if (lastStone) {
      const lastStoneCircleKey = _getStoneOverlayCircleKey(size, lastStone.color);
      const lastStoneCircleImage = await _genImageCache(lastStoneCircleKey);
      const {left, top} = _getStoneCircleOverlayOption(lastStone.x, lastStone.y, size);
      boardImage = await _genPasteImage(boardImage, lastStoneCircleImage, left, top);
    }

    return new Promise((resolve, reject) => {
      boardImage.toBuffer('jpg', function(err, buffer) {
        if(err) {
          return reject(err);
        }
        return resolve(buffer);
      });
    });
  },
};

module.exports = BoardImageRendererUtils;

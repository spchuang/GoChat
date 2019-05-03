// @flow

'use strict';

import sharp from 'sharp';
import Promise from 'bluebird';

const ROOT_DIR = APP_ROOT + '/images';

const IMAGE_PATH: {[key: string]: string} = {
  'black' : ROOT_DIR + '/blackStone-shade.png',
  'white' : ROOT_DIR + '/whiteStone-shade.png',
  'black-9' : ROOT_DIR + '/blackStone-9-min.png',
  'white-9' : ROOT_DIR + '/whiteStone-9-min.png',
  'black-13' : ROOT_DIR + '/blackStone-13-min.png',
  'white-13' : ROOT_DIR + '/whiteStone-13-min.png',
  'black-19' : ROOT_DIR + '/blackStone-19-min.png',
  'white-19' : ROOT_DIR + '/whiteStone-19-min.png',
  '19': ROOT_DIR + '/19.jpg',
  '13': ROOT_DIR + '/13.jpg',
  '9': ROOT_DIR + '/9.jpg',
  'male-profile': ROOT_DIR + '/man-profile2.png',
  'female-profile': ROOT_DIR + '/woman-profile2.png',
};

const ImageUtils = {
  async genCreateEmptyImageBuffer(width: number, height: number): Promise<Buffer> {
    const channels = 4;
    const rgbaPixel = 0xffffffff;
    const canvas = Buffer.alloc(width * height * channels, rgbaPixel);
    return await sharp(canvas, { raw : { width, height, channels } }).jpeg().toBuffer();
  },

  async genApplyOverlays(baseBuffer: Buffer, overlays:Array<Object>): Promise<Buffer> {
    let tempBuffer = baseBuffer;
    for (let i = 0; i < overlays.length; i++) {
      const overlay = overlays[i];
      tempBuffer = await sharp(tempBuffer).overlayWith(overlay.image, overlay.option).toBuffer();
    }
    return tempBuffer;
  },

  getPath(key: string): string {
    return IMAGE_PATH[key];
  },
};

module.exports = ImageUtils;

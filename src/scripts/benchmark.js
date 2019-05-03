// @flow

'use strict';

import sharp from 'sharp';
import Promise from 'bluebird';
import BoardImageRendererUtils from '../utils/images/BoardImageRendererUtils';

/*
 NOTE: with forced garbage collection -> sharp takes in 100 mb of memory.
*/
module.exports = {
  async run(): Promise<void> {

    info('start benchmark');
    const moves = [];
    let color = 'black';
    for (let x = 0; x < 19; x++) {
      for (let y = 0; y < 19; y++) {
        moves.push({x, y, color});
        color = color === 'black' ? 'white' : 'black';
      }
    }
    const size = 19;

    // sharp
    // info("processing with sharp");
    // var hrstart = process.hrtime();
    // const sharp = await BoardImageRendererUtils.genBoardBufferFromScrapUsingSharp(size, moves);
    // var hrend = process.hrtime(hrstart);
    // info("DONE with sharp");
    // console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
    // global.gc();
    // console.log(sharp);

    // lwip
    info('processing with lwip');
    var hrstart = process.hrtime();
    const buffer = await BoardImageRendererUtils.genBoardBufferFromScratchUsingLwip(size, moves);
    var hrend = process.hrtime(hrstart);
    info('DONE with lwip');
    info(`Execution time (hr): ${hrend[0]} ${hrend[1]/1000000}`);
    await sharp(buffer).toFile('/tmp/lwip1.jpg');
    global.gc();
  },
};

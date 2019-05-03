// @flow

'use strict';

import Promise from 'bluebird';
import rp from 'request-promise';
import GoGame from '../class/Game';
import config from '../config';

const GoAIUtils = {
  async genNextMove(game: GoGame): Promise<string> {
    const stoneHistory = game.getStones();
    const stoneColor = game.getCurrentMoveColorText();
    const size = game.getWeiqiBoardSize();
    const res = await rp({
      //uri: 'http://localhost:8000/move
      // UPDATE HERE???
      uri: 'http://0.0.0.0:8000/move',
      method: 'GET',
      json: true,
      body: {
        'board_format': 'ij_history',
        'board': stoneHistory,
        'stone_color': stoneColor,
        'board_size': size,
        'return_board': 0,
      },
    });
    info(res['move_ij']);
    return res['move_ij'];
  },

  getAIUserID(): number {
    return config.GOAIUserID;
  }
}

module.exports = GoAIUtils;

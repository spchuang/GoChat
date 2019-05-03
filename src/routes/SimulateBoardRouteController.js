// @flow

'use strict';

import {got} from '../translations/Translator';
import Promise from 'bluebird';
import GoGame from '../class/Game';
import config from '../config';
import User from '../class/User';
import invariant from 'invariant';
import GameUtils from '../utils/GameUtils';
import RouteControllerBase from './RouteControllerBase';
import {LoggingEvent} from '../logging/LoggingEnums';

class SimulateBoardRouteController extends RouteControllerBase {
  getName(): string {
    return 'simulateBoard';
  }

  getRouterEvent(): string {
    return LoggingEvent.LOAD_SIMULATE_GAME_VIEW;
  }

  getLoadMessengerExtension(): boolean {
    return true;
  }

  getPageTitle(lan: string): string {
    return got('button.simulateGame', lan);
  }

  async genClientContainerParams(user: User, req: Object): Promise<Object> {
    const language = user.getLanguage();
    let loadSingleGameOnly = false;

    // if game ID is provided, only load that game.
    let gameInfos;
    let focusOnGameID;
    // Note we dont pass loadGameID in anymore
    const loadGameID = req.query.gameID;
    if (loadGameID) {
      const game = await GoGame.genEnforce(loadGameID)
      invariant(!!game, 'Game should exist!');
      const gameInfo = await GameUtils.genGameInfo(user.getID(), language, game);
      gameInfos = [gameInfo];
      loadSingleGameOnly = true;
      focusOnGameID = game.getID();
    } else {
      const games = await GoGame.genActiveGamesForUser(user);
      const userID = user.getID();
      gameInfos = await Promise.all(
        games.map(async (game) => GameUtils.genGameInfo(userID, language, game)),
      );
      focusOnGameID = user.getCurrentGameID();
    }

    return {
      focusedOnGameID: focusOnGameID,
      games: gameInfos,
      loadSingleGameOnly: loadSingleGameOnly,
      text: {
        noGameMessage: got('simulateBoard.noGameMessage', language),
        emptyBoardOption: got('simulateBoard.emptyBoardOption', language),
        selectGameLabel: got('simulateBoard.selectGameLabel', language),
        selectBoardSizeLabel: got('simulateBoard.selectBoardSizeLabel', language),
      },
    };
  }

  getJS(): Array<string> {
    return [
      'vendor/wgo.min.js',
      'vendor/wgo.player.min.js',
      `web/SimulateBoardContainer.${config.env}.js`,
    ];
  }

  getCSS(): Array<string> {
    return [
      'webviewCommon.css',
      'simulateBoard.css',
      'vendor/wgo.player.css',
    ];
  }
}

module.exports = new SimulateBoardRouteController();

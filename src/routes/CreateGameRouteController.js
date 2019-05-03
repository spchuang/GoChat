// @flow

'use strict';

import CreateGameWithSelfHandler from '../response/general/CreateGameWithSelfHandler';
import CreateGameWithAIHandler from '../response/general/CreateGameWithAIHandler';
import CreateGameRoomHandler from '../response/general/CreateGameRoomHandler';
import {got} from '../translations/Translator';
import Promise from 'bluebird';
import User from '../class/User';
import GoGating from '../utils/GoGating';
import config from '../config';
import RouteControllerBase from './RouteControllerBase';
import {LoggingEvent} from '../logging/LoggingEnums';
import invariant from 'invariant';

class CreateGameRouteController extends RouteControllerBase {
  getName(): string {
    return 'game/create';
  }

  getRouterEvent(): string {
    return LoggingEvent.LOAD_CREATE_GAME_VIEW;
  }

  getLoadMessengerExtension(): boolean {
    return true;
  }

  getPageTitle(lan: string): string {
    return got('button.createGame', lan);
  }

  async genClientContainerParams(user: User): Promise<Object> {
    const language = user.getLanguage();
    return {
      canPlayWithAI: GoGating.canPlayWithAI(user),
      text: {
        infoPlayWithFriend: got('createGame.infoPlayWithFriend', language),
        infoPlayWithSelf: got('createGame.infoPlayWithSelf', language),
        infoPlayWithAI: got('createGame.infoPlayWithAI', language),
        whoToPlayWithLabel: got('createGame.whoToPlayWithLabel', language),
        boarsSizeLabel: got('createGame.boardSizeLabel', language),
        colorLabel: got('createGame.colorLabel', language),
        komiLabel: got('createGame.komiLabel', language),
        handicapLabel: got('createGame.handicapLabel', language),
        optionPlayWithFriend: got('createGame.optionPlayWithFriend', language),
        optionPlayWithSelf: got('createGame.optionPlayWithSelf', language),
        optionPlayWithAI: got('createGame.optionPlayWithAI', language),
        optionColorBlack: got('createGame.optionColorBlack', language),
        optionColorWhite: got('createGame.optionColorWhite', language),
        optionColorRandom: got('createGame.optionColorRandom', language),
        createButton: got('button.createGame', language),
      },
    };
  }

  getJS(): Array<string> {
    return [
      `web/CreateGameContainer.${config.env}.js`,
    ];
  }

  getCSS(): Array<string> {
    return [
      'createGame.css',
      'webviewCommon.css',
    ];
  }
}

const controller = new CreateGameRouteController();

controller.post('', async (user: User, params: Object, res: Object, next: Function) => {
  invariant(
    params.boardSize !== undefined && params.komi !== undefined && params.handicap !== undefined,
    'required boardsize, handicap and komi',
  );

  const boardSize = parseInt(params.boardSize, 10);
  const komi = parseFloat(params.komi);
  const handicap = parseInt(params.handicap, 10);
  invariant(boardSize === 9 || boardSize === 13 || boardSize === 19, 'verify boardsize');

  if (params.gameType === 'self') {
    await CreateGameWithSelfHandler.genStartGameWithSelf(user, boardSize, handicap, komi);
  } else if (params.gameType === 'friend') {
    invariant(params.color, 'require color');
    await CreateGameRoomHandler.genCreatePrivateRoom(
      user,
      boardSize,
      params.color,
      handicap,
      komi,
    );
  } else if (params.gameType === 'AI') {
    await CreateGameWithAIHandler.genStartGameWithAI(
      user,
      boardSize,
      params.color
    );
  } else {
    next(new Error('invalid game type'));
  }
  res.send('');
});

module.exports = controller;

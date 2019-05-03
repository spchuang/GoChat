// @flow

'use strict';

import JoinGameRoomHandler from '../response/general/JoinGameRoomHandler';
import {got} from '../translations/Translator';
import config from '../config';
import Promise from 'bluebird';
import User from '../class/User';
import RouteControllerBase from './RouteControllerBase';
import {LoggingEvent} from '../logging/LoggingEnums';

class JoinGameRouteController extends RouteControllerBase {
  getName(): string {
    return 'joinGame';
  }

  getRouterEvent(): string {
    return LoggingEvent.LOAD_JOIN_GAME_VIEW;
  }

  getLoadMessengerExtension(): boolean {
    return true;
  }

  getPageTitle(lan: string): string {
    return got('button.joinARoom', lan);
  }

  async genClientContainerParams(user: User): Promise<Object> {
    const language = user.getLanguage();
    return {
      text: {
        enterCodeForRoom: got('normalMessage.enterCodeForRoom', language),
        joinButton: got('button.join', language),
      },
    };
  }

  getJS(): Array<string> {
    return [
      `web/JoinGameContainer.${config.env}.js`,
    ];
  }

  getCSS(): Array<string> {
    return [
      'createGame.css',
      'webviewCommon.css',
    ];
  }
}

const controller = new JoinGameRouteController();

controller.post('join', async (user: User, params: Object, res: Object) => {
  await JoinGameRoomHandler.genHandle(user, {code: params.code});
  res.send('');
});

module.exports = controller;

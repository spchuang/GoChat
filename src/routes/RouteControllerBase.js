// @flow

'use strict';

import express from 'express';
import Promise from 'bluebird';
import {got} from '../translations/Translator';
import {getUserFromEncryptID} from './RouteUtils';
import User from '../class/User';
import EncryptUtils from '../utils/EncryptUtils';
import {Logger} from '../logging/Logger';

class RouteControllerBase {
  _subRoutes: Array<Object> = [];

  constructor() {
    // $FlowFixMe: https://github.com/facebook/flow/issues/1152
    if (new.target === RouteControllerBase) {
      throw new TypeError('Cannot construct RouteControllerBase instance directly');
    }
  }

  getRouterEvent(): string {
    throw new TypeError('Must override getRouterEvent');
  }

  getName(): string {
    throw new TypeError('Must override getName');
  }

  post(
    name: string,
    callback: (user: User, params: Object, res: Object, _: Function) => Promise<void>,
  ): void {
    this._subRoutes.push({name, method: 'post', callback});
  }

  get(
    name: string,
    callback: (user: User, params: Object, res: Object, _: Function) => Promise<void>,
  ): void {
    this._subRoutes.push({name, method: 'get', callback});
  }

  async genClientContainerParams(_1: User, _2: Object): Promise<Object> {
    throw new TypeError('Must override genClientContainerProps');
  }

  async _genClientContainerParams(user: User, req: Object): Promise<Object> {
    const props = await this.genClientContainerParams(user, req);
    const encryptID = EncryptUtils.encrypt(user.getFBID());
    return {
      userID: encryptID,
      ...props,
    };
  }

  getCSS(): Array<string> {
    return [];
  }

  getJS(): Array<string> {
    return [];
  }

  getLoadMessengerExtension(): boolean {
    return false;
  }

  getPageTitle(_: string): string {
    throw new TypeError('Must override getPageTitle');
  }

  async genRouter(): Promise<Object> {
    let router = express.Router();
    const routeName = this.getName();
    const getPropsURL = `/${routeName}/_json`;

    // register json get route
    router.get(getPropsURL, async (req, res, next) => {
      let user;

      if (req.query.u) {
        user = await getUserFromEncryptID(req.query.u);
      } else if (req.query.fbid) {
        user = await User.genByFBID(req.query.fbid);
      }

      if (!user) {
        return next(new Error('invalid user'));
      }

      const props = await this._genClientContainerParams(user, req);
      res.json(props);

      (new Logger(user))
        .setEvent(this.getRouterEvent())
        .log();
    });

    // register get route
    router.get(`/${routeName}`, async (req, res, next) => {
      const user = await getUserFromEncryptID(req.query.u);

      let defaultLanguage;
      let props;
      if (user) {
        req.userID = user.getID();
        req.userLanguage = user.getLanguage();
        defaultLanguage = user.getLanguage();
        props = await this._genClientContainerParams(user, req);
      } else {
        defaultLanguage = req.query.language || 'en';
        props = {
          text: {
            notSupportedText: got('normalMessage.NeedToInputTokenForWebView', defaultLanguage),
            enterButton: got('button.enter', defaultLanguage),
          },
        };
      }

      res.render(
        'web/common',
        {
          title: this.getPageTitle(defaultLanguage),
          props: props,
          loadMessengerExtension: this.getLoadMessengerExtension(),
          js: this.getJS(),
          css: this.getCSS(),
          getPropsURL: getPropsURL,
        },
      );

      if (user) {
        (new Logger(user))
          .setEvent(this.getRouterEvent())
          .log();
      }
    });

    // register extra sub routes
    for (let i = 0; i < this._subRoutes.length; i++) {
      const subRoute = this._subRoutes[i];
      const subRouteName = subRoute.name;

      const handleRoute = async (req, res, next) => {
        const param = {...req.query, ...req.body};
        const user = await getUserFromEncryptID(param.u);
        if (!user) {
          return next(new Error('invalid user'));
        }

        req.userID = user.getID();
        req.userLanguage = user.getLanguage();

        try {
          await subRoute.callback(user, param, res, next);
        } catch (err) {
          error(`Error handling post requests for ${routeName} - ${subRouteName}`, err);
          return next(err);
        }
      }

      // register post routes
      if (subRoute.method === 'post') {
        router.post(`/${routeName}/${subRouteName}`, handleRoute);
      } else {
        router.get(`/${routeName}/${subRouteName}`, handleRoute);
      }
    }
    return router;
  }
}

module.exports = RouteControllerBase;

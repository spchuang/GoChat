// @flow

'use strict';

import Promise from 'bluebird';
import User from '../class/User';

class MessageHandlerBase {
  constructor() {
    // $FlowFixMe: https://github.com/facebook/flow/issues/1152
    if (new.target === MessageHandlerBase) {
      throw new TypeError('Cannot construct MessageHandlerBase instance directly');
    }
  }

  getParamObjectFromPostback(_: Array<string>): Object {
    return {};
  }

  getPostBackType(): ?string {
    return null;
  }

  async genHandle(user: User, _: Object): Promise<void> {
    throw new TypeError('Must override genHandle');
  }
}

module.exports = MessageHandlerBase;

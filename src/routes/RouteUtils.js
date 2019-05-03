// @flow

'use strict';

import User from '../class/User';
import Promise from 'bluebird';
import EncryptUtils from '../utils/EncryptUtils';
import config from '../config';

async function getUserFromEncryptID(id: string): Promise<?User> {
  const userFBID = EncryptUtils.decrypt(id);
  if (!userFBID) {
    return null;
  }
  return await User.genByFBID(userFBID);
}

function hasInternAccess(req: Object): boolean {
  if (config.env === 'dev') {
    return true;
  }

  if (req.query.token === getAccessToken()) {
    return true;
  }

  return false;
}

function getAccessToken(): string {
  return 'sam12345';
}

module.exports = {
  getUserFromEncryptID,
  hasInternAccess,
  getAccessToken,
};

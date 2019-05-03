// @flow

'use strict';

import crypto from 'crypto';
import config from '../config';

const ALGORITHM = 'aes-256-ctr';
const PASSWORD = config.FBChatToken || 'test';

const EncryptUtils = {
  encrypt(text: string): string {
    let cipher = crypto.createCipher(ALGORITHM, PASSWORD);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },

  decrypt(text: string): ?string {
    try {
      let decipher = crypto.createDecipher(ALGORITHM, PASSWORD)
      let dec = decipher.update(text, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec;
    } catch (err) {
      error('Decrtyp. ' + err + ', with text: ' + text);
      return null;
    }
  }
};

module.exports = EncryptUtils;

// @flow

'use strict';

const expect = require('chai').expect;
const EncryptUtils = require('../build/utils/EncryptUtils');

describe('General Test', function() {
  describe('Encrypt and Decrypt', function() {
    const text = '12345';
    const encryptedText = EncryptUtils.encrypt(text);
    const decryptedText = EncryptUtils.decrypt(encryptedText);

    expect(decryptedText).to.equal(text);
  });
});

// @flow

'use strict';

const invariant = require('invariant');

module.exports = {
  gen_nullthrows: async function<T>(gen: Promise<?T>): Promise<T> {
    const val = await gen;
    invariant(val, 'Cannot be null');
    return val;
  },
};

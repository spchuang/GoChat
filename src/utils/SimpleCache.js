// @flow

'use strict';

/*
 This is simple in memory cache that keeps track of maximum number of entries
*/

class SimpleCache {
  _limit: number;
  _cache: {[key: string]: any};
  _keysOrder: Array<string>;
  constructor(limit?: number = 100): void {
    this._limit = limit;
    this._cache = {};
    this._keysOrder = [];
  }

  put(key: string, value: any): void {
    if (key in this._cache) {
      this._cache[key] = value;
      const index = this._keysOrder.indexOf(key);
      this._keysOrder.splice(index, 1);
      this._keysOrder.push(key);
    } else {
      this._cache[key] = value;
      this._keysOrder.push(key);
    }

    if (this._keysOrder.length > this._limit) {
      const keyToRemove = this._keysOrder.shift();
      delete this._cache[keyToRemove];
    }
  }

  get(key: string): ?any {
    const val = this._cache[key];
    if (val === undefined) {
      return null;
    }

    info('Found cache for key ' + key);
    return val;
  }
}

module.exports = SimpleCache;

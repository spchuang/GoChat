// @flow

'use strict';

import models from '../class/schema';
import User from '../class/User';
import Promise from 'bluebird';
import type {SequelizeModel} from '../class/schema';
/*
 * This class defines the gatekeeper that allows us to roll out features partially and control who sees the new features. For now, I will only use it to simply check for user ID. I'm desigining it to be a bit more complex (e.g. handlig multiple rules, multiple rule types) to accomodate potential future use-cases.
 */
const LOAD_INTERVAL = 600000; // refresh every 10 mins

type GKNameType = string;
type GKRuleComparisonType = 'includes' | 'greaterThan' | 'lessThan';
type GKRuleFieldType = 'id';
type GKIDFieldRuleType = {
  name: 'id',
  type: GKRuleComparisonType,
  value: any,
};
type GKRuleType = GKIDFieldRuleType;
type GKType = {
  id: number,
  name: GKNameType,
  rules: Array<GKRuleType>,
  userIDWhitelist: Array<number>,
  userIDBlacklist: Array<number>,
};

let _loading = false;
let _gks: {[name:string]: GKType} = {};

async function _genGKs(): Promise<Array<GKType>> {
  return models.Gatekeeper.findAll({
  }).then((gkModels: Array<SequelizeModel>): Array<GKType> => {
    return gkModels.map(model => {
      return {
        id: model.get('id'),
        name: model.get('name'),
        rules: JSON.parse(model.get('rules')) || [],
        userIDWhitelist: JSON.parse(model.get('userIDWhitelist')) || [],
        userIDBlacklist: JSON.parse(model.get('userIDBlacklist')) || [],
      };
    });
  }).catch((err) => {
    throw err;
  });
}

async function _genLoad(): Promise<void> {
  //info('Start loading GKs');
  _loading = true;
  try {
    let gks: Array<GKType> = await _genGKs();

    _gks = {};
    gks.forEach((gk: GKType) => {
      _gks[gk.name] = gk;
    });
  } catch (exp) {
    error('Error querying GKs ', exp);
  }

  //info('Done loading GKs: ' + JSON.stringify(_gks, null, 2));
  _loading = false;

  setTimeout(async () => {
    await _genLoad();
  }, LOAD_INTERVAL);
}

function _getValFromGKType(field: GKRuleFieldType, user: User): ?any {
  switch (field) {
    case 'id':
      return user.getID();
    default:
      return null;
  }
}

function _evaluate(rule: GKRuleType, user: User): boolean {
  const inputVal = _getValFromGKType(rule.name, user);

  if (inputVal === null) {
    return false;
  }

  const compareVal = rule.value;
  switch (rule.type) {
    case 'includes':
      if (!(compareVal instanceof Array)) {
        return false;
      }
      return compareVal.indexOf(inputVal) !== -1;
  }
  return false;
}

const GK = {
  init: async function(): Promise<void> {
    await _genLoad();
  },

  forGKAndUser(name: GKNameType, user: User): boolean {
    const gk = _gks[name];
    if (!gk) {
      return false;
    }

    if (gk.userIDBlacklist.indexOf(user.getID()) !== -1) {
      return false;
    }
    if (gk.userIDWhitelist.indexOf(user.getID()) !== -1) {
      return true;
    }

    // loop through all the rules and check if any matches
    for (let i = 0; i < gk.rules.length; i++) {
      if (_evaluate(gk.rules[i], user)) {
        return true;
      }
    }
    return false;
  },
};

module.exports = GK;

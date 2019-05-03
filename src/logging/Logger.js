// @flow

'use strict';

import Logging from '../class/Logging';
import User from '../class/User';
import invariant from 'invariant';
import models from '../class/schema';
import locks from 'locks';
import config from '../config';

import type {LoggingEventType} from './LoggingEnums';
import type {LoggingAttributes} from '../class/base/LoggingBase';

// keep logs in a memory and store in db every once in a while.
let tempLogs: Array<LoggingAttributes> = [];
let mutex = locks.createMutex();

class Logger {
  _logged: boolean = false;
  _data: LoggingAttributes;

  constructor(user: User): void {
    this._data = {
      userID: user.getID(),
      userFBID: user.getFBID(),
      userLanguage: user.getLanguage(),
    };
  }

  setEvent(val: LoggingEventType): this {
    this._data.event = val;
    return this;
  }

  setTargetID(val: number): this {
    this._data.targetID = val;
    return this;
  }

  setTargetClass(val: string): this {
    this._data.targetClass = val;
    return this;
  }

  setExtraData(val: Object): this {
    this._data.extraData = JSON.stringify(val);
    return this;
  }

  log(): void {
    invariant(!this._logged, 'can only call log once');
    invariant(this._data.event !== null, 'logging required fields');

    const time = new Date();
    this._data.createdAt = time;
    this._data.updatedAt = time;

    mutex.lock(() => {
      if (config.env === 'dev') {
        info(this._data);
      }
      tempLogs.push(this._data);
      mutex.unlock();
    });
  }
}

function saveLoggingToDB(done: () => void): void {
  mutex.lock(() => {
    const logs = tempLogs;
    tempLogs = [];
    mutex.unlock();

    models.Logging.bulkCreate(logs).then(function() {
      info(`save ${logs.length} logs`);
      done();
    }).catch(e => {
      error('Problems saving logs ${logs}', e);
      done();
    });
  });
}

function setUpLoggingJobs(): void {
  if (config.test) {
    return;
  }
  saveLoggingToDB(() => {
    // repeat
    setTimeout(setUpLoggingJobs, config.loggingFlushInterval);
  });
}

module.exports = {
  Logger,
  setUpLoggingJobs,
};

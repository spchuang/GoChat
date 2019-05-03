// @flow

import config from './config';
import path from 'path';
import {EXCEPTION, EXCEPTION_MESSAGE, TypedError} from './errors';

// NOTE: make sure to update flow-typed/global and and .eslintrc

// PlayGo root directory
global.APP_ROOT = path.resolve(__dirname) + '/..';

// logging code
global.info = function(message: mixed): void {
  if (!config.logging) {
    return;
  }
  if (typeof(message) === 'object') {
    console.log('[INFO]', JSON.stringify(message, null, 2));
  } else {
    console.log('[INFO]', message);
  }
}

global.error = function(message: mixed, error: ?Error): void {
  if (!config.logging) {
    return;
  }

  if (typeof(message) === 'object') {
    console.log('[ERROR]', JSON.stringify(message, null, 2));

    // if passing Error class to first param.
    if (message && message.name === 'Error') {
      console.log(message.stack);
    }
  } else {
    console.log('[ERROR]', message);
  }

  if (error) {
    console.log(error.stack);
  }
}

global.EXCEPTION = EXCEPTION;
global.EXCEPTION_MESSAGE = EXCEPTION_MESSAGE;
global.TypedError = TypedError;

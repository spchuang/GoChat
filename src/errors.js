// @flow

// define global set of exceptions
const EXCEPTION = {
  // normal (0-99)
  SOMETHING_IS_WRONG: 1,

  // create game (100 - 199)
  ROOM_ALREADY_CREATED: 100,
  NOT_PROPER_GAME_CODE: 101,
  NO_ROOM_WITH_CODE: 102,
  CANT_JOIN_OWN_ROOM: 103,

  // in game (200 -300)
  VIOLATION_OF_KO: 200,
  PLAY_ON_EXISTING_STONE: 201,
  PLAY_OUT_OF_BOUND: 202,
  NOT_PLAYER_TURN: 203,
};

const EXCEPTION_CODE_TO_NAME = {};
Object.keys(EXCEPTION).forEach((name: string) => {
  const code = EXCEPTION[name];
  EXCEPTION_CODE_TO_NAME[code] = name;
});

// mapping from
const EXCEPTION_MESSAGE = {
  [EXCEPTION.ROOM_ALREADY_CREATED]: 'alreadyCreatedRoom',
};

let got;

class TypedError extends Error {
  code: number;
  data: Object = {};
  getErrorName: Function;
  getErrorMessage: Function;

  constructor(code: number, data?: Object) {
    super(code);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'TypedError';
    this.code = code;
    if (data) {
      this.data = data;
    }

    this.getErrorName = (): string => {
      return 'typedException.' + EXCEPTION_CODE_TO_NAME[this.code.toString()];
    }

    this.getErrorMessage = (language: string): string => {
      if (!got) {
        got = require('./translations/Translator').got;
      }
      return got(this.getErrorName(), language, this.data);
    }
  }
}

module.exports = {
  EXCEPTION,
  EXCEPTION_MESSAGE,
  TypedError,
};

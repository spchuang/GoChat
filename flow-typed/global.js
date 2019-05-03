// @flow

// global variable and functions
declare var APP_ROOT: string;
declare function info(message: mixed): void;
declare function error(message: mixed, error: ?Error): void;

// exceptions
declare var EXCEPTION: {[key: string]: number};
declare var EXCEPTION_MESSAGE: {[key: number]: string};
declare class TypedError extends Error {
  constructor(code: number, data?: Object): void;
  code: number;
  data: Object;
};

// game types
declare type StoneColor = 'black' | 'white';
declare type Stone = {
  x: number,
  y: number,
  color: StoneColor,
};

// TODO: unify the types....
// Weiqi library definition
declare type WeiqiStone = {
  location: [number, number],
  color: 'x' | 'o',
};

// 0-index based
declare type StonePosition = [number, number];
declare type StoneMove = StonePosition | 'PASS_MOVE';
declare type BoardSize = 9 | 13 | 19;

// create game options
declare type GameColorOption = StoneColor | 'random';
declare type GameType = 'self' | 'friend' | 'AI';

// Class Enums
declare type GameStatusType = 0 | 1 | 2 | 3 | 4;
declare type GameScoringRequestStatusType = 0 | 1 | 2;
declare type GenderType = 0 | 1 | 2;
declare type UserStatusType = 0 | 1;

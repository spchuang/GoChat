/*
 * @flow
 */

'use strict';

// Game Enums
const GameStatus = {
  'PLAYING': 0,
  'BLACK_WINS': 1,
  'WHITE_WINS': 2,
  'TIE': 3,
  'COUNT_SCORE': 4,
};

const GameScoringRequestStatus = {
  'PENDING': 0,
  'REJECTED': 1,
  'ACCEPTED': 2,
};

// User Enums
const UserStatus = {
  'INACTIVE': 0,
  'PLAYING': 1,
};

const Gender = {
  'UNKNOWN': 0,
  'MALE': 1,
  'FEMALE': 2,
};

module.exports = {
  GameStatus,
  GameScoringRequestStatus,
  UserStatus,
  Gender,
};

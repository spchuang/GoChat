/*
 * @flow
 */

'use strict';

// Game Enums
const LoggingEvent = {
  // game events
  CREATE_GAME: 'create_game',
  CREATE_GAME_ROOM: 'create_game_room',
  JOIN_GAME_ROOM: 'join_game_room',
  GAME_PLAY_MOVE: 'game_play_move',
  GAME_PASS: 'game_pass',
  GAME_RESIGN: 'game_resign',
  GAME_FINISH: 'game_finish',
  GAME_UNDO_MOVE: 'game_undo_move',
  GAME_SEND_MESSAGE: 'game_send_message',

  // controller loads
  LOAD_CREATE_GAME_VIEW: 'load_create_game_view',
  LOAD_JOIN_GAME_VIEW: 'load_join_game_view',
  LOAD_SIMULATE_GAME_VIEW: 'load_simulate_game_view',
  LOAD_COUNT_SCORE_VIEW: 'load_count_score_view',
  LOAD_MESSAGE_VIEW: 'load_message_view',

  // other
  CREATE_USER: 'create_user',
  TEXT_SEND: 'text_send',
  POST_BACK_SEND: 'post_back_send',
  SHARE: 'share',
  UPDATE_LANGUAGE: 'update_language',
};

export type LoggingEventType = $Values<typeof LoggingEvent>;

const LoggingTargetClass = {
  USER: 'user',
  GAME: 'game',
  GAME_ROOM: 'gameRoom',
};

module.exports = {
  LoggingEvent,
  LoggingTargetClass,
};

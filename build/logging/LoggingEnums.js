

'use strict';

// Game Enums

var LoggingEvent = {
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
  UPDATE_LANGUAGE: 'update_language'
};

var LoggingTargetClass = {
  USER: 'user',
  GAME: 'game',
  GAME_ROOM: 'gameRoom'
};

module.exports = {
  LoggingEvent: LoggingEvent,
  LoggingTargetClass: LoggingTargetClass
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnaW5nL0xvZ2dpbmdFbnVtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBOzs7O0FBR0EsSUFBTSxlQUFlOztBQUVuQixlQUFhLGFBRk07QUFHbkIsb0JBQWtCLGtCQUhDO0FBSW5CLGtCQUFnQixnQkFKRztBQUtuQixrQkFBZ0IsZ0JBTEc7QUFNbkIsYUFBVyxXQU5RO0FBT25CLGVBQWEsYUFQTTtBQVFuQixlQUFhLGFBUk07QUFTbkIsa0JBQWdCLGdCQVRHO0FBVW5CLHFCQUFtQixtQkFWQTs7O0FBYW5CLHlCQUF1Qix1QkFiSjtBQWNuQix1QkFBcUIscUJBZEY7QUFlbkIsMkJBQXlCLHlCQWZOO0FBZ0JuQix5QkFBdUIsdUJBaEJKO0FBaUJuQixxQkFBbUIsbUJBakJBOzs7QUFvQm5CLGVBQWEsYUFwQk07QUFxQm5CLGFBQVcsV0FyQlE7QUFzQm5CLGtCQUFnQixnQkF0Qkc7QUF1Qm5CLFNBQU8sT0F2Qlk7QUF3Qm5CLG1CQUFpQjtBQXhCRSxDQUFyQjs7QUE2QkEsSUFBTSxxQkFBcUI7QUFDekIsUUFBTSxNQURtQjtBQUV6QixRQUFNLE1BRm1CO0FBR3pCLGFBQVc7QUFIYyxDQUEzQjs7QUFNQSxPQUFPLE9BQVAsR0FBaUI7QUFDZiw0QkFEZTtBQUVmO0FBRmUsQ0FBakIiLCJmaWxlIjoiTG9nZ2luZ0VudW1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBmbG93XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBHYW1lIEVudW1zXG5jb25zdCBMb2dnaW5nRXZlbnQgPSB7XG4gIC8vIGdhbWUgZXZlbnRzXG4gIENSRUFURV9HQU1FOiAnY3JlYXRlX2dhbWUnLFxuICBDUkVBVEVfR0FNRV9ST09NOiAnY3JlYXRlX2dhbWVfcm9vbScsXG4gIEpPSU5fR0FNRV9ST09NOiAnam9pbl9nYW1lX3Jvb20nLFxuICBHQU1FX1BMQVlfTU9WRTogJ2dhbWVfcGxheV9tb3ZlJyxcbiAgR0FNRV9QQVNTOiAnZ2FtZV9wYXNzJyxcbiAgR0FNRV9SRVNJR046ICdnYW1lX3Jlc2lnbicsXG4gIEdBTUVfRklOSVNIOiAnZ2FtZV9maW5pc2gnLFxuICBHQU1FX1VORE9fTU9WRTogJ2dhbWVfdW5kb19tb3ZlJyxcbiAgR0FNRV9TRU5EX01FU1NBR0U6ICdnYW1lX3NlbmRfbWVzc2FnZScsXG5cbiAgLy8gY29udHJvbGxlciBsb2Fkc1xuICBMT0FEX0NSRUFURV9HQU1FX1ZJRVc6ICdsb2FkX2NyZWF0ZV9nYW1lX3ZpZXcnLFxuICBMT0FEX0pPSU5fR0FNRV9WSUVXOiAnbG9hZF9qb2luX2dhbWVfdmlldycsXG4gIExPQURfU0lNVUxBVEVfR0FNRV9WSUVXOiAnbG9hZF9zaW11bGF0ZV9nYW1lX3ZpZXcnLFxuICBMT0FEX0NPVU5UX1NDT1JFX1ZJRVc6ICdsb2FkX2NvdW50X3Njb3JlX3ZpZXcnLFxuICBMT0FEX01FU1NBR0VfVklFVzogJ2xvYWRfbWVzc2FnZV92aWV3JyxcblxuICAvLyBvdGhlclxuICBDUkVBVEVfVVNFUjogJ2NyZWF0ZV91c2VyJyxcbiAgVEVYVF9TRU5EOiAndGV4dF9zZW5kJyxcbiAgUE9TVF9CQUNLX1NFTkQ6ICdwb3N0X2JhY2tfc2VuZCcsXG4gIFNIQVJFOiAnc2hhcmUnLFxuICBVUERBVEVfTEFOR1VBR0U6ICd1cGRhdGVfbGFuZ3VhZ2UnLFxufTtcblxuZXhwb3J0IHR5cGUgTG9nZ2luZ0V2ZW50VHlwZSA9ICRWYWx1ZXM8dHlwZW9mIExvZ2dpbmdFdmVudD47XG5cbmNvbnN0IExvZ2dpbmdUYXJnZXRDbGFzcyA9IHtcbiAgVVNFUjogJ3VzZXInLFxuICBHQU1FOiAnZ2FtZScsXG4gIEdBTUVfUk9PTTogJ2dhbWVSb29tJyxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBMb2dnaW5nRXZlbnQsXG4gIExvZ2dpbmdUYXJnZXRDbGFzcyxcbn07XG4iXX0=
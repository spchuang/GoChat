// @flow

import Bot from 'fb-local-chat-bot';
import User from '../class/User';
import GoGame from '../class/Game';
//import GoGating from '../GoGating';
import {got} from '../translations/Translator';
import config from '../config';
import EncryptUtils from '../utils/EncryptUtils';
import querystring from 'querystring';

const PostBackTypes = {
  CREATE_GAME: 'CREATE_GAME',
  JOIN_GAME: 'JOIN_GAME',
  PLAY_WITH_SELF: 'PLAY_WITH_SELF',
  PLAY_WITH_AI: 'PLAY_WITH_AI',
  JOIN_GAME_WITH_CODE: 'JOIN_GAME_WITH_CODE',

  SEE_HELP: 'SEE_HELP',
  SHARE: 'SHARE',
  SHOW_MESSENGER_WEBVIEW_TOKEN: 'SHOW_MESSENGER_WEBVIEW_TOKEN', // deprecated
  SHOW_GAME_HISTORY: 'SHOW_GAME_HISTORY',
  DOWNLOAD_SGF: 'DOWNLOAD_SGF',

  // language settings
  SHOW_LANGUAGES: 'SHOW_LANGUAGES',
  SET_LANGUAGE: 'SET_LANGUAGE',

  // in game commands
  RESIGN_GAME: 'RESIGN_GAME',
  SHOW_CURRENT_GAME_STATUS: 'SHOW_CURRENT_GAME_STATUS',
  PASS_MOVE: 'PASS_MOVE',
  UNDO_MOVE: 'UNDO_MOVE',
  FOCUS_ON_GAME: 'FOCUS_ON_GAME',
  PLAY_ANOTHER_GAME: 'PLAY_ANOTHER_GAME',
  SHOW_ACTIVE_GAMES: 'SHOW_ACTIVE_GAMES',
  SHOW_CANNED_MESSAGES: 'SHOW_CANNED_MESSAGES', // deprecated
  SEND_CANNED_MESSAGE: 'SEND_CANNED_MESSAGE', // deprecated
  SHOW_MESSAGE_VIEW: 'SHOW_MESSAGE_VIEW',

  // game room
  CREATE_PRIVATE_ROOM: 'CREATE_PRIVATE_ROOM',
  SEND_GAME_ROOM_SHARE: 'SEND_GAME_ROOM_SHARE',
};

function createPostbackButton(text: string, type: string, params: ?Array<mixed>): Object {
  // append params to post type callback
  const payload = params
    ? type + ':' + params.join(':')
    : type;
  return Bot.createPostbackButton(text, payload);
}

function createQuickReplyButton(text: string, type: string, params: ?Array<mixed>): Object {
  // append params to post type callback
  const payload = params
    ? type + ':' + params.join(':')
    : type;
  return Bot.createQuickReply(text, payload);
}

function createDefaultButtons(user: User): Array<Object> {
  const language = user.getLanguage();
  return [
    createQuickReplyButton(got('button.setLanguage', language), PostBackTypes.SHOW_LANGUAGES),
    createQuickReplyButton(got('button.share', language), PostBackTypes.SHARE),
  ];
}

function sendNormalHelpMenu(user: User, text: string): void {
  const encryptID = EncryptUtils.encrypt(user.getFBID());

  // Hopefully we can open webview from quick repies in the future
  const messageData = {
    attachment: {
      'type':'template',
      'payload': {
        'template_type': 'button',
        'text': text,
        'buttons': [
          getCreateGameURLButton(user.getLanguage(), encryptID),
          getJoinGameURLButton(user.getLanguage(), encryptID),
        ],
      },
    },
    quick_replies: createDefaultButtons(user),
  };

  Bot.send(user.getFBID(), messageData);
}

function _getURLParams(language: string, encryptID?: string, extra?: Object): string {
  // skip appending user id if it's not provided
  return encryptID
    ? querystring.stringify({...extra, language, u: encryptID})
    : querystring.stringify({...extra, language});
}

function getCreateGameURLButton(language: string, encryptID?: string): Object {
  const queryParams = _getURLParams(language, encryptID);
  return Bot.createURLButton(
    got('button.createGame', language),
    `${config.url}/game/create?${queryParams}`,
    'tall',
    true, // useMessengerExtensions
  );
}

function getJoinGameURLButton(language: string, encryptID?: string): Object {
  const queryParams = _getURLParams(language, encryptID);
  return Bot.createURLButton(
    got('button.joinARoom', language),
    `${config.url}/joinGame?${queryParams}`,
    'compact',
    true, // useMessengerExtensions
  );
}

function getMessageURLButton(
  title: string,
  language: string,
  receiverID?: number,
  encryptID?: string,
): Object {
  const queryParamsString = _getURLParams(language, encryptID, {receiverID});
  return Bot.createURLButton(
    title,
    `${config.url}/message?${queryParamsString}`,
    'full',
    true, // useMessengerExtensions
  );
}

function getBoardURLButton(title: string, queryParams: string): Object {
  return Bot.createURLButton(
    title,
    `${config.url}/simulateBoard?${queryParams}`,
    'full',
    true, // useMessengerExtensions
  );
}

function getCountScoreURLButton(title: string, user: User, queryParams: Object): Object {
  const encryptID = EncryptUtils.encrypt(user.getFBID());
  const queryParamsString = _getURLParams(user.getLanguage(), encryptID, queryParams);
  return Bot.createURLButton(
    title,
    `${config.url}/countScore?${queryParamsString}`,
    'full',
    true, // useMessengerExtensions
  );
}

function getSimulateBoardURLButton(language: string, encryptID?: string): Object {
  const queryParams = _getURLParams(language, encryptID);
  return getBoardURLButton(got('button.simulateGame', language), queryParams);
}

function sendFocusedGameMessage(user: User, game: GoGame, message: string, isFocused: boolean): void {
  const language = user.getLanguage();
  if (isFocused) {
    Bot.sendText(
      user.getFBID(),
      message,
    );
  } else {
    Bot.sendButtons(
      user.getFBID(),
      message + ' ' + got('inGameMessage.newGameMoveAskUserToFocus', language),
      [
        createPostbackButton(got('button.focusOnGame', language), PostBackTypes.FOCUS_ON_GAME, [game.getID()]),
      ]
    );
  }
}

module.exports = {
  PostBackTypes,
  sendNormalHelpMenu,
  createDefaultButtons,
  createPostbackButton,
  createQuickReplyButton,
  sendFocusedGameMessage,
  getBoardURLButton,
  getCreateGameURLButton,
  getJoinGameURLButton,
  getSimulateBoardURLButton,
  getCountScoreURLButton,
  getMessageURLButton,
};

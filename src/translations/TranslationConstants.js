// @flow
import path from 'path';

export type Language = 'zh_tw' | 'zh_cn' | 'jp' | 'en';

const LANGUAGE_TO_NAME_MAP: {[key: string]: string} = {
  'en': 'English',
  'zh_cn': '简体中文',
  'zh_tw': '繁體中文',
  'jp': '日本語',
};

export type TranslationNamespace =
  'normal' | 'button' | 'normalMessage' |'inGameMessage' | 'typedException' | 'createGame' | 'simulateBoard' | 'persistedMenu' | 'countScore' | 'chat';

const TRANSLATION_NAMESPACE: {[key: string]: TranslationNamespace} = {
  NORMAL: 'normal',
  BUTTON: 'button',
  NORMAL_MESSAGE: 'normalMessage',
  IN_GAME_MESSAGE: 'inGameMessage',
  TYPED_EXCEPTION: 'typedException',
  CREATE_GAME: 'createGame',
  SIMULATE_BOARD: 'simulateBoard',
  PERSISTED_MENU: 'persistedMenu',
  COUNT_SCORE: 'countScore',
  CHAT: 'chat',
};

const TRANSLATION_FILE = path.join(APP_ROOT, 'translations.json');
const TRANSLATION_NAME_FLOW = path.join(APP_ROOT + '/flow-typed/', 'TranslationNames.js');

module.exports = {
  LANGUAGE_TO_NAME_MAP,
  TRANSLATION_NAMESPACE,
  TRANSLATION_FILE,
  TRANSLATION_NAME_FLOW,
};

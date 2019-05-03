// @flow

'use strict';

import Polyglot from 'node-polyglot';
import fs from 'fs';
import {LANGUAGE_TO_NAME_MAP, TRANSLATION_FILE} from './TranslationConstants';
import invariant from 'invariant';

var Translator = new Polyglot();

let translations = {};

function loadTranslator(): void {
  translations = JSON.parse(fs.readFileSync(TRANSLATION_FILE, 'utf8'));

  const translationsByLanguage = {};
  for(const lang in LANGUAGE_TO_NAME_MAP) {
    translationsByLanguage[lang] = {};
  }

  translations.forEach(phraseObj => {
    const {data, name, namespace} = phraseObj;

    for(const lang in translationsByLanguage) {
      invariant(lang in data, `${namespace}.${name} should be translated in ${lang}`);
      Object.keys(data).forEach(lang => {
        if (namespace === 'normal') {
          translationsByLanguage[lang][name] = data[lang];
        } else {
          translationsByLanguage[lang][namespace + '.' + name] = data[lang];
        }
      });
    }
  });

  for(const lang in translationsByLanguage) {
    Translator.extend(translationsByLanguage[lang], lang);
  }
}

loadTranslator();

// helper to concatenate
function got(name: TranslationName, language: string, params: ?Object): string {
  return Translator.t(language + '.' + name, params);
}

function getTranslations(): Object {
  return translations;
}

module.exports = {
  got,
  getTranslations,
  loadTranslator,
};

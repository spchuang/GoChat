// @flow

'use strict';

import fs from 'fs';
import {getTranslations, loadTranslator} from '../../translations/Translator';
import {TRANSLATION_FILE, TRANSLATION_NAME_FLOW} from '../../translations/TranslationConstants';
import express from 'express';
import invariant from 'invariant';
import config from '../../config';

let router = express.Router();

function autoGenTranslationNameFlowType(data: Array<Object>): string {
  const names = data.map((phraseObj) => {
    if (phraseObj.namespace === 'normal') {
      return `'${phraseObj.name}'`;
    }
    return `'${phraseObj.namespace}.${phraseObj.name}'`;
  });
  return `// @flow\n\ndeclare type TranslationName = ${names.join('|')};`;
}

router.get('/translations/_data', async (req, res) => {

  res.send(getTranslations());
});

router.post('/translations/_update', async (req, res, next) => {
  if (config.env !== 'dev') {
    throw new Error('only dev can update');
  }

  const params = req.body;
  const new_data = params['data'];

  try {
    const regex = /^[a-zA-Z0-9 _-]+$/i;
    new_data.forEach(phraseObj => {
      invariant(regex.test(phraseObj.name), 'Phrase name can only be alphanumeral character');
    });

    fs.writeFile(TRANSLATION_FILE, JSON.stringify(new_data, null, 2), 'utf8', () => {
      loadTranslator();
      info('updated translation');

      // auto-generate flow types for translation names
      fs.writeFile(TRANSLATION_NAME_FLOW, autoGenTranslationNameFlowType(new_data), 'utf8', () => {
        info('updated translation name flow type');
        res.send({success: true});
      });
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

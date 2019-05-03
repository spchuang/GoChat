// @flow

'use strict';

import InternalTranslationPageRoute from './InternalTranslationPageRoute';
import InternalMetricsRoute from './InternalMetricsRoute';
import {TRANSLATION_NAMESPACE, LANGUAGE_TO_NAME_MAP, TRANSLATION_FILE, TRANSLATION_NAME_FLOW} from '../../translations/TranslationConstants';
import express from 'express';
import invariant from 'invariant';
import config from '../../config';
import {hasInternAccess} from '../RouteUtils';

let router = express.Router();

// add internal routes
router.use('/', InternalTranslationPageRoute);
router.use('/', InternalMetricsRoute);

// load main internal page entry point
router.get('/', async (req, res) => {
  if (!hasInternAccess(req)) {
    res.send('not available');
    return;
  }

  const tabs = [
    {
      name: 'metrics',
      props: {},
    },
    {
      name: 'translation',
      props: {
        translationNamespace: Object.values(TRANSLATION_NAMESPACE),
        languages: Object.keys(LANGUAGE_TO_NAME_MAP),
        disableUpdate: config.env !== 'dev',
      },
    }
  ];

  res.render(
    'web/common',
    {
      title: 'GoChat Internal',
      js: [
        `internal/MainInternalContainer.${config.env}.js`,
      ],
      css: [
        'TranslationSettings.css',
      ],
      props: {
        tabs,
      },
    },
  );
});

module.exports = router;

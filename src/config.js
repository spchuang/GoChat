// @flow

// NOTE: Make sure to sync with db/config/config.json
const env = process.env.NODE_ENV || 'local_db';

const baseConfig = {
  's3': {
    // UPDATE: need to add s3 bucket access
    'key': '',
    'secret': '',
    'bucket': '',
    'region': '',
    'folder': 'public',
  },
  'url': 'http://localhost:5000',
  'env': 'dev',
  'logging': true,
  'test': false,
  'useFBChatLocalTest': true,
  'useMessenger': false,
  // UPDATE: add fb chat bot access token
  'FBChatToken':
    '',
  GOAIUserID: 16,
  loggingFlushInterval: 60000, // 1 mins
};

const prodConfig = {
  // UPDATE: add db access
  'username': '',
  'password': '',
  'database': '',
  'host': '',
  'dialect': 'mysql',

  // UPDATE: change URL
  'url': 'https://playmessengergo.com',
  'useFBChatLocalTest': false,
  'useMessenger': true,
  'env': 'prod',
  GOAIUserID: 9999,
}

const devConfig = {
  // DB config
  'dialect': 'sqlite',
  'storage': './db.development.sqlite',

  'useFBChatLocalTest': false,
  'useMessenger': true,
  // other
  'FBChatToken': '',
}

const config = {
  'test': {
    ...baseConfig,

    // DB config
    'dialect': 'sqlite',
    'transactionType': 'IMMEDIATE',
    'force': true, // recreate tables
    'logging': false,
    'test': true,
  },
  'local_db': {
    ...baseConfig,
    // DB config
    'dialect': 'sqlite',
    'storage': './db.development.sqlite',
  },
  // connect to dev db but uses local chat
  'local_dev': {
    ...baseConfig,
    ...devConfig,
    useFBChatLocalTest: true,
    useMessenger: false,
    loggingFlushInterval: 10000, // 10 seconds
  },
  'local_prod': {
    ...baseConfig,
    ...prodConfig,
    useFBChatLocalTest: true,
    useMessenger: true,
    loggingFlushInterval: 10000, // 10 seconds
    logging: true,
  },
  'dev': {
    ...baseConfig,
    ...devConfig,
  },
  'production': {
    ...baseConfig,
    ...prodConfig,
  },
};

module.exports = function() {
  return config[env];
}();

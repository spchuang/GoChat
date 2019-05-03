'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// NOTE: Make sure to sync with db/config/config.json
var env = process.env.NODE_ENV || 'local_db';

var baseConfig = {
  's3': {
    // UPDATE: need to add s3 bucket access
    'key': '',
    'secret': '',
    'bucket': '',
    'region': '',
    'folder': 'public'
  },
  'url': 'http://localhost:5000',
  'env': 'dev',
  'logging': true,
  'test': false,
  'useFBChatLocalTest': true,
  'useMessenger': false,
  // UPDATE: add fb chat bot access token
  'FBChatToken': '',
  GOAIUserID: 16,
  loggingFlushInterval: 60000 };

// 1 mins
var prodConfig = {
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
  GOAIUserID: 9999
};

var devConfig = {
  // DB config
  'dialect': 'sqlite',
  'storage': './db.development.sqlite',

  'useFBChatLocalTest': false,
  'useMessenger': true,
  // other
  'FBChatToken': ''
};

var config = {
  'test': _extends({}, baseConfig, {

    // DB config
    'dialect': 'sqlite',
    'transactionType': 'IMMEDIATE',
    'force': true, // recreate tables
    'logging': false,
    'test': true
  }),
  'local_db': _extends({}, baseConfig, {
    // DB config
    'dialect': 'sqlite',
    'storage': './db.development.sqlite'
  }),
  // connect to dev db but uses local chat
  'local_dev': _extends({}, baseConfig, devConfig, {
    useFBChatLocalTest: true,
    useMessenger: false,
    loggingFlushInterval: 10000 }),
  // 10 seconds
  'local_prod': _extends({}, baseConfig, prodConfig, {
    useFBChatLocalTest: true,
    useMessenger: true,
    loggingFlushInterval: 10000, // 10 seconds
    logging: true
  }),
  'dev': _extends({}, baseConfig, devConfig),
  'production': _extends({}, baseConfig, prodConfig)
};

module.exports = function () {
  return config[env];
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxJQUFNLE1BQU0sUUFBUSxHQUFSLENBQVksUUFBWixJQUF3QixVQUFwQzs7QUFFQSxJQUFNLGFBQWE7QUFDakIsUUFBTTs7QUFFSixXQUFPLEVBRkg7QUFHSixjQUFVLEVBSE47QUFJSixjQUFVLEVBSk47QUFLSixjQUFVLEVBTE47QUFNSixjQUFVO0FBTk4sR0FEVztBQVNqQixTQUFPLHVCQVRVO0FBVWpCLFNBQU8sS0FWVTtBQVdqQixhQUFXLElBWE07QUFZakIsVUFBUSxLQVpTO0FBYWpCLHdCQUFzQixJQWJMO0FBY2pCLGtCQUFnQixLQWRDOztBQWdCakIsaUJBQ0UsRUFqQmU7QUFrQmpCLGNBQVksRUFsQks7QUFtQmpCLHdCQUFzQixLQW5CTCxFQUFuQjs7O0FBc0JBLElBQU0sYUFBYTs7QUFFakIsY0FBWSxFQUZLO0FBR2pCLGNBQVksRUFISztBQUlqQixjQUFZLEVBSks7QUFLakIsVUFBUSxFQUxTO0FBTWpCLGFBQVcsT0FOTTs7O0FBU2pCLFNBQU8sNkJBVFU7QUFVakIsd0JBQXNCLEtBVkw7QUFXakIsa0JBQWdCLElBWEM7QUFZakIsU0FBTyxNQVpVO0FBYWpCLGNBQVk7QUFiSyxDQUFuQjs7QUFnQkEsSUFBTSxZQUFZOztBQUVoQixhQUFXLFFBRks7QUFHaEIsYUFBVyx5QkFISzs7QUFLaEIsd0JBQXNCLEtBTE47QUFNaEIsa0JBQWdCLElBTkE7O0FBUWhCLGlCQUFlO0FBUkMsQ0FBbEI7O0FBV0EsSUFBTSxTQUFTO0FBQ2IsdUJBQ0ssVUFETDs7O0FBSUUsZUFBVyxRQUpiO0FBS0UsdUJBQW1CLFdBTHJCO0FBTUUsYUFBUyxJQU5YLEU7QUFPRSxlQUFXLEtBUGI7QUFRRSxZQUFRO0FBUlYsSUFEYTtBQVdiLDJCQUNLLFVBREw7O0FBR0UsZUFBVyxRQUhiO0FBSUUsZUFBVztBQUpiLElBWGE7O0FBa0JiLDRCQUNLLFVBREwsRUFFSyxTQUZMO0FBR0Usd0JBQW9CLElBSHRCO0FBSUUsa0JBQWMsS0FKaEI7QUFLRSwwQkFBc0IsS0FMeEIsR0FsQmE7O0FBeUJiLDZCQUNLLFVBREwsRUFFSyxVQUZMO0FBR0Usd0JBQW9CLElBSHRCO0FBSUUsa0JBQWMsSUFKaEI7QUFLRSwwQkFBc0IsS0FMeEIsRTtBQU1FLGFBQVM7QUFOWCxJQXpCYTtBQWlDYixzQkFDSyxVQURMLEVBRUssU0FGTCxDQWpDYTtBQXFDYiw2QkFDSyxVQURMLEVBRUssVUFGTDtBQXJDYSxDQUFmOztBQTJDQSxPQUFPLE9BQVAsR0FBaUIsWUFBVztBQUMxQixTQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0QsQ0FGZ0IsRUFBakIiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuLy8gTk9URTogTWFrZSBzdXJlIHRvIHN5bmMgd2l0aCBkYi9jb25maWcvY29uZmlnLmpzb25cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdsb2NhbF9kYic7XG5cbmNvbnN0IGJhc2VDb25maWcgPSB7XG4gICdzMyc6IHtcbiAgICAvLyBVUERBVEU6IG5lZWQgdG8gYWRkIHMzIGJ1Y2tldCBhY2Nlc3NcbiAgICAna2V5JzogJycsXG4gICAgJ3NlY3JldCc6ICcnLFxuICAgICdidWNrZXQnOiAnJyxcbiAgICAncmVnaW9uJzogJycsXG4gICAgJ2ZvbGRlcic6ICdwdWJsaWMnLFxuICB9LFxuICAndXJsJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCcsXG4gICdlbnYnOiAnZGV2JyxcbiAgJ2xvZ2dpbmcnOiB0cnVlLFxuICAndGVzdCc6IGZhbHNlLFxuICAndXNlRkJDaGF0TG9jYWxUZXN0JzogdHJ1ZSxcbiAgJ3VzZU1lc3Nlbmdlcic6IGZhbHNlLFxuICAvLyBVUERBVEU6IGFkZCBmYiBjaGF0IGJvdCBhY2Nlc3MgdG9rZW5cbiAgJ0ZCQ2hhdFRva2VuJzpcbiAgICAnJyxcbiAgR09BSVVzZXJJRDogMTYsXG4gIGxvZ2dpbmdGbHVzaEludGVydmFsOiA2MDAwMCwgLy8gMSBtaW5zXG59O1xuXG5jb25zdCBwcm9kQ29uZmlnID0ge1xuICAvLyBVUERBVEU6IGFkZCBkYiBhY2Nlc3NcbiAgJ3VzZXJuYW1lJzogJycsXG4gICdwYXNzd29yZCc6ICcnLFxuICAnZGF0YWJhc2UnOiAnJyxcbiAgJ2hvc3QnOiAnJyxcbiAgJ2RpYWxlY3QnOiAnbXlzcWwnLFxuXG4gIC8vIFVQREFURTogY2hhbmdlIFVSTFxuICAndXJsJzogJ2h0dHBzOi8vcGxheW1lc3NlbmdlcmdvLmNvbScsXG4gICd1c2VGQkNoYXRMb2NhbFRlc3QnOiBmYWxzZSxcbiAgJ3VzZU1lc3Nlbmdlcic6IHRydWUsXG4gICdlbnYnOiAncHJvZCcsXG4gIEdPQUlVc2VySUQ6IDk5OTksXG59XG5cbmNvbnN0IGRldkNvbmZpZyA9IHtcbiAgLy8gREIgY29uZmlnXG4gICdkaWFsZWN0JzogJ3NxbGl0ZScsXG4gICdzdG9yYWdlJzogJy4vZGIuZGV2ZWxvcG1lbnQuc3FsaXRlJyxcblxuICAndXNlRkJDaGF0TG9jYWxUZXN0JzogZmFsc2UsXG4gICd1c2VNZXNzZW5nZXInOiB0cnVlLFxuICAvLyBvdGhlclxuICAnRkJDaGF0VG9rZW4nOiAnJyxcbn1cblxuY29uc3QgY29uZmlnID0ge1xuICAndGVzdCc6IHtcbiAgICAuLi5iYXNlQ29uZmlnLFxuXG4gICAgLy8gREIgY29uZmlnXG4gICAgJ2RpYWxlY3QnOiAnc3FsaXRlJyxcbiAgICAndHJhbnNhY3Rpb25UeXBlJzogJ0lNTUVESUFURScsXG4gICAgJ2ZvcmNlJzogdHJ1ZSwgLy8gcmVjcmVhdGUgdGFibGVzXG4gICAgJ2xvZ2dpbmcnOiBmYWxzZSxcbiAgICAndGVzdCc6IHRydWUsXG4gIH0sXG4gICdsb2NhbF9kYic6IHtcbiAgICAuLi5iYXNlQ29uZmlnLFxuICAgIC8vIERCIGNvbmZpZ1xuICAgICdkaWFsZWN0JzogJ3NxbGl0ZScsXG4gICAgJ3N0b3JhZ2UnOiAnLi9kYi5kZXZlbG9wbWVudC5zcWxpdGUnLFxuICB9LFxuICAvLyBjb25uZWN0IHRvIGRldiBkYiBidXQgdXNlcyBsb2NhbCBjaGF0XG4gICdsb2NhbF9kZXYnOiB7XG4gICAgLi4uYmFzZUNvbmZpZyxcbiAgICAuLi5kZXZDb25maWcsXG4gICAgdXNlRkJDaGF0TG9jYWxUZXN0OiB0cnVlLFxuICAgIHVzZU1lc3NlbmdlcjogZmFsc2UsXG4gICAgbG9nZ2luZ0ZsdXNoSW50ZXJ2YWw6IDEwMDAwLCAvLyAxMCBzZWNvbmRzXG4gIH0sXG4gICdsb2NhbF9wcm9kJzoge1xuICAgIC4uLmJhc2VDb25maWcsXG4gICAgLi4ucHJvZENvbmZpZyxcbiAgICB1c2VGQkNoYXRMb2NhbFRlc3Q6IHRydWUsXG4gICAgdXNlTWVzc2VuZ2VyOiB0cnVlLFxuICAgIGxvZ2dpbmdGbHVzaEludGVydmFsOiAxMDAwMCwgLy8gMTAgc2Vjb25kc1xuICAgIGxvZ2dpbmc6IHRydWUsXG4gIH0sXG4gICdkZXYnOiB7XG4gICAgLi4uYmFzZUNvbmZpZyxcbiAgICAuLi5kZXZDb25maWcsXG4gIH0sXG4gICdwcm9kdWN0aW9uJzoge1xuICAgIC4uLmJhc2VDb25maWcsXG4gICAgLi4ucHJvZENvbmZpZyxcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBjb25maWdbZW52XTtcbn0oKTtcbiJdfQ==
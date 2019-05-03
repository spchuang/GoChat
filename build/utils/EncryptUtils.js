

'use strict';

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALGORITHM = 'aes-256-ctr';
var PASSWORD = _config2.default.FBChatToken || 'test';

var EncryptUtils = {
  encrypt: function encrypt(text) {
    var cipher = _crypto2.default.createCipher(ALGORITHM, PASSWORD);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  decrypt: function decrypt(text) {
    try {
      var decipher = _crypto2.default.createDecipher(ALGORITHM, PASSWORD);
      var dec = decipher.update(text, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec;
    } catch (err) {
      error('Decrtyp. ' + err + ', with text: ' + text);
      return null;
    }
  }
};

module.exports = EncryptUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9FbmNyeXB0VXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLFlBQVksYUFBbEI7QUFDQSxJQUFNLFdBQVcsaUJBQU8sV0FBUCxJQUFzQixNQUF2Qzs7QUFFQSxJQUFNLGVBQWU7QUFDbkIsU0FEbUIsbUJBQ1gsSUFEVyxFQUNXO0FBQzVCLFFBQUksU0FBUyxpQkFBTyxZQUFQLENBQW9CLFNBQXBCLEVBQStCLFFBQS9CLENBQWI7QUFDQSxRQUFJLFVBQVUsT0FBTyxNQUFQLENBQWMsSUFBZCxFQUFvQixNQUFwQixFQUE0QixLQUE1QixDQUFkO0FBQ0EsZUFBVyxPQUFPLEtBQVAsQ0FBYSxLQUFiLENBQVg7QUFDQSxXQUFPLE9BQVA7QUFDRCxHQU5rQjtBQVFuQixTQVJtQixtQkFRWCxJQVJXLEVBUVk7QUFDN0IsUUFBSTtBQUNGLFVBQUksV0FBVyxpQkFBTyxjQUFQLENBQXNCLFNBQXRCLEVBQWlDLFFBQWpDLENBQWY7QUFDQSxVQUFJLE1BQU0sU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCLEtBQXRCLEVBQTZCLE1BQTdCLENBQVY7QUFDQSxhQUFPLFNBQVMsS0FBVCxDQUFlLE1BQWYsQ0FBUDtBQUNBLGFBQU8sR0FBUDtBQUNELEtBTEQsQ0FLRSxPQUFPLEdBQVAsRUFBWTtBQUNaLFlBQU0sY0FBYyxHQUFkLEdBQW9CLGVBQXBCLEdBQXNDLElBQTVDO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQWxCa0IsQ0FBckI7O0FBcUJBLE9BQU8sT0FBUCxHQUFpQixZQUFqQiIsImZpbGUiOiJFbmNyeXB0VXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3QgQUxHT1JJVEhNID0gJ2Flcy0yNTYtY3RyJztcbmNvbnN0IFBBU1NXT1JEID0gY29uZmlnLkZCQ2hhdFRva2VuIHx8ICd0ZXN0JztcblxuY29uc3QgRW5jcnlwdFV0aWxzID0ge1xuICBlbmNyeXB0KHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGNpcGhlciA9IGNyeXB0by5jcmVhdGVDaXBoZXIoQUxHT1JJVEhNLCBQQVNTV09SRCk7XG4gICAgbGV0IGNyeXB0ZWQgPSBjaXBoZXIudXBkYXRlKHRleHQsICd1dGY4JywgJ2hleCcpO1xuICAgIGNyeXB0ZWQgKz0gY2lwaGVyLmZpbmFsKCdoZXgnKTtcbiAgICByZXR1cm4gY3J5cHRlZDtcbiAgfSxcblxuICBkZWNyeXB0KHRleHQ6IHN0cmluZyk6ID9zdHJpbmcge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGVjaXBoZXIgPSBjcnlwdG8uY3JlYXRlRGVjaXBoZXIoQUxHT1JJVEhNLCBQQVNTV09SRClcbiAgICAgIGxldCBkZWMgPSBkZWNpcGhlci51cGRhdGUodGV4dCwgJ2hleCcsICd1dGY4Jyk7XG4gICAgICBkZWMgKz0gZGVjaXBoZXIuZmluYWwoJ3V0ZjgnKTtcbiAgICAgIHJldHVybiBkZWM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBlcnJvcignRGVjcnR5cC4gJyArIGVyciArICcsIHdpdGggdGV4dDogJyArIHRleHQpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVuY3J5cHRVdGlscztcbiJdfQ==
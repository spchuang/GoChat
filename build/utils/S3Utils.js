

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _knox = require('knox');

var _knox2 = _interopRequireDefault(_knox);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../config.js');
var client = _knox2.default.createClient({
  key: config.s3.key,
  secret: config.s3.secret,
  bucket: config.s3.bucket,
  region: config.s3.region
});

var DOMAIN = 'https://s3-us-west-2.amazonaws.com' + '/' + config.s3.bucket;
var FOLDER = config.s3.folder;
// https://s3-us-west-2.amazonaws.com/messengergoboards/public/board1463694201969.jpg

var S3Utils = {
  genUploadImage: function genUploadImage(buffer, S3Filename) {
    var _this = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', _this.genUploadBuffer(buffer, S3Filename + '.jpg', 'image/jpeg'));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  genUploadBuffer: function genUploadBuffer(buffer, S3Filename, contentType) {
    var _this2 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2() {
      var S3Filepath, options;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              S3Filepath = _path2.default.join(FOLDER, S3Filename);
              options = { 'x-amz-acl': 'public-read', 'Content-Type': contentType };
              return _context2.abrupt('return', new _bluebird2.default(function (resolve, reject) {
                client.putBuffer(buffer, S3Filepath, options, function (err) {
                  if (err) {
                    return reject(err);
                  }
                  info('Uploaded file to ' + S3Filepath + ' successfully');
                  resolve(DOMAIN + '/' + S3Filepath);
                });
              }));

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },
  genExists: function genExists(filename) {
    var _this3 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3() {
      var S3fileURL, options, res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              S3fileURL = _this3.getURL(filename);

              info('Checking if the file exists here:' + S3fileURL);

              options = {
                method: 'HEAD',
                uri: S3fileURL,
                resolveWithFullResponse: true,
                simple: true
              };
              _context3.prev = 3;
              _context3.next = 6;
              return (0, _requestPromise2.default)(options);

            case 6:
              res = _context3.sent;
              return _context3.abrupt('return', res.statusCode === 200);

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](3);
              return _context3.abrupt('return', false);

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[3, 10]]);
    }))();
  },


  getURL: function getURL(filename) {
    return DOMAIN + '/' + FOLDER + '/' + filename + '.jpg';
  }
};

module.exports = S3Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9TM1V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBR0EsSUFBTSxTQUFTLFFBQVEsY0FBUixDQUFmO0FBQ0EsSUFBTSxTQUFTLGVBQUssWUFBTCxDQUFrQjtBQUMvQixPQUFLLE9BQU8sRUFBUCxDQUFVLEdBRGdCO0FBRS9CLFVBQVEsT0FBTyxFQUFQLENBQVUsTUFGYTtBQUcvQixVQUFRLE9BQU8sRUFBUCxDQUFVLE1BSGE7QUFJL0IsVUFBUSxPQUFPLEVBQVAsQ0FBVTtBQUphLENBQWxCLENBQWY7O0FBT0EsSUFBTSxTQUFTLHVDQUF1QyxHQUF2QyxHQUE2QyxPQUFPLEVBQVAsQ0FBVSxNQUF0RTtBQUNBLElBQU0sU0FBUyxPQUFPLEVBQVAsQ0FBVSxNQUF6Qjs7O0FBR0EsSUFBTSxVQUFVO0FBQ1IsZ0JBRFEsMEJBQ08sTUFEUCxFQUN1QixVQUR2QixFQUM0RDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQ0FDakUsTUFBSyxlQUFMLENBQXFCLE1BQXJCLEVBQTZCLGFBQWEsTUFBMUMsRUFBa0QsWUFBbEQsQ0FEaUU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFekUsR0FIYTtBQUtSLGlCQUxRLDJCQUtRLE1BTFIsRUFLd0IsVUFMeEIsRUFLNEMsV0FMNUMsRUFLa0Y7QUFBQTs7QUFBQTtBQUFBLFVBQ3hGLFVBRHdGLEVBRXhGLE9BRndGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDeEYsd0JBRHdGLEdBQzNFLGVBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsVUFBbEIsQ0FEMkU7QUFFeEYscUJBRndGLEdBRTlFLEVBQUMsYUFBYSxhQUFkLEVBQTZCLGdCQUFnQixXQUE3QyxFQUY4RTtBQUFBLGdEQUl2Rix1QkFBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLHVCQUFPLFNBQVAsQ0FBaUIsTUFBakIsRUFBeUIsVUFBekIsRUFBcUMsT0FBckMsRUFBOEMsVUFBUyxHQUFULEVBQWM7QUFDMUQsc0JBQUksR0FBSixFQUFTO0FBQ1AsMkJBQU8sT0FBTyxHQUFQLENBQVA7QUFDRDtBQUNELDZDQUF5QixVQUF6QjtBQUNBLDBCQUFRLFNBQVMsR0FBVCxHQUFlLFVBQXZCO0FBQ0QsaUJBTkQ7QUFPRCxlQVJNLENBSnVGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYS9GLEdBbEJhO0FBb0JSLFdBcEJRLHFCQW9CRSxRQXBCRixFQW9Cc0M7QUFBQTs7QUFBQTtBQUFBLFVBQzVDLFNBRDRDLEVBSTVDLE9BSjRDLEVBVzFDLEdBWDBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDNUMsdUJBRDRDLEdBQ2hDLE9BQUssTUFBTCxDQUFZLFFBQVosQ0FEZ0M7O0FBRWxELG1CQUFLLHNDQUFzQyxTQUEzQzs7QUFFTSxxQkFKNEMsR0FJbEM7QUFDZCx3QkFBUSxNQURNO0FBRWQscUJBQUssU0FGUztBQUdkLHlDQUF5QixJQUhYO0FBSWQsd0JBQVE7QUFKTSxlQUprQztBQUFBO0FBQUE7QUFBQSxxQkFXOUIsOEJBQUcsT0FBSCxDQVg4Qjs7QUFBQTtBQVcxQyxpQkFYMEM7QUFBQSxnREFZekMsSUFBSSxVQUFKLEtBQW1CLEdBWnNCOztBQUFBO0FBQUE7QUFBQTtBQUFBLGdEQWN6QyxLQWR5Qzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdCbkQsR0FwQ2E7OztBQXNDZCxVQUFRLGdCQUFTLFFBQVQsRUFBbUM7QUFDekMsV0FBTyxTQUFTLEdBQVQsR0FBZSxNQUFmLEdBQXdCLEdBQXhCLEdBQThCLFFBQTlCLEdBQXlDLE1BQWhEO0FBQ0Q7QUF4Q2EsQ0FBaEI7O0FBMkNBLE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiJTM1V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQga25veCBmcm9tICdrbm94JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHJwIGZyb20gJ3JlcXVlc3QtcHJvbWlzZSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZy5qcycpO1xuY29uc3QgY2xpZW50ID0ga25veC5jcmVhdGVDbGllbnQoe1xuICBrZXk6IGNvbmZpZy5zMy5rZXksXG4gIHNlY3JldDogY29uZmlnLnMzLnNlY3JldCxcbiAgYnVja2V0OiBjb25maWcuczMuYnVja2V0LFxuICByZWdpb246IGNvbmZpZy5zMy5yZWdpb24sXG59KTtcblxuY29uc3QgRE9NQUlOID0gJ2h0dHBzOi8vczMtdXMtd2VzdC0yLmFtYXpvbmF3cy5jb20nICsgJy8nICsgY29uZmlnLnMzLmJ1Y2tldDtcbmNvbnN0IEZPTERFUiA9IGNvbmZpZy5zMy5mb2xkZXI7XG4vLyBodHRwczovL3MzLXVzLXdlc3QtMi5hbWF6b25hd3MuY29tL21lc3NlbmdlcmdvYm9hcmRzL3B1YmxpYy9ib2FyZDE0NjM2OTQyMDE5NjkuanBnXG5cbmNvbnN0IFMzVXRpbHMgPSB7XG4gIGFzeW5jIGdlblVwbG9hZEltYWdlKGJ1ZmZlcjogQnVmZmVyLCBTM0ZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmdlblVwbG9hZEJ1ZmZlcihidWZmZXIsIFMzRmlsZW5hbWUgKyAnLmpwZycsICdpbWFnZS9qcGVnJyk7XG4gIH0sXG5cbiAgYXN5bmMgZ2VuVXBsb2FkQnVmZmVyKGJ1ZmZlcjogQnVmZmVyLCBTM0ZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IFMzRmlsZXBhdGggPSBwYXRoLmpvaW4oRk9MREVSLCBTM0ZpbGVuYW1lKTtcbiAgICBjb25zdCBvcHRpb25zID0geyd4LWFtei1hY2wnOiAncHVibGljLXJlYWQnLCAnQ29udGVudC1UeXBlJzogY29udGVudFR5cGV9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNsaWVudC5wdXRCdWZmZXIoYnVmZmVyLCBTM0ZpbGVwYXRoLCBvcHRpb25zLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvKGBVcGxvYWRlZCBmaWxlIHRvICR7UzNGaWxlcGF0aH0gc3VjY2Vzc2Z1bGx5YCk7XG4gICAgICAgIHJlc29sdmUoRE9NQUlOICsgJy8nICsgUzNGaWxlcGF0aCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICBhc3luYyBnZW5FeGlzdHMoZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IFMzZmlsZVVSTCA9IHRoaXMuZ2V0VVJMKGZpbGVuYW1lKTtcbiAgICBpbmZvKCdDaGVja2luZyBpZiB0aGUgZmlsZSBleGlzdHMgaGVyZTonICsgUzNmaWxlVVJMKTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdIRUFEJyxcbiAgICAgIHVyaTogUzNmaWxlVVJMLFxuICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICBzaW1wbGU6IHRydWUsXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgcnAob3B0aW9ucyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1c0NvZGUgPT09IDIwMDtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICBnZXRVUkw6IGZ1bmN0aW9uKGZpbGVuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBET01BSU4gKyAnLycgKyBGT0xERVIgKyAnLycgKyBmaWxlbmFtZSArICcuanBnJztcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUzNVdGlscztcbiJdfQ==
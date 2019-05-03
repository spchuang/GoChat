

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _S3Utils = require('../S3Utils.js');

var _S3Utils2 = _interopRequireDefault(_S3Utils);

var _ClassEnums = require('../../class/ClassEnums');

var _ImageUtils = require('./ImageUtils');

var _ImageUtils2 = _interopRequireDefault(_ImageUtils);

var _User = require('../../class/User');

var _User2 = _interopRequireDefault(_User);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_PROFILE_SIZE = 150;

var ProfileImageUtils = {
  getProfileURL: function getProfileURL(userID) {
    return userID + '-profile';
  },
  genProfilePicBuffer: function genProfilePicBuffer(user, size) {
    var _this = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
      var userData, buffer, resizeOption, gender;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userData = {};
              _context.prev = 1;
              _context.next = 4;
              return _fbLocalChatBot2.default.getUserProfile(user.getFBID());

            case 4:
              userData = _context.sent;
              _context.next = 7;
              return (0, _requestPromise2.default)({ url: userData.profile_pic, encoding: null });

            case 7:
              buffer = _context.sent;
              resizeOption = {
                kernel: _sharp2.default.kernel.lanczos2,
                interpolator: _sharp2.default.interpolator.nohalo
              };
              _context.next = 11;
              return (0, _sharp2.default)(buffer).resize(size, size, resizeOption).crop().toBuffer();

            case 11:
              return _context.abrupt('return', _context.sent);

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](1);

              // try our best to get gender
              gender = void 0;

              if (!userData.gender) {
                _context.next = 25;
                break;
              }

              gender = userData.gender === 'male' ? _ClassEnums.Gender.MALE : _ClassEnums.Gender.FEMALE;
              // update user gender if there's inconsistency

              if (!(gender !== user.getGender())) {
                _context.next = 23;
                break;
              }

              user.setGender(gender);
              _context.next = 23;
              return user.genSave();

            case 23:
              _context.next = 26;
              break;

            case 25:
              gender = user.getGender();

            case 26:
              if (!(gender === _ClassEnums.Gender.MALE)) {
                _context.next = 32;
                break;
              }

              _context.next = 29;
              return (0, _sharp2.default)(_ImageUtils2.default.getPath('male-profile')).resize(size, size).toBuffer();

            case 29:
              _context.t1 = _context.sent;
              _context.next = 35;
              break;

            case 32:
              _context.next = 34;
              return (0, _sharp2.default)(_ImageUtils2.default.getPath('female-profile')).resize(size, size).toBuffer();

            case 34:
              _context.t1 = _context.sent;

            case 35:
              return _context.abrupt('return', _context.t1);

            case 36:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 14]]);
    }))();
  },
  genProfilePicAndSave: function genProfilePicAndSave(user) {
    var _this2 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2() {
      var buffer;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this2.genProfilePicBuffer(user, DEFAULT_PROFILE_SIZE);

            case 2:
              buffer = _context2.sent;

              if (!(buffer === null)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return', null);

            case 5:
              _context2.next = 7;
              return _S3Utils2.default.genUploadImage(buffer, _this2.getProfileURL(user.getID()));

            case 7:
              return _context2.abrupt('return', _context2.sent);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
};

module.exports = ProfileImageUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9pbWFnZXMvUHJvZmlsZUltYWdlVXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLHVCQUF1QixHQUE3Qjs7QUFFQSxJQUFNLG9CQUFvQjtBQUN4QixlQUR3Qix5QkFDVixNQURVLEVBQ2M7QUFDcEMsV0FBVSxNQUFWO0FBQ0QsR0FIdUI7QUFLbEIscUJBTGtCLCtCQUtFLElBTEYsRUFLYyxJQUxkLEVBSzhDO0FBQUE7O0FBQUE7QUFBQSxVQUNoRSxRQURnRSxFQUk1RCxNQUo0RCxFQUs1RCxZQUw0RCxFQWU5RCxNQWY4RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2hFLHNCQURnRSxHQUNyRCxFQURxRDtBQUFBO0FBQUE7QUFBQSxxQkFHakQseUJBQUksY0FBSixDQUFtQixLQUFLLE9BQUwsRUFBbkIsQ0FIaUQ7O0FBQUE7QUFHbEUsc0JBSGtFO0FBQUE7QUFBQSxxQkFJN0MsOEJBQUcsRUFBQyxLQUFLLFNBQVMsV0FBZixFQUE0QixVQUFVLElBQXRDLEVBQUgsQ0FKNkM7O0FBQUE7QUFJNUQsb0JBSjREO0FBSzVELDBCQUw0RCxHQUs3QztBQUNuQix3QkFBUSxnQkFBTSxNQUFOLENBQWEsUUFERjtBQUVuQiw4QkFBYyxnQkFBTSxZQUFOLENBQW1CO0FBRmQsZUFMNkM7QUFBQTtBQUFBLHFCQVNyRCxxQkFBTSxNQUFOLEVBQ1YsTUFEVSxDQUNILElBREcsRUFDRyxJQURILEVBQ1MsWUFEVCxFQUVWLElBRlUsR0FHVixRQUhVLEVBVHFEOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOzs7QUFlOUQsb0JBZjhEOztBQUFBLG1CQWdCOUQsU0FBUyxNQWhCcUQ7QUFBQTtBQUFBO0FBQUE7O0FBaUJoRSx1QkFBUyxTQUFTLE1BQVQsS0FBb0IsTUFBcEIsR0FDTCxtQkFBTyxJQURGLEdBRUwsbUJBQU8sTUFGWDs7O0FBakJnRSxvQkFxQjVELFdBQVcsS0FBSyxTQUFMLEVBckJpRDtBQUFBO0FBQUE7QUFBQTs7QUFzQjlELG1CQUFLLFNBQUwsQ0FBZSxNQUFmO0FBdEI4RDtBQUFBLHFCQXVCeEQsS0FBSyxPQUFMLEVBdkJ3RDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUEwQmhFLHVCQUFTLEtBQUssU0FBTCxFQUFUOztBQTFCZ0U7QUFBQSxvQkE2QjNELFdBQVcsbUJBQU8sSUE3QnlDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEscUJBOEJ4RCxxQkFBTSxxQkFBVyxPQUFYLENBQW1CLGNBQW5CLENBQU4sRUFBMEMsTUFBMUMsQ0FBaUQsSUFBakQsRUFBdUQsSUFBdkQsRUFBNkQsUUFBN0QsRUE5QndEOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkErQnhELHFCQUFNLHFCQUFXLE9BQVgsQ0FBbUIsZ0JBQW5CLENBQU4sRUFBNEMsTUFBNUMsQ0FBbUQsSUFBbkQsRUFBeUQsSUFBekQsRUFBK0QsUUFBL0QsRUEvQndEOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlDckUsR0F0Q3VCO0FBd0NsQixzQkF4Q2tCLGdDQXdDRyxJQXhDSCxFQXdDaUM7QUFBQTs7QUFBQTtBQUFBLFVBQ2pELE1BRGlEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUNsQyxPQUFLLG1CQUFMLENBQXlCLElBQXpCLEVBQStCLG9CQUEvQixDQURrQzs7QUFBQTtBQUNqRCxvQkFEaUQ7O0FBQUEsb0JBRW5ELFdBQVcsSUFGd0M7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0RBRzlDLElBSDhDOztBQUFBO0FBQUE7QUFBQSxxQkFLMUMsa0JBQVEsY0FBUixDQUF1QixNQUF2QixFQUErQixPQUFLLGFBQUwsQ0FBbUIsS0FBSyxLQUFMLEVBQW5CLENBQS9CLENBTDBDOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNeEQ7QUE5Q3VCLENBQTFCOztBQWlEQSxPQUFPLE9BQVAsR0FBaUIsaUJBQWpCIiwiZmlsZSI6IlByb2ZpbGVJbWFnZVV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCBzaGFycCBmcm9tICdzaGFycCc7XG5pbXBvcnQgUzNVdGlscyBmcm9tICcuLi9TM1V0aWxzLmpzJztcbmltcG9ydCB7R2VuZGVyfSBmcm9tICcuLi8uLi9jbGFzcy9DbGFzc0VudW1zJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBJbWFnZVV0aWxzIGZyb20gJy4vSW1hZ2VVdGlscyc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi9jbGFzcy9Vc2VyJztcbmltcG9ydCBycCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuXG5jb25zdCBERUZBVUxUX1BST0ZJTEVfU0laRSA9IDE1MDtcblxuY29uc3QgUHJvZmlsZUltYWdlVXRpbHMgPSB7XG4gIGdldFByb2ZpbGVVUkwodXNlcklEOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt1c2VySUR9LXByb2ZpbGVgO1xuICB9LFxuXG4gIGFzeW5jIGdlblByb2ZpbGVQaWNCdWZmZXIodXNlcjogVXNlciwgc2l6ZTogbnVtYmVyKTogUHJvbWlzZTw/QnVmZmVyPiB7XG4gICAgbGV0IHVzZXJEYXRhID0ge307XG4gICAgdHJ5IHtcbiAgICAgIHVzZXJEYXRhID0gYXdhaXQgQm90LmdldFVzZXJQcm9maWxlKHVzZXIuZ2V0RkJJRCgpKTtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHJwKHt1cmw6IHVzZXJEYXRhLnByb2ZpbGVfcGljLCBlbmNvZGluZzogbnVsbH0pO1xuICAgICAgY29uc3QgcmVzaXplT3B0aW9uID0ge1xuICAgICAgICBrZXJuZWw6IHNoYXJwLmtlcm5lbC5sYW5jem9zMixcbiAgICAgICAgaW50ZXJwb2xhdG9yOiBzaGFycC5pbnRlcnBvbGF0b3Iubm9oYWxvLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBhd2FpdCBzaGFycChidWZmZXIpXG4gICAgICAgIC5yZXNpemUoc2l6ZSwgc2l6ZSwgcmVzaXplT3B0aW9uKVxuICAgICAgICAuY3JvcCgpXG4gICAgICAgIC50b0J1ZmZlcigpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gdHJ5IG91ciBiZXN0IHRvIGdldCBnZW5kZXJcbiAgICAgIGxldCBnZW5kZXI7XG4gICAgICBpZiAodXNlckRhdGEuZ2VuZGVyKSB7XG4gICAgICAgIGdlbmRlciA9IHVzZXJEYXRhLmdlbmRlciA9PT0gJ21hbGUnXG4gICAgICAgICAgPyBHZW5kZXIuTUFMRVxuICAgICAgICAgIDogR2VuZGVyLkZFTUFMRTtcbiAgICAgICAgLy8gdXBkYXRlIHVzZXIgZ2VuZGVyIGlmIHRoZXJlJ3MgaW5jb25zaXN0ZW5jeVxuICAgICAgICBpZiAoZ2VuZGVyICE9PSB1c2VyLmdldEdlbmRlcigpKSB7XG4gICAgICAgICAgdXNlci5zZXRHZW5kZXIoZ2VuZGVyKTtcbiAgICAgICAgICBhd2FpdCB1c2VyLmdlblNhdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2VuZGVyID0gdXNlci5nZXRHZW5kZXIoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdlbmRlciA9PT0gR2VuZGVyLk1BTEVcbiAgICAgICAgPyBhd2FpdCBzaGFycChJbWFnZVV0aWxzLmdldFBhdGgoJ21hbGUtcHJvZmlsZScpKS5yZXNpemUoc2l6ZSwgc2l6ZSkudG9CdWZmZXIoKVxuICAgICAgICA6IGF3YWl0IHNoYXJwKEltYWdlVXRpbHMuZ2V0UGF0aCgnZmVtYWxlLXByb2ZpbGUnKSkucmVzaXplKHNpemUsIHNpemUpLnRvQnVmZmVyKCk7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdlblByb2ZpbGVQaWNBbmRTYXZlKHVzZXI6IFVzZXIpOiBQcm9taXNlPD9zdHJpbmc+IHtcbiAgICBjb25zdCBidWZmZXIgPSBhd2FpdCB0aGlzLmdlblByb2ZpbGVQaWNCdWZmZXIodXNlciwgREVGQVVMVF9QUk9GSUxFX1NJWkUpO1xuICAgIGlmIChidWZmZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gYXdhaXQgUzNVdGlscy5nZW5VcGxvYWRJbWFnZShidWZmZXIsIHRoaXMuZ2V0UHJvZmlsZVVSTCh1c2VyLmdldElEKCkpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2ZpbGVJbWFnZVV0aWxzO1xuIl19


'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _Game = require('../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoAIUtils = {
  genNextMove: function genNextMove(game) {
    var _this = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
      var stoneHistory, stoneColor, size, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              stoneHistory = game.getStones();
              stoneColor = game.getCurrentMoveColorText();
              size = game.getWeiqiBoardSize();
              _context.next = 5;
              return (0, _requestPromise2.default)({
                //uri: 'http://localhost:8000/move
                // UPDATE HERE???
                uri: 'http://0.0.0.0:8000/move',
                method: 'GET',
                json: true,
                body: {
                  'board_format': 'ij_history',
                  'board': stoneHistory,
                  'stone_color': stoneColor,
                  'board_size': size,
                  'return_board': 0
                }
              });

            case 5:
              res = _context.sent;

              info(res['move_ij']);
              return _context.abrupt('return', res['move_ij']);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  getAIUserID: function getAIUserID() {
    return _config2.default.GOAIUserID;
  }
};

module.exports = GoAIUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Hb0FJVXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLFlBQVk7QUFDVixhQURVLHVCQUNFLElBREYsRUFDaUM7QUFBQTs7QUFBQTtBQUFBLFVBQ3pDLFlBRHlDLEVBRXpDLFVBRnlDLEVBR3pDLElBSHlDLEVBSXpDLEdBSnlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDekMsMEJBRHlDLEdBQzFCLEtBQUssU0FBTCxFQUQwQjtBQUV6Qyx3QkFGeUMsR0FFNUIsS0FBSyx1QkFBTCxFQUY0QjtBQUd6QyxrQkFIeUMsR0FHbEMsS0FBSyxpQkFBTCxFQUhrQztBQUFBO0FBQUEscUJBSTdCLDhCQUFHOzs7QUFHbkIscUJBQUssMEJBSGM7QUFJbkIsd0JBQVEsS0FKVztBQUtuQixzQkFBTSxJQUxhO0FBTW5CLHNCQUFNO0FBQ0osa0NBQWdCLFlBRFo7QUFFSiwyQkFBUyxZQUZMO0FBR0osaUNBQWUsVUFIWDtBQUlKLGdDQUFjLElBSlY7QUFLSixrQ0FBZ0I7QUFMWjtBQU5hLGVBQUgsQ0FKNkI7O0FBQUE7QUFJekMsaUJBSnlDOztBQWtCL0MsbUJBQUssSUFBSSxTQUFKLENBQUw7QUFsQitDLCtDQW1CeEMsSUFBSSxTQUFKLENBbkJ3Qzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9CaEQsR0FyQmU7QUF1QmhCLGFBdkJnQix5QkF1Qk07QUFDcEIsV0FBTyxpQkFBTyxVQUFkO0FBQ0Q7QUF6QmUsQ0FBbEI7O0FBNEJBLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJHb0FJVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBycCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IEdvR2FtZSBmcm9tICcuLi9jbGFzcy9HYW1lJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3QgR29BSVV0aWxzID0ge1xuICBhc3luYyBnZW5OZXh0TW92ZShnYW1lOiBHb0dhbWUpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHN0b25lSGlzdG9yeSA9IGdhbWUuZ2V0U3RvbmVzKCk7XG4gICAgY29uc3Qgc3RvbmVDb2xvciA9IGdhbWUuZ2V0Q3VycmVudE1vdmVDb2xvclRleHQoKTtcbiAgICBjb25zdCBzaXplID0gZ2FtZS5nZXRXZWlxaUJvYXJkU2l6ZSgpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJwKHtcbiAgICAgIC8vdXJpOiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwL21vdmVcbiAgICAgIC8vIFVQREFURSBIRVJFPz8/XG4gICAgICB1cmk6ICdodHRwOi8vMC4wLjAuMDo4MDAwL21vdmUnLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGpzb246IHRydWUsXG4gICAgICBib2R5OiB7XG4gICAgICAgICdib2FyZF9mb3JtYXQnOiAnaWpfaGlzdG9yeScsXG4gICAgICAgICdib2FyZCc6IHN0b25lSGlzdG9yeSxcbiAgICAgICAgJ3N0b25lX2NvbG9yJzogc3RvbmVDb2xvcixcbiAgICAgICAgJ2JvYXJkX3NpemUnOiBzaXplLFxuICAgICAgICAncmV0dXJuX2JvYXJkJzogMCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaW5mbyhyZXNbJ21vdmVfaWonXSk7XG4gICAgcmV0dXJuIHJlc1snbW92ZV9paiddO1xuICB9LFxuXG4gIGdldEFJVXNlcklEKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGNvbmZpZy5HT0FJVXNlcklEO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR29BSVV0aWxzO1xuIl19
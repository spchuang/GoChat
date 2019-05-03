

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _genBaseImageComponents = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(game, stoneSize, profileSize, fontSize, maxNameLength) {
    var _ref, _ref2, blackStone, whiteStone, blackUser, whiteUser, _ref3, _ref4, blackUserProfile, whiteUserProfile, blackName, whiteName;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bluebird2.default.all([(0, _sharp2.default)(_ImageUtils2.default.getPath('black')).resize(stoneSize, stoneSize).toBuffer(), (0, _sharp2.default)(_ImageUtils2.default.getPath('white')).resize(stoneSize, stoneSize).toBuffer(), game.genBlackUser(), game.genWhiteUser()]);

          case 2:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 4);
            blackStone = _ref2[0];
            whiteStone = _ref2[1];
            blackUser = _ref2[2];
            whiteUser = _ref2[3];
            _context.next = 10;
            return _bluebird2.default.all([_ProfileImageUtils2.default.genProfilePicBuffer(blackUser, profileSize), _ProfileImageUtils2.default.genProfilePicBuffer(whiteUser, profileSize)]);

          case 10:
            _ref3 = _context.sent;
            _ref4 = _slicedToArray(_ref3, 2);
            blackUserProfile = _ref4[0];
            whiteUserProfile = _ref4[1];
            blackName = _getShortname(blackUser.getFirstName() || 'No Name', maxNameLength);
            whiteName = _getShortname(whiteUser.getFirstName() || 'No Name', maxNameLength);
            return _context.abrupt('return', [blackStone, whiteStone, _getTextBuffer(blackName, fontSize), _getTextBuffer(whiteName, fontSize), blackUserProfile, whiteUserProfile]);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function _genBaseImageComponents(_x, _x2, _x3, _x4, _x5) {
    return ref.apply(this, arguments);
  };
}();

// TODO: think of a way to refactor duplicate logic


var _genGameMiniBaseImageBuffer = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(game) {
    var baseBoardString, buffer, exists, stoneSize, profileSize, profileMargin, _ref5, _ref6, blackStone, whiteStone, blackUserName, whiteUserName, blackProfile, whiteProfile, _ref7, _ref8, whiteUserNameMeta, blackUserNameMeta, blackLeft, whiteLeft, overlays, emptyImageBuffer, baseBuffer;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            baseBoardString = 'game-' + game.getID() + '-mini-3base';
            buffer = GameCache.get(baseBoardString);

            if (!buffer) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt('return', buffer);

          case 4:
            _context2.next = 6;
            return _S3Utils2.default.genExists(baseBoardString);

          case 6:
            exists = _context2.sent;

            if (!exists) {
              _context2.next = 11;
              break;
            }

            _context2.next = 10;
            return (0, _requestPromise2.default)({ url: _S3Utils2.default.getURL(baseBoardString), encoding: null });

          case 10:
            return _context2.abrupt('return', _context2.sent);

          case 11:
            stoneSize = 50;
            profileSize = 75;
            profileMargin = 10;
            _context2.next = 16;
            return _genBaseImageComponents(game, stoneSize, profileSize, 55 /*fontSize*/, 12 /*maxNameLength*/);

          case 16:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 6);
            blackStone = _ref6[0];
            whiteStone = _ref6[1];
            blackUserName = _ref6[2];
            whiteUserName = _ref6[3];
            blackProfile = _ref6[4];
            whiteProfile = _ref6[5];
            _context2.next = 26;
            return _bluebird2.default.all([(0, _sharp2.default)(whiteUserName).metadata(), (0, _sharp2.default)(blackUserName).metadata()]);

          case 26:
            _ref7 = _context2.sent;
            _ref8 = _slicedToArray(_ref7, 2);
            whiteUserNameMeta = _ref8[0];
            blackUserNameMeta = _ref8[1];
            blackLeft = Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - (blackUserNameMeta.width + profileSize + profileMargin) / 2);
            whiteLeft = Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - (whiteUserNameMeta.width + profileSize + profileMargin) / 2);
            overlays = [{
              option: { top: 107, left: Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - stoneSize / 2) },
              image: blackStone
            }, {
              option: { top: 165, left: blackLeft },
              image: blackProfile
            }, {
              option: { top: 175, left: blackLeft + profileSize + profileMargin },
              image: blackUserName
            }, {
              option: { top: 287, left: Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - stoneSize / 2) },
              image: whiteStone
            }, {
              option: { top: 345, left: whiteLeft },
              image: whiteProfile
            }, {
              option: { top: 355, left: whiteLeft + profileSize + profileMargin },
              image: whiteUserName
            }];
            _context2.next = 35;
            return _ImageUtils2.default.genCreateEmptyImageBuffer(GAME_MINI_WIDTH, GAME_MINI_HEIGHT);

          case 35:
            emptyImageBuffer = _context2.sent;
            _context2.next = 38;
            return _ImageUtils2.default.genApplyOverlays(emptyImageBuffer, overlays);

          case 38:
            baseBuffer = _context2.sent;

            _S3Utils2.default.genUploadImage(baseBuffer, baseBoardString);
            GameCache.put(baseBoardString, baseBuffer);
            return _context2.abrupt('return', baseBuffer);

          case 42:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function _genGameMiniBaseImageBuffer(_x6) {
    return ref.apply(this, arguments);
  };
}();

var _genGameBaseImageBuffer = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(game) {
    var baseBoardString, buffer, exists, _ref9, _ref10, blackStone, whiteStone, blackUserName, whiteUserName, blackProfile, whiteProfile, overlays, emptyImageBuffer, baseBuffer;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            baseBoardString = 'game-' + game.getID() + '-3base';
            buffer = GameCache.get(baseBoardString);

            if (!buffer) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt('return', buffer);

          case 4:
            _context3.next = 6;
            return _S3Utils2.default.genExists(baseBoardString);

          case 6:
            exists = _context3.sent;

            if (!exists) {
              _context3.next = 11;
              break;
            }

            _context3.next = 10;
            return (0, _requestPromise2.default)({ url: _S3Utils2.default.getURL(baseBoardString), encoding: null });

          case 10:
            return _context3.abrupt('return', _context3.sent);

          case 11:
            _context3.next = 13;
            return _genBaseImageComponents(game, 45 /*stoneSize*/, 75 /*profileSize*/, 60 /*fontSize*/, 11 /*maxNameLength*/);

          case 13:
            _ref9 = _context3.sent;
            _ref10 = _slicedToArray(_ref9, 6);
            blackStone = _ref10[0];
            whiteStone = _ref10[1];
            blackUserName = _ref10[2];
            whiteUserName = _ref10[3];
            blackProfile = _ref10[4];
            whiteProfile = _ref10[5];
            overlays = [{
              option: { top: 28, left: 15 },
              image: blackStone
            }, {
              option: { top: 28, left: 515 },
              image: whiteStone
            }, {
              option: { top: 25, left: 150 },
              image: blackUserName
            }, {
              option: { top: 25, left: 650 },
              image: whiteUserName
            }, {
              option: { top: 14, left: 69 },
              image: blackProfile
            }, {
              option: { top: 14, left: 569 },
              image: whiteProfile
            }];
            _context3.next = 24;
            return _ImageUtils2.default.genCreateEmptyImageBuffer(BOARD_WIDTH, BOARD_HEIGHT);

          case 24:
            emptyImageBuffer = _context3.sent;
            _context3.next = 27;
            return _ImageUtils2.default.genApplyOverlays(emptyImageBuffer, overlays);

          case 27:
            baseBuffer = _context3.sent;


            _S3Utils2.default.genUploadImage(baseBuffer, baseBoardString);
            GameCache.put(baseBoardString, baseBuffer);
            return _context3.abrupt('return', baseBuffer);

          case 31:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function _genGameBaseImageBuffer(_x7) {
    return ref.apply(this, arguments);
  };
}();

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _S3Utils = require('../S3Utils');

var _S3Utils2 = _interopRequireDefault(_S3Utils);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _textToSvg = require('text-to-svg');

var _textToSvg2 = _interopRequireDefault(_textToSvg);

var _BoardImageRendererUtils = require('./BoardImageRendererUtils');

var _BoardImageRendererUtils2 = _interopRequireDefault(_BoardImageRendererUtils);

var _ProfileImageUtils = require('./ProfileImageUtils');

var _ProfileImageUtils2 = _interopRequireDefault(_ProfileImageUtils);

var _SimpleCache = require('../SimpleCache');

var _SimpleCache2 = _interopRequireDefault(_SimpleCache);

var _ImageUtils = require('./ImageUtils');

var _ImageUtils2 = _interopRequireDefault(_ImageUtils);

var _Game = require('../../class/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameCache = new _SimpleCache2.default();

var textToSVG = _textToSvg2.default.loadSync();

var BOARD_TOP_PADDING = 150;
var BOARD_WIDTH = 1000;
var BOARD_HEIGHT = 1000 + BOARD_TOP_PADDING;

var GAME_MINI_WIDTH = 955;
var GAME_MINI_HEIGHT = 500;
var GAME_MINI_BOARD_SIZE = 460;
var GAME_MINI_BOARD_PADDING = 20;
var GAME_MINI_LEFT_HALF_WITDTH = GAME_MINI_WIDTH - GAME_MINI_BOARD_SIZE - GAME_MINI_BOARD_PADDING * 2;

function _getShortname(name, maxLength) {
  // if character length is greater than max, we try to split the name further
  // last resort is to slice
  if (name.length <= maxLength) {
    return name;
  }
  var split = name.split(' ');
  if (split.length > 1) {
    return split[0].substring(0, maxLength);
  }
  split = name.split('-');
  if (split.length > 1) {
    return split[0].substring(0, maxLength);
  }
  return name.substring(0, maxLength);
}

function _getTextBuffer(text, fontSize) {
  var attributes = { fill: 'black', stroke: 'black' };
  var options = { x: 0, y: 0, fontSize: fontSize, anchor: 'top', attributes: attributes };
  var svg = textToSVG.getSVG(text, options);
  return new Buffer(svg);
}

var GameImageRendererUtils = {
  // Board url is: 'game-<gameID>-<boardString>'

  genBoardImageURL: function genBoardImageURL(game) {
    var _this = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4() {
      var boardString, exists, _ref11, _ref12, baseBuffer, boardBuffer, _game$getCaptures, _game$getCaptures2, blackCaptures, whiteCapture, blackCaptureText, whiteCaptureText, overlays, imageBuffer, url;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              boardString = 'game-' + game.getID() + '-' + game.getCurrentBoardString();
              _context4.next = 3;
              return _S3Utils2.default.genExists(boardString);

            case 3:
              exists = _context4.sent;

              if (!exists) {
                _context4.next = 7;
                break;
              }

              info('The board image for the board already exists');
              return _context4.abrupt('return', _S3Utils2.default.getURL(boardString));

            case 7:

              info('The board image for the board does not exist, creating it and uploading');
              // create base buffer and board buffer separately
              _context4.next = 10;
              return _bluebird2.default.all([_genGameBaseImageBuffer(game), _BoardImageRendererUtils2.default.genBoardBuffer(game)]);

            case 10:
              _ref11 = _context4.sent;
              _ref12 = _slicedToArray(_ref11, 2);
              baseBuffer = _ref12[0];
              boardBuffer = _ref12[1];
              _game$getCaptures = game.getCaptures();
              _game$getCaptures2 = _slicedToArray(_game$getCaptures, 2);
              blackCaptures = _game$getCaptures2[0];
              whiteCapture = _game$getCaptures2[1];
              blackCaptureText = _getTextBuffer('captures: ' + blackCaptures, 40);
              whiteCaptureText = _getTextBuffer('captures: ' + whiteCapture, 40);
              overlays = [{
                option: { top: BOARD_TOP_PADDING, left: 0 },
                image: boardBuffer
              }, {
                option: { top: 100, left: 15 },
                image: blackCaptureText
              }, {
                option: { top: 100, left: 515 },
                image: whiteCaptureText
              }];
              _context4.next = 23;
              return _ImageUtils2.default.genApplyOverlays(baseBuffer, overlays);

            case 23:
              imageBuffer = _context4.sent;
              _context4.next = 26;
              return _S3Utils2.default.genUploadImage(imageBuffer, boardString);

            case 26:
              url = _context4.sent;

              info('Successfully uploaded new board image to S3');
              return _context4.abrupt('return', url);

            case 29:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }))();
  },


  // Mini board url: 'game-mini-<gameID>-<boardString>'
  genMiniBoardImageURL: function genMiniBoardImageURL(game) {
    var _this2 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5() {
      var boardString, exists, _ref13, _ref14, baseBuffer, boardBuffer, overlays, scoreText, scoreTextBuffer, scoreTextMeta, scoreLeft, imageBuffer, url;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              boardString = 'game-mini-' + game.getID() + '-' + game.getCurrentBoardString();
              _context5.next = 3;
              return _S3Utils2.default.genExists(boardString);

            case 3:
              exists = _context5.sent;

              if (!exists) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt('return', _S3Utils2.default.getURL(boardString));

            case 6:
              _context5.next = 8;
              return _bluebird2.default.all([_genGameMiniBaseImageBuffer(game), _BoardImageRendererUtils2.default.genBoardBuffer(game, GAME_MINI_BOARD_SIZE)]);

            case 8:
              _ref13 = _context5.sent;
              _ref14 = _slicedToArray(_ref13, 2);
              baseBuffer = _ref14[0];
              boardBuffer = _ref14[1];
              overlays = [{
                option: { top: GAME_MINI_BOARD_PADDING, left: GAME_MINI_WIDTH - GAME_MINI_BOARD_SIZE - GAME_MINI_BOARD_PADDING / 2 },
                image: boardBuffer
              }];
              scoreText = game.getScoreText();
              // overlay score information (i.e. B+R)

              if (!scoreText) {
                _context5.next = 21;
                break;
              }

              scoreTextBuffer = _getTextBuffer(scoreText, 50);
              _context5.next = 18;
              return (0, _sharp2.default)(scoreTextBuffer).metadata();

            case 18:
              scoreTextMeta = _context5.sent;
              scoreLeft = Math.round(GAME_MINI_LEFT_HALF_WITDTH / 2 - scoreTextMeta.width / 2);

              overlays.push({
                option: { top: 35, left: scoreLeft },
                image: scoreTextBuffer
              });

            case 21:
              _context5.next = 23;
              return _ImageUtils2.default.genApplyOverlays(baseBuffer, overlays);

            case 23:
              imageBuffer = _context5.sent;
              _context5.next = 26;
              return _S3Utils2.default.genUploadImage(imageBuffer, boardString);

            case 26:
              url = _context5.sent;
              return _context5.abrupt('return', url);

            case 28:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this2);
    }))();
  }
};

module.exports = GameImageRendererUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9pbWFnZXMvR2FtZUltYWdlUmVuZGVyZXJVdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7Ozs7NkRBc0RBLGlCQUNFLElBREYsRUFFRSxTQUZGLEVBR0UsV0FIRixFQUlFLFFBSkYsRUFLRSxhQUxGO0FBQUEscUJBT1MsVUFQVCxFQU9xQixVQVByQixFQU9pQyxTQVBqQyxFQU80QyxTQVA1QyxnQkFjUyxnQkFkVCxFQWMyQixnQkFkM0IsRUFtQlEsU0FuQlIsRUFvQlEsU0FwQlI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU8rRCxtQkFBUSxHQUFSLENBQVksQ0FDdkUscUJBQU0scUJBQVcsT0FBWCxDQUFtQixPQUFuQixDQUFOLEVBQW1DLE1BQW5DLENBQTBDLFNBQTFDLEVBQXFELFNBQXJELEVBQWdFLFFBQWhFLEVBRHVFLEVBRXZFLHFCQUFNLHFCQUFXLE9BQVgsQ0FBbUIsT0FBbkIsQ0FBTixFQUFtQyxNQUFuQyxDQUEwQyxTQUExQyxFQUFxRCxTQUFyRCxFQUFnRSxRQUFoRSxFQUZ1RSxFQUd2RSxLQUFLLFlBQUwsRUFIdUUsRUFJdkUsS0FBSyxZQUFMLEVBSnVFLENBQVosQ0FQL0Q7O0FBQUE7QUFBQTtBQUFBO0FBT1Msc0JBUFQ7QUFPcUIsc0JBUHJCO0FBT2lDLHFCQVBqQztBQU80QyxxQkFQNUM7QUFBQTtBQUFBLG1CQWNxRCxtQkFBUSxHQUFSLENBQVksQ0FDN0QsNEJBQWtCLG1CQUFsQixDQUFzQyxTQUF0QyxFQUFpRCxXQUFqRCxDQUQ2RCxFQUU3RCw0QkFBa0IsbUJBQWxCLENBQXNDLFNBQXRDLEVBQWlELFdBQWpELENBRjZELENBQVosQ0FkckQ7O0FBQUE7QUFBQTtBQUFBO0FBY1MsNEJBZFQ7QUFjMkIsNEJBZDNCO0FBbUJRLHFCQW5CUixHQW1Cb0IsY0FBYyxVQUFVLFlBQVYsTUFBNEIsU0FBMUMsRUFBcUQsYUFBckQsQ0FuQnBCO0FBb0JRLHFCQXBC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QXBFLENBdkJvQzs7QUF3QnRELHVCQUFTLElBQVQsQ0FBYztBQUNaLHdCQUFRLEVBQUMsS0FBSyxFQUFOLEVBQVUsTUFBTSxTQUFoQixFQURJO0FBRVosdUJBQU87QUFGSyxlQUFkOztBQXhCc0Q7QUFBQTtBQUFBLHFCQTZCOUIscUJBQVcsZ0JBQVgsQ0FBNEIsVUFBNUIsRUFBd0MsUUFBeEMsQ0E3QjhCOztBQUFBO0FBNkJsRCx5QkE3QmtEO0FBQUE7QUFBQSxxQkE4QnRDLGtCQUFRLGNBQVIsQ0FBdUIsV0FBdkIsRUFBb0MsV0FBcEMsQ0E5QnNDOztBQUFBO0FBOEJsRCxpQkE5QmtEO0FBQUEsZ0RBK0JqRCxHQS9CaUQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFnQ3pEO0FBMUU0QixDQUEvQjs7QUE2RUEsT0FBTyxPQUFQLEdBQWlCLHNCQUFqQiIsImZpbGUiOiJHYW1lSW1hZ2VSZW5kZXJlclV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgc2hhcnAgZnJvbSAnc2hhcnAnO1xuaW1wb3J0IFMzVXRpbHMgZnJvbSAnLi4vUzNVdGlscyc7XG5pbXBvcnQgcnAgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCBUZXh0VG9TVkcgZnJvbSAndGV4dC10by1zdmcnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEJvYXJkSW1hZ2VSZW5kZXJlclV0aWxzIGZyb20gJy4vQm9hcmRJbWFnZVJlbmRlcmVyVXRpbHMnO1xuaW1wb3J0IFByb2ZpbGVJbWFnZVV0aWxzIGZyb20gJy4vUHJvZmlsZUltYWdlVXRpbHMnO1xuaW1wb3J0IFNpbXBsZUNhY2hlIGZyb20gJy4uL1NpbXBsZUNhY2hlJztcbmltcG9ydCBJbWFnZVV0aWxzIGZyb20gJy4vSW1hZ2VVdGlscyc7XG5pbXBvcnQgR29HYW1lIGZyb20gJy4uLy4uL2NsYXNzL0dhbWUnO1xuXG5jb25zdCBHYW1lQ2FjaGUgPSBuZXcgU2ltcGxlQ2FjaGUoKTtcblxuY29uc3QgdGV4dFRvU1ZHID0gVGV4dFRvU1ZHLmxvYWRTeW5jKCk7XG5cbmNvbnN0IEJPQVJEX1RPUF9QQURESU5HID0gMTUwO1xuY29uc3QgQk9BUkRfV0lEVEggPSAxMDAwO1xuY29uc3QgQk9BUkRfSEVJR0hUID0gMTAwMCArIEJPQVJEX1RPUF9QQURESU5HO1xuXG5jb25zdCBHQU1FX01JTklfV0lEVEggPSA5NTU7XG5jb25zdCBHQU1FX01JTklfSEVJR0hUID0gNTAwO1xuY29uc3QgR0FNRV9NSU5JX0JPQVJEX1NJWkUgPSA0NjA7XG5jb25zdCBHQU1FX01JTklfQk9BUkRfUEFERElORyA9IDIwO1xuY29uc3QgR0FNRV9NSU5JX0xFRlRfSEFMRl9XSVREVEggPSBHQU1FX01JTklfV0lEVEggLSBHQU1FX01JTklfQk9BUkRfU0laRSAtIEdBTUVfTUlOSV9CT0FSRF9QQURESU5HICogMjtcblxuZnVuY3Rpb24gX2dldFNob3J0bmFtZShuYW1lOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgLy8gaWYgY2hhcmFjdGVyIGxlbmd0aCBpcyBncmVhdGVyIHRoYW4gbWF4LCB3ZSB0cnkgdG8gc3BsaXQgdGhlIG5hbWUgZnVydGhlclxuICAvLyBsYXN0IHJlc29ydCBpcyB0byBzbGljZVxuICBpZiAobmFtZS5sZW5ndGggPD0gbWF4TGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbiAgbGV0IHNwbGl0ID0gbmFtZS5zcGxpdCgnICcpO1xuICBpZiAoc3BsaXQubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiBzcGxpdFswXS5zdWJzdHJpbmcoMCwgbWF4TGVuZ3RoKTtcbiAgfVxuICBzcGxpdCA9IG5hbWUuc3BsaXQoJy0nKTtcbiAgaWYgKHNwbGl0Lmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gc3BsaXRbMF0uc3Vic3RyaW5nKDAsIG1heExlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIG5hbWUuc3Vic3RyaW5nKDAsIG1heExlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIF9nZXRUZXh0QnVmZmVyKFxuICB0ZXh0OiBzdHJpbmcsXG4gIGZvbnRTaXplOiBudW1iZXIsXG4pOiBCdWZmZXIge1xuICBjb25zdCBhdHRyaWJ1dGVzID0ge2ZpbGw6ICdibGFjaycsIHN0cm9rZTogJ2JsYWNrJ307XG4gIGNvbnN0IG9wdGlvbnMgPSB7eDogMCwgeTogMCwgZm9udFNpemU6IGZvbnRTaXplLCBhbmNob3I6ICd0b3AnLCBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzfTtcbiAgY29uc3Qgc3ZnID0gdGV4dFRvU1ZHLmdldFNWRyh0ZXh0LCBvcHRpb25zKTtcbiAgcmV0dXJuIG5ldyBCdWZmZXIoc3ZnKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dlbkJhc2VJbWFnZUNvbXBvbmVudHMoXG4gIGdhbWU6IEdvR2FtZSxcbiAgc3RvbmVTaXplOiBudW1iZXIsXG4gIHByb2ZpbGVTaXplOiBudW1iZXIsXG4gIGZvbnRTaXplOiBudW1iZXIsXG4gIG1heE5hbWVMZW5ndGg6IG51bWJlcixcbik6IFByb21pc2U8W0J1ZmZlciwgQnVmZmVyLCBCdWZmZXIsIEJ1ZmZlciwgQnVmZmVyLCBCdWZmZXJdPiB7XG4gIGNvbnN0IFtibGFja1N0b25lLCB3aGl0ZVN0b25lLCBibGFja1VzZXIsIHdoaXRlVXNlcl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgc2hhcnAoSW1hZ2VVdGlscy5nZXRQYXRoKCdibGFjaycpKS5yZXNpemUoc3RvbmVTaXplLCBzdG9uZVNpemUpLnRvQnVmZmVyKCksXG4gICAgc2hhcnAoSW1hZ2VVdGlscy5nZXRQYXRoKCd3aGl0ZScpKS5yZXNpemUoc3RvbmVTaXplLCBzdG9uZVNpemUpLnRvQnVmZmVyKCksXG4gICAgZ2FtZS5nZW5CbGFja1VzZXIoKSxcbiAgICBnYW1lLmdlbldoaXRlVXNlcigpLFxuICBdKTtcblxuICBjb25zdCBbYmxhY2tVc2VyUHJvZmlsZSwgd2hpdGVVc2VyUHJvZmlsZV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgUHJvZmlsZUltYWdlVXRpbHMuZ2VuUHJvZmlsZVBpY0J1ZmZlcihibGFja1VzZXIsIHByb2ZpbGVTaXplKSxcbiAgICBQcm9maWxlSW1hZ2VVdGlscy5nZW5Qcm9maWxlUGljQnVmZmVyKHdoaXRlVXNlciwgcHJvZmlsZVNpemUpLFxuICBdKTtcblxuICBjb25zdCBibGFja05hbWUgPSBfZ2V0U2hvcnRuYW1lKGJsYWNrVXNlci5nZXRGaXJzdE5hbWUoKSB8fCAnTm8gTmFtZScsIG1heE5hbWVMZW5ndGgpO1xuICBjb25zdCB3aGl0ZU5hbWUgPSBfZ2V0U2hvcnRuYW1lKHdoaXRlVXNlci5nZXRGaXJzdE5hbWUoKSB8fCAnTm8gTmFtZScsIG1heE5hbWVMZW5ndGgpO1xuICByZXR1cm4gW1xuICAgIGJsYWNrU3RvbmUsXG4gICAgd2hpdGVTdG9uZSxcbiAgICBfZ2V0VGV4dEJ1ZmZlcihibGFja05hbWUsIGZvbnRTaXplKSxcbiAgICBfZ2V0VGV4dEJ1ZmZlcih3aGl0ZU5hbWUsIGZvbnRTaXplKSxcbiAgICBibGFja1VzZXJQcm9maWxlLFxuICAgIHdoaXRlVXNlclByb2ZpbGUsXG4gIF07XG59XG5cbi8vIFRPRE86IHRoaW5rIG9mIGEgd2F5IHRvIHJlZmFjdG9yIGR1cGxpY2F0ZSBsb2dpY1xuYXN5bmMgZnVuY3Rpb24gX2dlbkdhbWVNaW5pQmFzZUltYWdlQnVmZmVyKGdhbWU6IEdvR2FtZSk6IFByb21pc2U8QnVmZmVyPiB7XG4gIGNvbnN0IGJhc2VCb2FyZFN0cmluZyA9IGBnYW1lLSR7Z2FtZS5nZXRJRCgpfS1taW5pLTNiYXNlYDtcbiAgY29uc3QgYnVmZmVyID0gR2FtZUNhY2hlLmdldChiYXNlQm9hcmRTdHJpbmcpO1xuICBpZiAoYnVmZmVyKSB7XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIGNvbnN0IGV4aXN0cyA9IGF3YWl0IFMzVXRpbHMuZ2VuRXhpc3RzKGJhc2VCb2FyZFN0cmluZyk7XG4gIGlmIChleGlzdHMpIHtcbiAgICByZXR1cm4gYXdhaXQgcnAoe3VybDogUzNVdGlscy5nZXRVUkwoYmFzZUJvYXJkU3RyaW5nKSwgZW5jb2Rpbmc6IG51bGx9KTtcbiAgfVxuXG4gIGNvbnN0IHN0b25lU2l6ZSA9IDUwO1xuICBjb25zdCBwcm9maWxlU2l6ZSA9IDc1O1xuICBjb25zdCBwcm9maWxlTWFyZ2luID0gMTA7XG4gIGNvbnN0IFtibGFja1N0b25lLCB3aGl0ZVN0b25lLCBibGFja1VzZXJOYW1lLCB3aGl0ZVVzZXJOYW1lLCBibGFja1Byb2ZpbGUsIHdoaXRlUHJvZmlsZV0gPVxuICAgIGF3YWl0IF9nZW5CYXNlSW1hZ2VDb21wb25lbnRzKGdhbWUsIHN0b25lU2l6ZSwgcHJvZmlsZVNpemUsIDU1IC8qZm9udFNpemUqLywgMTIgLyptYXhOYW1lTGVuZ3RoKi8pO1xuICBjb25zdCBbd2hpdGVVc2VyTmFtZU1ldGEsIGJsYWNrVXNlck5hbWVNZXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBzaGFycCh3aGl0ZVVzZXJOYW1lKS5tZXRhZGF0YSgpLFxuICAgIHNoYXJwKGJsYWNrVXNlck5hbWUpLm1ldGFkYXRhKCksXG4gIF0pO1xuICBjb25zdCBibGFja0xlZnQgPSBNYXRoLnJvdW5kKEdBTUVfTUlOSV9MRUZUX0hBTEZfV0lURFRIIC8gMiAtIChibGFja1VzZXJOYW1lTWV0YS53aWR0aCArIHByb2ZpbGVTaXplICsgcHJvZmlsZU1hcmdpbikgLyAyKTtcbiAgY29uc3Qgd2hpdGVMZWZ0ID0gTWF0aC5yb3VuZChHQU1FX01JTklfTEVGVF9IQUxGX1dJVERUSCAvIDIgLSAod2hpdGVVc2VyTmFtZU1ldGEud2lkdGggKyBwcm9maWxlU2l6ZSArIHByb2ZpbGVNYXJnaW4pIC8gMik7XG5cbiAgY29uc3Qgb3ZlcmxheXMgPSBbXG4gICAge1xuICAgICAgb3B0aW9uOiB7dG9wOiAxMDcsIGxlZnQ6IE1hdGgucm91bmQoR0FNRV9NSU5JX0xFRlRfSEFMRl9XSVREVEggLyAyIC0gc3RvbmVTaXplIC8gMil9LFxuICAgICAgaW1hZ2U6IGJsYWNrU3RvbmUsXG4gICAgfSxcbiAgICB7XG4gICAgICBvcHRpb246IHt0b3A6IDE2NSwgbGVmdDogYmxhY2tMZWZ0fSxcbiAgICAgIGltYWdlOiBibGFja1Byb2ZpbGUsXG4gICAgfSxcbiAgICB7XG4gICAgICBvcHRpb246IHt0b3A6IDE3NSwgbGVmdDogYmxhY2tMZWZ0ICsgcHJvZmlsZVNpemUgKyBwcm9maWxlTWFyZ2lufSxcbiAgICAgIGltYWdlOiBibGFja1VzZXJOYW1lLFxuICAgIH0sXG4gICAge1xuICAgICAgb3B0aW9uOiB7dG9wOiAyODcsIGxlZnQ6IE1hdGgucm91bmQoR0FNRV9NSU5JX0xFRlRfSEFMRl9XSVREVEggLyAyIC0gc3RvbmVTaXplIC8gMil9LFxuICAgICAgaW1hZ2U6IHdoaXRlU3RvbmUsXG4gICAgfSxcbiAgICB7XG4gICAgICBvcHRpb246IHt0b3A6IDM0NSwgbGVmdDogd2hpdGVMZWZ0fSxcbiAgICAgIGltYWdlOiB3aGl0ZVByb2ZpbGUsXG4gICAgfSxcbiAgICB7XG4gICAgICBvcHRpb246IHt0b3A6IDM1NSwgbGVmdDogd2hpdGVMZWZ0ICsgcHJvZmlsZVNpemUgKyBwcm9maWxlTWFyZ2lufSxcbiAgICAgIGltYWdlOiB3aGl0ZVVzZXJOYW1lLFxuICAgIH0sXG4gIF07XG4gIGNvbnN0IGVtcHR5SW1hZ2VCdWZmZXIgPSBhd2FpdCBJbWFnZVV0aWxzLmdlbkNyZWF0ZUVtcHR5SW1hZ2VCdWZmZXIoR0FNRV9NSU5JX1dJRFRILCBHQU1FX01JTklfSEVJR0hUKTtcbiAgY29uc3QgYmFzZUJ1ZmZlciA9IGF3YWl0IEltYWdlVXRpbHMuZ2VuQXBwbHlPdmVybGF5cyhlbXB0eUltYWdlQnVmZmVyLCBvdmVybGF5cyk7XG4gIFMzVXRpbHMuZ2VuVXBsb2FkSW1hZ2UoYmFzZUJ1ZmZlciwgYmFzZUJvYXJkU3RyaW5nKTtcbiAgR2FtZUNhY2hlLnB1dChiYXNlQm9hcmRTdHJpbmcsIGJhc2VCdWZmZXIpO1xuICByZXR1cm4gYmFzZUJ1ZmZlcjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dlbkdhbWVCYXNlSW1hZ2VCdWZmZXIoZ2FtZTogR29HYW1lKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgY29uc3QgYmFzZUJvYXJkU3RyaW5nID0gYGdhbWUtJHtnYW1lLmdldElEKCl9LTNiYXNlYDtcblxuICBjb25zdCBidWZmZXIgPSBHYW1lQ2FjaGUuZ2V0KGJhc2VCb2FyZFN0cmluZyk7XG4gIGlmIChidWZmZXIpIHtcbiAgICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgY29uc3QgZXhpc3RzID0gYXdhaXQgUzNVdGlscy5nZW5FeGlzdHMoYmFzZUJvYXJkU3RyaW5nKTtcbiAgaWYgKGV4aXN0cykge1xuICAgIHJldHVybiBhd2FpdCBycCh7dXJsOiBTM1V0aWxzLmdldFVSTChiYXNlQm9hcmRTdHJpbmcpLCBlbmNvZGluZzogbnVsbH0pO1xuICB9XG5cbiAgY29uc3QgW2JsYWNrU3RvbmUsIHdoaXRlU3RvbmUsIGJsYWNrVXNlck5hbWUsIHdoaXRlVXNlck5hbWUsIGJsYWNrUHJvZmlsZSwgd2hpdGVQcm9maWxlXSA9XG4gICAgYXdhaXQgX2dlbkJhc2VJbWFnZUNvbXBvbmVudHMoZ2FtZSwgNDUgLypzdG9uZVNpemUqLyAsIDc1IC8qcHJvZmlsZVNpemUqLywgNjAgLypmb250U2l6ZSovLCAxMSAvKm1heE5hbWVMZW5ndGgqLyk7XG4gIGNvbnN0IG92ZXJsYXlzID0gW1xuICAgIHtcbiAgICAgIG9wdGlvbjoge3RvcDogMjgsIGxlZnQ6IDE1fSxcbiAgICAgIGltYWdlOiBibGFja1N0b25lLFxuICAgIH0sXG4gICAge1xuICAgICAgb3B0aW9uOiB7dG9wOiAyOCwgbGVmdDogNTE1fSxcbiAgICAgIGltYWdlOiB3aGl0ZVN0b25lLFxuICAgIH0sXG4gICAge1xuICAgICAgb3B0aW9uOiB7dG9wOiAyNSwgbGVmdDogMTUwfSxcbiAgICAgIGltYWdlOiBibGFja1VzZXJOYW1lLFxuICAgIH0sXG4gICAge1xuICAgICAgb3B0aW9uOiB7dG9wOiAyNSwgbGVmdDogNjUwfSxcbiAgICAgIGltYWdlOiB3aGl0ZVVzZXJOYW1lLFxuICAgIH0sXG4gICAge1xuICAgICAgb3B0aW9uOiB7dG9wOiAxNCwgbGVmdDogNjl9LFxuICAgICAgaW1hZ2U6IGJsYWNrUHJvZmlsZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG9wdGlvbjoge3RvcDogMTQsIGxlZnQ6IDU2OX0sXG4gICAgICBpbWFnZTogd2hpdGVQcm9maWxlLFxuICAgIH0sXG4gIF07XG4gIGNvbnN0IGVtcHR5SW1hZ2VCdWZmZXIgPSBhd2FpdCBJbWFnZVV0aWxzLmdlbkNyZWF0ZUVtcHR5SW1hZ2VCdWZmZXIoQk9BUkRfV0lEVEgsIEJPQVJEX0hFSUdIVCk7XG4gIGNvbnN0IGJhc2VCdWZmZXIgPSBhd2FpdCBJbWFnZVV0aWxzLmdlbkFwcGx5T3ZlcmxheXMoZW1wdHlJbWFnZUJ1ZmZlciwgb3ZlcmxheXMpO1xuXG4gIFMzVXRpbHMuZ2VuVXBsb2FkSW1hZ2UoYmFzZUJ1ZmZlciwgYmFzZUJvYXJkU3RyaW5nKTtcbiAgR2FtZUNhY2hlLnB1dChiYXNlQm9hcmRTdHJpbmcsIGJhc2VCdWZmZXIpO1xuICByZXR1cm4gYmFzZUJ1ZmZlcjtcbn1cblxuY29uc3QgR2FtZUltYWdlUmVuZGVyZXJVdGlscyA9IHtcbiAgLy8gQm9hcmQgdXJsIGlzOiAnZ2FtZS08Z2FtZUlEPi08Ym9hcmRTdHJpbmc+J1xuICBhc3luYyBnZW5Cb2FyZEltYWdlVVJMKGdhbWU6IEdvR2FtZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgYm9hcmRTdHJpbmcgPSBgZ2FtZS0ke2dhbWUuZ2V0SUQoKX0tJHtnYW1lLmdldEN1cnJlbnRCb2FyZFN0cmluZygpfWA7XG4gICAgY29uc3QgZXhpc3RzID0gYXdhaXQgUzNVdGlscy5nZW5FeGlzdHMoYm9hcmRTdHJpbmcpO1xuICAgIGlmIChleGlzdHMpIHtcbiAgICAgIGluZm8oJ1RoZSBib2FyZCBpbWFnZSBmb3IgdGhlIGJvYXJkIGFscmVhZHkgZXhpc3RzJyk7XG4gICAgICByZXR1cm4gUzNVdGlscy5nZXRVUkwoYm9hcmRTdHJpbmcpO1xuICAgIH1cblxuICAgIGluZm8oJ1RoZSBib2FyZCBpbWFnZSBmb3IgdGhlIGJvYXJkIGRvZXMgbm90IGV4aXN0LCBjcmVhdGluZyBpdCBhbmQgdXBsb2FkaW5nJyk7XG4gICAgLy8gY3JlYXRlIGJhc2UgYnVmZmVyIGFuZCBib2FyZCBidWZmZXIgc2VwYXJhdGVseVxuICAgIGNvbnN0IFtiYXNlQnVmZmVyLCBib2FyZEJ1ZmZlcl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBfZ2VuR2FtZUJhc2VJbWFnZUJ1ZmZlcihnYW1lKSxcbiAgICAgIEJvYXJkSW1hZ2VSZW5kZXJlclV0aWxzLmdlbkJvYXJkQnVmZmVyKGdhbWUpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgW2JsYWNrQ2FwdHVyZXMsIHdoaXRlQ2FwdHVyZV0gPSBnYW1lLmdldENhcHR1cmVzKCk7XG4gICAgY29uc3QgYmxhY2tDYXB0dXJlVGV4dCA9IF9nZXRUZXh0QnVmZmVyKCdjYXB0dXJlczogJyArIGJsYWNrQ2FwdHVyZXMsIDQwKTtcbiAgICBjb25zdCB3aGl0ZUNhcHR1cmVUZXh0ID0gX2dldFRleHRCdWZmZXIoJ2NhcHR1cmVzOiAnICsgd2hpdGVDYXB0dXJlLCA0MCk7XG4gICAgY29uc3Qgb3ZlcmxheXMgPSBbXG4gICAgICB7XG4gICAgICAgIG9wdGlvbjoge3RvcDogQk9BUkRfVE9QX1BBRERJTkcsIGxlZnQ6IDB9LFxuICAgICAgICBpbWFnZTogYm9hcmRCdWZmZXIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBvcHRpb246IHt0b3A6IDEwMCwgbGVmdDogMTV9LFxuICAgICAgICBpbWFnZTogYmxhY2tDYXB0dXJlVGV4dCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG9wdGlvbjoge3RvcDogMTAwLCBsZWZ0OiA1MTV9LFxuICAgICAgICBpbWFnZTogd2hpdGVDYXB0dXJlVGV4dCxcbiAgICAgIH0sXG4gICAgXTtcbiAgICBjb25zdCBpbWFnZUJ1ZmZlciA9IGF3YWl0IEltYWdlVXRpbHMuZ2VuQXBwbHlPdmVybGF5cyhiYXNlQnVmZmVyLCBvdmVybGF5cyk7XG5cbiAgICBjb25zdCB1cmwgPSBhd2FpdCBTM1V0aWxzLmdlblVwbG9hZEltYWdlKGltYWdlQnVmZmVyLCBib2FyZFN0cmluZyk7XG4gICAgaW5mbygnU3VjY2Vzc2Z1bGx5IHVwbG9hZGVkIG5ldyBib2FyZCBpbWFnZSB0byBTMycpO1xuICAgIHJldHVybiB1cmw7XG4gIH0sXG5cbiAgLy8gTWluaSBib2FyZCB1cmw6ICdnYW1lLW1pbmktPGdhbWVJRD4tPGJvYXJkU3RyaW5nPidcbiAgYXN5bmMgZ2VuTWluaUJvYXJkSW1hZ2VVUkwoZ2FtZTogR29HYW1lKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBib2FyZFN0cmluZyA9IGBnYW1lLW1pbmktJHtnYW1lLmdldElEKCl9LSR7Z2FtZS5nZXRDdXJyZW50Qm9hcmRTdHJpbmcoKX1gO1xuICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IFMzVXRpbHMuZ2VuRXhpc3RzKGJvYXJkU3RyaW5nKTtcbiAgICBpZiAoZXhpc3RzKSB7XG4gICAgICByZXR1cm4gUzNVdGlscy5nZXRVUkwoYm9hcmRTdHJpbmcpO1xuICAgIH1cbiAgICBjb25zdCBbYmFzZUJ1ZmZlciwgYm9hcmRCdWZmZXJdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgX2dlbkdhbWVNaW5pQmFzZUltYWdlQnVmZmVyKGdhbWUpLFxuICAgICAgQm9hcmRJbWFnZVJlbmRlcmVyVXRpbHMuZ2VuQm9hcmRCdWZmZXIoZ2FtZSwgR0FNRV9NSU5JX0JPQVJEX1NJWkUpLFxuICAgIF0pO1xuXG4gICAgY29uc3Qgb3ZlcmxheXMgPSBbXG4gICAgICB7XG4gICAgICAgIG9wdGlvbjoge3RvcDogR0FNRV9NSU5JX0JPQVJEX1BBRERJTkcsIGxlZnQ6IEdBTUVfTUlOSV9XSURUSCAtIEdBTUVfTUlOSV9CT0FSRF9TSVpFIC0gR0FNRV9NSU5JX0JPQVJEX1BBRERJTkcgLyAyfSxcbiAgICAgICAgaW1hZ2U6IGJvYXJkQnVmZmVyLFxuICAgICAgfSxcbiAgICBdO1xuXG4gICAgY29uc3Qgc2NvcmVUZXh0ID0gZ2FtZS5nZXRTY29yZVRleHQoKTtcbiAgICAvLyBvdmVybGF5IHNjb3JlIGluZm9ybWF0aW9uIChpLmUuIEIrUilcbiAgICBpZiAoc2NvcmVUZXh0KSB7XG4gICAgICBjb25zdCBzY29yZVRleHRCdWZmZXIgPSBfZ2V0VGV4dEJ1ZmZlcihzY29yZVRleHQsIDUwKTtcbiAgICAgIGNvbnN0IHNjb3JlVGV4dE1ldGEgPSBhd2FpdCBzaGFycChzY29yZVRleHRCdWZmZXIpLm1ldGFkYXRhKCk7XG4gICAgICBjb25zdCBzY29yZUxlZnQgPSBNYXRoLnJvdW5kKEdBTUVfTUlOSV9MRUZUX0hBTEZfV0lURFRIIC8gMiAtIChzY29yZVRleHRNZXRhLndpZHRoKSAvIDIpO1xuICAgICAgb3ZlcmxheXMucHVzaCh7XG4gICAgICAgIG9wdGlvbjoge3RvcDogMzUsIGxlZnQ6IHNjb3JlTGVmdH0sXG4gICAgICAgIGltYWdlOiBzY29yZVRleHRCdWZmZXIsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgaW1hZ2VCdWZmZXIgPSBhd2FpdCBJbWFnZVV0aWxzLmdlbkFwcGx5T3ZlcmxheXMoYmFzZUJ1ZmZlciwgb3ZlcmxheXMpO1xuICAgIGNvbnN0IHVybCA9IGF3YWl0IFMzVXRpbHMuZ2VuVXBsb2FkSW1hZ2UoaW1hZ2VCdWZmZXIsIGJvYXJkU3RyaW5nKTtcbiAgICByZXR1cm4gdXJsO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lSW1hZ2VSZW5kZXJlclV0aWxzO1xuIl19
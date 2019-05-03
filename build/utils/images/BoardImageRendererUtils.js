

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

// LWIP promise implementation

var _genLWipImage = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(source, type) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _bluebird2.default(function (resolve, reject) {
              _lwip2.default.open(source, type, function (err, image) {
                if (err) {
                  return reject(err);
                }
                return resolve(image);
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function _genLWipImage(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

var _genCloneImage = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(image) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _bluebird2.default(function (resolve, reject) {
              image.clone(function (err, clone) {
                if (err) {
                  return reject(err);
                }
                return resolve(clone);
              });
            }));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function _genCloneImage(_x3) {
    return ref.apply(this, arguments);
  };
}();

var _genPasteImage = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(base, pasteImage, left, top) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new _bluebird2.default(function (resolve, reject) {
              base.paste(left, top, pasteImage, function (err, image) {
                if (err) {
                  return reject(err);
                }
                return resolve(image);
              });
            }));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function _genPasteImage(_x4, _x5, _x6, _x7) {
    return ref.apply(this, arguments);
  };
}();

// == Main Code ==

var _genLastStoneOverlayCircleBuffer = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(key) {
    var config, xy, svg;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            config = LAST_STONE_OVER_CIRCLE_SIZE_CONFIG[key];
            // need extra pixels for width

            xy = config.radius + config.width - 1;
            svg = new Buffer('<svg xmlns="http://www.w3.org/2000/svg" version="1.1">\n      <circle cx="' + xy + '" cy="' + xy + '" r="' + config.radius + '" stroke="' + config.color + '" stroke-width="' + config.width + '" fill="none" />\n    </svg>');
            //sharp(svg).png().toFile('/tmp/testCircle.png');

            _context4.next = 5;
            return (0, _sharp2.default)(svg).toBuffer();

          case 5:
            return _context4.abrupt('return', _context4.sent);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return function _genLastStoneOverlayCircleBuffer(_x8) {
    return ref.apply(this, arguments);
  };
}();

var _genImageCache = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(key) {
    var buffer, fileName;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!_imageCache[key]) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt('return', _imageCache[key]);

          case 2:
            if (!key.includes(CIRCLE_PREFIX)) {
              _context5.next = 11;
              break;
            }

            _context5.next = 5;
            return _genLastStoneOverlayCircleBuffer(key);

          case 5:
            buffer = _context5.sent;
            _context5.next = 8;
            return _genLWipImage(buffer, 'png');

          case 8:
            _imageCache[key] = _context5.sent;
            _context5.next = 15;
            break;

          case 11:
            fileName = _ImageUtils2.default.getPath(key);
            _context5.next = 14;
            return _genLWipImage(fileName, fileName.split('.').pop());

          case 14:
            _imageCache[key] = _context5.sent;

          case 15:
            return _context5.abrupt('return', _imageCache[key]);

          case 16:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return function _genImageCache(_x9) {
    return ref.apply(this, arguments);
  };
}();

var _genPasteStone = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(stone, size, boardImage) {
    var stoneImage, _getStoneOverlayOptio2, left, top;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _genImageCache(stone.color + '-' + size);

          case 2:
            stoneImage = _context6.sent;
            _getStoneOverlayOptio2 = _getStoneOverlayOptions(stone.x, stone.y, size);
            left = _getStoneOverlayOptio2.left;
            top = _getStoneOverlayOptio2.top;
            _context6.next = 8;
            return _genPasteImage(boardImage, stoneImage, left, top);

          case 8:
            return _context6.abrupt('return', _context6.sent);

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return function _genPasteStone(_x10, _x11, _x12) {
    return ref.apply(this, arguments);
  };
}();

var _lwip = require('lwip');

var _lwip2 = _interopRequireDefault(_lwip);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _WeiqiSerializer = require('../WeiqiSerializer');

var _ImageUtils = require('./ImageUtils');

var _ImageUtils2 = _interopRequireDefault(_ImageUtils);

var _Game = require('../../class/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// original 53.5, 42.5, 36.5
var STONE_DISTANCE_19 = 49;
var BOARD_TOP_LEFT_X_19 = 39;
var BOARD_TOP_LEFT_Y_19 = 33.5;

// original 53.5, 42.5, 44.5
var STONE_DISTANCE_13 = 69.5;
var BOARD_TOP_LEFT_X_13 = 55.25;
var BOARD_TOP_LEFT_Y_13 = 57.9;

// original 53.5, 42.5, 39.5
var STONE_DISTANCE_9 = 96.5;
var BOARD_TOP_LEFT_X_9 = 76.5;
var BOARD_TOP_LEFT_Y_9 = 71;

var BOARD_SIZE = [9, 13, 19];
var STONE_SIZE = { '9': 83, '13': 60, '19': 42 };
var CIRCLE_PREFIX = 'circle';
var CIRCLE_WIDTH = { '9': 3, '13': 3, '19': 2 };
var LAST_STONE_OVER_CIRCLE_SIZE_CONFIG = {};
['black', 'white'].forEach(function (color) {
  BOARD_SIZE.forEach(function (size) {
    var key = _getStoneOverlayCircleKey(size, color);
    LAST_STONE_OVER_CIRCLE_SIZE_CONFIG[key] = {
      radius: Math.floor(STONE_SIZE[size.toString()] / 4), // circle is half the stone size
      color: color === 'black' ? 'white' : 'black',
      width: CIRCLE_WIDTH[size.toString()]
    };
  });
});
/*
 * Convert stone coordinate to pixel coordinate on the board image.
 */
function _getStoneOverlayOptions(x, y, size) {
  //size = parseInt(size)// temp fix for size being string
  // convert 18/12/11 to 0 (0 indexed) 0 -> 18/12/11
  var xMultiplier = parseInt(x, 10 /* radix */);
  var yMultiplier = size - 1 - parseInt(y, 10 /* radix */);

  switch (size) {
    case 19:
      return {
        left: Math.round(BOARD_TOP_LEFT_X_19 + xMultiplier * STONE_DISTANCE_19),
        top: Math.round(BOARD_TOP_LEFT_Y_19 + yMultiplier * STONE_DISTANCE_19)
      };
    case 13:
      return {
        left: Math.round(BOARD_TOP_LEFT_X_13 + xMultiplier * STONE_DISTANCE_13),
        top: Math.round(BOARD_TOP_LEFT_Y_13 + yMultiplier * STONE_DISTANCE_13)
      };
    case 9:
      return {
        left: Math.round(BOARD_TOP_LEFT_X_9 + xMultiplier * STONE_DISTANCE_9),
        top: Math.round(BOARD_TOP_LEFT_Y_9 + yMultiplier * STONE_DISTANCE_9)
      };
    default:
      throw new Error('Invalid board size input ' + size);
  }
}

function _getStoneCircleOverlayOption(x, y, size) {
  // offset based on original stone overlay position

  var _getStoneOverlayOptio = _getStoneOverlayOptions(x, y, size);

  var left = _getStoneOverlayOptio.left;
  var top = _getStoneOverlayOptio.top;
  // since circle is half the size, offset by a 1/4 of stone size

  var offset = Math.round(STONE_SIZE[size] / 4) - CIRCLE_WIDTH[size.toString()] + 1;
  var a = { left: left + offset, top: top + offset };
  return a;
}function _getStoneOverlayCircleKey(size, color) {
  return (CIRCLE_PREFIX + '-' + color + '-' + size).toLowerCase();
}

var _imageCache = {};


var BoardImageRendererUtils = {
  // return a 1000 x 1000 board

  genBoardBuffer: function genBoardBuffer(game, resizeTo) {
    var _this = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7() {
      var lastStone, board;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              lastStone = game.getLastNonPassMovePlayed();
              _context7.next = 3;
              return _this.genBoardBufferFromScratchUsingLwip(game.getWeiqiBoardSize(), game.getStones(), lastStone);

            case 3:
              board = _context7.sent;

              if (!resizeTo) {
                _context7.next = 8;
                break;
              }

              _context7.next = 7;
              return (0, _sharp2.default)(board).resize(resizeTo, resizeTo).toBuffer();

            case 7:
              return _context7.abrupt('return', _context7.sent);

            case 8:
              return _context7.abrupt('return', board);

            case 9:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }))();
  },


  // NOTE: multiple composition with Sharp is extremely slow because of constant buffer conversion.
  genBoardBufferFromScrapUsingSharp: function genBoardBufferFromScrapUsingSharp(size, stones) {
    var _this2 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8() {
      var board, overlays;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _sharp2.default)(_ImageUtils2.default.getPath(size.toString())).toBuffer();

            case 2:
              board = _context8.sent;
              overlays = stones.map(function (stone) {
                return {
                  option: _getStoneOverlayOptions(stone.x, stone.y, size),
                  image: _ImageUtils2.default.getPath(stone.color + '-' + size)
                };
              });
              _context8.next = 6;
              return _ImageUtils2.default.genApplyOverlays(board, overlays);

            case 6:
              return _context8.abrupt('return', _context8.sent);

            case 7:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this2);
    }))();
  },
  genBoardBufferFromScratchUsingLwip: function genBoardBufferFromScratchUsingLwip(size, stones, lastStone) {
    var _this3 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9() {
      var boardImage, i, lastStoneCircleKey, lastStoneCircleImage, _getStoneCircleOverla, _left, _top;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _genImageCache(size.toString());

            case 2:
              boardImage = _context9.sent;
              _context9.next = 5;
              return _genCloneImage(boardImage);

            case 5:
              boardImage = _context9.sent;
              i = 0;

            case 7:
              if (!(i < stones.length)) {
                _context9.next = 14;
                break;
              }

              _context9.next = 10;
              return _genPasteStone(stones[i], size, boardImage);

            case 10:
              boardImage = _context9.sent;

            case 11:
              i++;
              _context9.next = 7;
              break;

            case 14:
              if (!lastStone) {
                _context9.next = 25;
                break;
              }

              lastStoneCircleKey = _getStoneOverlayCircleKey(size, lastStone.color);
              _context9.next = 18;
              return _genImageCache(lastStoneCircleKey);

            case 18:
              lastStoneCircleImage = _context9.sent;
              _getStoneCircleOverla = _getStoneCircleOverlayOption(lastStone.x, lastStone.y, size);
              _left = _getStoneCircleOverla.left;
              _top = _getStoneCircleOverla.top;
              _context9.next = 24;
              return _genPasteImage(boardImage, lastStoneCircleImage, _left, _top);

            case 24:
              boardImage = _context9.sent;

            case 25:
              return _context9.abrupt('return', new _bluebird2.default(function (resolve, reject) {
                boardImage.toBuffer('jpg', function (err, buffer) {
                  if (err) {
                    return reject(err);
                  }
                  return resolve(buffer);
                });
              }));

            case 26:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this3);
    }))();
  }
};

module.exports = BoardImageRendererUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9pbWFnZXMvQm9hcmRJbWFnZVJlbmRlcmVyVXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7OzZEQWlGQSxpQkFBNkIsTUFBN0IsRUFBc0QsSUFBdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZDQUNTLHVCQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsNkJBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsSUFBbEIsRUFBd0IsVUFBUyxHQUFULEVBQWMsS0FBZCxFQUFxQjtBQUMzQyxvQkFBRyxHQUFILEVBQVE7QUFDTix5QkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUNEO0FBQ0QsdUJBQU8sUUFBUSxLQUFSLENBQVA7QUFDRCxlQUxEO0FBTUQsYUFQTSxDQURUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7a0JBQWUsYTs7Ozs7OzZEQVdmLGtCQUE4QixLQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ1MsdUJBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxvQkFBTSxLQUFOLENBQVksVUFBUyxHQUFULEVBQWMsS0FBZCxFQUFvQjtBQUM5QixvQkFBRyxHQUFILEVBQVE7QUFDTix5QkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUNEO0FBQ0QsdUJBQU8sUUFBUSxLQUFSLENBQVA7QUFDRCxlQUxEO0FBTUQsYUFQTSxDQURUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7a0JBQWUsYzs7Ozs7OzZEQVdmLGtCQUE4QixJQUE5QixFQUErQyxVQUEvQyxFQUFzRSxJQUF0RSxFQUFvRixHQUFwRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ1MsdUJBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxtQkFBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixHQUFqQixFQUFzQixVQUF0QixFQUFrQyxV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O0FBQ0Q7QUFDRCx5QkFBTyxRQUFRLE1BQVIsQ0FBUDtBQUNELGlCQUxEO0FBTUQsZUFQTSxDQWxCVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTBCbEI7QUEvRDZCLENBQWhDOztBQWtFQSxPQUFPLE9BQVAsR0FBaUIsdUJBQWpCIiwiZmlsZSI6IkJvYXJkSW1hZ2VSZW5kZXJlclV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbHdpcCBmcm9tICdsd2lwJztcbmltcG9ydCBzaGFycCBmcm9tICdzaGFycCc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQge1NUT05FX0NPTE9SfSBmcm9tICcuLi9XZWlxaVNlcmlhbGl6ZXInO1xuaW1wb3J0IEltYWdlVXRpbHMgZnJvbSAnLi9JbWFnZVV0aWxzJztcbmltcG9ydCBHb0dhbWUgZnJvbSAnLi4vLi4vY2xhc3MvR2FtZSc7XG5cbnR5cGUgTHdpcEltYWdlID0gT2JqZWN0O1xuXG4vLyBvcmlnaW5hbCA1My41LCA0Mi41LCAzNi41XG5jb25zdCBTVE9ORV9ESVNUQU5DRV8xOSA9IDQ5O1xuY29uc3QgQk9BUkRfVE9QX0xFRlRfWF8xOSA9IDM5O1xuY29uc3QgQk9BUkRfVE9QX0xFRlRfWV8xOSA9IDMzLjU7XG5cbi8vIG9yaWdpbmFsIDUzLjUsIDQyLjUsIDQ0LjVcbmNvbnN0IFNUT05FX0RJU1RBTkNFXzEzID0gNjkuNVxuY29uc3QgQk9BUkRfVE9QX0xFRlRfWF8xMyA9IDU1LjI1O1xuY29uc3QgQk9BUkRfVE9QX0xFRlRfWV8xMyA9IDU3Ljk7XG5cbi8vIG9yaWdpbmFsIDUzLjUsIDQyLjUsIDM5LjVcbmNvbnN0IFNUT05FX0RJU1RBTkNFXzkgPSA5Ni41O1xuY29uc3QgQk9BUkRfVE9QX0xFRlRfWF85ID0gNzYuNTtcbmNvbnN0IEJPQVJEX1RPUF9MRUZUX1lfOSA9IDcxO1xuXG5jb25zdCBCT0FSRF9TSVpFID0gWzksIDEzLCAxOV07XG5jb25zdCBTVE9ORV9TSVpFID0geyc5JzogODMsICcxMyc6IDYwLCAnMTknOiA0Mn07XG5jb25zdCBDSVJDTEVfUFJFRklYID0gJ2NpcmNsZSc7XG5jb25zdCBDSVJDTEVfV0lEVEggPSB7JzknOiAzLCAnMTMnOiAzLCAnMTknOiAyfTtcbmNvbnN0IExBU1RfU1RPTkVfT1ZFUl9DSVJDTEVfU0laRV9DT05GSUcgPSB7fTtcblsnYmxhY2snLCAnd2hpdGUnXS5mb3JFYWNoKChjb2xvcjogU3RvbmVDb2xvcikgPT4ge1xuICBCT0FSRF9TSVpFLmZvckVhY2goKHNpemU6IEJvYXJkU2l6ZSkgPT4ge1xuICAgIGNvbnN0IGtleSA9IF9nZXRTdG9uZU92ZXJsYXlDaXJjbGVLZXkoc2l6ZSwgY29sb3IpO1xuICAgIExBU1RfU1RPTkVfT1ZFUl9DSVJDTEVfU0laRV9DT05GSUdba2V5XSA9IHtcbiAgICAgIHJhZGl1czogTWF0aC5mbG9vcihTVE9ORV9TSVpFW3NpemUudG9TdHJpbmcoKV0gLyA0KSwgLy8gY2lyY2xlIGlzIGhhbGYgdGhlIHN0b25lIHNpemVcbiAgICAgIGNvbG9yOiBjb2xvciA9PT0gJ2JsYWNrJyA/ICd3aGl0ZScgOiAnYmxhY2snLFxuICAgICAgd2lkdGg6IENJUkNMRV9XSURUSFtzaXplLnRvU3RyaW5nKCldLFxuICAgIH07XG4gIH0pXG59KVxuLypcbiAqIENvbnZlcnQgc3RvbmUgY29vcmRpbmF0ZSB0byBwaXhlbCBjb29yZGluYXRlIG9uIHRoZSBib2FyZCBpbWFnZS5cbiAqL1xuZnVuY3Rpb24gX2dldFN0b25lT3ZlcmxheU9wdGlvbnMoeDogbnVtYmVyLCB5OiBudW1iZXIsIHNpemU6IEJvYXJkU2l6ZSk6IHtsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyfSB7XG4gIC8vc2l6ZSA9IHBhcnNlSW50KHNpemUpLy8gdGVtcCBmaXggZm9yIHNpemUgYmVpbmcgc3RyaW5nXG4gIC8vIGNvbnZlcnQgMTgvMTIvMTEgdG8gMCAoMCBpbmRleGVkKSAwIC0+IDE4LzEyLzExXG4gIGNvbnN0IHhNdWx0aXBsaWVyID0gcGFyc2VJbnQoeCwgMTAgLyogcmFkaXggKi8pO1xuICBjb25zdCB5TXVsdGlwbGllciA9IChzaXplIC0gMSkgLSBwYXJzZUludCh5LCAxMCAvKiByYWRpeCAqLyk7XG5cbiAgc3dpdGNoKHNpemUpIHtcbiAgICBjYXNlIDE5OlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZChCT0FSRF9UT1BfTEVGVF9YXzE5ICsgeE11bHRpcGxpZXIgKiBTVE9ORV9ESVNUQU5DRV8xOSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZChCT0FSRF9UT1BfTEVGVF9ZXzE5ICsgeU11bHRpcGxpZXIgKiBTVE9ORV9ESVNUQU5DRV8xOSksXG4gICAgICB9O1xuICAgIGNhc2UgMTM6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKEJPQVJEX1RPUF9MRUZUX1hfMTMgKyB4TXVsdGlwbGllciAqIFNUT05FX0RJU1RBTkNFXzEzKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKEJPQVJEX1RPUF9MRUZUX1lfMTMgKyB5TXVsdGlwbGllciAqIFNUT05FX0RJU1RBTkNFXzEzKSxcbiAgICAgIH07XG4gICAgY2FzZSA5OlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZChCT0FSRF9UT1BfTEVGVF9YXzkgKyB4TXVsdGlwbGllciAqIFNUT05FX0RJU1RBTkNFXzkpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoQk9BUkRfVE9QX0xFRlRfWV85ICsgeU11bHRpcGxpZXIgKiBTVE9ORV9ESVNUQU5DRV85KSxcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBib2FyZCBzaXplIGlucHV0ICR7c2l6ZX1gKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0U3RvbmVDaXJjbGVPdmVybGF5T3B0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCBzaXplOiBCb2FyZFNpemUpOiB7bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcn0ge1xuICAvLyBvZmZzZXQgYmFzZWQgb24gb3JpZ2luYWwgc3RvbmUgb3ZlcmxheSBwb3NpdGlvblxuICBjb25zdCB7bGVmdCwgdG9wfSA9IF9nZXRTdG9uZU92ZXJsYXlPcHRpb25zKHgsIHksIHNpemUpO1xuICAvLyBzaW5jZSBjaXJjbGUgaXMgaGFsZiB0aGUgc2l6ZSwgb2Zmc2V0IGJ5IGEgMS80IG9mIHN0b25lIHNpemVcbiAgY29uc3Qgb2Zmc2V0ID0gTWF0aC5yb3VuZChTVE9ORV9TSVpFW3NpemVdIC8gNCkgLSBDSVJDTEVfV0lEVEhbc2l6ZS50b1N0cmluZygpXSArIDE7XG4gIHZhciBhID0ge2xlZnQ6IGxlZnQgKyBvZmZzZXQsIHRvcDogdG9wICsgb2Zmc2V0fTtcbiAgcmV0dXJuIGE7XG59XG5cbi8vIExXSVAgcHJvbWlzZSBpbXBsZW1lbnRhdGlvblxuYXN5bmMgZnVuY3Rpb24gX2dlbkxXaXBJbWFnZShzb3VyY2U6IHN0cmluZyB8IEJ1ZmZlciwgdHlwZTogc3RyaW5nKTogUHJvbWlzZTxMd2lwSW1hZ2U+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsd2lwLm9wZW4oc291cmNlLCB0eXBlLCBmdW5jdGlvbihlcnIsIGltYWdlKSB7XG4gICAgICBpZihlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmUoaW1hZ2UpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dlbkNsb25lSW1hZ2UoaW1hZ2U6IEx3aXBJbWFnZSk6IFByb21pc2U8THdpcEltYWdlPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaW1hZ2UuY2xvbmUoZnVuY3Rpb24oZXJyLCBjbG9uZSl7XG4gICAgICBpZihlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmUoY2xvbmUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dlblBhc3RlSW1hZ2UoYmFzZTogTHdpcEltYWdlLCBwYXN0ZUltYWdlOiBMd2lwSW1hZ2UsIGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIpOiBQcm9taXNlPEx3aXBJbWFnZT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGJhc2UucGFzdGUobGVmdCwgdG9wLCBwYXN0ZUltYWdlLCBmdW5jdGlvbihlcnIsIGltYWdlKSB7XG4gICAgICBpZihlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmUoaW1hZ2UpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gPT0gTWFpbiBDb2RlID09XG5cbmZ1bmN0aW9uIF9nZXRTdG9uZU92ZXJsYXlDaXJjbGVLZXkoc2l6ZTogQm9hcmRTaXplLCBjb2xvcjogU3RvbmVDb2xvcik6IHN0cmluZyB7XG4gIHJldHVybiBgJHtDSVJDTEVfUFJFRklYfS0ke2NvbG9yfS0ke3NpemV9YC50b0xvd2VyQ2FzZSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfZ2VuTGFzdFN0b25lT3ZlcmxheUNpcmNsZUJ1ZmZlcihrZXk6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gIGNvbnN0IGNvbmZpZyA9IExBU1RfU1RPTkVfT1ZFUl9DSVJDTEVfU0laRV9DT05GSUdba2V5XTtcbiAgLy8gbmVlZCBleHRyYSBwaXhlbHMgZm9yIHdpZHRoXG4gIGNvbnN0IHh5ID0gY29uZmlnLnJhZGl1cyArIGNvbmZpZy53aWR0aCAtIDE7XG4gIGNvbnN0IHN2ZyA9IG5ldyBCdWZmZXIoXG4gICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZlcnNpb249XCIxLjFcIj5cbiAgICAgIDxjaXJjbGUgY3g9XCIke3h5fVwiIGN5PVwiJHt4eX1cIiByPVwiJHtjb25maWcucmFkaXVzfVwiIHN0cm9rZT1cIiR7Y29uZmlnLmNvbG9yfVwiIHN0cm9rZS13aWR0aD1cIiR7Y29uZmlnLndpZHRofVwiIGZpbGw9XCJub25lXCIgLz5cbiAgICA8L3N2Zz5gLFxuICApO1xuICAvL3NoYXJwKHN2ZykucG5nKCkudG9GaWxlKCcvdG1wL3Rlc3RDaXJjbGUucG5nJyk7XG4gIHJldHVybiBhd2FpdCBzaGFycChzdmcpLnRvQnVmZmVyKCk7XG59XG5cbmNvbnN0IF9pbWFnZUNhY2hlID0ge307XG5hc3luYyBmdW5jdGlvbiBfZ2VuSW1hZ2VDYWNoZShrZXk6IHN0cmluZyk6IFByb21pc2U8THdpcEltYWdlPiB7XG4gIGlmIChfaW1hZ2VDYWNoZVtrZXldKSB7XG4gICAgcmV0dXJuIF9pbWFnZUNhY2hlW2tleV07XG4gIH1cbiAgLy8gY2hlY2sgaWYgdGhpcyBpcyBmb3Igc3RvbmUgY2lyY2xlXG4gIGlmIChrZXkuaW5jbHVkZXMoQ0lSQ0xFX1BSRUZJWCkpIHtcbiAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBfZ2VuTGFzdFN0b25lT3ZlcmxheUNpcmNsZUJ1ZmZlcihrZXkpO1xuICAgIF9pbWFnZUNhY2hlW2tleV0gPSBhd2FpdCBfZ2VuTFdpcEltYWdlKGJ1ZmZlciwgJ3BuZycpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGZpbGVOYW1lID0gSW1hZ2VVdGlscy5nZXRQYXRoKGtleSk7XG4gICAgX2ltYWdlQ2FjaGVba2V5XSA9IGF3YWl0IF9nZW5MV2lwSW1hZ2UoZmlsZU5hbWUsIGZpbGVOYW1lLnNwbGl0KCcuJykucG9wKCkpO1xuICB9XG4gIHJldHVybiBfaW1hZ2VDYWNoZVtrZXldO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfZ2VuUGFzdGVTdG9uZShzdG9uZTogU3RvbmUsIHNpemU6IEJvYXJkU2l6ZSwgYm9hcmRJbWFnZTogTHdpcEltYWdlKTogUHJvbWlzZTxMd2lwSW1hZ2U+IHtcbiAgY29uc3Qgc3RvbmVJbWFnZSA9IGF3YWl0IF9nZW5JbWFnZUNhY2hlKGAke3N0b25lLmNvbG9yfS0ke3NpemV9YCk7XG4gIGNvbnN0IHtsZWZ0LCB0b3B9ID0gX2dldFN0b25lT3ZlcmxheU9wdGlvbnMoc3RvbmUueCwgc3RvbmUueSwgc2l6ZSk7XG4gIHJldHVybiBhd2FpdCBfZ2VuUGFzdGVJbWFnZShib2FyZEltYWdlLCBzdG9uZUltYWdlLCBsZWZ0LCB0b3ApO1xufVxuXG5jb25zdCBCb2FyZEltYWdlUmVuZGVyZXJVdGlscyA9IHtcbiAgLy8gcmV0dXJuIGEgMTAwMCB4IDEwMDAgYm9hcmRcbiAgYXN5bmMgZ2VuQm9hcmRCdWZmZXIoXG4gICAgZ2FtZTogR29HYW1lLFxuICAgIHJlc2l6ZVRvPzogbnVtYmVyLFxuICApOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICAgIGNvbnN0IGxhc3RTdG9uZSA9IGdhbWUuZ2V0TGFzdE5vblBhc3NNb3ZlUGxheWVkKCk7XG5cbiAgICBjb25zdCBib2FyZCA9IGF3YWl0IHRoaXMuZ2VuQm9hcmRCdWZmZXJGcm9tU2NyYXRjaFVzaW5nTHdpcChcbiAgICAgIGdhbWUuZ2V0V2VpcWlCb2FyZFNpemUoKSxcbiAgICAgIGdhbWUuZ2V0U3RvbmVzKCksXG4gICAgICBsYXN0U3RvbmUsXG4gICAgKTtcblxuICAgIGlmIChyZXNpemVUbykge1xuICAgICAgcmV0dXJuIGF3YWl0IHNoYXJwKGJvYXJkKS5yZXNpemUocmVzaXplVG8sIHJlc2l6ZVRvKS50b0J1ZmZlcigpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH0sXG5cbiAgLy8gTk9URTogbXVsdGlwbGUgY29tcG9zaXRpb24gd2l0aCBTaGFycCBpcyBleHRyZW1lbHkgc2xvdyBiZWNhdXNlIG9mIGNvbnN0YW50IGJ1ZmZlciBjb252ZXJzaW9uLlxuICBhc3luYyBnZW5Cb2FyZEJ1ZmZlckZyb21TY3JhcFVzaW5nU2hhcnAoc2l6ZTogQm9hcmRTaXplLCBzdG9uZXM6IEFycmF5PFN0b25lPik6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgbGV0IGJvYXJkID0gYXdhaXQgc2hhcnAoSW1hZ2VVdGlscy5nZXRQYXRoKHNpemUudG9TdHJpbmcoKSkpLnRvQnVmZmVyKCk7XG5cbiAgICBjb25zdCBvdmVybGF5cyA9IHN0b25lcy5tYXAoKHN0b25lOiBTdG9uZSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb3B0aW9uOiBfZ2V0U3RvbmVPdmVybGF5T3B0aW9ucyhzdG9uZS54LCBzdG9uZS55LCBzaXplKSxcbiAgICAgICAgaW1hZ2U6IEltYWdlVXRpbHMuZ2V0UGF0aChgJHtzdG9uZS5jb2xvcn0tJHtzaXplfWApLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gYXdhaXQgSW1hZ2VVdGlscy5nZW5BcHBseU92ZXJsYXlzKGJvYXJkLCBvdmVybGF5cyk7XG4gIH0sXG5cbiAgYXN5bmMgZ2VuQm9hcmRCdWZmZXJGcm9tU2NyYXRjaFVzaW5nTHdpcChcbiAgICBzaXplOiBCb2FyZFNpemUsXG4gICAgc3RvbmVzOiBBcnJheTxTdG9uZT4sXG4gICAgbGFzdFN0b25lOiA/U3RvbmUsXG4gICk6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgbGV0IGJvYXJkSW1hZ2UgPSBhd2FpdCBfZ2VuSW1hZ2VDYWNoZShzaXplLnRvU3RyaW5nKCkpO1xuXG4gICAgLy8gY2xvbmUgYm9hcmRJbWFnZSBzbyB3ZSBkb24ndCBtZXNzIHVwIHdpdGggb3JpZ2luYWwgY2FjaGUuIE5vdCBkb2luZyBpdCBpbiBjYWNoZSBsZXZlbFxuICAgIC8vIHNpbmNlIHdlIGRvbid0IG5lZWQgdG8gY2xvbmUgZm9yIHN0b25lIGltYWdlc1xuICAgIGJvYXJkSW1hZ2UgPSBhd2FpdCBfZ2VuQ2xvbmVJbWFnZShib2FyZEltYWdlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b25lcy5sZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRJbWFnZSA9IGF3YWl0IF9nZW5QYXN0ZVN0b25lKHN0b25lc1tpXSwgc2l6ZSwgYm9hcmRJbWFnZSk7XG4gICAgfVxuXG4gICAgLy8gb3ZlcmxheSBsYXN0IHN0b25lIGNpcmNsZSB0byBpbmRpY2F0ZSBsYXN0IG1vdmVcbiAgICBpZiAobGFzdFN0b25lKSB7XG4gICAgICBjb25zdCBsYXN0U3RvbmVDaXJjbGVLZXkgPSBfZ2V0U3RvbmVPdmVybGF5Q2lyY2xlS2V5KHNpemUsIGxhc3RTdG9uZS5jb2xvcik7XG4gICAgICBjb25zdCBsYXN0U3RvbmVDaXJjbGVJbWFnZSA9IGF3YWl0IF9nZW5JbWFnZUNhY2hlKGxhc3RTdG9uZUNpcmNsZUtleSk7XG4gICAgICBjb25zdCB7bGVmdCwgdG9wfSA9IF9nZXRTdG9uZUNpcmNsZU92ZXJsYXlPcHRpb24obGFzdFN0b25lLngsIGxhc3RTdG9uZS55LCBzaXplKTtcbiAgICAgIGJvYXJkSW1hZ2UgPSBhd2FpdCBfZ2VuUGFzdGVJbWFnZShib2FyZEltYWdlLCBsYXN0U3RvbmVDaXJjbGVJbWFnZSwgbGVmdCwgdG9wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYm9hcmRJbWFnZS50b0J1ZmZlcignanBnJywgZnVuY3Rpb24oZXJyLCBidWZmZXIpIHtcbiAgICAgICAgaWYoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKGJ1ZmZlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQm9hcmRJbWFnZVJlbmRlcmVyVXRpbHM7XG4iXX0=
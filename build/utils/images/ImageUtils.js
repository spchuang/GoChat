

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_DIR = APP_ROOT + '/images';

var IMAGE_PATH = {
  'black': ROOT_DIR + '/blackStone-shade.png',
  'white': ROOT_DIR + '/whiteStone-shade.png',
  'black-9': ROOT_DIR + '/blackStone-9-min.png',
  'white-9': ROOT_DIR + '/whiteStone-9-min.png',
  'black-13': ROOT_DIR + '/blackStone-13-min.png',
  'white-13': ROOT_DIR + '/whiteStone-13-min.png',
  'black-19': ROOT_DIR + '/blackStone-19-min.png',
  'white-19': ROOT_DIR + '/whiteStone-19-min.png',
  '19': ROOT_DIR + '/19.jpg',
  '13': ROOT_DIR + '/13.jpg',
  '9': ROOT_DIR + '/9.jpg',
  'male-profile': ROOT_DIR + '/man-profile2.png',
  'female-profile': ROOT_DIR + '/woman-profile2.png'
};

var ImageUtils = {
  genCreateEmptyImageBuffer: function genCreateEmptyImageBuffer(width, height) {
    var _this = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
      var channels, rgbaPixel, canvas;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              channels = 4;
              rgbaPixel = 0xffffffff;
              canvas = Buffer.alloc(width * height * channels, rgbaPixel);
              _context.next = 5;
              return (0, _sharp2.default)(canvas, { raw: { width: width, height: height, channels: channels } }).jpeg().toBuffer();

            case 5:
              return _context.abrupt('return', _context.sent);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  genApplyOverlays: function genApplyOverlays(baseBuffer, overlays) {
    var _this2 = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2() {
      var tempBuffer, i, overlay;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              tempBuffer = baseBuffer;
              i = 0;

            case 2:
              if (!(i < overlays.length)) {
                _context2.next = 10;
                break;
              }

              overlay = overlays[i];
              _context2.next = 6;
              return (0, _sharp2.default)(tempBuffer).overlayWith(overlay.image, overlay.option).toBuffer();

            case 6:
              tempBuffer = _context2.sent;

            case 7:
              i++;
              _context2.next = 2;
              break;

            case 10:
              return _context2.abrupt('return', tempBuffer);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },
  getPath: function getPath(key) {
    return IMAGE_PATH[key];
  }
};

module.exports = ImageUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9pbWFnZXMvSW1hZ2VVdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7QUFFQTs7Ozs7O0FBR0EsSUFBTSxXQUFXLFdBQVcsU0FBNUI7O0FBRUEsSUFBTSxhQUFzQztBQUMxQyxXQUFVLFdBQVcsdUJBRHFCO0FBRTFDLFdBQVUsV0FBVyx1QkFGcUI7QUFHMUMsYUFBWSxXQUFXLHVCQUhtQjtBQUkxQyxhQUFZLFdBQVcsdUJBSm1CO0FBSzFDLGNBQWEsV0FBVyx3QkFMa0I7QUFNMUMsY0FBYSxXQUFXLHdCQU5rQjtBQU8xQyxjQUFhLFdBQVcsd0JBUGtCO0FBUTFDLGNBQWEsV0FBVyx3QkFSa0I7QUFTMUMsUUFBTSxXQUFXLFNBVHlCO0FBVTFDLFFBQU0sV0FBVyxTQVZ5QjtBQVcxQyxPQUFLLFdBQVcsUUFYMEI7QUFZMUMsa0JBQWdCLFdBQVcsbUJBWmU7QUFhMUMsb0JBQWtCLFdBQVc7QUFiYSxDQUE1Qzs7QUFnQkEsSUFBTSxhQUFhO0FBQ1gsMkJBRFcscUNBQ2UsS0FEZixFQUM4QixNQUQ5QixFQUMrRDtBQUFBOztBQUFBO0FBQUEsVUFDeEUsUUFEd0UsRUFFeEUsU0FGd0UsRUFHeEUsTUFId0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUN4RSxzQkFEd0UsR0FDN0QsQ0FENkQ7QUFFeEUsdUJBRndFLEdBRTVELFVBRjREO0FBR3hFLG9CQUh3RSxHQUcvRCxPQUFPLEtBQVAsQ0FBYSxRQUFRLE1BQVIsR0FBaUIsUUFBOUIsRUFBd0MsU0FBeEMsQ0FIK0Q7QUFBQTtBQUFBLHFCQUlqRSxxQkFBTSxNQUFOLEVBQWMsRUFBRSxLQUFNLEVBQUUsWUFBRixFQUFTLGNBQVQsRUFBaUIsa0JBQWpCLEVBQVIsRUFBZCxFQUFxRCxJQUFyRCxHQUE0RCxRQUE1RCxFQUppRTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSy9FLEdBTmdCO0FBUVgsa0JBUlcsNEJBUU0sVUFSTixFQVEwQixRQVIxQixFQVFtRTtBQUFBOztBQUFBO0FBQUEsVUFDOUUsVUFEOEUsRUFFekUsQ0FGeUUsRUFHMUUsT0FIMEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUM5RSx3QkFEOEUsR0FDakUsVUFEaUU7QUFFekUsZUFGeUUsR0FFckUsQ0FGcUU7O0FBQUE7QUFBQSxvQkFFbEUsSUFBSSxTQUFTLE1BRnFEO0FBQUE7QUFBQTtBQUFBOztBQUcxRSxxQkFIMEUsR0FHaEUsU0FBUyxDQUFULENBSGdFO0FBQUE7QUFBQSxxQkFJN0QscUJBQU0sVUFBTixFQUFrQixXQUFsQixDQUE4QixRQUFRLEtBQXRDLEVBQTZDLFFBQVEsTUFBckQsRUFBNkQsUUFBN0QsRUFKNkQ7O0FBQUE7QUFJaEYsd0JBSmdGOztBQUFBO0FBRTdDLGlCQUY2QztBQUFBO0FBQUE7O0FBQUE7QUFBQSxnREFNM0UsVUFOMkU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPbkYsR0FmZ0I7QUFpQmpCLFNBakJpQixtQkFpQlQsR0FqQlMsRUFpQlk7QUFDM0IsV0FBTyxXQUFXLEdBQVgsQ0FBUDtBQUNEO0FBbkJnQixDQUFuQjs7QUFzQkEsT0FBTyxPQUFQLEdBQWlCLFVBQWpCIiwiZmlsZSI6IkltYWdlVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBzaGFycCBmcm9tICdzaGFycCc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmNvbnN0IFJPT1RfRElSID0gQVBQX1JPT1QgKyAnL2ltYWdlcyc7XG5cbmNvbnN0IElNQUdFX1BBVEg6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnYmxhY2snIDogUk9PVF9ESVIgKyAnL2JsYWNrU3RvbmUtc2hhZGUucG5nJyxcbiAgJ3doaXRlJyA6IFJPT1RfRElSICsgJy93aGl0ZVN0b25lLXNoYWRlLnBuZycsXG4gICdibGFjay05JyA6IFJPT1RfRElSICsgJy9ibGFja1N0b25lLTktbWluLnBuZycsXG4gICd3aGl0ZS05JyA6IFJPT1RfRElSICsgJy93aGl0ZVN0b25lLTktbWluLnBuZycsXG4gICdibGFjay0xMycgOiBST09UX0RJUiArICcvYmxhY2tTdG9uZS0xMy1taW4ucG5nJyxcbiAgJ3doaXRlLTEzJyA6IFJPT1RfRElSICsgJy93aGl0ZVN0b25lLTEzLW1pbi5wbmcnLFxuICAnYmxhY2stMTknIDogUk9PVF9ESVIgKyAnL2JsYWNrU3RvbmUtMTktbWluLnBuZycsXG4gICd3aGl0ZS0xOScgOiBST09UX0RJUiArICcvd2hpdGVTdG9uZS0xOS1taW4ucG5nJyxcbiAgJzE5JzogUk9PVF9ESVIgKyAnLzE5LmpwZycsXG4gICcxMyc6IFJPT1RfRElSICsgJy8xMy5qcGcnLFxuICAnOSc6IFJPT1RfRElSICsgJy85LmpwZycsXG4gICdtYWxlLXByb2ZpbGUnOiBST09UX0RJUiArICcvbWFuLXByb2ZpbGUyLnBuZycsXG4gICdmZW1hbGUtcHJvZmlsZSc6IFJPT1RfRElSICsgJy93b21hbi1wcm9maWxlMi5wbmcnLFxufTtcblxuY29uc3QgSW1hZ2VVdGlscyA9IHtcbiAgYXN5bmMgZ2VuQ3JlYXRlRW1wdHlJbWFnZUJ1ZmZlcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgY29uc3QgY2hhbm5lbHMgPSA0O1xuICAgIGNvbnN0IHJnYmFQaXhlbCA9IDB4ZmZmZmZmZmY7XG4gICAgY29uc3QgY2FudmFzID0gQnVmZmVyLmFsbG9jKHdpZHRoICogaGVpZ2h0ICogY2hhbm5lbHMsIHJnYmFQaXhlbCk7XG4gICAgcmV0dXJuIGF3YWl0IHNoYXJwKGNhbnZhcywgeyByYXcgOiB7IHdpZHRoLCBoZWlnaHQsIGNoYW5uZWxzIH0gfSkuanBlZygpLnRvQnVmZmVyKCk7XG4gIH0sXG5cbiAgYXN5bmMgZ2VuQXBwbHlPdmVybGF5cyhiYXNlQnVmZmVyOiBCdWZmZXIsIG92ZXJsYXlzOkFycmF5PE9iamVjdD4pOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICAgIGxldCB0ZW1wQnVmZmVyID0gYmFzZUJ1ZmZlcjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG92ZXJsYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBvdmVybGF5ID0gb3ZlcmxheXNbaV07XG4gICAgICB0ZW1wQnVmZmVyID0gYXdhaXQgc2hhcnAodGVtcEJ1ZmZlcikub3ZlcmxheVdpdGgob3ZlcmxheS5pbWFnZSwgb3ZlcmxheS5vcHRpb24pLnRvQnVmZmVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0ZW1wQnVmZmVyO1xuICB9LFxuXG4gIGdldFBhdGgoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBJTUFHRV9QQVRIW2tleV07XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlVXRpbHM7XG4iXX0=
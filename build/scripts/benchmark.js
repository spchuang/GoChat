

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _BoardImageRendererUtils = require('../utils/images/BoardImageRendererUtils');

var _BoardImageRendererUtils2 = _interopRequireDefault(_BoardImageRendererUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 NOTE: with forced garbage collection -> sharp takes in 100 mb of memory.
*/
module.exports = {
  run: function run() {
    var _this = this;

    return (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee() {
      var moves, color, x, y, size, hrstart, buffer, hrend;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              info('start benchmark');
              moves = [];
              color = 'black';

              for (x = 0; x < 19; x++) {
                for (y = 0; y < 19; y++) {
                  moves.push({ x: x, y: y, color: color });
                  color = color === 'black' ? 'white' : 'black';
                }
              }
              size = 19;

              // sharp
              // info("processing with sharp");
              // var hrstart = process.hrtime();
              // const sharp = await BoardImageRendererUtils.genBoardBufferFromScrapUsingSharp(size, moves);
              // var hrend = process.hrtime(hrstart);
              // info("DONE with sharp");
              // console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
              // global.gc();
              // console.log(sharp);

              // lwip

              info('processing with lwip');
              hrstart = process.hrtime();
              _context.next = 9;
              return _BoardImageRendererUtils2.default.genBoardBufferFromScratchUsingLwip(size, moves);

            case 9:
              buffer = _context.sent;
              hrend = process.hrtime(hrstart);

              info('DONE with lwip');
              info('Execution time (hr): ' + hrend[0] + ' ' + hrend[1] / 1000000);
              _context.next = 15;
              return (0, _sharp2.default)(buffer).toFile('/tmp/lwip1.jpg');

            case 15:
              global.gc();

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2JlbmNobWFyay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7QUFLQSxPQUFPLE9BQVAsR0FBaUI7QUFDVCxLQURTLGlCQUNZO0FBQUE7O0FBQUE7QUFBQSxVQUduQixLQUhtQixFQUlyQixLQUpxQixFQUtoQixDQUxnQixFQU1kLENBTmMsRUFXbkIsSUFYbUIsRUF5QnJCLE9BekJxQixFQTBCbkIsTUExQm1CLEVBMkJyQixLQTNCcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFekIsbUJBQUssaUJBQUw7QUFDTSxtQkFIbUIsR0FHWCxFQUhXO0FBSXJCLG1CQUpxQixHQUliLE9BSmE7O0FBS3pCLG1CQUFTLENBQVQsR0FBYSxDQUFiLEVBQWdCLElBQUksRUFBcEIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDM0IscUJBQVMsQ0FBVCxHQUFhLENBQWIsRUFBZ0IsSUFBSSxFQUFwQixFQUF3QixHQUF4QixFQUE2QjtBQUMzQix3QkFBTSxJQUFOLENBQVcsRUFBQyxJQUFELEVBQUksSUFBSixFQUFPLFlBQVAsRUFBWDtBQUNBLDBCQUFRLFVBQVUsT0FBVixHQUFvQixPQUFwQixHQUE4QixPQUF0QztBQUNEO0FBQ0Y7QUFDSyxrQkFYbUIsR0FXWixFQVhZOzs7Ozs7Ozs7Ozs7OztBQXdCekIsbUJBQUssc0JBQUw7QUFDSSxxQkF6QnFCLEdBeUJYLFFBQVEsTUFBUixFQXpCVztBQUFBO0FBQUEscUJBMEJKLGtDQUF3QixrQ0FBeEIsQ0FBMkQsSUFBM0QsRUFBaUUsS0FBakUsQ0ExQkk7O0FBQUE7QUEwQm5CLG9CQTFCbUI7QUEyQnJCLG1CQTNCcUIsR0EyQmIsUUFBUSxNQUFSLENBQWUsT0FBZixDQTNCYTs7QUE0QnpCLG1CQUFLLGdCQUFMO0FBQ0EsNkNBQTZCLE1BQU0sQ0FBTixDQUE3QixTQUF5QyxNQUFNLENBQU4sSUFBUyxPQUFsRDtBQTdCeUI7QUFBQSxxQkE4Qm5CLHFCQUFNLE1BQU4sRUFBYyxNQUFkLENBQXFCLGdCQUFyQixDQTlCbUI7O0FBQUE7QUErQnpCLHFCQUFPLEVBQVA7O0FBL0J5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdDMUI7QUFqQ2MsQ0FBakIiLCJmaWxlIjoiYmVuY2htYXJrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgc2hhcnAgZnJvbSAnc2hhcnAnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEJvYXJkSW1hZ2VSZW5kZXJlclV0aWxzIGZyb20gJy4uL3V0aWxzL2ltYWdlcy9Cb2FyZEltYWdlUmVuZGVyZXJVdGlscyc7XG5cbi8qXG4gTk9URTogd2l0aCBmb3JjZWQgZ2FyYmFnZSBjb2xsZWN0aW9uIC0+IHNoYXJwIHRha2VzIGluIDEwMCBtYiBvZiBtZW1vcnkuXG4qL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzeW5jIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgIGluZm8oJ3N0YXJ0IGJlbmNobWFyaycpO1xuICAgIGNvbnN0IG1vdmVzID0gW107XG4gICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDE5OyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTk7IHkrKykge1xuICAgICAgICBtb3Zlcy5wdXNoKHt4LCB5LCBjb2xvcn0pO1xuICAgICAgICBjb2xvciA9IGNvbG9yID09PSAnYmxhY2snID8gJ3doaXRlJyA6ICdibGFjayc7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHNpemUgPSAxOTtcblxuICAgIC8vIHNoYXJwXG4gICAgLy8gaW5mbyhcInByb2Nlc3Npbmcgd2l0aCBzaGFycFwiKTtcbiAgICAvLyB2YXIgaHJzdGFydCA9IHByb2Nlc3MuaHJ0aW1lKCk7XG4gICAgLy8gY29uc3Qgc2hhcnAgPSBhd2FpdCBCb2FyZEltYWdlUmVuZGVyZXJVdGlscy5nZW5Cb2FyZEJ1ZmZlckZyb21TY3JhcFVzaW5nU2hhcnAoc2l6ZSwgbW92ZXMpO1xuICAgIC8vIHZhciBocmVuZCA9IHByb2Nlc3MuaHJ0aW1lKGhyc3RhcnQpO1xuICAgIC8vIGluZm8oXCJET05FIHdpdGggc2hhcnBcIik7XG4gICAgLy8gY29uc29sZS5pbmZvKFwiRXhlY3V0aW9uIHRpbWUgKGhyKTogJWRzICVkbXNcIiwgaHJlbmRbMF0sIGhyZW5kWzFdLzEwMDAwMDApO1xuICAgIC8vIGdsb2JhbC5nYygpO1xuICAgIC8vIGNvbnNvbGUubG9nKHNoYXJwKTtcblxuICAgIC8vIGx3aXBcbiAgICBpbmZvKCdwcm9jZXNzaW5nIHdpdGggbHdpcCcpO1xuICAgIHZhciBocnN0YXJ0ID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBCb2FyZEltYWdlUmVuZGVyZXJVdGlscy5nZW5Cb2FyZEJ1ZmZlckZyb21TY3JhdGNoVXNpbmdMd2lwKHNpemUsIG1vdmVzKTtcbiAgICB2YXIgaHJlbmQgPSBwcm9jZXNzLmhydGltZShocnN0YXJ0KTtcbiAgICBpbmZvKCdET05FIHdpdGggbHdpcCcpO1xuICAgIGluZm8oYEV4ZWN1dGlvbiB0aW1lIChocik6ICR7aHJlbmRbMF19ICR7aHJlbmRbMV0vMTAwMDAwMH1gKTtcbiAgICBhd2FpdCBzaGFycChidWZmZXIpLnRvRmlsZSgnL3RtcC9sd2lwMS5qcGcnKTtcbiAgICBnbG9iYWwuZ2MoKTtcbiAgfSxcbn07XG4iXX0=
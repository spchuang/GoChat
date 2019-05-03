

'use strict';

var _bluebird = require('bluebird');

var _InternalTranslationPageRoute = require('./InternalTranslationPageRoute');

var _InternalTranslationPageRoute2 = _interopRequireDefault(_InternalTranslationPageRoute);

var _InternalMetricsRoute = require('./InternalMetricsRoute');

var _InternalMetricsRoute2 = _interopRequireDefault(_InternalMetricsRoute);

var _TranslationConstants = require('../../translations/TranslationConstants');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _RouteUtils = require('../RouteUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// add internal routes
router.use('/', _InternalTranslationPageRoute2.default);
router.use('/', _InternalMetricsRoute2.default);

// load main internal page entry point
router.get('/', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
    var tabs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if ((0, _RouteUtils.hasInternAccess)(req)) {
              _context.next = 3;
              break;
            }

            res.send('not available');
            return _context.abrupt('return');

          case 3:
            tabs = [{
              name: 'metrics',
              props: {}
            }, {
              name: 'translation',
              props: {
                translationNamespace: Object.values(_TranslationConstants.TRANSLATION_NAMESPACE),
                languages: Object.keys(_TranslationConstants.LANGUAGE_TO_NAME_MAP),
                disableUpdate: _config2.default.env !== 'dev'
              }
            }];


            res.render('web/common', {
              title: 'GoChat Internal',
              js: ['internal/MainInternalContainer.' + _config2.default.env + '.js'],
              css: ['TranslationSettings.css'],
              props: {
                tabs: tabs
              }
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
  return function (_x, _x2) {
    return ref.apply(this, arguments);
  };
}());

module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW50ZXJuYWwvSW50ZXJuYWxSb3V0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQUksU0FBUyxrQkFBUSxNQUFSLEVBQWI7OztBQUdBLE9BQU8sR0FBUCxDQUFXLEdBQVg7QUFDQSxPQUFPLEdBQVAsQ0FBVyxHQUFYOzs7QUFHQSxPQUFPLEdBQVAsQ0FBVyxHQUFYO0FBQUEsNkRBQWdCLGlCQUFPLEdBQVAsRUFBWSxHQUFaO0FBQUEsUUFNUixJQU5RO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFDVCxpQ0FBZ0IsR0FBaEIsQ0FEUztBQUFBO0FBQUE7QUFBQTs7QUFFWixnQkFBSSxJQUFKLENBQVMsZUFBVDtBQUZZOztBQUFBO0FBTVIsZ0JBTlEsR0FNRCxDQUNYO0FBQ0Usb0JBQU0sU0FEUjtBQUVFLHFCQUFPO0FBRlQsYUFEVyxFQUtYO0FBQ0Usb0JBQU0sYUFEUjtBQUVFLHFCQUFPO0FBQ0wsc0NBQXNCLE9BQU8sTUFBUCw2Q0FEakI7QUFFTCwyQkFBVyxPQUFPLElBQVAsNENBRk47QUFHTCwrQkFBZSxpQkFBTyxHQUFQLEtBQWU7QUFIekI7QUFGVCxhQUxXLENBTkM7OztBQXFCZCxnQkFBSSxNQUFKLENBQ0UsWUFERixFQUVFO0FBQ0UscUJBQU8saUJBRFQ7QUFFRSxrQkFBSSxxQ0FDZ0MsaUJBQU8sR0FEdkMsU0FGTjtBQUtFLG1CQUFLLENBQ0gseUJBREcsQ0FMUDtBQVFFLHFCQUFPO0FBQ0w7QUFESztBQVJULGFBRkY7O0FBckJjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBc0NBLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJJbnRlcm5hbFJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEludGVybmFsVHJhbnNsYXRpb25QYWdlUm91dGUgZnJvbSAnLi9JbnRlcm5hbFRyYW5zbGF0aW9uUGFnZVJvdXRlJztcbmltcG9ydCBJbnRlcm5hbE1ldHJpY3NSb3V0ZSBmcm9tICcuL0ludGVybmFsTWV0cmljc1JvdXRlJztcbmltcG9ydCB7VFJBTlNMQVRJT05fTkFNRVNQQUNFLCBMQU5HVUFHRV9UT19OQU1FX01BUCwgVFJBTlNMQVRJT05fRklMRSwgVFJBTlNMQVRJT05fTkFNRV9GTE9XfSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRpb25Db25zdGFudHMnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQge2hhc0ludGVybkFjY2Vzc30gZnJvbSAnLi4vUm91dGVVdGlscyc7XG5cbmxldCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG4vLyBhZGQgaW50ZXJuYWwgcm91dGVzXG5yb3V0ZXIudXNlKCcvJywgSW50ZXJuYWxUcmFuc2xhdGlvblBhZ2VSb3V0ZSk7XG5yb3V0ZXIudXNlKCcvJywgSW50ZXJuYWxNZXRyaWNzUm91dGUpO1xuXG4vLyBsb2FkIG1haW4gaW50ZXJuYWwgcGFnZSBlbnRyeSBwb2ludFxucm91dGVyLmdldCgnLycsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBpZiAoIWhhc0ludGVybkFjY2VzcyhyZXEpKSB7XG4gICAgcmVzLnNlbmQoJ25vdCBhdmFpbGFibGUnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0YWJzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdtZXRyaWNzJyxcbiAgICAgIHByb3BzOiB7fSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd0cmFuc2xhdGlvbicsXG4gICAgICBwcm9wczoge1xuICAgICAgICB0cmFuc2xhdGlvbk5hbWVzcGFjZTogT2JqZWN0LnZhbHVlcyhUUkFOU0xBVElPTl9OQU1FU1BBQ0UpLFxuICAgICAgICBsYW5ndWFnZXM6IE9iamVjdC5rZXlzKExBTkdVQUdFX1RPX05BTUVfTUFQKSxcbiAgICAgICAgZGlzYWJsZVVwZGF0ZTogY29uZmlnLmVudiAhPT0gJ2RldicsXG4gICAgICB9LFxuICAgIH1cbiAgXTtcblxuICByZXMucmVuZGVyKFxuICAgICd3ZWIvY29tbW9uJyxcbiAgICB7XG4gICAgICB0aXRsZTogJ0dvQ2hhdCBJbnRlcm5hbCcsXG4gICAgICBqczogW1xuICAgICAgICBgaW50ZXJuYWwvTWFpbkludGVybmFsQ29udGFpbmVyLiR7Y29uZmlnLmVudn0uanNgLFxuICAgICAgXSxcbiAgICAgIGNzczogW1xuICAgICAgICAnVHJhbnNsYXRpb25TZXR0aW5ncy5jc3MnLFxuICAgICAgXSxcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHRhYnMsXG4gICAgICB9LFxuICAgIH0sXG4gICk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG4iXX0=
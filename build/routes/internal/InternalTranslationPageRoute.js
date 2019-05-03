

'use strict';

var _bluebird = require('bluebird');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _Translator = require('../../translations/Translator');

var _TranslationConstants = require('../../translations/TranslationConstants');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function autoGenTranslationNameFlowType(data) {
  var names = data.map(function (phraseObj) {
    if (phraseObj.namespace === 'normal') {
      return '\'' + phraseObj.name + '\'';
    }
    return '\'' + phraseObj.namespace + '.' + phraseObj.name + '\'';
  });
  return '// @flow\n\ndeclare type TranslationName = ' + names.join('|') + ';';
}

router.get('/translations/_data', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            res.send((0, _Translator.getTranslations)());

          case 1:
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

router.post('/translations/_update', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var params, new_data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(_config2.default.env !== 'dev')) {
              _context2.next = 2;
              break;
            }

            throw new Error('only dev can update');

          case 2:
            params = req.body;
            new_data = params['data'];
            _context2.prev = 4;

            (function () {
              var regex = /^[a-zA-Z0-9 _-]+$/i;
              new_data.forEach(function (phraseObj) {
                (0, _invariant2.default)(regex.test(phraseObj.name), 'Phrase name can only be alphanumeral character');
              });

              _fs2.default.writeFile(_TranslationConstants.TRANSLATION_FILE, JSON.stringify(new_data, null, 2), 'utf8', function () {
                (0, _Translator.loadTranslator)();
                info('updated translation');

                // auto-generate flow types for translation names
                _fs2.default.writeFile(_TranslationConstants.TRANSLATION_NAME_FLOW, autoGenTranslationNameFlowType(new_data), 'utf8', function () {
                  info('updated translation name flow type');
                  res.send({ success: true });
                });
              });
            })();

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](4);
            return _context2.abrupt('return', next(_context2.t0));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[4, 8]]);
  }));
  return function (_x3, _x4, _x5) {
    return ref.apply(this, arguments);
  };
}());

module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW50ZXJuYWwvSW50ZXJuYWxUcmFuc2xhdGlvblBhZ2VSb3V0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksU0FBUyxrQkFBUSxNQUFSLEVBQWI7O0FBRUEsU0FBUyw4QkFBVCxDQUF3QyxJQUF4QyxFQUFxRTtBQUNuRSxNQUFNLFFBQVEsS0FBSyxHQUFMLENBQVMsVUFBQyxTQUFELEVBQWU7QUFDcEMsUUFBSSxVQUFVLFNBQVYsS0FBd0IsUUFBNUIsRUFBc0M7QUFDcEMsb0JBQVcsVUFBVSxJQUFyQjtBQUNEO0FBQ0Qsa0JBQVcsVUFBVSxTQUFyQixTQUFrQyxVQUFVLElBQTVDO0FBQ0QsR0FMYSxDQUFkO0FBTUEseURBQXFELE1BQU0sSUFBTixDQUFXLEdBQVgsQ0FBckQ7QUFDRDs7QUFFRCxPQUFPLEdBQVAsQ0FBVyxxQkFBWDtBQUFBLDZEQUFrQyxpQkFBTyxHQUFQLEVBQVksR0FBWjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVoQyxnQkFBSSxJQUFKLENBQVMsa0NBQVQ7O0FBRmdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS0EsT0FBTyxJQUFQLENBQVksdUJBQVo7QUFBQSw2REFBcUMsa0JBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsSUFBakI7QUFBQSxRQUs3QixNQUw2QixFQU03QixRQU42QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQy9CLGlCQUFPLEdBQVAsS0FBZSxLQURnQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFFM0IsSUFBSSxLQUFKLENBQVUscUJBQVYsQ0FGMkI7O0FBQUE7QUFLN0Isa0JBTDZCLEdBS3BCLElBQUksSUFMZ0I7QUFNN0Isb0JBTjZCLEdBTWxCLE9BQU8sTUFBUCxDQU5rQjtBQUFBOztBQUFBO0FBU2pDLGtCQUFNLFFBQVEsb0JBQWQ7QUFDQSx1QkFBUyxPQUFULENBQWlCLHFCQUFhO0FBQzVCLHlDQUFVLE1BQU0sSUFBTixDQUFXLFVBQVUsSUFBckIsQ0FBVixFQUFzQyxnREFBdEM7QUFDRCxlQUZEOztBQUlBLDJCQUFHLFNBQUgseUNBQStCLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBeUIsSUFBekIsRUFBK0IsQ0FBL0IsQ0FBL0IsRUFBa0UsTUFBbEUsRUFBMEUsWUFBTTtBQUM5RTtBQUNBLHFCQUFLLHFCQUFMOzs7QUFHQSw2QkFBRyxTQUFILDhDQUFvQywrQkFBK0IsUUFBL0IsQ0FBcEMsRUFBOEUsTUFBOUUsRUFBc0YsWUFBTTtBQUMxRix1QkFBSyxvQ0FBTDtBQUNBLHNCQUFJLElBQUosQ0FBUyxFQUFDLFNBQVMsSUFBVixFQUFUO0FBQ0QsaUJBSEQ7QUFJRCxlQVREO0FBZGlDOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBeUIxQixrQkF6QjBCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBNkJBLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJJbnRlcm5hbFRyYW5zbGF0aW9uUGFnZVJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHtnZXRUcmFuc2xhdGlvbnMsIGxvYWRUcmFuc2xhdG9yfSBmcm9tICcuLi8uLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRvcic7XG5pbXBvcnQge1RSQU5TTEFUSU9OX0ZJTEUsIFRSQU5TTEFUSU9OX05BTUVfRkxPV30gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb25zL1RyYW5zbGF0aW9uQ29uc3RhbnRzJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcnO1xuXG5sZXQgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuZnVuY3Rpb24gYXV0b0dlblRyYW5zbGF0aW9uTmFtZUZsb3dUeXBlKGRhdGE6IEFycmF5PE9iamVjdD4pOiBzdHJpbmcge1xuICBjb25zdCBuYW1lcyA9IGRhdGEubWFwKChwaHJhc2VPYmopID0+IHtcbiAgICBpZiAocGhyYXNlT2JqLm5hbWVzcGFjZSA9PT0gJ25vcm1hbCcpIHtcbiAgICAgIHJldHVybiBgJyR7cGhyYXNlT2JqLm5hbWV9J2A7XG4gICAgfVxuICAgIHJldHVybiBgJyR7cGhyYXNlT2JqLm5hbWVzcGFjZX0uJHtwaHJhc2VPYmoubmFtZX0nYDtcbiAgfSk7XG4gIHJldHVybiBgLy8gQGZsb3dcXG5cXG5kZWNsYXJlIHR5cGUgVHJhbnNsYXRpb25OYW1lID0gJHtuYW1lcy5qb2luKCd8Jyl9O2A7XG59XG5cbnJvdXRlci5nZXQoJy90cmFuc2xhdGlvbnMvX2RhdGEnLCBhc3luYyAocmVxLCByZXMpID0+IHtcblxuICByZXMuc2VuZChnZXRUcmFuc2xhdGlvbnMoKSk7XG59KTtcblxucm91dGVyLnBvc3QoJy90cmFuc2xhdGlvbnMvX3VwZGF0ZScsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBpZiAoY29uZmlnLmVudiAhPT0gJ2RldicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgZGV2IGNhbiB1cGRhdGUnKTtcbiAgfVxuXG4gIGNvbnN0IHBhcmFtcyA9IHJlcS5ib2R5O1xuICBjb25zdCBuZXdfZGF0YSA9IHBhcmFtc1snZGF0YSddO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVnZXggPSAvXlthLXpBLVowLTkgXy1dKyQvaTtcbiAgICBuZXdfZGF0YS5mb3JFYWNoKHBocmFzZU9iaiA9PiB7XG4gICAgICBpbnZhcmlhbnQocmVnZXgudGVzdChwaHJhc2VPYmoubmFtZSksICdQaHJhc2UgbmFtZSBjYW4gb25seSBiZSBhbHBoYW51bWVyYWwgY2hhcmFjdGVyJyk7XG4gICAgfSk7XG5cbiAgICBmcy53cml0ZUZpbGUoVFJBTlNMQVRJT05fRklMRSwgSlNPTi5zdHJpbmdpZnkobmV3X2RhdGEsIG51bGwsIDIpLCAndXRmOCcsICgpID0+IHtcbiAgICAgIGxvYWRUcmFuc2xhdG9yKCk7XG4gICAgICBpbmZvKCd1cGRhdGVkIHRyYW5zbGF0aW9uJyk7XG5cbiAgICAgIC8vIGF1dG8tZ2VuZXJhdGUgZmxvdyB0eXBlcyBmb3IgdHJhbnNsYXRpb24gbmFtZXNcbiAgICAgIGZzLndyaXRlRmlsZShUUkFOU0xBVElPTl9OQU1FX0ZMT1csIGF1dG9HZW5UcmFuc2xhdGlvbk5hbWVGbG93VHlwZShuZXdfZGF0YSksICd1dGY4JywgKCkgPT4ge1xuICAgICAgICBpbmZvKCd1cGRhdGVkIHRyYW5zbGF0aW9uIG5hbWUgZmxvdyB0eXBlJyk7XG4gICAgICAgIHJlcy5zZW5kKHtzdWNjZXNzOiB0cnVlfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyO1xuIl19
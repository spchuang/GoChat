

'use strict';

var _bluebird = require('bluebird');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _schema = require('../../class/schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
input
- distinct field
- granularity (group by)
- where filter (object)
*/

function constructChartSQL(input) {
  // convert UTC to cali time
  // UTC to PST is -8 hours
  var sql = 'SELECT DATE(DATE_SUB(createdAt, INTERVAL 8 HOUR)) AS time, ';
  if (input.distinctField) {
    sql += 'COUNT(DISTINCT ' + input.distinctField + ') AS count';
  } else {
    sql += 'COUNT(1) AS count';
  }
  sql += ' FROM ' + input.table;
  if (input.whereFilter) {
    sql += ' WHERE ' + input.whereFilter;
  }

  sql += ' GROUP BY 1';
  sql += ' ORDER BY 1 ASC';
  return sql;
}

router.get('/metrics/_data', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
    var params, sql;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = req.query;
            sql = constructChartSQL(params);


            _schema.sequelize.query(sql, { type: _schema.sequelize.QueryTypes.SELECT }).then(function (data) {
              res.send({
                sql: sql,
                data: data
              });
            });

          case 3:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW50ZXJuYWwvSW50ZXJuYWxNZXRyaWNzUm91dGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQUksU0FBUyxrQkFBUSxNQUFSLEVBQWI7Ozs7Ozs7OztBQWdCQSxTQUFTLGlCQUFULENBQTJCLEtBQTNCLEVBQXVEOzs7QUFHckQsTUFBSSxNQUFNLDZEQUFWO0FBQ0EsTUFBSSxNQUFNLGFBQVYsRUFBeUI7QUFDdkIsK0JBQXlCLE1BQU0sYUFBL0I7QUFDRCxHQUZELE1BRU87QUFDTCxXQUFPLG1CQUFQO0FBQ0Q7QUFDRCxvQkFBZ0IsTUFBTSxLQUF0QjtBQUNBLE1BQUksTUFBTSxXQUFWLEVBQXVCO0FBQ3JCLHVCQUFpQixNQUFNLFdBQXZCO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLFNBQU8sR0FBUDtBQUNEOztBQUVELE9BQU8sR0FBUCxDQUFXLGdCQUFYO0FBQUEsNkRBQTZCLGlCQUFPLEdBQVAsRUFBWSxHQUFaO0FBQUEsUUFDckIsTUFEcUIsRUFFckIsR0FGcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNyQixrQkFEcUIsR0FDWixJQUFJLEtBRFE7QUFFckIsZUFGcUIsR0FFZixrQkFBa0IsTUFBbEIsQ0FGZTs7O0FBSTNCLDhCQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUIsRUFBQyxNQUFNLGtCQUFVLFVBQVYsQ0FBcUIsTUFBNUIsRUFBckIsRUFBMEQsSUFBMUQsQ0FBK0QsZ0JBQVE7QUFDckUsa0JBQUksSUFBSixDQUFTO0FBQ1Asd0JBRE87QUFFUDtBQUZPLGVBQVQ7QUFJRCxhQUxEOztBQUoyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVlBLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJJbnRlcm5hbE1ldHJpY3NSb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQge3NlcXVlbGl6ZX0gZnJvbSAnLi4vLi4vY2xhc3Mvc2NoZW1hJztcblxubGV0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbi8qKlxuaW5wdXRcbi0gZGlzdGluY3QgZmllbGRcbi0gZ3JhbnVsYXJpdHkgKGdyb3VwIGJ5KVxuLSB3aGVyZSBmaWx0ZXIgKG9iamVjdClcbiovXG5cbnR5cGUgY2hhcnRQYXJhbXMgPSB7XG4gIC8vZ3JhbnVsYXJpdHk6IG51bWJlciwgLy8gaW4gc2Vjb25kc1xuICB3aGVyZUZpbHRlcjogc3RyaW5nLFxuICBkaXN0aW5jdEZpZWxkPzogc3RyaW5nLFxuICB0YWJsZTogc3RyaW5nLFxufTtcblxuZnVuY3Rpb24gY29uc3RydWN0Q2hhcnRTUUwoaW5wdXQ6IGNoYXJ0UGFyYW1zKTogc3RyaW5nIHtcbiAgLy8gY29udmVydCBVVEMgdG8gY2FsaSB0aW1lXG4gIC8vIFVUQyB0byBQU1QgaXMgLTggaG91cnNcbiAgbGV0IHNxbCA9ICdTRUxFQ1QgREFURShEQVRFX1NVQihjcmVhdGVkQXQsIElOVEVSVkFMIDggSE9VUikpIEFTIHRpbWUsICc7XG4gIGlmIChpbnB1dC5kaXN0aW5jdEZpZWxkKSB7XG4gICAgc3FsICs9IGBDT1VOVChESVNUSU5DVCAke2lucHV0LmRpc3RpbmN0RmllbGR9KSBBUyBjb3VudGA7XG4gIH0gZWxzZSB7XG4gICAgc3FsICs9ICdDT1VOVCgxKSBBUyBjb3VudCc7XG4gIH1cbiAgc3FsICs9IGAgRlJPTSAke2lucHV0LnRhYmxlfWA7XG4gIGlmIChpbnB1dC53aGVyZUZpbHRlcikge1xuICAgIHNxbCArPSBgIFdIRVJFICR7aW5wdXQud2hlcmVGaWx0ZXJ9YDtcbiAgfVxuXG4gIHNxbCArPSBgIEdST1VQIEJZIDFgO1xuICBzcWwgKz0gYCBPUkRFUiBCWSAxIEFTQ2A7XG4gIHJldHVybiBzcWw7XG59XG5cbnJvdXRlci5nZXQoJy9tZXRyaWNzL19kYXRhJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHJlcS5xdWVyeTtcbiAgY29uc3Qgc3FsID0gY29uc3RydWN0Q2hhcnRTUUwocGFyYW1zKTtcblxuICBzZXF1ZWxpemUucXVlcnkoc3FsLCB7dHlwZTogc2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNUfSkudGhlbihkYXRhID0+IHtcbiAgICByZXMuc2VuZCh7XG4gICAgICBzcWwsXG4gICAgICBkYXRhLFxuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcbiJdfQ==
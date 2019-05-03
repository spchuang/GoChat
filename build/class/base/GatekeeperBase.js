// auto-generated-signature<d2afd7f6ad9df7048034071fc6494de8>

'use strict';

var _bluebird = require('bluebird');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GatekeeperBase = function () {
  function GatekeeperBase(model) {
    _classCallCheck(this, GatekeeperBase);

    (0, _invariant2.default)(model, 'model has to be defined');
    this._model = model;
  }

  _createClass(GatekeeperBase, [{
    key: 'getID',
    value: function getID() {
      return this._model.get('id');
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this._model.get('name');
    }
  }, {
    key: 'setName',
    value: function setName(val) {
      this._model.name = val;
      return this;
    }
  }, {
    key: 'getRules',
    value: function getRules() {
      return this._model.get('rules');
    }
  }, {
    key: 'setRules',
    value: function setRules(val) {
      this._model.rules = val;
      return this;
    }
  }, {
    key: 'getUserIDWhitelist',
    value: function getUserIDWhitelist() {
      return this._model.get('userIDWhitelist');
    }
  }, {
    key: 'setUserIDWhitelist',
    value: function setUserIDWhitelist(val) {
      this._model.userIDWhitelist = val;
      return this;
    }
  }, {
    key: 'getUserIDBlacklist',
    value: function getUserIDBlacklist() {
      return this._model.get('userIDBlacklist');
    }
  }, {
    key: 'setUserIDBlacklist',
    value: function setUserIDBlacklist(val) {
      this._model.userIDBlacklist = val;
      return this;
    }
  }, {
    key: 'getCreatedAt',
    value: function getCreatedAt() {
      return this._model.get('createdAt');
    }
  }, {
    key: 'setCreatedAt',
    value: function setCreatedAt(val) {
      this._model.createdAt = val;
      return this;
    }
  }, {
    key: 'getUpdatedAt',
    value: function getUpdatedAt() {
      return this._model.get('updatedAt');
    }
  }, {
    key: 'setUpdatedAt',
    value: function setUpdatedAt(val) {
      this._model.updatedAt = val;
      return this;
    }
  }, {
    key: 'genSave',
    value: function genSave() {
      return this._model.save();
    }
  }, {
    key: 'genDelete',
    value: function genDelete() {
      return this._model.destroy();
    }

    // base helper

  }, {
    key: 'getData',
    value: function getData() {
      return {
        id: this.getID(),
        name: this.getName(),
        rules: this.getRules(),
        userIDWhitelist: this.getUserIDWhitelist(),
        userIDBlacklist: this.getUserIDBlacklist(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt()
      };
    }
  }], [{
    key: '_genAllBy',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(query) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _schema2.default.Gatekeeper.findAll(query).then(function (models) {
                  return models.map(function (m) {
                    return new _this(m);
                  });
                }).catch(function (err) {
                  error('Error loading Gatekeeper with query ' + JSON.stringify(query, null, 2), err);
                }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _genAllBy(_x) {
        return ref.apply(this, arguments);
      }

      return _genAllBy;
    }()
  }, {
    key: 'genEnforce',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(id) {
        var t;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.genNullable(id);

              case 2:
                t = _context2.sent;

                (0, _invariant2.default)(t, 'Gatekeeper is null for id ' + id);
                return _context2.abrupt('return', t);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genEnforce(_x2) {
        return ref.apply(this, arguments);
      }

      return genEnforce;
    }()
  }, {
    key: 'genNullable',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(id) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._genBy({
                  where: {
                    id: id
                  }
                });

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genNullable(_x3) {
        return ref.apply(this, arguments);
      }

      return genNullable;
    }()
  }, {
    key: '_genBy',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(query) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', _schema2.default.Gatekeeper.findOne(query).then(function (model) {
                  return model ? new _this2(model) : null;
                }).catch(function (err) {
                  error('Error loading Gatekeeper with query ' + JSON.stringify(query, null, 2), err);
                }));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _genBy(_x4) {
        return ref.apply(this, arguments);
      }

      return _genBy;
    }()
    /*
    static async genCreate(params: GatekeeperAttributes): Promise<?this> {0
      return models.Gatekeeper.create(params).then((model: SequelizeModel) => {
        return new this(model);
      });
    }
    */

  }]);

  return GatekeeperBase;
}();

module.exports = GatekeeperBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9iYXNlL0dhdGVrZWVwZXJCYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7OztBQUVBOzs7O0FBRUE7Ozs7Ozs7O0lBV00sYztBQUVKLDBCQUFZLEtBQVosRUFBeUM7QUFBQTs7QUFDdkMsNkJBQVUsS0FBVixFQUFpQix5QkFBakI7QUFDQSxTQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0Q7Ozs7NEJBRWU7QUFDZCxhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsSUFBaEIsQ0FBUDtBQUNEOzs7OEJBRWlCO0FBQ2hCLGFBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixNQUFoQixDQUFQO0FBQ0Q7Ozs0QkFFTyxHLEVBQW9CO0FBQzFCLFdBQUssTUFBTCxDQUFZLElBQVosR0FBbUIsR0FBbkI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OytCQUVrQjtBQUNqQixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsT0FBaEIsQ0FBUDtBQUNEOzs7NkJBRVEsRyxFQUFvQjtBQUMzQixXQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLEdBQXBCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozt5Q0FFNEI7QUFDM0IsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGlCQUFoQixDQUFQO0FBQ0Q7Ozt1Q0FFa0IsRyxFQUFvQjtBQUNyQyxXQUFLLE1BQUwsQ0FBWSxlQUFaLEdBQThCLEdBQTlCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozt5Q0FFNEI7QUFDM0IsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGlCQUFoQixDQUFQO0FBQ0Q7Ozt1Q0FFa0IsRyxFQUFvQjtBQUNyQyxXQUFLLE1BQUwsQ0FBWSxlQUFaLEdBQThCLEdBQTlCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OzttQ0FFb0I7QUFDbkIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFdBQWhCLENBQVA7QUFDRDs7O2lDQUVZLEcsRUFBa0I7QUFDN0IsV0FBSyxNQUFMLENBQVksU0FBWixHQUF3QixHQUF4QjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7bUNBRW9CO0FBQ25CLGFBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixXQUFoQixDQUFQO0FBQ0Q7OztpQ0FFWSxHLEVBQWtCO0FBQzdCLFdBQUssTUFBTCxDQUFZLFNBQVosR0FBd0IsR0FBeEI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzhCQUV3QjtBQUN2QixhQUFPLEtBQUssTUFBTCxDQUFZLElBQVosRUFBUDtBQUNEOzs7Z0NBQzBCO0FBQ3pCLGFBQU8sS0FBSyxNQUFMLENBQVksT0FBWixFQUFQO0FBQ0Q7Ozs7Ozs4QkFHK0I7QUFDOUIsYUFBTztBQUNMLFlBQUksS0FBSyxLQUFMLEVBREM7QUFFTCxjQUFNLEtBQUssT0FBTCxFQUZEO0FBR0wsZUFBTyxLQUFLLFFBQUwsRUFIRjtBQUlMLHlCQUFpQixLQUFLLGtCQUFMLEVBSlo7QUFLTCx5QkFBaUIsS0FBSyxrQkFBTCxFQUxaO0FBTUwsbUJBQVcsS0FBSyxZQUFMLEVBTk47QUFPTCxtQkFBVyxLQUFLLFlBQUw7QUFQTixPQUFQO0FBU0Q7Ozs7a0ZBRXNCLEs7Ozs7Ozs7aURBQ2QsaUJBQU8sVUFBUCxDQUFrQixPQUFsQixDQUEwQixLQUExQixFQUNKLElBREksQ0FDQyxVQUFDLE1BQUQsRUFBbUM7QUFDdkMseUJBQU8sT0FBTyxHQUFQLENBQVcsVUFBQyxDQUFEO0FBQUEsMkJBQU8sVUFBUyxDQUFULENBQVA7QUFBQSxtQkFBWCxDQUFQO0FBQ0QsaUJBSEksRUFHRixLQUhFLENBR0ksVUFBQyxHQUFELEVBQVM7QUFDbEIsaUVBQTZDLEtBQUssU0FBTCxDQUFlLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBN0MsRUFBK0UsR0FBL0U7QUFDRCxpQkFMTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21GQVFlLEU7WUFDaEIsQzs7Ozs7O3VCQUFVLEtBQUssV0FBTCxDQUFpQixFQUFqQixDOzs7QUFBVixpQjs7QUFDTix5Q0FBVSxDQUFWLGlDQUEwQyxFQUExQztrREFDTyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21GQUdnQixFOzs7Ozs7dUJBQ1YsS0FBSyxNQUFMLENBQVk7QUFDckIseUJBQU87QUFDTDtBQURLO0FBRGMsaUJBQVosQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFPSyxLOzs7Ozs7O2tEQUNYLGlCQUFPLFVBQVAsQ0FBa0IsT0FBbEIsQ0FBMEIsS0FBMUIsRUFBaUMsSUFBakMsQ0FBc0MsVUFBQyxLQUFELEVBQTRCO0FBQ3ZFLHlCQUFPLFFBQ0gsV0FBUyxLQUFULENBREcsR0FFSCxJQUZKO0FBR0QsaUJBSk0sRUFJSixLQUpJLENBSUUsVUFBQyxHQUFELEVBQVM7QUFDaEIsaUVBQTZDLEtBQUssU0FBTCxDQUFlLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBN0MsRUFBK0UsR0FBL0U7QUFDRCxpQkFOTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCWCxPQUFPLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiR2F0ZWtlZXBlckJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhdXRvLWdlbmVyYXRlZC1zaWduYXR1cmU8ZDJhZmQ3ZjZhZDlkZjcwNDgwMzQwNzFmYzY0OTRkZTg+XG4vLyBAZmxvd1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbW9kZWxzIGZyb20gJy4uL3NjaGVtYSc7XG5pbXBvcnQgdHlwZSB7U2VxdWVsaXplTW9kZWx9IGZyb20gJy4uL3NjaGVtYSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5cbmV4cG9ydCB0eXBlIEdhdGVrZWVwZXJBdHRyaWJ1dGVzID0ge1xuICBuYW1lPzogc3RyaW5nLFxuICBydWxlcz86IHN0cmluZyxcbiAgdXNlcklEV2hpdGVsaXN0Pzogc3RyaW5nLFxuICB1c2VySURCbGFja2xpc3Q/OiBzdHJpbmcsXG4gIGNyZWF0ZWRBdD86IERhdGUsXG4gIHVwZGF0ZWRBdD86IERhdGUsXG59O1xuXG5jbGFzcyBHYXRla2VlcGVyQmFzZSB7XG4gIF9tb2RlbDogU2VxdWVsaXplTW9kZWw7XG4gIGNvbnN0cnVjdG9yKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IHZvaWQge1xuICAgIGludmFyaWFudChtb2RlbCwgJ21vZGVsIGhhcyB0byBiZSBkZWZpbmVkJyk7XG4gICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgfVxuXG4gIGdldElEKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnaWQnKTtcbiAgfVxuXG4gIGdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCduYW1lJyk7XG4gIH1cblxuICBzZXROYW1lKHZhbDogP3N0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLm5hbWUgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRSdWxlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3J1bGVzJyk7XG4gIH1cblxuICBzZXRSdWxlcyh2YWw6ID9zdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5ydWxlcyA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFVzZXJJRFdoaXRlbGlzdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3VzZXJJRFdoaXRlbGlzdCcpO1xuICB9XG5cbiAgc2V0VXNlcklEV2hpdGVsaXN0KHZhbDogP3N0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnVzZXJJRFdoaXRlbGlzdCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFVzZXJJREJsYWNrbGlzdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3VzZXJJREJsYWNrbGlzdCcpO1xuICB9XG5cbiAgc2V0VXNlcklEQmxhY2tsaXN0KHZhbDogP3N0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnVzZXJJREJsYWNrbGlzdCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldENyZWF0ZWRBdCgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdjcmVhdGVkQXQnKTtcbiAgfVxuXG4gIHNldENyZWF0ZWRBdCh2YWw6ID9EYXRlKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuY3JlYXRlZEF0ID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0VXBkYXRlZEF0KCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3VwZGF0ZWRBdCcpO1xuICB9XG5cbiAgc2V0VXBkYXRlZEF0KHZhbDogP0RhdGUpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC51cGRhdGVkQXQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZW5TYXZlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zYXZlKCk7XG4gIH1cbiAgZ2VuRGVsZXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBiYXNlIGhlbHBlclxuICBnZXREYXRhKCk6IEdhdGVrZWVwZXJBdHRyaWJ1dGVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuZ2V0SUQoKSxcbiAgICAgIG5hbWU6IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgcnVsZXM6IHRoaXMuZ2V0UnVsZXMoKSxcbiAgICAgIHVzZXJJRFdoaXRlbGlzdDogdGhpcy5nZXRVc2VySURXaGl0ZWxpc3QoKSxcbiAgICAgIHVzZXJJREJsYWNrbGlzdDogdGhpcy5nZXRVc2VySURCbGFja2xpc3QoKSxcbiAgICAgIGNyZWF0ZWRBdDogdGhpcy5nZXRDcmVhdGVkQXQoKSxcbiAgICAgIHVwZGF0ZWRBdDogdGhpcy5nZXRVcGRhdGVkQXQoKSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIF9nZW5BbGxCeShxdWVyeTogT2JqZWN0KTogUHJvbWlzZTxBcnJheTx0aGlzPj4ge1xuICAgIHJldHVybiBtb2RlbHMuR2F0ZWtlZXBlci5maW5kQWxsKHF1ZXJ5KVxuICAgICAgLnRoZW4oKG1vZGVsczogQXJyYXk8U2VxdWVsaXplTW9kZWw+KSA9PiB7XG4gICAgICAgIHJldHVybiBtb2RlbHMubWFwKChtKSA9PiBuZXcgdGhpcyhtKSk7XG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBlcnJvcihgRXJyb3IgbG9hZGluZyBHYXRla2VlcGVyIHdpdGggcXVlcnkgJHtKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMil9YCwgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5FbmZvcmNlKGlkOiBudW1iZXIpOiBQcm9taXNlPHRoaXM+IHtcbiAgICBjb25zdCB0ID0gYXdhaXQgdGhpcy5nZW5OdWxsYWJsZShpZCk7XG4gICAgaW52YXJpYW50KHQsIGBHYXRla2VlcGVyIGlzIG51bGwgZm9yIGlkICR7aWR9YCk7XG4gICAgcmV0dXJuIHQ7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuTnVsbGFibGUoaWQ6IG51bWJlcik6IFByb21pc2U8P3RoaXM+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2VuQnkoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGlkXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBfZ2VuQnkocXVlcnk6IE9iamVjdCk6IFByb21pc2U8P3RoaXM+IHtcbiAgICByZXR1cm4gbW9kZWxzLkdhdGVrZWVwZXIuZmluZE9uZShxdWVyeSkudGhlbigobW9kZWw6ID9TZXF1ZWxpemVNb2RlbCkgPT4ge1xuICAgICAgcmV0dXJuIG1vZGVsXG4gICAgICAgID8gbmV3IHRoaXMobW9kZWwpXG4gICAgICAgIDogbnVsbDtcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBlcnJvcihgRXJyb3IgbG9hZGluZyBHYXRla2VlcGVyIHdpdGggcXVlcnkgJHtKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMil9YCwgZXJyKTtcbiAgICB9KTtcbiAgfVxuLypcbnN0YXRpYyBhc3luYyBnZW5DcmVhdGUocGFyYW1zOiBHYXRla2VlcGVyQXR0cmlidXRlcyk6IFByb21pc2U8P3RoaXM+IHswXG4gIHJldHVybiBtb2RlbHMuR2F0ZWtlZXBlci5jcmVhdGUocGFyYW1zKS50aGVuKChtb2RlbDogU2VxdWVsaXplTW9kZWwpID0+IHtcbiAgICByZXR1cm4gbmV3IHRoaXMobW9kZWwpO1xuICB9KTtcbn1cbiovXG59XG5tb2R1bGUuZXhwb3J0cyA9IEdhdGVrZWVwZXJCYXNlO1xuIl19
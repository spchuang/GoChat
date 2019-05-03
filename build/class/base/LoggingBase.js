// auto-generated-signature<f6ff51b29c8d99a1e617deb75c7338c6>

'use strict';

var _bluebird = require('bluebird');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoggingBase = function () {
  function LoggingBase(model) {
    _classCallCheck(this, LoggingBase);

    (0, _invariant2.default)(model, 'model has to be defined');
    this._model = model;
  }

  _createClass(LoggingBase, [{
    key: 'getID',
    value: function getID() {
      return this._model.get('id');
    }
  }, {
    key: 'getUserFBID',
    value: function getUserFBID() {
      return this._model.get('userFBID');
    }
  }, {
    key: 'setUserFBID',
    value: function setUserFBID(val) {
      this._model.userFBID = val;
      return this;
    }
  }, {
    key: 'getUserLanguage',
    value: function getUserLanguage() {
      return this._model.get('userLanguage');
    }
  }, {
    key: 'setUserLanguage',
    value: function setUserLanguage(val) {
      this._model.userLanguage = val;
      return this;
    }
  }, {
    key: 'getTargetClass',
    value: function getTargetClass() {
      return this._model.get('targetClass');
    }
  }, {
    key: 'setTargetClass',
    value: function setTargetClass(val) {
      this._model.targetClass = val;
      return this;
    }
  }, {
    key: 'getTargetID',
    value: function getTargetID() {
      return this._model.get('targetID');
    }
  }, {
    key: 'setTargetID',
    value: function setTargetID(val) {
      this._model.targetID = val;
      return this;
    }
  }, {
    key: 'getEvent',
    value: function getEvent() {
      return this._model.get('event');
    }
  }, {
    key: 'setEvent',
    value: function setEvent(val) {
      this._model.event = val;
      return this;
    }
  }, {
    key: 'getExtraData',
    value: function getExtraData() {
      return this._model.get('extraData');
    }
  }, {
    key: 'setExtraData',
    value: function setExtraData(val) {
      this._model.extraData = val;
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
    key: 'getUserID',
    value: function getUserID() {
      return this._model.get('userID');
    }
  }, {
    key: 'setUserID',
    value: function setUserID(val) {
      this._model.userID = val;
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
        userFBID: this.getUserFBID(),
        userLanguage: this.getUserLanguage(),
        targetClass: this.getTargetClass(),
        targetID: this.getTargetID(),
        event: this.getEvent(),
        extraData: this.getExtraData(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt(),
        userID: this.getUserID()
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
                return _context.abrupt('return', _schema2.default.Logging.findAll(query).then(function (models) {
                  return models.map(function (m) {
                    return new _this(m);
                  });
                }).catch(function (err) {
                  error('Error loading Logging with query ' + JSON.stringify(query, null, 2), err);
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

                (0, _invariant2.default)(t, 'Logging is null for id ' + id);
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
                return _context4.abrupt('return', _schema2.default.Logging.findOne(query).then(function (model) {
                  return model ? new _this2(model) : null;
                }).catch(function (err) {
                  error('Error loading Logging with query ' + JSON.stringify(query, null, 2), err);
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
    static async genCreate(params: LoggingAttributes): Promise<?this> {0
      return models.Logging.create(params).then((model: SequelizeModel) => {
        return new this(model);
      });
    }
    */

  }]);

  return LoggingBase;
}();

module.exports = LoggingBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9iYXNlL0xvZ2dpbmdCYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7OztBQUVBOzs7O0FBRUE7Ozs7Ozs7O0lBY00sVztBQUVKLHVCQUFZLEtBQVosRUFBeUM7QUFBQTs7QUFDdkMsNkJBQVUsS0FBVixFQUFpQix5QkFBakI7QUFDQSxTQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0Q7Ozs7NEJBRWU7QUFDZCxhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsSUFBaEIsQ0FBUDtBQUNEOzs7a0NBRXFCO0FBQ3BCLGFBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixDQUFQO0FBQ0Q7OztnQ0FFVyxHLEVBQW9CO0FBQzlCLFdBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsR0FBdkI7QUFDQSxhQUFPLElBQVA7QUFDRDs7O3NDQUV5QjtBQUN4QixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsY0FBaEIsQ0FBUDtBQUNEOzs7b0NBRWUsRyxFQUFvQjtBQUNsQyxXQUFLLE1BQUwsQ0FBWSxZQUFaLEdBQTJCLEdBQTNCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OztxQ0FFd0I7QUFDdkIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGFBQWhCLENBQVA7QUFDRDs7O21DQUVjLEcsRUFBb0I7QUFDakMsV0FBSyxNQUFMLENBQVksV0FBWixHQUEwQixHQUExQjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7a0NBRXFCO0FBQ3BCLGFBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixDQUFQO0FBQ0Q7OztnQ0FFVyxHLEVBQW9CO0FBQzlCLFdBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsR0FBdkI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OytCQUVrQjtBQUNqQixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsT0FBaEIsQ0FBUDtBQUNEOzs7NkJBRVEsRyxFQUFvQjtB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QUFnQlgsT0FBTyxPQUFQLEdBQWlCLFdBQWpCIiwiZmlsZSI6IkxvZ2dpbmdCYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXV0by1nZW5lcmF0ZWQtc2lnbmF0dXJlPGY2ZmY1MWIyOWM4ZDk5YTFlNjE3ZGViNzVjNzMzOGM2PlxuLy8gQGZsb3dcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG1vZGVscyBmcm9tICcuLi9zY2hlbWEnO1xuaW1wb3J0IHR5cGUge1NlcXVlbGl6ZU1vZGVsfSBmcm9tICcuLi9zY2hlbWEnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuXG5leHBvcnQgdHlwZSBMb2dnaW5nQXR0cmlidXRlcyA9IHtcbiAgdXNlckZCSUQ/OiBzdHJpbmcsXG4gIHVzZXJMYW5ndWFnZT86IHN0cmluZyxcbiAgdGFyZ2V0Q2xhc3M/OiBzdHJpbmcsXG4gIHRhcmdldElEPzogbnVtYmVyLFxuICBldmVudD86IHN0cmluZyxcbiAgZXh0cmFEYXRhPzogc3RyaW5nLFxuICBjcmVhdGVkQXQ/OiBEYXRlLFxuICB1cGRhdGVkQXQ/OiBEYXRlLFxuICB1c2VySUQ/OiBudW1iZXIsXG59O1xuXG5jbGFzcyBMb2dnaW5nQmFzZSB7XG4gIF9tb2RlbDogU2VxdWVsaXplTW9kZWw7XG4gIGNvbnN0cnVjdG9yKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IHZvaWQge1xuICAgIGludmFyaWFudChtb2RlbCwgJ21vZGVsIGhhcyB0byBiZSBkZWZpbmVkJyk7XG4gICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgfVxuXG4gIGdldElEKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnaWQnKTtcbiAgfVxuXG4gIGdldFVzZXJGQklEKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgndXNlckZCSUQnKTtcbiAgfVxuXG4gIHNldFVzZXJGQklEKHZhbDogP3N0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnVzZXJGQklEID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0VXNlckxhbmd1YWdlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgndXNlckxhbmd1YWdlJyk7XG4gIH1cblxuICBzZXRVc2VyTGFuZ3VhZ2UodmFsOiA/c3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwudXNlckxhbmd1YWdlID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0VGFyZ2V0Q2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCd0YXJnZXRDbGFzcycpO1xuICB9XG5cbiAgc2V0VGFyZ2V0Q2xhc3ModmFsOiA/c3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwudGFyZ2V0Q2xhc3MgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRUYXJnZXRJRCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3RhcmdldElEJyk7XG4gIH1cblxuICBzZXRUYXJnZXRJRCh2YWw6ID9udW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC50YXJnZXRJRCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldEV2ZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnZXZlbnQnKTtcbiAgfVxuXG4gIHNldEV2ZW50KHZhbDogP3N0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLmV2ZW50ID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0RXh0cmFEYXRhKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnZXh0cmFEYXRhJyk7XG4gIH1cblxuICBzZXRFeHRyYURhdGEodmFsOiA/c3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuZXh0cmFEYXRhID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0Q3JlYXRlZEF0KCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ2NyZWF0ZWRBdCcpO1xuICB9XG5cbiAgc2V0Q3JlYXRlZEF0KHZhbDogP0RhdGUpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5jcmVhdGVkQXQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRVcGRhdGVkQXQoKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgndXBkYXRlZEF0Jyk7XG4gIH1cblxuICBzZXRVcGRhdGVkQXQodmFsOiA/RGF0ZSk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnVwZGF0ZWRBdCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFVzZXJJRCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3VzZXJJRCcpO1xuICB9XG5cbiAgc2V0VXNlcklEKHZhbDogP251bWJlcik6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnVzZXJJRCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdlblNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnNhdmUoKTtcbiAgfVxuICBnZW5EZWxldGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8vIGJhc2UgaGVscGVyXG4gIGdldERhdGEoKTogTG9nZ2luZ0F0dHJpYnV0ZXMge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdGhpcy5nZXRJRCgpLFxuICAgICAgdXNlckZCSUQ6IHRoaXMuZ2V0VXNlckZCSUQoKSxcbiAgICAgIHVzZXJMYW5ndWFnZTogdGhpcy5nZXRVc2VyTGFuZ3VhZ2UoKSxcbiAgICAgIHRhcmdldENsYXNzOiB0aGlzLmdldFRhcmdldENsYXNzKCksXG4gICAgICB0YXJnZXRJRDogdGhpcy5nZXRUYXJnZXRJRCgpLFxuICAgICAgZXZlbnQ6IHRoaXMuZ2V0RXZlbnQoKSxcbiAgICAgIGV4dHJhRGF0YTogdGhpcy5nZXRFeHRyYURhdGEoKSxcbiAgICAgIGNyZWF0ZWRBdDogdGhpcy5nZXRDcmVhdGVkQXQoKSxcbiAgICAgIHVwZGF0ZWRBdDogdGhpcy5nZXRVcGRhdGVkQXQoKSxcbiAgICAgIHVzZXJJRDogdGhpcy5nZXRVc2VySUQoKSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIF9nZW5BbGxCeShxdWVyeTogT2JqZWN0KTogUHJvbWlzZTxBcnJheTx0aGlzPj4ge1xuICAgIHJldHVybiBtb2RlbHMuTG9nZ2luZy5maW5kQWxsKHF1ZXJ5KVxuICAgICAgLnRoZW4oKG1vZGVsczogQXJyYXk8U2VxdWVsaXplTW9kZWw+KSA9PiB7XG4gICAgICAgIHJldHVybiBtb2RlbHMubWFwKChtKSA9PiBuZXcgdGhpcyhtKSk7XG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBlcnJvcihgRXJyb3IgbG9hZGluZyBMb2dnaW5nIHdpdGggcXVlcnkgJHtKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMil9YCwgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5FbmZvcmNlKGlkOiBudW1iZXIpOiBQcm9taXNlPHRoaXM+IHtcbiAgICBjb25zdCB0ID0gYXdhaXQgdGhpcy5nZW5OdWxsYWJsZShpZCk7XG4gICAgaW52YXJpYW50KHQsIGBMb2dnaW5nIGlzIG51bGwgZm9yIGlkICR7aWR9YCk7XG4gICAgcmV0dXJuIHQ7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuTnVsbGFibGUoaWQ6IG51bWJlcik6IFByb21pc2U8P3RoaXM+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2VuQnkoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGlkXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBfZ2VuQnkocXVlcnk6IE9iamVjdCk6IFByb21pc2U8P3RoaXM+IHtcbiAgICByZXR1cm4gbW9kZWxzLkxvZ2dpbmcuZmluZE9uZShxdWVyeSkudGhlbigobW9kZWw6ID9TZXF1ZWxpemVNb2RlbCkgPT4ge1xuICAgICAgcmV0dXJuIG1vZGVsXG4gICAgICAgID8gbmV3IHRoaXMobW9kZWwpXG4gICAgICAgIDogbnVsbDtcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBlcnJvcihgRXJyb3IgbG9hZGluZyBMb2dnaW5nIHdpdGggcXVlcnkgJHtKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMil9YCwgZXJyKTtcbiAgICB9KTtcbiAgfVxuLypcbnN0YXRpYyBhc3luYyBnZW5DcmVhdGUocGFyYW1zOiBMb2dnaW5nQXR0cmlidXRlcyk6IFByb21pc2U8P3RoaXM+IHswXG4gIHJldHVybiBtb2RlbHMuTG9nZ2luZy5jcmVhdGUocGFyYW1zKS50aGVuKChtb2RlbDogU2VxdWVsaXplTW9kZWwpID0+IHtcbiAgICByZXR1cm4gbmV3IHRoaXMobW9kZWwpO1xuICB9KTtcbn1cbiovXG59XG5tb2R1bGUuZXhwb3J0cyA9IExvZ2dpbmdCYXNlO1xuIl19
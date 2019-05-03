// auto-generated-signature<7a243ab67118a64d057197ea56b5f12c>

'use strict';

var _bluebird = require('bluebird');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserBase = function () {
  function UserBase(model) {
    _classCallCheck(this, UserBase);

    (0, _invariant2.default)(model, 'model has to be defined');
    this._model = model;
  }

  _createClass(UserBase, [{
    key: 'getID',
    value: function getID() {
      return this._model.get('id');
    }
  }, {
    key: 'getFBID',
    value: function getFBID() {
      return this._model.get('fbID');
    }
  }, {
    key: 'setFBID',
    value: function setFBID(val) {
      this._model.fbID = val;
      return this;
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return this._model.get('status');
    }
  }, {
    key: 'setStatus',
    value: function setStatus(val) {
      this._model.status = val;
      return this;
    }
  }, {
    key: 'getLanguage',
    value: function getLanguage() {
      return this._model.get('language');
    }
  }, {
    key: 'setLanguage',
    value: function setLanguage(val) {
      this._model.language = val;
      return this;
    }
  }, {
    key: 'getFirstName',
    value: function getFirstName() {
      return this._model.get('firstName');
    }
  }, {
    key: 'setFirstName',
    value: function setFirstName(val) {
      this._model.firstName = val;
      return this;
    }
  }, {
    key: 'getLastName',
    value: function getLastName() {
      return this._model.get('lastName');
    }
  }, {
    key: 'setLastName',
    value: function setLastName(val) {
      this._model.lastName = val;
      return this;
    }
  }, {
    key: 'getProfilePic',
    value: function getProfilePic() {
      return this._model.get('profilePic');
    }
  }, {
    key: 'setProfilePic',
    value: function setProfilePic(val) {
      this._model.profilePic = val;
      return this;
    }
  }, {
    key: 'getLocale',
    value: function getLocale() {
      return this._model.get('locale');
    }
  }, {
    key: 'setLocale',
    value: function setLocale(val) {
      this._model.locale = val;
      return this;
    }
  }, {
    key: 'getGender',
    value: function getGender() {
      return this._model.get('gender');
    }
  }, {
    key: 'setGender',
    value: function setGender(val) {
      this._model.gender = val;
      return this;
    }
  }, {
    key: 'getIsAI',
    value: function getIsAI() {
      return this._model.get('isAI');
    }
  }, {
    key: 'setIsAI',
    value: function setIsAI(val) {
      this._model.isAI = val;
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
    key: 'getCurrentGameID',
    value: function getCurrentGameID() {
      return this._model.get('currentGameID');
    }
  }, {
    key: 'setCurrentGameID',
    value: function setCurrentGameID(val) {
      this._model.currentGameID = val;
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
        fbID: this.getFBID(),
        status: this.getStatus(),
        language: this.getLanguage(),
        firstName: this.getFirstName(),
        lastName: this.getLastName(),
        profilePic: this.getProfilePic(),
        locale: this.getLocale(),
        gender: this.getGender(),
        isAI: this.getIsAI(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt(),
        currentGameID: this.getCurrentGameID()
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
                return _context.abrupt('return', _schema2.default.User.findAll(query).then(function (models) {
                  return models.map(function (m) {
                    return new _this(m);
                  });
                }).catch(function (err) {
                  error('Error loading User with query ' + JSON.stringify(query, null, 2), err);
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

                (0, _invariant2.default)(t, 'User is null for id ' + id);
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
                return _context4.abrupt('return', _schema2.default.User.findOne(query).then(function (model) {
                  return model ? new _this2(model) : null;
                }).catch(function (err) {
                  error('Error loading User with query ' + JSON.stringify(query, null, 2), err);
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
    static async genCreate(params: UserAttributes): Promise<?this> {0
      return models.User.create(params).then((model: SequelizeModel) => {
        return new this(model);
      });
    }
    */

  }]);

  return UserBase;
}();

module.exports = UserBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9iYXNlL1VzZXJCYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7OztBQUVBOzs7O0FBRUE7Ozs7Ozs7O0lBaUJNLFE7QUFFSixvQkFBWSxLQUFaLEVBQXlDO0FBQUE7O0FBQ3ZDLDZCQUFVLEtBQVYsRUFBaUIseUJBQWpCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsS0FBZDtBQUNEOzs7OzRCQUVlO0FBQ2QsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLElBQWhCLENBQVA7QUFDRDs7OzhCQUVpQjtBQUNoQixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsTUFBaEIsQ0FBUDtBQUNEOzs7NEJBRU8sRyxFQUFvQjtBQUMxQixXQUFLLE1BQUwsQ0FBWSxJQUFaLEdBQW1CLEdBQW5CO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OztnQ0FFMkI7QUFDMUIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFFBQWhCLENBQVA7QUFDRDs7OzhCQUVTLEcsRUFBNEI7QUFDcEMsV0FBSyxNQUFMLENBQVksTUFBWixHQUFxQixHQUFyQjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7a0NBRXFCO0FBQ3BCLGFBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixDQUFQO0FBQ0Q7OztnQ0FFVyxHLEVBQW9CO0FBQzlCLFdBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsR0FBdkI7QUFDQSxhQUFPLElBQVA7QUFDRDs7O21DQUVzQjtBQUNyQixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsV0FBaEIsQ0FBUDtBQUNEOzs7aUNBRVksRyxFQUFvQjtBQUMvQixXQUFLLE1BQUwsQ0FBWSxTQUFaLEdBQXdCLEdBQXhCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OztrQ0FFcUI7QUFDcEIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLENBQVA7QUFDRDs7O2dDQUVXLEcsRUFBb0I7QUFD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QUNoQixDOzs7Ozs7dUJBQVUsS0FBSyxXQUFMLENBQWlCLEVBQWpCLEM7OztBQUFWLGlCOztBQUNOLHlDQUFVLENBQVYsMkJBQW9DLEVBQXBDO2tEQUNPLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUZBR2dCLEU7Ozs7Ozt1QkFDVixLQUFLLE1BQUwsQ0FBWTtBQUNyQix5QkFBTztBQUNMO0FBREs7QUFEYyxpQkFBWixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21GQU9LLEs7Ozs7Ozs7a0RBQ1gsaUJBQU8sSUFBUCxDQUFZLE9BQVosQ0FBb0IsS0FBcEIsRUFBMkIsSUFBM0IsQ0FBZ0MsVUFBQyxLQUFELEVBQTRCO0FBQ2pFLHlCQUFPLFFBQ0gsV0FBUyxLQUFULENBREcsR0FFSCxJQUZKO0FBR0QsaUJBSk0sRUFJSixLQUpJLENBSUUsVUFBQyxHQUFELEVBQVM7QUFDaEIsMkRBQXVDLEtBQUssU0FBTCxDQUFlLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBdkMsRUFBeUUsR0FBekU7QUFDRCxpQkFOTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCWCxPQUFPLE9BQVAsR0FBaUIsUUFBakIiLCJmaWxlIjoiVXNlckJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhdXRvLWdlbmVyYXRlZC1zaWduYXR1cmU8N2EyNDNhYjY3MTE4YTY0ZDA1NzE5N2VhNTZiNWYxMmM+XG4vLyBAZmxvd1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbW9kZWxzIGZyb20gJy4uL3NjaGVtYSc7XG5pbXBvcnQgdHlwZSB7U2VxdWVsaXplTW9kZWx9IGZyb20gJy4uL3NjaGVtYSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5cbmV4cG9ydCB0eXBlIFVzZXJBdHRyaWJ1dGVzID0ge1xuICBmYklEPzogc3RyaW5nLFxuICBzdGF0dXM/OiBVc2VyU3RhdHVzVHlwZSxcbiAgbGFuZ3VhZ2U/OiBzdHJpbmcsXG4gIGZpcnN0TmFtZT86IHN0cmluZyxcbiAgbGFzdE5hbWU/OiBzdHJpbmcsXG4gIHByb2ZpbGVQaWM/OiBzdHJpbmcsXG4gIGxvY2FsZT86IHN0cmluZyxcbiAgZ2VuZGVyPzogR2VuZGVyVHlwZSxcbiAgaXNBST86IGJvb2xlYW4sXG4gIGNyZWF0ZWRBdD86IERhdGUsXG4gIHVwZGF0ZWRBdD86IERhdGUsXG4gIGN1cnJlbnRHYW1lSUQ/OiBudW1iZXIsXG59O1xuXG5jbGFzcyBVc2VyQmFzZSB7XG4gIF9tb2RlbDogU2VxdWVsaXplTW9kZWw7XG4gIGNvbnN0cnVjdG9yKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IHZvaWQge1xuICAgIGludmFyaWFudChtb2RlbCwgJ21vZGVsIGhhcyB0byBiZSBkZWZpbmVkJyk7XG4gICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgfVxuXG4gIGdldElEKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnaWQnKTtcbiAgfVxuXG4gIGdldEZCSUQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdmYklEJyk7XG4gIH1cblxuICBzZXRGQklEKHZhbDogP3N0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLmZiSUQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRTdGF0dXMoKTogVXNlclN0YXR1c1R5cGUge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3N0YXR1cycpO1xuICB9XG5cbiAgc2V0U3RhdHVzKHZhbDogP1VzZXJTdGF0dXNUeXBlKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuc3RhdHVzID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0TGFuZ3VhZ2UoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdsYW5ndWFnZScpO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2UodmFsOiA/c3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwubGFuZ3VhZ2UgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRGaXJzdE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdmaXJzdE5hbWUnKTtcbiAgfVxuXG4gIHNldEZpcnN0TmFtZSh2YWw6ID9zdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5maXJzdE5hbWUgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRMYXN0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ2xhc3ROYW1lJyk7XG4gIH1cblxuICBzZXRMYXN0TmFtZSh2YWw6ID9zdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5sYXN0TmFtZSA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFByb2ZpbGVQaWMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdwcm9maWxlUGljJyk7XG4gIH1cblxuICBzZXRQcm9maWxlUGljKHZhbDogP3N0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnByb2ZpbGVQaWMgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRMb2NhbGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdsb2NhbGUnKTtcbiAgfVxuXG4gIHNldExvY2FsZSh2YWw6ID9zdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5sb2NhbGUgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRHZW5kZXIoKTogR2VuZGVyVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnZ2VuZGVyJyk7XG4gIH1cblxuICBzZXRHZW5kZXIodmFsOiA/R2VuZGVyVHlwZSk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLmdlbmRlciA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldElzQUkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnaXNBSScpO1xuICB9XG5cbiAgc2V0SXNBSSh2YWw6ID9ib29sZWFuKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuaXNBSSA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldENyZWF0ZWRBdCgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdjcmVhdGVkQXQnKTtcbiAgfVxuXG4gIHNldENyZWF0ZWRBdCh2YWw6ID9EYXRlKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuY3JlYXRlZEF0ID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0VXBkYXRlZEF0KCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3VwZGF0ZWRBdCcpO1xuICB9XG5cbiAgc2V0VXBkYXRlZEF0KHZhbDogP0RhdGUpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC51cGRhdGVkQXQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRDdXJyZW50R2FtZUlEKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnY3VycmVudEdhbWVJRCcpO1xuICB9XG5cbiAgc2V0Q3VycmVudEdhbWVJRCh2YWw6ID9udW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5jdXJyZW50R2FtZUlEID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2VuU2F2ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc2F2ZSgpO1xuICB9XG4gIGdlbkRlbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZGVzdHJveSgpO1xuICB9XG5cbiAgLy8gYmFzZSBoZWxwZXJcbiAgZ2V0RGF0YSgpOiBVc2VyQXR0cmlidXRlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmdldElEKCksXG4gICAgICBmYklEOiB0aGlzLmdldEZCSUQoKSxcbiAgICAgIHN0YXR1czogdGhpcy5nZXRTdGF0dXMoKSxcbiAgICAgIGxhbmd1YWdlOiB0aGlzLmdldExhbmd1YWdlKCksXG4gICAgICBmaXJzdE5hbWU6IHRoaXMuZ2V0Rmlyc3ROYW1lKCksXG4gICAgICBsYXN0TmFtZTogdGhpcy5nZXRMYXN0TmFtZSgpLFxuICAgICAgcHJvZmlsZVBpYzogdGhpcy5nZXRQcm9maWxlUGljKCksXG4gICAgICBsb2NhbGU6IHRoaXMuZ2V0TG9jYWxlKCksXG4gICAgICBnZW5kZXI6IHRoaXMuZ2V0R2VuZGVyKCksXG4gICAgICBpc0FJOiB0aGlzLmdldElzQUkoKSxcbiAgICAgIGNyZWF0ZWRBdDogdGhpcy5nZXRDcmVhdGVkQXQoKSxcbiAgICAgIHVwZGF0ZWRBdDogdGhpcy5nZXRVcGRhdGVkQXQoKSxcbiAgICAgIGN1cnJlbnRHYW1lSUQ6IHRoaXMuZ2V0Q3VycmVudEdhbWVJRCgpLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgX2dlbkFsbEJ5KHF1ZXJ5OiBPYmplY3QpOiBQcm9taXNlPEFycmF5PHRoaXM+PiB7XG4gICAgcmV0dXJuIG1vZGVscy5Vc2VyLmZpbmRBbGwocXVlcnkpXG4gICAgICAudGhlbigobW9kZWxzOiBBcnJheTxTZXF1ZWxpemVNb2RlbD4pID0+IHtcbiAgICAgICAgcmV0dXJuIG1vZGVscy5tYXAoKG0pID0+IG5ldyB0aGlzKG0pKTtcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGVycm9yKGBFcnJvciBsb2FkaW5nIFVzZXIgd2l0aCBxdWVyeSAke0pTT04uc3RyaW5naWZ5KHF1ZXJ5LCBudWxsLCAyKX1gLCBlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbkVuZm9yY2UoaWQ6IG51bWJlcik6IFByb21pc2U8dGhpcz4ge1xuICAgIGNvbnN0IHQgPSBhd2FpdCB0aGlzLmdlbk51bGxhYmxlKGlkKTtcbiAgICBpbnZhcmlhbnQodCwgYFVzZXIgaXMgbnVsbCBmb3IgaWQgJHtpZH1gKTtcbiAgICByZXR1cm4gdDtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5OdWxsYWJsZShpZDogbnVtYmVyKTogUHJvbWlzZTw/dGhpcz4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9nZW5CeSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgaWRcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIF9nZW5CeShxdWVyeTogT2JqZWN0KTogUHJvbWlzZTw/dGhpcz4ge1xuICAgIHJldHVybiBtb2RlbHMuVXNlci5maW5kT25lKHF1ZXJ5KS50aGVuKChtb2RlbDogP1NlcXVlbGl6ZU1vZGVsKSA9PiB7XG4gICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgPyBuZXcgdGhpcyhtb2RlbClcbiAgICAgICAgOiBudWxsO1xuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGVycm9yKGBFcnJvciBsb2FkaW5nIFVzZXIgd2l0aCBxdWVyeSAke0pTT04uc3RyaW5naWZ5KHF1ZXJ5LCBudWxsLCAyKX1gLCBlcnIpO1xuICAgIH0pO1xuICB9XG4vKlxuc3RhdGljIGFzeW5jIGdlbkNyZWF0ZShwYXJhbXM6IFVzZXJBdHRyaWJ1dGVzKTogUHJvbWlzZTw/dGhpcz4gezBcbiAgcmV0dXJuIG1vZGVscy5Vc2VyLmNyZWF0ZShwYXJhbXMpLnRoZW4oKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCkgPT4ge1xuICAgIHJldHVybiBuZXcgdGhpcyhtb2RlbCk7XG4gIH0pO1xufVxuKi9cbn1cbm1vZHVsZS5leHBvcnRzID0gVXNlckJhc2U7XG4iXX0=
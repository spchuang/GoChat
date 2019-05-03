// auto-generated-signature<1dea9844532e0fcf01ba1d8727c4f92f>

'use strict';

var _bluebird = require('bluebird');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageBase = function () {
  function MessageBase(model) {
    _classCallCheck(this, MessageBase);

    (0, _invariant2.default)(model, 'model has to be defined');
    this._model = model;
  }

  _createClass(MessageBase, [{
    key: 'getID',
    value: function getID() {
      return this._model.get('id');
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      return this._model.get('content');
    }
  }, {
    key: 'setContent',
    value: function setContent(val) {
      this._model.content = val;
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
    key: 'getSenderID',
    value: function getSenderID() {
      return this._model.get('senderID');
    }
  }, {
    key: 'setSenderID',
    value: function setSenderID(val) {
      this._model.senderID = val;
      return this;
    }
  }, {
    key: 'getReceiverID',
    value: function getReceiverID() {
      return this._model.get('receiverID');
    }
  }, {
    key: 'setReceiverID',
    value: function setReceiverID(val) {
      this._model.receiverID = val;
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
        content: this.getContent(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt(),
        senderID: this.getSenderID(),
        receiverID: this.getReceiverID()
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
                return _context.abrupt('return', _schema2.default.Message.findAll(query).then(function (models) {
                  return models.map(function (m) {
                    return new _this(m);
                  });
                }).catch(function (err) {
                  error('Error loading Message with query ' + JSON.stringify(query, null, 2), err);
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

                (0, _invariant2.default)(t, 'Message is null for id ' + id);
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
                return _context4.abrupt('return', _schema2.default.Message.findOne(query).then(function (model) {
                  return model ? new _this2(model) : null;
                }).catch(function (err) {
                  error('Error loading Message with query ' + JSON.stringify(query, null, 2), err);
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
    static async genCreate(params: MessageAttributes): Promise<?this> {0
      return models.Message.create(params).then((model: SequelizeModel) => {
        return new this(model);
      });
    }
    */

  }]);

  return MessageBase;
}();

module.exports = MessageBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9iYXNlL01lc3NhZ2VCYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7OztBQUVBOzs7O0FBRUE7Ozs7Ozs7O0lBVU0sVztBQUVKLHVCQUFZLEtBQVosRUFBeUM7QUFBQTs7QUFDdkMsNkJBQVUsS0FBVixFQUFpQix5QkFBakI7QUFDQSxTQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0Q7Ozs7NEJBRWU7QUFDZCxhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsSUFBaEIsQ0FBUDtBQUNEOzs7aUNBRW9CO0FBQ25CLGFBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixTQUFoQixDQUFQO0FBQ0Q7OzsrQkFFVSxHLEVBQW9CO0FBQzdCLFdBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsR0FBdEI7QUFDQSxhQUFPLElBQVA7QUFDRDs7O21DQUVvQjtBQUNuQixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsV0FBaEIsQ0FBUDtBQUNEOzs7aUNBRVksRyxFQUFrQjtBQUM3QixXQUFLLE1BQUwsQ0FBWSxTQUFaLEdBQXdCLEdBQXhCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OzttQ0FFb0I7QUFDbkIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFdBQWhCLENBQVA7QUFDRDs7O2lDQUVZLEcsRUFBa0I7QUFDN0IsV0FBSyxNQUFMLENBQVksU0FBWixHQUF3QixHQUF4QjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7a0NBRXFCO0FBQ3BCLGFBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixDQUFQO0FBQ0Q7OztnQ0FFVyxHLEVBQW9CO0FBQzlCLFdBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsR0FBdkI7QUFDQSxhQUFPLElBQVA7QUFDRDs7O29DQUV1QjtBQUN0QixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsWUFBaEIsQ0FBUDtBQUNEOzs7a0NBRWEsRyxFQUFvQjtBQUNoQyxXQUFLLE1BQUwsQ0FBWSxVQUFaLEdBQXlCLEdBQXpCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozs4QkFFd0I7QUFDdkIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQVA7QUFDRDs7O2dDQUMwQjtBQUN6QixhQUFPLEtBQUssTUFBTCxDQUFZLE9BQVosRUFBUDtBQUNEOzs7Ozs7OEJBRzRCO0FBQzNCLGFBQU87QUFDTCxZQUFJLEtBQUssS0FBTCxFQURDO0FBRUwsaUJBQVMsS0FBSyxVQUFMLEVBRko7QUFHTCxtQkFBVyxLQUFLLFlBQUwsRUFITjtBQUlMLG1CQUFXLEtBQUssWUFBTCxFQUpOO0FBS0wsa0JBQVUsS0FBSyxXQUFMLEVBTEw7QUFNTCxvQkFBWSxLQUFLLGFBQUw7QUFOUCxPQUFQO0FBUUQ7Ozs7a0ZBRXNCLEs7Ozs7Ozs7aURBQ2QsaUJBQU8sT0FBUCxDQUFlLE9BQWYsQ0FBdUIsS0FBdkIsRUFDSixJQURJLENBQ0MsVUFBQyxNQUFELEVBQW1DO0FBQ3ZDLHlCQUFPLE9BQU8sR0FBUCxDQUFXLFVBQUMsQ0FBRDtBQUFBLDJCQUFPLFVBQVMsQ0FBVCxDQUFQO0FBQUEsbUJBQVgsQ0FBUDtBQUNELGlCQUhJLEVBR0YsS0FIRSxDQUdJLFVBQUMsR0FBRCxFQUFTO0FBQ2xCLDhEQUEwQyxLQUFLLFNBQUwsQ0FBZSxLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQTFDLEVBQTRFLEdBQTVFO0FBQ0QsaUJBTE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFRZSxFO1lBQ2hCLEM7Ozs7Ozt1QkFBVSxLQUFLLFdBQUwsQ0FBaUIsRUFBakIsQzs7O0FBQVYsaUI7O0FBQ04seUNBQVUsQ0FBViw4QkFBdUMsRUFBdkM7a0RBQ08sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRkFHZ0IsRTs7Ozs7O3VCQUNWLEtBQUssTUFBTCxDQUFZO0FBQ3JCLHlCQUFPO0FBQ0w7QUFESztBQURjLGlCQUFaLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUZBT0ssSzs7Ozs7OztrREFDWCxpQkFBTyxPQUFQLENBQWUsT0FBZixDQUF1QixLQUF2QixFQUE4QixJQUE5QixDQUFtQyxVQUFDLEtBQUQsRUFBNEI7QUFDcEUseUJBQU8sUUFDSCxXQUFTLEtBQVQsQ0FERyxHQUVILElBRko7QUFHRCxpQkFKTSxFQUlKLEtBSkksQ0FJRSxVQUFDLEdBQUQsRUFBUztBQUNoQiw4REFBMEMsS0FBSyxTQUFMLENBQWUsS0FBZixFQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUExQyxFQUE0RSxHQUE1RTtBQUNELGlCQU5NLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JYLE9BQU8sT0FBUCxHQUFpQixXQUFqQiIsImZpbGUiOiJNZXNzYWdlQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGF1dG8tZ2VuZXJhdGVkLXNpZ25hdHVyZTwxZGVhOTg0NDUzMmUwZmNmMDFiYTFkODcyN2M0ZjkyZj5cbi8vIEBmbG93XG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtb2RlbHMgZnJvbSAnLi4vc2NoZW1hJztcbmltcG9ydCB0eXBlIHtTZXF1ZWxpemVNb2RlbH0gZnJvbSAnLi4vc2NoZW1hJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcblxuZXhwb3J0IHR5cGUgTWVzc2FnZUF0dHJpYnV0ZXMgPSB7XG4gIGNvbnRlbnQ/OiBzdHJpbmcsXG4gIGNyZWF0ZWRBdD86IERhdGUsXG4gIHVwZGF0ZWRBdD86IERhdGUsXG4gIHNlbmRlcklEPzogbnVtYmVyLFxuICByZWNlaXZlcklEPzogbnVtYmVyLFxufTtcblxuY2xhc3MgTWVzc2FnZUJhc2Uge1xuICBfbW9kZWw6IFNlcXVlbGl6ZU1vZGVsO1xuICBjb25zdHJ1Y3Rvcihtb2RlbDogU2VxdWVsaXplTW9kZWwpOiB2b2lkIHtcbiAgICBpbnZhcmlhbnQobW9kZWwsICdtb2RlbCBoYXMgdG8gYmUgZGVmaW5lZCcpO1xuICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gIH1cblxuICBnZXRJRCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ2lkJyk7XG4gIH1cblxuICBnZXRDb250ZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnY29udGVudCcpO1xuICB9XG5cbiAgc2V0Q29udGVudCh2YWw6ID9zdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5jb250ZW50ID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0Q3JlYXRlZEF0KCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ2NyZWF0ZWRBdCcpO1xuICB9XG5cbiAgc2V0Q3JlYXRlZEF0KHZhbDogP0RhdGUpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5jcmVhdGVkQXQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRVcGRhdGVkQXQoKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgndXBkYXRlZEF0Jyk7XG4gIH1cblxuICBzZXRVcGRhdGVkQXQodmFsOiA/RGF0ZSk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnVwZGF0ZWRBdCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFNlbmRlcklEKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnc2VuZGVySUQnKTtcbiAgfVxuXG4gIHNldFNlbmRlcklEKHZhbDogP251bWJlcik6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnNlbmRlcklEID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0UmVjZWl2ZXJJRCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3JlY2VpdmVySUQnKTtcbiAgfVxuXG4gIHNldFJlY2VpdmVySUQodmFsOiA/bnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwucmVjZWl2ZXJJRCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdlblNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnNhdmUoKTtcbiAgfVxuICBnZW5EZWxldGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8vIGJhc2UgaGVscGVyXG4gIGdldERhdGEoKTogTWVzc2FnZUF0dHJpYnV0ZXMge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdGhpcy5nZXRJRCgpLFxuICAgICAgY29udGVudDogdGhpcy5nZXRDb250ZW50KCksXG4gICAgICBjcmVhdGVkQXQ6IHRoaXMuZ2V0Q3JlYXRlZEF0KCksXG4gICAgICB1cGRhdGVkQXQ6IHRoaXMuZ2V0VXBkYXRlZEF0KCksXG4gICAgICBzZW5kZXJJRDogdGhpcy5nZXRTZW5kZXJJRCgpLFxuICAgICAgcmVjZWl2ZXJJRDogdGhpcy5nZXRSZWNlaXZlcklEKCksXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBfZ2VuQWxsQnkocXVlcnk6IE9iamVjdCk6IFByb21pc2U8QXJyYXk8dGhpcz4+IHtcbiAgICByZXR1cm4gbW9kZWxzLk1lc3NhZ2UuZmluZEFsbChxdWVyeSlcbiAgICAgIC50aGVuKChtb2RlbHM6IEFycmF5PFNlcXVlbGl6ZU1vZGVsPikgPT4ge1xuICAgICAgICByZXR1cm4gbW9kZWxzLm1hcCgobSkgPT4gbmV3IHRoaXMobSkpO1xuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgZXJyb3IoYEVycm9yIGxvYWRpbmcgTWVzc2FnZSB3aXRoIHF1ZXJ5ICR7SlNPTi5zdHJpbmdpZnkocXVlcnksIG51bGwsIDIpfWAsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuRW5mb3JjZShpZDogbnVtYmVyKTogUHJvbWlzZTx0aGlzPiB7XG4gICAgY29uc3QgdCA9IGF3YWl0IHRoaXMuZ2VuTnVsbGFibGUoaWQpO1xuICAgIGludmFyaWFudCh0LCBgTWVzc2FnZSBpcyBudWxsIGZvciBpZCAke2lkfWApO1xuICAgIHJldHVybiB0O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbk51bGxhYmxlKGlkOiBudW1iZXIpOiBQcm9taXNlPD90aGlzPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2dlbkJ5KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgX2dlbkJ5KHF1ZXJ5OiBPYmplY3QpOiBQcm9taXNlPD90aGlzPiB7XG4gICAgcmV0dXJuIG1vZGVscy5NZXNzYWdlLmZpbmRPbmUocXVlcnkpLnRoZW4oKG1vZGVsOiA/U2VxdWVsaXplTW9kZWwpID0+IHtcbiAgICAgIHJldHVybiBtb2RlbFxuICAgICAgICA/IG5ldyB0aGlzKG1vZGVsKVxuICAgICAgICA6IG51bGw7XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgZXJyb3IoYEVycm9yIGxvYWRpbmcgTWVzc2FnZSB3aXRoIHF1ZXJ5ICR7SlNPTi5zdHJpbmdpZnkocXVlcnksIG51bGwsIDIpfWAsIGVycik7XG4gICAgfSk7XG4gIH1cbi8qXG5zdGF0aWMgYXN5bmMgZ2VuQ3JlYXRlKHBhcmFtczogTWVzc2FnZUF0dHJpYnV0ZXMpOiBQcm9taXNlPD90aGlzPiB7MFxuICByZXR1cm4gbW9kZWxzLk1lc3NhZ2UuY3JlYXRlKHBhcmFtcykudGhlbigobW9kZWw6IFNlcXVlbGl6ZU1vZGVsKSA9PiB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG1vZGVsKTtcbiAgfSk7XG59XG4qL1xufVxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlQmFzZTtcbiJdfQ==
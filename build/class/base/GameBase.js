// auto-generated-signature<d0e0dc371ee70eb42affa7d15ec4770d>

'use strict';

var _bluebird = require('bluebird');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBase = function () {
  function GameBase(model) {
    _classCallCheck(this, GameBase);

    (0, _invariant2.default)(model, 'model has to be defined');
    this._model = model;
  }

  _createClass(GameBase, [{
    key: 'getID',
    value: function getID() {
      return this._model.get('id');
    }
  }, {
    key: 'getIsBlackTurn',
    value: function getIsBlackTurn() {
      return this._model.get('isBlackTurn');
    }
  }, {
    key: 'setIsBlackTurn',
    value: function setIsBlackTurn(val) {
      this._model.isBlackTurn = val;
      return this;
    }
  }, {
    key: 'getWeiqiConsecutivePasses',
    value: function getWeiqiConsecutivePasses() {
      return this._model.get('weiqiConsecutivePasses');
    }
  }, {
    key: 'setWeiqiConsecutivePasses',
    value: function setWeiqiConsecutivePasses(val) {
      this._model.weiqiConsecutivePasses = val;
      return this;
    }
  }, {
    key: 'getWeiqiHistory',
    value: function getWeiqiHistory() {
      return JSON.parse(this._model.get('weiqiHistory'));
    }
  }, {
    key: 'setWeiqiHistory',
    value: function setWeiqiHistory(val) {
      this._model.weiqiHistory = JSON.stringify(val);
      return this;
    }
  }, {
    key: 'getWeiqiBoard',
    value: function getWeiqiBoard() {
      return JSON.parse(this._model.get('weiqiBoard'));
    }
  }, {
    key: 'setWeiqiBoard',
    value: function setWeiqiBoard(val) {
      this._model.weiqiBoard = JSON.stringify(val);
      return this;
    }
  }, {
    key: 'getWeiqiBoardSize',
    value: function getWeiqiBoardSize() {
      return this._model.get('weiqiBoardSize');
    }
  }, {
    key: 'setWeiqiBoardSize',
    value: function setWeiqiBoardSize(val) {
      this._model.weiqiBoardSize = val;
      return this;
    }
  }, {
    key: 'getStonesHistory',
    value: function getStonesHistory() {
      return JSON.parse(this._model.get('stonesHistory'));
    }
  }, {
    key: 'setStonesHistory',
    value: function setStonesHistory(val) {
      this._model.stonesHistory = JSON.stringify(val);
      return this;
    }
  }, {
    key: 'getBoardImageURL',
    value: function getBoardImageURL() {
      return this._model.get('boardImageURL');
    }
  }, {
    key: 'setBoardImageURL',
    value: function setBoardImageURL(val) {
      this._model.boardImageURL = val;
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
    key: 'getKomi',
    value: function getKomi() {
      return this._model.get('komi');
    }
  }, {
    key: 'setKomi',
    value: function setKomi(val) {
      this._model.komi = val;
      return this;
    }
  }, {
    key: 'getWinsBy',
    value: function getWinsBy() {
      return this._model.get('winsBy');
    }
  }, {
    key: 'setWinsBy',
    value: function setWinsBy(val) {
      this._model.winsBy = val;
      return this;
    }
  }, {
    key: 'getHandicap',
    value: function getHandicap() {
      return this._model.get('handicap');
    }
  }, {
    key: 'setHandicap',
    value: function setHandicap(val) {
      this._model.handicap = val;
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
    key: 'getWhiteUserID',
    value: function getWhiteUserID() {
      return this._model.get('whiteUserID');
    }
  }, {
    key: 'setWhiteUserID',
    value: function setWhiteUserID(val) {
      this._model.whiteUserID = val;
      return this;
    }
  }, {
    key: 'getBlackUserID',
    value: function getBlackUserID() {
      return this._model.get('blackUserID');
    }
  }, {
    key: 'setBlackUserID',
    value: function setBlackUserID(val) {
      this._model.blackUserID = val;
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
        isBlackTurn: this.getIsBlackTurn(),
        weiqiConsecutivePasses: this.getWeiqiConsecutivePasses(),
        weiqiHistory: this.getWeiqiHistory(),
        weiqiBoard: this.getWeiqiBoard(),
        weiqiBoardSize: this.getWeiqiBoardSize(),
        stonesHistory: this.getStonesHistory(),
        boardImageURL: this.getBoardImageURL(),
        status: this.getStatus(),
        komi: this.getKomi(),
        winsBy: this.getWinsBy(),
        handicap: this.getHandicap(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt(),
        whiteUserID: this.getWhiteUserID(),
        blackUserID: this.getBlackUserID()
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
                return _context.abrupt('return', _schema2.default.Game.findAll(query).then(function (models) {
                  return models.map(function (m) {
                    return new _this(m);
                  });
                }).catch(function (err) {
                  error('Error loading Game with query ' + JSON.stringify(query, null, 2), err);
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

                (0, _invariant2.default)(t, 'Game is null for id ' + id);
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
                return _context4.abrupt('return', _schema2.default.Game.findOne(query).then(function (model) {
                  return model ? new _this2(model) : null;
                }).catch(function (err) {
                  error('Error loading Game with query ' + JSON.stringify(query, null, 2), err);
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
    static async genCreate(params: GameAttributes): Promise<?this> {0
      return models.Game.create(params).then((model: SequelizeModel) => {
        return new this(model);
      });
    }
    */

  }]);

  return GameBase;
}();

module.exports = GameBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9iYXNlL0dhbWVCYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7OztBQUVBOzs7O0FBRUE7Ozs7Ozs7O0lBb0JNLFE7QUFFSixvQkFBWSxLQUFaLEVBQXlDO0FBQUE7O0FBQ3ZDLDZCQUFVLEtBQVYsRUFBaUIseUJBQWpCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsS0FBZDtBQUNEOzs7OzRCQUVlO0FBQ2QsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLElBQWhCLENBQVA7QUFDRDs7O3FDQUV5QjtBQUN4QixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsYUFBaEIsQ0FBUDtBQUNEOzs7bUNBRWMsRyxFQUFxQjtBQUNsQyxXQUFLLE1BQUwsQ0FBWSxXQUFaLEdBQTBCLEdBQTFCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OztnREFFbUM7QUFDbEMsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLHdCQUFoQixDQUFQO0FBQ0Q7Ozs4Q0FFeUIsRyxFQUFvQjtBQUM1QyxXQUFLLE1BQUwsQ0FBWSxzQkFBWixHQUFxQyxHQUFyQztBQUNBLGFBQU8sSUFBUDtBQUNEOzs7c0NBRXlCO0FBQ3hCLGFBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixjQUFoQixDQUFYLENBQVA7QUFDRDs7O29DQUVlLEcsRUFBb0I7QUFDbEMsV0FBSyxNQUFMLENBQVksWUFBWixHQUEyQixLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQTNCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OztvQ0FFdUI7QUFDdEIsYUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFlBQWhCLENBQVgsQ0FBUDtBQUNEOzs7a0NBRWEsRyxFQUFvQjtBQUNoQyxXQUFLLE1BQUwsQ0FBWSxVQUFaLEdBQXlCLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBekI7QUFDQSxhQUFPLElBQVA7QUFD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RCxFQUE0QjtBQUNqRSx5QkFBTyxRQUNILFdBQVMsS0FBVCxDQURHLEdBRUgsSUFGSjtBQUdELGlCQUpNLEVBSUosS0FKSSxDQUlFLFVBQUMsR0FBRCxFQUFTO0FBQ2hCLDJEQUF1QyxLQUFLLFNBQUwsQ0FBZSxLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQXZDLEVBQXlFLEdBQXpFO0FBQ0QsaUJBTk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQlgsT0FBTyxPQUFQLEdBQWlCLFFBQWpCIiwiZmlsZSI6IkdhbWVCYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXV0by1nZW5lcmF0ZWQtc2lnbmF0dXJlPGQwZTBkYzM3MWVlNzBlYjQyYWZmYTdkMTVlYzQ3NzBkPlxuLy8gQGZsb3dcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG1vZGVscyBmcm9tICcuLi9zY2hlbWEnO1xuaW1wb3J0IHR5cGUge1NlcXVlbGl6ZU1vZGVsfSBmcm9tICcuLi9zY2hlbWEnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuXG5leHBvcnQgdHlwZSBHYW1lQXR0cmlidXRlcyA9IHtcbiAgaXNCbGFja1R1cm4/OiBib29sZWFuLFxuICB3ZWlxaUNvbnNlY3V0aXZlUGFzc2VzPzogbnVtYmVyLFxuICB3ZWlxaUhpc3Rvcnk/OiBPYmplY3QsXG4gIHdlaXFpQm9hcmQ/OiBPYmplY3QsXG4gIHdlaXFpQm9hcmRTaXplPzogQm9hcmRTaXplLFxuICBzdG9uZXNIaXN0b3J5PzogQXJyYXk8U3RvbmVNb3ZlPixcbiAgYm9hcmRJbWFnZVVSTD86IHN0cmluZyxcbiAgc3RhdHVzPzogR2FtZVN0YXR1c1R5cGUsXG4gIGtvbWk/OiBudW1iZXIsXG4gIHdpbnNCeT86IG51bWJlcixcbiAgaGFuZGljYXA/OiBudW1iZXIsXG4gIGNyZWF0ZWRBdD86IERhdGUsXG4gIHVwZGF0ZWRBdD86IERhdGUsXG4gIHdoaXRlVXNlcklEPzogbnVtYmVyLFxuICBibGFja1VzZXJJRD86IG51bWJlcixcbn07XG5cbmNsYXNzIEdhbWVCYXNlIHtcbiAgX21vZGVsOiBTZXF1ZWxpemVNb2RlbDtcbiAgY29uc3RydWN0b3IobW9kZWw6IFNlcXVlbGl6ZU1vZGVsKTogdm9pZCB7XG4gICAgaW52YXJpYW50KG1vZGVsLCAnbW9kZWwgaGFzIHRvIGJlIGRlZmluZWQnKTtcbiAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xuICB9XG5cbiAgZ2V0SUQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdpZCcpO1xuICB9XG5cbiAgZ2V0SXNCbGFja1R1cm4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnaXNCbGFja1R1cm4nKTtcbiAgfVxuXG4gIHNldElzQmxhY2tUdXJuKHZhbDogP2Jvb2xlYW4pOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5pc0JsYWNrVHVybiA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFdlaXFpQ29uc2VjdXRpdmVQYXNzZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCd3ZWlxaUNvbnNlY3V0aXZlUGFzc2VzJyk7XG4gIH1cblxuICBzZXRXZWlxaUNvbnNlY3V0aXZlUGFzc2VzKHZhbDogP251bWJlcik6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLndlaXFpQ29uc2VjdXRpdmVQYXNzZXMgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRXZWlxaUhpc3RvcnkoKTogT2JqZWN0IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLl9tb2RlbC5nZXQoJ3dlaXFpSGlzdG9yeScpKTtcbiAgfVxuXG4gIHNldFdlaXFpSGlzdG9yeSh2YWw6ID9PYmplY3QpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC53ZWlxaUhpc3RvcnkgPSBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0V2VpcWlCb2FyZCgpOiBPYmplY3Qge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuX21vZGVsLmdldCgnd2VpcWlCb2FyZCcpKTtcbiAgfVxuXG4gIHNldFdlaXFpQm9hcmQodmFsOiA/T2JqZWN0KTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwud2VpcWlCb2FyZCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRXZWlxaUJvYXJkU2l6ZSgpOiBCb2FyZFNpemUge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3dlaXFpQm9hcmRTaXplJyk7XG4gIH1cblxuICBzZXRXZWlxaUJvYXJkU2l6ZSh2YWw6ID9Cb2FyZFNpemUpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC53ZWlxaUJvYXJkU2l6ZSA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFN0b25lc0hpc3RvcnkoKTogQXJyYXk8U3RvbmVNb3ZlPiB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5fbW9kZWwuZ2V0KCdzdG9uZXNIaXN0b3J5JykpO1xuICB9XG5cbiAgc2V0U3RvbmVzSGlzdG9yeSh2YWw6ID9BcnJheTxTdG9uZU1vdmU+KTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuc3RvbmVzSGlzdG9yeSA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRCb2FyZEltYWdlVVJMKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnYm9hcmRJbWFnZVVSTCcpO1xuICB9XG5cbiAgc2V0Qm9hcmRJbWFnZVVSTCh2YWw6ID9zdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5ib2FyZEltYWdlVVJMID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0U3RhdHVzKCk6IEdhbWVTdGF0dXNUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdzdGF0dXMnKTtcbiAgfVxuXG4gIHNldFN0YXR1cyh2YWw6ID9HYW1lU3RhdHVzVHlwZSk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnN0YXR1cyA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldEtvbWkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdrb21pJyk7XG4gIH1cblxuICBzZXRLb21pKHZhbDogP251bWJlcik6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLmtvbWkgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRXaW5zQnkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCd3aW5zQnknKTtcbiAgfVxuXG4gIHNldFdpbnNCeSh2YWw6ID9udW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC53aW5zQnkgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRIYW5kaWNhcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ2hhbmRpY2FwJyk7XG4gIH1cblxuICBzZXRIYW5kaWNhcCh2YWw6ID9udW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5oYW5kaWNhcCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldENyZWF0ZWRBdCgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdjcmVhdGVkQXQnKTtcbiAgfVxuXG4gIHNldENyZWF0ZWRBdCh2YWw6ID9EYXRlKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuY3JlYXRlZEF0ID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0VXBkYXRlZEF0KCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3VwZGF0ZWRBdCcpO1xuICB9XG5cbiAgc2V0VXBkYXRlZEF0KHZhbDogP0RhdGUpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC51cGRhdGVkQXQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRXaGl0ZVVzZXJJRCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3doaXRlVXNlcklEJyk7XG4gIH1cblxuICBzZXRXaGl0ZVVzZXJJRCh2YWw6ID9udW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC53aGl0ZVVzZXJJRCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldEJsYWNrVXNlcklEKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnYmxhY2tVc2VySUQnKTtcbiAgfVxuXG4gIHNldEJsYWNrVXNlcklEKHZhbDogP251bWJlcik6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLmJsYWNrVXNlcklEID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2VuU2F2ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc2F2ZSgpO1xuICB9XG4gIGdlbkRlbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZGVzdHJveSgpO1xuICB9XG5cbiAgLy8gYmFzZSBoZWxwZXJcbiAgZ2V0RGF0YSgpOiBHYW1lQXR0cmlidXRlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmdldElEKCksXG4gICAgICBpc0JsYWNrVHVybjogdGhpcy5nZXRJc0JsYWNrVHVybigpLFxuICAgICAgd2VpcWlDb25zZWN1dGl2ZVBhc3NlczogdGhpcy5nZXRXZWlxaUNvbnNlY3V0aXZlUGFzc2VzKCksXG4gICAgICB3ZWlxaUhpc3Rvcnk6IHRoaXMuZ2V0V2VpcWlIaXN0b3J5KCksXG4gICAgICB3ZWlxaUJvYXJkOiB0aGlzLmdldFdlaXFpQm9hcmQoKSxcbiAgICAgIHdlaXFpQm9hcmRTaXplOiB0aGlzLmdldFdlaXFpQm9hcmRTaXplKCksXG4gICAgICBzdG9uZXNIaXN0b3J5OiB0aGlzLmdldFN0b25lc0hpc3RvcnkoKSxcbiAgICAgIGJvYXJkSW1hZ2VVUkw6IHRoaXMuZ2V0Qm9hcmRJbWFnZVVSTCgpLFxuICAgICAgc3RhdHVzOiB0aGlzLmdldFN0YXR1cygpLFxuICAgICAga29taTogdGhpcy5nZXRLb21pKCksXG4gICAgICB3aW5zQnk6IHRoaXMuZ2V0V2luc0J5KCksXG4gICAgICBoYW5kaWNhcDogdGhpcy5nZXRIYW5kaWNhcCgpLFxuICAgICAgY3JlYXRlZEF0OiB0aGlzLmdldENyZWF0ZWRBdCgpLFxuICAgICAgdXBkYXRlZEF0OiB0aGlzLmdldFVwZGF0ZWRBdCgpLFxuICAgICAgd2hpdGVVc2VySUQ6IHRoaXMuZ2V0V2hpdGVVc2VySUQoKSxcbiAgICAgIGJsYWNrVXNlcklEOiB0aGlzLmdldEJsYWNrVXNlcklEKCksXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBfZ2VuQWxsQnkocXVlcnk6IE9iamVjdCk6IFByb21pc2U8QXJyYXk8dGhpcz4+IHtcbiAgICByZXR1cm4gbW9kZWxzLkdhbWUuZmluZEFsbChxdWVyeSlcbiAgICAgIC50aGVuKChtb2RlbHM6IEFycmF5PFNlcXVlbGl6ZU1vZGVsPikgPT4ge1xuICAgICAgICByZXR1cm4gbW9kZWxzLm1hcCgobSkgPT4gbmV3IHRoaXMobSkpO1xuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgZXJyb3IoYEVycm9yIGxvYWRpbmcgR2FtZSB3aXRoIHF1ZXJ5ICR7SlNPTi5zdHJpbmdpZnkocXVlcnksIG51bGwsIDIpfWAsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuRW5mb3JjZShpZDogbnVtYmVyKTogUHJvbWlzZTx0aGlzPiB7XG4gICAgY29uc3QgdCA9IGF3YWl0IHRoaXMuZ2VuTnVsbGFibGUoaWQpO1xuICAgIGludmFyaWFudCh0LCBgR2FtZSBpcyBudWxsIGZvciBpZCAke2lkfWApO1xuICAgIHJldHVybiB0O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbk51bGxhYmxlKGlkOiBudW1iZXIpOiBQcm9taXNlPD90aGlzPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2dlbkJ5KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgX2dlbkJ5KHF1ZXJ5OiBPYmplY3QpOiBQcm9taXNlPD90aGlzPiB7XG4gICAgcmV0dXJuIG1vZGVscy5HYW1lLmZpbmRPbmUocXVlcnkpLnRoZW4oKG1vZGVsOiA/U2VxdWVsaXplTW9kZWwpID0+IHtcbiAgICAgIHJldHVybiBtb2RlbFxuICAgICAgICA/IG5ldyB0aGlzKG1vZGVsKVxuICAgICAgICA6IG51bGw7XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgZXJyb3IoYEVycm9yIGxvYWRpbmcgR2FtZSB3aXRoIHF1ZXJ5ICR7SlNPTi5zdHJpbmdpZnkocXVlcnksIG51bGwsIDIpfWAsIGVycik7XG4gICAgfSk7XG4gIH1cbi8qXG5zdGF0aWMgYXN5bmMgZ2VuQ3JlYXRlKHBhcmFtczogR2FtZUF0dHJpYnV0ZXMpOiBQcm9taXNlPD90aGlzPiB7MFxuICByZXR1cm4gbW9kZWxzLkdhbWUuY3JlYXRlKHBhcmFtcykudGhlbigobW9kZWw6IFNlcXVlbGl6ZU1vZGVsKSA9PiB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG1vZGVsKTtcbiAgfSk7XG59XG4qL1xufVxubW9kdWxlLmV4cG9ydHMgPSBHYW1lQmFzZTtcbiJdfQ==
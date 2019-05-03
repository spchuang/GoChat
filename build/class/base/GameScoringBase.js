// auto-generated-signature<a71b976ee17c8eb78aaf74dfe348c9be>

'use strict';

var _bluebird = require('bluebird');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameScoringBase = function () {
  function GameScoringBase(model) {
    _classCallCheck(this, GameScoringBase);

    (0, _invariant2.default)(model, 'model has to be defined');
    this._model = model;
  }

  _createClass(GameScoringBase, [{
    key: 'getID',
    value: function getID() {
      return this._model.get('id');
    }
  }, {
    key: 'getBlackTerritory',
    value: function getBlackTerritory() {
      return this._model.get('blackTerritory');
    }
  }, {
    key: 'setBlackTerritory',
    value: function setBlackTerritory(val) {
      this._model.blackTerritory = val;
      return this;
    }
  }, {
    key: 'getBlackCapture',
    value: function getBlackCapture() {
      return this._model.get('blackCapture');
    }
  }, {
    key: 'setBlackCapture',
    value: function setBlackCapture(val) {
      this._model.blackCapture = val;
      return this;
    }
  }, {
    key: 'getWhiteTerritory',
    value: function getWhiteTerritory() {
      return this._model.get('whiteTerritory');
    }
  }, {
    key: 'setWhiteTerritory',
    value: function setWhiteTerritory(val) {
      this._model.whiteTerritory = val;
      return this;
    }
  }, {
    key: 'getWhiteCapture',
    value: function getWhiteCapture() {
      return this._model.get('whiteCapture');
    }
  }, {
    key: 'setWhiteCapture',
    value: function setWhiteCapture(val) {
      this._model.whiteCapture = val;
      return this;
    }
  }, {
    key: 'getBoard',
    value: function getBoard() {
      return JSON.parse(this._model.get('board'));
    }
  }, {
    key: 'setBoard',
    value: function setBoard(val) {
      this._model.board = JSON.stringify(val);
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
    key: 'getGameID',
    value: function getGameID() {
      return this._model.get('gameID');
    }
  }, {
    key: 'setGameID',
    value: function setGameID(val) {
      this._model.gameID = val;
      return this;
    }
  }, {
    key: 'getCreatorID',
    value: function getCreatorID() {
      return this._model.get('creatorID');
    }
  }, {
    key: 'setCreatorID',
    value: function setCreatorID(val) {
      this._model.creatorID = val;
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
        blackTerritory: this.getBlackTerritory(),
        blackCapture: this.getBlackCapture(),
        whiteTerritory: this.getWhiteTerritory(),
        whiteCapture: this.getWhiteCapture(),
        board: this.getBoard(),
        status: this.getStatus(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt(),
        gameID: this.getGameID(),
        creatorID: this.getCreatorID()
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
                return _context.abrupt('return', _schema2.default.GameScoring.findAll(query).then(function (models) {
                  return models.map(function (m) {
                    return new _this(m);
                  });
                }).catch(function (err) {
                  error('Error loading GameScoring with query ' + JSON.stringify(query, null, 2), err);
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

                (0, _invariant2.default)(t, 'GameScoring is null for id ' + id);
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
                return _context4.abrupt('return', _schema2.default.GameScoring.findOne(query).then(function (model) {
                  return model ? new _this2(model) : null;
                }).catch(function (err) {
                  error('Error loading GameScoring with query ' + JSON.stringify(query, null, 2), err);
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
    static async genCreate(params: GameScoringAttributes): Promise<?this> {0
      return models.GameScoring.create(params).then((model: SequelizeModel) => {
        return new this(model);
      });
    }
    */

  }]);

  return GameScoringBase;
}();

module.exports = GameScoringBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9iYXNlL0dhbWVTY29yaW5nQmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7OztJQWVNLGU7QUFFSiwyQkFBWSxLQUFaLEVBQXlDO0FBQUE7O0FBQ3ZDLDZCQUFVLEtBQVYsRUFBaUIseUJBQWpCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsS0FBZDtBQUNEOzs7OzRCQUVlO0FBQ2QsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLElBQWhCLENBQVA7QUFDRDs7O3dDQUUyQjtBQUMxQixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsZ0JBQWhCLENBQVA7QUFDRDs7O3NDQUVpQixHLEVBQW9CO0FBQ3BDLFdBQUssTUFBTCxDQUFZLGNBQVosR0FBNkIsR0FBN0I7QUFDQSxhQUFPLElBQVA7QUFDRDs7O3NDQUV5QjtBQUN4QixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsY0FBaEIsQ0FBUDtBQUNEOzs7b0NBRWUsRyxFQUFvQjtBQUNsQyxXQUFLLE1BQUwsQ0FBWSxZQUFaLEdBQTJCLEdBQTNCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozt3Q0FFMkI7QUFDMUIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGdCQUFoQixDQUFQO0FBQ0Q7OztzQ0FFaUIsRyxFQUFvQjtBQUNwQyxXQUFLLE1BQUwsQ0FBWSxjQUFaLEdBQTZCLEdBQTdCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OztzQ0FFeUI7QUFDeEIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGNBQWhCLENBQVA7QUFDRDs7O29DQUVlLEcsRUFBb0I7QUFDbEMsV0FBSyxNQUFMLENBQVksWUFBWixHQUEyQixHQUEzQjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7K0JBRWtCO0FBQ2pCLGFBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixPQUFoQixDQUFY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dUMsVUFBQyxLQUFELEVBQTRCO0FBQ3hFLHlCQUFPLFFBQ0gsV0FBUyxLQUFULENBREcsR0FFSCxJQUZKO0FBR0QsaUJBSk0sRUFJSixLQUpJLENBSUUsVUFBQyxHQUFELEVBQVM7QUFDaEIsa0VBQThDLEtBQUssU0FBTCxDQUFlLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBOUMsRUFBZ0YsR0FBaEY7QUFDRCxpQkFOTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCWCxPQUFPLE9BQVAsR0FBaUIsZUFBakIiLCJmaWxlIjoiR2FtZVNjb3JpbmdCYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXV0by1nZW5lcmF0ZWQtc2lnbmF0dXJlPGE3MWI5NzZlZTE3YzhlYjc4YWFmNzRkZmUzNDhjOWJlPlxuLy8gQGZsb3dcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG1vZGVscyBmcm9tICcuLi9zY2hlbWEnO1xuaW1wb3J0IHR5cGUge1NlcXVlbGl6ZU1vZGVsfSBmcm9tICcuLi9zY2hlbWEnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuXG5leHBvcnQgdHlwZSBHYW1lU2NvcmluZ0F0dHJpYnV0ZXMgPSB7XG4gIGJsYWNrVGVycml0b3J5PzogbnVtYmVyLFxuICBibGFja0NhcHR1cmU/OiBudW1iZXIsXG4gIHdoaXRlVGVycml0b3J5PzogbnVtYmVyLFxuICB3aGl0ZUNhcHR1cmU/OiBudW1iZXIsXG4gIGJvYXJkPzogT2JqZWN0LFxuICBzdGF0dXM/OiBHYW1lU2NvcmluZ1JlcXVlc3RTdGF0dXNUeXBlLFxuICBjcmVhdGVkQXQ/OiBEYXRlLFxuICB1cGRhdGVkQXQ/OiBEYXRlLFxuICBnYW1lSUQ/OiBudW1iZXIsXG4gIGNyZWF0b3JJRD86IG51bWJlcixcbn07XG5cbmNsYXNzIEdhbWVTY29yaW5nQmFzZSB7XG4gIF9tb2RlbDogU2VxdWVsaXplTW9kZWw7XG4gIGNvbnN0cnVjdG9yKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IHZvaWQge1xuICAgIGludmFyaWFudChtb2RlbCwgJ21vZGVsIGhhcyB0byBiZSBkZWZpbmVkJyk7XG4gICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgfVxuXG4gIGdldElEKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnaWQnKTtcbiAgfVxuXG4gIGdldEJsYWNrVGVycml0b3J5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnYmxhY2tUZXJyaXRvcnknKTtcbiAgfVxuXG4gIHNldEJsYWNrVGVycml0b3J5KHZhbDogP251bWJlcik6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLmJsYWNrVGVycml0b3J5ID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0QmxhY2tDYXB0dXJlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnYmxhY2tDYXB0dXJlJyk7XG4gIH1cblxuICBzZXRCbGFja0NhcHR1cmUodmFsOiA/bnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuYmxhY2tDYXB0dXJlID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0V2hpdGVUZXJyaXRvcnkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCd3aGl0ZVRlcnJpdG9yeScpO1xuICB9XG5cbiAgc2V0V2hpdGVUZXJyaXRvcnkodmFsOiA/bnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwud2hpdGVUZXJyaXRvcnkgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRXaGl0ZUNhcHR1cmUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCd3aGl0ZUNhcHR1cmUnKTtcbiAgfVxuXG4gIHNldFdoaXRlQ2FwdHVyZSh2YWw6ID9udW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC53aGl0ZUNhcHR1cmUgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRCb2FyZCgpOiBPYmplY3Qge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuX21vZGVsLmdldCgnYm9hcmQnKSk7XG4gIH1cblxuICBzZXRCb2FyZCh2YWw6ID9PYmplY3QpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5ib2FyZCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRTdGF0dXMoKTogR2FtZVNjb3JpbmdSZXF1ZXN0U3RhdHVzVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnc3RhdHVzJyk7XG4gIH1cblxuICBzZXRTdGF0dXModmFsOiA/R2FtZVNjb3JpbmdSZXF1ZXN0U3RhdHVzVHlwZSk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnN0YXR1cyA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldENyZWF0ZWRBdCgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdjcmVhdGVkQXQnKTtcbiAgfVxuXG4gIHNldENyZWF0ZWRBdCh2YWw6ID9EYXRlKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuY3JlYXRlZEF0ID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0VXBkYXRlZEF0KCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ3VwZGF0ZWRBdCcpO1xuICB9XG5cbiAgc2V0VXBkYXRlZEF0KHZhbDogP0RhdGUpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC51cGRhdGVkQXQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRHYW1lSUQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdnYW1lSUQnKTtcbiAgfVxuXG4gIHNldEdhbWVJRCh2YWw6ID9udW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5nYW1lSUQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRDcmVhdG9ySUQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdjcmVhdG9ySUQnKTtcbiAgfVxuXG4gIHNldENyZWF0b3JJRCh2YWw6ID9udW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5jcmVhdG9ySUQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZW5TYXZlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zYXZlKCk7XG4gIH1cbiAgZ2VuRGVsZXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBiYXNlIGhlbHBlclxuICBnZXREYXRhKCk6IEdhbWVTY29yaW5nQXR0cmlidXRlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmdldElEKCksXG4gICAgICBibGFja1RlcnJpdG9yeTogdGhpcy5nZXRCbGFja1RlcnJpdG9yeSgpLFxuICAgICAgYmxhY2tDYXB0dXJlOiB0aGlzLmdldEJsYWNrQ2FwdHVyZSgpLFxuICAgICAgd2hpdGVUZXJyaXRvcnk6IHRoaXMuZ2V0V2hpdGVUZXJyaXRvcnkoKSxcbiAgICAgIHdoaXRlQ2FwdHVyZTogdGhpcy5nZXRXaGl0ZUNhcHR1cmUoKSxcbiAgICAgIGJvYXJkOiB0aGlzLmdldEJvYXJkKCksXG4gICAgICBzdGF0dXM6IHRoaXMuZ2V0U3RhdHVzKCksXG4gICAgICBjcmVhdGVkQXQ6IHRoaXMuZ2V0Q3JlYXRlZEF0KCksXG4gICAgICB1cGRhdGVkQXQ6IHRoaXMuZ2V0VXBkYXRlZEF0KCksXG4gICAgICBnYW1lSUQ6IHRoaXMuZ2V0R2FtZUlEKCksXG4gICAgICBjcmVhdG9ySUQ6IHRoaXMuZ2V0Q3JlYXRvcklEKCksXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBfZ2VuQWxsQnkocXVlcnk6IE9iamVjdCk6IFByb21pc2U8QXJyYXk8dGhpcz4+IHtcbiAgICByZXR1cm4gbW9kZWxzLkdhbWVTY29yaW5nLmZpbmRBbGwocXVlcnkpXG4gICAgICAudGhlbigobW9kZWxzOiBBcnJheTxTZXF1ZWxpemVNb2RlbD4pID0+IHtcbiAgICAgICAgcmV0dXJuIG1vZGVscy5tYXAoKG0pID0+IG5ldyB0aGlzKG0pKTtcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGVycm9yKGBFcnJvciBsb2FkaW5nIEdhbWVTY29yaW5nIHdpdGggcXVlcnkgJHtKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMil9YCwgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5FbmZvcmNlKGlkOiBudW1iZXIpOiBQcm9taXNlPHRoaXM+IHtcbiAgICBjb25zdCB0ID0gYXdhaXQgdGhpcy5nZW5OdWxsYWJsZShpZCk7XG4gICAgaW52YXJpYW50KHQsIGBHYW1lU2NvcmluZyBpcyBudWxsIGZvciBpZCAke2lkfWApO1xuICAgIHJldHVybiB0O1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbk51bGxhYmxlKGlkOiBudW1iZXIpOiBQcm9taXNlPD90aGlzPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2dlbkJ5KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgX2dlbkJ5KHF1ZXJ5OiBPYmplY3QpOiBQcm9taXNlPD90aGlzPiB7XG4gICAgcmV0dXJuIG1vZGVscy5HYW1lU2NvcmluZy5maW5kT25lKHF1ZXJ5KS50aGVuKChtb2RlbDogP1NlcXVlbGl6ZU1vZGVsKSA9PiB7XG4gICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgPyBuZXcgdGhpcyhtb2RlbClcbiAgICAgICAgOiBudWxsO1xuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGVycm9yKGBFcnJvciBsb2FkaW5nIEdhbWVTY29yaW5nIHdpdGggcXVlcnkgJHtKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMil9YCwgZXJyKTtcbiAgICB9KTtcbiAgfVxuLypcbnN0YXRpYyBhc3luYyBnZW5DcmVhdGUocGFyYW1zOiBHYW1lU2NvcmluZ0F0dHJpYnV0ZXMpOiBQcm9taXNlPD90aGlzPiB7MFxuICByZXR1cm4gbW9kZWxzLkdhbWVTY29yaW5nLmNyZWF0ZShwYXJhbXMpLnRoZW4oKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCkgPT4ge1xuICAgIHJldHVybiBuZXcgdGhpcyhtb2RlbCk7XG4gIH0pO1xufVxuKi9cbn1cbm1vZHVsZS5leHBvcnRzID0gR2FtZVNjb3JpbmdCYXNlO1xuIl19
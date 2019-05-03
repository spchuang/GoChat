// auto-generated-signature<1df244c722fbd7e873fbf93fdee1aebb>

'use strict';

var _bluebird = require('bluebird');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameRoomBase = function () {
  function GameRoomBase(model) {
    _classCallCheck(this, GameRoomBase);

    (0, _invariant2.default)(model, 'model has to be defined');
    this._model = model;
  }

  _createClass(GameRoomBase, [{
    key: 'getID',
    value: function getID() {
      return this._model.get('id');
    }
  }, {
    key: 'getCode',
    value: function getCode() {
      return this._model.get('code');
    }
  }, {
    key: 'setCode',
    value: function setCode(val) {
      this._model.code = val;
      return this;
    }
  }, {
    key: 'getBoardSize',
    value: function getBoardSize() {
      return this._model.get('boardSize');
    }
  }, {
    key: 'setBoardSize',
    value: function setBoardSize(val) {
      this._model.boardSize = val;
      return this;
    }
  }, {
    key: 'getIsPrivate',
    value: function getIsPrivate() {
      return this._model.get('isPrivate');
    }
  }, {
    key: 'setIsPrivate',
    value: function setIsPrivate(val) {
      this._model.isPrivate = val;
      return this;
    }
  }, {
    key: 'getIsOwnerBlack',
    value: function getIsOwnerBlack() {
      return this._model.get('isOwnerBlack');
    }
  }, {
    key: 'setIsOwnerBlack',
    value: function setIsOwnerBlack(val) {
      this._model.isOwnerBlack = val;
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
    key: 'getOwnerID',
    value: function getOwnerID() {
      return this._model.get('ownerID');
    }
  }, {
    key: 'setOwnerID',
    value: function setOwnerID(val) {
      this._model.ownerID = val;
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
        code: this.getCode(),
        boardSize: this.getBoardSize(),
        isPrivate: this.getIsPrivate(),
        isOwnerBlack: this.getIsOwnerBlack(),
        komi: this.getKomi(),
        handicap: this.getHandicap(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt(),
        ownerID: this.getOwnerID()
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
                return _context.abrupt('return', _schema2.default.GameRoom.findAll(query).then(function (models) {
                  return models.map(function (m) {
                    return new _this(m);
                  });
                }).catch(function (err) {
                  error('Error loading GameRoom with query ' + JSON.stringify(query, null, 2), err);
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

                (0, _invariant2.default)(t, 'GameRoom is null for id ' + id);
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
                return _context4.abrupt('return', _schema2.default.GameRoom.findOne(query).then(function (model) {
                  return model ? new _this2(model) : null;
                }).catch(function (err) {
                  error('Error loading GameRoom with query ' + JSON.stringify(query, null, 2), err);
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
    static async genCreate(params: GameRoomAttributes): Promise<?this> {0
      return models.GameRoom.create(params).then((model: SequelizeModel) => {
        return new this(model);
      });
    }
    */

  }]);

  return GameRoomBase;
}();

module.exports = GameRoomBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzcy9iYXNlL0dhbWVSb29tQmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7OztJQWNNLFk7QUFFSix3QkFBWSxLQUFaLEVBQXlDO0FBQUE7O0FBQ3ZDLDZCQUFVLEtBQVYsRUFBaUIseUJBQWpCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsS0FBZDtBQUNEOzs7OzRCQUVlO0FBQ2QsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLElBQWhCLENBQVA7QUFDRDs7OzhCQUVpQjtBQUNoQixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsTUFBaEIsQ0FBUDtBQUNEOzs7NEJBRU8sRyxFQUFvQjtBQUMxQixXQUFLLE1BQUwsQ0FBWSxJQUFaLEdBQW1CLEdBQW5CO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OzttQ0FFeUI7QUFDeEIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFdBQWhCLENBQVA7QUFDRDs7O2lDQUVZLEcsRUFBdUI7QUFDbEMsV0FBSyxNQUFMLENBQVksU0FBWixHQUF3QixHQUF4QjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7bUNBRXVCO0FBQ3RCLGFBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixXQUFoQixDQUFQO0FBQ0Q7OztpQ0FFWSxHLEVBQXFCO0FBQ2hDLFdBQUssTUFBTCxDQUFZLFNBQVosR0FBd0IsR0FBeEI7QUFDQSxhQUFPLElBQVA7QUFDRDs7O3NDQUUwQjtBQUN6QixhQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsY0FBaEIsQ0FBUDtBQUNEOzs7b0NBRWUsRyxFQUFxQjtBQUNuQyxXQUFLLE1BQUwsQ0FBWSxZQUFaLEdBQTJCLEdBQTNCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozs4QkFFaUI7QUFDaEIsYUFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLE1BQWhCLENBQVA7QUFDRDs7OzRCQUVPLEcsRUFBb0I7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Ozs7O0FBZ0JYLE9BQU8sT0FBUCxHQUFpQixZQUFqQiIsImZpbGUiOiJHYW1lUm9vbUJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhdXRvLWdlbmVyYXRlZC1zaWduYXR1cmU8MWRmMjQ0YzcyMmZiZDdlODczZmJmOTNmZGVlMWFlYmI+XG4vLyBAZmxvd1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbW9kZWxzIGZyb20gJy4uL3NjaGVtYSc7XG5pbXBvcnQgdHlwZSB7U2VxdWVsaXplTW9kZWx9IGZyb20gJy4uL3NjaGVtYSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5cbmV4cG9ydCB0eXBlIEdhbWVSb29tQXR0cmlidXRlcyA9IHtcbiAgY29kZT86IHN0cmluZyxcbiAgYm9hcmRTaXplPzogQm9hcmRTaXplLFxuICBpc1ByaXZhdGU/OiBib29sZWFuLFxuICBpc093bmVyQmxhY2s/OiBib29sZWFuLFxuICBrb21pPzogbnVtYmVyLFxuICBoYW5kaWNhcD86IG51bWJlcixcbiAgY3JlYXRlZEF0PzogRGF0ZSxcbiAgdXBkYXRlZEF0PzogRGF0ZSxcbiAgb3duZXJJRD86IG51bWJlcixcbn07XG5cbmNsYXNzIEdhbWVSb29tQmFzZSB7XG4gIF9tb2RlbDogU2VxdWVsaXplTW9kZWw7XG4gIGNvbnN0cnVjdG9yKG1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IHZvaWQge1xuICAgIGludmFyaWFudChtb2RlbCwgJ21vZGVsIGhhcyB0byBiZSBkZWZpbmVkJyk7XG4gICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgfVxuXG4gIGdldElEKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnaWQnKTtcbiAgfVxuXG4gIGdldENvZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdjb2RlJyk7XG4gIH1cblxuICBzZXRDb2RlKHZhbDogP3N0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLmNvZGUgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRCb2FyZFNpemUoKTogQm9hcmRTaXplIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdib2FyZFNpemUnKTtcbiAgfVxuXG4gIHNldEJvYXJkU2l6ZSh2YWw6ID9Cb2FyZFNpemUpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5ib2FyZFNpemUgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRJc1ByaXZhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnaXNQcml2YXRlJyk7XG4gIH1cblxuICBzZXRJc1ByaXZhdGUodmFsOiA/Ym9vbGVhbik6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLmlzUHJpdmF0ZSA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldElzT3duZXJCbGFjaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdpc093bmVyQmxhY2snKTtcbiAgfVxuXG4gIHNldElzT3duZXJCbGFjayh2YWw6ID9ib29sZWFuKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwuaXNPd25lckJsYWNrID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0S29taSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ2tvbWknKTtcbiAgfVxuXG4gIHNldEtvbWkodmFsOiA/bnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5fbW9kZWwua29taSA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldEhhbmRpY2FwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnaGFuZGljYXAnKTtcbiAgfVxuXG4gIHNldEhhbmRpY2FwKHZhbDogP251bWJlcik6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLmhhbmRpY2FwID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0Q3JlYXRlZEF0KCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ2NyZWF0ZWRBdCcpO1xuICB9XG5cbiAgc2V0Q3JlYXRlZEF0KHZhbDogP0RhdGUpOiB0aGlzIHtcbiAgICB0aGlzLl9tb2RlbC5jcmVhdGVkQXQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRVcGRhdGVkQXQoKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgndXBkYXRlZEF0Jyk7XG4gIH1cblxuICBzZXRVcGRhdGVkQXQodmFsOiA/RGF0ZSk6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLnVwZGF0ZWRBdCA9IHZhbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldE93bmVySUQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZ2V0KCdvd25lcklEJyk7XG4gIH1cblxuICBzZXRPd25lcklEKHZhbDogP251bWJlcik6IHRoaXMge1xuICAgIHRoaXMuX21vZGVsLm93bmVySUQgPSB2YWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZW5TYXZlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zYXZlKCk7XG4gIH1cbiAgZ2VuRGVsZXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBiYXNlIGhlbHBlclxuICBnZXREYXRhKCk6IEdhbWVSb29tQXR0cmlidXRlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmdldElEKCksXG4gICAgICBjb2RlOiB0aGlzLmdldENvZGUoKSxcbiAgICAgIGJvYXJkU2l6ZTogdGhpcy5nZXRCb2FyZFNpemUoKSxcbiAgICAgIGlzUHJpdmF0ZTogdGhpcy5nZXRJc1ByaXZhdGUoKSxcbiAgICAgIGlzT3duZXJCbGFjazogdGhpcy5nZXRJc093bmVyQmxhY2soKSxcbiAgICAgIGtvbWk6IHRoaXMuZ2V0S29taSgpLFxuICAgICAgaGFuZGljYXA6IHRoaXMuZ2V0SGFuZGljYXAoKSxcbiAgICAgIGNyZWF0ZWRBdDogdGhpcy5nZXRDcmVhdGVkQXQoKSxcbiAgICAgIHVwZGF0ZWRBdDogdGhpcy5nZXRVcGRhdGVkQXQoKSxcbiAgICAgIG93bmVySUQ6IHRoaXMuZ2V0T3duZXJJRCgpLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgX2dlbkFsbEJ5KHF1ZXJ5OiBPYmplY3QpOiBQcm9taXNlPEFycmF5PHRoaXM+PiB7XG4gICAgcmV0dXJuIG1vZGVscy5HYW1lUm9vbS5maW5kQWxsKHF1ZXJ5KVxuICAgICAgLnRoZW4oKG1vZGVsczogQXJyYXk8U2VxdWVsaXplTW9kZWw+KSA9PiB7XG4gICAgICAgIHJldHVybiBtb2RlbHMubWFwKChtKSA9PiBuZXcgdGhpcyhtKSk7XG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBlcnJvcihgRXJyb3IgbG9hZGluZyBHYW1lUm9vbSB3aXRoIHF1ZXJ5ICR7SlNPTi5zdHJpbmdpZnkocXVlcnksIG51bGwsIDIpfWAsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2VuRW5mb3JjZShpZDogbnVtYmVyKTogUHJvbWlzZTx0aGlzPiB7XG4gICAgY29uc3QgdCA9IGF3YWl0IHRoaXMuZ2VuTnVsbGFibGUoaWQpO1xuICAgIGludmFyaWFudCh0LCBgR2FtZVJvb20gaXMgbnVsbCBmb3IgaWQgJHtpZH1gKTtcbiAgICByZXR1cm4gdDtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5OdWxsYWJsZShpZDogbnVtYmVyKTogUHJvbWlzZTw/dGhpcz4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9nZW5CeSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgaWRcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIF9nZW5CeShxdWVyeTogT2JqZWN0KTogUHJvbWlzZTw/dGhpcz4ge1xuICAgIHJldHVybiBtb2RlbHMuR2FtZVJvb20uZmluZE9uZShxdWVyeSkudGhlbigobW9kZWw6ID9TZXF1ZWxpemVNb2RlbCkgPT4ge1xuICAgICAgcmV0dXJuIG1vZGVsXG4gICAgICAgID8gbmV3IHRoaXMobW9kZWwpXG4gICAgICAgIDogbnVsbDtcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBlcnJvcihgRXJyb3IgbG9hZGluZyBHYW1lUm9vbSB3aXRoIHF1ZXJ5ICR7SlNPTi5zdHJpbmdpZnkocXVlcnksIG51bGwsIDIpfWAsIGVycik7XG4gICAgfSk7XG4gIH1cbi8qXG5zdGF0aWMgYXN5bmMgZ2VuQ3JlYXRlKHBhcmFtczogR2FtZVJvb21BdHRyaWJ1dGVzKTogUHJvbWlzZTw/dGhpcz4gezBcbiAgcmV0dXJuIG1vZGVscy5HYW1lUm9vbS5jcmVhdGUocGFyYW1zKS50aGVuKChtb2RlbDogU2VxdWVsaXplTW9kZWwpID0+IHtcbiAgICByZXR1cm4gbmV3IHRoaXMobW9kZWwpO1xuICB9KTtcbn1cbiovXG59XG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVSb29tQmFzZTtcbiJdfQ==
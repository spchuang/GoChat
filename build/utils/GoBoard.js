
// this should be my own definition of the go board.

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weiqi = require('weiqi');

var _weiqi2 = _interopRequireDefault(_weiqi);

var _Game = require('../class/Game');

var _Game2 = _interopRequireDefault(_Game);

var _WeiqiSerializer = require('./WeiqiSerializer');

var _WeiqiSerializer2 = _interopRequireDefault(_WeiqiSerializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorText = {
  BLACK: 'Black',
  WHITE: 'White'
};

var PASS_MOVE = 'PASS_MOVE';

var GoBoard = function () {
  function GoBoard() {
    _classCallCheck(this, GoBoard);
  }

  _createClass(GoBoard, [{
    key: 'getStoneMoves',
    value: function getStoneMoves() {
      return this._moves;
    }
  }, {
    key: 'getPreviousBoard',
    value: function getPreviousBoard() {
      return this._previousBoard;
    }
  }, {
    key: 'pass',
    value: function pass(color) {
      this._previousBoard = this.getStones();
      this._weiqi = this._weiqi.pass(color);
      this._moves.push(PASS_MOVE);
    }
  }, {
    key: 'play',
    value: function play(color, position) {
      this._previousBoard = this.getStones();
      this._weiqi = this._weiqi.play(color, position);
      this._moves.push(position);
    }
  }, {
    key: 'getIsBlackTurn',
    value: function getIsBlackTurn() {
      return this.getCurrentColor() === _weiqi2.default.BLACK;
    }
  }, {
    key: 'getCurrentColor',
    value: function getCurrentColor() {
      return this._weiqi.currentColor;
    }
  }, {
    key: 'getConsectutivePasses',
    value: function getConsectutivePasses() {
      return this._weiqi.consectutivePasses;
    }
  }, {
    key: 'getStones',
    value: function getStones() {
      return this._weiqi.getBoard().stones;
    }
  }, {
    key: 'getWeiqiBoardHistory',
    value: function getWeiqiBoardHistory() {
      return _WeiqiSerializer2.default.createBoardHistoryObject(this.getPreviousBoard());
    }
  }, {
    key: 'getWeiqiBoard',
    value: function getWeiqiBoard() {
      return _WeiqiSerializer2.default.createBoardObject(this.getStones());
    }
  }], [{
    key: 'createNewBoard',
    value: function createNewBoard(size, handicap) {
      // TODO: need to use serializer help
      var board = new GoBoard();
      board._handicap = handicap ? handicap : 0;
      var weiqiBoard = {
        stones: _WeiqiSerializer2.default.getWeiqiBoardStonesWithHandicap(size, handicap)
      };

      board._weiqi = _WeiqiSerializer2.default.createWeiqiGame(size, { history: [weiqiBoard] }, weiqiBoard, 0, // weiqiConsectutivePasses
      handicap === 0);
      // isBlackTurn
      board._previousBoard = board.getStones();
      board._moves = [];
      return board;
    }
  }, {
    key: 'createFromStones',
    value: function createFromStones(stones, size) {
      var board = GoBoard.createNewBoard(size, 0);

      var color = _weiqi2.default.BLACK;
      stones.forEach(function (stone, index) {
        // for second to last move, get the board state
        if (index === stones.length - 2) {
          board._previousBoard = board.getStones();
        }

        if (stone === PASS_MOVE) {
          board.pass(color);
        } else {
          board.play(color, stone);
        }

        color = color === _weiqi2.default.BLACK ? _weiqi2.default.WHITE : _weiqi2.default.BLACK;
      });
      return board;
    }
  }, {
    key: 'createFromGame',
    value: function createFromGame(game) {
      var board = new GoBoard();
      board._weiqi = _WeiqiSerializer2.default.createWeiqiGame(game.getWeiqiBoardSize(), game.getWeiqiHistory(), game.getWeiqiBoard(), game.getWeiqiConsecutivePasses(), game.getIsBlackTurn());
      board._moves = game.getStonesHistory();
      // a bit hacky
      board._previousBoard = game.getWeiqiHistory().history.length === 0 ? { 'stones': [] } : game.getWeiqiHistory().history[0].stones;

      return board;
    }
  }]);

  return GoBoard;
}();

module.exports = GoBoard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Hb0JvYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sWUFBWTtBQUNoQixTQUFPLE9BRFM7QUFFaEIsU0FBTztBQUZTLENBQWxCOztBQUtBLElBQU0sWUFBWSxXQUFsQjs7SUFFTSxPOzs7Ozs7O29DQWlFOEI7QUFDaEMsYUFBTyxLQUFLLE1BQVo7QUFDRDs7O3VDQUUwQjtBQUN6QixhQUFPLEtBQUssY0FBWjtBQUNEOzs7eUJBRUksSyxFQUFxQjtBQUN4QixXQUFLLGNBQUwsR0FBc0IsS0FBSyxTQUFMLEVBQXRCO0FBQ0EsV0FBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixLQUFqQixDQUFkO0FBQ0EsV0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixTQUFqQjtBQUNEOzs7eUJBRUksSyxFQUFlLFEsRUFBMkI7QUFDN0MsV0FBSyxjQUFMLEdBQXNCLEtBQUssU0FBTCxFQUF0QjtBQUNBLFdBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsS0FBakIsRUFBd0IsUUFBeEIsQ0FBZDtBQUNBLFdBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsUUFBakI7QUFDRDs7O3FDQUV5QjtBQUN4QixhQUFPLEtBQUssZUFBTCxPQUEyQixnQkFBTSxLQUF4QztBQUNEOzs7c0NBRXlCO0FBQ3hCLGFBQU8sS0FBSyxNQUFMLENBQVksWUFBbkI7QUFDRDs7OzRDQUUrQjtBQUM5QixhQUFPLEtBQUssTUFBTCxDQUFZLGtCQUFuQjtBQUNEOzs7Z0NBRW1CO0FBQ2xCLGFBQU8sS0FBSyxNQUFMLENBQVksUUFBWixHQUF1QixNQUE5QjtBQUNEOzs7MkNBRThCO0FBQzdCLGFBQU8sMEJBQWdCLHdCQUFoQixDQUF5QyxLQUFLLGdCQUFMLEVBQXpDLENBQVA7QUFDRDs7O29DQUV1QjtBQUN0QixhQUFPLDBCQUFnQixpQkFBaEIsQ0FBa0MsS0FBSyxTQUFMLEVBQWxDLENBQVA7QUFDRDs7O21DQXJHcUIsSSxFQUFpQixRLEVBQTJCOztBQUVoRSxVQUFNLFFBQVEsSUFBSSxPQUFKLEVBQWQ7QUFDQSxZQUFNLFNBQU4sR0FBa0IsV0FBVyxRQUFYLEdBQXNCLENBQXhDO0FBQ0EsVUFBTSxhQUFhO0FBQ2pCLGdCQUFRLDBCQUFnQiwrQkFBaEIsQ0FBZ0QsSUFBaEQsRUFBc0QsUUFBdEQ7QUFEUyxPQUFuQjs7QUFJQSxZQUFNLE1BQU4sR0FBZSwwQkFBZ0IsZUFBaEIsQ0FDYixJQURhLEVBRWIsRUFBQyxTQUFTLENBQUMsVUFBRCxDQUFWLEVBRmEsRUFHYixVQUhhLEVBSWIsQ0FKYSxFO0FBS2IsbUJBQWEsQ0FMQSxDQUFmOztBQU9BLFlBQU0sY0FBTixHQUF1QixNQUFNLFNBQU4sRUFBdkI7QUFDQSxZQUFNLE1BQU4sR0FBZSxFQUFmO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7OztxQ0FFdUIsTSxFQUEwQixJLEVBQTBCO0FBQzFFLFVBQU0sUUFBUSxRQUFRLGNBQVIsQ0FBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FBZDs7QUFFQSxVQUFJLFFBQVEsZ0JBQU0sS0FBbEI7QUFDQSxhQUFPLE9BQVAsQ0FBZSxVQUFDLEtBQUQsRUFBbUIsS0FBbkIsRUFBcUM7O0FBRWxELFlBQUksVUFBVSxPQUFPLE1BQVAsR0FBZ0IsQ0FBOUIsRUFBaUM7QUFDL0IsZ0JBQU0sY0FBTixHQUF1QixNQUFNLFNBQU4sRUFBdkI7QUFDRDs7QUFFRCxZQUFJLFVBQVUsU0FBZCxFQUF5QjtBQUN2QixnQkFBTSxJQUFOLENBQVcsS0FBWDtBQUNELFNBRkQsTUFFTztBQUNMLGdCQUFNLElBQU4sQ0FBVyxLQUFYLEVBQWtCLEtBQWxCO0FBQ0Q7O0FBRUQsZ0JBQVEsVUFBVSxnQkFBTSxLQUFoQixHQUF3QixnQkFBTSxLQUE5QixHQUFzQyxnQkFBTSxLQUFwRDtBQUNELE9BYkQ7QUFjQSxhQUFPLEtBQVA7QUFDRDs7O21DQUVxQixJLEVBQXVCO0FBQzNDLFVBQU0sUUFBUSxJQUFJLE9BQUosRUFBZDtBQUNBLFlBQU0sTUFBTixHQUFlLDBCQUFnQixlQUFoQixDQUNiLEtBQUssaUJBQUwsRUFEYSxFQUViLEtBQUssZUFBTCxFQUZhLEVBR2IsS0FBSyxhQUFMLEVBSGEsRUFJYixLQUFLLHlCQUFMLEVBSmEsRUFLYixLQUFLLGNBQUwsRUFMYSxDQUFmO0FBT0EsWUFBTSxNQUFOLEdBQWUsS0FBSyxnQkFBTCxFQUFmOztBQUVBLFlBQU0sY0FBTixHQUF1QixLQUFLLGVBQUwsR0FBdUIsT0FBdkIsQ0FBK0IsTUFBL0IsS0FBMEMsQ0FBMUMsR0FDbkIsRUFBQyxVQUFTLEVBQVYsRUFEbUIsR0FFbkIsS0FBSyxlQUFMLEdBQXVCLE9BQXZCLENBQStCLENBQS9CLEVBQWtDLE1BRnRDOztBQUlBLGFBQU8sS0FBUDtBQUNEOzs7Ozs7QUErQ0gsT0FBTyxPQUFQLEdBQWlCLE9BQWpCIiwiZmlsZSI6IkdvQm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLy8gdGhpcyBzaG91bGQgYmUgbXkgb3duIGRlZmluaXRpb24gb2YgdGhlIGdvIGJvYXJkLlxuXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IFdlaXFpIGZyb20gJ3dlaXFpJztcbmltcG9ydCBHb0dhbWUgZnJvbSAnLi4vY2xhc3MvR2FtZSc7XG5pbXBvcnQgV2VpcWlTZXJpYWxpemVyIGZyb20gJy4vV2VpcWlTZXJpYWxpemVyJ1xuXG5jb25zdCBDb2xvclRleHQgPSB7XG4gIEJMQUNLOiAnQmxhY2snLFxuICBXSElURTogJ1doaXRlJyxcbn07XG5cbmNvbnN0IFBBU1NfTU9WRSA9ICdQQVNTX01PVkUnO1xuXG5jbGFzcyBHb0JvYXJkIHtcbiAgX3dlaXFpOiBPYmplY3Q7XG4gIF9wcmV2aW91c0JvYXJkOiBPYmplY3Q7XG4gIF9oYW5kaWNhcDogbnVtYmVyO1xuICBfbW92ZXM6IEFycmF5PFN0b25lTW92ZT47XG5cbiAgc3RhdGljIGNyZWF0ZU5ld0JvYXJkKHNpemU6IEJvYXJkU2l6ZSwgaGFuZGljYXA6IG51bWJlcik6IEdvQm9hcmQge1xuICAgIC8vIFRPRE86IG5lZWQgdG8gdXNlIHNlcmlhbGl6ZXIgaGVscFxuICAgIGNvbnN0IGJvYXJkID0gbmV3IEdvQm9hcmQoKTtcbiAgICBib2FyZC5faGFuZGljYXAgPSBoYW5kaWNhcCA/IGhhbmRpY2FwIDogMDtcbiAgICBjb25zdCB3ZWlxaUJvYXJkID0ge1xuICAgICAgc3RvbmVzOiBXZWlxaVNlcmlhbGl6ZXIuZ2V0V2VpcWlCb2FyZFN0b25lc1dpdGhIYW5kaWNhcChzaXplLCBoYW5kaWNhcCksXG4gICAgfTtcblxuICAgIGJvYXJkLl93ZWlxaSA9IFdlaXFpU2VyaWFsaXplci5jcmVhdGVXZWlxaUdhbWUoXG4gICAgICBzaXplLFxuICAgICAge2hpc3Rvcnk6IFt3ZWlxaUJvYXJkXX0sXG4gICAgICB3ZWlxaUJvYXJkLFxuICAgICAgMCwgLy8gd2VpcWlDb25zZWN0dXRpdmVQYXNzZXNcbiAgICAgIGhhbmRpY2FwID09PSAwLCAvLyBpc0JsYWNrVHVyblxuICAgICk7XG4gICAgYm9hcmQuX3ByZXZpb3VzQm9hcmQgPSBib2FyZC5nZXRTdG9uZXMoKTtcbiAgICBib2FyZC5fbW92ZXMgPSBbXTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlRnJvbVN0b25lcyhzdG9uZXM6IEFycmF5PFN0b25lTW92ZT4sIHNpemU6IEJvYXJkU2l6ZSk6IEdvQm9hcmQge1xuICAgIGNvbnN0IGJvYXJkID0gR29Cb2FyZC5jcmVhdGVOZXdCb2FyZChzaXplLCAwKTtcblxuICAgIGxldCBjb2xvciA9IFdlaXFpLkJMQUNLO1xuICAgIHN0b25lcy5mb3JFYWNoKChzdG9uZTogU3RvbmVNb3ZlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAvLyBmb3Igc2Vjb25kIHRvIGxhc3QgbW92ZSwgZ2V0IHRoZSBib2FyZCBzdGF0ZVxuICAgICAgaWYgKGluZGV4ID09PSBzdG9uZXMubGVuZ3RoIC0gMikge1xuICAgICAgICBib2FyZC5fcHJldmlvdXNCb2FyZCA9IGJvYXJkLmdldFN0b25lcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RvbmUgPT09IFBBU1NfTU9WRSkge1xuICAgICAgICBib2FyZC5wYXNzKGNvbG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkLnBsYXkoY29sb3IsIHN0b25lKTtcbiAgICAgIH1cblxuICAgICAgY29sb3IgPSBjb2xvciA9PT0gV2VpcWkuQkxBQ0sgPyBXZWlxaS5XSElURSA6IFdlaXFpLkJMQUNLXG4gICAgfSk7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUZyb21HYW1lKGdhbWU6IEdvR2FtZSk6IEdvQm9hcmQge1xuICAgIGNvbnN0IGJvYXJkID0gbmV3IEdvQm9hcmQoKTtcbiAgICBib2FyZC5fd2VpcWkgPSBXZWlxaVNlcmlhbGl6ZXIuY3JlYXRlV2VpcWlHYW1lKFxuICAgICAgZ2FtZS5nZXRXZWlxaUJvYXJkU2l6ZSgpLFxuICAgICAgZ2FtZS5nZXRXZWlxaUhpc3RvcnkoKSxcbiAgICAgIGdhbWUuZ2V0V2VpcWlCb2FyZCgpLFxuICAgICAgZ2FtZS5nZXRXZWlxaUNvbnNlY3V0aXZlUGFzc2VzKCksXG4gICAgICBnYW1lLmdldElzQmxhY2tUdXJuKCksXG4gICAgKTtcbiAgICBib2FyZC5fbW92ZXMgPSBnYW1lLmdldFN0b25lc0hpc3RvcnkoKTtcbiAgICAvLyBhIGJpdCBoYWNreVxuICAgIGJvYXJkLl9wcmV2aW91c0JvYXJkID0gZ2FtZS5nZXRXZWlxaUhpc3RvcnkoKS5oaXN0b3J5Lmxlbmd0aCA9PT0gMFxuICAgICAgPyB7J3N0b25lcyc6W119XG4gICAgICA6IGdhbWUuZ2V0V2VpcWlIaXN0b3J5KCkuaGlzdG9yeVswXS5zdG9uZXM7XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBnZXRTdG9uZU1vdmVzKCk6IEFycmF5PFN0b25lTW92ZT4ge1xuICAgIHJldHVybiB0aGlzLl9tb3ZlcztcbiAgfVxuXG4gIGdldFByZXZpb3VzQm9hcmQoKTogT2JqZWN0IHtcbiAgICByZXR1cm4gdGhpcy5fcHJldmlvdXNCb2FyZDtcbiAgfVxuXG4gIHBhc3MoY29sb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3ByZXZpb3VzQm9hcmQgPSB0aGlzLmdldFN0b25lcygpO1xuICAgIHRoaXMuX3dlaXFpID0gdGhpcy5fd2VpcWkucGFzcyhjb2xvcik7XG4gICAgdGhpcy5fbW92ZXMucHVzaChQQVNTX01PVkUpO1xuICB9XG5cbiAgcGxheShjb2xvcjogc3RyaW5nLCBwb3NpdGlvbjogU3RvbmVNb3ZlKTogdm9pZCB7XG4gICAgdGhpcy5fcHJldmlvdXNCb2FyZCA9IHRoaXMuZ2V0U3RvbmVzKCk7XG4gICAgdGhpcy5fd2VpcWkgPSB0aGlzLl93ZWlxaS5wbGF5KGNvbG9yLCBwb3NpdGlvbik7XG4gICAgdGhpcy5fbW92ZXMucHVzaChwb3NpdGlvbik7XG4gIH1cblxuICBnZXRJc0JsYWNrVHVybigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50Q29sb3IoKSA9PT0gV2VpcWkuQkxBQ0s7XG4gIH1cblxuICBnZXRDdXJyZW50Q29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fd2VpcWkuY3VycmVudENvbG9yO1xuICB9XG5cbiAgZ2V0Q29uc2VjdHV0aXZlUGFzc2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3dlaXFpLmNvbnNlY3R1dGl2ZVBhc3NlcztcbiAgfVxuXG4gIGdldFN0b25lcygpOiBPYmplY3Qge1xuICAgIHJldHVybiB0aGlzLl93ZWlxaS5nZXRCb2FyZCgpLnN0b25lcztcbiAgfVxuXG4gIGdldFdlaXFpQm9hcmRIaXN0b3J5KCk6IE9iamVjdCB7XG4gICAgcmV0dXJuIFdlaXFpU2VyaWFsaXplci5jcmVhdGVCb2FyZEhpc3RvcnlPYmplY3QodGhpcy5nZXRQcmV2aW91c0JvYXJkKCkpO1xuICB9XG5cbiAgZ2V0V2VpcWlCb2FyZCgpOiBPYmplY3Qge1xuICAgIHJldHVybiBXZWlxaVNlcmlhbGl6ZXIuY3JlYXRlQm9hcmRPYmplY3QodGhpcy5nZXRTdG9uZXMoKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHb0JvYXJkO1xuIl19
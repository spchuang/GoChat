'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// define global set of exceptions
var EXCEPTION = {
  // normal (0-99)
  SOMETHING_IS_WRONG: 1,

  // create game (100 - 199)
  ROOM_ALREADY_CREATED: 100,
  NOT_PROPER_GAME_CODE: 101,
  NO_ROOM_WITH_CODE: 102,
  CANT_JOIN_OWN_ROOM: 103,

  // in game (200 -300)
  VIOLATION_OF_KO: 200,
  PLAY_ON_EXISTING_STONE: 201,
  PLAY_OUT_OF_BOUND: 202,
  NOT_PLAYER_TURN: 203
};

var EXCEPTION_CODE_TO_NAME = {};
Object.keys(EXCEPTION).forEach(function (name) {
  var code = EXCEPTION[name];
  EXCEPTION_CODE_TO_NAME[code] = name;
});

// mapping from
var EXCEPTION_MESSAGE = _defineProperty({}, EXCEPTION.ROOM_ALREADY_CREATED, 'alreadyCreatedRoom');

var got = void 0;

var TypedError = function (_Error) {
  _inherits(TypedError, _Error);

  function TypedError(code, data) {
    _classCallCheck(this, TypedError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TypedError).call(this, code));

    _this.data = {};

    Error.captureStackTrace(_this, _this.constructor);
    _this.name = 'TypedError';
    _this.code = code;
    if (data) {
      _this.data = data;
    }

    _this.getErrorName = function () {
      return 'typedException.' + EXCEPTION_CODE_TO_NAME[_this.code.toString()];
    };

    _this.getErrorMessage = function (language) {
      if (!got) {
        got = require('./translations/Translator').got;
      }
      return got(_this.getErrorName(), language, _this.data);
    };
    return _this;
  }

  return TypedError;
}(Error);

module.exports = {
  EXCEPTION: EXCEPTION,
  EXCEPTION_MESSAGE: EXCEPTION_MESSAGE,
  TypedError: TypedError
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lcnJvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSxJQUFNLFlBQVk7O0FBRWhCLHNCQUFvQixDQUZKOzs7QUFLaEIsd0JBQXNCLEdBTE47QUFNaEIsd0JBQXNCLEdBTk47QUFPaEIscUJBQW1CLEdBUEg7QUFRaEIsc0JBQW9CLEdBUko7OztBQVdoQixtQkFBaUIsR0FYRDtBQVloQiwwQkFBd0IsR0FaUjtBQWFoQixxQkFBbUIsR0FiSDtBQWNoQixtQkFBaUI7QUFkRCxDQUFsQjs7QUFpQkEsSUFBTSx5QkFBeUIsRUFBL0I7QUFDQSxPQUFPLElBQVAsQ0FBWSxTQUFaLEVBQXVCLE9BQXZCLENBQStCLFVBQUMsSUFBRCxFQUFrQjtBQUMvQyxNQUFNLE9BQU8sVUFBVSxJQUFWLENBQWI7QUFDQSx5QkFBdUIsSUFBdkIsSUFBK0IsSUFBL0I7QUFDRCxDQUhEOzs7QUFNQSxJQUFNLHdDQUNILFVBQVUsb0JBRFAsRUFDOEIsb0JBRDlCLENBQU47O0FBSUEsSUFBSSxZQUFKOztJQUVNLFU7OztBQU1KLHNCQUFZLElBQVosRUFBMEIsSUFBMUIsRUFBeUM7QUFBQTs7QUFBQSw4RkFDakMsSUFEaUM7O0FBQUEsVUFKekMsSUFJeUMsR0FKMUIsRUFJMEI7O0FBRXZDLFVBQU0saUJBQU4sUUFBOEIsTUFBSyxXQUFuQztBQUNBLFVBQUssSUFBTCxHQUFZLFlBQVo7QUFDQSxVQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsUUFBSSxJQUFKLEVBQVU7QUFDUixZQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0Q7O0FBRUQsVUFBSyxZQUFMLEdBQW9CLFlBQWM7QUFDaEMsYUFBTyxvQkFBb0IsdUJBQXVCLE1BQUssSUFBTCxDQUFVLFFBQVYsRUFBdkIsQ0FBM0I7QUFDRCxLQUZEOztBQUlBLFVBQUssZUFBTCxHQUF1QixVQUFDLFFBQUQsRUFBOEI7QUFDbkQsVUFBSSxDQUFDLEdBQUwsRUFBVTtBQUNSLGNBQU0sUUFBUSwyQkFBUixFQUFxQyxHQUEzQztBQUNEO0FBQ0QsYUFBTyxJQUFJLE1BQUssWUFBTCxFQUFKLEVBQXlCLFFBQXpCLEVBQW1DLE1BQUssSUFBeEMsQ0FBUDtBQUNELEtBTEQ7QUFidUM7QUFtQnhDOzs7RUF6QnNCLEs7O0FBNEJ6QixPQUFPLE9BQVAsR0FBaUI7QUFDZixzQkFEZTtBQUVmLHNDQUZlO0FBR2Y7QUFIZSxDQUFqQiIsImZpbGUiOiJlcnJvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4vLyBkZWZpbmUgZ2xvYmFsIHNldCBvZiBleGNlcHRpb25zXG5jb25zdCBFWENFUFRJT04gPSB7XG4gIC8vIG5vcm1hbCAoMC05OSlcbiAgU09NRVRISU5HX0lTX1dST05HOiAxLFxuXG4gIC8vIGNyZWF0ZSBnYW1lICgxMDAgLSAxOTkpXG4gIFJPT01fQUxSRUFEWV9DUkVBVEVEOiAxMDAsXG4gIE5PVF9QUk9QRVJfR0FNRV9DT0RFOiAxMDEsXG4gIE5PX1JPT01fV0lUSF9DT0RFOiAxMDIsXG4gIENBTlRfSk9JTl9PV05fUk9PTTogMTAzLFxuXG4gIC8vIGluIGdhbWUgKDIwMCAtMzAwKVxuICBWSU9MQVRJT05fT0ZfS086IDIwMCxcbiAgUExBWV9PTl9FWElTVElOR19TVE9ORTogMjAxLFxuICBQTEFZX09VVF9PRl9CT1VORDogMjAyLFxuICBOT1RfUExBWUVSX1RVUk46IDIwMyxcbn07XG5cbmNvbnN0IEVYQ0VQVElPTl9DT0RFX1RPX05BTUUgPSB7fTtcbk9iamVjdC5rZXlzKEVYQ0VQVElPTikuZm9yRWFjaCgobmFtZTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGNvZGUgPSBFWENFUFRJT05bbmFtZV07XG4gIEVYQ0VQVElPTl9DT0RFX1RPX05BTUVbY29kZV0gPSBuYW1lO1xufSk7XG5cbi8vIG1hcHBpbmcgZnJvbVxuY29uc3QgRVhDRVBUSU9OX01FU1NBR0UgPSB7XG4gIFtFWENFUFRJT04uUk9PTV9BTFJFQURZX0NSRUFURURdOiAnYWxyZWFkeUNyZWF0ZWRSb29tJyxcbn07XG5cbmxldCBnb3Q7XG5cbmNsYXNzIFR5cGVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvZGU6IG51bWJlcjtcbiAgZGF0YTogT2JqZWN0ID0ge307XG4gIGdldEVycm9yTmFtZTogRnVuY3Rpb247XG4gIGdldEVycm9yTWVzc2FnZTogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3IoY29kZTogbnVtYmVyLCBkYXRhPzogT2JqZWN0KSB7XG4gICAgc3VwZXIoY29kZSk7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgdGhpcy5uYW1lID0gJ1R5cGVkRXJyb3InO1xuICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuXG4gICAgdGhpcy5nZXRFcnJvck5hbWUgPSAoKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiAndHlwZWRFeGNlcHRpb24uJyArIEVYQ0VQVElPTl9DT0RFX1RPX05BTUVbdGhpcy5jb2RlLnRvU3RyaW5nKCldO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0RXJyb3JNZXNzYWdlID0gKGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgaWYgKCFnb3QpIHtcbiAgICAgICAgZ290ID0gcmVxdWlyZSgnLi90cmFuc2xhdGlvbnMvVHJhbnNsYXRvcicpLmdvdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnb3QodGhpcy5nZXRFcnJvck5hbWUoKSwgbGFuZ3VhZ2UsIHRoaXMuZGF0YSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFWENFUFRJT04sXG4gIEVYQ0VQVElPTl9NRVNTQUdFLFxuICBUeXBlZEVycm9yLFxufTtcbiJdfQ==
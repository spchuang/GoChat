

'use strict';

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ascii(a) {
  return a.charCodeAt(0);
}

var ParseUtil = {
  isPlayCommand: function isPlayCommand(text) {
    text = text.toLowerCase();
    return text === 'play' || text === 'p' || text === 'go';
  },
  isHelpCommand: function isHelpCommand(text) {
    text = text.toLowerCase();
    return text === 'menu' || text === 'm' || text === 'help' || text === 'h' || text === '?';
  },
  isQuitCommand: function isQuitCommand(text) {
    text = text.toLowerCase();
    return text === 'q' || text === 'quit';
  },
  isUndoCommand: function isUndoCommand(text) {
    text = text.toLowerCase();
    return text === 'undo' || text === 'undo move' || text === '回棋' || text === '悔棋';
  },
  isPassCommand: function isPassCommand(text) {
    text = text.toLowerCase();
    return text === 'p' || text === 'pass';
  },
  isProperGameRoomCode: function isProperGameRoomCode(text) {
    var regex = /^[0-9]+$/i;
    return regex.test(text);
  },


  // Handle position commands to 0-indexed position. Will try to be as smart as possible.
  // Allow 'A,4', 'A4', 'A   4'
  parsePositionText: function parsePositionText(text) {
    // remove all white spaces
    text = text.toLowerCase().replace(/\s/g, '');

    // parse the game command (e.g.'A, 5'), return [0, 6];
    // delimeter could be any special characters
    var position = text.split(/[-/:;()$&@".,?!'_|~<>+=*^]/);

    if (position.length === 1) {
      // handle 'A4' or 'A14' case.
      position = [text[0], text.substring(1)];
    }

    // without the first character
    (0, _invariant2.default)(position.length === 2 && position[0].length === 1 && 1 <= position[1].length && position[1].length <= 2 && // at most 2 characters
    !isNaN(position[1]), // second string is a number
    'Invalid input');

    var pos1 = ascii(position[0]) - 97 + 1; // 'a' becomes 1
    var pos2 = parseInt(position[1], 10);

    return [pos1 - 1, pos2 - 1];
  },


  // [0, 3] => 'A, 4'
  convertNumberPositionToString: function convertNumberPositionToString(position) {
    var pos1 = String.fromCharCode(position[0] + 65);
    var pos2 = position[1] + 1; // to 1-index
    return pos1 + ', ' + pos2;
  },


  // 'pd' => 'p4';
  convertSGFMovetoString: function convertSGFMovetoString(sgfPosition) {
    (0, _invariant2.default)(sgfPosition.length === 2, 'Invalid sgf position');
    var pos1 = sgfPosition[0];
    var pos2 = ascii(sgfPosition[1]) - 97 + 1;
    return '' + pos1 + pos2;
  },


  // '0, 18' => 'aa'
  convertStoneMoveToSGFMove: function convertStoneMoveToSGFMove(stoneMove, size) {
    var x = String.fromCharCode(stoneMove[0] + 97);
    var y = String.fromCharCode(size - stoneMove[1] - 1 + 97); // convert to top-bottom
    return '' + x + y;
  }
};

module.exports = ParseUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9QYXJzZVV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7QUFFQTs7Ozs7O0FBRUEsU0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQztBQUNoQyxTQUFPLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBUDtBQUNEOztBQUVELElBQU0sWUFBWTtBQUNoQixlQURnQix5QkFDRixJQURFLEVBQ3FCO0FBQ25DLFdBQU8sS0FBSyxXQUFMLEVBQVA7QUFDQSxXQUFPLFNBQVMsTUFBVCxJQUFtQixTQUFTLEdBQTVCLElBQW1DLFNBQVMsSUFBbkQ7QUFDRCxHQUplO0FBTWhCLGVBTmdCLHlCQU1GLElBTkUsRUFNcUI7QUFDbkMsV0FBTyxLQUFLLFdBQUwsRUFBUDtBQUNBLFdBQU8sU0FBUyxNQUFULElBQW1CLFNBQVMsR0FBNUIsSUFBbUMsU0FBUyxNQUE1QyxJQUFzRCxTQUFTLEdBQS9ELElBQXNFLFNBQVMsR0FBdEY7QUFDRCxHQVRlO0FBV2hCLGVBWGdCLHlCQVdGLElBWEUsRUFXcUI7QUFDbkMsV0FBTyxLQUFLLFdBQUwsRUFBUDtBQUNBLFdBQU8sU0FBUyxHQUFULElBQWdCLFNBQVMsTUFBaEM7QUFDRCxHQWRlO0FBZ0JoQixlQWhCZ0IseUJBZ0JGLElBaEJFLEVBZ0JxQjtBQUNuQyxXQUFPLEtBQUssV0FBTCxFQUFQO0FBQ0EsV0FBTyxTQUFTLE1BQVQsSUFBbUIsU0FBUyxXQUE1QixJQUEyQyxTQUFTLElBQXBELElBQTRELFNBQVMsSUFBNUU7QUFDRCxHQW5CZTtBQXFCaEIsZUFyQmdCLHlCQXFCRixJQXJCRSxFQXFCcUI7QUFDbkMsV0FBTyxLQUFLLFdBQUwsRUFBUDtBQUNBLFdBQU8sU0FBUyxHQUFULElBQWdCLFNBQVMsTUFBaEM7QUFDRCxHQXhCZTtBQTBCaEIsc0JBMUJnQixnQ0EwQkssSUExQkwsRUEwQjRCO0FBQzFDLFFBQU0sUUFBUSxXQUFkO0FBQ0EsV0FBTyxNQUFNLElBQU4sQ0FBVyxJQUFYLENBQVA7QUFDRCxHQTdCZTs7Ozs7QUFpQ2hCLG1CQWpDZ0IsNkJBaUNFLElBakNGLEVBaUMrQjs7QUFFN0MsV0FBTyxLQUFLLFdBQUwsR0FBbUIsT0FBbkIsQ0FBMkIsS0FBM0IsRUFBa0MsRUFBbEMsQ0FBUDs7OztBQUlBLFFBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyw0QkFBWCxDQUFmOztBQUVBLFFBQUksU0FBUyxNQUFULEtBQW9CLENBQXhCLEVBQTJCOztBQUV6QixpQkFBVyxDQUNULEtBQUssQ0FBTCxDQURTLEVBRVQsS0FBSyxTQUFMLENBQWUsQ0FBZixDQUZTLENBQVg7QUFJRDs7O0FBRUQsNkJBQ0UsU0FBUyxNQUFULEtBQW9CLENBQXBCLElBQ0EsU0FBUyxDQUFULEVBQVksTUFBWixLQUF1QixDQUR2QixJQUVBLEtBQUssU0FBUyxDQUFULEVBQVksTUFGakIsSUFFMkIsU0FBUyxDQUFULEVBQVksTUFBWixJQUFzQixDQUZqRCxJO0FBR0EsS0FBQyxNQUFNLFNBQVMsQ0FBVCxDQUFOLENBSkgsRTtBQUtFLG1CQUxGOztBQVFBLFFBQU0sT0FBTyxNQUFNLFNBQVMsQ0FBVCxDQUFOLElBQXFCLEVBQXJCLEdBQTBCLENBQXZDLEM7QUFDQSxRQUFNLE9BQU8sU0FBUyxTQUFTLENBQVQsQ0FBVCxFQUFzQixFQUF0QixDQUFiOztBQUVBLFdBQU8sQ0FBQyxPQUFPLENBQVIsRUFBVyxPQUFPLENBQWxCLENBQVA7QUFDRCxHQTdEZTs7OztBQWdFaEIsK0JBaEVnQix5Q0FnRWMsUUFoRWQsRUFnRStDO0FBQzdELFFBQU0sT0FBTyxPQUFPLFlBQVAsQ0FBb0IsU0FBUyxDQUFULElBQWMsRUFBbEMsQ0FBYjtBQUNBLFFBQU0sT0FBTyxTQUFTLENBQVQsSUFBYyxDQUEzQixDO0FBQ0EsV0FBVSxJQUFWLFVBQW1CLElBQW5CO0FBQ0QsR0FwRWU7Ozs7QUF1RWhCLHdCQXZFZ0Isa0NBdUVPLFdBdkVQLEVBdUVvQztBQUNsRCw2QkFBVSxZQUFZLE1BQVosS0FBdUIsQ0FBakMsRUFBb0Msc0JBQXBDO0FBQ0EsUUFBTSxPQUFPLFlBQVksQ0FBWixDQUFiO0FBQ0EsUUFBTSxPQUFPLE1BQU0sWUFBWSxDQUFaLENBQU4sSUFBd0IsRUFBeEIsR0FBNkIsQ0FBMUM7QUFDQSxnQkFBVSxJQUFWLEdBQWlCLElBQWpCO0FBQ0QsR0E1RWU7Ozs7QUErRWhCLDJCQS9FZ0IscUNBK0VVLFNBL0VWLEVBK0VvQyxJQS9FcEMsRUErRTBEO0FBQ3hFLFFBQU0sSUFBSSxPQUFPLFlBQVAsQ0FBb0IsVUFBVSxDQUFWLElBQWUsRUFBbkMsQ0FBVjtBQUNBLFFBQU0sSUFBSSxPQUFPLFlBQVAsQ0FBb0IsT0FBTyxVQUFVLENBQVYsQ0FBUCxHQUFxQixDQUFyQixHQUF5QixFQUE3QyxDQUFWLEM7QUFDQSxnQkFBVSxDQUFWLEdBQWMsQ0FBZDtBQUNEO0FBbkZlLENBQWxCOztBQXNGQSxPQUFPLE9BQVAsR0FBaUIsU0FBakIiLCJmaWxlIjoiUGFyc2VVdGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5cbmZ1bmN0aW9uIGFzY2lpKGE6IHN0cmluZyk6IG51bWJlciB7XG4gIHJldHVybiBhLmNoYXJDb2RlQXQoMCk7XG59XG5cbmNvbnN0IFBhcnNlVXRpbCA9IHtcbiAgaXNQbGF5Q29tbWFuZCh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0ZXh0ID0gdGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiB0ZXh0ID09PSAncGxheScgfHwgdGV4dCA9PT0gJ3AnIHx8IHRleHQgPT09ICdnbyc7XG4gIH0sXG5cbiAgaXNIZWxwQ29tbWFuZCh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0ZXh0ID0gdGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiB0ZXh0ID09PSAnbWVudScgfHwgdGV4dCA9PT0gJ20nIHx8IHRleHQgPT09ICdoZWxwJyB8fCB0ZXh0ID09PSAnaCcgfHwgdGV4dCA9PT0gJz8nO1xuICB9LFxuXG4gIGlzUXVpdENvbW1hbmQodGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gdGV4dCA9PT0gJ3EnIHx8IHRleHQgPT09ICdxdWl0JztcbiAgfSxcblxuICBpc1VuZG9Db21tYW5kKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRleHQgPSB0ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHRleHQgPT09ICd1bmRvJyB8fCB0ZXh0ID09PSAndW5kbyBtb3ZlJyB8fCB0ZXh0ID09PSAn5Zue5qOLJyB8fCB0ZXh0ID09PSAn5oKU5qOLJztcbiAgfSxcblxuICBpc1Bhc3NDb21tYW5kKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRleHQgPSB0ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHRleHQgPT09ICdwJyB8fCB0ZXh0ID09PSAncGFzcyc7XG4gIH0sXG5cbiAgaXNQcm9wZXJHYW1lUm9vbUNvZGUodGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVnZXggPSAvXlswLTldKyQvaTtcbiAgICByZXR1cm4gcmVnZXgudGVzdCh0ZXh0KTtcbiAgfSxcblxuICAvLyBIYW5kbGUgcG9zaXRpb24gY29tbWFuZHMgdG8gMC1pbmRleGVkIHBvc2l0aW9uLiBXaWxsIHRyeSB0byBiZSBhcyBzbWFydCBhcyBwb3NzaWJsZS5cbiAgLy8gQWxsb3cgJ0EsNCcsICdBNCcsICdBICAgNCdcbiAgcGFyc2VQb3NpdGlvblRleHQodGV4dDogc3RyaW5nKTogU3RvbmVQb3NpdGlvbiB7XG4gICAgLy8gcmVtb3ZlIGFsbCB3aGl0ZSBzcGFjZXNcbiAgICB0ZXh0ID0gdGV4dC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnJyk7XG5cbiAgICAvLyBwYXJzZSB0aGUgZ2FtZSBjb21tYW5kIChlLmcuJ0EsIDUnKSwgcmV0dXJuIFswLCA2XTtcbiAgICAvLyBkZWxpbWV0ZXIgY291bGQgYmUgYW55IHNwZWNpYWwgY2hhcmFjdGVyc1xuICAgIHZhciBwb3NpdGlvbiA9IHRleHQuc3BsaXQoL1stLzo7KCkkJkBcIi4sPyEnX3x+PD4rPSpeXS8pXG5cbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBoYW5kbGUgJ0E0JyBvciAnQTE0JyBjYXNlLlxuICAgICAgcG9zaXRpb24gPSBbXG4gICAgICAgIHRleHRbMF0sXG4gICAgICAgIHRleHQuc3Vic3RyaW5nKDEpLCAvLyB3aXRob3V0IHRoZSBmaXJzdCBjaGFyYWN0ZXJcbiAgICAgIF07XG4gICAgfVxuXG4gICAgaW52YXJpYW50KFxuICAgICAgcG9zaXRpb24ubGVuZ3RoID09PSAyICYmXG4gICAgICBwb3NpdGlvblswXS5sZW5ndGggPT09IDEgJiZcbiAgICAgIDEgPD0gcG9zaXRpb25bMV0ubGVuZ3RoICYmIHBvc2l0aW9uWzFdLmxlbmd0aCA8PSAyICYmIC8vIGF0IG1vc3QgMiBjaGFyYWN0ZXJzXG4gICAgICAhaXNOYU4ocG9zaXRpb25bMV0pLCAvLyBzZWNvbmQgc3RyaW5nIGlzIGEgbnVtYmVyXG4gICAgICAnSW52YWxpZCBpbnB1dCdcbiAgICApO1xuXG4gICAgY29uc3QgcG9zMSA9IGFzY2lpKHBvc2l0aW9uWzBdKSAtIDk3ICsgMTsgLy8gJ2EnIGJlY29tZXMgMVxuICAgIGNvbnN0IHBvczIgPSBwYXJzZUludChwb3NpdGlvblsxXSwgMTApO1xuXG4gICAgcmV0dXJuIFtwb3MxIC0gMSwgcG9zMiAtIDFdO1xuICB9LFxuXG4gIC8vIFswLCAzXSA9PiAnQSwgNCdcbiAgY29udmVydE51bWJlclBvc2l0aW9uVG9TdHJpbmcocG9zaXRpb246IFN0b25lUG9zaXRpb24pOiBzdHJpbmcge1xuICAgIGNvbnN0IHBvczEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBvc2l0aW9uWzBdICsgNjUpO1xuICAgIGNvbnN0IHBvczIgPSBwb3NpdGlvblsxXSArIDE7IC8vIHRvIDEtaW5kZXhcbiAgICByZXR1cm4gYCR7cG9zMX0sICR7cG9zMn1gO1xuICB9LFxuXG4gIC8vICdwZCcgPT4gJ3A0JztcbiAgY29udmVydFNHRk1vdmV0b1N0cmluZyhzZ2ZQb3NpdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpbnZhcmlhbnQoc2dmUG9zaXRpb24ubGVuZ3RoID09PSAyLCAnSW52YWxpZCBzZ2YgcG9zaXRpb24nKTtcbiAgICBjb25zdCBwb3MxID0gc2dmUG9zaXRpb25bMF07XG4gICAgY29uc3QgcG9zMiA9IGFzY2lpKHNnZlBvc2l0aW9uWzFdKSAtIDk3ICsgMTtcbiAgICByZXR1cm4gYCR7cG9zMX0ke3BvczJ9YDtcbiAgfSxcblxuICAvLyAnMCwgMTgnID0+ICdhYSdcbiAgY29udmVydFN0b25lTW92ZVRvU0dGTW92ZShzdG9uZU1vdmU6IFN0b25lUG9zaXRpb24sIHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgeCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoc3RvbmVNb3ZlWzBdICsgOTcpO1xuICAgIGNvbnN0IHkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHNpemUgLSBzdG9uZU1vdmVbMV0gLTEgKyA5Nyk7IC8vIGNvbnZlcnQgdG8gdG9wLWJvdHRvbVxuICAgIHJldHVybiBgJHt4fSR7eX1gO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZVV0aWw7XG4iXX0=
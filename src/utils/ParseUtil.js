// @flow

'use strict';

import invariant from 'invariant';

function ascii(a: string): number {
  return a.charCodeAt(0);
}

const ParseUtil = {
  isPlayCommand(text: string): boolean {
    text = text.toLowerCase();
    return text === 'play' || text === 'p' || text === 'go';
  },

  isHelpCommand(text: string): boolean {
    text = text.toLowerCase();
    return text === 'menu' || text === 'm' || text === 'help' || text === 'h' || text === '?';
  },

  isQuitCommand(text: string): boolean {
    text = text.toLowerCase();
    return text === 'q' || text === 'quit';
  },

  isUndoCommand(text: string): boolean {
    text = text.toLowerCase();
    return text === 'undo' || text === 'undo move' || text === '回棋' || text === '悔棋';
  },

  isPassCommand(text: string): boolean {
    text = text.toLowerCase();
    return text === 'p' || text === 'pass';
  },

  isProperGameRoomCode(text: string): boolean {
    const regex = /^[0-9]+$/i;
    return regex.test(text);
  },

  // Handle position commands to 0-indexed position. Will try to be as smart as possible.
  // Allow 'A,4', 'A4', 'A   4'
  parsePositionText(text: string): StonePosition {
    // remove all white spaces
    text = text.toLowerCase().replace(/\s/g, '');

    // parse the game command (e.g.'A, 5'), return [0, 6];
    // delimeter could be any special characters
    var position = text.split(/[-/:;()$&@".,?!'_|~<>+=*^]/)

    if (position.length === 1) {
      // handle 'A4' or 'A14' case.
      position = [
        text[0],
        text.substring(1), // without the first character
      ];
    }

    invariant(
      position.length === 2 &&
      position[0].length === 1 &&
      1 <= position[1].length && position[1].length <= 2 && // at most 2 characters
      !isNaN(position[1]), // second string is a number
      'Invalid input'
    );

    const pos1 = ascii(position[0]) - 97 + 1; // 'a' becomes 1
    const pos2 = parseInt(position[1], 10);

    return [pos1 - 1, pos2 - 1];
  },

  // [0, 3] => 'A, 4'
  convertNumberPositionToString(position: StonePosition): string {
    const pos1 = String.fromCharCode(position[0] + 65);
    const pos2 = position[1] + 1; // to 1-index
    return `${pos1}, ${pos2}`;
  },

  // 'pd' => 'p4';
  convertSGFMovetoString(sgfPosition: string): string {
    invariant(sgfPosition.length === 2, 'Invalid sgf position');
    const pos1 = sgfPosition[0];
    const pos2 = ascii(sgfPosition[1]) - 97 + 1;
    return `${pos1}${pos2}`;
  },

  // '0, 18' => 'aa'
  convertStoneMoveToSGFMove(stoneMove: StonePosition, size: number): string {
    const x = String.fromCharCode(stoneMove[0] + 97);
    const y = String.fromCharCode(size - stoneMove[1] -1 + 97); // convert to top-bottom
    return `${x}${y}`;
  },
};

module.exports = ParseUtil;

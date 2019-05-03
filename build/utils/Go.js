'use strict';

var WGo = {
	// basic information
	version: '2.0',

	// constants for colors (rather use WGo.B or WGo.W)
	B: 1,
	W: -1
};

/**
 * Creates instance of position object.
 *
 * @class
 * <p>WGo.Position is simple object storing position of go game. It is implemented as matrix <em>size</em> x <em>size</em> with values WGo.BLACK, WGo.WHITE or 0. It can be used by any extension.</p>
 *
 * @param {number} size of the board
 */

var Position = function Position(size) {
	this.size = size;
	this.schema = [];
	for (var i = 0; i < size * size; i++) {
		this.schema[i] = 0;
	}
};

Position.prototype = {
	constructor: WGo.Position,

	/**
  * Returns value of given coordinates.
  *
  * @param {number} x coordinate
  * @param {number} y coordinate
  * @return {(WGo.BLACK|WGo.WHITE|0)} color
  */

	get: function get(x, y) {
		if (x < 0 || y < 0 || x >= this.size || y >= this.size) return undefined;
		return this.schema[x * this.size + y];
	},

	/**
  * Sets value of given coordinates.
  *
  * @param {number} x coordinate
  * @param {number} y coordinate
  * @param {(WGo.B|WGo.W|0)} c color
  */

	set: function set(x, y, c) {
		this.schema[x * this.size + y] = c;
		return this;
	},

	/**
  * Clears the whole position (every value is set to 0).
  */

	clear: function clear() {
		for (var i = 0; i < this.size * this.size; i++) {
			this.schema[i] = 0;
		}return this;
	},

	/**
  * Clones the whole position.
  *
  * @return {WGo.Position} copy of position
  */

	clone: function clone() {
		var clone = new Position(this.size);
		clone.schema = this.schema.slice(0);
		return clone;
	}
};

WGo.Position = Position;

/**
 * Creates instance of game class.
 *
 * @class
 * This class implements game logic. It basically analyses given moves and returns capture stones.
 * WGo.Game also stores every position from beginning, so it has ability to check repeating positions
 * and it can effectively restore old positions.</p>
 *
 * @param {number} size of the board
 * @param {"KO"|"ALL"|"NONE"} repeat (optional, default is "KO") - how to handle repeated position:
 *
 * KO - ko is properly handled - position cannot be same like previous position
 * ALL - position cannot be same like any previous position - e.g. it forbids triple ko
 * NONE - position can be repeated
 */

var Game = function Game(size, repeat) {
	this.size = size || 19;
	this.repeating = repeat === undefined ? 'KO' : repeat; // possible values: KO, ALL or nothing
	this.stack = [];
	this.stack[0] = new Position(size);
	this.stack[0].capCount = { black: 0, white: 0 };
	this.turn = WGo.B;

	Object.defineProperty(this, 'position', {
		get: function get() {
			return this.stack[this.stack.length - 1];
		},
		set: function set(pos) {
			this[this.stack.length - 1] = pos;
		}
	});
};

// function for stone capturing
var do_capture = function do_capture(position, captured, x, y, c) {
	if (x >= 0 && x < position.size && y >= 0 && y < position.size && position.get(x, y) == c) {
		position.set(x, y, 0);
		captured.push({ x: x, y: y });

		do_capture(position, captured, x, y - 1, c);
		do_capture(position, captured, x, y + 1, c);
		do_capture(position, captured, x - 1, y, c);
		do_capture(position, captured, x + 1, y, c);
	}
};

// looking at liberties
var check_liberties = function check_liberties(position, testing, x, y, c) {
	// out of the board there aren't liberties
	if (x < 0 || x >= position.size || y < 0 || y >= position.size) return true;
	// however empty field means liberty
	if (position.get(x, y) == 0) return false;
	// already tested field or stone of enemy isn't giving us a liberty.
	if (testing.get(x, y) == true || position.get(x, y) == -c) return true;

	// set this field as tested
	testing.set(x, y, true);

	// in this case we are checking our stone, if we get 4 trues, it has no liberty
	return check_liberties(position, testing, x, y - 1, c) && check_liberties(position, testing, x, y + 1, c) && check_liberties(position, testing, x - 1, y, c) && check_liberties(position, testing, x + 1, y, c);
};

// analysing function - modifies original position, if there are some capturing, and returns array of captured stones
var check_capturing = function check_capturing(position, x, y, c) {
	var captured = [];
	// is there a stone possible to capture?
	if (x >= 0 && x < position.size && y >= 0 && y < position.size && position.get(x, y) == c) {
		// create testing map
		var testing = new Position(position.size);
		// if it has zero liberties capture it
		if (check_liberties(position, testing, x, y, c)) {
			// capture stones from game
			do_capture(position, captured, x, y, c);
		}
	}
	return captured;
};

// analysing history
var checkHistory = function checkHistory(position, x, y) {
	var flag, stop;

	if (this.repeating == 'KO' && this.stack.length - 2 >= 0) stop = this.stack.length - 2;else if (this.repeating == 'ALL') stop = 0;else return true;

	for (var i = this.stack.length - 2; i >= stop; i--) {
		if (this.stack[i].get(x, y) == position.get(x, y)) {
			flag = true;
			for (var j = 0; j < this.size * this.size; j++) {
				if (this.stack[i].schema[j] != position.schema[j]) {
					flag = false;
					break;
				}
			}
			if (flag) return false;
		}
	}

	return true;
};

Game.prototype = {

	constructor: Game,

	/**
  * Gets actual position.
  *
  * @return {WGo.Position} actual position
  */

	getPosition: function getPosition() {
		return this.stack[this.stack.length - 1];
	},

	/**
  * Play move.
  *
  * @param {number} x coordinate
  * @param {number} y coordinate
  * @param {(WGo.B|WGo.W)} c color
  * @param {boolean} noplay - if true, move isn't played. Used by WGo.Game.isValid.
  * @return {number} code of error, if move isn't valid. If it is valid, function returns array of captured stones.
  *
  * Error codes:
  * 1 - given coordinates are not on board
  * 2 - on given coordinates already is a stone
  * 3 - suicide (currently they are forbbiden)
  * 4 - repeated position
  */

	play: function play(x, y, c, noplay) {
		//check coordinates validity
		if (!this.isOnBoard(x, y)) return 1;
		if (this.position.get(x, y) != 0) return 2;

		// clone position
		if (!c) c = this.turn;

		var new_pos = this.position.clone();
		new_pos.set(x, y, c);

		// check capturing
		var captured = check_capturing(new_pos, x - 1, y, -c).concat(check_capturing(new_pos, x + 1, y, -c), check_capturing(new_pos, x, y - 1, -c), check_capturing(new_pos, x, y + 1, -c));

		// check suicide
		if (!captured.length) {
			var testing = new Position(this.size);
			if (check_liberties(new_pos, testing, x, y, c)) return 3;
		}

		// check history
		if (this.repeating && !checkHistory.call(this, new_pos, x, y)) {
			return 4;
		}

		if (noplay) return false;

		// update position info
		new_pos.color = c;
		new_pos.capCount = {
			black: this.position.capCount.black,
			white: this.position.capCount.white
		};
		if (c == WGo.B) new_pos.capCount.black += captured.length;else new_pos.capCount.white += captured.length;

		// save position
		this.pushPosition(new_pos);

		// reverse turn
		this.turn = -c;

		return captured;
	},

	/**
  * Play pass.
  *
  * @param {(WGo.B|WGo.W)} c color
  */

	pass: function pass(c) {
		if (c) this.turn = -c;else this.turn = -this.turn;

		this.pushPosition();
		this.position.color = -this.position.color;
	},

	/**
  * Finds out validity of the move.
  *
  * @param {number} x coordinate
  * @param {number} y coordinate
  * @param {(WGo.B|WGo.W)} c color
  * @return {boolean} true if move can be played.
  */

	isValid: function isValid(x, y, c) {
		return typeof this.play(x, y, c, true) != 'number';
	},

	/**
  * Controls position of the move.
  *
  * @param {number} x coordinate
  * @param {number} y coordinate
  * @return {boolean} true if move is on board.
  */

	isOnBoard: function isOnBoard(x, y) {
		return x >= 0 && y >= 0 && x < this.size && y < this.size;
	},

	/**
  * Inserts move into current position. Use for setting position, for example in handicap game. Field must be empty.
  *
  * @param {number} x coordinate
  * @param {number} y coordinate
  * @param {(WGo.B|WGo.W)} c color
  * @return {boolean} true if operation is successfull.
  */

	addStone: function addStone(x, y, c) {
		if (this.isOnBoard(x, y) && this.position.get(x, y) == 0) {
			this.position.set(x, y, c || 0);
			return true;
		}
		return false;
	},

	/**
  * Removes move from current position.
  *
  * @param {number} x coordinate
  * @param {number} y coordinate
  * @return {boolean} true if operation is successfull.
  */

	removeStone: function removeStone(x, y) {
		if (this.isOnBoard(x, y) && this.position.get(x, y) != 0) {
			this.position.set(x, y, 0);
			return true;
		}
		return false;
	},

	/**
  * Set or insert move of current position.
  *
  * @param {number} x coordinate
  * @param {number} y coordinate
  * @param {(WGo.B|WGo.W)} c color
  * @return {boolean} true if operation is successfull.
  */

	setStone: function setStone(x, y, c) {
		if (this.isOnBoard(x, y)) {
			this.position.set(x, y, c || 0);
			return true;
		}
		return false;
	},

	/**
  * Get stone on given position.
  *
  * @param {number} x coordinate
  * @param {number} y coordinate
  * @return {(WGo.B|WGo.W|0)} color
  */

	getStone: function getStone(x, y) {
		if (this.isOnBoard(x, y)) {
			return this.position.get(x, y);
		}
		return 0;
	},

	/**
  * Add position to stack. If position isn't specified current position is cloned and stacked.
  * Pointer of actual position is moved to the new position.
  *
  * @param {WGo.Position} tmp position (optional)
  */

	pushPosition: function pushPosition(pos) {
		if (!pos) {
			var pos = this.position.clone();
			pos.capCount = {
				black: this.position.capCount.black,
				white: this.position.capCount.white
			};
			pos.color = this.position.color;
		}
		this.stack.push(pos);
		return this;
	},

	/**
  * Remove current position from stack. Pointer of actual position is moved to the previous position.
  */

	popPosition: function popPosition() {
		var old = null;
		if (this.stack.length > 0) {
			old = this.stack.pop();

			if (this.stack.length == 0) this.turn = WGo.B;else if (this.position.color) this.turn = -this.position.color;else this.turn = -this.turn;
		}
		return old;
	},

	/**
  * Removes all positions.
  */

	firstPosition: function firstPosition() {
		this.stack = [];
		this.stack[0] = new Position(this.size);
		this.stack[0].capCount = { black: 0, white: 0 };
		this.turn = WGo.B;
		return this;
	},

	/**
  * Gets count of captured stones.
  *
  * @param {(WGo.BLACK|WGo.WHITE)} color
  * @return {number} count
  */

	getCaptureCount: function getCaptureCount(color) {
		return color == WGo.B ? this.position.capCount.black : this.position.capCount.white;
	},

	/**
  * Validate postion. Position is tested from 0:0 to size:size, if there are some moves, that should be captured, they will be removed.
  * You can use this, after insertion of more stones.
  *
  * @return array removed stones
  */

	validatePosition: function validatePosition() {
		var c,
		    p,
		    white = 0,
		    black = 0,
		    captured = [],
		    new_pos = this.position.clone();

		for (var x = 0; x < this.size; x++) {
			for (var y = 0; y < this.size; y++) {
				c = this.position.get(x, y);
				if (c) {
					p = captured.length;
					captured = captured.concat(check_capturing(new_pos, x - 1, y, -c), check_capturing(new_pos, x + 1, y, -c), check_capturing(new_pos, x, y - 1, -c), check_capturing(new_pos, x, y + 1, -c));

					if (c == WGo.B) black += captured - p;else white += captured - p;
				}
			}
		}
		this.position.capCount.black += black;
		this.position.capCount.white += white;
		this.position.schema = new_pos.schema;

		return captured;
	}
};

WGo.Game = Game;
console.log(WGo);

module.exports = WGo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Hby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLElBQUksTUFBTTs7QUFFVCxVQUFTLEtBRkE7OztBQUtULElBQUcsQ0FMTTtBQU1ULElBQUcsQ0FBQztBQU5LLENBQVY7Ozs7Ozs7Ozs7O0FBa0JBLElBQUksV0FBVyxTQUFYLFFBQVcsQ0FBUyxJQUFULEVBQWU7QUFDN0IsTUFBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE1BQUssTUFBTCxHQUFjLEVBQWQ7QUFDQSxNQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxPQUFLLElBQXhCLEVBQThCLEdBQTlCLEVBQW1DO0FBQ2xDLE9BQUssTUFBTCxDQUFZLENBQVosSUFBaUIsQ0FBakI7QUFDQTtBQUNELENBTkQ7O0FBUUEsU0FBUyxTQUFULEdBQXFCO0FBQ3BCLGNBQWEsSUFBSSxRQURHOzs7Ozs7Ozs7O0FBV3BCLE1BQUssYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQ2xCLE1BQUcsSUFBSSxDQUFKLElBQVMsSUFBSSxDQUFiLElBQWtCLEtBQUssS0FBSyxJQUE1QixJQUFvQyxLQUFLLEtBQUssSUFBakQsRUFBdUQsT0FBTyxTQUFQO0FBQ3ZELFNBQU8sS0FBSyxNQUFMLENBQVksSUFBRSxLQUFLLElBQVAsR0FBWSxDQUF4QixDQUFQO0FBQ0EsRUFkbUI7Ozs7Ozs7Ozs7QUF3QnBCLE1BQUssYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZ0I7QUFDcEIsT0FBSyxNQUFMLENBQVksSUFBRSxLQUFLLElBQVAsR0FBWSxDQUF4QixJQUE2QixDQUE3QjtBQUNBLFNBQU8sSUFBUDtBQUNBLEVBM0JtQjs7Ozs7O0FBaUNwQixRQUFPLGlCQUFXO0FBQ2pCLE9BQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLEtBQUssSUFBTCxHQUFVLEtBQUssSUFBbEMsRUFBd0MsR0FBeEM7QUFBNkMsUUFBSyxNQUFMLENBQVksQ0FBWixJQUFpQixDQUFqQjtBQUE3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LEVBQWlDLENBQUMsQ0FBbEMsQ0FIRSxDQUFYOztBQUtBLFNBQUcsS0FBSyxJQUFJLENBQVosRUFBZSxTQUFTLFdBQVMsQ0FBbEIsQ0FBZixLQUNLLFNBQVMsV0FBUyxDQUFsQjtBQUNMO0FBQ0Q7QUFDRDtBQUNELE9BQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsS0FBdkIsSUFBZ0MsS0FBaEM7QUFDQSxPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLEtBQXZCLElBQWdDLEtBQWhDO0FBQ0EsT0FBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixRQUFRLE1BQS9COztBQUVBLFNBQU8sUUFBUDtBQUNBO0FBalJlLENBQWpCOztBQW9SQSxJQUFJLElBQUosR0FBVyxJQUFYO0FBQ0EsUUFBUSxHQUFSLENBQVksR0FBWjs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsR0FBakIiLCJmaWxlIjoiR28uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbnZhciBXR28gPSB7XG5cdC8vIGJhc2ljIGluZm9ybWF0aW9uXG5cdHZlcnNpb246ICcyLjAnLFxuXG5cdC8vIGNvbnN0YW50cyBmb3IgY29sb3JzIChyYXRoZXIgdXNlIFdHby5CIG9yIFdHby5XKVxuXHRCOiAxLFxuXHRXOiAtMSxcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBpbnN0YW5jZSBvZiBwb3NpdGlvbiBvYmplY3QuXG4gKlxuICogQGNsYXNzXG4gKiA8cD5XR28uUG9zaXRpb24gaXMgc2ltcGxlIG9iamVjdCBzdG9yaW5nIHBvc2l0aW9uIG9mIGdvIGdhbWUuIEl0IGlzIGltcGxlbWVudGVkIGFzIG1hdHJpeCA8ZW0+c2l6ZTwvZW0+IHggPGVtPnNpemU8L2VtPiB3aXRoIHZhbHVlcyBXR28uQkxBQ0ssIFdHby5XSElURSBvciAwLiBJdCBjYW4gYmUgdXNlZCBieSBhbnkgZXh0ZW5zaW9uLjwvcD5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBvZiB0aGUgYm9hcmRcbiAqL1xuXG52YXIgUG9zaXRpb24gPSBmdW5jdGlvbihzaXplKSB7XG5cdHRoaXMuc2l6ZSA9IHNpemU7XG5cdHRoaXMuc2NoZW1hID0gW107XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzaXplKnNpemU7IGkrKykge1xuXHRcdHRoaXMuc2NoZW1hW2ldID0gMDtcblx0fVxufVxuXG5Qb3NpdGlvbi5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBXR28uUG9zaXRpb24sXG5cblx0LyoqXG5cdCAqIFJldHVybnMgdmFsdWUgb2YgZ2l2ZW4gY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IHkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJuIHsoV0dvLkJMQUNLfFdHby5XSElURXwwKX0gY29sb3Jcblx0ICovXG5cblx0Z2V0OiBmdW5jdGlvbih4LHkpIHtcblx0XHRpZih4IDwgMCB8fCB5IDwgMCB8fCB4ID49IHRoaXMuc2l6ZSB8fCB5ID49IHRoaXMuc2l6ZSkgcmV0dXJuIHVuZGVmaW5lZDtcblx0XHRyZXR1cm4gdGhpcy5zY2hlbWFbeCp0aGlzLnNpemUreV07XG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldHMgdmFsdWUgb2YgZ2l2ZW4gY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IHkgY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0geyhXR28uQnxXR28uV3wwKX0gYyBjb2xvclxuXHQgKi9cblxuXHRzZXQ6IGZ1bmN0aW9uKHgseSxjKSB7XG5cdFx0dGhpcy5zY2hlbWFbeCp0aGlzLnNpemUreV0gPSBjO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDbGVhcnMgdGhlIHdob2xlIHBvc2l0aW9uIChldmVyeSB2YWx1ZSBpcyBzZXQgdG8gMCkuXG5cdCAqL1xuXG5cdGNsZWFyOiBmdW5jdGlvbigpIHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zaXplKnRoaXMuc2l6ZTsgaSsrKSB0aGlzLnNjaGVtYVtpXSA9IDA7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENsb25lcyB0aGUgd2hvbGUgcG9zaXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge1dHby5Qb3NpdGlvbn0gY29weSBvZiBwb3NpdGlvblxuXHQgKi9cblxuXHRjbG9uZTogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNsb25lID0gbmV3IFBvc2l0aW9uKHRoaXMuc2l6ZSk7XG5cdFx0Y2xvbmUuc2NoZW1hID0gdGhpcy5zY2hlbWEuc2xpY2UoMCk7XG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9LFxufVxuXG5XR28uUG9zaXRpb24gPSBQb3NpdGlvbjtcblxuLyoqXG4gKiBDcmVhdGVzIGluc3RhbmNlIG9mIGdhbWUgY2xhc3MuXG4gKlxuICogQGNsYXNzXG4gKiBUaGlzIGNsYXNzIGltcGxlbWVudHMgZ2FtZSBsb2dpYy4gSXQgYmFzaWNhbGx5IGFuYWx5c2VzIGdpdmVuIG1vdmVzIGFuZCByZXR1cm5zIGNhcHR1cmUgc3RvbmVzLlxuICogV0dvLkdhbWUgYWxzbyBzdG9yZXMgZXZlcnkgcG9zaXRpb24gZnJvbSBiZWdpbm5pbmcsIHNvIGl0IGhhcyBhYmlsaXR5IHRvIGNoZWNrIHJlcGVhdGluZyBwb3NpdGlvbnNcbiAqIGFuZCBpdCBjYW4gZWZmZWN0aXZlbHkgcmVzdG9yZSBvbGQgcG9zaXRpb25zLjwvcD5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBvZiB0aGUgYm9hcmRcbiAqIEBwYXJhbSB7XCJLT1wifFwiQUxMXCJ8XCJOT05FXCJ9IHJlcGVhdCAob3B0aW9uYWwsIGRlZmF1bHQgaXMgXCJLT1wiKSAtIGhvdyB0byBoYW5kbGUgcmVwZWF0ZWQgcG9zaXRpb246XG4gKlxuICogS08gLSBrbyBpcyBwcm9wZXJseSBoYW5kbGVkIC0gcG9zaXRpb24gY2Fubm90IGJlIHNhbWUgbGlrZSBwcmV2aW91cyBwb3NpdGlvblxuICogQUxMIC0gcG9zaXRpb24gY2Fubm90IGJlIHNhbWUgbGlrZSBhbnkgcHJldmlvdXMgcG9zaXRpb24gLSBlLmcuIGl0IGZvcmJpZHMgdHJpcGxlIGtvXG4gKiBOT05FIC0gcG9zaXRpb24gY2FuIGJlIHJlcGVhdGVkXG4gKi9cblxudmFyIEdhbWUgPSBmdW5jdGlvbihzaXplLCByZXBlYXQpIHtcblx0dGhpcy5zaXplID0gc2l6ZSB8fCAxOTtcblx0dGhpcy5yZXBlYXRpbmcgPSByZXBlYXQgPT09IHVuZGVmaW5lZCA/ICdLTycgOiByZXBlYXQ7IC8vIHBvc3NpYmxlIHZhbHVlczogS08sIEFMTCBvciBub3RoaW5nXG5cdHRoaXMuc3RhY2sgPSBbXTtcblx0dGhpcy5zdGFja1swXSA9IG5ldyBQb3NpdGlvbihzaXplKTtcblx0dGhpcy5zdGFja1swXS5jYXBDb3VudCA9IHtibGFjazowLCB3aGl0ZTowfTtcblx0dGhpcy50dXJuID0gV0dvLkI7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwb3NpdGlvbicsIHtcblx0XHRnZXQgOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aC0xXTsgfSxcblx0XHRzZXQgOiBmdW5jdGlvbihwb3MpeyB0aGlzW3RoaXMuc3RhY2subGVuZ3RoLTFdID0gcG9zOyB9XG5cdH0pO1xufVxuXG4vLyBmdW5jdGlvbiBmb3Igc3RvbmUgY2FwdHVyaW5nXG52YXIgZG9fY2FwdHVyZSA9IGZ1bmN0aW9uKHBvc2l0aW9uLCBjYXB0dXJlZCwgeCwgeSwgYykge1xuXHRpZih4ID49IDAgJiYgeCA8IHBvc2l0aW9uLnNpemUgJiYgeSA+PSAwICYmIHkgPCBwb3NpdGlvbi5zaXplICYmIHBvc2l0aW9uLmdldCh4LHkpID09IGMpIHtcblx0XHRwb3NpdGlvbi5zZXQoeCx5LDApO1xuXHRcdGNhcHR1cmVkLnB1c2goe3g6eCwgeTp5fSk7XG5cblx0XHRkb19jYXB0dXJlKHBvc2l0aW9uLCBjYXB0dXJlZCwgeCwgeS0xLCBjKTtcblx0XHRkb19jYXB0dXJlKHBvc2l0aW9uLCBjYXB0dXJlZCwgeCwgeSsxLCBjKTtcblx0XHRkb19jYXB0dXJlKHBvc2l0aW9uLCBjYXB0dXJlZCwgeC0xLCB5LCBjKTtcblx0XHRkb19jYXB0dXJlKHBvc2l0aW9uLCBjYXB0dXJlZCwgeCsxLCB5LCBjKTtcblx0fVxufVxuXG4vLyBsb29raW5nIGF0IGxpYmVydGllc1xudmFyIGNoZWNrX2xpYmVydGllcyA9IGZ1bmN0aW9uKHBvc2l0aW9uLCB0ZXN0aW5nLCB4LCB5LCBjKSB7XG5cdC8vIG91dCBvZiB0aGUgYm9hcmQgdGhlcmUgYXJlbid0IGxpYmVydGllc1xuXHRpZih4IDwgMCB8fCB4ID49IHBvc2l0aW9uLnNpemUgfHwgeSA8IDAgfHwgeSA+PSBwb3NpdGlvbi5zaXplKSByZXR1cm4gdHJ1ZTtcblx0Ly8gaG93ZXZlciBlbXB0eSBmaWVsZCBtZWFucyBsaWJlcnR5XG5cdGlmKHBvc2l0aW9uLmdldCh4LHkpID09IDApIHJldHVybiBmYWxzZTtcblx0Ly8gYWxyZWFkeSB0ZXN0ZWQgZmllbGQgb3Igc3RvbmUgb2YgZW5lbXkgaXNuJ3QgZ2l2aW5nIHVzIGEgbGliZXJ0eS5cblx0aWYodGVzdGluZy5nZXQoeCx5KSA9PSB0cnVlIHx8IHBvc2l0aW9uLmdldCh4LHkpID09IC1jKSByZXR1cm4gdHJ1ZTtcblxuXHQvLyBzZXQgdGhpcyBmaWVsZCBhcyB0ZXN0ZWRcblx0dGVzdGluZy5zZXQoeCx5LHRydWUpO1xuXG5cdC8vIGluIHRoaXMgY2FzZSB3ZSBhcmUgY2hlY2tpbmcgb3VyIHN0b25lLCBpZiB3ZSBnZXQgNCB0cnVlcywgaXQgaGFzIG5vIGxpYmVydHlcblx0cmV0dXJuIFx0Y2hlY2tfbGliZXJ0aWVzKHBvc2l0aW9uLCB0ZXN0aW5nLCB4LCB5LTEsIGMpICYmXG5cdFx0XHRjaGVja19saWJlcnRpZXMocG9zaXRpb24sIHRlc3RpbmcsIHgsIHkrMSwgYykgJiZcblx0XHRcdGNoZWNrX2xpYmVydGllcyhwb3NpdGlvbiwgdGVzdGluZywgeC0xLCB5LCBjKSAmJlxuXHRcdFx0Y2hlY2tfbGliZXJ0aWVzKHBvc2l0aW9uLCB0ZXN0aW5nLCB4KzEsIHksIGMpO1xufVxuXG4vLyBhbmFseXNpbmcgZnVuY3Rpb24gLSBtb2RpZmllcyBvcmlnaW5hbCBwb3NpdGlvbiwgaWYgdGhlcmUgYXJlIHNvbWUgY2FwdHVyaW5nLCBhbmQgcmV0dXJucyBhcnJheSBvZiBjYXB0dXJlZCBzdG9uZXNcbnZhciBjaGVja19jYXB0dXJpbmcgPSBmdW5jdGlvbihwb3NpdGlvbiwgeCwgeSwgYykge1xuXHR2YXIgY2FwdHVyZWQgPSBbXTtcblx0Ly8gaXMgdGhlcmUgYSBzdG9uZSBwb3NzaWJsZSB0byBjYXB0dXJlP1xuXHRpZih4ID49IDAgJiYgeCA8IHBvc2l0aW9uLnNpemUgJiYgeSA+PSAwICYmIHkgPCBwb3NpdGlvbi5zaXplICYmIHBvc2l0aW9uLmdldCh4LHkpID09IGMpIHtcblx0XHQvLyBjcmVhdGUgdGVzdGluZyBtYXBcblx0XHR2YXIgdGVzdGluZyA9IG5ldyBQb3NpdGlvbihwb3NpdGlvbi5zaXplKTtcblx0XHQvLyBpZiBpdCBoYXMgemVybyBsaWJlcnRpZXMgY2FwdHVyZSBpdFxuXHRcdGlmKGNoZWNrX2xpYmVydGllcyhwb3NpdGlvbiwgdGVzdGluZywgeCwgeSwgYykpIHtcblx0XHRcdC8vIGNhcHR1cmUgc3RvbmVzIGZyb20gZ2FtZVxuXHRcdFx0ZG9fY2FwdHVyZShwb3NpdGlvbiwgY2FwdHVyZWQsIHgsIHksIGMpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gY2FwdHVyZWQ7XG59XG5cbi8vIGFuYWx5c2luZyBoaXN0b3J5XG52YXIgY2hlY2tIaXN0b3J5ID0gZnVuY3Rpb24ocG9zaXRpb24sIHgsIHkpIHtcblx0dmFyIGZsYWcsIHN0b3A7XG5cblx0aWYodGhpcy5yZXBlYXRpbmcgPT0gJ0tPJyAmJiB0aGlzLnN0YWNrLmxlbmd0aC0yID49IDApIHN0b3AgPSB0aGlzLnN0YWNrLmxlbmd0aC0yO1xuXHRlbHNlIGlmKHRoaXMucmVwZWF0aW5nID09ICdBTEwnKSBzdG9wID0gMDtcblx0ZWxzZSByZXR1cm4gdHJ1ZTtcblxuXHRmb3IodmFyIGkgPSB0aGlzLnN0YWNrLmxlbmd0aC0yOyBpID49IHN0b3A7IGktLSkge1xuXHRcdGlmKHRoaXMuc3RhY2tbaV0uZ2V0KHgseSkgPT0gcG9zaXRpb24uZ2V0KHgseSkpIHtcblx0XHRcdGZsYWcgPSB0cnVlO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IHRoaXMuc2l6ZSp0aGlzLnNpemU7IGorKykge1xuXHRcdFx0XHRpZih0aGlzLnN0YWNrW2ldLnNjaGVtYVtqXSAhPSBwb3NpdGlvbi5zY2hlbWFbal0pIHtcblx0XHRcdFx0XHRmbGFnID0gZmFsc2U7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKGZsYWcpIHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuR2FtZS5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IEdhbWUsXG5cblx0LyoqXG5cdCAqIEdldHMgYWN0dWFsIHBvc2l0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtXR28uUG9zaXRpb259IGFjdHVhbCBwb3NpdGlvblxuXHQgKi9cblxuXHRnZXRQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGgtMV07XG5cdH0sXG5cblx0LyoqXG5cdCAqIFBsYXkgbW92ZS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0ge251bWJlcn0geSBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSB7KFdHby5CfFdHby5XKX0gYyBjb2xvclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG5vcGxheSAtIGlmIHRydWUsIG1vdmUgaXNuJ3QgcGxheWVkLiBVc2VkIGJ5IFdHby5HYW1lLmlzVmFsaWQuXG5cdCAqIEByZXR1cm4ge251bWJlcn0gY29kZSBvZiBlcnJvciwgaWYgbW92ZSBpc24ndCB2YWxpZC4gSWYgaXQgaXMgdmFsaWQsIGZ1bmN0aW9uIHJldHVybnMgYXJyYXkgb2YgY2FwdHVyZWQgc3RvbmVzLlxuXHQgKlxuXHQgKiBFcnJvciBjb2Rlczpcblx0ICogMSAtIGdpdmVuIGNvb3JkaW5hdGVzIGFyZSBub3Qgb24gYm9hcmRcblx0ICogMiAtIG9uIGdpdmVuIGNvb3JkaW5hdGVzIGFscmVhZHkgaXMgYSBzdG9uZVxuXHQgKiAzIC0gc3VpY2lkZSAoY3VycmVudGx5IHRoZXkgYXJlIGZvcmJiaWRlbilcblx0ICogNCAtIHJlcGVhdGVkIHBvc2l0aW9uXG5cdCAqL1xuXG5cdHBsYXk6IGZ1bmN0aW9uKHgseSxjLG5vcGxheSkge1xuXHRcdC8vY2hlY2sgY29vcmRpbmF0ZXMgdmFsaWRpdHlcblx0XHRpZighdGhpcy5pc09uQm9hcmQoeCx5KSkgcmV0dXJuIDE7XG5cdFx0aWYodGhpcy5wb3NpdGlvbi5nZXQoeCx5KSAhPSAwKSByZXR1cm4gMjtcblxuXHRcdC8vIGNsb25lIHBvc2l0aW9uXG5cdFx0aWYoIWMpIGMgPSB0aGlzLnR1cm47XG5cblx0XHR2YXIgbmV3X3BvcyA9IHRoaXMucG9zaXRpb24uY2xvbmUoKTtcblx0XHRuZXdfcG9zLnNldCh4LHksYyk7XG5cblx0XHQvLyBjaGVjayBjYXB0dXJpbmdcblx0XHR2YXIgY2FwdHVyZWQgPSBjaGVja19jYXB0dXJpbmcobmV3X3BvcywgeC0xLCB5LCAtYykuY29uY2F0KGNoZWNrX2NhcHR1cmluZyhuZXdfcG9zLCB4KzEsIHksIC1jKSwgY2hlY2tfY2FwdHVyaW5nKG5ld19wb3MsIHgsIHktMSwgLWMpLCBjaGVja19jYXB0dXJpbmcobmV3X3BvcywgeCwgeSsxLCAtYykpO1xuXG5cdFx0Ly8gY2hlY2sgc3VpY2lkZVxuXHRcdGlmKCFjYXB0dXJlZC5sZW5ndGgpIHtcblx0XHRcdHZhciB0ZXN0aW5nID0gbmV3IFBvc2l0aW9uKHRoaXMuc2l6ZSk7XG5cdFx0XHRpZihjaGVja19saWJlcnRpZXMobmV3X3BvcywgdGVzdGluZywgeCwgeSwgYykpIHJldHVybiAzO1xuXHRcdH1cblxuXHRcdC8vIGNoZWNrIGhpc3Rvcnlcblx0XHRpZih0aGlzLnJlcGVhdGluZyAmJiAhY2hlY2tIaXN0b3J5LmNhbGwodGhpcywgbmV3X3BvcywgeCwgeSkpIHtcblx0XHRcdHJldHVybiA0O1xuXHRcdH1cblxuXHRcdGlmKG5vcGxheSkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0Ly8gdXBkYXRlIHBvc2l0aW9uIGluZm9cblx0XHRuZXdfcG9zLmNvbG9yID0gYztcblx0XHRuZXdfcG9zLmNhcENvdW50ID0ge1xuXHRcdFx0YmxhY2s6IHRoaXMucG9zaXRpb24uY2FwQ291bnQuYmxhY2ssXG5cdFx0XHR3aGl0ZTogdGhpcy5wb3NpdGlvbi5jYXBDb3VudC53aGl0ZVxuXHRcdH07XG5cdFx0aWYoYyA9PSBXR28uQikgbmV3X3Bvcy5jYXBDb3VudC5ibGFjayArPSBjYXB0dXJlZC5sZW5ndGg7XG5cdFx0ZWxzZSBuZXdfcG9zLmNhcENvdW50LndoaXRlICs9IGNhcHR1cmVkLmxlbmd0aDtcblxuXHRcdC8vIHNhdmUgcG9zaXRpb25cblx0XHR0aGlzLnB1c2hQb3NpdGlvbihuZXdfcG9zKTtcblxuXHRcdC8vIHJldmVyc2UgdHVyblxuXHRcdHRoaXMudHVybiA9IC1jO1xuXG5cdFx0cmV0dXJuIGNhcHR1cmVkO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFBsYXkgcGFzcy5cblx0ICpcblx0ICogQHBhcmFtIHsoV0dvLkJ8V0dvLlcpfSBjIGNvbG9yXG5cdCAqL1xuXG5cdHBhc3M6IGZ1bmN0aW9uKGMpIHtcblx0XHRpZihjKSB0aGlzLnR1cm4gPSAtYztcblx0XHRlbHNlIHRoaXMudHVybiA9IC10aGlzLnR1cm47XG5cblx0XHR0aGlzLnB1c2hQb3NpdGlvbigpO1xuXHRcdHRoaXMucG9zaXRpb24uY29sb3IgPSAtdGhpcy5wb3NpdGlvbi5jb2xvcjtcblx0fSxcblxuXHQvKipcblx0ICogRmluZHMgb3V0IHZhbGlkaXR5IG9mIHRoZSBtb3ZlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0geCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB5IGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIHsoV0dvLkJ8V0dvLlcpfSBjIGNvbG9yXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgbW92ZSBjYW4gYmUgcGxheWVkLlxuXHQgKi9cblxuXHRpc1ZhbGlkOiBmdW5jdGlvbih4LHksYykge1xuXHRcdHJldHVybiB0eXBlb2YgdGhpcy5wbGF5KHgseSxjLHRydWUpICE9ICdudW1iZXInO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDb250cm9scyBwb3NpdGlvbiBvZiB0aGUgbW92ZS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0ge251bWJlcn0geSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgbW92ZSBpcyBvbiBib2FyZC5cblx0ICovXG5cblx0aXNPbkJvYXJkOiBmdW5jdGlvbih4LHkpIHtcblx0XHRyZXR1cm4geCA+PSAwICYmIHkgPj0gMCAmJiB4IDwgdGhpcy5zaXplICYmIHkgPCB0aGlzLnNpemU7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEluc2VydHMgbW92ZSBpbnRvIGN1cnJlbnQgcG9zaXRpb24uIFVzZSBmb3Igc2V0dGluZyBwb3NpdGlvbiwgZm9yIGV4YW1wbGUgaW4gaGFuZGljYXAgZ2FtZS4gRmllbGQgbXVzdCBiZSBlbXB0eS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0ge251bWJlcn0geSBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSB7KFdHby5CfFdHby5XKX0gYyBjb2xvclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsbC5cblx0ICovXG5cblx0YWRkU3RvbmU6IGZ1bmN0aW9uKHgseSxjKSB7XG5cdFx0aWYodGhpcy5pc09uQm9hcmQoeCx5KSAmJiB0aGlzLnBvc2l0aW9uLmdldCh4LHkpID09IDApIHtcblx0XHRcdHRoaXMucG9zaXRpb24uc2V0KHgseSxjIHx8IDApO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKipcblx0ICogUmVtb3ZlcyBtb3ZlIGZyb20gY3VycmVudCBwb3NpdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0ge251bWJlcn0geSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgb3BlcmF0aW9uIGlzIHN1Y2Nlc3NmdWxsLlxuXHQgKi9cblxuXHRyZW1vdmVTdG9uZTogZnVuY3Rpb24oeCx5KSB7XG5cdFx0aWYodGhpcy5pc09uQm9hcmQoeCx5KSAmJiB0aGlzLnBvc2l0aW9uLmdldCh4LHkpICE9IDApIHtcblx0XHRcdHRoaXMucG9zaXRpb24uc2V0KHgseSwwKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBvciBpbnNlcnQgbW92ZSBvZiBjdXJyZW50IHBvc2l0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0geCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB5IGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIHsoV0dvLkJ8V0dvLlcpfSBjIGNvbG9yXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgb3BlcmF0aW9uIGlzIHN1Y2Nlc3NmdWxsLlxuXHQgKi9cblxuXHRzZXRTdG9uZTogZnVuY3Rpb24oeCx5LGMpIHtcblx0XHRpZih0aGlzLmlzT25Cb2FyZCh4LHkpKSB7XG5cdFx0XHR0aGlzLnBvc2l0aW9uLnNldCh4LHksYyB8fCAwKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBzdG9uZSBvbiBnaXZlbiBwb3NpdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0ge251bWJlcn0geSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm4geyhXR28uQnxXR28uV3wwKX0gY29sb3Jcblx0ICovXG5cblx0Z2V0U3RvbmU6IGZ1bmN0aW9uKHgseSkge1xuXHRcdGlmKHRoaXMuaXNPbkJvYXJkKHgseSkpIHtcblx0XHRcdHJldHVybiB0aGlzLnBvc2l0aW9uLmdldCh4LHkpO1xuXHRcdH1cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvKipcblx0ICogQWRkIHBvc2l0aW9uIHRvIHN0YWNrLiBJZiBwb3NpdGlvbiBpc24ndCBzcGVjaWZpZWQgY3VycmVudCBwb3NpdGlvbiBpcyBjbG9uZWQgYW5kIHN0YWNrZWQuXG5cdCAqIFBvaW50ZXIgb2YgYWN0dWFsIHBvc2l0aW9uIGlzIG1vdmVkIHRvIHRoZSBuZXcgcG9zaXRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7V0dvLlBvc2l0aW9ufSB0bXAgcG9zaXRpb24gKG9wdGlvbmFsKVxuXHQgKi9cblxuXHRwdXNoUG9zaXRpb246IGZ1bmN0aW9uKHBvcykge1xuXHRcdGlmKCFwb3MpIHtcblx0XHRcdHZhciBwb3MgPSB0aGlzLnBvc2l0aW9uLmNsb25lKCk7XG5cdFx0XHRwb3MuY2FwQ291bnQgPSB7XG5cdFx0XHRcdGJsYWNrOiB0aGlzLnBvc2l0aW9uLmNhcENvdW50LmJsYWNrLFxuXHRcdFx0XHR3aGl0ZTogdGhpcy5wb3NpdGlvbi5jYXBDb3VudC53aGl0ZVxuXHRcdFx0fTtcblx0XHRcdHBvcy5jb2xvciA9IHRoaXMucG9zaXRpb24uY29sb3I7XG5cdFx0fVxuXHRcdHRoaXMuc3RhY2sucHVzaChwb3MpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgY3VycmVudCBwb3NpdGlvbiBmcm9tIHN0YWNrLiBQb2ludGVyIG9mIGFjdHVhbCBwb3NpdGlvbiBpcyBtb3ZlZCB0byB0aGUgcHJldmlvdXMgcG9zaXRpb24uXG5cdCAqL1xuXG5cdHBvcFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgb2xkID0gbnVsbDtcblx0XHRpZih0aGlzLnN0YWNrLmxlbmd0aCA+IDApIHtcblx0XHRcdG9sZCA9IHRoaXMuc3RhY2sucG9wKCk7XG5cblx0XHRcdGlmKHRoaXMuc3RhY2subGVuZ3RoID09IDApIHRoaXMudHVybiA9IFdHby5CO1xuXHRcdFx0ZWxzZSBpZih0aGlzLnBvc2l0aW9uLmNvbG9yKSB0aGlzLnR1cm4gPSAtdGhpcy5wb3NpdGlvbi5jb2xvcjtcblx0XHRcdGVsc2UgdGhpcy50dXJuID0gLXRoaXMudHVybjtcblx0XHR9XG5cdFx0cmV0dXJuIG9sZDtcblx0fSxcblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbGwgcG9zaXRpb25zLlxuXHQgKi9cblxuXHRmaXJzdFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnN0YWNrID0gW107XG5cdFx0dGhpcy5zdGFja1swXSA9IG5ldyBQb3NpdGlvbih0aGlzLnNpemUpO1xuXHRcdHRoaXMuc3RhY2tbMF0uY2FwQ291bnQgPSB7YmxhY2s6MCwgd2hpdGU6MH07XG5cdFx0dGhpcy50dXJuID0gV0dvLkI7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldHMgY291bnQgb2YgY2FwdHVyZWQgc3RvbmVzLlxuXHQgKlxuXHQgKiBAcGFyYW0geyhXR28uQkxBQ0t8V0dvLldISVRFKX0gY29sb3Jcblx0ICogQHJldHVybiB7bnVtYmVyfSBjb3VudFxuXHQgKi9cblxuXHRnZXRDYXB0dXJlQ291bnQ6IGZ1bmN0aW9uKGNvbG9yKSB7XG5cdFx0cmV0dXJuIGNvbG9yID09IFdHby5CID8gdGhpcy5wb3NpdGlvbi5jYXBDb3VudC5ibGFjayA6IHRoaXMucG9zaXRpb24uY2FwQ291bnQud2hpdGU7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlIHBvc3Rpb24uIFBvc2l0aW9uIGlzIHRlc3RlZCBmcm9tIDA6MCB0byBzaXplOnNpemUsIGlmIHRoZXJlIGFyZSBzb21lIG1vdmVzLCB0aGF0IHNob3VsZCBiZSBjYXB0dXJlZCwgdGhleSB3aWxsIGJlIHJlbW92ZWQuXG5cdCAqIFlvdSBjYW4gdXNlIHRoaXMsIGFmdGVyIGluc2VydGlvbiBvZiBtb3JlIHN0b25lcy5cblx0ICpcblx0ICogQHJldHVybiBhcnJheSByZW1vdmVkIHN0b25lc1xuXHQgKi9cblxuXHR2YWxpZGF0ZVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgYywgcCxcblx0XHQgICAgd2hpdGUgPSAwLFxuXHRcdFx0YmxhY2sgPSAwLFxuXHRcdCAgICBjYXB0dXJlZCA9IFtdLFxuXHRcdCAgICBuZXdfcG9zID0gdGhpcy5wb3NpdGlvbi5jbG9uZSgpO1xuXG5cdFx0Zm9yKHZhciB4ID0gMDsgeCA8IHRoaXMuc2l6ZTsgeCsrKSB7XG5cdFx0XHRmb3IodmFyIHkgPSAwOyB5IDwgdGhpcy5zaXplOyB5KyspIHtcblx0XHRcdFx0YyA9IHRoaXMucG9zaXRpb24uZ2V0KHgseSk7XG5cdFx0XHRcdGlmKGMpIHtcblx0XHRcdFx0XHRwID0gY2FwdHVyZWQubGVuZ3RoO1xuXHRcdFx0XHRcdGNhcHR1cmVkID0gY2FwdHVyZWQuY29uY2F0KGNoZWNrX2NhcHR1cmluZyhuZXdfcG9zLCB4LTEsIHksIC1jKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgICBjaGVja19jYXB0dXJpbmcobmV3X3BvcywgeCsxLCB5LCAtYyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgY2hlY2tfY2FwdHVyaW5nKG5ld19wb3MsIHgsIHktMSwgLWMpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgIGNoZWNrX2NhcHR1cmluZyhuZXdfcG9zLCB4LCB5KzEsIC1jKSk7XG5cblx0XHRcdFx0XHRpZihjID09IFdHby5CKSBibGFjayArPSBjYXB0dXJlZC1wO1xuXHRcdFx0XHRcdGVsc2Ugd2hpdGUgKz0gY2FwdHVyZWQtcDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnBvc2l0aW9uLmNhcENvdW50LmJsYWNrICs9IGJsYWNrO1xuXHRcdHRoaXMucG9zaXRpb24uY2FwQ291bnQud2hpdGUgKz0gd2hpdGU7XG5cdFx0dGhpcy5wb3NpdGlvbi5zY2hlbWEgPSBuZXdfcG9zLnNjaGVtYTtcblxuXHRcdHJldHVybiBjYXB0dXJlZDtcblx0fSxcbn07XG5cbldHby5HYW1lID0gR2FtZTtcbmNvbnNvbGUubG9nKFdHbyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV0dvO1xuIl19
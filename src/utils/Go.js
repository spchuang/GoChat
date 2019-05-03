
var WGo = {
	// basic information
	version: '2.0',

	// constants for colors (rather use WGo.B or WGo.W)
	B: 1,
	W: -1,
};

/**
 * Creates instance of position object.
 *
 * @class
 * <p>WGo.Position is simple object storing position of go game. It is implemented as matrix <em>size</em> x <em>size</em> with values WGo.BLACK, WGo.WHITE or 0. It can be used by any extension.</p>
 *
 * @param {number} size of the board
 */

var Position = function(size) {
	this.size = size;
	this.schema = [];
	for(var i = 0; i < size*size; i++) {
		this.schema[i] = 0;
	}
}

Position.prototype = {
	constructor: WGo.Position,

	/**
	 * Returns value of given coordinates.
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @return {(WGo.BLACK|WGo.WHITE|0)} color
	 */

	get: function(x,y) {
		if(x < 0 || y < 0 || x >= this.size || y >= this.size) return undefined;
		return this.schema[x*this.size+y];
	},

	/**
	 * Sets value of given coordinates.
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @param {(WGo.B|WGo.W|0)} c color
	 */

	set: function(x,y,c) {
		this.schema[x*this.size+y] = c;
		return this;
	},

	/**
	 * Clears the whole position (every value is set to 0).
	 */

	clear: function() {
		for(var i = 0; i < this.size*this.size; i++) this.schema[i] = 0;
		return this;
	},

	/**
	 * Clones the whole position.
	 *
	 * @return {WGo.Position} copy of position
	 */

	clone: function() {
		var clone = new Position(this.size);
		clone.schema = this.schema.slice(0);
		return clone;
	},
}

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

var Game = function(size, repeat) {
	this.size = size || 19;
	this.repeating = repeat === undefined ? 'KO' : repeat; // possible values: KO, ALL or nothing
	this.stack = [];
	this.stack[0] = new Position(size);
	this.stack[0].capCount = {black:0, white:0};
	this.turn = WGo.B;

	Object.defineProperty(this, 'position', {
		get : function(){ return this.stack[this.stack.length-1]; },
		set : function(pos){ this[this.stack.length-1] = pos; }
	});
}

// function for stone capturing
var do_capture = function(position, captured, x, y, c) {
	if(x >= 0 && x < position.size && y >= 0 && y < position.size && position.get(x,y) == c) {
		position.set(x,y,0);
		captured.push({x:x, y:y});

		do_capture(position, captured, x, y-1, c);
		do_capture(position, captured, x, y+1, c);
		do_capture(position, captured, x-1, y, c);
		do_capture(position, captured, x+1, y, c);
	}
}

// looking at liberties
var check_liberties = function(position, testing, x, y, c) {
	// out of the board there aren't liberties
	if(x < 0 || x >= position.size || y < 0 || y >= position.size) return true;
	// however empty field means liberty
	if(position.get(x,y) == 0) return false;
	// already tested field or stone of enemy isn't giving us a liberty.
	if(testing.get(x,y) == true || position.get(x,y) == -c) return true;

	// set this field as tested
	testing.set(x,y,true);

	// in this case we are checking our stone, if we get 4 trues, it has no liberty
	return 	check_liberties(position, testing, x, y-1, c) &&
			check_liberties(position, testing, x, y+1, c) &&
			check_liberties(position, testing, x-1, y, c) &&
			check_liberties(position, testing, x+1, y, c);
}

// analysing function - modifies original position, if there are some capturing, and returns array of captured stones
var check_capturing = function(position, x, y, c) {
	var captured = [];
	// is there a stone possible to capture?
	if(x >= 0 && x < position.size && y >= 0 && y < position.size && position.get(x,y) == c) {
		// create testing map
		var testing = new Position(position.size);
		// if it has zero liberties capture it
		if(check_liberties(position, testing, x, y, c)) {
			// capture stones from game
			do_capture(position, captured, x, y, c);
		}
	}
	return captured;
}

// analysing history
var checkHistory = function(position, x, y) {
	var flag, stop;

	if(this.repeating == 'KO' && this.stack.length-2 >= 0) stop = this.stack.length-2;
	else if(this.repeating == 'ALL') stop = 0;
	else return true;

	for(var i = this.stack.length-2; i >= stop; i--) {
		if(this.stack[i].get(x,y) == position.get(x,y)) {
			flag = true;
			for(var j = 0; j < this.size*this.size; j++) {
				if(this.stack[i].schema[j] != position.schema[j]) {
					flag = false;
					break;
				}
			}
			if(flag) return false;
		}
	}

	return true;
}

Game.prototype = {

	constructor: Game,

	/**
	 * Gets actual position.
	 *
	 * @return {WGo.Position} actual position
	 */

	getPosition: function() {
		return this.stack[this.stack.length-1];
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

	play: function(x,y,c,noplay) {
		//check coordinates validity
		if(!this.isOnBoard(x,y)) return 1;
		if(this.position.get(x,y) != 0) return 2;

		// clone position
		if(!c) c = this.turn;

		var new_pos = this.position.clone();
		new_pos.set(x,y,c);

		// check capturing
		var captured = check_capturing(new_pos, x-1, y, -c).concat(check_capturing(new_pos, x+1, y, -c), check_capturing(new_pos, x, y-1, -c), check_capturing(new_pos, x, y+1, -c));

		// check suicide
		if(!captured.length) {
			var testing = new Position(this.size);
			if(check_liberties(new_pos, testing, x, y, c)) return 3;
		}

		// check history
		if(this.repeating && !checkHistory.call(this, new_pos, x, y)) {
			return 4;
		}

		if(noplay) return false;

		// update position info
		new_pos.color = c;
		new_pos.capCount = {
			black: this.position.capCount.black,
			white: this.position.capCount.white
		};
		if(c == WGo.B) new_pos.capCount.black += captured.length;
		else new_pos.capCount.white += captured.length;

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

	pass: function(c) {
		if(c) this.turn = -c;
		else this.turn = -this.turn;

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

	isValid: function(x,y,c) {
		return typeof this.play(x,y,c,true) != 'number';
	},

	/**
	 * Controls position of the move.
	 *
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @return {boolean} true if move is on board.
	 */

	isOnBoard: function(x,y) {
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

	addStone: function(x,y,c) {
		if(this.isOnBoard(x,y) && this.position.get(x,y) == 0) {
			this.position.set(x,y,c || 0);
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

	removeStone: function(x,y) {
		if(this.isOnBoard(x,y) && this.position.get(x,y) != 0) {
			this.position.set(x,y,0);
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

	setStone: function(x,y,c) {
		if(this.isOnBoard(x,y)) {
			this.position.set(x,y,c || 0);
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

	getStone: function(x,y) {
		if(this.isOnBoard(x,y)) {
			return this.position.get(x,y);
		}
		return 0;
	},

	/**
	 * Add position to stack. If position isn't specified current position is cloned and stacked.
	 * Pointer of actual position is moved to the new position.
	 *
	 * @param {WGo.Position} tmp position (optional)
	 */

	pushPosition: function(pos) {
		if(!pos) {
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

	popPosition: function() {
		var old = null;
		if(this.stack.length > 0) {
			old = this.stack.pop();

			if(this.stack.length == 0) this.turn = WGo.B;
			else if(this.position.color) this.turn = -this.position.color;
			else this.turn = -this.turn;
		}
		return old;
	},

	/**
	 * Removes all positions.
	 */

	firstPosition: function() {
		this.stack = [];
		this.stack[0] = new Position(this.size);
		this.stack[0].capCount = {black:0, white:0};
		this.turn = WGo.B;
		return this;
	},

	/**
	 * Gets count of captured stones.
	 *
	 * @param {(WGo.BLACK|WGo.WHITE)} color
	 * @return {number} count
	 */

	getCaptureCount: function(color) {
		return color == WGo.B ? this.position.capCount.black : this.position.capCount.white;
	},

	/**
	 * Validate postion. Position is tested from 0:0 to size:size, if there are some moves, that should be captured, they will be removed.
	 * You can use this, after insertion of more stones.
	 *
	 * @return array removed stones
	 */

	validatePosition: function() {
		var c, p,
		    white = 0,
			black = 0,
		    captured = [],
		    new_pos = this.position.clone();

		for(var x = 0; x < this.size; x++) {
			for(var y = 0; y < this.size; y++) {
				c = this.position.get(x,y);
				if(c) {
					p = captured.length;
					captured = captured.concat(check_capturing(new_pos, x-1, y, -c),
											   check_capturing(new_pos, x+1, y, -c),
											   check_capturing(new_pos, x, y-1, -c),
											   check_capturing(new_pos, x, y+1, -c));

					if(c == WGo.B) black += captured-p;
					else white += captured-p;
				}
			}
		}
		this.position.capCount.black += black;
		this.position.capCount.white += white;
		this.position.schema = new_pos.schema;

		return captured;
	},
};

WGo.Game = Game;
console.log(WGo);

module.exports = WGo;

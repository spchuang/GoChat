/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classNames = __webpack_require__(3);

	var _classNames2 = _interopRequireDefault(_classNames);

	var _OverlaySpinner = __webpack_require__(4);

	var _OverlaySpinner2 = _interopRequireDefault(_OverlaySpinner);

	var _GoBoardPlayer = __webpack_require__(5);

	var _GoBoardPlayer2 = _interopRequireDefault(_GoBoardPlayer);

	var _UserLoaderContainer = __webpack_require__(12);

	var _UserLoaderContainer2 = _interopRequireDefault(_UserLoaderContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BOARD_SIZES_OPTIONS = [9, 13, 19];
	var EMPTY_BOARD_ID = 'empty';

	var SimulateBoardContainer = function (_React$Component) {
	  _inherits(SimulateBoardContainer, _React$Component);

	  function SimulateBoardContainer(props) {
	    _classCallCheck(this, SimulateBoardContainer);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimulateBoardContainer).call(this, props));

	    _this._handleBoardSizeChange = function (evt) {
	      _this.setState({ emptyBoardSize: evt.target.value });
	    };

	    _this._handleGameChange = function (evt) {
	      _this.setState({ selectedGameID: evt.target.value });
	    };

	    _this.state = {
	      selectedGameID: props.focusedOnGameID ? props.focusedOnGameID : EMPTY_BOARD_ID,
	      emptyBoardSize: 19
	    };
	    return _this;
	  }

	  _createClass(SimulateBoardContainer, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var error = this._userNotInGames() ? this._renderInfoAlert(this.props.text.noGameMessage) : null;

	      var layout = void 0;
	      var game = void 0;
	      if (this.state.selectedGameID === EMPTY_BOARD_ID) {
	        // load an empty board type
	        layout = {
	          top: ['Control']
	        };
	        game = {
	          move: 0,
	          sgf: '(;SZ[' + this.state.emptyBoardSize + '])'
	        };
	      } else {
	        game = this.props.games.find(function (g) {
	          return g.id === _this2.state.selectedGameID;
	        });
	        console.log(game);
	        layout = {
	          top: ['Control', 'InfoBox']
	        };
	      }
	      return _react2.default.createElement(
	        'div',
	        { className: 'createGameWrapper' },
	        _react2.default.createElement(
	          'div',
	          { className: 'container' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3' },
	              error,
	              this._renderGameSelector(),
	              this._renderEmptyBoardSizeSelector(),
	              _react2.default.createElement(_GoBoardPlayer2.default, {
	                layout: { top: ['Control', 'InfoBox'] },
	                move: game.move,
	                sgf: game.sgf,
	                mode: 'edit'
	              })
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: '_userNotInGames',
	    value: function _userNotInGames() {
	      return this.props.games.length === 0;
	    }
	  }, {
	    key: '_renderGameSelector',
	    value: function _renderGameSelector() {
	      // when we load gameID directly, we only wnat to view that game.
	      if (this.props.loadSingleGameOnly) {
	        return null;
	      }

	      if (this._userNotInGames()) {
	        return null;
	      }

	      var options = this.props.games.map(function (game) {
	        var id = game.id;
	        return _react2.default.createElement(
	          'option',
	          { key: id, value: id },
	          game.opponentName
	        );
	      });

	      return _react2.default.createElement(
	        'div',
	        { className: 'form-horizontal' },
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            { className: 'col-sm-3 control-label' },
	            this.props.text.selectGameLabel
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-9' },
	            _react2.default.createElement(
	              'select',
	              {
	                className: 'form-control',
	                value: this.state.selectedGameID,
	                onChange: this._handleGameChange },
	              options,
	              _react2.default.createElement(
	                'option',
	                { value: EMPTY_BOARD_ID },
	                this.props.text.emptyBoardOption
	              )
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: '_renderEmptyBoardSizeSelector',
	    value: function _renderEmptyBoardSizeSelector() {
	      if (this.state.selectedGameID !== EMPTY_BOARD_ID) {
	        return null;
	      }
	      var options = BOARD_SIZES_OPTIONS.map(function (size) {
	        return _react2.default.createElement(
	          'option',
	          { key: size, value: size },
	          size
	        );
	      });

	      return _react2.default.createElement(
	        'div',
	        { className: 'form-horizontal' },
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            { className: 'col-sm-3 control-label' },
	            this.props.text.selectBoardSizeLabel
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-9' },
	            _react2.default.createElement(
	              'select',
	              {
	                className: 'form-control',
	                value: this.state.emptyBoardSize,
	                onChange: this._handleBoardSizeChange },
	              options
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: '_renderInfoAlert',
	    value: function _renderInfoAlert(errorText) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'alertHeader alert alert-info', role: 'alert' },
	        errorText
	      );
	    }
	  }]);

	  return SimulateBoardContainer;
	}(_react2.default.Component);

	SimulateBoardContainer.propTypes = {
	  userID: _react.PropTypes.string.isRequired,
	  text: _react.PropTypes.object.isRequired,
	  games: _react.PropTypes.array.isRequired,
	  focusedOnGameID: _react.PropTypes.number
	};


		_UserLoaderContainer2.default.setup(SimulateBoardContainer);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OverlaySpinner = function (_React$PureComponent) {
	  _inherits(OverlaySpinner, _React$PureComponent);

	  function OverlaySpinner() {
	    _classCallCheck(this, OverlaySpinner);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(OverlaySpinner).apply(this, arguments));
	  }

	  _createClass(OverlaySpinner, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'spinnerOverlay' },
	        _react2.default.createElement('div', { className: 'spinner' })
	      );
	    }
	  }]);

	  return OverlaySpinner;
	}(_react2.default.PureComponent);

		module.exports = OverlaySpinner;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _WGo = __webpack_require__(6);

	var _WGo2 = _interopRequireDefault(_WGo);

	var _deepEqual = __webpack_require__(7);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _invariant = __webpack_require__(10);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WGoPlayerConfig = {
	  board: {
	    background: '/web/images/wood1.jpg'
	  },
	  enableWheel: false,
	  lockScroll: false,
	  update: function update(e) {
	    // do something later
	  }
	};

	var GoBoardPlayer = function (_React$PureComponent) {
	  _inherits(GoBoardPlayer, _React$PureComponent);

	  function GoBoardPlayer() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, GoBoardPlayer);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(GoBoardPlayer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._handleScoreUpdate = function (msg) {
	      // WGO player returns html message for scores so
	      // I need to manually transform them
	      var text = msg.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g, '');

	      // \d+(\.\d{1,2})? matches decimal
	      var m = text.match(/((\d+(\.\d{1,2})?)\+)+(\d+(\.\d{1,2})?)=(\d+(\.\d{1,2})?)/g);
	      (0, _invariant2.default)(m, 'for flow');

	      // territory + x, territory + w + komi
	      var blackScores = m[0].split('=')[0].split('+').map(function (num) {
	        return parseFloat(num);
	      });
	      var whiteScores = m[1].split('=')[0].split('+').map(function (num) {
	        return parseFloat(num);
	      });

	      _this.props.onScoreUpdate && _this.props.onScoreUpdate({
	        blackTerritory: blackScores[0],
	        blackCapture: blackScores[1],
	        whiteTerritory: whiteScores[0],
	        whiteCapture: whiteScores[1],
	        komi: whiteScores[2]
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(GoBoardPlayer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._updateWGoPlayer();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      this._updateWGoPlayer();
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return !(0, _deepEqual2.default)(nextProps, this.props);
	    }
	  }, {
	    key: '_updateWGoPlayer',
	    value: function _updateWGoPlayer() {
	      var _this2 = this;

	      this._player = new _WGo2.default.BasicPlayer(this._playerDiv, _extends({}, WGoPlayerConfig, {
	        layout: this.props.layout,
	        move: this.props.move,
	        sgf: this.props.sgf
	      }));

	      if (this.props.mode === 'view') {
	        // load the board based on prop instead of sgf
	        this._player.board.removeAllObjects();
	        (0, _invariant2.default)(this.props.viewBoard, 'for flow');
	        this.props.viewBoard.forEach(function (rowObjects) {
	          (0, _invariant2.default)(_this2._player, 'for flow');
	          _this2._player.board.addObject(rowObjects);
	        });
	      } else if (this.props.mode === 'score') {
	        this._player.setFrozen(true);

	        (0, _invariant2.default)(this._player, 'for flow');
	        this._score_mode = new _WGo2.default.ScoreMode(this._player.kifuReader.game.position, this._player.board, this._player.kifu.info.KM || 0, this._handleScoreUpdate);
	        this._score_mode.start();
	      } else if (this.props.mode === 'edit') {
	        var editable = new _WGo2.default.Player.Editable(this._player, this._player.board);
	        editable.set(true);
	      } else {
	        throw new Error("invalid player mode");
	      }
	    }
	  }, {
	    key: 'getWGOPlayer',
	    value: function getWGOPlayer() {
	      return this._player;
	    }
	  }, {
	    key: 'getBoardObject',
	    value: function getBoardObject() {
	      (0, _invariant2.default)(this._player, 'for flow');
	      return this._player.board.obj_arr;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      return _react2.default.createElement('div', { ref: function ref(playerDiv) {
	          _this3._playerDiv = playerDiv;
	        } });
	    }
	  }]);

	  return GoBoardPlayer;
	}(_react2.default.PureComponent);

		module.exports = GoBoardPlayer;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = WGo;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(8);
	var isArguments = __webpack_require__(9);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(13);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classNames = __webpack_require__(3);

	var _classNames2 = _interopRequireDefault(_classNames);

	var _OverlaySpinner = __webpack_require__(4);

	var _OverlaySpinner2 = _interopRequireDefault(_OverlaySpinner);

	var _Footer = __webpack_require__(14);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _WebViewUtils = __webpack_require__(16);

	var _WebViewUtils2 = _interopRequireDefault(_WebViewUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UserLoaderContainer = function (_React$Component) {
	  _inherits(UserLoaderContainer, _React$Component);

	  function UserLoaderContainer(props) {
	    _classCallCheck(this, UserLoaderContainer);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserLoaderContainer).call(this, props));

	    _this._submit = function () {
	      _this._fetchProps({ u: _this.state.token }, function () {
	        _WebViewUtils2.default.storeUserToken(_this.state.token);
	      });
	    };

	    var userID = props.userID;

	    var restProps = _objectWithoutProperties(props, ['userID']);

	    _this.state = {
	      userID: userID,
	      componentProps: restProps,
	      error: null,
	      showTokenInput: false,
	      loading: false,
	      token: ''
	    };
	    return _this;
	  }

	  _createClass(UserLoaderContainer, [{
	    key: 'getIsInitialize',
	    value: function getIsInitialize() {
	      return !!this.state.userID;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (this.getIsInitialize()) {
	        return;
	      }

	      _WebViewUtils2.default.isInExtention(function (isInExtention) {
	        if (!isInExtention) {
	          // try to fetch from cookie
	          var _token = _WebViewUtils2.default.getUserToken();
	          if (_token) {
	            _this2._fetchProps({ u: _token }, function () {}, function () {
	              // It's possible token is stored but is no longer valid
	              _this2.setState({
	                showTokenInput: true
	              });
	            });
	          } else {
	            _this2.setState({
	              showTokenInput: true
	            });
	          }

	          return;
	        }

	        _WebViewUtils2.default.getUserID(function (userFBID) {
	          _this2._fetchProps({ fbid: userFBID });
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.getIsInitialize()) {
	        return this._renderUninitializedView();
	      }

	      var Component = this.props.Component;
	      return _react2.default.createElement(Component, _extends({
	        userID: this.state.userID
	      }, this.state.componentProps));
	    }
	  }, {
	    key: '_renderUninitializedView',
	    value: function _renderUninitializedView() {
	      var content = this.state.showTokenInput ? _react2.default.createElement(
	        'div',
	        null,
	        this._renderErrorAlert(),
	        _react2.default.createElement(
	          'h5',
	          null,
	          _react2.default.createElement(
	            'label',
	            null,
	            this.props.text.notSupportedText
	          )
	        ),
	        this._renderTokenInput()
	      ) : _react2.default.createElement(_OverlaySpinner2.default, null);

	      var footer = this.state.showTokenInput ? this._renderFooter() : null;

	      return _react2.default.createElement(
	        'div',
	        null,
	        this.state.loading ? _react2.default.createElement(_OverlaySpinner2.default, null) : null,
	        _react2.default.createElement(
	          'div',
	          { className: 'container' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3' },
	              content
	            )
	          )
	        ),
	        footer
	      );
	    }
	  }, {
	    key: '_renderErrorAlert',
	    value: function _renderErrorAlert() {
	      if (!this.state.error) {
	        return null;
	      }
	      return _react2.default.createElement(
	        'div',
	        { className: 'alertHeader alert alert-danger', role: 'alert' },
	        this.state.error
	      );
	    }
	  }, {
	    key: '_renderTokenInput',
	    value: function _renderTokenInput() {
	      var _this3 = this;

	      return _react2.default.createElement(
	        'div',
	        { className: 'form-group' },
	        _react2.default.createElement('input', {
	          className: 'form-control',
	          'class': 'form-control',
	          placeholder: '<token>',
	          value: this.state.token,
	          onChange: function onChange(event) {
	            return _this3.setState({ token: event.target.value });
	          }
	        })
	      );
	    }
	  }, {
	    key: '_renderFooter',
	    value: function _renderFooter() {
	      return _react2.default.createElement(_Footer2.default, {
	        text: this.props.text.enterButton,
	        onClick: this._submit
	      });
	    }
	  }, {
	    key: '_fetchProps',
	    value: function _fetchProps(req, success, fail) {
	      var _this4 = this;

	      _jquery2.default.get(this.props.jsonURL, req).done(function (res) {
	        var userID = res.userID;

	        var restProps = _objectWithoutProperties(res, ['userID']);

	        _this4.setState({
	          userID: userID,
	          componentProps: restProps
	        });

	        success && success();
	      }).fail(function (res) {
	        _this4.setState({
	          error: res.responseText
	        });
	        fail && fail();
	      });
	    }

	    // submit the bot token and store in cookie

	  }]);

	  return UserLoaderContainer;
	}(_react2.default.Component);

	module.exports = {
	  setup: function setup(Component) {
	    global.setup = function (rootID, props, getPropsURL) {
	      _reactDom2.default.render(_react2.default.createElement(UserLoaderContainer, _extends({}, props, {
	        Component: Component,
	        jsonURL: getPropsURL
	      })), document.getElementById(rootID));
	    };
	  }
		};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _FooterWrapper = __webpack_require__(15);

	var _FooterWrapper2 = _interopRequireDefault(_FooterWrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Footer = function (_React$PureComponent) {
	  _inherits(Footer, _React$PureComponent);

	  function Footer() {
	    _classCallCheck(this, Footer);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).apply(this, arguments));
	  }

	  _createClass(Footer, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _FooterWrapper2.default,
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3' },
	          _react2.default.createElement(
	            'button',
	            {
	              type: 'button',
	              className: 'btn btn-primary btn-lg btn-block',
	              disabled: this.props.disabled,
	              onClick: this.props.onClick },
	            this.props.text
	          )
	        )
	      );
	    }
	  }]);

	  return Footer;
	}(_react2.default.PureComponent);

		module.exports = Footer;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FooterWrapper = function (_React$PureComponent) {
	  _inherits(FooterWrapper, _React$PureComponent);

	  function FooterWrapper() {
	    _classCallCheck(this, FooterWrapper);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(FooterWrapper).apply(this, arguments));
	  }

	  _createClass(FooterWrapper, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'footer' },
	        _react2.default.createElement(
	          'div',
	          { className: 'container' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            this.props.children
	          )
	        )
	      );
	    }
	  }]);

	  return FooterWrapper;
	}(_react2.default.PureComponent);

		module.exports = FooterWrapper;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var MessengerExtensions = null;

	// FB Messenger plugin is loaded asynchornously. We would use a polling approach
	// to make sure the extension is loaded.
	window.extAsyncInit = function () {
	  MessengerExtensions = __webpack_require__(17);
	};

	// check if MessengerExtension is initialized
	function getExtension(success) {
	  console.log(MessengerExtensions);
	  if (MessengerExtensions) {
	    success(MessengerExtensions);
	    return;
	  }
	  setTimeout(getExtension, 150, success);
	}

	function isInExtention(success) {
	  getExtension(function (MessengerExtensions) {
	    success(MessengerExtensions.isInExtension());
	  });
	}

	function getUserID(success) {
	  getExtension(function (MessengerExtensions) {
	    ;
	    MessengerExtensions.getSupportedFeatures(function (result) {
	      console.log(result);
	    }, function (err) {
	      console.log(err);
	    });

	    MessengerExtensions.getUserID(function (uids) {
	      success(uids.psid);
	    }, function error(err, errorMessage) {
	      // doesn't work on desktop so use context
	      MessengerExtensions.getContext('1833481820212349', // app_id
	      function (result) {
	        console.log(result.psid);
	        success(result.psid);
	      }, function (err) {
	        console.log(err);
	      });
	    });
	  });
	}

	function closeWebView() {
	  var MessengerExtensions = __webpack_require__(17);
	  var isSupported = MessengerExtensions.isInExtension();

	  if (isSupported) {
	    MessengerExtensions.requestCloseBrowser(function success() {}, function error(err) {});
	  } else {
	    window.close();
	  }
	}

	function storeUserToken(id) {
	  _setCookie('u', id, 28);
	}

	function getUserToken() {
	  return getCookie('u');
	}

	function _setCookie(cname, cvalue, exdays) {
	  var d = new Date();
	  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	  var expires = "expires=" + d.toUTCString();
	  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for (var i = 0; i < ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
	}

	module.exports = {
	  closeWebView: closeWebView,
	  getUserID: getUserID,
	  isInExtention: isInExtention,
	  storeUserToken: storeUserToken,
	  getUserToken: getUserToken
		};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = MessengerExtensions;

/***/ }
/******/ ]);
//# sourceMappingURL=SimulateBoardContainer.dev.js.map
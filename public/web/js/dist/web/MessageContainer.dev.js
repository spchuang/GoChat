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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _classNames = __webpack_require__(4);

	var _classNames2 = _interopRequireDefault(_classNames);

	var _MessageStore = __webpack_require__(5);

	var _MessageStore2 = _interopRequireDefault(_MessageStore);

	var _OverlaySpinner = __webpack_require__(8);

	var _OverlaySpinner2 = _interopRequireDefault(_OverlaySpinner);

	var _UserLoaderContainer = __webpack_require__(9);

	var _UserLoaderContainer2 = _interopRequireDefault(_UserLoaderContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MessageContainer = function (_React$Component) {
	  _inherits(MessageContainer, _React$Component);

	  function MessageContainer(props) {
	    _classCallCheck(this, MessageContainer);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MessageContainer).call(this, props));

	    _this._messageContainer = null;

	    _this._handleChange = function (evt) {
	      _this.setState({
	        val: evt.target.value
	      });
	    };

	    _this._handleSend = function () {
	      _this.setState({ loading: true });
	      _this._store.sendMessage(_this.state.val, function () {
	        _this.setState({ val: '', loading: false });
	      }, function () {
	        _this.setState({ loading: false });
	      });
	    };

	    _this._handleMessageContainerScroll = function (evt) {
	      if ((0, _jquery2.default)(window).scrollTop() < 50 && _this.state.hasMore) {
	        _this._store.getPreviousMessages();
	      }
	    };

	    _this._store = new _MessageStore2.default(props);
	    _this.state = _extends({
	      val: '',
	      loading: false
	    }, _this._store.getState());
	    return _this;
	  }

	  _createClass(MessageContainer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      this._scrollToBottom();
	      this._store.startPolling();
	      this._store.addChangeListener(function () {
	        var state = _this2._store.getState();
	        _this2.setState(state);
	      });

	      this._scrollHeight = (0, _jquery2.default)(document.body).prop('scrollHeight');
	      this._scrollTop = (0, _jquery2.default)(window).scrollTop();
	      window.addEventListener('scroll', this._handleMessageContainerScroll);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      ;
	      window.removeEventListener('scroll', this._handleMessageContainerScroll);
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate() {
	      this._scrollHeight = (0, _jquery2.default)(document.body).prop('scrollHeight');
	      this._scrollTop = (0, _jquery2.default)(window).scrollTop();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (prevState.messages && this.state.messages && this.state.messages[this.state.messages.length - 1].id > prevState.messages[prevState.messages.length - 1].id) {
	        this._scrollToBottom();
	      } else {
	        // restore original scroll position
	        if (this._scrollTop !== null && // handle 0 case
	        this._scrollHeight) {
	          (0, _jquery2.default)(window).scrollTop(this._scrollTop + ((0, _jquery2.default)(document.body).prop('scrollHeight') - this._scrollHeight));
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'message-chat-view' },
	        this._renderMessages(),
	        this._renderFooter()
	      );
	    }
	  }, {
	    key: '_renderMessages',
	    value: function _renderMessages() {
	      var _this3 = this;

	      var messages = this.state.messages.map(function (m) {
	        return _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'span',
	            { className: (0, _classNames2.default)('message', 'message-bubble', {
	                'me': m.receiverID === _this3.props.receiverID
	              }) },
	            m.content
	          ),
	          _react2.default.createElement('div', { className: 'clear' })
	        );
	      });

	      var spinner = this.state.hasMore ? _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('div', { className: 'spinner' })
	      ) : null;

	      return _react2.default.createElement(
	        'div',
	        {
	          className: 'message-content',
	          ref: function ref(el) {
	            _this3._messageContainer = el;
	          } },
	        spinner,
	        messages
	      );
	    }
	  }, {
	    key: '_renderFooter',
	    value: function _renderFooter() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'message-chat-footer' },
	        _react2.default.createElement(
	          'div',
	          { className: 'input-group' },
	          _react2.default.createElement('input', {
	            type: 'text',
	            value: this.state.val,
	            className: 'form-control input-lg',
	            placeholder: this.props.text.messageInputPlaceholder,
	            onChange: this._handleChange,
	            disabled: this.state.loading,
	            autoFocus: true
	          }),
	          _react2.default.createElement(
	            'span',
	            { className: 'input-group-btn' },
	            _react2.default.createElement(
	              'button',
	              {
	                className: 'btn btn-primary btn-lg',
	                onClick: this._handleSend,
	                disabled: !this.state.val || this.state.loading },
	              _react2.default.createElement('span', { className: 'glyphicon glyphicon-send' })
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: '_scrollToBottom',
	    value: function _scrollToBottom() {
	      (0, _jquery2.default)(window).scrollTop((0, _jquery2.default)(window).height());
	    }
	  }]);

	  return MessageContainer;
	}(_react2.default.Component);

		_UserLoaderContainer2.default.setup(MessageContainer);

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
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _EventStore2 = __webpack_require__(6);

	var _EventStore3 = _interopRequireDefault(_EventStore2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var POLLING_INTERVAL = 2000;
	var BASE_URL = '/message';

	var MessageStore = function (_EventStore) {
	  _inherits(MessageStore, _EventStore);

	  function MessageStore(params) {
	    _classCallCheck(this, MessageStore);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MessageStore).call(this));

	    _this._messages = [];

	    _this._addMessages(params.messages);
	    _this._receiverID = params.receiverID;
	    _this._userID = params.userID;
	    _this._hasMore = params.hasMore;
	    _this._loadingPreviousMessage = false;
	    return _this;
	  }

	  _createClass(MessageStore, [{
	    key: 'startPolling',
	    value: function startPolling() {
	      var _this2 = this;

	      var query = {
	        u: this._userID,
	        receiverID: this._receiverID
	      };
	      if (this._messages.length > 0) {
	        query.afterMessageID = this._messages[this._messages.length - 1].id;
	      }

	      // get all the local messages
	      _jquery2.default.get(BASE_URL + '/getAfter', query).done(function (res) {
	        if (res.messages && res.messages.length > 0) {
	          _this2._addMessagesAndEmitChange(res.messages);
	        }
	        setTimeout(_this2.startPolling.bind(_this2), POLLING_INTERVAL);
	      }).fail(function (res) {
	        console.log(res);
	        setTimeout(_this2.startPolling.bind(_this2), POLLING_INTERVAL);
	      });
	    }
	  }, {
	    key: 'getState',
	    value: function getState() {
	      // clone the messages for react
	      return {
	        messages: this._messages.slice(0),
	        hasMore: this._hasMore
	      };
	    }
	  }, {
	    key: 'getPreviousMessages',
	    value: function getPreviousMessages() {
	      var _this3 = this;

	      if (this._loadingPreviousMessage) {
	        return;
	      }

	      this._loadingPreviousMessage = true;
	      var query = {
	        u: this._userID,
	        receiverID: this._receiverID
	      };
	      if (this._messages.length > 0) {
	        query.beforeMessageID = this._messages[0].id;
	      }

	      // get all the local messages
	      _jquery2.default.get(BASE_URL + '/getBefore', query).done(function (res) {
	        if (res.messages && res.messages.length > 0) {
	          _this3._hasMore = res.hasMore;
	          _this3._addMessagesAndEmitChange(res.messages);
	        }
	        _this3._loadingPreviousMessage = false;
	      }).fail(function (res) {
	        _this3._loadingPreviousMessage = false;
	      });
	    }
	  }, {
	    key: 'sendMessage',
	    value: function sendMessage(content, success, fail) {
	      var _this4 = this;

	      // TODO: optimistic update?
	      _jquery2.default.post(BASE_URL + '/send', {
	        content: content,
	        u: this._userID,
	        receiverID: this._receiverID
	      }).done(function (res) {
	        if (res.message) {
	          _this4._addMessagesAndEmitChange([res.message]);
	        }
	        success();
	      }).fail(function (res) {
	        fail();
	      });
	    }
	  }, {
	    key: '_addMessagesAndEmitChange',
	    value: function _addMessagesAndEmitChange(messages) {
	      this._addMessages(messages);
	      this.emitChange();
	    }
	  }, {
	    key: '_addMessages',
	    value: function _addMessages(messages) {
	      // concat and remove duplicates
	      this._messages = dedupeByKey(this._messages.concat(messages), 'id');
	      this._messages.sort(function (a, b) {
	        return a.id - b.id;
	      });
	    }
	  }]);

	  return MessageStore;
	}(_EventStore3.default);

	function dedupeByKey(arr, key) {
	  var tmp = {};
	  return arr.reduce(function (p, c) {
	    var k = c[key];
	    if (tmp[k]) return p;
	    tmp[k] = true;
	    return p.concat(c);
	  }, []);
	}

	module.exports = MessageStore;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(7);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CHANGE_EVENT = 'change';

	var EventStore = function (_events$EventEmitter) {
	  _inherits(EventStore, _events$EventEmitter);

	  function EventStore() {
	    _classCallCheck(this, EventStore);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(EventStore).apply(this, arguments));
	  }

	  _createClass(EventStore, [{
	    key: 'emitChange',
	    value: function emitChange() {
	      this.emit(CHANGE_EVENT);
	    }
	  }, {
	    key: 'addChangeListener',
	    value: function addChangeListener(callback) {
	      this.on(CHANGE_EVENT, callback);
	    }
	  }, {
	    key: 'removeChangeListener',
	    value: function removeChangeListener(callback) {
	      this.removeListener(CHANGE_EVENT, callback);
	    }
	  }]);

	  return EventStore;
	}(_events2.default.EventEmitter);

		module.exports = EventStore;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classNames = __webpack_require__(4);

	var _classNames2 = _interopRequireDefault(_classNames);

	var _OverlaySpinner = __webpack_require__(8);

	var _OverlaySpinner2 = _interopRequireDefault(_OverlaySpinner);

	var _Footer = __webpack_require__(10);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _WebViewUtils = __webpack_require__(12);

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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _FooterWrapper = __webpack_require__(11);

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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var MessengerExtensions = null;

	// FB Messenger plugin is loaded asynchornously. We would use a polling approach
	// to make sure the extension is loaded.
	window.extAsyncInit = function () {
	  MessengerExtensions = __webpack_require__(13);
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
	  var MessengerExtensions = __webpack_require__(13);
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
/* 13 */
/***/ function(module, exports) {

	module.exports = MessengerExtensions;

/***/ }
/******/ ]);
//# sourceMappingURL=MessageContainer.dev.js.map
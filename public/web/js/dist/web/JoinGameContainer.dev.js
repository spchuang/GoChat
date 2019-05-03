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

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classNames = __webpack_require__(4);

	var _classNames2 = _interopRequireDefault(_classNames);

	var _CreateGameInput = __webpack_require__(5);

	var _CreateGameInput2 = _interopRequireDefault(_CreateGameInput);

	var _OverlaySpinner = __webpack_require__(6);

	var _OverlaySpinner2 = _interopRequireDefault(_OverlaySpinner);

	var _WebViewUtils = __webpack_require__(7);

	var _WebViewUtils2 = _interopRequireDefault(_WebViewUtils);

	var _UserLoaderContainer = __webpack_require__(9);

	var _UserLoaderContainer2 = _interopRequireDefault(_UserLoaderContainer);

	var _Footer = __webpack_require__(10);

	var _Footer2 = _interopRequireDefault(_Footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var JOIN_URL = '/joinGame/join';

	var JoinGameContainer = _react2.default.createClass({
	  displayName: 'JoinGameContainer',

	  propTypes: {
	    userID: _react.PropTypes.string.isRequired,
	    text: _react.PropTypes.object.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      loading: false,
	      code: '',
	      error: null
	    };
	  },
	  render: function render() {
	    var loadingSpinner = this.state.loading ? _react2.default.createElement(_OverlaySpinner2.default, null) : null;
	    return _react2.default.createElement(
	      'div',
	      { className: 'createGameWrapper' },
	      loadingSpinner,
	      _react2.default.createElement(
	        'div',
	        { className: 'container' },
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3' },
	            _react2.default.createElement(
	              'h5',
	              null,
	              _react2.default.createElement(
	                'label',
	                null,
	                this.props.text.enterCodeForRoom
	              )
	            ),
	            this._renderErrorAlert(),
	            this._renderGameRoomCode()
	          )
	        )
	      ),
	      this._renderFooter()
	    );
	  },
	  _renderInfo: function _renderInfo() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'alert alert-info' },
	      this.props.text.enterCodeForRoom
	    );
	  },
	  _renderErrorAlert: function _renderErrorAlert() {
	    var errorText = null;

	    if (this.state.error) {
	      errorText = this.state.error.message;
	    }

	    if (!errorText) {
	      return null;
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'alertHeader alert alert-danger', role: 'alert' },
	      errorText
	    );
	  },
	  _renderGameRoomCode: function _renderGameRoomCode() {
	    var _this = this;

	    return _react2.default.createElement(
	      'div',
	      { className: 'form-group' },
	      _react2.default.createElement('input', {
	        className: 'form-control',
	        type: 'number',
	        pattern: '\\d*',
	        'class': 'form-control',
	        placeholder: '12345',
	        value: this.state.code,
	        onChange: function onChange(event) {
	          return _this.setState({ code: event.target.value });
	        }
	      })
	    );
	  },
	  _renderFooter: function _renderFooter() {
	    return _react2.default.createElement(_Footer2.default, {
	      text: this.props.text.joinButton,
	      onClick: this._submit
	    });
	  },
	  _isDisabled: function _isDisabled() {
	    return false;
	  },
	  _submit: function _submit() {
	    var _this2 = this;

	    var _state = this.state;
	    var loading = _state.loading;

	    var state = _objectWithoutProperties(_state, ['loading']);

	    var data = _extends({}, state, {
	      u: this.props.userID
	    });
	    this.setState({ loading: true, error: null });
	    _jquery2.default.post(JOIN_URL, data).done(function (res) {
	      _this2.setState({ loading: false });
	      _WebViewUtils2.default.closeWebView();
	    }).fail(function (res) {
	      _this2.setState({
	        loading: false,
	        error: res.responseJSON.error
	      });
	    });
	  }
	});

		_UserLoaderContainer2.default.setup(JoinGameContainer);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

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

	var _classNames = __webpack_require__(4);

	var _classNames2 = _interopRequireDefault(_classNames);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CreateGameInput = _react2.default.createClass({
	  displayName: 'CreateGameInput',

	  propTypes: {
	    label: _react.PropTypes.string.isRequired,
	    value: _react.PropTypes.any.isRequired,
	    options: _react.PropTypes.arrayOf(_react.PropTypes.any).isRequired,
	    onChange: _react.PropTypes.func.isRequired,
	    optionText: _react.PropTypes.func.isRequired,
	    disabled: _react.PropTypes.bool.isRequired
	  },

	  render: function render() {
	    var _this = this;

	    var buttons = this.props.options.map(function (option) {
	      return _react2.default.createElement(
	        'button',
	        {
	          key: option,
	          className: (0, _classNames2.default)('btn btn-default btn-lg', { 'active': option === _this.props.value }),
	          disabled: _this.props.disabled,
	          onClick: function onClick() {
	            return _this.props.onChange(option);
	          } },
	        _this.props.optionText(option)
	      );
	    });
	    return _react2.default.createElement(
	      'div',
	      { className: 'form-group' },
	      _react2.default.createElement(
	        'h4',
	        null,
	        _react2.default.createElement(
	          'label',
	          null,
	          this.props.label
	        )
	      ),
	      buttons
	    );
	  }
	});

		module.exports = CreateGameInput;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var MessengerExtensions = null;

	// FB Messenger plugin is loaded asynchornously. We would use a polling approach
	// to make sure the extension is loaded.
	window.extAsyncInit = function () {
	  MessengerExtensions = __webpack_require__(8);
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
	  var MessengerExtensions = __webpack_require__(8);
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
/* 8 */
/***/ function(module, exports) {

	module.exports = MessengerExtensions;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classNames = __webpack_require__(4);

	var _classNames2 = _interopRequireDefault(_classNames);

	var _OverlaySpinner = __webpack_require__(6);

	var _OverlaySpinner2 = _interopRequireDefault(_OverlaySpinner);

	var _Footer = __webpack_require__(10);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _WebViewUtils = __webpack_require__(7);

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

	var _react = __webpack_require__(2);

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

	var _react = __webpack_require__(2);

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

/***/ }
/******/ ]);
//# sourceMappingURL=JoinGameContainer.dev.js.map
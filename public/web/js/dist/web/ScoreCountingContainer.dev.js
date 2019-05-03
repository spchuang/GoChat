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

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classNames = __webpack_require__(4);

	var _classNames2 = _interopRequireDefault(_classNames);

	var _OverlaySpinner = __webpack_require__(5);

	var _OverlaySpinner2 = _interopRequireDefault(_OverlaySpinner);

	var _GoBoardPlayer = __webpack_require__(6);

	var _GoBoardPlayer2 = _interopRequireDefault(_GoBoardPlayer);

	var _UserLoaderContainer = __webpack_require__(13);

	var _UserLoaderContainer2 = _interopRequireDefault(_UserLoaderContainer);

	var _Footer = __webpack_require__(14);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _WebViewUtils = __webpack_require__(16);

	var _WebViewUtils2 = _interopRequireDefault(_WebViewUtils);

	var _FooterWrapper = __webpack_require__(15);

	var _FooterWrapper2 = _interopRequireDefault(_FooterWrapper);

	var _invariant = __webpack_require__(11);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CREATE_URL = '/countScore/create';
	var UPDATE_URL = '/countScore/update';
	var ACCEPT_URL = '/countScore/accept';
	var REJECT_URL = '/countScore/reject';

	function getResultText(whiteScore, blackScore) {
	  return (whiteScore > blackScore ? 'W+' : 'B+') + Math.abs(whiteScore - blackScore);
	}

	var ScoreCountingContainer = function (_React$Component) {
	  _inherits(ScoreCountingContainer, _React$Component);

	  function ScoreCountingContainer(props) {
	    _classCallCheck(this, ScoreCountingContainer);

	    // TODO: handle viewing when game is resigned (no scoring data available);

	    // there are 3 modes: create, update and view.
	    // create: only in this mode when there are no scorings at all
	    // view: by default, if there are scorings, we will view the first scorings
	    // when user click "update" on his own scoring, we enter update mode

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScoreCountingContainer).call(this, props));

	    _this._handleScoreUpdate = function (_ref) {
	      var blackTerritory = _ref.blackTerritory;
	      var blackCapture = _ref.blackCapture;
	      var whiteTerritory = _ref.whiteTerritory;
	      var whiteCapture = _ref.whiteCapture;
	      var komi = _ref.komi;

	      _this.setState({
	        newScoringData: { blackTerritory: blackTerritory, blackCapture: blackCapture, whiteTerritory: whiteTerritory, whiteCapture: whiteCapture }
	      });
	    };

	    _this._submit = function (url, data) {
	      _this.setState({ loading: true, error: null });
	      data = _extends({}, data, {
	        gameID: _this.props.gameInfo.id,
	        u: _this.props.userID
	      });
	      _jquery2.default.post(url, data, 'json').done(function () {
	        _this.setState({ loading: false });
	        _WebViewUtils2.default.closeWebView();
	      }).fail(function (res) {
	        _this.setState({
	          loading: false,
	          error: res.responseJSON && res.responseJSON.error
	        });
	      });
	    };

	    _this._handleAcceptClick = function () {
	      var data = {
	        scoringID: _this.state.selectedScoringID,
	        gameID: _this.props.gameInfo.id
	      };
	      _this._submit(ACCEPT_URL, data);
	    };

	    _this._handleRejectClick = function () {
	      var data = {
	        scoringID: _this.state.selectedScoringID,
	        gameID: _this.props.gameInfo.id
	      };
	      _this._submit(REJECT_URL, data);
	    };

	    _this._handleClick = function () {
	      if (_this.state.mode === 'create') {
	        var data = _extends({}, _this.state.newScoringData, {
	          board: JSON.stringify(_this._player.getBoardObject()),
	          gameID: _this.props.gameInfo.id
	        });

	        _this._submit(CREATE_URL, data);
	      } else if (_this.state.mode === 'update') {
	        var _data = _extends({}, _this.state.newScoringData, {
	          board: JSON.stringify(_this._player.getBoardObject()),
	          scoringID: _this.state.selectedScoringID
	        });

	        _this._submit(UPDATE_URL, _data);
	      }
	    };

	    var mode = 'create';
	    var selectedScoringID = null;
	    if (props.defaultScoringID) {
	      mode = 'view';
	      selectedScoringID = props.defaultScoringID;
	    } else {
	      if (props.scorings.length > 0) {
	        mode = 'view';
	        selectedScoringID = props.scorings[0].id;
	      }
	    }

	    _this.state = {
	      newScoringData: null,
	      loading: false,
	      error: '',
	      selectedScoringID: selectedScoringID,
	      mode: mode
	    };
	    return _this;
	  }

	  _createClass(ScoreCountingContainer, [{
	    key: 'render',
	    value: function render() {
	      var header = this.props.gameInfo.isOver ? this._renderFinalScore() : this._renderScoringSelector();

	      var scoreInfo = this.props.gameInfo.isOver ? null : this._renderScoreInfo();

	      return _react2.default.createElement(
	        'div',
	        { className: 'createGameWrapper' },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'div',
	            { className: 'container padding-bottom-10' },
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _react2.default.createElement(
	                'div',
	                { className: 'col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 padding-top-10' },
	                scoreInfo,
	                header,
	                this._renderNewScoringStat(),
	                this._renderBoardPlayer()
	              )
	            )
	          ),
	          this._renderFooter()
	        )
	      );
	    }
	  }, {
	    key: '_renderBoardPlayer',
	    value: function _renderBoardPlayer() {
	      var _this2 = this;

	      var game = this.props.gameInfo;
	      var viewScoring = this.props.scorings.find(function (scoring) {
	        return scoring.id === _this2.state.selectedScoringID;
	      });

	      return _react2.default.createElement(_GoBoardPlayer2.default, {
	        layout: { top: ['InfoBox'] },
	        move: game.move + 1,
	        sgf: game.sgf,
	        mode: this.state.mode === 'view' ? 'view' : 'score',
	        viewBoard: viewScoring ? viewScoring.board : null,
	        onScoreUpdate: this._handleScoreUpdate,
	        ref: function ref(player) {
	          _this2._player = player;
	        }
	      });
	    }
	  }, {
	    key: '_renderNewScoringStat',
	    value: function _renderNewScoringStat() {
	      if (this.state.mode === 'view') {
	        return null;
	      }
	      var score = this.state.newScoringData;
	      if (!score) {
	        return null;
	      }
	      var whiteAll = score.whiteTerritory + score.whiteCapture + this.props.gameInfo.komi;
	      var blackAll = score.blackTerritory + score.blackCapture;
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          null,
	          this.props.text.totalScore,
	          ': ',
	          getResultText(whiteAll, blackAll)
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          this.props.text.black,
	          ' : ',
	          score.blackTerritory,
	          ' + ',
	          score.blackCapture,
	          ' = ',
	          blackAll
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          this.props.text.white,
	          ' : ',
	          score.whiteTerritory,
	          ' + ',
	          score.whiteCapture,
	          ' + ',
	          this.props.gameInfo.komi,
	          ' = ',
	          whiteAll
	        )
	      );
	    }

	    // only shown when game is over.

	  }, {
	    key: '_renderFinalScore',
	    value: function _renderFinalScore() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'list-group' },
	        _react2.default.createElement(
	          'a',
	          { href: '#', className: 'list-group-item active' },
	          _react2.default.createElement(
	            'h4',
	            { className: 'list-group-item-heading' },
	            this.props.gameInfo.scoreText
	          )
	        )
	      );
	    }
	  }, {
	    key: '_renderScoringSelector',
	    value: function _renderScoringSelector() {
	      var _this3 = this;

	      // (B+10). <your request> <status>
	      var scoringItems = this.props.scorings.map(function (scoring) {
	        var whiteAll = scoring.whiteTerritory + scoring.whiteCapture + _this3.props.gameInfo.komi;
	        var blackAll = scoring.blackTerritory + scoring.blackCapture;

	        var label = void 0;
	        if (scoring.status === 0) {
	          label = _react2.default.createElement(
	            'span',
	            { className: 'label label-warning margin-left-4' },
	            _this3.props.text.pendingLabel
	          );
	        } else if (scoring.status === 1) {
	          label = _react2.default.createElement(
	            'span',
	            { className: 'label label-danger margin-left-4' },
	            _this3.props.text.rejectedLabel
	          );
	        }

	        var button = void 0;
	        if (scoring.isCreator) {
	          var _text = _this3.state.mode === 'update' ? _this3.props.text.cancelButton : _this3.props.text.updateButton;
	          button = _react2.default.createElement(
	            'button',
	            {
	              className: 'pull-right btn btn-default',
	              onClick: function onClick(e) {
	                return _this3._handleUpdateScoringClick(scoring.id, e);
	              } },
	            _text
	          );
	        }
	        return _react2.default.createElement(
	          'a',
	          { href: '#',
	            className: (0, _classNames2.default)("list-group-item", { 'active': scoring.id === _this3.state.selectedScoringID }),
	            onClick: function onClick() {
	              return _this3._handleSelectScoringClick(scoring.id);
	            } },
	          button,
	          _react2.default.createElement(
	            'h4',
	            { className: 'list-group-item-heading' },
	            getResultText(whiteAll, blackAll),
	            ' ',
	            label
	          ),
	          _react2.default.createElement(
	            'p',
	            { className: 'list-group-item-text' },
	            scoring.requestedByText
	          )
	        );
	      });
	      return _react2.default.createElement(
	        'div',
	        { className: 'score-counting-selector' },
	        _react2.default.createElement(
	          'h4',
	          null,
	          this.props.text.scoringListHeader,
	          ' ',
	          this._renderCreateNewScoringButton()
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'div',
	          { className: 'list-group' },
	          scoringItems
	        )
	      );
	    }
	  }, {
	    key: '_handleUpdateScoringClick',
	    value: function _handleUpdateScoringClick(scoringID, e) {
	      if (this.state.mode === 'update') {
	        this.setState({ selectedScoringID: scoringID, mode: 'view' });
	      } else {
	        this.setState({ selectedScoringID: scoringID, mode: 'update' });
	      }

	      // prevent event from bubbling
	      e.stopPropagation();
	    }
	  }, {
	    key: '_handleSelectScoringClick',
	    value: function _handleSelectScoringClick(scoringID) {
	      this.setState({ selectedScoringID: scoringID, mode: 'view' });
	    }
	  }, {
	    key: '_renderScoreInfo',
	    value: function _renderScoreInfo() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'alert alert-info' },
	        this.props.text.explainInfoText
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
	  }, {
	    key: '_renderFooter',
	    value: function _renderFooter() {
	      var _this4 = this;

	      if (this.props.gameInfo.isOver) {
	        return null;
	      }

	      var text = void 0;
	      // if looking at your own scoring, hide the button
	      if (this.state.mode === 'view') {
	        var viewScoring = this.props.scorings.find(function (scoring) {
	          return scoring.id === _this4.state.selectedScoringID;
	        });
	        (0, _invariant2.default)(viewScoring, 'for flow');
	        if (viewScoring.isCreator) {
	          return null;
	        }

	        // show accept/reject button
	        return this._renderAcceptRejectFooter();
	      } else if (this.state.mode === 'create') {
	        text = this.props.text.submitButton;
	      } else if (this.state.mode === 'update') {
	        text = this.props.text.updateButton;
	      }

	      return _react2.default.createElement(_Footer2.default, {
	        text: text,
	        onClick: this._handleClick,
	        disabled: this.state.loading
	      });
	    }
	  }, {
	    key: '_renderAcceptRejectFooter',
	    value: function _renderAcceptRejectFooter() {
	      return _react2.default.createElement(
	        'div',
	        null,
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
	                'h4',
	                { className: 'text-center' },
	                this.props.text.doYouAgreeScoringText
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _FooterWrapper2.default,
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'div',
	              { className: 'col-xs-6 col-sm-5 col-sm-offset-1 col-md-3 col-md-offset-3' },
	              _react2.default.createElement(
	                'button',
	                {
	                  type: 'button',
	                  className: 'btn btn-primary btn-lg btn-danger btn-block',
	                  disabled: this.state.loading,
	                  onClick: this._handleRejectClick },
	                this.props.text.rejectButton
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-xs-6 col-sm-5 col-md-3' },
	              _react2.default.createElement(
	                'button',
	                {
	                  type: 'button',
	                  className: 'btn btn-primary btn-lg btn-success btn-block',
	                  disabled: this.state.loading,
	                  onClick: this._handleAcceptClick },
	                this.props.text.acceptButton
	              )
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: '_renderCreateNewScoringButton',
	    value: function _renderCreateNewScoringButton() {
	      var _this5 = this;

	      if (this.props.gameInfo.isOver) {
	        return null;
	      }

	      var hasCreated = this.props.scorings.some(function (scoring) {
	        return scoring.isCreator;
	      });

	      if (hasCreated || this.props.scorings.length === 0) {
	        return null;
	      }

	      return _react2.default.createElement(
	        'button',
	        {
	          type: 'button',
	          className: (0, _classNames2.default)("margin-left-12", "btn", "btn-md", "btn-default", { 'active': this.state.mode === 'create' }),
	          disabled: this.state.loading,
	          onClick: function onClick() {
	            _this5.setState({ mode: 'create', selectedScoringID: null });
	          } },
	        this.props.text.createNewScoreButton
	      );
	    }
	  }]);

	  return ScoreCountingContainer;
	}(_react2.default.Component);

		_UserLoaderContainer2.default.setup(ScoreCountingContainer);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _WGo = __webpack_require__(7);

	var _WGo2 = _interopRequireDefault(_WGo);

	var _deepEqual = __webpack_require__(8);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _invariant = __webpack_require__(11);

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
/* 7 */
/***/ function(module, exports) {

	module.exports = WGo;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(9);
	var isArguments = __webpack_require__(10);

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
/* 9 */
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
/* 10 */
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
/* 11 */
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 12 */
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
/* 13 */
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

	var _OverlaySpinner = __webpack_require__(5);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

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
//# sourceMappingURL=ScoreCountingContainer.dev.js.map
!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),s=r(l),c=n(2),f=(r(c),n(4)),p=(r(f),n(3)),d=(r(p),n(8)),h=r(d),m=n(9),y=r(m),v=[9,13,19],b="empty",g=function(e){function t(e){o(this,t);var n=a(this,Object.getPrototypeOf(t).call(this,e));return n._handleBoardSizeChange=function(e){n.setState({emptyBoardSize:e.target.value})},n._handleGameChange=function(e){n.setState({selectedGameID:e.target.value})},n.state={selectedGameID:e.focusedOnGameID?e.focusedOnGameID:b,emptyBoardSize:19},n}return i(t,e),u(t,[{key:"render",value:function(){var e=this,t=this._userNotInGames()?this._renderInfoAlert(this.props.text.noGameMessage):null,n=void 0,r=void 0;return this.state.selectedGameID===b?(n={top:["Control"]},r={move:0,sgf:"(;SZ["+this.state.emptyBoardSize+"])"}):(r=this.props.games.find(function(t){return t.id===e.state.selectedGameID}),console.log(r),n={top:["Control","InfoBox"]}),s["default"].createElement("div",{className:"createGameWrapper"},s["default"].createElement("div",{className:"container"},s["default"].createElement("div",{className:"row"},s["default"].createElement("div",{className:"col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3"},t,this._renderGameSelector(),this._renderEmptyBoardSizeSelector(),s["default"].createElement(h["default"],{layout:{top:["Control","InfoBox"]},move:r.move,sgf:r.sgf,mode:"edit"})))))}},{key:"_userNotInGames",value:function(){return 0===this.props.games.length}},{key:"_renderGameSelector",value:function(){if(this.props.loadSingleGameOnly)return null;if(this._userNotInGames())return null;var e=this.props.games.map(function(e){var t=e.id;return s["default"].createElement("option",{key:t,value:t},e.opponentName)});return s["default"].createElement("div",{className:"form-horizontal"},s["default"].createElement("div",{className:"form-group"},s["default"].createElement("label",{className:"col-sm-3 control-label"},this.props.text.selectGameLabel),s["default"].createElement("div",{className:"col-sm-9"},s["default"].createElement("select",{className:"form-control",value:this.state.selectedGameID,onChange:this._handleGameChange},e,s["default"].createElement("option",{value:b},this.props.text.emptyBoardOption)))))}},{key:"_renderEmptyBoardSizeSelector",value:function(){if(this.state.selectedGameID!==b)return null;var e=v.map(function(e){return s["default"].createElement("option",{key:e,value:e},e)});return s["default"].createElement("div",{className:"form-horizontal"},s["default"].createElement("div",{className:"form-group"},s["default"].createElement("label",{className:"col-sm-3 control-label"},this.props.text.selectBoardSizeLabel),s["default"].createElement("div",{className:"col-sm-9"},s["default"].createElement("select",{className:"form-control",value:this.state.emptyBoardSize,onChange:this._handleBoardSizeChange},e))))}},{key:"_renderInfoAlert",value:function(e){return s["default"].createElement("div",{className:"alertHeader alert alert-info",role:"alert"},e)}}]),t}(s["default"].Component);g.propTypes={userID:l.PropTypes.string.isRequired,text:l.PropTypes.object.isRequired,games:l.PropTypes.array.isRequired,focusedOnGameID:l.PropTypes.number},y["default"].setup(g)},function(e,t){e.exports=React},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),s=r(l),c=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return s["default"].createElement("div",{className:"spinnerOverlay"},s["default"].createElement("div",{className:"spinner"}))}}]),t}(s["default"].PureComponent);e.exports=c},function(e,t,n){var r,o;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r))e.push(n.apply(null,r));else if("object"===o)for(var i in r)a.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}var a={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=n:(r=[],o=function(){return n}.apply(t,r),!(void 0!==o&&(e.exports=o)))}()},function(e,t){e.exports=MessengerExtensions},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),s=r(l),c=n(7),f=r(c),p=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return s["default"].createElement(f["default"],null,s["default"].createElement("div",{className:"col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3"},s["default"].createElement("button",{type:"button",className:"btn btn-primary btn-lg btn-block",disabled:this.props.disabled,onClick:this.props.onClick},this.props.text)))}}]),t}(s["default"].PureComponent);e.exports=p},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),s=r(l),c=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return s["default"].createElement("div",{className:"footer"},s["default"].createElement("div",{className:"container"},s["default"].createElement("div",{className:"row"},this.props.children)))}}]),t}(s["default"].PureComponent);e.exports=c},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(1),c=r(s),f=n(2),p=(r(f),n(16)),d=r(p),h=n(11),m=r(h),y=n(14),v=r(y),b={board:{background:"/web/images/wood1.jpg"},enableWheel:!1,lockScroll:!1,update:function(e){}},g=function(e){function t(){var e,n,r,i;o(this,t);for(var u=arguments.length,l=Array(u),s=0;u>s;s++)l[s]=arguments[s];return n=r=a(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r._handleScoreUpdate=function(e){var t=e.replace(/<(?:.|\n)*?>/gm,"").replace(/ /g,""),n=t.match(/((\d+(\.\d{1,2})?)\+)+(\d+(\.\d{1,2})?)=(\d+(\.\d{1,2})?)/g);(0,v["default"])(n,"for flow");var o=n[0].split("=")[0].split("+").map(function(e){return parseFloat(e)}),a=n[1].split("=")[0].split("+").map(function(e){return parseFloat(e)});r.props.onScoreUpdate&&r.props.onScoreUpdate({blackTerritory:o[0],blackCapture:o[1],whiteTerritory:a[0],whiteCapture:a[1],komi:a[2]})},i=n,a(r,i)}return i(t,e),l(t,[{key:"componentDidMount",value:function(){this._updateWGoPlayer()}},{key:"componentDidUpdate",value:function(e,t){this._updateWGoPlayer()}},{key:"shouldComponentUpdate",value:function(e,t){return!(0,m["default"])(e,this.props)}},{key:"_updateWGoPlayer",value:function(){var e=this;if(this._player=new d["default"].BasicPlayer(this._playerDiv,u({},b,{layout:this.props.layout,move:this.props.move,sgf:this.props.sgf})),"view"===this.props.mode)this._player.board.removeAllObjects(),(0,v["default"])(this.props.viewBoard,"for flow"),this.props.viewBoard.forEach(function(t){(0,v["default"])(e._player,"for flow"),e._player.board.addObject(t)});else if("score"===this.props.mode)this._player.setFrozen(!0),(0,v["default"])(this._player,"for flow"),this._score_mode=new d["default"].ScoreMode(this._player.kifuReader.game.position,this._player.board,this._player.kifu.info.KM||0,this._handleScoreUpdate),this._score_mode.start();else{if("edit"!==this.props.mode)throw new Error("invalid player mode");var t=new d["default"].Player.Editable(this._player,this._player.board);t.set(!0)}}},{key:"getWGOPlayer",value:function(){return this._player}},{key:"getBoardObject",value:function(){return(0,v["default"])(this._player,"for flow"),this._player.board.obj_arr}},{key:"render",value:function(){var e=this;return c["default"].createElement("div",{ref:function(t){e._playerDiv=t}})}}]),t}(c["default"].PureComponent);e.exports=g},function(e,t,n){(function(t){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(17),f=r(c),p=n(1),d=r(p),h=n(2),m=r(h),y=n(4),v=(r(y),n(3)),b=r(v),g=n(6),w=r(g),_=n(10),E=r(_),O=function(e){function t(e){a(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));n._submit=function(){n._fetchProps({u:n.state.token},function(){E["default"].storeUserToken(n.state.token)})};var r=e.userID,u=o(e,["userID"]);return n.state={userID:r,componentProps:u,error:null,showTokenInput:!1,loading:!1,token:""},n}return u(t,e),s(t,[{key:"getIsInitialize",value:function(){return!!this.state.userID}},{key:"componentDidMount",value:function(){var e=this;this.getIsInitialize()||E["default"].isInExtention(function(t){if(!t){var n=E["default"].getUserToken();return void(n?e._fetchProps({u:n},function(){},function(){e.setState({showTokenInput:!0})}):e.setState({showTokenInput:!0}))}E["default"].getUserID(function(t){e._fetchProps({fbid:t})})})}},{key:"render",value:function(){if(!this.getIsInitialize())return this._renderUninitializedView();var e=this.props.Component;return d["default"].createElement(e,l({userID:this.state.userID},this.state.componentProps))}},{key:"_renderUninitializedView",value:function(){var e=this.state.showTokenInput?d["default"].createElement("div",null,this._renderErrorAlert(),d["default"].createElement("h5",null,d["default"].createElement("label",null,this.props.text.notSupportedText)),this._renderTokenInput()):d["default"].createElement(b["default"],null),t=this.state.showTokenInput?this._renderFooter():null;return d["default"].createElement("div",null,this.state.loading?d["default"].createElement(b["default"],null):null,d["default"].createElement("div",{className:"container"},d["default"].createElement("div",{className:"row"},d["default"].createElement("div",{className:"col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3"},e))),t)}},{key:"_renderErrorAlert",value:function(){return this.state.error?d["default"].createElement("div",{className:"alertHeader alert alert-danger",role:"alert"},this.state.error):null}},{key:"_renderTokenInput",value:function(){var e=this;return d["default"].createElement("div",{className:"form-group"},d["default"].createElement("input",{className:"form-control","class":"form-control",placeholder:"<token>",value:this.state.token,onChange:function(t){return e.setState({token:t.target.value})}}))}},{key:"_renderFooter",value:function(){return d["default"].createElement(w["default"],{text:this.props.text.enterButton,onClick:this._submit})}},{key:"_fetchProps",value:function(e,t,n){var r=this;f["default"].get(this.props.jsonURL,e).done(function(e){var n=e.userID,a=o(e,["userID"]);r.setState({userID:n,componentProps:a}),t&&t()}).fail(function(e){r.setState({error:e.responseText}),n&&n()})}}]),t}(d["default"].Component);e.exports={setup:function(e){t.setup=function(t,n,r){m["default"].render(d["default"].createElement(O,l({},n,{Component:e,jsonURL:r})),document.getElementById(t))}}}}).call(t,function(){return this}())},function(e,t,n){"use strict";function r(e){return console.log(f),f?void e(f):void setTimeout(r,150,e)}function o(e){r(function(t){e(t.isInExtension())})}function a(e){r(function(t){t.getSupportedFeatures(function(e){console.log(e)},function(e){console.log(e)}),t.getUserID(function(t){e(t.psid)},function(n,r){t.getContext("1833481820212349",function(t){console.log(t.psid),e(t.psid)},function(e){console.log(e)})})})}function i(){var e=n(5),t=e.isInExtension();t?e.requestCloseBrowser(function(){},function(e){}):window.close()}function u(e){s("u",e,28)}function l(){return c("u")}function s(e,t,n){var r=new Date;r.setTime(r.getTime()+24*n*60*60*1e3);var o="expires="+r.toUTCString();document.cookie=e+"="+t+";"+o+";path=/"}function c(e){for(var t=e+"=",n=decodeURIComponent(document.cookie),r=n.split(";"),o=0;o<r.length;o++){for(var a=r[o];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(t))return a.substring(t.length,a.length)}return""}var f=null;window.extAsyncInit=function(){f=n(5)},e.exports={closeWebView:i,getUserID:a,isInExtention:o,storeUserToken:u,getUserToken:l}},function(e,t,n){function r(e){return null===e||void 0===e}function o(e){return e&&"object"==typeof e&&"number"==typeof e.length?"function"!=typeof e.copy||"function"!=typeof e.slice?!1:!(e.length>0&&"number"!=typeof e[0]):!1}function a(e,t,n){var a,c;if(r(e)||r(t))return!1;if(e.prototype!==t.prototype)return!1;if(l(e))return l(t)?(e=i.call(e),t=i.call(t),s(e,t,n)):!1;if(o(e)){if(!o(t))return!1;if(e.length!==t.length)return!1;for(a=0;a<e.length;a++)if(e[a]!==t[a])return!1;return!0}try{var f=u(e),p=u(t)}catch(d){return!1}if(f.length!=p.length)return!1;for(f.sort(),p.sort(),a=f.length-1;a>=0;a--)if(f[a]!=p[a])return!1;for(a=f.length-1;a>=0;a--)if(c=f[a],!s(e[c],t[c],n))return!1;return typeof e==typeof t}var i=Array.prototype.slice,u=n(13),l=n(12),s=e.exports=function(e,t,n){return n||(n={}),e===t?!0:e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():!e||!t||"object"!=typeof e&&"object"!=typeof t?n.strict?e===t:e==t:a(e,t,n)}},function(e,t){function n(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function r(e){return e&&"object"==typeof e&&"number"==typeof e.length&&Object.prototype.hasOwnProperty.call(e,"callee")&&!Object.prototype.propertyIsEnumerable.call(e,"callee")||!1}var o="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();t=e.exports=o?n:r,t.supported=n,t.unsupported=r},function(e,t){function n(e){var t=[];for(var n in e)t.push(n);return t}t=e.exports="function"==typeof Object.keys?Object.keys:n,t.shim=n},function(e,t,n){(function(t){"use strict";var n=function(e,n,r,o,a,i,u,l){if("production"!==t.env.NODE_ENV&&void 0===n)throw new Error("invariant requires an error message argument");if(!e){var s;if(void 0===n)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[r,o,a,i,u,l],f=0;s=new Error(n.replace(/%s/g,function(){return c[f++]})),s.name="Invariant Violation"}throw s.framesToPop=1,s}};e.exports=n}).call(t,n(15))},function(e,t){function n(){s&&i&&(s=!1,i.length?l=i.concat(l):c=-1,l.length&&r())}function r(){if(!s){var e=setTimeout(n);s=!0;for(var t=l.length;t;){for(i=l,l=[];++c<t;)i&&i[c].run();c=-1,t=l.length}i=null,s=!1,clearTimeout(e)}}function o(e,t){this.fun=e,this.array=t}function a(){}var i,u=e.exports={},l=[],s=!1,c=-1;u.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new o(e,t)),1!==l.length||s||setTimeout(r,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=a,u.addListener=a,u.once=a,u.off=a,u.removeListener=a,u.removeAllListeners=a,u.emit=a,u.binding=function(e){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(e){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},function(e,t){e.exports=WGo},function(e,t){e.exports=jQuery}]);
//# sourceMappingURL=SimulateBoardContainer.prod.js.map
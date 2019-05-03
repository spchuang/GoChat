

'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CreateGameWithSelfHandler = require('../response/general/CreateGameWithSelfHandler');

var _CreateGameWithSelfHandler2 = _interopRequireDefault(_CreateGameWithSelfHandler);

var _CreateGameWithAIHandler = require('../response/general/CreateGameWithAIHandler');

var _CreateGameWithAIHandler2 = _interopRequireDefault(_CreateGameWithAIHandler);

var _CreateGameRoomHandler = require('../response/general/CreateGameRoomHandler');

var _CreateGameRoomHandler2 = _interopRequireDefault(_CreateGameRoomHandler);

var _Translator = require('../translations/Translator');

var _User = require('../class/User');

var _User2 = _interopRequireDefault(_User);

var _GoGating = require('../utils/GoGating');

var _GoGating2 = _interopRequireDefault(_GoGating);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _RouteControllerBase2 = require('./RouteControllerBase');

var _RouteControllerBase3 = _interopRequireDefault(_RouteControllerBase2);

var _LoggingEnums = require('../logging/LoggingEnums');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateGameRouteController = function (_RouteControllerBase) {
  _inherits(CreateGameRouteController, _RouteControllerBase);

  function CreateGameRouteController() {
    _classCallCheck(this, CreateGameRouteController);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CreateGameRouteController).apply(this, arguments));
  }

  _createClass(CreateGameRouteController, [{
    key: 'getName',
    value: function getName() {
      return 'game/create';
    }
  }, {
    key: 'getRouterEvent',
    value: function getRouterEvent() {
      return _LoggingEnums.LoggingEvent.LOAD_CREATE_GAME_VIEW;
    }
  }, {
    key: 'getLoadMessengerExtension',
    value: function getLoadMessengerExtension() {
      return true;
    }
  }, {
    key: 'getPageTitle',
    value: function getPageTitle(lan) {
      return (0, _Translator.got)('button.createGame', lan);
    }
  }, {
    key: 'genClientContainerParams',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(user) {
        var language;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                language = user.getLanguage();
                return _context.abrupt('return', {
                  canPlayWithAI: _GoGating2.default.canPlayWithAI(user),
                  text: {
                    infoPlayWithFriend: (0, _Translator.got)('createGame.infoPlayWithFriend', language),
                    infoPlayWithSelf: (0, _Translator.got)('createGame.infoPlayWithSelf', language),
                    infoPlayWithAI: (0, _Translator.got)('createGame.infoPlayWithAI', language),
                    whoToPlayWithLabel: (0, _Translator.got)('createGame.whoToPlayWithLabel', language),
                    boarsSizeLabel: (0, _Translator.got)('createGame.boardSizeLabel', language),
                    colorLabel: (0, _Translator.got)('createGame.colorLabel', language),
                    komiLabel: (0, _Translator.got)('createGame.komiLabel', language),
                    handicapLabel: (0, _Translator.got)('createGame.handicapLabel', language),
                    optionPlayWithFriend: (0, _Translator.got)('createGame.optionPlayWithFriend', language),
                    optionPlayWithSelf: (0, _Translator.got)('createGame.optionPlayWithSelf', language),
                    optionPlayWithAI: (0, _Translator.got)('createGame.optionPlayWithAI', language),
                    optionColorBlack: (0, _Translator.got)('createGame.optionColorBlack', language),
                    optionColorWhite: (0, _Translator.got)('createGame.optionColorWhite', language),
                    optionColorRandom: (0, _Translator.got)('createGame.optionColorRandom', language),
                    createButton: (0, _Translator.got)('button.createGame', language)
                  }
                });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genClientContainerParams(_x) {
        return ref.apply(this, arguments);
      }

      return genClientContainerParams;
    }()
  }, {
    key: 'getJS',
    value: function getJS() {
      return ['web/CreateGameContainer.' + _config2.default.env + '.js'];
    }
  }, {
    key: 'getCSS',
    value: function getCSS() {
      return ['createGame.css', 'webviewCommon.css'];
    }
  }]);

  return CreateGameRouteController;
}(_RouteControllerBase3.default);

var controller = new CreateGameRouteController();

controller.post('', function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(user, params, res, next) {
    var boardSize, komi, handicap;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _invariant2.default)(params.boardSize !== undefined && params.komi !== undefined && params.handicap !== undefined, 'required boardsize, handicap and komi');

            boardSize = parseInt(params.boardSize, 10);
            komi = parseFloat(params.komi);
            handicap = parseInt(params.handicap, 10);

            (0, _invariant2.default)(boardSize === 9 || boardSize === 13 || boardSize === 19, 'verify boardsize');

            if (!(params.gameType === 'self')) {
              _context2.next = 10;
              break;
            }

            _context2.next = 8;
            return _CreateGameWithSelfHandler2.default.genStartGameWithSelf(user, boardSize, handicap, komi);

          case 8:
            _context2.next = 22;
            break;

          case 10:
            if (!(params.gameType === 'friend')) {
              _context2.next = 16;
              break;
            }

            (0, _invariant2.default)(params.color, 'require color');
            _context2.next = 14;
            return _CreateGameRoomHandler2.default.genCreatePrivateRoom(user, boardSize, params.color, handicap, komi);

          case 14:
            _context2.next = 22;
            break;

          case 16:
            if (!(params.gameType === 'AI')) {
              _context2.next = 21;
              break;
            }

            _context2.next = 19;
            return _CreateGameWithAIHandler2.default.genStartGameWithAI(user, boardSize, params.color);

          case 19:
            _context2.next = 22;
            break;

          case 21:
            next(new Error('invalid game type'));

          case 22:
            res.send('');

          case 23:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));
  return function (_x2, _x3, _x4, _x5) {
    return ref.apply(this, arguments);
  };
}());

module.exports = controller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvQ3JlYXRlR2FtZVJvdXRlQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLHlCOzs7Ozs7Ozs7Ozs4QkFDYztBQUNoQixhQUFPLGFBQVA7QUFDRDs7O3FDQUV3QjtBQUN2QixhQUFPLDJCQUFhLHFCQUFwQjtBQUNEOzs7Z0RBRW9DO0FBQ25DLGFBQU8sSUFBUDtBQUNEOzs7aUNBRVksRyxFQUFxQjtBQUNoQyxhQUFPLHFCQUFJLG1CQUFKLEVBQXlCLEdBQXpCLENBQVA7QUFDRDs7OztrRkFFOEIsSTtZQUN2QixROzs7OztBQUFBLHdCLEdBQVcsS0FBSyxXQUFMLEU7aURBQ1Y7QUFDTCxpQ0FBZSxtQkFBUyxhQUFULENBQXVCLElBQXZCLENBRFY7QUFFTCx3QkFBTTtBQUNKLHdDQUFvQixxQkFBSSwrQkFBSixFQUFxQyxRQUFyQyxDQURoQjtBQUVKLHNDQUFrQixxQkFBSSw2QkFBSixFQUFtQyxRQUFuQyxDQUZkO0FBR0osb0NBQWdCLHFCQUFJLDJCQUFKLEVBQWlDLFFBQWpDLENBSFo7QUFJSix3Q0FBb0IscUJBQUksK0JBQUosRUFBcUMsUUFBckMsQ0FKaEI7QUFLSixvQ0FBZ0IscUJBQUksMkJBQUosRUFBaUMsUUFBakMsQ0FMWjtBQU1KLGdDQUFZLHFCQUFJLHVCQUFKLEVBQTZCLFFBQTdCLENBTlI7QUFPSiwrQkFBVyxxQkFBSSxzQkFBSixFQUE0QixRQUE1QixDQVBQO0FBUUosbUNBQWUscUJBQUksMEJBQUosRUFBZ0MsUUFBaEMsQ0FSWDtBQVNKLDBDQUFzQixxQkFBSSxpQ0FBSixFQUF1QyxRQUF2QyxDQVRsQjtBQVVKLHdDQUFvQixxQkFBSSwrQkFBSixFQUFxQyxRQUFyQyxDQVZoQjtBQVdKLHNDQUFrQixxQkFBSSw2QkFBSixFQUFtQyxRQUFuQyxDQVhkO0FBWUosc0NBQWtCLHFCQUFJLDZCQUFKLEVBQW1DLFFBQW5DLENBWmQ7QUFhSixzQ0FBa0IscUJBQUksNkJBQUosRUFBbUMsUUFBbkMsQ0FiZDtBQWNKLHVDQUFtQixxQkFBSSw4QkFBSixFQUFvQyxRQUFwQyxDQWRmO0FBZUosa0NBQWMscUJBQUksbUJBQUosRUFBeUIsUUFBekI7QUFmVjtBQUZELGlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBc0JjO0FBQ3JCLGFBQU8sOEJBQ3NCLGlCQUFPLEdBRDdCLFNBQVA7QUFHRDs7OzZCQUV1QjtBQUN0QixhQUFPLENBQ0wsZ0JBREssRUFFTCxtQkFGSyxDQUFQO0FBSUQ7Ozs7OztBQUdILElBQU0sYUFBYSxJQUFJLHlCQUFKLEVBQW5COztBQUVBLFdBQVcsSUFBWCxDQUFnQixFQUFoQjtBQUFBLDZEQUFvQixrQkFBTyxJQUFQLEVBQW1CLE1BQW5CLEVBQW1DLEdBQW5DLEVBQWdELElBQWhEO0FBQUEsUUFNWixTQU5ZLEVBT1osSUFQWSxFQVFaLFFBUlk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNsQixxQ0FDRSxPQUFPLFNBQVAsS0FBcUIsU0FBckIsSUFBa0MsT0FBTyxJQUFQLEtBQWdCLFNBQWxELElBQStELE9BQU8sUUFBUCxLQUFvQixTQURyRixFQUVFLHVDQUZGOztBQUtNLHFCQU5ZLEdBTUEsU0FBUyxPQUFPLFNBQWhCLEVBQTJCLEVBQTNCLENBTkE7QUFPWixnQkFQWSxHQU9MLFdBQVcsT0FBTyxJQUFsQixDQVBLO0FBUVosb0JBUlksR0FRRCxTQUFTLE9BQU8sUUFBaEIsRUFBMEIsRUFBMUIsQ0FSQzs7QUFTbEIscUNBQVUsY0FBYyxDQUFkLElBQW1CLGNBQWMsRUFBakMsSUFBdUMsY0FBYyxFQUEvRCxFQUFtRSxrQkFBbkU7O0FBVGtCLGtCQVdkLE9BQU8sUUFBUCxLQUFvQixNQVhOO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBWVYsb0NBQTBCLG9CQUExQixDQUErQyxJQUEvQyxFQUFxRCxTQUFyRCxFQUFnRSxRQUFoRSxFQUEwRSxJQUExRSxDQVpVOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGtCQWFQLE9BQU8sUUFBUCxLQUFvQixRQWJiO0FBQUE7QUFBQTtBQUFBOztBQWNoQixxQ0FBVSxPQUFPLEtBQWpCLEVBQXdCLGVBQXhCO0FBZGdCO0FBQUEsbUJBZVYsZ0NBQXNCLG9CQUF0QixDQUNKLElBREksRUFFSixTQUZJLEVBR0osT0FBTyxLQUhILEVBSUosUUFKSSxFQUtKLElBTEksQ0FmVTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxrQkFzQlAsT0FBTyxRQUFQLEtBQW9CLElBdEJiO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBdUJWLGtDQUF3QixrQkFBeEIsQ0FDSixJQURJLEVBRUosU0FGSSxFQUdKLE9BQU8sS0FISCxDQXZCVTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUE2QmhCLGlCQUFLLElBQUksS0FBSixDQUFVLG1CQUFWLENBQUw7O0FBN0JnQjtBQStCbEIsZ0JBQUksSUFBSixDQUFTLEVBQVQ7O0FBL0JrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWtDQSxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiQ3JlYXRlR2FtZVJvdXRlQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENyZWF0ZUdhbWVXaXRoU2VsZkhhbmRsZXIgZnJvbSAnLi4vcmVzcG9uc2UvZ2VuZXJhbC9DcmVhdGVHYW1lV2l0aFNlbGZIYW5kbGVyJztcbmltcG9ydCBDcmVhdGVHYW1lV2l0aEFJSGFuZGxlciBmcm9tICcuLi9yZXNwb25zZS9nZW5lcmFsL0NyZWF0ZUdhbWVXaXRoQUlIYW5kbGVyJztcbmltcG9ydCBDcmVhdGVHYW1lUm9vbUhhbmRsZXIgZnJvbSAnLi4vcmVzcG9uc2UvZ2VuZXJhbC9DcmVhdGVHYW1lUm9vbUhhbmRsZXInO1xuaW1wb3J0IHtnb3R9IGZyb20gJy4uL3RyYW5zbGF0aW9ucy9UcmFuc2xhdG9yJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzL1VzZXInO1xuaW1wb3J0IEdvR2F0aW5nIGZyb20gJy4uL3V0aWxzL0dvR2F0aW5nJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCBSb3V0ZUNvbnRyb2xsZXJCYXNlIGZyb20gJy4vUm91dGVDb250cm9sbGVyQmFzZSc7XG5pbXBvcnQge0xvZ2dpbmdFdmVudH0gZnJvbSAnLi4vbG9nZ2luZy9Mb2dnaW5nRW51bXMnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuXG5jbGFzcyBDcmVhdGVHYW1lUm91dGVDb250cm9sbGVyIGV4dGVuZHMgUm91dGVDb250cm9sbGVyQmFzZSB7XG4gIGdldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ2dhbWUvY3JlYXRlJztcbiAgfVxuXG4gIGdldFJvdXRlckV2ZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIExvZ2dpbmdFdmVudC5MT0FEX0NSRUFURV9HQU1FX1ZJRVc7XG4gIH1cblxuICBnZXRMb2FkTWVzc2VuZ2VyRXh0ZW5zaW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0UGFnZVRpdGxlKGxhbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ290KCdidXR0b24uY3JlYXRlR2FtZScsIGxhbik7XG4gIH1cblxuICBhc3luYyBnZW5DbGllbnRDb250YWluZXJQYXJhbXModXNlcjogVXNlcik6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSB1c2VyLmdldExhbmd1YWdlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhblBsYXlXaXRoQUk6IEdvR2F0aW5nLmNhblBsYXlXaXRoQUkodXNlciksXG4gICAgICB0ZXh0OiB7XG4gICAgICAgIGluZm9QbGF5V2l0aEZyaWVuZDogZ290KCdjcmVhdGVHYW1lLmluZm9QbGF5V2l0aEZyaWVuZCcsIGxhbmd1YWdlKSxcbiAgICAgICAgaW5mb1BsYXlXaXRoU2VsZjogZ290KCdjcmVhdGVHYW1lLmluZm9QbGF5V2l0aFNlbGYnLCBsYW5ndWFnZSksXG4gICAgICAgIGluZm9QbGF5V2l0aEFJOiBnb3QoJ2NyZWF0ZUdhbWUuaW5mb1BsYXlXaXRoQUknLCBsYW5ndWFnZSksXG4gICAgICAgIHdob1RvUGxheVdpdGhMYWJlbDogZ290KCdjcmVhdGVHYW1lLndob1RvUGxheVdpdGhMYWJlbCcsIGxhbmd1YWdlKSxcbiAgICAgICAgYm9hcnNTaXplTGFiZWw6IGdvdCgnY3JlYXRlR2FtZS5ib2FyZFNpemVMYWJlbCcsIGxhbmd1YWdlKSxcbiAgICAgICAgY29sb3JMYWJlbDogZ290KCdjcmVhdGVHYW1lLmNvbG9yTGFiZWwnLCBsYW5ndWFnZSksXG4gICAgICAgIGtvbWlMYWJlbDogZ290KCdjcmVhdGVHYW1lLmtvbWlMYWJlbCcsIGxhbmd1YWdlKSxcbiAgICAgICAgaGFuZGljYXBMYWJlbDogZ290KCdjcmVhdGVHYW1lLmhhbmRpY2FwTGFiZWwnLCBsYW5ndWFnZSksXG4gICAgICAgIG9wdGlvblBsYXlXaXRoRnJpZW5kOiBnb3QoJ2NyZWF0ZUdhbWUub3B0aW9uUGxheVdpdGhGcmllbmQnLCBsYW5ndWFnZSksXG4gICAgICAgIG9wdGlvblBsYXlXaXRoU2VsZjogZ290KCdjcmVhdGVHYW1lLm9wdGlvblBsYXlXaXRoU2VsZicsIGxhbmd1YWdlKSxcbiAgICAgICAgb3B0aW9uUGxheVdpdGhBSTogZ290KCdjcmVhdGVHYW1lLm9wdGlvblBsYXlXaXRoQUknLCBsYW5ndWFnZSksXG4gICAgICAgIG9wdGlvbkNvbG9yQmxhY2s6IGdvdCgnY3JlYXRlR2FtZS5vcHRpb25Db2xvckJsYWNrJywgbGFuZ3VhZ2UpLFxuICAgICAgICBvcHRpb25Db2xvcldoaXRlOiBnb3QoJ2NyZWF0ZUdhbWUub3B0aW9uQ29sb3JXaGl0ZScsIGxhbmd1YWdlKSxcbiAgICAgICAgb3B0aW9uQ29sb3JSYW5kb206IGdvdCgnY3JlYXRlR2FtZS5vcHRpb25Db2xvclJhbmRvbScsIGxhbmd1YWdlKSxcbiAgICAgICAgY3JlYXRlQnV0dG9uOiBnb3QoJ2J1dHRvbi5jcmVhdGVHYW1lJywgbGFuZ3VhZ2UpLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SlMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGB3ZWIvQ3JlYXRlR2FtZUNvbnRhaW5lci4ke2NvbmZpZy5lbnZ9LmpzYCxcbiAgICBdO1xuICB9XG5cbiAgZ2V0Q1NTKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBbXG4gICAgICAnY3JlYXRlR2FtZS5jc3MnLFxuICAgICAgJ3dlYnZpZXdDb21tb24uY3NzJyxcbiAgICBdO1xuICB9XG59XG5cbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ3JlYXRlR2FtZVJvdXRlQ29udHJvbGxlcigpO1xuXG5jb250cm9sbGVyLnBvc3QoJycsIGFzeW5jICh1c2VyOiBVc2VyLCBwYXJhbXM6IE9iamVjdCwgcmVzOiBPYmplY3QsIG5leHQ6IEZ1bmN0aW9uKSA9PiB7XG4gIGludmFyaWFudChcbiAgICBwYXJhbXMuYm9hcmRTaXplICE9PSB1bmRlZmluZWQgJiYgcGFyYW1zLmtvbWkgIT09IHVuZGVmaW5lZCAmJiBwYXJhbXMuaGFuZGljYXAgIT09IHVuZGVmaW5lZCxcbiAgICAncmVxdWlyZWQgYm9hcmRzaXplLCBoYW5kaWNhcCBhbmQga29taScsXG4gICk7XG5cbiAgY29uc3QgYm9hcmRTaXplID0gcGFyc2VJbnQocGFyYW1zLmJvYXJkU2l6ZSwgMTApO1xuICBjb25zdCBrb21pID0gcGFyc2VGbG9hdChwYXJhbXMua29taSk7XG4gIGNvbnN0IGhhbmRpY2FwID0gcGFyc2VJbnQocGFyYW1zLmhhbmRpY2FwLCAxMCk7XG4gIGludmFyaWFudChib2FyZFNpemUgPT09IDkgfHwgYm9hcmRTaXplID09PSAxMyB8fCBib2FyZFNpemUgPT09IDE5LCAndmVyaWZ5IGJvYXJkc2l6ZScpO1xuXG4gIGlmIChwYXJhbXMuZ2FtZVR5cGUgPT09ICdzZWxmJykge1xuICAgIGF3YWl0IENyZWF0ZUdhbWVXaXRoU2VsZkhhbmRsZXIuZ2VuU3RhcnRHYW1lV2l0aFNlbGYodXNlciwgYm9hcmRTaXplLCBoYW5kaWNhcCwga29taSk7XG4gIH0gZWxzZSBpZiAocGFyYW1zLmdhbWVUeXBlID09PSAnZnJpZW5kJykge1xuICAgIGludmFyaWFudChwYXJhbXMuY29sb3IsICdyZXF1aXJlIGNvbG9yJyk7XG4gICAgYXdhaXQgQ3JlYXRlR2FtZVJvb21IYW5kbGVyLmdlbkNyZWF0ZVByaXZhdGVSb29tKFxuICAgICAgdXNlcixcbiAgICAgIGJvYXJkU2l6ZSxcbiAgICAgIHBhcmFtcy5jb2xvcixcbiAgICAgIGhhbmRpY2FwLFxuICAgICAga29taSxcbiAgICApO1xuICB9IGVsc2UgaWYgKHBhcmFtcy5nYW1lVHlwZSA9PT0gJ0FJJykge1xuICAgIGF3YWl0IENyZWF0ZUdhbWVXaXRoQUlIYW5kbGVyLmdlblN0YXJ0R2FtZVdpdGhBSShcbiAgICAgIHVzZXIsXG4gICAgICBib2FyZFNpemUsXG4gICAgICBwYXJhbXMuY29sb3JcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIG5leHQobmV3IEVycm9yKCdpbnZhbGlkIGdhbWUgdHlwZScpKTtcbiAgfVxuICByZXMuc2VuZCgnJyk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb250cm9sbGVyO1xuIl19


'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fbLocalChatBot = require('fb-local-chat-bot');

var _fbLocalChatBot2 = _interopRequireDefault(_fbLocalChatBot);

var _ClassEnums = require('./ClassEnums');

var _UserBase2 = require('./base/UserBase');

var _UserBase3 = _interopRequireDefault(_UserBase2);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Logger = require('../logging/Logger');

var _LoggingEnums = require('../logging/LoggingEnums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getLanguageFromLocale(locale) {
  locale = locale.toLowerCase();
  switch (locale) {
    case 'zh_tw':
      return 'zh_tw';
    case 'zh_cn':
      return 'zh_cn';
    case 'ja_jp':
      return 'jp';
    default:
      return 'en';
  }
}

var User = function (_UserBase) {
  _inherits(User, _UserBase);

  function User(userModel) {
    _classCallCheck(this, User);

    // Load the game object if there is a game

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(User).call(this, userModel));

    var gameID = _this.getCurrentGameID();
    if (gameID && _this._model.Game) {
      _this._currentGame = _Game2.default.fromModel(_this._model.Game);
    }
    return _this;
  }

  _createClass(User, [{
    key: 'isInactive',
    value: function isInactive() {
      return this.getStatus() === _ClassEnums.UserStatus.INACTIVE;
    }
  }, {
    key: 'isPlaying',
    value: function isPlaying() {
      return this.getStatus() === _ClassEnums.UserStatus.PLAYING;
    }
  }, {
    key: 'genSetPlayGame',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(game) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.isPlaying() && this.getCurrentGameID !== null)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                this._currentGame = game;
                this.setStatus(_ClassEnums.UserStatus.PLAYING);
                this.setCurrentGameID(game.getID());
                _context.next = 7;
                return this.genSave();

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function genSetPlayGame(_x) {
        return ref.apply(this, arguments);
      }

      return genSetPlayGame;
    }()
  }, {
    key: 'getCurrentGame',
    value: function getCurrentGame() {
      return this._currentGame;
    }
  }, {
    key: 'genFinishGame',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(gameID) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._genRemoveGameFromUser(gameID);

              case 2:

                // game complete from resigning
                new _Logger.Logger(this).setEvent(_LoggingEnums.LoggingEvent.GAME_FINISH).setTargetClass(_LoggingEnums.LoggingTargetClass.GAME).setTargetID(gameID).log();

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function genFinishGame(_x2) {
        return ref.apply(this, arguments);
      }

      return genFinishGame;
    }()
  }, {
    key: 'genQuitGame',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(gameID) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._genRemoveGameFromUser(gameID);

              case 2:

                // game complete from resigning
                new _Logger.Logger(this).setEvent(_LoggingEnums.LoggingEvent.GAME_RESIGN).setTargetClass(_LoggingEnums.LoggingTargetClass.GAME).setTargetID(gameID).log();

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genQuitGame(_x3) {
        return ref.apply(this, arguments);
      }

      return genQuitGame;
    }()
  }, {
    key: '_genRemoveGameFromUser',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(gameID) {
        var activeGames;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _invariant2.default)(this.isPlaying(), 'User has to be in a game');

                // if user is already focused on another game, no-op

                if (!(this.getCurrentGameID() !== gameID)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt('return');

              case 3:
                _context4.next = 5;
                return _Game2.default.genActiveGamesForUser(this, { id: { $ne: gameID } });

              case 5:
                activeGames = _context4.sent;

                if (activeGames.length > 0) {
                  this.setCurrentGameID(activeGames[0].getID());
                } else {
                  this.setStatus(_ClassEnums.UserStatus.INACTIVE);
                  this.setCurrentGameID(null);
                }

                _context4.next = 9;
                return this.genSave();

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _genRemoveGameFromUser(_x4) {
        return ref.apply(this, arguments);
      }

      return _genRemoveGameFromUser;
    }()
  }], [{
    key: 'fromModel',
    value: function fromModel(userModel) {
      return new User(userModel);
    }
  }, {
    key: 'genBy',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(whereQuery) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._genBy({
                  where: whereQuery,
                  include: [{
                    model: _schema2.default.Game
                  }]
                });

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function genBy(_x5) {
        return ref.apply(this, arguments);
      }

      return genBy;
    }()
  }, {
    key: 'genAll',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt('return', _schema2.default.User.findAll().then(function (models) {
                  return models.map(function (m) {
                    return User.fromModel(m);
                  });
                }));

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function genAll() {
        return ref.apply(this, arguments);
      }

      return genAll;
    }()
  }, {
    key: 'genByUserID',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(id) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return User.genBy({
                  id: id
                });

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function genByUserID(_x6) {
        return ref.apply(this, arguments);
      }

      return genByUserID;
    }()
  }, {
    key: 'genByFBID',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee8(fbID) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return User.genBy({
                  fbID: fbID
                });

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function genByFBID(_x7) {
        return ref.apply(this, arguments);
      }

      return genByFBID;
    }()
  }, {
    key: 'genOrCreateByFBID',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee10(fbID) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                info('Querying database for a user with fbID: ' + fbID);

                return _context10.abrupt('return', this.genByFBID(fbID).then(function (user) {
                  if (user) {
                    return user;
                  }

                  // create new user with data from FB
                  var defaultUserValues = {
                    fbID: fbID,
                    status: _ClassEnums.UserStatus.INACTIVE,
                    currentGameID: null,
                    language: 'en',
                    gender: _ClassEnums.Gender.UNKNOWN
                  };

                  return _fbLocalChatBot2.default.getUserProfile(fbID).then(function () {
                    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee9(data) {
                      return regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                          switch (_context9.prev = _context9.next) {
                            case 0:
                              return _context9.abrupt('return', _schema2.default.User.create(_extends({}, defaultUserValues, {
                                firstName: data.first_name,
                                lastName: data.last_name,
                                profilePic: data.profile_pic,
                                locale: data.locale,
                                language: getLanguageFromLocale(data.locale), // map user locale to language
                                gender: data.gender === 'male' ? _ClassEnums.Gender.MALE : _ClassEnums.Gender.FEMALE
                              })).then(function (userModel) {
                                var user = User.fromModel(userModel);

                                new _Logger.Logger(user).setEvent(_LoggingEnums.LoggingEvent.CREATE_USER).setTargetClass(_LoggingEnums.LoggingTargetClass.USER).setTargetID(user.getID()).setExtraData({ fb_data: data }).log();

                                return user;
                              }));

                            case 1:
                            case 'end':
                              return _context9.stop();
                          }
                        }
                      }, _callee9, _this2);
                    }));
                    return function (_x9) {
                      return ref.apply(this, arguments);
                    };
                  }()).catch(function () {
                    // if fetching fails, we still want to create the user.
                    return _schema2.default.User.create(_extends({}, defaultUserValues)).then(function (userModel) {
                      return User.fromModel(userModel);
                    });
                  });
                }));

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function genOrCreateByFBID(_x8) {
        return ref.apply(this, arguments);
      }

      return genOrCreateByFBID;
    }()
  }]);

  return User;
}(_UserBase3.default);

exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzcy9Vc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsU0FBUyxxQkFBVCxDQUErQixNQUEvQixFQUF1RDtBQUNyRCxXQUFTLE9BQU8sV0FBUCxFQUFUO0FBQ0EsVUFBUSxNQUFSO0FBQ0UsU0FBSyxPQUFMO0FBQ0UsYUFBTyxPQUFQO0FBQ0YsU0FBSyxPQUFMO0FBQ0UsYUFBTyxPQUFQO0FBQ0YsU0FBSyxPQUFMO0FBQ0UsYUFBTyxJQUFQO0FBQ0Y7QUFDRSxhQUFPLElBQVA7QUFSSjtBQVVEOztJQUVLLEk7OztBQUVKLGdCQUFZLFNBQVosRUFBNkM7QUFBQTs7OztBQUFBLHdGQUNyQyxTQURxQzs7QUFHM0MsUUFBTSxTQUFTLE1BQUssZ0JBQUwsRUFBZjtBQUNBLFFBQUksVUFBVSxNQUFLLE1BQUwsQ0FBWSxJQUExQixFQUFnQztBQUM5QixZQUFLLFlBQUwsR0FBb0IsZUFBTyxTQUFQLENBQWlCLE1BQUssTUFBTCxDQUFZLElBQTdCLENBQXBCO0FBQ0Q7QUFOMEM7QUFPNUM7Ozs7aUNBRXFCO0FBQ3BCLGFBQU8sS0FBSyxTQUFMLE9BQXFCLHVCQUFXLFFBQXZDO0FBQ0Q7OztnQ0FFb0I7QUFDbkIsYUFBTyxLQUFLLFNBQUwsT0FBcUIsdUJBQVcsT0FBdkM7QUFDRDs7OztrRkFFb0IsSTs7Ozs7c0JBRWYsS0FBSyxTQUFMLE1BQW9CLEtBQUssZ0JBQUwsS0FBMEIsSTs7Ozs7Ozs7QUFHbEQscUJBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNBLHFCQUFLLFNBQUwsQ0FBZSx1QkFBVyxPQUExQjtBQUNBLHFCQUFLLGdCQUFMLENBQXNCLEtBQUssS0FBTCxFQUF0Qjs7dUJBQ00sS0FBSyxPQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FHaUI7QUFDdkIsYUFBTyxLQUFL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TkwsRTtBQU9MLHdDQUFRLEtBQUssTUFBTCxLQUFnQixNQUFoQixHQUF5QixtQkFBTyxJQUFoQyxHQUF1QyxtQkFBTztBQVBqRCxrQ0FRSixJQVJJLENBUUMsVUFBQyxTQUFELEVBQXFDO0FBQzNDLG9DQUFNLE9BQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUFiOztBQUVDLG1EQUFXLElBQVgsQ0FBRCxDQUNHLFFBREgsQ0FDWSwyQkFBYSxXQUR6QixFQUVHLGNBRkgsQ0FFa0IsaUNBQW1CLElBRnJDLEVBR0csV0FISCxDQUdlLEtBQUssS0FBTCxFQUhmLEVBSUcsWUFKSCxDQUlnQixFQUFDLFNBQVMsSUFBVixFQUpoQixFQUtHLEdBTEg7O0FBT0EsdUNBQU8sSUFBUDtBQUNELCtCQW5CTSxDQUQ0Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFxQkosS0FyQkksQ0FxQkUsWUFBTTs7QUFFYiwyQkFBTyxpQkFBTyxJQUFQLENBQVksTUFBWixjQUNGLGlCQURFLEdBRUosSUFGSSxDQUVDLFVBQUMsU0FBRCxFQUFxQztBQUMzQyw2QkFBTyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQVA7QUFDRCxxQkFKTSxDQUFQO0FBS0QsbUJBNUJNLENBQVA7QUE2QkQsaUJBM0NNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkErQ0ksSSIsImZpbGUiOiJVc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQm90IGZyb20gJ2ZiLWxvY2FsLWNoYXQtYm90JztcbmltcG9ydCB7VXNlclN0YXR1cywgR2VuZGVyfSBmcm9tICcuL0NsYXNzRW51bXMnO1xuaW1wb3J0IFVzZXJCYXNlIGZyb20gJy4vYmFzZS9Vc2VyQmFzZSc7XG5pbXBvcnQgR29HYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgbW9kZWxzIGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB0eXBlIHtTZXF1ZWxpemVNb2RlbH0gZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4uL2xvZ2dpbmcvTG9nZ2VyJztcbmltcG9ydCB7TG9nZ2luZ0V2ZW50LCBMb2dnaW5nVGFyZ2V0Q2xhc3N9IGZyb20gJy4uL2xvZ2dpbmcvTG9nZ2luZ0VudW1zJztcblxuZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VGcm9tTG9jYWxlKGxvY2FsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgbG9jYWxlID0gbG9jYWxlLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAobG9jYWxlKSB7XG4gICAgY2FzZSAnemhfdHcnOlxuICAgICAgcmV0dXJuICd6aF90dyc7XG4gICAgY2FzZSAnemhfY24nOlxuICAgICAgcmV0dXJuICd6aF9jbic7XG4gICAgY2FzZSAnamFfanAnOlxuICAgICAgcmV0dXJuICdqcCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnZW4nO1xuICB9XG59XG5cbmNsYXNzIFVzZXIgZXh0ZW5kcyBVc2VyQmFzZSB7XG4gIF9jdXJyZW50R2FtZTogR29HYW1lO1xuICBjb25zdHJ1Y3Rvcih1c2VyTW9kZWw6IFNlcXVlbGl6ZU1vZGVsKTogdm9pZCB7XG4gICAgc3VwZXIodXNlck1vZGVsKTtcbiAgICAvLyBMb2FkIHRoZSBnYW1lIG9iamVjdCBpZiB0aGVyZSBpcyBhIGdhbWVcbiAgICBjb25zdCBnYW1lSUQgPSB0aGlzLmdldEN1cnJlbnRHYW1lSUQoKTtcbiAgICBpZiAoZ2FtZUlEICYmIHRoaXMuX21vZGVsLkdhbWUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRHYW1lID0gR29HYW1lLmZyb21Nb2RlbCh0aGlzLl9tb2RlbC5HYW1lKTtcbiAgICB9XG4gIH1cblxuICBpc0luYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldFN0YXR1cygpID09PSBVc2VyU3RhdHVzLklOQUNUSVZFO1xuICB9XG5cbiAgaXNQbGF5aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldFN0YXR1cygpID09PSBVc2VyU3RhdHVzLlBMQVlJTkc7XG4gIH1cblxuICBhc3luYyBnZW5TZXRQbGF5R2FtZShnYW1lOiBHb0dhbWUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBvbmx5IGZvY3VzIG9uIHRoZSBnYW1lIGlmIHVzZXIgaXMgbm90IGZvY3VzZWQgYWxyZWFkeVxuICAgIGlmICh0aGlzLmlzUGxheWluZygpICYmIHRoaXMuZ2V0Q3VycmVudEdhbWVJRCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50R2FtZSA9IGdhbWU7XG4gICAgdGhpcy5zZXRTdGF0dXMoVXNlclN0YXR1cy5QTEFZSU5HKTtcbiAgICB0aGlzLnNldEN1cnJlbnRHYW1lSUQoZ2FtZS5nZXRJRCgpKTtcbiAgICBhd2FpdCB0aGlzLmdlblNhdmUoKTtcbiAgfVxuXG4gIGdldEN1cnJlbnRHYW1lKCk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRHYW1lO1xuICB9XG5cbiAgYXN5bmMgZ2VuRmluaXNoR2FtZShnYW1lSUQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuX2dlblJlbW92ZUdhbWVGcm9tVXNlcihnYW1lSUQpO1xuXG4gICAgLy8gZ2FtZSBjb21wbGV0ZSBmcm9tIHJlc2lnbmluZ1xuICAgIChuZXcgTG9nZ2VyKHRoaXMpKVxuICAgICAgLnNldEV2ZW50KExvZ2dpbmdFdmVudC5HQU1FX0ZJTklTSClcbiAgICAgIC5zZXRUYXJnZXRDbGFzcyhMb2dnaW5nVGFyZ2V0Q2xhc3MuR0FNRSlcbiAgICAgIC5zZXRUYXJnZXRJRChnYW1lSUQpXG4gICAgICAubG9nKCk7XG4gIH1cblxuICBhc3luYyBnZW5RdWl0R2FtZShnYW1lSUQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuX2dlblJlbW92ZUdhbWVGcm9tVXNlcihnYW1lSUQpO1xuXG4gICAgLy8gZ2FtZSBjb21wbGV0ZSBmcm9tIHJlc2lnbmluZ1xuICAgIChuZXcgTG9nZ2VyKHRoaXMpKVxuICAgICAgLnNldEV2ZW50KExvZ2dpbmdFdmVudC5HQU1FX1JFU0lHTilcbiAgICAgIC5zZXRUYXJnZXRDbGFzcyhMb2dnaW5nVGFyZ2V0Q2xhc3MuR0FNRSlcbiAgICAgIC5zZXRUYXJnZXRJRChnYW1lSUQpXG4gICAgICAubG9nKCk7XG4gIH1cblxuICBhc3luYyBfZ2VuUmVtb3ZlR2FtZUZyb21Vc2VyKGdhbWVJRDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaW52YXJpYW50KHRoaXMuaXNQbGF5aW5nKCksICdVc2VyIGhhcyB0byBiZSBpbiBhIGdhbWUnKTtcblxuICAgIC8vIGlmIHVzZXIgaXMgYWxyZWFkeSBmb2N1c2VkIG9uIGFub3RoZXIgZ2FtZSwgbm8tb3BcbiAgICBpZiAodGhpcy5nZXRDdXJyZW50R2FtZUlEKCkgIT09IGdhbWVJRCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBpZiB1c2VyIGlzIGZvY3VzZWQgb24gZ2FtZSB0aGF0IGlzIHF1aXR0aW5nLCByZWZvY3VzIG9uIGFub3RoZXIgZ2FtZVxuICAgIGNvbnN0IGFjdGl2ZUdhbWVzID0gYXdhaXQgR29HYW1lLmdlbkFjdGl2ZUdhbWVzRm9yVXNlcih0aGlzLCB7aWQ6IHskbmU6IGdhbWVJRH19KTtcbiAgICBpZiAoYWN0aXZlR2FtZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXRDdXJyZW50R2FtZUlEKGFjdGl2ZUdhbWVzWzBdLmdldElEKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXR1cyhVc2VyU3RhdHVzLklOQUNUSVZFKTtcbiAgICAgIHRoaXMuc2V0Q3VycmVudEdhbWVJRChudWxsKTtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmdlblNhdmUoKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTW9kZWwodXNlck1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IFVzZXIge1xuICAgIHJldHVybiBuZXcgVXNlcih1c2VyTW9kZWwpO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbkJ5KHdoZXJlUXVlcnk6IE9iamVjdCk6IFByb21pc2U8P1VzZXI+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2VuQnkoe1xuICAgICAgd2hlcmU6IHdoZXJlUXVlcnksXG4gICAgICBpbmNsdWRlOiBbe1xuICAgICAgICBtb2RlbDogbW9kZWxzLkdhbWUsXG4gICAgICB9XSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5BbGwoKTogUHJvbWlzZTxBcnJheTxVc2VyPj4ge1xuICAgIHJldHVybiBtb2RlbHMuVXNlci5maW5kQWxsKClcbiAgICAgIC50aGVuKChtb2RlbHM6IEFycmF5PFNlcXVlbGl6ZU1vZGVsPik6IEFycmF5PFVzZXI+ID0+IHtcbiAgICAgICAgcmV0dXJuIG1vZGVscy5tYXAoKG0pID0+IFVzZXIuZnJvbU1vZGVsKG0pKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbkJ5VXNlcklEKGlkOiBudW1iZXIpOiBQcm9taXNlPD9Vc2VyPiB7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXIuZ2VuQnkoe1xuICAgICAgaWQ6IGlkLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdlbkJ5RkJJRChmYklEOiBzdHJpbmcpOiBQcm9taXNlPD9Vc2VyPiB7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXIuZ2VuQnkoe1xuICAgICAgZmJJRDogZmJJRCxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZW5PckNyZWF0ZUJ5RkJJRChmYklEOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBpbmZvKGBRdWVyeWluZyBkYXRhYmFzZSBmb3IgYSB1c2VyIHdpdGggZmJJRDogJHtmYklEfWApO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2VuQnlGQklEKGZiSUQpLnRoZW4oKHVzZXI6ID9Vc2VyKSA9PiB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIG5ldyB1c2VyIHdpdGggZGF0YSBmcm9tIEZCXG4gICAgICBjb25zdCBkZWZhdWx0VXNlclZhbHVlcyA9IHtcbiAgICAgICAgZmJJRDogZmJJRCxcbiAgICAgICAgc3RhdHVzOiBVc2VyU3RhdHVzLklOQUNUSVZFLFxuICAgICAgICBjdXJyZW50R2FtZUlEOiBudWxsLFxuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgZ2VuZGVyOiBHZW5kZXIuVU5LTk9XTixcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBCb3QuZ2V0VXNlclByb2ZpbGUoZmJJRCkudGhlbihhc3luYyAoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gbW9kZWxzLlVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAuLi5kZWZhdWx0VXNlclZhbHVlcyxcbiAgICAgICAgICBmaXJzdE5hbWU6IGRhdGEuZmlyc3RfbmFtZSxcbiAgICAgICAgICBsYXN0TmFtZTogZGF0YS5sYXN0X25hbWUsXG4gICAgICAgICAgcHJvZmlsZVBpYzogZGF0YS5wcm9maWxlX3BpYyxcbiAgICAgICAgICBsb2NhbGU6IGRhdGEubG9jYWxlLFxuICAgICAgICAgIGxhbmd1YWdlOiBnZXRMYW5ndWFnZUZyb21Mb2NhbGUoZGF0YS5sb2NhbGUpLCAvLyBtYXAgdXNlciBsb2NhbGUgdG8gbGFuZ3VhZ2VcbiAgICAgICAgICBnZW5kZXI6IGRhdGEuZ2VuZGVyID09PSAnbWFsZScgPyBHZW5kZXIuTUFMRSA6IEdlbmRlci5GRU1BTEUsXG4gICAgICAgIH0pLnRoZW4oKHVzZXJNb2RlbDogU2VxdWVsaXplTW9kZWwpOiBVc2VyID0+IHtcbiAgICAgICAgICBjb25zdCB1c2VyID0gVXNlci5mcm9tTW9kZWwodXNlck1vZGVsKTtcblxuICAgICAgICAgIChuZXcgTG9nZ2VyKHVzZXIpKVxuICAgICAgICAgICAgLnNldEV2ZW50KExvZ2dpbmdFdmVudC5DUkVBVEVfVVNFUilcbiAgICAgICAgICAgIC5zZXRUYXJnZXRDbGFzcyhMb2dnaW5nVGFyZ2V0Q2xhc3MuVVNFUilcbiAgICAgICAgICAgIC5zZXRUYXJnZXRJRCh1c2VyLmdldElEKCkpXG4gICAgICAgICAgICAuc2V0RXh0cmFEYXRhKHtmYl9kYXRhOiBkYXRhfSlcbiAgICAgICAgICAgIC5sb2coKTtcblxuICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gaWYgZmV0Y2hpbmcgZmFpbHMsIHdlIHN0aWxsIHdhbnQgdG8gY3JlYXRlIHRoZSB1c2VyLlxuICAgICAgICByZXR1cm4gbW9kZWxzLlVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAuLi5kZWZhdWx0VXNlclZhbHVlcyxcbiAgICAgICAgfSkudGhlbigodXNlck1vZGVsOiBTZXF1ZWxpemVNb2RlbCk6IFVzZXIgPT4ge1xuICAgICAgICAgIHJldHVybiBVc2VyLmZyb21Nb2RlbCh1c2VyTW9kZWwpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iXX0=
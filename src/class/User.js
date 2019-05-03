// @flow

'use strict';

import Bot from 'fb-local-chat-bot';
import {UserStatus, Gender} from './ClassEnums';
import UserBase from './base/UserBase';
import GoGame from './Game';
import models from './schema';
import Promise from 'bluebird';
import type {SequelizeModel} from './schema';
import invariant from 'invariant';
import {Logger} from '../logging/Logger';
import {LoggingEvent, LoggingTargetClass} from '../logging/LoggingEnums';

function getLanguageFromLocale(locale: string): string {
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

class User extends UserBase {
  _currentGame: GoGame;
  constructor(userModel: SequelizeModel): void {
    super(userModel);
    // Load the game object if there is a game
    const gameID = this.getCurrentGameID();
    if (gameID && this._model.Game) {
      this._currentGame = GoGame.fromModel(this._model.Game);
    }
  }

  isInactive(): boolean {
    return this.getStatus() === UserStatus.INACTIVE;
  }

  isPlaying(): boolean {
    return this.getStatus() === UserStatus.PLAYING;
  }

  async genSetPlayGame(game: GoGame): Promise<void> {
    // only focus on the game if user is not focused already
    if (this.isPlaying() && this.getCurrentGameID !== null) {
      return;
    }
    this._currentGame = game;
    this.setStatus(UserStatus.PLAYING);
    this.setCurrentGameID(game.getID());
    await this.genSave();
  }

  getCurrentGame(): Object {
    return this._currentGame;
  }

  async genFinishGame(gameID: number): Promise<void> {
    await this._genRemoveGameFromUser(gameID);

    // game complete from resigning
    (new Logger(this))
      .setEvent(LoggingEvent.GAME_FINISH)
      .setTargetClass(LoggingTargetClass.GAME)
      .setTargetID(gameID)
      .log();
  }

  async genQuitGame(gameID: number): Promise<void> {
    await this._genRemoveGameFromUser(gameID);

    // game complete from resigning
    (new Logger(this))
      .setEvent(LoggingEvent.GAME_RESIGN)
      .setTargetClass(LoggingTargetClass.GAME)
      .setTargetID(gameID)
      .log();
  }

  async _genRemoveGameFromUser(gameID: number): Promise<void> {
    invariant(this.isPlaying(), 'User has to be in a game');

    // if user is already focused on another game, no-op
    if (this.getCurrentGameID() !== gameID) {
      return;
    }
    // if user is focused on game that is quitting, refocus on another game
    const activeGames = await GoGame.genActiveGamesForUser(this, {id: {$ne: gameID}});
    if (activeGames.length > 0) {
      this.setCurrentGameID(activeGames[0].getID());
    } else {
      this.setStatus(UserStatus.INACTIVE);
      this.setCurrentGameID(null);
    }

    await this.genSave();
  }

  static fromModel(userModel: SequelizeModel): User {
    return new User(userModel);
  }

  static async genBy(whereQuery: Object): Promise<?User> {
    return await this._genBy({
      where: whereQuery,
      include: [{
        model: models.Game,
      }],
    });
  }

  static async genAll(): Promise<Array<User>> {
    return models.User.findAll()
      .then((models: Array<SequelizeModel>): Array<User> => {
        return models.map((m) => User.fromModel(m));
      });
  }

  static async genByUserID(id: number): Promise<?User> {
    return await User.genBy({
      id: id,
    });
  }

  static async genByFBID(fbID: string): Promise<?User> {
    return await User.genBy({
      fbID: fbID,
    });
  }

  static async genOrCreateByFBID(fbID: string): Promise<User> {
    info(`Querying database for a user with fbID: ${fbID}`);

    return this.genByFBID(fbID).then((user: ?User) => {
      if (user) {
        return user;
      }

      // create new user with data from FB
      const defaultUserValues = {
        fbID: fbID,
        status: UserStatus.INACTIVE,
        currentGameID: null,
        language: 'en',
        gender: Gender.UNKNOWN,
      };

      return Bot.getUserProfile(fbID).then(async (data) => {
        return models.User.create({
          ...defaultUserValues,
          firstName: data.first_name,
          lastName: data.last_name,
          profilePic: data.profile_pic,
          locale: data.locale,
          language: getLanguageFromLocale(data.locale), // map user locale to language
          gender: data.gender === 'male' ? Gender.MALE : Gender.FEMALE,
        }).then((userModel: SequelizeModel): User => {
          const user = User.fromModel(userModel);

          (new Logger(user))
            .setEvent(LoggingEvent.CREATE_USER)
            .setTargetClass(LoggingTargetClass.USER)
            .setTargetID(user.getID())
            .setExtraData({fb_data: data})
            .log();

          return user;
        });
      }).catch(() => {
        // if fetching fails, we still want to create the user.
        return models.User.create({
          ...defaultUserValues,
        }).then((userModel: SequelizeModel): User => {
          return User.fromModel(userModel);
        });
      });
    });
  }
}

export default User;

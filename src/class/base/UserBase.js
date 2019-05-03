// auto-generated-signature<7a243ab67118a64d057197ea56b5f12c>
// @flow
'use strict';

import models from '../schema';
import type {SequelizeModel} from '../schema';
import invariant from 'invariant';

export type UserAttributes = {
  fbID?: string,
  status?: UserStatusType,
  language?: string,
  firstName?: string,
  lastName?: string,
  profilePic?: string,
  locale?: string,
  gender?: GenderType,
  isAI?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  currentGameID?: number,
};

class UserBase {
  _model: SequelizeModel;
  constructor(model: SequelizeModel): void {
    invariant(model, 'model has to be defined');
    this._model = model;
  }

  getID(): number {
    return this._model.get('id');
  }

  getFBID(): string {
    return this._model.get('fbID');
  }

  setFBID(val: ?string): this {
    this._model.fbID = val;
    return this;
  }

  getStatus(): UserStatusType {
    return this._model.get('status');
  }

  setStatus(val: ?UserStatusType): this {
    this._model.status = val;
    return this;
  }

  getLanguage(): string {
    return this._model.get('language');
  }

  setLanguage(val: ?string): this {
    this._model.language = val;
    return this;
  }

  getFirstName(): string {
    return this._model.get('firstName');
  }

  setFirstName(val: ?string): this {
    this._model.firstName = val;
    return this;
  }

  getLastName(): string {
    return this._model.get('lastName');
  }

  setLastName(val: ?string): this {
    this._model.lastName = val;
    return this;
  }

  getProfilePic(): string {
    return this._model.get('profilePic');
  }

  setProfilePic(val: ?string): this {
    this._model.profilePic = val;
    return this;
  }

  getLocale(): string {
    return this._model.get('locale');
  }

  setLocale(val: ?string): this {
    this._model.locale = val;
    return this;
  }

  getGender(): GenderType {
    return this._model.get('gender');
  }

  setGender(val: ?GenderType): this {
    this._model.gender = val;
    return this;
  }

  getIsAI(): boolean {
    return this._model.get('isAI');
  }

  setIsAI(val: ?boolean): this {
    this._model.isAI = val;
    return this;
  }

  getCreatedAt(): Date {
    return this._model.get('createdAt');
  }

  setCreatedAt(val: ?Date): this {
    this._model.createdAt = val;
    return this;
  }

  getUpdatedAt(): Date {
    return this._model.get('updatedAt');
  }

  setUpdatedAt(val: ?Date): this {
    this._model.updatedAt = val;
    return this;
  }

  getCurrentGameID(): number {
    return this._model.get('currentGameID');
  }

  setCurrentGameID(val: ?number): this {
    this._model.currentGameID = val;
    return this;
  }

  genSave(): Promise<void> {
    return this._model.save();
  }
  genDelete(): Promise<void> {
    return this._model.destroy();
  }

  // base helper
  getData(): UserAttributes {
    return {
      id: this.getID(),
      fbID: this.getFBID(),
      status: this.getStatus(),
      language: this.getLanguage(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      profilePic: this.getProfilePic(),
      locale: this.getLocale(),
      gender: this.getGender(),
      isAI: this.getIsAI(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      currentGameID: this.getCurrentGameID(),
    };
  }

  static async _genAllBy(query: Object): Promise<Array<this>> {
    return models.User.findAll(query)
      .then((models: Array<SequelizeModel>) => {
        return models.map((m) => new this(m));
      }).catch((err) => {
      error(`Error loading User with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }

  static async genEnforce(id: number): Promise<this> {
    const t = await this.genNullable(id);
    invariant(t, `User is null for id ${id}`);
    return t;
  }

  static async genNullable(id: number): Promise<?this> {
    return await this._genBy({
        where: {
          id
        },
      });
  }

  static async _genBy(query: Object): Promise<?this> {
    return models.User.findOne(query).then((model: ?SequelizeModel) => {
      return model
        ? new this(model)
        : null;
    }).catch((err) => {
      error(`Error loading User with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }
/*
static async genCreate(params: UserAttributes): Promise<?this> {0
  return models.User.create(params).then((model: SequelizeModel) => {
    return new this(model);
  });
}
*/
}
module.exports = UserBase;

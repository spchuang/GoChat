// auto-generated-signature<f6ff51b29c8d99a1e617deb75c7338c6>
// @flow
'use strict';

import models from '../schema';
import type {SequelizeModel} from '../schema';
import invariant from 'invariant';

export type LoggingAttributes = {
  userFBID?: string,
  userLanguage?: string,
  targetClass?: string,
  targetID?: number,
  event?: string,
  extraData?: string,
  createdAt?: Date,
  updatedAt?: Date,
  userID?: number,
};

class LoggingBase {
  _model: SequelizeModel;
  constructor(model: SequelizeModel): void {
    invariant(model, 'model has to be defined');
    this._model = model;
  }

  getID(): number {
    return this._model.get('id');
  }

  getUserFBID(): string {
    return this._model.get('userFBID');
  }

  setUserFBID(val: ?string): this {
    this._model.userFBID = val;
    return this;
  }

  getUserLanguage(): string {
    return this._model.get('userLanguage');
  }

  setUserLanguage(val: ?string): this {
    this._model.userLanguage = val;
    return this;
  }

  getTargetClass(): string {
    return this._model.get('targetClass');
  }

  setTargetClass(val: ?string): this {
    this._model.targetClass = val;
    return this;
  }

  getTargetID(): number {
    return this._model.get('targetID');
  }

  setTargetID(val: ?number): this {
    this._model.targetID = val;
    return this;
  }

  getEvent(): string {
    return this._model.get('event');
  }

  setEvent(val: ?string): this {
    this._model.event = val;
    return this;
  }

  getExtraData(): string {
    return this._model.get('extraData');
  }

  setExtraData(val: ?string): this {
    this._model.extraData = val;
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

  getUserID(): number {
    return this._model.get('userID');
  }

  setUserID(val: ?number): this {
    this._model.userID = val;
    return this;
  }

  genSave(): Promise<void> {
    return this._model.save();
  }
  genDelete(): Promise<void> {
    return this._model.destroy();
  }

  // base helper
  getData(): LoggingAttributes {
    return {
      id: this.getID(),
      userFBID: this.getUserFBID(),
      userLanguage: this.getUserLanguage(),
      targetClass: this.getTargetClass(),
      targetID: this.getTargetID(),
      event: this.getEvent(),
      extraData: this.getExtraData(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      userID: this.getUserID(),
    };
  }

  static async _genAllBy(query: Object): Promise<Array<this>> {
    return models.Logging.findAll(query)
      .then((models: Array<SequelizeModel>) => {
        return models.map((m) => new this(m));
      }).catch((err) => {
      error(`Error loading Logging with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }

  static async genEnforce(id: number): Promise<this> {
    const t = await this.genNullable(id);
    invariant(t, `Logging is null for id ${id}`);
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
    return models.Logging.findOne(query).then((model: ?SequelizeModel) => {
      return model
        ? new this(model)
        : null;
    }).catch((err) => {
      error(`Error loading Logging with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }
/*
static async genCreate(params: LoggingAttributes): Promise<?this> {0
  return models.Logging.create(params).then((model: SequelizeModel) => {
    return new this(model);
  });
}
*/
}
module.exports = LoggingBase;

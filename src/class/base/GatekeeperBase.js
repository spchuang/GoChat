// auto-generated-signature<d2afd7f6ad9df7048034071fc6494de8>
// @flow
'use strict';

import models from '../schema';
import type {SequelizeModel} from '../schema';
import invariant from 'invariant';

export type GatekeeperAttributes = {
  name?: string,
  rules?: string,
  userIDWhitelist?: string,
  userIDBlacklist?: string,
  createdAt?: Date,
  updatedAt?: Date,
};

class GatekeeperBase {
  _model: SequelizeModel;
  constructor(model: SequelizeModel): void {
    invariant(model, 'model has to be defined');
    this._model = model;
  }

  getID(): number {
    return this._model.get('id');
  }

  getName(): string {
    return this._model.get('name');
  }

  setName(val: ?string): this {
    this._model.name = val;
    return this;
  }

  getRules(): string {
    return this._model.get('rules');
  }

  setRules(val: ?string): this {
    this._model.rules = val;
    return this;
  }

  getUserIDWhitelist(): string {
    return this._model.get('userIDWhitelist');
  }

  setUserIDWhitelist(val: ?string): this {
    this._model.userIDWhitelist = val;
    return this;
  }

  getUserIDBlacklist(): string {
    return this._model.get('userIDBlacklist');
  }

  setUserIDBlacklist(val: ?string): this {
    this._model.userIDBlacklist = val;
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

  genSave(): Promise<void> {
    return this._model.save();
  }
  genDelete(): Promise<void> {
    return this._model.destroy();
  }

  // base helper
  getData(): GatekeeperAttributes {
    return {
      id: this.getID(),
      name: this.getName(),
      rules: this.getRules(),
      userIDWhitelist: this.getUserIDWhitelist(),
      userIDBlacklist: this.getUserIDBlacklist(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }

  static async _genAllBy(query: Object): Promise<Array<this>> {
    return models.Gatekeeper.findAll(query)
      .then((models: Array<SequelizeModel>) => {
        return models.map((m) => new this(m));
      }).catch((err) => {
      error(`Error loading Gatekeeper with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }

  static async genEnforce(id: number): Promise<this> {
    const t = await this.genNullable(id);
    invariant(t, `Gatekeeper is null for id ${id}`);
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
    return models.Gatekeeper.findOne(query).then((model: ?SequelizeModel) => {
      return model
        ? new this(model)
        : null;
    }).catch((err) => {
      error(`Error loading Gatekeeper with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }
/*
static async genCreate(params: GatekeeperAttributes): Promise<?this> {0
  return models.Gatekeeper.create(params).then((model: SequelizeModel) => {
    return new this(model);
  });
}
*/
}
module.exports = GatekeeperBase;

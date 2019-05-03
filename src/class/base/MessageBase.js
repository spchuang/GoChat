// auto-generated-signature<1dea9844532e0fcf01ba1d8727c4f92f>
// @flow
'use strict';

import models from '../schema';
import type {SequelizeModel} from '../schema';
import invariant from 'invariant';

export type MessageAttributes = {
  content?: string,
  createdAt?: Date,
  updatedAt?: Date,
  senderID?: number,
  receiverID?: number,
};

class MessageBase {
  _model: SequelizeModel;
  constructor(model: SequelizeModel): void {
    invariant(model, 'model has to be defined');
    this._model = model;
  }

  getID(): number {
    return this._model.get('id');
  }

  getContent(): string {
    return this._model.get('content');
  }

  setContent(val: ?string): this {
    this._model.content = val;
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

  getSenderID(): number {
    return this._model.get('senderID');
  }

  setSenderID(val: ?number): this {
    this._model.senderID = val;
    return this;
  }

  getReceiverID(): number {
    return this._model.get('receiverID');
  }

  setReceiverID(val: ?number): this {
    this._model.receiverID = val;
    return this;
  }

  genSave(): Promise<void> {
    return this._model.save();
  }
  genDelete(): Promise<void> {
    return this._model.destroy();
  }

  // base helper
  getData(): MessageAttributes {
    return {
      id: this.getID(),
      content: this.getContent(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      senderID: this.getSenderID(),
      receiverID: this.getReceiverID(),
    };
  }

  static async _genAllBy(query: Object): Promise<Array<this>> {
    return models.Message.findAll(query)
      .then((models: Array<SequelizeModel>) => {
        return models.map((m) => new this(m));
      }).catch((err) => {
      error(`Error loading Message with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }

  static async genEnforce(id: number): Promise<this> {
    const t = await this.genNullable(id);
    invariant(t, `Message is null for id ${id}`);
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
    return models.Message.findOne(query).then((model: ?SequelizeModel) => {
      return model
        ? new this(model)
        : null;
    }).catch((err) => {
      error(`Error loading Message with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }
/*
static async genCreate(params: MessageAttributes): Promise<?this> {0
  return models.Message.create(params).then((model: SequelizeModel) => {
    return new this(model);
  });
}
*/
}
module.exports = MessageBase;

// auto-generated-signature<1df244c722fbd7e873fbf93fdee1aebb>
// @flow
'use strict';

import models from '../schema';
import type {SequelizeModel} from '../schema';
import invariant from 'invariant';

export type GameRoomAttributes = {
  code?: string,
  boardSize?: BoardSize,
  isPrivate?: boolean,
  isOwnerBlack?: boolean,
  komi?: number,
  handicap?: number,
  createdAt?: Date,
  updatedAt?: Date,
  ownerID?: number,
};

class GameRoomBase {
  _model: SequelizeModel;
  constructor(model: SequelizeModel): void {
    invariant(model, 'model has to be defined');
    this._model = model;
  }

  getID(): number {
    return this._model.get('id');
  }

  getCode(): string {
    return this._model.get('code');
  }

  setCode(val: ?string): this {
    this._model.code = val;
    return this;
  }

  getBoardSize(): BoardSize {
    return this._model.get('boardSize');
  }

  setBoardSize(val: ?BoardSize): this {
    this._model.boardSize = val;
    return this;
  }

  getIsPrivate(): boolean {
    return this._model.get('isPrivate');
  }

  setIsPrivate(val: ?boolean): this {
    this._model.isPrivate = val;
    return this;
  }

  getIsOwnerBlack(): boolean {
    return this._model.get('isOwnerBlack');
  }

  setIsOwnerBlack(val: ?boolean): this {
    this._model.isOwnerBlack = val;
    return this;
  }

  getKomi(): number {
    return this._model.get('komi');
  }

  setKomi(val: ?number): this {
    this._model.komi = val;
    return this;
  }

  getHandicap(): number {
    return this._model.get('handicap');
  }

  setHandicap(val: ?number): this {
    this._model.handicap = val;
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

  getOwnerID(): number {
    return this._model.get('ownerID');
  }

  setOwnerID(val: ?number): this {
    this._model.ownerID = val;
    return this;
  }

  genSave(): Promise<void> {
    return this._model.save();
  }
  genDelete(): Promise<void> {
    return this._model.destroy();
  }

  // base helper
  getData(): GameRoomAttributes {
    return {
      id: this.getID(),
      code: this.getCode(),
      boardSize: this.getBoardSize(),
      isPrivate: this.getIsPrivate(),
      isOwnerBlack: this.getIsOwnerBlack(),
      komi: this.getKomi(),
      handicap: this.getHandicap(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      ownerID: this.getOwnerID(),
    };
  }

  static async _genAllBy(query: Object): Promise<Array<this>> {
    return models.GameRoom.findAll(query)
      .then((models: Array<SequelizeModel>) => {
        return models.map((m) => new this(m));
      }).catch((err) => {
      error(`Error loading GameRoom with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }

  static async genEnforce(id: number): Promise<this> {
    const t = await this.genNullable(id);
    invariant(t, `GameRoom is null for id ${id}`);
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
    return models.GameRoom.findOne(query).then((model: ?SequelizeModel) => {
      return model
        ? new this(model)
        : null;
    }).catch((err) => {
      error(`Error loading GameRoom with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }
/*
static async genCreate(params: GameRoomAttributes): Promise<?this> {0
  return models.GameRoom.create(params).then((model: SequelizeModel) => {
    return new this(model);
  });
}
*/
}
module.exports = GameRoomBase;

// auto-generated-signature<a71b976ee17c8eb78aaf74dfe348c9be>
// @flow
'use strict';

import models from '../schema';
import type {SequelizeModel} from '../schema';
import invariant from 'invariant';

export type GameScoringAttributes = {
  blackTerritory?: number,
  blackCapture?: number,
  whiteTerritory?: number,
  whiteCapture?: number,
  board?: Object,
  status?: GameScoringRequestStatusType,
  createdAt?: Date,
  updatedAt?: Date,
  gameID?: number,
  creatorID?: number,
};

class GameScoringBase {
  _model: SequelizeModel;
  constructor(model: SequelizeModel): void {
    invariant(model, 'model has to be defined');
    this._model = model;
  }

  getID(): number {
    return this._model.get('id');
  }

  getBlackTerritory(): number {
    return this._model.get('blackTerritory');
  }

  setBlackTerritory(val: ?number): this {
    this._model.blackTerritory = val;
    return this;
  }

  getBlackCapture(): number {
    return this._model.get('blackCapture');
  }

  setBlackCapture(val: ?number): this {
    this._model.blackCapture = val;
    return this;
  }

  getWhiteTerritory(): number {
    return this._model.get('whiteTerritory');
  }

  setWhiteTerritory(val: ?number): this {
    this._model.whiteTerritory = val;
    return this;
  }

  getWhiteCapture(): number {
    return this._model.get('whiteCapture');
  }

  setWhiteCapture(val: ?number): this {
    this._model.whiteCapture = val;
    return this;
  }

  getBoard(): Object {
    return JSON.parse(this._model.get('board'));
  }

  setBoard(val: ?Object): this {
    this._model.board = JSON.stringify(val);
    return this;
  }

  getStatus(): GameScoringRequestStatusType {
    return this._model.get('status');
  }

  setStatus(val: ?GameScoringRequestStatusType): this {
    this._model.status = val;
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

  getGameID(): number {
    return this._model.get('gameID');
  }

  setGameID(val: ?number): this {
    this._model.gameID = val;
    return this;
  }

  getCreatorID(): number {
    return this._model.get('creatorID');
  }

  setCreatorID(val: ?number): this {
    this._model.creatorID = val;
    return this;
  }

  genSave(): Promise<void> {
    return this._model.save();
  }
  genDelete(): Promise<void> {
    return this._model.destroy();
  }

  // base helper
  getData(): GameScoringAttributes {
    return {
      id: this.getID(),
      blackTerritory: this.getBlackTerritory(),
      blackCapture: this.getBlackCapture(),
      whiteTerritory: this.getWhiteTerritory(),
      whiteCapture: this.getWhiteCapture(),
      board: this.getBoard(),
      status: this.getStatus(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      gameID: this.getGameID(),
      creatorID: this.getCreatorID(),
    };
  }

  static async _genAllBy(query: Object): Promise<Array<this>> {
    return models.GameScoring.findAll(query)
      .then((models: Array<SequelizeModel>) => {
        return models.map((m) => new this(m));
      }).catch((err) => {
      error(`Error loading GameScoring with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }

  static async genEnforce(id: number): Promise<this> {
    const t = await this.genNullable(id);
    invariant(t, `GameScoring is null for id ${id}`);
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
    return models.GameScoring.findOne(query).then((model: ?SequelizeModel) => {
      return model
        ? new this(model)
        : null;
    }).catch((err) => {
      error(`Error loading GameScoring with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }
/*
static async genCreate(params: GameScoringAttributes): Promise<?this> {0
  return models.GameScoring.create(params).then((model: SequelizeModel) => {
    return new this(model);
  });
}
*/
}
module.exports = GameScoringBase;

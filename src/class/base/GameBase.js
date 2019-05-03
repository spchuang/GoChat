// auto-generated-signature<d0e0dc371ee70eb42affa7d15ec4770d>
// @flow
'use strict';

import models from '../schema';
import type {SequelizeModel} from '../schema';
import invariant from 'invariant';

export type GameAttributes = {
  isBlackTurn?: boolean,
  weiqiConsecutivePasses?: number,
  weiqiHistory?: Object,
  weiqiBoard?: Object,
  weiqiBoardSize?: BoardSize,
  stonesHistory?: Array<StoneMove>,
  boardImageURL?: string,
  status?: GameStatusType,
  komi?: number,
  winsBy?: number,
  handicap?: number,
  createdAt?: Date,
  updatedAt?: Date,
  whiteUserID?: number,
  blackUserID?: number,
};

class GameBase {
  _model: SequelizeModel;
  constructor(model: SequelizeModel): void {
    invariant(model, 'model has to be defined');
    this._model = model;
  }

  getID(): number {
    return this._model.get('id');
  }

  getIsBlackTurn(): boolean {
    return this._model.get('isBlackTurn');
  }

  setIsBlackTurn(val: ?boolean): this {
    this._model.isBlackTurn = val;
    return this;
  }

  getWeiqiConsecutivePasses(): number {
    return this._model.get('weiqiConsecutivePasses');
  }

  setWeiqiConsecutivePasses(val: ?number): this {
    this._model.weiqiConsecutivePasses = val;
    return this;
  }

  getWeiqiHistory(): Object {
    return JSON.parse(this._model.get('weiqiHistory'));
  }

  setWeiqiHistory(val: ?Object): this {
    this._model.weiqiHistory = JSON.stringify(val);
    return this;
  }

  getWeiqiBoard(): Object {
    return JSON.parse(this._model.get('weiqiBoard'));
  }

  setWeiqiBoard(val: ?Object): this {
    this._model.weiqiBoard = JSON.stringify(val);
    return this;
  }

  getWeiqiBoardSize(): BoardSize {
    return this._model.get('weiqiBoardSize');
  }

  setWeiqiBoardSize(val: ?BoardSize): this {
    this._model.weiqiBoardSize = val;
    return this;
  }

  getStonesHistory(): Array<StoneMove> {
    return JSON.parse(this._model.get('stonesHistory'));
  }

  setStonesHistory(val: ?Array<StoneMove>): this {
    this._model.stonesHistory = JSON.stringify(val);
    return this;
  }

  getBoardImageURL(): string {
    return this._model.get('boardImageURL');
  }

  setBoardImageURL(val: ?string): this {
    this._model.boardImageURL = val;
    return this;
  }

  getStatus(): GameStatusType {
    return this._model.get('status');
  }

  setStatus(val: ?GameStatusType): this {
    this._model.status = val;
    return this;
  }

  getKomi(): number {
    return this._model.get('komi');
  }

  setKomi(val: ?number): this {
    this._model.komi = val;
    return this;
  }

  getWinsBy(): number {
    return this._model.get('winsBy');
  }

  setWinsBy(val: ?number): this {
    this._model.winsBy = val;
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

  getWhiteUserID(): number {
    return this._model.get('whiteUserID');
  }

  setWhiteUserID(val: ?number): this {
    this._model.whiteUserID = val;
    return this;
  }

  getBlackUserID(): number {
    return this._model.get('blackUserID');
  }

  setBlackUserID(val: ?number): this {
    this._model.blackUserID = val;
    return this;
  }

  genSave(): Promise<void> {
    return this._model.save();
  }
  genDelete(): Promise<void> {
    return this._model.destroy();
  }

  // base helper
  getData(): GameAttributes {
    return {
      id: this.getID(),
      isBlackTurn: this.getIsBlackTurn(),
      weiqiConsecutivePasses: this.getWeiqiConsecutivePasses(),
      weiqiHistory: this.getWeiqiHistory(),
      weiqiBoard: this.getWeiqiBoard(),
      weiqiBoardSize: this.getWeiqiBoardSize(),
      stonesHistory: this.getStonesHistory(),
      boardImageURL: this.getBoardImageURL(),
      status: this.getStatus(),
      komi: this.getKomi(),
      winsBy: this.getWinsBy(),
      handicap: this.getHandicap(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      whiteUserID: this.getWhiteUserID(),
      blackUserID: this.getBlackUserID(),
    };
  }

  static async _genAllBy(query: Object): Promise<Array<this>> {
    return models.Game.findAll(query)
      .then((models: Array<SequelizeModel>) => {
        return models.map((m) => new this(m));
      }).catch((err) => {
      error(`Error loading Game with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }

  static async genEnforce(id: number): Promise<this> {
    const t = await this.genNullable(id);
    invariant(t, `Game is null for id ${id}`);
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
    return models.Game.findOne(query).then((model: ?SequelizeModel) => {
      return model
        ? new this(model)
        : null;
    }).catch((err) => {
      error(`Error loading Game with query ${JSON.stringify(query, null, 2)}`, err);
    });
  }
/*
static async genCreate(params: GameAttributes): Promise<?this> {0
  return models.Game.create(params).then((model: SequelizeModel) => {
    return new this(model);
  });
}
*/
}
module.exports = GameBase;

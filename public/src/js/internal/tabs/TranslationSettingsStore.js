/*
 * @flow
 */

'use strict';

import $ from 'jquery';
import EventStore from '../../common/EventStore.js';

const POLLING_INTERVAL = 1500;
const BASE_URL = '/internal/translations';

class TranslationSettingsStore extends EventStore {
  _data: Array<Object>;
  _loading: boolean;

  constructor() {
    super();
    this._data = [];
    this._loading = false;
  }

  load(): void {
    this._loading = true;
    this.emitChange();
    // get all the local messages
    const url = BASE_URL + '/_data';
    $.get(url)
      .done((res: Array<Object>) => {
        this._data = res;
        this._loading = false;
        this.emitChange();
      })
      .fail((res: Object) => {
        console.log(res);
        //setTimeout(this.startPolling.bind(this), POLLING_INTERVAL)
      });
  }

  getState(): Object {
    return {
      serverData: this._data,
      loading: this._loading,
    };
  }

  update(data: Array<Object>): void {
    const url = BASE_URL + '/_update';
    const oldData = this._data;

    this._data = data;
    this._loading = true;
    this.emitChange();
    $.post(url, {data: data})
      .done((res: Object) => {
        this._loading = false;
        this.emitChange();
      })
      .fail((res: Object) => {
        alert(res.responseText);
        this._data = oldData;
        this._loading = false;
        this.emitChange();
      });
  }
}

module.exports = new TranslationSettingsStore();

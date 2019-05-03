/*
 * @flow
 */

'use strict';

import $ from 'jquery';
import EventStore from '../../common/EventStore.js';

const BASE_URL = '/internal/metrics';

const metrics = [
  {
    name: 'Daily active users (DAP)',
    filters: {
      whereFilter: '',
      distinctField: 'userID',
      table: 'Logging',
    },
  },
  {
    name: 'Daily Message Send',
    filters: {
      whereFilter: 'event iN ("text_send", "post_back_send")',
      table: 'Logging',
    },
  },
  {
    name: 'Daily Unique Game created',
    filters: {
      whereFilter: 'event = "create_game"',
      table: 'Logging',
    },
  },
  {
    name: 'Daily game moves',
    filters: {
      whereFilter: 'event = "game_play_move"',
      table: 'Logging',
    },
  },
  {
    name: 'Daily unique games (DAG)',
    filters: {
      whereFilter: 'targetClass="game"',
      distinctField: 'targetID',
      table: 'Logging',
    },
  },
  {
    name: 'Daily new user',
    filters: {
      whereFilter: 'event="create_user"',
      table: 'Logging',
    },
  },
  {
    name: 'All Users',
    filters: {
      table: 'User',
    },
    transform: (data) => {
      let sum = 0;
      return data.map(x => {
        sum += x.count;
        x.count = sum;
        return x;
      });
    }
  },
  {
    name: 'All Games',
    filters: {
      table: 'Game',
    },
    transform: (data) => {
      let sum = 0;
      return data.map(x => {
        sum += x.count;
        x.count = sum;
        return x;
      });
    }
  },
];

export type MetricData = {
  sql: string,
  data: Array<Object>,
};

class MetricsStore extends EventStore {
  _data: {[key: string]: ?MetricData};
  _metricIsLoading = {};

  constructor() {
    super();
    this._data = {};
  }

  load(): void {
    // get all the local messages
    const url = BASE_URL + '/_data';

    metrics.forEach(metric => {
      const {name, filters} = metric;
      const key = this.getKey(name);
      this._metricIsLoading[key] = true;
      $.get({
        url,
        data: filters,
      })
        .done((res: MetricData) => {
          const processedData = metric.transform
            ? metric.transform(res.data)
            : res.data;
          this._data[key] = {
            ...res,
            data: processedData,
          };
          this.emitChange();
        })
        .fail((res: Object) => {
          console.log('error', res);
          this._data[key] = null;
        });
    });
  }

  getKey(name: string): string {
    return name.toLocaleLowerCase().replace(/ /g, "_");
  }

  getState(): Object {
    return {
      data: this._data,
      keyOrders: metrics.map(x => {
        return {
          key: this.getKey(x.name),
          name: x.name,
        };
      }),
    };
  }
}

module.exports = new MetricsStore();

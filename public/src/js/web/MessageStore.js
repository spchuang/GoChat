/*
 * @flow
 */

import $ from 'jquery';
import EventStore from '../common/EventStore.js'

const POLLING_INTERVAL = 2000;
const BASE_URL = '/message';

class MessageStore extends EventStore {
  _messages: Array<Object>;
  _hasMore: boolean;
  _receiverID: number;
  _userID: string;
  _loadingPreviousMessage: boolean;

  constructor(params: {
    messages: Array<Object>,
    hasMore: boolean,
    userID: string,
    receiverID: number,
  }) {
    super();
    this._messages = [];

    this._addMessages(params.messages);
    this._receiverID = params.receiverID;
    this._userID = params.userID;
    this._hasMore = params.hasMore;
    this._loadingPreviousMessage = false;
  }

  startPolling(): void {
    const query: Object = {
      u: this._userID,
      receiverID: this._receiverID,
    };
    if (this._messages.length > 0) {
      query.afterMessageID = this._messages[this._messages.length - 1].id;
    }

    // get all the local messages
    $.get(BASE_URL + '/getAfter', query)
      .done((res: Object) => {
        if (res.messages && res.messages.length > 0) {
          this._addMessagesAndEmitChange(res.messages);
        }
        setTimeout(this.startPolling.bind(this), POLLING_INTERVAL)
      })
      .fail((res: Object) => {
        console.log(res);
        setTimeout(this.startPolling.bind(this), POLLING_INTERVAL)
      });
  }

  getState(): {messages: Array<Object>, hasMore: boolean} {
    // clone the messages for react
    return {
      messages: this._messages.slice(0),
      hasMore: this._hasMore,
    };
  }

  getPreviousMessages(): void {
    if (this._loadingPreviousMessage) {
      return;
    }

    this._loadingPreviousMessage = true;
    const query: Object = {
      u: this._userID,
      receiverID: this._receiverID,
    };
    if (this._messages.length > 0) {
      query.beforeMessageID = this._messages[0].id;
    }

    // get all the local messages
    $.get(BASE_URL + '/getBefore', query)
      .done((res: Object) => {
        if (res.messages && res.messages.length > 0) {
          this._hasMore = res.hasMore;
          this._addMessagesAndEmitChange(res.messages);
        }
        this._loadingPreviousMessage = false;
      })
      .fail((res: Object) => {
        this._loadingPreviousMessage = false;
      });
  }

  sendMessage(content: string, success: () => void, fail: () => void): void {
    // TODO: optimistic update?
    $.post(BASE_URL + '/send', {
      content,
      u: this._userID,
      receiverID: this._receiverID,
    })
      .done((res: Object) => {
        if (res.message) {
          this._addMessagesAndEmitChange([res.message]);
        }
        success();
      })
      .fail((res: Object) => {
        fail();
      });
  }

  _addMessagesAndEmitChange(messages: Array<Object>): void {
    this._addMessages(messages);
    this.emitChange();
  }

  _addMessages(messages: Array<Object>): void {
    // concat and remove duplicates
    this._messages = dedupeByKey(this._messages.concat(messages), 'id');
    this._messages.sort((a: Object, b: Object): number => {
      return a.id - b.id;
    });
  }
}

function dedupeByKey(arr, key) {
  const tmp = {};
  return arr.reduce((p, c) => {
    const k = c[key];
    if (tmp[k]) return p;
    tmp[k] = true;
    return p.concat(c);
  }, []);
}

module.exports = MessageStore;

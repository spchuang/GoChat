/*
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import classNames from 'classNames';
import MessageStore from './MessageStore';
import OverlaySpinner from '../common/OverlaySpinner.jsx';
import UserLoaderContainer from '../common/UserLoaderContainer.jsx';

type State = {
  val: string,
  messages: Array<Object>,
  hasMore: boolean,
  loading: boolean,
};

type Props = {
  messages: Array<Object>,
  hasMore: boolean,
  userID: string,
  receiverID: number,
  text: {
    messageInputPlaceholder: string,
  },
};

class MessageContainer extends React.Component {
  state: State;
  props: Props;
  _store;
  _messageContainer: ?HTMLDivElement = null;
  _scrollTop: number;
  _scrollHeight: number;

  constructor(props: Object) {
    super(props);
    this._store = new MessageStore(props);
    this.state = {
      val: '',
      loading: false,
      ...this._store.getState(),
    };
  }

  componentDidMount(): void {
    this._scrollToBottom();
    this._store.startPolling();
    this._store.addChangeListener(() => {
      const state = this._store.getState();
      this.setState(state);
    });

    this._scrollHeight = $(document.body).prop('scrollHeight');
    this._scrollTop = $(window).scrollTop();
    window.addEventListener('scroll', this._handleMessageContainerScroll);
  }

  componentWillUnmount() {;
    window.removeEventListener('scroll', this._handleMessageContainerScroll);
  }

  componentWillUpdate(): void {
    this._scrollHeight = $(document.body).prop('scrollHeight');
    this._scrollTop = $(window).scrollTop();
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (
      prevState.messages &&
      this.state.messages &&
      this.state.messages[this.state.messages.length - 1].id >
        prevState.messages[prevState.messages.length - 1].id
    ) {
      this._scrollToBottom();
    } else {
      // restore original scroll position
      if (
        this._scrollTop !== null && // handle 0 case
        this._scrollHeight
      ) {
        $(window).scrollTop(
          this._scrollTop + ($(document.body).prop('scrollHeight') - this._scrollHeight)
        );
      }
    }
  }

  render(): React.Element<*> {
    return (
      <div className="message-chat-view">
        {this._renderMessages()}
        {this._renderFooter()}
      </div>
    );
  }

  _renderMessages(): React.Element<*> {
    const messages = this.state.messages.map((m: Object) => {
      return (
        <div>
          <span className={classNames(
          'message', 'message-bubble', {
            'me': m.receiverID === this.props.receiverID,
          })}>
            {m.content}
          </span>
          <div className="clear"/>
        </div>
      )
    });

    const spinner = this.state.hasMore
      ? <div><div className="spinner"></div></div>
      : null;

    return (
      <div
        className="message-content"
        ref={(el) => { this._messageContainer = el; }}>
        {spinner}
        {messages}
      </div>
    );
  }

  _renderFooter(): React.Element<*> {
    return (
      <div className="message-chat-footer">
        <div className="input-group">
          <input
            type="text"
            value={this.state.val}
            className="form-control input-lg"
            placeholder={this.props.text.messageInputPlaceholder}
            onChange={this._handleChange}
            disabled={this.state.loading}
            autoFocus={true}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-primary btn-lg"
              onClick={this._handleSend}
              disabled={!this.state.val || this.state.loading}>
              <span className="glyphicon glyphicon-send"/>
            </button>
          </span>
        </div>
  		</div>
    );
  }

  _handleChange = (evt): void => {
    this.setState({
      val: evt.target.value,
    });
  };

  _handleSend = (): void => {
    this.setState({loading: true});
    this._store.sendMessage(
      this.state.val,
      () => {this.setState({val: '', loading: false})},
      () => {this.setState({loading: false})},
    );
  };

  _handleMessageContainerScroll = (evt: Object): void => {
    if (
      $(window).scrollTop() < 50 &&
      this.state.hasMore
    ) {
      this._store.getPreviousMessages();
    }
  };

  _scrollToBottom(): void {
    $(window).scrollTop($(window).height());
  }
}

UserLoaderContainer.setup(MessageContainer);

/*
 * @flow
 */

'use strict';

import $ from 'jquery';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classNames';
import CreateGameInput from './CreateGameInput.jsx';
import OverlaySpinner from '../common/OverlaySpinner.jsx';
import WebViewUtils from '../common/WebViewUtils';
import UserLoaderContainer from '../common/UserLoaderContainer.jsx';
import Footer from '../common/Footer.jsx';

const JOIN_URL = '/joinGame/join';

type Error = {
  code: number,
  message: string,
};

type State = {
  code: string,
  loading: boolean,
  error: ?Error,
};

const JoinGameContainer = React.createClass({
  propTypes: {
    userID: PropTypes.string.isRequired,
    text: PropTypes.object.isRequired,
  },

  getInitialState(): State {
    return {
      loading: false,
      code: '',
      error: null,
    }
  },

  render(): React.Element<*> {
    const loadingSpinner = this.state.loading
      ? <OverlaySpinner />
      : null;
    return (
      <div className="createGameWrapper">
        {loadingSpinner}
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
              <h5><label>{this.props.text.enterCodeForRoom}</label></h5>
              {this._renderErrorAlert()}
              {this._renderGameRoomCode()}
            </div>
          </div>
        </div>
        {this._renderFooter()}
      </div>
    );
  },

  _renderInfo(): ?React.Element<*> {
    return (
      <div className="alert alert-info">{this.props.text.enterCodeForRoom}</div>
    );
  },

  _renderErrorAlert(): ?React.Element<*> {
    let errorText = null;

    if (this.state.error) {
      errorText = this.state.error.message;
    }

    if (!errorText) {
      return null;
    }
    return (
      <div className="alertHeader alert alert-danger" role="alert">
        {errorText}
      </div>
    );
  },

  _renderGameRoomCode(): React.Element<*> {
    return (
      <div className="form-group">
        <input
          className="form-control"
          type="number"
          pattern="\d*"
          class="form-control"
          placeholder="12345"
          value={this.state.code}
          onChange={(event: Object) => this.setState({code: event.target.value})}
        />
      </div>
    )
  },

  _renderFooter(): React.Element<*> {
    return (
      <Footer
        text={this.props.text.joinButton}
        onClick={this._submit}
      />
    );
  },

  _isDisabled(): boolean {
    return false;
  },

  _submit(): void {
    const {loading, ...state} = this.state;
    const data = {
      ...state,
      u: this.props.userID,
    };
    this.setState({loading: true, error: null});
    $.post(JOIN_URL, data)
      .done((res: Object) => {
        this.setState({loading: false});
        WebViewUtils.closeWebView();
      })
      .fail((res: Object) => {
        this.setState({
          loading: false,
          error: res.responseJSON.error,
        });
      });
  },
});

UserLoaderContainer.setup(JoinGameContainer);

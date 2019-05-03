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
import WebViewUtils from '../common/WebViewUtils.js';
import UserLoaderContainer from '../common/UserLoaderContainer.jsx';
import Footer from '../common/Footer.jsx';
import GameSelectInput from './GameSelectInput.jsx';

const CREATE_URL = '/game/create';
const GAME_TYPE_OPTIONS: Array<GameType> = ['friend', 'self'];
const BOARD_SIZES_OPTIONS: Array<BoardSize> = [9, 13, 19];
const HANDICAP_OPTIONS: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function getGameTypeText(option: GameType, text: Object): string {
  if (option === 'friend') {
    return text.optionPlayWithFriend;
  } else if (option == 'AI'){
    return text.optionPlayWithAI;
  } else {
    return text.optionPlayWithSelf;
  }
}

function getGameColorText(option: GameColorOption, text: Object): string {
  if (option === 'random') {
    return text.optionColorRandom;
  } else if (option === 'black') {
    return text.optionColorBlack;
  } else {
    return text.optionColorWhite;
  }
}

type Error = {
  code: number,
  message: string,
};

type State = {
  boardSize: number,
  color: GameColorOption,
  loading: boolean,
  gameType: GameType,
  error: ?Error,
  komi: number,
  handicap: number,
};

const CreateGameContainer = React.createClass({
  propTypes: {
    userID: PropTypes.string.isRequired,
    text: PropTypes.object.isRequired,
  },

  getInitialState(): State {
    return {
      boardSize: 19,
      color: 'random',
      loading: false,
      gameType: 'friend',
      error: null,
      komi: 6.5,
      handicap: 0,
    }
  },

  render(): React.Element<*> {
    const loadingSpinner = this.state.loading
      ? <OverlaySpinner />
      : null;

    return (
      <div className="createGameWrapper">
        {loadingSpinner}
        <div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
                {this._renderErrorAlert()}
                {this._renderGameTypeInput()}
                {this._renderGameInfo()}
                {this._renderBoardSizeInput()}
                {this._renderBoardColorInput()}
                {this._renderHandicapInput()}
                {this._renderKomiInput()}
              </div>
            </div>
          </div>
          {this._renderFooter()}
        </div>
      </div>
    );
  },

  _renderGameInfo(): ?React.Element<*> {
    let text = null;
    if (this.state.gameType === 'friend') {
      text = this.props.text.infoPlayWithFriend;
    } else if (this.state.gameType === 'self') {
      text = this.props.text.infoPlayWithSelf;
    } else if (this.state.gameType === 'AI') {
      text = this.props.text.infoPlayWithAI;
    }
    if (text) {
      return (
        <div className="alert alert-info">{text}</div>
      );
    }
    return null;
  },

  _renderGameTypeInput(): React.Element<*> {
    const options = this.props.canPlayWithAI
      ? [...GAME_TYPE_OPTIONS, 'AI']
      : GAME_TYPE_OPTIONS;

    return (
      <CreateGameInput
        label={this.props.text.whoToPlayWithLabel}
        value={this.state.gameType}
        options={options}
        onChange={(option) => this.setState({gameType: option})}
        optionText={(option: GameType) => getGameTypeText(option, this.props.text)}
        disabled={this._isDisabled()}
      />
    );
  },

  _renderBoardColorInput(): ?React.Element<*> {
    if (this.state.gameType === 'self') {
      return null;
    }

    const options = this.state.handicap > 0
      ? ['black', 'white']
      : ['random', 'black', 'white'];

    return (
      <CreateGameInput
        label={this.props.text.colorLabel}
        value={this.state.color}
        options={options}
        onChange={(option: GameColorOption) => this.setState({color: option})}
        optionText={(option: GameColorOption) => getGameColorText(option, this.props.text)}
        disabled={this._isDisabled()}
      />
    );
  },

  _renderKomiInput(): React.Element<*> {
    const options = this.state.handicap > 0
      ? [0]
      : [6.5];
    return (
      <CreateGameInput
        label={this.props.text.komiLabel}
        value={this.state.komi}
        options={options}
        onChange={(option) => this.setState({komi: parseInt(option, 10)})}
        optionText={option => option}
        disabled={true}
      />
    );
  },

  _renderHandicapInput(): React.Element<*> {
    return (
      <GameSelectInput
        label={this.props.text.handicapLabel}
        value={this.state.handicap}
        options={HANDICAP_OPTIONS}
        onChange={(option) => {
          const handicap = parseInt(option, 10);
          this.setState({
            handicap,
            komi: handicap === 0 ? 0 : 6.5,
            color: handicap === 0 ? 'random' : 'black',
          });
        }}
        optionText={option => option}
        disabled={this._isDisabled()}
      />
    );
  },

  _renderBoardSizeInput(): React.Element<*> {
    return (
      <CreateGameInput
        label={this.props.text.boarsSizeLabel}
        value={this.state.boardSize}
        options={BOARD_SIZES_OPTIONS}
        onChange={(option) => this.setState({boardSize: parseInt(option, 10)})}
        optionText={(option: string) => `${option}x${option}`}
        disabled={this._isDisabled()}
      />
    );
  },

  _renderFooter(): React.Element<*> {
    return (
      <Footer
        text={this.props.text.createButton}
        onClick={this._submit}
        disabled={this._isDisabled()}
      />
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
    $.post(CREATE_URL, data)
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

UserLoaderContainer.setup(CreateGameContainer);

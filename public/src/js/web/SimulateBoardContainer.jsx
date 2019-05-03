/*
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classNames';
import OverlaySpinner from '../common/OverlaySpinner.jsx';
import GoBoardPlayer from '../common/GoBoardPlayer.jsx';
import UserLoaderContainer from '../common/UserLoaderContainer.jsx';

const BOARD_SIZES_OPTIONS: Array<BoardSize> = [9, 13, 19];
const EMPTY_BOARD_ID = 'empty';

type SelectedGameType = number | 'empty';
type State = {
  selectedGameID: SelectedGameType;
  emptyBoardSize: BoardSize;
};

class SimulateBoardContainer extends React.Component {
  state: State;

  static propTypes = {
    userID: PropTypes.string.isRequired,
    text: PropTypes.object.isRequired,
    games: PropTypes.array.isRequired,
    focusedOnGameID: PropTypes.number,
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      selectedGameID: props.focusedOnGameID
        ? props.focusedOnGameID
        : EMPTY_BOARD_ID,
      emptyBoardSize: 19,
    };
  }

  render(): React.Element<*> {
    const error = this._userNotInGames()
      ? this._renderInfoAlert(this.props.text.noGameMessage)
      : null;

    let layout;
    let game;
    if (this.state.selectedGameID === EMPTY_BOARD_ID) {
      // load an empty board type
      layout = {
        top: ['Control'],
      };
      game = {
        move: 0,
        sgf: `(;SZ[${this.state.emptyBoardSize}])`,
      }
    } else {
      game = this.props.games.find((g) => g.id === this.state.selectedGameID);
      console.log(game);
      layout = {
        top: ['Control', 'InfoBox'],
      };
    }
    return (
      <div className="createGameWrapper">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
              {error}
              {this._renderGameSelector()}
              {this._renderEmptyBoardSizeSelector()}
              <GoBoardPlayer
                layout={{top: ['Control', 'InfoBox']}}
                move={game.move}
                sgf={game.sgf}
                mode='edit'
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  _userNotInGames(): boolean {
    return this.props.games.length === 0;
  }

  _renderGameSelector(): ?React.Element<*> {
    // when we load gameID directly, we only wnat to view that game.
    if (this.props.loadSingleGameOnly) {
      return null;
    }

    if (this._userNotInGames()) {
      return null;
    }

    const options = this.props.games.map((game: Object) => {
      const id = game.id;
      return (
        <option key={id} value={id}>
          {game.opponentName}
        </option>
      );
    });

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-3 control-label">{this.props.text.selectGameLabel}</label>
          <div className="col-sm-9">
            <select
              className="form-control"
              value={this.state.selectedGameID}
              onChange={this._handleGameChange}>
              {options}
              <option value={EMPTY_BOARD_ID}>{this.props.text.emptyBoardOption}</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  _renderEmptyBoardSizeSelector(): ?React.Element<*> {
    if (this.state.selectedGameID !== EMPTY_BOARD_ID) {
      return null;
    }
    const options = BOARD_SIZES_OPTIONS.map((size: number) => {
      return (
        <option key={size} value={size}>{size}</option>
      );
    });

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-3 control-label">{this.props.text.selectBoardSizeLabel}</label>
          <div className="col-sm-9">
            <select
              className="form-control"
              value={this.state.emptyBoardSize}
              onChange={this._handleBoardSizeChange}>
              {options}
            </select>
          </div>
        </div>
      </div>
    );
  }

  _handleBoardSizeChange = (evt: Object): void => {
    this.setState({emptyBoardSize: evt.target.value});
  }

  _handleGameChange = (evt: Object): void => {
    this.setState({selectedGameID: evt.target.value});
  }

  _renderInfoAlert(errorText: string): React.Element<*> {
    return (
      <div className="alertHeader alert alert-info" role="alert">
        {errorText}
      </div>
    );
  }
}

UserLoaderContainer.setup(SimulateBoardContainer);

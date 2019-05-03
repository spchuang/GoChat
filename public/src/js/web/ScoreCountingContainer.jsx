/*
 * @flow
 */

'use strict';

import $ from 'jquery';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classNames';
import OverlaySpinner from '../common/OverlaySpinner.jsx';
import GoBoardPlayer from '../common/GoBoardPlayer.jsx';
import UserLoaderContainer from '../common/UserLoaderContainer.jsx';
import Footer from '../common/Footer.jsx';
import WebViewUtils from '../common/WebViewUtils.js';
import FooterWrapper from '../common/FooterWrapper.jsx';

import invariant from 'invariant';

const CREATE_URL = '/countScore/create';
const UPDATE_URL = '/countScore/update';
const ACCEPT_URL = '/countScore/accept';
const REJECT_URL = '/countScore/reject';

type ModeType = 'update' | 'create' | 'view';

type State = {
  newScoringData: ?{
    blackTerritory: number,
    blackCapture: number,
    whiteTerritory: number,
    whiteCapture: number,
  },
  loading: boolean,
  error: ?string,
  selectedScoringID: ?number,
  mode: ModeType,
};

type Props = {
  userID: string,
  text: Object,
  gameInfo: Object,
  gameIsOver: boolean,
  defaultScoringID: ?number,
  scorings: Array<Object>,
}

function getResultText(whiteScore: number, blackScore: number): string {
  return (whiteScore > blackScore ? 'W+' : 'B+') + Math.abs(whiteScore - blackScore);
}

class ScoreCountingContainer extends React.Component {
  state: State;
  props: Props;
  _player: GoBoardPlayer;

  constructor(props: Object) {
    super(props);

    // TODO: handle viewing when game is resigned (no scoring data available);

    // there are 3 modes: create, update and view.
    // create: only in this mode when there are no scorings at all
    // view: by default, if there are scorings, we will view the first scorings
    // when user click "update" on his own scoring, we enter update mode
    let mode = 'create';
    let selectedScoringID = null;
    if (props.defaultScoringID) {
      mode = 'view';
      selectedScoringID = props.defaultScoringID;
    } else {
      if (props.scorings.length > 0) {
        mode = 'view';
        selectedScoringID = props.scorings[0].id;
      }
    }

    this.state = {
      newScoringData: null,
      loading: false,
      error: '',
      selectedScoringID,
      mode,
    };
  }

  render(): React.Element<*> {
    const header = this.props.gameInfo.isOver
      ? this._renderFinalScore()
      : this._renderScoringSelector();

    const scoreInfo = this.props.gameInfo.isOver
      ? null
      : this._renderScoreInfo();

    return (
      <div className="createGameWrapper">
        <div>
          <div className="container padding-bottom-10">
            <div className="row">
              <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 padding-top-10">
                {scoreInfo}
                {header}
                {this._renderNewScoringStat()}
                {this._renderBoardPlayer()}
              </div>
            </div>
          </div>
          {this._renderFooter()}
        </div>
      </div>
    );
  }

  _renderBoardPlayer(): React.Element<*> {
    const game = this.props.gameInfo;
    const viewScoring = this.props.scorings.find(
      scoring => scoring.id === this.state.selectedScoringID
    );

    return (
      <GoBoardPlayer
        layout={{top: ['InfoBox']}}
        move={game.move + 1}
        sgf={game.sgf}
        mode={this.state.mode === 'view' ? 'view' : 'score'}
        viewBoard={viewScoring ? viewScoring.board : null}
        onScoreUpdate={this._handleScoreUpdate}
        ref={(player) => {this._player = player;}}
      />
    );
  }

  _renderNewScoringStat(): ?React.Element<*> {
    if (this.state.mode === 'view') {
      return null;
    }
    const score = this.state.newScoringData;
    if (!score) {
      return null;
    }
    const whiteAll = score.whiteTerritory + score.whiteCapture + this.props.gameInfo.komi;
    const blackAll = score.blackTerritory + score.blackCapture;
    return (
      <div>
        <div>{this.props.text.totalScore}: {getResultText(whiteAll, blackAll)}</div>
        <div>{this.props.text.black} : {score.blackTerritory} + {score.blackCapture} = {blackAll}</div>
        <div>{this.props.text.white} : {score.whiteTerritory} + {score.whiteCapture} + {this.props.gameInfo.komi} = {whiteAll}</div>
      </div>
    );
  }

  // only shown when game is over.
  _renderFinalScore(): React.Element<*> {
    return (
      <div className="list-group">
        <a href="#" className="list-group-item active">
          <h4 className="list-group-item-heading">{this.props.gameInfo.scoreText}</h4>
        </a>
      </div>
    );
  }

  _renderScoringSelector(): React.Element<*> {
    // (B+10). <your request> <status>
    const scoringItems = this.props.scorings.map((scoring: Object) => {
      const whiteAll = scoring.whiteTerritory + scoring.whiteCapture + this.props.gameInfo.komi;
      const blackAll = scoring.blackTerritory + scoring.blackCapture;

      let label;
      if (scoring.status === 0) {
        label = <span className="label label-warning margin-left-4">{this.props.text.pendingLabel}</span>;
      } else if (scoring.status === 1) {
        label = <span className="label label-danger margin-left-4">{this.props.text.rejectedLabel}</span>;
      }

      let button;
      if (scoring.isCreator) {
        const text = this.state.mode === 'update'
          ? this.props.text.cancelButton
          : this.props.text.updateButton
        button = (
          <button
            className="pull-right btn btn-default"
            onClick={(e) => this._handleUpdateScoringClick(scoring.id, e)}>
            {text}
          </button>
        );
      }
      return (
        <a href="#"
          className={classNames("list-group-item", {'active': scoring.id === this.state.selectedScoringID})}
          onClick={() => this._handleSelectScoringClick(scoring.id)}>
          {button}
          <h4 className="list-group-item-heading">{getResultText(whiteAll, blackAll)} {label}</h4>
          <p className="list-group-item-text">{scoring.requestedByText}</p>
        </a>
      );
    });
    return (
      <div className="score-counting-selector">
        <h4>{this.props.text.scoringListHeader} {this._renderCreateNewScoringButton()}</h4>
        <hr/>
        <div className="list-group">
          {scoringItems}
        </div>
      </div>
    );
  }

  _handleUpdateScoringClick(scoringID: number, e: Object): void {
    if (this.state.mode === 'update') {
      this.setState({selectedScoringID: scoringID, mode: 'view'});
    } else {
      this.setState({selectedScoringID: scoringID, mode: 'update'});
    }

    // prevent event from bubbling
    e.stopPropagation();
  }

  _handleSelectScoringClick(scoringID: number): void {
    this.setState({selectedScoringID: scoringID, mode: 'view'});
  }

  _handleScoreUpdate = ({
    blackTerritory,
    blackCapture,
    whiteTerritory,
    whiteCapture,
    komi,
  }:{
    blackTerritory: number,
    blackCapture: number,
    whiteTerritory: number,
    whiteCapture: number,
    komi: number,
  }): void => {
    this.setState({
      newScoringData: {blackTerritory, blackCapture, whiteTerritory, whiteCapture},
    });
  };

  _renderScoreInfo(): ?React.Element<*> {
    return (
      <div className="alert alert-info">{this.props.text.explainInfoText}</div>
    );
  }

  _renderInfoAlert(errorText: string): React.Element<*> {
    return (
      <div className="alertHeader alert alert-info" role="alert">
        {errorText}
      </div>
    );
  }

  _renderFooter(): ?React.Element<*> {
    if (this.props.gameInfo.isOver) {
      return null;
    }

    let text;
    // if looking at your own scoring, hide the button
    if (this.state.mode === 'view') {
      const viewScoring = this.props.scorings.find(
        scoring => scoring.id === this.state.selectedScoringID
      );
      invariant(viewScoring, 'for flow');
      if (viewScoring.isCreator) {
        return null;
      }

      // show accept/reject button
      return this._renderAcceptRejectFooter();
    } else if (this.state.mode === 'create') {
      text = this.props.text.submitButton;
    } else if (this.state.mode === 'update') {
      text = this.props.text.updateButton;
    }

    return (
      <Footer
        text={text}
        onClick={this._handleClick}
        disabled={this.state.loading}
      />
    );
  }

  _renderAcceptRejectFooter(): React.Element<*> {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
              <h4 className="text-center">{this.props.text.doYouAgreeScoringText}</h4>
            </div>
          </div>
        </div>
      <FooterWrapper>
        <div>
          <div className="col-xs-6 col-sm-5 col-sm-offset-1 col-md-3 col-md-offset-3">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-danger btn-block"
              disabled={this.state.loading}
              onClick={this._handleRejectClick}>
              {this.props.text.rejectButton}
            </button>
          </div>
          <div className="col-xs-6 col-sm-5 col-md-3">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-success btn-block"
              disabled={this.state.loading}
              onClick={this._handleAcceptClick}>
              {this.props.text.acceptButton}
            </button>
          </div>
        </div>
      </FooterWrapper>
      </div>
    );
  }

  _renderCreateNewScoringButton(): ?React.Element<*> {
    if (this.props.gameInfo.isOver) {
      return null;
    }

    const hasCreated = this.props.scorings.some(
      scoring => scoring.isCreator,
    );

    if (hasCreated || this.props.scorings.length === 0) {
      return null;
    }

    return (
      <button
        type="button"
        className={classNames("margin-left-12", "btn", "btn-md", "btn-default", {'active': this.state.mode === 'create'})}
        disabled={this.state.loading}
        onClick={() => {
          this.setState({mode: 'create', selectedScoringID: null});
        }}>
        {this.props.text.createNewScoreButton}
      </button>
    );
  }

  _submit = (url: string, data: Object): void => {
    this.setState({loading: true, error: null});
    data = {
      ...data,
      gameID: this.props.gameInfo.id,
      u: this.props.userID,
    }
    $.post(url, data, 'json')
      .done(() => {
        this.setState({loading: false});
        WebViewUtils.closeWebView();
      })
      .fail((res: Object) => {
        this.setState({
          loading: false,
          error: res.responseJSON && res.responseJSON.error,
        });
      });
  };

  _handleAcceptClick = (): void => {
    const data = {
      scoringID: this.state.selectedScoringID,
      gameID: this.props.gameInfo.id,
    };
    this._submit(ACCEPT_URL, data);
  }

  _handleRejectClick = (): void => {
    const data = {
      scoringID: this.state.selectedScoringID,
      gameID: this.props.gameInfo.id,
    };
    this._submit(REJECT_URL, data);
  }

  _handleClick = (): void => {
    if (this.state.mode === 'create') {
      const data = {
        ...this.state.newScoringData,
        board: JSON.stringify(this._player.getBoardObject()),
        gameID: this.props.gameInfo.id,
      };

      this._submit(CREATE_URL, data);
    } else if (this.state.mode === 'update') {
      const data = {
        ...this.state.newScoringData,
        board: JSON.stringify(this._player.getBoardObject()),
        scoringID: this.state.selectedScoringID,
      };

      this._submit(UPDATE_URL, data);
    }
  };
}

UserLoaderContainer.setup(ScoreCountingContainer);

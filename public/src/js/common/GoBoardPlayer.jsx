/*
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import WGo from 'WGo';
import equal from 'deep-equal';
import invariant from 'invariant';

const WGoPlayerConfig = {
  board: {
    background: '/web/images/wood1.jpg',
  },
  enableWheel: false,
  lockScroll: false,
  update: (e) => {
    // do something later
  },
};

type Props = {
  mode: 'edit' | 'score' | 'view',
  viewBoard?: ?Array<Array<Object>>,
  layout: Object,
  move?: number,
  sgf?: string,
  onScoreUpdate?: (scores: {
    blackTerritory: number,
    blackCapture: number,
    whiteTerritory: number,
    whiteCapture: number,
    komi: number,
  }) => void,
};

class GoBoardPlayer extends React.PureComponent {
  props: Props;
  state: Object;
  _playerDiv: ?Object;
  _player: ?Object;
  _score_mode: ?Object;

  componentDidMount(): void {
    this._updateWGoPlayer();
  }

  componentDidUpdate(prevProps: Object, prevState: Object): void {
    this._updateWGoPlayer();
  }
  shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
    return !equal(nextProps, this.props);
  }

  _updateWGoPlayer(): void {
    this._player = new WGo.BasicPlayer(this._playerDiv, {
      ...WGoPlayerConfig,
      layout: this.props.layout,
      move: this.props.move,
      sgf: this.props.sgf,
    });

    if (this.props.mode === 'view') {
      // load the board based on prop instead of sgf
      this._player.board.removeAllObjects();
      invariant(this.props.viewBoard, 'for flow');
      this.props.viewBoard.forEach(rowObjects => {
        invariant(this._player, 'for flow');
        this._player.board.addObject(rowObjects);
      })
    } else if (this.props.mode === 'score') {
      this._player.setFrozen(true);

      invariant(this._player, 'for flow');
  		this._score_mode = new WGo.ScoreMode(
        this._player.kifuReader.game.position,
        this._player.board,
        this._player.kifu.info.KM || 0,
        this._handleScoreUpdate,
      );
  		this._score_mode.start();
    } else if (this.props.mode === 'edit') {
      const editable = new WGo.Player.Editable(this._player, this._player.board);
      editable.set(true);
    } else {
      throw new Error ("invalid player mode");
    }
  }

  _handleScoreUpdate = (msg: string): void => {
    // WGO player returns html message for scores so
    // I need to manually transform them
    var text = msg.replace(/<(?:.|\n)*?>/gm, '').replace(/ /g,'');

    // \d+(\.\d{1,2})? matches decimal
    var m = text.match(/((\d+(\.\d{1,2})?)\+)+(\d+(\.\d{1,2})?)=(\d+(\.\d{1,2})?)/g);
    invariant(m, 'for flow');

    // territory + x, territory + w + komi
    const blackScores = m[0].split('=')[0].split('+').map((num) => parseFloat(num));
    const whiteScores = m[1].split('=')[0].split('+').map((num) => parseFloat(num));

    this.props.onScoreUpdate && this.props.onScoreUpdate({
      blackTerritory: blackScores[0],
      blackCapture: blackScores[1],
      whiteTerritory: whiteScores[0],
      whiteCapture: whiteScores[1],
      komi: whiteScores[2],
    });
  };

  getWGOPlayer(): ?Object {
    return this._player;
  }

  getBoardObject(): Array<Array<Object>> {
    invariant(this._player, 'for flow');
    return this._player.board.obj_arr;
  }

  render(): React.Element<*> {
    return <div ref={(playerDiv) => { this._playerDiv = playerDiv; }} />;
  }
}

module.exports = GoBoardPlayer;

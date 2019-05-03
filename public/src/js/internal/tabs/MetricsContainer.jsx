/*
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MetricsStore from './MetricsStore';
import {ResponsiveContainer, LineChart, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip} from 'Recharts';
import $ from 'jquery';

import type {MetricData} from './MetricsStore';

type State = {
  loading: boolean,
  data: {[key: string]: MetricData},
  keyOrders: Array<{key: string, name: string}>,
};

class MetricsContainer extends React.Component {
  state: State;

  constructor(props: Object) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      keyOrders: [],
    };
  }

  componentDidMount(): void {
    MetricsStore.addChangeListener(() => {
      const newState = MetricsStore.getState();

      // clone data
      this.setState({
        ...newState,
      });
    });
    MetricsStore.load();
  }

  render(): React.Element<*> {
    const sections = this.state.keyOrders.map(x => {
      return this._getChart(x.key, x.name, this.state.data[x.key]);
    });
    return (
      <div>
        {this._renderSidePanel()}
        <div className="col-xs-12 col-sm-9">
          <h3>GoChat Metrics </h3>
          {sections}
        </div>
      </div>
    )
  }

  _getChart(key: string, name: string, metricData: MetricData): React.Element<*> {
    if (!metricData) {
      return (
        <div id={key}>
          <h3>{name}</h3>
          <p>loading</p>
        </div>
      );
    }
    return (
      <div id={key}>
        <h3>{name}</h3>
        <pre>{metricData.sql}</pre>
        <ResponsiveContainer width="90%" height={350}>
          <LineChart data={metricData.data}
                margin={{top: 5, right: 30, left: 10, bottom: 40}}>
            <XAxis dataKey="time" angle={-45} textAnchor="end"/>
            <YAxis allowDecimals={false} minTickGap={5}>
              <Label value="count" angle={-90} offset={0} position="insideLeft" />
            </YAxis>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Line type="monotone" dataKey="count" stroke="#82ca9d" activeDot={{r: 8}}/>
          </LineChart>
        </ResponsiveContainer>
        <hr/>
      </div>
    );
  }

  _renderSidePanel(): ?React.Element<*> {
    const metricNames = this.state.keyOrders.map(x => {
      return (
        <a
          className="list-group-item"
          href="#"
          onClick={() => {
            $('html, body').animate({
                scrollTop: $(`#${x.key}`).offset().top - 70
            }, 1000);
          }}>
          {x.name}
        </a>
      );
    });

    return (
      <div className="col-xs-12 col-sm-3 sidePanel">
        <div className="list-group">
          <ul className="list-group">
            {metricNames}
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = MetricsContainer;

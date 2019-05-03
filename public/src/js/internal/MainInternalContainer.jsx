/*
 * @flow
 */

'use strict';

import deepEqual from 'deep-equal';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import TranslationSettingsContainer from './tabs/TranslationSettingsContainer.jsx';
import MetricsContainer from './tabs/MetricsContainer.jsx';
import classNames from 'classNames';
import $ from 'jquery';
import invariant from 'invariant';

type tabName = 'translation' | 'metrics';

type TabData = {
  name: tabName,
  props: Object,
};

type Props = {
  tabs: Array<TabData>,
};

type State = {
  selectedTab: tabName,
};

class MainInternalContainer extends React.Component {
  state: State;
  props: Props;

  constructor(props: Object) {
    super(props);
    this.state = {
      selectedTab: props.tabs[0].name,
    };
  }

  render(): React.Element<*> {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">GoChat Internal</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                {this._getTabs()}
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            {this._getContent()}
          </div>
        </div>
      </div>
    );
  }

  _getTabs(): Array<React.Element<*>> {
    return this.props.tabs.map(tab => {
      return (
        <li className={classNames({'active': tab.name === this.state.selectedTab})}>
          <a href="#" onClick={() => this._handleTabClick(tab.name)}>{tab.name}</a>
        </li>
      );
    });
  }

  _handleTabClick(name): void {
    this.setState({selectedTab: name});
  }

  _getContent(): ?React.Element<any> {
    const selectedTabData = this.props.tabs.find(x => x.name === this.state.selectedTab);
    if (!selectedTabData) {
      return null;
    }
    switch (this.state.selectedTab) {
      case 'translation':
        return (
          <TranslationSettingsContainer
            {...selectedTabData.props}
          />
        );
      case 'metrics':
        return (
          <MetricsContainer
            {...selectedTabData.props}
          />
        );
    }
  }
}

global.setup = function(rootID: string, props: Object) {
  ReactDOM.render(<MainInternalContainer {...props}/>, document.getElementById(rootID));
}

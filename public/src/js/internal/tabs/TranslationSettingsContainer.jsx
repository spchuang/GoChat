/*
 * @flow
 */

'use strict';

import deepEqual from 'deep-equal';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import TranslationSettingsStore from './TranslationSettingsStore';
import classNames from 'classNames';
import OverlaySpinner from '../../common/OverlaySpinner.jsx';
import $ from 'jquery';
import invariant from 'invariant';

type State = {
  serverData: Array<Object>,
  loading: boolean,
  clientData: Object,
  selectedNamespace: string,
  showDialog: boolean,
  newInputName: string,
  newInputNamespace: string,
};

type Props = {
  translationNamespace: Array<string>,
  languages: Array<string>,
  disableUpdate: boolean,
};

class TranslationSettingsContainer extends React.Component {
  props: Props;
  state: State;

  constructor(props: Object) {
    super(props);
    this.state = {
      serverData: [],
      loading: true,
      clientData: {},
      selectedNamespace: 'normal',
      showDialog: false,
      newInputName: '',
      newInputNamespace: props.translationNamespace[0],
    };
  }

  _convertServerData(data: Array<Object>): Object {
    // clone data
    const serverData = JSON.parse(JSON.stringify(data));
    const convertedData = {}
    for (let i = 0, len = serverData.length; i < len; i++) {
      const phraseObj = serverData[i];
      const {name, namespace} = phraseObj;
      if (!(namespace in convertedData)) {
        convertedData[namespace] = {};
      }
      convertedData[namespace][name] = phraseObj;
    }
    return convertedData;
  }

  _convertToServerData(data: Object): Array<Object> {
    const serverData = [];
    Object.keys(data).forEach((namespace: string) => {
      Object.keys(data[namespace]).forEach((name: string) => {
        serverData.push(data[namespace][name]);
      });
    });
    return serverData;
  }

  componentDidMount(): void {
    TranslationSettingsStore.addChangeListener(() => {
      const newState = TranslationSettingsStore.getState();

      this.setState({
        ...newState,
        clientData: this._convertServerData(newState.serverData),
      });
    });
    TranslationSettingsStore.load();
  }

  render(): React.Element<*> {
    // use server data for positioning.
    const sections = Object.keys(this.state.clientData).map((namespace: string) => {
      return this._renderNamespaceSection(namespace, this.state.clientData[namespace]);
    });

    const loading = this.state.loading
      ? <OverlaySpinner />
      : null;

    return (
      <div className="translationContainer">
        {loading}
        {this._renderCreateDialog()}
        <div className="col-xs-12 col-sm-9">
          {sections}
        </div>
        {this._renderSidePanel()}
      </div>
    );
  }

  _renderCreateDialog(): React.Element<*> {
    return (
      <div className={classNames("modal fade", {in: this.state.showDialog, show: this.state.showDialog})}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button"
                className="close"
                onClick={this._closeDialog}>
                &times;
              </button>
              <h4 className="modal-title">Create new translation phrase</h4>
            </div>
            <div className="modal-body">
              <p>Namespace</p>
              {this._renderNamespaceSelector(
                this.state.newInputNamespace,
                (newNamespace) => this.setState({newInputNamespace: newNamespace}))}
              <p>Name</p>
              <input
                value={this.state.newInputName}
                className="form-control"
                onChange={(event: Object) => {
                  this.setState({newInputName: event.target.value});
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={this._closeDialog}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this._create}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _renderSidePanel(): ?React.Element<*> {
    if (this.state.loading) {
      return null;
    }

    const options = this.props.translationNamespace.map((namespace) => {
      const active = namespace === this.state.selectedNamespace;
      const phrases = this.state.clientData[namespace];
      const subList = active && phrases
        ? <ul className="list-group">
            {
              Object.keys(phrases).map((name: string) => {
                return (
                  <a
                    className="list-group-item"
                    href="#"
                    onClick={() => {
                      $('html, body').animate({
                          scrollTop: $("#" + this._getPhraseID(name)).offset().top - 70
                      }, 1000);
                    }}>
                    {name}
                  </a>
                );
              })
            }
          </ul>
        : null;

      return (
        <div className="sidePanelListTopItem">
          <a
            name={namespace}
            href="#"
            className={classNames("list-group-item", {active})}
            onClick={() => this.setState({selectedNamespace: namespace})}>
            {namespace}
          </a>
          {subList}
        </div>
      );
    });
    return (
      <div className="col-xs-6 col-sm-3 sidePanel">
        <button
          type="button"
          className="btn"
          onClick={this._openDialog}>
          New
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={this.props.disableUpdate || this._hasDataChanged()}
          onClick={this._save}>
          Save
        </button>
        <div className="list-group">
          {options}
        </div>
      </div>
    );
  }

  _renderNamespaceSelector(value: string, onChange: Function): React.Element<*> {
    const options = this.props.translationNamespace.map((namespace) => {
      return (
        <option name={namespace}>{namespace}</option>
      );
    });
    return (
      <select
        value={value}
        className="form-control"
        onChange={(event) => onChange(event.target.value)}>
        {options}
      </select>
    );
  }

  _renderNamespaceSection(namespace: string, phrases: Object): React.Element<*> {
    const phraseSection = Object.keys(phrases).map((name: string) => {
      return this._renderPhraseSection(namespace, name, phrases[name]);
    });

    return (
      <div>
        <h3>Namespace: {namespace}</h3>
        <hr/>
        {phraseSection}
      </div>
    );
  }

  _renderPhraseSection(namespace: string, name: string, phrase: Object): React.Element<*> {
    const {data} = phrase;
    const sections = Object.keys(data).map((language: string) => {
      const val = data[language];
      return (
        <div name={language} className="form-group">
          <label className="col-sm-1 control-label">{language}</label>
          <div className="col-sm-11">
            <input
              value={val}
              className="form-control"
              onChange={(event: Object) => {
                this._onPhraseChange(event.target.value, language, name, namespace);
              }}
            />
          </div>
        </div>
      )
    });

    return (
      <div id={this._getPhraseID(name)} className="panel panel-default translationPhrase">
        <div className="panel-heading">
          <div className="translationName form-inline">
            <div className="form-group">
              {this._renderNamespaceSelector(
                this.state.clientData[namespace][name].namespace,
                (newNamespace) => this._onNamespaceChange(newNamespace, name, namespace))
              }
              -
              <input
                value={phrase.name}
                className="form-control"
                onChange={(event: Object) => {
                  this._onTranslationnameChange(event.target.value, name, namespace);
                }}
              />
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div className="form-horizontal">
            {sections}
          </div>
        </div>
      </div>
    );
  }

  _getPhraseID(name: string): string {
    return name.replace(/ /g, "_");
  }

  _hasDataChanged(): boolean {
    return deepEqual(this._convertServerData(this.state.serverData), this.state.clientData);
  }

  _onTranslationnameChange(newName: string, oldName: string, namespace: string): void {
    const newData = this.state.clientData;
    newData[namespace][oldName].name = newName;
    this.setState({clientData: newData});
  }

  _onNamespaceChange(newNamespace: string, name: string, oldNamespace: string): void {
    const newData = this.state.clientData;
    newData[oldNamespace][name].namespace = newNamespace;
    this.setState({clientData: newData});
  }

  _onPhraseChange(value: string, language: string, name: string, namespace: string): void {
    const newData = this.state.clientData;
    newData[namespace][name].data[language] = value;
    this.setState({clientData: newData});
  }

  _save = (): void => {
    if (this.props.disableUpdate) {
      return;
    }
    TranslationSettingsStore.update(this._convertToServerData(this.state.clientData));
  };

  _openDialog = (): void => {
    this.setState({showDialog: true});
  };

  _closeDialog = (): void => {
    this.setState({showDialog: false});
  };

  _create = (): void => {
    const newData = this.state.clientData;
    const namespace = this.state.newInputNamespace;
    const name = this.state.newInputName;
    const data = {};

    this.props.languages.forEach(lang => data[lang]='');
    if (!(namespace in newData)) {
      newData[namespace] = {};
    }

    newData[namespace][name] = {
      namespace,
      name,
      data,
    };
    this.setState({clientData: newData, newInputName:''});
    this._closeDialog();
  };
}

module.exports = TranslationSettingsContainer;

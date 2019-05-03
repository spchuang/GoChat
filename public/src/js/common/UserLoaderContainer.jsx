/*
 * @flow
 */

'use strict';

import $ from 'jquery';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classNames';
import OverlaySpinner from '../common/OverlaySpinner.jsx';
import Footer from '../common/Footer.jsx';
import WebViewUtils from './WebViewUtils.js';

type Props = {
  userID?: string,
  text: Object,
  Component: Object,
  jsonURL: string,
};

type State = {
  userID: ?string,
  componentProps: ?Object,
  error: ?string,
  showTokenInput: boolean,
  loading: boolean,
  token: string,
};

class UserLoaderContainer extends React.Component {
  props: Props;
  state: State;

  constructor(props: Object) {
    super(props);
    const {userID, ...restProps} = props;
    this.state = {
      userID,
      componentProps: restProps,
      error: null,
      showTokenInput: false,
      loading: false,
      token: '',
    };
  }

  getIsInitialize(): boolean{
    return !!this.state.userID;
  }

  componentDidMount(): void {
    if (this.getIsInitialize()) {
      return;
    }

    WebViewUtils.isInExtention((isInExtention: bool) => {
      if (!isInExtention) {
        // try to fetch from cookie
        const token = WebViewUtils.getUserToken();
        if (token) {
          this._fetchProps(
            {u: token},
            () => {},
            () => {
              // It's possible token is stored but is no longer valid
              this.setState({
                showTokenInput: true,
              });
            },
          );
        } else {
          this.setState({
            showTokenInput: true,
          });
        }

        return;
      }

      WebViewUtils.getUserID((userFBID: string) => {
        this._fetchProps({fbid: userFBID});
      });
    });
  }

  render(): React.Element<any> {
    if (!this.getIsInitialize()) {
      return this._renderUninitializedView();
    }

    const Component = this.props.Component;
    return (
      <Component
        userID={this.state.userID}
        {...this.state.componentProps}
      />
    );
  }

  _renderUninitializedView(): React.Element<*> {
    let content = this.state.showTokenInput
      ? <div>
          {this._renderErrorAlert()}
          <h5><label>{this.props.text.notSupportedText}</label></h5>
          {this._renderTokenInput()}
        </div>
      : <OverlaySpinner />;

    let footer = this.state.showTokenInput
      ? this._renderFooter()
      : null;

    return (
      <div>
        {this.state.loading ? <OverlaySpinner /> : null}
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
              {content}
            </div>
          </div>
        </div>
        {footer}
      </div>
    );
  }

  _renderErrorAlert(): ?React.Element<*> {
    if (!this.state.error) {
      return null;
    }
    return (
      <div className="alertHeader alert alert-danger" role="alert">
        {this.state.error}
      </div>
    );
  }

  _renderTokenInput(): React.Element<*> {
    return (
      <div className="form-group">
        <input
          className="form-control"
          class="form-control"
          placeholder="<token>"
          value={this.state.token}
          onChange={(event: Object) => this.setState({token: event.target.value})}
        />
      </div>
    );
  }

  _renderFooter(): React.Element<*> {
    return (
      <Footer
        text={this.props.text.enterButton}
        onClick={this._submit}
      />
    );
  }

  _fetchProps(req: Object, success?: Function, fail?: Function): void {
    $.get(this.props.jsonURL, req)
      .done((res: Object) => {
        const {userID, ...restProps} = res;
        this.setState({
          userID,
          componentProps: restProps,
        });

        success && success();
      })
      .fail((res: Object) => {
        this.setState({
          error: res.responseText,
        });
        fail && fail();
      });
  }

  // submit the bot token and store in cookie
  _submit = (): void => {
    this._fetchProps({u: this.state.token}, () => {
      WebViewUtils.storeUserToken(this.state.token);
    });
  }
}

module.exports = {
  setup: (Component: Object) => {
    global.setup = function(rootID: string, props: Object, getPropsURL: string) {
      ReactDOM.render(
        <UserLoaderContainer
          {...props}
          Component={Component}
          jsonURL={getPropsURL}
        />,
        document.getElementById(rootID),
      );
    }
  },
};

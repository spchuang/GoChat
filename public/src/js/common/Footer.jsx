/*
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import FooterWrapper from './FooterWrapper.jsx';

class Footer extends React.PureComponent {
  props: {
    text: string,
    onClick: () => void,
    disabled?: boolean,
  };

  render(): React.Element<*> {
    return (
      <FooterWrapper>
        <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            disabled={this.props.disabled}
            onClick={this.props.onClick}>
            {this.props.text}
          </button>
        </div>
      </FooterWrapper>
    );
  }
}

module.exports = Footer;

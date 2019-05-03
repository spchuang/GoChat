/*
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';

class FooterWrapper extends React.PureComponent {
  render(): React.Element<*> {
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = FooterWrapper;

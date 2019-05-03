/*
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';

class OverlaySpinner extends React.PureComponent {
  render(): React.Element<*> {
    return (
      <div className="spinnerOverlay">
        <div className="spinner"></div>
      </div>
    );
  }
}

module.exports = OverlaySpinner;

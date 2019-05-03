/*
 * @flow
 */

'use strict';

import classNames from 'classNames';
import React, {PropTypes} from 'react';

const GameSelectInput = React.createClass({
  propTypes: {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    options: PropTypes.arrayOf(PropTypes.any).isRequired,
    onChange: PropTypes.func.isRequired,
    optionText: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  },

  render(): React.Element<any> {
    const options = this.props.options.map((option: string) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-xs-3"><h4><label>{this.props.label}</label></h4></div>
          <div className="col-xs-4">
            <select
              className="form-control btn-default btn btn-lg handicapSelector"
              value={this.props.value}
              disabled={this.props.disabled}
              onChange={(evt) => this.props.onChange(evt.target.value)}>
              {options}
            </select>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = GameSelectInput;

/*
 * @flow
 */

'use strict';

import classNames from 'classNames';
import React, {PropTypes} from 'react';

const CreateGameInput = React.createClass({
  propTypes: {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    options: PropTypes.arrayOf(PropTypes.any).isRequired,
    onChange: PropTypes.func.isRequired,
    optionText: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  },

  render(): React.Element<any> {
    const buttons = this.props.options.map((option: string) => {
      return (
        <button
          key={option}
          className={classNames(
            'btn btn-default btn-lg',
            {'active': option === this.props.value},
          )}
          disabled={this.props.disabled}
          onClick={() => this.props.onChange(option)}>
          {this.props.optionText(option)}
        </button>
      );
    });
    return (
      <div className="form-group">
        <h4><label>{this.props.label}</label></h4>
        {buttons}
      </div>
    );
  },
});

module.exports = CreateGameInput;

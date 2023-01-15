import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class RadioInput extends Component {
  render() {
    const { name, text, dataTestId, value, handleChange, checked } = this.props;

    return (
      <label htmlFor={ value }>
        <input
          type="radio"
          name={ name }
          id={ name }
          data-testid={ dataTestId }
          value={ value }
          onChange={ handleChange }
          checked={ checked }
        />
        {text}
      </label>
    );
  }
}

RadioInput.propTypes = {
  dataTestId: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  handleChange: PropTypes.func,
  checked: PropTypes.bool,
}.isRequired;

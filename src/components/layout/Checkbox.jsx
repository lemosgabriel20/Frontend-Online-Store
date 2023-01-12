import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* Esse componente renderiza radio buttons.
Ele recebe como props: name (para label, name, id) e text (texto do radio button). */

export default class Checkbox extends Component {
  render() {
    const { name, text } = this.props;

    return (
      <label
        htmlFor={ name }
        data-testid="category"
      >
        <input
          type="radio"
          name={ name }
          id={ name }
        />
        {text}
      </label>
    );
  }
}

Checkbox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
}.isRequired;

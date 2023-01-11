import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Button extends Component {
  render() {
    const { route, dataTestId, text } = this.props;

    return (
      <button type="button">
        <Link
          to={ route }
          data-testid={ dataTestId }
        >
          {text}
        </Link>
      </button>
    );
  }
}

Button.propTypes = {
  dataTestId: PropTypes.string,
  route: PropTypes.string,
  text: PropTypes.string,
}.isRequired;

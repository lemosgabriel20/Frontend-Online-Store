import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AvalCard extends Component {
  render() {
    const { email, rating, text } = this.props;
    return (
      <div>
        <p data-testid="review-card-email">{ email }</p>
        <p data-testid="review-card-rating">{ rating }</p>
        <p data-testid="review-card-evaluation">{ text }</p>
      </div>
    );
  }
}

AvalCard.propTypes = {
  email: PropTypes.string,
  rating: PropTypes.string,
  text: PropTypes.string,
}.isRequired;

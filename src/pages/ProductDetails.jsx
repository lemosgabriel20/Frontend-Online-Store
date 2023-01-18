import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

import LinkButton from '../components/layout/LinkButton';
import EvaluationForm from './EvaluationForm';
import EvaluationCard from './EvaluationCard';

export default class ProductDetails extends Component {
  state = {
    name: '',
    price: '',
    image: '',
    product: {},
    evaluations: [],
    cartProducts: [],
    cartSize: 0,
  };

  componentDidMount() {
    this.getProductDetails();
    this.getFromLocalStorage();
    this.getCartSize();

    // Garante que exista um localStorage próprio para a id do produto
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { evaluations } = this.state;
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, JSON.stringify(evaluations));
    } else {
      const savedEvaluations = (JSON.parse(localStorage.getItem(id)));
      this.setState({ evaluations: savedEvaluations });
    }
  }

  componentDidUpdate() {
    const { cartProducts, cartSize } = this.state;
    this.addCartToLocalStorage(cartProducts, cartSize);
  }

  // Busca produtos salvos no local storage.
  getFromLocalStorage = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (cartProducts) {
      this.setState({ cartProducts }, () => this.getCartSize());
    }
  };

  // Essa função é especifica para o 'cartProducts'!
  addCartToLocalStorage = (cartProducts, cartSize) => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    localStorage.setItem('cartSize', JSON.stringify(cartSize));
  };

  addToLocalStorage = (id, evaluation) => {
    localStorage.setItem(id, JSON.stringify(evaluation));
  };

  // Adiciona ao cartProducts (estado) o produto clicado.
  handleAddToCart = () => {
    const { cartProducts, product } = this.state;
    const updatedCartProducts = [...cartProducts, product];
    this.setState({ cartProducts: updatedCartProducts }, () => this.getCartSize());
  };

  // Envia as avaliações para o localStorage
  updateEvaluations = (evaluationObject) => {
    const { evaluations } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ evaluations: [...evaluations, evaluationObject] }, () => {
      const { state } = this;
      this.addToLocalStorage(id, state.evaluations);
    });
  };

  // Faz a requisição para a API dos detalhes do produto e salva no estado as informações.
  getProductDetails = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getProductById(id);
    this.setState({
      name: response.title,
      price: response.price,
      image: response.pictures[0].url,
      product: response,
    });
  };

  // Atualiza a quantidade de itens no carrinho.
  getCartSize = () => {
    const getCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (getCartProducts) {
      const cartSize = getCartProducts.length;
      this.setState({ cartSize });
    }
  };

  render() {
    const { name, image, price, evaluations, product, cartSize } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    return (
      <div>
        <img
          src={ image }
          alt={ name }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-name">{name}</p>
        <p data-testid="product-detail-price">{`R$ ${price}`}</p>

        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => this.handleAddToCart(product) }
        >
          Adicionar ao carrinho
        </button>

        <LinkButton
          route="/cart"
          dataTestId="shopping-cart-button"
          text="Carrinho"
          cartSize={ cartSize }
        />

        <EvaluationForm productId={ id } updateEvaluations={ this.updateEvaluations } />
        { evaluations.length > 0 ? (
          evaluations.map((aval, index) => (
            <EvaluationCard
              key={ index }
              email={ aval.email }
              rating={ aval.rating }
              text={ aval.text }
            />))
        ) : null }
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

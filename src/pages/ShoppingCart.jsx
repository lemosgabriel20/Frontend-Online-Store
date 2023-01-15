import React, { Component } from 'react';

import CartProducts from './CartProducts';
import LinkButton from '../components/layout/LinkButton';

export default class ShoppingCart extends Component {
  state = {
    cartProducts: [],
  };

  // Busca os produtos no local storage assim que a página carrega.
  componentDidMount() {
    const getCartStorage = localStorage.getItem('cartProducts');
    if (getCartStorage) {
      this.getFromLocalStorage();
    }
  }

  // Atualiza o local storage quando a página atualiza.
  componentDidUpdate() {
    const { cartProducts } = this.state;
    this.addToLocalStorage(cartProducts);
  }

  // Busca produtos salvos no local storage.
  getFromLocalStorage = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    this.setState({ cartProducts });
  };

  // Determina a quantidade de produtos com base no ID.
  productQuantity = (id) => {
    const { cartProducts } = this.state;
    return cartProducts.filter((product) => product.id === id).length;
  };

  // Remove elementos duplicados do cartProducts usando o objeto Set (armazena apenas valores únicos).
  filterList = (cartProducts) => {
    if (!cartProducts) return;
    const uniqueIds = new Set();
    return cartProducts.filter((product) => {
      const duplicate = uniqueIds.has(product.id);
      uniqueIds.add(product.id);
      return !duplicate;
    });
  };

  //  Adiciona itens ao local storage.
  addToLocalStorage = (cartProducts) => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  };

  // Busca o produto com base no ID e o adiciona novamente ao cartProducts.
  increaseQuantity = (id) => {
    const { cartProducts } = this.state;
    const foundProduct = cartProducts.find((product) => product.id === id);
    this.setState({ cartProducts: [...cartProducts, foundProduct] });
  };

  // Filtra o cartProducts removendo produtos com o ID informado.
  excludeProductsById = (id) => {
    const { cartProducts } = this.state;
    return cartProducts.filter((product) => product.id !== id);
  };

  /* Filtra o cartProducts usando o ID do produto, criando um novo array e removendo o primeiro elemento desse array.
  Em seguida, filtra novamente o cartProducts criando um novo array que não contém os produtos com a ID passada como argumento.
  Por fim, atualiza o estado com os novos arrays utilizando o spread operator para espalhar os elementos. */
  decreaseQuantity = (id) => {
    const { cartProducts } = this.state;
    const removedProduct = cartProducts
      .filter((product) => product.id === id)
      .splice(1);
    const updatedList = this.excludeProductsById(id);
    this.setState({ cartProducts: [...removedProduct, ...updatedList] });
  };

  // Remove completamente produtos do carrinho de compras.
  removeProduct = (id) => {
    const updatedList = this.excludeProductsById(id);
    this.setState({ cartProducts: [...updatedList] });
  };

  // O botão de diminuir quantidade só fica habilitado caso a quantidade de produto seja maior que 1.
  validateButton = (quantity) => quantity <= 1;

  render() {
    const { cartProducts } = this.state;
    const filteredList = this.filterList(cartProducts);
    const noCartProducts = !cartProducts || !cartProducts.length;

    // Caso a lista de produtos esteja vazia, a mensagem abaixo será exibida.
    const emptyMessage = (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );

    // Renderiza a lista de produtos já filtrada (itens duplicados removidos).
    return (
      <div>
        {noCartProducts
          ? emptyMessage
          : filteredList.map((product) => {
            const quantity = this.productQuantity(product.id);
            const isDisabled = this.validateButton(quantity);

            return (
              <CartProducts
                key={ product.id }
                id={ product.id }
                thumbnail={ product.thumbnail }
                price={ product.price }
                title={ product.title }
                quantity={ quantity }
                isDisabled={ isDisabled }
                decreaseQuantity={ this.decreaseQuantity }
                increaseQuantity={ this.increaseQuantity }
                removeProduct={ this.removeProduct }
              />
            );
          })}

        {!noCartProducts && (
          <LinkButton
            route="/checkout"
            dataTestId="checkout-products"
            text="Finalizar compra"
          />
        )}
      </div>
    );
  }
}

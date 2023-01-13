import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    shoppingList: [],
  };

  componentDidMount() {
    const getCartStorage = localStorage.getItem('cartProducts');
    if (getCartStorage) {
      this.getFromLocalStorage();
    }
  }

  // Busca produtos salvos no local storage.

  getFromLocalStorage = () => {
    const shoppingList = JSON.parse(localStorage.getItem('cartProducts'));
    this.setState({ shoppingList });
  };

  // Determina a quantidade de produtos com base no ID.

  productQuantity = (id) => {
    const { shoppingList } = this.state;
    return shoppingList.filter((product) => product.id === id).length;
  };

  // Remove elementos duplicados do shoppingList usando o objeto Set (armazena apenas valores únicos).

  filterList = (shoppingList) => {
    if (!shoppingList) return;
    const uniqueIds = new Set();
    return shoppingList.filter((product) => {
      const duplicate = uniqueIds.has(product.id);
      uniqueIds.add(product.id);
      return !duplicate;
    });
  };

  render() {
    const { shoppingList } = this.state;
    const filteredList = this.filterList(shoppingList);

    // Caso a lista de produtos esteja vazia, a mensagem abaixo será exibida.

    const emptyMessage = (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );

    // Renderiza a lista de produtos já filtrada (itens duplicados removidos).

    return (
      <div>
        {!shoppingList || !shoppingList.length
          ? emptyMessage
          : filteredList.map((product) => (
            <div key={ product.id }>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <p data-testid="shopping-cart-product-quantity">
                {`Qtd: ${this.productQuantity(product.id)}`}
              </p>
              <p>
                {`Total: R$ ${
                  this.productQuantity(product.id) * product.price
                }`}
              </p>
            </div>
          ))}
      </div>
    );
  }
}

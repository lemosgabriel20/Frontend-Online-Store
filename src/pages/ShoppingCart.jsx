import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    shoppingList: [],
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
    const { shoppingList } = this.state;
    this.addToLocalStorage(shoppingList);
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

  //  Adiciona itens ao local storage.

  addToLocalStorage = (cartProducts) => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  };

  // Busca o produto com base no ID e o adiciona novamente ao shoppingList.

  increaseQuantity = (id) => {
    const { shoppingList } = this.state;
    const foundProduct = shoppingList.find((product) => product.id === id);
    this.setState({ shoppingList: [...shoppingList, foundProduct] });
  };

  // Filtra o shoppingList removendo produtos com o ID informado.

  excludeProductsById = (id) => {
    const { shoppingList } = this.state;
    return shoppingList.filter((product) => product.id !== id);
  };

  /* Filtra o shoppingList usando o ID do produto, criando um novo array e removendo o primeiro elemento desse array.
  Em seguida, filtra novamente o shoppingList criando um novo array que não contém os produtos com a ID passada como argumento.
  Por fim, atualiza o estado com os novos arrays utilizando o spread operator para espalhar os elementos. */

  decreaseQuantity = (id) => {
    const { shoppingList } = this.state;
    const removedProduct = shoppingList
      .filter((product) => product.id === id)
      .splice(1);
    const updatedList = this.excludeProductsById(id);
    this.setState({ shoppingList: [...removedProduct, ...updatedList] });
  };

  // Remove completamente produtos do carrinho de compras.

  removeProduct = (id) => {
    const updatedList = this.excludeProductsById(id);
    this.setState({ shoppingList: [...updatedList] });
  };

  // O botão de diminuir quantidade só fica habilitado caso a quantidade de produto seja maior que 1.

  validateButton = (quantity) => quantity <= 1;

  render() {
    const { shoppingList } = this.state;
    const filteredList = this.filterList(shoppingList);

    // Caso a lista de produtos esteja vazia, a mensagem abaixo será exibida.

    const emptyMessage = (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );

    // Renderiza a lista de produtos já filtrada (itens duplicados removidos).

    // TODO: criar o componente CartProducts.

    return (
      <div>
        {!shoppingList || !shoppingList.length
          ? emptyMessage
          : filteredList.map((product) => {
            const quantity = this.productQuantity(product.id);
            const isDisabled = this.validateButton(quantity);

            return (
              <div key={ product.id }>
                <img
                  src={ product.thumbnail }
                  alt={ product.title }
                />

                <p data-testid="shopping-cart-product-name">
                  {product.title}
                </p>

                <div>
                  <button
                    type="button"
                    onClick={ () => this.decreaseQuantity(product.id) }
                    disabled={ isDisabled }
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>

                  <p data-testid="shopping-cart-product-quantity">
                    {`Qtd: ${quantity}`}
                  </p>

                  <button
                    type="button"
                    onClick={ () => this.increaseQuantity(product.id) }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                </div>

                <p>{`Total: R$ ${quantity * product.price}`}</p>

                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => this.removeProduct(product.id) }
                >
                  Remover produto
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

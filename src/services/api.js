const fetchCategories = async () => {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
};

const fetchProductsFromCategory = async (categoryId, query) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  return data;
};

export async function getCategories() {
  return fetchCategories();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  return fetchProductsFromCategory(categoryId, query);
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}

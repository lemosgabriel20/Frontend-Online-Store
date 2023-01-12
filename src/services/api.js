// Faz a requisição para buscar as categorias de produto na API.

const fetchCategories = async () => {
  const response = await fetch(
    'https://api.mercadolibre.com/sites/MLB/categories',
  );
  const data = await response.json();
  return data;
};

/* Faz a requisição para buscar entre os produtos de determinada categoria na API.
Caso categoryId seja fornecido, filtra por categoria, senão busca em todas as categorias. */

const fetchProductsFromCategory = async (categoryId, query) => {
  const searchItems = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const searchItemsByCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(
    !categoryId ? searchItems : searchItemsByCategory,
  );
  const data = await response.json();
  return data;
};

const fetchProductDetails = async (id) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  return data;
};

export async function getCategories() {
  return fetchCategories();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  return fetchProductsFromCategory(categoryId, query);
}

export async function getProductById(id) {
  return fetchProductDetails(id);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const renderProductList = (singleProduct) => {
  const { id, title, thumbnail } = singleProduct;
  const finalProduct = createProductItemElement({ sku: id, name: title, image: thumbnail });
  const productsList = document.querySelector('.items');

  productsList.appendChild(finalProduct);
};

const transformProductsList = (productsArray) => {
  const products = productsArray;
  const loading = document.querySelector('.loading');
  products.forEach(product => renderProductList(product));
  loading.innerText = '';
};

const loadingMessage = () => {
  const emptyProductsList = document.querySelector('.items');
  const loadingMessage = document.createElement('p');
  loadingMessage.className = 'loading';
  loadingMessage.innerText = 'loading...';

  emptyProductsList.appendChild(loadingMessage);

}

const fetchProductList = (product = 'computador') => {
  const productEndpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  fetch(productEndpoint)
    .then(loadingMessage())
    .then(response => response.json())
    .then(array => transformProductsList(array.results));
};

window.onload = () => {
  fetchProductList();
};

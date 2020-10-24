const getProductItemInfos = (productItem) => {
  const productObject = {
    sku: productItem.id,
    name: productItem.title,
    image: productItem.thumbnail,
    salePrice: productItem.price,
  };
  return productObject;
};

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

const fetchProductItemId = async (itemId) => {
  const endpoint = `https://api.mercadolibre.com/items/${itemId}`;
  try {
    const response = await fetch(endpoint);
    const object = await response.json();
    addCartProductItens(object);
  } catch (error) {
    alert(error)
  }
};

function cartItemClickListener(event) {
  if (event.target.className === 'item__add') {
    const itemId = getSkuFromProductItem(event.target.parentElement);
    fetchProductItemId(itemId);
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addCartProductItens = (object) => {
  const productInfo = getProductItemInfos(object);
  const cartElement = document.querySelector('.cart__items');
  const productElement = createCartItemElement(productInfo);
  cartElement.appendChild(productElement);
};

const renderProductItensList = (element) => {
  const itensSection = document.querySelector('.items');
  itensSection.appendChild(element);
};

const createProductItensList = (object) => {
  object.forEach((product) => {
    const productInfos = getProductItemInfos(product);
    const itemElement = createProductItemElement(productInfos);
    renderProductItensList(itemElement);
  });
};

const fetchProductItens = async (term) => {
  const query = term;
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const response = await fetch(endpoint);
    const object = await response.json();
    createProductItensList(object.results);
  } catch (error) {
    alert(error);
  }
};

window.onload = function onload() {
  fetchProductItens('computador');
  const itensSection = document.querySelector('.items');
  itensSection.addEventListener('click', cartItemClickListener);
};

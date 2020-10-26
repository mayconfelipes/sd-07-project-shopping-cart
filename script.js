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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const liToRemove = event.target;
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    const item = localStorage.getItem(key);
    if (liToRemove.innerText.startsWith(`SKU: ${item}`)) {
      localStorage.removeItem(key);
    }
  }
  liToRemove.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const manageCart = (object) => {
  const cart = document.querySelector('.cart__items');
  const product = {
    sku: object.id,
    name: object.title,
    salePrice: object.price,
  };
  localStorage.setItem(product.name, product.sku);
  cart.appendChild(createCartItemElement(product));
};

const fetchFromStorage = (sku) => {
  const endpoint = `https://api.mercadolibre.com/items/${sku}`;
  fetch(endpoint)
  .then(response => response.json())
  .then(object => manageCart(object));
};

const fetchInfoFromId = () => {
  const item = event.target.parentElement;
  const sku = getSkuFromProductItem(item);
  const endpoint = `https://api.mercadolibre.com/items/${sku}`;
  fetch(endpoint)
  .then(response => response.json())
  .then(object => manageCart(object));
};
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', event => fetchInfoFromId(event));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  return section;
}

const manageItems = (resultsArray) => {
  const itemsSection = document.querySelector('.items');
  resultsArray.forEach((item) => {
    const product = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    itemsSection.appendChild(createProductItemElement(product));
  });
};

const fetchItemsMercadoLivre = (term) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${term}`;
  fetch(endpoint)
    .then(response => response.json())
    .then(object => manageItems(object.results));
};

const recoverCart = () => {
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    fetchFromStorage(localStorage.getItem(key));
  }
};

window.onload = function onload() {
  fetchItemsMercadoLivre('computador');
  if (localStorage.length !== 0) recoverCart();
};

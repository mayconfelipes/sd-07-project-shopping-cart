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

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const productId = (click) => {
  const parentElement = click.target.parentElement;
  const id = parentElement.firstChild.innerText;

  return id;
};

const fetchProductAndAddCart = (itemID) => {
  const ol = document.querySelector('.cart__items');
  fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then(response => response.json())
    .then(product => ol.appendChild(createCartItemElement(product)));
};

const createButtonAndAddEvent = () => {
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', (event) => {
    fetchProductAndAddCart(productId(event));
  });

  return button;
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createButtonAndAddEvent());
  return section;
}

const createListItems = (QUERY) => {
  section = document.querySelector('.items');
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=$${QUERY}`)
    .then(response => response.json())
    .then(data => data.results.forEach((result) => {
      section.appendChild(createProductItemElement(result));
    }));

  return section;
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // iniciando o projeto. VAMOS COM TUDO :rocket:
}

window.onload = function onload() {
  createListItems('computadores');
};

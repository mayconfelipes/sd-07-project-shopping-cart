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

function saveCart() {
  const cart = document.querySelector('.cart__items').outerHTML;
  localStorage.setItem('cart', cart);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  
  button.addEventListener('click', (event) => {
    addToCart(getSkuFromProductItem(event.target.parentNode));
  });
  section.appendChild(button);

  return section;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const ol = document.querySelector('ol.cart__items');
  ol.removeChild(event.target);
  saveCart();
}

function removeAll() {
  const ol = document.querySelector('ol.cart__items');
  document.querySelectorAll('li.cart__item')
    .forEach(item => ol.removeChild(item));
  localStorage.clear();
}

function cleanCart() {
  const btnClean = document.querySelector('.empty-cart');
  btnClean.addEventListener('click', removeAll);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItems = (itemFromArray) => {
  const items = Object.entries(itemFromArray);
  items.forEach(entry => document.querySelector('.items').appendChild(createProductItemElement(entry[1])));
};

/* const eventBtns = () => {
  document.querySelectorAll('button.item__add').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      addToCart(getSkuFromProductItem(event.target.parentNode));
      console.log(getSkuFromProductItem(event.target.parentNode))
    });
  });
}; */

const capturingID = id => `https://api.mercadolibre.com/items/${id}`;

const fetchCart = (addCart) => {
  fetch(addCart)
    .then(response => response.json())
    .then(teste => {
      document.querySelector('.cart__items').appendChild(createCartItemElement(teste));
      saveCart();
    });
};

const addToCart = (id) => {
  /* document.querySelectorAll('.item__add')
    .forEach(button =>
      button.addEventListener('click', () => {
        const getID = getSkuFromProductItem(button.parentNode); */
        const url = capturingID(id);
        fetchCart(url);
      /* })); */
};

const fetchItems = () => {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  fetch(endpoint)
    .then(response => response.json())
    .then(object => addItems(object.results))
    /* .then(click => addToCart()); */
};

function loadCart() {
  const cart = localStorage.getItem('cart');
  if (cart != null) {
    const ol = document.querySelector('.cart__items');
    ol.outerHTML = cart;
  }
  const oldList = document.querySelectorAll('.cart__item');
  oldList.forEach(li => li.addEventListener('click', cartItemClickListener));
}

window.onload = function onload() {
  fetchItems();
  cleanCart();
  loadCart();
};

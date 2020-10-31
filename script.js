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
  const item = event.currentTarget;
  if (item.classList.contains('cart__item')) {
    const splitItem = item.innerText.split(' ');
    localStorage.removeItem(splitItem[1]);
  }
  item.remove();

}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// ------------------------------------------------------

async function productList() {
  const itemsList = document.querySelector('.items');

  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const response = await fetch(endpoint)
  .then(object => object.json());

  response.results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    itemsList.appendChild(createProductItemElement({ sku, name, image }));
  });
}

async function addToCart(id) {
  const cart = document.querySelector('.cart__items');

  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(endpoint)
    .then(data => data.json());

  const { id: sku, title: name, price: salePrice } = response;
  const itemToCart = createCartItemElement({ sku, name, salePrice });
  cart.appendChild(itemToCart);
  localStorage.setItem([id], [name]);
}

function addButton() {
  const buttons = document.querySelectorAll('.item__add');
  const itemsId = document.querySelectorAll('.item__sku');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const id = itemsId[index].textContent;
      addToCart(id);
    });
  });
}

function removeItemFromCart() {
  const items = document.querySelectorAll('.cart__item');
  items.forEach(item => item.addEventListener('click', () => {
    cartItemClickListener(item);
  }));
}

async function loadCartFromStorage() {
  try {
    const storage = await Object.entries(localStorage);
    storage.forEach(item => addToCart(item[0]));
  } catch (error) {
    return error
  }

}

window.onload = async function onload() {
  await productList();
  addButton();
  removeItemFromCart();
  loadCartFromStorage();
};

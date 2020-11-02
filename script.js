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
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.currentTarget.remove()
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const returnObject = url => fetch(url).then(itemResult =>
  itemResult.json().then(jsonResult => jsonResult));

const getItemID = async (ID) => {
  const target = getSkuFromProductItem(ID.currentTarget);
  const object = await returnObject(`https://api.mercadolibre.com/items/${target}`);
  const cartItems = document.querySelector('.cart__title');
  const { id, title, price } = object;
  const obj = { sku: id, name: title, salePrice: price };
  cartItems.appendChild(createCartItemElement(obj));
};

const addToCart = () => {
  const itemAdd = document.querySelectorAll('.item');
  itemAdd.forEach((item) => {
    item.addEventListener('click', getItemID);
  });
};

const getItemsAPI = async () => {
  const object = await returnObject('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  object.results.forEach((product) => {
    const items = document.querySelector('.items');
    const { id, thumbnail, title } = product;
    const obj = { sku: id, image: thumbnail, name: title };
    items.appendChild(createProductItemElement(obj));
  });
  addToCart();
};

window.onload = function onload() {
  getItemsAPI();
};

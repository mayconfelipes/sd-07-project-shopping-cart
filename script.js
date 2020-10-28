
function loadItemStorage() {
  return (JSON.parse(localStorage.getItem('items')));
}

function addStorage(items) {
  return localStorage.setItem('items', JSON.stringify(items));
}

function removeStorage(index) {
  const items = loadItemStorage();
  items.splice(index, 1);
  addStorage(items);
}

function addItemLocalStorage({ id, title, price }) {
  const items = [];
  if ((typeof (Storage) !== 'undefined') && (localStorage.length !== 0)) {
    const storageValues = loadItemStorage();
    storageValues.forEach((element) => {
      items.push(element);
    });
  }
  items.push({ id, title, price });
  addStorage(items);
}
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
const emptyCart = () => {
  const btnEmptyCart = document.querySelector('.empty-cart');
  btnEmptyCart.addEventListener('click', () => {
    const ol = document.querySelector('.cart__items');
    ol.innerHTML = '';
    document.querySelector('.total-price').innerText = '0.00';
    localStorage.removeItem('items');
  });
};
const loadProducts = () => {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  fetch(endpoint).then(response => response.json()).then((data) => {
    const items = document.querySelector('.items');
    data.results.forEach((product) => {
      const { id: sku, title: name, thumbnail: image } = product;
      const item = createProductItemElement({ sku, name, image });
      items.appendChild(item);
    });
  });
};

window.onload = () => {
  emptyCart();
  loadProducts();
};

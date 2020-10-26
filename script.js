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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
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

const eventBtns = () => {
  document.querySelectorAll('button.item__add').forEach((btn) => {
    btn.addEventListener('click', getSkuFromProductItem(btn.parentNode))
  })
}

const capturingID = id => `https://api.mercadolibre.com/items/${id}`

const addToCart = () => {
  document.querySelectorAll('.item__add')
    .forEach((button) => 
      button.addEventListener('click', () => {
        const getID = getSkuFromProductItem(button.parentNode);
        const url = capturingID(getID);
        fecthCart(url)
      })) 
}

const fecthCart = addCart => {
  fetch(addCart)
    .then(response => response.json())
    .then(teste => document.querySelector('.cart__items').appendChild(createCartItemElement(teste)))
}

const fetchCurrency = () => {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  fetch(endpoint)
    .then(response => response.json())
    .then(object => addItems(object.results))
    .then(click => addToCart());
};

window.onload = function onload() {
  fetchCurrency();
};

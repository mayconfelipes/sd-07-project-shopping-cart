const API_URL_SEARCH = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
// const API_URL_ITEM = () => {} 

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

const fetchItemList = async () => {
  const siteReturn = await fetch(API_URL_SEARCH)
  .then(response => response.json())
  .then(data => data.results);

  siteReturn.forEach(element => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail
    };
    const addItem = document.querySelector('.items');
    const a = createProductItemElement(obj);
    addItem.appendChild(a);
  });
};

window.onload = function onload() { fetchItemList() };
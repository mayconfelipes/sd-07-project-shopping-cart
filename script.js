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
  const elements = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return elements.appendChild(section);
}

// requisito 2 passo 1 capiturar ol
const cathOl = (element) => {
  const chart = document.querySelector('.cart__items');
  chart.appendChild(element);
};

function cartItemClickListener(event) {
  event.target.parentNode.removeChild(event.target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.id = sku;
  return li;
}

function loading() {
  const span = document.createElement('span');
  span.className = 'loading';
  span.innerHTML = 'loading';
  const items = document.getElementsByClassName('items');
  items.appendChild(span);
}

function removeMsg() {
  setTimeout(() => {
    const items = document.getElementsByClassName('items');
    items.removeChild(items.firstChild);
  }, 2000);
}

// requisito 2 passo 2
const fetchToChart = (sku) => {
  const endpoint = `https://api.mercadolibre.com/items/${sku}`;
  fetch(endpoint)
  .then(response => response.json())
  .then((data) => {
    cathOl(createCartItemElement(data)); // requisito 2 passo 4
  });
};

// requisito 2 passo 3
const appendToChart = (item) => {
  const createDisplay = document.querySelector('.items');
  createDisplay.appendChild(item);
  item.addEventListener('click', (event) => {
    const getSku = event.currentTarget.firstChild.innerText;
    fetchToChart(getSku);
  });
};

// requisito 1 - com Async/Await
const fetchProducts = () => {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  setTimeout(loading, 10);
  fetch(endpoint)
  .then(data => data.json())
  .then(data => data.results.forEach((value) => {
    appendToChart(createProductItemElement(value));
  }))
  .then(removeMsg());
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cleanToChart() {
  const buttonCleanChart = document.querySelector('.empty-cart');
  buttonCleanChart.addEventListener('click', () => {
    const chart = document.querySelector('.cart__items');
    chart.innerHTML = '';
  });
}

window.onload = function onload() {
  fetchProducts();
  cleanToChart();
};

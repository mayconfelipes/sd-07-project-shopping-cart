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
  const ol = document.querySelector('.cart__items');
  const li = event.target;
  ol.removeChild(li);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getFetchEndPoint = endPoint => fetch(endPoint);

const createExpectedObject = (id, title, thumbnail, price) => ({
  sku: id,
  name: title,
  image: thumbnail,
  salePrice: price,
});

const printProduct = ({ id, title, thumbnail, price }) => {
  const newSection = createProductItemElement(createExpectedObject(id, title, thumbnail, price));
  const containerSection = document.querySelector('.items');

  containerSection.appendChild(newSection);
};

const callFetch = async (id) => {
  try {
    const promiseResult = await getFetchEndPoint(`https://api.mercadolibre.com/items/${id}`);
    const data = await promiseResult.json();
    return data;
  } catch (error) {
    alert(error);
    return error;
  }
};

const goToOL = async (event) => {
  let gettingSku = event.target;
  gettingSku = gettingSku.parentElement;
  gettingSku = gettingSku.firstChild;
  gettingSku = gettingSku.innerText;

  const ol = document.querySelector('.cart__items');

  const objectOfFetch = await callFetch(gettingSku);
  const { id } = objectOfFetch;
  const { title } = objectOfFetch;
  const { thumbnail } = objectOfFetch;
  const { price } = objectOfFetch;

  const expectedObject = createExpectedObject(id, title, thumbnail, price);
  const li = createCartItemElement(expectedObject);

  ol.appendChild(li);
};

const listeningAddToCartButton = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', goToOL);
  });
};

const loadPage = async () => {
  try {
    const promiseResult = await getFetchEndPoint('https://api.mercadolibre.com/sites/MLB/search?q=$computador');
    const data = await promiseResult.json();
    const arrOfObjects = data.results;
    arrOfObjects.forEach(printProduct);
    listeningAddToCartButton();
  } catch (error) {
    alert(error);
  }
};

window.onload = function onload() {
  loadPage();
};

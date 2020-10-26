window.onload = function onload() { 
  getObjectOfFetch();
};

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
  // coloque seu código aqu
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getFetchEndPoint = () => fetch('https://api.mercadolibre.com/sites/MLB/search?q=$computador');

const createExpectedObject = ({ id, title, thumbnail , price }) => {
  const expectedObject = {
    sku: id,
    name: title,
    image: thumbnail,
    salePrice: price,
  };

  const newSection = createProductItemElement(expectedObject);
  const containerSection = document.querySelector('.items');
  containerSection.appendChild(newSection);
};

const getObjectOfFetch = async () => {
  try {
    const promiseResult = await getFetchEndPoint();
    const data = await promiseResult.json();
    const arrOfObjects = data.results;
    arrOfObjects.forEach(createExpectedObject);
  } catch {

  }
};

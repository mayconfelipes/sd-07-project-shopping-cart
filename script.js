window.onload = function onload() { };

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

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

const fetchItemById = (event) => {
  const itemId = event.target.previousSibling.previousSibling.previousSibling.innerText;
  const itemPath = `https://api.mercadolibre.com/items/${itemId}`;
  fetch(itemPath)
  .then(response => response.json())
  .then(object => createCartItemElement(object))
  .then((item) => {
    document.getElementsByClassName('cart__items')[0].appendChild(item);
  });
};


const fecthProductList = (product) => {
  const productQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  fetch(productQuery)
  .then(response => response.json())
  .then(object => object.results)
  .then(result => result.forEach((item) => {
    const section = createProductItemElement(item);
    section.addEventListener('click', fetchItemById);
    document.getElementsByClassName('items')[0].appendChild(section);
  }));
};

fecthProductList('computer');

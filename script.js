window.onload = function onload() { };

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const sumPrices = () => {
  const allItemCart = document.querySelectorAll('.cart__item');
  let sum = 0;
  allItemCart.forEach((li) => {
    sum += parseFloat(li.innerText.split('$')[1]);
  });
  document.querySelector('.total-price').innerText = sum;
  console.log(sum);
};

const updateCart = () => {
  localStorage.setItem('ol', document.querySelector('.cart__items').innerHTML);
  localStorage.setItem('price', document.querySelector('.total-price').innerText);
};

function cartItemClickListener(event) {
  event.target.remove();
  sumPrices();
  updateCart();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadLocalStorage = () => {
  const ol = document.querySelector('.cart__items');
  const price = document.querySelector('.total-price');
  if (localStorage.price) {
    price.innerText = localStorage.getItem('price');
  }
  if (localStorage.ol) {
    ol.innerHTML = localStorage.getItem('ol');
    ol.querySelectorAll('li').forEach(li => li.addEventListener('click', cartItemClickListener));
  }
};

const addToCart = async (id) => {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  fetch(endpoint).then(response => response.json().then((object) => {
    const { id: sku, title: name, price: salePrice } = object;
    console.log(object);
    const ol = document.querySelector('.cart__items');
    ol.appendChild(createCartItemElement({ sku, name, salePrice }));
    sumPrices();
    updateCart();
  }));
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addItemButton = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  addItemButton.addEventListener('click', function (event) {
    const productItem = event.target.parentNode;
    addToCart(getSkuFromProductItem(productItem));
  });
  section.appendChild(addItemButton);
  return section;
}

//  Requisito 1. Listar itens
window.onload = () => {
  const searchItem = async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetch(endpoint).then(response => response.json().then((dataItem) => {
      const items = document.querySelector('.items');
      dataItem.results.forEach((product) => {
        const { id: sku, title: name, thumbnail: image } = product;
        const item = createProductItemElement({ sku, name, image });
        items.appendChild(item);
      });
    }));
  };
  searchItem();
  loadLocalStorage();
};

const wipeButton = document.querySelector('.empty-cart');
wipeButton.addEventListener('click', () => {
  const ol = document.querySelector('.cart__items');
  ol.innerText = '';
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = '';
  sum = 0;
  localStorage.clear();
});

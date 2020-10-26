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
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => (item === event.target) ? document
    .querySelector('.cart__items')
      .removeChild(item) : undefined);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addItemToCart(event) {
  const itemID = getSkuFromProductItem(event.target.parentNode);
  fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then(result => result.json()
      .then(({ id, title, price }) => {
        const object = {
          sku: id,
          name: title,
          salePrice: price,
        };
        console.log(object);
        document.querySelector('.cart__items').appendChild(createCartItemElement(object));
      }),
    );
}

const fetchItems = () => {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then(response => response.json().then((data) => {
      data.results
        .forEach(({ id, title, thumbnail }) => {
          const object = {
            sku: id,
            name: title,
            image: thumbnail,
          };
          document.querySelector('.items').appendChild(createProductItemElement(object));
          document.querySelectorAll('.item__add').forEach(element => element
            .addEventListener('click', addItemToCart));
        });
    }),
  );
};

window.onload = function onload() {
  fetchItems();
};

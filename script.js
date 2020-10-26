function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
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

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  const cart = document.querySelector('.cart__items');
  cart.appendChild(li);
  return li;
}
// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const addToCart = async (itemID) => {
  const API_URL = `https://api.mercadolibre.com/items/${itemID}`;
  try {
    const response = await fetch(API_URL);
    const object = await response.json();

    if (object.error) {
      throw new Error(object.error);
    } else {
      createCartItemElement(object);
    }
  } catch (error) {
    console.error(error);
  }
};

const addEventAddCart = () => {
  const buttonAddCart = document.querySelectorAll('.item__add');
  buttonAddCart.forEach((item) => {
    item.addEventListener('click', () => {
      const identify = item.parentNode.querySelector('.item__sku').innerText;
      addToCart(identify);
    });
  });
};

const handleResults = (results) => {
  const hall = document.querySelector('.items');
  results.forEach((item) => {
    const { id, title, thumbnail } = item;
    const itemData = { id, title, thumbnail };
    hall.appendChild(createProductItemElement(itemData));
  });
  addEventAddCart();
};

const fetchItems = async () => {
  const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  try {
    const response = await fetch(API_URL);
    const object = await response.json();

    if (object.error) {
      throw new Error(object.error);
    } else {
      handleResults(object.results);
    }
  } catch (error) {
    console.error(error);
  }
};

// function cartItemClickListener(event) {

// }

window.onload = function onload() {
  fetchItems();
};

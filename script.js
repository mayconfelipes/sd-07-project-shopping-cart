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

const handleResults = results => results.forEach((item) => {
  const { id, title, thumbnail } = item;
  const itemData = { id, title, thumbnail };
  const classItem = document.querySelector('.items');
  classItem.appendChild(createProductItemElement(itemData));
});

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// function cartItemClickListener(event) {
//   // coloque seu código aqui
// }

// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

window.onload = function onload() {
  fetchItems();
};


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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const fetchCurrencyid = (idItem) => {
  const endpoint = `https://api.mercadolibre.com/items/${idItem}`;
  fetch(endpoint)
  .then(response => response.json())
  .then((object) => {
    const itemId = { sku: object.id, name: object.title, salePrice: object.price };
    const liItem = createCartItemElement(itemId);
    const listCarItem = document.getElementsByClassName('cart__items')[0];
    listCarItem.appendChild(liItem);
  });
};

// function cartItemClickListener(event) {
// }

const fetchCurrency = () => {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  fetch(endpoint)
    .then(response => response.json())
    .then((object) => {
      const results = object.results;
      const resultList = results.map(result => [result.id, result.title, result.thumbnail]);
      resultList.forEach((element) => {
        const resultObject = { sku: element[0], name: element[1], image: element[2] };
        const mainSection = document.getElementsByClassName('items')[0];
        const section = createProductItemElement(resultObject);
        mainSection.appendChild(section);
      });
      const buttonAdd = document.getElementsByClassName('item__add');
      for (let i = 0; i < buttonAdd.length; i += 1) {
        buttonAdd[i].addEventListener('click', function () {
          const parentButton = buttonAdd[i].parentElement;
          const parentText = getSkuFromProductItem(parentButton);
          fetchCurrencyid(parentText);
        });
      }
    });
};


window.onload = function onload() {
  fetchCurrency();
};

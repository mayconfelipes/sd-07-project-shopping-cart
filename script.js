
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

function loadItems() {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then(response => response.json()).then((data) => {
    const itemsPannel = document.querySelector('.items');
    data.results.forEach((result) => {
      const item = createProductItemElement(
        { sku: result.id, name: result.title, image: result.thumbnail });
      itemsPannel.appendChild(item);
    });
  });
}

window.onload = function onload() {
  loadItems();
};

const buttons = document.getElementsByClassName('item__add');
console.log(buttons);
addEventListener('click', (event) => {
  const selectedItemParent = event.target.parentElement;
  const ItemID = selectedItemParent.firstElementChild.innerText;
  const lista = document.querySelector('.cart__items');
  fetch(`https://api.mercadolibre.com/items/${ItemID}`)
  .then(response => response.json()).then((results) => {
    const generetadeIl = createCartItemElement(
      { sku: results.id, name: results.title, salePrice: results.price });
    lista.appendChild(generetadeIl);
  });
});

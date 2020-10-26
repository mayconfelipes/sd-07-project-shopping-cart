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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const productListing = async () => {
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  const items = document.querySelector('.items');
  const list = await fetch(endPoint)
    .then(response => response.json())
    .then(jsonObject => jsonObject.results)
    .catch(() => console.log('Algo deu errado!'));

  list.forEach((element) => {
    items.appendChild(
      createProductItemElement({ sku: element.id, name: element.title, image: element.thumbnail }));
  });
};

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */
/* function cartItemClickListener(event) {
  // coloque seu código aqui
} */
/* function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
} */

window.onload = function onload() {
  productListing();
};

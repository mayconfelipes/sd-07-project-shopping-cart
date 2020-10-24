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
  const section = document.querySelector('.item');


  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

  /* function cartItemClickListener(event) {
   event.addEventListener(('click', () => {
     alert('here')
   }))
 } */

// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

const handleComputerItem = (object) => {
  object.forEach((computer) => {
    const newObject = {
      sku: computer.id,
      name: computer.title,
      image: computer.thumbnail,
    };
    return createProductItemElement(newObject);
  });
};

const fetchDataComputer = (endpoint) => {
  fetch(endpoint)
    .then(data => data.json())
    .then(data => handleComputerItem(data.results));
};

window.onload = function onload() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  fetchDataComputer(endpoint);
};

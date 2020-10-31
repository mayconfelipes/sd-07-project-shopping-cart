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

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}



function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const buttonAddApi = (productID) => {
  fetch(`https://api.mercadolibre.com/items/${productID}`)
    .then((response) => {
      response.json()
        .then((data) => {
          const addProductCart = document.getElementsByClassName('cart__items')[0];
          addProductCart.appendChild(createCartItemElement(data));
        });
    });
};

const itemsApi = (search) => {
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
    .then((response) => {
      response.json()
        .then((data) => {
          const sectionItems = document.getElementsByClassName('items')[0];
          const product = data.results;
          product.forEach(item =>
            sectionItems.appendChild(createProductItemElement(item)),
          );
          const buttonAddCart = document.querySelectorAll('.item__add');
          buttonAddCart.forEach(button => {
            button.addEventListener('click', (event) => {
              const ID = event.target.parentNode.firstChild.innerHTML;
              buttonAddApi(ID);
            });
          });
        });
    });
};



window.onload = function onload() { itemsApi('computador'); };

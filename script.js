

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
  console.log(img);
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

const nameProduct = "computador"

const fecthComputer = () =>{
const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${nameProduct}`;
  //fetch(endpoint)
  //.then((response) => response.json())
  //.then((response)=> console.log(response.results))

  return new Promise((resolve, reject)=>{
  fetch(endpoint)
  .then((response)=>{
  response.json().then((data)=>{
  const element = data.results;
  console.log(element);
  return resolve(element);
     })
    })
   }) 
}

const fecthMap = async () =>{
  
  const fecthComputer = await fecthComputer();
  console.log(fecthComputer);
}

window.onload = function onload() {
  fecthMap();
  //fecthComputer ();
};
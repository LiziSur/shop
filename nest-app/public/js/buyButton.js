const body = document.querySelector('body');
const popup = document.querySelector('.popup');
const buyButton = document.querySelector('#item-body__buy-button');
const popupCloseIcon = document.querySelector('.close-popup');
const imgPath = document.querySelector('.slide-1 > img').src;
const currentLink = window.location.href;
const tmp = document.querySelector('#item-body__buy-button > button');
const sizeButton = document.querySelector("#item-body__size-button select");
const productName = document.querySelector('#item-body__description > span');
let size = '';

sizeButton.addEventListener('change', function() {
  size = sizeButton.value;
});

buyButton.addEventListener('click', function (e) {
  let price = tmp.getAttribute('hover-text').slice(0, -1);
  let id = currentLink.split('/').pop();
  let product = JSON.stringify({
    productName: productName.textContent,
    price: price,
    size: size,
    imgPath: imgPath,
    id: id
  });
  let products = JSON.parse(localStorage.getItem('products') || '[]');
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  popupOpen(popup);
  e.preventDefault();
});

function popupOpen(currentPopup) {
  currentPopup.classList.add('open');
  currentPopup.addEventListener('click', function (e) {
    if (!e.target.closest('.popup__content')) {
      popupClose(e.target.closest('.popup'));
    }
  });
}

function popupClose(popupActive) {
  popupActive.classList.remove('open');
}

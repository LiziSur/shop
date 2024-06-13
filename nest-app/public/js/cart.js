const cartBody = document.querySelector('#cart-body');
const checkOut = document.querySelector('#checkout');
const cartStorage = JSON.parse(localStorage.getItem('products') || '[]');
const totalPrice = document.querySelector('#total-price');
const deleteCart = document.querySelector('.delete-cart');
const apikey = 'ofDubyl4RciovvdUjAsEZz9AuPU1unn7';
const base_url =
  'https://api.apilayer.com/exchangerates_data/convert?to=RUB&from=USD&amount=';
let total = 0;

window.addEventListener('load', pageLoaded);

function pageLoaded() {
  drawCart();
  convertPrice();
}

function drawCart() {
  cartStorage.forEach((el) => {
    let tmp = JSON.parse(el);
    total += parseInt(tmp.price);
    const newCard = document.createElement('item');
    newCard.innerHTML = `<div class="item">
                           <div class="item__desc">
                               <div class="item__name"><p>${tmp.productName}</p></div>
                               <div class="item__size"><p>Size: ${tmp.size}</p></div>
                               <div class="item__price"><p>$${tmp.price}</p></div>
                           </div>
                            <div class="item__photo"><img src=${tmp.imgPath}></div>
                        </div>`;
    cartBody.insertBefore(newCard, cartBody.firstChild);
  });
  totalPrice.textContent += total;

  deleteCart.addEventListener('click', function (e) {
    localStorage.removeItem('products');
    location.reload();
    e.preventDefault();
    return false;
  });
}

function convertPrice() {
  let price = totalPrice.textContent.slice(9, totalPrice.textContent.length);
  if (price === '0') {
    return;
  }
  let myHeaders = new Headers();
  myHeaders.append('apikey', apikey);

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  fetch(base_url + price, requestOptions)
    .then((response) => response.json())
    .then((result) => displayConvertedPrice(result))
    .catch((error) => console.log('error', error));
}

function displayConvertedPrice(result) {
  let convertedPrice = Math.floor(result.result * 100) / 100;
  totalPrice.textContent +=
    ' = ' + convertedPrice.toLocaleString('ru-RU') + '₽';
}

checkOut.addEventListener('click', function (e) {
  if (cartStorage.length !== 0 && localStorage.getItem('userId')) {
    window.location.replace('https://shop-1ro8.onrender.com/order/orderForm');
  } else {
    e.preventDefault();
  }
});

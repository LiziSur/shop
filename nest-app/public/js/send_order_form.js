const button = document.querySelector('button');
const form = document.querySelector('#order');
const cartStorage = JSON.parse(localStorage.getItem('products') || '[]');
const products = cartStorage.map((product) => JSON.parse(product));
const productIds = products.map((product) => parseInt(product.id, 10));

const totalCost = products.reduce((total, product) => {
  const price = parseFloat(product.price.trim());
  return total + price;
}, 0);

const isEmpty = (value) => {
  return !value.trim();
};

const isValidPhoneNumber = (value) => {
  const phoneRegex = /^\d{11}$/;
  return phoneRegex.test(value);
};

const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const validateForm = () => {
  const country = form.elements['country'].value;
  const name = form.elements['name'].value;
  const lastName = form.elements['secondName'].value;
  const email = form.elements['email'].value;
  const address = form.elements['address'].value;
  const postalCode = form.elements['postalCode'].value;
  const city = form.elements['city'].value;
  const phone = form.elements['phone'].value;

  if (
    isEmpty(country) ||
    isEmpty(name) ||
    isEmpty(lastName) ||
    isEmpty(email) ||
    isEmpty(address) ||
    isEmpty(postalCode) ||
    isNaN(postalCode) ||
    postalCode.length !== 5 ||
    isEmpty(city)
  ) {
    alert('Please enter filed');
    return false;
  }

  if (!isValidPhoneNumber(phone)) {
    alert('Please enter a valid phone number');
    return false;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a correct email');
  }
  return true;
};

button.addEventListener('click', function (e) {
  e.preventDefault();

  if (validateForm()) {
    const formData = new FormData(form);
    const data = {
      country: formData.get('country'),
      name: formData.get('name'),
      secondName: formData.get('secondName'),
      email: formData.get('email'),
      address: formData.get('address'),
      postalCode: parseInt(formData.get('postalCode')),
      city: formData.get('city'),
      phoneNumber: formData.get('phone'),
    };

    const userId = parseInt(localStorage.getItem('userId'), 10);
    const requestData = {
      ...data,
      userId: userId,
      products: productIds,
      totalCost: totalCost,
    };

    fetch('https://shop-1ro8.onrender.com/order/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((data) => {
        console.log('Service response:', data);
        window.location.replace('https://shop-1ro8.onrender.com');
        localStorage.removeItem('products');
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
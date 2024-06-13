document.addEventListener("DOMContentLoaded", function() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    const ordersLink = document.getElementById('orders-link');
    ordersLink.href = `https://clothing-shop-5n2c.onrender.com/order/all/${encodeURIComponent(userId)}`;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const logOutLink = document.getElementById("log-out-link");
  logOutLink.addEventListener("click", function(event) {
    localStorage.clear();
  });
});
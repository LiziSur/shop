document.addEventListener("DOMContentLoaded", function() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    const ordersLink = document.getElementById('orders-link');
    ordersLink.href = `https://shop-1ro8.onrender.com/order/all/${encodeURIComponent(userId)}`;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const logOutLink = document.getElementById("log-out-link");
  logOutLink.addEventListener("click", function(event) {
    localStorage.clear();
  });
});
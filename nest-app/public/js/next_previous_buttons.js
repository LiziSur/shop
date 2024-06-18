const nextButton = document.querySelector('#next');
const previousButton = document.querySelector('#previous');
let currentPage = parseInt(window.location.href.split('/').pop());


previousButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    redirect(currentPage);
  }
});

nextButton.addEventListener('click', () => {
  currentPage++;
  redirect(currentPage);
});

function redirect(page) {
  window.location.href = `https://shop-1ro8.onrender.com/products/page/${page}`;
}
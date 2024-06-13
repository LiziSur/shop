const toggle_menu = document.querySelector(".toggle-menu");
const nav_menu = document.querySelector(".menu");

toggle_menu.addEventListener("click", () => {
    toggle_menu.classList.toggle("active");
    nav_menu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    toggle_menu.classList.remove("active");
    nav_menu.classList.remove("active");
}))

document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem('userId');
    const profileLink = document.getElementById("profile-link");
    const loginLi = document.getElementById("login-li");
    const profileLi = document.getElementById("profile-li");
    if (userId) {
        loginLi.style.display = "none";
        profileLi.style.display = "block";
        profileLink.href = `https://clothing-shop-5n2c.onrender.com/user/profile/${encodeURIComponent(userId)}`;
    } else {
        loginLi.style.display = "block";
        profileLi.style.display = "none";
    }
});
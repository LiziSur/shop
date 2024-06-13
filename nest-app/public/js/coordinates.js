document.querySelector(".main").onmousemove = function (event) {
    event = event || window.event;
    document.querySelector(".x").innerHTML = event.offsetX;
    document.querySelector(".y").innerHTML = event.offsetY;
};
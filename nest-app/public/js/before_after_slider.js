if (window.innerWidth > 776) {
    document.addEventListener('DOMContentLoaded', function () {
        let parent = document.querySelector('.splitview'),
            topPanel = parent.querySelector('.top'),
            handle = parent.querySelector('.handle'),
            skewHack = 0,
            delta = 0;

        if (parent.className.indexOf('skewed') !== -1) {
            skewHack = 1000;
        }

        parent.addEventListener('mousemove', function (event) {
            delta = (event.clientX - window.innerWidth / 2) * 0.01;
            handle.style.left = event.clientX + delta + 'px';
            topPanel.style.width = event.clientX + skewHack + delta + 'px';
        });
    });
}

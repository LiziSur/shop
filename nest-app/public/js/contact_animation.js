gsap.registerPlugin(TextPlugin);
gsap.from('.header', {duration: 1, y: '-100%', ease: 'bounce'})
gsap.from('#contacts__title', {duration: 2, opacity: 0, delay: 0.5})
gsap.from('#contact-form', {duration: 2, opacity: 0, delay: 1})
gsap.from("#contacts__desc p, #contacts__desc a", {duration: 3, text: ""})
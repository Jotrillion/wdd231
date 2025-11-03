const navbutton = document.querySelector('#ham');
const navlinks = document.querySelector('#nav-bar');
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle("show");
    navlinks.classList.toggle("show");
});
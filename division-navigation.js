/* Native details supports touch, keyboard and operation without JavaScript. */
const menu = document.querySelector('.division-menu');
const narrow = matchMedia('(max-width: 760px)');
function sizeMenu() { if (menu) menu.open = !narrow.matches; }
sizeMenu();
document.documentElement.classList.add('division-nav-ready');
narrow.addEventListener('change', sizeMenu);

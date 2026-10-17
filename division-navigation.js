/* Native details supports touch, keyboard and operation without JavaScript. */
const menu = document.querySelector('.division-menu');
const narrow = matchMedia('(max-width: 760px)');
function sizeMenu() { if (menu) menu.open = !narrow.matches; }
sizeMenu();
narrow.addEventListener('change', sizeMenu);
// Resolve original public homepage bookmarks to their relocated experiences.
if (location.pathname === '/' || location.pathname === '/index.html') {
  const destinations = {investing:'/financial/investing.html', products:'/financial/products.html', experience:'/financial/academy.html#experience', 'market-pulse':'/financial/#market-pulse'};
  if (destinations[location.hash.slice(1)]) location.replace(destinations[location.hash.slice(1)]);
}

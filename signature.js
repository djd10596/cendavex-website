/* Public, local explanatory interactions; no services or account access. */
(() => {
  const panel = document.querySelector('.signature-panel');
  if (!panel) return;
  panel.querySelectorAll('[data-signal-step]').forEach(button => {
    button.addEventListener('click', () => {
      panel.dataset.signal = button.dataset.signalStep;
      panel.querySelectorAll('[data-signal-step]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      panel.querySelectorAll('[data-signal-reading]').forEach(item => { item.hidden = item.dataset.signalReading !== button.dataset.signalStep; });
    });
  });
  const control = panel.querySelector('.signature-motion');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  function update() {
    const globalPause = document.documentElement.classList.contains('cx-motion-paused');
    const stopped = paused || reduced.matches || globalPause;
    panel.classList.toggle('is-paused', stopped);
    control.textContent = reduced.matches ? 'Reduced motion enabled' : globalPause ? 'Motion paused in site settings' : paused ? 'Resume diagram motion' : 'Pause diagram motion';
    control.setAttribute('aria-pressed', String(stopped));
    control.disabled = reduced.matches || globalPause;
  }
  panel.querySelector('.signature-controls').hidden = false;
  control.hidden = false;
  panel.classList.add('is-enhanced');
  control.addEventListener('click', () => { paused = !paused; update(); });
  if (reduced.addEventListener) reduced.addEventListener('change', update); else reduced.addListener(update);
  new MutationObserver(update).observe(document.documentElement, {attributes:true, attributeFilter:['class']});
  const syncVisibility = () => panel.classList.toggle('is-offscreen', document.hidden || !onscreen);
  let onscreen = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { onscreen = entries[0].isIntersecting; syncVisibility(); }).observe(panel);
  document.addEventListener('visibilitychange', syncVisibility);
  update();
})();

/* Deterministic editorial examples only. No requests, storage, accounts or execution. */
(() => {
  document.querySelectorAll('.exhibit').forEach(exhibit => {
    const controls = exhibit.querySelector('.exhibit-console');
    const status = exhibit.querySelector('.exhibit-status');
    controls.hidden = false;
    controls.addEventListener('change', event => {
      if (!event.target.matches('input[name="exhibit-condition"]')) return;
      const boundary = event.target.value === '1';
      exhibit.dataset.condition = boundary ? 'boundary' : 'normal';
      exhibit.querySelectorAll('[data-exhibit-normal]').forEach(node => { node.hidden = boundary; });
      exhibit.querySelectorAll('[data-exhibit-boundary]').forEach(node => { node.hidden = !boundary; });
      status.textContent = `${event.target.parentElement.textContent.trim()}. ${exhibit.querySelector('li:last-child p:not([hidden])').textContent}`;
    });
  });
})();

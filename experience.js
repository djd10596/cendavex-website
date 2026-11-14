/* Experience interactions, reused from the current Cendavex site (experience.js of the commit named in tests/fixtures/legacy-commit.txt). CHANGED (content only): the lab scenarios now describe how Cendavex works (build, verify, decide); the Financial, AI, Systems and Industries scenarios and the portfolio, policy and supervisor demonstrations were removed. The lab and the motion control code are unchanged. No network, account access or model claims. */
(() => {
  const lab = document.querySelector('#cx3-lab');
  const results = [
    '01 / BUILD — C200AI builds. The builder is an AI.',
    '02 / VERIFY — C130AI independently verifies. It runs on a different AI model from C200AI and cannot read its own API key.',
    '03 / DECIDE — The founder decides what matters. Then the loop starts again: Trust, but verify.'
  ];
  if (lab) {
    const output = lab.querySelector('.cx3-result');
    lab.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => {
      lab.querySelectorAll('[data-scenario]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      output.textContent = results[Number(button.dataset.scenario)];
    }));
  }
  // A dedicated native motion control does not alter existing controls.
  const main = document.querySelector('main');
  if (main && document.querySelector('.cx3-vector')) {
    const pause = document.createElement('button');
    pause.className = 'cx3-motion'; pause.type = 'button';
    pause.textContent = 'Pause experience motion'; pause.setAttribute('aria-pressed', 'false');
    pause.addEventListener('click', () => {
      const paused = document.documentElement.classList.toggle('cx3-paused');
      pause.textContent = paused ? 'Resume experience motion' : 'Pause experience motion';
      pause.setAttribute('aria-pressed', String(paused));
    });
    main.prepend(pause);
    document.addEventListener('visibilitychange', () => {
      document.documentElement.classList.toggle('cx3-background', document.hidden);
    });
  }
})();

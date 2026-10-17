/* Isolated Experience 3.0 interactions. No network, account access or model claims. */
(() => {
  const area = document.body.dataset.experience;
  const lab = document.querySelector('#cx3-lab');
  const results = {
    corporate: [
      '01 / OBSERVE — Collect relevant signals. Record source, context and uncertainty before forming a hypothesis.',
      '02 / EVALUATE — Compare the hypothesis with evidence. Test failure modes and record what remains unknown.',
      '03 / SUPERVISE — Keep actions within explicit permissions. Escalate uncertain decisions to people and retain an audit trail.'
    ],
    ai: [
      'ROUTE / ASSIST — A public-document summary can be drafted for human review. Verify source fidelity before use.',
      'ROUTE / REQUIRE AUTHORIZATION — This demonstration cannot access accounts or perform actions. A prospective system would need explicit permission, scope checks and audit evidence.',
      'ROUTE / ESCALATE — Evidence is uncertain. Show source limitations and ask a qualified person to review before any consequential decision.'
    ],
    systems: [
      'STATE / OBSERVING — Heartbeat received. Continue monitoring within the defined operating boundary.',
      'STATE / DEGRADED — Heartbeat missing. Suspend new actions, preserve diagnostic evidence and request operator review. This is a local state simulation, not real monitoring.',
      'STATE / ESCALATED — Recovery budget exhausted. Stop automatic retries and require human authorization before resuming. No infrastructure is connected.'
    ],
    industries: [
      'MANUFACTURING / Quality inspection — Hypothesis: assist people in finding visual defects. Required evidence: representative samples, false-negative testing and operator review.',
      'LOGISTICS / Exception triage — Hypothesis: help teams prioritize delayed shipments. Required evidence: source freshness, operational baselines and escalation accuracy.',
      'ENERGY / Maintenance planning — Hypothesis: organize equipment signals for review. Required evidence: sensor quality, failure-case evaluation and domain-expert validation.'
    ]
  };
  if (lab) {
    const output = lab.querySelector('.cx3-result');
    lab.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => {
      lab.querySelectorAll('[data-scenario]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      output.textContent = results[area][Number(button.dataset.scenario)];
    }));
    const loss = lab.querySelector('#cx3-loss'), exposure = lab.querySelector('#cx3-exposure');
    if (loss && exposure) {
      const update = () => {
        lab.querySelector('#cx3-loss-value').textContent = `${loss.value}%`;
        output.textContent = `Illustrative portfolio change: ${Number(loss.value) ? '−' : ''}${(Number(loss.value) * Number(exposure.value)).toFixed(1)}%. Assumes equities fall ${loss.value}% and cash is unchanged. Ignores fees, taxes, interest, correlations and other risks. This is not a forecast or investment advice.`;
      };
      loss.addEventListener('input', update); exposure.addEventListener('change', update);
    }
  }
  const policy = document.querySelector('.cx3-policy');
  if (policy) policy.addEventListener('submit', event => {
    event.preventDefault();
    const task = policy.querySelector('input').value.trim();
    const result = policy.querySelector('[data-policy-result]');
    if (!task) { result.textContent = 'Enter a task before evaluating the local rules.'; return; }
    const permission = task.match(/\b(account|payment|trade|delete)\b/i);
    const uncertainty = task.match(/\b(uncertain|unknown|conflicting)\b/i);
    result.textContent = permission
      ? `REQUIRE AUTHORIZATION / Matched “${permission[0]}”. No action is performed. Explicit scope and human approval would be required.`
      : uncertainty
        ? `ESCALATE / Matched “${uncertainty[0]}”. Resolve the uncertainty with a person before proceeding.`
        : 'DRAFT FOR REVIEW / No listed restricted keyword matched. This is a limited text rule, not an assessment that a task is safe or permitted.';
  });
  const supervisor = document.querySelector('.cx3-supervisor');
  if (supervisor) {
    let state = 'Observing', attempts = 0;
    const fault = supervisor.querySelector('[data-fault]');
    const recover = supervisor.querySelector('[data-recover]');
    const trace = supervisor.querySelector('.cx3-trace');
    const record = message => {
      supervisor.querySelector('[data-supervisor-state]').textContent = `${state} · ${attempts} recovery attempts`;
      const item = document.createElement('li'); item.textContent = message; trace.append(item);
      while (trace.children.length > 6) trace.firstElementChild.remove();
      fault.disabled = state !== 'Observing'; recover.disabled = state !== 'Degraded';
    };
    fault.addEventListener('click', () => { state = 'Degraded'; record('Heartbeat missing. New actions suspended; diagnostics retained.'); });
    recover.addEventListener('click', () => {
      attempts++;
      if (attempts >= 2) { state = 'Escalated'; record('Recovery budget exhausted. Automatic retries stopped; operator authorization required.'); }
      else record('Recovery attempt 1 failed in this scenario. One retry remains.');
    });
    supervisor.querySelector('[data-reset]').addEventListener('click', () => {
      state = 'Observing'; attempts = 0; trace.replaceChildren(); record('Operator reset simulated. Recovery budget restored. No external action performed.');
    });
  }
  // A dedicated native motion control does not alter existing Financial controls.
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

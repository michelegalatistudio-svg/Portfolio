/* Subtle UI sound design. OFF by default; enabled only by a user gesture. */
(() => {
  const button = document.querySelector('.sound-toggle');
  const label = button.querySelector('.sound-label');
  const Audio = window.AudioContext || window.webkitAudioContext;
  let context, enabled = false, lastHover = 0, hovered = null;
  if (!Audio) { button.hidden = true; return; }
  function tone(kind) {
    if (!enabled || !context || context.state !== 'running' || document.hidden) return;
    const now = context.currentTime;
    const click = kind === 'click';
    const seconds = click ? .34 : .19;
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * seconds), context.sampleRate);
    const data = buffer.getChannelData(0);
    let warm = 0;
    for (let i = 0; i < data.length; i++) {
      warm = .94 * warm + .06 * (Math.random() * 2 - 1);
      data[i] = warm;
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass'; filter.Q.value = .45;
    filter.frequency.setValueAtTime(click ? 1100 : 780, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + seconds);
    const gain = context.createGain();
    const envelope = new Float32Array(128);
    for (let i = 0; i < envelope.length; i++) {
      envelope[i] = Math.pow(Math.sin(Math.PI * i / (envelope.length - 1)), 2) * (click ? .24 : .11);
    }
    gain.gain.setValueCurveAtTime(envelope, now, seconds);
    source.connect(filter); filter.connect(gain); gain.connect(context.destination);
    source.start(now); source.stop(now + seconds);
    source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  }
  button.addEventListener('click', async () => {
    if (enabled) {
      enabled = false; button.setAttribute('aria-pressed', 'false'); label.textContent = 'SOUND OFF';
      button.title = 'Attiva i suoni di clic e hover';
      if (context?.state === 'running') await context.suspend();
      return;
    }
    try {
      context ||= new Audio(); await context.resume(); enabled = context.state === 'running';
      button.setAttribute('aria-pressed', String(enabled)); label.textContent = enabled ? 'SOUND ON' : 'SOUND OFF';
      button.title = enabled ? 'Disattiva i suoni' : 'Attiva i suoni di clic e hover';
      tone('click');
    } catch { enabled = false; label.textContent = 'SOUND OFF'; button.setAttribute('aria-pressed', 'false'); }
  });
  const targets = 'a, button, select, [role="button"], .chip';
  document.addEventListener('pointerover', e => {
    const target = e.target.closest(targets);
    if (e.pointerType !== 'mouse' || !target || target === hovered || target === button || target.contains(e.relatedTarget)) return;
    hovered = target;
    if (performance.now() - lastHover > 170) { tone('hover'); lastHover = performance.now(); }
  });
  document.addEventListener('pointerout', e => { if (hovered && !hovered.contains(e.relatedTarget)) hovered = null; });
  document.addEventListener('click', e => { if (!button.contains(e.target) && e.target.closest(targets)) tone('click'); });
  const field = document.querySelector('.motion-field');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let pending = false, x = 0, y = 0;
  window.addEventListener('pointermove', e => {
    if (motion.matches || e.pointerType !== 'mouse' || scrollY > innerHeight) return;
    x = (e.clientX / innerWidth - .5) * 32; y = (e.clientY / innerHeight - .5) * 24;
    if (!pending) { pending = true; requestAnimationFrame(() => { field.style.setProperty('--motion-x', x + 'px'); field.style.setProperty('--motion-y', y + 'px'); pending = false; }); }
  }, {passive:true});
})();

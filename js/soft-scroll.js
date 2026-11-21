/* One continuous, frame-rate-independent scroll loop. No restart per wheel tick. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer: fine)');
  let frame = 0, target = scrollY, current = scrollY, lastTime = 0;
  let tau = 95;
  const maximum = () => Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const clamp = n => Math.min(maximum(), Math.max(0, n));
  function cancel() {
    cancelAnimationFrame(frame); frame = 0;
    current = target = scrollY; lastTime = 0;
  }
  function tick(now) {
    const dt = Math.min(40, Math.max(1, now - lastTime)); lastTime = now;
    target = clamp(target);
    current += (target - current) * (1 - Math.exp(-dt / tau));
    if (Math.abs(target-current) < .6) {
      scrollTo({top:target,behavior:'instant'}); frame = 0; current = target; return;
    }
    scrollTo({top:current,behavior:'instant'});
    frame = requestAnimationFrame(tick);
  }
  function start(next, timeConstant) {
    if (reduce.matches) { cancel(); scrollTo({top:clamp(next),behavior:'instant'}); return; }
    if (!frame) { current = scrollY; lastTime = performance.now(); }
    target = clamp(next); tau = timeConstant;
    if (!frame) frame = requestAnimationFrame(tick);
  }
  function nested(el, delta) {
    for (let node=el; node && node!==document.body; node=node.parentElement) {
      if (node.matches?.('.dialog-panel,textarea,select,input,[contenteditable=true]')) return true;
      const css=getComputedStyle(node);
      if (/(auto|scroll)/.test(css.overflowY) && node.scrollHeight>node.clientHeight+1) {
        if (delta<0 ? node.scrollTop>0 : node.scrollTop+node.clientHeight<node.scrollHeight-1) return true;
      }
    }
    return false;
  }
  window.addEventListener('wheel', e => {
    if (reduce.matches || !fine.matches || !e.cancelable || e.ctrlKey || e.metaKey || e.shiftKey || Math.abs(e.deltaX)>Math.abs(e.deltaY) || document.body.classList.contains('dialog-open')) return;
    const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
    if (!delta || nested(e.target,delta)) return;
    e.preventDefault();
    // Reversing direction drops old momentum immediately.
    let base=frame?target:scrollY;
    if (frame && Math.sign(delta)!==Math.sign(target-current)) base=current;
    start(base+delta,Math.abs(delta)<35?55:95);
  },{passive:false});
  document.addEventListener('click', e => {
    const a=e.target.closest('a[href^="#"]'),back=e.target.closest('#backtop');
    if ((!a&&!back)||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey) return;
    const id=back?'top':a.getAttribute('href').slice(1);
    const section=document.getElementById(id);if(!section)return;
    e.preventDefault();
    const offset=document.querySelector('.nav')?.getBoundingClientRect().height||0;
    start(section.getBoundingClientRect().top+scrollY-offset-16,140);
    if(a)history.replaceState(null,'','#'+id);
  });
  window.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))cancel()});
  window.addEventListener('touchstart',cancel,{passive:true});
  window.addEventListener('pointerdown',cancel,{passive:true});
  window.addEventListener('resize',cancel,{passive:true});
  window.addEventListener('scroll',()=>{if(!frame)current=target=scrollY},{passive:true});
  reduce.addEventListener('change',cancel);
})();

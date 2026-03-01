/* ============================================================
   ctOS — main.js  (vanilla JS, no dependencies)
   ============================================================ */

/* ── TYPEWRITER ── */
(function initTypewriter() {
  const el = document.getElementById('typewriterTarget');
  if (!el) return;
  const text = 'ANTONIO SOLÍS';
  let i = 0;
  const tick = () => {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, i === 1 ? 600 : 110);
    } else {
      el.classList.add('done'); // hides cursor when done
    }
  };
  tick();
})();

/* ── AMBIENT LAYER — hex codes, coords, signal IDs, loading bars ── */
(function buildAmbient() {
  const layer = document.getElementById('ambientLayer');
  if (!layer) return;

  const HEX = '0123456789ABCDEF';
  const rndHex = () => {
    let s = '0x';
    for (let i = 0; i < 8; i++) s += HEX[Math.floor(Math.random() * 16)];
    return s;
  };
  const rndCoord = () => {
    const lat  = (Math.random() * 180 - 90).toFixed(4);
    const lon  = (Math.random() * 360 - 180).toFixed(4);
    return `${lat >= 0 ? '+' : ''}${lat} / ${lon >= 0 ? '+' : ''}${lon}`;
  };
  const rndSig = () => 'SIG_' + Math.random().toString(36).slice(2, 7).toUpperCase();
  const rndNode = () => `NODE[${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}]`;

  const types = [rndHex, rndCoord, rndSig, rndNode];

  // Scatter 30 text elements
  for (let i = 0; i < 30; i++) {
    const el = document.createElement('div');
    el.className = 'amb';
    el.textContent = types[i % types.length]();
    el.style.left   = `${Math.random() * 95}%`;
    el.style.top    = `${Math.random() * 95}%`;
    el.style.setProperty('--dur-float', `${4 + Math.random() * 6}s`);
    el.style.setProperty('--del-float', `${Math.random() * 5}s`);
    layer.appendChild(el);
  }

  // 10 tiny loading-bar strips
  for (let i = 0; i < 10; i++) {
    const wrap = document.createElement('div');
    wrap.style.cssText = `
      position:absolute;
      left:${Math.random() * 90}%;
      top:${Math.random() * 90}%;
      width:${30 + Math.random() * 50}px;
      height:2px;
      background:rgba(0,229,255,0.07);
      overflow:hidden;
    `;
    const bar = document.createElement('div');
    bar.style.cssText = `
      height:100%; width:40%;
      background:rgba(0,229,255,0.35);
      animation: lbar ${1.5 + Math.random() * 2}s linear ${Math.random() * 3}s infinite;
    `;
    wrap.appendChild(bar);
    layer.appendChild(wrap);
  }

  // inject keyframe for lbar into a style tag
  const st = document.createElement('style');
  st.textContent = `@keyframes lbar { 0%{transform:translateX(-100%)} 100%{transform:translateX(350%)} }`;
  document.head.appendChild(st);
})();

/* ── FOOTER BUILD STRING ── */
(function buildFooter() {
  const el = document.getElementById('footerBuild');
  if (!el) return;
  const now = new Date();
  el.textContent = `BUILD ${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
})();

/* ── HEX STREAM PANEL ── */
(function hexStream() {
  const el = document.getElementById('hexStream');
  if (!el) return;
  const HEX = '0123456789ABCDEF';
  const chunk = () => {
    let s = '';
    for (let i = 0; i < 6; i++) s += HEX[Math.floor(Math.random()*16)];
    return s;
  };
  let line = '';
  const render = () => {
    line += chunk() + ' ';
    if (line.length > 120) line = line.slice(line.length - 120);
    el.textContent = line;
  };
  setInterval(render, 220);
})();

/* ── ACTIVE NAV HIGHLIGHT ── */
(function activeNav() {
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const links    = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--c-accent)';
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));
})();

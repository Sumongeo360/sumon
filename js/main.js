/* ═══════════════════════════════════════════
   MD SUMON ALI — GIS PORTFOLIO
   main.js — Interactions & Animations
   ═══════════════════════════════════════════ */

/* ── CANVAS BACKGROUND: Topographic/Contour Lines ── */
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, lines = [], time = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildLines();
  }

  function buildLines() {
    lines = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      lines.push({
        y:     (H / count) * i + H / (count * 2),
        amp:   20 + Math.random() * 40,
        freq:  0.003 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0004,
        alpha: 0.06 + Math.random() * 0.08,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    time += 1;

    lines.forEach(l => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 200, 160, ${l.alpha})`;
      ctx.lineWidth = 0.8;
      for (let x = 0; x <= W; x += 3) {
        const y = l.y + Math.sin(x * l.freq + l.phase + time * l.speed) * l.amp
                      + Math.cos(x * l.freq * 0.5 + time * l.speed * 0.7) * (l.amp * 0.4);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    // Subtle dot grid
    ctx.fillStyle = 'rgba(0, 200, 160, 0.06)';
    const spacing = 80;
    for (let x = spacing; x < W; x += spacing) {
      for (let y = spacing; y < H; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();


/* ── NAVBAR: scroll state ── */
(function initNav() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();


/* ── HAMBURGER MENU ── */
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
})();

window.closeMobile = function() {
  document.getElementById('mobileMenu')?.classList.remove('open');
};


/* ── COUNTER ANIMATION (hero stats) ── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  let done = false;

  function countUp() {
    if (done) return;
    done = true;
    nums.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const id = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (target >= 10 ? '+' : '');
        if (current >= target) clearInterval(id);
      }, 35);
    });
  }

  // Trigger when hero is visible
  const hero = document.getElementById('hero');
  if (!hero) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(countUp, 600);
      obs.disconnect();
    }
  }, { threshold: 0.4 });
  obs.observe(hero);
})();


/* ── INTERSECTION OBSERVER: reveal on scroll ── */
(function initReveal() {
  // Generic reveal elements
  document.querySelectorAll(
    '.about-text, .about-card-cluster, .info-card, .section-title, .section-label'
  ).forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ── TIMELINE ITEMS: stagger reveal ── */
(function initTimeline() {
  const items = document.querySelectorAll('.tl-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => observer.observe(el));
})();


/* ── PROJECT CARDS: stagger reveal ── */
(function initProjects() {
  const cards = document.querySelectorAll('.proj-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(cards).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  cards.forEach(el => observer.observe(el));
})();


/* ── SKILL BARS: animate on scroll ── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.sb-fill');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animated'), 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fills.forEach(el => observer.observe(el));
})();


/* ── SMOOTH ACTIVE NAV LINK ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


/* ── TYPING EFFECT: hero tag ── */
(function initTyping() {
  const tag = document.querySelector('.hero-tag');
  if (!tag) return;
  const text = tag.textContent;
  tag.textContent = '';
  tag.style.visibility = 'visible';

  let i = 0;
  const id = setInterval(() => {
    tag.textContent += text[i++];
    if (i >= text.length) clearInterval(id);
  }, 35);
})();


/* ── CURSOR GLOW (desktop only) ── */
(function initCursorGlow() {
  if (window.innerWidth <= 768) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,200,160,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();


/* ── EDUCATION CARDS: stagger reveal ── */
(function initEdu() {
  const cards = document.querySelectorAll('.edu-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const i = Array.from(cards).indexOf(entry.target);
        entry.target.style.transitionDelay = (i * 100) + 'ms';
        entry.target.classList.add('reveal', 'visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();


/* ── CONTACT LINKS: stagger ── */
(function initContact() {
  const links = document.querySelectorAll('.contact-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach((l, i) => {
          setTimeout(() => {
            l.style.opacity = '1';
            l.style.transform = 'translateX(0)';
          }, i * 100);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  links.forEach(l => {
    l.style.opacity = '0';
    l.style.transform = 'translateX(-20px)';
    l.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s';
  });

  const contactSection = document.getElementById('contact');
  if (contactSection) observer.observe(contactSection);
})();

/* =========================================
       LOADER
    ========================================= */
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
      }, 1600);
    });

    /* =========================================
       CUSTOM CURSOR
    ========================================= */
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1.6)';
        ring.style.opacity   = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.opacity   = '0.6';
      });
    });

    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* =========================================
       SCROLL PROGRESS BAR
    ========================================= */
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = pct + '%';
    });

    /* =========================================
       MOBILE MENU
    ========================================= */
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }

    /* =========================================
       SCROLL-TRIGGERED REVEAL
    ========================================= */
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => io.observe(el));

    /* =========================================
       ANIMATED COUNTERS
    ========================================= */
    const counters = document.querySelectorAll('.counter');
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = target > 100 ? '+' : target === 97 ? '%' : '';
          let current  = 0;
          const step   = target / 60;

          const tick = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target + suffix;
              clearInterval(tick);
            } else {
              el.textContent = Math.floor(current) + suffix;
            }
          }, 25);

          counterIO.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterIO.observe(c));

    /* =========================================
       FLOATING PARTICLES (Affirmation)
    ========================================= */
    const particleContainer = document.getElementById('particles-container');
    const particleEmojis = ['✿', '🌸', '🍃', '🌿', '✦', '⭑', '◦'];
    const particleColors  = ['rgba(139,175,142,0.5)', 'rgba(232,197,188,0.5)', 'rgba(214,196,170,0.5)'];

    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size    = Math.random() * 10 + 6;
      const left    = Math.random() * 100;
      const delay   = Math.random() * 10;
      const dur     = Math.random() * 8 + 8;
      const useEmoji = Math.random() > 0.5;

      p.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${useEmoji ? 'transparent' : particleColors[Math.floor(Math.random()*particleColors.length)]};
        font-size: ${useEmoji ? size * 1.8 + 'px' : '0'};
        animation-duration: ${dur}s;
        animation-delay: ${delay}s;
      `;
      if (useEmoji) {
        p.textContent = particleEmojis[Math.floor(Math.random()*particleEmojis.length)];
        p.style.background = 'none';
        p.style.width = 'auto';
        p.style.height = 'auto';
      }
      particleContainer.appendChild(p);
    }

    /* =========================================
       LIGHT PARALLAX (Hero blobs)
    ========================================= */
    document.addEventListener('mousemove', e => {
      const bx = e.clientX / window.innerWidth  - 0.5;
      const by = e.clientY / window.innerHeight - 0.5;
      document.querySelectorAll('.hero-blob').forEach((b, i) => {
        const factor = (i + 1) * 14;
        b.style.transform = `translate(${bx * factor}px, ${by * factor}px)`;
      });
    });

    /* =========================================
       FORM VALIDATION + RIPPLE
    ========================================= */
    const form      = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const success   = document.getElementById('form-success');

    function validate(id, groupId, test) {
      const el    = document.getElementById(id);
      const group = document.getElementById(groupId);
      const ok    = test(el.value.trim());
      group.classList.toggle('invalid', !ok);
      el.classList.toggle('error', !ok);
      return ok;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const v1 = validate('name',    'group-name',    v => v.length >= 2);
      const v2 = validate('email',   'group-email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      const v3 = validate('message', 'group-message', v => v.length >= 10);

      if (v1 && v2 && v3) {
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
        setTimeout(() => {
          form.style.display = 'none';
          success.style.display = 'block';
        }, 1200);
      }
    });

    // Ripple on submit button
    submitBtn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const r = document.createElement('span');
      r.className = 'ripple';
      const size = Math.max(this.clientWidth, this.clientHeight);
      r.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top:  ${e.clientY - rect.top  - size/2}px;
      `;
      this.appendChild(r);
      setTimeout(() => r.remove(), 700);
    });

    /* =========================================
       SMOOTH SCROLL FOR ALL ANCHORS
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
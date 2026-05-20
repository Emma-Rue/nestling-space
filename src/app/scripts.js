export default function initScripts() {
  const cleanups = [];

  const addListener = (target, event, handler, options) => {
    target.addEventListener(event, handler, options);
    cleanups.push(() => target.removeEventListener(event, handler, options));
  };

  const loader = document.getElementById("loader");
  const loaderTimeout = window.setTimeout(() => {
    loader?.classList.add("hidden");
  }, 1600);
  cleanups.push(() => window.clearTimeout(loaderTimeout));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;
  let ringFrame = 0;

  if (dot && ring && !coarsePointer) {
    const handleMouseMove = (event) => {
      mx = event.clientX;
      my = event.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      ringFrame = window.requestAnimationFrame(animateRing);
    };

    addListener(document, "mousemove", handleMouseMove);
    animateRing();
    cleanups.push(() => window.cancelAnimationFrame(ringFrame));

    document.querySelectorAll("a, button, input, textarea, select").forEach((element) => {
      const handleEnter = () => {
        ring.style.transform = "translate(-50%,-50%) scale(1.6)";
        ring.style.opacity = "0.3";
      };
      const handleLeave = () => {
        ring.style.transform = "translate(-50%,-50%) scale(1)";
        ring.style.opacity = "0.6";
      };

      addListener(element, "mouseenter", handleEnter);
      addListener(element, "mouseleave", handleLeave);
    });
  }

  const navbar = document.getElementById("navbar");
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    };

    handleScroll();
    addListener(window, "scroll", handleScroll, { passive: true });
  }

  const progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    const updateProgress = () => {
      const scrollableHeight = document.body.scrollHeight - window.innerHeight;
      const percent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      progressBar.style.width = `${percent}%`;
    };

    updateProgress();
    addListener(window, "scroll", updateProgress, { passive: true });
    addListener(window, "resize", updateProgress);
  }

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  if (hamburger && mobileMenu) {
    const closeMenu = () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    };

    const toggleMenu = () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    };

    addListener(hamburger, "click", toggleMenu);
    mobileMenu.querySelectorAll("a").forEach((link) => addListener(link, "click", closeMenu));
  }

  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((element) => revealObserver.observe(element));
  cleanups.push(() => revealObserver.disconnect());

  const particleContainer = document.getElementById("particles-container");
  if (particleContainer) {
    particleContainer.replaceChildren();
    const particleGlyphs = ["*", "+", ".", "o"];
    const particleColors = [
      "rgba(139,175,142,0.5)",
      "rgba(232,197,188,0.5)",
      "rgba(214,196,170,0.5)",
    ];

    for (let index = 0; index < 18; index += 1) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = Math.random() * 10 + 6;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 8 + 8;
      const useGlyph = Math.random() > 0.5;

      particle.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${useGlyph ? "transparent" : particleColors[Math.floor(Math.random() * particleColors.length)]};
        font-size: ${useGlyph ? `${size * 1.8}px` : "0"};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;

      if (useGlyph) {
        particle.textContent = particleGlyphs[Math.floor(Math.random() * particleGlyphs.length)];
        particle.style.background = "none";
        particle.style.width = "auto";
        particle.style.height = "auto";
      }

      particleContainer.appendChild(particle);
    }
  }

  if (!reduceMotion) {
    const handleParallax = (event) => {
      const offsetX = event.clientX / window.innerWidth - 0.5;
      const offsetY = event.clientY / window.innerHeight - 0.5;

      document.querySelectorAll(".hero-blob").forEach((blob, index) => {
        const factor = (index + 1) * 14;
        blob.style.transform = `translate(${offsetX * factor}px, ${offsetY * factor}px)`;
      });
    };

    addListener(document, "mousemove", handleParallax);
  }

  const form = document.getElementById("contact-form");
  const submitButton = document.getElementById("submit-btn");
  const successMessage = document.getElementById("form-success");

  const validate = (id, groupId, test) => {
    const field = document.getElementById(id);
    const group = document.getElementById(groupId);
    if (!field || !group) {
      return false;
    }

    const value = "value" in field ? field.value.trim() : "";
    const isValid = test(value);
    group.classList.toggle("invalid", !isValid);
    field.classList.toggle("error", !isValid);
    return isValid;
  };

  if (form && submitButton && successMessage) {
    const accessKey = form.dataset.accessKey?.trim() ?? "";

    if (!accessKey) {
      submitButton.textContent = "Email or WhatsApp";
      submitButton.setAttribute("disabled", "true");
    }

    const handleSubmit = async (event) => {
      event.preventDefault();

      const validName = validate("name", "group-name", (value) => value.length >= 2);
      const validEmail = validate("email", "group-email", (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      const validMessage = validate("message", "group-message", (value) => value.length >= 10);

      if (!validName || !validEmail || !validMessage) {
        return;
      }

      if (!accessKey) {
        submitButton.textContent = "Email or WhatsApp";
        return;
      }

      submitButton.textContent = "Sending...";
      submitButton.setAttribute("disabled", "true");

      try {
        const formData = new FormData(form);
        formData.append("access_key", accessKey);
        formData.append("subject", "New Message from Nestling Space");

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        form.style.display = "none";
        successMessage.style.display = "block";
      } catch {
        submitButton.textContent = "Error. Please email directly.";
        submitButton.removeAttribute("disabled");
      }
    };

    addListener(form, "submit", handleSubmit);

    const handleRipple = (event) => {
      const rect = submitButton.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const size = Math.max(submitButton.clientWidth, submitButton.clientHeight);
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${event.clientX - rect.left - size / 2}px;
        top: ${event.clientY - rect.top - size / 2}px;
      `;
      submitButton.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    };

    addListener(submitButton, "click", handleRipple);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const handleAnchorClick = (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId) {
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        return;
      }

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    addListener(anchor, "click", handleAnchorClick);
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}

export default function initScripts() {
  const cleanups = [];

  const addListener = (target, event, handler, options) => {
    target.addEventListener(event, handler, options);
    cleanups.push(() => target.removeEventListener(event, handler, options));
  };

  // Reveal animation via IntersectionObserver
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((element) => revealObserver.observe(element));
  cleanups.push(() => revealObserver.disconnect());

  // AOS — animation-play-state toggle (blur-up, slide, scale variants)
  const aosEls = document.querySelectorAll(".aos");
  const aosObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          aosObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  aosEls.forEach((el) => aosObserver.observe(el));
  cleanups.push(() => aosObserver.disconnect());

  // Testimonials drag-scroll (home page)
  const track = document.getElementById("testimonials-track");
  const dotsContainer = document.getElementById("scroll-dots");
  if (track) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = "grabbing";
    };
    const handleMouseLeave = () => {
      isDown = false;
      track.style.cursor = "grab";
    };
    const handleMouseUp = () => {
      isDown = false;
      track.style.cursor = "grab";
    };
    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    };

    addListener(track, "mousedown", handleMouseDown);
    addListener(track, "mouseleave", handleMouseLeave);
    addListener(track, "mouseup", handleMouseUp);
    addListener(track, "mousemove", handleMouseMove);

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".scroll-dot");
      const cards = track.querySelectorAll(".testimonial-card");

      const updateDots = () => {
        if (cards.length === 0) return;
        const cardWidth = cards[0].getBoundingClientRect().width + 16;
        const activeIndex = Math.round(track.scrollLeft / cardWidth);
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === activeIndex);
        });
      };

      addListener(track, "scroll", updateDots, { passive: true });

      dots.forEach((dot, i) => {
        addListener(dot, "click", () => {
          const cardWidth =
            cards[0]?.getBoundingClientRect().width + 16 || 336;
          track.scrollTo({ left: i * cardWidth, behavior: "smooth" });
        });
      });
    }
  }

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}

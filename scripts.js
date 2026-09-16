// Nav shadow on scroll
const header = document.querySelector(".site-header");
if (header) {
  const toggleHeaderShadow = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  toggleHeaderShadow();
  window.addEventListener("scroll", toggleHeaderShadow, { passive: true });
}

// Reveal-on-scroll for sections and pill groups
const revealTargets = document.querySelectorAll(".reveal, .pill-group");
if (revealTargets.length && "IntersectionObserver" in window) {
  revealTargets.forEach((el) => {
    if (el.classList.contains("pill-group")) {
      el.querySelectorAll(".pill").forEach((pill, i) => {
        pill.style.transitionDelay = `${i * 40}ms`;
      });
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

// Reading progress bar (blog posts only)
const progressBar = document.querySelector(".reading-progress");
if (progressBar) {
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

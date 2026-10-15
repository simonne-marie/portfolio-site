// Click-to-enlarge for screenshots.
(function () {
  var dialog = document.createElement("dialog");
  if (typeof dialog.showModal !== "function") return;
  dialog.className = "lightbox";
  dialog.innerHTML = '<div class="lb-bar"><button type="button" class="lb-close">Close</button></div><img alt="">';
  document.body.appendChild(dialog);
  var big = dialog.querySelector("img");

  document.addEventListener("click", function (event) {
    var zoom = event.target.closest(".zoom");
    if (!zoom) return;
    var thumb = zoom.querySelector("img");
    big.src = thumb.currentSrc || thumb.src;
    big.alt = thumb.alt;
    dialog.scrollTop = 0;
    dialog.showModal();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target.classList.contains("lb-close")) dialog.close();
  });
})();

// Count-up for result numbers. The final value is already in the HTML, so the page reads correctly without JavaScript.
(function () {
  var counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function render(el, value) {
    el.textContent = (el.dataset.prefix || "") + Math.round(value) + (el.dataset.suffix || "");
  }

  function run(el) {
    var target = Number(el.dataset.count);
    var duration = 1200;
    var start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / duration);
      render(el, target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        run(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(function (el) {
    render(el, 0);
    observer.observe(el);
  });
})();

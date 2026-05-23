/* Arquivo da Campanha — Corações do Outro Lado
   Ordo Performance Core v2.0.2
   Correção: otimiza sem sequestrar requestAnimationFrame e sem esconder VFX. */
(() => {
  "use strict";

  if (window.OrdoPerf?.version === "2.0.2") return;

  const nativeRAF = window.requestAnimationFrame.bind(window);
  const nativeCancelRAF = window.cancelAnimationFrame.bind(window);
  const nativeSetInterval = window.setInterval.bind(window);
  const nativeClearInterval = window.clearInterval.bind(window);
  const nativeSetTimeout = window.setTimeout.bind(window);

  const state = {
    visible: !document.hidden,
    focused: document.hasFocus(),
    intervals: new Set()
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));



  const vfxBudget = {
    capacity: 72,
    tokens: 72,
    refillPerSecond: 42,
    last: performance.now(),
    pressureUntil: 0,
    skipped: 0
  };

  function refillVfxBudget() {
    const now = performance.now();
    const delta = Math.max(0, now - vfxBudget.last) / 1000;
    vfxBudget.last = now;
    vfxBudget.tokens = clamp(vfxBudget.tokens + delta * vfxBudget.refillPerSecond, 0, vfxBudget.capacity);
    return now;
  }

  function canSpawnVfx(key = "global", cost = 1) {
    const now = refillVfxBudget();
    if (vfxBudget.tokens >= cost) {
      vfxBudget.tokens -= cost;
      return true;
    }
    vfxBudget.skipped += 1;
    vfxBudget.pressureUntil = now + 360;
    return false;
  }

  function vfxPressure() {
    refillVfxBudget();
    if (performance.now() < vfxBudget.pressureUntil) return "high";
    if (vfxBudget.tokens < vfxBudget.capacity * 0.28) return "medium";
    return "low";
  }

  function adaptiveCount(base, medium = 0.72, high = 0.48) {
    const pressure = vfxPressure();
    const mediumValue = medium > 1 ? medium : base * medium;
    const highValue = high > 1 ? high : base * high;
    if (pressure === "high") return Math.max(1, Math.round(highValue));
    if (pressure === "medium") return Math.max(1, Math.round(mediumValue));
    return Math.max(1, Math.round(base));
  }

  function dpr(max = 1.5) {
    return clamp(window.devicePixelRatio || 1, 1, max);
  }

  /* Compatível com requestAnimationFrame(callback).
     A versão anterior chamava OrdoPerf.raf dentro dela mesma e matava os loops dos efeitos. */
  function raf(callback) {
    return nativeRAF((time) => {
      if (!state.visible) {
        nativeSetTimeout(() => raf(callback), 180);
        return;
      }
      callback(time);
    });
  }

  function cancelRaf(id) {
    nativeCancelRAF(id);
  }

  /* Compatível com setInterval(callback, delay).
     Não cancela efeitos; apenas reduz chamadas quando a aba está oculta. */
  function interval(callback, delay = 1000, options = {}) {
    const hiddenDelay = options.hiddenDelay || Math.max(delay * 4, 3500);
    let lastHiddenRun = 0;

    const id = nativeSetInterval(() => {
      if (!state.visible) {
        const now = Date.now();
        if (now - lastHiddenRun < hiddenDelay) return;
        lastHiddenRun = now;
      }
      callback();
    }, delay);

    state.intervals.add(id);
    return id;
  }

  function clearIntervalSafe(id) {
    state.intervals.delete(id);
    nativeClearInterval(id);
  }

  function throttle(fn, wait = 32) {
    let last = 0;
    let trailing = null;

    return function throttled(...args) {
      const now = performance.now();
      const remaining = wait - (now - last);

      if (remaining <= 0) {
        if (trailing) {
          clearTimeout(trailing);
          trailing = null;
        }
        last = now;
        fn.apply(this, args);
        return;
      }

      if (!trailing) {
        trailing = nativeSetTimeout(() => {
          trailing = null;
          last = performance.now();
          fn.apply(this, args);
        }, remaining);
      }
    };
  }

  function cap(array, max) {
    if (!Array.isArray(array) || array.length <= max) return array;
    array.splice(0, array.length - max);
    return array;
  }

  function safeClosest(event, selector) {
    const target = event?.target;
    if (!target || !(target instanceof Element)) return null;
    return target.closest(selector);
  }

  function prepareCanvas(canvas, ctx, maxDpr = 1.5) {
    if (!canvas || !ctx) return { width: 0, height: 0, ratio: 1 };

    const ratio = dpr(maxDpr);
    const width = Math.max(1, window.innerWidth || document.documentElement.clientWidth || 1);
    const height = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1);

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    return { width, height, ratio };
  }

  function lockHorizontalScroll() {
    const fix = () => {
      if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
    };

    window.addEventListener("scroll", fix, { passive: true });
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
  }

  function addGlobalOptimizations() {
    const existing = document.getElementById("ordo-performance-core-css");
    if (existing) existing.remove();

    const style = document.createElement("style");
    style.id = "ordo-performance-core-css";
    style.textContent = `
      html, body {
        max-width: 100%;
        overflow-x: hidden !important;
      }

      body {
        text-rendering: optimizeLegibility;
      }

      img, video {
        max-width: 100%;
      }

      canvas[id*="vfx"],
      canvas[class*="vfx"],
      canvas[id*="Vfx"],
      canvas[class*="Vfx"],
      [data-edoc-canvas],
      [data-elements-vfx],
      #home-vfx-canvas,
      #documentsVfxCanvas,
      #sectionVfxCanvas {
        position: fixed;
        inset: 0;
        width: 100vw !important;
        height: 100vh !important;
        pointer-events: none !important;
        z-index: 999999 !important;
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
        transform: translateZ(0);
        will-change: contents;
      }

      .home-sector-card,
      .agent-card,
      .document-card,
      .element-card,
      .section-card,
      .edoc-panel,
      .edoc-file,
      .player-character,
      .character-art,
      .floating-symbol,
      .knowledge-popup-alert {
        transform: translateZ(0);
        backface-visibility: hidden;
      }
    `;

    document.head.appendChild(style);
  }

  function lazyImages() {
    document.querySelectorAll("img").forEach((img) => {
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
      if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
      img.setAttribute("draggable", "false");
    });
  }

  document.addEventListener("visibilitychange", () => {
    state.visible = !document.hidden;
  }, { passive: true });

  window.addEventListener("focus", () => { state.focused = true; }, { passive: true });
  window.addEventListener("blur", () => { state.focused = false; }, { passive: true });

  window.OrdoPerf = {
    version: "2.0.2",
    state,
    dpr,
    raf,
    cancelRaf,
    interval,
    clearInterval: clearIntervalSafe,
    throttle,
    cap,
    safeClosest,
    prepareCanvas,
    canSpawnVfx,
    vfxPressure,
    adaptiveCount,
    lockHorizontalScroll,
    addGlobalOptimizations,
    lazyImages
  };

  addGlobalOptimizations();
  lockHorizontalScroll();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", lazyImages, { once: true });
  } else {
    lazyImages();
  }
})();

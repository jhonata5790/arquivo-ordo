(() => {
  "use strict";

  if (window.__ordoGlobalEffectsLoaded) return;
  window.__ordoGlobalEffectsLoaded = true;

  function safeClosest(event, selector) {
    const target = event?.target;

    if (!target || !(target instanceof Element)) {
      return null;
    }

    return target.closest(selector);
  }

  window.safeClosest = safeClosest;

  const state = {
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    lastParticle: 0,
  };

  const pageType = (() => {
    const bodyText = document.body?.className || "";
    const main = document.querySelector("main");
    const mainText = main?.className || "";
    const all = `${bodyText} ${mainText}`;

    if (all.includes("blood") || location.pathname.includes("sangue")) return "blood";
    if (all.includes("knowledge") || location.pathname.includes("conhecimento")) return "knowledge";
    if (all.includes("energy") || location.pathname.includes("energia")) return "energy";
    if (all.includes("death") || location.pathname.includes("morte")) return "death";
    if (all.includes("fear") || location.pathname.includes("medo")) return "fear";
    if (all.includes("elements") || location.pathname.includes("elementos")) return "elements";
    if (all.includes("documents") || location.pathname.includes("documentos")) return "documents";
    return "ordo";
  })();

  const palette = {
    blood: "#ff244d",
    knowledge: "#f4d06f",
    energy: "#70e7ff",
    death: "#a7b88a",
    fear: "#f2f2f2",
    elements: "#a855f7",
    documents: "#d4af37",
    ordo: "#b11226",
  };

  function createLayer(className, parent = document.body) {
    let layer = document.querySelector(`.${className}`);
    if (layer) return layer;
    layer = document.createElement("div");
    layer.className = className;
    layer.setAttribute("aria-hidden", "true");
    parent.prepend(layer);
    return layer;
  }

  function setCursorAura() {
    const aura = createLayer("ordo-cursor-aura");
    aura.style.setProperty("--aura-color", palette[pageType] || palette.ordo);

    window.addEventListener("pointermove", event => {
      state.mouseX = event.clientX;
      state.mouseY = event.clientY;
      aura.style.transform = `translate3d(${state.mouseX}px, ${state.mouseY}px, 0)`;

      const now = performance.now();
      if (now - state.lastParticle > 70) {
        state.lastParticle = now;
        makeParticle(state.mouseX, state.mouseY, "trail");
      }
    }, { passive: true });
  }

  function makeParticle(x, y, type = "ambient") {
    const particle = document.createElement("span");
    particle.className = `ordo-particle ordo-particle-${type} ordo-particle-${pageType}`;
    particle.style.left = `${x + (Math.random() - 0.5) * 24}px`;
    particle.style.top = `${y + (Math.random() - 0.5) * 24}px`;
    particle.style.setProperty("--particle-color", palette[pageType] || palette.ordo);
    particle.style.setProperty("--dx", `${(Math.random() - 0.5) * 90}px`);
    particle.style.setProperty("--dy", `${(Math.random() - 0.5) * 90}px`);
    document.body.appendChild(particle);
    window.setTimeout(() => particle.remove(), type === "shock" ? 900 : 1200);
  }

  function makeShockwave(x, y) {
    const shock = document.createElement("span");
    shock.className = `ordo-shockwave ordo-shockwave-${pageType}`;
    shock.style.left = `${x}px`;
    shock.style.top = `${y}px`;
    shock.style.setProperty("--shock-color", palette[pageType] || palette.ordo);
    document.body.appendChild(shock);
    for (let i = 0; i < 10; i++) makeParticle(x, y, "shock");
    window.setTimeout(() => shock.remove(), 850);
  }

  function makeGlitchSlice(x, y) {
    const slice = document.createElement("span");
    slice.className = `ordo-glitch-slice ordo-glitch-slice-${pageType}`;
    slice.style.left = `${Math.max(0, x - 70)}px`;
    slice.style.top = `${Math.max(0, y - 8)}px`;
    slice.style.setProperty("--slice-color", palette[pageType] || palette.ordo);
    document.body.appendChild(slice);
    window.setTimeout(() => slice.remove(), 430);
  }

  function setupClicks() {
    document.addEventListener("click", event => {
      const interactive = safeClosest(event, "a, button, .document-card, .element-card, [data-ordo-interactive]");
      makeShockwave(event.clientX, event.clientY);
      if (interactive || pageType === "energy" || Math.random() > 0.55) makeGlitchSlice(event.clientX, event.clientY);
    });
  }

  function setupTilt() {
    const items = ".element-card, .document-card, .ordo-card, .nav-card, .archive-card, .document-paper, .element-main-file";

    document.addEventListener("pointermove", event => {
      const card = safeClosest(event, items);
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
      card.style.setProperty("--light-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--light-y", `${event.clientY - rect.top}px`);
    }, { passive: true });

    document.addEventListener("pointerout", event => {
      const card = safeClosest(event, items);
      if (!card) return;
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    }, { passive: true });
  }

  function setupAmbientField() {
    const field = createLayer("ordo-ambient-field");
    field.classList.add(`ordo-ambient-${pageType}`);
    field.style.setProperty("--field-color", palette[pageType] || palette.ordo);

    window.setInterval(() => {
      if (document.hidden) return;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      makeParticle(x, y, "ambient");
    }, 420);
  }

  function setupCinematicEntry() {
    document.documentElement.classList.add("ordo-cinematic-entry");
    window.setTimeout(() => document.documentElement.classList.add("ordo-entry-finished"), 800);

    document.querySelectorAll("main > header, .documents-status-panel, .elements-status-panel, .documents-layout, .elements-grid, .element-shell, .document-reader")
      .forEach((element, index) => {
        element.classList.add("ordo-reveal-block");
        element.style.setProperty("--reveal-delay", `${index * 0.08}s`);
      });
  }

  function setupHoverFeedback() {
    document.addEventListener("pointerenter", event => {
      const interactive = safeClosest(event, "a, button, .document-card, .element-card");
      if (!interactive) return;
      interactive.classList.add("ordo-hovered");
    }, true);

    document.addEventListener("pointerleave", event => {
      const interactive = safeClosest(event, "a, button, .document-card, .element-card");
      if (!interactive) return;
      interactive.classList.remove("ordo-hovered");
    }, true);
  }

  function boot() {
    document.body.dataset.ordoPage = pageType;
    setCursorAura();
    setupAmbientField();
    setupCinematicEntry();
    setupClicks();
    setupTilt();
    setupHoverFeedback();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();

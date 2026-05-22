function getCurrentPlayerType() {
  if (document.querySelector(".maisie-exclusive-page")) return "maisie";
  if (document.querySelector(".roselyn-exclusive-page")) return "roselyn";
  if (document.querySelector(".lilian-exclusive-page")) return "lilian";
  return null;
}

function closePlayerPopups() {
  document
    .querySelectorAll(
      ".maisie-hotspot-popup, .roselyn-hotspot-popup, .lilian-hotspot-popup, .maisie-walt-bubble, .roselyn-metronome-bubble, .lilian-guard-bubble"
    )
    .forEach(element => element.remove());
}

function setupPlayerKeyboardShortcuts() {
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closePlayerPopups();
    }
  });
}

function setupPlayerDossierScroll() {
  const buttons = document.querySelectorAll(
    ".maisie-tabs button, .roselyn-tabs button, .lilian-tabs button"
  );

  const dossier = document.querySelector(
    ".maisie-dossier-zone, .roselyn-dossier-zone, .lilian-dossier-zone"
  );

  if (!buttons.length || !dossier) return;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        setTimeout(() => {
          dossier.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 80);
      }
    });
  });
}

function setupPlayerClickFeedback() {
  document.addEventListener("click", event => {
    const target = event.target.closest(
      ".maisie-tabs button, .roselyn-tabs button, .lilian-tabs button, .maisie-item-card, .roselyn-item-card, .lilian-item-card, .maisie-attr-node, .roselyn-attr-node, .lilian-attr-node"
    );

    if (!target) return;

    target.classList.remove("player-click-feedback");
    void target.offsetWidth;
    target.classList.add("player-click-feedback");
  });
}

function setupPlayerBootResetButton() {
  const params = new URLSearchParams(location.search);

  if (!params.has("boot")) return;

  sessionStorage.removeItem("maisieBootPlayed");
  sessionStorage.removeItem("roselynBootPlayed");
  sessionStorage.removeItem("lilianBootPlayed");
}

function createPlayerParticle(x, y, type, extraClass = "") {
  if (document.documentElement.classList.contains("performance-mode")) return;

  const particle = document.createElement("span");
  particle.className = `player-fx-particle player-fx-${type} ${extraClass}`;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.setProperty("--x", `${(Math.random() - 0.5) * 120}px`);
  particle.style.setProperty("--y", `${(Math.random() - 0.8) * 120}px`);
  particle.style.setProperty("--r", `${Math.random() * 160 - 80}deg`);

  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 900);
}

function createPlayerShockwave(x, y, type) {
  if (document.documentElement.classList.contains("performance-mode")) return;

  const wave = document.createElement("span");
  wave.className = `player-shockwave player-shockwave-${type}`;
  wave.style.left = `${x}px`;
  wave.style.top = `${y}px`;

  document.body.appendChild(wave);

  setTimeout(() => wave.remove(), 850);
}

function setupPlayerMouseAura() {
  const type = getCurrentPlayerType();
  if (!type) return;

  const aura = document.createElement("div");
  aura.className = `player-cursor-aura player-cursor-aura-${type}`;
  document.body.appendChild(aura);

  let lastX = 0;
  let lastY = 0;
  let lastParticle = 0;

  document.addEventListener("pointermove", event => {
    lastX += (event.clientX - lastX) * 0.35;
    lastY += (event.clientY - lastY) * 0.35;

    aura.style.transform = `translate(${lastX}px, ${lastY}px)`;

    const now = Date.now();

    if (now - lastParticle > 95 && window.innerWidth > 760) {
      lastParticle = now;

      if (type === "maisie") {
        createPlayerParticle(event.clientX, event.clientY, type, "spark");
      }

      if (type === "roselyn") {
        createPlayerParticle(event.clientX, event.clientY, type, "dust");
      }

      if (type === "lilian") {
        createPlayerParticle(event.clientX, event.clientY, type, "debris");
      }
    }
  });
}

function setupPlayerBigReactions() {
  const type = getCurrentPlayerType();
  if (!type) return;

  document.addEventListener("click", event => {
    const specialTarget = event.target.closest(
      ".maisie-overload-button, .roselyn-hiatus-button, .lilian-impact-button, .maisie-wheel-core, .roselyn-wheel-core, .lilian-wheel-core, .maisie-item-card, .roselyn-item-card, .lilian-item-card"
    );

    if (!specialTarget) return;

    createPlayerShockwave(event.clientX, event.clientY, type);

    const page = document.querySelector(
      ".maisie-exclusive-page, .roselyn-exclusive-page, .lilian-exclusive-page"
    );

    if (!page) return;

    page.classList.remove("player-page-react");
    void page.offsetWidth;
    page.classList.add("player-page-react");
  });
}

function setupPlayerHoverReactions() {
  const type = getCurrentPlayerType();
  if (!type) return;

  const selector = [
    ".maisie-card-grid article",
    ".roselyn-card-grid article",
    ".lilian-card-grid article",
    ".maisie-chip-grid article",
    ".roselyn-chip-grid article",
    ".lilian-chip-grid article",
    ".maisie-item-card",
    ".roselyn-item-card",
    ".lilian-item-card"
  ].join(",");

  document.addEventListener("pointerenter", event => {
    const target = event.target.closest(selector);
    if (!target) return;

    target.classList.remove("player-hover-pulse");
    void target.offsetWidth;
    target.classList.add("player-hover-pulse");
  }, true);
}

function setupPlayerAmbientLoop() {
  const type = getCurrentPlayerType();
  if (!type) return;

  if (document.documentElement.classList.contains("performance-mode")) return;

  const page = document.querySelector(
    ".maisie-exclusive-page, .roselyn-exclusive-page, .lilian-exclusive-page"
  );

  if (!page) return;

  const ambient = document.createElement("div");
  ambient.className = `player-ambient-field player-ambient-${type}`;

  for (let i = 0; i < 18; i++) {
    const dot = document.createElement("span");
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.setProperty("--delay", `${Math.random() * 5}s`);
    dot.style.setProperty("--duration", `${4 + Math.random() * 5}s`);
    dot.style.setProperty("--size", `${3 + Math.random() * 7}px`);
    ambient.appendChild(dot);
  }

  page.prepend(ambient);
}

function setupPlayerSpecialButtonsGlow() {
  const type = getCurrentPlayerType();
  if (!type) return;

  const buttons = document.querySelectorAll(
    ".maisie-overload-button, .roselyn-hiatus-button, .lilian-impact-button"
  );

  buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
      button.classList.add("player-special-ready");
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove("player-special-ready");
    });
  });
}

function setupPlayerPolish() {
  setupPlayerBootResetButton();
  setupPlayerKeyboardShortcuts();
  setupPlayerDossierScroll();
  setupPlayerClickFeedback();

  setupPlayerMouseAura();
  setupPlayerBigReactions();
  setupPlayerHoverReactions();
  setupPlayerAmbientLoop();
  setupPlayerSpecialButtonsGlow();
}

document.addEventListener("DOMContentLoaded", setupPlayerPolish);
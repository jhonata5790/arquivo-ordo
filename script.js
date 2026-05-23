(() => {
  "use strict";

  const PAGE_SELECTOR = ".blood-element-page";
  const ACTION_SELECTOR = "[data-blood-action]";
  const FRAGMENT_LIST_SELECTOR = "[data-blood-fragments]";

  const corruptedLines = [
    "Reconstrução falhou. O fragmento retornou mais orgânico que antes.",
    "O arquivo reagiu ao operador. Batimento externo detectado.",
    "A margem do documento pareceu contrair como tecido vivo.",
    "O Sangue não foi lido. Ele leu de volta.",
    "A Ordo registra aumento de fome simbólica no arquivo.",
    "O Coração Amaldiçoado não está no documento. O documento está em volta dele.",
    "Tentativa de contenção recusada. O fluxo encontrou outro caminho.",
    "A leitura criou novas veias na interface.",
    "O fragmento pulsa em intervalos incompatíveis com sistemas digitais."
  ];

  const statuses = [
    "Vivo demais",
    "Pulsando",
    "Instinto ativo",
    "Fome detectada",
    "Tecido reativo",
    "Contração irregular",
    "Resposta predatória",
    "Contenção falhando"
  ];

  let pulse = 3;
  let integrity = 68;
  let contamination = 41;
  let lastTrail = 0;

  function safeClosest(event, selector) {
    if (typeof window.safeClosest === "function") {
      return window.safeClosest(event, selector);
    }

    const target = event?.target;

    if (!target || !(target instanceof Element)) {
      return null;
    }

    return target.closest(selector);
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomInt(min, max) {
    return Math.floor(random(min, max + 1));
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function setText(selector, value) {
    const element = qs(selector);
    if (element) element.textContent = value;
  }

  function getPage() {
    return qs(PAGE_SELECTOR);
  }

  function clampStats() {
    pulse = Math.max(1, Math.min(12, pulse));
    integrity = Math.max(1, Math.min(100, integrity));
    contamination = Math.max(0, Math.min(100, contamination));
  }

  function updateStats(forcedStatus = null) {
    clampStats();

    setText("[data-blood-pulse]", `${pulse} BPM PARANORMAL`);
    setText("[data-blood-integrity]", `${integrity}%`);
    setText("[data-blood-contamination]", `${contamination}%`);
    setText("[data-blood-status]", forcedStatus || pick(statuses));

    const page = getPage();

    if (page) {
      page.style.setProperty("--blood-pulse-speed", `${Math.max(0.55, 2.4 - pulse * 0.14)}s`);
      page.style.setProperty("--blood-integrity", `${integrity}%`);
      page.style.setProperty("--blood-contamination", `${contamination}%`);
    }
  }

  function createLayer() {
    const page = getPage();
    if (!page) return null;

    let layer = qs(".blood-fx-layer");

    if (!layer) {
      layer = document.createElement("div");
      layer.className = "blood-fx-layer";
      layer.setAttribute("aria-hidden", "true");
      page.appendChild(layer);
    }

    return layer;
  }

  function spawnDrop(x, y, intense = false) {
    const layer = createLayer();
    if (!layer) return;

    const drop = document.createElement("span");
    drop.className = intense ? "blood-fx-drop intense" : "blood-fx-drop";

    drop.style.left = `${x + random(-22, 22)}px`;
    drop.style.top = `${y + random(-18, 18)}px`;
    drop.style.setProperty("--dx", `${random(-45, 45)}px`);
    drop.style.setProperty("--dy", `${random(90, 190)}px`);
    drop.style.setProperty("--s", random(0.75, intense ? 1.8 : 1.25).toFixed(2));

    layer.appendChild(drop);

    setTimeout(() => drop.remove(), intense ? 1800 : 1250);
  }

  function spawnVein(x, y, strong = false) {
    const layer = createLayer();
    if (!layer) return;

    const vein = document.createElement("span");
    vein.className = strong ? "blood-fx-vein strong" : "blood-fx-vein";

    vein.style.left = `${x}px`;
    vein.style.top = `${y}px`;
    vein.style.rotate = `${random(-50, 50)}deg`;
    vein.style.setProperty("--w", `${random(strong ? 170 : 90, strong ? 340 : 190)}px`);

    layer.appendChild(vein);

    setTimeout(() => vein.remove(), strong ? 1800 : 1200);
  }

  function spawnShockwave(x, y) {
    const layer = createLayer();
    if (!layer) return;

    const shockwave = document.createElement("span");
    shockwave.className = "blood-fx-shockwave";

    shockwave.style.left = `${x}px`;
    shockwave.style.top = `${y}px`;

    layer.appendChild(shockwave);

    setTimeout(() => shockwave.remove(), 950);
  }

  function spawnBloodSplash(x, y) {
    for (let i = 0; i < 18; i++) {
      spawnDrop(x, y, i % 2 === 0);
    }

    for (let i = 0; i < 5; i++) {
      spawnVein(x + random(-90, 90), y + random(-60, 60), true);
    }

    spawnShockwave(x, y);
  }

  function addFragment(label = "RECONSTRUÇÃO") {
    const list = qs(FRAGMENT_LIST_SELECTOR);
    if (!list) return;

    const line = document.createElement("p");
    line.className = "blood-fragment-line blood-line-new blood-line-danger";
    line.innerHTML = `<span>${label}</span>${pick(corruptedLines)}`;

    list.appendChild(line);

    line.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function animateExistingLines() {
    const lines = document.querySelectorAll(".blood-fragment-line");

    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("blood-line-hit");

        setTimeout(() => {
          line.classList.remove("blood-line-hit");
        }, 700);
      }, index * 55);
    });
  }

  function forceHeartbeat(event) {
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;

    pulse += 2;
    contamination += 9;
    integrity -= 6;

    updateStats("Batimento forçado");

    const page = getPage();
    if (page) {
      page.classList.remove("blood-screen-pulse", "blood-screen-seal", "blood-screen-overflow");
      void page.offsetWidth;
      page.classList.add("blood-screen-pulse");
      setTimeout(() => page.classList.remove("blood-screen-pulse"), 900);
    }

    spawnBloodSplash(x, y);
    animateExistingLines();
    addFragment("BATIMENTO FORÇADO");
  }

  function trySeal(event) {
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;

    pulse = Math.max(1, pulse - 1);
    contamination += 6;
    integrity -= 10;

    updateStats("Estancamento recusado");

    const page = getPage();
    if (page) {
      page.classList.remove("blood-screen-pulse", "blood-screen-seal", "blood-screen-overflow");
      void page.offsetWidth;
      page.classList.add("blood-screen-seal");
      setTimeout(() => page.classList.remove("blood-screen-seal"), 950);
    }

    for (let i = 0; i < 12; i++) {
      spawnVein(x + random(-180, 180), y + random(-120, 120), true);
    }

    spawnShockwave(x, y);
    addFragment("ESTANCAMENTO FALHOU");
  }

  function collectSample(event) {
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;

    contamination += 4;
    integrity -= 4;
    pulse += 1;

    updateStats("Amostra instável");

    const page = getPage();
    if (page) {
      page.classList.remove("blood-screen-pulse", "blood-screen-seal", "blood-screen-overflow");
      void page.offsetWidth;
      page.classList.add("blood-screen-overflow");
      setTimeout(() => page.classList.remove("blood-screen-overflow"), 1000);
    }

    for (let i = 0; i < 28; i++) {
      spawnDrop(x, y, true);
    }

    addFragment("AMOSTRA COLETADA");
  }

  function handleAction(action, event) {
    if (action === "pulse") forceHeartbeat(event);
    if (action === "seal") trySeal(event);
    if (action === "sample") collectSample(event);
  }

  function createAmbientVeins() {
    const page = getPage();
    if (!page) return;

    const old = qs(".blood-visible-veins");
    if (old) old.remove();

    const field = document.createElement("div");
    field.className = "blood-visible-veins";
    field.setAttribute("aria-hidden", "true");

    for (let i = 0; i < 34; i++) {
      const vein = document.createElement("span");

      vein.style.left = `${random(0, 100)}%`;
      vein.style.top = `${random(0, 100)}%`;
      vein.style.width = `${random(120, 420)}px`;
      vein.style.rotate = `${random(-70, 70)}deg`;
      vein.style.animationDelay = `${random(-6, 0)}s`;
      vein.style.opacity = random(0.18, 0.55).toFixed(2);

      field.appendChild(vein);
    }

    page.appendChild(field);
  }

  function createAmbientDrops() {
    const page = getPage();
    if (!page) return;

    const old = qs(".blood-visible-rain");
    if (old) old.remove();

    const rain = document.createElement("div");
    rain.className = "blood-visible-rain";
    rain.setAttribute("aria-hidden", "true");

    for (let i = 0; i < 42; i++) {
      const drop = document.createElement("span");

      drop.style.left = `${random(0, 100)}%`;
      drop.style.animationDelay = `${random(-10, 0)}s`;
      drop.style.animationDuration = `${random(5, 13)}s`;
      drop.style.transform = `scale(${random(0.45, 1.25).toFixed(2)})`;

      rain.appendChild(drop);
    }

    page.appendChild(rain);
  }

  function createHeartbeatFlash() {
    const page = getPage();
    if (!page) return;

    const flash = document.createElement("div");
    flash.className = "blood-heartbeat-flash";
    flash.setAttribute("aria-hidden", "true");

    page.appendChild(flash);
  }

  function bindActions() {
    document.addEventListener("click", event => {
      const button = safeClosest(event, ACTION_SELECTOR);

      if (button) {
        handleAction(button.dataset.bloodAction, event);
        return;
      }

      const page = getPage();

      if (page && event.target instanceof Element && page.contains(event.target)) {
        spawnShockwave(event.clientX, event.clientY);

        for (let i = 0; i < 5; i++) {
          spawnDrop(event.clientX, event.clientY, i % 2 === 0);
        }
      }
    });
  }

  function bindPointerTrail() {
    document.addEventListener("pointermove", event => {
      const page = getPage();
      if (!page) return;

      const x = event.clientX;
      const y = event.clientY;

      page.style.setProperty("--cursor-x", `${x}px`);
      page.style.setProperty("--cursor-y", `${y}px`);
      page.style.setProperty("--mx", `${(x / window.innerWidth - 0.5).toFixed(3)}`);
      page.style.setProperty("--my", `${(y / window.innerHeight - 0.5).toFixed(3)}`);

      const now = performance.now();

      if (now - lastTrail > 80) {
        lastTrail = now;

        if (Math.random() > 0.35) {
          spawnDrop(x, y, false);
        }

        if (Math.random() > 0.72) {
          spawnVein(x + random(-35, 35), y + random(-35, 35), false);
        }
      }
    }, { passive: true });
  }

  function bindCore() {
    const core = qs("[data-blood-core]");
    if (!core) return;

    core.addEventListener("pointerenter", event => {
      spawnBloodSplash(event.clientX, event.clientY);
      animateExistingLines();
      updateStats("Órgão ritualístico ativo");
    });
  }

  function revealLines() {
    const lines = document.querySelectorAll(".blood-fragment-line");

    lines.forEach((line, index) => {
      line.style.setProperty("--delay", `${index * 0.08}s`);
      line.classList.add("blood-line-reveal");
    });
  }

  function startAmbientPulse() {
    (window.OrdoPerf?.interval || window.setInterval)(() => {
      const page = getPage();

      if (!page || document.hidden) return;

      page.classList.add("blood-ambient-pulse");

      setTimeout(() => {
        page.classList.remove("blood-ambient-pulse");
      }, 520);

      if (Math.random() > 0.55) {
        spawnVein(random(80, window.innerWidth - 80), random(80, window.innerHeight - 80), true);
      }
    }, 2400);
  }

  function startRandomCorruption() {
    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;

      const page = getPage();
      if (!page) return;

      page.classList.add("blood-random-corruption");

      setTimeout(() => {
        page.classList.remove("blood-random-corruption");
      }, 480);
    }, 5200);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = getPage();
    if (!page) return;

    console.info("[SANGUE] efeitos carregados com sucesso.");

    createLayer();
    createAmbientVeins();
    createAmbientDrops();
    createHeartbeatFlash();

    updateStats("Arquivo acordado");
    revealLines();

    bindActions();
    bindPointerTrail();
    bindCore();

    startAmbientPulse();
    startRandomCorruption();

    page.classList.add("blood-effects-ready");
  });
})();
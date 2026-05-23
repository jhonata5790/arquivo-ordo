(() => {
  "use strict";

  console.log("[SANGUE] sangue.js executou de verdade.");

  const page = document.querySelector(".blood-element-page");

  if (!page) {
    console.warn("[SANGUE] Página de Sangue não encontrada.");
    return;
  }

  const state = {
    pulse: 3,
    integrity: 68,
    contamination: 41,
    lastMove: 0
  };

  const corruptedLines = [
    "Reconstrução falhou. O fragmento retornou mais corrompido que antes.",
    "O arquivo reagiu ao operador. Batimento externo detectado.",
    "A interface criou novas veias ao redor da leitura.",
    "O Sangue não foi lido. Ele leu de volta.",
    "Tentativa de contenção recusada. O fluxo encontrou outro caminho.",
    "A margem do documento contraiu como tecido vivo.",
    "O Coração Amaldiçoado não pulsa dentro do arquivo. O arquivo pulsa ao redor dele."
  ];

  const statusLines = [
    "Vivo demais",
    "Pulsando",
    "Fome detectada",
    "Tecido reativo",
    "Instinto ativo",
    "Contenção falhando",
    "Resposta predatória"
  ];

  function safeClosest(event, selector) {
    const target = event.target;

    if (!target || !(target instanceof Element)) {
      return null;
    }

    return target.closest(selector);
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function injectBloodCss() {
    if (document.querySelector("#blood-js-emergency-css")) return;

    const style = document.createElement("style");
    style.id = "blood-js-emergency-css";

    style.textContent = `
      .blood-js-layer {
        position: fixed;
        inset: 0;
        z-index: 999999;
        pointer-events: none;
        overflow: hidden;
      }

      .blood-js-vein-field {
        position: fixed;
        inset: 0;
        z-index: 999995;
        pointer-events: none;
        overflow: hidden;
        mix-blend-mode: screen;
      }

      .blood-js-vein-field span {
        position: absolute;
        height: 2px;
        width: var(--w, 260px);
        left: var(--x);
        top: var(--y);
        rotate: var(--r);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 20, 65, .3),
          rgba(255, 20, 65, .95),
          rgba(95, 0, 18, .75),
          transparent
        );
        filter:
          drop-shadow(0 0 8px rgba(255, 20, 65, .9))
          drop-shadow(0 0 24px rgba(255, 20, 65, .45));
        opacity: var(--o, .45);
        animation: bloodJsVeinPulse 3s ease-in-out infinite;
      }

      .blood-js-vein-field span::before,
      .blood-js-vein-field span::after,
      .blood-js-vein::before,
      .blood-js-vein::after {
        content: "";
        position: absolute;
        left: 42%;
        top: 0;
        width: 50%;
        height: 1px;
        background: rgba(255, 20, 65, .75);
        transform-origin: left center;
      }

      .blood-js-vein-field span::before,
      .blood-js-vein::before {
        rotate: 27deg;
      }

      .blood-js-vein-field span::after,
      .blood-js-vein::after {
        rotate: -31deg;
      }

      .blood-js-rain {
        position: fixed;
        inset: 0;
        z-index: 999996;
        pointer-events: none;
        overflow: hidden;
      }

      .blood-js-rain span {
        position: absolute;
        top: -40px;
        left: var(--x);
        width: 6px;
        height: 16px;
        border-radius: 999px 999px 999px 18px;
        background:
          radial-gradient(circle at 35% 20%, rgba(255,255,255,.95), transparent 22%),
          linear-gradient(180deg, #ff3158, #61000f);
        box-shadow: 0 0 14px rgba(255, 20, 65, .75);
        opacity: .78;
        animation: bloodJsRain var(--d, 8s) linear infinite;
        animation-delay: var(--delay, 0s);
      }

      .blood-js-flash {
        position: fixed;
        inset: 0;
        z-index: 999994;
        pointer-events: none;
        background:
          radial-gradient(circle at center, transparent 0 34%, rgba(255, 20, 65, .18) 35% 38%, transparent 39%),
          radial-gradient(circle at center, rgba(255, 20, 65, .2), transparent 52%);
        opacity: 0;
        animation: bloodJsFlash 2.2s ease-in-out infinite;
      }

      .blood-js-drop {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: var(--size, 9px);
        height: calc(var(--size, 9px) * 1.65);
        border-radius: 999px 999px 999px 18px;
        background:
          radial-gradient(circle at 35% 20%, rgba(255,255,255,.95), transparent 20%),
          linear-gradient(180deg, #ff4166, #5c0010);
        box-shadow:
          0 0 12px rgba(255, 20, 65, .9),
          0 0 28px rgba(255, 20, 65, .35);
        transform: translate(-50%, -50%);
        animation: bloodJsDrop 1.35s ease forwards;
      }

      .blood-js-vein {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: var(--w, 160px);
        height: 3px;
        rotate: var(--r);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 20, 65, 1),
          rgba(100, 0, 20, .95),
          transparent
        );
        box-shadow:
          0 0 12px rgba(255, 20, 65, .95),
          0 0 30px rgba(255, 20, 65, .45);
        transform-origin: left center;
        animation: bloodJsVein 1.2s ease forwards;
      }

      .blood-js-shockwave {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: 30px;
        height: 30px;
        border: 2px solid rgba(255, 20, 65, .98);
        border-radius: 50%;
        box-shadow:
          0 0 22px rgba(255, 20, 65, .9),
          inset 0 0 16px rgba(255, 20, 65, .5);
        transform: translate(-50%, -50%);
        animation: bloodJsShockwave .95s ease forwards;
      }

      .blood-js-screen-pulse {
        animation: bloodJsScreenPulse .8s ease both;
      }

      .blood-fragment-line.blood-js-hit {
        animation: bloodJsLineHit .7s ease both;
      }

      .blood-fragment-line.blood-js-new-line {
        opacity: 1 !important;
        transform: none !important;
        border-left-color: #ff1646 !important;
        box-shadow:
          inset 0 0 30px rgba(255, 20, 65, .18),
          0 0 28px rgba(255, 20, 65, .16);
        animation: bloodJsNewLine .8s ease both;
      }

      @keyframes bloodJsVeinPulse {
        0%, 100% {
          transform: scaleX(.92);
          filter:
            drop-shadow(0 0 5px rgba(255, 20, 65, .55))
            drop-shadow(0 0 16px rgba(255, 20, 65, .25));
        }

        50% {
          transform: scaleX(1.08);
          filter:
            drop-shadow(0 0 12px rgba(255, 20, 65, 1))
            drop-shadow(0 0 34px rgba(255, 20, 65, .5));
        }
      }

      @keyframes bloodJsRain {
        0% {
          translate: 0 -60px;
          opacity: 0;
        }

        10% {
          opacity: .85;
        }

        100% {
          translate: 0 calc(100vh + 100px);
          opacity: 0;
        }
      }

      @keyframes bloodJsFlash {
        0%, 74%, 100% {
          opacity: 0;
          transform: scale(1);
        }

        80% {
          opacity: .75;
          transform: scale(1.07);
        }

        86% {
          opacity: .18;
          transform: scale(1.01);
        }
      }

      @keyframes bloodJsDrop {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) translate(0, 0) scale(1);
        }

        12% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform:
            translate(-50%, -50%)
            translate(var(--dx), var(--dy))
            scale(.72);
        }
      }

      @keyframes bloodJsVein {
        0% {
          opacity: 0;
          transform: scaleX(.05);
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: scaleX(1.15);
        }
      }

      @keyframes bloodJsShockwave {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(.2);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(20);
        }
      }

      @keyframes bloodJsScreenPulse {
        0%, 100% {
          filter: none;
          transform: scale(1);
        }

        25% {
          filter: brightness(1.45) saturate(1.65);
          transform: scale(1.006);
        }

        55% {
          filter: brightness(1.08) saturate(1.2);
          transform: scale(1);
        }
      }

      @keyframes bloodJsLineHit {
        0%, 100% {
          transform: translateX(0);
        }

        35% {
          transform: translateX(8px);
          box-shadow:
            inset 0 0 32px rgba(255, 20, 65, .2),
            0 0 28px rgba(255, 20, 65, .18);
        }

        60% {
          transform: translateX(-4px);
        }
      }

      @keyframes bloodJsNewLine {
        0% {
          opacity: 0;
          transform: translateY(14px) scale(.98);
          filter: brightness(2) saturate(2);
        }

        60% {
          opacity: 1;
          transform: translateY(0) scale(1.015);
        }

        100% {
          opacity: 1;
          transform: none;
          filter: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function createLayer(className) {
    let layer = document.querySelector(`.${className}`);

    if (!layer) {
      layer = document.createElement("div");
      layer.className = className;
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
    }

    return layer;
  }

  function updateStats(status) {
    state.pulse = Math.max(1, Math.min(12, state.pulse));
    state.integrity = Math.max(1, Math.min(100, state.integrity));
    state.contamination = Math.max(0, Math.min(100, state.contamination));

    const pulseEl = document.querySelector("[data-blood-pulse]");
    const integrityEl = document.querySelector("[data-blood-integrity]");
    const contaminationEl = document.querySelector("[data-blood-contamination]");
    const statusEl = document.querySelector("[data-blood-status]");

    if (pulseEl) pulseEl.textContent = `${state.pulse} BPM PARANORMAL`;
    if (integrityEl) integrityEl.textContent = `${state.integrity}%`;
    if (contaminationEl) contaminationEl.textContent = `${state.contamination}%`;
    if (statusEl) statusEl.textContent = status || pick(statusLines);
  }

  function spawnDrop(x, y, intense = false) {
    const layer = createLayer("blood-js-layer");
    const drop = document.createElement("span");

    drop.className = "blood-js-drop";
    drop.style.setProperty("--x", `${x + random(-20, 20)}px`);
    drop.style.setProperty("--y", `${y + random(-16, 16)}px`);
    drop.style.setProperty("--dx", `${random(-55, 55)}px`);
    drop.style.setProperty("--dy", `${random(95, 190)}px`);
    drop.style.setProperty("--size", intense ? `${random(10, 15)}px` : `${random(6, 10)}px`);

    layer.appendChild(drop);

    setTimeout(() => drop.remove(), 1400);
  }

  function spawnVein(x, y, strong = false) {
    const layer = createLayer("blood-js-layer");
    const vein = document.createElement("span");

    vein.className = "blood-js-vein";
    vein.style.setProperty("--x", `${x}px`);
    vein.style.setProperty("--y", `${y}px`);
    vein.style.setProperty("--w", strong ? `${random(200, 420)}px` : `${random(100, 220)}px`);
    vein.style.setProperty("--r", `${random(-65, 65)}deg`);

    layer.appendChild(vein);

    setTimeout(() => vein.remove(), 1300);
  }

  function spawnShockwave(x, y) {
    const layer = createLayer("blood-js-layer");
    const wave = document.createElement("span");

    wave.className = "blood-js-shockwave";
    wave.style.setProperty("--x", `${x}px`);
    wave.style.setProperty("--y", `${y}px`);

    layer.appendChild(wave);

    setTimeout(() => wave.remove(), 1000);
  }

  function createAmbientVeins() {
    const field = createLayer("blood-js-vein-field");
    field.innerHTML = "";

    for (let i = 0; i < 38; i++) {
      const vein = document.createElement("span");

      vein.style.setProperty("--x", `${random(-8, 100)}%`);
      vein.style.setProperty("--y", `${random(0, 100)}%`);
      vein.style.setProperty("--w", `${random(130, 430)}px`);
      vein.style.setProperty("--r", `${random(-75, 75)}deg`);
      vein.style.setProperty("--o", random(.18, .58).toFixed(2));
      vein.style.animationDelay = `${random(-4, 0)}s`;

      field.appendChild(vein);
    }
  }

  function createRain() {
    const rain = createLayer("blood-js-rain");
    rain.innerHTML = "";

    for (let i = 0; i < 46; i++) {
      const drop = document.createElement("span");

      drop.style.setProperty("--x", `${random(0, 100)}%`);
      drop.style.setProperty("--d", `${random(5, 12)}s`);
      drop.style.setProperty("--delay", `${random(-12, 0)}s`);

      rain.appendChild(drop);
    }
  }

  function createHeartbeatFlash() {
    createLayer("blood-js-flash");
  }

  function hitLines() {
    document.querySelectorAll(".blood-fragment-line").forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("blood-js-hit");

        setTimeout(() => {
          line.classList.remove("blood-js-hit");
        }, 750);
      }, index * 45);
    });
  }

  function addCorruptedLine(label) {
    const list = document.querySelector("[data-blood-fragments]");
    if (!list) return;

    const line = document.createElement("p");

    line.className = "blood-fragment-line blood-js-new-line";
    line.innerHTML = `<span>${label}</span>${pick(corruptedLines)}`;

    list.appendChild(line);

    line.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function pulseScreen() {
    page.classList.remove("blood-js-screen-pulse");
    void page.offsetWidth;
    page.classList.add("blood-js-screen-pulse");

    setTimeout(() => {
      page.classList.remove("blood-js-screen-pulse");
    }, 900);
  }

  function bloodExplosion(x, y) {
    spawnShockwave(x, y);

    for (let i = 0; i < 20; i++) {
      spawnDrop(x, y, i % 2 === 0);
    }

    for (let i = 0; i < 8; i++) {
      spawnVein(x + random(-140, 140), y + random(-90, 90), true);
    }
  }

  function handleBloodAction(action, event) {
    const x = event.clientX || window.innerWidth / 2;
    const y = event.clientY || window.innerHeight / 2;

    if (action === "pulse") {
      state.pulse += 2;
      state.contamination += 8;
      state.integrity -= 5;

      updateStats("Batimento forçado");
      bloodExplosion(x, y);
      hitLines();
      addCorruptedLine("BATIMENTO FORÇADO");
      pulseScreen();
    }

    if (action === "seal") {
      state.pulse = Math.max(1, state.pulse - 1);
      state.contamination += 6;
      state.integrity -= 9;

      updateStats("Estancamento recusado");

      for (let i = 0; i < 14; i++) {
        spawnVein(x + random(-220, 220), y + random(-140, 140), true);
      }

      spawnShockwave(x, y);
      hitLines();
      addCorruptedLine("ESTANCAMENTO FALHOU");
      pulseScreen();
    }

    if (action === "sample") {
      state.pulse += 1;
      state.contamination += 5;
      state.integrity -= 4;

      updateStats("Amostra instável");

      for (let i = 0; i < 34; i++) {
        spawnDrop(x, y, true);
      }

      spawnShockwave(x, y);
      addCorruptedLine("AMOSTRA COLETADA");
      pulseScreen();
    }
  }

  function bindEvents() {
    document.addEventListener("click", event => {
      const button = safeClosest(event, "[data-blood-action]");

      if (button) {
        handleBloodAction(button.dataset.bloodAction, event);
        return;
      }

      spawnShockwave(event.clientX, event.clientY);

      for (let i = 0; i < 6; i++) {
        spawnDrop(event.clientX, event.clientY, i % 2 === 0);
      }
    });

    document.addEventListener("pointermove", event => {
      const now = performance.now();

      page.style.setProperty("--cursor-x", `${event.clientX}px`);
      page.style.setProperty("--cursor-y", `${event.clientY}px`);

      if (now - state.lastMove < 70) return;

      state.lastMove = now;

      spawnDrop(event.clientX, event.clientY, false);

      if (Math.random() > .58) {
        spawnVein(event.clientX + random(-40, 40), event.clientY + random(-40, 40), false);
      }
    }, { passive: true });

    const core = document.querySelector("[data-blood-core]");

    if (core) {
      core.addEventListener("pointerenter", event => {
        bloodExplosion(event.clientX, event.clientY);
        updateStats("Órgão ritualístico ativo");
        hitLines();
      });
    }
  }

  function startAmbientPulse() {
    setInterval(() => {
      if (document.hidden) return;

      pulseScreen();

      if (Math.random() > .5) {
        spawnVein(
          random(80, window.innerWidth - 80),
          random(80, window.innerHeight - 80),
          true
        );
      }
    }, 2600);
  }

  function init() {
    injectBloodCss();
    createLayer("blood-js-layer");
    createAmbientVeins();
    createRain();
    createHeartbeatFlash();

    updateStats("Arquivo acordado");
    bindEvents();
    startAmbientPulse();

    page.classList.add("blood-js-active");

    console.log("[SANGUE] efeitos visíveis ativados.");
  }

  init();
})();
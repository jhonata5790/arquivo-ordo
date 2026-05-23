(() => {
  "use strict";

  console.log("[MORTE] morte.js executou de verdade.");

  const page =
    document.querySelector(".death-element-page") ||
    document.querySelector("[data-element-page='death']") ||
    document.body;

  if (!page) {
    console.warn("[MORTE] Página de Morte não encontrada.");
    return;
  }

  const state = {
    decay: 27,
    cycle: 1,
    erosion: 39,
    lastMove: 0
  };

  const fragments = [
    "Tentativa de retorno falhou. O fragmento voltou diferente do que era.",
    "O tempo não apagou o arquivo. Ele apenas o desgastou até ficar legível de outro jeito.",
    "A linha recuperada apresenta idade incompatível com o momento da leitura.",
    "O documento perdeu partes de si mesmo durante a reconstrução.",
    "O ciclo iniciou antes do comando ser confirmado.",
    "Nada que é levado pela Morte pode voltar ao que era antes.",
    "A poeira registrada não pertence ao ambiente físico.",
    "O relógio marcou um horário que ainda não aconteceu."
  ];

  const statuses = [
    "Erodindo",
    "Ciclo ativo",
    "Tempo atrasado",
    "Decadência estável",
    "Retorno impossível",
    "Memória deteriorada",
    "Fim em progresso"
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

  function injectCss() {
    if (document.querySelector("#death-js-css")) return;

    const style = document.createElement("style");
    style.id = "death-js-css";

    style.textContent = `
      .death-js-layer,
      .death-dust-field,
      .death-clock-field,
      .death-vignette-field {
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .death-js-layer {
        z-index: 999999;
      }

      .death-dust-field {
        z-index: 999991;
        opacity: .85;
        mix-blend-mode: screen;
      }

      .death-clock-field {
        z-index: 999990;
        opacity: .42;
        mix-blend-mode: screen;
      }

      .death-vignette-field {
        z-index: 999989;
        background:
          radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(155, 191, 122, .16), transparent 13rem),
          radial-gradient(circle at center, transparent 0 48%, rgba(0, 0, 0, .72) 100%);
      }

      .death-dust-field span {
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: var(--s);
        height: var(--s);
        border-radius: 50%;
        background: rgba(202, 218, 174, .72);
        box-shadow: 0 0 10px rgba(155, 191, 122, .45);
        animation: deathAmbientDust var(--d) ease-in-out infinite;
        animation-delay: var(--delay);
      }

      .death-clock-field span {
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: var(--size);
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1px solid rgba(155, 191, 122, .32);
        box-shadow:
          inset 0 0 20px rgba(155, 191, 122, .06),
          0 0 20px rgba(155, 191, 122, .14);
        animation: deathClockTurn var(--d) linear infinite;
        animation-delay: var(--delay);
      }

      .death-clock-field span::before,
      .death-clock-field span::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 1px;
        background: rgba(155, 191, 122, .55);
        transform-origin: bottom center;
      }

      .death-clock-field span::before {
        height: 34%;
        transform: translate(-50%, -100%) rotate(40deg);
      }

      .death-clock-field span::after {
        height: 24%;
        transform: translate(-50%, -100%) rotate(140deg);
      }

      .death-js-dust {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: var(--s);
        height: var(--s);
        border-radius: 50%;
        background: rgba(207, 220, 183, .82);
        box-shadow:
          0 0 8px rgba(155, 191, 122, .65),
          0 0 20px rgba(155, 191, 122, .22);
        transform: translate(-50%, -50%);
        animation: deathDustBurst 1.8s ease forwards;
      }

      .death-js-ring {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: 34px;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1px solid rgba(155, 191, 122, .9);
        box-shadow:
          0 0 18px rgba(155, 191, 122, .6),
          inset 0 0 12px rgba(155, 191, 122, .28);
        transform: translate(-50%, -50%);
        animation: deathTimeRing 1.25s ease forwards;
      }

      .death-js-symbol {
        position: fixed;
        left: var(--x);
        top: var(--y);
        color: rgba(202, 218, 174, .9);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: var(--s);
        text-shadow:
          0 0 12px rgba(155, 191, 122, .8),
          0 0 30px rgba(155, 191, 122, .32);
        transform: translate(-50%, -50%) rotate(var(--r));
        animation: deathSymbolFade 1.4s ease forwards;
      }

      .death-js-page-decay {
        animation: deathPageDecay .95s ease both;
      }

      .death-js-page-return {
        animation: deathReturnFail .9s ease both;
      }

      .death-js-page-cycle {
        animation: deathCyclePulse 1.1s ease both;
      }

      .death-js-line {
        opacity: 1 !important;
        transform: none !important;
        border-left-color: rgba(155, 191, 122, .95) !important;
        color: rgba(220, 230, 200, .72) !important;
        box-shadow:
          inset 0 0 24px rgba(155, 191, 122, .1),
          0 0 24px rgba(155, 191, 122, .1);
        animation: deathNewLine 1s ease both;
      }

      .death-line-eroded {
        opacity: .52 !important;
        filter: grayscale(.45) sepia(.16);
        text-decoration: line-through;
        text-decoration-color: rgba(155, 191, 122, .42);
      }

      .death-line-hit {
        animation: deathLineHit .9s ease both;
      }

      @keyframes deathAmbientDust {
        0%, 100% {
          transform: translateY(0) translateX(0);
          opacity: .18;
        }

        50% {
          transform: translateY(-34px) translateX(12px);
          opacity: .82;
        }
      }

      @keyframes deathClockTurn {
        from {
          transform: rotate(0deg) scale(.95);
        }

        to {
          transform: rotate(360deg) scale(.95);
        }
      }

      @keyframes deathDustBurst {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) translate(0, 0) scale(.3);
        }

        15% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform:
            translate(-50%, -50%)
            translate(var(--dx), var(--dy))
            scale(1.4);
        }
      }

      @keyframes deathTimeRing {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(.25) rotate(0deg);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(17) rotate(70deg);
        }
      }

      @keyframes deathSymbolFade {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) scale(.5);
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) rotate(calc(var(--r) + 40deg)) scale(1.2);
        }
      }

      @keyframes deathPageDecay {
        0%, 100% {
          filter: none;
        }

        35% {
          filter: grayscale(.55) sepia(.22) brightness(.85);
        }

        65% {
          filter: grayscale(.2) sepia(.12);
        }
      }

      @keyframes deathReturnFail {
        0%, 100% {
          transform: translateX(0);
          filter: none;
        }

        28% {
          transform: translateX(-5px);
          filter: blur(1px) grayscale(.8);
        }

        54% {
          transform: translateX(4px);
          filter: brightness(.8) sepia(.3);
        }
      }

      @keyframes deathCyclePulse {
        0%, 100% {
          filter: none;
          transform: scale(1);
        }

        38% {
          filter: brightness(1.18) sepia(.22);
          transform: scale(1.006);
        }
      }

      @keyframes deathNewLine {
        0% {
          opacity: 0;
          transform: translateY(14px);
          filter: blur(6px) grayscale(1);
        }

        100% {
          opacity: 1;
          transform: none;
          filter: none;
        }
      }

      @keyframes deathLineHit {
        0%, 100% {
          transform: translateX(0);
          filter: none;
        }

        40% {
          transform: translateX(-4px);
          filter: grayscale(.7) brightness(.8);
        }

        70% {
          transform: translateX(2px);
        }
      }
    `;

    document.head.appendChild(style);
  }

  function updateStats(status) {
    const decayEl = document.querySelector("[data-death-decay]");
    const cycleEl = document.querySelector("[data-death-cycle]");
    const erosionEl = document.querySelector("[data-death-erosion]");
    const statusEl = document.querySelector("[data-death-status]");

    state.decay = Math.max(0, Math.min(100, state.decay));
    state.erosion = Math.max(0, Math.min(100, state.erosion));
    state.cycle = Math.max(1, Math.min(99, state.cycle));

    if (decayEl) decayEl.textContent = `${state.decay}%`;
    if (cycleEl) cycleEl.textContent = `Ciclo ${state.cycle}`;
    if (erosionEl) erosionEl.textContent = `${state.erosion}%`;
    if (statusEl) statusEl.textContent = status || pick(statuses);
  }

  function createAmbientDust() {
    const field = createLayer("death-dust-field");
    field.innerHTML = "";

    for (let i = 0; i < 110; i++) {
      const dust = document.createElement("span");

      dust.style.setProperty("--x", `${random(0, 100)}%`);
      dust.style.setProperty("--y", `${random(0, 100)}%`);
      dust.style.setProperty("--s", `${random(1, 4)}px`);
      dust.style.setProperty("--d", `${random(6, 18)}s`);
      dust.style.setProperty("--delay", `${random(-16, 0)}s`);

      field.appendChild(dust);
    }
  }

  function createClockField() {
    const field = createLayer("death-clock-field");
    field.innerHTML = "";

    for (let i = 0; i < 11; i++) {
      const clock = document.createElement("span");

      clock.style.setProperty("--x", `${random(4, 88)}%`);
      clock.style.setProperty("--y", `${random(6, 84)}%`);
      clock.style.setProperty("--size", `${random(70, 190)}px`);
      clock.style.setProperty("--d", `${random(12, 32)}s`);
      clock.style.setProperty("--delay", `${random(-22, 0)}s`);

      field.appendChild(clock);
    }
  }

  function spawnDust(x, y, intense = false) {
    const layer = createLayer("death-js-layer");
    const dust = document.createElement("span");

    dust.className = "death-js-dust";
    dust.style.setProperty("--x", `${x + random(-30, 30)}px`);
    dust.style.setProperty("--y", `${y + random(-24, 24)}px`);
    dust.style.setProperty("--dx", `${random(-90, 90)}px`);
    dust.style.setProperty("--dy", `${random(-130, 80)}px`);
    dust.style.setProperty("--s", intense ? `${random(4, 9)}px` : `${random(2, 5)}px`);

    layer.appendChild(dust);
    setTimeout(() => dust.remove(), 1900);
  }

  function spawnRing(x, y) {
    const layer = createLayer("death-js-layer");
    const ring = document.createElement("span");

    ring.className = "death-js-ring";
    ring.style.setProperty("--x", `${x}px`);
    ring.style.setProperty("--y", `${y}px`);

    layer.appendChild(ring);
    setTimeout(() => ring.remove(), 1300);
  }

  function spawnSymbol(x, y) {
    const layer = createLayer("death-js-layer");
    const symbol = document.createElement("span");
    const symbols = ["⌛", "◷", "◴", "◵", "◶", "∞", "I", "XII"];

    symbol.className = "death-js-symbol";
    symbol.textContent = pick(symbols);
    symbol.style.setProperty("--x", `${x + random(-35, 35)}px`);
    symbol.style.setProperty("--y", `${y + random(-35, 35)}px`);
    symbol.style.setProperty("--s", `${random(.9, 1.8)}rem`);
    symbol.style.setProperty("--r", `${random(-60, 60)}deg`);
    symbol.style.setProperty("--dx", `${random(-70, 70)}px`);
    symbol.style.setProperty("--dy", `${random(-90, 60)}px`);

    layer.appendChild(symbol);
    setTimeout(() => symbol.remove(), 1500);
  }

  function addLine(label) {
    const list =
      document.querySelector("[data-death-fragments]") ||
      document.querySelector(".death-fragments") ||
      document.querySelector(".element-fragments");

    if (!list) return;

    const line = document.createElement("p");

    line.className = "death-js-line";
    line.innerHTML = `<span>${label}</span>${pick(fragments)}`;

    list.appendChild(line);
    line.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hitLines(erode = false) {
    const lines = document.querySelectorAll(".death-fragment-line, .element-fragments p, .element-main-file p");

    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("death-line-hit");

        if (erode && Math.random() > 0.55) {
          line.classList.add("death-line-eroded");
        }

        setTimeout(() => {
          line.classList.remove("death-line-hit");
        }, 900);
      }, index * 45);
    });
  }

  function pulsePage(type) {
    page.classList.remove("death-js-page-decay", "death-js-page-return", "death-js-page-cycle");
    void page.offsetWidth;
    page.classList.add(type);

    setTimeout(() => {
      page.classList.remove(type);
    }, 1200);
  }

  function accelerateDecay(event) {
    const x = event.clientX || innerWidth / 2;
    const y = event.clientY || innerHeight / 2;

    state.decay += 13;
    state.erosion += 9;

    updateStats("Decadência acelerada");
    pulsePage("death-js-page-decay");
    hitLines(true);
    addLine("DECADÊNCIA ACELERADA");

    spawnRing(x, y);

    for (let i = 0; i < 55; i++) {
      spawnDust(x, y, true);
    }

    for (let i = 0; i < 8; i++) {
      spawnSymbol(x, y);
    }
  }

  function tryReturn(event) {
    const x = event.clientX || innerWidth / 2;
    const y = event.clientY || innerHeight / 2;

    state.decay += 7;
    state.erosion += 14;

    updateStats("Retorno falhou");
    pulsePage("death-js-page-return");
    hitLines(true);
    addLine("RETORNO IMPOSSÍVEL");

    for (let i = 0; i < 2; i++) spawnRing(x + random(-40, 40), y + random(-40, 40));
    for (let i = 0; i < 38; i++) spawnDust(x, y, i % 2 === 0);
  }

  function startCycle(event) {
    const x = event.clientX || innerWidth / 2;
    const y = event.clientY || innerHeight / 2;

    state.cycle += 1;
    state.decay += 5;
    state.erosion += 5;

    updateStats("Novo ciclo iniciado");
    pulsePage("death-js-page-cycle");
    addLine("CICLO INICIADO");

    for (let i = 0; i < 4; i++) spawnRing(x + random(-80, 80), y + random(-80, 80));
    for (let i = 0; i < 14; i++) spawnSymbol(x, y);
  }

  function bindEvents() {
    document.addEventListener("click", event => {
      const button = safeClosest(event, "[data-death-action]");
      const action = button?.dataset.deathAction;

      if (action === "decay") return accelerateDecay(event);
      if (action === "return") return tryReturn(event);
      if (action === "cycle") return startCycle(event);

      spawnRing(event.clientX, event.clientY);

      for (let i = 0; i < 18; i++) {
        spawnDust(event.clientX, event.clientY, false);
      }
    });

    document.addEventListener("pointermove", event => {
      page.style.setProperty("--cursor-x", `${event.clientX}px`);
      page.style.setProperty("--cursor-y", `${event.clientY}px`);

      const now = performance.now();

      if (now - state.lastMove < 120) return;

      state.lastMove = now;

      if (Math.random() > 0.35) {
        spawnDust(event.clientX, event.clientY, false);
      }

      if (Math.random() > 0.86) {
        spawnSymbol(event.clientX, event.clientY);
      }
    }, { passive: true });
  }

  function ambientCycle() {
    setInterval(() => {
      if (document.hidden) return;

      spawnSymbol(random(80, innerWidth - 80), random(80, innerHeight - 80));

      if (Math.random() > 0.58) {
        hitLines(false);
      }
    }, 4200);
  }

  function init() {
    injectCss();

    createLayer("death-js-layer");
    createLayer("death-vignette-field");
    createAmbientDust();
    createClockField();

    updateStats("Arquivo envelhecendo");
    bindEvents();
    ambientCycle();

    page.classList.add("death-js-active");

    console.log("[MORTE] efeitos visíveis ativados.");
  }

  init();
})();
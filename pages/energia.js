(() => {
  "use strict";

  console.log("[ENERGIA] energia.js executou de verdade.");

  const page =
    document.querySelector(".energy-element-page") ||
    document.querySelector("[data-element-page='energy']") ||
    document.body;

  if (!page) return;

  const state = {
    instability: 48,
    voltage: 13,
    corruption: 31,
    lastMove: 0
  };

  const glitches = [
    "ERRO: o arquivo mudou antes da leitura terminar.",
    "Reconfiguração parcial concluída com falhas.",
    "Pacote corrompido aceito como resposta válida.",
    "O caos reorganizou as linhas em ordem impossível.",
    "Sobrecarga detectada. A Ordo recomenda afastar o operador.",
    "O arquivo não estabiliza porque estabilidade não é sua função.",
    "O caos é inevitável."
  ];

  function safeClosest(event, selector) {
    const target = event.target;
    if (!target || !(target instanceof Element)) return null;
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
    if (document.querySelector("#energy-js-css")) return;

    const style = document.createElement("style");
    style.id = "energy-js-css";

    style.textContent = `
      .energy-js-layer,
      .energy-grid-field,
      .energy-slice-field {
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .energy-js-layer {
        z-index: 999999;
      }

      .energy-grid-field {
        z-index: 999990;
        opacity: .5;
        background:
          linear-gradient(90deg, rgba(43,231,255,.08) 1px, transparent 1px),
          linear-gradient(180deg, rgba(255,47,201,.06) 1px, transparent 1px);
        background-size: 34px 34px;
        animation: energyGridMove 1.4s linear infinite;
        mix-blend-mode: screen;
      }

      .energy-spark {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: var(--w);
        height: 3px;
        background: linear-gradient(90deg, transparent, #2be7ff, #ff2fc9, transparent);
        rotate: var(--r);
        box-shadow:
          0 0 12px rgba(43,231,255,.9),
          0 0 28px rgba(255,47,201,.45);
        animation: energySpark .75s ease forwards;
      }

      .energy-glitch-slice {
        position: fixed;
        left: 0;
        top: var(--y);
        width: 100vw;
        height: var(--h);
        background:
          linear-gradient(90deg, transparent, rgba(43,231,255,.22), rgba(255,47,201,.18), transparent);
        transform: translateX(var(--dx));
        mix-blend-mode: screen;
        animation: energySlice .38s steps(2) forwards;
      }

      .energy-bit {
        position: fixed;
        left: var(--x);
        top: var(--y);
        color: #2be7ff;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: var(--s);
        text-shadow:
          0 0 10px rgba(43,231,255,.9),
          0 0 28px rgba(255,47,201,.35);
        animation: energyBitFly 1s ease forwards;
      }

      .energy-js-page {
        animation: energyPageGlitch .75s steps(2) both;
      }

      .energy-js-line {
        opacity: 1 !important;
        transform: none !important;
        border-left-color: #2be7ff !important;
        box-shadow:
          inset 0 0 26px rgba(43,231,255,.12),
          0 0 24px rgba(255,47,201,.12);
        animation: energyLineNew .65s steps(2) both;
      }

      .energy-hit {
        animation: energyHit .45s steps(2) both;
      }

      @keyframes energyGridMove {
        from { background-position: 0 0; }
        to { background-position: 34px 34px; }
      }

      @keyframes energySpark {
        0% {
          opacity: 0;
          transform: scaleX(.1);
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(var(--dx), var(--dy)) scaleX(1.4);
        }
      }

      @keyframes energySlice {
        0% {
          opacity: 0;
          filter: hue-rotate(0deg);
        }

        30% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          filter: hue-rotate(90deg);
        }
      }

      @keyframes energyBitFly {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(.6);
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(var(--dx), var(--dy)) scale(1.3);
        }
      }

      @keyframes energyPageGlitch {
        0%, 100% {
          filter: none;
          transform: translateX(0);
        }

        20% {
          filter: contrast(1.5) saturate(1.6);
          transform: translateX(5px);
        }

        40% {
          transform: translateX(-4px);
        }

        60% {
          filter: hue-rotate(24deg) brightness(1.25);
          transform: translateX(2px);
        }
      }

      @keyframes energyLineNew {
        0% {
          opacity: 0;
          transform: translateX(-18px);
          filter: blur(4px) hue-rotate(80deg);
        }

        100% {
          opacity: 1;
          transform: none;
          filter: none;
        }
      }

      @keyframes energyHit {
        0%, 100% {
          transform: translateX(0);
          filter: none;
        }

        35% {
          transform: translateX(8px);
          filter: brightness(1.4) hue-rotate(40deg);
        }

        65% {
          transform: translateX(-5px);
        }
      }
    `;

    document.head.appendChild(style);
  }

  function updateStats(status) {
    const instabilityEl = document.querySelector("[data-energy-instability]");
    const voltageEl = document.querySelector("[data-energy-voltage]");
    const corruptionEl = document.querySelector("[data-energy-corruption]");
    const statusEl = document.querySelector("[data-energy-status]");

    if (instabilityEl) instabilityEl.textContent = `${state.instability}%`;
    if (voltageEl) voltageEl.textContent = `${state.voltage} kV`;
    if (corruptionEl) corruptionEl.textContent = `${state.corruption}%`;
    if (statusEl) statusEl.textContent = status || "Instável";
  }

  function spawnSpark(x, y, strong = false) {
    const layer = createLayer("energy-js-layer");
    const spark = document.createElement("span");

    spark.className = "energy-spark";
    spark.style.setProperty("--x", `${x + random(-22, 22)}px`);
    spark.style.setProperty("--y", `${y + random(-22, 22)}px`);
    spark.style.setProperty("--w", strong ? `${random(110, 260)}px` : `${random(50, 150)}px`);
    spark.style.setProperty("--r", `${random(-80, 80)}deg`);
    spark.style.setProperty("--dx", `${random(-70, 70)}px`);
    spark.style.setProperty("--dy", `${random(-70, 70)}px`);

    layer.appendChild(spark);
    setTimeout(() => spark.remove(), 850);
  }

  function spawnBit(x, y) {
    const layer = createLayer("energy-js-layer");
    const bit = document.createElement("span");

    bit.className = "energy-bit";
    bit.textContent = Math.random() > .5 ? "01" : "ERR";
    bit.style.setProperty("--x", `${x + random(-28, 28)}px`);
    bit.style.setProperty("--y", `${y + random(-28, 28)}px`);
    bit.style.setProperty("--s", `${random(.75, 1.5)}rem`);
    bit.style.setProperty("--dx", `${random(-120, 120)}px`);
    bit.style.setProperty("--dy", `${random(-120, 80)}px`);

    layer.appendChild(bit);
    setTimeout(() => bit.remove(), 1100);
  }

  function spawnSlice() {
    const layer = createLayer("energy-js-layer");
    const slice = document.createElement("span");

    slice.className = "energy-glitch-slice";
    slice.style.setProperty("--y", `${random(0, innerHeight)}px`);
    slice.style.setProperty("--h", `${random(8, 42)}px`);
    slice.style.setProperty("--dx", `${random(-28, 28)}px`);

    layer.appendChild(slice);
    setTimeout(() => slice.remove(), 450);
  }

  function addLine(label) {
    const list =
      document.querySelector("[data-energy-fragments]") ||
      document.querySelector(".energy-fragments") ||
      document.querySelector(".element-fragments");

    if (!list) return;

    const line = document.createElement("p");
    line.className = "energy-js-line";
    line.innerHTML = `<span>${label}</span>${pick(glitches)}`;
    list.appendChild(line);
    line.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hitText() {
    document.querySelectorAll(".energy-fragment-line, .element-fragments p, .element-main-file p").forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("energy-hit");
        setTimeout(() => el.classList.remove("energy-hit"), 500);
      }, index * 25);
    });
  }

  function pageGlitch() {
    page.classList.remove("energy-js-page");
    void page.offsetWidth;
    page.classList.add("energy-js-page");
    setTimeout(() => page.classList.remove("energy-js-page"), 800);
  }

  function forceGlitch(event) {
    state.instability += 9;
    state.voltage += 2;
    state.corruption += 5;

    updateStats("Glitch forçado");
    pageGlitch();
    hitText();
    addLine("GLITCH FORÇADO");

    for (let i = 0; i < 8; i++) spawnSlice();
    for (let i = 0; i < 22; i++) spawnSpark(event.clientX || innerWidth / 2, event.clientY || innerHeight / 2, true);
  }

  function reconfigure(event) {
    state.instability += 6;
    state.corruption += 10;

    updateStats("Arquivo reconfigurado");
    pageGlitch();
    addLine("RECONFIGURAÇÃO");

    for (let i = 0; i < 30; i++) spawnBit(event.clientX || innerWidth / 2, event.clientY || innerHeight / 2);
    for (let i = 0; i < 4; i++) spawnSlice();
  }

  function overload(event) {
    state.instability += 15;
    state.voltage += 6;
    state.corruption += 12;

    updateStats("Sobrecarga");
    pageGlitch();
    hitText();
    addLine("SOBRECARGA");

    for (let i = 0; i < 12; i++) spawnSlice();
    for (let i = 0; i < 44; i++) {
      spawnSpark(event.clientX || innerWidth / 2, event.clientY || innerHeight / 2, true);
      if (i % 2 === 0) spawnBit(event.clientX || innerWidth / 2, event.clientY || innerHeight / 2);
    }
  }

  function bindEvents() {
    document.addEventListener("click", event => {
      const button = safeClosest(event, "[data-energy-action]");
      const action = button?.dataset.energyAction;

      if (action === "glitch") return forceGlitch(event);
      if (action === "reconfigure") return reconfigure(event);
      if (action === "overload") return overload(event);

      spawnSlice();
      for (let i = 0; i < 10; i++) spawnSpark(event.clientX, event.clientY, false);
    });

    document.addEventListener("pointermove", event => {
      const now = performance.now();
      if (now - state.lastMove < 55) return;
      state.lastMove = now;

      if (Math.random() > .2) spawnSpark(event.clientX, event.clientY, false);
      if (Math.random() > .7) spawnBit(event.clientX, event.clientY);
    }, { passive: true });
  }

  function ambient() {
    setInterval(() => {
      if (document.hidden) return;
      spawnSlice();
      spawnSpark(random(80, innerWidth - 80), random(80, innerHeight - 80), true);
    }, 2200);
  }

  function init() {
    injectCss();
    createLayer("energy-js-layer");
    createLayer("energy-grid-field");
    updateStats("Sistema instável");
    bindEvents();
    ambient();

    page.classList.add("energy-js-active");

    console.log("[ENERGIA] efeitos visíveis ativados.");
  }

  init();
})();
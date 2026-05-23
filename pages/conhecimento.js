(() => {
  "use strict";

  console.log("[CONHECIMENTO] conhecimento.js executou de verdade.");

  const page =
    document.querySelector(".knowledge-element-page") ||
    document.querySelector("[data-element-page='knowledge']") ||
    document.body;

  if (!page) return;

  const state = {
    layers: 1,
    overload: 34,
    integrity: 72,
    lastMove: 0
  };

  const symbols = ["◉", "⌬", "△", "◇", "𐌏", "∴", "⊙", "⌁", "⟡", "∞", "?", "§"];

  const lines = [
    "Nova camada revelada. A interpretação anterior foi considerada incompleta.",
    "O arquivo não contém uma resposta. Ele contém respostas demais.",
    "Símbolo recuperado sem contexto seguro.",
    "Leitura duplicada. Uma das versões contradiz a outra.",
    "A Ordo recomenda interromper a análise antes que o operador tente entender tudo.",
    "Saber tudo é perder tudo. O fragmento repetiu a frase antes de ser aberto.",
    "O olho na margem não foi inserido pela interface."
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
    if (document.querySelector("#knowledge-js-css")) return;

    const style = document.createElement("style");
    style.id = "knowledge-js-css";

    style.textContent = `
      .knowledge-js-layer,
      .knowledge-symbol-field,
      .knowledge-note-field,
      .knowledge-eye-field {
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .knowledge-js-layer {
        z-index: 999999;
      }

      .knowledge-symbol-field {
        z-index: 999991;
        mix-blend-mode: screen;
        opacity: .72;
      }

      .knowledge-note-field {
        z-index: 999992;
      }

      .knowledge-eye-field {
        z-index: 999990;
      }

      .knowledge-symbol-field span {
        position: absolute;
        left: var(--x);
        top: var(--y);
        color: rgba(215, 170, 69, .65);
        font-size: var(--s);
        text-shadow:
          0 0 10px rgba(215, 170, 69, .85),
          0 0 28px rgba(215, 170, 69, .35);
        animation: knowledgeSymbolFloat var(--d) ease-in-out infinite;
        animation-delay: var(--delay);
      }

      .knowledge-note-field span {
        position: absolute;
        left: var(--x);
        top: var(--y);
        max-width: 180px;
        padding: .55rem .7rem;
        border: 1px solid rgba(215, 170, 69, .32);
        border-radius: 12px;
        background: rgba(20, 13, 3, .68);
        color: rgba(255, 236, 181, .82);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: .68rem;
        line-height: 1.35;
        box-shadow: 0 0 22px rgba(215, 170, 69, .16);
        animation: knowledgeNoteFloat var(--d) ease-in-out infinite;
        animation-delay: var(--delay);
      }

      .knowledge-eye-field::before {
        content: "";
        position: absolute;
        left: var(--cursor-x, 50%);
        top: var(--cursor-y, 50%);
        width: 220px;
        aspect-ratio: 1;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background:
          radial-gradient(circle, rgba(255,255,255,.88) 0 2%, rgba(215,170,69,.95) 3% 8%, transparent 9%),
          radial-gradient(ellipse at center, transparent 0 28%, rgba(215,170,69,.16) 30% 31%, transparent 32%),
          radial-gradient(circle, rgba(215,170,69,.12), transparent 64%);
        opacity: .42;
        filter: drop-shadow(0 0 22px rgba(215, 170, 69, .45));
        animation: knowledgeEyeBlink 4s ease-in-out infinite;
      }

      .knowledge-js-rune {
        position: fixed;
        left: var(--x);
        top: var(--y);
        color: #d7aa45;
        font-size: var(--s, 1.8rem);
        text-shadow:
          0 0 12px rgba(215, 170, 69, .9),
          0 0 34px rgba(215, 170, 69, .4);
        transform: translate(-50%, -50%) rotate(var(--r));
        animation: knowledgeRuneBurst 1.15s ease forwards;
      }

      .knowledge-js-page {
        animation: knowledgePagePulse .8s ease both;
      }

      .knowledge-js-line {
        opacity: 1 !important;
        transform: none !important;
        border-left-color: rgba(215, 170, 69, .95) !important;
        box-shadow:
          inset 0 0 26px rgba(215, 170, 69, .12),
          0 0 24px rgba(215, 170, 69, .12);
        animation: knowledgeLineReveal .8s ease both;
      }

      .knowledge-layer-hit {
        animation: knowledgeLayerHit .65s ease both;
      }

      @keyframes knowledgeSymbolFloat {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
          opacity: .25;
        }

        50% {
          transform: translateY(-28px) rotate(12deg);
          opacity: .9;
        }
      }

      @keyframes knowledgeNoteFloat {
        0%, 100% {
          transform: translateY(0) rotate(-1deg);
          opacity: .32;
        }

        50% {
          transform: translateY(-18px) rotate(1deg);
          opacity: .88;
        }
      }

      @keyframes knowledgeEyeBlink {
        0%, 82%, 100% {
          transform: translate(-50%, -50%) scaleY(1);
          opacity: .42;
        }

        88% {
          transform: translate(-50%, -50%) scaleY(.08);
          opacity: .8;
        }

        92% {
          transform: translate(-50%, -50%) scaleY(1);
        }
      }

      @keyframes knowledgeRuneBurst {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) scale(.35);
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(calc(var(--r) + 100deg)) scale(1.8);
        }
      }

      @keyframes knowledgePagePulse {
        0%, 100% {
          filter: none;
        }

        35% {
          filter: brightness(1.24) sepia(.22) saturate(1.35);
        }
      }

      @keyframes knowledgeLineReveal {
        0% {
          opacity: 0;
          transform: translateY(14px) scale(.98);
          filter: blur(5px) brightness(1.8);
        }

        100% {
          opacity: 1;
          transform: none;
          filter: none;
        }
      }

      @keyframes knowledgeLayerHit {
        0%, 100% {
          transform: translateX(0);
          filter: none;
        }

        35% {
          transform: translateX(4px);
          filter: brightness(1.22) sepia(.2);
        }

        60% {
          transform: translateX(-2px);
        }
      }
    `;

    document.head.appendChild(style);
  }

  function updateStats(status) {
    const layerEl = document.querySelector("[data-knowledge-layers]");
    const overloadEl = document.querySelector("[data-knowledge-overload]");
    const integrityEl = document.querySelector("[data-knowledge-integrity]");
    const statusEl = document.querySelector("[data-knowledge-status]");

    if (layerEl) layerEl.textContent = `${state.layers} camadas`;
    if (overloadEl) overloadEl.textContent = `${state.overload}%`;
    if (integrityEl) integrityEl.textContent = `${state.integrity}%`;
    if (statusEl) statusEl.textContent = status || "Interpretando";
  }

  function spawnRune(x, y, intense = false) {
    const layer = createLayer("knowledge-js-layer");
    const rune = document.createElement("span");

    rune.className = "knowledge-js-rune";
    rune.textContent = pick(symbols);
    rune.style.setProperty("--x", `${x + random(-30, 30)}px`);
    rune.style.setProperty("--y", `${y + random(-30, 30)}px`);
    rune.style.setProperty("--r", `${random(-90, 90)}deg`);
    rune.style.setProperty("--s", intense ? `${random(2, 3.5)}rem` : `${random(1.1, 2.2)}rem`);

    layer.appendChild(rune);
    setTimeout(() => rune.remove(), 1200);
  }

  function createAmbientSymbols() {
    const field = createLayer("knowledge-symbol-field");
    field.innerHTML = "";

    for (let i = 0; i < 58; i++) {
      const symbol = document.createElement("span");
      symbol.textContent = pick(symbols);
      symbol.style.setProperty("--x", `${random(0, 100)}%`);
      symbol.style.setProperty("--y", `${random(0, 100)}%`);
      symbol.style.setProperty("--s", `${random(1, 2.8)}rem`);
      symbol.style.setProperty("--d", `${random(5, 15)}s`);
      symbol.style.setProperty("--delay", `${random(-12, 0)}s`);
      field.appendChild(symbol);
    }
  }

  function createNotes() {
    const field = createLayer("knowledge-note-field");
    field.innerHTML = "";

    const notes = [
      "camada inconsistente",
      "significado duplicado",
      "olho não catalogado",
      "não interpretar sozinho",
      "símbolo reage",
      "saber = perda",
      "leitura observada"
    ];

    for (let i = 0; i < 18; i++) {
      const note = document.createElement("span");
      note.textContent = pick(notes);
      note.style.setProperty("--x", `${random(3, 88)}%`);
      note.style.setProperty("--y", `${random(4, 88)}%`);
      note.style.setProperty("--d", `${random(6, 14)}s`);
      note.style.setProperty("--delay", `${random(-10, 0)}s`);
      field.appendChild(note);
    }
  }

  function addLine(label) {
    const list =
      document.querySelector("[data-knowledge-fragments]") ||
      document.querySelector(".knowledge-fragments") ||
      document.querySelector(".element-fragments");

    if (!list) return;

    const line = document.createElement("p");
    line.className = "knowledge-js-line";
    line.innerHTML = `<span>${label}</span>${pick(lines)}`;
    list.appendChild(line);

    line.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hitText() {
    document.querySelectorAll(".knowledge-fragment-line, .element-fragments p, .element-main-file p").forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("knowledge-layer-hit");
        setTimeout(() => el.classList.remove("knowledge-layer-hit"), 700);
      }, index * 35);
    });
  }

  function pagePulse() {
    page.classList.remove("knowledge-js-page");
    void page.offsetWidth;
    page.classList.add("knowledge-js-page");
    setTimeout(() => page.classList.remove("knowledge-js-page"), 850);
  }

  function revealLayer(event) {
    state.layers += 1;
    state.overload += 8;
    state.integrity -= 4;

    updateStats("Camada revelada");
    pagePulse();
    hitText();
    addLine("CAMADA REVELADA");

    for (let i = 0; i < 24; i++) spawnRune(event.clientX || innerWidth / 2, event.clientY || innerHeight / 2, true);
  }

  function decode(event) {
    state.overload += 12;
    state.integrity -= 8;

    updateStats("Decodificação instável");
    pagePulse();
    addLine("DECODIFICAÇÃO PARCIAL");

    for (let i = 0; i < 34; i++) spawnRune(event.clientX || innerWidth / 2, event.clientY || innerHeight / 2, i % 2 === 0);
  }

  function bindEvents() {
    document.addEventListener("click", event => {
      const button = safeClosest(event, "[data-knowledge-action]");
      const action = button?.dataset.knowledgeAction;

      if (action === "reveal") return revealLayer(event);
      if (action === "decode") return decode(event);

      for (let i = 0; i < 8; i++) spawnRune(event.clientX, event.clientY, false);
    });

    document.addEventListener("pointermove", event => {
      page.style.setProperty("--cursor-x", `${event.clientX}px`);
      page.style.setProperty("--cursor-y", `${event.clientY}px`);

      const now = performance.now();
      if (now - state.lastMove < 90) return;

      state.lastMove = now;

      if (Math.random() > .45) spawnRune(event.clientX, event.clientY, false);
    }, { passive: true });
  }

  function init() {
    injectCss();
    createLayer("knowledge-js-layer");
    createLayer("knowledge-eye-field");
    createAmbientSymbols();
    createNotes();
    updateStats("Arquivo interpretando");
    bindEvents();

    page.classList.add("knowledge-js-active");

    console.log("[CONHECIMENTO] efeitos visíveis ativados.");
  }

  init();
})();
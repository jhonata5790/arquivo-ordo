(() => {
  "use strict";

  console.log("[MEDO] medo.js executou de verdade.");

  const page =
    document.querySelector(".fear-element-page") ||
    document.querySelector("[data-element-page='fear']") ||
    document.body;

  if (!page) {
    console.warn("[MEDO] Página de Medo não encontrada.");
    return;
  }

  const state = {
    silence: 61,
    presence: 24,
    voidLevel: 37,
    lastMove: 0
  };

  const fragments = [
    "O trecho não foi corrompido. Ele se recusou a permanecer visível.",
    "A leitura registrou uma presença atrás do operador.",
    "A ausência ocupou o espaço onde havia uma frase.",
    "O arquivo não respondeu. O silêncio respondeu por ele.",
    "O olho apareceu apenas depois que a câmera foi desligada.",
    "O Medo é infinito.",
    "A Ordo não conseguiu determinar se o fragmento existe.",
    "A página parece menos vazia quando ninguém olha diretamente."
  ];

  const statuses = [
    "Observando",
    "Atrás",
    "Perto demais",
    "Silêncio ativo",
    "Ausência crescente",
    "Leitura recusada",
    "Não olhe"
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
    if (document.querySelector("#fear-js-css")) return;

    const style = document.createElement("style");
    style.id = "fear-js-css";

    style.textContent = `
      .fear-js-layer,
      .fear-eye-field,
      .fear-void-field,
      .fear-noise-field,
      .fear-darkness-field {
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .fear-js-layer {
        z-index: 999999;
      }

      .fear-eye-field {
        z-index: 999992;
        mix-blend-mode: screen;
      }

      .fear-void-field {
        z-index: 999991;
      }

      .fear-noise-field {
        z-index: 999990;
        opacity: .19;
        background-image:
          repeating-radial-gradient(circle at 30% 30%, rgba(255,255,255,.13) 0 1px, transparent 1px 5px),
          repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,255,255,.05) 7px 8px, transparent 9px 20px);
        filter: contrast(2.4);
        animation: fearNoiseMove .55s steps(2) infinite;
      }

      .fear-darkness-field {
        z-index: 999989;
        background:
          radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), transparent 0 8rem, rgba(0,0,0,.52) 17rem),
          radial-gradient(circle at center, transparent 0 38%, rgba(0,0,0,.82) 100%);
      }

      .fear-eye-field span {
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: var(--w);
        height: calc(var(--w) * .42);
        border-radius: 50%;
        border: 1px solid rgba(235, 235, 235, .45);
        background:
          radial-gradient(circle at 50% 50%, rgba(255,255,255,.9) 0 3%, rgba(0,0,0,.9) 4% 11%, transparent 12%),
          radial-gradient(ellipse at center, rgba(255,255,255,.14), transparent 65%);
        box-shadow:
          0 0 18px rgba(255,255,255,.2),
          inset 0 0 16px rgba(255,255,255,.08);
        opacity: var(--o);
        transform: translate(-50%, -50%) rotate(var(--r));
        animation: fearEyeWatch var(--d) ease-in-out infinite;
        animation-delay: var(--delay);
      }

      .fear-js-eye {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: var(--w);
        height: calc(var(--w) * .42);
        border-radius: 50%;
        border: 1px solid rgba(240, 240, 240, .8);
        background:
          radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0 4%, rgba(0,0,0,1) 5% 13%, transparent 14%),
          radial-gradient(ellipse at center, rgba(255,255,255,.18), transparent 70%);
        box-shadow:
          0 0 22px rgba(255,255,255,.35),
          inset 0 0 16px rgba(255,255,255,.1);
        transform: translate(-50%, -50%) rotate(var(--r));
        animation: fearEyeAppear 1.35s ease forwards;
      }

      .fear-js-void {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: var(--s);
        aspect-ratio: 1;
        border-radius: 50%;
        background:
          radial-gradient(circle, rgba(0,0,0,1) 0 42%, rgba(0,0,0,.72) 58%, transparent 72%);
        box-shadow:
          0 0 40px rgba(0,0,0,.9),
          0 0 90px rgba(0,0,0,.7);
        transform: translate(-50%, -50%);
        animation: fearVoidSpread 1.45s ease forwards;
      }

      .fear-js-whisper {
        position: fixed;
        left: var(--x);
        top: var(--y);
        color: rgba(235, 235, 235, .72);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: var(--s);
        letter-spacing: .18em;
        text-transform: uppercase;
        text-shadow: 0 0 18px rgba(255,255,255,.24);
        transform: translate(-50%, -50%);
        animation: fearWhisperFade 1.6s ease forwards;
      }

      .fear-js-page-look {
        animation: fearPageLook .95s ease both;
      }

      .fear-js-page-noise {
        animation: fearPageNoise .75s steps(2) both;
      }

      .fear-js-page-empty {
        animation: fearPageEmpty 1s ease both;
      }

      .fear-js-line {
        opacity: 1 !important;
        transform: none !important;
        border-left-color: rgba(235,235,235,.75) !important;
        color: rgba(235,235,235,.62) !important;
        box-shadow:
          inset 0 0 24px rgba(255,255,255,.06),
          0 0 24px rgba(0,0,0,.4);
        animation: fearLineNew .9s ease both;
      }

      .fear-line-hidden {
        opacity: .08 !important;
        filter: blur(2px);
        color: transparent !important;
        text-shadow: 0 0 12px rgba(255,255,255,.25);
      }

      .fear-line-watched {
        animation: fearLineWatched .8s ease both;
      }

      @keyframes fearNoiseMove {
        0% {
          transform: translate(0, 0);
        }

        50% {
          transform: translate(1%, -1%);
        }

        100% {
          transform: translate(-1%, .7%);
        }
      }

      @keyframes fearEyeWatch {
        0%, 78%, 100% {
          transform: translate(-50%, -50%) rotate(var(--r)) scaleY(1);
        }

        86% {
          transform: translate(-50%, -50%) rotate(var(--r)) scaleY(.08);
        }

        92% {
          transform: translate(-50%, -50%) rotate(var(--r)) scaleY(1);
        }
      }

      @keyframes fearEyeAppear {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) scale(.45);
        }

        22% {
          opacity: 1;
        }

        72% {
          opacity: .92;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) scale(1.4);
        }
      }

      @keyframes fearVoidSpread {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(.2);
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.55);
        }
      }

      @keyframes fearWhisperFade {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) translateY(8px);
          filter: blur(4px);
        }

        20% {
          opacity: .8;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) translateY(-36px);
          filter: blur(1px);
        }
      }

      @keyframes fearPageLook {
        0%, 100% {
          filter: none;
        }

        38% {
          filter: brightness(.75) contrast(1.25);
        }

        68% {
          filter: brightness(.95) contrast(1.1);
        }
      }

      @keyframes fearPageNoise {
        0%, 100% {
          transform: translateX(0);
          filter: none;
        }

        25% {
          transform: translateX(5px);
          filter: contrast(1.4);
        }

        50% {
          transform: translateX(-5px);
          filter: brightness(.8);
        }

        75% {
          transform: translateX(2px);
        }
      }

      @keyframes fearPageEmpty {
        0%, 100% {
          opacity: 1;
          filter: none;
        }

        45% {
          opacity: .72;
          filter: grayscale(1) brightness(.72);
        }
      }

      @keyframes fearLineNew {
        0% {
          opacity: 0;
          transform: translateY(14px);
          filter: blur(7px);
        }

        100% {
          opacity: 1;
          transform: none;
          filter: none;
        }
      }

      @keyframes fearLineWatched {
        0%, 100% {
          transform: translateX(0);
          filter: none;
        }

        40% {
          transform: translateX(-3px);
          filter: brightness(.7) blur(.5px);
        }

        70% {
          transform: translateX(2px);
        }
      }
    `;

    document.head.appendChild(style);
  }

  function updateStats(status) {
    const silenceEl = document.querySelector("[data-fear-silence]");
    const presenceEl = document.querySelector("[data-fear-presence]");
    const voidEl = document.querySelector("[data-fear-void]");
    const statusEl = document.querySelector("[data-fear-status]");

    state.silence = Math.max(0, Math.min(100, state.silence));
    state.presence = Math.max(0, Math.min(100, state.presence));
    state.voidLevel = Math.max(0, Math.min(100, state.voidLevel));

    if (silenceEl) silenceEl.textContent = `${state.silence}%`;
    if (presenceEl) presenceEl.textContent = `${state.presence}%`;
    if (voidEl) voidEl.textContent = `${state.voidLevel}%`;
    if (statusEl) statusEl.textContent = status || pick(statuses);
  }

  function createAmbientEyes() {
    const field = createLayer("fear-eye-field");
    field.innerHTML = "";

    for (let i = 0; i < 18; i++) {
      const eye = document.createElement("span");

      eye.style.setProperty("--x", `${random(4, 96)}%`);
      eye.style.setProperty("--y", `${random(4, 92)}%`);
      eye.style.setProperty("--w", `${random(42, 130)}px`);
      eye.style.setProperty("--r", `${random(-18, 18)}deg`);
      eye.style.setProperty("--o", random(.08, .34).toFixed(2));
      eye.style.setProperty("--d", `${random(5, 14)}s`);
      eye.style.setProperty("--delay", `${random(-12, 0)}s`);

      field.appendChild(eye);
    }
  }

  function spawnEye(x, y, intense = false) {
    const layer = createLayer("fear-js-layer");
    const eye = document.createElement("span");

    eye.className = "fear-js-eye";
    eye.style.setProperty("--x", `${x + random(-50, 50)}px`);
    eye.style.setProperty("--y", `${y + random(-45, 45)}px`);
    eye.style.setProperty("--w", intense ? `${random(90, 180)}px` : `${random(50, 110)}px`);
    eye.style.setProperty("--r", `${random(-22, 22)}deg`);

    layer.appendChild(eye);
    setTimeout(() => eye.remove(), 1400);
  }

  function spawnVoid(x, y, intense = false) {
    const layer = createLayer("fear-js-layer");
    const voidSpot = document.createElement("span");

    voidSpot.className = "fear-js-void";
    voidSpot.style.setProperty("--x", `${x + random(-35, 35)}px`);
    voidSpot.style.setProperty("--y", `${y + random(-35, 35)}px`);
    voidSpot.style.setProperty("--s", intense ? `${random(170, 300)}px` : `${random(80, 170)}px`);

    layer.appendChild(voidSpot);
    setTimeout(() => voidSpot.remove(), 1500);
  }

  function spawnWhisper(x, y, text = null) {
    const layer = createLayer("fear-js-layer");
    const whisper = document.createElement("span");
    const words = ["perto", "atrás", "não olhe", "silêncio", "vazio", "observando", "infinito"];

    whisper.className = "fear-js-whisper";
    whisper.textContent = text || pick(words);
    whisper.style.setProperty("--x", `${x + random(-60, 60)}px`);
    whisper.style.setProperty("--y", `${y + random(-50, 50)}px`);
    whisper.style.setProperty("--s", `${random(.62, 1.05)}rem`);

    layer.appendChild(whisper);
    setTimeout(() => whisper.remove(), 1700);
  }

  function addLine(label) {
    const list =
      document.querySelector("[data-fear-fragments]") ||
      document.querySelector(".fear-fragments") ||
      document.querySelector(".element-fragments");

    if (!list) return;

    const line = document.createElement("p");

    line.className = "fear-js-line";
    line.innerHTML = `<span>${label}</span>${pick(fragments)}`;

    list.appendChild(line);
    line.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hitLines(hide = false) {
    const lines = document.querySelectorAll(".fear-fragment-line, .element-fragments p, .element-main-file p");

    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("fear-line-watched");

        if (hide && Math.random() > 0.52) {
          line.classList.toggle("fear-line-hidden");
        }

        setTimeout(() => {
          line.classList.remove("fear-line-watched");
        }, 850);
      }, index * 45);
    });
  }

  function pulsePage(type) {
    page.classList.remove("fear-js-page-look", "fear-js-page-noise", "fear-js-page-empty");
    void page.offsetWidth;
    page.classList.add(type);

    setTimeout(() => {
      page.classList.remove(type);
    }, 1100);
  }

  function lookCloser(event) {
    const x = event.clientX || innerWidth / 2;
    const y = event.clientY || innerHeight / 2;

    state.presence += 13;
    state.voidLevel += 6;
    state.silence += 4;

    updateStats("Observando");
    pulsePage("fear-js-page-look");
    hitLines(false);
    addLine("OLHAR APROXIMADO");

    for (let i = 0; i < 10; i++) {
      spawnEye(x, y, i % 2 === 0);
    }

    for (let i = 0; i < 5; i++) {
      spawnWhisper(x, y);
    }
  }

  function interruptNoise(event) {
    const x = event.clientX || innerWidth / 2;
    const y = event.clientY || innerHeight / 2;

    state.silence += 12;
    state.presence += 4;
    state.voidLevel += 5;

    updateStats("Silêncio mais alto");
    pulsePage("fear-js-page-noise");
    addLine("RUÍDO INTERROMPIDO");

    for (let i = 0; i < 8; i++) {
      spawnVoid(x, y, false);
      spawnWhisper(x, y, "...");
    }
  }

  function eraseExcerpt(event) {
    const x = event.clientX || innerWidth / 2;
    const y = event.clientY || innerHeight / 2;

    state.voidLevel += 16;
    state.presence += 8;

    updateStats("Trecho apagado");
    pulsePage("fear-js-page-empty");
    hitLines(true);
    addLine("TRECHO AUSENTE");

    for (let i = 0; i < 7; i++) {
      spawnVoid(x, y, true);
    }

    for (let i = 0; i < 6; i++) {
      spawnEye(x, y, true);
    }
  }

  function bindEvents() {
    document.addEventListener("click", event => {
      const button = safeClosest(event, "[data-fear-action]");
      const action = button?.dataset.fearAction;

      if (action === "look") return lookCloser(event);
      if (action === "noise") return interruptNoise(event);
      if (action === "erase") return eraseExcerpt(event);

      spawnVoid(event.clientX, event.clientY, false);

      if (Math.random() > 0.35) {
        spawnEye(event.clientX, event.clientY, false);
      }

      if (Math.random() > 0.45) {
        spawnWhisper(event.clientX, event.clientY);
      }
    });

    document.addEventListener("pointermove", event => {
      page.style.setProperty("--cursor-x", `${event.clientX}px`);
      page.style.setProperty("--cursor-y", `${event.clientY}px`);

      const now = performance.now();

      if (now - state.lastMove < 150) return;

      state.lastMove = now;

      if (Math.random() > 0.55) {
        spawnVoid(event.clientX, event.clientY, false);
      }

      if (Math.random() > 0.82) {
        spawnEye(event.clientX, event.clientY, false);
      }
    }, { passive: true });
  }

  function ambientPresence() {
    setInterval(() => {
      if (document.hidden) return;

      const x = random(80, innerWidth - 80);
      const y = random(80, innerHeight - 80);

      if (Math.random() > 0.45) spawnEye(x, y, false);
      if (Math.random() > 0.55) spawnWhisper(x, y);
      if (Math.random() > 0.72) hitLines(true);
    }, 3800);
  }

  function init() {
    injectCss();

    createLayer("fear-js-layer");
    createLayer("fear-noise-field");
    createLayer("fear-darkness-field");
    createAmbientEyes();

    updateStats("Presença observando");
    bindEvents();
    ambientPresence();

    page.classList.add("fear-js-active");

    console.log("[MEDO] efeitos visíveis ativados.");
  }

  init();
})();
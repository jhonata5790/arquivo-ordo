(() => {
  "use strict";

  console.log("[MAISIE] maisie.js carregado.");

  const page = document.querySelector("[data-maisie-page]");
  const loader = document.querySelector("[data-maisie-loader]");
  const terminal = document.querySelector("[data-terminal]");
  const attrReading = document.querySelector("[data-attr-reading]");
  const skillDisplay = document.querySelector("[data-skill-display]");

  if (!page) {
    console.warn("[MAISIE] página não encontrada.");
    return;
  }

  const attrText = {
    FOR: "FOR 1 — A ficha sugere baixo foco em força bruta. A ameaça operacional de Maisie vem mais da técnica, do ocultismo e dos dispositivos do que de impacto físico direto.",
    AGI: "AGI 1 — A ficha sugere mobilidade básica. A sobrevivência operacional se apoia mais em improviso, leitura de perigo e recursos paranormais do que em velocidade natural.",
    INT: "INT 3 — Leitura técnica. Medicina, ocultismo, tecnologia e análise de campo se cruzam como base da forma como a ficha atua em situações complexas.",
    PRE: "PRE 3 — Presença operacional elevada, compatível com postura carismática, vontade e capacidade de interação sob pressão.",
    VIG: "VIG 2 — Resistência funcional intermediária. A ficha sugere capacidade de continuar operando sob pressão sem fazer da resistência física seu foco principal."
  };

  const skillText = {
    medicina: {
      title: "Medicina +10",
      subtitle: "Suporte e origem médica",
      text: "Conecta a origem Agente de Saúde com suporte em campo, recuperação e leitura prática de condição física."
    },
    ocultismo: {
      title: "Ocultismo +10",
      subtitle: "Leitura do Outro Lado",
      text: "Perícia central para uso de rituais, interpretação paranormal e integração entre técnica e ocultismo."
    },
    tecnologia: {
      title: "Tecnologia +10",
      subtitle: "Corpo, máquina e Energia",
      text: "Campo recomendado para interações com dispositivos, improviso técnico, leitura de sistemas e manutenção dos próprios recursos."
    },
    percepcao: {
      title: "Percepção +10",
      subtitle: "Atenção operacional",
      text: "Representa leitura de ambiente, identificação de risco e resposta a sinais em campo."
    },
    reflexos: {
      title: "Reflexos +10",
      subtitle: "Resposta a perigo súbito",
      text: "Ajuda em situações de reação imediata, ameaças rápidas e efeitos repentinos."
    },
    vontade: {
      title: "Vontade +10",
      subtitle: "Resistência mental",
      text: "Importante para manter controle diante de medo, pressão e influência paranormal."
    },
    diplomacia: {
      title: "Diplomacia +5",
      subtitle: "Interação social funcional",
      text: "Apoia conversas, explicações e condução de interações quando a abordagem social é necessária."
    },
    investigacao: {
      title: "Investigação +5",
      subtitle: "Reconstrução de eventos",
      text: "Útil para pistas, cenas de crime, análise de locais e montagem lógica de acontecimentos."
    }
  };

  const tabTerminalMessages = {
    resumo: "> resumo operacional acessado.",
    identificacao: "> dados confirmados de identificação abertos.",
    funcao: "> função em campo analisada.",
    atributos: "> scanner da Ordo aplicado aos atributos.",
    pericias: "> scanner da Ordo aplicado às perícias.",
    habilidades: "> módulos desbloqueados listados.",
    rituais: "> biblioteca elemental acessada. Energia residual elevada.",
    inventario: "> bancada operacional aberta. itens confirmados em varredura.",
    protese: "> equipamento pessoal sensível em análise.",
    historico: "> histórico conhecido consolidado.",
    relacoes: "> projeto Walt recuperado do registro antigo.",
    comportamento: "> leitura comportamental institucional acessada.",
    alertas: "> alertas operacionais exibidos.",
    registro: "> registro vivo aguardando atualização do jogador.",
    bloqueados: "> ACESSO NEGADO. nível de autorização insuficiente."
  };

  const terminalLines = [
    "> Energia residual detectada no tanque ritualístico.",
    "> braço mecânico registrado como equipamento pessoal sensível.",
    "> curiosidade operacional acima do recomendado.",
    "> ficha pública parcial preservada.",
    "> módulo de suporte ocultista estável.",
    "> aviso: não tratar equipamento como item descartável.",
    "> Ordo Realitas // monitoramento discreto ativo.",
    "> leitura comportamental atualizada.",
    "> registro vivo aguardando decisões do jogador.",
    "> dados mecânicos confirmados preservados.",
    "> interpretação final reservada ao jogador.",
    "> varredura de Energia: instável, porém funcional.",
    "> circuito tanque-braço-roda respondendo."
  ];

  let lastParticle = 0;
  let lastTrace = 0;
  let lastAmbient = 0;

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

  function injectFxCss() {
    if (document.querySelector("#maisie-force-fx-css")) return;

    const style = document.createElement("style");
    style.id = "maisie-force-fx-css";

    style.textContent = `
      html,
      body,
      .maisie-page,
      .maisie-page * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }

      img,
      a,
      button {
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }

      ::selection {
        background: transparent !important;
        color: inherit !important;
      }

      ::-moz-selection {
        background: transparent !important;
        color: inherit !important;
      }

      .maisie-fx-layer {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        mix-blend-mode: screen !important;
      }

      .maisie-force-spark {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--w) !important;
        height: 4px !important;
        border-radius: 999px !important;
        background: linear-gradient(90deg, transparent, #2be7ff, #ff2fc9, #d7aa45, transparent) !important;
        box-shadow:
          0 0 16px rgba(255, 47, 201, .95),
          0 0 34px rgba(138, 77, 255, .85),
          0 0 48px rgba(215, 170, 69, .45) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: maisieForceSpark .9s ease forwards !important;
      }

      .maisie-force-spark.big {
        height: 6px !important;
        filter: brightness(1.4) saturate(1.4) !important;
      }

      .maisie-force-dot {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--s) !important;
        height: var(--s) !important;
        border-radius: 50% !important;
        background: #d7aa45 !important;
        box-shadow:
          0 0 16px rgba(215, 170, 69, 1),
          0 0 34px rgba(255, 47, 201, .75),
          0 0 52px rgba(43, 231, 255, .4) !important;
        transform: translate(-50%, -50%) !important;
        animation: maisieForceDot 1.1s ease forwards !important;
      }

      .maisie-force-rune {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        color: #fff2d0 !important;
        font-size: var(--s) !important;
        font-weight: 900 !important;
        text-shadow:
          0 0 16px rgba(215, 170, 69, 1),
          0 0 34px rgba(182, 76, 255, .85),
          0 0 52px rgba(255, 47, 201, .45) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: maisieForceRune 1.25s ease forwards !important;
      }

      .maisie-force-wave {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: 38px !important;
        height: 38px !important;
        border-radius: 50% !important;
        border: 2px solid #b64cff !important;
        box-shadow:
          0 0 24px rgba(182, 76, 255, 1),
          inset 0 0 24px rgba(215, 170, 69, .55) !important;
        transform: translate(-50%, -50%) !important;
        animation: maisieForceWave .9s ease forwards !important;
      }

      .maisie-force-glitch {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--w) !important;
        height: 18px !important;
        border-radius: 999px !important;
        background: linear-gradient(90deg, transparent, rgba(43,231,255,.35), rgba(255,47,201,.85), rgba(215,170,69,.55), transparent) !important;
        box-shadow:
          0 0 20px rgba(43, 231, 255, .65),
          0 0 40px rgba(255, 47, 201, .55) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: maisieForceGlitch .5s steps(2) forwards !important;
      }

      .maisie-screen-pulse {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483646 !important;
        pointer-events: none !important;
        background:
          radial-gradient(circle at var(--x) var(--y), rgba(255,47,201,.22), transparent 18rem),
          radial-gradient(circle at var(--x) var(--y), rgba(43,231,255,.14), transparent 28rem) !important;
        animation: maisieScreenPulse .65s ease forwards !important;
        mix-blend-mode: screen !important;
      }

      .maisie-energy-link {
        position: fixed !important;
        left: var(--x1) !important;
        top: var(--y1) !important;
        width: var(--len) !important;
        height: 3px !important;
        transform-origin: left center !important;
        transform: rotate(var(--angle)) !important;
        border-radius: 999px !important;
        background: linear-gradient(90deg, rgba(43,231,255,0), rgba(182,76,255,.9), rgba(215,170,69,.75), rgba(255,47,201,0)) !important;
        box-shadow:
          0 0 14px rgba(182, 76, 255, .85),
          0 0 28px rgba(215, 170, 69, .35) !important;
        animation: maisieEnergyLink .85s ease forwards !important;
      }

      .maisie-ordo-scan {
        position: absolute !important;
        inset: 0 !important;
        z-index: 50 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        border-radius: inherit !important;
      }

      .maisie-ordo-scan::before {
        content: "" !important;
        position: absolute !important;
        left: -20% !important;
        right: -20% !important;
        top: -20% !important;
        height: 26px !important;
        background: linear-gradient(90deg, transparent, rgba(215,170,69,.85), rgba(182,76,255,.65), transparent) !important;
        box-shadow:
          0 0 22px rgba(215,170,69,.55),
          0 0 36px rgba(182,76,255,.35) !important;
        animation: maisieOrdoScan .9s ease forwards !important;
      }

      .maisie-sensitive-alert {
        position: fixed !important;
        left: 50% !important;
        top: 18% !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) !important;
        border: 1px solid rgba(255,47,201,.72) !important;
        border-radius: 999px !important;
        padding: .75rem 1rem !important;
        background: rgba(0,0,0,.78) !important;
        color: #fff2d0 !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .75rem !important;
        letter-spacing: .16em !important;
        text-transform: uppercase !important;
        box-shadow:
          0 0 26px rgba(255,47,201,.34),
          inset 0 0 18px rgba(215,170,69,.08) !important;
        animation: maisieSensitiveAlert 1.25s ease forwards !important;
      }

      .maisie-magnet-bit {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        color: #c9c4d4 !important;
        font-size: var(--s) !important;
        text-shadow: 0 0 16px rgba(182, 76, 255, .85) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: maisieMagnetBit .85s ease forwards !important;
      }

      .maisie-walt-boot {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) !important;
        border: 1px solid rgba(215,170,69,.5) !important;
        border-radius: 18px !important;
        padding: .65rem .85rem !important;
        color: #fff2d0 !important;
        background: rgba(0,0,0,.72) !important;
        box-shadow:
          0 0 22px rgba(215,170,69,.22),
          inset 0 0 18px rgba(182,76,255,.12) !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .72rem !important;
        animation: maisieWaltBoot 1.4s ease forwards !important;
      }

      .maisie-redact-bar {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--w) !important;
        height: 18px !important;
        z-index: 2147483647 !important;
        background:
          linear-gradient(90deg, rgba(0,0,0,0), rgba(255,22,70,.85), rgba(0,0,0,.95), rgba(255,22,70,.75), rgba(0,0,0,0)) !important;
        box-shadow: 0 0 18px rgba(255,22,70,.45) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: maisieRedact .9s steps(3) forwards !important;
      }

      .maisie-double-sync {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: 120px !important;
        height: 120px !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        border-radius: 50% !important;
        border: 2px solid rgba(215, 170, 69, .9) !important;
        box-shadow:
          0 0 20px rgba(215, 170, 69, .75),
          inset 0 0 28px rgba(182, 76, 255, .38) !important;
        transform: translate(-50%, -50%) scale(.2) !important;
        animation: maisieDoubleSync .75s ease forwards !important;
      }

      .maisie-double-sync::before,
      .maisie-double-sync::after {
        content: "" !important;
        position: absolute !important;
        inset: 18px !important;
        border-radius: inherit !important;
        border: 1px solid rgba(43, 231, 255, .75) !important;
      }

      .maisie-double-sync::after {
        inset: 34px !important;
        border-color: rgba(255, 47, 201, .75) !important;
      }

      .maisie-right-click-mark {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        transform: translate(-50%, -50%) !important;
        color: #ffd7df !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .68rem !important;
        letter-spacing: .14em !important;
        text-transform: uppercase !important;
        border: 1px solid rgba(255, 22, 70, .65) !important;
        border-radius: 999px !important;
        padding: .55rem .75rem !important;
        background: rgba(0, 0, 0, .76) !important;
        box-shadow:
          0 0 24px rgba(255, 22, 70, .34),
          inset 0 0 16px rgba(182, 76, 255, .12) !important;
        animation: maisieRightClickMark .95s ease forwards !important;
      }

      .maisie-page.controlled-overload {
        animation: maisieOverloadShake .42s steps(2) !important;
      }

      .character-card.hologram-break .character-image {
        animation: maisieHologramBreak .55s steps(2) !important;
      }

      .ritual-card.hologram-clone::before,
      .ritual-card.hologram-clone::after {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        border-radius: inherit !important;
        border: 1px solid rgba(43,231,255,.35) !important;
        pointer-events: none !important;
      }

      .ritual-card.hologram-clone::before {
        transform: translate(8px, -5px) !important;
        animation: maisieHoloClone .65s ease forwards !important;
      }

      .ritual-card.hologram-clone::after {
        transform: translate(-8px, 5px) !important;
        animation: maisieHoloClone .65s ease forwards reverse !important;
      }

      .ritual-card.ritual-ray {
        box-shadow:
          0 0 28px rgba(255,47,201,.28),
          inset 0 0 32px rgba(43,231,255,.12) !important;
      }

      .ritual-card.ritual-ray::after {
        content: "" !important;
        position: absolute !important;
        left: -35% !important;
        top: 48% !important;
        width: 170% !important;
        height: 4px !important;
        background: linear-gradient(90deg, transparent, #2be7ff, #ff2fc9, #d7aa45, transparent) !important;
        box-shadow: 0 0 24px rgba(255,47,201,.9) !important;
        animation: maisieRitualRay .55s ease forwards !important;
      }

      .reader-section.reading-focus {
        box-shadow:
          inset 0 0 46px rgba(215,170,69,.08),
          0 0 70px rgba(0,0,0,.72),
          0 0 36px rgba(182,76,255,.16) !important;
      }

      @keyframes maisieForceSpark {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scaleX(.15); filter: blur(2px); }
        18% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--r)) scaleX(1.7); filter: blur(4px); }
      }

      @keyframes maisieForceDot {
        0% { opacity: 0; transform: translate(-50%, -50%) translate(0, 0) scale(.4); }
        20% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(.2); }
      }

      @keyframes maisieForceRune {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scale(.4); }
        20% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) rotate(calc(var(--r) + 90deg)) scale(1.8); }
      }

      @keyframes maisieForceWave {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(.2); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(18); }
      }

      @keyframes maisieForceGlitch {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) translateX(-40px) scaleX(.25); }
        30% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) translateX(80px) scaleX(1.4); }
      }

      @keyframes maisieScreenPulse {
        from { opacity: 1; filter: brightness(1.4); }
        to { opacity: 0; filter: brightness(1); }
      }

      @keyframes maisieEnergyLink {
        0% { opacity: 0; filter: blur(4px); transform: rotate(var(--angle)) scaleX(.1); }
        25% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: rotate(var(--angle)) scaleX(1); filter: blur(3px); }
      }

      @keyframes maisieOrdoScan {
        from { transform: translateY(-120%); opacity: 0; }
        30% { opacity: 1; }
        to { transform: translateY(900%); opacity: 0; }
      }

      @keyframes maisieSensitiveAlert {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.8); filter: blur(6px); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
        80% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.08); filter: blur(5px); }
      }

      @keyframes maisieMagnetBit {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scale(.7); }
        20% { opacity: 1; }
        100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(calc(var(--r) + 180deg)) scale(.25); }
      }

      @keyframes maisieWaltBoot {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.82); filter: blur(6px); }
        20% { opacity: 1; filter: blur(0); }
        75% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) translateY(-18px) scale(1.04); filter: blur(5px); }
      }

      @keyframes maisieRedact {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scaleX(.3); }
        20% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scaleX(1.35); }
      }

      @keyframes maisieOverloadShake {
        0%, 100% { transform: translate(0, 0); filter: none; }
        20% { transform: translate(3px, -2px); filter: brightness(1.25) saturate(1.25); }
        40% { transform: translate(-3px, 2px); }
        60% { transform: translate(2px, 2px); filter: brightness(1.15) saturate(1.4); }
        80% { transform: translate(-2px, -1px); }
      }

      @keyframes maisieHologramBreak {
        0%, 100% { transform: translate(0, 0) scale(1); filter: drop-shadow(0 0 22px rgba(182,76,255,.42)); }
        35% { transform: translate(6px, -2px) scale(1.01); filter: drop-shadow(12px 0 0 rgba(43,231,255,.28)) drop-shadow(-10px 0 0 rgba(255,47,201,.24)); }
        65% { transform: translate(-5px, 2px) scale(1.01); filter: drop-shadow(-12px 0 0 rgba(43,231,255,.22)) drop-shadow(10px 0 0 rgba(255,47,201,.28)); }
      }

      @keyframes maisieHoloClone {
        0% { opacity: 0; filter: blur(6px); }
        30% { opacity: .75; filter: blur(0); }
        100% { opacity: 0; filter: blur(4px); }
      }

      @keyframes maisieRitualRay {
        from { transform: translateX(-45%); opacity: 0; }
        30% { opacity: 1; }
        to { transform: translateX(45%); opacity: 0; }
      }

      @keyframes maisieDoubleSync {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.15) rotate(0deg); filter: blur(5px); }
        25% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(2.2) rotate(180deg); filter: blur(4px); }
      }

      @keyframes maisieRightClickMark {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.8); filter: blur(5px); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
        75% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) translateY(-16px) scale(1.04); filter: blur(4px); }
      }
    `;

    document.head.appendChild(style);
  }

  function lockTextSelection() {
    document.addEventListener("selectstart", event => {
      event.preventDefault();
    });

    document.addEventListener("dragstart", event => {
      event.preventDefault();
    });

    document.addEventListener("mousedown", event => {
      if (event.detail > 1) {
        event.preventDefault();
      }
    });

    document.addEventListener("copy", event => {
      event.preventDefault();
      addTerminal("> cópia bloqueada pelo sistema da Ordo.");
    });

    document.addEventListener("cut", event => {
      event.preventDefault();
      addTerminal("> extração de conteúdo negada.");
    });
  }

  function addTerminal(text) {
    if (!terminal) return;

    const p = document.createElement("p");
    p.textContent = text;
    p.className = "terminal-new";

    terminal.appendChild(p);

    while (terminal.children.length > 10) {
      terminal.removeChild(terminal.firstElementChild);
    }
  }

  function fxLayer() {
    let layer = document.querySelector(".maisie-fx-layer");

    if (!layer) {
      layer = document.createElement("div");
      layer.className = "maisie-fx-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
    }

    return layer;
  }

  function spawnSpark(x, y, intense = false) {
    const layer = fxLayer();
    const spark = document.createElement("span");

    spark.className = intense ? "maisie-force-spark big" : "maisie-force-spark";
    spark.style.setProperty("--x", `${x}px`);
    spark.style.setProperty("--y", `${y}px`);
    spark.style.setProperty("--dx", `${random(-140, 140)}px`);
    spark.style.setProperty("--dy", `${random(-135, 105)}px`);
    spark.style.setProperty("--r", `${random(-100, 100)}deg`);
    spark.style.setProperty("--w", intense ? `${random(120, 240)}px` : `${random(55, 135)}px`);

    layer.appendChild(spark);

    setTimeout(() => spark.remove(), 950);
  }

  function spawnDot(x, y) {
    const layer = fxLayer();
    const dot = document.createElement("span");

    dot.className = "maisie-force-dot";
    dot.style.setProperty("--x", `${x}px`);
    dot.style.setProperty("--y", `${y}px`);
    dot.style.setProperty("--dx", `${random(-85, 85)}px`);
    dot.style.setProperty("--dy", `${random(-95, 75)}px`);
    dot.style.setProperty("--s", `${random(6, 13)}px`);

    layer.appendChild(dot);

    setTimeout(() => dot.remove(), 1150);
  }

  function spawnRune(x, y) {
    const layer = fxLayer();
    const rune = document.createElement("span");
    const symbols = ["◈", "⬡", "▤", "⌖", "✦", "△", "◇", "◎", "⚡", "⌁"];

    rune.className = "maisie-force-rune";
    rune.textContent = pick(symbols);
    rune.style.setProperty("--x", `${x}px`);
    rune.style.setProperty("--y", `${y}px`);
    rune.style.setProperty("--r", `${random(-110, 110)}deg`);
    rune.style.setProperty("--s", `${random(1.4, 2.4)}rem`);

    layer.appendChild(rune);

    setTimeout(() => rune.remove(), 1250);
  }

  function spawnWave(x, y) {
    const layer = fxLayer();
    const wave = document.createElement("span");

    wave.className = "maisie-force-wave";
    wave.style.setProperty("--x", `${x}px`);
    wave.style.setProperty("--y", `${y}px`);

    layer.appendChild(wave);

    setTimeout(() => wave.remove(), 950);
  }

  function spawnGlitchSlice(x, y) {
    const layer = fxLayer();
    const slice = document.createElement("span");

    slice.className = "maisie-force-glitch";
    slice.style.setProperty("--x", `${x}px`);
    slice.style.setProperty("--y", `${y}px`);
    slice.style.setProperty("--w", `${random(130, 300)}px`);
    slice.style.setProperty("--r", `${random(-8, 8)}deg`);

    layer.appendChild(slice);

    setTimeout(() => slice.remove(), 550);
  }

  function spawnScreenPulse(x, y) {
    const pulse = document.createElement("span");

    pulse.className = "maisie-screen-pulse";
    pulse.style.setProperty("--x", `${x}px`);
    pulse.style.setProperty("--y", `${y}px`);

    document.body.appendChild(pulse);

    setTimeout(() => pulse.remove(), 700);
  }

  function spawnEnergyLink(x1, y1, x2, y2) {
    const layer = fxLayer();
    const link = document.createElement("span");

    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    link.className = "maisie-energy-link";
    link.style.setProperty("--x1", `${x1}px`);
    link.style.setProperty("--y1", `${y1}px`);
    link.style.setProperty("--len", `${len}px`);
    link.style.setProperty("--angle", `${angle}deg`);

    layer.appendChild(link);

    setTimeout(() => link.remove(), 900);
  }

  function spawnSensitiveAlert(text = "EQUIPAMENTO PESSOAL SENSÍVEL") {
    const alert = document.createElement("span");

    alert.className = "maisie-sensitive-alert";
    alert.textContent = text;

    document.body.appendChild(alert);

    setTimeout(() => alert.remove(), 1300);
  }

  function spawnMagnetBits(x, y, amount = 18) {
    const layer = fxLayer();
    const symbols = ["◆", "◇", "▣", "▤", "✦", "•", "◦"];

    for (let i = 0; i < amount; i++) {
      const bit = document.createElement("span");

      bit.className = "maisie-magnet-bit";
      bit.textContent = pick(symbols);
      bit.style.setProperty("--x", `${x + random(-180, 180)}px`);
      bit.style.setProperty("--y", `${y + random(-120, 120)}px`);
      bit.style.setProperty("--dx", `${random(-20, 20)}px`);
      bit.style.setProperty("--dy", `${random(-20, 20)}px`);
      bit.style.setProperty("--r", `${random(-180, 180)}deg`);
      bit.style.setProperty("--s", `${random(0.8, 1.6)}rem`);

      layer.appendChild(bit);

      setTimeout(() => bit.remove(), 900);
    }
  }

  function spawnWaltBoot(x, y) {
    const boot = document.createElement("span");

    boot.className = "maisie-walt-boot";
    boot.textContent = "booting... WALT // PROJETO RECUPERADO";

    document.body.appendChild(boot);

    boot.style.setProperty("--x", `${x}px`);
    boot.style.setProperty("--y", `${y}px`);

    setTimeout(() => boot.remove(), 1450);
  }

  function spawnRedactions(amount = 7) {
    const layer = fxLayer();

    for (let i = 0; i < amount; i++) {
      const bar = document.createElement("span");

      bar.className = "maisie-redact-bar";
      bar.style.setProperty("--x", `${random(innerWidth * 0.18, innerWidth * 0.82)}px`);
      bar.style.setProperty("--y", `${random(innerHeight * 0.18, innerHeight * 0.82)}px`);
      bar.style.setProperty("--w", `${random(120, 360)}px`);
      bar.style.setProperty("--r", `${random(-5, 5)}deg`);

      layer.appendChild(bar);

      setTimeout(() => bar.remove(), 950);
    }
  }

  function spawnDoubleSync(x, y) {
    const layer = fxLayer();
    const sync = document.createElement("span");

    sync.className = "maisie-double-sync";
    sync.style.setProperty("--x", `${x}px`);
    sync.style.setProperty("--y", `${y}px`);

    layer.appendChild(sync);

    setTimeout(() => sync.remove(), 820);
  }

  function spawnRightClickMark(x, y) {
    const mark = document.createElement("span");

    mark.className = "maisie-right-click-mark";
    mark.textContent = "COMANDO ALTERNATIVO BLOQUEADO";

    mark.style.setProperty("--x", `${x}px`);
    mark.style.setProperty("--y", `${y}px`);

    document.body.appendChild(mark);

    setTimeout(() => mark.remove(), 1000);
  }

  function burst(x, y, type = "normal") {
    if (window.OrdoPerf?.canSpawnVfx && !window.OrdoPerf.canSpawnVfx("maisie-burst", type === "energy" ? 11 : 7)) return;
    spawnWave(x, y);

    const sparkAmount = window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(type === "energy" ? 26 : 16, .68, .45) : (type === "energy" ? 26 : 16);
    const dotAmount = window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(type === "energy" ? 16 : 8, .68, .45) : (type === "energy" ? 16 : 8);
    const runeAmount = window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(type === "energy" ? 7 : 4, .7, .5) : (type === "energy" ? 7 : 4);

    for (let i = 0; i < sparkAmount; i++) {
      spawnSpark(x, y, i % 3 === 0);
    }

    for (let i = 0; i < dotAmount; i++) {
      spawnDot(x, y);
    }

    for (let i = 0; i < runeAmount; i++) {
      spawnRune(x + random(-58, 58), y + random(-58, 58));
    }

    if (type === "energy") {
      spawnScreenPulse(x, y);

      for (let i = 0; i < 4; i++) {
        spawnGlitchSlice(x + random(-75, 75), y + random(-75, 75));
      }
    }
  }

  function doubleClickEffect(x, y) {
    spawnDoubleSync(x, y);
    spawnScreenPulse(x, y);

    for (let i = 0; i < 8; i++) {
      spawnRune(x + random(-70, 70), y + random(-70, 70));
    }

    for (let i = 0; i < 20; i++) {
      spawnSpark(x, y, i % 2 === 0);
    }

    addTerminal("> duplo pulso detectado. sincronização forçada.");
  }

  function rightClickEffect(x, y) {
    spawnRightClickMark(x, y);
    spawnRedactions(4);
    spawnGlitchSlice(x, y);
    spawnScreenPulse(x, y);

    for (let i = 0; i < 10; i++) {
      spawnSpark(x, y, i % 2 === 0);
    }

    addTerminal("> botão direito bloqueado. menu externo negado.");
  }

  function controlledOverload(x, y, message = "> sobrecarga controlada estabilizada.") {
    page.classList.add("controlled-overload");
    spawnScreenPulse(x, y);
    spawnGlitchSlice(x, y);
    spawnGlitchSlice(x + random(-80, 80), y + random(-80, 80));
    addTerminal(message);

    setTimeout(() => {
      page.classList.remove("controlled-overload");
    }, 480);
  }

  function closeLoader() {
    if (!loader) return;

    loader.classList.add("loader-hidden");

    setTimeout(() => {
      loader.remove();
    }, 800);
  }

  function scrollToReader() {
    const reader = document.querySelector(".reader-section");

    if (reader) {
      reader.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function addOrdoScanToActivePanel() {
    const activePanel = document.querySelector(".reader-panel.active");
    if (!activePanel) return;

    const scan = document.createElement("span");
    scan.className = "maisie-ordo-scan";
    activePanel.appendChild(scan);

    setTimeout(() => scan.remove(), 950);
  }

  function setReadingFocus(active = true) {
    const reader = document.querySelector(".reader-section");
    if (!reader) return;

    reader.classList.toggle("reading-focus", active);

    if (active) {
      setTimeout(() => {
        reader.classList.remove("reading-focus");
      }, 1300);
    }
  }

  function switchTab(tabName, shouldScroll = true) {
    document.querySelectorAll("[data-tab]").forEach(button => {
      button.classList.toggle("active", button.dataset.tab === tabName);
    });

    document.querySelectorAll("[data-panel]").forEach(panel => {
      panel.classList.toggle("active", panel.dataset.panel === tabName);
    });

    addTerminal(tabTerminalMessages[tabName] || `> aba aberta: ${tabName.toUpperCase()}.`);

    if (["atributos", "pericias", "inventario", "identificacao"].includes(tabName)) {
      setTimeout(addOrdoScanToActivePanel, 120);
    }

    if (["comportamento", "historico", "registro", "relacoes"].includes(tabName)) {
      setTimeout(() => setReadingFocus(true), 150);
    }

    if (tabName === "rituais") {
      setTimeout(() => connectEnergyPath(), 180);
    }

    if (tabName === "protese") {
      setTimeout(() => {
        spawnSensitiveAlert();
        connectEnergyPath();
      }, 180);
    }

    if (tabName === "relacoes") {
      setTimeout(() => {
        const walt = document.querySelector(".walt-card");
        if (walt) {
          const rect = walt.getBoundingClientRect();
          spawnWaltBoot(rect.left + rect.width * 0.5, rect.top + 30);
        }
      }, 250);
    }

    if (tabName === "bloqueados") {
      page.classList.add("restricted-pulse");
      spawnRedactions(9);
      controlledOverload(innerWidth / 2, innerHeight / 2, "> acesso negado pelo mestre.");

      setTimeout(() => {
        page.classList.remove("restricted-pulse");
      }, 900);
    }

    if (shouldScroll) {
      scrollToReader();
    }
  }

  function selectAttribute(attrName) {
    document.querySelectorAll("[data-attr]").forEach(button => {
      button.classList.toggle("active", button.dataset.attr === attrName);
    });

    if (attrReading) {
      attrReading.textContent = attrText[attrName] || "Leitura indisponível.";
    }

    addTerminal(`> atributo selecionado: ${attrName}.`);
    addOrdoScanToActivePanel();
  }

  function selectSkill(skillName) {
    const data = skillText[skillName];

    if (!data || !skillDisplay) return;

    document.querySelectorAll("[data-skill]").forEach(button => {
      button.classList.toggle("active", button.dataset.skill === skillName);
    });

    skillDisplay.innerHTML = `
      <span>${data.title}</span>
      <h3>${data.subtitle}</h3>
      <p>${data.text}</p>
    `;

    addTerminal(`> perícia analisada: ${data.title}.`);
    addOrdoScanToActivePanel();
  }

  function filterRituals(filter) {
    document.querySelectorAll("[data-ritual-filter]").forEach(button => {
      button.classList.toggle("active", button.dataset.ritualFilter === filter);
    });

    document.querySelectorAll("[data-ritual]").forEach(card => {
      const visible = filter === "todos" || card.dataset.ritual === filter;
      card.classList.toggle("hidden", !visible);
    });

    addTerminal(`> filtro ritualístico: ${filter.toUpperCase()}.`);

    if (filter === "energia") {
      connectEnergyPath();
    }
  }

  function activateCard(card, message) {
    card.classList.add("clicked");
    addTerminal(message);

    setTimeout(() => {
      card.classList.remove("clicked");
    }, 850);
  }

  function focusEquipment(type) {
    const characterCard = document.querySelector(".character-card");
    const equipmentStatus = document.querySelector(".equipment-status");

    if (characterCard) {
      characterCard.classList.add(type === "tank" ? "focus-tank" : "focus-arm");

      setTimeout(() => {
        characterCard.classList.remove("focus-tank", "focus-arm");
      }, 1100);
    }

    if (equipmentStatus && type === "tank") {
      equipmentStatus.classList.add("equipment-alert");

      setTimeout(() => {
        equipmentStatus.classList.remove("equipment-alert");
      }, 1100);
    }
  }

  function getCenter(selector, fallbackX = innerWidth / 2, fallbackY = innerHeight / 2) {
    const el = document.querySelector(selector);

    if (!el) {
      return { x: fallbackX, y: fallbackY };
    }

    const rect = el.getBoundingClientRect();

    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function connectEnergyPath() {
    const tank = getCenter(".equipment-status", innerWidth * 0.55, innerHeight * 0.35);
    const arm = getCenter(".hotspot-arm", innerWidth * 0.52, innerHeight * 0.48);
    const wheel = getCenter(".attribute-wheel", innerWidth * 0.76, innerHeight * 0.28);
    const reader = getCenter(".reader-section", innerWidth * 0.5, innerHeight * 0.75);

    spawnEnergyLink(tank.x, tank.y, arm.x, arm.y);
    spawnEnergyLink(arm.x, arm.y, wheel.x, wheel.y);
    spawnEnergyLink(wheel.x, wheel.y, reader.x, reader.y);

    spawnSpark(tank.x, tank.y, true);
    spawnSpark(arm.x, arm.y, true);
    spawnSpark(wheel.x, wheel.y, true);
  }

  function triggerEnergyRitualEffect(card, x, y) {
    const name = card.querySelector("strong")?.textContent?.trim().toLowerCase() || "";

    if (name.includes("embaralhar")) {
      card.classList.add("hologram-clone");
      const character = document.querySelector(".character-card");
      if (character) character.classList.add("hologram-break");

      addTerminal("> Embaralhar: duplicação holográfica detectada.");

      setTimeout(() => {
        card.classList.remove("hologram-clone");
        if (character) character.classList.remove("hologram-break");
      }, 720);
    } else if (name.includes("polarização")) {
      spawnMagnetBits(x, y, 24);
      addTerminal("> Polarização Caótica: campo magnético detectado.");
    } else if (name.includes("rajada")) {
      card.classList.add("ritual-ray");
      spawnGlitchSlice(x, y);
      addTerminal("> Rajada Caótica: descarga horizontal registrada.");

      setTimeout(() => {
        card.classList.remove("ritual-ray");
      }, 700);
    } else {
      addTerminal("> ritual de Energia acionado.");
    }

    controlledOverload(x, y, "> Energia estabilizada após microfalha.");
    connectEnergyPath();
  }

  function bindSelectionAndContextLocks() {
    lockTextSelection();

    document.addEventListener("contextmenu", event => {
      event.preventDefault();
      event.stopPropagation();
      rightClickEffect(event.clientX, event.clientY);
      return false;
    }, { capture: true });

    document.addEventListener("auxclick", event => {
      if (event.button === 1 || event.button === 2) {
        event.preventDefault();
        event.stopPropagation();
        rightClickEffect(event.clientX, event.clientY);
      }
    }, { capture: true });

    document.addEventListener("dblclick", event => {
      event.preventDefault();
      event.stopPropagation();
      doubleClickEffect(event.clientX, event.clientY);
    }, { capture: true });
  }

  function bindClicks() {
    document.addEventListener("click", event => {
      const skip = safeClosest(event, "[data-skip-loader]");
      const tab = safeClosest(event, "[data-tab]");
      const jump = safeClosest(event, "[data-jump-tab]");
      const attr = safeClosest(event, "[data-attr]");
      const skill = safeClosest(event, "[data-skill]");
      const ritualFilter = safeClosest(event, "[data-ritual-filter]");
      const ritualEnergy = safeClosest(event, ".ritual-energy");
      const module = safeClosest(event, "[data-module]");
      const prosthetic = safeClosest(event, "[data-prosthetic]");
      const timeline = safeClosest(event, "[data-timeline]");
      const hotspot = safeClosest(event, "[data-hotspot]");
      const walt = safeClosest(event, ".walt-card");
      const locked = safeClosest(event, ".locked-grid article");
      const tankItem = safeClosest(event, ".tank-item, .equipment-status");
      const link = safeClosest(event, "a");

      if (skip) {
        closeLoader();
        burst(event.clientX, event.clientY, "energy");
        addTerminal("> carregamento encerrado manualmente.");
        return;
      }

      if (jump) {
        switchTab(jump.dataset.jumpTab);
        burst(event.clientX, event.clientY, "energy");
        return;
      }

      if (tab) {
        const tabName = tab.dataset.tab;
        const energyTabs = ["rituais", "protese", "inventario"];
        const effectType = energyTabs.includes(tabName) ? "energy" : "normal";

        switchTab(tabName);
        burst(event.clientX, event.clientY, effectType);
        return;
      }

      if (attr) {
        selectAttribute(attr.dataset.attr);
        burst(event.clientX, event.clientY);
        return;
      }

      if (skill) {
        selectSkill(skill.dataset.skill);
        burst(event.clientX, event.clientY);
        return;
      }

      if (ritualFilter) {
        const filter = ritualFilter.dataset.ritualFilter;

        filterRituals(filter);
        burst(event.clientX, event.clientY, filter === "energia" ? "energy" : "normal");
        return;
      }

      if (ritualEnergy) {
        triggerEnergyRitualEffect(ritualEnergy, event.clientX, event.clientY);
        burst(event.clientX, event.clientY, "energy");
        return;
      }

      if (module) {
        activateCard(module, "> módulo de habilidade consultado.");
        burst(event.clientX, event.clientY);
        return;
      }

      if (prosthetic) {
        activateCard(prosthetic, "> seção de prótese/canhão consultada.");
        focusEquipment("arm");
        spawnSensitiveAlert();
        connectEnergyPath();
        burst(event.clientX, event.clientY, "energy");
        return;
      }

      if (timeline) {
        activateCard(timeline, "> ponto do histórico conhecido aberto.");
        burst(event.clientX, event.clientY);
        return;
      }

      if (hotspot) {
        const type = hotspot.dataset.hotspot;

        switchTab("protese");
        focusEquipment(type);
        spawnSensitiveAlert(type === "tank" ? "TANQUE RITUALÍSTICO MONITORADO" : "EQUIPAMENTO PESSOAL SENSÍVEL");
        connectEnergyPath();
        addTerminal(`> hotspot consultado: ${type.toUpperCase()}.`);
        burst(event.clientX, event.clientY, "energy");
        return;
      }

      if (walt) {
        const rect = walt.getBoundingClientRect();
        spawnWaltBoot(rect.left + rect.width / 2, rect.top + 30);
        addTerminal("> Walt: projeto recuperado.");
        burst(event.clientX, event.clientY);
        return;
      }

      if (locked) {
        spawnRedactions(8);
        controlledOverload(event.clientX, event.clientY, "> acesso negado pelo mestre.");
        burst(event.clientX, event.clientY, "energy");
        return;
      }

      if (tankItem) {
        focusEquipment("tank");
        connectEnergyPath();
        controlledOverload(event.clientX, event.clientY, "> tanque ritualístico estabilizado.");
        burst(event.clientX, event.clientY, "energy");
        return;
      }

      if (link) {
        burst(event.clientX, event.clientY);
        return;
      }

      burst(event.clientX, event.clientY);
    });
  }

  function bindPointer() {
    document.addEventListener("pointermove", event => {
      page.style.setProperty("--cursor-x", `${event.clientX}px`);
      page.style.setProperty("--cursor-y", `${event.clientY}px`);
      page.style.setProperty("--mx", `${(event.clientX / innerWidth - 0.5).toFixed(3)}`);
      page.style.setProperty("--my", `${(event.clientY / innerHeight - 0.5).toFixed(3)}`);

      const hoverable = safeClosest(
        event,
        ".tab-button, .attr-button, [data-skill], [data-ritual-filter], [data-module], [data-prosthetic], [data-timeline], .identity-row, .identity-grid-large article, .core-grid article, .back-link, .hero-actions button, .field-role-grid article, .risk-grid article, .living-grid article, .locked-grid article, .relation-grid article, .inventory-bench article, .prosthetic-diagram article, .status-strip article, .handling-protocol"
      );

      if (hoverable) {
        const rect = hoverable.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        hoverable.style.setProperty("--tilt-x", `${py * -5}deg`);
        hoverable.style.setProperty("--tilt-y", `${px * 7}deg`);
      }

      const now = performance.now();

      if (now - lastParticle > 42) {
        lastParticle = now;

        if (Math.random() > 0.18) {
          spawnSpark(event.clientX, event.clientY, false);
        }

        if (Math.random() > 0.38) {
          spawnDot(event.clientX, event.clientY);
        }
      }

      if (now - lastTrace > 240) {
        lastTrace = now;

        if (Math.random() > 0.45) {
          spawnGlitchSlice(event.clientX, event.clientY);
        }
      }

      if (now - lastAmbient > 900) {
        lastAmbient = now;

        const tank = safeClosest(event, ".tank-item, .equipment-status, .attribute-wheel, .ritual-energy");

        if (tank) {
          connectEnergyPath();
        }
      }
    }, { passive: true });

    document.addEventListener("pointerout", event => {
      const hoverable = safeClosest(
        event,
        ".tab-button, .attr-button, [data-skill], [data-ritual-filter], [data-module], [data-prosthetic], [data-timeline], .identity-row, .identity-grid-large article, .core-grid article, .back-link, .hero-actions button, .field-role-grid article, .risk-grid article, .living-grid article, .locked-grid article, .relation-grid article, .inventory-bench article, .prosthetic-diagram article, .status-strip article, .handling-protocol"
      );

      if (!hoverable) return;

      hoverable.style.setProperty("--tilt-x", "0deg");
      hoverable.style.setProperty("--tilt-y", "0deg");
    });
  }

  function bindCardSpecialEffects() {
    document.addEventListener("pointerenter", event => {
      const tank = safeClosest(event, ".tank-item, .equipment-status");

      if (tank) {
        focusEquipment("tank");
        connectEnergyPath();
      }

      const ritual = safeClosest(event, ".ritual-energy");

      if (ritual) {
        page.classList.add("energy-hover");
        const rect = ritual.getBoundingClientRect();

        if (ritual.classList.contains("magnet")) {
          spawnMagnetBits(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
        }
      }

      const walt = safeClosest(event, ".walt-card");

      if (walt) {
        const rect = walt.getBoundingClientRect();
        spawnWaltBoot(rect.left + rect.width / 2, rect.top + 30);
      }

      const locked = safeClosest(event, ".locked-grid article");

      if (locked) {
        spawnRedactions(3);
      }
    }, true);

    document.addEventListener("pointerleave", event => {
      const ritual = safeClosest(event, ".ritual-energy");

      if (ritual) {
        page.classList.remove("energy-hover");
      }
    }, true);
  }

  function spawnAmbientEnergy() {
    const centerX = innerWidth * random(0.12, 0.88);
    const centerY = innerHeight * random(0.12, 0.88);

    spawnSpark(centerX, centerY, true);

    if (Math.random() > 0.35) {
      spawnRune(centerX, centerY);
    }

    if (Math.random() > 0.55) {
      spawnDot(centerX, centerY);
    }

    if (Math.random() > 0.55) {
      spawnGlitchSlice(centerX, centerY);
    }
  }

  function initialBurst() {
    const character = document.querySelector(".character-card");

    if (!character) {
      burst(innerWidth / 2, innerHeight / 2, "energy");
      return;
    }

    const rect = character.getBoundingClientRect();
    const x = rect.left + rect.width * 0.56;
    const y = rect.top + rect.height * 0.42;

    burst(x, y, "energy");

    setTimeout(() => burst(x + 80, y + 120, "energy"), 380);
    setTimeout(() => burst(x - 80, y + 180, "energy"), 760);
    setTimeout(connectEnergyPath, 1100);
  }

  function ambient() {
    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;
      addTerminal(pick(terminalLines));
    }, 6500);

    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;
      spawnAmbientEnergy();
    }, 1200);

    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;

      const tankVisible = document.querySelector(".equipment-status");
      if (tankVisible && Math.random() > 0.48) {
        const rect = tankVisible.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        spawnSpark(x, y, true);
      }
    }, 2200);
  }

  function init() {
    injectFxCss();
    bindSelectionAndContextLocks();
    fxLayer();
    bindClicks();
    bindPointer();
    bindCardSpecialEffects();
    ambient();

    setTimeout(closeLoader, 3800);
    setTimeout(initialBurst, 4200);

    setTimeout(() => {
      burst(innerWidth / 2, innerHeight / 2, "energy");
      addTerminal("> teste visual de Energia executado.");
    }, 900);

    page.classList.add("ready");
    addTerminal("> interface exclusiva da Maisie pronta.");

    console.log("[MAISIE] efeitos ativados.");
  }

  init();
})();
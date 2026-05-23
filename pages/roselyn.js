(() => {
  "use strict";

  console.log("[ROSELYN] roselyn.js carregado.");

  const page = document.querySelector("[data-roselyn-page]");
  const loader = document.querySelector("[data-roselyn-loader]");
  const terminal = document.querySelector("[data-terminal]");
  const attrReading = document.querySelector("[data-attr-reading]");
  const skillDisplay = document.querySelector("[data-skill-display]");
  const mansionDisplay = document.querySelector("[data-mansion-display]");

  if (!page) {
    console.warn("[ROSELYN] página não encontrada.");
    return;
  }

  const attrText = {
    FOR: "FOR 2 — Corpo funcional e treinado. A ficha sustenta esforço físico e manejo de equipamento sem transformar Roselyn em força bruta.",
    AGI: "AGI 3 — Precisão corporal, mira, reflexos, deslocamento e leitura rápida de abertura. O corpo reage no intervalo entre o tic e o tac.",
    INT: "INT 2 — Análise tática, tecnologia, investigação e leitura estratégica. Roselyn calcula rotas, brechas e consequências.",
    PRE: "PRE 1 — Presença contida. Ela ocupa espaço quando quer, mas sua força não vem de domínio social constante.",
    VIG: "VIG 2 — Resistência funcional. O corpo permanece operacional, mesmo quando a mente insiste em voltar para a Mansão Tate."
  };

  const skillText = {
    pontaria: {
      title: "Pontaria +10",
      subtitle: "Alvo travado",
      text: "Perícia central da ficha. Representa precisão com armas de fogo, leitura de alcance, controle do disparo e escolha do momento exato."
    },
    reflexos: {
      title: "Reflexos +10",
      subtitle: "Resposta no intervalo",
      text: "Roselyn reage rápido a ameaças, deslocamentos e janelas de risco. O movimento parece decidido antes do som chegar."
    },
    tatica: {
      title: "Tática +10",
      subtitle: "Leitura de rotas",
      text: "Permite interpretar posicionamento, cobertura, riscos, linhas de tiro e padrões de movimentação inimiga."
    },
    furtividade: {
      title: "Furtividade +10",
      subtitle: "Disparo sem origem",
      text: "Base para operar como atiradora oculta. Sua balística residual depende dessa leitura silenciosa do campo."
    },
    investigacao: {
      title: "Investigação +5",
      subtitle: "Reconstrução da cena",
      text: "Ajuda a remontar acontecimentos, perceber detalhes fora de lugar e identificar padrões de uma ocorrência."
    },
    tecnologia: {
      title: "Tecnologia +5",
      subtitle: "Ferramentas e sistemas",
      text: "Apoia o uso de computador, leitura de equipamentos e interação com dispositivos em missão."
    },
    percepcao: {
      title: "Percepção +5",
      subtitle: "Observação à distância",
      text: "Útil para binóculos, reconhecimento, vigilância e leitura de ameaças antes do contato direto."
    },
    vontade: {
      title: "Vontade +5",
      subtitle: "Âncora interna",
      text: "Importante para resistência mental. O metrônomo reforça essa estabilidade quando está em posse da agente."
    }
  };

  const mansionText = {
    familia: {
      tag: "Ponto 01",
      title: "Família Tate",
      text: "Roselyn é filha de um restaurador de antiguidades e de uma pianista erudita. A mansão era marcada por objetos antigos, instrumentos e memórias preservadas."
    },
    musica: {
      tag: "Ponto 02",
      title: "Sala de música",
      text: "A presença da mãe pianista torna a sala de música um ponto simbólico da ocorrência. A Ordo mantém registros residuais sob restrição."
    },
    metronomo: {
      tag: "Ponto 03",
      title: "Ativação do metrônomo",
      text: "No aniversário de 19 anos de Roselyn, o metrônomo de prata foi ativado. O tempo ao redor pareceu tornar-se espesso e irregular."
    },
    manifestacao: {
      tag: "Ponto 04",
      title: "Manifestação associada à Morte",
      text: "A residência Tate foi tomada por uma manifestação do Medo associada à Morte. Os pais de Roselyn foram perdidos no evento."
    },
    ordem: {
      tag: "Ponto 05",
      title: "Chegada da Ordo",
      text: "Agentes chegaram esperando encontrar apenas vítimas e vestígios. Encontraram Roselyn viva, sentada no chão, segurando o metrônomo."
    },
    rifle: {
      tag: "Ponto 06",
      title: "Rifle do pai",
      text: "Antes de deixar a mansão, Roselyn recuperou o rifle de caça do pai, depois associado à lente de prata oxidada."
    }
  };

  const tabTerminalMessages = {
    resumo: "> registro Tate acessado. leitura parcial liberada.",
    identificacao: "> identificação confirmada. agente: Roselyn Tate.",
    funcao: "> função de campo: cobertura, reconhecimento e análise tática.",
    atributos: "> mira cronotática sincronizada aos atributos.",
    pericias: "> matriz de reconhecimento aberta.",
    habilidades: "> eventos temporais registrados. balística anômala em observação.",
    inventario: "> mesa de relíquias e equipamento militar aberta.",
    rifle: "> lente de prata oxidada em foco.",
    metronomo: "> metrônomo sincronizado. remoção não autorizada.",
    mansao: "> planta investigativa da Mansão Tate recuperada.",
    comportamento: "> leitura comportamental institucional aberta.",
    alertas: "> riscos observados exibidos.",
    registro: "> registro vivo aguardando atualização do jogador.",
    bloqueados: "> ACESSO NEGADO. fragmentos Tate lacrados."
  };

  const terminalLines = [
    "> tic-tac irregular detectado.",
    "> trajetória calculada.",
    "> lente de prata em foco.",
    "> evento suspenso aguardando colapso.",
    "> metrônomo sincronizado.",
    "> alvo observado antes do disparo.",
    "> aviso: percepção temporal não é infalível.",
    "> objeto estabilizador em posse da agente.",
    "> poeira suspensa no intervalo.",
    "> fluxo temporal: espesso.",
    "> relatório Tate parcialmente recuperado.",
    "> rifle do pai classificado como vínculo material."
  ];

  let lastDust = 0;
  let lastLine = 0;
  let lastTick = 0;

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
    if (document.querySelector("#roselyn-force-fx-css")) return;

    const style = document.createElement("style");
    style.id = "roselyn-force-fx-css";

    style.textContent = `
      html,
      body,
      .roselyn-page,
      .roselyn-page * {
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

      .roselyn-fx-layer {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        mix-blend-mode: screen !important;
      }

      .roselyn-dust {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--s) !important;
        height: var(--s) !important;
        border-radius: 50% !important;
        background: rgba(221, 214, 198, .82) !important;
        box-shadow:
          0 0 10px rgba(221, 214, 198, .65),
          0 0 20px rgba(140, 154, 168, .22) !important;
        transform: translate(-50%, -50%) !important;
        animation: roselynDustFloat var(--t) ease forwards !important;
      }

      .roselyn-trajectory {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--w) !important;
        height: 1px !important;
        background: linear-gradient(90deg, transparent, rgba(232, 225, 211, .9), rgba(139, 26, 45, .45), transparent) !important;
        box-shadow:
          0 0 12px rgba(232, 225, 211, .72),
          0 0 24px rgba(117, 138, 155, .28) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: roselynTrajectory .8s ease forwards !important;
      }

      .roselyn-scope-pulse {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: 120px !important;
        height: 120px !important;
        border-radius: 50% !important;
        border: 1px solid rgba(232, 225, 211, .82) !important;
        box-shadow:
          0 0 20px rgba(232, 225, 211, .45),
          inset 0 0 26px rgba(139, 26, 45, .20) !important;
        transform: translate(-50%, -50%) scale(.2) !important;
        animation: roselynScopePulse .8s ease forwards !important;
      }

      .roselyn-scope-pulse::before,
      .roselyn-scope-pulse::after {
        content: "" !important;
        position: absolute !important;
        background: rgba(232, 225, 211, .72) !important;
        left: 50% !important;
        top: 50% !important;
        transform: translate(-50%, -50%) !important;
      }

      .roselyn-scope-pulse::before {
        width: 1px !important;
        height: 140% !important;
      }

      .roselyn-scope-pulse::after {
        width: 140% !important;
        height: 1px !important;
      }

      .roselyn-freeze {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483646 !important;
        pointer-events: none !important;
        background:
          radial-gradient(circle at var(--x) var(--y), rgba(232,225,211,.18), transparent 16rem),
          linear-gradient(180deg, rgba(220,224,226,.04), transparent, rgba(139,26,45,.05)) !important;
        backdrop-filter: grayscale(.55) contrast(1.08) brightness(1.08) !important;
        animation: roselynFreeze .55s ease forwards !important;
        mix-blend-mode: screen !important;
      }

      .roselyn-metronome-beat {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: 3px !important;
        height: var(--h) !important;
        border-radius: 999px !important;
        background: linear-gradient(180deg, transparent, rgba(232,225,211,.95), rgba(139,26,45,.55), transparent) !important;
        box-shadow:
          0 0 18px rgba(232,225,211,.58),
          0 0 32px rgba(139,26,45,.25) !important;
        transform-origin: top center !important;
        transform: translate(-50%, -10%) rotate(var(--r)) !important;
        animation: roselynMetronomeBeat .75s ease forwards !important;
      }

      .roselyn-glass-crack {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--w) !important;
        height: 1px !important;
        background: rgba(232,225,211,.82) !important;
        box-shadow:
          0 0 10px rgba(232,225,211,.55),
          0 0 20px rgba(117,138,155,.25) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: roselynGlassCrack .95s ease forwards !important;
      }

      .roselyn-target-lock {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) !important;
        color: #e8e1d3 !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .68rem !important;
        letter-spacing: .14em !important;
        text-transform: uppercase !important;
        border: 1px solid rgba(232,225,211,.55) !important;
        border-radius: 999px !important;
        padding: .52rem .7rem !important;
        background: rgba(8, 7, 7, .76) !important;
        box-shadow:
          0 0 22px rgba(232,225,211,.20),
          inset 0 0 16px rgba(139,26,45,.18) !important;
        animation: roselynTargetLock .95s ease forwards !important;
      }

      .roselyn-schrodinger-mark {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: 26px !important;
        height: 26px !important;
        border: 1px solid rgba(232,225,211,.75) !important;
        border-radius: 50% !important;
        box-shadow:
          0 0 16px rgba(232,225,211,.52),
          inset 0 0 12px rgba(117,138,155,.35) !important;
        transform: translate(-50%, -50%) !important;
        animation: roselynSchrodingerMark 1.2s ease forwards !important;
      }

      .roselyn-collapse-line {
        position: fixed !important;
        left: var(--x1) !important;
        top: var(--y1) !important;
        width: var(--len) !important;
        height: 2px !important;
        transform-origin: left center !important;
        transform: rotate(var(--angle)) !important;
        border-radius: 999px !important;
        background: linear-gradient(90deg, rgba(232,225,211,0), rgba(232,225,211,.95), rgba(139,26,45,.6), rgba(232,225,211,0)) !important;
        box-shadow:
          0 0 18px rgba(232,225,211,.55),
          0 0 28px rgba(139,26,45,.22) !important;
        animation: roselynCollapseLine .75s ease forwards !important;
      }

      .roselyn-ordo-scan {
        position: absolute !important;
        inset: 0 !important;
        z-index: 50 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        border-radius: inherit !important;
      }

      .roselyn-ordo-scan::before {
        content: "" !important;
        position: absolute !important;
        left: -20% !important;
        right: -20% !important;
        top: -18% !important;
        height: 24px !important;
        background: linear-gradient(90deg, transparent, rgba(232,225,211,.78), rgba(139,26,45,.35), transparent) !important;
        box-shadow:
          0 0 22px rgba(232,225,211,.28),
          0 0 36px rgba(139,26,45,.16) !important;
        animation: roselynOrdoScan 1s ease forwards !important;
      }

      .roselyn-restricted-stamp {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        color: rgba(232,225,211,.88) !important;
        border: 2px solid rgba(139,26,45,.72) !important;
        border-radius: 12px !important;
        padding: .7rem 1rem !important;
        background: rgba(5,5,5,.72) !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .72rem !important;
        letter-spacing: .18em !important;
        text-transform: uppercase !important;
        box-shadow:
          0 0 22px rgba(139,26,45,.28),
          inset 0 0 18px rgba(232,225,211,.06) !important;
        animation: roselynRestrictedStamp 1.1s ease forwards !important;
      }

      .roselyn-right-click-mark {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        transform: translate(-50%, -50%) !important;
        color: #e8e1d3 !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .68rem !important;
        letter-spacing: .14em !important;
        text-transform: uppercase !important;
        border: 1px solid rgba(139, 26, 45, .72) !important;
        border-radius: 999px !important;
        padding: .55rem .75rem !important;
        background: rgba(0, 0, 0, .76) !important;
        box-shadow:
          0 0 24px rgba(139, 26, 45, .34),
          inset 0 0 16px rgba(232, 225, 211, .08) !important;
        animation: roselynRightClickMark .95s ease forwards !important;
      }

      .roselyn-page.time-paused {
        animation: roselynPagePause .46s steps(2) !important;
      }

      .ability-grid button.schrodinger-active {
        box-shadow:
          0 0 34px rgba(232,225,211,.22),
          inset 0 0 30px rgba(117,138,155,.18) !important;
      }

      .ability-grid button.schrodinger-active::after {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        border-radius: inherit !important;
        border: 1px solid rgba(232,225,211,.55) !important;
        animation: roselynCardCollapse .7s ease forwards !important;
        pointer-events: none !important;
      }

      .character-card.scope-focus .character-image {
        filter:
          drop-shadow(0 0 26px rgba(232,225,211,.38))
          drop-shadow(0 24px 36px rgba(0,0,0,.72)) !important;
      }

      .reader-section.reading-focus {
        box-shadow:
          inset 0 0 46px rgba(232,225,211,.07),
          0 0 70px rgba(0,0,0,.72),
          0 0 34px rgba(139,26,45,.13) !important;
      }

      @keyframes roselynDustFloat {
        0% { opacity: 0; transform: translate(-50%, -50%) translate(0, 0) scale(.45); }
        18% { opacity: .85; }
        100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(.18); }
      }

      @keyframes roselynTrajectory {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scaleX(.15); filter: blur(2px); }
        22% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) translateX(var(--move)) scaleX(1.2); filter: blur(2px); }
      }

      @keyframes roselynScopePulse {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.2); filter: blur(4px); }
        24% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.8); filter: blur(3px); }
      }

      @keyframes roselynFreeze {
        0% { opacity: 0; filter: grayscale(0) contrast(1); }
        18% { opacity: 1; }
        100% { opacity: 0; filter: grayscale(1) contrast(1.12); }
      }

      @keyframes roselynMetronomeBeat {
        0% { opacity: 0; transform: translate(-50%, -10%) rotate(var(--r)) scaleY(.2); }
        25% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -10%) rotate(calc(var(--r) * -1)) scaleY(1.1); }
      }

      @keyframes roselynGlassCrack {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scaleX(.05); }
        24% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scaleX(1.15); }
      }

      @keyframes roselynTargetLock {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.82); filter: blur(5px); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
        75% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) translateY(-15px) scale(1.04); filter: blur(4px); }
      }

      @keyframes roselynSchrodingerMark {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.4); filter: blur(5px); }
        25% { opacity: 1; filter: blur(0); }
        75% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.45); filter: blur(4px); }
      }

      @keyframes roselynCollapseLine {
        0% { opacity: 0; filter: blur(3px); transform: rotate(var(--angle)) scaleX(.1); }
        25% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: rotate(var(--angle)) scaleX(1); filter: blur(3px); }
      }

      @keyframes roselynOrdoScan {
        from { transform: translateY(-120%); opacity: 0; }
        35% { opacity: 1; }
        to { transform: translateY(900%); opacity: 0; }
      }

      @keyframes roselynRestrictedStamp {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scale(1.2); filter: blur(5px); }
        24% { opacity: 1; filter: blur(0); }
        80% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scale(.95); filter: blur(4px); }
      }

      @keyframes roselynRightClickMark {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.8); filter: blur(5px); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
        75% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) translateY(-16px) scale(1.04); filter: blur(4px); }
      }

      @keyframes roselynPagePause {
        0%, 100% { transform: translate(0,0); filter: none; }
        35% { transform: translate(1px,-1px); filter: grayscale(.45) brightness(1.08) contrast(1.06); }
        70% { transform: translate(-1px,1px); filter: grayscale(.3) brightness(1.04); }
      }

      @keyframes roselynCardCollapse {
        0% { opacity: 0; transform: scale(.9); filter: blur(5px); }
        25% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: scale(1.08); filter: blur(4px); }
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
      addTerminal("> cópia bloqueada. relatório restrito.");
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
    let layer = document.querySelector(".roselyn-fx-layer");

    if (!layer) {
      layer = document.createElement("div");
      layer.className = "roselyn-fx-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
    }

    return layer;
  }

  function spawnDust(x, y, amount = 1) {
    const layer = fxLayer();

    for (let i = 0; i < amount; i++) {
      const dust = document.createElement("span");

      dust.className = "roselyn-dust";
      dust.style.setProperty("--x", `${x + random(-18, 18)}px`);
      dust.style.setProperty("--y", `${y + random(-18, 18)}px`);
      dust.style.setProperty("--dx", `${random(-34, 34)}px`);
      dust.style.setProperty("--dy", `${random(-42, 26)}px`);
      dust.style.setProperty("--s", `${random(2, 6)}px`);
      dust.style.setProperty("--t", `${random(1.2, 2.4)}s`);

      layer.appendChild(dust);

      setTimeout(() => dust.remove(), 2500);
    }
  }

  function spawnTrajectory(x, y, intense = false) {
    const layer = fxLayer();
    const line = document.createElement("span");

    line.className = "roselyn-trajectory";
    line.style.setProperty("--x", `${x}px`);
    line.style.setProperty("--y", `${y}px`);
    line.style.setProperty("--w", intense ? `${random(220, 420)}px` : `${random(120, 280)}px`);
    line.style.setProperty("--r", `${random(-12, 12)}deg`);
    line.style.setProperty("--move", `${random(70, 180)}px`);

    layer.appendChild(line);

    setTimeout(() => line.remove(), 900);
  }

  function spawnScopePulse(x, y) {
    const layer = fxLayer();
    const pulse = document.createElement("span");

    pulse.className = "roselyn-scope-pulse";
    pulse.style.setProperty("--x", `${x}px`);
    pulse.style.setProperty("--y", `${y}px`);

    layer.appendChild(pulse);

    setTimeout(() => pulse.remove(), 850);
  }

  function spawnFreeze(x, y) {
    const freeze = document.createElement("span");

    freeze.className = "roselyn-freeze";
    freeze.style.setProperty("--x", `${x}px`);
    freeze.style.setProperty("--y", `${y}px`);

    document.body.appendChild(freeze);

    setTimeout(() => freeze.remove(), 600);
  }

  function spawnMetronomeBeat(x, y) {
    const layer = fxLayer();
    const beat = document.createElement("span");

    beat.className = "roselyn-metronome-beat";
    beat.style.setProperty("--x", `${x}px`);
    beat.style.setProperty("--y", `${y}px`);
    beat.style.setProperty("--h", `${random(120, 260)}px`);
    beat.style.setProperty("--r", `${random(-18, 18)}deg`);

    layer.appendChild(beat);

    setTimeout(() => beat.remove(), 850);
  }

  function spawnGlassCracks(x, y, amount = 7) {
    const layer = fxLayer();

    for (let i = 0; i < amount; i++) {
      const crack = document.createElement("span");

      crack.className = "roselyn-glass-crack";
      crack.style.setProperty("--x", `${x + random(-24, 24)}px`);
      crack.style.setProperty("--y", `${y + random(-24, 24)}px`);
      crack.style.setProperty("--w", `${random(42, 130)}px`);
      crack.style.setProperty("--r", `${random(-88, 88)}deg`);

      layer.appendChild(crack);

      setTimeout(() => crack.remove(), 1000);
    }
  }

  function spawnTargetLock(x, y, text = "ALVO TRAVADO") {
    const mark = document.createElement("span");

    mark.className = "roselyn-target-lock";
    mark.textContent = text;
    mark.style.setProperty("--x", `${x}px`);
    mark.style.setProperty("--y", `${y}px`);

    document.body.appendChild(mark);

    setTimeout(() => mark.remove(), 1000);
  }

  function spawnRestrictedStamp(x, y, text = "ACESSO RESTRITO") {
    const stamp = document.createElement("span");

    stamp.className = "roselyn-restricted-stamp";
    stamp.textContent = text;
    stamp.style.setProperty("--x", `${x}px`);
    stamp.style.setProperty("--y", `${y}px`);
    stamp.style.setProperty("--r", `${random(-8, 8)}deg`);

    document.body.appendChild(stamp);

    setTimeout(() => stamp.remove(), 1150);
  }

  function spawnRightClickMark(x, y) {
    const mark = document.createElement("span");

    mark.className = "roselyn-right-click-mark";
    mark.textContent = "MENU EXTERNO NEGADO";

    mark.style.setProperty("--x", `${x}px`);
    mark.style.setProperty("--y", `${y}px`);

    document.body.appendChild(mark);

    setTimeout(() => mark.remove(), 1000);
  }

  function spawnSchrodingerMarks(x, y) {
    const layer = fxLayer();
    const points = [
      { x: x - 54, y: y - 34 },
      { x: x + 48, y: y - 18 },
      { x: x + 8, y: y + 58 }
    ];

    points.forEach(point => {
      const mark = document.createElement("span");

      mark.className = "roselyn-schrodinger-mark";
      mark.style.setProperty("--x", `${point.x}px`);
      mark.style.setProperty("--y", `${point.y}px`);

      layer.appendChild(mark);

      setTimeout(() => mark.remove(), 1250);
    });

    setTimeout(() => {
      spawnCollapseLine(points[0].x, points[0].y, x, y);
      spawnCollapseLine(points[1].x, points[1].y, x, y);
      spawnCollapseLine(points[2].x, points[2].y, x, y);
      spawnScopePulse(x, y);
      spawnGlassCracks(x, y, 5);
    }, 520);
  }

  function spawnCollapseLine(x1, y1, x2, y2) {
    const layer = fxLayer();
    const line = document.createElement("span");

    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    line.className = "roselyn-collapse-line";
    line.style.setProperty("--x1", `${x1}px`);
    line.style.setProperty("--y1", `${y1}px`);
    line.style.setProperty("--len", `${len}px`);
    line.style.setProperty("--angle", `${angle}deg`);

    layer.appendChild(line);

    setTimeout(() => line.remove(), 800);
  }

  function temporalClick(x, y, type = "normal") {
    if (window.OrdoPerf?.canSpawnVfx && !window.OrdoPerf.canSpawnVfx("roselyn-click", type === "shot" ? 9 : 6)) return;
    spawnScopePulse(x, y);
    spawnFreeze(x, y);
    spawnMetronomeBeat(x, y);

    const trajectoryAmount = window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(type === "shot" ? 5 : 2, .75, .55) : (type === "shot" ? 5 : 2);
    const dustAmount = window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(type === "shot" ? 16 : 8, .7, .45) : (type === "shot" ? 16 : 8);

    for (let i = 0; i < trajectoryAmount; i++) {
      spawnTrajectory(x + random(-35, 35), y + random(-35, 35), type === "shot");
    }

    spawnDust(x, y, dustAmount);

    if (type === "glass") {
      spawnGlassCracks(x, y, 9);
    }

    if (type === "restricted") {
      spawnRestrictedStamp(x, y);
    }
  }

  function pausePage(x, y, message = "> tempo suspenso por um intervalo.") {
    page.classList.add("time-paused");
    spawnFreeze(x, y);
    spawnMetronomeBeat(x, y);
    addTerminal(message);

    setTimeout(() => {
      page.classList.remove("time-paused");
    }, 500);
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
    scan.className = "roselyn-ordo-scan";
    activePanel.appendChild(scan);

    setTimeout(() => scan.remove(), 1050);
  }

  function setReadingFocus(active = true) {
    const reader = document.querySelector(".reader-section");
    if (!reader) return;

    reader.classList.toggle("reading-focus", active);

    if (active) {
      setTimeout(() => {
        reader.classList.remove("reading-focus");
      }, 1400);
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
      setTimeout(addOrdoScanToActivePanel, 130);
    }

    if (["comportamento", "mansao", "registro", "metronomo", "rifle"].includes(tabName)) {
      setTimeout(() => setReadingFocus(true), 150);
    }

    if (tabName === "rifle") {
      setTimeout(() => {
        const rifle = getCenter(".rifle-display", innerWidth * 0.5, innerHeight * 0.7);
        spawnTargetLock(rifle.x, rifle.y, "LENTE EM FOCO");
        temporalClick(rifle.x, rifle.y, "shot");
      }, 220);
    }

    if (tabName === "metronomo") {
      setTimeout(() => {
        const met = getCenter(".metronome-panel", innerWidth * 0.5, innerHeight * 0.7);
        spawnMetronomeBeat(met.x, met.y);
        spawnTargetLock(met.x, met.y, "METRÔNOMO SINCRONIZADO");
      }, 220);
    }

    if (tabName === "mansao") {
      setTimeout(() => {
        const map = getCenter(".mansion-map", innerWidth * 0.5, innerHeight * 0.72);
        spawnGlassCracks(map.x, map.y, 8);
        spawnRestrictedStamp(map.x, map.y, "CASO TATE");
      }, 220);
    }

    if (tabName === "bloqueados") {
      page.classList.add("time-paused");
      spawnRestrictedStamp(innerWidth / 2, innerHeight / 2, "RESTRITO AO MESTRE");
      spawnGlassCracks(innerWidth / 2, innerHeight / 2, 11);
      pausePage(innerWidth / 2, innerHeight / 2, "> fragmentos Tate lacrados.");

      setTimeout(() => {
        page.classList.remove("time-paused");
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

    if (skillName === "pontaria") {
      const display = skillDisplay.getBoundingClientRect();
      spawnTargetLock(display.left + display.width / 2, display.top + display.height / 2);
    }
  }

  function selectMansionPoint(pointName) {
    const data = mansionText[pointName];
    if (!data || !mansionDisplay) return;

    document.querySelectorAll("[data-mansion]").forEach(button => {
      button.classList.toggle("active", button.dataset.mansion === pointName);
    });

    mansionDisplay.innerHTML = `
      <span>${data.tag}</span>
      <h3>${data.title}</h3>
      <p>${data.text}</p>
    `;

    addTerminal(`> Mansão Tate: ${data.title}.`);

    const rect = mansionDisplay.getBoundingClientRect();
    temporalClick(rect.left + rect.width / 2, rect.top + 50, "glass");
    addOrdoScanToActivePanel();
  }

  function activateCard(card, message) {
    card.classList.add("clicked");
    addTerminal(message);

    setTimeout(() => {
      card.classList.remove("clicked");
    }, 850);
  }

  function focusScope(type) {
    const characterCard = document.querySelector(".character-card");
    const metronomeStatus = document.querySelector(".metronome-status");

    if (characterCard) {
      characterCard.classList.add("scope-focus");

      setTimeout(() => {
        characterCard.classList.remove("scope-focus");
      }, 1100);
    }

    if (metronomeStatus && type === "metronome") {
      metronomeStatus.classList.add("metronome-alert");

      setTimeout(() => {
        metronomeStatus.classList.remove("metronome-alert");
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

  function triggerAbilityEffect(card, x, y) {
    const ability = card.dataset.ability || "";
    activateCard(card, "> habilidade consultada.");

    if (ability === "schrodinger") {
      card.classList.add("schrodinger-active");
      spawnSchrodingerMarks(x, y);
      pausePage(x, y, "> Tiro de Schrödinger: evento suspenso.");

      setTimeout(() => {
        card.classList.remove("schrodinger-active");
        addTerminal("> tiros suspensos colapsaram simultaneamente.");
      }, 900);

      return;
    }

    if (ability === "balistica") {
      spawnTargetLock(x, y, "DISPARO SEM RASTRO");
      temporalClick(x, y, "shot");
      addTerminal("> Balística Residual: origem do disparo ocultada.");
      return;
    }

    if (ability === "pointblank") {
      spawnScopePulse(x, y);
      spawnGlassCracks(x, y, 6);
      spawnTargetLock(x, y, "DISTÂNCIA QUEBRADA");
      addTerminal("> Point Blank: impacto próximo registrado.");
      return;
    }

    if (ability === "visaodeouro") {
      spawnTargetLock(x, y, "BRECHA MARCADA");
      spawnTrajectory(x, y, true);
      addTerminal("> Visão de Ouro: falha analisada.");
      return;
    }

    temporalClick(x, y, "normal");
  }

  function doubleClickEffect(x, y) {
    spawnSchrodingerMarks(x, y);
    spawnMetronomeBeat(x, y);
    spawnFreeze(x, y);

    for (let i = 0; i < 4; i++) {
      spawnTrajectory(x + random(-60, 60), y + random(-60, 60), true);
    }

    addTerminal("> duplo clique: colapso temporal forçado.");
  }

  function rightClickEffect(x, y) {
    spawnRightClickMark(x, y);
    spawnRestrictedStamp(x, y, "COMANDO NEGADO");
    spawnGlassCracks(x, y, 5);
    spawnFreeze(x, y);

    addTerminal("> botão direito bloqueado. menu externo negado.");
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
      const ability = safeClosest(event, "[data-ability]");
      const mansion = safeClosest(event, "[data-mansion]");
      const hotspot = safeClosest(event, "[data-hotspot]");
      const relic = safeClosest(event, "[data-relic]");
      const locked = safeClosest(event, ".locked-grid article");
      const rifleDisplay = safeClosest(event, ".rifle-display");
      const metronomePanel = safeClosest(event, ".metronome-panel, .metronome-status");
      const link = safeClosest(event, "a");

      if (skip) {
        closeLoader();
        temporalClick(event.clientX, event.clientY, "shot");
        addTerminal("> carregamento encerrado manualmente.");
        return;
      }

      if (jump) {
        switchTab(jump.dataset.jumpTab);
        temporalClick(event.clientX, event.clientY, "shot");
        return;
      }

      if (tab) {
        const tabName = tab.dataset.tab;
        const importantTabs = ["rifle", "metronomo", "mansao", "habilidades"];
        const effectType = importantTabs.includes(tabName) ? "shot" : "normal";

        switchTab(tabName);
        temporalClick(event.clientX, event.clientY, effectType);
        return;
      }

      if (attr) {
        selectAttribute(attr.dataset.attr);
        temporalClick(event.clientX, event.clientY);
        return;
      }

      if (skill) {
        selectSkill(skill.dataset.skill);
        temporalClick(event.clientX, event.clientY);
        return;
      }

      if (ability) {
        triggerAbilityEffect(ability, event.clientX, event.clientY);
        return;
      }

      if (mansion) {
        selectMansionPoint(mansion.dataset.mansion);
        return;
      }

      if (hotspot) {
        const type = hotspot.dataset.hotspot;

        if (type === "rifle" || type === "lens") {
          switchTab("rifle");
          focusScope("rifle");
          spawnTargetLock(event.clientX, event.clientY, type === "lens" ? "LENTE EM FOCO" : "RIFLE DO PAI");
          temporalClick(event.clientX, event.clientY, "shot");
        }

        if (type === "metronome") {
          switchTab("metronomo");
          focusScope("metronome");
          spawnTargetLock(event.clientX, event.clientY, "METRÔNOMO SINCRONIZADO");
          temporalClick(event.clientX, event.clientY, "normal");
        }

        return;
      }

      if (relic) {
        const type = relic.dataset.relic;

        if (type === "metronome") {
          switchTab("metronomo");
          temporalClick(event.clientX, event.clientY);
        } else {
          switchTab("rifle");
          temporalClick(event.clientX, event.clientY, "shot");
        }

        return;
      }

      if (locked) {
        spawnRestrictedStamp(event.clientX, event.clientY, "RESTRITO");
        spawnGlassCracks(event.clientX, event.clientY, 7);
        pausePage(event.clientX, event.clientY, "> acesso negado pelo mestre.");
        return;
      }

      if (rifleDisplay) {
        spawnTargetLock(event.clientX, event.clientY, "MIRA AJUSTADA");
        temporalClick(event.clientX, event.clientY, "shot");
        return;
      }

      if (metronomePanel) {
        focusScope("metronome");
        spawnTargetLock(event.clientX, event.clientY, "TIC... TAC...");
        temporalClick(event.clientX, event.clientY);
        return;
      }

      if (link) {
        temporalClick(event.clientX, event.clientY);
        return;
      }

      temporalClick(event.clientX, event.clientY);
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
        ".tab-button, .attr-button, [data-skill], [data-ability], [data-mansion], .identity-row, .identity-grid-large article, .core-grid article, .back-link, .hero-actions button, .field-role-grid article, .risk-grid article, .living-grid article, .locked-grid article, .inventory-grid article, .status-strip article, .handling-protocol, .rifle-display article, .metronome-data article"
      );

      if (hoverable) {
        const rect = hoverable.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        hoverable.style.setProperty("--tilt-x", `${py * -4}deg`);
        hoverable.style.setProperty("--tilt-y", `${px * 5}deg`);
      }

      const now = performance.now();

      if (now - lastDust > 95) {
        lastDust = now;

        if (Math.random() > 0.32) {
          spawnDust(event.clientX, event.clientY, 1);
        }
      }

      if (now - lastLine > 330) {
        lastLine = now;

        if (Math.random() > 0.56) {
          spawnTrajectory(event.clientX, event.clientY, false);
        }
      }

      if (now - lastTick > 1200) {
        lastTick = now;

        const important = safeClosest(event, ".attribute-wheel, .metronome-panel, .metronome-status, .rifle-display, .ability-grid button, .relic-item");

        if (important) {
          spawnMetronomeBeat(event.clientX, event.clientY);
        }
      }
    }, { passive: true });

    document.addEventListener("pointerout", event => {
      const hoverable = safeClosest(
        event,
        ".tab-button, .attr-button, [data-skill], [data-ability], [data-mansion], .identity-row, .identity-grid-large article, .core-grid article, .back-link, .hero-actions button, .field-role-grid article, .risk-grid article, .living-grid article, .locked-grid article, .inventory-grid article, .status-strip article, .handling-protocol, .rifle-display article, .metronome-data article"
      );

      if (!hoverable) return;

      hoverable.style.setProperty("--tilt-x", "0deg");
      hoverable.style.setProperty("--tilt-y", "0deg");
    });
  }

  function bindCardSpecialEffects() {
    document.addEventListener("pointerenter", event => {
      const rifle = safeClosest(event, ".rifle-display, .hotspot-rifle, .hotspot-lens");

      if (rifle) {
        focusScope("rifle");
        const rect = rifle.getBoundingClientRect();
        spawnTargetLock(rect.left + rect.width / 2, rect.top + rect.height / 2, "MIRA EM FOCO");
      }

      const metronome = safeClosest(event, ".metronome-panel, .metronome-status, .hotspot-metronome");

      if (metronome) {
        focusScope("metronome");
        const rect = metronome.getBoundingClientRect();
        spawnMetronomeBeat(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      const locked = safeClosest(event, ".locked-grid article");

      if (locked) {
        const rect = locked.getBoundingClientRect();
        spawnRestrictedStamp(rect.left + rect.width / 2, rect.top + rect.height / 2, "RESTRITO");
      }
    }, true);
  }

  function spawnAmbientTime() {
    const x = innerWidth * random(0.12, 0.88);
    const y = innerHeight * random(0.12, 0.88);

    spawnDust(x, y, 3);

    if (Math.random() > 0.52) {
      spawnTrajectory(x, y, false);
    }

    if (Math.random() > 0.72) {
      spawnMetronomeBeat(x, y);
    }
  }

  function initialBurst() {
    const character = document.querySelector(".character-card");

    if (!character) {
      temporalClick(innerWidth / 2, innerHeight / 2, "shot");
      return;
    }

    const rect = character.getBoundingClientRect();
    const x = rect.left + rect.width * 0.55;
    const y = rect.top + rect.height * 0.42;

    temporalClick(x, y, "shot");

    setTimeout(() => spawnTargetLock(x + 80, y + 80, "ALVO OBSERVADO"), 450);
    setTimeout(() => spawnGlassCracks(x - 70, y + 110, 6), 800);
    setTimeout(() => spawnMetronomeBeat(x, y), 1100);
  }

  function ambient() {
    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;
      addTerminal(pick(terminalLines));
    }, 7000);

    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;
      spawnAmbientTime();
    }, 1650);

    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;

      const metronome = document.querySelector(".metronome-status");
      if (metronome && Math.random() > 0.42) {
        const rect = metronome.getBoundingClientRect();
        spawnMetronomeBeat(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }, 2400);
  }

  function init() {
    injectFxCss();
    bindSelectionAndContextLocks();
    fxLayer();
    bindClicks();
    bindPointer();
    bindCardSpecialEffects();
    ambient();

    setTimeout(closeLoader, 4200);
    setTimeout(initialBurst, 4550);

    setTimeout(() => {
      temporalClick(innerWidth / 2, innerHeight / 2, "shot");
      addTerminal("> teste visual cronotático executado.");
    }, 900);

    page.classList.add("ready");
    addTerminal("> registro cronotático da Roselyn pronto.");

    console.log("[ROSELYN] efeitos ativados.");
  }

  init();
})();
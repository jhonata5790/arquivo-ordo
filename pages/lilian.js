(() => {
  "use strict";

  console.log("[LILIAN] lilian.js carregado.");

  const page = document.querySelector("[data-lilian-page]");
  const loader = document.querySelector("[data-lilian-loader]");
  const terminal = document.querySelector("[data-terminal]");
  const attrReading = document.querySelector("[data-attr-reading]");
  const skillDisplay = document.querySelector("[data-skill-display]");

  if (!page) {
    console.warn("[LILIAN] página não encontrada.");
    return;
  }

  const attrText = {
    FOR: "FOR 3 — Impacto direto. A ficha registra força alta, voltada para manoplas, pressão corporal, confronto físico e contenção de ameaça.",
    AGI: "AGI 2 — Movimento de ringue. Mobilidade funcional, deslocamento curto, reação de luta e leitura de distância.",
    INT: "INT 1 — Foco direto. Não representa burrice: Lilian age pelo corpo, pela resposta imediata e pela proteção, não por análise longa.",
    PRE: "PRE 1 — Presença social baixa não significa ausência. A postura dela pesa em silêncio, mas não busca dominar o ambiente pela fala.",
    VIG: "VIG 3 — Casca Grossa. Resistência elevada, bloqueio forte e corpo treinado para continuar de pé. A Ordo alerta: aguentar não é estar bem."
  };

  const skillText = {
    luta: {
      title: "Luta +10",
      subtitle: "Corpo como arma",
      text: "Perícia central da ficha. Representa manoplas, confronto direto, controle de distância curta e resposta física imediata."
    },
    fortitude: {
      title: "Fortitude +10",
      subtitle: "A muralha aguenta",
      text: "Resistência física alta. Lilian suporta impacto, pressão e desgaste, mas isso não deve ser confundido com ausência de dano."
    },
    atletismo: {
      title: "Atletismo +5",
      subtitle: "Corpo em avanço",
      text: "Força aplicada em movimento, perseguição, empurrão, deslocamento e esforço bruto controlado."
    },
    acrobacia: {
      title: "Acrobacia +5",
      subtitle: "Jogo de pernas",
      text: "Movimento corporal, esquiva curta e adaptação física em terreno instável ou combate próximo."
    },
    reflexos: {
      title: "Reflexos +5",
      subtitle: "Guarda sobe antes da dúvida",
      text: "Resposta rápida diante de ameaça, impacto súbito e ataque contra aliados próximos."
    },
    iniciativa: {
      title: "Iniciativa +5",
      subtitle: "Primeiro passo para a frente",
      text: "Capacidade de entrar no combate antes que a ameaça alcance quem está atrás dela."
    },
    pontaria: {
      title: "Pontaria +5",
      subtitle: "Plano secundário",
      text: "Registro funcional para armas à distância, mas não é o centro da identidade operacional da agente."
    },
    crime: {
      title: "Crime +5",
      subtitle: "Sobrevivência fora do ringue",
      text: "Perícia associada a ambientes hostis, improvisados e moralmente ambíguos."
    }
  };

  const roundText = {
    round1: "> Round 1: casa cheia, presença vazia.",
    round2: "> Round 2: briga como prova de existência.",
    round3: "> Round 3: Seu Jonas transformou raiva em técnica.",
    round4: "> Round 4: Lucas registrado como vínculo estabilizador.",
    round5: "> Round 5: Mulher Sem Rosto detectada no corredor.",
    round6: "> Round 6: rinha clandestina confirmou o Outro Lado.",
    round7: "> Round 7: força convertida em função de campo pela Ordo."
  };

  const tabTerminalMessages = {
    resumo: "> registro de contenção acessado.",
    identificacao: "> identificação confirmada. agente: Lilian Rodrigues Moretti.",
    funcao: "> função de campo: linha de frente, proteção e contenção.",
    atributos: "> roda de impacto sincronizada aos atributos.",
    pericias: "> mapa de impacto aberto.",
    habilidades: "> módulos de combate carregados.",
    inventario: "> carga leve / corpo pesado acessado.",
    manoplas: "> manoplas registradas como arma central.",
    casca: "> Casca Grossa: camada defensiva em leitura.",
    ringue: "> ringue interno detectado.",
    historico: "> histórico em rounds carregado.",
    relacoes: "> vínculos relevantes abertos.",
    comportamento: "> leitura comportamental da Ordo acessada.",
    alertas: "> riscos observados exibidos.",
    registro: "> registro vivo aguardando atualização da jogadora.",
    bloqueados: "> ACESSO NEGADO. fragmentos lacrados por impacto."
  };

  const terminalLines = [
    "> linha de frente posicionada.",
    "> bloqueio registrado.",
    "> impacto absorvido.",
    "> ameaça redirecionada.",
    "> Casca Grossa ativa.",
    "> não confundir silêncio com estabilidade.",
    "> avaliação médica recomendada após operação.",
    "> vínculo estabilizador: Lucas Moretti.",
    "> ringue interno detectado.",
    "> manoplas em condição operacional.",
    "> guarda fechada.",
    "> corpo como escudo.",
    "> aviso: agente minimiza ferimentos.",
    "> contenção física pronta."
  ];

  let lastDust = 0;
  let lastCrack = 0;
  let lastImpactTrace = 0;

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
    if (document.querySelector("#lilian-force-fx-css")) return;

    const style = document.createElement("style");
    style.id = "lilian-force-fx-css";

    style.textContent = `
      html,
      body,
      .lilian-page,
      .lilian-page * {
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

      .lilian-fx-layer {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        mix-blend-mode: screen !important;
      }

      .lilian-impact-dust {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--s) !important;
        height: var(--s) !important;
        border-radius: 50% !important;
        background: rgba(214, 203, 190, .88) !important;
        box-shadow:
          0 0 10px rgba(214, 203, 190, .48),
          0 0 18px rgba(112, 81, 93, .28) !important;
        transform: translate(-50%, -50%) !important;
        animation: lilianDust var(--t) ease forwards !important;
      }

      .lilian-impact-wave {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: 46px !important;
        height: 46px !important;
        border-radius: 50% !important;
        border: 3px solid rgba(128, 34, 50, .86) !important;
        box-shadow:
          0 0 18px rgba(128, 34, 50, .62),
          inset 0 0 22px rgba(214, 203, 190, .20) !important;
        transform: translate(-50%, -50%) scale(.18) !important;
        animation: lilianImpactWave .72s cubic-bezier(.15,.86,.32,1) forwards !important;
      }

      .lilian-heavy-wave {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: 120px !important;
        height: 120px !important;
        border-radius: 50% !important;
        border: 4px solid rgba(214, 203, 190, .78) !important;
        box-shadow:
          0 0 26px rgba(214, 203, 190, .40),
          inset 0 0 30px rgba(128, 34, 50, .24) !important;
        transform: translate(-50%, -50%) scale(.12) !important;
        animation: lilianHeavyWave .82s ease forwards !important;
      }

      .lilian-crack {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--w) !important;
        height: 2px !important;
        background:
          linear-gradient(90deg, transparent, rgba(214,203,190,.82), rgba(128,34,50,.55), transparent) !important;
        box-shadow:
          0 0 12px rgba(214,203,190,.32),
          0 0 20px rgba(128,34,50,.24) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: lilianCrack .92s ease forwards !important;
      }

      .lilian-fist-mark {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--s) !important;
        height: var(--s) !important;
        border-radius: 45% 42% 48% 40% !important;
        border: 2px solid rgba(214,203,190,.46) !important;
        background:
          radial-gradient(circle at 50% 45%, rgba(128,34,50,.42), transparent 62%),
          rgba(0,0,0,.18) !important;
        box-shadow:
          inset 0 0 18px rgba(0,0,0,.38),
          0 0 20px rgba(128,34,50,.24) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) scale(.68) !important;
        animation: lilianFistMark 1.05s ease forwards !important;
      }

      .lilian-guard-shield {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: 130px !important;
        height: 150px !important;
        border-radius: 34px 34px 52px 52px !important;
        border: 2px solid rgba(214,203,190,.66) !important;
        background:
          radial-gradient(circle at 50% 35%, rgba(214,203,190,.12), transparent 60%),
          linear-gradient(180deg, rgba(128,34,50,.18), rgba(0,0,0,.10)) !important;
        box-shadow:
          0 0 28px rgba(214,203,190,.18),
          inset 0 0 28px rgba(128,34,50,.15) !important;
        transform: translate(-50%, -50%) scale(.4) !important;
        animation: lilianGuardShield .95s ease forwards !important;
      }

      .lilian-warning-text {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) !important;
        color: #f2e8dc !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .74rem !important;
        letter-spacing: .16em !important;
        text-transform: uppercase !important;
        border: 1px solid rgba(128,34,50,.78) !important;
        border-radius: 999px !important;
        padding: .62rem .82rem !important;
        background: rgba(0,0,0,.80) !important;
        box-shadow:
          0 0 26px rgba(128,34,50,.34),
          inset 0 0 18px rgba(214,203,190,.08) !important;
        animation: lilianWarningText 1.05s ease forwards !important;
      }

      .lilian-ataca-ela {
        position: fixed !important;
        left: 50% !important;
        top: 20% !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) !important;
        color: #fff4ec !important;
        font-family: Impact, Haettenschweiler, "Arial Black", sans-serif !important;
        font-size: clamp(2.4rem, 7vw, 6rem) !important;
        letter-spacing: .08em !important;
        text-transform: uppercase !important;
        text-shadow:
          0 0 18px rgba(128,34,50,.85),
          4px 4px 0 rgba(0,0,0,.85) !important;
        -webkit-text-stroke: 1px rgba(128,34,50,.80) !important;
        animation: lilianAtacaEla .9s cubic-bezier(.18,.9,.24,1) forwards !important;
      }

      .lilian-screen-impact {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483646 !important;
        pointer-events: none !important;
        background:
          radial-gradient(circle at var(--x) var(--y), rgba(128,34,50,.22), transparent 16rem),
          radial-gradient(circle at var(--x) var(--y), rgba(214,203,190,.12), transparent 26rem) !important;
        animation: lilianScreenImpact .58s ease forwards !important;
        mix-blend-mode: screen !important;
      }

      .lilian-ordo-scan {
        position: absolute !important;
        inset: 0 !important;
        z-index: 50 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        border-radius: inherit !important;
      }

      .lilian-ordo-scan::before {
        content: "" !important;
        position: absolute !important;
        left: -20% !important;
        right: -20% !important;
        top: -18% !important;
        height: 28px !important;
        background:
          linear-gradient(90deg, transparent, rgba(214,203,190,.66), rgba(128,34,50,.48), transparent) !important;
        box-shadow:
          0 0 22px rgba(214,203,190,.24),
          0 0 36px rgba(128,34,50,.20) !important;
        animation: lilianOrdoScan .9s ease forwards !important;
      }

      .lilian-restricted-stamp {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        color: rgba(242,232,220,.92) !important;
        border: 2px solid rgba(128,34,50,.78) !important;
        border-radius: 12px !important;
        padding: .7rem 1rem !important;
        background: rgba(5,5,5,.78) !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .72rem !important;
        letter-spacing: .18em !important;
        text-transform: uppercase !important;
        box-shadow:
          0 0 22px rgba(128,34,50,.30),
          inset 0 0 18px rgba(214,203,190,.06) !important;
        animation: lilianRestrictedStamp 1.05s ease forwards !important;
      }

      .lilian-page.impact-shake {
        animation: lilianPageShake .34s cubic-bezier(.2,.8,.25,1) !important;
      }

      .lilian-page.heavy-shake {
        animation: lilianHeavyShake .48s cubic-bezier(.15,.85,.25,1) !important;
      }

      .ability-grid button.impact-active,
      .round-timeline button.impact-active,
      .inventory-grid article.impact-active,
      .shell-grid article.impact-active,
      .ring-grid article.impact-active,
      .relation-grid article.impact-active {
        box-shadow:
          0 0 34px rgba(128,34,50,.24),
          inset 0 0 30px rgba(214,203,190,.08) !important;
      }

      .ability-grid button.cracked-card::after,
      .inventory-grid article.cracked-card::after,
      .shell-grid article.cracked-card::after {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        pointer-events: none !important;
        border-radius: inherit !important;
        background:
          linear-gradient(105deg, transparent 0 34%, rgba(214,203,190,.22) 35%, transparent 37%),
          linear-gradient(70deg, transparent 0 50%, rgba(128,34,50,.28) 51%, transparent 53%) !important;
        animation: lilianCardCrack .7s ease forwards !important;
      }

      .reader-section.reading-focus {
        box-shadow:
          inset 0 0 48px rgba(214,203,190,.05),
          0 0 70px rgba(0,0,0,.72),
          0 0 34px rgba(128,34,50,.16) !important;
      }

      @keyframes lilianDust {
        0% { opacity: 0; transform: translate(-50%, -50%) translate(0,0) scale(.5); }
        20% { opacity: .9; }
        100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(.18); }
      }

      @keyframes lilianImpactWave {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(.18); filter: blur(0); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(2.1); filter: blur(3px); }
      }

      @keyframes lilianHeavyWave {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.12); filter: blur(5px); }
        20% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(3.4); filter: blur(5px); }
      }

      @keyframes lilianCrack {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scaleX(.05); }
        20% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scaleX(1.3); }
      }

      @keyframes lilianFistMark {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scale(.4); filter: blur(5px); }
        20% { opacity: .9; filter: blur(0); }
        100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scale(1.12); filter: blur(3px); }
      }

      @keyframes lilianGuardShield {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.4); filter: blur(5px); }
        22% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.35); filter: blur(4px); }
      }

      @keyframes lilianWarningText {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.82); filter: blur(5px); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
        75% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) translateY(-16px) scale(1.04); filter: blur(4px); }
      }

      @keyframes lilianAtacaEla {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(1.45) rotate(-2deg); filter: blur(8px); }
        18% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); filter: blur(0); }
        70% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(.92) rotate(2deg); filter: blur(4px); }
      }

      @keyframes lilianScreenImpact {
        0% { opacity: 1; filter: brightness(1.35) contrast(1.1); }
        100% { opacity: 0; filter: brightness(1) contrast(1); }
      }

      @keyframes lilianOrdoScan {
        from { transform: translateY(-120%); opacity: 0; }
        32% { opacity: 1; }
        to { transform: translateY(900%); opacity: 0; }
      }

      @keyframes lilianRestrictedStamp {
        0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scale(1.2); filter: blur(5px); }
        22% { opacity: 1; filter: blur(0); }
        80% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scale(.95); filter: blur(4px); }
      }

      @keyframes lilianPageShake {
        0%, 100% { transform: translate(0,0); filter: none; }
        22% { transform: translate(4px,-2px); filter: brightness(1.13) contrast(1.08); }
        48% { transform: translate(-4px,3px); }
        72% { transform: translate(2px,2px); }
      }

      @keyframes lilianHeavyShake {
        0%, 100% { transform: translate(0,0); filter: none; }
        15% { transform: translate(7px,-4px); filter: brightness(1.18) contrast(1.12); }
        34% { transform: translate(-8px,4px); }
        54% { transform: translate(5px,5px); filter: brightness(1.10) contrast(1.08); }
        78% { transform: translate(-3px,-2px); }
      }

      @keyframes lilianCardCrack {
        0% { opacity: 0; filter: blur(4px); }
        28% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; filter: blur(3px); }
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
      addTerminal("> cópia bloqueada. registro de contenção restrito.");
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
    let layer = document.querySelector(".lilian-fx-layer");

    if (!layer) {
      layer = document.createElement("div");
      layer.className = "lilian-fx-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
    }

    return layer;
  }

  function spawnDust(x, y, amount = 1) {
    const layer = fxLayer();

    for (let i = 0; i < amount; i++) {
      const dust = document.createElement("span");

      dust.className = "lilian-impact-dust";
      dust.style.setProperty("--x", `${x + random(-24, 24)}px`);
      dust.style.setProperty("--y", `${y + random(-24, 24)}px`);
      dust.style.setProperty("--dx", `${random(-70, 70)}px`);
      dust.style.setProperty("--dy", `${random(-78, 40)}px`);
      dust.style.setProperty("--s", `${random(3, 8)}px`);
      dust.style.setProperty("--t", `${random(0.8, 1.8)}s`);

      layer.appendChild(dust);

      setTimeout(() => dust.remove(), 1900);
    }
  }

  function spawnImpactWave(x, y, heavy = false) {
    const layer = fxLayer();
    const wave = document.createElement("span");

    wave.className = heavy ? "lilian-heavy-wave" : "lilian-impact-wave";
    wave.style.setProperty("--x", `${x}px`);
    wave.style.setProperty("--y", `${y}px`);

    layer.appendChild(wave);

    setTimeout(() => wave.remove(), 900);
  }

  function spawnCracks(x, y, amount = 6) {
    const layer = fxLayer();

    for (let i = 0; i < amount; i++) {
      const crack = document.createElement("span");

      crack.className = "lilian-crack";
      crack.style.setProperty("--x", `${x + random(-40, 40)}px`);
      crack.style.setProperty("--y", `${y + random(-40, 40)}px`);
      crack.style.setProperty("--w", `${random(48, 150)}px`);
      crack.style.setProperty("--r", `${random(-90, 90)}deg`);

      layer.appendChild(crack);

      setTimeout(() => crack.remove(), 1000);
    }
  }

  function spawnFistMark(x, y) {
    const layer = fxLayer();
    const mark = document.createElement("span");

    mark.className = "lilian-fist-mark";
    mark.style.setProperty("--x", `${x}px`);
    mark.style.setProperty("--y", `${y}px`);
    mark.style.setProperty("--s", `${random(58, 110)}px`);
    mark.style.setProperty("--r", `${random(-14, 14)}deg`);

    layer.appendChild(mark);

    setTimeout(() => mark.remove(), 1150);
  }

  function spawnGuardShield(x, y) {
    const layer = fxLayer();
    const shield = document.createElement("span");

    shield.className = "lilian-guard-shield";
    shield.style.setProperty("--x", `${x}px`);
    shield.style.setProperty("--y", `${y}px`);

    layer.appendChild(shield);

    setTimeout(() => shield.remove(), 1000);
  }

  function spawnScreenImpact(x, y) {
    const pulse = document.createElement("span");

    pulse.className = "lilian-screen-impact";
    pulse.style.setProperty("--x", `${x}px`);
    pulse.style.setProperty("--y", `${y}px`);

    document.body.appendChild(pulse);

    setTimeout(() => pulse.remove(), 650);
  }

  function spawnWarningText(x, y, text = "IMPACTO REGISTRADO") {
    const warning = document.createElement("span");

    warning.className = "lilian-warning-text";
    warning.textContent = text;
    warning.style.setProperty("--x", `${x}px`);
    warning.style.setProperty("--y", `${y}px`);

    document.body.appendChild(warning);

    setTimeout(() => warning.remove(), 1100);
  }

  function spawnAtacaEla() {
    const text = document.createElement("span");

    text.className = "lilian-ataca-ela";
    text.textContent = "ATACA ELA.";

    document.body.appendChild(text);

    setTimeout(() => text.remove(), 950);
  }

  function spawnRestrictedStamp(x, y, text = "ACESSO RESTRITO") {
    const stamp = document.createElement("span");

    stamp.className = "lilian-restricted-stamp";
    stamp.textContent = text;
    stamp.style.setProperty("--x", `${x}px`);
    stamp.style.setProperty("--y", `${y}px`);
    stamp.style.setProperty("--r", `${random(-8, 8)}deg`);

    document.body.appendChild(stamp);

    setTimeout(() => stamp.remove(), 1100);
  }

  function impactShake(heavy = false) {
    page.classList.add(heavy ? "heavy-shake" : "impact-shake");

    setTimeout(() => {
      page.classList.remove("impact-shake", "heavy-shake");
    }, heavy ? 520 : 380);
  }

  function impactClick(x, y, type = "normal") {
    if (window.OrdoPerf?.canSpawnVfx && !window.OrdoPerf.canSpawnVfx("lilian-impact", (type === "heavy" || type === "guard" || type === "demolish") ? 9 : 6)) return;
    const heavy = type === "heavy" || type === "guard" || type === "demolish";

    spawnImpactWave(x, y, heavy);
    spawnScreenImpact(x, y);
    spawnDust(x, y, window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(heavy ? 18 : 9, .7, .45) : (heavy ? 18 : 9));
    spawnCracks(x, y, window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(heavy ? 9 : 5, .7, .45) : (heavy ? 9 : 5));

    if (type === "fist" || type === "demolish" || type === "heavy") {
      spawnFistMark(x, y);
    }

    if (type === "guard") {
      spawnGuardShield(x, y);
    }

    impactShake(heavy);
  }

  function crackCard(card) {
    if (!card) return;

    card.classList.add("impact-active", "cracked-card");

    setTimeout(() => {
      card.classList.remove("impact-active", "cracked-card");
    }, 850);
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
    scan.className = "lilian-ordo-scan";
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

    if (["casca", "ringue", "historico", "relacoes", "comportamento", "alertas"].includes(tabName)) {
      setTimeout(() => setReadingFocus(true), 150);
    }

    if (tabName === "manoplas") {
      setTimeout(() => {
        const p = getCenter(".gauntlet-display", innerWidth * 0.5, innerHeight * 0.72);
        spawnWarningText(p.x, p.y, "MANOPLAS EM FOCO");
        impactClick(p.x, p.y, "fist");
      }, 220);
    }

    if (tabName === "casca") {
      setTimeout(() => {
        const p = getCenter(".shell-grid", innerWidth * 0.5, innerHeight * 0.72);
        spawnGuardShield(p.x, p.y);
        spawnWarningText(p.x, p.y - 80, "CASCA GROSSA ATIVA");
        impactClick(p.x, p.y, "guard");
      }, 220);
    }

    if (tabName === "ringue") {
      setTimeout(() => {
        const p = getCenter(".ring-grid", innerWidth * 0.5, innerHeight * 0.72);
        spawnWarningText(p.x, p.y - 70, "ROUND INICIADO");
        impactClick(p.x, p.y, "heavy");
      }, 220);
    }

    if (tabName === "bloqueados") {
      setTimeout(() => {
        spawnRestrictedStamp(innerWidth / 2, innerHeight / 2, "RESTRITO AO MESTRE");
        impactClick(innerWidth / 2, innerHeight / 2, "demolish");
        addTerminal("> fragmentos lacrados por contenção.");
      }, 120);
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

    const p = getCenter(`[data-attr="${attrName}"]`);

    if (attrName === "FOR") {
      impactClick(p.x, p.y, "fist");
    } else if (attrName === "VIG") {
      impactClick(p.x, p.y, "guard");
    } else {
      impactClick(p.x, p.y, "normal");
    }
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

    const rect = skillDisplay.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (skillName === "luta") {
      spawnWarningText(x, y, "CORPO COMO ARMA");
      impactClick(x, y, "fist");
    } else if (skillName === "fortitude") {
      spawnWarningText(x, y, "BLOQUEIO REGISTRADO");
      impactClick(x, y, "guard");
    } else {
      impactClick(x, y, "normal");
    }
  }

  function triggerAbilityEffect(card, x, y) {
    const ability = card.dataset.ability || "";

    crackCard(card);

    if (ability === "centoedez") {
      spawnWarningText(x, y, "110%");
      impactClick(x, y, "heavy");
      addTerminal("> 110%: corpo forçado acima do limite normal.");
      return;
    }

    if (ability === "artista") {
      spawnWarningText(x, y, "POSTURA DE COMBATE");
      impactClick(x, y, "fist");
      addTerminal("> Artista Marcial: corpo registrado como arma treinada.");
      return;
    }

    if (ability === "ataque") {
      spawnWarningText(x, y, "ATAQUE ESPECIAL");
      impactClick(x, y, "fist");
      addTerminal("> Ataque Especial: golpe direcionado.");
      return;
    }

    if (ability === "demolidor") {
      spawnWarningText(x, y, "QUEBRA.");
      impactClick(x, y, "demolish");
      addTerminal("> Golpe Demolidor: barreira comprometida.");
      return;
    }

    if (ability === "casca") {
      spawnWarningText(x, y, "DANO ABSORVIDO");
      spawnGuardShield(x, y);
      impactClick(x, y, "guard");
      addTerminal("> Casca Grossa: agente permanece operacional.");
      return;
    }

    if (ability === "cai-dentro") {
      spawnAtacaEla();
      spawnWarningText(x, y + 80, "AMEAÇA REDIRECIONADA");
      spawnGuardShield(x, y);
      impactClick(x, y, "guard");
      addTerminal("> Cai Dentro: ameaça redirecionada para a linha de frente.");
      return;
    }

    impactClick(x, y, "normal");
  }

  function selectRound(button, x, y) {
    const round = button.dataset.round;

    document.querySelectorAll("[data-round]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.round === round);
    });

    crackCard(button);
    impactClick(x, y, "heavy");
    addTerminal(roundText[round] || "> round consultado.");
  }

  function activateCard(card, message, x, y, type = "normal") {
    crackCard(card);
    addTerminal(message);
    impactClick(x, y, type);
  }

  function focusGuard(type) {
    const characterCard = document.querySelector(".character-card");
    const guardStatus = document.querySelector(".guard-status");

    if (characterCard) {
      characterCard.classList.add(type === "guard" ? "guard-focus" : "fist-focus");

      setTimeout(() => {
        characterCard.classList.remove("guard-focus", "fist-focus");
      }, 1100);
    }

    if (guardStatus) {
      guardStatus.classList.add("guard-alert");

      setTimeout(() => {
        guardStatus.classList.remove("guard-alert");
      }, 1100);
    }
  }

  function doubleClickEffect(x, y) {
    spawnWarningText(x, y - 70, "IMPACTO DUPLO");
    spawnFistMark(x - 48, y);
    spawnFistMark(x + 48, y);
    spawnImpactWave(x, y, true);
    spawnScreenImpact(x, y);
    spawnCracks(x, y, 12);
    spawnDust(x, y, 24);
    impactShake(true);

    addTerminal("> duplo impacto detectado.");
  }

  function rightClickEffect(x, y) {
    spawnRestrictedStamp(x, y, "COMANDO BLOQUEADO");
    spawnWarningText(x, y + 58, "CONTENÇÃO DA ORDO");
    spawnGuardShield(x, y);
    spawnCracks(x, y, 7);
    spawnScreenImpact(x, y);
    impactShake(false);

    addTerminal("> botão direito bloqueado. contenção externa negada.");
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
      const round = safeClosest(event, "[data-round]");
      const hotspot = safeClosest(event, "[data-hotspot]");
      const item = safeClosest(event, "[data-item]");
      const shell = safeClosest(event, ".shell-grid article");
      const ring = safeClosest(event, ".ring-grid article");
      const relation = safeClosest(event, ".relation-grid article");
      const locked = safeClosest(event, ".locked-grid article");
      const gauntletDisplay = safeClosest(event, ".gauntlet-display");
      const guardStatus = safeClosest(event, ".guard-status");
      const link = safeClosest(event, "a");

      if (skip) {
        closeLoader();
        impactClick(event.clientX, event.clientY, "heavy");
        addTerminal("> carregamento encerrado manualmente.");
        return;
      }

      if (jump) {
        switchTab(jump.dataset.jumpTab);
        impactClick(event.clientX, event.clientY, "heavy");
        return;
      }

      if (tab) {
        const tabName = tab.dataset.tab;
        const heavyTabs = ["habilidades", "manoplas", "casca", "ringue", "historico"];
        const effectType = heavyTabs.includes(tabName) ? "heavy" : "normal";

        switchTab(tabName);
        impactClick(event.clientX, event.clientY, effectType);
        return;
      }

      if (attr) {
        selectAttribute(attr.dataset.attr);
        return;
      }

      if (skill) {
        selectSkill(skill.dataset.skill);
        return;
      }

      if (ability) {
        triggerAbilityEffect(ability, event.clientX, event.clientY);
        return;
      }

      if (round) {
        selectRound(round, event.clientX, event.clientY);
        return;
      }

      if (hotspot) {
        const type = hotspot.dataset.hotspot;

        if (type === "fists") {
          switchTab("manoplas");
          focusGuard("fist");
          spawnWarningText(event.clientX, event.clientY, "MANOPLAS");
          impactClick(event.clientX, event.clientY, "fist");
        }

        if (type === "guard") {
          switchTab("funcao");
          focusGuard("guard");
          spawnWarningText(event.clientX, event.clientY, "GUARDA FECHADA");
          impactClick(event.clientX, event.clientY, "guard");
        }

        if (type === "core") {
          switchTab("casca");
          focusGuard("guard");
          spawnWarningText(event.clientX, event.clientY, "CASCA GROSSA");
          impactClick(event.clientX, event.clientY, "guard");
        }

        return;
      }

      if (item) {
        switchTab("manoplas");
        activateCard(item, "> manoplas consultadas.", event.clientX, event.clientY, "fist");
        return;
      }

      if (shell) {
        activateCard(shell, "> camada da Casca Grossa consultada.", event.clientX, event.clientY, "guard");
        return;
      }

      if (ring) {
        activateCard(ring, "> registro do ringue consultado.", event.clientX, event.clientY, "heavy");
        return;
      }

      if (relation) {
        activateCard(relation, "> vínculo relevante consultado.", event.clientX, event.clientY, "normal");
        return;
      }

      if (locked) {
        spawnRestrictedStamp(event.clientX, event.clientY, "RESTRITO");
        impactClick(event.clientX, event.clientY, "demolish");
        addTerminal("> acesso negado pelo mestre.");
        return;
      }

      if (gauntletDisplay) {
        spawnWarningText(event.clientX, event.clientY, "IMPACTO DIRETO");
        impactClick(event.clientX, event.clientY, "fist");
        return;
      }

      if (guardStatus) {
        focusGuard("guard");
        spawnWarningText(event.clientX, event.clientY, "BLOQUEIO");
        impactClick(event.clientX, event.clientY, "guard");
        return;
      }

      if (link) {
        impactClick(event.clientX, event.clientY, "normal");
        return;
      }

      impactClick(event.clientX, event.clientY, "normal");
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
        ".tab-button, .attr-button, [data-skill], [data-ability], [data-round], .identity-row, .identity-grid-large article, .core-grid article, .back-link, .hero-actions button, .field-role-grid article, .risk-grid article, .living-grid article, .locked-grid article, .inventory-grid article, .status-strip article, .handling-protocol, .gauntlet-display article, .shell-grid article, .ring-grid article, .relation-grid article, .report-block"
      );

      if (hoverable) {
        const rect = hoverable.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        hoverable.style.setProperty("--tilt-x", `${py * -4}deg`);
        hoverable.style.setProperty("--tilt-y", `${px * 5}deg`);
      }

      const now = performance.now();

      if (now - lastDust > 80) {
        lastDust = now;

        if (Math.random() > 0.35) {
          spawnDust(event.clientX, event.clientY, 1);
        }
      }

      if (now - lastCrack > 330) {
        lastCrack = now;

        if (Math.random() > 0.62) {
          spawnCracks(event.clientX, event.clientY, 1);
        }
      }

      if (now - lastImpactTrace > 900) {
        lastImpactTrace = now;

        const important = safeClosest(event, ".attribute-wheel, .guard-status, .gauntlet-display, .ability-grid button, .shell-grid article, .ring-grid article, .hotspot");

        if (important) {
          const rect = important.getBoundingClientRect();
          spawnImpactWave(rect.left + rect.width / 2, rect.top + rect.height / 2, false);
        }
      }
    }, { passive: true });

    document.addEventListener("pointerout", event => {
      const hoverable = safeClosest(
        event,
        ".tab-button, .attr-button, [data-skill], [data-ability], [data-round], .identity-row, .identity-grid-large article, .core-grid article, .back-link, .hero-actions button, .field-role-grid article, .risk-grid article, .living-grid article, .locked-grid article, .inventory-grid article, .status-strip article, .handling-protocol, .gauntlet-display article, .shell-grid article, .ring-grid article, .relation-grid article, .report-block"
      );

      if (!hoverable) return;

      hoverable.style.setProperty("--tilt-x", "0deg");
      hoverable.style.setProperty("--tilt-y", "0deg");
    });
  }

  function bindCardSpecialEffects() {
    document.addEventListener("pointerenter", event => {
      const fists = safeClosest(event, ".gauntlet-display, .gauntlet-item, .hotspot-fists");

      if (fists) {
        const rect = fists.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        focusGuard("fist");
        spawnFistMark(x, y);
      }

      const guard = safeClosest(event, ".shell-grid article, .guard-status, .hotspot-guard, .hotspot-core");

      if (guard) {
        const rect = guard.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        focusGuard("guard");
        spawnGuardShield(x, y);
      }

      const locked = safeClosest(event, ".locked-grid article");

      if (locked) {
        const rect = locked.getBoundingClientRect();
        spawnRestrictedStamp(rect.left + rect.width / 2, rect.top + rect.height / 2, "LACRADO");
      }
    }, true);
  }

  function spawnAmbientImpact() {
    const x = innerWidth * random(0.12, 0.88);
    const y = innerHeight * random(0.12, 0.88);

    spawnDust(x, y, 3);

    if (Math.random() > 0.55) {
      spawnCracks(x, y, 2);
    }

    if (Math.random() > 0.74) {
      spawnImpactWave(x, y, false);
    }
  }

  function initialBurst() {
    const character = document.querySelector(".character-card");

    if (!character) {
      impactClick(innerWidth / 2, innerHeight / 2, "heavy");
      return;
    }

    const rect = character.getBoundingClientRect();
    const x = rect.left + rect.width * 0.55;
    const y = rect.top + rect.height * 0.46;

    impactClick(x, y, "heavy");

    setTimeout(() => spawnWarningText(x, y - 100, "LINHA DE FRENTE"), 450);
    setTimeout(() => spawnGuardShield(x, y), 800);
    setTimeout(() => spawnFistMark(x + 70, y + 80), 1050);
  }

  function ambient() {
    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;
      addTerminal(pick(terminalLines));
    }, 6500);

    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;
      spawnAmbientImpact();
    }, 1600);

    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;

      const guard = document.querySelector(".guard-status");
      if (guard && Math.random() > 0.50) {
        const rect = guard.getBoundingClientRect();
        spawnImpactWave(rect.left + rect.width / 2, rect.top + rect.height / 2, false);
      }
    }, 2300);
  }

  function init() {
    injectFxCss();
    bindSelectionAndContextLocks();
    fxLayer();
    bindClicks();
    bindPointer();
    bindCardSpecialEffects();
    ambient();

    setTimeout(closeLoader, 3900);
    setTimeout(initialBurst, 4200);

    setTimeout(() => {
      impactClick(innerWidth / 2, innerHeight / 2, "heavy");
      addTerminal("> teste visual de contenção executado.");
    }, 900);

    page.classList.add("ready");
    addTerminal("> registro de contenção da Lilian pronto.");

    console.log("[LILIAN] efeitos ativados.");
  }

  init();
})();
(() => {
  "use strict";

  console.log("[AGENTES] agentes.js carregado.");

  const page = document.querySelector("[data-agents-page]");
  const terminal = document.querySelector("[data-agents-terminal]");
  const searchInput = document.querySelector("[data-agent-search]");
  const reader = document.querySelector("[data-agents-reader]");
  const readerTitle = document.querySelector("[data-reader-title]");
  const readerText = document.querySelector("[data-reader-text]");

  if (!page) {
    console.warn("[AGENTES] página não encontrada.");
    return;
  }

  const cards = Array.from(document.querySelectorAll("[data-agent-card]"));
  const filters = Array.from(document.querySelectorAll("[data-filter]"));

  const readerData = {
    "Maisie Hundown": {
      title: "Maisie Hundown // Registro liberado",
      text: "Ocultista de suporte, ligada a tecnologia improvisada, Energia paranormal e equipamento pessoal sensível. Ficha pública preparada para consulta dos jogadores."
    },
    "Lilian Moretti": {
      title: "Lilian Rodrigues Moretti // Registro liberado",
      text: "Combatente de linha de frente, proteção direta, manoplas e alta resistência. A Ordo classifica a agente como contenção física de alto valor."
    },
    "Roselyn Tate": {
      title: "Roselyn Tate // Registro liberado",
      text: "Especialista militar, atiradora de precisão e agente de reconhecimento. Registro associado à Mansão Tate, rifle do pai, lente de prata e Morte residual."
    },
    "Yuna": {
      title: "Yuna // Registro restrito",
      text: "Semi-Líder Ocultista da Trindade. Conteúdo completo protegido por nível de acesso superior."
    },
    "Lisa": {
      title: "Lisa // Registro restrito",
      text: "Semi-Líder Especialista da Trindade. Coordenação operacional e análise de missões mantidas sob acesso restrito."
    },
    "Blender": {
      title: "Blender // Registro restrito",
      text: "Semi-Líder Combatente da Trindade. Registro de combate direto protegido por sigilo operacional."
    },
    "Klint": {
      title: "Klint // Comando restrito",
      text: "Chefe operacional da Ordo Realitas neste arquivo. O conteúdo completo permanece lacrado ao mestre."
    }
  };

  const terminalLines = [
    "> renderização dinâmica ativa.",
    "> fichas públicas localizadas.",
    "> registros restritos protegidos.",
    "> rastreamento de cards iniciado.",
    "> terminal_ordo.agentes em execução.",
    "> consulta visual autorizada.",
    "> alerta: cards restritos não liberam conteúdo sensível.",
    "> separação por categoria aplicada.",
    "> busca interna sincronizada.",
    "> sistema de leitura rápida aguardando seleção.",
    "> Ordo Realitas // arquivo operacional ativo."
  ];

  let currentFilter = "todos";
  let lastParticle = 0;
  let lastGlitch = 0;

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

  function addTerminal(text) {
    if (!terminal) return;

    const p = document.createElement("p");
    p.textContent = text;
    p.className = "terminal-new";

    terminal.appendChild(p);

    while (terminal.children.length > 9) {
      terminal.removeChild(terminal.firstElementChild);
    }
  }

  function injectFxCss() {
    if (document.querySelector("#agents-force-fx-css")) return;

    const style = document.createElement("style");
    style.id = "agents-force-fx-css";

    style.textContent = `
      html,
      body,
      .agents-page,
      .agents-page * {
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

      .agents-fx-layer {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        mix-blend-mode: screen !important;
      }

      .agents-spark {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--w) !important;
        height: 3px !important;
        border-radius: 999px !important;
        background:
          linear-gradient(90deg, transparent, rgba(255, 41, 83, .92), rgba(215, 170, 69, .82), rgba(155, 82, 255, .72), transparent) !important;
        box-shadow:
          0 0 14px rgba(255, 41, 83, .52),
          0 0 28px rgba(155, 82, 255, .28),
          0 0 36px rgba(215, 170, 69, .20) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: agentsSpark .8s ease forwards !important;
      }

      .agents-dot {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--s) !important;
        height: var(--s) !important;
        border-radius: 50% !important;
        background: rgba(215, 170, 69, .92) !important;
        box-shadow:
          0 0 12px rgba(215, 170, 69, .7),
          0 0 24px rgba(255, 41, 83, .30) !important;
        transform: translate(-50%, -50%) !important;
        animation: agentsDot .95s ease forwards !important;
      }

      .agents-wave {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: 44px !important;
        height: 44px !important;
        border-radius: 50% !important;
        border: 2px solid rgba(215, 170, 69, .70) !important;
        box-shadow:
          0 0 22px rgba(215, 170, 69, .34),
          inset 0 0 22px rgba(255, 41, 83, .18) !important;
        transform: translate(-50%, -50%) scale(.18) !important;
        animation: agentsWave .75s ease forwards !important;
      }

      .agents-glitch {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        width: var(--w) !important;
        height: 15px !important;
        border-radius: 999px !important;
        background:
          linear-gradient(90deg, transparent, rgba(255, 41, 83, .62), rgba(155, 82, 255, .54), rgba(215, 170, 69, .35), transparent) !important;
        box-shadow:
          0 0 18px rgba(255, 41, 83, .32),
          0 0 28px rgba(155, 82, 255, .24) !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        animation: agentsGlitch .45s steps(2) forwards !important;
      }

      .agents-lock-stamp {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) rotate(var(--r)) !important;
        color: #ffe2e8 !important;
        border: 2px solid rgba(255, 41, 83, .72) !important;
        border-radius: 12px !important;
        padding: .68rem .95rem !important;
        background: rgba(0, 0, 0, .78) !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .72rem !important;
        letter-spacing: .18em !important;
        text-transform: uppercase !important;
        box-shadow:
          0 0 24px rgba(255, 41, 83, .30),
          inset 0 0 18px rgba(215, 170, 69, .06) !important;
        animation: agentsLockStamp 1s ease forwards !important;
      }

      .agents-command-mark {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) !important;
        color: #fff1cf !important;
        border: 1px solid rgba(215, 170, 69, .62) !important;
        border-radius: 999px !important;
        padding: .58rem .8rem !important;
        background: rgba(0, 0, 0, .80) !important;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
        font-size: .68rem !important;
        letter-spacing: .14em !important;
        text-transform: uppercase !important;
        box-shadow:
          0 0 24px rgba(215, 170, 69, .22),
          inset 0 0 18px rgba(155, 82, 255, .10) !important;
        animation: agentsCommandMark .95s ease forwards !important;
      }

      .agents-screen-pulse {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483646 !important;
        pointer-events: none !important;
        background:
          radial-gradient(circle at var(--x) var(--y), rgba(255, 41, 83, .18), transparent 16rem),
          radial-gradient(circle at var(--x) var(--y), rgba(215, 170, 69, .10), transparent 28rem) !important;
        mix-blend-mode: screen !important;
        animation: agentsScreenPulse .58s ease forwards !important;
      }

      .agents-page.agents-shake {
        animation: agentsPageShake .36s steps(2) !important;
      }

      .agent-card.card-pulse {
        animation: agentsCardPulse .55s ease !important;
      }

      .agents-reader.reader-alert {
        animation: agentsReaderAlert .7s ease !important;
      }

      @keyframes agentsSpark {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) scaleX(.12);
          filter: blur(2px);
        }

        18% {
          opacity: 1;
          filter: blur(0);
        }

        100% {
          opacity: 0;
          transform: translate(var(--dx), var(--dy)) rotate(var(--r)) scaleX(1.55);
          filter: blur(4px);
        }
      }

      @keyframes agentsDot {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) translate(0, 0) scale(.45);
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(.2);
        }
      }

      @keyframes agentsWave {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(.18);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(2.4);
        }
      }

      @keyframes agentsGlitch {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) translateX(-30px) scaleX(.2);
        }

        28% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) translateX(70px) scaleX(1.25);
        }
      }

      @keyframes agentsLockStamp {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) scale(1.18);
          filter: blur(5px);
        }

        22% {
          opacity: 1;
          filter: blur(0);
        }

        78% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) scale(.95);
          filter: blur(4px);
        }
      }

      @keyframes agentsCommandMark {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(.82);
          filter: blur(5px);
        }

        20% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
          filter: blur(0);
        }

        75% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) translateY(-15px) scale(1.04);
          filter: blur(4px);
        }
      }

      @keyframes agentsScreenPulse {
        from {
          opacity: 1;
          filter: brightness(1.25) saturate(1.18);
        }

        to {
          opacity: 0;
          filter: brightness(1) saturate(1);
        }
      }

      @keyframes agentsPageShake {
        0%, 100% {
          transform: translate(0, 0);
        }

        30% {
          transform: translate(3px, -2px);
        }

        60% {
          transform: translate(-3px, 2px);
        }
      }

      @keyframes agentsCardPulse {
        0%, 100% {
          filter: none;
        }

        50% {
          filter: brightness(1.22) saturate(1.2);
        }
      }

      @keyframes agentsReaderAlert {
        0%, 100% {
          filter: none;
        }

        50% {
          filter: brightness(1.2);
          box-shadow:
            inset 0 0 36px rgba(255, 41, 83, .08),
            0 0 42px rgba(215, 170, 69, .14);
        }
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

    document.addEventListener("copy", event => {
      event.preventDefault();
      addTerminal("> cópia bloqueada. registros operacionais protegidos.");
    });

    document.addEventListener("cut", event => {
      event.preventDefault();
      addTerminal("> extração de conteúdo negada.");
    });
  }

  function fxLayer() {
    let layer = document.querySelector(".agents-fx-layer");

    if (!layer) {
      layer = document.createElement("div");
      layer.className = "agents-fx-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
    }

    return layer;
  }

  function spawnSpark(x, y, intense = false) {
    const layer = fxLayer();
    const spark = document.createElement("span");

    spark.className = "agents-spark";
    spark.style.setProperty("--x", `${x}px`);
    spark.style.setProperty("--y", `${y}px`);
    spark.style.setProperty("--dx", `${random(-110, 110)}px`);
    spark.style.setProperty("--dy", `${random(-105, 85)}px`);
    spark.style.setProperty("--r", `${random(-90, 90)}deg`);
    spark.style.setProperty("--w", intense ? `${random(120, 230)}px` : `${random(55, 135)}px`);

    layer.appendChild(spark);

    setTimeout(() => spark.remove(), 850);
  }

  function spawnDot(x, y) {
    const layer = fxLayer();
    const dot = document.createElement("span");

    dot.className = "agents-dot";
    dot.style.setProperty("--x", `${x}px`);
    dot.style.setProperty("--y", `${y}px`);
    dot.style.setProperty("--dx", `${random(-70, 70)}px`);
    dot.style.setProperty("--dy", `${random(-80, 55)}px`);
    dot.style.setProperty("--s", `${random(5, 11)}px`);

    layer.appendChild(dot);

    setTimeout(() => dot.remove(), 1000);
  }

  function spawnWave(x, y) {
    const layer = fxLayer();
    const wave = document.createElement("span");

    wave.className = "agents-wave";
    wave.style.setProperty("--x", `${x}px`);
    wave.style.setProperty("--y", `${y}px`);

    layer.appendChild(wave);

    setTimeout(() => wave.remove(), 800);
  }

  function spawnGlitch(x, y) {
    const layer = fxLayer();
    const glitch = document.createElement("span");

    glitch.className = "agents-glitch";
    glitch.style.setProperty("--x", `${x}px`);
    glitch.style.setProperty("--y", `${y}px`);
    glitch.style.setProperty("--w", `${random(110, 290)}px`);
    glitch.style.setProperty("--r", `${random(-7, 7)}deg`);

    layer.appendChild(glitch);

    setTimeout(() => glitch.remove(), 500);
  }

  function spawnScreenPulse(x, y) {
    const pulse = document.createElement("span");

    pulse.className = "agents-screen-pulse";
    pulse.style.setProperty("--x", `${x}px`);
    pulse.style.setProperty("--y", `${y}px`);

    document.body.appendChild(pulse);

    setTimeout(() => pulse.remove(), 650);
  }

  function spawnLockStamp(x, y, text = "ACESSO RESTRITO") {
    const stamp = document.createElement("span");

    stamp.className = "agents-lock-stamp";
    stamp.textContent = text;
    stamp.style.setProperty("--x", `${x}px`);
    stamp.style.setProperty("--y", `${y}px`);
    stamp.style.setProperty("--r", `${random(-8, 8)}deg`);

    document.body.appendChild(stamp);

    setTimeout(() => stamp.remove(), 1050);
  }

  function spawnCommandMark(x, y, text = "COMANDO BLOQUEADO") {
    const mark = document.createElement("span");

    mark.className = "agents-command-mark";
    mark.textContent = text;
    mark.style.setProperty("--x", `${x}px`);
    mark.style.setProperty("--y", `${y}px`);

    document.body.appendChild(mark);

    setTimeout(() => mark.remove(), 1000);
  }

  function burst(x, y, type = "normal") {
    spawnWave(x, y);
    spawnScreenPulse(x, y);

    const sparkAmount = type === "restricted" ? 18 : 11;
    const dotAmount = type === "restricted" ? 8 : 5;

    for (let i = 0; i < sparkAmount; i++) {
      spawnSpark(x, y, type === "restricted" && i % 3 === 0);
    }

    for (let i = 0; i < dotAmount; i++) {
      spawnDot(x, y);
    }

    if (type === "restricted") {
      for (let i = 0; i < 4; i++) {
        spawnGlitch(x + random(-65, 65), y + random(-65, 65));
      }
    }
  }

  function shakePage() {
    page.classList.add("agents-shake");

    setTimeout(() => {
      page.classList.remove("agents-shake");
    }, 420);
  }

  function pulseCard(card) {
    if (!card) return;

    card.classList.add("card-pulse");

    setTimeout(() => {
      card.classList.remove("card-pulse");
    }, 600);
  }

  function updateReader(title, text, restricted = false) {
    if (!reader || !readerTitle || !readerText) return;

    readerTitle.textContent = title;
    readerText.textContent = text;

    reader.classList.toggle("restricted-reader", restricted);
    reader.classList.add("reader-alert");

    setTimeout(() => {
      reader.classList.remove("reader-alert");
    }, 750);
  }

  function readCard(card) {
    if (!card) return;

    const name = card.querySelector("h3")?.textContent?.trim() || "Registro";
    const data = readerData[name];

    if (data) {
      updateReader(data.title, data.text, card.classList.contains("restricted"));
      return;
    }

    updateReader(
      `${name} // Registro localizado`,
      "Registro localizado no painel da Ordo. Conteúdo parcial disponível conforme nível de acesso.",
      card.classList.contains("restricted")
    );
  }

  function matchesFilter(card) {
    const category = card.dataset.category || "";
    const text = `${card.dataset.search || ""} ${card.textContent || ""}`.toLowerCase();
    const search = (searchInput?.value || "").trim().toLowerCase();

    const filterMatch = currentFilter === "todos" || category.includes(currentFilter);
    const searchMatch = !search || text.includes(search);

    return filterMatch && searchMatch;
  }

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      const visible = matchesFilter(card);

      card.classList.toggle("agent-hidden", !visible);

      if (visible) {
        visibleCount += 1;
      }
    });

    addTerminal(`> filtro aplicado. registros visíveis: ${visibleCount}.`);

    if (visibleCount === 0) {
      updateReader(
        "Nenhum registro encontrado",
        "A busca interna não encontrou agentes compatíveis com esse filtro.",
        false
      );
    }
  }

  function setFilter(filterName) {
    currentFilter = filterName;

    filters.forEach(button => {
      button.classList.toggle("active", button.dataset.filter === filterName);
    });

    applyFilters();
  }

  function openLocked(card, x, y) {
    const lockedName =
      card?.querySelector("[data-locked]")?.dataset.locked ||
      card?.querySelector("h3")?.textContent?.trim() ||
      "Registro";

    spawnLockStamp(x, y, "ACESSO RESTRITO");
    burst(x, y, "restricted");
    shakePage();
    pulseCard(card);

    updateReader(
      `${lockedName} // Acesso restrito`,
      "Este registro existe no arquivo, mas o conteúdo completo está reservado ao mestre e não será liberado nesta interface.",
      true
    );

    addTerminal(`> acesso negado: ${lockedName}.`);
  }

  function doubleClickEffect(x, y) {
    spawnCommandMark(x, y, "SINCRONIZAÇÃO DE REGISTROS");
    burst(x, y, "restricted");

    for (let i = 0; i < 4; i++) {
      spawnGlitch(x + random(-85, 85), y + random(-60, 60));
    }

    addTerminal("> duplo clique detectado. sincronização forçada.");
  }

  function rightClickEffect(x, y) {
    spawnCommandMark(x, y, "MENU EXTERNO NEGADO");
    spawnLockStamp(x, y + 58, "ORDO REALITAS");
    burst(x, y, "restricted");
    shakePage();

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
      const filter = safeClosest(event, "[data-filter]");
      const lockedAction = safeClosest(event, "[data-locked]");
      const card = safeClosest(event, "[data-agent-card]");
      const openLink = safeClosest(event, ".agent-open[href]");
      const backLink = safeClosest(event, ".agents-back-link");

      if (filter) {
        setFilter(filter.dataset.filter);
        burst(event.clientX, event.clientY);
        return;
      }

      if (lockedAction) {
        event.preventDefault();
        const lockedCard = safeClosest(event, "[data-agent-card]");
        openLocked(lockedCard, event.clientX, event.clientY);
        return;
      }

      if (openLink) {
        burst(event.clientX, event.clientY);
        addTerminal("> abrindo ficha pública.");
        return;
      }

      if (backLink) {
        burst(event.clientX, event.clientY);
        addTerminal("> retornando ao arquivo principal.");
        return;
      }

      if (card) {
        readCard(card);
        pulseCard(card);

        if (card.classList.contains("restricted")) {
          openLocked(card, event.clientX, event.clientY);
          return;
        }

        burst(event.clientX, event.clientY);
        addTerminal("> leitura rápida atualizada.");
        return;
      }

      burst(event.clientX, event.clientY);
    });
  }

  function bindSearch() {
    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
      applyFilters();

      const value = searchInput.value.trim();

      if (value) {
        addTerminal(`> busca interna: "${value}".`);
      } else {
        addTerminal("> busca interna limpa.");
      }
    });

    searchInput.addEventListener("focus", () => {
      updateReader(
        "Busca interna ativa",
        "Digite nome, classe, função, elemento, categoria ou tipo de acesso para filtrar os registros.",
        false
      );
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
        "[data-agent-card], [data-filter], .agent-open, .agents-back-link, .agents-status-strip article, .chief-note, .agents-reader, .agents-search-box input"
      );

      if (hoverable) {
        const rect = hoverable.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        hoverable.style.setProperty("--tilt-x", `${py * -5}deg`);
        hoverable.style.setProperty("--tilt-y", `${px * 7}deg`);
      }

      const now = performance.now();

      if (now - lastParticle > 65) {
        lastParticle = now;

        if (Math.random() > 0.32) {
          spawnSpark(event.clientX, event.clientY, false);
        }

        if (Math.random() > 0.64) {
          spawnDot(event.clientX, event.clientY);
        }
      }

      if (now - lastGlitch > 360) {
        lastGlitch = now;

        const restrictedHover = safeClosest(event, ".restricted, .chief-note, .locked-action");

        if (restrictedHover && Math.random() > 0.44) {
          spawnGlitch(event.clientX, event.clientY);
        }
      }
    }, { passive: true });

    document.addEventListener("pointerout", event => {
      const hoverable = safeClosest(
        event,
        "[data-agent-card], [data-filter], .agent-open, .agents-back-link, .agents-status-strip article, .chief-note, .agents-reader, .agents-search-box input"
      );

      if (!hoverable) return;

      hoverable.style.setProperty("--tilt-x", "0deg");
      hoverable.style.setProperty("--tilt-y", "0deg");
    });
  }

  function bindCardHover() {
    document.addEventListener("pointerenter", event => {
      const card = safeClosest(event, "[data-agent-card]");

      if (!card) return;

      readCard(card);
      pulseCard(card);

      const rect = card.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      if (card.classList.contains("restricted")) {
        spawnGlitch(x, y);
        addTerminal("> registro restrito detectado.");
      } else {
        spawnWave(x, y);
        addTerminal("> registro público em foco.");
      }
    }, true);
  }

  function ambient() {
    setInterval(() => {
      if (document.hidden) return;
      addTerminal(pick(terminalLines));
    }, 6500);

    setInterval(() => {
      if (document.hidden) return;

      const x = innerWidth * random(0.12, 0.88);
      const y = innerHeight * random(0.16, 0.84);

      spawnSpark(x, y, Math.random() > 0.65);

      if (Math.random() > 0.68) {
        spawnGlitch(x, y);
      }
    }, 1500);
  }

  function initialBoot() {
    setTimeout(() => {
      burst(innerWidth / 2, innerHeight * 0.38, "restricted");
      updateReader(
        "Arquivo de Agentes inicializado",
        "Fichas públicas dos jogadores disponíveis. Trindade e comando aparecem como registros visuais restritos.",
        false
      );
      addTerminal("> sistema de agentes inicializado.");
    }, 600);
  }

  function init() {
    injectFxCss();
    bindSelectionAndContextLocks();
    fxLayer();
    bindClicks();
    bindSearch();
    bindPointer();
    bindCardHover();
    ambient();
    initialBoot();

    page.classList.add("ready");

    console.log("[AGENTES] efeitos ativados.");
  }

  init();
})();
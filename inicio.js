(() => {
  "use strict";

  console.log("[INÍCIO] inicio.js executou.");

  const page = document.querySelector(".home-archive-page");

  if (!page) {
    console.warn("[INÍCIO] Página inicial não encontrada.");
    return;
  }

  const cardData = {
    documentos: {
      title: "Documentos // Arquivos Recuperados",
      text: "Relatórios da Ordo, fragmentos incompletos, documentos bloqueados e registros contaminados pelo Paranormal.",
      signal: "sinal: arquivo / recuperação / acesso parcial",
      terminal: [
        "> área selecionada: DOCUMENTOS.",
        "> integridade dos relatórios: variável.",
        "> aviso: alguns arquivos estão fragmentados."
      ]
    },

    elementos: {
      title: "Elementos // Camadas Paranormais",
      text: "Acesso ao hub dos cinco elementos. Cada arquivo reage de forma própria e carrega corrupção visual específica.",
      signal: "sinal: sangue / conhecimento / energia / morte / medo",
      terminal: [
        "> área selecionada: ELEMENTOS.",
        "> cinco assinaturas detectadas.",
        "> risco de leitura prolongada: alto."
      ]
    },

    agentes: {
      title: "Agentes // Perfis Operacionais",
      text: "Dossiês, fichas e registros dos agentes ligados à operação em Santa Luzia.",
      signal: "sinal: pessoal / operativo / histórico",
      terminal: [
        "> área selecionada: AGENTES.",
        "> perfis carregados parcialmente.",
        "> aviso: algumas fichas ainda estão bloqueadas."
      ]
    },

    locais: {
      title: "Locais // Santa Luzia",
      text: "Pontos investigáveis da cidade, áreas públicas, zonas afastadas, locais secretos e estruturas contaminadas.",
      signal: "sinal: mapa / cidade / isolamento",
      terminal: [
        "> área selecionada: LOCAIS.",
        "> Santa Luzia carregada.",
        "> aviso: camadas subterrâneas não indexadas."
      ]
    },

    missoes: {
      title: "Missões // Operações da Campanha",
      text: "Registro de investigações, eventos, pistas e acontecimentos importantes da campanha.",
      signal: "sinal: operação / caso / avanço",
      terminal: [
        "> área selecionada: MISSÕES.",
        "> operação atual: Corações do Outro Lado.",
        "> status: em andamento."
      ]
    },

    ordo: {
      title: "Ordo Realitas // Estrutura Interna",
      text: "Registros institucionais, comando, setores, hierarquia e funcionamento interno da organização.",
      signal: "sinal: comando / estrutura / contenção",
      terminal: [
        "> área selecionada: ORDO REALITAS.",
        "> autorização parcial aceita.",
        "> comando superior ocultando arquivos sensíveis."
      ]
    },

    klint: {
      title: "Klint // Comando Restrito",
      text: "Arquivo protegido. O sistema reconhece a existência do registro, mas não libera leitura completa.",
      signal: "sinal: restrito / comando / culpa",
      terminal: [
        "> tentativa de acesso: KLINT.",
        "> autorização insuficiente.",
        "> partes do arquivo foram ocultadas."
      ]
    },

    jogadores: {
      title: "Jogadores // Área do Mestre",
      text: "Área com informações sensíveis dos personagens jogadores e controle interno da campanha.",
      signal: "sinal: mestre / privado / confidencial",
      terminal: [
        "> tentativa de acesso: JOGADORES.",
        "> área marcada como privada.",
        "> autorização de mestre necessária."
      ]
    },

    componentes: {
      title: "Componentes Ritualísticos // Objetos Paranormais",
      text: "Registros de itens, relíquias e componentes conectados aos elementos, incluindo materiais contaminados.",
      signal: "sinal: componente / relíquia / risco",
      terminal: [
        "> tentativa de acesso: COMPONENTES.",
        "> objeto paranormal detectado.",
        "> aviso: contato visual prolongado não recomendado."
      ]
    }
  };

  const randomTerminalLines = [
    "> varredura concluída com inconsistências.",
    "> ruído paranormal detectado no arquivo.",
    "> Ordo Realitas // contenção visual mantida.",
    "> camada oculta recusou indexação.",
    "> fragmento sem origem anexado ao sistema.",
    "> integridade do arquivo oscilando.",
    "> aviso: leitura não garante compreensão."
  ];

  const state = {
    lastParticle: 0,
    activeCard: null
  };

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
    if (document.querySelector("#home-js-css")) return;

    const style = document.createElement("style");
    style.id = "home-js-css";

    style.textContent = `
      .home-js-layer,
      .home-symbol-field {
        position: fixed;
        inset: 0;
        z-index: 99999;
        pointer-events: none;
        overflow: hidden;
      }

      .home-symbol-field {
        z-index: 20;
        mix-blend-mode: screen;
        opacity: .42;
      }

      .home-symbol-field span {
        position: absolute;
        left: var(--x);
        top: var(--y);
        color: var(--c);
        font-size: var(--s);
        text-shadow: 0 0 18px currentColor;
        animation: homeAmbientSymbol var(--d) ease-in-out infinite;
        animation-delay: var(--delay);
      }

      .home-js-particle {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: 7px;
        aspect-ratio: 1;
        border-radius: 50%;
        color: var(--c);
        background: currentColor;
        box-shadow:
          0 0 14px currentColor,
          0 0 32px color-mix(in srgb, currentColor 45%, transparent);
        transform: translate(-50%, -50%) scale(var(--s, 1));
        animation: homeParticleFly 1.25s ease forwards;
      }

      .home-js-rune {
        position: fixed;
        left: var(--x);
        top: var(--y);
        color: var(--c);
        font-size: var(--s);
        text-shadow: 0 0 20px currentColor;
        transform: translate(-50%, -50%) rotate(var(--r));
        animation: homeRuneBurst 1.15s ease forwards;
      }

      .home-js-shockwave {
        position: fixed;
        left: var(--x);
        top: var(--y);
        width: 28px;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 2px solid var(--c);
        box-shadow: 0 0 24px var(--c);
        transform: translate(-50%, -50%);
        animation: homeShockwave .9s ease forwards;
      }

      .home-impact .home-navigation-panel,
      .home-impact .home-terminal-panel,
      .home-impact .home-side-panel {
        animation: homeImpact .65s ease both;
      }

      .home-terminal-line-new {
        animation: homeTerminalLine .45s ease both;
      }

      @keyframes homeAmbientSymbol {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
          opacity: .18;
        }

        50% {
          transform: translateY(-26px) rotate(12deg);
          opacity: .72;
        }
      }

      @keyframes homeParticleFly {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) translate(0, 0) scale(var(--s, 1));
        }

        15% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform:
            translate(-50%, -50%)
            translate(var(--dx), var(--dy))
            scale(.35);
        }
      }

      @keyframes homeRuneBurst {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--r)) scale(.4);
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(calc(var(--r) + 90deg)) scale(1.6);
        }
      }

      @keyframes homeShockwave {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(.2);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(18);
        }
      }

      @keyframes homeImpact {
        0%, 100% {
          transform: scale(1);
          filter: none;
        }

        35% {
          transform: scale(1.006);
          filter: brightness(1.18) saturate(1.2);
        }
      }

      @keyframes homeTerminalLine {
        from {
          opacity: 0;
          transform: translateX(-10px);
          filter: blur(4px);
        }

        to {
          opacity: 1;
          transform: translateX(0);
          filter: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function getCardColor(cardName) {
    const colors = {
      documentos: "#d7aa45",
      elementos: "#ff1646",
      agentes: "#8a4dff",
      locais: "#2be7ff",
      missoes: "#ff2fc9",
      ordo: "#f0e6c8",
      klint: "#e9e5df",
      jogadores: "#8a4dff",
      componentes: "#ff1646"
    };

    return colors[cardName] || "#d7aa45";
  }

  function setReading(cardName) {
    const data = cardData[cardName];
    if (!data) return;

    state.activeCard = cardName;
    page.dataset.activeHomeCard = cardName;

    const title = document.querySelector("[data-home-reading-title]");
    const text = document.querySelector("[data-home-reading-text]");
    const signal = document.querySelector("[data-home-reading-signal]");

    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
    if (signal) signal.textContent = data.signal;

    addTerminalLines(data.terminal);
  }

  function addTerminalLines(lines) {
    const terminal = document.querySelector("[data-home-terminal]");
    if (!terminal) return;

    lines.forEach((line, index) => {
      setTimeout(() => {
        const p = document.createElement("p");
        p.textContent = line;
        p.className = "home-terminal-line-new";

        terminal.appendChild(p);

        while (terminal.children.length > 9) {
          terminal.removeChild(terminal.firstElementChild);
        }
      }, index * 90);
    });
  }

  function spawnParticle(x, y, cardName = null) {
    const layer = createLayer("home-js-layer");
    const particle = document.createElement("span");
    const color = getCardColor(cardName || state.activeCard);

    particle.className = "home-js-particle";
    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.setProperty("--dx", `${random(-70, 70)}px`);
    particle.style.setProperty("--dy", `${random(-90, 70)}px`);
    particle.style.setProperty("--s", random(0.7, 1.45).toFixed(2));
    particle.style.setProperty("--c", color);

    layer.appendChild(particle);

    setTimeout(() => particle.remove(), 1300);
  }

  function spawnRune(x, y, cardName = null) {
    const layer = createLayer("home-js-layer");
    const rune = document.createElement("span");
    const symbols = ["▤", "◎", "◈", "⌖", "✦", "⬡", "██", "△", "◇"];
    const color = getCardColor(cardName || state.activeCard);

    rune.className = "home-js-rune";
    rune.textContent = pick(symbols);
    rune.style.setProperty("--x", `${x}px`);
    rune.style.setProperty("--y", `${y}px`);
    rune.style.setProperty("--s", `${random(1.1, 2.2)}rem`);
    rune.style.setProperty("--r", `${random(-80, 80)}deg`);
    rune.style.setProperty("--c", color);

    layer.appendChild(rune);

    setTimeout(() => rune.remove(), 1200);
  }

  function spawnShockwave(x, y, cardName = null) {
    const layer = createLayer("home-js-layer");
    const wave = document.createElement("span");
    const color = getCardColor(cardName || state.activeCard);

    wave.className = "home-js-shockwave";
    wave.style.setProperty("--x", `${x}px`);
    wave.style.setProperty("--y", `${y}px`);
    wave.style.setProperty("--c", color);

    layer.appendChild(wave);

    setTimeout(() => wave.remove(), 950);
  }

  function burst(x, y, cardName = null) {
    spawnShockwave(x, y, cardName);

    for (let i = 0; i < 10; i++) {
      spawnParticle(x, y, cardName);
    }

    for (let i = 0; i < 3; i++) {
      spawnRune(x + random(-38, 38), y + random(-38, 38), cardName);
    }
  }

  function createAmbientSymbols() {
    const field = createLayer("home-symbol-field");
    const symbols = ["▤", "◎", "◈", "⌖", "✦", "⬡", "△", "◇", "○"];
    const cardNames = Object.keys(cardData);

    field.innerHTML = "";

    for (let i = 0; i < 40; i++) {
      const symbol = document.createElement("span");
      const cardName = pick(cardNames);

      symbol.textContent = pick(symbols);
      symbol.style.setProperty("--x", `${random(0, 100)}%`);
      symbol.style.setProperty("--y", `${random(0, 100)}%`);
      symbol.style.setProperty("--s", `${random(1, 2.4)}rem`);
      symbol.style.setProperty("--d", `${random(7, 17)}s`);
      symbol.style.setProperty("--delay", `${random(-14, 0)}s`);
      symbol.style.setProperty("--c", getCardColor(cardName));

      field.appendChild(symbol);
    }
  }

  function bindCards() {
    document.addEventListener("pointerover", event => {
      const card = safeClosest(event, "[data-home-card]");
      if (!card) return;

      const cardName = card.dataset.homeCard;
      setReading(cardName);

      const rect = card.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, cardName);
    });

    document.addEventListener("pointermove", event => {
      page.style.setProperty("--cursor-x", `${event.clientX}px`);
      page.style.setProperty("--cursor-y", `${event.clientY}px`);
      page.style.setProperty("--mx", `${(event.clientX / innerWidth - 0.5).toFixed(3)}`);
      page.style.setProperty("--my", `${(event.clientY / innerHeight - 0.5).toFixed(3)}`);

      const card = safeClosest(event, ".home-nav-card, .home-locked-card");

      if (card) {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.setProperty("--tilt-x", `${py * -7}deg`);
        card.style.setProperty("--tilt-y", `${px * 9}deg`);
        card.style.setProperty("--light-x", `${(event.clientX - rect.left) / rect.width * 100}%`);
        card.style.setProperty("--light-y", `${(event.clientY - rect.top) / rect.height * 100}%`);
      }

      const now = performance.now();

      if (now - state.lastParticle > 90) {
        state.lastParticle = now;

        if (Math.random() > 0.48) {
          spawnParticle(event.clientX, event.clientY, state.activeCard);
        }
      }
    }, { passive: true });

    document.addEventListener("pointerout", event => {
      const card = safeClosest(event, ".home-nav-card, .home-locked-card");
      if (!card) return;

      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });

    document.addEventListener("click", event => {
      const card = safeClosest(event, "[data-home-card]");

      if (card) {
        const cardName = card.dataset.homeCard;
        burst(event.clientX, event.clientY, cardName);
      } else {
        burst(event.clientX, event.clientY, state.activeCard);
      }

      page.classList.add("home-impact");

      setTimeout(() => {
        page.classList.remove("home-impact");
      }, 700);
    });
  }

  function startAmbientTerminal() {
    setInterval(() => {
      if (document.hidden) return;

      addTerminalLines([pick(randomTerminalLines)]);

      if (Math.random() > 0.58) {
        spawnRune(
          random(80, innerWidth - 80),
          random(80, innerHeight - 80),
          state.activeCard
        );
      }
    }, 3800);
  }

  function init() {
    injectCss();
    createLayer("home-js-layer");
    createAmbientSymbols();
    bindCards();
    startAmbientTerminal();

    page.classList.add("home-js-active");

    console.log("[INÍCIO] efeitos ativados.");
  }

  init();
})();
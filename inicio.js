(() => {
  "use strict";

  const page = document.querySelector("[data-home-page]");
  if (!page) return;

  const cardData = {
    agentes: {
      title: "Agentes // Perfis Operacionais",
      text: "Central das fichas públicas dos jogadores e registros restritos da Trindade e do comando da Ordo.",
      signal: "sinal: operativo / fichas / hierarquia",
      integrity: "78%",
      terminal: [
        "> setor selecionado: AGENTES.",
        "> fichas públicas: Maisie / Lilian / Roselyn.",
        "> registros restritos: Yuna / Lisa / Blender / Klint."
      ]
    },
    documentos: {
      title: "Documentos // Arquivos Recuperados",
      text: "Relatórios, fragmentos corrompidos, notas de campo e registros que a Ordo conseguiu recuperar durante a operação.",
      signal: "sinal: recuperação / fragmento / acesso parcial",
      integrity: "63%",
      terminal: [
        "> setor selecionado: DOCUMENTOS.",
        "> documentos recuperados com falhas.",
        "> aviso: alguns trechos resistem à reconstrução."
      ]
    },
    elementos: {
      title: "Elementos // Camadas Paranormais",
      text: "Hub dos cinco elementos. Cada página reage como um arquivo contaminado pela própria assinatura paranormal.",
      signal: "sinal: sangue / conhecimento / energia / morte / medo",
      integrity: "41%",
      terminal: [
        "> setor selecionado: ELEMENTOS.",
        "> cinco assinaturas detectadas.",
        "> risco de leitura prolongada: alto."
      ]
    },
    locais: {
      title: "Locais // Santa Luzia",
      text: "Mapa narrativo da cidade, pontos importantes, áreas públicas, região rural e estruturas escondidas abaixo da Árvore Mãe.",
      signal: "sinal: mapa / isolamento / rota",
      integrity: "69%",
      terminal: [
        "> setor selecionado: LOCAIS.",
        "> Rio Lepras e Rodovia Ferreira indexados.",
        "> aviso: camadas subterrâneas não estão estáveis."
      ]
    },
    missoes: {
      title: "Missões // Operações da Campanha",
      text: "Registro do avanço narrativo, sessões, pistas, consequências e mudanças causadas pelas decisões dos agentes.",
      signal: "sinal: operação / sessão / consequência",
      integrity: "54%",
      terminal: [
        "> setor selecionado: MISSÕES.",
        "> operação atual: Corações do Outro Lado.",
        "> status: em andamento."
      ]
    },
    ordo: {
      title: "Ordo Realitas // Estrutura Interna",
      text: "Arquivos institucionais sobre setores, comando, Trindade, protocolos e funcionamento interno da Ordo.",
      signal: "sinal: comando / protocolo / contenção",
      integrity: "82%",
      terminal: [
        "> setor selecionado: ORDO REALITAS.",
        "> autorização parcial aceita.",
        "> comando superior mantém censuras ativas."
      ]
    },
    klint: {
      title: "Klint // Comando Restrito",
      text: "Registro reconhecido, mas protegido. O sistema confirma o comando, não libera o peso completo do arquivo.",
      signal: "sinal: restrito / comando / culpa",
      integrity: "██%",
      terminal: [
        "> tentativa de acesso: KLINT.",
        "> autorização insuficiente.",
        "> partes do arquivo foram ocultadas."
      ]
    },
    jogadores: {
      title: "Jogadores // Área do Mestre",
      text: "Área sensível com controle interno da campanha, dados privados e registros que não devem ser expostos antes da hora.",
      signal: "sinal: mestre / confidencial / bloqueado",
      integrity: "00%",
      terminal: [
        "> tentativa de acesso: JOGADORES.",
        "> área marcada como privada.",
        "> autorização de mestre necessária."
      ]
    },
    componentes: {
      title: "Componentes Ritualísticos // Objetos Paranormais",
      text: "Registros de relíquias, componentes, materiais contaminados e objetos ligados aos elementos da campanha.",
      signal: "sinal: componente / relíquia / contaminação",
      integrity: "35%",
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
    "> aviso: leitura não garante compreensão.",
    "> batimento irregular registrado em Santa Luzia."
  ];

  const TERMINAL_MAX_LINES = 8;
  const TERMINAL_BATCH_DELAY = 70;

  const state = {
    activeCard: null,
    lastTerminalCard: null,
    lastTerminalWrite: 0,
    terminalTimers: [],
    lastTrail: 0,
    lastGlitch: 0,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };

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

  function getCardColor(cardName) {
    const colors = {
      agentes: "#8a4dff",
      documentos: "#d7aa45",
      elementos: "#ff1646",
      locais: "#2be7ff",
      missoes: "#ff2fc9",
      ordo: "#f0e6c8",
      klint: "#e9e5df",
      jogadores: "#8a4dff",
      componentes: "#ff1646"
    };
    return colors[cardName] || "#d7aa45";
  }

  function hexToRgb(hex) {
    const value = hex.replace("#", "");
    const number = parseInt(value.length === 3 ? value.split("").map(v => v + v).join("") : value, 16);
    return {
      r: (number >> 16) & 255,
      g: (number >> 8) & 255,
      b: number & 255
    };
  }

  const vfx = (() => {
    let canvas;
    let ctx;
    let dpr = 1;
    let width = 0;
    let height = 0;
    let raf = 0;
    const particles = [];
    const waves = [];
    const runes = [];
    const glitches = [];
    const floaters = [];
    const symbols = ["▤", "◎", "◈", "⌖", "✦", "⬡", "△", "◇", "○", "//", "██"];

    function setup() {
      canvas = document.createElement("canvas");
      canvas.id = "home-vfx-canvas";
      canvas.setAttribute("aria-hidden", "true");
      Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "2147483647",
        pointerEvents: "none",
        display: "block",
        opacity: "1",
        mixBlendMode: "screen"
      });
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d", { alpha: true });
      resize();
      window.addEventListener("resize", resize, { passive: true });
      seedAmbient();
      loop();
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seedAmbient() {
      floaters.length = 0;
      for (let i = 0; i < 42; i++) {
        floaters.push({
          x: random(0, width),
          y: random(0, height),
          baseY: random(0, height),
          size: random(13, 31),
          speed: random(0.15, 0.55),
          drift: random(-0.12, 0.12),
          alpha: random(0.08, 0.23),
          rot: random(-0.8, 0.8),
          symbol: pick(symbols),
          color: getCardColor(pick(Object.keys(cardData))),
          phase: random(0, Math.PI * 2)
        });
      }
    }

    function glow(color, blur = 18) {
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
    }

    function noGlow() {
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    }

    function addTrail(x, y, cardName) {
      const color = getCardColor(cardName || state.activeCard);
      const rgb = hexToRgb(color);
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: x + random(-5, 5),
          y: y + random(-5, 5),
          vx: random(-0.45, 0.45),
          vy: random(-0.7, 0.25),
          life: random(32, 48),
          maxLife: 48,
          size: random(2.2, 4.8),
          color,
          rgb,
          kind: "trail"
        });
      }
    }

    function burst(x, y, cardName) {
      const color = getCardColor(cardName || state.activeCard);
      const rgb = hexToRgb(color);

      waves.push({ x, y, life: 38, maxLife: 38, color, rgb, radius: 8, power: random(6, 10) });

      for (let i = 0; i < 32; i++) {
        const angle = random(0, Math.PI * 2);
        const speed = random(1.4, 5.8);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: random(34, 62),
          maxLife: 62,
          size: random(2.5, 7.5),
          color,
          rgb,
          kind: Math.random() > 0.74 ? "line" : "dot"
        });
      }

      for (let i = 0; i < 5; i++) {
        runes.push({
          x: x + random(-54, 54),
          y: y + random(-54, 54),
          vx: random(-0.55, 0.55),
          vy: random(-1.3, -0.2),
          life: random(38, 58),
          maxLife: 58,
          size: random(19, 36),
          rot: random(-0.9, 0.9),
          spin: random(-0.025, 0.025),
          color,
          text: pick(symbols)
        });
      }

      addGlitch(cardName);
    }

    function addGlitch(cardName) {
      const now = performance.now();
      if (now - state.lastGlitch < 180) return;
      state.lastGlitch = now;
      const color = getCardColor(cardName || state.activeCard);
      const rgb = hexToRgb(color);
      for (let i = 0; i < 3; i++) {
        glitches.push({
          y: random(12, height - 12),
          h: random(2, 8),
          life: random(8, 16),
          maxLife: 16,
          offset: random(-42, 42),
          color,
          rgb
        });
      }
    }

    function drawFloaters() {
      ctx.save();
      ctx.font = "700 22px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const f of floaters) {
        f.phase += 0.008;
        f.x += f.drift;
        f.y -= f.speed;
        if (f.y < -40) {
          f.y = height + 40;
          f.x = random(0, width);
        }
        if (f.x < -50) f.x = width + 50;
        if (f.x > width + 50) f.x = -50;

        ctx.save();
        ctx.translate(f.x, f.y + Math.sin(f.phase) * 14);
        ctx.rotate(f.rot + Math.sin(f.phase) * 0.16);
        ctx.globalAlpha = f.alpha;
        ctx.font = `700 ${f.size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        ctx.fillStyle = f.color;
        glow(f.color, 16);
        ctx.fillText(f.symbol, 0, 0);
        ctx.restore();
      }
      ctx.restore();
      noGlow();
    }

    function drawParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vy += 0.012;

        const t = Math.max(0, p.life / p.maxLife);
        ctx.globalAlpha = Math.min(1, t * 1.15);
        ctx.fillStyle = `rgba(${p.rgb.r}, ${p.rgb.g}, ${p.rgb.b}, ${0.96 * t})`;
        ctx.strokeStyle = `rgba(${p.rgb.r}, ${p.rgb.g}, ${p.rgb.b}, ${0.8 * t})`;
        glow(p.color, p.kind === "trail" ? 10 : 22);

        if (p.kind === "line") {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 4.5, p.y - p.vy * 4.5);
          ctx.lineWidth = Math.max(1, p.size * 0.32);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (0.45 + t * 0.55), 0, Math.PI * 2);
          ctx.fill();
        }

        if (p.life <= 0) particles.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      noGlow();
    }

    function drawWaves() {
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.life -= 1;
        const t = Math.max(0, w.life / w.maxLife);
        const radius = w.radius + (1 - t) * 210 * w.power * 0.12;
        ctx.globalAlpha = t * 0.85;
        ctx.strokeStyle = `rgba(${w.rgb.r}, ${w.rgb.g}, ${w.rgb.b}, ${t})`;
        ctx.lineWidth = 1 + t * 3;
        glow(w.color, 30);
        ctx.beginPath();
        ctx.arc(w.x, w.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        if (w.life <= 0) waves.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      noGlow();
    }

    function drawRunes() {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = runes.length - 1; i >= 0; i--) {
        const r = runes[i];
        r.life -= 1;
        r.x += r.vx;
        r.y += r.vy;
        r.rot += r.spin;
        const t = Math.max(0, r.life / r.maxLife);
        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rot);
        ctx.globalAlpha = Math.min(1, t * 1.35);
        ctx.font = `800 ${r.size * (1.2 - t * 0.15)}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        ctx.fillStyle = r.color;
        glow(r.color, 26);
        ctx.fillText(r.text, 0, 0);
        ctx.restore();
        if (r.life <= 0) runes.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      noGlow();
    }

    function drawGlitches() {
      for (let i = glitches.length - 1; i >= 0; i--) {
        const g = glitches[i];
        g.life -= 1;
        const t = Math.max(0, g.life / g.maxLife);
        ctx.globalAlpha = t * 0.65;
        glow(g.color, 26);
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(0.32, `rgba(${g.rgb.r}, ${g.rgb.g}, ${g.rgb.b}, 0.05)`);
        gradient.addColorStop(0.5, `rgba(${g.rgb.r}, ${g.rgb.g}, ${g.rgb.b}, ${0.95 * t})`);
        gradient.addColorStop(0.68, `rgba(255,255,255,${0.18 * t})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(g.offset, g.y, width + 80, g.h);
        if (g.life <= 0) glitches.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      noGlow();
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      if (!state.reducedMotion) drawFloaters();
      drawGlitches();
      drawWaves();
      drawParticles();
      drawRunes();
    }

    return {
      setup,
      burst,
      addTrail,
      addGlitch,
      seedAmbient
    };
  })();

  function clearTerminalTimers() {
    state.terminalTimers.forEach(timer => clearTimeout(timer));
    state.terminalTimers = [];
  }

  function trimTerminal(terminal) {
    while (terminal.children.length > TERMINAL_MAX_LINES) {
      terminal.removeChild(terminal.firstElementChild);
    }
  }

  function addTerminalLines(lines, options = {}) {
    const terminal = document.querySelector("[data-home-terminal]");
    if (!terminal || !Array.isArray(lines) || lines.length === 0) return;

    const { replace = false, clearQueue = false } = options;
    if (clearQueue) clearTerminalTimers();
    if (replace) terminal.replaceChildren();

    lines.slice(0, TERMINAL_MAX_LINES).forEach((line, index) => {
      const timer = setTimeout(() => {
        const p = document.createElement("p");
        p.textContent = line;
        p.className = "home-terminal-line-new";
        terminal.appendChild(p);
        trimTerminal(terminal);
        terminal.scrollTop = terminal.scrollHeight;
      }, index * TERMINAL_BATCH_DELAY);
      state.terminalTimers.push(timer);
    });
  }

  function setReading(cardName) {
    const data = cardData[cardName];
    if (!data) return;

    state.activeCard = cardName;
    page.dataset.activeHomeCard = cardName;

    const title = document.querySelector("[data-home-reading-title]");
    const text = document.querySelector("[data-home-reading-text]");
    const signal = document.querySelector("[data-home-reading-signal]");
    const integrity = document.querySelector("[data-home-integrity]");

    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
    if (signal) signal.textContent = data.signal;
    if (integrity) integrity.textContent = data.integrity;

    if (state.lastTerminalCard !== cardName) {
      state.lastTerminalCard = cardName;
      state.lastTerminalWrite = performance.now();
      addTerminalLines(data.terminal, { replace: true, clearQueue: true });
    }
  }

  function resetTilt(card) {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  function showDenied(x, y) {
    const denied = document.createElement("span");
    denied.className = "home-copy-denied";
    denied.textContent = "cópia bloqueada";
    denied.style.setProperty("--x", `${x}px`);
    denied.style.setProperty("--y", `${y}px`);
    document.body.appendChild(denied);
    setTimeout(() => denied.remove(), 850);
  }

  function bindCards() {
    document.addEventListener("pointerover", event => {
      const card = safeClosest(event, "[data-home-card]");
      if (!card) return;
      if (event.relatedTarget instanceof Node && card.contains(event.relatedTarget)) return;

      const cardName = card.dataset.homeCard;
      const wasActive = state.activeCard === cardName;
      setReading(cardName);

      if (!wasActive) {
        const rect = card.getBoundingClientRect();
        vfx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, cardName);
      }
    });

    document.addEventListener("pointermove", event => {
      page.style.setProperty("--cursor-x", `${event.clientX}px`);
      page.style.setProperty("--cursor-y", `${event.clientY}px`);
      page.style.setProperty("--mx", `${(event.clientX / innerWidth - 0.5).toFixed(3)}`);
      page.style.setProperty("--my", `${(event.clientY / innerHeight - 0.5).toFixed(3)}`);

      const card = safeClosest(event, ".home-nav-card, .home-locked-card, .home-primary-action, .home-secondary-action");
      if (card) {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--tilt-x", `${py * -7}deg`);
        card.style.setProperty("--tilt-y", `${px * 9}deg`);
        card.style.setProperty("--light-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--light-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      }

      const now = performance.now();
      if (now - state.lastTrail > 34) {
        state.lastTrail = now;
        vfx.addTrail(event.clientX, event.clientY, state.activeCard);
      }
    }, { passive: true });

    document.addEventListener("pointerout", event => {
      const card = safeClosest(event, ".home-nav-card, .home-locked-card, .home-primary-action, .home-secondary-action");
      if (!card) return;
      resetTilt(card);
    });

    document.addEventListener("click", event => {
      const card = safeClosest(event, "[data-home-card]");
      const cardName = card ? card.dataset.homeCard : state.activeCard;
      vfx.burst(event.clientX, event.clientY, cardName);
      page.classList.add("home-impact");
      setTimeout(() => page.classList.remove("home-impact"), 700);
    });
  }

  function bindProtection() {
    document.addEventListener("selectstart", event => event.preventDefault());
    document.addEventListener("dragstart", event => event.preventDefault());

    document.addEventListener("copy", event => {
      event.preventDefault();
      showDenied(innerWidth / 2, innerHeight / 2);
      vfx.burst(innerWidth / 2, innerHeight / 2, "componentes");
    });

    document.addEventListener("cut", event => {
      event.preventDefault();
      showDenied(innerWidth / 2, innerHeight / 2);
      vfx.burst(innerWidth / 2, innerHeight / 2, "componentes");
    });

    document.addEventListener("contextmenu", event => {
      event.preventDefault();
      event.stopPropagation();
      showDenied(event.clientX, event.clientY);
      vfx.burst(event.clientX, event.clientY, "componentes");
      return false;
    }, { capture: true });
  }

  function startAmbientTerminal() {
    setInterval(() => {
      if (document.hidden) return;

      const now = performance.now();
      if (now - state.lastTerminalWrite > 5200) {
        state.lastTerminalWrite = now;
        addTerminalLines([pick(randomTerminalLines)]);
      }

      if (Math.random() > 0.54) {
        vfx.burst(random(90, innerWidth - 90), random(90, innerHeight - 90), state.activeCard);
      } else {
        vfx.addGlitch(state.activeCard);
      }
    }, 4200);
  }

  function injectCanvasCssFallback() {
    if (document.querySelector("#home-canvas-fallback-css")) return;
    const style = document.createElement("style");
    style.id = "home-canvas-fallback-css";
    style.textContent = `
      #home-vfx-canvas {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
        mix-blend-mode: screen !important;
      }

      .home-copy-denied {
        position: fixed !important;
        left: var(--x) !important;
        top: var(--y) !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        color: #ff1646 !important;
        border: 1px solid rgba(255, 22, 70, .6) !important;
        background: rgba(0, 0, 0, .88) !important;
        box-shadow: 0 0 32px rgba(255, 22, 70, .35) !important;
        border-radius: 999px !important;
        padding: .55rem .85rem !important;
        text-transform: uppercase !important;
        letter-spacing: .18em !important;
        font-size: .62rem !important;
        transform: translate(-50%, -50%) !important;
        animation: homeDenied .8s ease forwards !important;
      }

      @keyframes homeDenied {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(.88); }
        22% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -80%) scale(.96); }
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    injectCanvasCssFallback();
    vfx.setup();
    bindCards();
    bindProtection();
    startAmbientTerminal();

    page.classList.add("home-js-active");
    setReading("agentes");

    setTimeout(() => {
      vfx.burst(innerWidth * 0.5, Math.min(innerHeight * 0.38, 360), "agentes");
    }, 250);

    setTimeout(() => {
      vfx.burst(innerWidth * 0.24, innerHeight * 0.62, "elementos");
      vfx.burst(innerWidth * 0.78, innerHeight * 0.35, "documentos");
    }, 850);
  }

  init();
})();

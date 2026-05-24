(() => {
  "use strict";

  const page = document.querySelector(".elements-hub-page");

  if (!page) return;

  const canvas = document.querySelector("[data-elements-vfx]");
  const ctx = canvas?.getContext("2d", { alpha: true });
  const terminal = document.querySelector("[data-elements-terminal]");
  const readingTitle = document.querySelector("[data-elements-reading-title]");
  const readingText = document.querySelector("[data-elements-reading-text]");
  const readingSignature = document.querySelector("[data-elements-signature]");
  const integrity = document.querySelector("[data-elements-integrity]");
  const risk = document.querySelector("[data-elements-risk]");
  const containment = document.querySelector("[data-elements-containment]");

  const elementData = {
    sangue: {
      title: "Sangue // Impulso Vivo",
      text: "O arquivo pulsa como tecido orgânico. A leitura registra fome, instinto, contração e resposta emocional antes mesmo da análise terminar.",
      signature: "assinatura: batimento / carne / desejo",
      color: "#ff1646",
      dim: "rgba(255, 22, 70, 0.18)",
      glyph: "●",
      integrity: "64%",
      risk: "Crítico",
      containment: "Pulsando",
      terminal: [
        "> assinatura de Sangue detectada.",
        "> pressão orgânica aumentando.",
        "> aviso: o arquivo parece responder ao cursor."
      ]
    },

    conhecimento: {
      title: "Conhecimento // Excesso de Saber",
      text: "A leitura se multiplica em camadas. Símbolos, interpretações e olhos ocultos competem pela mesma superfície.",
      signature: "assinatura: símbolos / olho / perda",
      color: "#d7aa45",
      dim: "rgba(215, 170, 69, 0.18)",
      glyph: "◉",
      integrity: "71%",
      risk: "Alto",
      containment: "Decodificando",
      terminal: [
        "> assinatura de Conhecimento detectada.",
        "> excesso de metadados encontrado.",
        "> aviso: leitura pode alterar a compreensão do operador."
      ]
    },

    energia: {
      title: "Energia // Caos Instável",
      text: "A estrutura tenta se reconfigurar. O arquivo muda rápido demais para ser estabilizado, como se cada erro gerasse uma versão nova dele.",
      signature: "assinatura: glitch / faísca / erro",
      color: "#2be7ff",
      dim: "rgba(43, 231, 255, 0.18)",
      glyph: "✦",
      integrity: "43%",
      risk: "Instável",
      containment: "Oscilando",
      terminal: [
        "> assinatura de Energia detectada.",
        "> instabilidade subindo.",
        "> aviso: pacotes corrompidos em movimento."
      ]
    },

    morte: {
      title: "Morte // Tempo em Ruína",
      text: "A interface parece atrasada, envelhecida e coberta por poeira. O arquivo não quebra de uma vez; ele se desgasta.",
      signature: "assinatura: tempo / fim / decadência",
      color: "#9bbf7a",
      dim: "rgba(155, 191, 122, 0.18)",
      glyph: "⌛",
      integrity: "58%",
      risk: "Severo",
      containment: "Erodindo",
      terminal: [
        "> assinatura de Morte detectada.",
        "> erosão temporal registrada.",
        "> aviso: retorno ao estado anterior impossível."
      ]
    },

    medo: {
      title: "Medo // Ausência Infinita",
      text: "A leitura não revela. Ela retira. O espaço ao redor do card parece ficar silencioso demais, como se a interface prendesse a respiração.",
      signature: "assinatura: vazio / olho / presença",
      color: "#e9e5df",
      dim: "rgba(233, 229, 223, 0.13)",
      glyph: "○",
      integrity: "??%",
      risk: "Observando",
      containment: "Inconclusiva",
      terminal: [
        "> assinatura de Medo detectada.",
        "> ausência ocupando espaço.",
        "> aviso: algo está observando a leitura."
      ]
    }
  };

  const randomLines = [
    "> fragmento incompatível com interface humana.",
    "> camada oculta tentando emergir.",
    "> leitura parcial aceita.",
    "> erro: significado excede contenção.",
    "> arquivo respondeu antes do comando.",
    "> corrupção estética estabilizada temporariamente.",
    "> Ordo Realitas // contenção visual mantida."
  ];

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    particles: [],
    waves: [],
    glyphs: [],
    lastMouseParticle: 0,
    lastCard: null,
    lastCardTime: 0,
    activeElement: "neutral",
    terminalSignature: "",
    ambientTimer: null
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

  function resizeCanvas() {
    if (!canvas || !ctx) return;

    state.dpr = (window.OrdoPerf?.dpr?.(1.25) || Math.min(window.devicePixelRatio || 1, 1.25));
    state.width = window.innerWidth;
    state.height = window.innerHeight;

    canvas.width = Math.floor(state.width * state.dpr);
    canvas.height = Math.floor(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  }

  function getElementColor(elementName) {
    return elementData[elementName]?.color || "#d7aa45";
  }

  function getElementGlyph(elementName) {
    return elementData[elementName]?.glyph || "◆";
  }

  function addTerminalBlock(lines, signature = lines.join("|")) {
    if (!terminal) return;

    const now = performance.now();
    const normalized = `${signature}:${lines.join("|")}`;

    if (state.terminalSignature === normalized && now - state.lastTerminalTime < 1200) return;
    state.terminalSignature = normalized;
    state.lastTerminalTime = now;

    terminal.innerHTML = "";

    lines.slice(0, 6).forEach((line, index) => {
      const p = document.createElement("p");
      p.textContent = line;
      p.className = "terminal-line-new";
      p.style.animationDelay = `${index * 55}ms`;
      terminal.appendChild(p);
    });
  }

  function addAmbientTerminalLine() {
    if (!terminal) return;

    const p = document.createElement("p");
    p.textContent = pick(randomLines);
    p.className = "terminal-line-new";
    terminal.appendChild(p);

    while (terminal.children.length > 6) {
      terminal.removeChild(terminal.firstElementChild);
    }
  }

  function setReading(elementName, force = false) {
    const data = elementData[elementName];
    if (!data) return;

    const now = performance.now();

    if (!force && state.activeElement === elementName && now - state.lastCardTime < 550) return;

    state.activeElement = elementName;
    state.lastCardTime = now;
    page.dataset.activeElement = elementName;
    page.style.setProperty("--active-element-color", data.color);
    page.style.setProperty("--active-element-dim", data.dim);

    if (readingTitle) readingTitle.textContent = data.title;
    if (readingText) readingText.textContent = data.text;
    if (readingSignature) readingSignature.textContent = data.signature;
    if (integrity) integrity.textContent = data.integrity;
    if (risk) risk.textContent = data.risk;
    if (containment) containment.textContent = data.containment;

    addTerminalBlock(data.terminal, elementName);
  }

  function spawnParticle(x, y, elementName = state.activeElement, amount = 1) {
    const color = getElementColor(elementName);

    for (let i = 0; i < amount; i++) {
      state.particles.push({
        x,
        y,
        vx: random(-1.9, 1.9),
        vy: random(-2.2, .9),
        life: random(34, 68),
        maxLife: random(34, 68),
        size: random(1.6, 4.8),
        color
      });
    }
  }

  function spawnWave(x, y, elementName = state.activeElement) {
    state.waves.push({
      x,
      y,
      radius: 4,
      life: 38,
      maxLife: 38,
      color: getElementColor(elementName)
    });
  }

  function spawnGlyph(x, y, elementName = state.activeElement, amount = 1) {
    const color = getElementColor(elementName);
    const glyph = getElementGlyph(elementName);

    for (let i = 0; i < amount; i++) {
      state.glyphs.push({
        x: x + random(-34, 34),
        y: y + random(-34, 34),
        vx: random(-.45, .45),
        vy: random(-1.2, -.25),
        life: random(44, 76),
        maxLife: random(44, 76),
        size: random(14, 28),
        rotation: random(-.8, .8),
        spin: random(-.018, .018),
        color,
        glyph
      });
    }
  }

  function burstAt(x, y, elementName = state.activeElement) {
    if (window.OrdoPerf?.canSpawnVfx && !window.OrdoPerf.canSpawnVfx("elements-burst", 14)) return;

    const particleAmount = window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(12, 8, 5) : 12;
    const glyphAmount = window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(3, 2, 1) : 3;

    spawnWave(x, y, elementName);
    spawnParticle(x, y, elementName, particleAmount);
    spawnGlyph(x, y, elementName, glyphAmount);
  }

  function draw() {
    if (!ctx) return;

    ctx.clearRect(0, 0, state.width, state.height);
    ctx.globalCompositeOperation = "lighter";

    if (state.particles.length > 95) state.particles.splice(0, state.particles.length - 95);
    if (state.waves.length > 10) state.waves.splice(0, state.waves.length - 10);
    for (let i = state.particles.length - 1; i >= 0; i--) {
      const p = state.particles[i];
      const alpha = Math.max(p.life / p.maxLife, 0);

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.018;
      p.life -= 1;

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha * .78;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 9;
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) state.particles.splice(i, 1);
    }

    for (let i = state.waves.length - 1; i >= 0; i--) {
      const w = state.waves[i];
      const alpha = Math.max(w.life / w.maxLife, 0);

      w.radius += 9.5;
      w.life -= 1;

      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = 2.2 * alpha;
      ctx.globalAlpha = alpha * .64;
      ctx.shadowColor = w.color;
      ctx.shadowBlur = 13;
      ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
      ctx.stroke();

      if (w.life <= 0) state.waves.splice(i, 1);
    }

    if (state.glyphs.length > 24) state.glyphs.splice(0, state.glyphs.length - 24);
    for (let i = state.glyphs.length - 1; i >= 0; i--) {
      const g = state.glyphs[i];
      const alpha = Math.max(g.life / g.maxLife, 0);

      g.x += g.vx;
      g.y += g.vy;
      g.rotation += g.spin;
      g.life -= 1;

      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.rotation);
      ctx.globalAlpha = alpha * .78;
      ctx.fillStyle = g.color;
      ctx.shadowColor = g.color;
      ctx.shadowBlur = 10;
      ctx.font = `${g.size}px ui-serif, Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(g.glyph, 0, 0);
      ctx.restore();

      if (g.life <= 0) state.glyphs.splice(i, 1);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    (window.OrdoPerf?.raf || window.requestAnimationFrame)(draw);
  }

  function bindCards() {
    document.addEventListener("pointerover", event => {
      const card = safeClosest(event, ".element-card");
      if (!card) return;

      if (state.lastCard === card && performance.now() - state.lastCardTime < 520) return;
      state.lastCard = card;

      const elementName = card.dataset.element;
      const rect = card.getBoundingClientRect();

      setReading(elementName, true);
      burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, elementName);
    });

    document.addEventListener("pointermove", event => {
      page.style.setProperty("--cursor-x", `${event.clientX}px`);
      page.style.setProperty("--cursor-y", `${event.clientY}px`);
      page.style.setProperty("--mx", `${(event.clientX / window.innerWidth - 0.5).toFixed(3)}`);
      page.style.setProperty("--my", `${(event.clientY / window.innerHeight - 0.5).toFixed(3)}`);

      const card = safeClosest(event, ".element-card");

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
      const particleDelay = window.OrdoPerf?.isMobile?.() ? 180 : 130;
      if (now - state.lastMouseParticle > particleDelay) {
        state.lastMouseParticle = now;
        if (!window.OrdoPerf?.canSpawnVfx || window.OrdoPerf.canSpawnVfx("elements-trail", 0.9)) {
          spawnParticle(event.clientX, event.clientY, card?.dataset.element || state.activeElement, 1);
        }
      }
    }, { passive: true });

    document.addEventListener("pointerout", event => {
      const card = safeClosest(event, ".element-card");
      if (!card) return;

      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });

    document.addEventListener("click", event => {
      const card = safeClosest(event, ".element-card");
      const elementName = card?.dataset.element || state.activeElement;

      burstAt(event.clientX, event.clientY, elementName);
      page.classList.add("elements-click-impact");

      setTimeout(() => page.classList.remove("elements-click-impact"), 520);
    });
  }

  function bindRandomButton() {
    const button = document.querySelector("[data-elements-random]");
    if (!button) return;

    button.addEventListener("click", event => {
      const elementName = pick(Object.keys(elementData));
      const card = document.querySelector(`[data-element="${elementName}"]`);

      setReading(elementName, true);
      burstAt(event.clientX, event.clientY, elementName);

      if (card) {
        card.classList.add("element-card-forced");
        setTimeout(() => card.classList.remove("element-card-forced"), 900);
      }

      addTerminalBlock([
        "> leitura aleatória forçada.",
        `> elemento selecionado: ${elementName.toUpperCase()}.`,
        pick(randomLines)
      ], `random-${elementName}-${Date.now()}`);
    });
  }

  function bindInteractionLocks() {
    document.addEventListener("selectstart", event => event.preventDefault());
    document.addEventListener("dragstart", event => event.preventDefault());

    document.addEventListener("copy", event => {
      event.preventDefault();
      addTerminalBlock([
        "> tentativa de extração textual bloqueada.",
        "> protocolo de contenção preservado.",
        "> acesso de cópia negado pela Ordo."
      ], "copy-blocked");
    });

    document.addEventListener("contextmenu", event => {
      event.preventDefault();
      event.stopPropagation();
      burstAt(event.clientX, event.clientY, state.activeElement);
      addTerminalBlock([
        "> menu externo bloqueado.",
        "> leitura elemental não pode ser exportada por método comum.",
        "> contenção mantida."
      ], "context-blocked");
      return false;
    }, { capture: true });
  }

  function startAmbient() {
    state.ambientTimer = (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;

      const names = Object.keys(elementData);
      const elementName = state.activeElement === "neutral" ? pick(names) : state.activeElement;

      addAmbientTerminalLine();
      if (!window.OrdoPerf?.canSpawnVfx || window.OrdoPerf.canSpawnVfx("elements-ambient", 4)) {
        spawnGlyph(random(80, window.innerWidth - 80), random(80, window.innerHeight - 80), elementName, 1);
      }

      if (Math.random() > .62 && (!window.OrdoPerf?.canSpawnVfx || window.OrdoPerf.canSpawnVfx("elements-ambient-particle", 2))) {
        spawnParticle(random(0, window.innerWidth), random(0, window.innerHeight), elementName, 2);
      }
    }, 5600);
  }

  function bootPulse() {
    setTimeout(() => {
      burstAt(window.innerWidth / 2, Math.min(window.innerHeight * .42, 390), "energia");
      addTerminalBlock([
        "> central elemental sincronizada.",
        "> canvas_vfx: visível.",
        "> selecione uma assinatura para leitura dinâmica."
      ], "boot");
    }, 260);
  }

  function init() {
    resizeCanvas();
    bindCards();
    bindRandomButton();
    bindInteractionLocks();
    startAmbient();
    bootPulse();
    (window.OrdoPerf?.raf || window.requestAnimationFrame)(draw);

    window.addEventListener("resize", resizeCanvas, { passive: true });

    page.classList.add("elements-js-active");
    console.log("[ELEMENTOS] Hub elemental V2 ativo.");
  }

  init();
})();

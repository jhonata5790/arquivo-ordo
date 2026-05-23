(() => {
  "use strict";

  console.log("[ELEMENTOS] elementos-corrompidos.js executou.");

  const page = document.querySelector(".elements-hub-page");

  if (!page) {
    console.warn("[ELEMENTOS] Página elementos não encontrada.");
    return;
  }

  const elementData = {
    sangue: {
      title: "Sangue // Impulso Vivo",
      text: "O card pulsa como tecido orgânico. A leitura registra fome, instinto, contração e resposta biológica.",
      signature: "assinatura: batimento / carne / desejo",
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
      terminal: [
        "> assinatura de Conhecimento detectada.",
        "> excesso de metadados encontrado.",
        "> aviso: leitura pode alterar a compreensão do operador."
      ]
    },

    energia: {
      title: "Energia // Caos Instável",
      text: "A estrutura do card tenta se reconfigurar. O arquivo muda rápido demais para ser estabilizado.",
      signature: "assinatura: glitch / faísca / erro",
      terminal: [
        "> assinatura de Energia detectada.",
        "> instabilidade subindo.",
        "> aviso: pacotes corrompidos em movimento."
      ]
    },

    morte: {
      title: "Morte // Tempo em Ruína",
      text: "A interface parece atrasada, envelhecida e coberta por poeira. O arquivo não quebra; ele se desgasta.",
      signature: "assinatura: tempo / fim / decadência",
      terminal: [
        "> assinatura de Morte detectada.",
        "> erosão temporal registrada.",
        "> aviso: retorno ao estado anterior impossível."
      ]
    },

    medo: {
      title: "Medo // Ausência Infinita",
      text: "A leitura não revela. Ela retira. O espaço ao redor do card parece ficar silencioso demais.",
      signature: "assinatura: vazio / olho / presença",
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
    lastParticle: 0,
    selected: null
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

  function setReading(elementName) {
    const data = elementData[elementName];
    if (!data) return;

    state.selected = elementName;

    page.dataset.activeElement = elementName;

    const title = document.querySelector("[data-elements-reading-title]");
    const text = document.querySelector("[data-elements-reading-text]");
    const signature = document.querySelector("[data-elements-signature]");

    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
    if (signature) signature.textContent = data.signature;

    addTerminalLines(data.terminal);
  }

  function addTerminalLines(lines) {
    const terminal = document.querySelector("[data-elements-terminal]");
    if (!terminal) return;

    lines.forEach((line, index) => {
      setTimeout(() => {
        const p = document.createElement("p");
        p.textContent = line;
        p.className = "terminal-line-new";
        terminal.appendChild(p);

        while (terminal.children.length > 9) {
          terminal.removeChild(terminal.firstElementChild);
        }
      }, index * 90);
    });
  }

  function spawnParticle(x, y, elementName = "neutral") {
    const layer = createLayer("elements-js-layer");
    const particle = document.createElement("span");

    particle.className = `elements-js-particle particle-${elementName}`;
    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.setProperty("--dx", `${random(-70, 70)}px`);
    particle.style.setProperty("--dy", `${random(-90, 70)}px`);
    particle.style.setProperty("--s", random(0.7, 1.55).toFixed(2));

    layer.appendChild(particle);

    setTimeout(() => particle.remove(), 1300);
  }

  function spawnRune(x, y, elementName = "neutral") {
    const layer = createLayer("elements-js-layer");
    const rune = document.createElement("span");

    const symbols = {
      sangue: "●",
      conhecimento: "◉",
      energia: "✦",
      morte: "⌛",
      medo: "○",
      neutral: "◆"
    };

    rune.className = `elements-js-rune rune-${elementName}`;
    rune.textContent = symbols[elementName] || symbols.neutral;
    rune.style.setProperty("--x", `${x}px`);
    rune.style.setProperty("--y", `${y}px`);
    rune.style.setProperty("--r", `${random(-90, 90)}deg`);

    layer.appendChild(rune);

    setTimeout(() => rune.remove(), 1100);
  }

  function spawnShockwave(x, y, elementName = "neutral") {
    const layer = createLayer("elements-js-layer");
    const wave = document.createElement("span");

    wave.className = `elements-js-shockwave shockwave-${elementName}`;
    wave.style.setProperty("--x", `${x}px`);
    wave.style.setProperty("--y", `${y}px`);

    layer.appendChild(wave);

    setTimeout(() => wave.remove(), 900);
  }

  function burstAt(x, y, elementName = "neutral") {
    spawnShockwave(x, y, elementName);

    for (let i = 0; i < 12; i++) {
      spawnParticle(x, y, elementName);
    }

    for (let i = 0; i < 4; i++) {
      spawnRune(x + random(-45, 45), y + random(-45, 45), elementName);
    }
  }

  function createAmbientField() {
    const field = createLayer("elements-ambient-symbols");
    field.innerHTML = "";

    const symbols = ["●", "◉", "✦", "⌛", "○", "△", "◇", "╳"];

    for (let i = 0; i < 42; i++) {
      const symbol = document.createElement("span");
      const elementNames = ["sangue", "conhecimento", "energia", "morte", "medo"];
      const type = pick(elementNames);

      symbol.textContent = pick(symbols);
      symbol.className = `ambient-symbol ambient-${type}`;
      symbol.style.left = `${random(0, 100)}%`;
      symbol.style.top = `${random(0, 100)}%`;
      symbol.style.animationDelay = `${random(-8, 0)}s`;
      symbol.style.animationDuration = `${random(6, 16)}s`;

      field.appendChild(symbol);
    }
  }

  function bindCards() {
    document.addEventListener("pointerover", event => {
      const card = safeClosest(event, ".element-card");
      if (!card) return;

      const elementName = card.dataset.element;
      setReading(elementName);

      const rect = card.getBoundingClientRect();
      burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, elementName);
    });

    document.addEventListener("pointermove", event => {
      const now = performance.now();

      page.style.setProperty("--cursor-x", `${event.clientX}px`);
      page.style.setProperty("--cursor-y", `${event.clientY}px`);
      page.style.setProperty("--mx", `${(event.clientX / window.innerWidth - 0.5).toFixed(3)}`);
      page.style.setProperty("--my", `${(event.clientY / window.innerHeight - 0.5).toFixed(3)}`);

      const card = safeClosest(event, ".element-card");

      if (card) {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.setProperty("--tilt-x", `${py * -8}deg`);
        card.style.setProperty("--tilt-y", `${px * 10}deg`);
        card.style.setProperty("--light-x", `${(event.clientX - rect.left) / rect.width * 100}%`);
        card.style.setProperty("--light-y", `${(event.clientY - rect.top) / rect.height * 100}%`);
      }

      if (now - state.lastParticle > 95) {
        state.lastParticle = now;

        const active = card?.dataset.element || page.dataset.activeElement || "neutral";

        if (Math.random() > 0.45) {
          spawnParticle(event.clientX, event.clientY, active);
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

      if (card) {
        const elementName = card.dataset.element;
        burstAt(event.clientX, event.clientY, elementName);
        page.classList.add("elements-click-impact");

        setTimeout(() => {
          page.classList.remove("elements-click-impact");
        }, 700);

        return;
      }

      burstAt(event.clientX, event.clientY, page.dataset.activeElement || "neutral");
    });
  }

  function bindRandomButton() {
    const button = document.querySelector("[data-elements-random]");

    if (!button) return;

    button.addEventListener("click", event => {
      const names = Object.keys(elementData);
      const elementName = pick(names);

      setReading(elementName);
      burstAt(event.clientX, event.clientY, elementName);

      const card = document.querySelector(`[data-element="${elementName}"]`);

      if (card) {
        card.classList.add("element-card-forced");

        setTimeout(() => {
          card.classList.remove("element-card-forced");
        }, 900);
      }

      addTerminalLines([
        "> leitura aleatória forçada.",
        `> elemento selecionado: ${elementName.toUpperCase()}.`,
        pick(randomLines)
      ]);
    });
  }

  function startAmbientMessages() {
    setInterval(() => {
      if (document.hidden) return;

      addTerminalLines([pick(randomLines)]);

      const names = Object.keys(elementData);
      const elementName = page.dataset.activeElement || pick(names);

      if (Math.random() > 0.55) {
        spawnRune(
          random(80, window.innerWidth - 80),
          random(80, window.innerHeight - 80),
          elementName
        );
      }
    }, 3600);
  }

  function init() {
    createLayer("elements-js-layer");
    createAmbientField();

    bindCards();
    bindRandomButton();
    startAmbientMessages();

    page.classList.add("elements-js-active");

    console.log("[ELEMENTOS] efeitos ativados.");
  }

  init();
})();
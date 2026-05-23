(() => {
  "use strict";

  console.log("[PLAYER PAGE] carregado.");

  const page = document.querySelector(".player-page");
  if (!page) return;

  const terminal = document.querySelector("[data-player-terminal]");
  const attrReading = document.querySelector("[data-attr-reading]");

  const attrText = {
    FOR: "FOR mede força física, impacto direto e capacidade de lidar com esforço bruto.",
    AGI: "AGI mede reflexos, mobilidade, esquiva e resposta rápida em situações de risco.",
    INT: "INT mede raciocínio, investigação, conhecimento técnico e leitura lógica do paranormal.",
    PRE: "PRE mede presença, vontade, comunicação e resistência emocional diante do medo.",
    VIG: "VIG mede saúde, fôlego, resistência física e capacidade de permanecer de pé."
  };

  const terminalLines = [
    "> varredura concluída.",
    "> ficha pública parcial estável.",
    "> módulo visual respondendo.",
    "> ruído paranormal mínimo.",
    "> leitura operacional atualizada.",
    "> Ordo Realitas // acesso monitorado."
  ];

  let lastParticle = 0;

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

  function addTerminal(text) {
    if (!terminal) return;

    const p = document.createElement("p");
    p.textContent = text;
    p.className = "terminal-line-new";

    terminal.appendChild(p);

    while (terminal.children.length > 9) {
      terminal.removeChild(terminal.firstElementChild);
    }
  }

  function layer() {
    let el = document.querySelector(".player-fx-layer");

    if (!el) {
      el = document.createElement("div");
      el.className = "player-fx-layer";
      el.setAttribute("aria-hidden", "true");
      document.body.appendChild(el);
    }

    return el;
  }

  function spawnParticle(x, y) {
    const fx = layer();
    const p = document.createElement("span");

    p.className = "player-particle";
    p.style.setProperty("--x", `${x}px`);
    p.style.setProperty("--y", `${y}px`);
    p.style.setProperty("--dx", `${random(-80, 80)}px`);
    p.style.setProperty("--dy", `${random(-100, 70)}px`);
    p.style.setProperty("--s", random(0.7, 1.5).toFixed(2));

    fx.appendChild(p);
    setTimeout(() => p.remove(), 1300);
  }

  function spawnRune(x, y) {
    const fx = layer();
    const r = document.createElement("span");
    const symbols = ["◈", "⬡", "▤", "⌖", "✦", "△", "◇", "◎"];

    r.className = "player-rune";
    r.textContent = pick(symbols);
    r.style.setProperty("--x", `${x}px`);
    r.style.setProperty("--y", `${y}px`);
    r.style.setProperty("--r", `${random(-90, 90)}deg`);

    fx.appendChild(r);
    setTimeout(() => r.remove(), 1200);
  }

  function spawnWave(x, y) {
    const fx = layer();
    const w = document.createElement("span");

    w.className = "player-wave";
    w.style.setProperty("--x", `${x}px`);
    w.style.setProperty("--y", `${y}px`);

    fx.appendChild(w);
    setTimeout(() => w.remove(), 900);
  }

  function burst(x, y) {
    spawnWave(x, y);

    for (let i = 0; i < 10; i++) {
      spawnParticle(x, y);
    }

    for (let i = 0; i < 3; i++) {
      spawnRune(x + random(-40, 40), y + random(-40, 40));
    }
  }

  function switchTab(tabName) {
    document.querySelectorAll("[data-tab]").forEach(button => {
      button.classList.toggle("active", button.dataset.tab === tabName);
    });

    document.querySelectorAll("[data-panel]").forEach(panel => {
      panel.classList.toggle("active", panel.dataset.panel === tabName);
    });

    addTerminal(`> aba aberta: ${tabName.toUpperCase()}.`);
  }

  function selectAttr(attrName) {
    document.querySelectorAll("[data-attr]").forEach(button => {
      button.classList.toggle("active", button.dataset.attr === attrName);
    });

    if (attrReading) {
      attrReading.textContent = attrText[attrName] || "Leitura indisponível.";
    }

    addTerminal(`> atributo selecionado: ${attrName}.`);
  }

  document.addEventListener("click", event => {
    const tab = safeClosest(event, "[data-tab]");
    const attr = safeClosest(event, "[data-attr]");
    const info = safeClosest(event, "[data-info]");

    if (tab) {
      switchTab(tab.dataset.tab);
      burst(event.clientX, event.clientY);
      return;
    }

    if (attr) {
      selectAttr(attr.dataset.attr);
      burst(event.clientX, event.clientY);
      return;
    }

    if (info) {
      info.classList.add("clicked");
      addTerminal("> módulo de informação consultado.");
      burst(event.clientX, event.clientY);

      setTimeout(() => info.classList.remove("clicked"), 850);
      return;
    }

    burst(event.clientX, event.clientY);
  });

  document.addEventListener("pointermove", event => {
    page.style.setProperty("--cursor-x", `${event.clientX}px`);
    page.style.setProperty("--cursor-y", `${event.clientY}px`);
    page.style.setProperty("--mx", `${(event.clientX / innerWidth - 0.5).toFixed(3)}`);
    page.style.setProperty("--my", `${(event.clientY / innerHeight - 0.5).toFixed(3)}`);

    const now = performance.now();

    if (now - lastParticle > 95) {
      lastParticle = now;

      if (Math.random() > 0.55) {
        spawnParticle(event.clientX, event.clientY);
      }
    }
  }, { passive: true });

  setInterval(() => {
    if (document.hidden) return;

    addTerminal(pick(terminalLines));

    if (Math.random() > 0.55) {
      spawnRune(random(90, innerWidth - 90), random(90, innerHeight - 90));
    }
  }, 4300);

  page.classList.add("player-ready");
  addTerminal("> interface da Maisie pronta.");

  console.log("[PLAYER PAGE] efeitos ativados.");
})();
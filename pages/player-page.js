(() => {
  "use strict";

  console.log("[PLAYER PAGE] carregado.");

  const page = document.querySelector(".player-page");

  if (!page) {
    console.warn("[PLAYER PAGE] Nenhuma página de ficha encontrada.");
    return;
  }

  const terminal = document.querySelector("[data-player-terminal]");
  const attrReading = document.querySelector("[data-attr-reading]");

  const attrText = {
    FOR: "FOR mede força física, impacto direto, capacidade de carregar peso, segurar pressão corporal e lidar com esforço bruto.",
    AGI: "AGI mede reflexos, mobilidade, esquiva, velocidade de reação e capacidade de se mover bem em situações de risco.",
    INT: "INT mede raciocínio, investigação, conhecimento técnico, interpretação de pistas e leitura lógica do paranormal.",
    PRE: "PRE mede presença, vontade, comunicação, influência emocional e resistência psicológica diante do medo.",
    VIG: "VIG mede saúde, fôlego, resistência física, tolerância a dano e capacidade de continuar de pé sob pressão."
  };

  const terminalLines = [
    "> varredura concluída.",
    "> ficha pública parcial estável.",
    "> módulo visual respondendo.",
    "> ruído paranormal mínimo.",
    "> leitura operacional atualizada.",
    "> Ordo Realitas // acesso monitorado.",
    "> roda de atributos em movimento.",
    "> integridade visual preservada."
  ];

  let lastParticle = 0;

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
    p.className = "terminal-line-new";

    terminal.appendChild(p);

    while (terminal.children.length > 9) {
      terminal.removeChild(terminal.firstElementChild);
    }
  }

  function getLayer() {
    let layer = document.querySelector(".player-fx-layer");

    if (!layer) {
      layer = document.createElement("div");
      layer.className = "player-fx-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
    }

    return layer;
  }

  function spawnParticle(x, y, intense = false) {
    const fx = getLayer();
    const particle = document.createElement("span");

    particle.className = intense ? "player-particle particle-intense" : "player-particle";
    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.setProperty("--dx", `${random(-85, 85)}px`);
    particle.style.setProperty("--dy", `${random(-105, 75)}px`);
    particle.style.setProperty("--s", random(0.7, intense ? 1.7 : 1.25).toFixed(2));

    fx.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1300);
  }

  function spawnRune(x, y) {
    const fx = getLayer();
    const rune = document.createElement("span");
    const symbols = ["◈", "⬡", "▤", "⌖", "✦", "△", "◇", "◎", "✧"];

    rune.className = "player-rune";
    rune.textContent = pick(symbols);
    rune.style.setProperty("--x", `${x}px`);
    rune.style.setProperty("--y", `${y}px`);
    rune.style.setProperty("--r", `${random(-90, 90)}deg`);

    fx.appendChild(rune);

    setTimeout(() => {
      rune.remove();
    }, 1200);
  }

  function spawnWave(x, y) {
    const fx = getLayer();
    const wave = document.createElement("span");

    wave.className = "player-wave";
    wave.style.setProperty("--x", `${x}px`);
    wave.style.setProperty("--y", `${y}px`);

    fx.appendChild(wave);

    setTimeout(() => {
      wave.remove();
    }, 900);
  }

  function burst(x, y) {
    spawnWave(x, y);

    for (let i = 0; i < 12; i++) {
      spawnParticle(x, y, i % 3 === 0);
    }

    for (let i = 0; i < 4; i++) {
      spawnRune(x + random(-42, 42), y + random(-42, 42));
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
      attrReading.textContent = attrText[attrName] || "Leitura indisponível para este atributo.";
    }

    addTerminal(`> atributo selecionado: ${attrName}.`);
  }

  function bindClicks() {
    document.addEventListener("click", event => {
      const tab = safeClosest(event, "[data-tab]");
      const attr = safeClosest(event, "[data-attr]");
      const info = safeClosest(event, "[data-info]");
      const link = safeClosest(event, "a");

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

        setTimeout(() => {
          info.classList.remove("clicked");
        }, 850);

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

      const now = performance.now();

      if (now - lastParticle > 95) {
        lastParticle = now;

        if (Math.random() > 0.55) {
          spawnParticle(event.clientX, event.clientY, false);
        }
      }
    }, { passive: true });
  }

  function bindCardHover() {
    document.addEventListener("pointermove", event => {
      const hoverable = safeClosest(
        event,
        ".player-tab, .attr-button, [data-info], .quick-row, .player-back"
      );

      if (!hoverable) return;

      const rect = hoverable.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      hoverable.style.setProperty("--tilt-x", `${py * -5}deg`);
      hoverable.style.setProperty("--tilt-y", `${px * 7}deg`);
    }, { passive: true });

    document.addEventListener("pointerout", event => {
      const hoverable = safeClosest(
        event,
        ".player-tab, .attr-button, [data-info], .quick-row, .player-back"
      );

      if (!hoverable) return;

      hoverable.style.setProperty("--tilt-x", "0deg");
      hoverable.style.setProperty("--tilt-y", "0deg");
    });
  }

  function startAmbientTerminal() {
    (window.OrdoPerf?.interval || window.setInterval)(() => {
      if (document.hidden) return;

      addTerminal(pick(terminalLines));

      if (Math.random() > 0.55) {
        spawnRune(
          random(90, innerWidth - 90),
          random(90, innerHeight - 90)
        );
      }
    }, 4300);
  }

  function init() {
    getLayer();

    bindClicks();
    bindPointer();
    bindCardHover();
    startAmbientTerminal();

    page.classList.add("player-ready");

    addTerminal("> interface da Maisie pronta.");

    console.log("[PLAYER PAGE] efeitos ativados.");
  }

  init();
})();
(function () {
  "use strict";

  const body = document.body;
  const canvas = document.querySelector(".section-vfx-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const cards = Array.from(document.querySelectorAll(".section-record-card"));
  const filters = Array.from(document.querySelectorAll(".section-filters button"));
  const search = document.getElementById("sectionSearch");
  const reader = document.getElementById("sectionReader");
  const terminal = document.querySelector(".reader-terminal");
  const actions = Array.from(document.querySelectorAll(".section-action"));

  const section = body?.dataset?.section || "arquivo";
  const palette = {
    locais: ["rgba(74, 214, 255, 0.9)", "rgba(216, 184, 92, 0.9)", "rgba(118, 79, 255, 0.65)"],
    missoes: ["rgba(255, 64, 94, 0.9)", "rgba(216, 184, 92, 0.9)", "rgba(141, 83, 255, 0.75)"],
    ordo: ["rgba(216, 184, 92, 0.95)", "rgba(255, 64, 94, 0.75)", "rgba(255, 255, 255, 0.65)"],
    arquivo: ["rgba(216, 184, 92, 0.9)", "rgba(255, 64, 94, 0.75)", "rgba(118, 79, 255, 0.65)"]
  }[section] || ["rgba(216, 184, 92, 0.9)", "rgba(255, 64, 94, 0.75)", "rgba(118, 79, 255, 0.65)"];

  let width = 0;
  let height = 0;
  let particles = [];
  let activeFilter = "all";
  let lastTerminal = "";
  let lastHover = null;

  function safeClosest(event, selector) {
    const target = event.target;
    if (!target || !(target instanceof Element)) return null;
    return target.closest(selector);
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = (window.OrdoPerf?.dpr?.(1.5) || Math.min(window.devicePixelRatio || 1, 1.5));
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function addParticle(x, y, amount = 8, power = 1) {
    if (!ctx) return;
    for (let i = 0; i < amount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 1.9 + 0.45) * power;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * 34 + 26,
        max: 60,
        size: Math.random() * 2.2 + 0.8,
        color: palette[Math.floor(Math.random() * palette.length)],
        ring: Math.random() > 0.72
      });
    }
    if (particles.length > 180) particles = particles.slice(-180);
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.life -= 1;
      const alpha = Math.max(p.life / p.max, 0);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      if (p.ring) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, (1 - alpha) * 28 + p.size, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    particles = particles.filter((p) => p.life > 0);
    (window.OrdoPerf?.raf || window.requestAnimationFrame)(draw);
  }

  function updateTerminal(lines) {
    if (!terminal) return;
    const payload = Array.isArray(lines) ? lines.join("|") : String(lines);
    if (payload === lastTerminal) return;
    lastTerminal = payload;
    const top = terminal.querySelector(".terminal-top")?.outerHTML || "";
    const finalLines = (Array.isArray(lines) ? lines : [String(lines)]).slice(0, 5);
    terminal.innerHTML = `${top}${finalLines.map((line) => `<p>${line}</p>`).join("")}`;
  }

  function parseLines(card) {
    return String(card.dataset.lines || "").split("|").filter(Boolean);
  }

  function setReader(card, lock = false) {
    if (!card || !reader) return;
    const title = card.dataset.title || card.querySelector("strong")?.textContent || "Registro";
    const code = card.dataset.code || card.querySelector("span")?.textContent || "OR-000";
    const risk = card.dataset.risk || "Risco não especificado";
    const note = card.dataset.note || "Nota indisponível.";
    const lines = parseLines(card);
    const locked = lock || card.classList.contains("locked");

    reader.innerHTML = `
      <p class="tag">${locked ? "ACESSO CONTROLADO" : "REGISTRO SELECIONADO"}</p>
      <h2>${title}</h2>
      <div class="reader-meta"><span>${code}</span><span>${risk}</span></div>
      <div class="reader-lines">
        ${lines.map((line) => `<span>${line}</span>`).join("")}
      </div>
      <p class="reader-note">${note}</p>
    `;

    updateTerminal([
      `[ARQUIVO] ${code} carregado.`,
      `[STATUS] ${risk}.`,
      locked ? "[ACESSO] camada restrita detectada." : "[LEITURA] conteúdo liberado para consulta.",
      `[SETOR] ${section.toUpperCase()} // sincronizado.`
    ]);
  }

  function filterCards() {
    const term = (search?.value || "").trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const haystack = `${card.textContent} ${card.dataset.title || ""} ${card.dataset.code || ""} ${card.dataset.risk || ""}`.toLowerCase();
      const filterTags = (card.dataset.filter || "").split(" ");
      const filterOk = activeFilter === "all" || filterTags.includes(activeFilter);
      const searchOk = !term || haystack.includes(term);
      const show = filterOk && searchOk;
      card.hidden = !show;
      if (show) visible += 1;
    });
    updateTerminal([
      `[FILTRO] ${activeFilter.toUpperCase()} aplicado.`,
      `[BUSCA] ${term || "sem termo"}.`,
      `[RESULTADO] ${visible} registros visíveis.`,
      "[OR DO] índice estabilizado."
    ]);
  }

  function randomCard() {
    const visible = cards.filter((card) => !card.hidden);
    const chosen = visible[Math.floor(Math.random() * visible.length)] || cards[0];
    if (!chosen) return;
    chosen.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    chosen.classList.add("section-card-pulse");
    setTimeout(() => chosen.classList.remove("section-card-pulse"), 900);
    const box = chosen.getBoundingClientRect();
    addParticle(box.left + box.width / 2, box.top + box.height / 2, 34, 1.6);
    setReader(chosen);
  }

  function scanPage() {
    addParticle(window.innerWidth / 2, window.innerHeight * 0.32, 60, 2.1);
    body.classList.add("section-scan-flash");
    setTimeout(() => body.classList.remove("section-scan-flash"), 700);
    updateTerminal([
      "[VARREDURA] pulso de interface disparado.",
      `[SETOR] ${section.toUpperCase()} respondendo.`,
      "[RESULTADO] nenhuma ameaça direta na interface.",
      "[OR DO] consulta permitida."
    ]);
  }

  document.addEventListener("mousemove", (event) => {
    if (Math.random() > 0.68) addParticle(event.clientX, event.clientY, 1, 0.7);
  }, { passive: true });

  document.addEventListener("click", (event) => {
    addParticle(event.clientX, event.clientY, 18, 1.35);
    const card = safeClosest(event, ".section-record-card");
    if (card) setReader(card, card.classList.contains("locked"));
  });

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (lastHover === card) return;
      lastHover = card;
      const box = card.getBoundingClientRect();
      addParticle(box.left + box.width * 0.5, box.top + box.height * 0.35, 18, 1.2);
      updateTerminal([
        `[FOCO] ${card.dataset.code || "REGISTRO"}.`,
        `[LEITURA] ${card.dataset.title || "arquivo"}.`,
        `[RISCO] ${card.dataset.risk || "não informado"}.`
      ]);
    });
    card.addEventListener("mouseleave", () => { lastHover = null; });
  });

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter || "all";
      filterCards();
      addParticle(button.getBoundingClientRect().left + 20, button.getBoundingClientRect().top + 20, 12, 1.1);
    });
  });

  if (search) {
    search.addEventListener("input", filterCards);
  }

  actions.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "random") randomCard();
      else scanPage();
    });
  });

  ["selectstart", "dragstart", "copy", "cut"].forEach((eventName) => {
    document.addEventListener(eventName, (event) => event.preventDefault());
  });

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addParticle(event.clientX, event.clientY, 32, 1.7);
    updateTerminal([
      "[BLOQUEIO] menu contextual negado.",
      "[OR DO] cópia não autorizada.",
      "[REGISTRO] tentativa armazenada localmente."
    ]);
    return false;
  }, { capture: true });

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("load", () => {
    resizeCanvas();
    draw();
    setTimeout(() => scanPage(), 250);
  });

  resizeCanvas();
  draw();
})();

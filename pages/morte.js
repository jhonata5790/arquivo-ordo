
(() => {
  "use strict";

  const page = document.querySelector("[data-element-doc]");
  if (!page) return;

  const type = page.dataset.elementDoc;
  const canvas = page.querySelector("[data-edoc-canvas]");
  const ctx = canvas.getContext("2d");
  const terminal = page.querySelector("[data-edoc-terminal]");
  const reading = page.querySelector("[data-edoc-reading]");
  const file = page.querySelector("[data-edoc-file]");
  const fragments = page.querySelector("[data-edoc-fragments]");

  const configs = {
    sangue: {
      color: [255, 18, 55], alt: [120, 0, 18], max: 130,
      logs: ["batimento externo detectado.", "instinto destruído reapareceu em outra margem.", "fome colidiu com proteção.", "o arquivo não morreu. ele mudou de lugar."],
      readings: ["guerra de instintos ativa", "o documento pulsa contra a leitura", "fragmentos orgânicos reaparecendo", "sensação convertida em dado"],
      words: ["FOME", "DOR", "RAIVA", "PROTEÇÃO", "APEGO", "MEDO", "DESEJO", "SOBREVIVÊNCIA"]
    },
    conhecimento: {
      color: [255, 205, 28], alt: [255, 72, 20], max: 90,
      logs: ["nova chave detectada.", "porta aberta dentro da porta anterior.", "leitor incluído no objeto de análise.", "sobrecarga de informações."],
      readings: ["conhecimento adquirido", "conhecimento expandido", "perdendo conhecimento", "saber tudo é perder tudo"],
      popups: ["SABER TUDO É PERDER TUDO", "SOBRECARGA DE INFORMAÇÕES", "CONHECIMENTO ADQUIRIDO", "CONHECIMENTO EXPANDIDO", "PERDENDO CONHECIMENTO", "NOVA CHAVE DETECTADA", "PORTA ABERTA", "SIGNIFICADO DUPLICADO"]
    },
    energia: {
      color: [0, 240, 255], alt: [255, 0, 180], max: 220,
      logs: ["acesso permitido.", "acesso negado.", "acesso alterado.", "acesso rindo.", "padrão encontrado: todos."],
      readings: ["o arquivo mudou durante a leitura", "contradição registrada como manifestação", "ruído de padrão ativo", "o caos é inevitável"]
    },
    morte: {
      color: [88, 112, 86], alt: [0, 0, 0], max: 100,
      logs: ["ciclo iniciado antes do comando.", "restauração retornou mais antiga que o erro.", "linha 01 reapareceu.", "o documento terminou novamente."],
      readings: ["espiral negra detectada", "decomposição temporal em curso", "ciclo incompleto", "o arquivo lembra aberturas futuras"]
    },
    medo: {
      color: [230, 230, 245], alt: [15, 15, 25], max: 70,
      logs: ["nenhuma anomalia detectada.", "você ainda está lendo.", "localização: atrás.", "o conteúdo evitou observação."],
      readings: ["ausência ativa", "o texto percebeu você primeiro", "observador afetado", "não confundir silêncio com segurança"]
    }
  };

  const cfg = configs[type];
  let w = 0, h = 0, particles = [], lastMove = 0, lastPopup = 0, tick = 0;

  function safeClosest(event, selector) {
    const target = event.target;
    if (!target || !(target instanceof Element)) return null;
    return target.closest(selector);
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.floor(w * ratio); canvas.height = Math.floor(h * ratio);
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function rand(min, max) { return Math.random() * (max - min) + min; }

  function log(text) {
    if (!terminal) return;
    const p = document.createElement("p");
    p.textContent = "> " + text;
    terminal.appendChild(p);
    while (terminal.children.length > 6) terminal.removeChild(terminal.firstElementChild);
  }

  function setReading(text) { if (reading) reading.textContent = text; }

  function spawn(x, y, count = 16, power = 1) {
    for (let i = 0; i < count; i++) {
      if (particles.length > cfg.max) particles.shift();
      particles.push({
        x, y, vx: rand(-2.2, 2.2) * power, vy: rand(-2.2, 2.2) * power,
        life: rand(35, 95), max: rand(35, 95), size: rand(1, 4) * power,
        kind: type === "morte" ? "spiral" : type === "sangue" ? "instinct" : type === "energia" ? "glitch" : type === "medo" ? "void" : "symbol",
        word: cfg.words ? pick(cfg.words) : "",
        angle: rand(0, Math.PI * 2)
      });
    }
  }

  function popup() {
    if (type !== "conhecimento") return;
    const now = Date.now();
    if (now - lastPopup < 260) return;
    lastPopup = now;
    const box = document.createElement("button");
    box.type = "button";
    box.className = "knowledge-popup-alert";
    box.innerHTML = `<strong>${pick(cfg.popups)}</strong><span>clique para fechar / ou abrir outra camada</span>`;
    box.style.left = rand(4, 72) + "vw";
    box.style.top = rand(12, 74) + "vh";
    page.appendChild(box);
    box.addEventListener("click", () => { box.remove(); if (Math.random() > .35) { popup(); setTimeout(popup, 90); } });
    setTimeout(() => box.remove(), rand(3000, 7000));
  }

  function addFragment() {
    if (!fragments) return;
    const p = document.createElement("p");
    p.className = "edoc-fragment-line edoc-added-line";
    const span = document.createElement("span");
    span.textContent = "//";
    p.appendChild(span);
    p.appendChild(document.createTextNode(pick(cfg.logs)));
    fragments.appendChild(p);
    while (fragments.querySelectorAll(".edoc-added-line").length > 4) {
      fragments.querySelector(".edoc-added-line")?.remove();
    }
  }

  function action(kind) {
    log(pick(cfg.logs)); setReading(pick(cfg.readings)); addFragment();
    page.classList.add("edoc-shock"); setTimeout(() => page.classList.remove("edoc-shock"), 600);
    spawn(w / 2, h / 2, type === "energia" ? 80 : 34, type === "energia" ? 2 : 1.4);
    if (type === "conhecimento") { popup(); popup(); }
    if (type === "morte") page.classList.toggle("death-cycle-active");
    if (type === "medo") page.classList.toggle("fear-observed");
    if (type === "sangue") page.classList.add("blood-instinct-war"), setTimeout(()=>page.classList.remove("blood-instinct-war"), 1000);
    if (type === "energia") page.classList.add("energy-overload"), setTimeout(()=>page.classList.remove("energy-overload"), 900);
  }

  function draw() {
    tick += 1;
    ctx.clearRect(0, 0, w, h);
    const [r,g,b] = cfg.color, [ar,ag,ab] = cfg.alt;

    if (type === "energia") {
      for (let i=0;i<10;i++) {
        ctx.fillStyle = `rgba(${i%2?r:ar},${i%2?g:ag},${i%2?b:ab},${rand(.06,.22)})`;
        ctx.fillRect(rand(0,w), rand(0,h), rand(20,180), rand(1,5));
      }
    }

    if (type === "morte") {
      ctx.strokeStyle = `rgba(0,0,0,.38)`; ctx.lineWidth = 2;
      for (let s=0;s<4;s++) {
        ctx.beginPath();
        const cx = (w * (.2 + s*.2)) + Math.sin(tick/80+s)*30, cy = h*(.25 + (s%2)*.4);
        for (let a=0; a<Math.PI*7; a+=.18) {
          const rr = 4 + a*5;
          const x = cx + Math.cos(a + tick/120) * rr;
          const y = cy + Math.sin(a + tick/120) * rr;
          if (a === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
    }

    particles = particles.filter(p => p.life > 0);
    for (const p of particles) {
      const alpha = Math.max(0, p.life / p.max);
      p.life -= 1; p.x += p.vx; p.y += p.vy; p.vy += type === "sangue" ? .015 : 0;
      ctx.save(); ctx.globalAlpha = alpha;
      if (p.kind === "instinct") {
        ctx.fillStyle = `rgba(${r},${g},${b},${.4 + alpha*.45})`;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size*2,0,Math.PI*2); ctx.fill();
        if (p.word && alpha > .45) { ctx.font = "700 10px monospace"; ctx.fillText(p.word, p.x+8, p.y); }
      } else if (p.kind === "glitch") {
        ctx.fillStyle = `rgba(${Math.random()>.5?r:ar},${Math.random()>.5?g:ag},${Math.random()>.5?b:ab},${alpha})`;
        ctx.fillRect(p.x,p.y,p.size*10,p.size*1.5);
      } else if (p.kind === "spiral") {
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha*.45})`; ctx.beginPath();
        for (let a=0; a<Math.PI*3; a+=.3) { const rr=a*p.size; const x=p.x+Math.cos(a+p.angle)*rr; const y=p.y+Math.sin(a+p.angle)*rr; if(a===0)ctx.moveTo(x,y);else ctx.lineTo(x,y); }
        ctx.stroke();
      } else if (p.kind === "void") {
        ctx.fillStyle = `rgba(0,0,0,${alpha*.55})`; ctx.beginPath(); ctx.ellipse(p.x,p.y,p.size*5,p.size*2,p.angle,0,Math.PI*2); ctx.fill();
      } else {
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`; ctx.strokeRect(p.x,p.y,p.size*4,p.size*4);
      }
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  resize(); window.addEventListener("resize", resize);

  document.addEventListener("pointermove", (event) => {
    const now = Date.now();
    if (now - lastMove < 28) return;
    lastMove = now;
    spawn(event.clientX, event.clientY, type === "energia" ? 5 : 2, type === "medo" ? .6 : 1);
    if (type === "conhecimento" && Math.random() > .82) popup();
    if (type === "medo" && safeClosest(event, ".edoc-fragment-line")) safeClosest(event, ".edoc-fragment-line")?.classList.add("fear-hide-line");
  }, { passive: true });

  document.addEventListener("click", (event) => {
    const btn = safeClosest(event, "[data-edoc-action]");
    spawn(event.clientX, event.clientY, btn ? 38 : 18, btn ? 1.7 : 1);
    if (btn) action(btn.dataset.edocAction);
  });

  document.addEventListener("contextmenu", (event) => { event.preventDefault(); log("menu contextual bloqueado por contenção da Ordo."); spawn(event.clientX, event.clientY, 30, 1.4); return false; }, { capture: true });
  ["selectstart", "dragstart", "copy", "cut"].forEach(evt => document.addEventListener(evt, e => e.preventDefault()));

  setInterval(() => { log(pick(cfg.logs)); setReading(pick(cfg.readings)); if (type === "conhecimento") popup(); if (type === "energia") file?.classList.toggle("edoc-file-shift"); }, type === "energia" ? 2200 : type === "conhecimento" ? 3000 : 5200);
  setInterval(() => spawn(rand(0,w), rand(0,h), type === "energia" ? 12 : 5, type === "energia" ? 1.5 : 1), 900);
  setTimeout(() => { log("fragmento estabilizado com corrupção ativa."); spawn(w/2,h/2,45,1.5); }, 400);
  draw();
})();

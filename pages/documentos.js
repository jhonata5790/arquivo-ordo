(() => {
  "use strict";

  function safeClosest(event, selector) {
    if (typeof window.safeClosest === "function") {
      return window.safeClosest(event, selector);
    }

    const target = event?.target;

    if (!target || !(target instanceof Element)) {
      return null;
    }

    return target.closest(selector);
  }

  const DOCUMENTS = {
    "santa-luzia-lenda": {
      code: "OR-F-0001",
      status: "OBSERVAÇÃO // LENDA URBANA ATIVA",
      access: "NÍVEL 1 — EQUIPE F AUTORIZADA",
      title: "Lenda Urbana — Santa Luzia",
      type: "case",
      category: "Caso atual",
      summary: "Primeiro e único arquivo vinculado ao caso atual antes da primeira sessão. A Ordo não confirmou manifestação paranormal; apenas identificou um padrão estranho em relatos locais.",
      quick: "Relatos sobre animais agressivos em Santa Luzia. Equipe F enviada como moradores temporários.",
      lines: [
        "Moradores de Santa Luzia passaram a relatar mudanças incomuns no comportamento de animais domésticos e de rua.",
        "Os relatos descrevem agressividade repentina, medo direcionado a espaços vazios, fugas em grupo e reações violentas sem estímulo aparente.",
        "Até o momento, o quadro se encaixa publicamente como lenda urbana local, sem evidência suficiente para ação ostensiva da Ordo.",
        "A hipótese preliminar considera que algo pode estar forçando ou intensificando respostas instintivas nos animais da cidade.",
        "A Equipe F foi preparada para entrar em Santa Luzia de forma discreta, usando a cobertura de moradores temporários.",
        "Objetivo inicial: observar padrões, mapear relatos, evitar pânico civil e confirmar se existe influência paranormal real."
      ],
      note: "Este arquivo não deve revelar a origem do fenômeno. A função dele é justificar a chegada da equipe e estabelecer suspeita inicial."
    },
    "protocolo-infiltracao": {
      code: "OR-PRT-014",
      status: "LIBERADO // USO OPERACIONAL",
      access: "NÍVEL 1 — AGENTES EM CAMPO",
      title: "Protocolo — Moradores Temporários",
      type: "protocol",
      category: "Protocolo",
      summary: "Procedimento da Ordo para infiltração em cidades pequenas, bairros isolados ou comunidades onde uma operação aberta chamaria atenção demais.",
      quick: "Manual de infiltração social. Útil para explicar por que agentes chegam sem uniforme e sem exposição pública.",
      lines: [
        "Agentes devem assumir papéis civis simples, críveis e sustentáveis por tempo indeterminado.",
        "Coberturas recomendadas: estudantes, pesquisadores, técnicos, parentes de moradores, funcionários temporários ou visitantes em processo de mudança.",
        "Não revelar vínculo com a Ordo Realitas a civis, autoridades locais ou possíveis testemunhas sem necessidade operacional.",
        "Priorizar coleta de rotina: horários, hábitos, boatos, locais evitados, padrões de medo e mudanças no comportamento da população.",
        "Evitar linguagem técnica. A cidade deve acreditar que os agentes estão apenas tentando se adaptar ao lugar.",
        "Caso a ameaça seja confirmada, a infiltração deve ser preservada até ordem contrária do comando."
      ],
      note: "Arquivo genérico da Ordo. Ele parece importante porque explica método, mas não entrega respostas do caso."
    },
    "hierarquia-camadas": {
      code: "OR-ADM-022",
      status: "LIBERADO // REFERÊNCIA INTERNA",
      access: "NÍVEL 1 — CONSULTA GERAL",
      title: "Camadas de Acesso Documental",
      type: "ordo",
      category: "Ordo",
      summary: "Guia administrativo para classificar documentos em público, parcial, restrito, sigiloso e camada do mestre.",
      quick: "Explica por que o arquivo tem documentos bloqueados mesmo quando aparecem na interface.",
      lines: [
        "Camada Pública: documentos que podem ser exibidos a agentes sem comprometer investigações em andamento.",
        "Camada Parcial: arquivos incompletos, úteis para contexto, mas sem detalhes conclusivos.",
        "Camada Restrita: registros que exigem autorização de comando ou avanço narrativo específico.",
        "Camada Sigilosa: documentos cuja existência pode ser exibida, mas cujo conteúdo deve permanecer oculto.",
        "Camada do Mestre: arquivos não acessíveis por agentes. Usados para controle narrativo, segredos e revelações futuras.",
        "A interface pode simular bloqueio mesmo quando o arquivo ainda não foi escrito por completo."
      ],
      note: "Este documento ajuda o site a parecer um sistema real da Ordo, sem entregar conteúdo sensível antes da hora."
    },
    "cidade-aracati": {
      code: "OR-CAM-117",
      status: "ENCERRADO // SEM VÍNCULO ATUAL",
      access: "NÍVEL 1 — ARQUIVO DE CAMPO",
      title: "Ocorrência em Aracati",
      type: "field",
      category: "Campo",
      summary: "Caso antigo no litoral do Ceará envolvendo desaparecimentos curtos, marés fora de horário e testemunhas com versões incompatíveis.",
      quick: "Um caso aleatório no Brasil. Parece relevante, mas não aponta para Santa Luzia.",
      lines: [
        "A Ordo registrou três desaparecimentos breves em uma faixa litorânea de baixa circulação noturna.",
        "As vítimas retornaram em menos de vinte e quatro horas, molhadas, desorientadas e incapazes de explicar onde estiveram.",
        "Testemunhas relataram maré avançando em horário incompatível com registros meteorológicos locais.",
        "A manifestação não se repetiu após isolamento da área e remoção de um objeto ritualístico menor.",
        "Não foram encontradas conexões com casos internos posteriores.",
        "O arquivo permanece disponível para comparação de padrões costeiros e anomalias ambientais."
      ],
      note: "Documento de mundo. Ele amplia a sensação de que a Ordo atua no Brasil inteiro."
    },
    "cine-imperial": {
      code: "OR-LOC-044",
      status: "MONITORADO // LOCAL ANÔMALO",
      access: "NÍVEL 2 — CONSULTA CONTROLADA",
      title: "Cine Imperial",
      type: "field",
      category: "Local",
      summary: "Registro de um antigo cinema abandonado no Paraná, marcado por projeções que ocorriam sem energia elétrica detectável.",
      quick: "Lugar com registros paranormais. Serve para deixar a aba Documentos viva e maior que a campanha.",
      lines: [
        "O prédio permaneceu abandonado por anos, mas moradores relatavam luz de projetor atravessando janelas quebradas à noite.",
        "Equipes locais confirmaram ruído de filme rodando em salas sem equipamento funcional.",
        "Uma das paredes internas apresentava marcas de cadeiras vazias desenhadas em poeira, sempre em posições diferentes.",
        "Nenhum corpo, vítima ou culto ativo foi encontrado durante a vistoria inicial.",
        "A Ordo lacrou o local e manteve monitoramento passivo por seis meses.",
        "O caso foi arquivado como lugar de ressonância paranormal baixa."
      ],
      note: "Importante visualmente, mas sem utilidade direta para a missão de Santa Luzia."
    },
    "agente-rastreado": {
      code: "OR-REC-031",
      status: "ARQUIVADO // RECRUTAMENTO",
      access: "NÍVEL 1 — HISTÓRICO INTERNO",
      title: "Agente Rastreado",
      type: "ordo",
      category: "Ordo",
      summary: "Modelo de documento usado quando a Ordo identifica um sobrevivente com potencial de recrutamento após contato com o paranormal.",
      quick: "Documento genérico sobre como a Ordo encontra novos agentes.",
      lines: [
        "Sobreviventes de eventos paranormais são monitorados antes de qualquer abordagem direta.",
        "A primeira análise considera estabilidade emocional, capacidade de sigilo, reação sob pressão e vínculo com testemunhas civis.",
        "A Ordo evita recrutar pessoas em estado de choque imediato, salvo quando a ameaça ainda está ativa.",
        "A abordagem deve ser feita por agente experiente, em ambiente controlado e com explicação parcial da realidade paranormal.",
        "Nem todo sobrevivente deve se tornar agente. Alguns precisam apenas ser protegidos, realocados ou ter memórias preservadas com cuidado.",
        "Falhas de recrutamento podem gerar alvos vulneráveis para cultos e manifestações futuras."
      ],
      note: "Arquivo de ambientação. Ele dá peso institucional para a Ordo e seus métodos."
    },
    "boatos-contencao": {
      code: "OR-PRT-027",
      status: "LIBERADO // CONTENÇÃO SOCIAL",
      access: "NÍVEL 1 — CONSULTA OPERACIONAL",
      title: "Protocolo — Contenção de Boatos",
      type: "protocol",
      category: "Protocolo",
      summary: "Manual para lidar com lendas urbanas, pânico local e relatos civis antes que a situação exponha o paranormal.",
      quick: "Combina com Santa Luzia, mas não fala diretamente dela. É um protocolo geral.",
      lines: [
        "Boatos podem proteger uma comunidade ao afastar curiosos, mas também podem alimentar medo, culto e histeria coletiva.",
        "A Ordo deve identificar quais relatos são repetição cultural e quais surgiram após evento anômalo real.",
        "Agentes infiltrados devem ouvir mais do que corrigir. Negar tudo cedo demais pode aumentar a circulação da história.",
        "É permitido reforçar explicações comuns quando elas reduzem risco civil sem prejudicar a investigação.",
        "Nunca ridicularizar testemunhas. Pessoas assustadas costumam guardar detalhes importantes.",
        "Quando uma lenda urbana começa a se organizar sozinha, considerar possibilidade de influência paranormal indireta."
      ],
      note: "Documento ideal para dar contexto à investigação sem transformar suspeita em confirmação."
    },
    "torre-radio": {
      code: "OR-SIG-088",
      status: "ARQUIVADO // SINAL INCONCLUSIVO",
      access: "NÍVEL 2 — ANÁLISE TÉCNICA",
      title: "Torre de Rádio",
      type: "field",
      category: "Campo",
      summary: "Registro de transmissão regional que repetia nomes inexistentes em um município do interior de Minas Gerais.",
      quick: "Arquivo técnico estranho, bom para mundo, mas sem ligação confirmada com o caso atual.",
      lines: [
        "A interferência ocorria entre 03:11 e 03:17, sempre em rádios antigos e equipamentos com antena analógica.",
        "O sinal repetia nomes completos que não constavam em registros municipais, obituários ou bancos civis próximos.",
        "Técnicos da Ordo localizaram a origem aproximada em uma torre desativada havia nove anos.",
        "Nenhuma entidade foi encontrada. Nenhum ritual ativo foi confirmado.",
        "A gravação original foi armazenada em mídia isolada e não deve ser reproduzida em ambiente aberto.",
        "O caso permanece inconclusivo por ausência de manifestação física."
      ],
      note: "Documento com aparência séria e misteriosa, mas propositalmente não útil para resolver Santa Luzia."
    },
    "equipe-f": {
      code: "OR-EQP-F",
      status: "ATIVA // DESLOCAMENTO DISCRETO",
      access: "NÍVEL 1 — OPERAÇÃO INICIAL",
      title: "Designação — Equipe F",
      type: "ordo",
      category: "Equipe",
      summary: "Registro operacional da equipe enviada quando uma ocorrência ainda não justifica exposição total da Ordo.",
      quick: "A equipe dos jogadores entra como observação inicial, não como operação de guerra.",
      lines: [
        "A designação F é usada para grupos enviados a ambientes de baixa confirmação paranormal e alto risco de exposição civil.",
        "O foco inicial é observação, adaptação social, coleta de indícios e preservação da cobertura.",
        "A equipe deve evitar confronto direto até confirmar natureza, escala e vetor da ameaça.",
        "Relatórios diários devem separar fato observado, relato de morador, hipótese de agente e interpretação paranormal.",
        "A autorização para escalada depende de evidência concreta ou risco imediato à população.",
        "Enquanto a investigação permanecer em estágio de lenda urbana, a equipe deve parecer comum."
      ],
      note: "Documento útil para preparar o tom da primeira sessão: infiltração, suspeita e investigação lenta."
    },
    "fazenda-vazia": {
      code: "OR-CAM-203",
      status: "FRAGMENTADO // ROTINA RESIDUAL",
      access: "NÍVEL 2 — ARQUIVO PARCIAL",
      title: "Fazenda Vazia",
      type: "fragmented",
      category: "Campo",
      summary: "Arquivo incompleto sobre uma propriedade rural onde objetos continuavam mudando de lugar após o desaparecimento dos moradores.",
      quick: "Um fragmento rural estranho. Parece pista, mas é outro caso.",
      lines: [
        "A propriedade foi encontrada sem moradores, animais ou sinais claros de fuga.",
        "Louças apareciam lavadas pela manhã apesar do abastecimento de água estar cortado.",
        "Pegadas eram encontradas do lado de dentro da casa, sempre apontando para os cômodos, nunca para fora.",
        "O relógio da cozinha repetia o mesmo minuto quando observado diretamente.",
        "Fragmentos do relatório original foram perdidos após falha de armazenamento físico.",
        "A investigação foi suspensa por falta de equipe especializada disponível."
      ],
      note: "Documento para dar profundidade ao mundo rural/paranormal, sem conectar ao segredo central da campanha."
    },
    "comando-restrito": {
      code: "OR-CMD-000",
      status: "BLOQUEADO // CREDENCIAL INSUFICIENTE",
      access: "NÍVEL 5 — COMANDO DA ORDO",
      title: "Comando da Ordo",
      type: "locked",
      category: "Restrito",
      summary: "Registro reservado sobre envio de equipes, decisões administrativas e custo operacional de missões incompletas.",
      quick: "Bloqueado. Existe para mostrar hierarquia e peso institucional.",
      lines: [
        "Acesso negado.",
        "Credencial operacional insuficiente.",
        "Registros de comando não pertencem à camada pública do arquivo.",
        "Solicitações de abertura devem ser autorizadas por liderança superior ou evento narrativo equivalente.",
        "Tentativas de leitura foram registradas.",
        "Nenhum conteúdo adicional será exibido."
      ],
      note: "Bloqueio intencional. Não revelar informações do comando antes do contexto certo."
    },
    "mestre-camada": {
      code: "OR-MST-???",
      status: "BLOQUEADO // CAMADA PRIVADA",
      access: "MESTRE — SIGILO ABSOLUTO",
      title: "Camada do Mestre",
      type: "locked master",
      category: "Restrito",
      summary: "Área reservada para documentos futuros, revelações finais, fichas privadas e arquivos que só devem existir para o mestre.",
      quick: "Promessa visual de segredo. Não abre conteúdo real para jogadores.",
      lines: [
        "Conteúdo removido da camada de leitura.",
        "Documento ainda não existe para os agentes.",
        "Arquivo preservado para revelações futuras.",
        "Acesso negado. Acesso negado. Acesso negado.",
        "Não confundir presença visual com disponibilidade narrativa.",
        "Fechamento automático recomendado."
      ],
      note: "Use como área estética para segredos, sem antecipar a campanha."
    }
  };

  const terminalState = {
    lastMessage: "",
    lastAt: 0
  };

  const ambientMessages = [
    ["INDEX", "Arquivo vivo. 12 entradas disponíveis."],
    ["ORDEM", "Camada Santa Luzia limitada a observação preliminar."],
    ["CACHE", "Documentos genéricos preservam contexto institucional."],
    ["SIGILO", "Revelações futuras permanecem fora da camada atual."],
    ["CAMPO", "Equipe F aguardando infiltração civil."]
  ];

  const reconstructionLines = [
    "Trecho recuperado sem vínculo direto com o caso atual.",
    "Reconstrução parcial: arquivo parece importante, mas não aponta para Santa Luzia.",
    "Metadado restaurado: ocorrência arquivada em setor não prioritário.",
    "Leitura concluída. Nenhuma confirmação paranormal adicional liberada.",
    "Fragmento estabilizado. A Ordo recomenda não confundir contexto com pista."
  ];

  function addTerminalLine(message, kind = "SISTEMA", force = false) {
    const feed = document.getElementById("documentTerminalFeed");
    if (!feed) return;

    const now = Date.now();
    const signature = `${kind}:${message}`;

    if (!force && terminalState.lastMessage === signature && now - terminalState.lastAt < 900) {
      return;
    }

    terminalState.lastMessage = signature;
    terminalState.lastAt = now;

    const line = document.createElement("p");
    line.innerHTML = `<span>[${kind}]</span> ${message}`;
    feed.appendChild(line);

    while (feed.children.length > 6) {
      feed.removeChild(feed.firstElementChild);
    }

    feed.scrollTop = feed.scrollHeight;
  }

  function setDynamicRead(data) {
    const title = document.getElementById("dynamicDocTitle");
    const text = document.getElementById("dynamicDocText");

    if (!title || !text || !data) return;

    title.textContent = data.title;
    text.textContent = data.quick;
  }

  function createLineMarkup(lines, type) {
    return lines.map((line, index) => `
      <p class="document-line document-line-v3 ${type}" style="--line-index:${index}">
        <span>${String(index + 1).padStart(2, "0")}</span>${line}
      </p>
    `).join("");
  }

  function renderDocument(id) {
    const data = DOCUMENTS[id];
    const reader = document.getElementById("documentReader");
    if (!data || !reader) return;

    reader.dataset.activeDocument = id;
    reader.className = `document-reader document-reader-v3 active reader-${data.type.replaceAll(" ", "-")}`;
    reader.innerHTML = `
      <div class="document-reader-top document-reader-top-v3">
        <div>
          <p>${data.code} // ${data.category}</p>
          <strong>${data.status}</strong>
        </div>
        <button type="button" data-close-reader>Fechar Leitor</button>
      </div>

      <article class="document-paper document-paper-v3 paper-${data.type.replaceAll(" ", "-")}">
        <div class="document-classification">
          <span>${data.code}</span>
          <strong>${data.access}</strong>
        </div>

        <h2>${data.title}</h2>
        <p class="document-summary">${data.summary}</p>

        <div class="document-body" data-document-lines>
          ${createLineMarkup(data.lines, data.type)}
        </div>

        <div class="document-ordo-note">
          <span>NOTA DA ORDO</span>
          <p>${data.note}</p>
        </div>

        <button class="document-restore-button" type="button" data-reconstruct>
          Tentar Reconstruir Metadado
        </button>
      </article>
    `;

    setDynamicRead(data);
    addTerminalLine(`${data.code} aberto. Camada: ${data.category}.`, "LEITOR", true);

    if (id === "santa-luzia-lenda") {
      addTerminalLine("Aviso: único documento vinculado ao caso atual.", "CASO", true);
    }

    reader.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reconstructFragment() {
    const reader = document.getElementById("documentReader");
    const body = reader?.querySelector("[data-document-lines]");
    if (!reader || !body) return;

    const text = reconstructionLines[Math.floor(Math.random() * reconstructionLines.length)];
    const line = document.createElement("p");
    line.className = "document-line document-line-v3 reconstructed injected";
    line.innerHTML = `<span>++</span>${text}`;
    body.appendChild(line);

    while (body.children.length > 8) {
      body.removeChild(body.firstElementChild);
    }

    reader.classList.add("document-reconstruct-failed");
    window.setTimeout(() => reader.classList.remove("document-reconstruct-failed"), 650);
    addTerminalLine(text, "RECON", true);
  }

  function closeReader() {
    const reader = document.getElementById("documentReader");
    if (!reader) return;

    reader.className = "document-reader document-reader-v3";
    reader.removeAttribute("data-active-document");
    reader.innerHTML = `
      <div class="reader-empty-state">
        <span>LEITOR EM ESPERA</span>
        <h2>Selecione um documento</h2>
        <p>Os arquivos desta central são pistas de mundo, protocolos e registros da Ordo. Só um deles fala diretamente sobre Santa Luzia.</p>
      </div>
    `;
    addTerminalLine("Leitor inferior fechado. Nenhum arquivo ativo.", "LEITOR", true);
  }

  function applyFilters() {
    const activeFilter = document.querySelector(".doc-filter.active")?.dataset.filter || "all";
    const query = (document.getElementById("documentsSearch")?.value || "").trim().toLowerCase();
    const cards = [...document.querySelectorAll(".document-card[data-document]")];
    let visible = 0;

    cards.forEach(card => {
      const id = card.dataset.document;
      const data = DOCUMENTS[id];
      const categories = card.dataset.category || "";
      const haystack = `${card.textContent} ${data?.summary || ""} ${data?.lines?.join(" ") || ""}`.toLowerCase();
      const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
      const matchesQuery = !query || haystack.includes(query);
      const shouldShow = matchesFilter && matchesQuery;

      card.hidden = !shouldShow;
      card.classList.toggle("document-card-hidden", !shouldShow);
      if (shouldShow) visible += 1;
    });

    addTerminalLine(`${visible} entrada(s) visíveis após filtro.`, "FILTRO");
  }

  function blockInteractions() {
    document.addEventListener("selectstart", event => event.preventDefault());
    document.addEventListener("dragstart", event => event.preventDefault());
    document.addEventListener("copy", event => event.preventDefault());
    document.addEventListener("cut", event => event.preventDefault());
    document.addEventListener("contextmenu", event => {
      event.preventDefault();
      event.stopPropagation();
      addTerminalLine("Ação bloqueada pela política documental da Ordo.", "BLOQUEIO", true);
      spawnCanvasBurst(event.clientX, event.clientY, "block");
      return false;
    }, { capture: true });
  }

  let canvas;
  let ctx;
  let particles = [];
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let lastHoveredDocument = null;


  function stabilizeViewport() {
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    window.addEventListener("scroll", () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
    }, { passive: true });
  }

  function spawnDocumentRune(x, y) {
    if (window.OrdoPerf?.canSpawnVfx && !window.OrdoPerf.canSpawnVfx("docs-rune", 1.1)) return;
    const glyphs = ["OR", "F", "//", "Δ", "◇", "01", "SIG", "DOC", "██"];
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.8,
      vy: -0.8 - Math.random() * 1.4,
      life: 44 + Math.random() * 30,
      maxLife: 74,
      size: 11 + Math.random() * 12,
      color: Math.random() > 0.5 ? "rgba(214,179,90,0.95)" : "rgba(126,36,255,0.82)",
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      rotate: (Math.random() - 0.5) * 0.6
    });
  }

  function setupCanvas() {
    canvas = document.getElementById("documentsVfxCanvas");
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    (window.OrdoPerf?.raf || window.requestAnimationFrame)(drawCanvas);
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = (window.OrdoPerf?.dpr?.(1.5) || Math.min(window.devicePixelRatio || 1, 1.5));
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnCanvasBurst(x, y, mode = "normal") {
    if (window.OrdoPerf?.canSpawnVfx && !window.OrdoPerf.canSpawnVfx("docs-burst", 10)) return;
    const colors = mode === "block"
      ? ["rgba(255,84,84,0.95)", "rgba(214,179,90,0.85)"]
      : ["rgba(214,179,90,0.88)", "rgba(126,36,255,0.75)", "rgba(255,255,255,0.72)"];

    const burstAmount = window.OrdoPerf?.adaptiveCount ? window.OrdoPerf.adaptiveCount(34, 22, 14) : 34;
    for (let i = 0; i < burstAmount; i += 1) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 7.2,
        vy: (Math.random() - 0.5) * 7.2,
        life: 42 + Math.random() * 34,
        maxLife: 76,
        size: 2.0 + Math.random() * 4.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      life: 28,
      maxLife: 28,
      size: 8,
      ring: true,
      color: colors[0]
    });

    spawnDocumentRune(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30);
  }

  function drawCanvas() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const ambientChance = window.OrdoPerf?.vfxPressure?.() === "high" ? 0.18 : window.OrdoPerf?.vfxPressure?.() === "medium" ? 0.42 : 0.82;
    if (Math.random() < ambientChance && (!window.OrdoPerf?.canSpawnVfx || window.OrdoPerf.canSpawnVfx("docs-ambient", 0.25))) {
      particles.push({
        x: mouseX + (Math.random() - 0.5) * 38,
        y: mouseY + (Math.random() - 0.5) * 38,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: 24 + Math.random() * 24,
        maxLife: 48,
        size: 1.2 + Math.random() * 2.4,
        color: Math.random() > 0.5 ? "rgba(214,179,90,0.62)" : "rgba(126,36,255,0.46)"
      });
    }

    particles = particles.filter(particle => particle.life > 0).slice(-120);

    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1;
      const alpha = Math.max(particle.life / particle.maxLife, 0);

      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.strokeStyle = particle.color;

      if (particle.ring) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size + (particle.maxLife - particle.life) * 3.2, 0, Math.PI * 2);
        ctx.stroke();
        return;
      }

      if (particle.glyph) {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotate || 0);
        ctx.font = `900 ${particle.size}px monospace`;
        ctx.fillText(particle.glyph, 0, 0);
        ctx.restore();
        return;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    (window.OrdoPerf?.raf || window.requestAnimationFrame)(drawCanvas);
  }

  document.addEventListener("DOMContentLoaded", () => {
    stabilizeViewport();
    setupCanvas();
    blockInteractions();

    const count = document.getElementById("documentsCount");
    if (count) count.textContent = String(Object.keys(DOCUMENTS).length);

    document.addEventListener("mousemove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const card = safeClosest(event, ".document-card[data-document]");
      if (!card) return;

      const data = DOCUMENTS[card.dataset.document];
      if (!data) return;

      setDynamicRead(data);

      if (lastHoveredDocument !== card.dataset.document) {
        lastHoveredDocument = card.dataset.document;
        spawnCanvasBurst(event.clientX, event.clientY);
      }
    });

    document.addEventListener("click", event => {
      const filter = safeClosest(event, ".doc-filter");
      const card = safeClosest(event, "[data-document]");
      const close = safeClosest(event, "[data-close-reader]");
      const reconstruct = safeClosest(event, "[data-reconstruct]");

      if (filter) {
        document.querySelectorAll(".doc-filter").forEach(button => button.classList.remove("active"));
        filter.classList.add("active");
        applyFilters();
        spawnCanvasBurst(event.clientX, event.clientY);
        return;
      }

      if (card) {
        renderDocument(card.dataset.document);
        spawnCanvasBurst(event.clientX, event.clientY);
        return;
      }

      if (close) {
        closeReader();
        return;
      }

      if (reconstruct) {
        reconstructFragment();
        spawnCanvasBurst(event.clientX, event.clientY);
      }
    });

    const search = document.getElementById("documentsSearch");
    if (search) {
      search.addEventListener("input", applyFilters);
    }

    (window.OrdoPerf?.interval || window.setInterval)(() => {
      const [kind, message] = ambientMessages[Math.floor(Math.random() * ambientMessages.length)];
      addTerminalLine(message, kind);
    }, 6000);

    window.setTimeout(() => {
      spawnCanvasBurst(window.innerWidth * 0.5, window.innerHeight * 0.35);
      spawnCanvasBurst(window.innerWidth * 0.22, window.innerHeight * 0.72);
      spawnCanvasBurst(window.innerWidth * 0.78, window.innerHeight * 0.62);
    }, 450);
  });
})();

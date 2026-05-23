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
    "santa-luzia": {
      code: "DOC-ORDO-001",
      status: "LIBERADO // INTEGRIDADE ESTÁVEL",
      access: "NÍVEL 1 — CONSULTA AUTORIZADA",
      title: "Arquivo Preliminar — Santa Luzia",
      type: "released",
      summary: "Relatório de reconhecimento sobre Santa Luzia antes da primeira equipe da Ordo chegar oficialmente à cidade.",
      lines: [
        "Santa Luzia é uma cidade pequena, isolada e cercada por áreas naturais, fazendas, planícies e mata fechada.",
        "A entrada principal ocorre pela Rodovia Ferreira, rota longa com baixa circulação externa e sensação de afastamento urbano.",
        "O Rio Lepras divide a cidade em três regiões principais, criando deslocamentos concentrados por pontes e vias específicas.",
        "A Árvore Mãe é o marco central da cidade, tratada como símbolo cultural e ponto de referência pela população.",
        "Até o momento inicial da missão, a Ordo não possui confirmação direta sobre a origem paranormal do caso."
      ],
      note: "Este documento representa apenas o que poderia ser levantado pela Ordo antes da investigação presencial."
    },
    "caso-miyara": {
      code: "DOC-ORDO-002",
      status: "FRAGMENTADO // RECONSTRUÇÃO PARCIAL",
      access: "NÍVEL 2 — LEITURA CONTROLADA",
      title: "Caso Miyara",
      type: "fragmented",
      summary: "Entrada incompleta referente à primeira vítima do caso e ao primeiro ponto de ruptura da investigação.",
      lines: [
        "Nome registrado: Miyara. Relação com o foco da campanha ainda não determinada na camada pública do arquivo.",
        "Sintomas, causa, contaminação e vínculo ritualístico permanecem sob análise dos agentes em campo.",
        "A Ordo não sabe tudo no início. O arquivo deve crescer conforme pistas forem coletadas durante a campanha.",
        "Fragmentos do caso parecem voltar com falhas sempre que uma conclusão é forçada cedo demais.",
        "Hipóteses prematuras foram marcadas como perigosas e removidas da camada de acesso dos jogadores."
      ],
      note: "Não usar este arquivo para entregar respostas. Ele deve funcionar como pista, não como revelação."
    },
    "elemento-sangue": {
      code: "DOC-ELM-SAN",
      status: "CORROMPIDO // PULSO DETECTADO",
      access: "NÍVEL 3 — CONTENÇÃO ELEMENTAL",
      title: "Elemento Sangue",
      type: "blood",
      summary: "Arquivo elemental recuperado em estado vivo. A interface registra batimentos e respostas orgânicas ao toque.",
      lines: [
        "Tudo começa pelo Sangue. O Sangue é o fluxo que banha a eternidade do Outro Lado.",
        "O Sangue não é apenas violência. É corpo, instinto, fome, ligação, ferida, impulso e permanência.",
        "Fragmentos do elemento reagiram com mais intensidade quando associados ao Coração Amaldiçoado.",
        "A Ordo suspeita que o caso de Santa Luzia não envolve só influência de Sangue, mas uma tentativa de concentração pura do elemento.",
        "A versão final deste documento deve permanecer bloqueada até a revelação central da campanha."
      ],
      note: "Este é um resgate parcial. O arquivo completo do Sangue pertence ao final da investigação."
    },
    "coracao-amaldicoado": {
      code: "DOC-RIT-001",
      status: "INSTÁVEL // NÚCLEO ORGÂNICO",
      access: "NÍVEL 3 — SIGILO RITUALÍSTICO",
      title: "Coração Amaldiçoado",
      type: "blood",
      summary: "Componente ritualístico conectado ao Amastaff e à corrupção central de Santa Luzia.",
      lines: [
        "O objeto não deve ser classificado como item passivo. Leituras indicam comportamento simbólico, orgânico e possivelmente intencional.",
        "Sua existência aponta para uma ligação entre cidade, subterrâneo, Árvore Mãe e uma estrutura ritualística ainda não exposta aos jogadores.",
        "O Coração Amaldiçoado parece representar o Sangue em forma condensada, não apenas servir como ferramenta de culto.",
        "A localização real do núcleo não deve ser revelada fora de descoberta em sessão.",
        "Toda reconstrução deste documento adiciona contaminação ao terminal local."
      ],
      note: "Manter parcialmente censurado até que a equipe encontre evidências físicas suficientes."
    },
    "klint-comando": {
      code: "DOC-CMD-000",
      status: "BLOQUEADO // CREDENCIAL INSUFICIENTE",
      access: "NÍVEL 5 — COMANDO DA ORDO",
      title: "Klint — Comando",
      type: "locked",
      summary: "Dossiê de comando preservado em camada administrativa. A leitura pública foi bloqueada.",
      lines: [
        "Acesso negado.",
        "Informações sobre comando, decisões estratégicas e custo humano das operações permanecem ocultas.",
        "Este documento existe no arquivo, mas não pertence à camada de leitura dos jogadores neste momento.",
        "Tentativas de abertura serão registradas no terminal.",
        "Solicite permissão do mestre para liberar fragmentos narrativos específicos."
      ],
      note: "Não revelar detalhes íntimos de comando sem contexto narrativo apropriado."
    },
    "arquivos-mestre": {
      code: "DOC-MST-???",
      status: "BLOQUEADO // SIGILO ABSOLUTO",
      access: "MESTRE — CAMADA PRIVADA",
      title: "Arquivos do Mestre",
      type: "locked master",
      summary: "Área de controle contendo spoilers, revelações, conexões ocultas, fichas privadas e documentos futuros.",
      lines: [
        "Conteúdo removido da camada pública.",
        "Entradas relacionadas ao Amastaff, casulo, laboratório, igreja abandonada e verdade sobre o Coração Amaldiçoado foram ocultadas.",
        "Os dados existem, mas não devem ser interpretados pela interface dos jogadores.",
        "Este arquivo funciona como porta visual para segredos, não como exposição de segredos.",
        "Acesso negado. Acesso negado. Acesso negado."
      ],
      note: "Use este espaço como promessa estética de mistério, não como entrega antecipada da campanha."
    }
  };

  const corruptedReturns = [
    "Reconstrução falhou. Fragmento retornou mais corrompido que antes.",
    "A Ordo tentou recuperar a linha, mas a informação mudou durante a leitura.",
    "Trecho recomposto com ruído. Integridade reduzida em 3%.",
    "Erro: o fragmento respondeu com uma versão que ainda não deveria existir.",
    "Linha recuperada rejeitada pelo sistema. Possível interferência paranormal."
  ];

  function addTerminalLine(message, kind = "SISTEMA") {
    const feed = document.getElementById("documentTerminalFeed");
    if (!feed) return;

    const line = document.createElement("p");
    line.innerHTML = `<span>[${kind}]</span> ${message}`;
    feed.appendChild(line);
    while (feed.children.length > 9) feed.removeChild(feed.firstElementChild);
    feed.scrollTop = feed.scrollHeight;
  }

  function renderDocument(id) {
    const data = DOCUMENTS[id];
    const reader = document.getElementById("documentReader");
    if (!data || !reader) return;

    reader.dataset.activeDocument = id;
    reader.className = `document-reader reader-${data.type.replaceAll(" ", "-")}`;
    reader.innerHTML = `
      <div class="document-reader-top">
        <div>
          <span>${data.code}</span>
          <strong>${data.status}</strong>
        </div>
        <button type="button" data-close-reader>Fechar Leitor</button>
      </div>

      <article class="document-paper document-paper-${data.type.replaceAll(" ", "-")}">
        <div class="document-classification">
          <span>${data.code}</span>
          <span>${data.access}</span>
        </div>

        <h2>${data.title}</h2>
        <p class="document-summary">${data.summary}</p>

        <div class="document-body" data-document-lines>
          ${data.lines.map((line, index) => `
            <p class="document-line ${data.type}" style="--line-index:${index}">
              <span>${String(index + 1).padStart(2, "0")}</span>${line}
            </p>
          `).join("")}
        </div>

        <div class="document-ordo-note">
          <span>NOTA DA ORDO</span>
          <p>${data.note}</p>
        </div>

        <button class="document-restore-button" type="button" data-reconstruct>
          Tentar Reconstruir Fragmento
        </button>
      </article>
    `;

    addTerminalLine(`Documento ${data.code} aberto no leitor inferior.`, "LEITOR");
    reader.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reconstructFragment() {
    const reader = document.getElementById("documentReader");
    const body = reader?.querySelector("[data-document-lines]");
    if (!reader || !body) return;

    const text = corruptedReturns[Math.floor(Math.random() * corruptedReturns.length)];
    const line = document.createElement("p");
    line.className = "document-line reconstructed corrupted-return";
    line.innerHTML = `<span>??</span>${text}`;
    body.appendChild(line);

    reader.classList.add("document-reconstruct-failed");
    window.setTimeout(() => reader.classList.remove("document-reconstruct-failed"), 650);
    addTerminalLine(text, "FALHA");
  }

  function closeReader() {
    const reader = document.getElementById("documentReader");
    if (!reader) return;

    reader.className = "document-reader";
    reader.removeAttribute("data-active-document");
    reader.innerHTML = `
      <div class="reader-empty-state">
        <span>LEITOR EM ESPERA</span>
        <h2>Selecione um documento</h2>
        <p>Clique em um card acima para abrir uma versão reconstruída no painel inferior.</p>
      </div>
    `;
    addTerminalLine("Leitor inferior fechado. Nenhum arquivo ativo.", "LEITOR");
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", event => {
      const card = safeClosest(event, "[data-document]");
      const close = safeClosest(event, "[data-close-reader]");
      const reconstruct = safeClosest(event, "[data-reconstruct]");

      if (card) {
        renderDocument(card.dataset.document);
        return;
      }

      if (close) {
        closeReader();
        return;
      }

      if (reconstruct) {
        reconstructFragment();
      }
    });
  });
})();

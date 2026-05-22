const PUBLIC_AGENTS = ["maisie", "roselyn", "lilian"];
const FORBIDDEN_AGENTS = ["yuna", "lisa", "blender", "klint", "anny"];

const agents = {
  maisie: {
    id: "maisie",
    name: "Maisie Hundown",
    player: "Caio",
    mode: "maisie-mode",
    image: "../assets/imagens/personagens/maisie.png",
    wheel: "maisie",
    status: "Arquivo liberado — Recruta / Personagem Jogador",
    desc: "Ocultista de campo com forte integração tecnológica, foco em Energia e monitoramento discreto recomendado.",
    className: "Ocultista",
    origin: "Agente de Saúde",
    nex: "40%",
    rank: "Recruta",
    attrs: { FOR: 1, AGI: 1, INT: 3, PRE: 3, VIG: 2 },

    banner: {
      label: "Registro público — Ordo Realitas",
      title: "ENERGIA / TECNOLOGIA PARANORMAL",
      text: "Recorte autorizado de dossiê institucional. Dados mecânicos completos, custos e regras foram ocultados."
    },

    insights: {
      FOR: "Força física não é o eixo principal da agente. A ameaça real está na adaptação técnica, no canhão e na integração corpo-máquina.",
      AGI: "Mobilidade funcional, mas limitada. Maisie compensa deslocamento com leitura rápida, improviso e recursos tecnológicos.",
      INT: "Principal eixo operacional. Medicina, robótica, tecnologia, ocultismo e análise de sistemas convergem no mesmo perfil.",
      PRE: "Maisie possui carisma e intensidade social. Consegue interagir, convencer e ocupar espaço quando necessário.",
      VIG: "Resistência marcada por trauma corporal, reconstrução física e contato prolongado com Energia."
    },

    folders: {
      descricao: `
        <p>Maisie Hundown é registrada pela Ordo Realitas como uma agente marcada por sobrevivência, curiosidade e adaptação. Seu contato com o paranormal não gerou apenas medo: gerou uma necessidade ativa de compreender, dominar e redirecionar aquilo que quase a destruiu.</p>

        <p>O braço mecânico, o tanque ritualístico e o interesse por Energia fazem parte de uma reconstrução pessoal. A Ordo não considera esses elementos simples ferramentas, mas extensões de um processo de sobrevivência transformado em método operacional.</p>

        <p>Maisie tende a se aproximar do desconhecido por impulso investigativo, não por ingenuidade. Esse padrão é valioso em campo, mas exige cuidado quando a curiosidade começa a superar a prudência.</p>

        <div class="quote">“Algumas pessoas fogem do caos. Maisie tenta entender o circuito por trás dele.”</div>
      `,

      habilidades: cards([
        ["Ocultismo aplicado", "Maisie reconhece o paranormal como ameaça, mas também como sistema que pode ser estudado, adaptado e usado contra aquilo que fere a Realidade."],
        ["Improviso técnico", "Sob pressão, busca soluções funcionais em vez de apenas escapar. O registro do hospital abandonado reforça sua capacidade de reação em cenários de colapso."],
        ["Medicina e leitura corporal", "Sua formação prática permite observar ferimentos, resistência física e risco biológico com olhar técnico, especialmente em situações de emergência."],
        ["Robótica e sistemas", "A agente tende a enxergar corpo, máquina e paranormal como estruturas analisáveis. Isso torna sua leitura de problemas incomum e operacionalmente útil."],
        ["Proteção por experiência", "Sua motivação não parece baseada em obediência cega à Ordo, mas na recusa em permitir que outras pessoas sofram violências parecidas com as que ela sofreu."]
      ]),

      trilha: cards([
        ["Ocultista de campo", "Atua como suporte ofensivo, improvisadora técnica e agente de contenção em ambientes caóticos."],
        ["Energia como linguagem", "Depois do desastre no hospital abandonado, manifestações de Energia passaram a ser incorporadas à tecnologia pessoal da agente."],
        ["Autonomia técnica", "Maisie responde melhor a explicações do que a imposições. Controle sem justificativa tende a gerar resistência."],
        ["Equipamento como identidade", "Seus dispositivos não devem ser tratados como ferramentas descartáveis. A Ordo recomenda respeito à autonomia física e tecnológica da agente."]
      ]),

      rituais: cards([
        ["Energia — assinatura predominante", "A integração com Energia se manifesta por instabilidade, interferência, descarga, improviso e tentativa de redirecionar caos em resposta operacional."],
        ["Barreira anômala", "O evento do hospital abandonado indica que Maisie conseguiu canalizar uma resposta de Energia através do braço mecânico durante uma situação crítica."],
        ["Corpo, máquina e foco paranormal", "A fronteira entre equipamento, corpo e foco paranormal pode se tornar instável sob exposição prolongada."],
        ["Uso pragmático do Outro Lado", "Maisie não trata rituais apenas como ameaça ou tabu. Ela os entende como ferramentas perigosas que precisam ser compreendidas antes de serem usadas."]
      ], "ritual-card"),

      pericias: chips([
        "Ocultismo prático",
        "Tecnologia aplicada",
        "Medicina de campo",
        "Robótica",
        "Improviso técnico",
        "Análise de sistemas",
        "Percepção de risco",
        "Resposta sob pressão"
      ]),

      inventario: cards([
        ["Braço mecânico esquerdo", "Maisie não o reconhece apenas como substituição física. Para ela, é memória do ataque, resposta ao trauma, instrumento de combate e prova de autonomia."],
        ["Tanque ritualístico", "Recurso associado à canalização e sustentação de manifestações de Energia. Deve ser observado como parte do conjunto corpo-máquina-paranormal."],
        ["Walt", "Primeiro grande projeto registrado em sua trajetória. Um pequeno robô companheiro que representa prova emocional de que suas ideias podiam existir fora da crítica dos outros."],
        ["Projetos pessoais", "A Ordo recomenda não manipular, desmontar ou confiscar dispositivos pessoais sem consentimento ou necessidade operacional real."]
      ]),

      relacoes: `
        <p><strong>Walt:</strong> marco emocional e técnico. Não é apenas um robô, mas uma prova de autonomia criativa.</p>

        <p><strong>Professor não identificado:</strong> figura associada ao primeiro resgate após o ataque paranormal que resultou na perda do braço esquerdo.</p>

        <p><strong>Equipe perdida no hospital abandonado:</strong> evento de alta relevância psicológica. Maisie sobreviveu sozinha a um desastre que destruiu o local e matou os demais agentes envolvidos.</p>

        <p><strong>Ordo Realitas:</strong> vínculo funcional, mas não cego. Maisie coopera melhor quando entende o motivo por trás das ordens.</p>
      `,

      ordo: `
        <p>A Ordo Realitas avalia Maisie Hundown como agente de alto valor em missões envolvendo Energia, tecnologia, dispositivos anômalos, ambientes instáveis e necessidade de adaptação rápida.</p>

        <p>O principal risco observado é a aproximação indevida de fenômenos desconhecidos antes de avaliação segura. Também há risco de resposta defensiva intensa caso sua autonomia física, seu braço mecânico ou seus projetos sejam questionados de forma invasiva.</p>

        <p>A agente apresenta histórico de sobrevivência solitária após perda de equipe, com possível culpa residual e tendência a agir como se precisasse resolver tudo sozinha.</p>

        <div class="quote">Recomendação: atuação aprovada, com monitoramento técnico e psicológico discreto. Não tratar a agente como peça, ferramenta ou experimento.</div>
      `
    }
  },

  roselyn: {
    id: "roselyn",
    name: "Roselyn Tate",
    player: "Erick",
    mode: "roselyn-mode",
    image: "../assets/imagens/personagens/roselyn.png",
    wheel: "roselyn",
    status: "Arquivo liberado — Recruta / Personagem Jogador",
    desc: "Atiradora de precisão, reconhecimento e análise tática associada à ocorrência anômala da mansão Tate.",
    className: "Especialista",
    origin: "Militar",
    nex: "40%",
    rank: "Recruta",
    attrs: { FOR: 2, AGI: 3, INT: 2, PRE: 1, VIG: 2 },

    banner: {
      label: "Registro público — Ordo Realitas",
      title: "METRÔNOMO / MIRA TEMPORAL",
      text: "Recorte autorizado de dossiê institucional. Dados mecânicos completos, custos e regras foram ocultados."
    },

    insights: {
      FOR: "Força funcional. Roselyn não vence pela brutalidade, mas por posição, controle de distância e precisão.",
      AGI: "Atributo central para deslocamento tático, furtividade, mira e reposicionamento sob risco.",
      INT: "Usado para análise de rota, tecnologia, padrões de movimento e detalhes fora de sincronia.",
      PRE: "Baixa abertura emocional. Sua presença é mais fria e calculada do que dominante.",
      VIG: "Resistência suficiente para suportar espera, pressão e situações de campo prolongadas."
    },

    folders: {
      descricao: `
        <p>Roselyn Tate é uma sobrevivente de contato direto com manifestação associada à Morte e uma das poucas remanescentes conhecidas do incidente ocorrido na antiga residência da família Tate.</p>

        <p>Seu perfil combina disciplina militar, precisão calculada e instabilidade discreta vinculada à memória do evento que apagou sua família. Socialmente, pode parecer extrovertida, provocativa e presente, mas essa abertura não deve ser confundida com vulnerabilidade livre.</p>

        <p>Sob pressão, Roselyn tende a reduzir o ambiente a trajetórias, tempos de resposta e brechas. Ela não organiza o medo como pânico; organiza como procedimento.</p>

        <div class="quote">“Ela mira como alguém que já perdeu tudo e aprendeu a esperar o mundo terminar antes de puxar o gatilho.”</div>
      `,

      habilidades: cards([
        ["Precisão balística", "Apta para cobertura de longa distância, controle de linha de tiro e espera pelo momento exato de ação."],
        ["Reconhecimento avançado", "Perfil adequado para análise de rotas, vigilância, leitura de movimentação inimiga e suporte a equipes em áreas de risco."],
        ["Leitura tática", "Procura padrões, repetições, brechas e detalhes fora de sincronia com o ambiente."],
        ["Controle sob pressão", "Não demonstra pânico comum em sobreviventes recentes de evento paranormal. Tende a converter medo em procedimento."],
        ["Comunicação em equipe", "Pode atuar como observadora, cobertura e voz tática, mas precisa comunicar incertezas antes de agir sobre elas."]
      ]),

      trilha: cards([
        ["Disparo como evento", "Roselyn demonstra capacidade de esperar o momento exato e transformar observação em vantagem."],
        ["Ponte entre vigilância e combate", "Sua familiaridade com tecnologia, observação técnica e raciocínio tático permite conectar infiltração, vigilância e combate coordenado."],
        ["Autonomia controlada", "Funciona melhor com objetivos claros, espaço de observação e liberdade limitada para decisões táticas."],
        ["Percepção não infalível", "A Ordo recomenda ouvir suas leituras de campo, mas nunca tratá-las como absolutas."]
      ]),

      rituais: cards([
        ["Morte / percepção temporal", "O contato inicial não se manifestou apenas como trauma, mas como reorganização da forma como Roselyn entende movimento, morte e consequência."],
        ["Metrônomo de prata", "Objeto de origem desconhecida. Atua como âncora psicológica, símbolo de sobrevivência e possível foco de influência paranormal."],
        ["Tempo espesso", "A agente descreve ou demonstra tendência a perceber ações como eventos suspensos, incompletos ou ainda negociáveis por um intervalo mínimo."],
        ["Sem conjuração registrada", "O arquivo público não registra Roselyn como conjuradora ritualística. Sua relação paranormal aparece por percepção alterada e vínculo com objetos."]
      ], "ritual-card"),

      pericias: chips([
        "Pontaria de precisão",
        "Reconhecimento",
        "Furtividade",
        "Reflexos",
        "Investigação",
        "Tecnologia",
        "Observação técnica",
        "Análise tática"
      ]),

      inventario: cards([
        ["Metrônomo de prata", "Não deve ser removido sem autorização superior e acompanhamento adequado. Remoção brusca pode gerar reação defensiva, desorientação ou ruptura de confiança."],
        ["Rifle do pai", "Relíquia pessoal e vínculo físico com uma família apagada pelo paranormal. A Ordo não deve tratá-lo como equipamento substituível comum."],
        ["Lente de prata oxidada", "Montada com fragmentos ligados à mansão Tate. Roselyn literalmente observa ameaças através do que sobrou de sua casa."],
        ["Caderno pessoal", "Registros próprios indicam organização interna. O conteúdo não deve ser violado sem necessidade operacional clara."]
      ]),

      relacoes: `
        <p><strong>Família Tate:</strong> vínculo central de perda, origem e motivação. Investigações envolvendo a mansão, antiguidades da família ou manifestações similares podem afetar sua estabilidade.</p>

        <p><strong>Metrônomo de prata:</strong> continuidade entre o momento anterior à perda e o mundo que restou depois dela.</p>

        <p><strong>Rifle e lente:</strong> luto preservado em forma de ferramenta operacional.</p>

        <p><strong>Ordo Realitas:</strong> relação funcional, desde que a cadeia de comando não deslegitime sua percepção de campo sem motivo claro.</p>
      `,

      ordo: `
        <p>A Ordo Realitas avalia Roselyn Tate como recurso operacional promissor, porém psicologicamente marcado por evento de alta intensidade.</p>

        <p>Seu valor em campo é evidente: precisão, sangue-frio, capacidade de observação e familiaridade com situações de risco. Ainda assim, seu vínculo com objetos anômalos e memórias traumáticas exige cuidado constante.</p>

        <p>O principal risco observado é a dependência emocional de objetos associados ao trauma. O metrônomo e o rifle funcionam como pontos de estabilização, mas também podem impedir elaboração real da perda.</p>

        <div class="quote">Recomendação: recrutamento aprovado com ressalvas. Evitar exposição prolongada a manifestações de Morte sem acompanhamento e sem análise prévia do estado do metrônomo.</div>
      `
    }
  },

  lilian: {
    id: "lilian",
    name: "Lilian Rodrigues Moretti",
    player: "Nathalie",
    mode: "lilian-mode",
    image: "../assets/imagens/personagens/lilian.png",
    wheel: "lilian",
    status: "Arquivo liberado — Recruta / Personagem Jogador",
    desc: "Combatente de linha de frente, proteção de aliados e contenção física de ameaça.",
    className: "Combatente",
    origin: "Atleta",
    nex: "40%",
    rank: "Recruta",
    attrs: { FOR: 3, AGI: 2, INT: 1, PRE: 1, VIG: 3 },

    banner: {
      label: "Registro público — Ordo Realitas",
      title: "A CASCA GROSSA / LINHA DE FRENTE",
      text: "Recorte autorizado de dossiê institucional. Dados mecânicos completos, custos e regras foram ocultados."
    },

    insights: {
      FOR: "Eixo físico da agente. Força aplicada em contenção, impacto, bloqueio e proteção direta.",
      AGI: "Mobilidade funcional para aproximação, reação curta e reposicionamento em combate corpo a corpo.",
      INT: "Leitura prática e instintiva, mais corporal do que acadêmica. Aprende pela consequência e pela experiência.",
      PRE: "Postura fechada e pouco receptiva. Pode parecer hostil, mas essa camada funciona como barreira defensiva.",
      VIG: "Base de resistência da agente. Lilian tende a suportar dor e pressão além do recomendado."
    },

    folders: {
      descricao: `
        <p>Lilian Rodrigues Moretti apresenta perfil de sobrevivente combativa moldada por ausência afetiva, solidão prolongada e disciplina física.</p>

        <p>A postura fechada, frequentemente confundida com hostilidade, funciona como barreira defensiva contra aproximações indevidas e contra tentativas de reduzi-la a fragilidade.</p>

        <p>A expressão “Casca Grossa” não deve ser interpretada apenas como temperamento difícil. Trata-se de uma estrutura de proteção construída ao longo de anos. Lilian aprendeu a transformar abandono em dureza, raiva em técnica e solidão em prontidão física.</p>

        <div class="quote">“A casca grossa existe por um motivo. Não tentem arrancá-la à força.”</div>
      `,

      habilidades: cards([
        ["Linha de frente", "Lilian possui alto potencial para proteção de equipe, contenção de ameaça e resposta rápida em contato direto."],
        ["Leitura de impacto", "Demonstra leitura instintiva de distância, resistência, intenção hostil e momento de confronto."],
        ["Proteção de aliados", "Tende a ocupar naturalmente o espaço entre a ameaça e os demais integrantes do grupo."],
        ["Resistência física", "É capaz de permanecer funcional em situações de alto risco, mas pode mascarar danos até o ponto de ruptura."],
        ["Resposta imediata", "Sob pressão, prefere ação direta. Não procura conflito por prazer, mas aceita o confronto quando acredita que ele é inevitável."]
      ]),

      trilha: cards([
        ["A Casca Grossa", "A dureza da agente deve ser lida como mecanismo de proteção, não apenas como personalidade difícil."],
        ["Corpo como barreira", "Seu corpo é instrumento de sobrevivência e defesa. Quando coordenado, esse comportamento oferece tempo e espaço para aliados agirem."],
        ["Boxe como estrutura", "O treino funciona como eixo organizador: regras claras, consequência imediata e lugar onde sua intensidade vira foco."],
        ["Comando objetivo", "Responde melhor a superiores claros, presentes e coerentes. Autoridade vazia ou controle por status tende a gerar resistência."]
      ]),

      rituais: cards([
        ["Primeiro contato", "Aos dezesseis anos, após treino noturno, Lilian relatou corredores alterados, sensação de isolamento e figura feminina sem rosto associada à invisibilidade emocional."],
        ["Sombras e reflexos", "Nas semanas seguintes, percebeu sombras, reflexos anômalos e sonhos recorrentes envolvendo isolamento."],
        ["Marca de Sangue", "Durante luta clandestina, enfrentou adversário sob influência anômala ligada a Sangue. A descoberta posterior de um símbolo consolidou sua certeza sobre o Outro Lado."],
        ["Sem conjuração registrada", "O arquivo público não registra Lilian como conjuradora. Sua relação com o paranormal aparece por confronto, resistência e sobrevivência."]
      ], "ritual-card"),

      pericias: chips([
        "Luta corporal",
        "Fortitude",
        "Atletismo",
        "Reflexos de combate",
        "Pilotagem",
        "Pontaria básica",
        "Mobilidade curta",
        "Resposta física imediata"
      ]),

      inventario: cards([
        ["Manoplas", "Equipamento associado diretamente ao estilo de combate de Lilian. Não substitui sua força; amplifica o que ela já aprendeu a fazer com o corpo."],
        ["Corpo como ferramenta", "Ao contrário de agentes que dependem de grande volume de equipamento, Lilian opera principalmente por treino, resistência e presença física."],
        ["Boxe", "Mais do que prática física, representa ordem, limite, presença e linguagem emocional."],
        ["Marcas e cicatrizes", "Pequenas cicatrizes pelo corpo compõem o registro físico de uma história marcada por confronto, treino e resistência."]
      ]),

      relacoes: `
        <p><strong>Lucas Moretti:</strong> irmão mais novo e único vínculo afetivo familiar positivo registrado. Lilian o protege desde o nascimento.</p>

        <p><strong>Seu Jonas:</strong> antigo caseiro e ex-boxeador. Figura formativa que apresentou o boxe como estrutura, consequência e foco.</p>

        <p><strong>Henrique Moretti:</strong> pai distante, empresário, interessado em moldá-la como herdeira e contrário ao envolvimento dela com o boxe.</p>

        <p><strong>Helena Moretti:</strong> mãe socialmente elegante, porém emocionalmente ausente. Reforçou em Lilian a sensação de ser difícil de amar.</p>
      `,

      ordo: `
        <p>A Ordo Realitas avalia Lilian Rodrigues Moretti como agente de alto valor em combate direto, proteção e contenção física.</p>

        <p>Ela não deve ser tratada apenas como músculo. Sua utilidade não se limita à força: Lilian demonstra leitura corporal, reação a intenção hostil e senso protetivo que pode estabilizar aliados sob risco.</p>

        <p>Os principais riscos observados envolvem tendência ao confronto direto mesmo quando recuo seria mais seguro, dificuldade em confiar em figuras de autoridade, reações intensas diante de rejeição ou invisibilidade e impulso protetivo concentrado em vínculos específicos.</p>

        <p>A Ordo deve observar situações que envolvam solidão, corredores vazios, reflexos, ambientes subterrâneos e manifestações que explorem abandono.</p>

        <div class="quote">Recomendação: atuação aprovada em campo, com acompanhamento comportamental e suporte de equipe. Não abandonar Lilian na linha de frente como se aguentar fosse a única função dela.</div>
      `
    }
  }
};

function cards(items, className = "info-card") {
  return `<div class="card-list">${items.map(([t, p]) => `<article class="${className}"><h3>${t}</h3><p>${p}</p></article>`).join("")}</div>`;
}

function chips(items) {
  return `<div class="chip-grid">${items.map(i => `<article><span>Área</span><strong>${i}</strong></article>`).join("")}</div>`;
}

function cleanText(v) {
  return String(v || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getAgentId() {
  return cleanText(new URLSearchParams(location.search).get("id"));
}

function renderForbidden() {
  document.body.innerHTML = `
    <main class="forbidden">
      <section>
        <p class="tag">Arquivo corrompido / leitura negada</p>
        <h1>Acesso<br>Interrompido</h1>
        <p>O registro solicitado existe, mas a leitura pública foi interrompida antes da reconstrução completa.</p>
        <code>ERRO: CREDENCIAL_INSUFICIENTE // FRAGMENTO_BLOQUEADO // MEMÓRIA_CORROMPIDA</code>
        <a class="main-button" href="../index.html">Interromper Leitura</a>
      </section>
    </main>
  `;
}

function bootAgentsPage() {
  const grid = document.getElementById("agentsGrid");
  if (!grid) return;

  const allCards = [
    ...PUBLIC_AGENTS.map(id => ({ id, public: true })),
    ...FORBIDDEN_AGENTS.map(id => ({ id, public: false }))
  ];

  const customPages = {
    maisie: "maisie.html",
    roselyn: "roselyn.html",
    lilian: "lilian.html",
  };

  grid.innerHTML = allCards.map(({ id, public: isPublic }) => {
    const a = agents[id];
    const name = a?.name || id[0].toUpperCase() + id.slice(1);
    const href = isPublic ? customPages[id] : "#";

    return `
      <a class="agent-card ${id}-card ${isPublic ? "" : "corrupted-card"}" href="${href}" data-agent="${id}">
        <span class="stamp">${isPublic ? "Liberado" : "Corrompido"}</span>
        <p class="tag">${isPublic ? "Dossiê público" : "Fragmento bloqueado"}</p>
        <h2>${name}</h2>
        <p>${isPublic ? "Registro autorizado para consulta." : "Leitura interrompida pela interface."}</p>
        <i></i>
      </a>
    `;
  }).join("");

  grid.querySelectorAll(".corrupted-card").forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();
      showPopup("Arquivo corrompido", "Este fragmento não pode ser aberto pelo Arquivo Público.");
    });
  });

  createOpening("Sincronizando", "Dossiês");
}

function bootAgentPage() {
  const page = document.getElementById("agentPage");
  if (!page) return;

  const id = getAgentId();

  if (!PUBLIC_AGENTS.includes(id)) {
    renderForbidden();
    return;
  }

  const a = agents[id];
  page.classList.add(a.mode, "player-premium");

  setText("agentStatus", a.status);
  setText("agentName", a.name);
  setText("agentDesc", a.desc);
  setText("agentCodename", a.name);
  setText("agentClass", a.className);
  setText("agentOrigin", a.origin);
  setText("agentNex", a.nex);
  setText("agentRank", a.rank);

  setText("bannerLabel", a.banner.label);
  setText("bannerTitle", a.banner.title);
  setText("bannerText", a.banner.text);

  const img = document.getElementById("agentImage");
  if (img) {
    img.src = a.image;
    img.loading = "lazy";
    img.decoding = "async";
  }

  setupWheel(a);
  setupFolders(a);
  setupInteractions(a);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setupWheel(a) {
  const base = `../assets/imagens/rodas/${a.wheel}/`;
  const prefix = a.name.split(" ")[0];

  const outer = document.querySelector(".wheel-outer");
  const inner = document.querySelector(".wheel-inner");
  const core = document.querySelector(".wheel-core");

  if (!outer || !inner || !core) return;

  outer.src = `${base}Roda-${prefix}-Anel-Externo.png`;
  inner.src = `${base}Roda-${prefix}-Anel-Interno.png`;
  core.src = `${base}Roda-${prefix}-Nucleo.png`;
  core.dataset.original = `${base}Roda-${prefix}-Nucleo.png`;

  document.querySelectorAll(".attr-node").forEach(btn => {
    const key = btn.dataset.attr;
    const icon = btn.querySelector("img");

    if (!icon) return;

    icon.src = `${base}Icone-${prefix}-${key}.png`;
    icon.alt = `${key} — ${attrName(key)}`;

    const valueElement = btn.querySelector("strong");
    if (valueElement) {
      valueElement.textContent = a.attrs[key] ?? 0;
    }

    btn.addEventListener("click", () => {
      document.querySelectorAll(".attr-node").forEach(n => {
        n.classList.remove("selected");
      });

      btn.classList.add("selected");

      setText("insightName", `${key} — ${attrName(key)}`);
      setText("insightValue", `${a.attrs[key] ?? 0} ponto${(a.attrs[key] ?? 0) === 1 ? "" : "s"}`);
      setText("insightText", "Leitura de atributo registrada no dossiê público.");

      pulse(document.getElementById("attributeInsight"));
    });
  });

  core.addEventListener("click", () => {
    core.src = core.dataset.original;
    core.classList.remove("active-core");

    document.querySelectorAll(".attr-node").forEach(n => {
      n.classList.remove("selected");
    });

    setText("insightName", "Atributo selecionado");
    setText("insightValue", "--");
    setText("insightText", "Clique em um atributo para abrir a leitura operacional.");
  });
}

function attrName(k) {
  return {
    FOR: "Força",
    AGI: "Agilidade",
    INT: "Intelecto",
    PRE: "Presença",
    VIG: "Vigor"
  }[k] || k;
}

function setupFolders(a) {
  const buttons = document.querySelectorAll(".folder-tabs button");

  function open(folder) {
    buttons.forEach(b => b.classList.toggle("active", b.dataset.folder === folder));

    setText("folderTitle", {
      descricao: "Dossiê",
      habilidades: "Competências",
      trilha: "Atuação",
      rituais: "Paranormal",
      pericias: "Áreas",
      inventario: "Equipamentos",
      relacoes: "Vínculos",
      ordo: "Avaliação"
    }[folder] || folder);

    const body = document.getElementById("folderBody");

    if (body) {
      body.innerHTML = a.folders[folder] || "<p>Arquivo sem dados.</p>";
    }

    pulse(document.querySelector(".folder-content"));
    showAction(a.id, folder);
  }

  buttons.forEach(b => b.addEventListener("click", () => open(b.dataset.folder)));
  open("descricao");
}

function setupInteractions(a) {
  const character = document.querySelector(".character-panel");
  const core = document.querySelector(".wheel-core");

  if (character) {
    character.addEventListener("click", e => {
      burst(e.clientX, e.clientY, a.id, 18);
      pulse(character);
      setText("insightName", `${a.name}`);
      setText("insightValue", "!");
      setText("insightText", characterText(a.id));
      pulse(document.getElementById("attributeInsight"));
    });
  }

  if (core) {
    core.addEventListener("dblclick", e => {
      if (a.id === "maisie") specialMaisie();
      if (a.id === "roselyn") specialRoselyn();
      if (a.id === "lilian") specialLilian(e);
    });
  }

  document.addEventListener("click", e => {
    const item = e.target.closest(".info-card,.ritual-card,.chip-grid article,.quote");
    if (item) burst(e.clientX, e.clientY, a.id, 8);
  });
}

function characterText(id) {
  return {
    maisie: "A prótese, o tanque e a Energia respondem como partes do mesmo circuito.",
    roselyn: "O metrônomo pulsa em silêncio. A mira espera o mundo terminar antes do disparo.",
    lilian: "Quando Lilian entra na frente, a ameaça precisa passar por ela primeiro."
  }[id];
}

function showAction(id, folder) {
  const labels = {
    maisie: {
      inventario: "TANQUE ATIVO",
      habilidades: "SISTEMA ARMADO",
      rituais: "ENERGIA INSTÁVEL"
    },
    roselyn: {
      inventario: "METRÔNOMO EM SINCRONIA",
      habilidades: "TIRO SUSPENSO",
      rituais: "TEMPO ESPESSO"
    },
    lilian: {
      inventario: "MANOPLAS PRONTAS",
      habilidades: "GUARDA FECHADA",
      rituais: "SEM RITUAL"
    }
  };

  const text = labels[id]?.[folder];
  if (!text) return;

  const el = document.createElement("div");
  el.className = `action-text ${id}-text`;
  el.textContent = text;
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 1000);
}

function pulse(el) {
  if (!el) return;

  el.classList.remove("pulse");
  void el.offsetWidth;
  el.classList.add("pulse");
}

function burst(x, y, type, amount = 10) {
  if (document.documentElement.classList.contains("performance-mode")) return;

  for (let i = 0; i < amount; i++) {
    const p = document.createElement("span");

    p.className = `particle particle-${type}`;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.setProperty("--x", `${(Math.random() - 0.5) * 160}px`);
    p.style.setProperty("--y", `${(Math.random() - 0.8) * 140}px`);

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 900);
  }
}

function specialMaisie() {
  document.body.classList.add("overcharge");
  showPopup("SOBRECARGA", "A Energia atravessa a interface em pulsos rosa, roxos e azuis.");

  setTimeout(() => document.body.classList.remove("overcharge"), 1600);
}

function specialRoselyn() {
  document.body.classList.add("hiatus");
  showPopup("HIATO TEMPORAL", "O metrônomo suspende a leitura por um instante.");

  setTimeout(() => document.body.classList.remove("hiatus"), 1800);
}

function specialLilian(e) {
  document.body.classList.add("impact");
  burst(e.clientX, e.clientY, "lilian", 24);
  showPopup("IMPACTO", "A guarda fecha. A interface sente o peso da linha de frente.");

  setTimeout(() => document.body.classList.remove("impact"), 900);
}

function showPopup(title, text) {
  const old = document.querySelector(".popup");
  if (old) old.remove();

  const pop = document.createElement("div");
  pop.className = "popup";

  pop.innerHTML = `
    <section>
      <strong>${title}</strong>
      <p>${text}</p>
      <button>Fechar</button>
    </section>
  `;

  pop.querySelector("button").onclick = () => pop.remove();

  pop.onclick = e => {
    if (e.target === pop) pop.remove();
  };

  document.body.appendChild(pop);
}

function createOpening(a, b) {
  if (sessionStorage.getItem("openingPlayed")) return;

  sessionStorage.setItem("openingPlayed", "1");

  const o = document.createElement("div");
  o.className = "opening";

  o.innerHTML = `
    <section>
      <p class="tag">ORDO REALITAS</p>
      <h1>${a}<br>${b}</h1>
      <i></i>
      <i></i>
      <i></i>
    </section>
  `;

  document.body.appendChild(o);

  setTimeout(() => o.remove(), 2500);
}

function bootPerformance() {
  const low =
    innerWidth < 760 ||
    (navigator.hardwareConcurrency || 4) <= 4 ||
    (navigator.deviceMemory || 4) <= 4;

  if (low) {
    document.documentElement.classList.add("performance-mode");
  }

  const oldButton = document.querySelector(".performance-toggle");
  if (oldButton) oldButton.remove();

  const btn = document.createElement("button");
  btn.className = "performance-toggle";
  btn.textContent = document.documentElement.classList.contains("performance-mode") ? "Modo leve" : "Modo full";

  btn.onclick = () => {
    document.documentElement.classList.toggle("performance-mode");
    btn.textContent = document.documentElement.classList.contains("performance-mode") ? "Modo leve" : "Modo full";
  };

  document.body.appendChild(btn);
}

document.addEventListener("DOMContentLoaded", () => {
  bootPerformance();
  bootAgentsPage();
  bootAgentPage();
});
function homeTriggerCorruption() {
  const popup = document.getElementById("homeCorruptionPopup");

  if (!popup) return;

  popup.classList.add("active");
  burst(window.innerWidth / 2, window.innerHeight / 2, "lilian", 18);
}

function homeCloseCorruption() {
  const popup = document.getElementById("homeCorruptionPopup");

  if (!popup) return;

  popup.classList.remove("active");
}
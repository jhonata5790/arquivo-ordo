let masterAccess = false;
let currentAgent = null;

const routes = {
  "Agentes": "pages/agentes.html",
  "Locais": "pages/locais.html",
  "Missões": "pages/missoes.html",
  "Documentos": "pages/documentos.html",
  "Ordo Realitas": "pages/ordo-realitas.html",

  "Elementos": "pages/elementos.html",
  "Klint": "pages/klint.html",
  "Jogadores": "pages/jogadores.html",
  "Componentes Ritualísticos": "pages/componentes-ritualisticos.html"
};

const agentsData = {
  yuna: {
    id: "yuna",
    name: "Yuna",
    codename: "YUNA",
    image: "../assets/imagens/agentes/yuna.png",
    modeClass: "yuna-mode",
    theme: {
      main: "#cfc4ff",
      secondary: "#6d63ff",
      glow: "rgba(184, 166, 255, 0.28)"
    },
    status: "Arquivo liberado — Semi-Líder Ocultista",
    description: "Ocultista de Morte. Analista de manifestações, artefatos, rituais e pontos de ruptura da Ordo Realitas.",
    className: "Ocultista",
    origin: "Desconhecida",
    nex: "60%",
    rank: "Semi-Líder Ocultista",
    banner: {
      label: "Registro interno — Acesso restrito",
      title: "Ela sobreviveu. Não voltou inteira.",
      text: "Arquivo técnico e narrativo consolidado a partir da ficha bruta mecânica e do dossiê narrativo da Ordo."
    },
    attributes: { FOR: 1, AGI: 3, INT: 4, PRE: 1, VIG: 1 },
    derived: {
      life: "46 / 46",
      determination: "77 / 77",
      defense: "13",
      dodge: "23",
      ritualDT: "23",
      peTurn: "12"
    },
    folders: {
      descricao: {
        title: "Descrição",
        html: `
          <p>Yuna possui 24 anos, 1,65m e uma presença silenciosa que costuma ser percebida antes mesmo de ela falar. A primeira impressão pode sugerir fragilidade ou distância, mas essa leitura muda quando seus olhos se fixam em algo paranormal.</p>

          <p>Sua pele negra possui brilho sutil, discreto em ambientes comuns, mas mais perceptível sob luz fraca, telas antigas, velas ou durante manifestações paranormais. Em momentos de tensão, esse brilho acompanha o ritmo das marcas ritualísticas no pescoço e nos pulsos, como se o Outro Lado ainda reconhecesse o corpo dela.</p>

          <p>O cabelo é longo, volumoso e intensamente cacheado, com pontas brancas espalhadas pelos cachos como se a cor tivesse sido drenada aos poucos. Uma franja cacheada cai sobre o lado esquerdo do rosto, escondendo parte da expressão.</p>

          <p>Yuna prefere roupas largas, escuras e confortáveis: hoodies oversized pretos ou cinza-escuros, calças amplas, tecidos discretos e pulseiras simples que escondem parte das marcas nos pulsos. Ela não tenta impor autoridade pela aparência. Tenta desaparecer. O problema é que o paranormal nunca deixa.</p>

          <div class="lore-quote">“Eu sobrevivi, mas isso não significa que eu voltei inteira.”</div>

          <div class="data-cluster">
            <div class="data-chip"><span>Idade</span><strong>24 anos</strong></div>
            <div class="data-chip"><span>Altura</span><strong>1,65m</strong></div>
            <div class="data-chip"><span>Tempo na Ordem</span><strong>4 anos</strong></div>
            <div class="data-chip"><span>Tempo na Trindade</span><strong>2 anos</strong></div>
            <div class="data-chip"><span>Elemento</span><strong>Morte</strong></div>
            <div class="data-chip"><span>Risco interno</span><strong>Moderado a alto</strong></div>
          </div>
        `
      },

      habilidades: {
        title: "Habilidades",
        html: `
          <div class="skill-list">
            <article class="skill-item">
              <h3>Escolhido pelo Outro Lado</h3>
              <p>Habilidade base de Ocultista. Permite lançar rituais e representa a abertura de Yuna para forças paranormais que nunca a deixaram completamente.</p>
            </article>

            <article class="skill-item">
              <h3>Especialista em Elemento</h3>
              <p>Yuna escolhe um elemento e aumenta a DT para resistir aos rituais desse elemento. No caso dela, a especialização reforça sua ligação com Morte.</p>
            </article>

            <article class="skill-item">
              <h3>Identificação Paranormal</h3>
              <p>Recebe grande vantagem em testes de Ocultismo para identificar criaturas, objetos ou rituais. Essa é uma das razões pelas quais a Ordo a considera insubstituível.</p>
            </article>

            <article class="skill-item">
              <h3>Mestre em Elemento</h3>
              <p>Reduz o custo para lançar rituais do elemento escolhido. Em termos narrativos, Yuna não conjura Morte como uma técnica decorada; ela reconhece uma cicatriz antiga.</p>
            </article>

            <article class="skill-item">
              <h3>Treinamento em Perícia</h3>
              <p>Dois registros de treinamento aparecem na ficha, completando seu perfil técnico de análise paranormal, investigação e leitura de manifestações.</p>
            </article>
          </div>
        `
      },

      trilha: {
        title: "Trilha",
        html: `
          <p>A função de Yuna dentro da Ordo não é liderar pessoas pela presença social, mas pela necessidade. Ela se tornou Semi-Líder Ocultista porque ninguém mais entregava o mesmo nível de precisão em análise paranormal.</p>

          <p>Seu papel é interpretar o que outros agentes não conseguem enxergar: padrões ritualísticos, pontos de ruptura, ecos de manifestações, artefatos amaldiçoados e sinais de que algo está prestes a atravessar a Realidade.</p>

          <p>Klint percebeu que Yuna era valiosa demais para ser tratada como agente comum e instável demais para ser forçada a seguir a estrutura tradicional da Ordem. A promoção ocorreu por necessidade operacional.</p>

          <div class="lore-quote">A liderança de Yuna é técnica e analítica, não social.</div>
        `
      },

      rituais: {
        title: "Rituais",
        html: `
          <div class="ritual-grid">
            <div class="ritual-folder ritual-morte">
              <small>Morte — 3º Círculo</small>
              <h3>Memória do Último Instante</h3>
              <p>Força o alvo a ver uma simulação da própria morte. A Ordo trata esse ritual com extremo cuidado pelo impacto psicológico causado pela percepção direta do fim.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — 2º Círculo</small>
              <h3>Refração Temporal</h3>
              <p>Altera a percepção temporal da própria Yuna. Enquanto sustentado, permite que ela reaja como se estivesse meio segundo fora do fluxo normal.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — 1º Círculo</small>
              <h3>Definhar</h3>
              <p>Enfraquece o alvo pela ação da Morte, reduzindo vitalidade, estabilidade ou capacidade física conforme a versão usada na mesa.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — 1º Círculo</small>
              <h3>Cicatrização</h3>
              <p>Fecha ferimentos forçando o corpo a avançar no próprio processo de recuperação. Cura com custo narrativo ligado a Morte e envelhecimento.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — 2º Círculo</small>
              <h3>Decadência</h3>
              <p>Acelera deterioração, apodrecimento e ruína de um alvo, objeto ou defesa. Yuna usa como contato direto com o fim das coisas.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — 2º Círculo</small>
              <h3>Velocidade Mortal</h3>
              <p>Acelera os movimentos da usuária por manipulação temporal, permitindo agir como se estivesse um instante à frente.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — 1º/2º Círculo</small>
              <h3>Eco Espiral</h3>
              <p>Cria repetições, ecos e ciclos de Morte. Usado para prender percepções, distorcer ritmo de ação e fazer eventos retornarem de forma errada.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — 1º Círculo</small>
              <h3>Registro da Ruína</h3>
              <p>Yuna observa um alvo, objeto ou local e força a Morte a revelar marcas de deterioração invisíveis. Pode auxiliar em Ocultismo, Investigação ou Percepção.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — 2º Círculo</small>
              <h3>Segundo Antes do Fim</h3>
              <p>Ao ser alvo de ataque ou efeito que permita resistência, Yuna sente o instante antes do perigo. Pode reagir melhor e se mover como parte da reação.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — 3º Círculo</small>
              <h3>Relógio Fúnebre</h3>
              <p>Marca um alvo com um ciclo invisível de Morte. Enquanto sustentado, reduz a resistência contra rituais de Morte da Yuna e permite penalidades adicionais.</p>
            </div>

            <div class="ritual-folder ritual-conhecimento">
              <small>Conhecimento — 1º Círculo</small>
              <h3>Terceiro Olho</h3>
              <p>Permite perceber camadas ocultas da Realidade: rastros paranormais, marcas, presenças, símbolos e detalhes invisíveis a agentes comuns.</p>
            </div>

            <div class="ritual-folder ritual-conhecimento">
              <small>Conhecimento — 1º Círculo</small>
              <h3>Ouvir os Sussurros</h3>
              <p>Yuna capta ecos, frases e fragmentos de informação presos em objetos, lugares ou manifestações paranormais.</p>
            </div>

            <div class="ritual-folder ritual-conhecimento">
              <small>Conhecimento — 1º Círculo</small>
              <h3>Perturbação</h3>
              <p>Desestabiliza a mente ou a ação de um alvo por meio de influência paranormal e pressão psicológica.</p>
            </div>

            <div class="ritual-folder ritual-conhecimento">
              <small>Conhecimento — 2º Círculo</small>
              <h3>Memória Residual</h3>
              <p>Ao tocar objeto, corpo, parede, porta, símbolo ou local marcado pelo paranormal, Yuna acessa fragmentos sensoriais do que aconteceu.</p>
            </div>

            <div class="ritual-folder ritual-sangue">
              <small>Sangue</small>
              <h3>Nenhum ritual registrado</h3>
              <p>A ficha de Yuna não registra rituais de Sangue.</p>
            </div>

            <div class="ritual-folder ritual-energia">
              <small>Energia</small>
              <h3>Nenhum ritual registrado</h3>
              <p>A ficha de Yuna não registra rituais de Energia.</p>
            </div>

            <div class="ritual-folder ritual-medo">
              <small>Medo</small>
              <h3>Acesso bloqueado</h3>
              <p>Dados ligados a Medo não devem ser exibidos em registros comuns.</p>
            </div>
          </div>
        `
      },

      pericias: {
        title: "Perícias",
        html: `
          <p>Perícias principais registradas na ficha mecânica. A leitura da Ordo indica foco em análise paranormal, percepção, investigação e sobrevivência controlada.</p>

          <table class="pericia-table">
            <thead>
              <tr>
                <th>Perícia</th>
                <th>Atributo</th>
                <th>Bônus</th>
              </tr>
            </thead>

            <tbody>
              <tr><td>Ocultismo</td><td>INT</td><td>+15</td></tr>
              <tr><td>Percepção</td><td>PRE</td><td>+15</td></tr>
              <tr><td>Investigação</td><td>INT</td><td>+10</td></tr>
              <tr><td>Reflexos</td><td>AGI</td><td>+10</td></tr>
              <tr><td>Vontade</td><td>PRE</td><td>+10</td></tr>
              <tr><td>Furtividade</td><td>AGI</td><td>+10</td></tr>
              <tr><td>Adestramento</td><td>PRE</td><td>+5</td></tr>
              <tr><td>Artes</td><td>PRE</td><td>+5</td></tr>
              <tr><td>Atualidades</td><td>INT</td><td>+5</td></tr>
              <tr><td>Intuição</td><td>PRE</td><td>+5</td></tr>
              <tr><td>Sobrevivência</td><td>INT</td><td>+5</td></tr>
              <tr><td>Tática</td><td>INT</td><td>+5</td></tr>
            </tbody>
          </table>
        `
      },

      inventario: {
        title: "Inventário",
        html: `
          <p><strong>Inventário registrado:</strong> nenhum item registrado.</p>

          <p>Essa ausência não é descuido. É escolha narrativa. Yuna quase não carrega itens porque ela própria funciona como foco operacional e paranormal.</p>

          <p>Sua forma principal de combate não envolve armas. Ela atua com rituais de Morte e Conhecimento, priorizando controle, análise, enfraquecimento e suporte.</p>

          <div class="lore-quote">Ela carrega o próprio corpo porque não pode deixá-lo para trás.</div>
        `
      },

      relacoes: {
        title: "Relações",
        html: `
          <p><strong>Lisa:</strong> Yuna e Lisa mantêm uma relação afetiva há aproximadamente 1 ano. O vínculo não apresentou prejuízo operacional. Pelo contrário: Lisa funciona como âncora emocional para Yuna, enquanto Yuna oferece a Lisa leitura fria e precisa de situações caóticas.</p>

          <p><strong>Blender:</strong> Blender atua como figura fraterna para Yuna e Lisa. Apesar do comportamento impulsivo e grosseiro, demonstra cuidado constante e instinto protetor. Ele trata Yuna como família, não como arma, caso ou aberração.</p>

          <p><strong>Klint:</strong> Klint a promoveu por necessidade operacional e aceitou suas condições: não mentorar agentes diretamente, não atuar como instrutora pública, evitar eventos sociais e trabalhar sozinha sempre que possível.</p>

          <div class="lore-quote">Para Lisa, ela é apenas Yuna. Talvez isso explique por que ela continua aqui.</div>
        `
      },

      ordo: {
        title: "O que a Ordo acha",
        html: `
          <p>Yuna não deve ser tratada como agente comum. Sua presença dentro da Ordem é resultado de utilidade operacional extrema, tolerância institucional e confiança direta de Klint.</p>

          <p>Ela funciona melhor com autonomia, pouca exposição social e objetivos claros. Não se recomenda forçar Yuna a atuar como mentora, instrutora pública ou líder de equipe ampla.</p>

          <p>Para alguns agentes, Yuna é uma especialista brilhante. Para outros, uma sobrevivente instável. Para poucos, uma arma que precisa ser usada com cuidado.</p>

          <div class="data-cluster">
            <div class="data-chip"><span>Status</span><strong>Ativa</strong></div>
            <div class="data-chip"><span>Convivência</span><strong>Restrita</strong></div>
            <div class="data-chip"><span>Mentoria</span><strong>Não recomendada</strong></div>
            <div class="data-chip"><span>Exposição ao Outro Lado</span><strong>Risco moderado a alto</strong></div>
          </div>

          <div class="lore-quote">“Dentro da Ordem, ao menos o horror tinha nome, classificação e protocolo.”</div>
        `
      }
    }
  },

  lisa: {
    id: "lisa",
    name: "Lisa",
    codename: "LISA",
    image: "../assets/imagens/agentes/lisa.png",
    modeClass: "",
    theme: {
      main: "#8fd694",
      secondary: "#d6b35a",
      glow: "rgba(143, 214, 148, 0.22)"
    },
    status: "Arquivo liberado — Semi-Líder Especialista",
    description: "Coordenadora operacional, ex-ginasta e principal elo estratégico da Trindade.",
    className: "Especialista",
    origin: "Ginasta",
    nex: "60%",
    rank: "Semi-Líder Especialista",
    attributes: { FOR: 1, AGI: 3, INT: 3, PRE: 2, VIG: 1 },
    derived: {
      life: "---",
      determination: "---",
      defense: "---",
      dodge: "---",
      ritualDT: "---",
      peTurn: "---"
    },
    folders: {
      descricao: {
        title: "Descrição",
        html: `<p>Lisa é comunicativa, carismática e extremamente eficiente quando precisa organizar uma equipe sob pressão.</p>`
      },
      habilidades: {
        title: "Habilidades",
        html: `
          <ul>
            <li><strong>Eclético:</strong> versatilidade em momentos decisivos.</li>
            <li><strong>Mobilidade Acrobática:</strong> movimentação refinada e controle corporal.</li>
            <li><strong>Movimentos Ginásticos:</strong> execução física precisa.</li>
            <li><strong>Perito:</strong> domínio técnico em perícias importantes.</li>
          </ul>
        `
      },
      trilha: {
        title: "Trilha",
        html: `<p><strong>Infiltrador:</strong> Lisa possui atuação voltada a mobilidade, precisão, furtividade e resolução rápida de situações complexas.</p>`
      },
      rituais: {
        title: "Rituais",
        html: `<div class="ritual-grid"><div class="ritual-folder ritual-conhecimento"><h3>Sem rituais</h3><p>Lisa não possui conhecimento ritualístico registrado.</p></div></div>`
      },
      pericias: {
        title: "Perícias",
        html: `<p>Perícias serão refinadas na versão individual da Lisa.</p>`
      },
      inventario: {
        title: "Inventário",
        html: `<p>Lisa quase não carrega itens em missões comuns.</p>`
      },
      relacoes: {
        title: "Relações",
        html: `<p>Relações serão refinadas na versão individual da Lisa.</p>`
      },
      ordo: {
        title: "O que a Ordo acha",
        html: `<p>A Ordo reconhece Lisa como uma das principais responsáveis por manter equipes vivas e funcionais.</p>`
      }
    }
  },

  blender: {
    id: "blender",
    name: "Blender",
    codename: "BLENDER",
    image: "../assets/imagens/agentes/blender.png",
    modeClass: "",
    theme: {
      main: "#ff3b3b",
      secondary: "#d6b35a",
      glow: "rgba(255, 59, 59, 0.26)"
    },
    status: "Arquivo liberado — Semi-Líder Combatente",
    description: "Combatente de linha de frente, ex-lutador e força bruta da Trindade da Ordo.",
    className: "Combatente",
    origin: "Lutador",
    nex: "60%",
    rank: "Semi-Líder Combatente",
    attributes: { FOR: 4, AGI: 2, INT: 1, PRE: 2, VIG: 3 },
    derived: {
      life: "---",
      determination: "---",
      defense: "---",
      dodge: "---",
      ritualDT: "---",
      peTurn: "---"
    },
    folders: {
      descricao: {
        title: "Descrição",
        html: `<p>Blender é explosivo, grosseiro, impulsivo e extremamente direto. Sua eficiência em campo é inegável.</p>`
      },
      habilidades: {
        title: "Habilidades",
        html: `<ul><li><strong>Ataque Especial:</strong> força concentrada em golpes decisivos.</li><li><strong>Artista Marcial:</strong> experiência corporal de combate.</li><li><strong>Mão Pesada:</strong> dano bruto e pressão física.</li></ul>`
      },
      trilha: {
        title: "Trilha",
        html: `<p><strong>Guerreiro:</strong> presença de linha de frente, absorvendo perigo e devolvendo violência de forma ainda maior.</p>`
      },
      rituais: {
        title: "Rituais",
        html: `<div class="ritual-grid"><div class="ritual-folder ritual-sangue"><h3>Sangue</h3><p>Nenhum ritual registrado.</p></div></div>`
      },
      pericias: {
        title: "Perícias",
        html: `<p>Perícias serão refinadas na versão individual do Blender.</p>`
      },
      inventario: {
        title: "Inventário",
        html: `<p>Blender depende principalmente do próprio corpo.</p>`
      },
      relacoes: {
        title: "Relações",
        html: `<p>Relações serão refinadas na versão individual do Blender.</p>`
      },
      ordo: {
        title: "O que a Ordo acha",
        html: `<p>A Ordo considera Blender perigoso, barulhento e difícil de controlar, mas extremamente confiável em combate.</p>`
      }
    }
  },

  maisie: {
    id: "maisie",
    name: "Maisie Hundown",
    codename: "MAISIE",
    image: "../assets/imagens/agentes/maisie.png",
    modeClass: "",
    theme: {
      main: "#c05cff",
      secondary: "#ff5bbd",
      glow: "rgba(192, 92, 255, 0.25)"
    },
    status: "Arquivo liberado — Agente em campo",
    description: "Agente enviada para Santa Luzia durante os primeiros movimentos da investigação.",
    className: "Ocultista",
    origin: "Agente de Saúde",
    nex: "40%",
    rank: "Recruta",
    attributes: { FOR: 1, AGI: 2, INT: 3, PRE: 3, VIG: 2 },
    derived: {
      life: "---",
      determination: "---",
      defense: "---",
      dodge: "---",
      ritualDT: "---",
      peTurn: "---"
    },
    folders: {
      descricao: { title: "Descrição", html: `<p>Maisie possui estética vibrante, marcada por roxo, fogo rosa, mecânica improvisada e ocultismo de campo.</p>` },
      habilidades: { title: "Habilidades", html: `<p>Habilidades específicas serão adicionadas conforme a ficha for refinada.</p>` },
      trilha: { title: "Trilha", html: `<p>Trilha aguardando organização final.</p>` },
      rituais: { title: "Rituais", html: `<div class="ritual-grid"><div class="ritual-folder ritual-energia"><h3>Rituais</h3><p>Rituais serão adicionados posteriormente.</p></div></div>` },
      pericias: { title: "Perícias", html: `<p>Perícias serão refinadas na versão individual da Maisie.</p>` },
      inventario: { title: "Inventário", html: `<p>Inventário aguardando integração com a ficha bruta.</p>` },
      relacoes: { title: "Relações", html: `<p>Relações serão refinadas na versão individual da Maisie.</p>` },
      ordo: { title: "O que a Ordo acha", html: `<p>A Ordo acompanha o desempenho de Maisie como parte da primeira equipe enviada para Santa Luzia.</p>` }
    }
  },

  roselyn: {
    id: "roselyn",
    name: "Roselyn Tate",
    codename: "ROSELYN",
    image: "../assets/imagens/agentes/roselyn.png",
    modeClass: "",
    theme: {
      main: "#c7c7c7",
      secondary: "#7e24ff",
      glow: "rgba(199, 199, 199, 0.18)"
    },
    status: "Arquivo liberado — Agente em campo",
    description: "Especialista associada à operação Corações do Outro Lado.",
    className: "Especialista",
    origin: "Militar",
    nex: "40%",
    rank: "Recruta",
    attributes: { FOR: 2, AGI: 3, INT: 3, PRE: 2, VIG: 1 },
    derived: {
      life: "---",
      determination: "---",
      defense: "---",
      dodge: "---",
      ritualDT: "---",
      peTurn: "---"
    },
    folders: {
      descricao: { title: "Descrição", html: `<p>Roselyn carrega uma estética elegante e tensa, marcada por prata, precisão, metrônomo e distorções ligadas ao tempo.</p>` },
      habilidades: { title: "Habilidades", html: `<p>Habilidades serão adicionadas conforme a ficha bruta for integrada.</p>` },
      trilha: { title: "Trilha", html: `<p>Trilha aguardando organização final.</p>` },
      rituais: { title: "Rituais", html: `<div class="ritual-grid"><div class="ritual-folder ritual-morte"><h3>Morte</h3><p>Possível associação estética com tempo e desgaste.</p></div></div>` },
      pericias: { title: "Perícias", html: `<p>Perícias serão refinadas na versão individual da Roselyn.</p>` },
      inventario: { title: "Inventário", html: `<p>Inventário aguardando integração visual.</p>` },
      relacoes: { title: "Relações", html: `<p>Relações serão refinadas na versão individual da Roselyn.</p>` },
      ordo: { title: "O que a Ordo acha", html: `<p>A Ordo registra Roselyn como agente útil em situações que exigem precisão, controle e leitura tática.</p>` }
    }
  },

  lilian: {
    id: "lilian",
    name: "Lilian Rodrigues Moretti",
    codename: "LILIAN",
    image: "../assets/imagens/agentes/lilian.png",
    modeClass: "",
    theme: {
      main: "#ffb347",
      secondary: "#ff3333",
      glow: "rgba(255, 179, 71, 0.22)"
    },
    status: "Arquivo liberado — Agente em campo",
    description: "Combatente vinculada à investigação inicial do Caso Miyara.",
    className: "Combatente",
    origin: "Não registrada",
    nex: "40%",
    rank: "Recruta",
    attributes: { FOR: 3, AGI: 2, INT: 1, PRE: 2, VIG: 3 },
    derived: {
      life: "---",
      determination: "---",
      defense: "---",
      dodge: "---",
      ritualDT: "---",
      peTurn: "---"
    },
    folders: {
      descricao: { title: "Descrição", html: `<p>Lilian ocupa a função de combatente da equipe enviada para Santa Luzia.</p>` },
      habilidades: { title: "Habilidades", html: `<p>Habilidades aguardando integração com ficha bruta.</p>` },
      trilha: { title: "Trilha", html: `<p>Trilha aguardando organização final.</p>` },
      rituais: { title: "Rituais", html: `<div class="ritual-grid"><div class="ritual-folder ritual-sangue"><h3>Sangue</h3><p>Nenhum ritual registrado.</p></div></div>` },
      pericias: { title: "Perícias", html: `<p>Perícias serão refinadas na versão individual da Lilian.</p>` },
      inventario: { title: "Inventário", html: `<p>Inventário aguardando integração visual.</p>` },
      relacoes: { title: "Relações", html: `<p>Relações serão refinadas na versão individual da Lilian.</p>` },
      ordo: { title: "O que a Ordo acha", html: `<p>A Ordo registra Lilian como parte essencial da composição inicial da equipe.</p>` }
    }
  },

  klint: {
    id: "klint",
    name: "Klint",
    codename: "KLINT",
    image: "../assets/imagens/agentes/klint.png",
    modeClass: "",
    theme: {
      main: "#d6b35a",
      secondary: "#7b0000",
      glow: "rgba(214, 179, 90, 0.20)"
    },
    status: "Arquivo restrito — Comando da Ordo",
    description: "Líder da Ordo Realitas. Render temporário usado no lugar da Anny.",
    className: "Comando",
    origin: "Classificado",
    nex: "Classificado",
    rank: "Líder da Ordo",
    attributes: { FOR: 3, AGI: 2, INT: 4, PRE: 4, VIG: 3 },
    derived: {
      life: "Classificado",
      determination: "Classificado",
      defense: "Classificado",
      dodge: "Classificado",
      ritualDT: "Classificado",
      peTurn: "Classificado"
    },
    folders: {
      descricao: { title: "Descrição", html: `<p>Klint é uma figura de comando cansada, respeitada e temida. Sua presença carrega autoridade, culpa e uma sensação constante de peso invisível.</p>` },
      habilidades: { title: "Habilidades", html: `<p>Dados de comando classificados.</p>` },
      trilha: { title: "Trilha", html: `<p>Registro de trilha não disponível nesta versão pública.</p>` },
      rituais: { title: "Rituais", html: `<div class="ritual-grid"><div class="ritual-folder ritual-medo"><h3>Classificado</h3><p>Acesso bloqueado.</p></div></div>` },
      pericias: { title: "Perícias", html: `<p>Dados de perícia classificados.</p>` },
      inventario: { title: "Inventário", html: `<p>Inventário de comando não exibido.</p>` },
      relacoes: { title: "Relações", html: `<p>Relações de comando serão exibidas no arquivo secreto do Klint.</p>` },
      ordo: { title: "O que a Ordo acha", html: `<p>Klint é o peso da decisão. Para muitos agentes, ele parece frio. Para quem conhece a verdade, ele é alguém tentando carregar sangue demais nas mãos.</p>` }
    }
  }
};

function login() {
  const codeInput = document.getElementById("agentCode");
  const passwordInput = document.getElementById("agentPassword");

  const code = codeInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  if (!code) {
    alert("Insira um código de agente.");
    return;
  }

  if (code === "mestre" && password === "coracoes") {
    masterAccess = true;

    localStorage.setItem("ordoAccessLevel", "mestre");
    localStorage.setItem("ordoAccessName", "Mestre");

    document.getElementById("accessName").textContent = "Mestre";
    unlockSecrets();
  } else {
    masterAccess = false;

    localStorage.setItem("ordoAccessLevel", "visitante");
    localStorage.setItem("ordoAccessName", "Visitante");

    document.getElementById("accessName").textContent = "Visitante";
    lockSecrets();
  }

  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
}

function logout() {
  masterAccess = false;

  localStorage.removeItem("ordoAccessLevel");
  localStorage.removeItem("ordoAccessName");

  const codeInput = document.getElementById("agentCode");
  const passwordInput = document.getElementById("agentPassword");

  if (codeInput) codeInput.value = "";
  if (passwordInput) passwordInput.value = "";

  const dashboard = document.getElementById("dashboard");
  const loginScreen = document.getElementById("loginScreen");

  if (dashboard) dashboard.classList.add("hidden");
  if (loginScreen) loginScreen.classList.remove("hidden");

  lockSecrets();
}

function unlockSecrets() {
  const secretCards = document.querySelectorAll(".secret");

  secretCards.forEach((card) => {
    card.classList.remove("locked");

    const lockLabel = card.querySelector(".lock-label");

    if (lockLabel) {
      lockLabel.textContent = "Liberado";
      lockLabel.style.color = "#b889ff";
    }
  });
}

function lockSecrets() {
  const secretCards = document.querySelectorAll(".secret");

  secretCards.forEach((card) => {
    card.classList.add("locked");

    const lockLabel = card.querySelector(".lock-label");

    if (lockLabel) {
      lockLabel.textContent = "Bloqueado";
      lockLabel.style.color = "#ff5555";
    }
  });
}

function openModule(moduleName) {
  const page = routes[moduleName];

  if (!page) {
    alert("Módulo não encontrado: " + moduleName);
    return;
  }

  window.location.href = page;
}

function openSecretModule(moduleName) {
  const accessLevel = localStorage.getItem("ordoAccessLevel");
  const isMaster = accessLevel === "mestre";

  if (!isMaster) {
    alert(
      "ACESSO NEGADO\n\nO arquivo '" +
        moduleName +
        "' exige autorização de mestre."
    );
    return;
  }

  const page = routes[moduleName];

  if (!page) {
    alert("Arquivo secreto não encontrado: " + moduleName);
    return;
  }

  window.location.href = page;
}

function checkSavedAccess() {
  const accessLevel = localStorage.getItem("ordoAccessLevel");
  const accessName = localStorage.getItem("ordoAccessName");

  const accessNameElement = document.getElementById("accessName");
  const loginScreen = document.getElementById("loginScreen");
  const dashboard = document.getElementById("dashboard");

  if (!accessNameElement || !loginScreen || !dashboard) {
    return;
  }

  if (accessLevel === "mestre") {
    masterAccess = true;

    accessNameElement.textContent = accessName || "Mestre";

    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");

    unlockSecrets();
    return;
  }

  if (accessLevel === "visitante") {
    masterAccess = false;

    accessNameElement.textContent = accessName || "Visitante";

    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");

    lockSecrets();
  }
}

function protectSecretPage() {
  const accessLevel = localStorage.getItem("ordoAccessLevel");

  if (accessLevel !== "mestre") {
    alert("ACESSO NEGADO\n\nEsta página exige autorização de mestre.");
    window.location.href = "../index.html";
  }
}

function openAgent(agentId) {
  window.location.href = "agente.html?id=" + agentId;
}

function goToAgents() {
  window.location.href = "agentes.html";
}

function goBack() {
  window.location.href = "../index.html";
}

function getCurrentAgentId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function applyAgentTheme(agent) {
  const root = document.documentElement;

  root.style.setProperty("--agent-main", agent.theme.main);
  root.style.setProperty("--agent-secondary", agent.theme.secondary);
  root.style.setProperty("--agent-glow", agent.theme.glow);
}

function clearAgentModes() {
  const page = document.getElementById("agentPage");

  if (!page) return;

  page.classList.remove("yuna-mode");
}

function applyAgentMode(agent) {
  const page = document.getElementById("agentPage");

  if (!page) return;

  clearAgentModes();

  if (agent.modeClass) {
    page.classList.add(agent.modeClass);
  }
}

function createYunaParticles(agent) {
  const layer = document.getElementById("specialFxLayer");

  if (!layer) return;

  layer.innerHTML = "";

  if (agent.id !== "yuna") return;

  for (let i = 0; i < 42; i++) {
    const particle = document.createElement("span");
    particle.classList.add("death-particle");

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 5 + Math.random() * 8 + "s";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.opacity = 0.15 + Math.random() * 0.45;

    layer.appendChild(particle);
  }

  const echoes = [
    "ele lembrou de mim",
    "o instante antes do fim",
    "registro da ruína",
    "não voltou inteira",
    "camada da realidade",
    "ponto de ruptura"
  ];

  for (let i = 0; i < 10; i++) {
    const echo = document.createElement("span");
    echo.classList.add("yuna-memory-echo");

    echo.textContent = echoes[i % echoes.length];
    echo.style.top = 8 + Math.random() * 84 + "%";
    echo.style.animationDuration = 12 + Math.random() * 12 + "s";
    echo.style.animationDelay = Math.random() * 8 + "s";

    layer.appendChild(echo);
  }
}

function renderSpecialBanner(agent) {
  const banner = document.getElementById("specialDossierBanner");

  if (!banner) return;

  if (!agent.banner) {
    banner.classList.add("hidden");
    return;
  }

  banner.classList.remove("hidden");

  document.getElementById("specialBannerLabel").textContent = agent.banner.label;
  document.getElementById("specialBannerTitle").textContent = agent.banner.title;
  document.getElementById("specialBannerText").textContent = agent.banner.text;
}

function renderDerivedStats(agent) {
  const derived = agent.derived || {};

  document.getElementById("statLife").textContent = derived.life || "---";
  document.getElementById("statDetermination").textContent = derived.determination || "---";
  document.getElementById("statDefense").textContent = derived.defense || "---";
  document.getElementById("statDodge").textContent = derived.dodge || "---";
  document.getElementById("statRitualDT").textContent = derived.ritualDT || "---";
  document.getElementById("statPE").textContent = derived.peTurn || "---";
}

function renderAgentPage() {
  const agentPage = document.getElementById("agentPage");

  if (!agentPage) {
    return;
  }

  const agentId = getCurrentAgentId();
  const agent = agentsData[agentId];

  if (!agent) {
    document.getElementById("agentName").textContent = "Arquivo não encontrado";
    document.getElementById("agentName").setAttribute("data-text", "Arquivo não encontrado");
    document.getElementById("agentStatus").textContent = "Erro — registro inexistente";
    document.getElementById("agentDescription").textContent =
      "O identificador solicitado não corresponde a nenhum agente registrado.";
    return;
  }

  currentAgent = agent;

  applyAgentTheme(agent);
  applyAgentMode(agent);
  createYunaParticles(agent);
  renderSpecialBanner(agent);

  document.title = agent.name + " — Arquivo Ordo Realitas";

  document.getElementById("agentName").textContent = agent.name;
  document.getElementById("agentName").setAttribute("data-text", agent.name);

  document.getElementById("agentStatus").textContent = agent.status;
  document.getElementById("agentDescription").textContent = agent.description;

  document.getElementById("agentClass").textContent = agent.className;
  document.getElementById("agentOrigin").textContent = agent.origin;
  document.getElementById("agentNex").textContent = agent.nex;
  document.getElementById("agentRank").textContent = agent.rank;

  document.getElementById("attrFOR").textContent = agent.attributes.FOR;
  document.getElementById("attrAGI").textContent = agent.attributes.AGI;
  document.getElementById("attrINT").textContent = agent.attributes.INT;
  document.getElementById("attrPRE").textContent = agent.attributes.PRE;
  document.getElementById("attrVIG").textContent = agent.attributes.VIG;

  renderDerivedStats(agent);

  document.getElementById("agentImage").src = agent.image;
  document.getElementById("agentImage").alt = "Render de " + agent.name;

  document.getElementById("agentCodename").textContent = agent.codename;
  document.getElementById("agentAccessStamp").textContent =
    agent.status.toLowerCase().includes("restrito") ? "RESTRITO" : "LIBERADO";

  changeFolder("descricao");
}

function changeFolder(folderId) {
  if (!currentAgent || !currentAgent.folders[folderId]) {
    return;
  }

  const folder = currentAgent.folders[folderId];

  document.getElementById("folderTitle").textContent = folder.title;
  document.getElementById("folderLabel").textContent = "Pasta aberta — " + folder.title;
  document.getElementById("folderBody").innerHTML = folder.html;

  const tabs = document.querySelectorAll(".folder-tab");

  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  const clickedTab = Array.from(tabs).find((tab) => {
    return tab.textContent.trim().toLowerCase() === folder.title.toLowerCase();
  });

  if (clickedTab) {
    clickedTab.classList.add("active");
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const loginScreen = document.getElementById("loginScreen");

    if (loginScreen && !loginScreen.classList.contains("hidden")) {
      login();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  checkSavedAccess();
  renderAgentPage();
});
function setupYunaAttributeCenterIcon() {
  const agentPage = document.getElementById("agentPage");

  if (!agentPage || !agentPage.classList.contains("yuna-mode")) {
    return;
  }

  const coreImage = document.querySelector(".yuna-wheel-core-img");
  const attributeNodes = document.querySelectorAll(".attribute-node");

  if (!coreImage || attributeNodes.length === 0) {
    return;
  }

  const originalCoreSrc = "../assets/imagens/rodas/yuna/Roda-Yuna-Nucleo.png";

  attributeNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const icon = node.querySelector(".attribute-icon");

      attributeNodes.forEach((item) => {
        item.classList.remove("selected-attribute");
      });

      node.classList.add("selected-attribute");

      if (icon && icon.getAttribute("src")) {
        coreImage.src = icon.getAttribute("src");
        coreImage.classList.add("attribute-core-active");
      }
    });
  });

  coreImage.addEventListener("click", () => {
    coreImage.src = originalCoreSrc;
    coreImage.classList.remove("attribute-core-active");

    attributeNodes.forEach((item) => {
      item.classList.remove("selected-attribute");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(setupYunaAttributeCenterIcon, 100);
});
function setupYunaAttributeInsightPanel() {
  const agentPage = document.getElementById("agentPage");

  if (!agentPage || !agentPage.classList.contains("yuna-mode")) {
    return;
  }

  const insightPanel = document.getElementById("attributeInsightPanel");
  const insightName = document.getElementById("attributeInsightName");
  const insightValue = document.getElementById("attributeInsightValue");
  const insightText = document.getElementById("attributeInsightText");

  if (!insightPanel || !insightName || !insightValue || !insightText) {
    return;
  }

  const yunaAttributeInsights = {
    FOR: {
      name: "FOR — Força",
      text: "Força física baixa. Yuna não vence pela brutalidade; ela evita confronto direto e transforma distância, leitura e ritual em sobrevivência."
    },
    AGI: {
      name: "AGI — Agilidade",
      text: "Boa reação corporal. A agilidade de Yuna não parece explosiva, mas precisa: ela se move como alguém que percebe o perigo um instante antes."
    },
    INT: {
      name: "INT — Intelecto",
      text: "O centro operacional da Yuna. Análise paranormal, leitura de rituais, identificação de manifestações e interpretação de pontos de ruptura."
    },
    PRE: {
      name: "PRE — Presença",
      text: "Presença baixa no sentido social, mas inquietante. Yuna não domina uma sala pela fala; ela pesa no ambiente pelo silêncio."
    },
    VIG: {
      name: "VIG — Vigor",
      text: "Resistência limitada. O corpo de Yuna sobreviveu ao Outro Lado, mas continua sendo um lembrete de que sobreviver não é sair inteiro."
    }
  };

  const attributeNodes = document.querySelectorAll(".attribute-node");

  attributeNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const label = node.querySelector("span");
      const value = node.querySelector("strong");

      if (!label || !value) {
        return;
      }

      const key = label.textContent.trim().toUpperCase();
      const data = yunaAttributeInsights[key];

      if (!data) {
        return;
      }

      insightName.textContent = data.name;
      insightValue.textContent = value.textContent.trim();
      insightText.textContent = data.text;

      insightPanel.classList.remove("active-insight");

      void insightPanel.offsetWidth;

      insightPanel.classList.add("active-insight");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(setupYunaAttributeInsightPanel, 150);
});

/* MAISIE 1.0 PREMIUM — DADOS, RODA E INTERAÇÃO */

if (typeof agentsData !== "undefined" && agentsData.maisie) {
  agentsData.maisie.modeClass = "maisie-mode";

  agentsData.maisie.description =
    "Ocultista tecnológica marcada por Energia. Recruta da Ordo, enviada para Santa Luzia na primeira missão oficial.";

  agentsData.maisie.status = "Arquivo liberado — Recruta / Personagem Jogador";

  agentsData.maisie.theme = {
    main: "#ff4abe",
    secondary: "#00b4ff",
    glow: "rgba(255, 74, 190, 0.26)"
  };

  agentsData.maisie.banner = {
    label: "Registro de jogador — acesso liberado",
    title: "Eu transformo o caos em arma.",
    text: "Ficha pública de personagem jogador. Registro inicial da Ordo após recrutamento para Corações do Outro Lado."
  };

  agentsData.maisie.className = "Ocultista";
  agentsData.maisie.origin = "Agente de Saúde";
  agentsData.maisie.nex = "40%";
  agentsData.maisie.rank = "Recruta";

  agentsData.maisie.attributes = {
    FOR: 1,
    AGI: 1,
    INT: 3,
    PRE: 3,
    VIG: 2
  };

  agentsData.maisie.derived = {
    life: "42 / 42",
    determination: "69 / 69",
    defense: "11",
    dodge: "21",
    ritualDT: "21",
    peTurn: "8"
  };

  agentsData.maisie.folders = {
    descricao: {
      title: "Descrição",
      html: `
        <p>Maisie Hundown é uma recruta da Ordo Realitas em Corações do Outro Lado. Ela chega à primeira missão oficial carregando uma história anterior com o paranormal, mas sem histórico operacional formal dentro da organização.</p>

        <p>Seu conceito central é o de uma ocultista tecnológica marcada por Energia, alguém que transformou perda, sobrevivência e criatividade em ferramenta de combate e suporte.</p>

        <p>Visualmente, Maisie mistura invenção, improviso, caos e controle: roxo neon, metal, circuitos, fogo rosa, tanque ritualístico, braço mecânico e uma energia elétrica quase inquieta ao redor da ficha.</p>

        <div class="lore-quote">“Eu transformo o caos em arma.”</div>

        <div class="data-cluster">
          <div class="data-chip"><span>Jogador</span><strong>Caio</strong></div>
          <div class="data-chip"><span>Função</span><strong>Ocultista ofensiva / suporte</strong></div>
          <div class="data-chip"><span>Elemento visual</span><strong>Energia</strong></div>
          <div class="data-chip"><span>Status</span><strong>Recruta</strong></div>
          <div class="data-chip"><span>Vínculo</span><strong>Primeira missão oficial</strong></div>
          <div class="data-chip"><span>Risco</span><strong>Instabilidade sob pressão</strong></div>
        </div>
      `
    },

    habilidades: {
      title: "Habilidades",
      html: `
        <div class="skill-list">
          <article class="skill-item">
            <h3>Escolhido pelo Outro Lado</h3>
            <p>Maisie foi marcada pelo paranormal e consegue conjurar rituais. No estado atual, possui acesso operacional a rituais de até 2º círculo.</p>
          </article>

          <article class="skill-item">
            <h3>Ritual Predileto</h3>
            <p>Seu ritual predileto registrado é Cicatrização, reduzindo seu custo e reforçando sua função de suporte emergencial.</p>
          </article>

          <article class="skill-item">
            <h3>Técnica Medicinal</h3>
            <p>Quando cura alguém, adiciona seu Intelecto no total de PV recuperados. Em Maisie, conhecimento médico e ocultismo se cruzam diretamente.</p>
          </article>

          <article class="skill-item">
            <h3>Treinamento em Perícia</h3>
            <p>Seu perfil técnico reforça medicina, tecnologia, ocultismo, percepção e reflexos em situações de risco.</p>
          </article>
        </div>
      `
    },

    trilha: {
      title: "Trilha",
      html: `
        <p><strong>Lâmina Paranormal.</strong> A trilha de Maisie conecta arma, ocultismo, Energia e tecnologia pessoal.</p>

        <div class="skill-list">
          <article class="skill-item">
            <h3>NEX 10% — Lâmina Maldita</h3>
            <p>Maisie aprende Amaldiçoar Arma e pode usar Ocultismo no lugar de Luta ou Pontaria ao atacar com uma arma amaldiçoada.</p>
          </article>

          <article class="skill-item">
            <h3>NEX 40% — Gladiador Paranormal</h3>
            <p>Cada impacto em combate se torna combustível paranormal. A agressividade vira recurso, e o corpo da missão vira circuito.</p>
          </article>
        </div>
      `
    },

    rituais: {
      title: "Rituais",
      html: `
        <div class="ritual-grid">
          <div class="ritual-folder ritual-energia">
            <small>Energia — 1º Círculo</small>
            <h3>Amaldiçoar Arma</h3>
            <p>Maisie imbui arma ou munição com Energia, conectando combate, tecnologia e ocultismo aplicado.</p>
          </div>

          <div class="ritual-folder ritual-energia">
            <small>Energia — 1º Círculo</small>
            <h3>Embaralhar</h3>
            <p>Cria cópias ilusórias semelhantes a hologramas, dificultando que inimigos identifiquem a verdadeira Maisie.</p>
          </div>

          <div class="ritual-folder ritual-energia">
            <small>Energia — 1º Círculo</small>
            <h3>Polarização Caótica</h3>
            <p>Gera uma aura magnética sobrenatural, permitindo atrair, repelir ou manipular objetos e pressão cinética.</p>
          </div>

          <div class="ritual-folder ritual-energia">
            <small>Energia — 2º Círculo</small>
            <h3>Rajada Caótica</h3>
            <p>Concentra estática paranormal e projeta uma descarga de Energia contra um alvo.</p>
          </div>

          <div class="ritual-folder ritual-morte">
            <small>Morte — 1º Círculo</small>
            <h3>Cicatrização</h3>
            <p>Ritual predileto de Maisie. Cura ferimentos acelerando o tempo ao redor da carne, com custo narrativo ligado à Morte.</p>
          </div>

          <div class="ritual-folder ritual-sangue">
            <small>Sangue</small>
            <h3>Nenhum ritual registrado</h3>
            <p>A ficha atual de Maisie não registra rituais de Sangue.</p>
          </div>

          <div class="ritual-folder ritual-conhecimento">
            <small>Conhecimento</small>
            <h3>Nenhum ritual registrado</h3>
            <p>A ficha atual de Maisie não registra rituais de Conhecimento.</p>
          </div>

          <div class="ritual-folder ritual-medo">
            <small>Medo</small>
            <h3>Acesso bloqueado</h3>
            <p>Dados ligados a Medo não devem ser exibidos em registros comuns.</p>
          </div>
        </div>
      `
    },

    pericias: {
      title: "Perícias",
      html: `
        <p>Perícias principais registradas na ficha mecânica de Maisie. O foco evidente está em medicina, ocultismo, tecnologia, percepção e resposta rápida.</p>

        <table class="pericia-table">
          <thead>
            <tr>
              <th>Perícia</th>
              <th>Atributo</th>
              <th>Bônus</th>
            </tr>
          </thead>

          <tbody>
            <tr><td>Medicina</td><td>INT</td><td>+10</td></tr>
            <tr><td>Ocultismo</td><td>INT</td><td>+10</td></tr>
            <tr><td>Percepção</td><td>PRE</td><td>+10</td></tr>
            <tr><td>Reflexos</td><td>AGI</td><td>+10</td></tr>
            <tr><td>Tecnologia</td><td>INT</td><td>+10</td></tr>
            <tr><td>Vontade</td><td>PRE</td><td>+10</td></tr>
            <tr><td>Diplomacia</td><td>PRE</td><td>+5</td></tr>
            <tr><td>Iniciativa</td><td>AGI</td><td>+5</td></tr>
            <tr><td>Intuição</td><td>PRE</td><td>+5</td></tr>
            <tr><td>Investigação</td><td>INT</td><td>+5</td></tr>
          </tbody>
        </table>
      `
    },

    inventario: {
      title: "Inventário",
      html: `
        <p><strong>Itens registrados:</strong> balas curtas, cicatrizante, pistola e tanque ritualístico.</p>

        <p>O tanque ritualístico é um acessório roxo conectado ao canhão no braço de Maisie, adaptado para comportar componentes ritualísticos de Energia.</p>

        <p>O braço mecânico, o canhão e o tanque não são só equipamento: funcionam como extensão identitária, ferramenta de combate e símbolo de reconstrução.</p>

        <div class="lore-quote">Não tratem a prótese como arma. Não tratem o interesse por Energia como simples especialização.</div>
      `
    },

    relacoes: {
      title: "Relações",
      html: `
        <p><strong>Walt:</strong> primeiro robô criado por Maisie. Mesmo que não esteja presente em operações atuais, representa o momento em que ela passou a se reconhecer como criadora.</p>

        <p><strong>Professor não identificado:</strong> figura relevante no primeiro contato paranormal de Maisie. Ele a salvou e abriu a primeira explicação sobre a existência do paranormal.</p>

        <p><strong>Equipe anterior:</strong> a missão no hospital abandonado terminou com Maisie como única sobrevivente. Esse evento reforçou sua ligação com Energia e sua tendência a transformar trauma em função.</p>
      `
    },

    ordo: {
      title: "O que a Ordo acha",
      html: `
        <p>A Ordo Realitas avalia Maisie como agente de alto valor operacional e risco moderado de instabilidade sob gatilhos específicos.</p>

        <p>Sua utilidade em campo é evidente em ocorrências envolvendo tecnologia, Energia e ambientes imprevisíveis. Ainda assim, sua relação com aquilo que manipula é pessoal demais para ser ignorada.</p>

        <div class="data-cluster">
          <div class="data-chip"><span>Status</span><strong>Recrutamento aceito</strong></div>
          <div class="data-chip"><span>Atuação</span><strong>Aprovada com ressalvas</strong></div>
          <div class="data-chip"><span>Monitoramento</span><strong>Técnico e psicológico</strong></div>
          <div class="data-chip"><span>Equipamento pessoal</span><strong>Não confiscar sem necessidade</strong></div>
        </div>

        <div class="lore-quote">Alguns agentes correm porque querem vencer. Maisie corre porque, se parar, talvez precise admitir o quanto perdeu.</div>
      `
    }
  };
}

function applyCharacterWheelAssets() {
  const agentPage = document.getElementById("agentPage");

  if (!agentPage || !currentAgent) {
    return;
  }

  const wheelConfig = {
    yuna: {
      folder: "yuna",
      prefix: "Yuna"
    },
    maisie: {
      folder: "maisie",
      prefix: "Maisie"
    }
  };

  const config = wheelConfig[currentAgent.id];

  if (!config) {
    return;
  }

  const basePath = `../assets/imagens/rodas/${config.folder}/`;

  const outer = document.querySelector(".yuna-wheel-outer");
  const inner = document.querySelector(".yuna-wheel-inner");
  const core = document.querySelector(".yuna-wheel-core-img");

  const nodeImages = document.querySelectorAll(".yuna-node-bg");

  const iconFOR = document.querySelector(".node-for .attribute-icon");
  const iconAGI = document.querySelector(".node-agi .attribute-icon");
  const iconINT = document.querySelector(".node-int .attribute-icon");
  const iconPRE = document.querySelector(".node-pre .attribute-icon");
  const iconVIG = document.querySelector(".node-vig .attribute-icon");

  if (outer) outer.src = `${basePath}Roda-${config.prefix}-Anel-Externo.png`;
  if (inner) inner.src = `${basePath}Roda-${config.prefix}-Anel-Interno.png`;
  if (core) {
    core.src = `${basePath}Roda-${config.prefix}-Nucleo.png`;
    core.dataset.originalCore = `${basePath}Roda-${config.prefix}-Nucleo.png`;
  }

  nodeImages.forEach((img) => {
    img.src = `${basePath}Roda-${config.prefix}-No.png`;
  });

  if (iconFOR) iconFOR.src = `${basePath}Icone-${config.prefix}-FOR.png`;
  if (iconAGI) iconAGI.src = `${basePath}Icone-${config.prefix}-AGI.png`;
  if (iconINT) iconINT.src = `${basePath}Icone-${config.prefix}-INT.png`;
  if (iconPRE) iconPRE.src = `${basePath}Icone-${config.prefix}-PRE.png`;
  if (iconVIG) iconVIG.src = `${basePath}Icone-${config.prefix}-VIG.png`;
}

function setupCharacterAttributeInteractions() {
  const agentPage = document.getElementById("agentPage");

  if (!agentPage || !currentAgent) {
    return;
  }

  const coreImage = document.querySelector(".yuna-wheel-core-img");
  const attributeNodes = document.querySelectorAll(".attribute-node");

  const insightPanel = document.getElementById("attributeInsightPanel");
  const insightName = document.getElementById("attributeInsightName");
  const insightValue = document.getElementById("attributeInsightValue");
  const insightText = document.getElementById("attributeInsightText");

  if (!coreImage || attributeNodes.length === 0) {
    return;
  }

  const insightByAgent = {
    yuna: {
      FOR: {
        name: "FOR — Força",
        text: "Força física baixa. Yuna não vence pela brutalidade; ela evita confronto direto e transforma distância, leitura e ritual em sobrevivência."
      },
      AGI: {
        name: "AGI — Agilidade",
        text: "Boa reação corporal. A agilidade de Yuna não parece explosiva, mas precisa: ela se move como alguém que percebe o perigo um instante antes."
      },
      INT: {
        name: "INT — Intelecto",
        text: "O centro operacional da Yuna. Análise paranormal, leitura de rituais, identificação de manifestações e interpretação de pontos de ruptura."
      },
      PRE: {
        name: "PRE — Presença",
        text: "Presença baixa no sentido social, mas inquietante. Yuna não domina uma sala pela fala; ela pesa no ambiente pelo silêncio."
      },
      VIG: {
        name: "VIG — Vigor",
        text: "Resistência limitada. O corpo de Yuna sobreviveu ao Outro Lado, mas continua sendo um lembrete de que sobreviver não é sair inteiro."
      }
    },

    maisie: {
      FOR: {
        name: "FOR — Força",
        text: "Baixa força bruta. A ameaça real de Maisie não está no músculo, mas no canhão, nos rituais, na inteligência e na forma como converte trauma em ferramenta."
      },
      AGI: {
        name: "AGI — Agilidade",
        text: "Mobilidade e reflexos não são seu ponto principal. Maisie compensa isso com preparação, tecnologia, leitura rápida e improviso sob pressão."
      },
      INT: {
        name: "INT — Intelecto",
        text: "Um dos centros da ficha. Robótica, medicina, ocultismo, tecnologia e análise técnica se misturam no modo como Maisie entende o paranormal."
      },
      PRE: {
        name: "PRE — Presença",
        text: "Carisma, intensidade e impacto social fortes. Maisie convence, provoca, improvisa e ocupa espaço mesmo quando tenta agir do próprio jeito."
      },
      VIG: {
        name: "VIG — Vigor",
        text: "Resistência acima do mínimo. O corpo dela já foi atravessado por perda, reconstrução e Energia, mas ainda continua funcionando."
      }
    }
  };

  const agentInsights = insightByAgent[currentAgent.id] || {};

  attributeNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const label = node.querySelector("span");
      const value = node.querySelector("strong");
      const icon = node.querySelector(".attribute-icon");

      if (!label || !value) {
        return;
      }

      const key = label.textContent.trim().toUpperCase();
      const data = agentInsights[key];

      attributeNodes.forEach((item) => {
        item.classList.remove("selected-attribute");
      });

      node.classList.add("selected-attribute");

      if (icon && icon.getAttribute("src")) {
        coreImage.src = icon.getAttribute("src");
        coreImage.classList.add("attribute-core-active");
      }

      if (data && insightPanel && insightName && insightValue && insightText) {
        insightName.textContent = data.name;
        insightValue.textContent = value.textContent.trim();
        insightText.textContent = data.text;

        insightPanel.classList.remove("active-insight");
        void insightPanel.offsetWidth;
        insightPanel.classList.add("active-insight");
      }
    });
  });

  coreImage.addEventListener("click", () => {
    const originalCore = coreImage.dataset.originalCore;

    if (originalCore) {
      coreImage.src = originalCore;
    }

    coreImage.classList.remove("attribute-core-active");

    attributeNodes.forEach((item) => {
      item.classList.remove("selected-attribute");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    applyCharacterWheelAssets();
    setupCharacterAttributeInteractions();
  }, 250);
});
function createMaisiePageWideEffects() {
  const agentPage = document.getElementById("agentPage");
  const layer = document.getElementById("specialFxLayer");

  if (!agentPage || !layer || !agentPage.classList.contains("maisie-mode")) {
    return;
  }

  for (let i = 0; i < 18; i++) {
    const spark = document.createElement("span");
    spark.classList.add("maisie-wide-spark");

    spark.style.left = Math.random() * 100 + "%";
    spark.style.animationDuration = 4 + Math.random() * 6 + "s";
    spark.style.animationDelay = Math.random() * 6 + "s";

    layer.appendChild(spark);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(createMaisiePageWideEffects, 450);
});
/* ROSELYN 1.0 PREMIUM — DADOS, RODA E INTERAÇÃO */

if (typeof agentsData !== "undefined") {
  agentsData.roselyn = {
    ...(agentsData.roselyn || {}),

    id: "roselyn",
    name: "Roselyn Tate",
    codename: "ROSELYN TATE",
    image: "../assets/imagens/agentes/roselyn.png",

    modeClass: "roselyn-mode",

    description:
      "Especialista militar. Atiradora de precisão marcada por Morte, metrônomo de prata e distorções temporais.",

    status: "Arquivo liberado — Recruta / Personagem Jogador",

    theme: {
      main: "#d7d1e8",
      secondary: "#7a5bb8",
      glow: "rgba(215, 209, 232, 0.20)"
    },

    banner: {
      label: "Registro de jogador — acesso liberado",
      title: "O metrônomo ainda está batendo.",
      text: "Ficha pública de personagem jogador. Registro consolidado a partir da ficha bruta e do dossiê narrativo da Ordo."
    },

    className: "Especialista",
    origin: "Militar",
    nex: "40%",
    rank: "Recruta",

    attributes: {
      FOR: 2,
      AGI: 3,
      INT: 2,
      PRE: 1,
      VIG: 2
    },

    derived: {
      life: "53 / 53",
      determination: "44 / 44",
      defense: "13",
      dodge: "23",
      ritualDT: "—",
      peTurn: "8"
    },

    folders: {
      descricao: {
        title: "Descrição",
        html: `
          <p>Roselyn Tate é uma especialista militar da Ordo Realitas, recrutada após sobreviver ao incidente paranormal que destruiu a mansão Tate e apagou sua família.</p>

          <p>Seu perfil combina precisão, provocação, leitura tática e uma relação incomum com o tempo. Ela não mira apenas no corpo do alvo: ela observa o intervalo entre ação, consequência e morte.</p>

          <p>Visualmente, Roselyn carrega uma identidade fria e antiga: prata oxidada, preto, roxo escuro, rifle de precisão, metrônomo, memória familiar e elegância tensa.</p>

          <div class="lore-quote">“O metrônomo ainda está batendo.”</div>

          <div class="data-cluster">
            <div class="data-chip"><span>Jogador</span><strong>Erick</strong></div>
            <div class="data-chip"><span>Função</span><strong>Atiradora / reconhecimento</strong></div>
            <div class="data-chip"><span>Elemento visual</span><strong>Morte / Tempo</strong></div>
            <div class="data-chip"><span>Status</span><strong>Recruta</strong></div>
            <div class="data-chip"><span>Arma principal</span><strong>Fuzil de Precisão</strong></div>
            <div class="data-chip"><span>Objeto central</span><strong>Metrônomo de Prata</strong></div>
          </div>
        `
      },

      habilidades: {
        title: "Habilidades",
        html: `
          <div class="skill-list">
            <article class="skill-item">
              <h3>Eclético</h3>
              <p>Roselyn consegue adaptar treinamento e instinto para lidar com situações fora do preparo padrão, recebendo benefícios temporários em perícias quando necessário.</p>
            </article>

            <article class="skill-item">
              <h3>Perito</h3>
              <p>Especialista em transformar perícias treinadas em vantagem real. Em campo, isso reforça investigação, percepção, tecnologia e leitura tática.</p>
            </article>

            <article class="skill-item">
              <h3>Point Blank</h3>
              <p>Roselyn aprendeu a usar o peso do rifle a seu favor mesmo em alcance curto. O disparo deixa de ser apenas precisão distante e vira impacto físico controlado.</p>
            </article>

            <article class="skill-item">
              <h3>Visão de Ouro</h3>
              <p>Sua leitura analítica encontra brechas na defesa de alvos e falhas em mecanismos. Quando Roselyn entende o padrão, a equipe inteira passa a enxergar melhor onde atacar.</p>
            </article>
          </div>
        `
      },

      trilha: {
        title: "Trilha",
        html: `
          <p><strong>Trilha personalizada — Balística Temporal.</strong> Roselyn usa o metrônomo como foco para transformar disparos em eventos parcialmente suspensos no tempo.</p>

          <div class="skill-list">
            <article class="skill-item">
              <h3>NEX 10% — Balística Residual</h3>
              <p>Quando está furtiva, Roselyn dispara através de um hiato temporal. O tiro não revela sua posição e o som é substituído pelo tique-taque seco do metrônomo, audível apenas para o alvo.</p>
            </article>

            <article class="skill-item">
              <h3>NEX 40% — Tiro de Schrödinger</h3>
              <p>Roselyn pode acertar um tiro e suspender seu efeito no tempo. O dano não acontece imediatamente; fica orbitando o alvo como uma consequência esperando permissão para existir.</p>
            </article>
          </div>
        `
      },

      rituais: {
        title: "Rituais",
        html: `
          <div class="ritual-grid">
            <div class="ritual-folder ritual-morte">
              <small>Morte — Vínculo anômalo</small>
              <h3>Metrônomo de Prata</h3>
              <p>Roselyn não possui rituais registrados, mas sua relação com o metrônomo demonstra contato direto com percepção temporal associada à Morte.</p>
            </div>

            <div class="ritual-folder ritual-morte">
              <small>Morte — Percepção</small>
              <h3>Lente de Prata Oxidada</h3>
              <p>A luneta adaptada ao rifle permite perceber distorções temporais ao redor de seres vivos, transformando memória, mira e morte em uma única linha de visão.</p>
            </div>

            <div class="ritual-folder ritual-conhecimento">
              <small>Conhecimento</small>
              <h3>Nenhum ritual registrado</h3>
              <p>Roselyn demonstra raciocínio tático e técnico, mas não há ritual formal de Conhecimento registrado.</p>
            </div>

            <div class="ritual-folder ritual-energia">
              <small>Energia</small>
              <h3>Nenhum ritual registrado</h3>
              <p>A ficha atual não registra rituais de Energia.</p>
            </div>

            <div class="ritual-folder ritual-sangue">
              <small>Sangue</small>
              <h3>Nenhum ritual registrado</h3>
              <p>A ficha atual não registra rituais de Sangue.</p>
            </div>

            <div class="ritual-folder ritual-medo">
              <small>Medo</small>
              <h3>Acesso bloqueado</h3>
              <p>Dados ligados a Medo não devem ser exibidos em registros comuns.</p>
            </div>
          </div>
        `
      },

      pericias: {
        title: "Perícias",
        html: `
          <p>Roselyn tem foco evidente em pontaria, reflexos, furtividade, tática, investigação e observação. A ficha aponta uma agente feita para cobertura, reconhecimento e disparos calculados.</p>

          <table class="pericia-table">
            <thead>
              <tr>
                <th>Perícia</th>
                <th>Atributo</th>
                <th>Bônus</th>
              </tr>
            </thead>

            <tbody>
              <tr><td>Pontaria</td><td>AGI</td><td>+10</td></tr>
              <tr><td>Reflexos</td><td>AGI</td><td>+10</td></tr>
              <tr><td>Tática</td><td>INT</td><td>+10</td></tr>
              <tr><td>Furtividade</td><td>AGI</td><td>+10</td></tr>
              <tr><td>Acrobacia</td><td>AGI</td><td>+5</td></tr>
              <tr><td>Atletismo</td><td>FOR</td><td>+5</td></tr>
              <tr><td>Fortitude</td><td>VIG</td><td>+5</td></tr>
              <tr><td>Iniciativa</td><td>AGI</td><td>+5</td></tr>
              <tr><td>Intuição</td><td>PRE</td><td>+5</td></tr>
              <tr><td>Investigação</td><td>INT</td><td>+5</td></tr>
              <tr><td>Medicina</td><td>INT</td><td>+5</td></tr>
              <tr><td>Percepção</td><td>PRE</td><td>+5</td></tr>
              <tr><td>Tecnologia</td><td>INT</td><td>+5</td></tr>
              <tr><td>Vontade</td><td>PRE</td><td>+5</td></tr>
            </tbody>
          </table>
        `
      },

      inventario: {
        title: "Inventário",
        html: `
          <p><strong>Equipamentos registrados:</strong> fuzil de precisão, machado, balas longas, bandoleira, binóculos, computador, mochila militar, curativos, caderno e o Metrônomo de Prata.</p>

          <p><strong>Fuzil de Precisão:</strong> arma principal de Roselyn. O rifle carrega a Lente de Prata Oxidada, feita com fragmentos associados à mansão Tate.</p>

          <p><strong>O Metrônomo de Prata:</strong> objeto de categoria II associado à Morte. Enquanto segurado, reforça sua estabilidade mental e sua relação com Vontade.</p>

          <p><strong>Computador:</strong> usado para hackear sistemas e sobrecarregar aparelhos eletrônicos. Roselyn não é só mira; também atua em apoio técnico quando necessário.</p>

          <div class="lore-quote">O rifle não é substituível. A mira não é só mira. O metrônomo não é só objeto.</div>
        `
      },

      relacoes: {
        title: "Relações",
        html: `
          <p><strong>Família Tate:</strong> origem emocional, trauma central e motivação. A perda dos pais permanece como eixo silencioso de sua atuação.</p>

          <p><strong>Metrônomo de Prata:</strong> âncora psicológica, símbolo de sobrevivência e possível foco paranormal. Removê-lo sem preparo pode quebrar confiança ou estabilidade.</p>

          <p><strong>Rifle do pai:</strong> último vínculo físico com sua família. Roselyn observa ameaças através de algo que sobrou da própria casa.</p>

          <p><strong>Caderno pessoal:</strong> registros privados. A Ordo recomenda cautela antes de violar esse material, pois ele pode ser parte importante da organização emocional da agente.</p>
        `
      },

      ordo: {
        title: "O que a Ordo acha",
        html: `
          <p>A Ordo Realitas avalia Roselyn Tate como uma agente de alto valor estratégico, especialmente em reconhecimento, cobertura, leitura de movimentação inimiga e suporte tático.</p>

          <p>Ela não deve ser tratada como vítima incapaz, mas também não deve ser empurrada para missões que reproduzam diretamente o cenário da perda familiar sem preparo.</p>

          <div class="data-cluster">
            <div class="data-chip"><span>Status</span><strong>Recrutamento aprovado</strong></div>
            <div class="data-chip"><span>Risco</span><strong>Dependência de objetos</strong></div>
            <div class="data-chip"><span>Potencial</span><strong>Alto valor tático</strong></div>
            <div class="data-chip"><span>Monitoramento</span><strong>Metrônomo e rifle</strong></div>
          </div>

          <div class="lore-quote">Roselyn Tate mira como alguém que já perdeu tudo e aprendeu a esperar o mundo terminar antes de puxar o gatilho.</div>
        `
      }
    }
  };
}

function applyCharacterWheelAssets() {
  const agentPage = document.getElementById("agentPage");

  if (!agentPage || !currentAgent) {
    return;
  }

  const wheelConfig = {
    yuna: {
      folder: "yuna",
      prefix: "Yuna"
    },
    maisie: {
      folder: "maisie",
      prefix: "Maisie"
    },
    roselyn: {
      folder: "roselyn",
      prefix: "Roselyn"
    }
  };

  const config = wheelConfig[currentAgent.id];

  if (!config) {
    return;
  }

  const basePath = `../assets/imagens/rodas/${config.folder}/`;

  const outer = document.querySelector(".yuna-wheel-outer");
  const inner = document.querySelector(".yuna-wheel-inner");
  const core = document.querySelector(".yuna-wheel-core-img");

  const nodeImages = document.querySelectorAll(".yuna-node-bg");

  const iconFOR = document.querySelector(".node-for .attribute-icon");
  const iconAGI = document.querySelector(".node-agi .attribute-icon");
  const iconINT = document.querySelector(".node-int .attribute-icon");
  const iconPRE = document.querySelector(".node-pre .attribute-icon");
  const iconVIG = document.querySelector(".node-vig .attribute-icon");

  if (outer) outer.src = `${basePath}Roda-${config.prefix}-Anel-Externo.png`;
  if (inner) inner.src = `${basePath}Roda-${config.prefix}-Anel-Interno.png`;

  if (core) {
    core.src = `${basePath}Roda-${config.prefix}-Nucleo.png`;
    core.dataset.originalCore = `${basePath}Roda-${config.prefix}-Nucleo.png`;
  }

  nodeImages.forEach((img) => {
    img.src = `${basePath}Roda-${config.prefix}-No.png`;
  });

  if (iconFOR) iconFOR.src = `${basePath}Icone-${config.prefix}-FOR.png`;
  if (iconAGI) iconAGI.src = `${basePath}Icone-${config.prefix}-AGI.png`;
  if (iconINT) iconINT.src = `${basePath}Icone-${config.prefix}-INT.png`;
  if (iconPRE) iconPRE.src = `${basePath}Icone-${config.prefix}-PRE.png`;
  if (iconVIG) iconVIG.src = `${basePath}Icone-${config.prefix}-VIG.png`;
}

function setupCharacterAttributeInteractions() {
  const agentPage = document.getElementById("agentPage");

  if (!agentPage || !currentAgent) {
    return;
  }

  const coreImage = document.querySelector(".yuna-wheel-core-img");
  const attributeNodes = document.querySelectorAll(".attribute-node");

  const insightPanel = document.getElementById("attributeInsightPanel");
  const insightName = document.getElementById("attributeInsightName");
  const insightValue = document.getElementById("attributeInsightValue");
  const insightText = document.getElementById("attributeInsightText");

  if (!coreImage || attributeNodes.length === 0) {
    return;
  }

  const insightByAgent = {
    yuna: {
      FOR: {
        name: "FOR — Força",
        text: "Força física baixa. Yuna não vence pela brutalidade; ela evita confronto direto e transforma distância, leitura e ritual em sobrevivência."
      },
      AGI: {
        name: "AGI — Agilidade",
        text: "Boa reação corporal. A agilidade de Yuna não parece explosiva, mas precisa: ela se move como alguém que percebe o perigo um instante antes."
      },
      INT: {
        name: "INT — Intelecto",
        text: "O centro operacional da Yuna. Análise paranormal, leitura de rituais, identificação de manifestações e interpretação de pontos de ruptura."
      },
      PRE: {
        name: "PRE — Presença",
        text: "Presença baixa no sentido social, mas inquietante. Yuna não domina uma sala pela fala; ela pesa no ambiente pelo silêncio."
      },
      VIG: {
        name: "VIG — Vigor",
        text: "Resistência limitada. O corpo de Yuna sobreviveu ao Outro Lado, mas continua sendo um lembrete de que sobreviver não é sair inteiro."
      }
    },

    maisie: {
      FOR: {
        name: "FOR — Força",
        text: "Baixa força bruta. A ameaça real de Maisie não está no músculo, mas no canhão, nos rituais, na inteligência e na forma como converte trauma em ferramenta."
      },
      AGI: {
        name: "AGI — Agilidade",
        text: "Mobilidade e reflexos não são seu ponto principal. Maisie compensa isso com preparação, tecnologia, leitura rápida e improviso sob pressão."
      },
      INT: {
        name: "INT — Intelecto",
        text: "Um dos centros da ficha. Robótica, medicina, ocultismo, tecnologia e análise técnica se misturam no modo como Maisie entende o paranormal."
      },
      PRE: {
        name: "PRE — Presença",
        text: "Carisma, intensidade e impacto social fortes. Maisie convence, provoca, improvisa e ocupa espaço mesmo quando tenta agir do próprio jeito."
      },
      VIG: {
        name: "VIG — Vigor",
        text: "Resistência acima do mínimo. O corpo dela já foi atravessado por perda, reconstrução e Energia, mas ainda continua funcionando."
      }
    },

    roselyn: {
      FOR: {
        name: "FOR — Força",
        text: "Força funcional, mas não central. Roselyn usa o corpo como base de estabilidade para o rifle, não como principal forma de confronto."
      },
      AGI: {
        name: "AGI — Agilidade",
        text: "O atributo mais forte em combate. Reflexos, pontaria, furtividade e reposicionamento tornam Roselyn perigosa antes mesmo do alvo notar o disparo."
      },
      INT: {
        name: "INT — Intelecto",
        text: "Raciocínio tático e leitura de padrões. Roselyn entende cenários como sequências de tempo, linhas de mira e consequências possíveis."
      },
      PRE: {
        name: "PRE — Presença",
        text: "Presença social baixa, mas não ausência. Roselyn ocupa espaço pela provocação, pelo sotaque, pelo cigarro e pela tensão de quem está sempre calculando."
      },
      VIG: {
        name: "VIG — Vigor",
        text: "Resistência sólida. O corpo aguenta o campo, mas a verdadeira pressão em Roselyn costuma estar no que ela carrega por dentro."
      }
    }
  };

  const agentInsights = insightByAgent[currentAgent.id] || {};

  attributeNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const label = node.querySelector("span");
      const value = node.querySelector("strong");
      const icon = node.querySelector(".attribute-icon");

      if (!label || !value) {
        return;
      }

      const key = label.textContent.trim().toUpperCase();
      const data = agentInsights[key];

      attributeNodes.forEach((item) => {
        item.classList.remove("selected-attribute");
      });

      node.classList.add("selected-attribute");

      if (icon && icon.getAttribute("src")) {
        coreImage.src = icon.getAttribute("src");
        coreImage.classList.add("attribute-core-active");
      }

      if (data && insightPanel && insightName && insightValue && insightText) {
        insightName.textContent = data.name;
        insightValue.textContent = value.textContent.trim();
        insightText.textContent = data.text;

        insightPanel.classList.remove("active-insight");
        void insightPanel.offsetWidth;
        insightPanel.classList.add("active-insight");
      }
    });
  });

  coreImage.addEventListener("click", () => {
    const originalCore = coreImage.dataset.originalCore;

    if (originalCore) {
      coreImage.src = originalCore;
    }

    coreImage.classList.remove("attribute-core-active");

    attributeNodes.forEach((item) => {
      item.classList.remove("selected-attribute");
    });
  });
}

function createRoselynEffects() {
  const agentPage = document.getElementById("agentPage");
  const layer = document.getElementById("specialFxLayer");

  if (!agentPage || !layer || !agentPage.classList.contains("roselyn-mode")) {
    return;
  }

  layer.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    const shard = document.createElement("span");
    shard.classList.add("roselyn-time-shard");

    shard.style.left = Math.random() * 100 + "%";
    shard.style.animationDuration = 5 + Math.random() * 7 + "s";
    shard.style.animationDelay = Math.random() * 6 + "s";

    layer.appendChild(shard);
  }

  const echoes = [
    "tique",
    "intervalo",
    "mira estável",
    "tempo espesso",
    "evento suspenso",
    "lente oxidada",
    "consequência"
  ];

  for (let i = 0; i < 10; i++) {
    const echo = document.createElement("span");
    echo.classList.add("roselyn-tick-echo");

    echo.textContent = echoes[i % echoes.length];
    echo.style.top = 8 + Math.random() * 84 + "%";
    echo.style.animationDuration = 12 + Math.random() * 12 + "s";
    echo.style.animationDelay = Math.random() * 7 + "s";

    layer.appendChild(echo);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    applyCharacterWheelAssets();
    setupCharacterAttributeInteractions();
    createRoselynEffects();
  }, 320);
});
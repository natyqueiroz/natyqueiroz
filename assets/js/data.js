/* =========================================================
   data.js — TODO O CONTEÚDO DO SEU PORTFÓLIO FICA AQUI
   ---------------------------------------------------------
   Você não precisa mexer no HTML para adicionar um projeto,
   uma skill ou uma experiência: é só editar as listas abaixo.
   O main.js lê este arquivo e monta as seções sozinho.

   IDIOMAS: todo texto que muda com o idioma é escrito assim:
     title: { en: "Texto em inglês", pt: "Texto em português" },
   Nomes que são iguais nas duas línguas (ex: "HTML", "FIAP")
   podem ficar como texto simples: "HTML"

   CAMINHOS: imagens e arquivos são relativos ao index.html,
   então começam com "assets/" (ex: "assets/img/projects/foto.jpg")

   Regras de ouro para não quebrar:
   - Todo texto vai entre aspas: "assim"
   - Itens de uma lista são separados por vírgula
   - Cada objeto { } também é separado por vírgula
   ========================================================= */

const PORTFOLIO = {

  /* Seu usuário do GitHub (só o nome, sem link).
     Com ele preenchido, aparecem a ATIVIDADE e o ARQUIVO de repositórios.
     Deixe "" para esconder essas seções. */
  githubUser: "natyqueiroz",

  /* Link do seu currículo em PDF (ex: "assets/cv/nathaly-barbosa-cv.pdf").
     Deixe "" para esconder o botão. */
  cvUrl: "",

  /* ===== SKILLS =====
     Coloque só o que você usa de verdade:
     numa entrevista, tudo que está aqui pode virar pergunta. */
  skills: [
    {
      group: "Front-end",
      items: ["HTML5", "CSS3", "JavaScript", { en: "Responsive design", pt: "Design responsivo" }, "Canvas API"],
    },
    {
      group: "Back-end",
      items: ["Node.js", "Express", "SQLite", "REST APIs", { en: "JWT authentication", pt: "Autenticação JWT" }],
    },
    {
      group: { en: "Tools", pt: "Ferramentas" },
      items: ["Git", "GitHub", "VS Code", "Chart.js", "jsPDF", "PM2", "Linux VPS"],
    },
    {
      group: { en: "Languages", pt: "Idiomas" },
      items: [
        { en: "Portuguese (native)", pt: "Português (nativo)" },
        { en: "English (intermediate, 1 year living in the US)", pt: "Inglês (intermediário, 1 ano morando nos EUA)" },
      ],
    },
    {
      group: { en: "Learning now", pt: "Aprendendo agora" },
      items: [], // ex: ["React", "TypeScript"]
    },
  ],

  /* ===== SERVIÇOS (para freela) =====
     icon = nome de um ícone de https://lucide.dev/icons */
  services: [
    {
      icon: "layout-template",
      title: { en: "Landing pages", pt: "Landing pages" },
      text: {
        en: "A single page that presents your product or event and turns visitors into contacts.",
        pt: "Uma página única que apresenta seu produto ou evento e transforma visitantes em contatos.",
      },
    },
    {
      icon: "store",
      title: { en: "Websites for small businesses", pt: "Sites para pequenos negócios" },
      text: {
        en: "A clear, fast site with your services, location and a direct way to reach you.",
        pt: "Um site claro e rápido com seus serviços, sua localização e um jeito direto de falar com você.",
      },
    },
    {
      icon: "smartphone",
      title: { en: "Responsive fixes", pt: "Ajustes de responsividade" },
      text: {
        en: "Your current site working properly on phones, tablets and desktops.",
        pt: "Seu site atual funcionando direitinho no celular, no tablet e no computador.",
      },
    },
    {
      icon: "sparkles",
      title: { en: "Interactive interfaces", pt: "Interfaces interativas" },
      text: {
        en: "Forms, filters, galleries and small tools built with plain JavaScript.",
        pt: "Formulários, filtros, galerias e pequenas ferramentas feitas com JavaScript puro.",
      },
    },
  ],

  /* ===== PROJETOS =====
     Adicione quantos quiser. Todos aparecem na grade, com filtro por tecnologia.
     - featured: true   → card grande, em destaque (use em 1 ou 2 projetos)
     - image            → caminho do print, ex: "assets/img/projects/meu-projeto.jpg" ("" = ícone no lugar)
     - icon             → ícone mostrado enquanto não há print (nomes em https://lucide.dev/icons)
     - live / repo      → links (deixe "" se não tiver, o botão some). Com "live", a imagem também vira link
     - role             → a SUA parte no projeto (recrutador adora ler isso) */
  projects: [
    {
      title: { en: "Admnistrative system — Ensina Book", pt: "Painel Administrativo — Ensina Book" },
      year: 2026,
      type: { en: "Work", pt: "Trabalho" },
      featured: false, // true = card grande, ocupando 2 colunas
      description: {
        en: "Module of the internal admin panel used by a course-sales company to track contract cancellations: each request goes to the responsible department with a business-day countdown (5 days for analysis, 10 for finance), supporting documents are attached, and the reason follows the contract into the cancelled list and reports.",
        pt: "Módulo do painel administrativo interno de uma empresa de venda de cursos para acompanhar cancelamentos de contrato: cada pedido vai para o setor responsável com contagem regressiva em dias úteis (5 dias para Análise, 10 para Financeiro), os documentos são anexados e o motivo acompanha o contrato até a lista de cancelados e os relatórios.",
      },
      role: {
        en: "Built the cancellation module end to end, from the interface to the API and database. Internal tool: screenshots available on request.",
        pt: "Desenvolvi o módulo de cancelamento de ponta a ponta, da interface à API e ao banco de dados. Sistema interno: prints disponíveis mediante solicitação.",
      },
      tags: ["JavaScript", "Node.js", "Express", "SQLite"],
      icon: "clipboard-list",
      image: "assets/img/capa-paineladm.png", // ex: "assets/img/projects/ensina-book.jpg" (print com DADOS FICTÍCIOS)
      live: "https://natyqueiroz.github.io/EnsinaBook-Painel-admnistrativo/", // sistema interno: NUNCA coloque o link real aqui
      repo: "",
    },

  ],

  /* ===== TRAJETÓRIA (formação + experiência) =====
     Do mais recente para o mais antigo.
     kind: "education" ou "work" (muda o ícone) */
  journey: [
    {
      kind: "work",
      period: { en: "2026 — Present", pt: "2026 — Atual" },
      title: { en: "Web Developer (remote)", pt: "Desenvolvedora Web (remoto)" },
      place: "Ensina Book",
      text: {
        en: "Building and maintaining the company's internal admin panel for sales, cancellations, events and commissions, while also using it day to day in operations.",
        pt: "Desenvolvo e mantenho o painel administrativo interno da empresa (vendas, cancelamentos, eventos e comissões) e também uso o sistema no dia a dia da operação.",
      },
    },
    {
      kind: "education",
      period: { en: "Aug 2026 — Present", pt: "Ago 2026 — Atual" },
      title: { en: "Software Engineering", pt: "Engenharia de Software" },
      place: "FIAP",
      text: {
        en: "Bachelor's degree, currently in the first semester.",
        pt: "Bacharelado, atualmente no primeiro semestre.",
      },
    },
    {
      kind: "education",
      period: "2025 — 2026",
      title: { en: "Computer Engineering & IT Management", pt: "Engenharia Informática e de Gestão" },
      place: {
        en: "IADE — Faculty of Design, Technology and Communication, Lisbon",
        pt: "IADE — Faculdade de Design, Tecnologia e Comunicação, Lisboa",
      },
      text: {
        en: "One academic year of university studies in Portugal, combining software development with information systems management.",
        pt: "Um ano letivo de graduação em Portugal, unindo desenvolvimento de software e gestão de sistemas de informação.",
      },
    },
    {
      kind: "education",
      period: "2024 — 2025",
      title: { en: "High school exchange program", pt: "Intercâmbio no ensino médio" },
      place: { en: "Marshfield, Missouri, United States", pt: "Marshfield, Missouri, Estados Unidos" },
      text: {
        en: "Senior year of high school in the US, living and studying fully in English.",
        pt: "Último ano do ensino médio nos EUA, morando e estudando totalmente em inglês.",
      },
    },
    {
      kind: "education",
      period: "2023 — 2024",
      title: { en: "Systems Analysis and Development", pt: "Análise e Desenvolvimento de Sistemas" },
      place: { en: "SESI / SENAI, Brazil", pt: "SESI / SENAI, Brasil" },
      text: {
        en: "Technical program taken alongside high school, where I started programming.",
        pt: "Curso técnico feito junto com o ensino médio, onde comecei a programar.",
      },
    },
  ],
};
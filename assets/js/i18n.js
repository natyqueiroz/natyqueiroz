/* =========================================================
   i18n.js — TRADUÇÕES DOS TEXTOS FIXOS DO SITE
   ("i18n" = internationalization: 18 letras entre o "i" e o "n")

   Como funciona:
   - No HTML, cada texto traduzível tem uma etiqueta: data-i18n="nav.home"
   - Aqui, cada etiqueta tem a versão em inglês (en) e em português (pt)
   - O main.js troca todos os textos quando você clica no botão de idioma

   Os textos dos projetos, skills e trajetória ficam no data.js.
   {n}, {repo}... são "espaços" preenchidos pelo JavaScript.
   ========================================================= */

const TRANSLATIONS = {
  en: {
    "nav.aria": "Main navigation",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.work": "Work",
    "nav.contact": "Contact",

    "status.available": "Available for selected work",
    "status.short": "Available",
    "theme.toLight": "Switch to light theme",
    "theme.toDark": "Switch to dark theme",
    "lang.switch": "Mudar para português",

    "hero.kicker": "| Software Engineering Student",
    "hero.impact": "building a new future.",
    "hero.based": "BASED IN SÃO PAULO,",
    "hero.country": "BRAZIL",
    "hero.role": "FRONT-END DEV",

    "about.pill": "DETAIL-DRIVEN UI",
    "about.philosophy": "PHILOSOPHY",
    "about.h1": "About",
    "about.h2": "me.",
    "about.p1":
      "I am Nathaly Barbosa, a developer passionate about transforming ideas into structured, high-performance digital solutions. I focus on clean code, scalable systems, and intuitive user experiences that feel as good as they function.",
    "about.p2":
      "Constantly learning and evolving, I am committed to mastering both the technical and strategic sides of development. I don’t just build features — I build foundations designed to last.",
    "about.status": "Available for work",
    "about.buildStrong": "LET'S BUILD SOMETHING",
    "about.buildScript": "that actually works.",
    "about.hint": "TAP TO COPY EMAIL",
    "about.copied": "COPIED TO CLIPBOARD ✓",
    "about.copyFail": "COULDN'T COPY — SELECT THE EMAIL ABOVE",
    "about.cta": "CONNECT NOW",

    "skills.h1": "What I",
    "skills.h2": "work with.",
    "journey.h1": "My",
    "journey.h2": "journey.",
    "services.h1": "How I can",
    "services.h2": "help you.",
    "services.sub": "Available for freelance projects and front-end roles.",

    "work.h1": "Selected",
    "work.h2": "work.",
    "work.sub": "Projects I designed and built, from real work to university assignments and personal experiments.",
    "filter.aria": "Filter projects by technology",
    "filter.all": "All",
    "project.live": "Live site",
    "project.code": "Code",
    "project.myPart": "My part:",
    "project.screenshot": "Screenshot of {title}",

    "activity.title": "GitHub activity",
    "activity.loading": "Loading contributions…",
    "activity.total": "<strong>{n}</strong> contributions in the last year",
    "activity.aria": "{n} GitHub contributions in the last year",
    "activity.day": "{n} contributions on {date}",
    "activity.dayOne": "1 contribution on {date}",
    "activity.dayNone": "No contributions on {date}",
    "activity.unavailable": "Contribution graph unavailable right now.",
    "activity.less": "Less",
    "activity.more": "More",
    "activity.recent": "Recent activity",
    "activity.noEvents": "No public activity in the last few weeks.",
    "activity.eventsUnavailable": "Recent activity unavailable right now.",

    "event.push": "Pushed {n} commits to {repo}",
    "event.pushOne": "Pushed 1 commit to {repo}",
    "event.createRepo": "Created repository {repo}",
    "event.createRef": "Created a {type} in {repo}",
    "event.pr": "Pull request {action} in {repo}",
    "event.issue": "Issue {action} in {repo}",
    "event.star": "Starred {repo}",
    "event.fork": "Forked {repo}",

    "archive.title": "More on GitHub",
    "archive.view": "View profile",
    "archive.loading": "Loading repositories…",
    "archive.allListed": "All my public repositories are already listed above.",
    "archive.error": "Couldn't load repositories right now.",
    "archive.errorLink": "See them on GitHub",
    "archive.noDesc": "No description yet.",
    "archive.live": "Live site of {name}",
    "archive.code": "Code of {name}",

    "contact.h1": "Let's",
    "contact.h2": "talk.",
    "contact.sub": "Have a project or an opportunity in mind? Send me a message on any of these channels.",
    "contact.email": "Email",
    "contact.cv": "Download CV",
    "footer.top": "Back to top ↑",
  },

  pt: {
    "nav.aria": "Navegação principal",
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.work": "Projetos",
    "nav.contact": "Contato",

    "status.available": "Disponível para novos projetos",
    "status.short": "Disponível",
    "theme.toLight": "Mudar para tema claro",
    "theme.toDark": "Mudar para tema escuro",
    "lang.switch": "Switch to English",

    "hero.kicker": "| Estudante de Engenharia de Software",
    "hero.impact": "construindo um novo futuro.",
    "hero.based": "BASEADA EM SÃO PAULO,",
    "hero.country": "BRASIL",
    "hero.role": "DEV FRONT-END",

    "about.pill": "UI FEITA NOS DETALHES",
    "about.philosophy": "FILOSOFIA",
    "about.h1": "Sobre",
    "about.h2": "mim.",
    "about.p1":
      "Sou Nathaly Barbosa, desenvolvedora apaixonada por transformar ideias em soluções digitais bem estruturadas e de alto desempenho. Meu foco é código limpo, sistemas escaláveis e experiências intuitivas, que sejam tão agradáveis de usar quanto funcionais.",
    "about.p2":
      "Sempre aprendendo e evoluindo, estou comprometida em dominar tanto o lado técnico quanto o estratégico do desenvolvimento. Não construo apenas funcionalidades — construo bases feitas para durar.",
    "about.status": "Disponível para trabalhar",
    "about.buildStrong": "VAMOS CONSTRUIR ALGO",
    "about.buildScript": "que realmente funcione.",
    "about.hint": "TOQUE PARA COPIAR O E-MAIL",
    "about.copied": "COPIADO ✓",
    "about.copyFail": "NÃO FOI POSSÍVEL COPIAR — SELECIONE O E-MAIL ACIMA",
    "about.cta": "FALE COMIGO",

    "skills.h1": "Com o que",
    "skills.h2": "eu trabalho.",
    "journey.h1": "Minha",
    "journey.h2": "trajetória.",
    "services.h1": "Como posso",
    "services.h2": "te ajudar.",
    "services.sub": "Disponível para projetos freelance e vagas de front-end.",

    "work.h1": "Projetos",
    "work.h2": "selecionados.",
    "work.sub": "Projetos que desenhei e desenvolvi, do trabalho real a atividades da faculdade e experimentos pessoais.",
    "filter.aria": "Filtrar projetos por tecnologia",
    "filter.all": "Todos",
    "project.live": "Ver site",
    "project.code": "Código",
    "project.myPart": "Minha parte:",
    "project.screenshot": "Tela do projeto {title}",

    "activity.title": "Atividade no GitHub",
    "activity.loading": "Carregando contribuições…",
    "activity.total": "<strong>{n}</strong> contribuições no último ano",
    "activity.aria": "{n} contribuições no GitHub no último ano",
    "activity.day": "{n} contribuições em {date}",
    "activity.dayOne": "1 contribuição em {date}",
    "activity.dayNone": "Nenhuma contribuição em {date}",
    "activity.unavailable": "Gráfico de contribuições indisponível no momento.",
    "activity.less": "Menos",
    "activity.more": "Mais",
    "activity.recent": "Atividade recente",
    "activity.noEvents": "Nenhuma atividade pública nas últimas semanas.",
    "activity.eventsUnavailable": "Atividade recente indisponível no momento.",

    "event.push": "Enviou {n} commits para {repo}",
    "event.pushOne": "Enviou 1 commit para {repo}",
    "event.createRepo": "Criou o repositório {repo}",
    "event.createRef": "Criou um(a) {type} em {repo}",
    "event.pr": "Pull request ({action}) em {repo}",
    "event.issue": "Issue ({action}) em {repo}",
    "event.star": "Favoritou {repo}",
    "event.fork": "Fez um fork de {repo}",

    "archive.title": "Mais no GitHub",
    "archive.view": "Ver perfil",
    "archive.loading": "Carregando repositórios…",
    "archive.allListed": "Todos os meus repositórios públicos já estão listados acima.",
    "archive.error": "Não foi possível carregar os repositórios agora.",
    "archive.errorLink": "Veja no GitHub",
    "archive.noDesc": "Ainda sem descrição.",
    "archive.live": "Site do projeto {name}",
    "archive.code": "Código do projeto {name}",

    "contact.h1": "Vamos",
    "contact.h2": "conversar.",
    "contact.sub": "Tem um projeto ou uma oportunidade em mente? Me mande uma mensagem por qualquer um destes canais.",
    "contact.email": "E-mail",
    "contact.cv": "Baixar currículo",
    "footer.top": "Voltar ao topo ↑",
  },
};

/* Idioma inicial: o que a pessoa escolheu antes; senão, o idioma do navegador */
let currentLang = (() => {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "pt") return saved;
  } catch (e) {
    /* sem acesso ao localStorage: segue */
  }
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
})();

/* t("chave", { n: 3 }) → texto traduzido com os espaços preenchidos */
function t(key, vars = {}) {
  let text = TRANSLATIONS[currentLang][key] ?? TRANSLATIONS.en[key] ?? key;
  for (const [name, value] of Object.entries(vars)) {
    text = text.replaceAll(`{${name}}`, value);
  }
  return text;
}

/* tr(valor) → para os textos do data.js.
   Aceita texto simples ("HTML") ou objeto ({ en: "...", pt: "..." }) */
function tr(value) {
  if (value && typeof value === "object") return value[currentLang] ?? value.en ?? "";
  return value ?? "";
}

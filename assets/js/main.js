/* =========================================================
   main.js — comportamento da página
   Lê o conteúdo de data.js (a variável PORTFOLIO) e monta as seções.
   ========================================================= */

/* ---------- Funções auxiliares ---------- */

// Escapa caracteres especiais antes de colocar texto dentro do HTML.
// Sem isso, uma descrição com "<" quebraria a página (ou abriria brecha de segurança).
function esc(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Atalho para buscar um elemento pelo id
const $ = (id) => document.getElementById(id);

// Recria os ícones da Lucide (necessário sempre que adicionamos HTML novo)
function refreshIcons() {
  if (window.lucide) lucide.createIcons();
}

/* =========================================================
   1) SKILLS
   ========================================================= */
function renderSkills() {
  const box = $("skills-list");
  if (!box) return;

  box.innerHTML = PORTFOLIO.skills
    .filter((group) => group.items.length > 0) // grupo vazio não aparece
    .map(
      (group) => `
      <div class="card skill-group">
        <h3 class="skill-group__title">${esc(tr(group.group))}</h3>
        <ul class="tags">
          ${group.items.map((item) => `<li>${esc(tr(item))}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");
}

/* =========================================================
   2) TRAJETÓRIA
   ========================================================= */
function renderJourney() {
  const list = $("journey-list");
  if (!list) return;

  list.innerHTML = PORTFOLIO.journey
    .map((step) => {
      const icon = step.kind === "work" ? "briefcase" : "graduation-cap";
      return `
      <li class="timeline__item">
        <span class="timeline__period">${esc(tr(step.period))}</span>
        <span class="timeline__dot" aria-hidden="true"><i data-lucide="${icon}" class="ico"></i></span>
        <div class="timeline__content">
          <h3 class="timeline__title">${esc(tr(step.title))}</h3>
          <p class="timeline__place">${esc(tr(step.place))}</p>
          <p class="timeline__text">${esc(tr(step.text))}</p>
        </div>
      </li>`;
    })
    .join("");
}

/* =========================================================
   3) SERVIÇOS
   ========================================================= */
function renderServices() {
  const box = $("services-list");
  if (!box) return;

  box.innerHTML = PORTFOLIO.services
    .map(
      (service) => `
      <article class="service">
        <i data-lucide="${esc(service.icon)}" class="service__icon" aria-hidden="true"></i>
        <h3 class="service__title">${esc(tr(service.title))}</h3>
        <p class="service__text">${esc(tr(service.text))}</p>
      </article>`
    )
    .join("");
}

/* =========================================================
   4) PROJETOS + FILTRO
   ========================================================= */
let currentFilter = "All"; // lembra o filtro escolhido quando o idioma muda

function projectCard(project) {
  const title = tr(project.title);

  // Botões só aparecem se o link existir
  const links = [
    project.live &&
      `<a class="btn btn--light" href="${esc(project.live)}" target="_blank" rel="noopener noreferrer">
        ${t("project.live")} <i data-lucide="arrow-up-right" class="ico" aria-hidden="true"></i></a>`,
    project.repo &&
      `<a class="btn btn--ghost" href="${esc(project.repo)}" target="_blank" rel="noopener noreferrer">
        <i data-lucide="code-xml" class="ico" aria-hidden="true"></i> ${t("project.code")}</a>`,
  ]
    .filter(Boolean) // remove os "false" dos links vazios
    .join("");

  // Imagem do projeto (ou um "cartaz" com o ícone, se ainda não houver print)
  const picture = project.image
    ? `<img src="${esc(project.image)}" alt="${esc(t("project.screenshot", { title }))}" loading="lazy" />`
    : `<span class="project__placeholder" aria-hidden="true"><i data-lucide="${esc(project.icon || "code-xml")}"></i></span>`;

  // Se o projeto tem site no ar, a imagem inteira vira um link para ele
  const thumb = project.live
    ? `<a class="project__thumb" href="${esc(project.live)}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">${picture}</a>`
    : `<div class="project__thumb">${picture}</div>`;

  const role = tr(project.role);

  return `
    <article class="card project ${project.featured ? "project--featured" : ""}">
      ${thumb}
      <div class="project__body">
        <p class="project__meta">${esc(tr(project.type))} · ${esc(project.year)}</p>
        <h3 class="project__title">${esc(title)}</h3>
        <p class="project__desc">${esc(tr(project.description))}</p>
        ${role ? `<p class="project__role"><strong>${t("project.myPart")}</strong> ${esc(role)}</p>` : ""}
        <ul class="tags" aria-label="Technologies">
          ${project.tags.map((tag) => `<li>${esc(tr(tag))}</li>`).join("")}
        </ul>
        ${links ? `<div class="project__links">${links}</div>` : ""}
      </div>
    </article>`;
}

function renderProjects() {
  const box = $("projects-list");
  if (!box) return;

  // Destaques primeiro, depois do mais novo para o mais antigo
  const sorted = [...PORTFOLIO.projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year
  );

  const visible =
    currentFilter === "All"
      ? sorted
      : sorted.filter((p) => p.tags.map(tr).includes(currentFilter));

  box.innerHTML = visible.map(projectCard).join("");
}

function renderFilters() {
  const box = $("project-filters");
  if (!box) return;

  // new Set() remove repetidos: ["HTML","CSS","HTML"] → {"HTML","CSS"}
  const tags = ["All", ...new Set(PORTFOLIO.projects.flatMap((p) => p.tags.map(tr)))];

  // Com uma tecnologia só, filtro não faz sentido
  if (tags.length <= 2) return;

  box.innerHTML = tags
    .map((tag) => {
      const active = tag === currentFilter;
      const label = tag === "All" ? t("filter.all") : tag;
      return `<button class="chip ${active ? "is-active" : ""}" type="button"
        data-filter="${esc(tag)}" aria-pressed="${active}">${esc(label)}</button>`;
    })
    .join("");
}

// Um único "ouvinte" na caixa cuida de todos os botões (delegação de eventos).
// Fica FORA do renderFilters para não ser adicionado de novo a cada troca de idioma.
$("project-filters")?.addEventListener("click", (event) => {
  const button = event.target.closest(".chip");
  if (!button) return;
  currentFilter = button.dataset.filter;
  renderFilters();
  renderProjects();
  refreshIcons();
});

/* =========================================================
   5) GITHUB
   ========================================================= */

// Busca um JSON e guarda por 1 hora no sessionStorage.
// Assim, recarregar a página não gasta o limite de consultas da API.
async function cachedJson(url) {
  const key = `cache:${url}`;
  try {
    const saved = JSON.parse(sessionStorage.getItem(key));
    if (saved && Date.now() - saved.time < 3600000) return saved.data;
  } catch (e) {
    /* storage indisponível: segue sem cache */
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} respondeu ${response.status}`);
  const data = await response.json();

  try {
    sessionStorage.setItem(key, JSON.stringify({ time: Date.now(), data }));
  } catch (e) {
    /* storage cheio ou bloqueado: tudo bem */
  }
  return data;
}

// Os dados baixados ficam guardados aqui para redesenhar ao trocar de idioma
const github = { contributions: null, events: null, repos: null };

const locale = () => (currentLang === "pt" ? "pt-BR" : "en");

// "há 3 dias" / "3 days ago": o próprio navegador traduz!
function timeAgo(dateString) {
  const rtf = new Intl.RelativeTimeFormat(locale(), { numeric: "auto" });
  const seconds = (new Date(dateString) - Date.now()) / 1000; // negativo = passado
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return rtf.format(0, "second");
}

/* ----- 5a) Gráfico de contribuições -----
   O GitHub não entrega esse gráfico pela API pública sem login,
   então usamos um serviço aberto que lê o perfil público:
   github-contributions-api.jogruber.de */
function renderContributions() {
  const data = github.contributions;
  if (!data || data === "error") return;

  const total = $("activity-total");
  const grid = $("heatmap");
  const months = $("heatmap-months");
  const days = data.contributions;
  const sum = days.reduce((acc, day) => acc + day.count, 0);
  const number = sum.toLocaleString(locale());

  total.innerHTML = t("activity.total", { n: number });
  grid.setAttribute("aria-label", t("activity.aria", { n: number }));

  // O 1º dia pode cair numa quarta, por exemplo: completamos a coluna com quadrados vazios
  const firstWeekday = new Date(`${days[0].date}T00:00:00`).getDay(); // 0 = domingo
  const empty = Array(firstWeekday).fill('<i class="is-empty"></i>').join("");

  const dateFormat = new Intl.DateTimeFormat(locale(), { day: "numeric", month: "short", year: "numeric" });
  grid.innerHTML =
    empty +
    days
      .map((day) => {
        const date = dateFormat.format(new Date(`${day.date}T00:00:00`));
        const key = day.count === 0 ? "activity.dayNone" : day.count === 1 ? "activity.dayOne" : "activity.day";
        return `<i class="lvl-${day.level}" title="${esc(t(key, { n: day.count, date }))}"></i>`;
      })
      .join("");

  // Nome do mês acima da coluna (semana) em que ele começa
  const monthFormat = new Intl.DateTimeFormat(locale(), { month: "short" });
  let lastMonth = -1;
  let lastColumn = -4;
  months.innerHTML = days
    .map((day, index) => {
      const date = new Date(`${day.date}T00:00:00`);
      const column = Math.floor((index + firstWeekday) / 7) + 1;
      if (date.getMonth() === lastMonth || column - lastColumn < 3) return "";
      lastMonth = date.getMonth();
      lastColumn = column;
      return `<span style="grid-column: ${column} / span 3">${esc(monthFormat.format(date).replace(".", ""))}</span>`;
    })
    .join("");
}

async function loadContributions(user) {
  try {
    github.contributions = await cachedJson(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`
    );
    renderContributions();
    // No celular, rola até o fim para mostrar as semanas mais recentes
    const scroller = $("heatmap-scroll");
    scroller.scrollLeft = scroller.scrollWidth;
  } catch (error) {
    console.error("Erro ao carregar contribuições:", error);
    github.contributions = "error";
    $("activity-total").dataset.i18n = "activity.unavailable";
    $("activity-total").textContent = t("activity.unavailable");
    $("heatmap").hidden = true;
    $("heatmap-months").hidden = true;
  }
}

/* ----- 5b) Atividade recente (commits, repositórios novos...) ----- */
function describeEvent(event) {
  const repoName = event.repo.name.split("/")[1];
  const repo = `<a href="https://github.com/${esc(event.repo.name)}" target="_blank" rel="noopener noreferrer">${esc(repoName)}</a>`;

  switch (event.type) {
    case "PushEvent": {
      const n = event.payload.size ?? event.payload.commits?.length ?? 1;
      return { icon: "git-commit-horizontal", text: t(n === 1 ? "event.pushOne" : "event.push", { n, repo }) };
    }
    case "CreateEvent":
      return event.payload.ref_type === "repository"
        ? { icon: "folder-plus", text: t("event.createRepo", { repo }) }
        : { icon: "git-branch", text: t("event.createRef", { type: esc(event.payload.ref_type), repo }) };
    case "PullRequestEvent":
      return { icon: "git-pull-request", text: t("event.pr", { action: esc(event.payload.action), repo }) };
    case "IssuesEvent":
      return { icon: "circle-dot", text: t("event.issue", { action: esc(event.payload.action), repo }) };
    case "WatchEvent":
      return { icon: "star", text: t("event.star", { repo }) };
    case "ForkEvent":
      return { icon: "git-fork", text: t("event.fork", { repo }) };
    default:
      return null; // tipos pouco interessantes ficam de fora
  }
}

function renderEvents() {
  const list = $("events-list");
  const events = github.events;
  if (!list || !events) return;

  const message = (key) => `<li><span></span><span class="events__text">${t(key)}</span></li>`;
  if (events === "error") return (list.innerHTML = message("activity.eventsUnavailable"));

  const items = events
    .map((event) => ({ event, info: describeEvent(event) }))
    .filter((item) => item.info)
    .slice(0, 6);

  if (items.length === 0) return (list.innerHTML = message("activity.noEvents"));

  list.innerHTML = items
    .map(
      ({ event, info }) => `
      <li>
        <i data-lucide="${info.icon}" class="ico" aria-hidden="true"></i>
        <span class="events__text">${info.text}</span>
        <time datetime="${esc(event.created_at)}">${esc(timeAgo(event.created_at))}</time>
      </li>`
    )
    .join("");
}

async function loadEvents(user) {
  try {
    github.events = await cachedJson(
      `https://api.github.com/users/${encodeURIComponent(user)}/events/public?per_page=30`
    );
  } catch (error) {
    console.error("Erro ao carregar atividade:", error);
    github.events = "error";
  }
  renderEvents();
  refreshIcons();
}

/* ----- 5c) Arquivo: todos os repositórios públicos ----- */
function renderArchive() {
  const repos = github.repos;
  const status = $("archive-status");
  const box = $("archive-list");
  if (!repos) return;

  const user = PORTFOLIO.githubUser.trim();
  if (repos === "error") {
    status.hidden = false;
    status.innerHTML = `${t("archive.error")} <a href="https://github.com/${esc(user)}" target="_blank" rel="noopener noreferrer">${t("archive.errorLink")}</a>.`;
    return;
  }

  // Tira forks e os repositórios que já aparecem nos projetos em destaque
  const shown = PORTFOLIO.projects.map((p) => p.repo.toLowerCase());
  const list = repos.filter((repo) => !repo.fork && !shown.includes(repo.html_url.toLowerCase()));

  if (list.length === 0) {
    status.hidden = false;
    status.textContent = t("archive.allListed");
    return;
  }

  status.hidden = true;
  box.innerHTML = list
    .map(
      (repo) => `
      <article class="repo">
        <div class="repo__head">
          <i data-lucide="folder-git-2" class="ico" aria-hidden="true"></i>
          <div class="repo__links">
            ${repo.homepage ? `<a href="${esc(repo.homepage)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(t("archive.live", { name: repo.name }))}"><i data-lucide="external-link" class="ico"></i></a>` : ""}
            <a href="${esc(repo.html_url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(t("archive.code", { name: repo.name }))}"><i data-lucide="code-xml" class="ico"></i></a>
          </div>
        </div>
        <h3 class="repo__name">${esc(repo.name.replace(/[-_]/g, " "))}</h3>
        <p class="repo__desc">${esc(repo.description || t("archive.noDesc"))}</p>
        <p class="repo__foot">
          ${repo.language ? `<span>${esc(repo.language)}</span>` : ""}
          <span>${new Date(repo.pushed_at).getFullYear()}</span>
          ${repo.stargazers_count ? `<span><i data-lucide="star" class="ico"></i> ${repo.stargazers_count}</span>` : ""}
        </p>
      </article>`
    )
    .join("");
}

async function loadGithubArchive(user) {
  $("archive").hidden = false;
  $("github-profile").href = `https://github.com/${encodeURIComponent(user)}`;
  try {
    github.repos = await cachedJson(
      `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated`
    );
  } catch (error) {
    console.error("Erro ao carregar repositórios:", error);
    github.repos = "error";
  }
  renderArchive();
  refreshIcons();
}

function loadGithub() {
  const user = PORTFOLIO.githubUser.trim();
  if (!user) return; // sem usuário, as seções continuam escondidas

  $("activity").hidden = false;
  $("activity-user").textContent = user;
  $("activity-profile").href = `https://github.com/${encodeURIComponent(user)}`;

  loadContributions(user);
  loadEvents(user);
  loadGithubArchive(user);
}

/* =========================================================
   6) BOTÃO DO CURRÍCULO
   ========================================================= */
function setupCv() {
  const link = $("cv-link");
  if (link && PORTFOLIO.cvUrl) {
    link.href = PORTFOLIO.cvUrl;
    link.hidden = false;
  }
}

/* =========================================================
   7) IDIOMA
   ========================================================= */
function applyLanguage() {
  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";

  // Textos fixos do HTML (tudo que tem data-i18n)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  // Botões da navbar
  $("lang-label").textContent = currentLang.toUpperCase();
  $("lang-toggle").setAttribute("aria-label", t("lang.switch"));
  updateThemeButton();

  // Seções montadas pelo JavaScript
  renderSkills();
  renderJourney();
  renderServices();
  renderFilters();
  renderProjects();
  renderContributions();
  renderEvents();
  renderArchive();
  refreshIcons();

  // Os links mudaram de largura ("About" → "Sobre"): reposiciona a pílula
  requestAnimationFrame(() => movePillTo(getActiveLink()));
}

$("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "pt" : "en";
  try {
    localStorage.setItem("lang", currentLang);
  } catch (e) {
    /* sem problema: só não vai lembrar na próxima visita */
  }
  applyLanguage();
});

/* =========================================================
   8) TEMA CLARO / ESCURO
   O <head> já aplicou o tema salvo antes da página aparecer.
   ========================================================= */
function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme !== "light";
  $("theme-toggle").setAttribute("aria-label", t(isDark ? "theme.toLight" : "theme.toDark"));
}

$("theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next; // o CSS troca as cores sozinho
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    /* sem problema */
  }
  updateThemeButton();
});

/* =========================================================
   9) MENU: pílula que segue o link
   ========================================================= */
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");
const pill = document.querySelector(".nav__span");

function movePillTo(link) {
  if (!link) return;
  pill.style.setProperty("--x", `${link.offsetLeft}px`);
  pill.style.setProperty("--w", `${link.offsetWidth}px`);
}

function getActiveLink() {
  return document.querySelector(".nav-link.is-active");
}

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => movePillTo(link));
  link.addEventListener("focus", () => movePillTo(link));
});

nav.addEventListener("mouseleave", () => movePillTo(getActiveLink()));
document.fonts.ready.then(() => movePillTo(getActiveLink()));
window.addEventListener("resize", () => movePillTo(getActiveLink()));

/* Marca no menu a seção que está na tela.
   Seções sem link próprio (skills, journey...) dizem a qual link pertencem
   pelo atributo data-nav. Ex: <section id="skills" data-nav="about"> */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target.dataset.nav || entry.target.id;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${target}`;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });

      if (!nav.matches(":hover")) movePillTo(getActiveLink());
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

/* =========================================================
   10) RELÓGIO no fuso de São Paulo
   ========================================================= */
const clock = $("clock");
const localTime = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

if (clock) {
  const tick = () => (clock.textContent = localTime.format(new Date()));
  tick();
  setInterval(tick, 15000);
}

/* =========================================================
   11) COPIAR E-MAIL
   ========================================================= */
const emailBtn = document.querySelector("[data-copy]");
const hint = $("hint");

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Plano B para quando o arquivo é aberto direto do computador (file://)
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.style.position = "fixed";
  temp.style.opacity = "0";
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
}

if (emailBtn && hint) {
  emailBtn.addEventListener("click", async () => {
    try {
      await copyText(emailBtn.dataset.copy);
      hint.textContent = t("about.copied");
      hint.classList.add("is-copied");
    } catch (error) {
      hint.textContent = t("about.copyFail");
      console.error("Erro ao copiar:", error);
    }
    setTimeout(() => {
      hint.textContent = t("about.hint");
      hint.classList.remove("is-copied");
    }, 2500);
  });
}

/* ANO do rodapé */
const year = $("year");
if (year) year.textContent = new Date().getFullYear();

/* =========================================================
   INÍCIO: monta a página no idioma certo e busca os dados do GitHub
   ========================================================= */
setupCv();
applyLanguage();
loadGithub();
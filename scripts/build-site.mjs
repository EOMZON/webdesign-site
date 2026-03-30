import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  browseModes,
  hero,
  heroWall,
  historicalMovements,
  selectionMatrix,
  siteMeta,
  structurePatterns,
  visualFamilies
} from "../src/site-data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distRoot = path.join(root, "dist");
const srcRoot = path.join(root, "src");

const families = visualFamilies.map((item) => ({
  ...item,
  cover: item.samples[0]?.screenshot || "",
  movementIds: item.ancestors || []
}));

const movements = historicalMovements.map((item) => ({
  ...item,
  era: item.period,
  familyIds: item.webFamilyIds || [],
  principles: item.signatures || [],
  watchouts: item.watchFor || []
}));

const familyMap = new Map(families.map((item) => [item.id, item]));
const movementMap = new Map(movements.map((item) => [item.id, item]));
const structureMap = new Map(structurePatterns.map((item) => [item.id, item]));

const useCases = [
  {
    id: "style-atlas-reference-library",
    title: "Style Atlas / Reference Library",
    summary: "适合风格库、灵感库、模板库和设计参考站。关键是先给图像入口，再给分类、再给详情页。",
    contentShape: "Many parallel references, screenshot-heavy browsing, repeatable cards.",
    userGoal: "快速比较风格、看真实案例、生成后续 agent 可复用的 style packet。",
    primaryFamilyId: "curated-reference-directory",
    secondaryFamilyIds: ["swiss-typographic-grid"],
    structureIds: ["catalog-explorer"],
    avoid: ["首页塞满理论说明", "只有截图没有分类", "一上来就逼用户读长文"],
    note: selectionMatrix[0]?.note || "首页先做图像入口，详情页再把风格语法讲清楚。"
  },
  {
    id: "cultural-publishing",
    title: "Cultural Publishing / Editorial Front Page",
    summary: "适合文化出版、专题内容和杂志式首页。先做封面感，再做栏位和故事层级。",
    contentShape: "Lead story plus supporting stories, cover logic, editorial cadence.",
    userGoal: "让用户先被主故事和主图像抓住，再愿意继续阅读更多内容。",
    primaryFamilyId: "magazine-editorial",
    secondaryFamilyIds: ["quiet-lifestyle-editorial"],
    structureIds: ["dossier", "archive-stack"],
    avoid: ["用 SaaS feature grid 讲文化内容", "过度 CTA 化", "图像太小"],
    note: selectionMatrix[1]?.note || "如果目标是让人读，而不是让人操作，用 dossier。"
  },
  {
    id: "product-tool-platform",
    title: "Product / Tool / Platform",
    summary: "适合 AI 工具、产品官网、平台型页面。应该先清楚状态、价值和界面行为，再谈气质。",
    contentShape: "Feature hierarchy, UI screenshots, clear task/value framing.",
    userGoal: "让用户快速理解产品能做什么、如何使用、界面密度和可信度如何。",
    primaryFamilyId: "product-precision-interface",
    secondaryFamilyIds: ["evidence-dense-knowledge-surface"],
    structureIds: ["workbench", "catalog-explorer"],
    avoid: ["把复杂工具硬包成纯杂志页", "情绪压过任务说明", "截图不解释行为"],
    note: selectionMatrix[2]?.note || "先做状态、计划和操作区，再谈情绪化风格。"
  },
  {
    id: "research-knowledge-system",
    title: "Research / Knowledge System",
    summary: "适合研究报告、知识入口、设计系统与文档型网站。它需要可信、可扫描、可回访。",
    contentShape: "Dense modules, evidence blocks, topic navigation, layered depth.",
    userGoal: "让读者快速找到论点、证据、导航入口和后续深挖路径。",
    primaryFamilyId: "evidence-dense-knowledge-surface",
    secondaryFamilyIds: ["swiss-typographic-grid"],
    structureIds: ["archive-stack", "dossier"],
    avoid: ["信息太薄却强行做复杂知识页", "没有章节与导航", "只有 mood 没有证据"],
    note: selectionMatrix[3]?.note || "图表、证据、结论和导览要一起设计。"
  },
  {
    id: "premium-lifestyle-brand",
    title: "Premium Lifestyle / Cultural Brand",
    summary: "适合生活方式、时尚、文化品牌。需要安静、质感和收藏感，而不是强行工具化。",
    contentShape: "Image-led editorials, slower pacing, quiet premium typography.",
    userGoal: "建立品牌气质和阅读意愿，让视觉气氛支撑内容的高级感。",
    primaryFamilyId: "quiet-lifestyle-editorial",
    secondaryFamilyIds: ["magazine-editorial"],
    structureIds: ["dossier", "catalog-explorer"],
    avoid: ["过度工程化", "过多功能卡片", "高频按钮和促销感"],
    note: selectionMatrix[4]?.note || "需要安静和质感，不需要过度的 SaaS 组件感。"
  },
  {
    id: "creator-anti-template-launch",
    title: "Creator / Anti-Template Launch",
    summary: "适合创作者品牌、反模板发布页和态度鲜明的个人项目。可以更大胆，但不能乱。",
    contentShape: "Strong attitude, image punches, selective disorder, memorable modules.",
    userGoal: "摆脱模板感，让站点一眼就有个性，同时保持可读性和导航。",
    primaryFamilyId: "playful-postmodern-anti-grid",
    secondaryFamilyIds: ["stage-driven-showcase"],
    structureIds: ["catalog-explorer", "immersive-stage"],
    avoid: ["为了态度牺牲基本层级", "全站处处用重色和冲突", "没有退出路径"],
    note: selectionMatrix[5]?.note || "重点是摆脱千篇一律，但结构仍然要可读。"
  },
  {
    id: "gaming-hardware-future-tech",
    title: "Gaming / Hardware / Future-Tech Launch",
    summary: "适合游戏、硬件、未来技术、世界观强的品牌发布页。舞台感和世界观要先成立。",
    contentShape: "Hero stage, dramatic contrast, worldbuilding visuals, sparse intro copy.",
    userGoal: "让用户先进入一个场景，再理解产品或叙事的未来感设定。",
    primaryFamilyId: "neon-techno-futurist-interface",
    secondaryFamilyIds: ["stage-driven-showcase"],
    structureIds: ["immersive-stage"],
    avoid: ["只剩发光和霓虹", "世界观成立但导航崩掉", "在不适合的内容上硬套暗黑未来感"],
    note: selectionMatrix[6]?.note || "世界观和能量感优先，但不能牺牲基本层级。"
  }
];

const routeHref = {
  movements: "/movements",
  families: "/families",
  "use-cases": "/use-cases"
};

const operatingSteps = [
  {
    step: "01",
    title: "Choose A Movement",
    detail: "先判断历史语言。Swiss、Bauhaus、Memphis、Art Deco、Cyberpunk 分别会把网站带向不同语法。"
  },
  {
    step: "02",
    title: "Choose A Family",
    detail: "再判断当代网页家族。editorial、directory、product precision、stage-driven 不该混成一层。"
  },
  {
    step: "03",
    title: "Choose A Structure",
    detail: "最后决定它是 catalog、dossier、archive 还是 immersive stage。结构必须单独选。"
  },
  {
    step: "04",
    title: "Ship A Packet",
    detail: "详情页最后输出 borrow、avoid、sample links 和 prompt DNA，方便你以后直接交给 agent。"
  }
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function writePage(routeSegments, content) {
  const outputPath =
    routeSegments.length === 0
      ? path.join(distRoot, "index.html")
      : path.join(distRoot, ...routeSegments, "index.html");
  writeFile(outputPath, content);
}

function copyIfExists(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return;
  ensureDir(path.dirname(destPath));
  fs.copyFileSync(srcPath, destPath);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.cpSync(srcDir, destDir, { recursive: true, force: true });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sitePath(...segments) {
  const cleaned = segments.flat().filter(Boolean);
  return cleaned.length ? `/${cleaned.join("/")}` : "/";
}

function familyHref(id) {
  return sitePath("families", id);
}

function movementHref(id) {
  return sitePath("movements", id);
}

function useCaseHref(id) {
  return sitePath("use-cases", id);
}

function linkAttrs(href, className = "") {
  const classAttr = className ? ` class="${className}"` : "";
  const external = /^https?:\/\//.test(href) ? ` target="_blank" rel="noreferrer noopener"` : "";
  return `${classAttr} href="${escapeHtml(href)}"${external}`;
}

function canonicalFor(pathname) {
  const origin = siteMeta.origin.replace(/\/$/, "");
  return pathname === "/" ? `${origin}/` : `${origin}${pathname}`;
}

function renderList(items = []) {
  if (!items.length) return `<p class="empty-note">Pending curation.</p>`;
  return `<ul class="bullet-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderStaticPills(items = []) {
  if (!items.length) return `<p class="empty-note">Pending curation.</p>`;
  return `<div class="pill-row">${items.map((item) => `<span class="pill is-static">${escapeHtml(item)}</span>`).join("")}</div>`;
}

function renderLinkedPills(ids = [], sourceMap, hrefFor) {
  if (!ids.length) return `<p class="empty-note">Pending links.</p>`;
  return `<div class="pill-row">
    ${ids
      .map((id) => {
        const item = sourceMap.get(id);
        if (!item) return "";
        return `<a ${linkAttrs(hrefFor(id), "pill")}>${escapeHtml(item.title)}</a>`;
      })
      .join("")}
  </div>`;
}

function renderExternalLinks(items = []) {
  if (!items.length) return `<p class="empty-note">Pending links.</p>`;
  return `<ul class="reference-list">
    ${items
      .map(
        (item) =>
          `<li><a ${linkAttrs(item.href, "reference-link")}>${escapeHtml(item.label || item.title || item.href)}</a></li>`
      )
      .join("")}
  </ul>`;
}

function renderImageFrame(fileName, altText, className = "") {
  if (!fileName) {
    return `<div class="image-placeholder ${escapeHtml(className)}">Image pending</div>`;
  }

  const absolute = path.join(srcRoot, "screenshots", fileName);
  if (!fs.existsSync(absolute)) {
    return `<div class="image-placeholder ${escapeHtml(className)}">Missing screenshot<br />${escapeHtml(fileName)}</div>`;
  }

  const cls = className ? ` ${className}` : "";
  return `<div class="image-frame${cls}">
    <img src="/screenshots/${escapeHtml(fileName)}" alt="${escapeHtml(altText || fileName)}" loading="lazy" />
  </div>`;
}

function renderImageFigure(fileName, altText, caption = "", className = "") {
  return `<figure class="image-figure${className ? ` ${className}` : ""}">
    ${renderImageFrame(fileName, altText)}
    ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
  </figure>`;
}

function renderSectionHead(kicker, title, summary = "", actionMarkup = "") {
  return `<div class="section-head">
    <div class="section-head-main">
      <p class="eyebrow">${escapeHtml(kicker)}</p>
      <h2 class="section-title">${escapeHtml(title)}</h2>
    </div>
    <div class="section-head-side">
      ${summary ? `<p class="section-summary">${escapeHtml(summary)}</p>` : ""}
      ${actionMarkup}
    </div>
  </div>`;
}

function renderTopbar() {
  return `<header class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="/" aria-label="Design Zondev home">
        <span class="brand-mark">Design</span>
        <strong class="brand-name">Zondev</strong>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/families">Families</a>
        <a href="/movements">Movements</a>
        <a href="/use-cases">Use Cases</a>
      </nav>
      <span class="status-pill">atlas v0.5</span>
    </div>
  </header>`;
}

function layout({ title, description, pathname = "/", body, pageClass = "" }) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(description || siteMeta.description)}" />
    <meta name="theme-color" content="#111111" />
    <title>${escapeHtml(title || siteMeta.title)}</title>
    <link rel="canonical" href="${escapeHtml(canonicalFor(pathname))}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/site.css" />
    <script defer src="/_vercel/insights/script.js"></script>
    <script defer src="/app.js"></script>
  </head>
  <body class="${escapeHtml(pageClass)}">
    <div class="site-shell">
      ${renderTopbar()}
      <main class="page">${body}</main>
      <footer class="footer">
        <div class="footer-inner">
          <p>Design Zondev is a design-style atlas: movement → family → structure → prompt packet.</p>
          <p>Updated ${escapeHtml(siteMeta.updatedAt)} · ${escapeHtml(siteMeta.origin.replace(/^https?:\/\//, ""))}</p>
        </div>
      </footer>
    </div>
  </body>
</html>`;
}

function renderHeroTile(item) {
  return `<a ${linkAttrs(item.href, `hero-tile hero-tile--${item.size || "standard"}`)}>
    ${renderImageFrame(item.screenshot, item.alt)}
    <div class="hero-caption">
      <span class="hero-caption-label">${escapeHtml(item.label)}</span>
      <span class="hero-caption-meta">${escapeHtml(item.meta)}</span>
    </div>
  </a>`;
}

function renderHeroStage() {
  return `<section class="hero-stage" id="top">
    <div class="hero-stage-grid">
      <div class="hero-grid">
        ${heroWall.map((item) => renderHeroTile(item)).join("")}
      </div>
      <aside class="hero-aside hero-aside-dark card-surface">
        <p class="eyebrow">${escapeHtml(hero.eyebrow)}</p>
        <h1 class="hero-title">${escapeHtml(hero.title)}</h1>
        <p class="hero-intro">${escapeHtml(hero.intro)}</p>
        <p class="hero-support">${escapeHtml(hero.support)}</p>
        <div class="hero-mini-steps">
          ${operatingSteps
            .map(
              (item) => `<div class="hero-step-line">
                <span class="step-number">${escapeHtml(item.step)}</span>
                <p>${escapeHtml(item.title)}</p>
              </div>`
            )
            .join("")}
        </div>
        <p class="hero-note">${escapeHtml(hero.note)}</p>
        <div class="hero-actions">
          <a ${linkAttrs(hero.primaryCta.href, "button")}>${escapeHtml(hero.primaryCta.label)}</a>
          <a ${linkAttrs("/use-cases", "ghost-button")}>Browse Use Cases</a>
        </div>
      </aside>
    </div>
  </section>`;
}

function renderBrowseModes() {
  return `<section class="section" id="browse-modes">
    ${renderSectionHead(
      "Entry Routes",
      "先按你最有把握的维度进去",
      "首页只负责定调和导流。真正的解释要下钻到 families、movements 和 use cases。"
    )}
    <div class="route-grid">
      ${browseModes
        .map((item) => {
          const href = routeHref[item.id] || item.href || "/";
          return `<article class="route-card card-surface">
            <div class="card-body">
              <div class="route-card-top">
                <p class="card-kicker">${escapeHtml(item.title)}</p>
                <span class="route-count">${escapeHtml(item.count)}</span>
              </div>
              <h3 class="card-title">${escapeHtml(item.summary)}</h3>
              <p class="card-summary">${escapeHtml(item.detail)}</p>
              <a ${linkAttrs(href, "text-link")}>Open route</a>
            </div>
          </article>`;
        })
        .join("")}
    </div>
  </section>`;
}

function renderFamilyCard(item) {
  return `<article class="family-card card-surface">
    <a ${linkAttrs(familyHref(item.id), "card-media family-card-media")}>
      ${renderImageFrame(item.cover, item.title)}
      <div class="card-overlay">
        <span class="card-overlay-label">Web Family</span>
        <h3 class="card-overlay-title">${escapeHtml(item.title)}</h3>
      </div>
    </a>
    <div class="card-body">
      <p class="card-summary">${escapeHtml(item.summary)}</p>
      <div class="meta-block">
        <h4>Historical Roots</h4>
        ${renderLinkedPills(item.movementIds, movementMap, movementHref)}
      </div>
      <div class="meta-block">
        <h4>Best For</h4>
        ${renderStaticPills(item.bestFor.slice(0, 3))}
      </div>
      <a ${linkAttrs(familyHref(item.id), "text-link")}>Open family</a>
    </div>
  </article>`;
}

function renderFamilyGridSection(options = {}) {
  const {
    title = "Contemporary Web Families",
    kicker = "Current Families",
    summary = "今天网页里已经稳定成型的风格家族。它们回答的是‘现在的网站长什么样’，而不是历史谱系本身。",
    familiesList = families,
    sectionId = "featured-families",
    actionMarkup = `<a ${linkAttrs("/families", "text-link")}>All families</a>`
  } = options;

  return `<section class="section" id="${escapeHtml(sectionId)}">
    ${renderSectionHead(kicker, title, summary, actionMarkup)}
    <div class="family-grid">
      ${familiesList.map((item) => renderFamilyCard(item)).join("")}
    </div>
  </section>`;
}

function renderMovementCard(item) {
  return `<article class="movement-card card-surface">
    <div class="movement-strip">
      ${item.samples
        .slice(0, 2)
        .map((sample) => renderImageFrame(sample.screenshot, sample.alt, "movement-thumb"))
        .join("")}
    </div>
    <div class="card-body">
      <div class="movement-meta">
        <p class="card-kicker">${escapeHtml(item.era)}</p>
        <span class="micro-note">${escapeHtml(item.origin)}</span>
      </div>
      <h3 class="card-title">${escapeHtml(item.title)}</h3>
      <p class="card-summary">${escapeHtml(item.summary)}</p>
      <div class="meta-block">
        <h4>Descendant Families</h4>
        ${renderLinkedPills(item.familyIds, familyMap, familyHref)}
      </div>
      <a ${linkAttrs(movementHref(item.id), "text-link")}>Open movement</a>
    </div>
  </article>`;
}

function renderMovementGridSection(options = {}) {
  const {
    title = "Historical Movements",
    kicker = "Design History",
    summary = "把历史谱系和网页家族拆开之后，风格判断才会稳定。这里看的是祖先语言，而不是现成模板。",
    movementsList = movements,
    sectionId = "historical-movements",
    actionMarkup = `<a ${linkAttrs("/movements", "text-link")}>All movements</a>`
  } = options;

  return `<section class="section" id="${escapeHtml(sectionId)}">
    ${renderSectionHead(kicker, title, summary, actionMarkup)}
    <div class="movement-grid">
      ${movementsList.map((item) => renderMovementCard(item)).join("")}
    </div>
  </section>`;
}

function renderUseCaseCard(item) {
  const primaryFamily = familyMap.get(item.primaryFamilyId);
  const structureTitles = item.structureIds.map((id) => structureMap.get(id)?.title).filter(Boolean);

  return `<article class="usecase-card card-surface">
    <a ${linkAttrs(useCaseHref(item.id), "card-media usecase-media")}>
      ${renderImageFrame(primaryFamily?.cover || "", primaryFamily?.title || item.title)}
      <div class="card-overlay">
        <span class="card-overlay-label">Use Case</span>
        <h3 class="card-overlay-title">${escapeHtml(item.title)}</h3>
      </div>
    </a>
    <div class="card-body">
      <p class="card-summary">${escapeHtml(item.summary)}</p>
      <div class="meta-block">
        <h4>Primary Family</h4>
        <p>${escapeHtml(primaryFamily?.title || "Pending")}</p>
      </div>
      <div class="meta-block">
        <h4>Structure</h4>
        ${renderStaticPills(structureTitles)}
      </div>
      <a ${linkAttrs(useCaseHref(item.id), "text-link")}>Open use case</a>
    </div>
  </article>`;
}

function renderUseCaseSection(options = {}) {
  const {
    title = "Use Cases",
    kicker = "Task Fit",
    summary = "如果你不是从审美出发，而是从‘我要做什么内容’出发，这一层会更快把你带到正确的 family 和 structure。",
    useCasesList = useCases,
    sectionId = "use-cases",
    actionMarkup = `<a ${linkAttrs("/use-cases", "text-link")}>All use cases</a>`
  } = options;

  return `<section class="section" id="${escapeHtml(sectionId)}">
    ${renderSectionHead(kicker, title, summary, actionMarkup)}
    <div class="usecase-grid">
      ${useCasesList.map((item) => renderUseCaseCard(item)).join("")}
    </div>
  </section>`;
}

function renderPageLead({ kicker, title, summary, detail, actions = "" }) {
  return `<section class="page-lead">
    <div class="page-lead-copy">
      <p class="eyebrow">${escapeHtml(kicker)}</p>
      <h1 class="hero-title">${escapeHtml(title)}</h1>
      <p class="hero-intro">${escapeHtml(summary)}</p>
    </div>
    <aside class="page-lead-aside card-surface">
      <p>${escapeHtml(detail)}</p>
      ${actions}
    </aside>
  </section>`;
}

function renderBackLink(href, label) {
  return `<a ${linkAttrs(href, "back-link")}>${escapeHtml(label)}</a>`;
}

function renderFamilyDetail(item) {
  const relatedMovements = item.movementIds.map((id) => movementMap.get(id)).filter(Boolean);
  const relatedStructures = item.structureIds.map((id) => structureMap.get(id)).filter(Boolean);

  return layout({
    title: `${item.title} · ${siteMeta.title}`,
    description: item.summary,
    pathname: familyHref(item.id),
    pageClass: "detail-page family-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${renderImageFigure(item.cover, item.title, item.title)}
        </div>
        <div class="detail-copy card-surface">
          ${renderBackLink("/families", "Back To Families")}
          <p class="eyebrow">Contemporary Web Family</p>
          <h1 class="detail-title">${escapeHtml(item.title)}</h1>
          <p class="detail-summary">${escapeHtml(item.summary)}</p>
          <div class="detail-meta-grid">
            <div class="meta-block">
              <h4>Historical Roots</h4>
              ${renderLinkedPills(item.movementIds, movementMap, movementHref)}
            </div>
            <div class="meta-block">
              <h4>Structure Fit</h4>
              ${renderStaticPills(relatedStructures.map((structure) => structure.title))}
            </div>
          </div>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Interpretation", "怎么借这条家族，而不是只模仿表面", "")}
        <div class="detail-section-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">Signature</p>${renderList(
            item.signature
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">Borrow</p>${renderList(
            item.borrow
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">Best For</p>${renderList(
            item.bestFor
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">Avoid When</p>${renderList(
            item.avoidWhen
          )}</div></article>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Sample Gallery", "真实网站样本", "从真实站点看这条家族是怎样落地的。")}
        <div class="gallery-grid">
          ${item.samples.map((sample) => renderImageFigure(sample.screenshot, sample.alt, sample.label)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Historical Roots", "它从哪些更早的语言长出来", "")}
        <div class="movement-grid">
          ${relatedMovements.map((movement) => renderMovementCard(movement)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Prompt DNA", "可以直接给 agent 的风格 packet", "")}
        <article class="detail-card card-surface">
          <div class="card-body">
            <p class="card-kicker">Prompt DNA</p>
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <code>${escapeHtml(item.prompt)}</code>
            <div class="hero-actions">
              <button class="copy-button" type="button" data-copy-prompt>Copy</button>
            </div>
          </div>
        </article>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Reference Packet", "继续打开真实站点看细节", "")}
        <article class="detail-card card-surface">
          <div class="card-body">${renderExternalLinks(item.references)}</div>
        </article>
      </section>`
    ].join("")
  });
}

function renderMovementDetail(item) {
  const relatedFamilies = item.familyIds.map((id) => familyMap.get(id)).filter(Boolean);
  const leadSample = item.samples[0];

  return layout({
    title: `${item.title} · ${siteMeta.title}`,
    description: item.summary,
    pathname: movementHref(item.id),
    pageClass: "detail-page movement-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${leadSample ? renderImageFigure(leadSample.screenshot, leadSample.alt, leadSample.label) : `<div class="image-placeholder">Image pending</div>`}
        </div>
        <div class="detail-copy card-surface">
          ${renderBackLink("/movements", "Back To Movements")}
          <p class="eyebrow">Historical Movement</p>
          <h1 class="detail-title">${escapeHtml(item.title)}</h1>
          <p class="detail-summary">${escapeHtml(item.summary)}</p>
          <div class="detail-meta-grid">
            <div class="meta-block">
              <h4>Period</h4>
              <p>${escapeHtml(item.era)}</p>
            </div>
            <div class="meta-block">
              <h4>Origin</h4>
              <p>${escapeHtml(item.origin)}</p>
            </div>
          </div>
          <div class="meta-block">
            <h4>Why It Matters</h4>
            <p>${escapeHtml(item.whyItMatters)}</p>
          </div>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Core Traits", "先理解这条语言本身", "")}
        <div class="detail-section-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">Principles</p>${renderList(
            item.principles
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">Watchouts</p>${renderList(
            item.watchouts
          )}</div></article>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Sample Gallery", "历史语言在今天的网页里如何现身", "")}
        <div class="gallery-grid">
          ${item.samples.map((sample) => renderImageFigure(sample.screenshot, sample.alt, sample.label)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Descendant Families", "今天在网页里更接近哪些家族", "")}
        <div class="family-grid">
          ${relatedFamilies.map((family) => renderFamilyCard(family)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Reference Links", "继续读历史和看案例", "")}
        <article class="detail-card card-surface">
          <div class="card-body">${renderExternalLinks(item.references)}</div>
        </article>
      </section>`
    ].join("")
  });
}

function renderUseCasePrompt(item) {
  const primaryFamily = familyMap.get(item.primaryFamilyId);
  const secondaryFamilies = item.secondaryFamilyIds.map((id) => familyMap.get(id)).filter(Boolean);
  const structures = item.structureIds.map((id) => structureMap.get(id)).filter(Boolean);

  return `Content type: ${item.title}
IA layer: ${structures.map((entry) => entry.title).join(" / ")}
Visual family: ${primaryFamily?.title || "Pending"}${secondaryFamilies.length ? ` + ${secondaryFamilies.map((entry) => entry.title).join(" / ")}` : ""}
Reference packet: ${[primaryFamily, ...secondaryFamilies].filter(Boolean).map((entry) => entry.title).join(" / ")}
Mood: ${item.summary}
Required traits: ${item.userGoal}
Avoid: ${item.avoid.join(" / ")}`;
}

function renderUseCaseDetail(item) {
  const primaryFamily = familyMap.get(item.primaryFamilyId);
  const secondaryFamilies = item.secondaryFamilyIds.map((id) => familyMap.get(id)).filter(Boolean);
  const structures = item.structureIds.map((id) => structureMap.get(id)).filter(Boolean);
  const referenceFamilies = [primaryFamily, ...secondaryFamilies].filter(Boolean);

  return layout({
    title: `${item.title} · ${siteMeta.title}`,
    description: item.summary,
    pathname: useCaseHref(item.id),
    pageClass: "detail-page usecase-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${renderImageFigure(primaryFamily?.cover || "", primaryFamily?.title || item.title, primaryFamily?.title || item.title)}
        </div>
        <div class="detail-copy card-surface">
          ${renderBackLink("/use-cases", "Back To Use Cases")}
          <p class="eyebrow">Use Case</p>
          <h1 class="detail-title">${escapeHtml(item.title)}</h1>
          <p class="detail-summary">${escapeHtml(item.summary)}</p>
          <div class="detail-meta-grid">
            <div class="meta-block">
              <h4>Primary Family</h4>
              <p>${escapeHtml(primaryFamily?.title || "Pending")}</p>
            </div>
            <div class="meta-block">
              <h4>Structures</h4>
              ${renderStaticPills(structures.map((entry) => entry.title))}
            </div>
          </div>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Why This Fit Works", "从任务反推视觉和结构", "")}
        <div class="detail-section-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">Content Shape</p><p>${escapeHtml(
            item.contentShape
          )}</p></div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">User Goal</p><p>${escapeHtml(
            item.userGoal
          )}</p></div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">Why</p><p>${escapeHtml(
            item.note
          )}</p></div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">Avoid</p>${renderList(
            item.avoid
          )}</div></article>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Recommended Families", "这个场景最适合借哪几条家族", "")}
        <div class="family-grid">
          ${referenceFamilies.map((family) => renderFamilyCard(family)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead("Prompt Packet", "可以直接复制给 agent 的场景提示", "")}
        <article class="detail-card card-surface">
          <div class="card-body">
            <p class="card-kicker">Prompt Packet</p>
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <code>${escapeHtml(renderUseCasePrompt(item))}</code>
            <div class="hero-actions">
              <button class="copy-button" type="button" data-copy-prompt>Copy</button>
            </div>
          </div>
        </article>
      </section>`
    ].join("")
  });
}

function buildHomePage() {
  return layout({
    title: siteMeta.title,
    description: siteMeta.description,
    pathname: "/",
    pageClass: "home-page",
    body: [
      renderHeroStage(),
      renderBrowseModes(),
      renderFamilyGridSection({ familiesList: families.slice(0, 6) }),
      renderUseCaseSection({ useCasesList: useCases }),
      renderMovementGridSection()
    ].join("")
  });
}

function buildFamiliesPage() {
  return layout({
    title: `Families · ${siteMeta.title}`,
    description: "Contemporary web families for the Design Zondev style atlas.",
    pathname: "/families",
    pageClass: "index-page families-page",
    body: [
      renderPageLead({
        kicker: "Contemporary Web Families",
        title: "按网页呈现家族浏览",
        summary: "这一层解决“现在的网站长什么样”。它讲的是网页表现语言、适用任务和可借鉴语法。",
        detail: "如果你已经知道自己喜欢的是 editorial、Swiss、product precision 或 anti-grid，就从这里直接下钻。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>Back home</a><a ${linkAttrs("/movements", "button")}>Open movements</a></div>`
      }),
      renderFamilyGridSection({
        title: "All Families",
        kicker: "Atlas Index",
        summary: "把今天网页里最常见的风格家族单独列出来，不再和设计史层混在一起。",
        familiesList: families,
        sectionId: "all-families",
        actionMarkup: ""
      })
    ].join("")
  });
}

function buildMovementsPage() {
  return layout({
    title: `Movements · ${siteMeta.title}`,
    description: "Historical movements for the Design Zondev style atlas.",
    pathname: "/movements",
    pageClass: "index-page movements-page",
    body: [
      renderPageLead({
        kicker: "Historical Movements",
        title: "按设计谱系浏览",
        summary: "这一层看的是语言来源，而不是网页模板。它帮助你把“我喜欢这种味道”接回更稳定的历史语境。",
        detail: "如果你想知道某种网页风格究竟更像 Swiss、Bauhaus、Memphis 还是 Cyberpunk，就从这里开始。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>Back home</a><a ${linkAttrs("/families", "button")}>Open families</a></div>`
      }),
      renderMovementGridSection({
        title: "All Movements",
        kicker: "History Index",
        summary: "从 Bauhaus、Swiss、Memphis 到 Cyberpunk，这一层帮助你识别网页视觉语言背后的祖先。",
        movementsList: movements,
        sectionId: "all-movements",
        actionMarkup: ""
      })
    ].join("")
  });
}

function buildUseCasesPage() {
  return layout({
    title: `Use Cases · ${siteMeta.title}`,
    description: "Use cases for matching content types to design families.",
    pathname: "/use-cases",
    pageClass: "index-page usecases-page",
    body: [
      renderPageLead({
        kicker: "Use Cases",
        title: "按内容和任务反推风格",
        summary: "如果你不是在做审美研究，而是在准备一个具体网站，这一层会比先看设计史更快。",
        detail: "它把‘我要做什么内容’直接映射到 family、structure 和 prompt packet。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>Back home</a><a ${linkAttrs("/families", "button")}>Open families</a></div>`
      }),
      renderUseCaseSection({
        title: "All Use Cases",
        kicker: "Task Index",
        summary: "从 style atlas、文化出版、研究知识站、AI 工具到 future-tech launch，都能直接找到推荐组合。",
        useCasesList: useCases,
        sectionId: "all-use-cases",
        actionMarkup: ""
      })
    ].join("")
  });
}

function build() {
  fs.rmSync(distRoot, { recursive: true, force: true });
  ensureDir(distRoot);
  copyIfExists(path.join(srcRoot, "site.css"), path.join(distRoot, "site.css"));
  copyIfExists(path.join(srcRoot, "app.js"), path.join(distRoot, "app.js"));
  copyIfExists(path.join(srcRoot, "favicon.svg"), path.join(distRoot, "favicon.svg"));
  copyDir(path.join(srcRoot, "screenshots"), path.join(distRoot, "screenshots"));

  writePage([], buildHomePage());
  writePage(["families"], buildFamiliesPage());
  writePage(["movements"], buildMovementsPage());
  writePage(["use-cases"], buildUseCasesPage());

  for (const family of families) {
    writePage(["families", family.id], renderFamilyDetail(family));
  }

  for (const movement of movements) {
    writePage(["movements", movement.id], renderMovementDetail(movement));
  }

  for (const useCase of useCases) {
    writePage(["use-cases", useCase.id], renderUseCaseDetail(useCase));
  }
}

build();

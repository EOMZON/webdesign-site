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
import {
  browseModeMeta,
  extraHistoricalMovements,
  familyMeta,
  movementMeta,
  structureMeta,
  useCaseMeta
} from "../src/atlas-taxonomy.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distRoot = path.join(root, "dist");
const srcRoot = path.join(root, "src");

function addBilingualFields(item, meta = {}, fallbackZh = "") {
  const titleEn = meta.en || item.titleEn || item.title || "";
  const titleZh = meta.zh || item.titleZh || fallbackZh || item.title || titleEn;
  return {
    ...item,
    titleEn,
    titleZh,
    title: titleEn
  };
}

const structures = structurePatterns.map((item) => addBilingualFields(item, structureMeta[item.id]));

const familySummaryZh = {
  "magazine-editorial": "以封面感和主稿节奏为核心的杂志型页面，首屏像一期杂志的 lead spread，而不是通用 SaaS hero。",
  "quiet-lifestyle-editorial": "更安静、更慢、更像收藏刊物或气质目录的生活方式页面，强调质感与留白而不是强操作感。",
  "swiss-typographic-grid": "以网格、排印和对齐关系组织信息的系统型页面，适合会持续生长的档案、参考库和知识站。",
  "product-precision-interface": "强调状态、层级和界面清晰度的产品型页面，气质服从任务，精度高于氛围。",
  "stage-driven-showcase": "首屏像舞台或镜头，一张图或一个场景先建立世界，再把内容逐层展开。",
  "curated-reference-directory": "以索引、缩略图和分类入口为核心的参考目录型页面，先让用户浏览，再让用户钻取。",
  "evidence-dense-knowledge-surface": "论点、证据、导航和标签并存的知识型页面，密度高但必须保持可信和可扫描。",
  "playful-postmodern-anti-grid": "带着反模板态度的后现代页面，通过反网格、强形状和少量冲突打破同质化。",
  "neon-techno-futurist-interface": "黑底霓虹、世界观先行的未来科技页面，更接近游戏、硬件或沉浸式 tech launch。"
};

const families = visualFamilies.map((item) =>
  addBilingualFields(
    {
      ...item,
      cover: item.samples[0]?.screenshot || "",
      movementIds: item.ancestors || [],
      summaryZh: familySummaryZh[item.id] || ""
    },
    familyMeta[item.id]
  )
);

const movementSeed = new Map();

for (const item of historicalMovements) {
  movementSeed.set(item.id, item);
}

for (const item of extraHistoricalMovements) {
  if (!movementSeed.has(item.id)) {
    movementSeed.set(item.id, item);
  }
}

const movements = Array.from(movementSeed.values()).map((item) => {
  const withTitles = addBilingualFields(item, movementMeta[item.id]);
  return {
    ...withTitles,
    era: item.period,
    familyIds: item.webFamilyIds || [],
    principles: item.signatures || [],
    watchouts: item.watchFor || [],
    webFit: item.webFit || movementMeta[item.id]?.webFit || ""
  };
});

const rawUseCases = [
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

const useCases = rawUseCases.map((item) => addBilingualFields(item, useCaseMeta[item.id]));

const routes = browseModes.map((item) => {
  const bilingual = addBilingualFields(item, browseModeMeta[item.id]);
  let count = item.count;

  if (item.id === "movements") count = String(movements.length);
  if (item.id === "families") count = String(families.length);
  if (item.id === "use-cases") count = String(useCases.length);

  return { ...bilingual, count };
});

const familyMap = new Map(families.map((item) => [item.id, item]));
const movementMap = new Map(movements.map((item) => [item.id, item]));
const structureMap = new Map(structures.map((item) => [item.id, item]));

const routeHref = {
  movements: "/movements",
  families: "/families",
  "use-cases": "/use-cases"
};

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

function bilingualText(zh, en) {
  if (!zh && !en) return "";
  if (!zh) return en;
  if (!en) return zh;
  return `${zh} / ${en}`;
}

function renderBilingualInline(zh, en, className = "") {
  const text = bilingualText(zh, en);
  return `<span class="${escapeHtml(className || "bilingual-inline")}">${escapeHtml(text)}</span>`;
}

function renderBilingualStack(zh, en, className = "") {
  return `<span class="bilingual-stack${className ? ` ${escapeHtml(className)}` : ""}">
    <span class="bilingual-stack-zh">${escapeHtml(zh || en || "")}</span>
    ${en ? `<span class="bilingual-stack-en">${escapeHtml(en)}</span>` : ""}
  </span>`;
}

function displayTitle(item) {
  return bilingualText(item?.titleZh, item?.titleEn || item?.title);
}

function normalizePill(item) {
  if (typeof item === "string") {
    return { zh: item, en: "" };
  }

  if (item && typeof item === "object") {
    return {
      zh: item.zh || item.titleZh || item.labelZh || item.title || item.en || item.titleEn || "",
      en: item.en || item.titleEn || item.labelEn || ""
    };
  }

  return { zh: "", en: "" };
}

function renderList(items = []) {
  if (!items.length) return `<p class="empty-note">${escapeHtml(bilingualText("待补充", "Pending"))}</p>`;
  return `<ul class="bullet-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderStaticPills(items = []) {
  if (!items.length) return `<p class="empty-note">${escapeHtml(bilingualText("待补充", "Pending"))}</p>`;
  return `<div class="pill-row">
    ${items
      .map((item) => {
        const pill = normalizePill(item);
        return `<span class="pill is-static">${renderBilingualInline(pill.zh, pill.en, "pill-text")}</span>`;
      })
      .join("")}
  </div>`;
}

function renderLinkedPills(ids = [], sourceMap, hrefFor) {
  if (!ids.length) return `<p class="empty-note">${escapeHtml(bilingualText("待补链接", "Pending Links"))}</p>`;
  return `<div class="pill-row">
    ${ids
      .map((id) => {
        const item = sourceMap.get(id);
        if (!item) return "";
        return `<a ${linkAttrs(hrefFor(id), "pill")}>${renderBilingualInline(item.titleZh, item.titleEn || item.title, "pill-text")}</a>`;
      })
      .join("")}
  </div>`;
}

function renderExternalLinks(items = []) {
  if (!items.length) return `<p class="empty-note">${escapeHtml(bilingualText("待补链接", "Pending Links"))}</p>`;
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
    return `<div class="image-placeholder ${escapeHtml(className)}">${escapeHtml(bilingualText("图片待补充", "Image Pending"))}</div>`;
  }

  const absolute = path.join(srcRoot, "screenshots", fileName);
  if (!fs.existsSync(absolute)) {
    return `<div class="image-placeholder ${escapeHtml(className)}">${escapeHtml(bilingualText("截图缺失", "Missing Screenshot"))}<br />${escapeHtml(fileName)}</div>`;
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
        <a href="/">${escapeHtml(bilingualText("首页", "Home"))}</a>
        <a href="/families">${escapeHtml(bilingualText("网页家族", "Web Families"))}</a>
        <a href="/movements">${escapeHtml(bilingualText("历史流派", "Historical Movements"))}</a>
        <a href="/use-cases">${escapeHtml(bilingualText("使用场景", "Use Cases"))}</a>
      </nav>
      <span class="status-pill">atlas v0.6</span>
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
          <p>${escapeHtml(bilingualText("设计风格图谱：历史流派、网页家族、使用场景与真实参考", "Design atlas: movements, web families, use cases, and live references"))}</p>
          <p>Updated ${escapeHtml(siteMeta.updatedAt)} · ${escapeHtml(siteMeta.origin.replace(/^https?:\/\//, ""))}</p>
        </div>
      </footer>
    </div>
  </body>
</html>`;
}

function renderHeroTile(item) {
  const familyId = item.href && item.href.startsWith("/families/") ? item.href.split("/").filter(Boolean).pop() : "";
  const family = familyMap.get(familyId);
  const metaLabel = family ? displayTitle(family) : item.meta;

  return `<a ${linkAttrs(item.href, `hero-tile hero-tile--${item.size || "standard"}`)}>
    ${renderImageFrame(item.screenshot, item.alt)}
    <div class="hero-caption">
      <span class="hero-caption-label">${escapeHtml(item.label)}</span>
      <span class="hero-caption-meta">${escapeHtml(metaLabel)}</span>
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
        <p class="eyebrow">${escapeHtml(bilingualText("风格图谱首页", "Design Atlas"))}</p>
        <h1 class="hero-title">${escapeHtml(hero.title)}</h1>
        <p class="hero-intro">先看图，再选类，再下钻到真实参考页。</p>
        <p class="hero-support">历史流派 / Historical Movements、网页家族 / Web Families、使用场景 / Use Cases 三条路径并行存在，不再被一种固定模板绑死。</p>
        <div class="hero-actions">
          <a ${linkAttrs("/movements", "ghost-button")}>${escapeHtml(bilingualText("浏览历史流派", "Browse Movements"))}</a>
          <a ${linkAttrs(hero.primaryCta.href, "button")}>${escapeHtml(bilingualText("浏览网页家族", "Browse Families"))}</a>
          <a ${linkAttrs("/use-cases", "ghost-button")}>${escapeHtml(bilingualText("浏览使用场景", "Browse Use Cases"))}</a>
        </div>
      </aside>
    </div>
  </section>`;
}

function renderBrowseModes() {
  return `<section class="section" id="browse-modes">
    ${renderSectionHead(
      bilingualText("浏览入口", "Entry Routes"),
      bilingualText("先从你最熟悉的维度进入", "Start from the dimension you recognize first"),
      "先做选择，再进详情页，不把整套理论都堆在首页。"
    )}
    <div class="route-grid">
      ${routes
        .map((item) => {
          const href = routeHref[item.id] || item.href || "/";
          return `<article class="route-card card-surface">
            <div class="card-body">
              <div class="route-card-top">
                <p class="card-kicker">${escapeHtml(bilingualText(item.titleZh, item.titleEn || item.title))}</p>
                <span class="route-count">${escapeHtml(item.count)}</span>
              </div>
              <h3 class="card-title">${escapeHtml(item.summary)}</h3>
              <p class="card-summary">${escapeHtml(item.detail)}</p>
              <a ${linkAttrs(href, "text-link")}>${escapeHtml(bilingualText("进入分类", "Open Route"))}</a>
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
      ${renderImageFrame(item.cover, displayTitle(item))}
      <div class="card-overlay">
        <span class="card-overlay-label">${escapeHtml(bilingualText("网页家族", "Web Family"))}</span>
        <h3 class="card-overlay-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
      </div>
    </a>
    <div class="card-body">
      <p class="card-summary">${escapeHtml(item.summaryZh || item.summary)}</p>
      <div class="meta-block">
        <h4>${escapeHtml(bilingualText("历史源头", "Historical Roots"))}</h4>
        ${renderLinkedPills(item.movementIds, movementMap, movementHref)}
      </div>
      <div class="meta-block">
        <h4>${escapeHtml(bilingualText("适合内容", "Best For"))}</h4>
        ${renderStaticPills(item.bestFor.slice(0, 3))}
      </div>
      <a ${linkAttrs(familyHref(item.id), "text-link")}>${escapeHtml(bilingualText("查看详情", "Open Family"))}</a>
    </div>
  </article>`;
}

function renderFamilyGridSection(options = {}) {
  const {
    title = bilingualText("网页家族", "Web Families"),
    kicker = bilingualText("当代网页类型", "Current Families"),
    summary = "今天网站里已经稳定成型的呈现家族。它们回答的是网页现在怎么长，而不是历史祖先本身。",
    familiesList = families,
    sectionId = "featured-families",
    actionMarkup = `<a ${linkAttrs("/families", "text-link")}>${escapeHtml(bilingualText("全部家族", "All Families"))}</a>`
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
      <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
      <p class="card-summary">${escapeHtml(item.summary)}</p>
      <div class="meta-block">
        <h4>${escapeHtml(bilingualText("后代网页家族", "Descendant Families"))}</h4>
        ${renderLinkedPills(item.familyIds, familyMap, familyHref)}
      </div>
      <a ${linkAttrs(movementHref(item.id), "text-link")}>${escapeHtml(bilingualText("查看详情", "Open Movement"))}</a>
    </div>
  </article>`;
}

function renderMovementGridSection(options = {}) {
  const {
    title = bilingualText("历史流派", "Historical Movements"),
    kicker = bilingualText("设计史谱系", "Design History"),
    summary = "把历史谱系和网页家族拆开后，风格判断才会稳定。这里看的是祖先语言，不是现成网页模板。",
    movementsList = movements,
    sectionId = "historical-movements",
    actionMarkup = `<a ${linkAttrs("/movements", "text-link")}>${escapeHtml(bilingualText("全部流派", "All Movements"))}</a>`
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
  const structureTitles = item.structureIds.map((id) => structureMap.get(id)).filter(Boolean);

  return `<article class="usecase-card card-surface">
    <a ${linkAttrs(useCaseHref(item.id), "card-media usecase-media")}>
      ${renderImageFrame(primaryFamily?.cover || "", displayTitle(primaryFamily) || displayTitle(item))}
      <div class="card-overlay">
        <span class="card-overlay-label">${escapeHtml(bilingualText("使用场景", "Use Case"))}</span>
        <h3 class="card-overlay-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
      </div>
    </a>
    <div class="card-body">
      <p class="card-summary">${escapeHtml(item.summary)}</p>
      <div class="meta-block">
        <h4>${escapeHtml(bilingualText("主家族", "Primary Family"))}</h4>
        <p>${escapeHtml(displayTitle(primaryFamily) || bilingualText("待补充", "Pending"))}</p>
      </div>
      <div class="meta-block">
        <h4>${escapeHtml(bilingualText("结构", "Structure"))}</h4>
        ${renderStaticPills(structureTitles)}
      </div>
      <a ${linkAttrs(useCaseHref(item.id), "text-link")}>${escapeHtml(bilingualText("查看详情", "Open Use Case"))}</a>
    </div>
  </article>`;
}

function renderUseCaseSection(options = {}) {
  const {
    title = bilingualText("使用场景", "Use Cases"),
    kicker = bilingualText("任务匹配", "Task Fit"),
    summary = "如果你不是从审美出发，而是从我要做什么内容出发，这一层会更快带你选对 family 和 structure。",
    useCasesList = useCases,
    sectionId = "use-cases",
    actionMarkup = `<a ${linkAttrs("/use-cases", "text-link")}>${escapeHtml(bilingualText("全部场景", "All Use Cases"))}</a>`
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
    title: `${displayTitle(item)} · ${siteMeta.title}`,
    description: item.summaryZh || item.summary,
    pathname: familyHref(item.id),
    pageClass: "detail-page family-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${renderImageFigure(item.cover, displayTitle(item), displayTitle(item))}
        </div>
        <div class="detail-copy card-surface">
          ${renderBackLink("/families", bilingualText("返回网页家族", "Back To Families"))}
          <p class="eyebrow">${escapeHtml(bilingualText("网页家族", "Contemporary Web Family"))}</p>
          <h1 class="detail-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title, "detail-bilingual-title")}</h1>
          <p class="detail-summary">${escapeHtml(item.summaryZh || item.summary)}</p>
          <div class="detail-meta-grid">
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("历史源头", "Historical Roots"))}</h4>
              ${renderLinkedPills(item.movementIds, movementMap, movementHref)}
            </div>
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("适配结构", "Structure Fit"))}</h4>
              ${renderStaticPills(relatedStructures)}
            </div>
          </div>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("真实样本", "Sample Gallery"),
          bilingualText("真实网站样本", "Live Website Samples"),
          "从真实站点看这条家族是怎样落地的。"
        )}
        <div class="gallery-grid">
          ${item.samples.map((sample) => renderImageFigure(sample.screenshot, sample.alt, sample.label)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("借法", "Interpretation"),
          bilingualText("借这条家族的语法，不只模仿表面", "Borrow the grammar, not only the surface"),
          ""
        )}
        <div class="detail-section-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("识别特征", "Signature"))}</p>${renderList(
            item.signature
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("可借语法", "Borrow"))}</p>${renderList(
            item.borrow
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("适合内容", "Best For"))}</p>${renderList(
            item.bestFor
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("不适合时机", "Avoid When"))}</p>${renderList(
            item.avoidWhen
          )}</div></article>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("历史源头", "Historical Roots"),
          bilingualText("它从哪些更早的语言长出来", "Which earlier languages shaped it"),
          ""
        )}
        <div class="movement-grid">
          ${relatedMovements.map((movement) => renderMovementCard(movement)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("Prompt 风格包", "Prompt DNA"),
          bilingualText("可以直接给 agent 的风格包", "A ready-to-use prompt packet"),
          ""
        )}
        <article class="detail-card card-surface">
          <div class="card-body">
            <p class="card-kicker">${escapeHtml(bilingualText("Prompt 风格包", "Prompt DNA"))}</p>
            <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
            <code>${escapeHtml(item.prompt)}</code>
            <div class="hero-actions">
              <button class="copy-button" type="button" data-copy-prompt>${escapeHtml(bilingualText("复制", "Copy"))}</button>
            </div>
          </div>
        </article>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("参考链接", "Reference Packet"),
          bilingualText("继续打开真实站点看细节", "Open the live references"),
          ""
        )}
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
    title: `${displayTitle(item)} · ${siteMeta.title}`,
    description: item.summary,
    pathname: movementHref(item.id),
    pageClass: "detail-page movement-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${leadSample ? renderImageFigure(leadSample.screenshot, leadSample.alt, leadSample.label) : `<div class="image-placeholder">${escapeHtml(bilingualText("图片待补充", "Image Pending"))}</div>`}
        </div>
        <div class="detail-copy card-surface">
          ${renderBackLink("/movements", bilingualText("返回历史流派", "Back To Movements"))}
          <p class="eyebrow">${escapeHtml(bilingualText("历史流派", "Historical Movement"))}</p>
          <h1 class="detail-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title, "detail-bilingual-title")}</h1>
          <p class="detail-summary">${escapeHtml(item.summary)}</p>
          <div class="detail-meta-grid">
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("时期", "Period"))}</h4>
              <p>${escapeHtml(item.era)}</p>
            </div>
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("起源", "Origin"))}</h4>
              <p>${escapeHtml(item.origin)}</p>
            </div>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("网页中的意义", "Why It Matters"))}</h4>
            <p>${escapeHtml(item.whyItMatters)}</p>
          </div>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("真实样本", "Sample Gallery"),
          bilingualText("历史语言在今天的网页里如何现身", "How it appears in the web today"),
          ""
        )}
        <div class="gallery-grid">
          ${item.samples.map((sample) => renderImageFigure(sample.screenshot, sample.alt, sample.label)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("核心特征", "Core Traits"),
          bilingualText("先理解这条语言本身", "Understand the language itself"),
          ""
        )}
        <div class="detail-section-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("原则", "Principles"))}</p>${renderList(
            item.principles
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("误用提醒", "Watchouts"))}</p>${renderList(
            item.watchouts
          )}</div></article>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("后代网页家族", "Descendant Families"),
          bilingualText("今天在网页里更接近哪些家族", "Which web families carry it today"),
          ""
        )}
        <div class="family-grid">
          ${relatedFamilies.map((family) => renderFamilyCard(family)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("参考链接", "Reference Links"),
          bilingualText("继续读历史和看案例", "Keep reading and compare references"),
          ""
        )}
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

  return `内容类型 Content Type: ${displayTitle(item)}
信息结构 IA Layer: ${structures.map((entry) => displayTitle(entry)).join(" / ")}
视觉家族 Visual Family: ${displayTitle(primaryFamily) || bilingualText("待补充", "Pending")}${secondaryFamilies.length ? ` + ${secondaryFamilies.map((entry) => displayTitle(entry)).join(" / ")}` : ""}
参考组合 Reference Packet: ${[primaryFamily, ...secondaryFamilies].filter(Boolean).map((entry) => displayTitle(entry)).join(" / ")}
场景气质 Mood: ${item.summary}
关键要求 Required Traits: ${item.userGoal}
避免 Avoid: ${item.avoid.join(" / ")}`;
}

function renderUseCaseDetail(item) {
  const primaryFamily = familyMap.get(item.primaryFamilyId);
  const secondaryFamilies = item.secondaryFamilyIds.map((id) => familyMap.get(id)).filter(Boolean);
  const structures = item.structureIds.map((id) => structureMap.get(id)).filter(Boolean);
  const referenceFamilies = [primaryFamily, ...secondaryFamilies].filter(Boolean);

  return layout({
    title: `${displayTitle(item)} · ${siteMeta.title}`,
    description: item.summary,
    pathname: useCaseHref(item.id),
    pageClass: "detail-page usecase-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${renderImageFigure(primaryFamily?.cover || "", displayTitle(primaryFamily) || displayTitle(item), displayTitle(primaryFamily) || displayTitle(item))}
        </div>
        <div class="detail-copy card-surface">
          ${renderBackLink("/use-cases", bilingualText("返回使用场景", "Back To Use Cases"))}
          <p class="eyebrow">${escapeHtml(bilingualText("使用场景", "Use Case"))}</p>
          <h1 class="detail-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title, "detail-bilingual-title")}</h1>
          <p class="detail-summary">${escapeHtml(item.summary)}</p>
          <div class="detail-meta-grid">
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("主家族", "Primary Family"))}</h4>
              <p>${escapeHtml(displayTitle(primaryFamily) || bilingualText("待补充", "Pending"))}</p>
            </div>
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("结构", "Structures"))}</h4>
              ${renderStaticPills(structures)}
            </div>
          </div>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("为什么适配", "Why This Fit Works"),
          bilingualText("从任务反推视觉和结构", "Work backward from task to style and structure"),
          ""
        )}
        <div class="detail-section-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("内容形状", "Content Shape"))}</p><p>${escapeHtml(
            item.contentShape
          )}</p></div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("用户目标", "User Goal"))}</p><p>${escapeHtml(
            item.userGoal
          )}</p></div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("为什么", "Why"))}</p><p>${escapeHtml(
            item.note
          )}</p></div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("避免", "Avoid"))}</p>${renderList(
            item.avoid
          )}</div></article>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("推荐家族", "Recommended Families"),
          bilingualText("这个场景最适合借哪几条家族", "The families that fit this job"),
          ""
        )}
        <div class="family-grid">
          ${referenceFamilies.map((family) => renderFamilyCard(family)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("Prompt 场景包", "Prompt Packet"),
          bilingualText("可以直接复制给 agent 的场景提示", "A ready-to-copy prompt packet"),
          ""
        )}
        <article class="detail-card card-surface">
          <div class="card-body">
            <p class="card-kicker">${escapeHtml(bilingualText("Prompt 场景包", "Prompt Packet"))}</p>
            <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
            <code>${escapeHtml(renderUseCasePrompt(item))}</code>
            <div class="hero-actions">
              <button class="copy-button" type="button" data-copy-prompt>${escapeHtml(bilingualText("复制", "Copy"))}</button>
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
    title: `${bilingualText("网页家族", "Web Families")} · ${siteMeta.title}`,
    description: "Contemporary web families for the Design Zondev atlas.",
    pathname: "/families",
    pageClass: "index-page families-page",
    body: [
      renderPageLead({
        kicker: bilingualText("网页家族", "Web Families"),
        title: bilingualText("按网页家族浏览", "Browse by Web Family"),
        summary: "这里看的是今天网站最常见的呈现家族，适合直接找站型参考。",
        detail: "从 Editorial、Swiss、Directory、Product、Stage 到 Anti-Grid，先看类型，再下钻细节。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>${escapeHtml(bilingualText("返回首页", "Back Home"))}</a><a ${linkAttrs("/movements", "button")}>${escapeHtml(bilingualText("查看历史流派", "Open Movements"))}</a></div>`
      }),
      renderFamilyGridSection({
        title: bilingualText("全部网页家族", "All Web Families"),
        kicker: bilingualText("Atlas 索引", "Atlas Index"),
        summary: "把今天网页里最常见的家族单独列出来，不再和设计史层混在一起。",
        familiesList: families,
        sectionId: "all-families",
        actionMarkup: ""
      })
    ].join("")
  });
}

function buildMovementsPage() {
  return layout({
    title: `${bilingualText("历史流派", "Historical Movements")} · ${siteMeta.title}`,
    description: "Historical movements for the Design Zondev atlas.",
    pathname: "/movements",
    pageClass: "index-page movements-page",
    body: [
      renderPageLead({
        kicker: bilingualText("历史流派", "Historical Movements"),
        title: bilingualText("按设计谱系浏览", "Browse by Design Lineage"),
        summary: "这里看的是语言来源，不是网页模板。它帮助你把喜欢的味道接回更稳定的历史语境。",
        detail: "从 Arts and Crafts、Art Nouveau、Bauhaus、Swiss、Mid-Century Modern 到 Brutalism、Memphis、Cyberpunk，先识别祖先语言。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>${escapeHtml(bilingualText("返回首页", "Back Home"))}</a><a ${linkAttrs("/families", "button")}>${escapeHtml(bilingualText("查看网页家族", "Open Families"))}</a></div>`
      }),
      renderMovementGridSection({
        title: bilingualText("全部历史流派", "All Historical Movements"),
        kicker: bilingualText("历史索引", "History Index"),
        summary: "从工艺美术、新艺术、包豪斯、瑞士风格、世纪中期现代主义到后现代、粗野主义、赛博朋克，识别网页视觉背后的祖先。",
        movementsList: movements,
        sectionId: "all-movements",
        actionMarkup: ""
      })
    ].join("")
  });
}

function buildUseCasesPage() {
  return layout({
    title: `${bilingualText("使用场景", "Use Cases")} · ${siteMeta.title}`,
    description: "Use cases for matching content types to design families.",
    pathname: "/use-cases",
    pageClass: "index-page usecases-page",
    body: [
      renderPageLead({
        kicker: bilingualText("使用场景", "Use Cases"),
        title: bilingualText("按内容和任务反推风格", "Work backward from the job"),
        summary: "如果你不是在做审美研究，而是在准备一个具体网站，这一层通常会更快。",
        detail: "把我要做什么内容直接映射到 family、structure 和 prompt packet。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>${escapeHtml(bilingualText("返回首页", "Back Home"))}</a><a ${linkAttrs("/families", "button")}>${escapeHtml(bilingualText("查看网页家族", "Open Families"))}</a></div>`
      }),
      renderUseCaseSection({
        title: bilingualText("全部使用场景", "All Use Cases"),
        kicker: bilingualText("任务索引", "Task Index"),
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

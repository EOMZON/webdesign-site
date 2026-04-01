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
  webPatterns,
  visualFamilies
} from "../src/site-data.mjs";
import {
  browseModeMeta,
  extraHistoricalMovements,
  familyMeta,
  movementMeta,
  patternMeta,
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
const patterns = webPatterns.map((item) => addBilingualFields(item, patternMeta[item.id]));

const familySummaryZh = {
  "magazine-editorial": "以封面感和主稿节奏为核心的杂志型页面，首屏像一期杂志的 lead spread，而不是通用 SaaS hero。",
  "quiet-lifestyle-editorial": "更安静、更慢、更像收藏刊物或气质目录的生活方式页面，强调质感与留白而不是强操作感。",
  "swiss-typographic-grid": "以网格、排印和对齐关系组织信息的系统型页面，适合会持续生长的档案、参考库和知识站。",
  "monochrome-studio-systems": "以黑白排印、工作室语气和项目索引为核心的极简页面，克制但有明确作者性，特别适合设计工作室与识别作品集。",
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
    id: "design-studio-identity-portfolio",
    title: "Design Studio / Identity Portfolio",
    summary: "适合设计工作室、创意顾问、识别系统与黑白极简作品集。重点不是卖功能，而是先建立工作室语气，再把项目做成可浏览索引。",
    contentShape: "Case-led work index, strong studio statement, selective project detail, restrained visual identity.",
    userGoal: "让访客先感受到工作室方法和视觉判断，再快速浏览代表项目、客户与案例方向。",
    primaryFamilyId: "monochrome-studio-systems",
    secondaryFamilyIds: ["swiss-typographic-grid", "magazine-editorial"],
    structureIds: ["catalog-explorer", "archive-stack"],
    avoid: ["把作品集做成纯 SaaS hero", "只有漂亮排版没有项目索引", "为了极简牺牲信息入口"],
    note: "先建立工作室的 typographic voice，再把项目组织成清楚可浏览的索引。"
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

function visualAsset(screenshot, label, alt = label) {
  return { screenshot, label, alt };
}

const primaryVisualMap = {
  "bauhaus-functional-modernism": visualAsset(
    "atlassian-foundations.png",
    "Atlassian Foundations",
    "Atlassian Foundations page"
  ),
  "art-deco-streamlined-luxury": visualAsset("tmagazine.png", "T Magazine", "The New York Times Style Magazine homepage"),
  "swiss-international-typography": visualAsset(
    "signal-a-studio.png",
    "Signal-A Studio",
    "Signal-A Studio homepage"
  ),
  "postmodern-memphis": visualAsset("memphis-milano.png", "Memphis Milano", "Memphis Milano homepage"),
  "brutalism-neo-brutalism": visualAsset("gumroad-live.png", "Gumroad", "Gumroad homepage"),
  "cyberpunk-techno-futurism": visualAsset("cyberpunk-net.png", "Cyberpunk", "Cyberpunk homepage"),
  "arts-and-crafts": visualAsset("kinfolk-live.png", "Kinfolk", "Kinfolk homepage"),
  "art-nouveau": visualAsset("gentlewoman-live.png", "The Gentlewoman", "The Gentlewoman homepage"),
  futurism: visualAsset("razer.png", "Razer", "Razer homepage"),
  dada: visualAsset("arena-live.png", "Are.na", "Are.na page"),
  suprematism: visualAsset("studio-feixen.png", "Studio Feixen", "Studio Feixen homepage"),
  constructivism: visualAsset("stripe.png", "Stripe", "Stripe homepage"),
  "de-stijl": visualAsset("swiss-institute.png", "Swiss Institute", "Swiss Institute homepage"),
  "new-typography": visualAsset("pair-guidebook.png", "People + AI Guidebook", "People + AI Guidebook homepage"),
  "pop-art": visualAsset("behance.png", "Behance", "Behance homepage"),
  "mid-century-modern": visualAsset("apple-macbook.png", "Apple MacBook Pro", "Apple MacBook Pro page"),
  minimalism: visualAsset("ok-rm.png", "OK-RM", "OK-RM homepage"),
  "magazine-editorial": visualAsset("frieze.png", "Frieze", "Frieze homepage"),
  "quiet-lifestyle-editorial": visualAsset(
    "gentlewoman.png",
    "The Gentlewoman",
    "The Gentlewoman homepage"
  ),
  "swiss-typographic-grid": visualAsset("pentagram.png", "Pentagram", "Pentagram homepage"),
  "monochrome-studio-systems": visualAsset(
    "fictivekin-work.png",
    "Fictive Kin / Work",
    "Fictive Kin work page"
  ),
  "product-precision-interface": visualAsset("linear.png", "Linear", "Linear homepage"),
  "stage-driven-showcase": visualAsset("a24.png", "A24", "A24 homepage"),
  "curated-reference-directory": visualAsset(
    "awwwards-websites-live.png",
    "Awwwards / Websites",
    "Awwwards websites directory"
  ),
  "evidence-dense-knowledge-surface": visualAsset(
    "ourworldindata-live.png",
    "Our World In Data",
    "Our World In Data homepage"
  ),
  "playful-postmodern-anti-grid": visualAsset(
    "bureau-borsche.png",
    "Bureau Borsche",
    "Bureau Borsche homepage"
  ),
  "neon-techno-futurist-interface": visualAsset(
    "playstation-ps5-live.png",
    "PlayStation 5",
    "PlayStation 5 homepage"
  ),
  "style-atlas-reference-library": visualAsset(
    "siteinspire-live.png",
    "SiteInspire",
    "SiteInspire homepage"
  ),
  "cultural-publishing": visualAsset("newyorker.png", "The New Yorker", "The New Yorker homepage"),
  "design-studio-identity-portfolio": visualAsset(
    "fictivekin-home-live.png",
    "Fictive Kin",
    "Fictive Kin homepage"
  ),
  "product-tool-platform": visualAsset("vercel.png", "Vercel", "Vercel homepage"),
  "research-knowledge-system": visualAsset("carbon-for-ai.png", "Carbon for AI", "Carbon for AI page"),
  "premium-lifestyle-brand": visualAsset("monocle.png", "Monocle", "Monocle homepage"),
  "creator-anti-template-launch": visualAsset("arena-home-live.png", "Are.na", "Are.na homepage"),
  "gaming-hardware-future-tech": visualAsset(
    "xbox-series-x-live.png",
    "Xbox Series X",
    "Xbox Series X homepage"
  )
};

const invalidScreenshotSet = new Set([
  "apartamento-live.png",
  "monocle-travel-live.png",
  "mubi-live.png",
  "mubi.png",
  "nothing-tech-live.png",
  "siteinspire-home-live.png"
]);

function isUsableScreenshot(fileName) {
  if (!fileName || invalidScreenshotSet.has(fileName)) return false;
  return fs.existsSync(path.join(srcRoot, "screenshots", fileName));
}

function dedupeVisuals(visuals = []) {
  const seen = new Set();
  return visuals.filter((visual) => {
    const screenshot = visual?.screenshot;
    if (!isUsableScreenshot(screenshot) || seen.has(screenshot)) return false;
    seen.add(screenshot);
    return true;
  });
}

function itemVisualCandidates(item) {
  const baseLabel = item.coverLabel || item.titleEn || item.titleZh || item.title || "";
  const baseAlt = item.coverAlt || item.titleEn || item.titleZh || item.title || "";

  return dedupeVisuals([
    item.primaryVisual,
    item.cover ? visualAsset(item.cover, baseLabel, baseAlt) : null,
    ...(item.samples || []).map((sample) =>
      visualAsset(sample.screenshot, sample.label || baseLabel, sample.alt || sample.label || baseAlt)
    )
  ]);
}

function galleryCandidateScreenshots(item) {
  return new Set(
    itemVisualCandidates(item)
      .map((visual) => visual.screenshot)
      .filter((screenshot) => screenshot && screenshot !== item.cover)
  );
}

function pickContextualVisual(item, usedScreenshots = new Set(), options = {}) {
  const { avoidScreenshots = new Set() } = options;
  const candidates = itemVisualCandidates(item);

  const preferred = candidates.find(
    (visual) => !usedScreenshots.has(visual.screenshot) && !avoidScreenshots.has(visual.screenshot)
  );
  if (preferred) return preferred;

  const unique = candidates.find((visual) => !usedScreenshots.has(visual.screenshot));
  if (unique) return unique;

  return candidates[0] || null;
}

function resolveContextualCardVisuals(items, usedScreenshots = new Set(), avoidScreenshots = new Set()) {
  const visualMap = new Map();

  for (const item of items) {
    const visual = pickContextualVisual(item, usedScreenshots, { avoidScreenshots });
    visualMap.set(item.id, visual);
    if (visual?.screenshot) usedScreenshots.add(visual.screenshot);
  }

  return visualMap;
}

function resolveGalleryVisuals(item, usedScreenshots = new Set()) {
  const visuals = [];

  for (const visual of itemVisualCandidates(item)) {
    if (!visual?.screenshot || visual.screenshot === item.cover || usedScreenshots.has(visual.screenshot)) continue;
    visuals.push(visual);
    usedScreenshots.add(visual.screenshot);
  }

  return visuals;
}

function fallbackVisual(item) {
  const sample = item.samples?.find((entry) => isUsableScreenshot(entry.screenshot));
  if (sample) {
    return visualAsset(
      sample.screenshot,
      sample.label || item.titleEn || item.titleZh || item.title || "",
      sample.alt || sample.label || item.titleEn || item.titleZh || item.title || ""
    );
  }

  return visualAsset(
    isUsableScreenshot(item.cover) ? item.cover : "",
    item.titleEn || item.titleZh || item.title || "",
    item.titleEn || item.titleZh || item.title || ""
  );
}

function attachPrimaryVisual(item) {
  const visual = isUsableScreenshot(primaryVisualMap[item.id]?.screenshot)
    ? primaryVisualMap[item.id]
    : fallbackVisual(item);
  item.primaryVisual = visual;
  item.cover = visual.screenshot || item.cover || "";
  item.coverLabel = visual.label || "";
  item.coverAlt = visual.alt || visual.label || item.titleEn || item.titleZh || item.title || "";
  return item;
}

families.forEach(attachPrimaryVisual);
movements.forEach(attachPrimaryVisual);
useCases.forEach(attachPrimaryVisual);

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
const patternMap = new Map(patterns.map((item) => [item.id, item]));
const useCaseMap = new Map(useCases.map((item) => [item.id, item]));
const structureMap = new Map(structures.map((item) => [item.id, item]));

const routeHref = {
  movements: "/movements",
  families: "/families",
  "use-cases": "/use-cases"
};

const movementYearMap = {
  "arts-and-crafts": { start: 1860, end: 1900 },
  "art-nouveau": { start: 1890, end: 1910 },
  futurism: { start: 1909, end: 1916 },
  suprematism: { start: 1913, end: 1919 },
  constructivism: { start: 1913, end: 1930 },
  dada: { start: 1916, end: 1924 },
  "de-stijl": { start: 1917, end: 1932 },
  "bauhaus-functional-modernism": { start: 1919, end: 1933 },
  "new-typography": { start: 1923, end: 1938 },
  "art-deco-streamlined-luxury": { start: 1925, end: 1939 },
  "mid-century-modern": { start: 1945, end: 1969 },
  "swiss-international-typography": { start: 1950, end: 1970 },
  "brutalism-neo-brutalism": { start: 1954, end: 2025 },
  "pop-art": { start: 1958, end: 1970 },
  minimalism: { start: 1960, end: 1978 },
  "postmodern-memphis": { start: 1981, end: 1990 },
  "cyberpunk-techno-futurism": { start: 1982, end: 2025 }
};

const familyFieldMap = {
  "swiss-typographic-grid": { x: 22, y: 70, shortZh: "瑞士网格", shortEn: "Swiss Grid" },
  "evidence-dense-knowledge-surface": { x: 20, y: 48, shortZh: "证据知识", shortEn: "Evidence Dense" },
  "product-precision-interface": { x: 30, y: 44, shortZh: "精密产品", shortEn: "Product Precision" },
  "curated-reference-directory": { x: 42, y: 62, shortZh: "策展目录", shortEn: "Curated Directory" },
  "monochrome-studio-systems": { x: 44, y: 50, shortZh: "黑白工作室", shortEn: "Monochrome Studio" },
  "quiet-lifestyle-editorial": { x: 50, y: 28, shortZh: "静奢生活", shortEn: "Quiet Lifestyle" },
  "magazine-editorial": { x: 56, y: 42, shortZh: "杂志特稿", shortEn: "Magazine Editorial" },
  "stage-driven-showcase": { x: 76, y: 24, shortZh: "舞台展示", shortEn: "Stage Showcase" },
  "playful-postmodern-anti-grid": { x: 84, y: 56, shortZh: "后现代反网格", shortEn: "Anti-Grid" },
  "neon-techno-futurist-interface": { x: 90, y: 18, shortZh: "霓虹未来", shortEn: "Techno-Futurist" }
};

const structureLeadFamilyMap = {
  dossier: "magazine-editorial",
  "catalog-explorer": "curated-reference-directory",
  "archive-stack": "evidence-dense-knowledge-surface",
  "network-graph": "curated-reference-directory",
  workbench: "product-precision-interface",
  "immersive-stage": "stage-driven-showcase"
};

const selectorToneOptions = [
  { id: "auto", titleZh: "自动", titleEn: "Auto" },
  { id: "quiet", titleZh: "安静克制", titleEn: "Quiet" },
  { id: "balanced", titleZh: "平衡中性", titleEn: "Balanced" },
  { id: "bold", titleZh: "强烈表达", titleEn: "Bold" }
];

const selectorModeOptions = [
  { id: "auto", titleZh: "自动", titleEn: "Auto" },
  { id: "browse", titleZh: "浏览索引", titleEn: "Browse / Index" },
  { id: "story", titleZh: "主叙事", titleEn: "Story / Feature" },
  { id: "tool", titleZh: "工具操作", titleEn: "Tool / Workbench" },
  { id: "immersive", titleZh: "沉浸舞台", titleEn: "Immersive / Stage" }
];

const familyToneMap = {
  "magazine-editorial": "balanced",
  "quiet-lifestyle-editorial": "quiet",
  "swiss-typographic-grid": "balanced",
  "monochrome-studio-systems": "quiet",
  "product-precision-interface": "balanced",
  "stage-driven-showcase": "bold",
  "curated-reference-directory": "balanced",
  "evidence-dense-knowledge-surface": "balanced",
  "playful-postmodern-anti-grid": "bold",
  "neon-techno-futurist-interface": "bold"
};

const structureModeMap = {
  dossier: "story",
  "catalog-explorer": "browse",
  "archive-stack": "browse",
  "network-graph": "browse",
  workbench: "tool",
  "immersive-stage": "immersive"
};

const movementGuideMap = {
  "arts-and-crafts": {
    hook: "如果你喜欢材料感、手作感和慢节奏品牌页面，可以从这里开始。",
    common: "今天更常出现在生活方式、工艺品牌和纸本感很强的页面里。"
  },
  "art-nouveau": {
    hook: "如果你喜欢有机曲线、装饰线条和更感性的优雅气质，可以先看这一支。",
    common: "它经常在时尚、电影、文化品牌里变成更柔和的曲线和装饰节奏。"
  },
  futurism: {
    hook: "如果你想要速度感、推进感和强烈的未来能量，这里会更对味。",
    common: "今天常见在硬件发布、游戏页面和高动势的科技视觉里。"
  },
  suprematism: {
    hook: "如果你喜欢抽象几何、强留白和极端简化的构图，可以从这里看。",
    common: "它更像很多几何抽象型排版系统的深层来源。"
  },
  constructivism: {
    hook: "如果你想让页面更像一个有力的传播系统，而不是装饰画面，这一支值得先看。",
    common: "今天很多高效率信息页面、品牌系统页和几何构图都还在借它。"
  },
  dada: {
    hook: "如果你喜欢拼贴、反规则和故意不太听话的页面语气，可以先看这里。",
    common: "它更适合做灵感来源，不太适合直接变成整站默认风格。"
  },
  "de-stijl": {
    hook: "如果你喜欢垂直水平、明确边界和抽象秩序感，可以从风格派开始。",
    common: "今天很多网格、色块和模块化系统都能看到它的影子。"
  },
  "bauhaus-functional-modernism": {
    hook: "如果你喜欢功能清楚、几何克制、不过度装饰的页面，这里很适合先看。",
    common: "产品站、设计系统站和很多现代主义网页语言都从这里长出来。"
  },
  "new-typography": {
    hook: "如果你在意排版节奏、对齐、留白和信息清晰度，这一支很关键。",
    common: "很多你觉得高级又清楚的 editorial 页面，本质上都在借它。"
  },
  "art-deco-streamlined-luxury": {
    hook: "如果你想要更有舞台感、精致感和高级节奏的页面，可以从这里开始。",
    common: "文化、时尚和高感知品牌页面，经常会借它的对称与节奏。"
  },
  "mid-century-modern": {
    hook: "如果你喜欢现代、温和、克制但不冷的页面气质，这一支会很有帮助。",
    common: "它常出现在生活方式品牌、黑白工作室页和一些产品型极简页面里。"
  },
  "swiss-international-typography": {
    hook: "如果你喜欢网格、秩序、强排版和档案感，这通常是最该先看的入口。",
    common: "设计工作室、参考库、知识站和很多黑白极简页面都与它关系很深。"
  },
  "brutalism-neo-brutalism": {
    hook: "如果你厌倦了太平滑的模板，想要更硬、更直接、更有态度的页面，可以先看这里。",
    common: "它适合做反模板和强观点，但不适合默认所有内容都这样做。"
  },
  "pop-art": {
    hook: "如果你喜欢高对比、流行文化和强识别的表面能量，这里会更接近。",
    common: "更适合品牌表达和文化感，不太适合需要安静信任感的页面。"
  },
  minimalism: {
    hook: "如果你喜欢空白、比例、节制和更安静的高级感，可以先看极简主义。",
    common: "今天很多你觉得‘黑白简洁但不无聊’的页面，核心都和它有关。"
  },
  "postmodern-memphis": {
    hook: "如果你想摆脱模板感，接受一点冲突、俏皮和反网格，可以从这里开始。",
    common: "它适合创作者、实验品牌和想要更有态度的页面。"
  },
  "cyberpunk-techno-futurism": {
    hook: "如果你想要黑底、霓虹、世界观和更强烈的未来科技感，这一支最直接。",
    common: "它适合游戏、未来科技和沉浸式发布页，不适合所有内容。"
  }
};

function movementYears(item) {
  return movementYearMap[item.id] || { start: 1900, end: 1905 };
}

function percentBetween(value, min, max) {
  return ((value - min) / (max - min)) * 100;
}

function movementGuide(item) {
  return (
    movementGuideMap[item.id] || {
      hook: "如果你喜欢这种视觉气质，可以先从这里开始。",
      common: "常见在设计工作室、品牌页和文化内容站。"
    }
  );
}

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

function structureHref(id) {
  return sitePath("structures", id);
}

function selectorHref() {
  return sitePath("selector");
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

const phraseMeta = {
  "cultural publishing": { zh: "文化出版", en: "Cultural Publishing" },
  "feature homepages": { zh: "特稿首页", en: "Feature Homepages" },
  "brand magazines": { zh: "品牌杂志", en: "Brand Magazines" },
  "essay archives": { zh: "文章档案", en: "Essay Archives" },
  fashion: { zh: "时尚", en: "Fashion" },
  lifestyle: { zh: "生活方式", en: "Lifestyle" },
  "cultural brands": { zh: "文化品牌", en: "Cultural Brands" },
  "calmer portfolio shells": { zh: "安静作品集外壳", en: "Calmer Portfolio Shells" },
  archives: { zh: "档案站", en: "Archives" },
  "identity studios": { zh: "识别工作室", en: "Identity Studios" },
  "reference libraries": { zh: "参考资料库", en: "Reference Libraries" },
  "design system sites": { zh: "设计系统站", en: "Design System Sites" },
  "design studios": { zh: "设计工作室", en: "Design Studios" },
  "creative consultancies": { zh: "创意顾问机构", en: "Creative Consultancies" },
  "identity-led portfolios": { zh: "识别导向作品集", en: "Identity-Led Portfolios" },
  "culture-tech agencies": { zh: "文化科技机构", en: "Culture-Tech Agencies" },
  "AI tools": { zh: "AI 工具", en: "AI Tools" },
  "technical products": { zh: "技术产品", en: "Technical Products" },
  "platform homepages": { zh: "平台首页", en: "Platform Homepages" },
  "operator-facing tools": { zh: "操作员工具", en: "Operator-Facing Tools" },
  campaigns: { zh: "Campaign 页面", en: "Campaigns" },
  "flagship launches": { zh: "旗舰发布", en: "Flagship Launches" },
  "film and entertainment": { zh: "电影与娱乐", en: "Film and Entertainment" },
  "portfolio hero moments": { zh: "作品集首屏展示", en: "Portfolio Hero Moments" },
  "reference atlases": { zh: "参考图谱", en: "Reference Atlases" },
  "template libraries": { zh: "模板库", en: "Template Libraries" },
  "inspiration directories": { zh: "灵感目录", en: "Inspiration Directories" },
  "collection sites": { zh: "合集站", en: "Collection Sites" },
  "research hubs": { zh: "研究中心", en: "Research Hubs" },
  guides: { zh: "指南", en: "Guides" },
  "knowledge and decision surfaces": { zh: "知识与决策界面", en: "Knowledge and Decision Surfaces" },
  "creator brands": { zh: "创作者品牌", en: "Creator Brands" },
  "experimental commerce": { zh: "实验型商业", en: "Experimental Commerce" },
  "identity-led products": { zh: "识别导向产品", en: "Identity-Led Products" },
  "anti-template launches": { zh: "反模板发布页", en: "Anti-Template Launches" },
  gaming: { zh: "游戏", en: "Gaming" },
  "hardware launches": { zh: "硬件发布", en: "Hardware Launches" },
  "immersive tech brands": { zh: "沉浸式科技品牌", en: "Immersive Tech Brands" },
  "futurist campaign pages": { zh: "未来主义 Campaign 页", en: "Futurist Campaign Pages" },
  "product marketing": { zh: "产品营销", en: "Product Marketing" },
  "knowledge surfaces": { zh: "知识界面", en: "Knowledge Surfaces" },
  "technical platforms": { zh: "技术平台", en: "Technical Platforms" }
};

function normalizePill(item) {
  if (typeof item === "string") {
    return phraseMeta[item] || { zh: item, en: "" };
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

function dedupeStrings(items = []) {
  return [...new Set(items.filter(Boolean))];
}

function serializeJsonForHtml(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
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

function uniqueSamples(samples = [], excluded = new Set()) {
  const seen = new Set();
  return samples.filter((sample) => {
    const screenshot = sample?.screenshot;
    if (!screenshot || seen.has(screenshot) || excluded.has(screenshot)) return false;
    seen.add(screenshot);
    return true;
  });
}

function visualCandidates(item) {
  const candidates = [];
  const pushCandidate = (screenshot, altText = "", label = "") => {
    if (!screenshot || candidates.some((entry) => entry.screenshot === screenshot)) return;
    candidates.push({
      screenshot,
      alt: altText || label || displayTitle(item),
      label: label || displayTitle(item)
    });
  };

  pushCandidate(item.cover, item.coverAlt || displayTitle(item), item.coverLabel || displayTitle(item));

  for (const sample of uniqueSamples(item.samples || [])) {
    pushCandidate(sample.screenshot, sample.alt, sample.label);
  }

  return candidates;
}

function pickUniqueVisual(item, usedScreenshots = null) {
  const candidates = visualCandidates(item);
  if (!candidates.length) {
    return {
      screenshot: "",
      alt: displayTitle(item),
      label: displayTitle(item)
    };
  }

  const selected = usedScreenshots
    ? candidates.find((entry) => !usedScreenshots.has(entry.screenshot)) || candidates[0]
    : candidates[0];

  if (usedScreenshots && selected?.screenshot) {
    usedScreenshots.add(selected.screenshot);
  }

  return selected;
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
        <a href="/structures">${escapeHtml(bilingualText("信息结构", "Structure Patterns"))}</a>
        <a href="${escapeHtml(selectorHref())}">${escapeHtml(bilingualText("选型器", "Style Selector"))}</a>
        <a href="/use-cases">${escapeHtml(bilingualText("使用场景", "Use Cases"))}</a>
      </nav>
      <span class="status-pill">atlas v0.9</span>
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
          <p>${escapeHtml(
            bilingualText(
              "设计风格图谱：历史流派、网页家族、信息结构、使用场景与真实参考",
              "Design atlas: movements, web families, structure patterns, use cases, and live references"
            )
          )}</p>
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

function renderRouteCards(options = {}) {
  const { className = "route-grid", compact = false } = options;

  return `<div class="${escapeHtml(className)}">
    ${routes
      .map((item) => {
        const href = routeHref[item.id] || item.href || "/";
        return `<article class="route-card card-surface${compact ? " route-card--compact" : ""}">
          <div class="card-body">
            <div class="route-card-top">
              <p class="card-kicker">${escapeHtml(bilingualText(item.titleZh, item.titleEn || item.title))}</p>
              <span class="route-count">${escapeHtml(item.count)}</span>
            </div>
            <h3 class="card-title">${
              compact
                ? renderBilingualStack(item.titleZh, item.titleEn || item.title)
                : escapeHtml(item.summary)
            }</h3>
            <p class="card-summary">${escapeHtml(compact ? item.detail : item.detail)}</p>
            <a ${linkAttrs(href, "text-link")}>${escapeHtml(bilingualText("进入分类", "Open Route"))}</a>
          </div>
        </article>`;
      })
      .join("")}
  </div>`;
}

function renderBrowseModes() {
  return `<section class="section" id="browse-modes">
    ${renderSectionHead(
      bilingualText("浏览入口", "Entry Routes"),
      bilingualText("先从你最熟悉的维度进入", "Start from the dimension you recognize first"),
      "先做选择，再进详情页，不把整套理论都堆在首页。"
    )}
    ${renderRouteCards()}
  </section>`;
}

function renderFieldAtlas(options = {}) {
  const { compact = false } = options;
  const plottedFamilies = families
    .map((item) => ({ ...item, coords: familyFieldMap[item.id] }))
    .filter((item) => item.coords);

  return `<div class="atlas-scroller${compact ? " atlas-scroller--compact" : ""}">
    <div class="field-atlas card-surface${compact ? " field-atlas--compact" : ""}">
      <div class="field-axis field-axis--x"></div>
      <div class="field-axis field-axis--y"></div>
      <div class="field-axis-label field-axis-label--left">${escapeHtml(bilingualText("系统与档案", "System + Archive"))}</div>
      <div class="field-axis-label field-axis-label--right">${escapeHtml(bilingualText("舞台与表现", "Stage + Expression"))}</div>
      <div class="field-axis-label field-axis-label--top">${escapeHtml(bilingualText("强烈张力", "Intense"))}</div>
      <div class="field-axis-label field-axis-label--bottom">${escapeHtml(bilingualText("安静克制", "Quiet"))}</div>
      ${plottedFamilies
        .map((item) => {
          const { x, y, shortZh, shortEn } = item.coords;
          return `<a ${linkAttrs(familyHref(item.id), "field-point")} style="left:${x}%; top:${y}%;">
            <span class="field-point-dot"></span>
            <span class="field-point-label">${renderBilingualStack(shortZh || item.titleZh, shortEn || item.titleEn || item.title, "field-label-stack")}</span>
          </a>`;
        })
        .join("")}
    </div>
  </div>`;
}

function renderHomeOverviewHero() {
  return `<section class="home-hero section" id="top">
    <div class="home-hero-inner">
      <div class="home-hero-copy">
        <p class="eyebrow">${escapeHtml(bilingualText("设计风格图谱", "Design Atlas"))}</p>
        <h1 class="hero-title home-hero-title">
          <span class="home-hero-title-zh">
            <span>先看风格地图</span>
            <span>再进时间线</span>
          </span>
          <span class="home-hero-title-en">Map the field before you enter the timeline</span>
        </h1>
      </div>
      <div class="home-hero-deck">
        <p class="home-hero-stats">${escapeHtml(
          `${movements.length}个历史流派 · ${families.length}个网页家族 · ${useCases.length}个使用场景`
        )}</p>
        <div class="hero-route-buttons">
          <a ${linkAttrs("/movements", "hero-route-button")}>${escapeHtml(
            bilingualText("历史流派", "Historical Movements")
          )}</a>
          <a ${linkAttrs("/families", "hero-route-button hero-route-button--primary")}>${escapeHtml(
            bilingualText("网页家族", "Web Families")
          )}</a>
          <a ${linkAttrs("/use-cases", "hero-route-button")}>${escapeHtml(
            bilingualText("使用场景", "Use Cases")
          )}</a>
        </div>
      </div>
    </div>
  </section>`;
}

function movementAnchorId(id) {
  return `movement-${id}`;
}

const movementCompactBlurbMap = {
  "arts-and-crafts": "材料诚实与手作感",
  "art-nouveau": "有机曲线与装饰性",
  futurism: "速度崇拜与推进感",
  suprematism: "极简抽象与留白",
  constructivism: "传播构图与几何力",
  dada: "拼贴反规则",
  "de-stijl": "水平垂直的秩序",
  "bauhaus-functional-modernism": "功能先于装饰",
  "new-typography": "排版秩序与清晰性",
  "art-deco-streamlined-luxury": "对称华丽与流线感",
  "mid-century-modern": "温和现代与比例感",
  "swiss-international-typography": "网格秩序与清晰性",
  "brutalism-neo-brutalism": "粗粝直接与反模板",
  "pop-art": "流行色块与高识别",
  minimalism: "克制留白与精比例",
  "postmodern-memphis": "冲突俏皮与反网格",
  "cyberpunk-techno-futurism": "霓虹暗能量与世界观"
};

function movementCompactBlurb(item) {
  return movementCompactBlurbMap[item.id] || item.principles?.[0] || item.origin || "";
}

function renderTimelineFamilyTags(items = []) {
  if (!items.length) return "";
  return `<div class="timeline-node-tags">
    ${items
      .slice(0, 2)
      .map(
        (item) =>
          `<a ${linkAttrs(familyHref(item.id), "timeline-node-tag")}>${escapeHtml(`→ ${item.titleZh || item.title}`)}</a>`
      )
      .join("")}
  </div>`;
}

function renderTimelineNavigator(items = []) {
  const ordered = [...items];
  const firstYear = ordered[0] ? movementYears(ordered[0]).start : 0;
  const lastYear = ordered.length ? movementYears(ordered[ordered.length - 1]).end : 0;

  return `<nav class="timeline-nav card-surface" aria-label="${escapeHtml(
    bilingualText("时间轴总览导航", "Timeline overview")
  )}">
    <div class="timeline-nav-head">
      <p class="timeline-nav-scale">
        <span>${escapeHtml(String(firstYear))}</span>
        <span>${escapeHtml(String(lastYear))}</span>
      </p>
      <a ${linkAttrs("#top", "timeline-nav-back")}>${escapeHtml(bilingualText("回到封面", "Back to cover"))}</a>
    </div>
    <div class="timeline-nav-scroll">
      <div class="timeline-nav-track">
      ${ordered
        .map((item) => {
          const years = movementYears(item);
          const position = firstYear === lastYear ? 50 : 5 + ((years.start - firstYear) / (lastYear - firstYear)) * 90;
          return `<a class="timeline-nav-stop" href="#${escapeHtml(movementAnchorId(item.id))}" style="left:${position}%;" aria-label="${escapeHtml(displayTitle(item))}" title="${escapeHtml(displayTitle(item))}">
            <span class="timeline-nav-stop-dot"></span>
            <span class="timeline-nav-stop-year">${escapeHtml(String(years.start))}</span>
          </a>`;
        })
        .join("")}
      </div>
    </div>
  </nav>`;
}

function renderTimelineStreamItem(item, index) {
  const leadVisual = item.primaryVisual || fallbackVisual(item);
  const relatedFamilies = item.familyIds.map((id) => familyMap.get(id)).filter(Boolean);
  const years = movementYears(item);
  const blurb = movementCompactBlurb(item);

  return `<article class="timeline-node" id="${escapeHtml(movementAnchorId(item.id))}" style="--stagger:${escapeHtml(`${(index % 4) * 50}ms`)};">
    <div class="timeline-node-year">
      <span class="timeline-node-year-number">${escapeHtml(String(years.start))}</span>
      <span class="timeline-node-year-range">${escapeHtml(String(years.end))}</span>
    </div>
    <div class="timeline-node-axis" aria-hidden="true">
      <span class="timeline-node-dot"></span>
    </div>
    <a ${linkAttrs(movementHref(item.id), "timeline-node-card")}>
      <div class="timeline-node-media">
        ${
          leadVisual?.screenshot
            ? `<div class="timeline-node-image-wrap">
                ${renderImageFrame(leadVisual.screenshot, leadVisual.alt || displayTitle(item), "timeline-node-image")}
              </div>`
            : `<div class="timeline-node-placeholder"></div>`
        }
      </div>
      <div class="timeline-node-copy">
        <p class="timeline-node-titleline">
          <span class="timeline-node-title-zh">${escapeHtml(item.titleZh)}</span>
          <span class="timeline-node-title-en">${escapeHtml(item.titleEn || item.title)}</span>
        </p>
        <p class="timeline-node-blurb">${escapeHtml(blurb)}</p>
        ${renderTimelineFamilyTags(relatedFamilies)}
      </div>
    </a>
  </article>`;
}

function renderTimelineAtlasSection(options = {}) {
  const {
    title = bilingualText("历史流派时间轴", "Historical Timeline"),
    titleZh = "",
    titleEn = "",
    kicker = bilingualText("历史流派", "Historical Timeline"),
    summary = "",
    sectionId = "timeline-atlas",
    heroMode = false
  } = options;

  const ordered = [...movements].sort((a, b) => movementYears(a).start - movementYears(b).start);
  const firstYear = ordered[0] ? movementYears(ordered[0]).start : 0;
  const lastYear = ordered.length ? movementYears(ordered[ordered.length - 1]).end : 0;
  const titleMarkup =
    titleZh || titleEn
      ? renderBilingualStack(titleZh || title, titleEn || "", "timeline-feature-title-stack")
      : escapeHtml(title);

  return `<section class="section timeline-feature${heroMode ? " timeline-feature--hero" : ""}" id="${escapeHtml(sectionId)}">
    <div class="timeline-feature-head">
      <div class="timeline-feature-period">
        <span class="timeline-feature-period-start">${escapeHtml(String(firstYear))}</span>
        <span class="timeline-feature-period-divider"></span>
        <span class="timeline-feature-period-end">${escapeHtml(String(lastYear))}</span>
      </div>
      <div class="timeline-feature-head-main">
        <p class="eyebrow">${escapeHtml(kicker)}</p>
        <h1 class="${heroMode ? "hero-title" : "section-title"} timeline-feature-title">${titleMarkup}</h1>
        ${summary ? `<p class="timeline-feature-intro">${escapeHtml(summary)}</p>` : ""}
      </div>
    </div>
    ${renderTimelineNavigator(ordered)}
    <div class="timeline-stream" data-timeline-stream aria-label="${escapeHtml(
      bilingualText("历史流派", "Historical Timeline")
    )}">
      ${ordered.map((item, index) => renderTimelineStreamItem(item, index)).join("")}
    </div>
  </section>`;
}

function renderFamilyCoordinateSection() {
  return `<section class="section" id="style-field">
    ${renderSectionHead(
      bilingualText("风格坐标场", "Style Coordinate Field"),
      bilingualText("如果你先知道自己想要什么气质，从这里进", "If you know the tone you want, start here"),
      "横轴看页面更偏系统还是更偏舞台，纵轴看它更安静还是更有张力。"
    )}
    ${renderFieldAtlas()}
  </section>`;
}

function renderFamilyCard(item, options = {}) {
  const visual =
    options.visual || pickUniqueVisual(item) || {
      screenshot: item.cover,
      alt: item.coverAlt || displayTitle(item)
    };

  return `<article class="family-card card-surface">
    <a ${linkAttrs(familyHref(item.id), "card-media family-card-media")}>
      ${renderImageFrame(visual.screenshot, visual.alt || item.coverAlt || displayTitle(item))}
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

function renderMovementCard(item, options = {}) {
  const visual =
    options.visual || pickUniqueVisual(item) || {
      screenshot: item.cover,
      alt: item.coverAlt || displayTitle(item)
    };

  return `<article class="movement-card card-surface">
    <a ${linkAttrs(movementHref(item.id), "card-media movement-card-media")}>
      ${renderImageFrame(visual.screenshot, visual.alt || item.coverAlt || displayTitle(item))}
    </a>
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

function renderFamilyReferenceCard(item) {
  return `<article class="detail-card relation-card card-surface">
    <div class="card-body">
      <p class="card-kicker">${escapeHtml(bilingualText("网页家族", "Web Family"))}</p>
      <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
      <p class="card-summary">${escapeHtml(item.summaryZh || item.summary)}</p>
      <div class="meta-block">
        <h4>${escapeHtml(bilingualText("适合内容", "Best For"))}</h4>
        ${renderStaticPills(item.bestFor.slice(0, 3))}
      </div>
      <a ${linkAttrs(familyHref(item.id), "text-link")}>${escapeHtml(bilingualText("查看家族", "Open Family"))}</a>
    </div>
  </article>`;
}

function renderMovementReferenceCard(item) {
  return `<article class="detail-card relation-card card-surface">
    <div class="card-body">
      <div class="movement-meta">
        <p class="card-kicker">${escapeHtml(item.era)}</p>
        <span class="micro-note">${escapeHtml(item.origin)}</span>
      </div>
      <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
      <p class="card-summary">${escapeHtml(item.whyItMatters || item.summary)}</p>
      <div class="meta-block">
        <h4>${escapeHtml(bilingualText("今天会在网页里变成", "Shows Up In"))}</h4>
        ${renderLinkedPills(item.familyIds, familyMap, familyHref)}
      </div>
      <a ${linkAttrs(movementHref(item.id), "text-link")}>${escapeHtml(bilingualText("查看流派", "Open Movement"))}</a>
    </div>
  </article>`;
}

function renderPatternReferenceCard(item) {
  return `<article class="detail-card relation-card card-surface">
    <div class="card-body">
      <div class="movement-meta">
        <p class="card-kicker">${escapeHtml(bilingualText("页面模式", "Page Pattern"))}</p>
        <span class="micro-note">${escapeHtml(item.status || "")}</span>
      </div>
      <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
      <p class="card-summary">${escapeHtml(item.summary)}</p>
      <div class="meta-block">
        <h4>${escapeHtml(bilingualText("识别信号", "Cues"))}</h4>
        ${renderStaticPills(item.cues?.slice(0, 3) || [])}
      </div>
    </div>
  </article>`;
}

function selectorToneLabel(id = "auto") {
  const option = selectorToneOptions.find((entry) => entry.id === id) || selectorToneOptions[0];
  return bilingualText(option?.titleZh, option?.titleEn);
}

function selectorModeLabel(id = "auto") {
  const option = selectorModeOptions.find((entry) => entry.id === id) || selectorModeOptions[0];
  return bilingualText(option?.titleZh, option?.titleEn);
}

function selectorFamilyCandidates(useCase) {
  return dedupeStrings([useCase?.primaryFamilyId, ...(useCase?.secondaryFamilyIds || [])])
    .map((id) => familyMap.get(id))
    .filter(Boolean);
}

function selectorStructureCandidates(useCase, family = null) {
  const useCaseIds = useCase?.structureIds || [];
  const familyIds = family?.structureIds || [];
  const intersected = family ? useCaseIds.filter((id) => familyIds.includes(id)) : useCaseIds;
  const fallbackIds = intersected.length ? intersected : familyIds.length ? familyIds : useCaseIds;

  return dedupeStrings(fallbackIds)
    .map((id) => structureMap.get(id))
    .filter(Boolean);
}

function selectorResolveFamily({ useCase, familyId = "", tone = "auto" }) {
  const candidates = selectorFamilyCandidates(useCase);
  if (!candidates.length) return null;

  const explicit = familyId ? candidates.find((entry) => entry.id === familyId) : null;
  if (explicit) return explicit;

  if (tone && tone !== "auto") {
    const toned = candidates.find((entry) => familyToneMap[entry.id] === tone);
    if (toned) return toned;
  }

  return candidates[0];
}

function selectorResolveStructure({ useCase, family, structureId = "", mode = "auto" }) {
  const candidates = selectorStructureCandidates(useCase, family);
  if (!candidates.length) return null;

  const explicit = structureId ? candidates.find((entry) => entry.id === structureId) : null;
  if (explicit) return explicit;

  if (mode && mode !== "auto") {
    const matched = candidates.find((entry) => structureModeMap[entry.id] === mode);
    if (matched) return matched;
  }

  return candidates[0];
}

function selectorResolveMovement(family) {
  if (!family) return null;
  return family.movementIds?.map((id) => movementMap.get(id)).filter(Boolean)[0] || null;
}

function selectorReferenceEntries(family) {
  if (!family) return [];

  const visuals = uniqueSamples(family.samples || []).slice(0, 3);
  const references = family.references || [];
  const normalizedReferences = references.map((reference) => ({
    ...reference,
    normalizedLabel: String(reference.label || "").toLowerCase().replace(/[^a-z0-9]+/g, "")
  }));

  return visuals.map((sample, index) => {
    const sampleKey = String(sample.label || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    const matchedReference =
      normalizedReferences.find((reference) => sampleKey && reference.normalizedLabel.includes(sampleKey)) ||
      normalizedReferences.find((reference) => sampleKey && sampleKey.includes(reference.normalizedLabel)) ||
      references[index] ||
      null;

    return {
      label: matchedReference?.label || sample.label || displayTitle(family),
      href: matchedReference?.href || familyHref(family.id),
      screenshot: sample.screenshot,
      alt: sample.alt || matchedReference?.label || sample.label || displayTitle(family)
    };
  });
}

function renderSelectorPrompt(packet) {
  const referencePacket = packet.references.length
    ? packet.references.map((item) => `${item.label}: ${item.href}`).join(" / ")
    : bilingualText("待补充", "Pending");

  return `内容类型 Content Type: ${displayTitle(packet.useCase)}
历史线索 Historical Movement: ${displayTitle(packet.movement) || bilingualText("按家族自动匹配", "Auto from family")}
网页家族 Visual Family: ${displayTitle(packet.family)}
信息结构 IA Layer: ${displayTitle(packet.structure)}
参考网站 Reference Packet: ${referencePacket}
内容形状 Content Shape: ${packet.useCase.contentShape}
用户目标 User Goal: ${packet.useCase.userGoal}
场景气质 Tone: ${selectorToneLabel(packet.state.tone)}
交互倾向 Mode: ${selectorModeLabel(packet.state.mode)}
可借 Borrow: ${packet.borrow.join(" / ")}
避免 Avoid: ${packet.avoid.join(" / ")}
风格提示 Family Prompt: ${packet.family?.prompt || ""}`;
}

function resolveSelectorPacket(state = {}) {
  const tone = selectorToneOptions.some((entry) => entry.id === state.tone) ? state.tone : "auto";
  const mode = selectorModeOptions.some((entry) => entry.id === state.mode) ? state.mode : "auto";
  const useCase = useCaseMap.get(state.useCaseId) || useCases[0] || null;
  const family = selectorResolveFamily({ useCase, familyId: state.familyId || "", tone });
  const structure = selectorResolveStructure({
    useCase,
    family,
    structureId: state.structureId || "",
    mode
  });
  const movement = selectorResolveMovement(family);
  const references = selectorReferenceEntries(family);
  const borrow = dedupeStrings([...(family?.borrow || []), ...(structure?.signals || [])]).slice(0, 4);
  const avoid = dedupeStrings([...(useCase?.avoid || []), ...(family?.avoidWhen || []), ...(structure?.watchouts || [])]).slice(
    0,
    4
  );
  const alternatives = selectorFamilyCandidates(useCase).filter((entry) => entry.id !== family?.id);
  const structureAlternatives = selectorStructureCandidates(useCase, family).filter((entry) => entry.id !== structure?.id);

  const packet = {
    state: {
      useCaseId: useCase?.id || "",
      familyId: state.familyId || "",
      structureId: state.structureId || "",
      tone,
      mode
    },
    useCase,
    family,
    structure,
    movement,
    references,
    borrow,
    avoid,
    alternatives,
    structureAlternatives
  };

  packet.prompt = renderSelectorPrompt(packet);
  return packet;
}

const selectorDefaultState = {
  useCaseId: useCases[0]?.id || "",
  familyId: "",
  structureId: "",
  tone: "auto",
  mode: "auto"
};

function renderSelectorField({
  name,
  labelZh,
  labelEn,
  options,
  selected = "",
  allowAuto = false,
  autoLabel = bilingualText("自动匹配", "Auto")
}) {
  const autoOption = allowAuto ? `<option value="">${escapeHtml(autoLabel)}</option>` : "";

  return `<label class="selector-field">
    <span class="selector-label">${escapeHtml(bilingualText(labelZh, labelEn))}</span>
    <select class="selector-select" name="${escapeHtml(name)}" data-selector-field="${escapeHtml(name)}">
      ${autoOption}
      ${options
        .map((item) => {
          const value = item.id || "";
          const text = item.titleZh || item.titleEn ? bilingualText(item.titleZh, item.titleEn) : item.label || value;
          return `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(text)}</option>`;
        })
        .join("")}
    </select>
  </label>`;
}

function renderSelectorChoiceCard({ kickerZh, kickerEn, item, href, summary, metaMarkup = "", emptyLabel = "" }) {
  if (!item) {
    return `<article class="detail-card relation-card selector-choice-card card-surface">
      <div class="card-body">
        <p class="card-kicker">${escapeHtml(bilingualText(kickerZh, kickerEn))}</p>
        <h3 class="card-title">${escapeHtml(emptyLabel || bilingualText("待补充", "Pending"))}</h3>
      </div>
    </article>`;
  }

  return `<article class="detail-card relation-card selector-choice-card card-surface">
    <div class="card-body">
      <p class="card-kicker">${escapeHtml(bilingualText(kickerZh, kickerEn))}</p>
      <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
      <p class="card-summary">${escapeHtml(summary || item.summary || item.summaryZh || "")}</p>
      ${metaMarkup}
      <a ${linkAttrs(href, "text-link")}>${escapeHtml(bilingualText("查看详情", "Open Detail"))}</a>
    </div>
  </article>`;
}

function renderSelectorReferenceCard(item) {
  return `<article class="selector-reference-card card-surface">
    <a ${linkAttrs(item.href, "card-media selector-reference-media")}>
      ${renderImageFrame(item.screenshot, item.alt || item.label)}
      <div class="card-overlay">
        <span class="card-overlay-label">${escapeHtml(bilingualText("真实参考", "Live Reference"))}</span>
        <h3 class="card-overlay-title">${escapeHtml(item.label)}</h3>
      </div>
    </a>
    <div class="card-body">
      <a ${linkAttrs(item.href, "text-link")}>${escapeHtml(bilingualText("打开网站", "Open Site"))}</a>
    </div>
  </article>`;
}

function renderSelectorResults(packet) {
  const alternativeFamilies = packet.alternatives.slice(0, 2).map((entry) => entry.id);
  const alternativeStructures = packet.structureAlternatives.slice(0, 2).map((entry) => entry.id);

  return `<div class="selector-results" data-selector-results>
    <article class="selector-summary card-surface">
      <div class="card-body">
        <p class="card-kicker">${escapeHtml(bilingualText("当前结果", "Current Packet"))}</p>
        <h2 class="section-title">${renderBilingualStack(packet.useCase.titleZh, packet.useCase.titleEn || packet.useCase.title)}</h2>
        <p class="section-summary">${escapeHtml(packet.useCase.summary)}</p>
        <div class="selector-summary-grid">
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("内容形状", "Content Shape"))}</h4>
            <p>${escapeHtml(packet.useCase.contentShape)}</p>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("用户目标", "User Goal"))}</h4>
            <p>${escapeHtml(packet.useCase.userGoal)}</p>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("场景气质", "Tone"))}</h4>
            <p>${escapeHtml(selectorToneLabel(packet.state.tone))}</p>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("交互倾向", "Mode"))}</h4>
            <p>${escapeHtml(selectorModeLabel(packet.state.mode))}</p>
          </div>
        </div>
      </div>
    </article>
    <div class="selector-choice-grid">
      ${renderSelectorChoiceCard({
        kickerZh: "历史线索",
        kickerEn: "Historical Movement",
        item: packet.movement,
        href: packet.movement ? movementHref(packet.movement.id) : movementHref("swiss-international-typography"),
        summary: packet.movement?.whyItMatters || packet.movement?.summary || "",
        metaMarkup: packet.movement
          ? `<div class="meta-block">
              <h4>${escapeHtml(bilingualText("时期", "Period"))}</h4>
              <p>${escapeHtml(packet.movement.era)}</p>
            </div>`
          : "",
        emptyLabel: bilingualText("按家族自动匹配", "Auto from family")
      })}
      ${renderSelectorChoiceCard({
        kickerZh: "网页家族",
        kickerEn: "Visual Family",
        item: packet.family,
        href: packet.family ? familyHref(packet.family.id) : familyHref("magazine-editorial"),
        summary: packet.family?.summaryZh || packet.family?.summary || "",
        metaMarkup: packet.family
          ? `<div class="meta-block">
              <h4>${escapeHtml(bilingualText("适合内容", "Best For"))}</h4>
              ${renderStaticPills(packet.family.bestFor?.slice(0, 3) || [])}
            </div>`
          : ""
      })}
      ${renderSelectorChoiceCard({
        kickerZh: "信息结构",
        kickerEn: "Structure Pattern",
        item: packet.structure,
        href: packet.structure ? structureHref(packet.structure.id) : structureHref("catalog-explorer"),
        summary: packet.structure?.summary || "",
        metaMarkup: packet.structure
          ? `<div class="meta-block">
              <h4>${escapeHtml(bilingualText("识别信号", "Signals"))}</h4>
              ${renderStaticPills(packet.structure.signals?.slice(0, 3) || [])}
            </div>`
          : ""
      })}
    </div>
    <div class="selector-meta-grid">
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("借法", "Borrow"))}</p>
          ${renderList(packet.borrow)}
        </div>
      </article>
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("避免", "Avoid"))}</p>
          ${renderList(packet.avoid)}
        </div>
      </article>
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("备选路径", "Alternatives"))}</p>
          <div class="selector-alternative-stack">
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("备选家族", "Family Alternatives"))}</h4>
              ${alternativeFamilies.length ? renderLinkedPills(alternativeFamilies, familyMap, familyHref) : `<p>${escapeHtml(bilingualText("当前已是最直接匹配", "Current match is already the primary fit"))}</p>`}
            </div>
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("备选结构", "Structure Alternatives"))}</h4>
              ${alternativeStructures.length ? renderLinkedPills(alternativeStructures, structureMap, structureHref) : `<p>${escapeHtml(bilingualText("当前结构已是最直接匹配", "Current structure is already the primary fit"))}</p>`}
            </div>
          </div>
        </div>
      </article>
    </div>
    <section class="selector-reference-section">
      ${renderSectionHead(
        bilingualText("真实参考", "Live References"),
        bilingualText("直接打开真实站点", "Open the closest real websites"),
        ""
      )}
      <div class="selector-reference-grid">
        ${packet.references.map((item) => renderSelectorReferenceCard(item)).join("")}
      </div>
    </section>
    <article class="selector-prompt-panel detail-card card-surface" data-copy-container>
      <div class="card-body">
        <p class="card-kicker">${escapeHtml(bilingualText("Prompt 包", "Prompt Packet"))}</p>
        <h3 class="card-title">${escapeHtml(bilingualText("可直接给 agent 的组合", "Ready-to-copy packet"))}</h3>
        <code>${escapeHtml(packet.prompt)}</code>
        <div class="hero-actions">
          <button class="copy-button" type="button" data-copy-prompt>${escapeHtml(bilingualText("复制", "Copy"))}</button>
        </div>
      </div>
    </article>
  </div>`;
}

function selectorPayload() {
  return {
    initialState: selectorDefaultState,
    toneOptions: selectorToneOptions,
    modeOptions: selectorModeOptions,
    familyToneMap,
    structureModeMap,
    useCases: useCases.map((item) => ({
      id: item.id,
      titleZh: item.titleZh,
      titleEn: item.titleEn || item.title,
      summary: item.summary,
      contentShape: item.contentShape,
      userGoal: item.userGoal,
      primaryFamilyId: item.primaryFamilyId,
      secondaryFamilyIds: item.secondaryFamilyIds || [],
      structureIds: item.structureIds || [],
      avoid: item.avoid || [],
      note: item.note || "",
      href: useCaseHref(item.id)
    })),
    families: families.map((item) => ({
      id: item.id,
      titleZh: item.titleZh,
      titleEn: item.titleEn || item.title,
      summary: item.summary,
      summaryZh: item.summaryZh || item.summary,
      movementIds: item.movementIds || [],
      structureIds: item.structureIds || [],
      borrow: item.borrow || [],
      avoidWhen: item.avoidWhen || [],
      bestFor: item.bestFor || [],
      prompt: item.prompt || "",
      references: item.references || [],
      samples: uniqueSamples(item.samples || []),
      href: familyHref(item.id)
    })),
    structures: structures.map((item) => ({
      id: item.id,
      titleZh: item.titleZh,
      titleEn: item.titleEn || item.title,
      summary: item.summary,
      suitedFor: item.suitedFor || [],
      signals: item.signals || [],
      watchouts: item.watchouts || [],
      href: structureHref(item.id)
    })),
    movements: movements.map((item) => ({
      id: item.id,
      titleZh: item.titleZh,
      titleEn: item.titleEn || item.title,
      summary: item.summary,
      whyItMatters: item.whyItMatters || "",
      era: item.era || "",
      href: movementHref(item.id)
    }))
  };
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

function renderUseCaseCard(item, options = {}) {
  const primaryFamily = familyMap.get(item.primaryFamilyId);
  const visual =
    options.visual || pickUniqueVisual(item) || {
      screenshot: item.cover,
      alt: item.coverAlt || displayTitle(item)
    };

  return `<article class="usecase-card card-surface">
    <a ${linkAttrs(useCaseHref(item.id), "card-media usecase-media")}>
      ${renderImageFrame(visual.screenshot, visual.alt || item.coverAlt || displayTitle(item))}
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
        ${renderLinkedPills(item.structureIds, structureMap, structureHref)}
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

function renderStructureCard(item) {
  const relatedFamilies = families.filter((family) => family.structureIds?.includes(item.id));
  const relatedUseCases = useCases.filter((useCase) => useCase.structureIds?.includes(item.id));

  return `<article class="route-card card-surface">
    <div class="card-body">
      <div class="route-card-top">
        <p class="card-kicker">${escapeHtml(bilingualText("信息结构", "Structure Pattern"))}</p>
        <span class="route-count">${escapeHtml(`${relatedUseCases.length} ${bilingualText("个场景", "Use Cases")}`)}</span>
      </div>
      <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
      <p class="card-summary">${escapeHtml(item.summary)}</p>
      <div class="meta-block">
        <h4>${escapeHtml(bilingualText("常配网页家族", "Common Families"))}</h4>
        ${renderLinkedPills(
          relatedFamilies.slice(0, 3).map((family) => family.id),
          familyMap,
          familyHref
        )}
      </div>
      <a ${linkAttrs(structureHref(item.id), "text-link")}>${escapeHtml(
        bilingualText("查看结构", "Open Structure")
      )}</a>
    </div>
  </article>`;
}

function renderStructureSection(options = {}) {
  const {
    title = bilingualText("信息结构", "Structure Patterns"),
    kicker = bilingualText("信息层", "Information Layer"),
    summary = "视觉家族回答页面看起来像什么，结构模式回答页面到底该怎么组织、怎么下钻、怎么承载信息。",
    structuresList = structures,
    sectionId = "structure-patterns",
    actionMarkup = `<a ${linkAttrs("/structures", "text-link")}>${escapeHtml(
      bilingualText("全部结构", "All Structures")
    )}</a>`
  } = options;

  return `<section class="section" id="${escapeHtml(sectionId)}">
    ${renderSectionHead(kicker, title, summary, actionMarkup)}
    <div class="route-grid structure-grid">
      ${structuresList.map((item) => renderStructureCard(item)).join("")}
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
  const relatedPatterns = item.patternIds.map((id) => patternMap.get(id)).filter(Boolean);
  const gallerySamples = uniqueSamples(item.samples || [], new Set(item.cover ? [item.cover] : []));
  const visibleSamples = gallerySamples.length ? gallerySamples : uniqueSamples(item.samples || []);

  return layout({
    title: `${displayTitle(item)} · ${siteMeta.title}`,
    description: item.summaryZh || item.summary,
    pathname: familyHref(item.id),
    pageClass: "detail-page family-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${renderImageFigure(item.cover, item.coverAlt || displayTitle(item), item.coverLabel || displayTitle(item))}
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
              ${renderLinkedPills(item.structureIds, structureMap, structureHref)}
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
          ${visibleSamples.map((sample) => renderImageFigure(sample.screenshot, sample.alt, sample.label)).join("")}
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
          bilingualText("页面模式", "Page Patterns"),
          bilingualText("这条家族常见会长成哪些页面组织", "The page patterns this family commonly becomes"),
          ""
        )}
        <div class="relation-grid">
          ${relatedPatterns.map((pattern) => renderPatternReferenceCard(pattern)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("历史源头", "Historical Roots"),
          bilingualText("如果你喜欢这类网页，往前追会遇到哪几支", "Trace the earlier lineages behind it"),
          ""
        )}
        <div class="relation-grid">
          ${relatedMovements.map((movement) => renderMovementReferenceCard(movement)).join("")}
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
  const gallerySamples = uniqueSamples(item.samples || [], new Set(item.cover ? [item.cover] : []));
  const visibleSamples = gallerySamples.length ? gallerySamples : uniqueSamples(item.samples || []);

  return layout({
    title: `${displayTitle(item)} · ${siteMeta.title}`,
    description: item.summary,
    pathname: movementHref(item.id),
    pageClass: "detail-page movement-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${
            item.cover
              ? renderImageFigure(item.cover, item.coverAlt || displayTitle(item), item.coverLabel || displayTitle(item))
              : `<div class="image-placeholder">${escapeHtml(bilingualText("图片待补充", "Image Pending"))}</div>`
          }
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
          ${visibleSamples.map((sample) => renderImageFigure(sample.screenshot, sample.alt, sample.label)).join("")}
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
          bilingualText("下一步去看哪类网页", "What to open next"),
          bilingualText("如果你喜欢这一支，下一步去看哪类网页", "The web families to open next"),
          ""
        )}
        <div class="relation-grid">
          ${relatedFamilies.map((family) => renderFamilyReferenceCard(family)).join("")}
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

function renderStructurePrompt(item) {
  const relatedFamilies = families.filter((family) => family.structureIds?.includes(item.id));
  const relatedUseCases = useCases.filter((useCase) => useCase.structureIds?.includes(item.id));
  const relatedFamilyIds = new Set(relatedFamilies.map((family) => family.id));
  const relatedPatterns = patterns.filter((pattern) => pattern.familyIds?.some((id) => relatedFamilyIds.has(id)));

  return `信息结构 IA Pattern: ${displayTitle(item)}
适用场景 Best For: ${item.suitedFor.join(" / ")}
识别信号 Signals: ${item.signals.join(" / ")}
注意事项 Watchouts: ${item.watchouts.join(" / ")}
常配网页家族 Common Families: ${relatedFamilies.map((entry) => displayTitle(entry)).join(" / ")}
常见页面模式 Common Page Patterns: ${relatedPatterns.map((entry) => displayTitle(entry)).join(" / ")}
推荐使用场景 Recommended Use Cases: ${relatedUseCases.map((entry) => displayTitle(entry)).join(" / ")}`;
}

function renderStructureDetail(item) {
  const relatedFamilies = families.filter((family) => family.structureIds?.includes(item.id));
  const relatedUseCases = useCases.filter((useCase) => useCase.structureIds?.includes(item.id));
  const relatedFamilyIds = new Set(relatedFamilies.map((family) => family.id));
  const relatedPatterns = patterns.filter((pattern) => pattern.familyIds?.some((id) => relatedFamilyIds.has(id)));
  const leadFamily =
    relatedFamilies.find((family) => family.id === structureLeadFamilyMap[item.id]) || relatedFamilies[0] || null;
  const leadSource = leadFamily || relatedUseCases[0] || null;
  const leadVisual = leadSource ? pickUniqueVisual(leadSource) : null;
  const usedScreenshots = new Set(leadVisual?.screenshot ? [leadVisual.screenshot] : []);
  const familyCards = relatedFamilies
    .filter((family) => family.id !== leadFamily?.id)
    .map((family) => ({
    family,
    visual: pickUniqueVisual(family, usedScreenshots)
  }));
  const useCaseCards = relatedUseCases
    .filter((useCase) => useCase.id !== leadSource?.id)
    .map((useCase) => ({
    useCase,
    visual: pickUniqueVisual(useCase, usedScreenshots)
  }));

  return layout({
    title: `${displayTitle(item)} · ${siteMeta.title}`,
    description: item.summary,
    pathname: structureHref(item.id),
    pageClass: "detail-page structure-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${
            leadVisual?.screenshot
              ? renderImageFigure(
                  leadVisual.screenshot,
                  leadVisual.alt || displayTitle(item),
                  leadVisual.label || displayTitle(item)
                )
              : `<div class="image-placeholder">${escapeHtml(bilingualText("图片待补充", "Image Pending"))}</div>`
          }
        </div>
        <div class="detail-copy card-surface">
          ${renderBackLink("/structures", bilingualText("返回信息结构", "Back To Structures"))}
          <p class="eyebrow">${escapeHtml(bilingualText("信息结构", "Structure Pattern"))}</p>
          <h1 class="detail-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title, "detail-bilingual-title")}</h1>
          <p class="detail-summary">${escapeHtml(item.summary)}</p>
          <div class="detail-meta-grid">
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("适合内容", "Suited For"))}</h4>
              ${renderStaticPills(item.suitedFor)}
            </div>
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("常配网页家族", "Common Families"))}</h4>
              ${renderLinkedPills(
                relatedFamilies.map((family) => family.id),
                familyMap,
                familyHref
              )}
            </div>
          </div>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("结构信号", "Structure Signals"),
          bilingualText("怎么判断自己需要这一种结构", "How to recognize when this structure fits"),
          ""
        )}
        <div class="detail-section-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("适合", "Best For"))}</p>${renderList(
            item.suitedFor
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("识别信号", "Signals"))}</p>${renderList(
            item.signals
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("不要这样用", "Watchouts"))}</p>${renderList(
            item.watchouts
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("关联场景", "Use Cases"))}</p>${renderLinkedPills(
            relatedUseCases.map((useCase) => useCase.id),
            useCaseMap,
            useCaseHref
          )}</div></article>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("页面模式", "Page Patterns"),
          bilingualText("这类结构常见会落成哪些页面组织", "The page patterns this structure commonly turns into"),
          ""
        )}
        <div class="relation-grid">
          ${relatedPatterns.map((pattern) => renderPatternReferenceCard(pattern)).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("适合搭配的网页家族", "Families That Pair Well"),
          bilingualText("先定结构，再看哪类视觉家族最适合叠上去", "Pick the structure, then pair the right visual family"),
          ""
        )}
        <div class="family-grid">
          ${familyCards.map(({ family, visual }) => renderFamilyCard(family, { visual })).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("典型使用场景", "Typical Use Cases"),
          bilingualText("哪些项目最常需要这种结构", "Projects that commonly need this structure"),
          ""
        )}
        <div class="usecase-grid">
          ${useCaseCards.map(({ useCase, visual }) => renderUseCaseCard(useCase, { visual })).join("")}
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("Prompt 结构包", "Prompt Structure Packet"),
          bilingualText("可以直接给 agent 的结构提示", "A ready-to-copy structure packet"),
          ""
        )}
        <article class="detail-card card-surface">
          <div class="card-body">
            <p class="card-kicker">${escapeHtml(bilingualText("Prompt 结构包", "Prompt Structure Packet"))}</p>
            <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
            <code>${escapeHtml(renderStructurePrompt(item))}</code>
            <div class="hero-actions">
              <button class="copy-button" type="button" data-copy-prompt>${escapeHtml(bilingualText("复制", "Copy"))}</button>
            </div>
          </div>
        </article>
      </section>`
    ].join("")
  });
}

function renderUseCaseDetail(item) {
  const primaryFamily = familyMap.get(item.primaryFamilyId);
  const secondaryFamilies = item.secondaryFamilyIds.map((id) => familyMap.get(id)).filter(Boolean);
  const referenceFamilies = [primaryFamily, ...secondaryFamilies].filter(Boolean);
  const usedScreenshots = new Set(item.cover ? [item.cover] : []);
  const referenceFamilyCards = referenceFamilies.map((family) => ({
    family,
    visual: pickUniqueVisual(family, usedScreenshots)
  }));

  return layout({
    title: `${displayTitle(item)} · ${siteMeta.title}`,
    description: item.summary,
    pathname: useCaseHref(item.id),
    pageClass: "detail-page usecase-detail-page",
    body: [
      `<section class="detail-hero">
        <div class="detail-media">
          ${renderImageFigure(item.cover, item.coverAlt || displayTitle(item), item.coverLabel || displayTitle(item))}
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
              ${renderLinkedPills(item.structureIds, structureMap, structureHref)}
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
          ${referenceFamilyCards.map(({ family, visual }) => renderFamilyCard(family, { visual })).join("")}
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
      renderHomeOverviewHero(),
      renderTimelineAtlasSection({
        titleZh: "按年代往下看",
        titleEn: "Browse by era",
        kicker: bilingualText("历史流派", "Historical Timeline"),
        summary: "",
        sectionId: "historical-timeline",
        heroMode: false
      })
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
        detail: "从 Editorial、Swiss、Monochrome Studio、Directory、Product、Stage 到 Anti-Grid，先看类型，再下钻细节。",
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
      renderTimelineAtlasSection({
        titleZh: "历史流派时间轴",
        titleEn: "Historical Timeline",
        kicker: bilingualText("按年代浏览", "Browse by Period"),
        summary: "",
        sectionId: "movement-timeline"
      })
    ].join("")
  });
}

function buildStructuresPage() {
  return layout({
    title: `${bilingualText("信息结构", "Structure Patterns")} · ${siteMeta.title}`,
    description: "Structure patterns for organizing information and interaction in the Design Zondev atlas.",
    pathname: "/structures",
    pageClass: "index-page structures-page",
    body: [
      renderPageLead({
        kicker: bilingualText("信息结构", "Structure Patterns"),
        title: bilingualText("按结构模式浏览", "Browse by Structure Pattern"),
        summary: "这一层回答的不是页面看起来像什么，而是它到底该怎么组织信息、怎么下钻、怎么承载任务。",
        detail:
          "同一种视觉家族，可以搭在不同结构上。真正稳定的选型，应该把视觉层和信息结构层分开判断。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>${escapeHtml(
          bilingualText("返回首页", "Back Home")
        )}</a><a ${linkAttrs("/use-cases", "button")}>${escapeHtml(
          bilingualText("查看使用场景", "Open Use Cases")
        )}</a></div>`
      }),
      renderStructureSection({
        title: bilingualText("全部结构模式", "All Structure Patterns"),
        kicker: bilingualText("信息层索引", "Information Layer Index"),
        summary: "把 structure 独立出来之后，才不会把视觉气质误认成信息架构。",
        structuresList: structures,
        sectionId: "all-structures",
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
        detail: "把我要做什么内容直接映射到更合适的网页家族、结构方式和参考组合。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>${escapeHtml(bilingualText("返回首页", "Back Home"))}</a><a ${linkAttrs("/structures", "button")}>${escapeHtml(bilingualText("查看信息结构", "Open Structures"))}</a></div>`
      }),
      renderUseCaseSection({
        title: bilingualText("全部使用场景", "All Use Cases"),
        kicker: bilingualText("任务索引", "Task Index"),
        summary: "从 style atlas、文化出版、设计工作室、研究知识站、AI 工具到 future-tech launch，都能直接找到推荐组合。",
        useCasesList: useCases,
        sectionId: "all-use-cases",
        actionMarkup: ""
      })
    ].join("")
  });
}

function buildSelectorPage() {
  const packet = resolveSelectorPacket(selectorDefaultState);
  const familyOptions = selectorFamilyCandidates(packet.useCase);
  const structureOptions = selectorStructureCandidates(packet.useCase, packet.family);
  const payload = serializeJsonForHtml(selectorPayload());

  return layout({
    title: `${bilingualText("选型器", "Style Selector")} · ${siteMeta.title}`,
    description: "A scenario-first selector that turns use cases into movement, family, structure, references, and prompt packets.",
    pathname: selectorHref(),
    pageClass: "index-page selector-page",
    body: [
      renderPageLead({
        kicker: bilingualText("选型器", "Style Selector"),
        title: bilingualText("先选网站任务，再拿走一套组合", "Start with the job, leave with a packet"),
        summary: "先说你要做什么网站，再用气质和结构偏好微调。页面会直接给你 movement、family、structure、真实参考和可复制 prompt。",
        detail: "这一页不是自由拼装器，而是场景优先的决策工具。先把 job 选对，再决定气质和结构，结果会更稳定，也更适合继续交给 agent。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/use-cases", "ghost-button")}>${escapeHtml(
          bilingualText("浏览全部场景", "Browse Use Cases")
        )}</a><a ${linkAttrs("/families", "button")}>${escapeHtml(
          bilingualText("浏览网页家族", "Browse Families")
        )}</a></div>`
      }),
      `<section class="section selector-shell" id="selector">
        <div class="selector-layout" data-style-selector>
          <aside class="selector-panel card-surface">
            <div class="selector-panel-copy">
              <p class="eyebrow">${escapeHtml(bilingualText("输入条件", "Inputs"))}</p>
              <h2 class="section-title">${escapeHtml(bilingualText("从场景开始", "Start from the use case"))}</h2>
              <p class="section-summary">${escapeHtml(
                "先选 use case。family 和 structure 只做覆盖，不建议先跳过场景直接拼视觉。"
              )}</p>
            </div>
            <form class="selector-form" data-selector-form>
              ${renderSelectorField({
                name: "useCaseId",
                labelZh: "我要做什么",
                labelEn: "Use Case",
                options: useCases,
                selected: packet.state.useCaseId
              })}
              ${renderSelectorField({
                name: "familyId",
                labelZh: "网页家族覆盖",
                labelEn: "Family Override",
                options: familyOptions,
                selected: packet.state.familyId,
                allowAuto: true
              })}
              ${renderSelectorField({
                name: "structureId",
                labelZh: "结构覆盖",
                labelEn: "Structure Override",
                options: structureOptions,
                selected: packet.state.structureId,
                allowAuto: true
              })}
              ${renderSelectorField({
                name: "tone",
                labelZh: "气质偏好",
                labelEn: "Tone",
                options: selectorToneOptions,
                selected: packet.state.tone
              })}
              ${renderSelectorField({
                name: "mode",
                labelZh: "交互偏好",
                labelEn: "Mode",
                options: selectorModeOptions,
                selected: packet.state.mode
              })}
            </form>
          </aside>
          ${renderSelectorResults(packet)}
        </div>
        <script id="selector-data" type="application/json">${payload}</script>
      </section>`
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
  writePage(["structures"], buildStructuresPage());
  writePage(["selector"], buildSelectorPage());
  writePage(["use-cases"], buildUseCasesPage());

  for (const family of families) {
    writePage(["families", family.id], renderFamilyDetail(family));
  }

  for (const movement of movements) {
    writePage(["movements", movement.id], renderMovementDetail(movement));
  }

  for (const structure of structures) {
    writePage(["structures", structure.id], renderStructureDetail(structure));
  }

  for (const useCase of useCases) {
    writePage(["use-cases", useCase.id], renderUseCaseDetail(useCase));
  }

  assertNoDuplicateImagesPerPage();
}

function duplicateImageSrcsForPage(html) {
  const matches = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]);
  const counts = new Map();

  for (const src of matches) {
    counts.set(src, (counts.get(src) || 0) + 1);
  }

  return [...counts.entries()].filter(([, count]) => count > 1);
}

function walkHtmlFiles(dirPath) {
  const pages = [];

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      pages.push(...walkHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      pages.push(fullPath);
    }
  }

  return pages;
}

function assertNoDuplicateImagesPerPage() {
  const failures = walkHtmlFiles(distRoot)
    .map((filePath) => ({
      filePath,
      duplicates: duplicateImageSrcsForPage(fs.readFileSync(filePath, "utf8"))
    }))
    .filter((entry) => entry.duplicates.length);

  if (!failures.length) return;

  const message = failures
    .map(
      ({ filePath, duplicates }) =>
        `${path.relative(distRoot, filePath)} => ${duplicates.map(([src, count]) => `${count}x ${src}`).join(", ")}`
    )
    .join("; ");

  throw new Error(`Per-page duplicate screenshot check failed: ${message}`);
}

build();

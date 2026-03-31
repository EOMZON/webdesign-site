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
  "art-nouveau": visualAsset("gentlewoman-cover-live.png", "The Gentlewoman", "The Gentlewoman homepage"),
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
        <a href="/use-cases">${escapeHtml(bilingualText("使用场景", "Use Cases"))}</a>
      </nav>
      <span class="status-pill">atlas v0.8</span>
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

function renderTimelineStreamItem(item, isOpen = false) {
  const leadVisual = item.primaryVisual || fallbackVisual(item);
  const relatedFamilies = item.familyIds.map((id) => familyMap.get(id)).filter(Boolean);
  const visibleFamilies = relatedFamilies.slice(0, 3);
  const guide = movementGuide(item);
  const years = movementYears(item);

  return `<details class="timeline-stream-item card-surface"${isOpen ? " open" : ""}>
    <summary class="timeline-stream-summary">
      <span class="timeline-stream-years" aria-hidden="true">
        <span class="timeline-stream-year-start">${escapeHtml(String(years.start))}</span>
        <span class="timeline-stream-year-end">${escapeHtml(String(years.end))}</span>
      </span>
      <span class="timeline-stream-marker" aria-hidden="true">
        <span class="timeline-stream-dot"></span>
      </span>
      <div class="timeline-stream-preview">
        <div class="timeline-stream-preview-media">
          ${
            leadVisual?.screenshot
              ? renderImageFigure(leadVisual.screenshot, leadVisual.alt, leadVisual.label, "timeline-stream-figure")
              : `<div class="image-placeholder">${escapeHtml(bilingualText("图片待补充", "Image Pending"))}</div>`
          }
        </div>
        <div class="timeline-stream-preview-copy">
          <p class="eyebrow">${escapeHtml(item.origin)}</p>
          <h2 class="detail-title timeline-stream-title">${renderBilingualStack(
            item.titleZh,
            item.titleEn || item.title,
            "detail-bilingual-title"
          )}</h2>
          <p class="timeline-stream-hook">${escapeHtml(guide.hook)}</p>
          <p class="timeline-stream-common">${escapeHtml(guide.common)}</p>
          <div class="meta-block timeline-stream-preview-families">
            <h4>${escapeHtml(bilingualText("下一步去看哪类网站", "Next Stops"))}</h4>
            ${renderStaticPills(visibleFamilies)}
          </div>
          <span class="timeline-stream-toggle">
            <span class="timeline-stream-toggle-closed">${escapeHtml(bilingualText("点开看这种感觉怎么用", "Open How It Shows Up"))}</span>
            <span class="timeline-stream-toggle-open">${escapeHtml(bilingualText("收起这一支", "Close This Chapter"))}</span>
          </span>
        </div>
      </div>
    </summary>
    <div class="timeline-stream-body">
      <span class="timeline-stream-body-spacer" aria-hidden="true"></span>
      <span class="timeline-stream-body-track" aria-hidden="true"></span>
      <div class="timeline-stream-body-main">
        <div class="timeline-stream-meta-grid">
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("你常会在哪类网站看到它", "Where You'll See It"))}</h4>
            ${renderLinkedPills(visibleFamilies.map((entry) => entry.id), familyMap, familyHref)}
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("如果你也想做这种感觉", "Good If You Want This Feel"))}</h4>
            <p>${escapeHtml(item.whyItMatters || item.summary || guide.common)}</p>
          </div>
        </div>
        <details class="timeline-details">
          <summary>${escapeHtml(bilingualText("点开看它最抓人的地方", "Open Clues + Watchouts"))}</summary>
          <div class="timeline-details-grid">
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("你会先看到什么", "What You'll Spot Fast"))}</h4>
              ${renderList(item.principles.slice(0, 4))}
            </div>
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("最容易做坏的地方", "Easy Ways to Lose It"))}</h4>
              ${renderList(item.watchouts.slice(0, 3))}
            </div>
          </div>
        </details>
        <div class="hero-actions">
          <a ${linkAttrs(movementHref(item.id), "button")}>${escapeHtml(bilingualText("查看完整流派", "Full Movement"))}</a>
        </div>
      </div>
    </div>
  </details>`;
}

function renderTimelineAtlasSection(options = {}) {
  const {
    title = bilingualText("历史流派时间轴", "Historical Timeline"),
    titleZh = "",
    titleEn = "",
    kicker = bilingualText("历史流派", "Historical Timeline"),
    summary = "",
    sectionId = "timeline-atlas",
    featuredId = "swiss-international-typography",
    heroMode = false
  } = options;

  const ordered = [...movements].sort((a, b) => movementYears(a).start - movementYears(b).start);
  const defaultId = ordered.some((item) => item.id === featuredId) ? featuredId : ordered[0]?.id;
  const titleMarkup =
    titleZh || titleEn
      ? renderBilingualStack(titleZh || title, titleEn || "", "timeline-feature-title-stack")
      : escapeHtml(title);

  return `<section class="section timeline-feature${heroMode ? " timeline-feature--hero" : ""}" id="${escapeHtml(sectionId)}">
    <div class="timeline-feature-head">
      <p class="eyebrow">${escapeHtml(kicker)}</p>
      <h1 class="${heroMode ? "hero-title" : "section-title"} timeline-feature-title">${titleMarkup}</h1>
      ${summary ? `<p class="timeline-feature-intro">${escapeHtml(summary)}</p>` : ""}
    </div>
    <div class="timeline-stream" aria-label="${escapeHtml(bilingualText("历史流派", "Historical Timeline"))}">
      ${ordered.map((item) => renderTimelineStreamItem(item, item.id === defaultId)).join("")}
    </div>
  </section>`;
}

function renderFamilyCoordinateSection() {
  const plottedFamilies = families
    .map((item) => ({ ...item, coords: familyFieldMap[item.id] }))
    .filter((item) => item.coords);

  return `<section class="section" id="style-field">
    ${renderSectionHead(
      bilingualText("风格坐标场", "Style Coordinate Field"),
      bilingualText("不是按时间，而是按气质和结构选", "Choose by temperament, not only by chronology"),
      "横轴从系统与档案走向舞台与表现，纵轴从安静克制走向强烈张力。"
    )}
    <div class="atlas-scroller">
      <div class="field-atlas card-surface">
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
    </div>
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
  const structureTitles = item.structureIds.map((id) => structureMap.get(id)).filter(Boolean);
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

function renderUseCaseDetail(item) {
  const primaryFamily = familyMap.get(item.primaryFamilyId);
  const secondaryFamilies = item.secondaryFamilyIds.map((id) => familyMap.get(id)).filter(Boolean);
  const structures = item.structureIds.map((id) => structureMap.get(id)).filter(Boolean);
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
      renderTimelineAtlasSection({
        titleZh: "你喜欢的页面感觉，从哪条历史线长出来",
        titleEn: "Find the lineage behind the web feel you like",
        kicker: bilingualText("历史流派", "Historical Timeline"),
        summary: "",
        sectionId: "top",
        featuredId: "arts-and-crafts",
        heroMode: true
      }),
      renderBrowseModes(),
      renderFamilyCoordinateSection(),
      renderFamilyGridSection({ familiesList: families.slice(0, 6) }),
      renderUseCaseSection({ useCasesList: useCases })
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
        summary: "按时间往下看，先抓住你想继续看的那条设计线。",
        sectionId: "movement-timeline"
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
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>${escapeHtml(bilingualText("返回首页", "Back Home"))}</a><a ${linkAttrs("/families", "button")}>${escapeHtml(bilingualText("查看网页家族", "Open Families"))}</a></div>`
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

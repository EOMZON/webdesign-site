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
import {
  atlasEcosystemCatalog,
  currentWebSignalsCatalog,
  designSkillsRepoHref,
  extraStyleSources,
  styleReferenceCatalog,
  styleSkillSpecCatalog
} from "../src/style-atlas-catalog.mjs";

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

const familyBrowseMeta = {
  "magazine-editorial": {
    styleNameZh: "杂志编辑",
    filterLabel: "杂志 / 出版",
    looksLike: ["封面感首屏", "主标题和大图带节奏", "内容像一期杂志往下展开"],
    fit: ["出版站", "内容站", "品牌特稿"],
    notFor: ["后台工具", "复杂表单", "高频任务流"],
    audience: ["fans", "self"],
    axis: "distinctive",
    featured: true
  },
  "quiet-lifestyle-editorial": {
    styleNameZh: "工艺自然",
    filterLabel: "工艺 / 自然",
    looksLike: ["留白很多", "图片安静", "节奏慢", "品牌气质先成立"],
    fit: ["生活方式品牌", "手工艺站", "慢节奏内容站"],
    notFor: ["硬核工具页", "促销电商", "信息特别密的知识库"],
    audience: ["clients", "fans", "self"],
    axis: "distinctive",
    featured: true
  },
  "swiss-typographic-grid": {
    styleNameZh: "瑞士网格",
    filterLabel: "极简 / 黑白",
    looksLike: ["严格网格", "大量留白", "排印主导", "黑白为主"],
    fit: ["档案站", "工作室", "参考库"],
    notFor: ["娱乐发布", "强霓虹科技感", "重促销电商"],
    audience: ["clients", "users", "self"],
    axis: "system",
    featured: true
  },
  "monochrome-studio-systems": {
    styleNameZh: "极简黑白",
    filterLabel: "极简 / 黑白",
    looksLike: ["黑白排版", "项目索引清楚", "工作室语气强", "看起来很克制"],
    fit: ["作品集", "品牌页", "创意机构"],
    notFor: ["高饱和活动页", "复杂运营后台", "儿童向页面"],
    audience: ["clients", "employers", "self"],
    axis: "distinctive",
    featured: true
  },
  "product-precision-interface": {
    styleNameZh: "产品工具",
    filterLabel: "产品 / 工具",
    looksLike: ["界面精密", "截图解释功能", "信息层级清楚", "任务优先"],
    fit: ["工具产品", "AI 产品", "平台首页"],
    notFor: ["纯内容阅读", "慢节奏品牌站", "实验性艺术页"],
    audience: ["users", "clients"],
    axis: "system",
    featured: true
  },
  "stage-driven-showcase": {
    styleNameZh: "发布舞台",
    filterLabel: "大胆 / 个性",
    looksLike: ["一张图先定调", "首屏像舞台", "世界观先成立", "下面再解释"],
    fit: ["发布页", "活动页", "作品展示"],
    notFor: ["知识库", "重筛选目录", "复杂工具壳"],
    audience: ["fans", "users"],
    axis: "distinctive",
    featured: false
  },
  "curated-reference-directory": {
    styleNameZh: "参考图库",
    filterLabel: "产品 / 工具",
    looksLike: ["缩略图很多", "先浏览再下钻", "分类清楚", "筛选明显"],
    fit: ["灵感库", "模板库", "参考站"],
    notFor: ["单一品牌故事", "长文特稿", "只有一两个案例的站"],
    audience: ["users", "self"],
    axis: "system",
    featured: false
  },
  "evidence-dense-knowledge-surface": {
    styleNameZh: "知识档案",
    filterLabel: "产品 / 工具",
    looksLike: ["信息密但有秩序", "模块清楚", "证据和导航并存", "可信度高"],
    fit: ["知识库", "研究站", "文档入口"],
    notFor: ["纯情绪品牌页", "重图片轻文字页面", "短促销活动"],
    audience: ["users", "clients", "self"],
    axis: "system",
    featured: false
  },
  "playful-postmodern-anti-grid": {
    styleNameZh: "大胆个性",
    filterLabel: "大胆 / 个性",
    looksLike: ["反模板", "边界更硬", "形状更跳", "看起来有态度"],
    fit: ["创作者主页", "个人品牌", "实验发布页"],
    notFor: ["严肃知识站", "机构官网", "需要平静信任感的页面"],
    audience: ["fans", "self"],
    axis: "distinctive",
    featured: true
  },
  "neon-techno-futurist-interface": {
    styleNameZh: "霓虹科技",
    filterLabel: "科技 / 未来",
    looksLike: ["黑底高对比", "霓虹光感", "未来科技感", "能量很强"],
    fit: ["游戏页", "硬件发布", "科技感 landing page"],
    notFor: ["安静阅读", "生活方式品牌", "档案站"],
    audience: ["fans", "users"],
    axis: "distinctive",
    featured: true
  }
};

for (const family of families) {
  const meta = familyBrowseMeta[family.id] || {};
  family.styleNameZh = meta.styleNameZh || family.titleZh;
  family.filterLabel = meta.filterLabel || "全部";
  family.looksLike = meta.looksLike || [];
  family.fit = meta.fit || [];
  family.notFor = meta.notFor || [];
  family.audience = meta.audience || [];
  family.axis = meta.axis || "system";
  family.featured = meta.featured ?? false;
  family.demoHref = family.references?.[0]?.href || "";
  family.downloadHref = sitePath("downloads", `${family.id}.md`);
}

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
  "creative-media-editorial": visualAsset(
    "itsnicethat-live.png",
    "It's Nice That",
    "It's Nice That homepage"
  ),
  "product-precision-interface": visualAsset("linear.png", "Linear", "Linear homepage"),
  "stage-driven-showcase": visualAsset("a24.png", "A24", "A24 homepage"),
  "template-market-library": visualAsset(
    "notion-templates-live.png",
    "Notion Templates",
    "Notion templates page"
  ),
  "curated-reference-directory": visualAsset(
    "awwwards-websites-live.png",
    "Awwwards / Websites",
    "Awwwards websites directory"
  ),
  "networked-visual-board": visualAsset("arena-home-live.png", "Are.na", "Are.na homepage"),
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
  ),
  "institutional-program-grid": visualAsset("swiss-institute.png", "Swiss Institute", "Swiss Institute homepage"),
  "report-storytelling-narrative": visualAsset(
    "pair-guidebook.png",
    "People + AI Guidebook",
    "People + AI Guidebook page"
  ),
  "developer-infrastructure-aura": visualAsset("vercel.png", "Vercel", "Vercel homepage"),
  "industrial-hardware-minimal": visualAsset(
    "apple-macbook.png",
    "Apple MacBook Pro",
    "Apple MacBook Pro page"
  ),
  "experimental-typographic-poster": visualAsset("studio-feixen.png", "Studio Feixen", "Studio Feixen homepage"),
  "editorial-commerce-catalog": visualAsset(
    "gentlewoman-live.png",
    "The Gentlewoman",
    "The Gentlewoman homepage"
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
    ...((item.liveReferences || []).map((entry) =>
      visualAsset(entry.screenshot, entry.label || baseLabel, entry.alt || entry.label || baseAlt)
    ) || []),
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

function assignUniqueVisuals(items, reservedScreenshots = new Set()) {
  const entries = items.map((item) => ({
    item,
    candidates: itemVisualCandidates(item).filter((visual) => visual?.screenshot && !reservedScreenshots.has(visual.screenshot))
  }));
  const assignedByScreenshot = new Map();
  const assignedByItem = new Map();
  const orderedEntries = [...entries].sort(
    (left, right) =>
      left.candidates.length - right.candidates.length ||
      String(left.item.nameZh || left.item.titleZh || left.item.title || "").localeCompare(
        String(right.item.nameZh || right.item.titleZh || right.item.title || ""),
        "zh-CN"
      )
  );

  function visit(entry, seen = new Set()) {
    for (const visual of entry.candidates) {
      const screenshot = visual?.screenshot;
      if (!screenshot || seen.has(screenshot)) continue;
      seen.add(screenshot);
      const owner = assignedByScreenshot.get(screenshot);
      if (!owner || visit(owner, seen)) {
        assignedByScreenshot.set(screenshot, entry);
        assignedByItem.set(entry.item.id, visual);
        return true;
      }
    }
    return false;
  }

  orderedEntries.forEach((entry) => visit(entry, new Set()));

  const usedScreenshots = new Set(reservedScreenshots);
  assignedByItem.forEach((visual) => {
    if (visual?.screenshot) usedScreenshots.add(visual.screenshot);
  });

  const visualMap = new Map();
  for (const item of items) {
    const assigned = assignedByItem.get(item.id);
    const fallback = assigned || pickContextualVisual(item, usedScreenshots, { avoidScreenshots: reservedScreenshots });
    visualMap.set(item.id, fallback);
    if (fallback?.screenshot) usedScreenshots.add(fallback.screenshot);
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

const browseFilterOptions = [
  { id: "all", labelZh: "全部", labelEn: "All" },
  { id: "minimal-black-white", labelZh: "极简 / 黑白", labelEn: "Minimal / B&W" },
  { id: "technology-future", labelZh: "科技 / 未来", labelEn: "Tech / Future" },
  { id: "craft-natural", labelZh: "工艺 / 自然", labelEn: "Craft / Natural" },
  { id: "bold-personality", labelZh: "大胆 / 个性", labelEn: "Bold / Personality" },
  { id: "magazine-publishing", labelZh: "杂志 / 出版", labelEn: "Magazine / Publishing" },
  { id: "product-tool", labelZh: "产品 / 工具", labelEn: "Product / Tool" }
];

const styleMetaMap = {
  "swiss-typographic-grid": {
    slug: "swiss-grid",
    nameZh: "瑞士网格",
    cardUses: ["档案站", "工作室", "参考库"],
    lookLike: ["严格网格", "大量留白", "排印主导", "黑白为主"],
    notFor: ["娱乐发布", "霓虹科技页", "重情绪电商"],
    filterTags: ["minimal-black-white"],
    siteTypes: ["portfolio", "brand", "blog", "other"],
    audiences: ["clients", "general", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "monochrome-studio-systems": {
    slug: "minimal-black-white",
    nameZh: "极简黑白",
    cardUses: ["作品集", "品牌站", "工作室"],
    lookLike: ["黑白对比", "项目索引", "留白控制", "作者感强"],
    notFor: ["电商首页", "高频工具台", "重彩活动页"],
    filterTags: ["minimal-black-white"],
    siteTypes: ["portfolio", "brand", "other"],
    audiences: ["clients", "general", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "dark-studio-gallery": {
    slug: "dark-studio-gallery",
    nameZh: "暗色画廊",
    cardUses: ["工作室作品集", "案例展示", "Selected Works"],
    lookLike: ["黑底图像墙", "作品切片先行", "标题克制", "工作室语气明确"],
    notFor: ["知识库", "高密度工具页", "生活方式杂志站"],
    filterTags: ["minimal-black-white", "bold-personality"],
    siteTypes: ["portfolio", "brand", "other"],
    audiences: ["clients", "fans", "self"],
    toneAxis: "quiet",
    orderAxis: "distinctive"
  },
  "identity-case-archive": {
    slug: "identity-case-archive",
    nameZh: "品牌案例档案",
    cardUses: ["品牌机构", "设计咨询", "案例档案"],
    lookLike: ["案例先行", "元数据清楚", "机构感强", "档案秩序明显"],
    notFor: ["纯情绪发布页", "随机作品墙", "高频工具台"],
    filterTags: ["minimal-black-white", "magazine-publishing"],
    siteTypes: ["portfolio", "brand", "other"],
    audiences: ["clients", "general", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "institutional-program-grid": {
    slug: "institutional-grid",
    nameZh: "机构项目网格",
    cardUses: ["美术馆站", "机构项目", "节展计划"],
    lookLike: ["清冷网格", "program 并列", "栏目克制", "机构感明确"],
    notFor: ["强销售首页", "纯工具后台", "单一 hero 发布页"],
    filterTags: ["minimal-black-white", "magazine-publishing"],
    siteTypes: ["brand", "blog", "other"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "design-system-foundation": {
    slug: "design-system-foundation",
    nameZh: "设计系统基座",
    cardUses: ["设计系统", "组件规范", "基础库"],
    lookLike: ["foundation 导航", "规则先行", "侧栏稳定", "部件层级清楚"],
    notFor: ["情绪品牌页", "慢内容首页", "沉浸发布页"],
    filterTags: ["product-tool", "minimal-black-white"],
    siteTypes: ["tool", "other", "brand"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "product-precision-interface": {
    slug: "product-tool",
    nameZh: "产品工具",
    cardUses: ["AI 工具", "产品官网", "平台页"],
    lookLike: ["界面清晰", "状态明确", "截图解释功能", "层级严谨"],
    notFor: ["生活方式品牌", "慢节奏内容站", "纯情绪展示页"],
    filterTags: ["product-tool", "technology-future"],
    siteTypes: ["tool", "brand", "other"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "report-storytelling-narrative": {
    slug: "report-storytelling",
    nameZh: "报告叙事",
    cardUses: ["年度报告", "研究专题", "影响力报告"],
    lookLike: ["结论先行", "图表与章节并进", "滚动叙事", "证据模块化"],
    notFor: ["模板市场", "轻量个人站", "沉浸发布页"],
    filterTags: ["minimal-black-white", "product-tool"],
    siteTypes: ["blog", "tool", "other"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "developer-infrastructure-aura": {
    slug: "developer-platform",
    nameZh: "开发者平台",
    cardUses: ["云平台", "开发者工具", "API 平台"],
    lookLike: ["近黑平台感", "性能可信", "文档邻接", "代码感克制"],
    notFor: ["生活方式品牌", "慢内容站", "工艺自然首页"],
    filterTags: ["product-tool", "technology-future"],
    siteTypes: ["tool", "brand", "other"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "industrial-hardware-minimal": {
    slug: "industrial-hardware",
    nameZh: "工业硬件极简",
    cardUses: ["硬件发布", "设备单品", "科技品牌"],
    lookLike: ["物体主导", "材质克制", "说明很少但准", "工业留白"],
    notFor: ["知识库", "模板目录", "文化资讯站"],
    filterTags: ["technology-future", "minimal-black-white"],
    siteTypes: ["launch", "brand", "other"],
    audiences: ["general", "clients"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "creative-media-editorial": {
    slug: "creative-media",
    nameZh: "创意媒体",
    cardUses: ["创意媒体", "设计博客", "文化资讯"],
    lookLike: ["栏目感强", "图文并行", "更新频繁", "封面与列表共存"],
    notFor: ["重操作工具页", "强销售落地页", "只有少量内容的站"],
    filterTags: ["magazine-publishing"],
    siteTypes: ["blog", "brand", "other"],
    audiences: ["fans", "general", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "journal-frontpage": {
    slug: "journal-frontpage",
    nameZh: "评论期刊首页",
    cardUses: ["评论媒体", "文化周刊", "长期刊物"],
    lookLike: ["刊头权威", "栏目很多", "headline 清楚", "更新节奏稳定"],
    notFor: ["一次性专题页", "重工具产品", "强销售首页"],
    filterTags: ["magazine-publishing"],
    siteTypes: ["blog", "brand", "other"],
    audiences: ["general", "fans", "clients"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "neon-techno-futurist-interface": {
    slug: "neon-tech",
    nameZh: "霓虹科技",
    cardUses: ["游戏页", "发布页", "未来科技"],
    lookLike: ["高反差", "黑底霓虹", "世界观先行", "动势强"],
    notFor: ["档案站", "长文博客", "安静品牌页"],
    filterTags: ["technology-future", "bold-personality"],
    siteTypes: ["launch", "brand", "other"],
    audiences: ["fans", "general"],
    toneAxis: "bold",
    orderAxis: "distinctive"
  },
  "magazine-editorial": {
    slug: "magazine-editorial",
    nameZh: "杂志编辑",
    cardUses: ["出版站", "内容站", "专题页"],
    lookLike: ["封面式首屏", "标题与图片张力", "栏目层级", "阅读节奏"],
    notFor: ["复杂筛选工具", "后台工作台", "强操作产品"],
    filterTags: ["magazine-publishing"],
    siteTypes: ["blog", "brand", "other"],
    audiences: ["fans", "general", "clients"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "quiet-lifestyle-editorial": {
    slug: "craft-natural",
    nameZh: "工艺自然",
    cardUses: ["生活方式", "品牌页", "慢内容"],
    lookLike: ["慢节奏", "质感图片", "留白很多", "收藏感强"],
    notFor: ["工具界面", "高密度知识站", "高频 CTA 落地页"],
    filterTags: ["craft-natural", "magazine-publishing"],
    siteTypes: ["brand", "blog", "portfolio"],
    audiences: ["fans", "general", "clients"],
    toneAxis: "quiet",
    orderAxis: "distinctive"
  },
  "editorial-commerce-catalog": {
    slug: "editorial-commerce",
    nameZh: "编辑商店",
    cardUses: ["设计商店", "刊物目录", "内容品牌零售"],
    lookLike: ["内容与商品并列", "期刊感缩略图", "目录像 issue", "转化不吵"],
    notFor: ["纯 SaaS 工具", "严肃研究档案", "霓虹发布页"],
    filterTags: ["craft-natural", "magazine-publishing"],
    siteTypes: ["brand", "blog", "other"],
    audiences: ["general", "clients", "fans"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "experimental-typographic-poster": {
    slug: "typographic-poster",
    nameZh: "排印海报实验",
    cardUses: ["设计活动", "展览专题", "文化 campaign"],
    lookLike: ["字体是主视觉", "海报感强", "版面冲突可控", "文化气质浓"],
    notFor: ["后台工具", "复杂目录", "平静信任型官网"],
    filterTags: ["bold-personality", "magazine-publishing"],
    siteTypes: ["launch", "brand", "portfolio", "other"],
    audiences: ["fans", "general", "clients"],
    toneAxis: "bold",
    orderAxis: "distinctive"
  },
  "playful-postmodern-anti-grid": {
    slug: "bold-personality",
    nameZh: "大胆个性",
    cardUses: ["创作者", "个人站", "反模板发布"],
    lookLike: ["反网格", "形状强烈", "识别度高", "态度明显"],
    notFor: ["严肃知识库", "政府机构页", "安静阅读站"],
    filterTags: ["bold-personality"],
    siteTypes: ["portfolio", "brand", "launch", "other"],
    audiences: ["fans", "general", "self"],
    toneAxis: "bold",
    orderAxis: "distinctive"
  },
  "brutalist-raw-interface": {
    slug: "brutalist-raw",
    nameZh: "粗野直给",
    cardUses: ["创作者发布", "实验品牌", "宣言页"],
    lookLike: ["硬边界", "高对比", "直给排版", "不讨好但可读"],
    notFor: ["静奢品牌", "严肃知识库", "复杂后台工具"],
    filterTags: ["bold-personality"],
    siteTypes: ["portfolio", "brand", "launch", "other"],
    audiences: ["fans", "general", "self"],
    toneAxis: "bold",
    orderAxis: "distinctive"
  },
  "template-market-library": {
    slug: "template-market",
    nameZh: "模板市场",
    cardUses: ["模板库", "Prompt 库", "Starter Kit"],
    lookLike: ["分类清楚", "卡片可转化", "列表密度高", "浏览与购买并存"],
    notFor: ["纯品牌故事页", "长文特稿", "沉浸式发布页"],
    filterTags: ["product-tool"],
    siteTypes: ["tool", "other", "brand"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "showcase-discovery-index": {
    slug: "showcase-index",
    nameZh: "甄选展示索引",
    cardUses: ["甄选案例站", "奖项展示", "灵感发现"],
    lookLike: ["featured 入口", "分类 chips", "案例墙密集", "策展口味强"],
    notFor: ["内部知识库", "单一品牌首页", "重操作工作台"],
    filterTags: ["product-tool", "magazine-publishing"],
    siteTypes: ["blog", "tool", "other"],
    audiences: ["general", "self", "clients"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "curated-reference-directory": {
    slug: "reference-directory",
    nameZh: "参考目录",
    cardUses: ["灵感库", "模板库", "参考站"],
    lookLike: ["缩略图密集", "分类先行", "浏览优先", "索引清楚"],
    notFor: ["单一品牌首页", "强剧情叙事页", "情绪化发布页"],
    filterTags: ["product-tool", "magazine-publishing"],
    siteTypes: ["blog", "tool", "other"],
    audiences: ["general", "self", "clients"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "creative-portfolio-network": {
    slug: "creative-network",
    nameZh: "作品社区网络",
    cardUses: ["创意社区", "作品平台", "公开案例库"],
    lookLike: ["作者与作品并列", "公开发现机制", "社交证明", "平台感更强"],
    notFor: ["纯研究地图", "机构档案站", "安静长文首页"],
    filterTags: ["product-tool", "bold-personality"],
    siteTypes: ["tool", "portfolio", "other"],
    audiences: ["general", "fans", "self"],
    toneAxis: "quiet",
    orderAxis: "distinctive"
  },
  "networked-visual-board": {
    slug: "visual-board",
    nameZh: "灵感看板",
    cardUses: ["灵感库", "研究地图", "案例收集"],
    lookLike: ["关系感强", "卡片可延展", "标签驱动", "收藏与下钻并存"],
    notFor: ["单一品牌首页", "高转化落地页", "严格流程工具"],
    filterTags: ["product-tool", "bold-personality"],
    siteTypes: ["tool", "blog", "other"],
    audiences: ["self", "general", "clients"],
    toneAxis: "quiet",
    orderAxis: "distinctive"
  },
  "evidence-dense-knowledge-surface": {
    slug: "knowledge-system",
    nameZh: "知识系统",
    cardUses: ["知识库", "研究站", "设计系统"],
    lookLike: ["信息密度高", "论点明确", "证据模块", "导航清楚"],
    notFor: ["纯视觉品牌页", "娱乐首屏", "情绪化叙事"],
    filterTags: ["minimal-black-white", "product-tool"],
    siteTypes: ["blog", "tool", "other"],
    audiences: ["general", "self", "clients"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "stage-driven-showcase": {
    slug: "stage-showcase",
    nameZh: "舞台展示",
    cardUses: ["品牌发布", "作品首屏", "Campaign"],
    lookLike: ["主视觉独占", "信息密度低", "镜头感强", "记忆点明确"],
    notFor: ["复杂目录页", "重筛选工具", "长期增长档案"],
    filterTags: ["bold-personality", "technology-future"],
    siteTypes: ["launch", "brand", "portfolio"],
    audiences: ["fans", "general", "clients"],
    toneAxis: "bold",
    orderAxis: "distinctive"
  },
  "luxury-fashion-editorial": {
    slug: "luxury-fashion-editorial",
    nameZh: "时尚奢刊",
    cardUses: ["时尚品牌", "奢刊专题", "文化品牌"],
    lookLike: ["大片裁切", "奢华留白", "时尚感 serif", "封面节奏"],
    notFor: ["工具产品", "重筛选目录", "高频任务流"],
    filterTags: ["magazine-publishing", "craft-natural"],
    siteTypes: ["brand", "blog", "launch"],
    audiences: ["fans", "clients", "general"],
    toneAxis: "quiet",
    orderAxis: "distinctive"
  },
  "humanist-modern-brand": {
    slug: "humanist-modern",
    nameZh: "人文现代",
    cardUses: ["生活方式品牌", "现代产品品牌", "内容品牌首页"],
    lookLike: ["温和现代", "留白克制", "人味而不复古", "产品与内容并存"],
    notFor: ["极端科技场景", "反模板实验页", "重型后台工具"],
    filterTags: ["craft-natural", "minimal-black-white"],
    siteTypes: ["brand", "portfolio", "blog", "other"],
    audiences: ["clients", "general", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "hospitality-scene-editorial": {
    slug: "hospitality-scene",
    nameZh: "酒店场景叙事",
    cardUses: ["酒店品牌", "餐饮空间", "城市场景页"],
    lookLike: ["地点气氛强", "program 并列", "摄影先行", "像进入一个地方"],
    notFor: ["工具后台", "高密度知识站", "模板市场首页"],
    filterTags: ["craft-natural", "magazine-publishing"],
    siteTypes: ["brand", "blog", "other"],
    audiences: ["fans", "general", "clients"],
    toneAxis: "quiet",
    orderAxis: "distinctive"
  },
  "photo-journal-archive": {
    slug: "photo-journal-archive",
    nameZh: "摄影期刊档案",
    cardUses: ["摄影出版", "图像档案", "艺术期刊"],
    lookLike: ["封面先行", "issue 节奏", "图像尺度大", "archive 深度强"],
    notFor: ["高频工具站", "纯流程服务页", "普通资讯 feed"],
    filterTags: ["magazine-publishing", "minimal-black-white"],
    siteTypes: ["blog", "portfolio", "other"],
    audiences: ["fans", "general", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "architecture-space-minimal": {
    slug: "architecture-space",
    nameZh: "建筑空间极简",
    cardUses: ["建筑事务所", "空间品牌", "practice archive"],
    lookLike: ["空间图像主导", "留白很多", "项目秩序清楚", "practice 感强"],
    notFor: ["高频功能工具", "大促电商", "霓虹科技发布页"],
    filterTags: ["minimal-black-white", "craft-natural"],
    siteTypes: ["portfolio", "brand", "other"],
    audiences: ["clients", "general", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "modern-commerce-minimal": {
    slug: "modern-commerce-minimal",
    nameZh: "现代零售极简",
    cardUses: ["服饰零售", "DTC 品牌", "品类目录页"],
    lookLike: ["低噪声商品图", "分类入口清楚", "品牌语气安静", "购物路径克制"],
    notFor: ["复杂后台工具", "研究档案站", "强世界观游戏页"],
    filterTags: ["craft-natural", "product-tool"],
    siteTypes: ["brand", "other"],
    audiences: ["general", "clients", "fans"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "civic-service-clarity": {
    slug: "civic-service",
    nameZh: "公共服务清晰系统",
    cardUses: ["公共服务站", "流程办理页", "服务设计文档"],
    lookLike: ["plain language", "任务入口强", "层级稳定", "高可读"],
    notFor: ["奢华品牌首页", "实验海报页", "纯情绪发布页"],
    filterTags: ["product-tool", "minimal-black-white"],
    siteTypes: ["tool", "blog", "other"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "expert-course-marketplace": {
    slug: "expert-course-marketplace",
    nameZh: "专家课程平台",
    cardUses: ["课程平台", "creator education", "cohort course"],
    lookLike: ["课程卡清楚", "导师信誉强", "报名路径短", "目录与内容并存"],
    notFor: ["纯品牌大片", "空间作品集", "政府服务页"],
    filterTags: ["product-tool", "magazine-publishing"],
    siteTypes: ["tool", "blog", "other"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "bento-product-launch": {
    slug: "bento-product-launch",
    nameZh: "Bento 产品发布",
    cardUses: ["AI 产品", "startup 官网", "模块化 landing page"],
    lookLike: ["hero 后接拼块", "快节奏扫读", "产品卡片密", "说明模块化"],
    notFor: ["安静生活方式站", "机构 program 首页", "纯图像期刊"],
    filterTags: ["product-tool", "technology-future"],
    siteTypes: ["tool", "launch", "brand", "other"],
    audiences: ["general", "clients", "fans"],
    toneAxis: "bold",
    orderAxis: "structured"
  },
  "ai-companion-landing": {
    slug: "ai-companion",
    nameZh: "AI 助手着陆页",
    cardUses: ["agent 产品", "客服 AI", "自动化助手"],
    lookLike: ["agent 角色先行", "workflow demo 很近", "CTA 很短", "转化与能力并列"],
    notFor: ["普通 docs 首页", "纯研究档案站", "慢节奏生活方式页"],
    filterTags: ["technology-future", "product-tool"],
    siteTypes: ["tool", "brand", "launch", "other"],
    audiences: ["general", "clients", "fans"],
    toneAxis: "bold",
    orderAxis: "structured"
  },
  "docs-first-open-source": {
    slug: "docs-first-open-source",
    nameZh: "文档优先开源产品",
    cardUses: ["开源产品", "framework 官网", "开发者工具"],
    lookLike: ["get started 很近", "文档邻接", "代码可信", "社区证明明确"],
    notFor: ["纯大片品牌页", "无文档入口的营销站", "情绪型杂志首页"],
    filterTags: ["product-tool", "technology-future", "minimal-black-white"],
    siteTypes: ["tool", "other", "brand"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "fintech-trust-platform": {
    slug: "fintech-trust",
    nameZh: "金融可信平台",
    cardUses: ["支付平台", "银行产品", "财务工具"],
    lookLike: ["trust 很快出现", "交易路径清楚", "产品界面证明能力", "金融动作可读"],
    notFor: ["海报式文化首页", "纯情绪发布页", "实验排印专题"],
    filterTags: ["product-tool"],
    siteTypes: ["tool", "brand", "other"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "health-care-soft-tech": {
    slug: "health-soft-tech",
    nameZh: "医疗健康软科技",
    cardUses: ["数字健康", "care 科技", "医疗品牌站"],
    lookLike: ["关怀但可信", "产品结果明确", "人物与数据并用", "界面克制"],
    notFor: ["冷硬开发者平台", "霓虹游戏页", "普通 DTC 商店页"],
    filterTags: ["craft-natural", "product-tool"],
    siteTypes: ["brand", "tool", "other"],
    audiences: ["general", "clients", "fans"],
    toneAxis: "quiet",
    orderAxis: "structured"
  },
  "frontier-research-lab": {
    slug: "frontier-research-lab",
    nameZh: "前沿研究实验室",
    cardUses: ["研究机构", "AI research", "科学平台公司"],
    lookLike: ["thesis 先行", "机构信誉明确", "研究入口可深读", "像 lab 而不是 SaaS"],
    notFor: ["纯销售型 landing page", "大众电商首页", "模板市场目录"],
    filterTags: ["technology-future", "minimal-black-white"],
    siteTypes: ["brand", "blog", "other"],
    audiences: ["general", "clients", "self"],
    toneAxis: "quiet",
    orderAxis: "distinctive"
  }
};

const styleSkillSpecMap = styleSkillSpecCatalog;

const styleOrder = [
  "swiss-typographic-grid",
  "identity-case-archive",
  "institutional-program-grid",
  "civic-service-clarity",
  "monochrome-studio-systems",
  "dark-studio-gallery",
  "architecture-space-minimal",
  "humanist-modern-brand",
  "hospitality-scene-editorial",
  "modern-commerce-minimal",
  "photo-journal-archive",
  "report-storytelling-narrative",
  "design-system-foundation",
  "docs-first-open-source",
  "expert-course-marketplace",
  "developer-infrastructure-aura",
  "fintech-trust-platform",
  "bento-product-launch",
  "ai-companion-landing",
  "health-care-soft-tech",
  "frontier-research-lab",
  "industrial-hardware-minimal",
  "creative-media-editorial",
  "journal-frontpage",
  "neon-techno-futurist-interface",
  "magazine-editorial",
  "luxury-fashion-editorial",
  "quiet-lifestyle-editorial",
  "editorial-commerce-catalog",
  "experimental-typographic-poster",
  "playful-postmodern-anti-grid",
  "brutalist-raw-interface",
  "product-precision-interface",
  "template-market-library",
  "showcase-discovery-index",
  "curated-reference-directory",
  "creative-portfolio-network",
  "networked-visual-board",
  "evidence-dense-knowledge-surface",
  "stage-driven-showcase"
];

const styleSourceMap = new Map([
  ...families.map((item) => [item.id, item]),
  ...extraStyleSources.map((item) => [item.id, item])
]);

const styleFamilies = styleOrder
  .map((id) => styleSourceMap.get(id))
  .filter(Boolean)
  .map((item) => {
    const meta = styleMetaMap[item.id] || {};
    const liveReferences = (styleReferenceCatalog[item.id] || []).filter((entry) => isUsableScreenshot(entry.screenshot));
    const leadReference = liveReferences[0] || null;
    const primarySample = uniqueSamples(item.samples || [])[0] || null;
    return {
      ...item,
      slug: meta.slug || item.id,
      href: browseHref(meta.slug || item.id),
      nameZh: meta.nameZh || item.titleZh || item.title,
      cover: leadReference?.screenshot || primarySample?.screenshot || item.cover || "",
      coverLabel: leadReference?.label || primarySample?.label || item.coverLabel || meta.nameZh || item.titleZh || item.title,
      coverAlt: leadReference?.alt || primarySample?.alt || item.coverAlt || primarySample?.label || item.titleEn || item.title || "",
      demoHref: leadReference?.href || primarySample?.href || item.demoHref || item.references?.[0]?.href || "",
      cardUses: meta.cardUses || (item.bestFor || []).slice(0, 3),
      lookLike: meta.lookLike || (item.signature || []).slice(0, 4),
      notFor: meta.notFor || (item.avoidWhen || []).slice(0, 3),
      filterTags: meta.filterTags || ["all"],
      siteTypes: meta.siteTypes || ["other"],
      audiences: meta.audiences || ["general"],
      toneAxis: meta.toneAxis || "quiet",
      orderAxis: meta.orderAxis || "structured",
      liveReferences,
      skillSpec: styleSkillSpecMap[item.id] || null
    };
  });

const styleFamilyMap = new Map(styleFamilies.map((item) => [item.id, item]));
const styleFamilySlugMap = new Map(styleFamilies.map((item) => [item.slug, item]));

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

const manualFamilyFieldMap = {
  "swiss-typographic-grid": { x: 22, y: 70, shortZh: "瑞士网格", shortEn: "Swiss Grid" },
  "civic-service-clarity": { x: 16, y: 56, shortZh: "公共服务", shortEn: "Civic" },
  "evidence-dense-knowledge-surface": { x: 20, y: 48, shortZh: "证据知识", shortEn: "Evidence Dense" },
  "fintech-trust-platform": { x: 24, y: 36, shortZh: "金融可信", shortEn: "Fintech Trust" },
  "product-precision-interface": { x: 30, y: 44, shortZh: "精密产品", shortEn: "Product Precision" },
  "docs-first-open-source": { x: 26, y: 62, shortZh: "文档开源", shortEn: "Docs First" },
  "bento-product-launch": { x: 40, y: 34, shortZh: "Bento发布", shortEn: "Bento" },
  "ai-companion-landing": { x: 46, y: 22, shortZh: "AI 助手", shortEn: "AI Companion" },
  "curated-reference-directory": { x: 42, y: 62, shortZh: "策展目录", shortEn: "Curated Directory" },
  "monochrome-studio-systems": { x: 44, y: 50, shortZh: "黑白工作室", shortEn: "Monochrome Studio" },
  "health-care-soft-tech": { x: 46, y: 66, shortZh: "健康软科", shortEn: "Health Care" },
  "architecture-space-minimal": { x: 54, y: 74, shortZh: "建筑空间", shortEn: "Architecture" },
  "photo-journal-archive": { x: 58, y: 48, shortZh: "摄影期刊", shortEn: "Photo Journal" },
  "frontier-research-lab": { x: 64, y: 36, shortZh: "前沿实验", shortEn: "Research Lab" },
  "modern-commerce-minimal": { x: 62, y: 58, shortZh: "零售极简", shortEn: "Commerce" },
  "quiet-lifestyle-editorial": { x: 50, y: 28, shortZh: "静奢生活", shortEn: "Quiet Lifestyle" },
  "hospitality-scene-editorial": { x: 68, y: 24, shortZh: "酒店场景", shortEn: "Hospitality" },
  "magazine-editorial": { x: 56, y: 42, shortZh: "杂志特稿", shortEn: "Magazine Editorial" },
  "expert-course-marketplace": { x: 34, y: 56, shortZh: "专家课程", shortEn: "Courses" },
  "stage-driven-showcase": { x: 76, y: 24, shortZh: "舞台展示", shortEn: "Stage Showcase" },
  "playful-postmodern-anti-grid": { x: 84, y: 56, shortZh: "后现代反网格", shortEn: "Anti-Grid" },
  "neon-techno-futurist-interface": { x: 90, y: 18, shortZh: "霓虹未来", shortEn: "Techno-Futurist" }
};

const fieldQuadrantBaseMap = {
  "structured:quiet": { x: 34, y: 68 },
  "structured:bold": { x: 32, y: 34 },
  "distinctive:quiet": { x: 66, y: 68 },
  "distinctive:bold": { x: 70, y: 34 }
};

const fieldQuadrantOffsetsMap = {
  "structured:quiet": [
    { x: -12, y: 10 },
    { x: -6, y: -2 },
    { x: 2, y: 12 },
    { x: 8, y: -8 },
    { x: 12, y: 4 },
    { x: -14, y: -12 },
    { x: 10, y: 14 },
    { x: -2, y: -16 }
  ],
  "structured:bold": [
    { x: -10, y: -10 },
    { x: -2, y: 10 },
    { x: 8, y: -2 },
    { x: 12, y: 12 },
    { x: -14, y: 4 },
    { x: 4, y: -14 },
    { x: 16, y: -10 },
    { x: -6, y: 16 }
  ],
  "distinctive:quiet": [
    { x: -8, y: 12 },
    { x: 2, y: -4 },
    { x: 10, y: 10 },
    { x: 14, y: -8 },
    { x: -14, y: 0 },
    { x: 6, y: 16 },
    { x: -4, y: -14 },
    { x: 18, y: 2 }
  ],
  "distinctive:bold": [
    { x: -6, y: -12 },
    { x: 6, y: 8 },
    { x: 14, y: -2 },
    { x: -12, y: 10 },
    { x: 12, y: 14 },
    { x: -4, y: -16 },
    { x: 18, y: -10 },
    { x: -16, y: 2 }
  ]
};

const fieldTagBiasMap = {
  "minimal-black-white": { x: -10, y: 8 },
  "product-tool": { x: -8, y: -2 },
  "technology-future": { x: 12, y: -10 },
  "craft-natural": { x: 4, y: 12 },
  "magazine-publishing": { x: 2, y: 2 },
  "bold-personality": { x: 14, y: -2 }
};

function clampFieldCoordinate(value) {
  return Math.min(92, Math.max(8, value));
}

function styleFieldShortZh(item) {
  const label = item.nameZh || item.titleZh || item.title || "";
  return label.length > 7 ? `${label.slice(0, 7)}` : label;
}

function styleFieldShortEn(item) {
  const raw = item.titleEn || item.title || "";
  return raw
    .replace(
      /\b(Editorial|Interface|Catalog|Foundation|Network|Archive|Directory|Platform|Frontpage|Minimal|Narrative)\b/gi,
      ""
    )
    .replace(/\s{2,}/g, " ")
    .trim();
}

function fieldPointTooClose(candidate, usedPoints = []) {
  return usedPoints.some((point) => Math.abs(point.x - candidate.x) < 7 && Math.abs(point.y - candidate.y) < 7);
}

function buildStyleFieldMap(items = [], manualMap = {}) {
  const usedPoints = Object.values(manualMap).map((point) => ({ x: point.x, y: point.y }));
  const quadrantCounts = new Map();
  const map = { ...manualMap };

  for (const item of items) {
    if (map[item.id]) continue;

    const orderBucket = item.orderAxis === "distinctive" ? "distinctive" : "structured";
    const toneBucket = item.toneAxis === "bold" ? "bold" : "quiet";
    const key = `${orderBucket}:${toneBucket}`;
    const base = fieldQuadrantBaseMap[key] || { x: 50, y: 50 };
    const offsets = fieldQuadrantOffsetsMap[key] || [{ x: 0, y: 0 }];
    const count = quadrantCounts.get(key) || 0;
    quadrantCounts.set(key, count + 1);

    let biasX = 0;
    let biasY = 0;
    for (const tag of item.filterTags || []) {
      const bias = fieldTagBiasMap[tag];
      if (!bias) continue;
      biasX += bias.x;
      biasY += bias.y;
    }

    let selected = null;
    for (let attempt = 0; attempt < offsets.length * 2; attempt += 1) {
      const offset = offsets[(count + attempt) % offsets.length];
      const extraSpread = Math.floor((count + attempt) / offsets.length) * 4;
      const candidate = {
        x: clampFieldCoordinate(base.x + biasX * 0.5 + offset.x + (attempt % 2 === 0 ? extraSpread : -extraSpread)),
        y: clampFieldCoordinate(base.y + biasY * 0.5 + offset.y + (attempt % 2 === 0 ? -extraSpread : extraSpread))
      };

      if (!fieldPointTooClose(candidate, usedPoints)) {
        selected = candidate;
        break;
      }
    }

    const point = {
      ...(selected || { x: clampFieldCoordinate(base.x + biasX * 0.5), y: clampFieldCoordinate(base.y + biasY * 0.5) }),
      shortZh: styleFieldShortZh(item),
      shortEn: styleFieldShortEn(item)
    };
    usedPoints.push(point);
    map[item.id] = point;
  }

  return map;
}

const familyFieldMap = buildStyleFieldMap(styleFamilies, manualFamilyFieldMap);

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
    hook: "常见在工艺品牌、家居生活方式和纸本感更强的网站。",
    common: "今天更常出现在生活方式、工艺品牌和纸本感很强的页面里。"
  },
  "art-nouveau": {
    hook: "常见在时尚文化、电影专题和装饰感更强的品牌网站。",
    common: "它经常在时尚、电影、文化品牌里变成更柔和的曲线和装饰节奏。"
  },
  futurism: {
    hook: "适合硬件发布、游戏专题和速度感更强的科技页面。",
    common: "今天常见在硬件发布、游戏页面和高动势的科技视觉里。"
  },
  suprematism: {
    hook: "适合几何极简首页、海报感专题和强留白的品牌页。",
    common: "它更像很多几何抽象型排版系统的深层来源。"
  },
  constructivism: {
    hook: "适合品牌系统页、传播型专题和高效信息页。",
    common: "今天很多高效率信息页面、品牌系统页和几何构图都还在借它。"
  },
  dada: {
    hook: "更适合实验项目、拼贴创作页和反模板表达。",
    common: "它更适合做灵感来源，不太适合直接变成整站默认风格。"
  },
  "de-stijl": {
    hook: "适合模块化品牌页、色块系统和边界明确的首页。",
    common: "今天很多网格、色块和模块化系统都能看到它的影子。"
  },
  "bauhaus-functional-modernism": {
    hook: "适合产品官网、设计系统和功能优先的现代页面。",
    common: "产品站、设计系统站和很多现代主义网页语言都从这里长出来。"
  },
  "new-typography": {
    hook: "适合内容站、编辑型首页和强调排版清晰度的页面。",
    common: "很多你觉得高级又清楚的 editorial 页面，本质上都在借它。"
  },
  "art-deco-streamlined-luxury": {
    hook: "适合文化品牌、高级发布页和舞台感更强的首页。",
    common: "文化、时尚和高感知品牌页面，经常会借它的对称与节奏。"
  },
  "mid-century-modern": {
    hook: "适合生活方式品牌、温和现代的工作室页和不过冷的极简页面。",
    common: "它常出现在生活方式品牌、黑白工作室页和一些产品型极简页面里。"
  },
  "swiss-international-typography": {
    hook: "适合档案站、工作室网站、参考库和知识系统。",
    common: "设计工作室、参考库、知识站和很多黑白极简页面都与它关系很深。"
  },
  "brutalism-neo-brutalism": {
    hook: "适合反模板主页、强观点品牌和更直接的创作者站。",
    common: "它适合做反模板和强观点，但不适合默认所有内容都这样做。"
  },
  "pop-art": {
    hook: "适合潮流品牌、活动页和需要强识别的文化项目。",
    common: "更适合品牌表达和文化感，不太适合需要安静信任感的页面。"
  },
  minimalism: {
    hook: "适合极简作品集、高端品牌和安静克制的首页。",
    common: "今天很多你觉得‘黑白简洁但不无聊’的页面，核心都和它有关。"
  },
  "postmodern-memphis": {
    hook: "适合创作者主页、实验品牌和想打破模板感的发布页。",
    common: "它适合创作者、实验品牌和想要更有态度的页面。"
  },
  "cyberpunk-techno-futurism": {
    hook: "适合游戏、未来科技和沉浸式发布页。",
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
      hook: "常见在创作者站、品牌页和需要鲜明气质的内容网站。",
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
  const style = styleFamilyMap.get(id);
  return browseHref(style?.slug || id);
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

function browseHref(slug) {
  return sitePath("browse", slug);
}

function browseIndexHref() {
  return sitePath("browse");
}

function aboutHref() {
  return sitePath("about");
}

const githubHref = designSkillsRepoHref;

function styleSkillRepoHref(item) {
  return `${githubHref}/tree/main/styles/${item.slug}`;
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
  "technical platforms": { zh: "技术平台", en: "Technical Platforms" },
  "premium brands": { zh: "高级品牌", en: "Premium Brands" },
  "fashion storytelling": { zh: "时尚叙事", en: "Fashion Storytelling" },
  "hero-led launches": { zh: "首屏主导发布页", en: "Hero-Led Launches" },
  "identity systems": { zh: "识别系统", en: "Identity Systems" },
  "editorial indexes": { zh: "编辑型索引页", en: "Editorial Indexes" },
  "playful commerce": { zh: "趣味商业站", en: "Playful Commerce" },
  "template-breaking launches": { zh: "打破模板的发布页", en: "Template-Breaking Launches" },
  "creative tools": { zh: "创意工具", en: "Creative Tools" },
  "attitude-heavy homepages": { zh: "态度强的首页", en: "Attitude-Heavy Homepages" },
  "immersive AI pages": { zh: "沉浸式 AI 页面", en: "Immersive AI Pages" },
  "future-tech campaigns": { zh: "未来科技活动页", en: "Future-Tech Campaigns" }
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

function plainPhraseText(item) {
  const pill = normalizePill(item);
  return pill.zh || pill.en || "";
}

function renderPlainPhraseList(items = [], limit = items.length || 0) {
  return items
    .slice(0, limit || items.length)
    .map((item) => plainPhraseText(item))
    .filter(Boolean)
    .join(" · ");
}

function normalizeReferenceKey(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
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

  for (const reference of item.liveReferences || []) {
    pushCandidate(reference.screenshot, reference.alt, reference.label);
  }

  for (const sample of uniqueSamples(item.samples || [])) {
    pushCandidate(sample.screenshot, sample.alt, sample.label);
  }

  return candidates;
}

function pickPreferredOrUniqueVisual(item, preferredVisual = null, usedScreenshots = null) {
  const candidates = [];
  const seen = new Set();
  const pushCandidate = (entry) => {
    if (!entry?.screenshot || seen.has(entry.screenshot)) return;
    seen.add(entry.screenshot);
    candidates.push(entry);
  };

  pushCandidate(preferredVisual);
  for (const entry of visualCandidates(item)) pushCandidate(entry);

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

function pickUniqueVisual(item, usedScreenshots = null) {
  return pickPreferredOrUniqueVisual(item, null, usedScreenshots);
}

function buildVisualMap(items = [], { usedScreenshots = null, preferredMap = {} } = {}) {
  return new Map(
    items.map((item) => [item.id, pickPreferredOrUniqueVisual(item, preferredMap[item.id] || null, usedScreenshots)])
  );
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
      <a class="brand" href="/" aria-label="Webdesign Zondev home">
        <span class="brand-mark">Design</span>
        <strong class="brand-name">Zondev</strong>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="${escapeHtml(browseIndexHref())}">${escapeHtml(bilingualText("浏览", "Browse"))}</a>
        <a href="${escapeHtml(selectorHref())}">${escapeHtml(bilingualText("选型器", "Selector"))}</a>
        <a href="${escapeHtml(aboutHref())}">${escapeHtml(bilingualText("关于", "About"))}</a>
        <a href="${escapeHtml(githubHref)}">${escapeHtml("GitHub ↗")}</a>
      </nav>
      <span class="status-pill">atlas v1.0</span>
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
              "Webdesign Atlas：看图选风格，拿 Prompt 建站。",
              "Webdesign Atlas: choose by image, leave with a prompt."
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
      bilingualText("开始方式", "Entry Routes"),
      bilingualText("先选进入方式，再往下看细节", "Choose your way in before reading the history"),
      "第一次来这里，不要先读完整条时间线。先按网站类型、页面感觉或历史来源选一条最接近你的入口。"
    )}
    ${renderRouteCards()}
  </section>`;
}

function renderFieldPreviewPanel(item, visual = null) {
  if (!item) return "";
  const previewVisual = visual || pickUniqueVisual(item);
  const referenceLabel = item.coverLabel || previewVisual.label || item.nameZh || item.titleZh || item.title || "";
  return `<article class="field-preview-panel card-surface" data-field-preview aria-live="polite">
    <a ${linkAttrs(browseHref(item.slug), "field-preview-media")} data-field-preview-link>
      ${renderImageFrame(previewVisual.screenshot, previewVisual.alt || item.coverAlt || item.nameZh)}
    </a>
    <div class="field-preview-body">
      <p class="card-kicker">${escapeHtml(bilingualText("当前风格", "Current Style"))}</p>
      <h3 class="card-title" data-field-preview-title>${renderInlineEnglishTitle(item.nameZh, item.titleEn || item.title)}</h3>
      <p class="card-summary" data-field-preview-summary>${escapeHtml(item.summaryZh || item.summary || "")}</p>
      <p class="field-preview-reference" data-field-preview-reference>${escapeHtml(`代表参考：${referenceLabel}`)}</p>
      <p class="field-preview-fit" data-field-preview-fit>${escapeHtml(`适合做：${item.cardUses.slice(0, 3).join(" · ")}`)}</p>
      <a ${linkAttrs(browseHref(item.slug), "text-link")} data-field-preview-cta>${escapeHtml(
        bilingualText("查看这个风格", "Open this style")
      )}</a>
    </div>
  </article>`;
}

function renderFieldAtlas(options = {}) {
  const { compact = false, previewVisual = null, defaultStyleId = "" } = options;
  const plottedFamilies = styleFamilies
    .map((item) => ({ ...item, coords: familyFieldMap[item.id] }))
    .filter((item) => item.coords);
  const defaultItem = plottedFamilies.find((item) => item.id === defaultStyleId) || plottedFamilies[0] || null;

  return `<div class="field-atlas-shell${compact ? " field-atlas-shell--compact" : ""}" data-style-field-root>
    <div class="atlas-scroller${compact ? " atlas-scroller--compact" : ""}">
      <div class="field-atlas card-surface${compact ? " field-atlas--compact" : ""}" data-style-field>
        <div class="field-axis field-axis--x"></div>
        <div class="field-axis field-axis--y"></div>
        <div class="field-axis-label field-axis-label--left">${escapeHtml(bilingualText("系统与档案", "System + Archive"))}</div>
        <div class="field-axis-label field-axis-label--right">${escapeHtml(bilingualText("舞台与表现", "Stage + Expression"))}</div>
        <div class="field-axis-label field-axis-label--top">${escapeHtml(bilingualText("强烈张力", "Intense"))}</div>
        <div class="field-axis-label field-axis-label--bottom">${escapeHtml(bilingualText("安静克制", "Quiet"))}</div>
        ${plottedFamilies
          .map((item, index) => {
            const { x, y, shortZh, shortEn } = item.coords;
            return `<a ${linkAttrs(browseHref(item.slug), "field-point")} data-field-point data-field-point-title-zh="${escapeHtml(
              item.nameZh
            )}" data-field-point-title-en="${escapeHtml(item.titleEn || item.title || "")}" data-field-point-summary="${escapeHtml(
              item.summaryZh || item.summary || ""
            )}" data-field-point-cover="${escapeHtml(item.cover || "")}" data-field-point-alt="${escapeHtml(
              item.coverAlt || item.nameZh
            )}" data-field-point-reference="${escapeHtml(
              item.coverLabel || item.liveReferences?.[0]?.label || item.nameZh || item.titleZh || item.title || ""
            )}" data-field-point-fit="${escapeHtml(item.cardUses.slice(0, 3).join(" · "))}" data-field-point-href="${escapeHtml(
              browseHref(item.slug)
            )}" aria-label="${escapeHtml(`${item.nameZh}${item.titleEn ? ` (${item.titleEn})` : ""}，适合做：${item.cardUses
              .slice(0, 3)
              .join(" · ")}`)}" ${item.id === defaultItem?.id ? 'data-field-default="true"' : ""} style="left:${x}%; top:${y}%;">
              <span class="field-point-dot"></span>
              <span class="field-point-label">${renderBilingualStack(shortZh || item.titleZh, shortEn || item.titleEn || item.title, "field-label-stack")}</span>
            </a>`;
          })
          .join("")}
      </div>
    </div>
    ${renderFieldPreviewPanel(defaultItem, previewVisual)}
  </div>`;
}

function renderHomeOverviewHero() {
  return `<section class="home-hero section" id="top">
    <div class="home-hero-inner">
      <div class="home-hero-copy">
        <p class="eyebrow">${escapeHtml(bilingualText("AI 建站风格选型", "Style-To-Site Atlas"))}</p>
        <h1 class="hero-title home-hero-title">
          <span class="home-hero-title-zh">
            <span>先选你要做的网站</span>
            <span>再决定风格和结构</span>
          </span>
          <span class="home-hero-title-en">Choose the site first, then decide the style and structure</span>
        </h1>
        <p class="hero-support">给用 AI 做站、但不知道该做成什么样的人。先选网站类型，再拿到页面感觉、页面组织、真实参考和可直接给 AI 的 prompt。</p>
      </div>
      <div class="home-hero-deck">
        <p class="home-hero-stats">${escapeHtml(
          `${useCases.length}类建站场景 · ${families.length}种页面感觉 · ${movements.length}条历史来源`
        )}</p>
        <div class="hero-route-buttons">
          <a ${linkAttrs(selectorHref(), "hero-route-button hero-route-button--primary")}>${escapeHtml(
            bilingualText("直接开始选型", "Start the Selector")
          )}</a>
          <a ${linkAttrs("/use-cases", "hero-route-button")}>${escapeHtml(
            bilingualText("先看网站类型", "Browse Use Cases")
          )}</a>
          <a ${linkAttrs("/families", "hero-route-button")}>${escapeHtml(
            bilingualText("再看页面感觉", "Browse Web Families")
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
  "arts-and-crafts": "工艺品牌与纸本感网站",
  "art-nouveau": "时尚文化与装饰线条网站",
  futurism: "硬件发布与速度感科技页",
  suprematism: "几何极简与海报感首页",
  constructivism: "品牌系统与高效信息页",
  dada: "实验项目与拼贴感创作页",
  "de-stijl": "模块化品牌页与色块系统",
  "bauhaus-functional-modernism": "产品官网与设计系统",
  "new-typography": "内容站与高可读排版",
  "art-deco-streamlined-luxury": "文化品牌与高级发布页",
  "mid-century-modern": "生活方式与温和现代品牌",
  "swiss-international-typography": "档案站与工作室网站",
  "brutalism-neo-brutalism": "反模板主页与强态度品牌",
  "pop-art": "潮流品牌与高识别活动页",
  minimalism: "极简作品集与高端品牌",
  "postmodern-memphis": "创作者主页与反模板发布",
  "cyberpunk-techno-futurism": "游戏硬件与未来科技页"
};

function movementCompactBlurb(item) {
  return item.summary || item.whyItMatters || movementCompactBlurbMap[item.id] || item.principles?.[0] || item.origin || "";
}

function movementVisualCueLine(item) {
  return (item.principles || []).slice(0, 3).join(" · ");
}

function linkedStyleLabel(item) {
  const browseStyle = styleFamilyMap.get(item.id);
  return browseStyle?.nameZh || browseStyle?.titleZh || item.styleNameZh || item.nameZh || item.titleZh || item.title || "";
}

function linkedStyleHref(item) {
  const browseStyle = styleFamilyMap.get(item.id);
  return browseStyle ? browseHref(browseStyle.slug) : familyHref(item.id);
}

function movementWebUseLine(item, relatedFamilies = []) {
  const bestForLine = renderPlainPhraseList(item.bestFor || [], 3);
  if (bestForLine) return bestForLine;
  return relatedFamilies
    .slice(0, 3)
    .map((entry) => linkedStyleLabel(entry))
    .filter(Boolean)
    .join(" · ");
}

function renderTimelineFamilyTags(items = []) {
  if (!items.length) return "";
  return `<div class="timeline-node-tags">
    ${items
      .slice(0, 2)
      .map(
        (item) =>
          `<a ${linkAttrs(linkedStyleHref(item), "timeline-node-tag")}>${escapeHtml(`→ ${linkedStyleLabel(item)}`)}</a>`
      )
      .join("")}
  </div>`;
}

function renderTimelineSignalPills(items = []) {
  if (!items.length) return "";
  return `<div class="timeline-node-signals">
    ${items
      .slice(0, 4)
      .map((item) => `<span class="timeline-node-signal">${escapeHtml(item)}</span>`)
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

function renderTimelineStreamItem(item, index, options = {}) {
  const { expanded = false } = options;
  const leadVisual = item.primaryVisual || fallbackVisual(item);
  const relatedFamilies = item.familyIds.map((id) => familyMap.get(id)).filter(Boolean);
  const years = movementYears(item);
  const summary = movementCompactBlurb(item);
  const visualCues = movementVisualCueLine(item);
  const webUse = movementWebUseLine(item, relatedFamilies);
  const detailSummary = item.summary || "";
  const impact = item.whyItMatters || "";
  const signals = item.principles || item.signatures || [];

  return `<article class="timeline-node${expanded ? " timeline-node--expanded" : ""}" id="${escapeHtml(
    movementAnchorId(item.id)
  )}" style="--stagger:${escapeHtml(`${(index % 4) * 50}ms`)};">
    <div class="timeline-node-year">
      <span class="timeline-node-year-number">${escapeHtml(String(years.start))}</span>
      <span class="timeline-node-year-range">${escapeHtml(String(years.end))}</span>
    </div>
    <div class="timeline-node-axis" aria-hidden="true">
      <span class="timeline-node-dot"></span>
    </div>
    <div class="timeline-node-card card-surface">
      <a ${linkAttrs(movementHref(item.id), "timeline-node-media")}>
        ${
          leadVisual?.screenshot
            ? `<div class="timeline-node-image-wrap">
                ${renderImageFrame(leadVisual.screenshot, leadVisual.alt || displayTitle(item), "timeline-node-image")}
              </div>`
            : `<div class="timeline-node-placeholder"></div>`
        }
      </a>
      <div class="timeline-node-copy">
        <div class="timeline-node-head">
          <p class="timeline-node-titleline">
            <span class="timeline-node-title-zh">${escapeHtml(item.titleZh)}</span>
            <span class="timeline-node-title-en">${escapeHtml(item.titleEn || item.title)}</span>
          </p>
          <a ${linkAttrs(movementHref(item.id), "timeline-node-open")}>${escapeHtml(
            bilingualText("查看详情", "Open")
          )}</a>
        </div>
        <p class="timeline-node-summary">${escapeHtml(summary)}</p>
        ${
          visualCues
            ? `<p class="timeline-node-line"><span class="timeline-node-label">${escapeHtml(
                bilingualText("视觉特点", "Visual Traits")
              )}</span>${escapeHtml(visualCues)}</p>`
            : ""
        }
        ${
          webUse
            ? `<p class="timeline-node-line"><span class="timeline-node-label">${escapeHtml(
                bilingualText("今天常见于", "Common Today")
              )}</span>${escapeHtml(webUse)}</p>`
            : ""
        }
        ${
          expanded && detailSummary
            ? `<p class="timeline-node-detail">${escapeHtml(detailSummary)}</p>`
            : ""
        }
        ${
          expanded && impact
            ? `<p class="timeline-node-line timeline-node-line--stacked"><span class="timeline-node-label">${escapeHtml(
                bilingualText("网页影响", "Web Influence")
              )}</span>${escapeHtml(impact)}</p>`
            : ""
        }
        ${expanded ? renderTimelineSignalPills(signals) : ""}
        ${renderTimelineFamilyTags(relatedFamilies)}
      </div>
    </div>
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
    heroMode = false,
    expandedCards = false
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
    <div class="timeline-stream${expandedCards ? " timeline-stream--expanded" : ""}" data-timeline-stream aria-label="${escapeHtml(
      bilingualText("历史流派", "Historical Timeline")
    )}">
      ${ordered.map((item, index) => renderTimelineStreamItem(item, index, { expanded: expandedCards })).join("")}
    </div>
  </section>`;
}

function renderFamilyCoordinateSection(options = {}) {
  return `<section class="section" id="style-field">
    ${renderSectionHead(
      bilingualText("页面感觉坐标场", "Style Coordinate Field"),
      bilingualText("先用页面感觉缩小范围", "Start by narrowing the page feel"),
      "先大致看这张图谱。桌面端把鼠标停在任一点上，下面会立刻换成对应风格的预览图、名字和适用场景。"
    )}
    ${renderFieldAtlas(options)}
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

  if (family.liveReferences?.length) {
    return family.liveReferences.map((entry) => ({
      label: entry.label,
      href: entry.href,
      screenshot: entry.screenshot,
      alt: entry.alt || entry.label,
      note: entry.note || ""
    }));
  }

  const visuals = uniqueSamples(family.samples || []).slice(0, 4);
  const references = family.references || [];
  const normalizedReferences = references.map((reference) => ({
    ...reference,
    normalizedLabel: normalizeReferenceKey(reference.label || "")
  }));

  return visuals.map((sample, index) => {
    const sampleKey = normalizeReferenceKey(sample.label || "");
    const matchedReference =
      normalizedReferences.find((reference) => sampleKey && reference.normalizedLabel === sampleKey) ||
      normalizedReferences.find((reference) => sampleKey && reference.normalizedLabel.includes(sampleKey)) ||
      normalizedReferences.find((reference) => sampleKey && sampleKey.includes(reference.normalizedLabel)) ||
      references[index] ||
      null;

    return {
      label: sample.label || matchedReference?.label || displayTitle(family),
      href: sample.href || matchedReference?.href || familyHref(family.id),
      note: sample.note || matchedReference?.note || "",
      screenshot: sample.screenshot,
      alt: sample.alt || sample.label || matchedReference?.label || displayTitle(family)
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
        <p class="card-kicker">${escapeHtml(bilingualText("推荐建站方案", "Recommended Packet"))}</p>
        <h2 class="section-title">${renderBilingualStack(packet.useCase.titleZh, packet.useCase.titleEn || packet.useCase.title)}</h2>
        <p class="section-summary">${escapeHtml(packet.useCase.summary)}</p>
        <div class="selector-summary-grid">
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("你的内容大概长这样", "Content Shape"))}</h4>
            <p>${escapeHtml(packet.useCase.contentShape)}</p>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("你想让用户先感受到", "User Outcome"))}</h4>
            <p>${escapeHtml(packet.useCase.userGoal)}</p>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("第一眼气质", "First Impression"))}</h4>
            <p>${escapeHtml(selectorToneLabel(packet.state.tone))}</p>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("交互方式", "Interaction Mode"))}</h4>
            <p>${escapeHtml(selectorModeLabel(packet.state.mode))}</p>
          </div>
        </div>
      </div>
    </article>
    <div class="selector-choice-grid">
      ${renderSelectorChoiceCard({
        kickerZh: "历史线索",
        kickerEn: "Background Lineage",
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
        kickerZh: "页面感觉",
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
        kickerZh: "页面组织",
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
          <p class="card-kicker">${escapeHtml(bilingualText("直接借这几条", "Copy These Traits"))}</p>
          ${renderList(packet.borrow)}
        </div>
      </article>
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("别做成这样", "Avoid These Moves"))}</p>
          ${renderList(packet.avoid)}
        </div>
      </article>
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("如果结果不对，改这里", "If This Feels Wrong"))}</p>
          <div class="selector-alternative-stack">
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("换一种页面感觉", "Try Another Page Feeling"))}</h4>
              ${alternativeFamilies.length ? renderLinkedPills(alternativeFamilies, familyMap, familyHref) : `<p>${escapeHtml(bilingualText("当前已是最直接匹配", "Current match is already the primary fit"))}</p>`}
            </div>
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("换一种页面组织", "Try Another Structure"))}</h4>
              ${alternativeStructures.length ? renderLinkedPills(alternativeStructures, structureMap, structureHref) : `<p>${escapeHtml(bilingualText("当前结构已是最直接匹配", "Current structure is already the primary fit"))}</p>`}
            </div>
          </div>
        </div>
      </article>
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("接下来这样做", "Next Steps"))}</p>
          ${renderList([
            "先打开 2 到 3 个真实参考站，确认图像大小、导航和留白是不是你要的感觉。",
            "复制下面的 Prompt 包给 AI，先让它出首页草图，不要一开始就做全站。",
            "如果结果太花、太冷或太像模板，再回来切换页面感觉或页面组织。"
          ])}
        </div>
      </article>
    </div>
    <section class="selector-reference-section">
      ${renderSectionHead(
        bilingualText("先看这几个真实网站", "Open These Real Sites First"),
        bilingualText("直接打开真实站点", "Open the closest real websites"),
        ""
      )}
      <div class="selector-reference-grid">
        ${packet.references.map((item) => renderSelectorReferenceCard(item)).join("")}
      </div>
    </section>
    <article class="selector-prompt-panel detail-card card-surface" data-copy-container>
      <div class="card-body">
        <p class="card-kicker">${escapeHtml(bilingualText("交给 AI 的 Prompt", "AI Prompt"))}</p>
        <h3 class="card-title">${escapeHtml(bilingualText("把下面这段直接交给 AI", "Paste This Into Your AI Builder"))}</h3>
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
          bilingualText("这类网页常从哪些历史流派长出来", "The earlier lineages behind this kind of site"),
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
              <h4>${escapeHtml(bilingualText("适合做什么网站", "Good For"))}</h4>
              ${renderStaticPills((item.bestFor || []).slice(0, 3))}
            </div>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("第一眼通常是什么感觉", "What It Usually Feels Like"))}</h4>
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
          bilingualText("拿它做什么网站", "How It Translates Into Sites"),
          bilingualText("先看适合做什么站，再看页面常见做法和最容易做坏什么", "Start with the site fit, then see the usual moves and common mistakes"),
          ""
        )}
        <div class="detail-section-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("适合", "Best For"))}</p>${renderStaticPills(
            item.bestFor || []
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("页面里常见做法", "Common Page Moves"))}</p>${renderList(
            item.principles
          )}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("误用提醒", "Watchouts"))}</p>${renderList(
            item.watchouts
          )}</div></article>
        </div>
      </section>`,
      `<section class="section">
        ${renderSectionHead(
          bilingualText("下一步去看哪类网站", "What to Open Next"),
          bilingualText("先去看它今天最常落成的页面类型", "Open the current site families that best express it"),
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
          bilingualText("先这样做", "Start Here"),
          bilingualText("从任务反推页面感觉和页面组织", "Work backward from the job to page feeling and structure"),
          ""
        )}
        <div class="detail-section-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("页面里会出现什么", "What Shows Up On The Page"))}</p><p>${escapeHtml(
            item.contentShape
          )}</p></div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("第一眼要让用户明白什么", "What Users Should Get First"))}</p><p>${escapeHtml(
            item.userGoal
          )}</p></div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(bilingualText("这样安排的原因", "Why This Arrangement Works"))}</p><p>${escapeHtml(
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

function renderInlineEnglishTitle(zh, en, className = "") {
  return `<span class="style-inline-title${className ? ` ${escapeHtml(className)}` : ""}">
    <span class="style-inline-title-zh">${escapeHtml(zh || en || "")}</span>
    ${en ? `<span class="style-inline-title-en">(${escapeHtml(en)})</span>` : ""}
  </span>`;
}

function relatedStyleUseCases(item) {
  return useCases.filter(
    (entry) => entry.primaryFamilyId === item.id || (entry.secondaryFamilyIds || []).includes(item.id)
  );
}

function relatedStyleStructures(item) {
  return (item.structureIds || []).map((id) => structureMap.get(id)).filter(Boolean);
}

function relatedStyleMovements(item) {
  return (item.movementIds || []).map((id) => movementMap.get(id)).filter(Boolean);
}

function stylePrimaryReference(item) {
  return selectorReferenceEntries(item)[0] || item.references?.[0] || null;
}

function stylePromptPacket(item) {
  const spec = styleSkillSpecMap[item.id] || {
    summary: "",
    palette: [],
    typography: [],
    layout: [],
    imagery: [],
    motion: [],
    avoid: []
  };
  const structuresList = relatedStyleStructures(item)
    .map((entry) => displayTitle(entry))
    .join(" / ");
  const movementsList = relatedStyleMovements(item)
    .map((entry) => displayTitle(entry))
    .join(" / ");
  const referencePacket = selectorReferenceEntries(item)
    .slice(0, 4)
    .map((entry) => `${entry.label}: ${entry.href}`)
    .join(" / ");

  return `请参考${item.nameZh}（${item.titleEn || item.title}）风格建站：
视觉特征：${item.lookLike.join(" / ")}
适合场景：${item.cardUses.join(" / ")}
不适合：${item.notFor.join(" / ")}
推荐页面组织：${structuresList || bilingualText("待补充", "Pending")}
历史来源：${movementsList || bilingualText("待补充", "Pending")}
参考网站：${referencePacket || bilingualText("待补充", "Pending")}
配色系统：${(spec.palette || []).join(" / ") || bilingualText("保持克制、统一、层级清楚", "Keep the palette restrained and legible")}
排版系统：${(spec.typography || []).join(" / ") || bilingualText("建立清楚标题、正文、标签层级", "Build a clear title/body/meta hierarchy")}
版式规则：${(spec.layout || []).join(" / ") || bilingualText("让布局服务内容和信息结构", "Let layout serve the content job")}
图片处理：${(spec.imagery || []).join(" / ") || bilingualText("统一图片比例和展示规则", "Keep image ratios and treatment consistent")}
风格要求：${item.prompt}`;
}

function styleSkillCueLine(item) {
  const spec = item.skillSpec || styleSkillSpecMap[item.id] || {};
  const cues = dedupeStrings([
    ...(spec.layout || []).slice(0, 1),
    ...(spec.typography || []).slice(0, 1),
    ...(spec.palette || []).slice(0, 1)
  ]).slice(0, 2);
  return cues.join(" · ");
}

function styleSkillDownloadPath(item) {
  return sitePath("downloads", `${item.slug}.md`);
}

function renderStyleSkillMarkdown(item) {
  const spec = styleSkillSpecMap[item.id] || {
    useWhen: [],
    palette: [],
    typography: [],
    layout: [],
    imagery: [],
    motion: [],
    avoid: []
  };
  const references = selectorReferenceEntries(item);

  return `---
name: ${item.slug}
description: "${item.nameZh} (${item.titleEn || item.title}) style skill for AI website building."
---

# ${item.nameZh} (${item.titleEn || item.title})

## 适用场景 / Use When

${(spec.useWhen || item.cardUses).join(" / ") || "适合需要明确风格锚点、参考站和可直接复用 prompt 的建站任务。"}

## 适合做 / Best For

- ${item.cardUses.join("\n- ")}

## 不适合做 / Not For

- ${item.notFor.join("\n- ")}

## 长这样 / Visual Traits

- ${item.lookLike.join("\n- ")}

## 配色系统 / Color System

- ${(spec.palette || []).join("\n- ") || "Keep the palette restrained and legible."}

## 排版系统 / Typography

- ${(spec.typography || []).join("\n- ") || "Build a clear title, body, and metadata hierarchy."}

## 版式规则 / Layout Rules

- ${(spec.layout || []).join("\n- ") || "Use a layout system that matches the content job."}

## 图片处理 / Image Treatment

- ${(spec.imagery || []).join("\n- ") || "Keep screenshots and images consistent in ratio and crop."}

## 动效节奏 / Motion

- ${(spec.motion || []).join("\n- ") || "Use restrained interaction feedback."}

## 推荐结构 / Recommended Structures

- ${relatedStyleStructures(item)
  .map((entry) => displayTitle(entry))
  .join("\n- ") || "Pending"}

## 历史来源 / Historical Roots

- ${relatedStyleMovements(item)
  .map((entry) => displayTitle(entry))
  .join("\n- ") || "Pending"}

## 参考网站 / Reference Sites

- ${references.map((entry) => `${entry.label}: ${entry.href}`).join("\n- ") || "Pending"}

## 注意避坑 / Avoid

- ${(spec.avoid || item.notFor).join("\n- ") || "Pending"}

## Prompt DNA

\`\`\`text
${stylePromptPacket(item)}
\`\`\`
`;
}

function styleCardSearchText(item) {
  return [
    item.nameZh,
    item.titleEn || item.title,
    item.coverLabel || "",
    item.summaryZh || item.summary || "",
    ...(item.cardUses || []),
    ...(item.lookLike || []),
    ...(item.filterTags || [])
  ]
    .join(" ")
    .toLowerCase();
}

function renderBrowseStyleCard(item, options = {}) {
  const visual = options.visual || pickUniqueVisual(item);
  const skillCue = styleSkillCueLine(item);
  return `<article class="style-card card-surface" data-style-card data-style-tags="${escapeHtml(
    item.filterTags.join(" ")
  )}" data-style-search="${escapeHtml(styleCardSearchText(item))}">
    <a ${linkAttrs(browseHref(item.slug), "style-card-media")}>
      ${renderImageFrame(visual.screenshot, visual.alt || item.coverAlt || item.nameZh)}
    </a>
    <div class="style-card-body">
      <h3 class="style-card-title">${renderInlineEnglishTitle(item.nameZh, item.titleEn || item.title)}</h3>
      <p class="style-card-reference">${escapeHtml(`主参考：${visual.label || item.coverLabel || item.nameZh}`)}</p>
      <p class="style-card-fit">${escapeHtml(`适合做：${item.cardUses.slice(0, 3).join(" · ")}`)}</p>
      ${skillCue ? `<p class="style-card-skill">${escapeHtml(`对应 Skill：${skillCue}`)}</p>` : ""}
    </div>
  </article>`;
}

function renderBrowseControls({ includeSearch = false, includeViewToggle = false, actionHref = "", actionLabel = "" } = {}) {
  return `<div class="browse-toolbar">
    <div class="browse-filters" role="tablist" aria-label="${escapeHtml(bilingualText("风格筛选", "Style filters"))}">
      ${browseFilterOptions
        .map(
          (item, index) =>
            `<button class="browse-filter${index === 0 ? " is-active" : ""}" type="button" data-browse-filter="${escapeHtml(
              item.id
            )}">${escapeHtml(item.labelZh)}</button>`
        )
        .join("")}
    </div>
    <div class="browse-toolbar-side">
      ${
        includeSearch
          ? `<label class="browse-search">
              <span class="sr-only">${escapeHtml(bilingualText("搜索风格", "Search styles"))}</span>
              <input type="search" placeholder="${escapeHtml(
                bilingualText("搜索风格名、场景、关键词", "Search styles, scenes, keywords")
              )}" data-browse-search />
            </label>`
          : ""
      }
      ${
        includeViewToggle
          ? `<div class="browse-view-toggle">
              <button class="browse-view-button is-active" type="button" data-browse-view="grid">${escapeHtml(
                bilingualText("卡片", "Grid")
              )}</button>
              <button class="browse-view-button" type="button" data-browse-view="list">${escapeHtml(
                bilingualText("列表", "List")
              )}</button>
            </div>`
          : ""
      }
      ${actionHref ? `<a ${linkAttrs(actionHref, "text-link")}>${escapeHtml(actionLabel)}</a>` : ""}
    </div>
  </div>`;
}

function renderStyleGallerySection({
  sectionId = "style-gallery",
  title = bilingualText("浏览风格", "Browse Styles"),
  summary = "",
  includeSearch = false,
  includeViewToggle = false,
  actionHref = "",
  actionLabel = "",
  stylesList = styleFamilies,
  visualMap = null,
  preferredMap = {},
  usedScreenshots = null
} = {}) {
  const resolvedVisuals = new Map();
  for (const item of stylesList) {
    resolvedVisuals.set(
      item.id,
      pickPreferredOrUniqueVisual(item, preferredMap[item.id] || visualMap?.get(item.id) || null, usedScreenshots)
    );
  }

  return `<section class="section style-gallery-section" id="${escapeHtml(sectionId)}" data-browse-root>
    ${renderSectionHead(
      bilingualText("浏览风格", "Browse"),
      title,
      summary,
      actionHref ? `<a ${linkAttrs(actionHref, "text-link")}>${escapeHtml(actionLabel)}</a>` : ""
    )}
    ${renderBrowseControls({ includeSearch, includeViewToggle, actionHref: "", actionLabel: "" })}
    <div class="style-card-grid" data-browse-grid>
      ${stylesList.map((item) => renderBrowseStyleCard(item, { visual: resolvedVisuals.get(item.id) || null })).join("")}
    </div>
    <p class="browse-empty" data-browse-empty hidden>${escapeHtml(
      bilingualText("没有找到匹配的风格，换个筛选或关键词试试。", "No styles matched. Try another filter or search.")
    )}</p>
  </section>`;
}

function renderLandingHero(options = {}) {
  const { visualMap = null, heroStyleIds = [] } = options;
  const preferredIds = heroStyleIds.length
    ? heroStyleIds
    : [
        "swiss-typographic-grid",
        "architecture-space-minimal",
        "bento-product-launch",
        "creative-media-editorial",
        "hospitality-scene-editorial",
        "neon-techno-futurist-interface",
        "showcase-discovery-index",
        "networked-visual-board"
      ];
  const heroStyles = preferredIds.map((id) => styleFamilyMap.get(id)).filter(Boolean);
  const heroVisualMap = {
    "swiss-typographic-grid": visualAsset("pentagram.png", "Pentagram", "Pentagram homepage"),
    "architecture-space-minimal": visualAsset("snohetta.png", "Snohetta", "Snohetta homepage"),
    "bento-product-launch": visualAsset("bolt-new.png", "Bolt", "Bolt homepage"),
    "creative-media-editorial": visualAsset("newyorker.png", "The New Yorker", "The New Yorker homepage"),
    "hospitality-scene-editorial": visualAsset("ace-hotel.png", "Ace Hotel", "Ace Hotel homepage"),
    "neon-techno-futurist-interface": visualAsset("cyberpunk-net.png", "Cyberpunk", "Cyberpunk homepage"),
    "showcase-discovery-index": visualAsset("siteinspire.png", "SiteInspire", "SiteInspire categories"),
    "networked-visual-board": visualAsset("behance.png", "Behance", "Behance homepage")
  };
  const heroCards = heroStyles.map((item) => ({
    item,
    visual: visualMap?.get(item.id) || heroVisualMap[item.id] || fallbackVisual(item)
  }));

  return `<section class="landing-hero section" id="top">
    <div class="landing-hero-inner">
      <div class="landing-hero-copy">
        <p class="landing-kicker">DESIGN ATLAS — AI 建站风格参考库</p>
        <h1 class="landing-title">
          <span>不知道网站要做成什么样？</span>
          <span>先看图，再开始。</span>
        </h1>
        <p class="landing-flow-lead">${escapeHtml("选风格 → 拿 Prompt → 直接建站")}</p>
        <div class="landing-flow-strip" aria-label="${escapeHtml(bilingualText("使用流程", "Workflow"))}">
          <span class="landing-flow-step">01 选风格</span>
          <span class="landing-flow-step">02 拿 Prompt</span>
          <span class="landing-flow-step">03 给 AI 建站</span>
        </div>
        <div class="landing-copy">
          <p>${escapeHtml(`${movements.length} 种历史流派 · ${styleFamilies.length} 种网页风格 · 每种风格配 AI Prompt`)}</p>
          <p>${escapeHtml("先看真实页面长什么样，再决定适合你的方向；不需要先懂设计史，也不用先会写风格提示词。")}</p>
        </div>
        <div class="hero-actions landing-actions">
          <a ${linkAttrs(selectorHref(), "button")}>${escapeHtml("开始选型 →")}</a>
        </div>
        <p class="landing-inline-links">
          <a ${linkAttrs(browseIndexHref())}>${escapeHtml(bilingualText("直接浏览风格", "Browse styles"))}</a>
          <span>·</span>
          <a ${linkAttrs(aboutHref())}>${escapeHtml(bilingualText("查看项目说明", "About"))}</a>
          <span>·</span>
          <a ${linkAttrs("/movements")}>${escapeHtml(bilingualText("看完整流派时间轴", "Open timeline"))}</a>
        </p>
      </div>
      <div class="landing-preview-shell card-surface">
        <div class="landing-preview-head">
          <p class="eyebrow">${escapeHtml(bilingualText("风格预览", "Style Preview"))}</p>
          <p class="landing-preview-note">${escapeHtml("先扫一眼这些方向，再往下筛。")}</p>
        </div>
        <div class="landing-preview-rail">
          ${heroCards
            .map(
              ({ item, visual }) => `<a ${linkAttrs(browseHref(item.slug), "landing-preview-card")}>
                <span class="landing-preview-media">
                  ${renderImageFrame(visual?.screenshot || item.cover, visual?.alt || item.coverAlt || item.nameZh)}
                </span>
                <span class="landing-preview-copy">
                  <span class="landing-preview-title">${renderInlineEnglishTitle(item.nameZh, item.titleEn || item.title)}</span>
                  <span class="landing-preview-meta">${escapeHtml(`适合做：${item.cardUses.slice(0, 2).join(" · ")}`)}</span>
                </span>
              </a>`
            )
            .join("")}
        </div>
      </div>
    </div>
  </section>`;
}

function renderStyleReferenceRail(item) {
  const references = selectorReferenceEntries(item)
    .filter((entry) => entry.screenshot && entry.screenshot !== item.cover)
    .slice(0, 4);

  if (!references.length) return "";

  return `<section class="section">
    ${renderSectionHead(
      bilingualText("真实网站参考", "Real References"),
      bilingualText("先看这些真实网站", "Open these real sites first"),
      ""
    )}
    <div class="reference-rail">
      ${references
        .map(
          (entry) => `<article class="reference-rail-card card-surface">
            <a ${linkAttrs(entry.href, "reference-rail-media")}>
              ${renderImageFrame(entry.screenshot, entry.alt || entry.label)}
            </a>
            <div class="card-body">
              <p class="card-kicker">${escapeHtml(bilingualText("代表网站", "Reference"))}</p>
              <h3 class="card-title">${escapeHtml(entry.label)}</h3>
              ${entry.note ? `<p class="card-summary">${escapeHtml(entry.note)}</p>` : ""}
              <a ${linkAttrs(entry.href, "text-link")}>${escapeHtml(bilingualText("打开网站", "Open Site"))}</a>
            </div>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function renderStyleSkillSpecSection(item) {
  const spec = styleSkillSpecMap[item.id] || {};
  const sections = [
    { label: bilingualText("配色系统", "Color System"), items: spec.palette || [] },
    { label: bilingualText("排版系统", "Typography"), items: spec.typography || [] },
    { label: bilingualText("版式规则", "Layout Rules"), items: spec.layout || [] },
    { label: bilingualText("图片处理", "Image Treatment"), items: spec.imagery || [] },
    { label: bilingualText("交互节奏", "Motion"), items: spec.motion || [] }
  ].filter((entry) => entry.items.length);

  if (!sections.length) return "";

  return `<section class="section">
    ${renderSectionHead(
      bilingualText("Skill 包含什么", "What The Skill Controls"),
      bilingualText("截图、排版和规则来自同一套风格包", "The screenshots, layout, and rules come from the same skill packet"),
      ""
    )}
    <div class="style-skill-grid">
      ${sections
        .map(
          (entry) => `<article class="detail-card card-surface">
            <div class="card-body">
              <p class="card-kicker">${escapeHtml(entry.label)}</p>
              ${renderList(entry.items)}
            </div>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function renderStyleHistoryFold(item) {
  const origins = relatedStyleMovements(item);
  if (!origins.length) return "";

  return `<section class="section">
    <details class="history-fold card-surface">
      <summary>${escapeHtml(bilingualText("历史来源", "Historical Roots"))}</summary>
      <div class="history-fold-body">
        <p class="section-summary">${escapeHtml(
          bilingualText("这部分放在最后看，用来补背景，而不是先决定风格。", "Use this section to add background after the direction is already clear.")
        )}</p>
        <div class="history-origin-list">
          ${origins
            .map(
              (origin) => `<article class="history-origin-item">
                <div class="history-origin-year">${escapeHtml(origin.era || "")}</div>
                <div class="history-origin-copy">
                  <h3>${renderInlineEnglishTitle(origin.titleZh, origin.titleEn || origin.title)}</h3>
                  <p>${escapeHtml(origin.summary || origin.whyItMatters || "")}</p>
                </div>
              </article>`
            )
            .join("")}
        </div>
      </div>
    </details>
  </section>`;
}

function renderBrowseStyleDetail(item) {
  const primaryReference = stylePrimaryReference(item);
  const promptPacket = stylePromptPacket(item);

  return layout({
    title: `${item.nameZh} · ${siteMeta.title}`,
    description: item.summaryZh || item.summary,
    pathname: browseHref(item.slug),
    pageClass: "detail-page browse-style-detail-page",
    body: [
      `<section class="style-detail-hero section">
        <div class="style-detail-topline">
          ${renderBackLink(browseIndexHref(), bilingualText("返回浏览", "Back to Browse"))}
          <div class="style-detail-actions">
            <button class="copy-button" type="button" data-copy-target="${escapeHtml(`style-prompt-${item.slug}`)}">${escapeHtml(
              bilingualText("复制 Prompt", "Copy Prompt")
            )}</button>
            <a ${linkAttrs(styleSkillDownloadPath(item), "ghost-button")} download>${escapeHtml(
              bilingualText("下载 .md Skill", "Download .md Skill")
            )}</a>
            <a ${linkAttrs(styleSkillRepoHref(item), "ghost-button")}>${escapeHtml(
              bilingualText("GitHub Skill", "GitHub Skill")
            )}</a>
          </div>
        </div>
        <div class="style-detail-head">
          <div class="style-detail-head-main">
            <h1 class="detail-title">${renderInlineEnglishTitle(item.nameZh, item.titleEn || item.title, "detail-inline-title")}</h1>
            ${item.summaryZh || item.summary ? `<p class="detail-summary">${escapeHtml(item.summaryZh || item.summary)}</p>` : ""}
            <div class="pill-row">${renderStaticPills(item.cardUses.slice(0, 3))}</div>
          </div>
        </div>
        <article class="style-detail-stage card-surface">
          <a ${linkAttrs(primaryReference?.href || "#", "style-detail-stage-media")}>
            ${renderImageFrame(item.cover, item.coverAlt || item.nameZh)}
          </a>
          <div class="style-detail-stage-copy">
            <p class="card-kicker">${escapeHtml(bilingualText("主参考", "Primary Reference"))}</p>
            <h2 class="card-title">${escapeHtml(primaryReference?.label || item.nameZh)}</h2>
            <p class="card-summary">${escapeHtml(primaryReference?.note || item.summaryZh || item.summary || "")}</p>
            ${primaryReference?.href ? `<a ${linkAttrs(primaryReference.href, "text-link")}>${escapeHtml(bilingualText("打开参考网站", "Open Reference"))}</a>` : ""}
          </div>
        </article>
      </section>`,
      renderStyleReferenceRail(item),
      `<section class="section">
        <div class="style-detail-core-grid">
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(
            bilingualText("长这样", "Looks Like")
          )}</p>${renderList(item.lookLike)}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(
            bilingualText("适合做", "Good For")
          )}</p>${renderList(item.cardUses)}</div></article>
          <article class="detail-card card-surface"><div class="card-body"><p class="card-kicker">${escapeHtml(
            bilingualText("不适合做", "Not For")
          )}</p>${renderList(item.notFor)}</div></article>
        </div>
      </section>`,
      renderStyleSkillSpecSection(item),
      `<section class="section">
        ${renderSectionHead(
          bilingualText("AI Prompt", "AI Prompt"),
          bilingualText("复制后直接粘贴给 Cursor / Claude", "Paste directly into Cursor / Claude"),
          ""
        )}
        <article class="detail-card card-surface" data-copy-container>
          <div class="card-body">
            <code id="${escapeHtml(`style-prompt-${item.slug}`)}">${escapeHtml(promptPacket)}</code>
            <div class="hero-actions">
              <button class="copy-button" type="button" data-copy-target="${escapeHtml(`style-prompt-${item.slug}`)}">${escapeHtml(
                bilingualText("复制 Prompt", "Copy Prompt")
              )}</button>
              <a ${linkAttrs(styleSkillDownloadPath(item), "ghost-button")} download>${escapeHtml(
                bilingualText("下载 .md Skill", "Download .md Skill")
              )}</a>
              <a ${linkAttrs(styleSkillRepoHref(item), "ghost-button")}>${escapeHtml(
                bilingualText("GitHub Skill", "GitHub Skill")
              )}</a>
            </div>
          </div>
        </article>
      </section>`,
      renderStyleHistoryFold(item)
    ].join("")
  });
}

function buildBrowsePage() {
  return layout({
    title: `${bilingualText("浏览风格", "Browse")} · ${siteMeta.title}`,
    description: "Browse style families by screenshot, filter, and search.",
    pathname: browseIndexHref(),
    pageClass: "browse-page index-page",
    body: [
      renderPageLead({
        kicker: bilingualText("浏览", "Browse"),
        title: bilingualText("先看图，再选风格", "Start with images, then choose a style"),
        summary: "从截图、场景和直觉标签进入，不需要先懂专业名词。",
        detail: "先按极简、科技、工艺、个性、出版、产品这些直觉标签筛一遍，再进入单个风格详情页拿 Prompt。",
        actions: `<div class="hero-actions"><a ${linkAttrs(selectorHref(), "button")}>${escapeHtml(
          bilingualText("帮我选风格", "Help Me Choose")
        )}</a><a ${linkAttrs(aboutHref(), "ghost-button")}>${escapeHtml(
          bilingualText("查看项目说明", "About")
        )}</a></div>`
      }),
      renderStyleGallerySection({
        sectionId: "gallery",
        title: bilingualText("完整图库", "Complete Gallery"),
        summary: "可筛选、可搜索、可切换视图。",
        includeSearch: true,
        includeViewToggle: true,
        stylesList: styleFamilies
      })
    ].join("")
  });
}

function renderAtlasEcosystemSection() {
  return `<section class="section about-ecosystem" id="atlas-ecosystem">
    ${renderSectionHead(
      bilingualText("类似站点与开源路径", "Comparable Sites and Open-Source Paths"),
      bilingualText("外面已经有哪些成熟做法", "What already exists outside this atlas"),
      "这一页不再把它们做成一堵同尺寸卡片墙，而是按“能借什么”来分组列出。"
    )}
    <div class="about-ecosystem-grid">
      ${atlasEcosystemCatalog
        .map(
          (group) => `<article class="about-ecosystem-group card-surface">
            <div class="about-ecosystem-group-head">
              <p class="card-kicker">${escapeHtml(bilingualText("外部参考", "External Reference"))}</p>
              <h3 class="card-title">${renderInlineEnglishTitle(group.titleZh, group.titleEn)}</h3>
              <p class="card-summary">${escapeHtml(group.summaryZh)}</p>
            </div>
            <ul class="about-ecosystem-list">
              ${group.items
                .map(
                  (item) => `<li class="about-ecosystem-item">
                    <div class="about-ecosystem-item-head">
                      <a ${linkAttrs(item.href, "about-ecosystem-link")}>${escapeHtml(item.titleZh)}</a>
                      ${item.repoHref ? `<a ${linkAttrs(item.repoHref, "about-ecosystem-repo")}>${escapeHtml("GitHub ↗")}</a>` : ""}
                    </div>
                    <p class="about-ecosystem-note">${escapeHtml(item.noteZh)}</p>
                    <p class="about-ecosystem-tags">${escapeHtml(
                      [...(item.tags || []), item.openSource ? "开源可借" : "结构可借"].join(" · ")
                    )}</p>
                  </li>`
                )
                .join("")}
            </ul>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function styleFamilyBrowseHrefById(id) {
  const item = styleFamilyMap.get(id);
  return item ? browseHref(item.slug) : browseIndexHref();
}

function renderCurrentSignalsSection() {
  return `<section class="section" id="current-signals">
    ${renderSectionHead(
      bilingualText("当前网页方向", "Current Web Signals"),
      bilingualText("现在主流网站大致分成这些方向", "How current websites are clustering now"),
      "这层不是历史流派，也不是工程底座。它回答的是：今天大家实际做出来的网站，大致正在往哪些方向收敛。"
    )}
    <div class="about-ecosystem-grid">
      ${currentWebSignalsCatalog
        .map(
          (item) => `<article class="detail-card card-surface">
            <div class="card-body">
              <p class="card-kicker">${escapeHtml(bilingualText("当前信号", "Current Signal"))}</p>
              <h3 class="card-title">${renderInlineEnglishTitle(item.titleZh, item.titleEn)}</h3>
              <p class="card-summary">${escapeHtml(item.summaryZh)}</p>
              ${renderLinkedPills(item.styleIds || [], styleFamilyMap, styleFamilyBrowseHrefById)}
            </div>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function renderAboutHero() {
  const cards = [
    {
      titleZh: "浏览",
      titleEn: "Browse",
      summary: "先看图，按直觉标签筛方向。",
      href: browseIndexHref(),
      screenshot: "awwwards-websites-live.png",
      alt: "Browse preview"
    },
    {
      titleZh: "选型器",
      titleEn: "Selector",
      summary: "如果完全没方向，用 3 步问答缩小范围。",
      href: selectorHref(),
      screenshot: "signal-a-studio.png",
      alt: "Selector preview"
    },
    {
      titleZh: "拿 Prompt",
      titleEn: "Prompt / Skill",
      summary: "确认适合做什么，再复制 Prompt 或下载 Skill。",
      href: githubHref,
      screenshot: "atlassian-foundations.png",
      alt: "Prompt preview"
    }
  ];

  return `<section class="section about-hero" id="top">
    <div class="about-hero-main">
      <div class="about-hero-copy">
        <p class="landing-kicker">${escapeHtml(bilingualText("关于", "About"))}</p>
        <h1 class="landing-title about-hero-title">
          <span>这不是设计史百科。</span>
          <span>它是你的建站选型工具。</span>
        </h1>
        <div class="landing-copy about-hero-copy-text">
          <p>${escapeHtml("这个站解决的不是“设计风格叫什么”，而是“我现在要做一个网站，先选哪种方向，接下来怎么交给 AI 做出来”。")}</p>
          <p>${escapeHtml("首页负责看图和缩小范围，浏览页负责比较，详情页负责拿 Prompt，GitHub 仓库负责公开保存这些 skills。")}</p>
        </div>
        <div class="hero-actions landing-actions">
          <a ${linkAttrs(browseIndexHref(), "button")}>${escapeHtml(bilingualText("开始浏览", "Start Browsing"))}</a>
        </div>
      </div>
      <div class="about-preview-grid">
        ${cards
          .map(
            (item) => `<a ${linkAttrs(item.href, "about-preview-card card-surface")}>
              <span class="about-preview-media">
                ${renderImageFrame(item.screenshot, item.alt)}
              </span>
              <span class="about-preview-body">
                <span class="card-kicker">${renderInlineEnglishTitle(item.titleZh, item.titleEn)}</span>
                <span class="about-preview-summary">${escapeHtml(item.summary)}</span>
              </span>
            </a>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function renderAboutWorkflowSection() {
  const steps = [
    {
      number: "01",
      title: "先看图挑方向",
      summary: "先按极简、科技、工艺、个性、出版、工具这些直觉标签筛一遍。",
      screenshot: "siteinspire-live.png",
      alt: "Browse by gallery"
    },
    {
      number: "02",
      title: "打开单个风格详情",
      summary: "确认它长什么样、适合做什么、不适合做什么。",
      screenshot: "fictivekin-work.png",
      alt: "Style detail preview"
    },
    {
      number: "03",
      title: "复制 Prompt 或下载 Skill",
      summary: "把风格规则带走，直接喂给 Codex / Cursor / Claude。",
      screenshot: "pair-guidebook.png",
      alt: "Prompt and skill preview"
    },
    {
      number: "04",
      title: "再回来补历史来源",
      summary: "历史流派留到最后看，用来理解源头和避坑，不抢首页入口。",
      screenshot: "frieze.png",
      alt: "History preview"
    }
  ];

  return `<section class="section" id="how-it-works">
    ${renderSectionHead(
      bilingualText("使用方式", "How It Works"),
      bilingualText("看图选风格，拿 Prompt 建站", "Choose by image, then build with prompts"),
      "这四步才是这个站真正的服务链。"
    )}
    <div class="about-steps-grid">
      ${steps
        .map(
          (item) => `<article class="about-step-card card-surface">
            <div class="about-step-media">
              ${renderImageFrame(item.screenshot, item.alt)}
            </div>
            <div class="about-step-body">
              <p class="about-step-number">${escapeHtml(item.number)}</p>
              <h3 class="card-title">${escapeHtml(item.title)}</h3>
              <p class="card-summary">${escapeHtml(item.summary)}</p>
            </div>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function buildAboutPage() {
  return layout({
    title: `${bilingualText("关于", "About")} · ${siteMeta.title}`,
    description: "About Webdesign Atlas as a style-selection service for AI website building.",
    pathname: aboutHref(),
    pageClass: "about-page index-page",
    body: [
      renderAboutHero(),
      renderAboutWorkflowSection(),
      renderCurrentSignalsSection(),
      `<section class="section">
        ${renderSectionHead(
          bilingualText("公开 Skills 仓库", "Public Skills Repo"),
          bilingualText("每个风格都有对应的可下载 Skill", "Each style has a downloadable skill"),
          "网站负责浏览、选型和说明；公开仓库负责把每个风格的 Skill 单独保存、同步和开放下载。"
        )}
        <div class="about-repo-grid">
          <article class="detail-card card-surface">
            <div class="card-body">
              <p class="card-summary">${escapeHtml(
                "仓库按风格分文件夹维护 SKILL.md。你可以先在站内看图选方向，再去 GitHub 拿对应 skill；也可以直接把 skill 放进 Codex / Cursor / OpenClaw 的 skills 目录复用。"
              )}</p>
              <div class="hero-actions">
                <a ${linkAttrs(githubHref, "button")}>${escapeHtml("打开 GitHub 仓库 ↗")}</a>
                <a ${linkAttrs(browseIndexHref(), "ghost-button")}>${escapeHtml(
                  bilingualText("回到风格浏览", "Back to Browse")
                )}</a>
              </div>
            </div>
          </article>
          <article class="detail-card card-surface">
            <div class="card-body">
              <p class="card-kicker">${escapeHtml(bilingualText("仓库内容", "Repo Contents"))}</p>
              ${renderList([
                "每个风格一个独立 slug 与 SKILL.md",
                "和站内详情页一一对应",
                "通过 npm run build && npm run export:skills 同步",
                "适合直接给 AI 当风格约束包"
              ])}
            </div>
          </article>
        </div>
      </section>`,
      renderAtlasEcosystemSection(),
      `<section class="section">
        ${renderSectionHead(
          bilingualText("历史流派", "Historical Timeline"),
          bilingualText("时间轴还在，但不占首页入口", "The timeline still exists, but no longer owns the homepage"),
          "当你已经选到一个方向，再回来补历史演化、视觉特征和网页里的延续关系。"
        )}
        <article class="detail-card card-surface">
          <div class="card-body">
            <p class="card-summary">${escapeHtml(
              "完整的历史流派页会给你更大的年份展示、更完整的视觉特征和对应网页影响，不再挤在 About 里和服务说明抢注意力。"
            )}</p>
            <div class="hero-actions">
              <a ${linkAttrs("/movements", "button")}>${escapeHtml(bilingualText("查看完整流派时间轴", "Open Full Timeline"))}</a>
            </div>
          </div>
        </article>
      </section>`
    ].join("")
  });
}

const selectorWizardSiteOptions = [
  { id: "portfolio", titleZh: "个人作品集", titleEn: "Portfolio" },
  { id: "brand", titleZh: "品牌官网", titleEn: "Brand Site" },
  { id: "blog", titleZh: "内容博客", titleEn: "Content Blog" },
  { id: "tool", titleZh: "工具产品", titleEn: "Tool / Product" },
  { id: "launch", titleZh: "发布页", titleEn: "Launch Page" },
  { id: "other", titleZh: "其他", titleEn: "Other" }
];

const selectorWizardAudienceOptions = [
  { id: "clients", titleZh: "潜在客户 / 雇主", titleEn: "Clients / Employers" },
  { id: "fans", titleZh: "粉丝 / 订阅者", titleEn: "Fans / Subscribers" },
  { id: "general", titleZh: "普通用户", titleEn: "General Users" },
  { id: "self", titleZh: "自己", titleEn: "Myself" }
];

const selectorWizardVisualOptions = {
  tone: [
    { id: "quiet", titleZh: "安静克制", titleEn: "Quiet", screenshot: "gentlewoman-live.png", alt: "Quiet reference" },
    { id: "bold", titleZh: "强烈有力", titleEn: "Bold", screenshot: "cyberpunk-net.png", alt: "Bold reference" }
  ],
  order: [
    {
      id: "structured",
      titleZh: "整洁系统",
      titleEn: "Structured",
      screenshot: "swiss-institute.png",
      alt: "Structured reference"
    },
    { id: "distinctive", titleZh: "个性独特", titleEn: "Distinctive", screenshot: "bureau-borsche.png", alt: "Distinctive reference" }
  ]
};

const selectorWizardDefaultState = {
  siteType: "portfolio",
  audience: "clients",
  tone: "quiet",
  order: "structured"
};

function selectorWizardPayload() {
  return {
    initialState: selectorWizardDefaultState,
    siteOptions: selectorWizardSiteOptions,
    audienceOptions: selectorWizardAudienceOptions,
    visualOptions: selectorWizardVisualOptions,
    styles: styleFamilies.map((item) => ({
      id: item.id,
      slug: item.slug,
      href: browseHref(item.slug),
      titleZh: item.nameZh,
      titleEn: item.titleEn || item.title,
      summary: item.summaryZh || item.summary,
      screenshot: item.cover,
      alt: item.coverAlt || item.nameZh,
      cardUses: item.cardUses,
      lookLike: item.lookLike,
      notFor: item.notFor,
      filterTags: item.filterTags,
      siteTypes: item.siteTypes,
      audiences: item.audiences,
      toneAxis: item.toneAxis,
      orderAxis: item.orderAxis
    }))
  };
}

function selectorWizardSiteLabel(id) {
  return selectorWizardSiteOptions.find((item) => item.id === id)?.titleZh || id;
}

function selectorWizardAudienceLabel(id) {
  return selectorWizardAudienceOptions.find((item) => item.id === id)?.titleZh || id;
}

function scoreSelectorStyle(style, state) {
  let score = 0;
  const reasons = [];

  if (style.siteTypes.includes(state.siteType)) {
    score += 4;
    reasons.push(`适合做${selectorWizardSiteLabel(state.siteType)}`);
  }

  if (style.audiences.includes(state.audience)) {
    score += 2;
    reasons.push(`更适合给${selectorWizardAudienceLabel(state.audience)}看`);
  }

  if (style.toneAxis === state.tone) {
    score += 2;
    reasons.push(`第一眼更偏${state.tone === "quiet" ? "安静克制" : "强烈有力"}`);
  }

  if (style.orderAxis === state.order) {
    score += 2;
    reasons.push(`页面组织更偏${state.order === "structured" ? "整洁系统" : "个性独特"}`);
  }

  if (state.siteType === "other") score += 1;

  return { score, reasons };
}

function resolveSelectorWizardRecommendations(state = selectorWizardDefaultState) {
  const ranked = styleFamilies
    .map((style) => {
      const result = scoreSelectorStyle(style, state);
      return {
        style,
        score: result.score,
        reasons: result.reasons.slice(0, 3)
      };
    })
    .sort((a, b) => b.score - a.score || styleOrder.indexOf(a.style.id) - styleOrder.indexOf(b.style.id));

  return {
    state,
    results: ranked.slice(0, 3)
  };
}

function renderSelectorWizardOption(name, item, selected) {
  return `<label class="wizard-choice-pill${selected === item.id ? " is-selected" : ""}">
    <input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(item.id)}"${selected === item.id ? " checked" : ""} />
    <span>${escapeHtml(item.titleZh)}</span>
  </label>`;
}

function renderSelectorWizardVisualGroup(name, title, options, selected) {
  return `<article class="selector-visual-group">
    <p class="card-kicker">${escapeHtml(title)}</p>
    <div class="selector-visual-grid">
      ${options
        .map(
          (item) => `<label class="selector-visual-choice${selected === item.id ? " is-selected" : ""}">
            <input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(item.id)}"${selected === item.id ? " checked" : ""} />
            ${renderImageFrame(item.screenshot, item.alt || item.titleZh)}
            <span class="selector-visual-label">${renderInlineEnglishTitle(item.titleZh, item.titleEn)}</span>
          </label>`
        )
        .join("")}
    </div>
  </article>`;
}

function renderSelectorWizardResults(packet) {
  return `<div class="selector-wizard-results" data-selector-wizard-results>
    <div class="section-head">
      <div class="section-head-main">
        <p class="eyebrow">${escapeHtml(bilingualText("推荐结果", "Recommendations"))}</p>
        <h2 class="section-title">${escapeHtml(bilingualText("推荐你先看这 2 到 3 个风格", "Start with these 2-3 styles"))}</h2>
      </div>
    </div>
    <div class="selector-recommendation-grid">
      ${packet.results
        .map(
          ({ style, reasons }) => `<article class="selector-result-card card-surface">
            <a ${linkAttrs(browseHref(style.slug), "selector-result-media")}>
              ${renderImageFrame(style.cover, style.coverAlt || style.nameZh)}
            </a>
            <div class="card-body">
              <h3 class="card-title">${renderInlineEnglishTitle(style.nameZh, style.titleEn || style.title)}</h3>
              <p class="card-summary">${escapeHtml(`适合做：${style.cardUses.slice(0, 3).join(" · ")}`)}</p>
              ${renderList(reasons)}
              <div class="hero-actions">
                <a ${linkAttrs(browseHref(style.slug), "text-link")}>${escapeHtml(bilingualText("查看详情", "Open Detail"))}</a>
              </div>
            </div>
          </article>`
        )
        .join("")}
    </div>
  </div>`;
}

function buildHomePage() {
  const usedHomeScreenshots = new Set();
  const homeHeroStyleIds = [
    "swiss-typographic-grid",
    "architecture-space-minimal",
    "bento-product-launch",
    "creative-media-editorial",
    "hospitality-scene-editorial",
    "neon-techno-futurist-interface",
    "showcase-discovery-index",
    "networked-visual-board"
  ];
  const homeHeroPreferredMap = {
    "swiss-typographic-grid": visualAsset("pentagram.png", "Pentagram", "Pentagram homepage"),
    "architecture-space-minimal": visualAsset("snohetta.png", "Snohetta", "Snohetta homepage"),
    "bento-product-launch": visualAsset("bolt-new.png", "Bolt", "Bolt homepage"),
    "creative-media-editorial": visualAsset("itsnicethat-live.png", "It's Nice That", "It's Nice That homepage"),
    "hospitality-scene-editorial": visualAsset("ace-hotel.png", "Ace Hotel", "Ace Hotel homepage"),
    "neon-techno-futurist-interface": visualAsset("cyberpunk-net.png", "Cyberpunk", "Cyberpunk homepage"),
    "showcase-discovery-index": visualAsset("siteinspire.png", "SiteInspire", "SiteInspire categories"),
    "networked-visual-board": visualAsset("behance.png", "Behance", "Behance homepage")
  };
  const homeHeroVisualMap = buildVisualMap(
    homeHeroStyleIds.map((id) => styleFamilyMap.get(id)).filter(Boolean),
    { usedScreenshots: usedHomeScreenshots, preferredMap: homeHeroPreferredMap }
  );
  const defaultFieldStyle =
    styleFamilyMap.get("architecture-space-minimal") ||
    styleFamilies.find((item) => familyFieldMap[item.id]) ||
    styleFamilies[0] ||
    null;
  const homeFieldPreviewVisual = defaultFieldStyle
    ? pickUniqueVisual(defaultFieldStyle, usedHomeScreenshots)
    : null;
  const homeGalleryStyles = [
    "swiss-typographic-grid",
    "monochrome-studio-systems",
    "dark-studio-gallery",
    "humanist-modern-brand",
    "civic-service-clarity",
    "architecture-space-minimal",
    "hospitality-scene-editorial",
    "modern-commerce-minimal",
    "photo-journal-archive",
    "report-storytelling-narrative",
    "design-system-foundation",
    "docs-first-open-source",
    "developer-infrastructure-aura",
    "fintech-trust-platform",
    "bento-product-launch",
    "ai-companion-landing",
    "health-care-soft-tech",
    "frontier-research-lab",
    "creative-media-editorial",
    "journal-frontpage",
    "luxury-fashion-editorial",
    "brutalist-raw-interface",
    "template-market-library",
    "showcase-discovery-index",
    "networked-visual-board"
  ]
    .map((id) => styleFamilyMap.get(id))
    .filter(Boolean);
  const homeGalleryPreferredMap = {
    "swiss-typographic-grid": visualAsset("signal-a-studio.png", "Signal-A Studio", "Signal-A Studio homepage"),
    "monochrome-studio-systems": visualAsset("fictivekin-home-live.png", "Fictive Kin", "Fictive Kin homepage"),
    "dark-studio-gallery": visualAsset("studio-feixen.png", "Studio Feixen", "Studio Feixen homepage"),
    "humanist-modern-brand": visualAsset("monocle.png", "Monocle", "Monocle homepage"),
    "civic-service-clarity": visualAsset("govuk.png", "GOV.UK", "GOV.UK homepage"),
    "architecture-space-minimal": visualAsset("snohetta.png", "Snohetta", "Snohetta homepage"),
    "hospitality-scene-editorial": visualAsset("kinfolk-live.png", "Kinfolk", "Kinfolk homepage"),
    "modern-commerce-minimal": visualAsset("everlane.png", "Everlane", "Everlane homepage"),
    "photo-journal-archive": visualAsset("aperture.png", "Aperture", "Aperture homepage"),
    "report-storytelling-narrative": visualAsset("pair-guidebook.png", "People + AI Guidebook", "People + AI Guidebook page"),
    "design-system-foundation": visualAsset("atlassian-foundations.png", "Atlassian Foundations", "Atlassian Foundations page"),
    "docs-first-open-source": visualAsset("supabase.png", "Supabase", "Supabase homepage"),
    "developer-infrastructure-aura": visualAsset("vercel.png", "Vercel", "Vercel homepage"),
    "fintech-trust-platform": visualAsset("mercury.png", "Mercury", "Mercury homepage"),
    "bento-product-launch": visualAsset("linear.png", "Linear", "Linear homepage"),
    "ai-companion-landing": visualAsset("decagon.png", "Decagon", "Decagon homepage"),
    "health-care-soft-tech": visualAsset("superpower.png", "Superpower", "Superpower homepage"),
    "frontier-research-lab": visualAsset("anthropic.png", "Anthropic", "Anthropic homepage"),
    "creative-media-editorial": visualAsset("frieze.png", "Frieze", "Frieze homepage"),
    "journal-frontpage": visualAsset("newyorker.png", "The New Yorker", "The New Yorker homepage"),
    "luxury-fashion-editorial": visualAsset("gentlewoman.png", "The Gentlewoman", "The Gentlewoman homepage"),
    "brutalist-raw-interface": visualAsset("gumroad-live.png", "Gumroad", "Gumroad homepage"),
    "template-market-library": visualAsset("notion-templates-live.png", "Notion Templates", "Notion Templates page"),
    "showcase-discovery-index": visualAsset("siteinspire-live.png", "SiteInspire", "SiteInspire listings"),
    "networked-visual-board": visualAsset("arena-live.png", "Are.na / Board", "Are.na board screenshot")
  };
  return layout({
    title: siteMeta.title,
    description: siteMeta.description,
    pathname: "/",
    pageClass: "home-page",
    body: [
      renderLandingHero({ visualMap: homeHeroVisualMap, heroStyleIds: homeHeroStyleIds }),
      renderFamilyCoordinateSection({
        defaultStyleId: defaultFieldStyle?.id || "",
        previewVisual: homeFieldPreviewVisual
      }),
      renderStyleGallerySection({
        sectionId: "home-gallery",
        title: bilingualText("首页精选风格", "Featured Styles"),
        summary: "首页先看一组代表性风格，完整数量、搜索和筛选都放到 Browse 页面。当前 atlas 已经扩到更完整的网页风格谱系，不再停留在最初那 23 个方向。",
        actionHref: browseIndexHref(),
        actionLabel: bilingualText(`查看全部 ${styleFamilies.length} 种风格`, `View all ${styleFamilies.length} styles`),
        stylesList: homeGalleryStyles,
        preferredMap: homeGalleryPreferredMap,
        usedScreenshots: usedHomeScreenshots
      })
    ].join("")
  });
}

function buildFamiliesPage() {
  return layout({
    title: `${bilingualText("网页家族", "Web Families")} · ${siteMeta.title}`,
    description: "Contemporary web families for the Webdesign Zondev atlas.",
    pathname: "/families",
    pageClass: "index-page families-page",
    body: [
      renderPageLead({
        kicker: bilingualText("网页家族", "Web Families"),
        title: bilingualText("按页面感觉浏览", "Browse by Web Family"),
        summary: "这里看的是今天网站最常见的页面感觉，适合直接找相近站型和真实参考。",
        detail: "从 Editorial、Swiss、Monochrome Studio、Directory、Product、Stage 到 Anti-Grid，先看网页今天怎么长，再决定要不要回头补历史来源。",
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
    description: "Historical movements for the Webdesign Zondev atlas.",
    pathname: "/movements",
    pageClass: "index-page movements-page",
    body: [
      renderPageLead({
        kicker: bilingualText("历史流派", "Historical Movements"),
        title: bilingualText("从喜欢的网站感觉，往前找它从哪来", "Trace the lineage behind the site feeling"),
        summary: "如果你看中过某种网站感觉，但不知道它为什么成立，就从这里往前找。",
        detail: "看这类网站通常从哪来、适合落成什么站、下一步该看哪类网页。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>${escapeHtml(bilingualText("返回首页", "Back Home"))}</a><a ${linkAttrs(browseIndexHref(), "button")}>${escapeHtml(bilingualText("查看浏览页", "Open Browse"))}</a></div>`
      }),
      renderTimelineAtlasSection({
        titleZh: "历史流派时间轴",
        titleEn: "Historical Timeline",
        kicker: bilingualText("历史线索", "Background Lineage"),
        summary: "当你已经知道自己想做哪类网站，再回看这些页面感觉分别从哪条历史线长出来。",
        sectionId: "movement-timeline"
      })
    ].join("")
  });
}

function buildStructuresPage() {
  return layout({
    title: `${bilingualText("信息结构", "Structure Patterns")} · ${siteMeta.title}`,
    description: "Structure patterns for organizing information and interaction in the Webdesign Zondev atlas.",
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
        title: bilingualText("先按网站类型开始", "Start with the site you need"),
        summary: "如果你不知道自己喜欢什么风格，从这里开始会最快。不用先懂设计史，先看你要做什么网站。",
        detail: "把个人站、品牌页、工具官网、研究站、作品集这些真实任务，直接映射到更合适的页面感觉、结构方式和参考组合。",
        actions: `<div class="hero-actions"><a ${linkAttrs("/", "ghost-button")}>${escapeHtml(bilingualText("返回首页", "Back Home"))}</a><a ${linkAttrs("/structures", "button")}>${escapeHtml(bilingualText("查看信息结构", "Open Structures"))}</a></div>`
      }),
      renderUseCaseSection({
        title: bilingualText("全部建站场景", "All Use Cases"),
        kicker: bilingualText("任务入口", "Task Index"),
        summary: "从设计参考库、文化出版、设计工作室、研究知识站、AI 工具到 future-tech launch，都能直接找到更稳的起点。",
        useCasesList: useCases,
        sectionId: "all-use-cases",
        actionMarkup: ""
      })
    ].join("")
  });
}

function buildSelectorPage() {
  const packet = resolveSelectorWizardRecommendations(selectorWizardDefaultState);
  const payload = serializeJsonForHtml(selectorWizardPayload());

  return layout({
    title: `${bilingualText("选型器", "Style Selector")} · ${siteMeta.title}`,
    description: "A 3-step selector that recommends the right styles for AI site builders.",
    pathname: selectorHref(),
    pageClass: "index-page selector-page",
    body: [
      renderPageLead({
        kicker: bilingualText("选型器", "Style Selector"),
        title: bilingualText("选你要做的网站，拿走建站方向", "Choose the site, get a build direction"),
        summary: "只回答 3 个问题：做什么网站、给谁看、想要什么感觉。系统会直接推荐 2 到 3 个可落地的风格。",
        detail: "重点不是学名词，而是尽快缩小范围。结果会直接链接到风格详情页。",
        actions: `<div class="hero-actions"><a ${linkAttrs(browseIndexHref(), "ghost-button")}>${escapeHtml(
          bilingualText("先去浏览", "Browse First")
        )}</a><a ${linkAttrs(aboutHref(), "button")}>${escapeHtml(
          bilingualText("查看说明", "About")
        )}</a></div>`
      }),
      `<section class="section selector-wizard-shell" id="selector">
        <div class="selector-wizard-layout" data-selector-wizard>
          <div class="selector-wizard-questions">
            <article class="selector-step card-surface">
              <div class="card-body">
                <p class="card-kicker">${escapeHtml(bilingualText("步骤 1", "Step 1"))}</p>
                <h2 class="section-title">${escapeHtml(bilingualText("你要做什么类型的网站？", "What kind of site are you making?"))}</h2>
                <div class="wizard-pill-grid">
                  ${selectorWizardSiteOptions
                    .map((item) => renderSelectorWizardOption("siteType", item, packet.state.siteType))
                    .join("")}
                </div>
              </div>
            </article>
            <article class="selector-step card-surface">
              <div class="card-body">
                <p class="card-kicker">${escapeHtml(bilingualText("步骤 2", "Step 2"))}</p>
                <h2 class="section-title">${escapeHtml(bilingualText("给谁看？", "Who is it for?"))}</h2>
                <div class="wizard-pill-grid">
                  ${selectorWizardAudienceOptions
                    .map((item) => renderSelectorWizardOption("audience", item, packet.state.audience))
                    .join("")}
                </div>
              </div>
            </article>
            <article class="selector-step card-surface">
              <div class="card-body">
                <p class="card-kicker">${escapeHtml(bilingualText("步骤 3", "Step 3"))}</p>
                <h2 class="section-title">${escapeHtml(bilingualText("你更喜欢哪种感觉？", "Which feeling fits better?"))}</h2>
                ${renderSelectorWizardVisualGroup(
                  "tone",
                  bilingualText("组 A：安静克制 vs 强烈有力", "Group A: Quiet vs Bold"),
                  selectorWizardVisualOptions.tone,
                  packet.state.tone
                )}
                ${renderSelectorWizardVisualGroup(
                  "order",
                  bilingualText("组 B：整洁系统 vs 个性独特", "Group B: Structured vs Distinctive"),
                  selectorWizardVisualOptions.order,
                  packet.state.order
                )}
              </div>
            </article>
          </div>
          ${renderSelectorWizardResults(packet)}
        </div>
        <script id="selector-wizard-data" type="application/json">${payload}</script>
      </section>`
    ].join("")
  });
}

function buildStyleCatalogPayload() {
  return styleFamilies.map((item) => ({
    id: item.id,
    slug: item.slug,
    nameZh: item.nameZh,
    titleEn: item.titleEn || item.title,
    summaryZh: item.summaryZh || item.summary || "",
    cardUses: item.cardUses,
    lookLike: item.lookLike,
    notFor: item.notFor,
    filterTags: item.filterTags,
    cover: item.cover,
    coverAlt: item.coverAlt || item.nameZh,
    coverLabel: item.coverLabel || item.nameZh,
    demoHref: item.demoHref || "",
    downloadPath: styleSkillDownloadPath(item),
    githubSkillHref: styleSkillRepoHref(item),
    references: selectorReferenceEntries(item),
    skillSpec: item.skillSpec || null
  }));
}

function buildAtlasEcosystemPayload() {
  return atlasEcosystemCatalog.map((group) => ({
    id: group.id,
    titleZh: group.titleZh,
    titleEn: group.titleEn,
    summaryZh: group.summaryZh,
    items: group.items
  }));
}

function buildCurrentSignalsPayload() {
  return currentWebSignalsCatalog.map((item) => ({
    id: item.id,
    titleZh: item.titleZh,
    titleEn: item.titleEn,
    summaryZh: item.summaryZh,
    styleIds: item.styleIds || []
  }));
}

function build() {
  fs.rmSync(distRoot, { recursive: true, force: true });
  ensureDir(distRoot);
  copyIfExists(path.join(srcRoot, "site.css"), path.join(distRoot, "site.css"));
  copyIfExists(path.join(srcRoot, "app.js"), path.join(distRoot, "app.js"));
  copyIfExists(path.join(srcRoot, "favicon.svg"), path.join(distRoot, "favicon.svg"));
  copyDir(path.join(srcRoot, "screenshots"), path.join(distRoot, "screenshots"));

  writePage([], buildHomePage());
  writePage(["browse"], buildBrowsePage());
  writePage(["about"], buildAboutPage());
  writePage(["movements"], buildMovementsPage());
  writePage(["selector"], buildSelectorPage());

  for (const family of styleFamilies) {
    writePage(["browse", family.slug], renderBrowseStyleDetail(family));
  }

  for (const movement of movements) {
    writePage(["movements", movement.id], renderMovementDetail(movement));
  }

  for (const family of styleFamilies) {
    writeFile(path.join(distRoot, "downloads", `${family.slug}.md`), renderStyleSkillMarkdown(family));
  }

  writeFile(path.join(distRoot, "data", "style-catalog.json"), JSON.stringify(buildStyleCatalogPayload(), null, 2));
  writeFile(path.join(distRoot, "data", "atlas-ecosystem.json"), JSON.stringify(buildAtlasEcosystemPayload(), null, 2));
  writeFile(path.join(distRoot, "data", "current-signals.json"), JSON.stringify(buildCurrentSignalsPayload(), null, 2));

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

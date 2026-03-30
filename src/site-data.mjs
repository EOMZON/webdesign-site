export const siteMeta = {
  title: "Design Zondev",
  description:
    "An external style atlas for historical design movements, contemporary web families, and scenario-fit website references.",
  origin: process.env.DESIGN_SITE_ORIGIN || "https://design.zondev.top",
  updatedAt: "2026-03-30"
};

export const hero = {
  eyebrow: "External Style Atlas",
  title: "先被图像抓住，再被分类带走",
  intro:
    "这是一个风格聚合站，不是说明文档首页。首屏先给足够强的图像定调，再把人带到三个真正有用的入口：历史流派、当代网页家族、适用场景。",
  support:
    "以后做站，不要只说“做成杂志感”或“做成黑白”。先选 movement，再选 web family，再选 structure，最后才写 prompt。",
  primaryCta: { label: "Browse Families", href: "/families" },
  secondaryCta: { label: "Browse Movements", href: "/movements" },
  note: "Image-first shell. Neutral chrome. Drill down by movement, family, or use case."
};

export const heroWall = [
  {
    screenshot: "frieze.png",
    alt: "Frieze homepage",
    label: "Frieze",
    meta: "quiet editorial culture",
    href: "/families/magazine-editorial",
    size: "hero"
  },
  {
    screenshot: "pentagram.png",
    alt: "Pentagram homepage",
    label: "Swiss Grid",
    meta: "typographic systems",
    href: "/families/swiss-typographic-grid",
    size: "tall"
  },
  {
    screenshot: "gumroad-live.png",
    alt: "Gumroad homepage",
    label: "Raw Postmodern",
    meta: "anti-grid commerce",
    href: "/families/playful-postmodern-anti-grid",
    size: "standard"
  },
  {
    screenshot: "cyberpunk-net.png",
    alt: "Cyberpunk homepage",
    label: "Techno-Futurism",
    meta: "neon worldbuilding",
    href: "/families/neon-techno-futurist-interface",
    size: "standard"
  },
  {
    screenshot: "linear.png",
    alt: "Linear homepage",
    label: "Product Precision",
    meta: "controlled interface density",
    href: "/families/product-precision-interface",
    size: "wide"
  },
  {
    screenshot: "siteinspire-live.png",
    alt: "SiteInspire homepage",
    label: "Directory",
    meta: "reference browsing",
    href: "/families/curated-reference-directory",
    size: "standard"
  },
  {
    screenshot: "gentlewoman.png",
    alt: "The Gentlewoman homepage",
    label: "Quiet Lifestyle",
    meta: "calm prestige",
    href: "/families/quiet-lifestyle-editorial",
    size: "standard"
  }
];

export const browseModes = [
  {
    id: "movements",
    title: "Historical Movements",
    count: "6",
    summary: "从 Bauhaus、Swiss、Memphis 到 Cyberpunk，看设计谱系如何演化到今天的网站语言。",
    href: "/movements",
    detail: "适合先看历史来源、核心特征和后代分支。"
  },
  {
    id: "families",
    title: "Contemporary Web Families",
    count: "9",
    summary: "从 editorial、Swiss、product precision、raw anti-grid 到 neon futurism，看今天网站最常见的表现家族。",
    href: "/families",
    detail: "适合先找网页呈现方式和参考网站。"
  },
  {
    id: "use-cases",
    title: "Use Cases",
    count: "7",
    summary: "按内容形状和任务选风格：出版、工具、品牌、图库、研究、发布页、灵感库。",
    href: "#selection-matrix",
    detail: "适合先从场景反推 family 和 structure。"
  }
];

export const atlasRules = [
  {
    title: "首屏先证明你有样本",
    detail: "这是风格聚合站，不是风格说明站。第一屏必须先让人看到足够多、足够强的图像样本。"
  },
  {
    title: "历史谱系和网页家族必须拆开",
    detail: "Memphis、Bauhaus、Swiss 是谱系；editorial、product precision、directory 是网页呈现家族。不要混成一层。"
  },
  {
    title: "首页只负责引导，不负责讲完",
    detail: "首页负责定调、聚类和导流；具体特征、适用场景和 prompt DNA 应该进入 detail page。"
  },
  {
    title: "每个参考都要有 borrow 和 avoid",
    detail: "真正可复用的不是“喜欢这张图”，而是知道该借哪部分语法、该避开什么误用。"
  }
];

export const historicalMovements = [
  {
    id: "bauhaus-functional-modernism",
    title: "Bauhaus / Functional Modernism",
    period: "1919-1933",
    origin: "Germany",
    summary: "功能、工业和几何秩序优先。它把形式服从用途这件事系统化。",
    whyItMatters: "今天大量产品站和设计系统网站，仍在延续 Bauhaus 的功能主义、模块化和减少装饰的思想。",
    signatures: ["function before ornament", "industrial clarity", "geometric reduction", "modular logic"],
    watchFor: ["容易被误做成单纯的冷淡白底", "不是所有黑白简洁都等于 Bauhaus"],
    webFamilyIds: ["product-precision-interface", "evidence-dense-knowledge-surface"],
    samples: [
      { screenshot: "apple-macbook.png", alt: "Apple MacBook Pro page", label: "Apple MacBook Pro" },
      { screenshot: "atlassian-foundations.png", alt: "Atlassian Foundations page", label: "Atlassian Foundations" }
    ],
    references: [
      { label: "Bauhaus100", href: "https://www.bauhaus100.de/en/" },
      { label: "Britannica: Bauhaus", href: "https://www.britannica.com/topic/Bauhaus" }
    ]
  },
  {
    id: "art-deco-streamlined-luxury",
    title: "Art Deco / Streamlined Luxury",
    period: "1920s-1930s",
    origin: "France / Europe / US",
    summary: "几何装饰、流线感和高级感并存。今天它更多以精致和舞台感回到网页中。",
    whyItMatters: "不少文化、时尚和奢侈品牌网站，会借 Art Deco 的舞台感、对称感和精致节奏。",
    signatures: ["streamlined glamour", "geometric ornament", "theatrical hierarchy", "prestige pacing"],
    watchFor: ["容易做得过度复古", "不适合高频工具界面"],
    webFamilyIds: ["quiet-lifestyle-editorial", "stage-driven-showcase"],
    samples: [
      { screenshot: "frieze.png", alt: "Frieze homepage", label: "Frieze" },
      { screenshot: "gentlewoman.png", alt: "The Gentlewoman homepage", label: "The Gentlewoman" }
    ],
    references: [
      { label: "V&A: Art Deco", href: "https://www.vam.ac.uk/articles/art-deco-an-introduction" },
      { label: "Britannica: Art Deco", href: "https://www.britannica.com/art/Art-Deco" }
    ]
  },
  {
    id: "swiss-international-typography",
    title: "Swiss / International Typographic Style",
    period: "1950s-1970s",
    origin: "Switzerland",
    summary: "网格、对齐、无衬线、秩序感。它是今天大量知识型、设计型、档案型网页的基础语法之一。",
    whyItMatters: "如果你想做可扫描、可扩展、可归档的知识系统，Swiss 比“简单好看”更重要。",
    signatures: ["grid-first composition", "alignment as primary device", "type-led hierarchy", "metadata clarity"],
    watchFor: ["别把网格误解成呆板", "不能靠纯色块替代真正的秩序"],
    webFamilyIds: ["swiss-typographic-grid", "evidence-dense-knowledge-surface"],
    samples: [
      { screenshot: "pentagram.png", alt: "Pentagram homepage", label: "Pentagram" },
      { screenshot: "studio-feixen.png", alt: "Studio Feixen homepage", label: "Studio Feixen" }
    ],
    references: [
      { label: "Cooper Hewitt: Swiss Style", href: "https://www.cooperhewitt.org/2015/06/11/design-dictionary-swiss-style/" },
      { label: "Print: Swiss Style Principles", href: "https://www.printmag.com/featured/swiss-style-principles-typefaces-designers/" }
    ]
  },
  {
    id: "postmodern-memphis",
    title: "Postmodern / Memphis",
    period: "1981-1988 and beyond",
    origin: "Italy",
    summary: "反对过度理性和过度秩序，强调图案、冲突、俏皮和反规范的组合方式。",
    whyItMatters: "今天很多 playful product、creator brand 和 anti-template 网站，会借 Memphis 的反网格情绪来打破模板感。",
    signatures: ["anti-grid play", "pattern collisions", "bold geometry", "postmodern attitude"],
    watchFor: ["非常容易变乱", "不能只剩颜色和贴纸，结构仍然需要清楚"],
    webFamilyIds: ["playful-postmodern-anti-grid", "curated-reference-directory"],
    samples: [
      { screenshot: "memphis-milano.png", alt: "Memphis Milano homepage", label: "Memphis Milano" },
      { screenshot: "gumroad-live.png", alt: "Gumroad homepage", label: "Gumroad" }
    ],
    references: [
      { label: "Memphis Milano", href: "https://memphis.it/en/" },
      { label: "Design Museum: Ettore Sottsass", href: "https://designmuseum.org/designers/ettore-sottsass" }
    ]
  },
  {
    id: "brutalism-neo-brutalism",
    title: "Brutalism / Neo-Brutalism",
    period: "1950s roots / 2010s-2020s web revival",
    origin: "Architecture roots / Web reinterpretation",
    summary: "结构裸露、边界鲜明、不讨好。网页里的 neo-brutalism 往往更鲜艳、更可用。",
    whyItMatters: "当你不想继续做一种平滑中性的互联网模板时，neo-brutalism 是最常见的反作用力之一。",
    signatures: ["hard edges", "visible borders", "assertive contrast", "anti-polish energy"],
    watchFor: ["最容易误做成噪音", "不能为了态度牺牲基本可读性"],
    webFamilyIds: ["playful-postmodern-anti-grid"],
    samples: [
      { screenshot: "gumroad-live.png", alt: "Gumroad homepage", label: "Gumroad" },
      { screenshot: "siteinspire-live.png", alt: "SiteInspire homepage", label: "SiteInspire" }
    ],
    references: [
      { label: "Wix: Brutalist Websites", href: "https://www.wix.com/blog/brutalist-websites" },
      { label: "Gumroad", href: "https://gumroad.com/" }
    ]
  },
  {
    id: "cyberpunk-techno-futurism",
    title: "Cyberpunk / Techno-Futurism",
    period: "1980s-present",
    origin: "Science fiction / game and tech culture",
    summary: "高饱和霓虹、黑夜城市、技术感界面、世界观驱动。它更像视觉文化分支。",
    whyItMatters: "今天的游戏、硬件、沉浸式产品页和一些 AI / tech brand，会借这种未来主义张力来强化世界观。",
    signatures: ["neon-on-dark contrast", "worldbuilding first", "screen-like overlays", "high-energy tech atmosphere"],
    watchFor: ["容易只剩颜色和发光", "不适合需要安静阅读或严肃知识感的页面"],
    webFamilyIds: ["neon-techno-futurist-interface", "stage-driven-showcase"],
    samples: [
      { screenshot: "cyberpunk-net.png", alt: "Cyberpunk homepage", label: "Cyberpunk" },
      { screenshot: "razer.png", alt: "Razer homepage", label: "Razer" }
    ],
    references: [
      { label: "Britannica: Cyberpunk", href: "https://www.britannica.com/art/cyberpunk" },
      { label: "Cyberpunk", href: "https://www.cyberpunk.net/" }
    ]
  }
];

export const visualFamilies = [
  {
    id: "magazine-editorial",
    title: "Magazine Editorial",
    summary: "Feature-led publishing surfaces. The fold behaves like a cover or lead spread, not like a generic SaaS hero.",
    ancestors: ["art-deco-streamlined-luxury", "swiss-international-typography"],
    structureIds: ["dossier", "archive-stack"],
    samples: [
      { screenshot: "frieze.png", alt: "Frieze homepage", label: "Frieze" },
      { screenshot: "tmagazine.png", alt: "T Magazine homepage", label: "T Magazine" }
    ],
    signature: ["feature-first hierarchy", "headline-image tension", "cover-story rhythm", "secondary stories feel curated"],
    borrow: ["strong lead image or cover block", "decks, bylines, captions, section labels", "clear editorial pacing from lead to secondary stories"],
    bestFor: ["cultural publishing", "feature homepages", "brand magazines", "essay archives"],
    avoidWhen: ["users need fast task completion", "the page depends on heavy filtering", "there are too few stories to justify a magazine frame"],
    references: [
      { label: "Frieze", href: "https://www.frieze.com/" },
      { label: "T Magazine", href: "https://www.nytimes.com/section/t-magazine" },
      { label: "The New Yorker", href: "https://www.newyorker.com/" }
    ],
    prompt: "Use a magazine editorial family: cover-like lead story, large image-led first fold, supporting story stack, disciplined serif hierarchy, and a publication rhythm instead of a SaaS feature grid."
  },
  {
    id: "quiet-lifestyle-editorial",
    title: "Quiet Lifestyle Editorial",
    summary: "Calmer, slower, more collectible than classic magazine surfaces. The page feels like an issue, catalog, or taste-led brand world.",
    ancestors: ["art-deco-streamlined-luxury"],
    structureIds: ["dossier", "catalog-explorer"],
    samples: [
      { screenshot: "gentlewoman.png", alt: "The Gentlewoman homepage", label: "The Gentlewoman" },
      { screenshot: "kinfolk-live.png", alt: "Kinfolk homepage", label: "Kinfolk" }
    ],
    signature: ["slow pacing", "generous whitespace", "soft prestige", "minimal navigation chrome"],
    borrow: ["quiet image-led hierarchy", "subtle premium tone without loud CTAs", "refined serif or fashion-led typography"],
    bestFor: ["fashion", "lifestyle", "cultural brands", "calmer portfolio shells"],
    avoidWhen: ["high-frequency product tasks", "dense evidence pages", "multi-step operations need top priority"],
    references: [
      { label: "The Gentlewoman", href: "https://thegentlewoman.co.uk/" },
      { label: "Kinfolk", href: "https://kinfolk.com/" },
      { label: "Monocle", href: "https://monocle.com/" }
    ],
    prompt: "Use a quiet lifestyle editorial family: spacious composition, restrained premium tone, image-first pacing, and typography that feels collectible rather than merely readable."
  },
  {
    id: "swiss-typographic-grid",
    title: "Swiss Typographic Grid",
    summary: "Order-forward, grid-led, typographic systems for archives, references, identities, and anything that must stay legible while it grows.",
    ancestors: ["swiss-international-typography"],
    structureIds: ["catalog-explorer", "archive-stack"],
    samples: [
      { screenshot: "pentagram.png", alt: "Pentagram homepage", label: "Pentagram" },
      { screenshot: "studio-feixen.png", alt: "Studio Feixen homepage", label: "Studio Feixen" }
    ],
    signature: ["grid-first composition", "hard alignment", "labels and metadata matter", "type as structure"],
    borrow: ["explicit alignment logic", "consistent margins and modular spacing", "clear category and metadata roles"],
    bestFor: ["archives", "identity studios", "reference libraries", "design system sites"],
    avoidWhen: ["the page needs emotional looseness", "image mood matters more than taxonomy", "the brand needs softness first"],
    references: [
      { label: "Pentagram", href: "https://www.pentagram.com/" },
      { label: "Studio Feixen", href: "https://www.studiofeixen.ch/" },
      { label: "Cooper Hewitt: Swiss Style", href: "https://www.cooperhewitt.org/2015/06/11/design-dictionary-swiss-style/" }
    ],
    prompt: "Use a Swiss typographic grid: modular alignment, visible metadata, tight typographic hierarchy, and structure carried by the grid rather than decoration."
  },
  {
    id: "product-precision-interface",
    title: "Product Precision Interface",
    summary: "Controlled, engineered, high-clarity product surfaces where state language, spacing, and UI logic outrank atmosphere.",
    ancestors: ["bauhaus-functional-modernism"],
    structureIds: ["workbench", "catalog-explorer"],
    samples: [
      { screenshot: "linear.png", alt: "Linear homepage", label: "Linear" },
      { screenshot: "stripe.png", alt: "Stripe homepage", label: "Stripe" }
    ],
    signature: ["tight spacing", "clear CTA hierarchy", "engineered polish", "task-first framing"],
    borrow: ["precise spacing and copy discipline", "screenshots that explain behavior", "clear task and state hierarchy"],
    bestFor: ["AI tools", "technical products", "platform homepages", "operator-facing tools"],
    avoidWhen: ["the page is primarily cultural or editorial", "atmosphere matters more than interface clarity"],
    references: [
      { label: "Linear", href: "https://linear.app/" },
      { label: "Stripe", href: "https://stripe.com/" },
      { label: "Atlassian Foundations", href: "https://atlassian.design/foundations/" }
    ],
    prompt: "Use a product-precision family: engineered hierarchy, crisp screenshots, strict spacing, and copy that frames tasks and outcomes before atmosphere."
  },
  {
    id: "stage-driven-showcase",
    title: "Stage-Driven Showcase",
    summary: "A hero or first fold behaves like a stage. One image, scene, or world carries the page before the rest of the content unfolds.",
    ancestors: ["art-deco-streamlined-luxury", "cyberpunk-techno-futurism"],
    structureIds: ["immersive-stage", "dossier"],
    samples: [
      { screenshot: "a24.png", alt: "A24 homepage", label: "A24" },
      { screenshot: "apple-macbook.png", alt: "Apple MacBook Pro page", label: "Apple MacBook Pro" }
    ],
    signature: ["single-scene drama", "low-density first fold", "strong visual memory", "clear reveal into deeper layers"],
    borrow: ["one dominant scene at the top", "sparse copy over a strong image", "clear exits into deeper content"],
    bestFor: ["campaigns", "flagship launches", "film and entertainment", "portfolio hero moments"],
    avoidWhen: ["the homepage must explain many parallel options", "users need scanning more than immersion"],
    references: [
      { label: "A24", href: "https://a24films.com/" },
      { label: "Apple MacBook Pro", href: "https://www.apple.com/macbook-pro/" },
      { label: "Nowness", href: "https://www.nowness.com/" }
    ],
    prompt: "Use a stage-driven showcase: let one scene dominate the fold, keep copy sparse, and reveal depth only after the first-image moment is established."
  },
  {
    id: "curated-reference-directory",
    title: "Curated Reference Directory",
    summary: "Index-first, browse-first, filter-friendly. The homepage acts like a visual directory rather than a manifesto.",
    ancestors: ["swiss-international-typography", "postmodern-memphis"],
    structureIds: ["catalog-explorer", "network-graph"],
    samples: [
      { screenshot: "siteinspire-live.png", alt: "SiteInspire homepage", label: "SiteInspire" },
      { screenshot: "behance.png", alt: "Behance homepage", label: "Behance" }
    ],
    signature: ["scan-first cards", "taxonomy near the top", "thumbnail density", "index-detail split"],
    borrow: ["visible browse and filter paths", "directory framing", "high sample density without losing scannability"],
    bestFor: ["reference atlases", "template libraries", "inspiration directories", "collection sites"],
    avoidWhen: ["a strong single narrative matters most", "there are too few entries to justify a directory"],
    references: [
      { label: "SiteInspire", href: "https://www.siteinspire.com/" },
      { label: "Behance", href: "https://www.behance.net/" },
      { label: "Godly", href: "https://godly.website/" }
    ],
    prompt: "Use a curated reference directory family: category-forward browsing, visible filters, dense but breathable thumbnails, and a clear separation between index and detail pages."
  },
  {
    id: "evidence-dense-knowledge-surface",
    title: "Evidence-Dense Knowledge Surface",
    summary: "Thesis, evidence, navigation, and labels coexist. The page must remain trustworthy and scannable even when it gets dense.",
    ancestors: ["bauhaus-functional-modernism", "swiss-international-typography"],
    structureIds: ["archive-stack", "catalog-explorer"],
    samples: [
      { screenshot: "ourworldindata-live.png", alt: "Our World in Data homepage", label: "Our World in Data" },
      { screenshot: "atlassian-foundations.png", alt: "Atlassian Foundations page", label: "Atlassian Foundations" }
    ],
    signature: ["dense but structured scanning", "topic-led navigation", "evidence modules", "high information honesty"],
    borrow: ["clear thesis before detail", "topic chips or side navigation", "labeled evidence blocks"],
    bestFor: ["research hubs", "design systems", "guides", "knowledge and decision surfaces"],
    avoidWhen: ["the content is thin", "the page exists only to create mood", "the task is emotionally led rather than evidential"],
    references: [
      { label: "Our World in Data", href: "https://ourworldindata.org/" },
      { label: "Atlassian Foundations", href: "https://atlassian.design/foundations/" },
      { label: "Carbon for AI", href: "https://carbondesignsystem.com/guidelines/carbon-for-ai/" }
    ],
    prompt: "Use an evidence-dense knowledge surface: thesis first, structured evidence blocks, explicit labels, and navigation strong enough to keep dense information readable."
  },
  {
    id: "playful-postmodern-anti-grid",
    title: "Playful Postmodern / Anti-Grid",
    summary: "A deliberately less obedient family: bold shapes, anti-grid moments, bright accents, and a visible attitude against neutral template sameness.",
    ancestors: ["postmodern-memphis", "brutalism-neo-brutalism"],
    structureIds: ["catalog-explorer", "immersive-stage"],
    samples: [
      { screenshot: "gumroad-live.png", alt: "Gumroad homepage", label: "Gumroad" },
      { screenshot: "memphis-milano.png", alt: "Memphis Milano homepage", label: "Memphis Milano" }
    ],
    signature: ["anti-grid play", "bold borders or shapes", "strong accent color", "deliberate refusal of neutral polish"],
    borrow: ["attitude through structure and shape", "color as a punch, not as decoration everywhere", "selective disorder inside a still-readable page"],
    bestFor: ["creator brands", "experimental commerce", "identity-led products", "anti-template launches"],
    avoidWhen: ["the page needs institutional trust first", "content has to feel calm or archival", "complex tasks already create cognitive load"],
    references: [
      { label: "Gumroad", href: "https://gumroad.com/" },
      { label: "Memphis Milano", href: "https://memphis.it/en/" },
      { label: "Wix: Brutalist Websites", href: "https://www.wix.com/blog/brutalist-websites" }
    ],
    prompt: "Use a playful postmodern anti-grid family: attitude-forward composition, bright accent punches, visible structure, and just enough disorder to feel alive without becoming messy."
  },
  {
    id: "neon-techno-futurist-interface",
    title: "Neon Techno-Futurist Interface",
    summary: "Dark-ground, neon-accent, worldbuilding-first pages that feel closer to game, hardware, or future-tech launch surfaces than to standard product pages.",
    ancestors: ["cyberpunk-techno-futurism"],
    structureIds: ["immersive-stage", "dossier"],
    samples: [
      { screenshot: "cyberpunk-net.png", alt: "Cyberpunk homepage", label: "Cyberpunk" },
      { screenshot: "razer.png", alt: "Razer homepage", label: "Razer" }
    ],
    signature: ["neon-on-dark contrast", "future-world mood", "glow as atmosphere", "dramatic hardware or scene framing"],
    borrow: ["dark-stage contrast", "controlled neon accents", "future-tech worldbuilding without losing hierarchy"],
    bestFor: ["gaming", "hardware launches", "immersive tech brands", "futurist campaign pages"],
    avoidWhen: ["quiet reading is the main task", "credibility depends on calm neutrality", "the content has to feel archival or scholarly"],
    references: [
      { label: "Cyberpunk", href: "https://www.cyberpunk.net/" },
      { label: "Razer", href: "https://www.razer.com/" },
      { label: "Britannica: Cyberpunk", href: "https://www.britannica.com/art/cyberpunk" }
    ],
    prompt: "Use a neon techno-futurist family: dark base, controlled neon accents, high-energy worldbuilding, and hierarchy that still stays legible inside a dramatic future-tech atmosphere."
  }
];

export const structurePatterns = [
  {
    id: "dossier",
    title: "Dossier / Feature",
    summary: "一条主叙事线，少量支线模块，适合完整讲清一个项目、品牌故事或长文专题。",
    suitedFor: ["case study", "manifesto", "feature article", "campaign story"],
    signals: ["clear opening claim", "chapter rhythm", "side notes", "measured scroll"],
    watchouts: ["不适合大量平级条目", "不适合复杂筛选"]
  },
  {
    id: "catalog-explorer",
    title: "Catalog Explorer",
    summary: "索引页负责分类和筛选，详情页负责完整解释。适合风格库、资源库、模板库和技能库。",
    suitedFor: ["style atlas", "resource directory", "template gallery", "prompt library"],
    signals: ["taxonomy", "filters", "card metadata", "stable detail pages"],
    watchouts: ["不要把所有解释塞进首页", "不要只有卡片没有分类逻辑"]
  },
  {
    id: "archive-stack",
    title: "Archive Stack",
    summary: "强调 series、issue、time、tag 的组织方式，像长期增长的档案而不是一次性 landing page。",
    suitedFor: ["publication archives", "historical collections", "cultural libraries", "notes archives"],
    signals: ["date or issue axes", "browse-first", "repeatable entry format"],
    watchouts: ["需要长期维护，不适合短期 campaign"]
  },
  {
    id: "network-graph",
    title: "Network Graph / Cluster",
    summary: "用关系、节点和聚类来组织内容，适合灵感收藏和知识网络。",
    suitedFor: ["idea boards", "inspiration systems", "curation tools", "research maps"],
    signals: ["clusters", "related paths", "non-linear exploration"],
    watchouts: ["入口解释必须足够好，否则容易迷路"]
  },
  {
    id: "workbench",
    title: "Workbench / Tool Shell",
    summary: "操作与状态优先的结构层，适合 AI 工具、后台、审批、多步骤执行。",
    suitedFor: ["agent tools", "dashboards", "workflow products", "operator consoles"],
    signals: ["state visibility", "panels", "logs", "action zones"],
    watchouts: ["不要伪装成纯杂志壳", "不要隐藏副作用和系统状态"]
  },
  {
    id: "immersive-stage",
    title: "Immersive Stage",
    summary: "体验优先的舞台式结构，通常只有少量关键信息，其余靠场景、动效、镜头感承载。",
    suitedFor: ["hero experiments", "interactive portfolios", "campaign showcases"],
    signals: ["scene-based interaction", "memorable reveal", "reduced information density"],
    watchouts: ["不要承载复杂信息架构", "要给用户明确退出和补充信息入口"]
  }
];

export const selectionMatrix = [
  {
    scenario: "设计风格聚合站 / 模板库 / 资源库",
    visual: "Curated Reference Directory",
    structure: "Catalog Explorer",
    note: "首页先做图像入口，详情页再把风格语法讲清楚。"
  },
  {
    scenario: "项目长文 / 作品说明 / 品牌故事",
    visual: "Magazine Editorial or Quiet Lifestyle Editorial",
    structure: "Dossier / Feature",
    note: "如果目标是让人读，而不是让人操作，用 dossier，而不是卡片堆满首页。"
  },
  {
    scenario: "AI 工具 / 产品官网 / 工作台",
    visual: "Product Precision Interface",
    structure: "Workbench / Tool Shell",
    note: "先做状态、计划和操作区，再谈情绪化风格。"
  },
  {
    scenario: "研究报告 / 数据故事 / 知识入口",
    visual: "Evidence-Dense Knowledge Surface",
    structure: "Archive Stack or Dossier",
    note: "图表、证据、结论和导览要一起设计。"
  },
  {
    scenario: "时尚 / 生活方式 / 文化品牌",
    visual: "Quiet Lifestyle Editorial",
    structure: "Dossier or light Catalog",
    note: "需要安静和质感，不需要过度的 SaaS 组件感。"
  },
  {
    scenario: "creator brand / anti-template launch",
    visual: "Playful Postmodern / Anti-Grid",
    structure: "Catalog Explorer or Immersive Stage",
    note: "重点是摆脱千篇一律，但结构仍然要可读。"
  },
  {
    scenario: "gaming / hardware / future-tech launch",
    visual: "Neon Techno-Futurist Interface",
    structure: "Immersive Stage",
    note: "世界观和能量感优先，但不能牺牲基本层级。"
  }
];

export const scoutSources = [
  {
    title: "SiteInspire",
    href: "https://siteinspire.com/",
    summary: "适合按行业、布局、风格快速找真实网站。作为第一轮广泛扫描很高效。",
    useFor: ["broad external scouting", "fast filtering by layout or industry"],
    avoid: "不要把单一截图当成最终 DNA，需要回到真实站点再看。"
  },
  {
    title: "Godly",
    href: "https://godly.website/",
    summary: "更适合找 art direction 强、视觉完成度高的 landing 和品牌页。",
    useFor: ["high art direction references", "visual direction when polish matters"],
    avoid: "不适合替代结构分析。"
  },
  {
    title: "Mobbin",
    href: "https://mobbin.com/",
    summary: "更适合产品流、界面模式、转化流程，不是纯视觉风格库。",
    useFor: ["app flows", "product patterns", "UI states"],
    avoid: "不适合找强品牌气质。"
  },
  {
    title: "Awwwards",
    href: "https://www.awwwards.com/",
    summary: "适合找行业顶级的 showcase 站和沉浸式体验站。",
    useFor: ["showcase sites", "motion-heavy experiments", "memorable hero references"],
    avoid: "不要把 award-site 的复杂动效直接搬进信息密集型产品。"
  },
  {
    title: "Hoverstat.es",
    href: "https://www.hoverstat.es/",
    summary: "适合专门看交互细节、hover、过渡、页面切换和微动效。",
    useFor: ["interaction detail scouting", "motion reference"],
    avoid: "只看动效不看结构会导致表面化。"
  },
  {
    title: "Pinterest",
    href: "https://www.pinterest.com/",
    summary: "只适合做宽松 moodboard，不适合直接决定网站结构和具体 UI。",
    useFor: ["moodboard", "color, material, editorial atmosphere"],
    avoid: "不要把 Pinterest 图钉拼贴当成网站 reference packet 的终稿。"
  }
];

export const readingSources = [
  {
    title: "Bauhaus100",
    href: "https://www.bauhaus100.de/en/",
    summary: "看功能主义和现代主义如何成为今天大量产品与系统型网页的深层来源。"
  },
  {
    title: "V&A · Art Deco, an introduction",
    href: "https://www.vam.ac.uk/articles/art-deco-an-introduction",
    summary: "理解奢华、流线、几何和舞台感如何在文化与品牌网站里回归。"
  },
  {
    title: "Cooper Hewitt · Swiss Style",
    href: "https://www.cooperhewitt.org/2015/06/11/design-dictionary-swiss-style/",
    summary: "给 Swiss 这一路提供更稳定的历史和形式背景。"
  },
  {
    title: "Google PAIR Guidebook",
    href: "https://pair.withgoogle.com/guidebook-v2/",
    summary: "对长期可复用的知识型设计站很有参考价值，尤其是 chapter、pattern、case study 的组织方式。"
  },
  {
    title: "Carbon for AI",
    href: "https://carbondesignsystem.com/guidelines/carbon-for-ai/",
    summary: "帮助区分视觉风格和 AI 产品中的行为、状态和 explainability 需求。"
  },
  {
    title: "Wix · Brutalist Websites",
    href: "https://www.wix.com/blog/brutalist-websites",
    summary: "用来区分 brutalist / neo-brutalist 在网页中的常见语法和误区。"
  }
];

export const promptBlocks = [
  {
    title: "Start With A Style Packet",
    body: "Before generating a site, pick one historical movement, one contemporary web family, one structure pattern, and 2-3 live reference websites. Write borrow and avoid for each."
  },
  {
    title: "Separate Movement From Family",
    body: "Do not say only 'make it Memphis' or 'make it editorial'. State one movement lineage and one web family separately. Example: 'Historical cue: Swiss. Web family: curated reference directory. Structure: catalog explorer.'"
  },
  {
    title: "Homepage Is A Doorway",
    body: "If the product is a style atlas, the homepage must set visual tone and route users into deeper pages. Do not try to teach the entire system in the first screen."
  },
  {
    title: "Use Real Sites, Not Only Moodboards",
    body: "Default to live websites and public references. Moodboards are useful for atmosphere, but production websites reveal the real constraints: navigation, density, image behavior, and CTA tone."
  }
];

const familyPatternMap = {
  "magazine-editorial": ["cover-led-editorial", "story-led-secondary-stack"],
  "quiet-lifestyle-editorial": ["cover-led-editorial", "calm-collector-catalog"],
  "swiss-typographic-grid": ["metadata-grid-index", "evidence-module-stack"],
  "product-precision-interface": ["product-demo-explainer", "evidence-module-stack"],
  "stage-driven-showcase": ["immersive-stage-scene", "product-demo-explainer"],
  "curated-reference-directory": ["thumbnail-directory-wall", "metadata-grid-index"],
  "evidence-dense-knowledge-surface": ["evidence-module-stack", "metadata-grid-index"],
  "playful-postmodern-anti-grid": ["anti-grid-attitude-board", "thumbnail-directory-wall"],
  "neon-techno-futurist-interface": ["immersive-stage-scene", "anti-grid-attitude-board"]
};

const movementTranslationMap = {
  "bauhaus-functional-modernism": [
    "Turn decoration into structure: modular sections, product diagrams, and typography that earns its place.",
    "Use geometry and reduction to support explanation, not just to make the page feel clean.",
    "Works best when the page needs operational clarity or system thinking."
  ],
  "art-deco-streamlined-luxury": [
    "Translate prestige through pacing, symmetry, and theatrical framing rather than obvious retro ornament.",
    "Use fewer, larger moments at the top so the page feels staged instead of crowded.",
    "Best when cultural or premium storytelling needs elegance before density."
  ],
  "swiss-international-typography": [
    "Make the grid visible through alignment, metadata, and stable spacing systems.",
    "Let labels, indexes, and navigation carry orientation so the interface can scale.",
    "Strong choice for archives, directories, and knowledge surfaces that need long-term clarity."
  ],
  "postmodern-memphis": [
    "Break template sameness with selective anti-grid tension, bold shape contrast, and expressive accents.",
    "Keep the information skeleton readable even when the surface feels playful or rebellious.",
    "Useful when identity and surprise matter more than institutional neutrality."
  ],
  "brutalism-neo-brutalism": [
    "Use hard edges, exposed borders, and intentional bluntness to reject polished sameness.",
    "Preserve scanning hierarchy so the page feels assertive, not careless.",
    "Best for anti-template launches, creator brands, and products with strong point of view."
  ],
  "cyberpunk-techno-futurism": [
    "Lead with atmosphere and worldbuilding, then layer hierarchy back in with disciplined contrast.",
    "Use dark-ground composition and controlled glow to stage immersion without losing navigation.",
    "Fits gaming, hardware, AI spectacle, and future-tech campaign moments."
  ]
};

const movementBestForMap = {
  "bauhaus-functional-modernism": ["product marketing", "design systems", "knowledge surfaces", "technical platforms"],
  "art-deco-streamlined-luxury": ["cultural publishing", "premium brands", "fashion storytelling", "hero-led launches"],
  "swiss-international-typography": ["archives", "reference libraries", "identity systems", "editorial indexes"],
  "postmodern-memphis": ["creator brands", "playful commerce", "template-breaking launches", "experimental catalogs"],
  "brutalism-neo-brutalism": ["identity-led products", "anti-template showcases", "creative tools", "attitude-heavy homepages"],
  "cyberpunk-techno-futurism": ["gaming", "hardware launches", "immersive AI pages", "future-tech campaigns"]
};

export const webPatterns = [
  {
    id: "cover-led-editorial",
    title: "Cover-Led Editorial Fold",
    summary: "One dominant lead image or story establishes tone immediately, with secondary stories queued beneath or beside it.",
    cues: ["lead image above the fold", "headline-image tension", "deck, byline, caption rhythm"],
    bestFor: ["magazine homepages", "feature-led brand publishing", "cultural portals"],
    familyIds: ["magazine-editorial", "quiet-lifestyle-editorial"],
    status: "live"
  },
  {
    id: "story-led-secondary-stack",
    title: "Story-Led Secondary Stack",
    summary: "After the first story, the page descends into an intentional stack of secondary entries instead of a generic feature grid.",
    cues: ["clear lead-to-secondary handoff", "editorial sequencing", "few items per band"],
    bestFor: ["publication homepages", "issue pages", "curated reading surfaces"],
    familyIds: ["magazine-editorial", "quiet-lifestyle-editorial"],
    status: "live"
  },
  {
    id: "thumbnail-directory-wall",
    title: "Thumbnail Directory Wall",
    summary: "A dense but legible sample field where thumbnails do the recruitment work and labels keep the browsing useful.",
    cues: ["many visible thumbnails", "category labels near the top", "quick scan into detail"],
    bestFor: ["style atlases", "inspiration libraries", "curated galleries"],
    familyIds: ["curated-reference-directory", "playful-postmodern-anti-grid"],
    status: "live"
  },
  {
    id: "metadata-grid-index",
    title: "Metadata Grid Index",
    summary: "The page behaves like an index: visible tags, stable card metadata, and strong typographic alignment do most of the organizing work.",
    cues: ["grid-first listing", "metadata as navigation", "strong alignment"],
    bestFor: ["archives", "directories", "knowledge indexes", "reference systems"],
    familyIds: ["swiss-typographic-grid", "curated-reference-directory", "evidence-dense-knowledge-surface"],
    status: "live"
  },
  {
    id: "product-demo-explainer",
    title: "Product Demo Explainer",
    summary: "Screenshots or staged scenes explain behavior or value, with copy framing the outcome and next action.",
    cues: ["hero screenshot or product scene", "benefit-led copy", "clear task hierarchy"],
    bestFor: ["product sites", "technical launches", "hero-led explainers"],
    familyIds: ["product-precision-interface", "stage-driven-showcase"],
    status: "live"
  },
  {
    id: "evidence-module-stack",
    title: "Evidence Module Stack",
    summary: "The page alternates thesis, evidence, and navigation in labeled modules so density stays trustworthy.",
    cues: ["section labels", "topic blocks", "evidence-led content modules"],
    bestFor: ["research hubs", "design systems", "docs-like homepages"],
    familyIds: ["evidence-dense-knowledge-surface", "swiss-typographic-grid", "product-precision-interface"],
    status: "live"
  },
  {
    id: "immersive-stage-scene",
    title: "Immersive Stage Scene",
    summary: "A single scene or atmosphere owns the top of the page, then hands off into deeper content with controlled exits.",
    cues: ["one dominant visual world", "sparse copy over imagery", "strong first-fold memory"],
    bestFor: ["campaigns", "film", "hardware", "future-tech launches"],
    familyIds: ["stage-driven-showcase", "neon-techno-futurist-interface"],
    status: "live"
  },
  {
    id: "anti-grid-attitude-board",
    title: "Anti-Grid Attitude Board",
    summary: "The page deliberately resists neutral polish with bold borders, shape friction, or louder contrast while keeping key reading paths intact.",
    cues: ["selective disorder", "visible outlines", "accent punches"],
    bestFor: ["creator brands", "experimental launches", "neo-brutalist or postmodern pages"],
    familyIds: ["playful-postmodern-anti-grid", "neon-techno-futurist-interface"],
    status: "watchlist"
  },
  {
    id: "calm-collector-catalog",
    title: "Calm Collector Catalog",
    summary: "A slower, quieter listing pattern where larger images, more whitespace, and fewer cards per row create a collectible tone.",
    cues: ["larger thumbnails", "quieter spacing", "low-urgency browsing"],
    bestFor: ["lifestyle brands", "fashion archives", "slow magazines"],
    familyIds: ["quiet-lifestyle-editorial"],
    status: "watchlist"
  }
];

export const heroGallery = heroWall.map((item) => ({
  screenshot: item.screenshot,
  alt: item.alt,
  label: item.label,
  note: item.meta,
  familyId: item.href.replace("/families/", ""),
  scale: item.size === "hero" ? "lead" : "standard"
}));

export const entryRoutes = browseModes.map((item) => ({
  ...item,
  meta: `${item.count} tracks`,
  href:
    item.id === "families"
      ? "/families"
      : item.id === "movements"
        ? "/movements"
        : "/#selection-matrix"
}));

for (const family of visualFamilies) {
  family.status ??= "live";
  family.cover ??= family.samples?.[0]?.screenshot || "";
  family.movementIds ??= family.ancestors ?? [];
  family.patternIds ??= familyPatternMap[family.id] ?? [];
}

for (const movement of historicalMovements) {
  movement.status ??= "live";
  movement.era ??= movement.period;
  movement.familyIds ??= movement.webFamilyIds ?? [];
  movement.principles ??= movement.signatures ?? [];
  movement.webTranslation ??= movementTranslationMap[movement.id] ?? [movement.whyItMatters];
  movement.bestFor ??= movementBestForMap[movement.id] ?? [];
  movement.watchouts ??= movement.watchFor ?? [];
}

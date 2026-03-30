export const browseModeMeta = {
  movements: { zh: "历史流派", en: "Historical Movements" },
  families: { zh: "网页家族", en: "Web Families" },
  "use-cases": { zh: "使用场景", en: "Use Cases" }
};

export const familyMeta = {
  "magazine-editorial": { zh: "杂志特稿型", en: "Magazine Editorial" },
  "quiet-lifestyle-editorial": { zh: "静奢生活方式型", en: "Quiet Lifestyle Editorial" },
  "swiss-typographic-grid": { zh: "瑞士排印网格型", en: "Swiss Typographic Grid" },
  "monochrome-studio-systems": { zh: "黑白工作室系统型", en: "Monochrome Studio Systems" },
  "product-precision-interface": { zh: "精密产品界面型", en: "Product Precision Interface" },
  "stage-driven-showcase": { zh: "舞台叙事展示型", en: "Stage-Driven Showcase" },
  "curated-reference-directory": { zh: "策展目录索引型", en: "Curated Reference Directory" },
  "evidence-dense-knowledge-surface": { zh: "证据密集知识型", en: "Evidence-Dense Knowledge Surface" },
  "playful-postmodern-anti-grid": { zh: "后现代反网格型", en: "Playful Postmodern / Anti-Grid" },
  "neon-techno-futurist-interface": { zh: "霓虹未来科技型", en: "Neon Techno-Futurist Interface" }
};

export const structureMeta = {
  dossier: { zh: "专题长文型", en: "Dossier / Feature" },
  "catalog-explorer": { zh: "目录索引型", en: "Catalog Explorer" },
  "archive-stack": { zh: "档案堆栈型", en: "Archive Stack" },
  "network-graph": { zh: "关系网络型", en: "Network Graph / Cluster" },
  workbench: { zh: "工作台型", en: "Workbench / Tool Shell" },
  "immersive-stage": { zh: "沉浸舞台型", en: "Immersive Stage" }
};

export const useCaseMeta = {
  "style-atlas-reference-library": { zh: "风格图谱与参考库", en: "Style Atlas / Reference Library" },
  "cultural-publishing": { zh: "文化出版首页", en: "Cultural Publishing / Editorial Front Page" },
  "design-studio-identity-portfolio": { zh: "设计工作室与识别作品集", en: "Design Studio / Identity Portfolio" },
  "product-tool-platform": { zh: "产品与工具平台", en: "Product / Tool / Platform" },
  "research-knowledge-system": { zh: "研究与知识系统", en: "Research / Knowledge System" },
  "premium-lifestyle-brand": { zh: "高级生活方式品牌", en: "Premium Lifestyle / Cultural Brand" },
  "creator-anti-template-launch": { zh: "创作者反模板发布", en: "Creator / Anti-Template Launch" },
  "gaming-hardware-future-tech": { zh: "游戏硬件未来科技发布", en: "Gaming / Hardware / Future-Tech Launch" }
};

export const movementMeta = {
  "bauhaus-functional-modernism": { zh: "包豪斯", en: "Bauhaus", webFit: "strong" },
  "art-deco-streamlined-luxury": { zh: "装饰艺术", en: "Art Deco", webFit: "medium" },
  "swiss-international-typography": {
    zh: "瑞士风格",
    en: "Swiss Style",
    webFit: "strong"
  },
  "postmodern-memphis": { zh: "后现代 / 孟菲斯", en: "Postmodern / Memphis", webFit: "medium" },
  "brutalism-neo-brutalism": { zh: "粗野主义 / 新粗野主义", en: "Brutalism / Neo-Brutalism", webFit: "medium" },
  "cyberpunk-techno-futurism": { zh: "赛博朋克 / 科技未来", en: "Cyberpunk / Techno-Futurism", webFit: "medium" },
  "arts-and-crafts": { zh: "工艺美术运动", en: "Arts and Crafts", webFit: "medium" },
  "art-nouveau": { zh: "新艺术运动", en: "Art Nouveau", webFit: "medium" },
  futurism: { zh: "未来主义", en: "Futurism", webFit: "medium" },
  dada: { zh: "达达主义", en: "Dada", webFit: "weak" },
  suprematism: { zh: "至上主义", en: "Suprematism", webFit: "medium" },
  constructivism: { zh: "构成主义", en: "Constructivism", webFit: "strong" },
  "de-stijl": { zh: "风格派", en: "De Stijl", webFit: "strong" },
  "new-typography": { zh: "新字体排印", en: "New Typography", webFit: "strong" },
  "mid-century-modern": { zh: "世纪中期现代主义", en: "Mid-Century Modern", webFit: "strong" },
  "pop-art": { zh: "波普艺术", en: "Pop Art", webFit: "medium" },
  minimalism: { zh: "极简主义", en: "Minimalism", webFit: "strong" }
};

export const extraHistoricalMovements = [
  {
    id: "arts-and-crafts",
    titleZh: "工艺美术运动",
    titleEn: "Arts and Crafts",
    period: "1860s-1900",
    origin: "United Kingdom",
    summary: "反工业粗制滥造，强调材料诚实、手工感与日常器物之美。",
    whyItMatters: "适合解释今天很多纸本感、材质感、慢生活与工艺品牌网站的深层来源。",
    signatures: ["材料诚实", "手工痕迹", "质朴日常", "工艺美学"],
    watchFor: ["容易被做成单纯复古滤镜", "手作气质不等于信息结构松散"],
    webFamilyIds: ["quiet-lifestyle-editorial", "curated-reference-directory"],
    samples: [
      { screenshot: "kinfolk-live.png", alt: "Kinfolk homepage", label: "Kinfolk" },
      { screenshot: "monocle.png", alt: "Monocle homepage", label: "Monocle" }
    ],
    references: [
      { label: "Britannica: Arts and Crafts movement", href: "https://www.britannica.com/art/Arts-and-Crafts-movement" }
    ],
    webFit: "medium"
  },
  {
    id: "art-nouveau",
    titleZh: "新艺术运动",
    titleEn: "Art Nouveau",
    period: "1890-1910",
    origin: "Europe",
    summary: "用植物般曲线、装饰性线条和整体设计把视觉做成一体化生命形态。",
    whyItMatters: "适合解释今天一些时尚、文化、电影和高感知品牌网站里的装饰性线条与有机曲线。",
    signatures: ["有机曲线", "整体装饰", "植物感线条", "流动图形"],
    watchFor: ["容易过度装饰", "不适合高频操作型界面"],
    webFamilyIds: ["quiet-lifestyle-editorial", "stage-driven-showcase"],
    samples: [
      { screenshot: "mubi.png", alt: "MUBI homepage", label: "MUBI" },
      { screenshot: "gentlewoman.png", alt: "The Gentlewoman homepage", label: "The Gentlewoman" }
    ],
    references: [
      { label: "V&A: Art Nouveau", href: "https://www.vam.ac.uk/articles/art-nouveau-an-international-style" }
    ],
    webFit: "medium"
  },
  {
    id: "futurism",
    titleZh: "未来主义",
    titleEn: "Futurism",
    period: "1909-1916",
    origin: "Italy",
    summary: "崇尚速度、机械、都市动势，把现代性做成冲击力和推进感。",
    whyItMatters: "适合理解今天一些速度感、科技感、硬件感网页的动态倾向。",
    signatures: ["速度崇拜", "机械都市", "动势构图", "推进感"],
    watchFor: ["容易做成纯速度海报", "叙事太强会压过内容层级"],
    webFamilyIds: ["neon-techno-futurist-interface", "stage-driven-showcase"],
    samples: [
      { screenshot: "razer.png", alt: "Razer homepage", label: "Razer" },
      { screenshot: "cyberpunk-net.png", alt: "Cyberpunk homepage", label: "Cyberpunk" }
    ],
    references: [{ label: "Britannica: Futurism", href: "https://www.britannica.com/art/Futurism" }],
    webFit: "medium"
  },
  {
    id: "dada",
    titleZh: "达达主义",
    titleEn: "Dada",
    period: "1916-1924",
    origin: "Europe / New York",
    summary: "用拼贴、偶然、反秩序和讽刺去拆解既有规则。",
    whyItMatters: "适合解释一些拼贴、反规则、非正统的实验网页语言，但更适合作为灵感层而不是主系统。",
    signatures: ["拼贴", "反秩序", "讽刺", "偶然性"],
    watchFor: ["最容易变成噪音", "不适合默认整站语言"],
    webFamilyIds: ["playful-postmodern-anti-grid"],
    samples: [
      { screenshot: "gumroad-live.png", alt: "Gumroad homepage", label: "Gumroad" },
      { screenshot: "arena-live.png", alt: "Arena homepage", label: "Arena" }
    ],
    references: [{ label: "Britannica: Dada", href: "https://www.britannica.com/art/Dada" }],
    webFit: "weak"
  },
  {
    id: "suprematism",
    titleZh: "至上主义",
    titleEn: "Suprematism",
    period: "1913-1919",
    origin: "Russia",
    summary: "把视觉压缩为纯几何与有限色彩，追求非再现的绝对感受。",
    whyItMatters: "适合解释今天一些几何抽象、强留白、少元素系统里的极端抽象倾向。",
    signatures: ["纯几何", "极度抽象", "有限色彩", "非再现"],
    watchFor: ["容易被简化成只剩几何图形", "需要和真实信息结构结合"],
    webFamilyIds: ["swiss-typographic-grid", "product-precision-interface"],
    samples: [
      { screenshot: "studio-feixen.png", alt: "Studio Feixen homepage", label: "Studio Feixen" },
      { screenshot: "pentagram.png", alt: "Pentagram homepage", label: "Pentagram" }
    ],
    references: [{ label: "Britannica: Suprematism", href: "https://www.britannica.com/art/Suprematism" }],
    webFit: "medium"
  },
  {
    id: "constructivism",
    titleZh: "构成主义",
    titleEn: "Constructivism",
    period: "1913-1930s",
    origin: "Russia / Soviet Union",
    summary: "把艺术当成构造与工程，强调几何、功能、生产与传播效率。",
    whyItMatters: "它是很多功能主义、宣传性、几何构图和高效率信息网页的强祖先之一。",
    signatures: ["工程感", "传播效率", "几何构图", "功能优先"],
    watchFor: ["容易被做成政治海报模仿", "形式感不能压过真实可读性"],
    webFamilyIds: ["swiss-typographic-grid", "product-precision-interface", "curated-reference-directory"],
    samples: [
      { screenshot: "stripe.png", alt: "Stripe homepage", label: "Stripe" },
      { screenshot: "pentagram.png", alt: "Pentagram homepage", label: "Pentagram" }
    ],
    references: [{ label: "Britannica: Constructivism", href: "https://www.britannica.com/art/Constructivism-art" }],
    webFit: "strong"
  },
  {
    id: "de-stijl",
    titleZh: "风格派",
    titleEn: "De Stijl",
    period: "1917-1932",
    origin: "Netherlands",
    summary: "以垂直与水平、主色和留白寻找秩序、均衡与普遍性。",
    whyItMatters: "适合解释很多高秩序、强边界、抽象色块和现代网格系统的深层来源。",
    signatures: ["垂直水平", "主色留白", "秩序均衡", "抽象网格"],
    watchFor: ["容易只剩 Mondrian 色块", "不能只学颜色不学秩序"],
    webFamilyIds: ["swiss-typographic-grid", "product-precision-interface"],
    samples: [
      { screenshot: "studio-feixen.png", alt: "Studio Feixen homepage", label: "Studio Feixen" },
      { screenshot: "pentagram.png", alt: "Pentagram homepage", label: "Pentagram" }
    ],
    references: [{ label: "Britannica: De Stijl", href: "https://www.britannica.com/topic/De-Stijl-art" }],
    webFit: "strong"
  },
  {
    id: "new-typography",
    titleZh: "新字体排印",
    titleEn: "New Typography",
    period: "1920s-1930s",
    origin: "Europe",
    summary: "以非对称排版、空白场和摄影/版面组织信息清晰度。",
    whyItMatters: "对今天的 editorial、Swiss、知识型网站都非常关键，它比单纯“极简”更接近真正的信息设计。",
    signatures: ["非对称排版", "空白场", "摄影与版面协同", "信息清晰度"],
    watchFor: ["不能误解成只用无衬线", "节奏和对齐比字体更重要"],
    webFamilyIds: ["swiss-typographic-grid", "magazine-editorial", "evidence-dense-knowledge-surface"],
    samples: [
      { screenshot: "frieze.png", alt: "Frieze homepage", label: "Frieze" },
      { screenshot: "pentagram.png", alt: "Pentagram homepage", label: "Pentagram" }
    ],
    references: [{ label: "MoMA: The New Typography", href: "https://www.moma.org/magazine/articles/640" }],
    webFit: "strong"
  },
  {
    id: "pop-art",
    titleZh: "波普艺术",
    titleEn: "Pop Art",
    period: "late 1950s-1960s",
    origin: "United Kingdom / United States",
    summary: "把广告、漫画与消费图像变成高识别、高对比的文化表面。",
    whyItMatters: "适合解释今天高饱和、流行文化、商品化和强识别的视觉网页语言。",
    signatures: ["高对比", "消费图像", "漫画广告", "文化表面"],
    watchFor: ["容易只剩颜色和玩笑", "不适合需要克制信任感的页面"],
    webFamilyIds: ["playful-postmodern-anti-grid", "stage-driven-showcase"],
    samples: [
      { screenshot: "gumroad-live.png", alt: "Gumroad homepage", label: "Gumroad" },
      { screenshot: "behance.png", alt: "Behance homepage", label: "Behance" }
    ],
    references: [{ label: "Britannica: Pop Art", href: "https://www.britannica.com/art/Pop-art" }],
    webFit: "medium"
  },
  {
    id: "mid-century-modern",
    titleZh: "世纪中期现代主义",
    titleEn: "Mid-Century Modern",
    period: "mid-1940s-1960s",
    origin: "United States / Europe",
    summary: "以轻盈比例、功能家具感、开放空间和现代日常感建立一种温和而清晰的现代性。",
    whyItMatters: "它解释了今天很多生活方式、高级品牌和产品型网站里那种克制、现代、亲和但不冷淡的气质。",
    signatures: ["现代日常", "轻盈比例", "功能与舒适并重", "开放空间感"],
    watchFor: ["容易被误做成单纯复古家居风", "不应只剩木色与怀旧滤镜"],
    webFamilyIds: ["quiet-lifestyle-editorial", "monochrome-studio-systems", "product-precision-interface", "evidence-dense-knowledge-surface"],
    samples: [
      { screenshot: "apple-macbook.png", alt: "Apple MacBook Pro page", label: "Apple MacBook Pro" },
      { screenshot: "kinfolk-live.png", alt: "Kinfolk homepage", label: "Kinfolk" }
    ],
    references: [
      { label: "Britannica: Mid-Century Modern design", href: "https://www.britannica.com/art/mid-century-modern-design" }
    ],
    webFit: "strong"
  },
  {
    id: "minimalism",
    titleZh: "极简主义",
    titleEn: "Minimalism",
    period: "1960s-1970s",
    origin: "United States / Europe",
    summary: "把形式削减到最少元素，让结构、比例与重复本身发声。",
    whyItMatters: "今天很多高级感、安静感、科技感网站，都在不同程度上借极简主义建立秩序与克制。",
    signatures: ["元素最少化", "比例关系", "重复秩序", "结构自明"],
    watchFor: ["不要把空白误当成完成度", "简不等于信息不足"],
    webFamilyIds: ["quiet-lifestyle-editorial", "monochrome-studio-systems", "evidence-dense-knowledge-surface", "product-precision-interface"],
    samples: [
      { screenshot: "signal-a-studio.png", alt: "Signal-A Studio homepage", label: "Signal-A Studio" },
      { screenshot: "ok-rm.png", alt: "OK-RM homepage", label: "OK-RM" },
      { screenshot: "apple-macbook.png", alt: "Apple MacBook Pro page", label: "Apple MacBook Pro" }
    ],
    references: [{ label: "Britannica: Minimalism", href: "https://www.britannica.com/art/Minimalism-art" }],
    webFit: "strong"
  }
];

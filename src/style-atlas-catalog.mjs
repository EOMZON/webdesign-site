export const designSkillsRepoHref = "https://github.com/EOMZON/design-skills";

function liveReference(screenshot, label, href, note, alt = `${label} screenshot`) {
  return {
    screenshot,
    label,
    href,
    note,
    alt
  };
}

export const extraStyleSources = [
  {
    id: "luxury-fashion-editorial",
    title: "Luxury Fashion Editorial",
    titleZh: "时尚奢刊",
    titleEn: "Luxury Fashion Editorial",
    summary:
      "Glossy, fashion-forward editorial pages where prestige comes from image cropping, cadence, and contrast rather than loud interfaces.",
    summaryZh: "更偏时尚与奢刊的编辑型页面，靠图像裁切、节奏和气质建立高级感，而不是靠复杂组件堆叠。",
    ancestors: ["art-deco-streamlined-luxury", "art-nouveau"],
    movementIds: ["art-deco-streamlined-luxury", "art-nouveau"],
    structureIds: ["dossier", "immersive-stage"],
    samples: [
      { screenshot: "tmagazine.png", alt: "T Magazine homepage", label: "T Magazine" },
      { screenshot: "gentlewoman.png", alt: "The Gentlewoman homepage", label: "The Gentlewoman" },
      { screenshot: "frieze.png", alt: "Frieze homepage", label: "Frieze" }
    ],
    references: [
      { label: "T Magazine", href: "https://www.nytimes.com/section/t-magazine" },
      { label: "The Gentlewoman", href: "https://thegentlewoman.co.uk/" },
      { label: "Frieze", href: "https://www.frieze.com/" }
    ],
    prompt:
      "Use a luxury fashion editorial family: strong crop-led imagery, quiet prestige, serif-led hierarchy, sparse navigation chrome, and section pacing that feels like an issue rather than a feed."
  },
  {
    id: "humanist-modern-brand",
    title: "Humanist Modern Brand",
    titleZh: "人文现代",
    titleEn: "Humanist Modern Brand",
    summary:
      "Warm modernist pages that stay clean and structured, but feel human, domestic, and less severe than a strict Swiss or product system.",
    summaryZh: "更温和的人文现代页面，依然干净有结构，但比严格瑞士或工具产品页更有人味、更像现代生活方式品牌。",
    ancestors: ["mid-century-modern", "arts-and-crafts"],
    movementIds: ["mid-century-modern", "arts-and-crafts"],
    structureIds: ["catalog-explorer", "dossier"],
    samples: [
      { screenshot: "apple-macbook.png", alt: "Apple MacBook Pro page", label: "Apple MacBook Pro" },
      { screenshot: "monocle.png", alt: "Monocle homepage", label: "Monocle" },
      { screenshot: "kinfolk-live.png", alt: "Kinfolk homepage", label: "Kinfolk" }
    ],
    references: [
      { label: "Apple MacBook Pro", href: "https://www.apple.com/macbook-pro/" },
      { label: "Monocle", href: "https://monocle.com/" },
      { label: "Kinfolk", href: "https://kinfolk.com/" }
    ],
    prompt:
      "Use a humanist modern family: warm modern proportions, clear spacing, restrained typography, image-led calm, and product or brand framing that feels human rather than cold."
  },
  {
    id: "dark-studio-gallery",
    title: "Dark Studio Gallery",
    titleZh: "暗色画廊",
    titleEn: "Dark Studio Gallery",
    summary:
      "Image-first dark studio pages where selected work, cropped project stills, and restrained captions do more of the persuasion than long explanation.",
    summaryZh: "更偏黑底图像画廊的工作室页面，靠作品切片、克制标题和 Selected Work 节奏建立说服力，而不是靠长段落先解释自己。",
    ancestors: ["swiss-international-typography", "brutalism-neo-brutalism"],
    movementIds: ["swiss-international-typography", "brutalism-neo-brutalism"],
    structureIds: ["catalog-explorer", "immersive-stage"],
    samples: [
      { screenshot: "fictivekin-work.png", alt: "Fictive Kin work page", label: "Fictive Kin / Work" },
      { screenshot: "studio-feixen.png", alt: "Studio Feixen homepage", label: "Studio Feixen" },
      { screenshot: "ok-rm.png", alt: "OK-RM homepage", label: "OK-RM" }
    ],
    references: [
      { label: "Fictive Kin / Work", href: "https://fictivekin.com/work" },
      { label: "Studio Feixen", href: "https://www.studiofeixen.ch/" },
      { label: "OK-RM", href: "https://www.ok-rm.co.uk/" }
    ],
    prompt:
      "Use a dark studio gallery family: image-first project tiles, restrained monochrome typography, sparse captions, and a selected-work rhythm that feels like a curated studio wall rather than a generic portfolio template."
  },
  {
    id: "brutalist-raw-interface",
    title: "Brutalist Raw Interface",
    titleZh: "粗野直给",
    titleEn: "Brutalist Raw Interface",
    summary:
      "Hard-edged web pages that feel direct, declarative, and slightly anti-polish, relying on border, contrast, and attitude rather than refinement.",
    summaryZh: "更硬、更直给、更像宣言或海报化网页的反精致方向，靠边框、对比和不讨好建立态度，而不是靠细腻润色。",
    ancestors: ["brutalism-neo-brutalism", "postmodern-memphis"],
    movementIds: ["brutalism-neo-brutalism", "postmodern-memphis"],
    structureIds: ["immersive-stage", "catalog-explorer"],
    samples: [
      { screenshot: "gumroad-live.png", alt: "Gumroad homepage", label: "Gumroad" },
      { screenshot: "bureau-borsche.png", alt: "Bureau Borsche homepage", label: "Bureau Borsche" },
      { screenshot: "memphis-milano.png", alt: "Memphis Milano homepage", label: "Memphis Milano" }
    ],
    references: [
      { label: "Gumroad", href: "https://gumroad.com/" },
      { label: "Bureau Borsche", href: "https://bureauborsche.com/" },
      { label: "Memphis Milano", href: "https://memphis.it/en/" }
    ],
    prompt:
      "Use a brutalist raw interface family: hard borders, assertive contrast, visible structure, little polish, and enough attitude to break away from safe template aesthetics without losing readability."
  },
  {
    id: "creative-media-editorial",
    title: "Creative Media Editorial",
    titleZh: "创意媒体",
    titleEn: "Creative Media Editorial",
    summary:
      "Editorial media homepages that sit between a magazine cover and a live content feed, balancing strong imagery with frequent updates and scanning speed.",
    summaryZh: "介于杂志封面和内容 feed 之间的创意媒体首页，既要有图像张力，也要有持续更新时的浏览效率。",
    ancestors: ["new-typography", "swiss-international-typography", "art-deco-streamlined-luxury"],
    movementIds: ["new-typography", "swiss-international-typography", "art-deco-streamlined-luxury"],
    structureIds: ["archive-stack", "dossier"],
    samples: [
      { screenshot: "itsnicethat-live.png", alt: "It's Nice That homepage", label: "It's Nice That" },
      { screenshot: "frieze.png", alt: "Frieze homepage", label: "Frieze" },
      { screenshot: "newyorker.png", alt: "The New Yorker homepage", label: "The New Yorker" }
    ],
    references: [
      { label: "It's Nice That", href: "https://www.itsnicethat.com/" },
      { label: "Frieze", href: "https://www.frieze.com/" },
      { label: "The New Yorker", href: "https://www.newyorker.com/" }
    ],
    prompt:
      "Use a creative media editorial family: a strong lead image or story block, visible section rhythm, live publishing cadence, and enough structure to support frequent updates without losing voice."
  },
  {
    id: "template-market-library",
    title: "Template Market Library",
    titleZh: "模板市场",
    titleEn: "Template Market Library",
    summary:
      "Conversion-aware template and starter-kit libraries that mix screenshot-first browsing, taxonomy, and obvious actions without collapsing into generic SaaS landing pages.",
    summaryZh: "更偏模板库、starter kit 和资源市场的浏览形态，既有高密度索引，也有明确的转化入口，但不该退化成普通 SaaS 落地页。",
    ancestors: ["bauhaus-functional-modernism", "swiss-international-typography"],
    movementIds: ["bauhaus-functional-modernism", "swiss-international-typography"],
    structureIds: ["catalog-explorer", "workbench"],
    samples: [
      { screenshot: "notion-templates-live.png", alt: "Notion templates page", label: "Notion Templates" },
      { screenshot: "awwwards-websites-live.png", alt: "Awwwards websites directory", label: "Awwwards" },
      { screenshot: "siteinspire-live.png", alt: "SiteInspire homepage", label: "SiteInspire" }
    ],
    references: [
      { label: "Notion Templates", href: "https://www.notion.com/templates" },
      { label: "One Page Love", href: "https://onepagelove.com/" },
      { label: "Minimal Gallery", href: "https://minimal.gallery/" },
      { label: "Land-book", href: "https://land-book.com/" }
    ],
    prompt:
      "Use a template market library family: screenshot-led cards, obvious category filters, clear conversion actions, and a browse-to-detail rhythm that helps users compare, decide, and take the asset quickly."
  },
  {
    id: "networked-visual-board",
    title: "Networked Visual Board",
    titleZh: "灵感看板",
    titleEn: "Networked Visual Board",
    summary:
      "Reference boards and inspiration systems that feel like a living visual database, where cards, tags, and relationships matter as much as the first screenshot.",
    summaryZh: "更像灵感看板、研究地图和视觉数据库的浏览系统，卡片、标签与关联路径和首图一样重要。",
    ancestors: ["dada", "postmodern-memphis", "swiss-international-typography"],
    movementIds: ["dada", "postmodern-memphis", "swiss-international-typography"],
    structureIds: ["network-graph", "catalog-explorer"],
    samples: [
      { screenshot: "arena-home-live.png", alt: "Are.na homepage", label: "Are.na" },
      { screenshot: "behance.png", alt: "Behance homepage", label: "Behance" },
      { screenshot: "siteinspire-live.png", alt: "SiteInspire homepage", label: "SiteInspire" }
    ],
    references: [
      { label: "Are.na", href: "https://www.are.na/" },
      { label: "Behance", href: "https://www.behance.net/" },
      { label: "Fonts In Use", href: "https://fontsinuse.com/" },
      { label: "Godly", href: "https://godly.website/" }
    ],
    prompt:
      "Use a networked visual board family: a living card field, tag-driven paths, cross-links between references, and a layout that supports collecting, comparing, and revisiting rather than just presenting one hero story."
  },
  {
    id: "institutional-program-grid",
    title: "Institutional Program Grid",
    titleZh: "机构项目网格",
    titleEn: "Institutional Program Grid",
    summary:
      "Quiet institutional websites that need to hold programs, events, calls, archives, and identity in the same grid without becoming generic editorial homepages.",
    summaryZh: "更像文化机构、研究机构、学校项目站或节展主页的网格型页面，要同时承载 program、活动、申请入口和档案，而不是退化成普通工作室首页。",
    ancestors: ["swiss-international-typography", "new-typography", "bauhaus-functional-modernism"],
    movementIds: ["swiss-international-typography", "new-typography", "bauhaus-functional-modernism"],
    structureIds: ["archive-stack", "catalog-explorer"],
    samples: [
      { screenshot: "swiss-institute.png", alt: "Swiss Institute homepage", label: "Swiss Institute" },
      { screenshot: "frieze.png", alt: "Frieze homepage", label: "Frieze" },
      { screenshot: "pentagram.png", alt: "Pentagram homepage", label: "Pentagram" }
    ],
    references: [
      { label: "Swiss Institute", href: "https://www.swissinstitute.net/" },
      { label: "Frieze", href: "https://www.frieze.com/" },
      { label: "Pentagram", href: "https://www.pentagram.com/" }
    ],
    prompt:
      "Use an institutional program grid family: quiet grid-based layout, cultural-program rhythm, clear date or program entry points, restrained typography, and a homepage that balances institution identity with live programming rather than hero-led marketing."
  },
  {
    id: "report-storytelling-narrative",
    title: "Report Storytelling Narrative",
    titleZh: "报告叙事",
    titleEn: "Report Storytelling Narrative",
    summary:
      "Long-form report pages where the page tells a case, argument, or impact story through chapters, charts, evidence blocks, and editorial pacing.",
    summaryZh: "更像研究专题、年度报告、影响力报告和结论驱动长文的页面家族，用章节、图表、证据模块和滚动节奏把故事讲清楚。",
    ancestors: ["new-typography", "swiss-international-typography", "bauhaus-functional-modernism"],
    movementIds: ["new-typography", "swiss-international-typography", "bauhaus-functional-modernism"],
    structureIds: ["dossier", "archive-stack"],
    samples: [
      { screenshot: "pair-guidebook.png", alt: "People + AI Guidebook page", label: "People + AI Guidebook" },
      { screenshot: "ourworldindata-live.png", alt: "Our World in Data homepage", label: "Our World in Data" },
      { screenshot: "carbon-for-ai.png", alt: "Carbon for AI page", label: "Carbon for AI" }
    ],
    references: [
      { label: "People + AI Guidebook", href: "https://pair.withgoogle.com/guidebook-v2/" },
      { label: "Our World in Data", href: "https://ourworldindata.org/" },
      { label: "Carbon for AI", href: "https://carbondesignsystem.com/guidelines/carbon-for-ai/" }
    ],
    prompt:
      "Use a report storytelling family: lead with the conclusion, pace the page in chapters, integrate charts or screenshots as evidence, and keep the reading flow strong enough for a long-form report rather than a reference index."
  },
  {
    id: "developer-infrastructure-aura",
    title: "Developer Infrastructure Aura",
    titleZh: "开发者平台",
    titleEn: "Developer Infrastructure Aura",
    summary:
      "Platform websites for developer tools, cloud services, and AI infrastructure where trust, performance, docs adjacency, and ecosystem credibility matter as much as feature marketing.",
    summaryZh: "更像云平台、开发者工具、API 平台和 AI 基础设施官网的当代网页语言，关键不是普通 SaaS 营销，而是可信感、性能叙事、文档邻接和生态证明。",
    ancestors: ["bauhaus-functional-modernism", "swiss-international-typography", "minimalism"],
    movementIds: ["bauhaus-functional-modernism", "swiss-international-typography", "minimalism"],
    structureIds: ["workbench", "dossier"],
    samples: [
      { screenshot: "vercel.png", alt: "Vercel homepage", label: "Vercel" },
      { screenshot: "stripe.png", alt: "Stripe homepage", label: "Stripe" },
      { screenshot: "linear.png", alt: "Linear homepage", label: "Linear" }
    ],
    references: [
      { label: "Vercel", href: "https://vercel.com/" },
      { label: "Stripe", href: "https://stripe.com/" },
      { label: "Linear", href: "https://linear.app/" }
    ],
    prompt:
      "Use a developer infrastructure family: dark or near-black platform atmosphere, crisp product trust signals, code-neighboring layout, performance language, ecosystem proof, and documentation adjacency without turning into generic SaaS marketing."
  },
  {
    id: "industrial-hardware-minimal",
    title: "Industrial Hardware Minimal",
    titleZh: "工业硬件极简",
    titleEn: "Industrial Hardware Minimal",
    summary:
      "Object-first hardware and industrial product pages that rely on material, silhouette, and sparse explanation instead of neon spectacle or content-heavy storytelling.",
    summaryZh: "更偏消费电子、设备单品和工业设计品牌的极简家族，让物体、材质和控制得很克制的说明成为主角，而不是霓虹未来感或长篇叙事。",
    ancestors: ["mid-century-modern", "minimalism", "futurism"],
    movementIds: ["mid-century-modern", "minimalism", "futurism"],
    structureIds: ["immersive-stage", "dossier"],
    samples: [
      { screenshot: "apple-macbook.png", alt: "Apple MacBook Pro page", label: "Apple MacBook Pro" },
      { screenshot: "xbox-series-x-live.png", alt: "Xbox Series X homepage", label: "Xbox Series X" },
      { screenshot: "playstation-ps5-live.png", alt: "PlayStation 5 homepage", label: "PlayStation 5" }
    ],
    references: [
      { label: "Apple MacBook Pro", href: "https://www.apple.com/macbook-pro/" },
      { label: "Xbox Series X", href: "https://www.xbox.com/en-US/consoles/xbox-series-x" },
      { label: "PlayStation 5", href: "https://www.playstation.com/en-us/ps5/" }
    ],
    prompt:
      "Use an industrial hardware minimal family: object-first product photography, controlled industrial whitespace, sparse copy, precise spec highlights, and a calm futuristic tone without neon overload."
  },
  {
    id: "experimental-typographic-poster",
    title: "Experimental Typographic Poster",
    titleZh: "排印海报实验",
    titleEn: "Experimental Typographic Poster",
    summary:
      "Typography-led cultural pages where type, scale, and composition do the job of a hero image, closer to a poster system or exhibition identity than a normal brand homepage.",
    summaryZh: "更像设计活动、展览专题、文化 campaign 和实验工作室首页的排印型家族，字体和版面本身就是主视觉，不需要靠普通产品 hero 讲故事。",
    ancestors: ["new-typography", "postmodern-memphis", "dada"],
    movementIds: ["new-typography", "postmodern-memphis", "dada"],
    structureIds: ["immersive-stage", "dossier"],
    samples: [
      { screenshot: "studio-feixen.png", alt: "Studio Feixen homepage", label: "Studio Feixen" },
      { screenshot: "bureau-borsche.png", alt: "Bureau Borsche homepage", label: "Bureau Borsche" },
      { screenshot: "pentagram.png", alt: "Pentagram homepage", label: "Pentagram" }
    ],
    references: [
      { label: "Studio Feixen", href: "https://www.studiofeixen.ch/" },
      { label: "Bureau Borsche", href: "https://bureauborsche.com/" },
      { label: "Pentagram", href: "https://www.pentagram.com/" }
    ],
    prompt:
      "Use an experimental typographic poster family: typography as the hero image, controlled poster-like tension, cultural-program energy, layered scale changes, and enough structure to stay readable while still feeling like a designed event surface."
  },
  {
    id: "editorial-commerce-catalog",
    title: "Editorial Commerce Catalog",
    titleZh: "编辑商店",
    titleEn: "Editorial Commerce Catalog",
    summary:
      "Issue-like brand websites that blend stories, products, magazines, memberships, and curated objects without feeling like plain ecommerce.",
    summaryZh: "更像内容品牌、设计商店、刊物目录和精选物件零售混合在一起的家族，内容和商品并列出现，但整体仍保持刊物感和品牌调性。",
    ancestors: ["arts-and-crafts", "mid-century-modern", "art-deco-streamlined-luxury"],
    movementIds: ["arts-and-crafts", "mid-century-modern", "art-deco-streamlined-luxury"],
    structureIds: ["catalog-explorer", "dossier"],
    samples: [
      { screenshot: "gentlewoman-live.png", alt: "The Gentlewoman homepage", label: "The Gentlewoman" },
      { screenshot: "monocle.png", alt: "Monocle homepage", label: "Monocle" },
      { screenshot: "kinfolk-live.png", alt: "Kinfolk homepage", label: "Kinfolk" }
    ],
    references: [
      { label: "The Gentlewoman", href: "https://thegentlewoman.co.uk/" },
      { label: "Monocle", href: "https://monocle.com/" },
      { label: "Kinfolk", href: "https://kinfolk.com/" }
    ],
    prompt:
      "Use an editorial commerce catalog family: issue-like pacing, content and product side by side, quiet shop actions, printed-catalog rhythm, and a brand world that sells through curation rather than loud conversion chrome."
  }
];

export const styleReferenceCatalog = {
  "swiss-typographic-grid": [
    liveReference("signal-a-studio.png", "Signal-A Studio", "https://signal-a.studio/", "黑白极简、系统化、留白干净，第一眼就能读出 Swiss 网格。"),
    liveReference("studio-feixen.png", "Studio Feixen", "https://www.studiofeixen.ch/", "更有实验性的 Swiss 网格版本。"),
    liveReference("pentagram.png", "Pentagram", "https://www.pentagram.com/", "项目与元数据组织很强，但首屏更像具体作品封面。")
  ],
  "monochrome-studio-systems": [
    liveReference("fictivekin-home-live.png", "Fictive Kin", "https://fictivekin.com/", "黑白、克制、工作室语气明确，但比作品画廊更偏整体品牌首页。"),
    liveReference("ok-rm.png", "OK-RM", "https://www.ok-rm.co.uk/", "更偏文化工作室的极简黑白语气。"),
    liveReference("signal-a-studio.png", "Signal-A Studio", "https://signal-a.studio/", "更系统化、更网格化的一侧。")
  ],
  "product-precision-interface": [
    liveReference("linear.png", "Linear", "https://linear.app/", "产品叙事和 UI 截图高度一致。"),
    liveReference("stripe.png", "Stripe", "https://stripe.com/", "典型的精密产品官网与信息层级。"),
    liveReference(
      "atlassian-foundations.png",
      "Atlassian Foundations",
      "https://atlassian.design/foundations/",
      "系统化设计文档和产品规范表达。"
    ),
    liveReference("carbon-for-ai.png", "Carbon for AI", "https://carbondesignsystem.com/guidelines/carbon-for-ai/", "AI 产品型知识与规范页面。")
  ],
  "neon-techno-futurist-interface": [
    liveReference("playstation-ps5-live.png", "PlayStation 5", "https://www.playstation.com/en-us/ps5/", "更完整的科技发布与场景世界观。"),
    liveReference("cyberpunk-net.png", "Cyberpunk", "https://www.cyberpunk.net/", "黑底霓虹和世界观最直接。"),
    liveReference("razer.png", "Razer", "https://www.razer.com/", "硬件品牌常见的未来科技语法。")
  ],
  "magazine-editorial": [
    liveReference("frieze.png", "Frieze", "https://www.frieze.com/", "封面感和栏目节奏很典型。"),
    liveReference("tmagazine.png", "T Magazine", "https://www.nytimes.com/section/t-magazine", "图片和标题张力更强。"),
    liveReference("newyorker.png", "The New Yorker", "https://www.newyorker.com/", "长期内容出版和阅读入口。")
  ],
  "quiet-lifestyle-editorial": [
    liveReference("kinfolk-live.png", "Kinfolk", "https://kinfolk.com/", "纸本感和慢节奏生活方式最直接。"),
    liveReference("gentlewoman.png", "The Gentlewoman", "https://thegentlewoman.co.uk/", "更偏静奢、时尚、杂志感。"),
    liveReference("monocle.png", "Monocle", "https://monocle.com/", "更偏品牌和生活方式目录。")
  ],
  "playful-postmodern-anti-grid": [
    liveReference("bureau-borsche.png", "Bureau Borsche", "https://bureauborsche.com/", "形状、冲突和反模板最明确。"),
    liveReference("gumroad-live.png", "Gumroad", "https://gumroad.com/", "更接近新粗野和反精致产品页。"),
    liveReference("memphis-milano.png", "Memphis Milano", "https://memphis.it/en/", "后现代与孟菲斯的视觉源头更清楚。")
  ],
  "curated-reference-directory": [
    liveReference("siteinspire-live.png", "SiteInspire", "https://www.siteinspire.com/", "更像真正的 inspiration 浏览入口。"),
    liveReference("awwwards-websites-live.png", "Awwwards / Websites", "https://www.awwwards.com/websites/", "更偏 showcase 和筛选目录。"),
    liveReference("behance.png", "Behance", "https://www.behance.net/", "更大众和规模化的参考目录。")
  ],
  "evidence-dense-knowledge-surface": [
    liveReference("ourworldindata-live.png", "Our World in Data", "https://ourworldindata.org/", "数据、论点、导航并存。"),
    liveReference("carbon-for-ai.png", "Carbon for AI", "https://carbondesignsystem.com/guidelines/carbon-for-ai/", "AI 产品知识页面的规范化表达。"),
    liveReference("pair-guidebook.png", "People + AI Guidebook", "https://pair.withgoogle.com/guidebook-v2/", "章节型知识组织很清楚。"),
    liveReference("atlassian-foundations.png", "Atlassian Foundations", "https://atlassian.design/foundations/", "结构化设计系统表达。")
  ],
  "stage-driven-showcase": [
    liveReference("a24.png", "A24", "https://a24films.com/", "首屏舞台感最明确。"),
    liveReference("apple-macbook.png", "Apple MacBook Pro", "https://www.apple.com/macbook-pro/", "产品发布的镜头感版本。"),
    liveReference("playstation-ps5-live.png", "PlayStation 5", "https://www.playstation.com/en-us/ps5/", "游戏/硬件的强视觉首屏。")
  ],
  "luxury-fashion-editorial": [
    liveReference("tmagazine.png", "T Magazine", "https://www.nytimes.com/section/t-magazine", "更奢华、更大片、更时尚。"),
    liveReference("gentlewoman.png", "The Gentlewoman", "https://thegentlewoman.co.uk/", "高级但克制的时尚内容站。"),
    liveReference("frieze.png", "Frieze", "https://www.frieze.com/", "文化与时尚交界处的编辑页面。")
  ],
  "humanist-modern-brand": [
    liveReference("monocle.png", "Monocle", "https://monocle.com/", "更有人味的现代品牌目录。"),
    liveReference("apple-macbook.png", "Apple MacBook Pro", "https://www.apple.com/macbook-pro/", "温和现代、产品与品牌平衡。"),
    liveReference("kinfolk-live.png", "Kinfolk", "https://kinfolk.com/", "现代生活方式气质。")
  ],
  "dark-studio-gallery": [
    liveReference("fictivekin-work.png", "Fictive Kin / Work", "https://fictivekin.com/work", "最像 Selected Works 黑底画廊的代表。"),
    liveReference("studio-feixen.png", "Studio Feixen", "https://www.studiofeixen.ch/", "更带设计图像墙和实验排版的一侧。"),
    liveReference("ok-rm.png", "OK-RM", "https://www.ok-rm.co.uk/", "更克制、更像黑白工作室声明页。")
  ],
  "brutalist-raw-interface": [
    liveReference("gumroad-live.png", "Gumroad", "https://gumroad.com/", "边界硬、对比强、最接近 web brutalism 的大众例子。"),
    liveReference("bureau-borsche.png", "Bureau Borsche", "https://bureauborsche.com/", "更偏文化和实验设计的粗野版本。"),
    liveReference("memphis-milano.png", "Memphis Milano", "https://memphis.it/en/", "更靠近后现代源头和反模板气质。")
  ],
  "creative-media-editorial": [
    liveReference("itsnicethat-live.png", "It's Nice That", "https://www.itsnicethat.com/", "更像持续更新的创意媒体首页，而不是一期静态封面。"),
    liveReference("frieze.png", "Frieze", "https://www.frieze.com/", "内容与图片之间的编辑节奏很成熟。"),
    liveReference("newyorker.png", "The New Yorker", "https://www.newyorker.com/", "长期栏目、更新和出版感之间的平衡。")
  ],
  "template-market-library": [
    liveReference("notion-templates-live.png", "Notion Templates", "https://www.notion.com/templates", "分类、卡片和转化入口同时成立。"),
    liveReference("awwwards-websites-live.png", "Awwwards / Websites", "https://www.awwwards.com/websites/", "高密度缩略图浏览和筛选方式值得借。"),
    liveReference("siteinspire-live.png", "SiteInspire", "https://www.siteinspire.com/", "更偏灵感目录，但 browse rhythm 很适合模板库。")
  ],
  "networked-visual-board": [
    liveReference("arena-home-live.png", "Are.na", "https://www.are.na/", "最像开放式灵感看板和关系网的代表。"),
    liveReference("behance.png", "Behance", "https://www.behance.net/", "更大规模的案例和收藏型视觉索引。"),
    liveReference("siteinspire-live.png", "SiteInspire", "https://www.siteinspire.com/", "如果要把看板做得更可筛选，可以借它的目录感。")
  ],
  "institutional-program-grid": [
    liveReference("swiss-institute.png", "Swiss Institute", "https://www.swissinstitute.net/", "文化机构首页、项目和日程入口并存，是机构项目网格的典型。"),
    liveReference("frieze.png", "Frieze", "https://www.frieze.com/", "更偏媒体与机构之间的 program 组织方式。"),
    liveReference("pentagram.png", "Pentagram", "https://www.pentagram.com/", "如果你想让机构项目页更像系统化 identity，可以借它的秩序感。")
  ],
  "report-storytelling-narrative": [
    liveReference("pair-guidebook.png", "People + AI Guidebook", "https://pair.withgoogle.com/guidebook-v2/", "章节节奏、插图和长文导读都很成熟。"),
    liveReference("ourworldindata-live.png", "Our World in Data", "https://ourworldindata.org/", "结论、证据和数据浏览并存，是报告叙事的可靠参考。"),
    liveReference("carbon-for-ai.png", "Carbon for AI", "https://carbondesignsystem.com/guidelines/carbon-for-ai/", "适合补更系统、更产品化的报告表达。")
  ],
  "developer-infrastructure-aura": [
    liveReference("vercel.png", "Vercel", "https://vercel.com/", "近黑平台感、性能可信感和生态证明都很完整。"),
    liveReference("stripe.png", "Stripe", "https://stripe.com/", "平台与产品说明之间的平衡非常成熟。"),
    liveReference("linear.png", "Linear", "https://linear.app/", "更克制、更产品化的开发者平台表达。")
  ],
  "industrial-hardware-minimal": [
    liveReference("apple-macbook.png", "Apple MacBook Pro", "https://www.apple.com/macbook-pro/", "物体主导、说明精准，是硬件极简的强参考。"),
    liveReference("xbox-series-x-live.png", "Xbox Series X", "https://www.xbox.com/en-US/consoles/xbox-series-x", "硬件体块、材质和世界观可以同时成立。"),
    liveReference("playstation-ps5-live.png", "PlayStation 5", "https://www.playstation.com/en-us/ps5/", "更偏娱乐硬件的一侧，但仍能借它的物件舞台感。")
  ],
  "experimental-typographic-poster": [
    liveReference("studio-feixen.png", "Studio Feixen", "https://www.studiofeixen.ch/", "排印、节奏和文化活动感都很强。"),
    liveReference("bureau-borsche.png", "Bureau Borsche", "https://bureauborsche.com/", "更强的实验排印与版面态度。"),
    liveReference("pentagram.png", "Pentagram", "https://www.pentagram.com/", "如果想让实验感更可控、更像成熟 identity，可以借它的秩序。")
  ],
  "editorial-commerce-catalog": [
    liveReference("gentlewoman-live.png", "The Gentlewoman", "https://thegentlewoman.co.uk/", "内容、刊物感和品牌零售之间的距离拿捏得很好。"),
    liveReference("monocle.png", "Monocle", "https://monocle.com/", "品牌、目录和精选物件混合得更完整。"),
    liveReference("kinfolk-live.png", "Kinfolk", "https://kinfolk.com/", "如果你要更安静、更偏生活方式一侧，可以借它的节奏。")
  ]
};

export const styleSkillSpecCatalog = {
  "swiss-typographic-grid": {
    useWhen: ["档案站", "设计工作室", "参考库", "设计系统入口"],
    palette: ["背景接近纯白或纯黑", "只用黑白灰作为主系统", "强调层级而不是装饰色"],
    typography: ["一个无衬线主字体", "标题和元数据都要严格对齐", "字号系统以层级和标签为主"],
    layout: ["12 列或明确模数网格", "所有卡片和段落都对齐到同一边界", "元数据要像导航一样可读"],
    imagery: ["图片视为网格中的内容块", "避免漂浮卡片和圆角浏览器壳", "截图统一裁切比例"],
    motion: ["动效极少", "更多依靠 hover 的边框和对齐反馈", "不要做情绪化转场"],
    avoid: ["装饰性渐变", "软糯圆角组件", "不规则瀑布流"]
  },
  "monochrome-studio-systems": {
    useWhen: ["作品集", "创意工作室", "身份识别型品牌站"],
    palette: ["主色只用黑白灰", "允许一层非常弱的暖灰", "不要用彩色功能色做导航"],
    typography: ["黑白对比要靠字重和字号拉开", "英文副标题保持小而克制", "正文密度低于产品站"],
    layout: ["项目索引是主角", "首页像目录不是长解释", "卡片留白比内容多"],
    imagery: ["图片统一成作品切片", "默认加轻微暗色蒙版", "不要用浏览器截图解释功能"],
    motion: ["滚动显露可以有", "hover 只做轻微放大或边框变化", "避免科技感发光"],
    avoid: ["暖黄纸感底色", "SaaS hero 套壳", "五颜六色标签"]
  },
  "product-precision-interface": {
    useWhen: ["AI 工具", "产品官网", "平台入口", "设计规范站"],
    palette: ["浅底或深底都可以", "颜色必须服务状态和层级", "品牌色只在关键 CTA 出现"],
    typography: ["无衬线为主", "标题比编辑类更克制", "数据和状态文案必须单独成层"],
    layout: ["首屏先解释任务和收益", "UI 截图要和文字一一对应", "模块节奏像产品说明书"],
    imagery: ["截图必须清楚解释功能", "少用纯氛围图", "卡片边界和容器系统一致"],
    motion: ["交互反馈要清楚", "避免华而不实的场景动画", "演示动效只服务功能理解"],
    avoid: ["大片时尚图主导页面", "过多情绪化留白", "不解释功能的抽象 hero"]
  },
  "neon-techno-futurist-interface": {
    useWhen: ["游戏页", "硬件发布", "未来科技品牌页"],
    palette: ["黑底为主", "霓虹色只做重点光源", "高反差但不能刺眼"],
    typography: ["标题可以更大更硬朗", "辅助信息要防止被光效吃掉", "字距和大小要稳定"],
    layout: ["首屏先定世界观", "后续再落信息层级", "用舞台式分段而不是普通卡片堆叠"],
    imagery: ["允许大图和发光", "截图和渲染图要统一色温", "不要混入生活方式图片"],
    motion: ["允许更强的 reveal", "动效要像场景切换", "但导航始终可见可读"],
    avoid: ["暖纸感和米色底", "学术知识站式排列", "平庸 SaaS 渐变"]
  },
  "magazine-editorial": {
    useWhen: ["出版站", "内容站", "专题站", "品牌杂志"],
    palette: ["配色服务封面和图片", "可以白底也可以深底", "比产品站更允许图片定调"],
    typography: ["标题与副标题节奏要像杂志", "允许 serif + sans 组合", "栏目标签要清楚"],
    layout: ["首屏像 cover 或 lead spread", "正文不是一个大 feed", "二级内容按编辑节奏排"],
    imagery: ["图片是节奏器", "尽量使用真实大图", "不要用 UI 解释图代替封面图"],
    motion: ["轻微 reveal 足够", "不要让 hover 破坏阅读节奏", "优先滚动节奏而非微交互"],
    avoid: ["产品功能罗列", "复杂筛选工具壳", "所有模块都长得一样"]
  },
  "quiet-lifestyle-editorial": {
    useWhen: ["生活方式品牌", "慢内容站", "时尚或文化品牌"],
    palette: ["低对比黑白灰", "允许一点温和米色但不是默认", "整体要安静"],
    typography: ["字比 Swiss 更松弛", "可用更有气质的 serif", "不要满屏元数据"],
    layout: ["大图和留白优先", "信息密度比杂志编辑更低", "让浏览像翻刊物"],
    imagery: ["图片要大且干净", "默认加轻微暗色蒙版", "避免功能型 UI 截图"],
    motion: ["动作慢而少", "更多依靠切换节奏", "不要发光和强弹跳"],
    avoid: ["工具导航条过重", "高频 CTA", "过度解释型模块"]
  },
  "playful-postmodern-anti-grid": {
    useWhen: ["创作者主页", "反模板发布", "个性品牌页"],
    palette: ["允许更强强调色", "黑白仍是骨架", "颜色只在 punch 点出现"],
    typography: ["字可以更大更冲突", "允许故意破格的边界", "但要保留主阅读路径"],
    layout: ["反网格但不反可读", "局部冲突取代全局混乱", "层级要清楚"],
    imagery: ["允许不规则切片", "图片和形状一起工作", "不要全页都是拼贴噪音"],
    motion: ["hover 可以更大胆", "滚动 reveal 可以更有态度", "不要把用户搞丢"],
    avoid: ["纯情绪无层级", "每个模块都想抢主角", "对严肃内容用过猛"]
  },
  "curated-reference-directory": {
    useWhen: ["灵感库", "模板库", "风格参考站", "收藏目录"],
    palette: ["主色保持中性", "重点靠缩略图而非底色", "筛选控件要稳定清楚"],
    typography: ["卡片标题和分类标签清楚", "正文字很少", "浏览优先而非阅读优先"],
    layout: ["首页就是入口和分类", "先索引再详情", "搜索、筛选、视图切换都要稳定"],
    imagery: ["缩略图密度高但比例统一", "避免同页重复图", "每张图都要能代表一个方向"],
    motion: ["切换视图和筛选优先", "不要靠花哨动画来吸引", "扫描效率高于情绪化过渡"],
    avoid: ["英雄论式单一叙事", "只有图片没有分类逻辑", "首屏塞满理论解释"]
  },
  "evidence-dense-knowledge-surface": {
    useWhen: ["研究站", "知识库", "设计系统", "指南站"],
    palette: ["中性配色", "高对比文本优先", "颜色用于主题或状态而不是情绪"],
    typography: ["正文和标签系统要一起设计", "大标题不必夸张", "小标题和段落层级要稳定"],
    layout: ["先结论再证据", "边导航或标签导航清楚", "密度高但有分区"],
    imagery: ["图表和截图都是证据", "不相关氛围图尽量少", "同一页内图片尺寸规则明确"],
    motion: ["几乎不靠动效", "更靠滚动结构和锚点导航", "保持稳定阅读"],
    avoid: ["只剩 mood 没有论点", "图片太抢戏", "无序瀑布流"]
  },
  "stage-driven-showcase": {
    useWhen: ["品牌发布", "活动页", "作品首屏", "电影文化页"],
    palette: ["让主视觉定调", "界面色彩服从主视觉", "用高对比建立记忆点"],
    typography: ["标题像海报或镜头标题", "正文少而准", "说明信息延后出现"],
    layout: ["首屏只有一个强主角", "后面再解释", "章节像场景切换"],
    imagery: ["大图必须占主导", "裁切要有电影感", "避免缩略图库式首屏"],
    motion: ["可以用更明显的 reveal", "但不能遮蔽 CTA 和导航", "过场不宜过长"],
    avoid: ["复杂目录页", "信息一次性全展开", "工具后台式网格"]
  },
  "luxury-fashion-editorial": {
    useWhen: ["时尚品牌", "奢刊专题", "文化与高级消费品牌"],
    palette: ["高对比黑白或低饱和奢华色", "背景更干净", "图片质感优先于功能色"],
    typography: ["serif 与 sans 组合更明显", "标题允许更大片感", "正文要克制"],
    layout: ["首屏像大片封面", "分区像 editorial spread", "内容密度低于普通内容站"],
    imagery: ["大裁切、大留白、大片感照片", "不要用产品 UI 截图", "一页内图片风格保持一致"],
    motion: ["更偏优雅 reveal", "少而慢", "不要科技感 hover"],
    avoid: ["工具组件壳", "过密卡片阵列", "便宜促销感"]
  },
  "humanist-modern-brand": {
    useWhen: ["现代生活方式品牌", "温和产品品牌站", "内容与品牌混合首页"],
    palette: ["中性底色里带一点温度", "不要发黄过头", "整体仍要干净现代"],
    typography: ["字要清楚但不生硬", "标题比 Swiss 更温和", "正文更可读、更生活化"],
    layout: ["现代目录和品牌叙事并存", "内容块之间呼吸感强", "不要极端硬网格"],
    imagery: ["产品图和生活方式图可以并存", "图片要显得真实而不是超未来", "裁切稳定"],
    motion: ["很少的动效", "更多靠内容切换节奏", "不要大张旗鼓的舞台 reveal"],
    avoid: ["冷冰冰工具站语气", "极端后现代冲突", "大面积霓虹科技感"]
  },
  "dark-studio-gallery": {
    useWhen: ["工作室作品集", "创意机构首页", "Selected Works 页面"],
    palette: ["纯黑或近黑底色", "图像是主角", "文字保持白灰克制"],
    typography: ["标题退后一步", "项目标题和 hover 文案短而准", "元数据很少但要准确"],
    layout: ["先作品网格再解释", "selected 与 archive 分层明确", "不要一上来用长段落证明自己"],
    imagery: ["项目媒体统一 16:9 或 16:10", "图片裁切稳定", "黑色蒙版比普通作品集更轻"],
    motion: ["hover reveal captions", "轻微放大或亮度变化即可", "滚动节奏安静连续"],
    avoid: ["首屏长解释", "彩色标签", "像 SaaS case study 列表"]
  },
  "brutalist-raw-interface": {
    useWhen: ["创作者发布", "实验品牌页", "宣言式 landing page"],
    palette: ["高对比黑白优先", "允许一两个 punch 色", "颜色是态度不是装饰"],
    typography: ["标题更硬更直给", "字距和边界有存在感", "宁可少字也不要软糯说明"],
    layout: ["边框和块面要明确", "局部冲撞但整体仍可读", "首屏能直接定下态度"],
    imagery: ["图片和图形可以更硬切", "允许更粗糙的展示感", "不要混进温和生活方式图"],
    motion: ["hover 可更强", "切换要干脆", "不要优雅慢动作"],
    avoid: ["装得很精致", "过多暖色纸感", "为了态度牺牲基本可读性"]
  },
  "creative-media-editorial": {
    useWhen: ["创意媒体首页", "设计博客", "文化资讯站", "更新频繁的内容品牌"],
    palette: ["以黑白灰为骨架", "图片自己定调", "不要把功能色做成主角"],
    typography: ["标题、栏目、时间和作者信息都要清楚", "serif 与 sans 可以并用", "保持读稿节奏而不是纯海报感"],
    layout: ["先有 lead story 再有次级栏目", "支持高频更新但不失去封面感", "首页是编辑入口不是长文全文"],
    imagery: ["图片必须有张力", "缩略图和 lead 图要区分层级", "不要全部裁成同一种无差别卡片"],
    motion: ["轻微 reveal 即可", "更依赖版面节奏而不是交互动效", "不要让 hover 打断浏览"],
    avoid: ["单纯做成 feed", "所有内容都同级", "只有封面气质没有更新入口"]
  },
  "template-market-library": {
    useWhen: ["模板库", "Prompt 库", "Starter Kit", "资源市场"],
    palette: ["保持中性骨架", "重点用在分类和 CTA", "不要让背景色抢走卡片信息"],
    typography: ["标题短而准", "分类标签清楚", "价格、下载、用途这些元数据要很好扫"],
    layout: ["首页就是筛选和比较入口", "转化动作要近", "列表和详情必须分层清楚"],
    imagery: ["缩略图比例统一", "一眼能看出模板类型", "避免重复图导致目录失真"],
    motion: ["筛选和视图切换反馈要稳", "避免花哨转场", "浏览效率高于戏剧性"],
    avoid: ["把模板库做成纯品牌故事", "只有 CTA 没有比较信息", "卡片和标签体系混乱"]
  },
  "networked-visual-board": {
    useWhen: ["灵感库", "研究地图", "案例收集站", "设计参考网络"],
    palette: ["中性底色更稳", "颜色用于分组或状态", "不要靠大量装饰色制造‘灵感感’"],
    typography: ["卡片标题和标签必须易扫", "元数据密度允许更高", "短描述比长段落更有效"],
    layout: ["支持收藏、关联、回访", "卡片、标签、关系同时存在", "从一张图可以走到一串相关内容"],
    imagery: ["缩略图既要能代表内容，也要能在群组里协同工作", "不要同页大量重复", "允许局部更像看板而不是统一宣传图"],
    motion: ["hover 只做轻量反馈", "重点是路径切换和关联探索", "不要把看板做成舞台演出"],
    avoid: ["单一 hero 叙事", "没有标签和关联关系", "全站都像随机瀑布流"]
  },
  "institutional-program-grid": {
    useWhen: ["美术馆站点", "研究机构", "学院项目页", "节展与驻留项目"],
    palette: ["黑白灰或近白底更稳", "颜色只服务栏目和状态", "不要用营销型品牌色抢 program 信息"],
    typography: ["标题和栏目层级必须同时成立", "日期、地点、项目类型这些元数据要很好扫", "更接近机构排印而不是品牌 slogan"],
    layout: ["首页同时容纳机构介绍、program、日程和申请入口", "列表与 feature 要并存", "网格必须帮助导航而不是只做形式"],
    imagery: ["图片更像项目资料或展讯封面", "缩略图比例要稳定", "避免充满情绪的单一 hero 大图独占整页"],
    motion: ["只做轻量 reveal 和 hover", "不要让节目单式浏览被动画打断", "优先保持浏览稳定"],
    avoid: ["把机构页做成奢华品牌大片", "只剩网格没有 program 入口", "CTA 太弱导致申请或购票路径难找"]
  },
  "report-storytelling-narrative": {
    useWhen: ["年度报告", "研究专题", "政策指南", "影响力报告"],
    palette: ["中性底色优先", "颜色用于章节和数据强调", "不要用情绪色覆盖证据本身"],
    typography: ["标题像章节而不是广告口号", "正文、注释和图表说明必须同时清楚", "数据标签要单独设计层级"],
    layout: ["先结论再证据", "章节滚动要有叙事推进", "图表、引文和案例要作为证据块穿插出现"],
    imagery: ["图表和截图都要承担说明责任", "少用无关氛围图", "每张图都要服务论点或转场"],
    motion: ["动效可以帮助章节进入", "但不能抢走阅读注意力", "滚动节奏比 hover 更重要"],
    avoid: ["做成普通知识库首页", "只有数据堆叠没有叙事", "把报告页做成产品落地页"]
  },
  "developer-infrastructure-aura": {
    useWhen: ["云平台", "开发者工具", "API 平台", "AI 基础设施官网"],
    palette: ["近黑或冷白都可以", "重点用少量高对比色建立可信感", "不要用廉价渐变把平台感做薄"],
    typography: ["无衬线为主", "代码、性能、生态这类词要清楚分层", "标题应克制但有技术信誉"],
    layout: ["首屏先讲平台能力和可信度", "文档、生态、产品模块要邻接出现", "案例和 benchmark 要像证据而不是装饰"],
    imagery: ["产品界面、代码片段和生态标识都可做视觉证据", "少用纯情绪 hero 图", "截图必须清楚解释平台能力"],
    motion: ["动效要服务状态和性能感", "避免娱乐化过场", "更像稳定系统而不是活动页"],
    avoid: ["做成通用 SaaS landing", "过多生活方式摄影", "只有 UI 截图没有平台层叙事"]
  },
  "industrial-hardware-minimal": {
    useWhen: ["硬件发布", "工业设计品牌", "设备单品页", "科技品牌旗舰页"],
    palette: ["中性黑白灰优先", "颜色从产品材质里来", "不要无端加入霓虹特效"],
    typography: ["说明文字少而准", "规格信息要像工业标签一样清楚", "标题不需要过度情绪化"],
    layout: ["让物体本身占主导", "在大图和规格之间保持节奏", "信息区块像产品说明书而不是内容 feed"],
    imagery: ["物体摄影或渲染必须足够干净", "裁切要强调体块和材质", "不要混入无关生活方式图像"],
    motion: ["轻微镜头感和 reveal 足够", "不要做赛博朋克式发光漂移", "以稳定和精度为主"],
    avoid: ["只剩未来感没有产品", "把硬件站做成知识库", "说明过多导致物体失去主角位置"]
  },
  "experimental-typographic-poster": {
    useWhen: ["设计活动", "展览专题", "字体项目", "文化 campaign"],
    palette: ["黑白是骨架", "可以允许少量 punch 色", "颜色必须服务排印冲击而不是装饰噪音"],
    typography: ["字体本身就是主视觉", "允许尺度对撞和版式冲突", "但主阅读路径必须保留"],
    layout: ["更像海报系统或活动识别", "块面、字级和版面关系比传统卡片更重要", "章节切换可以更戏剧化"],
    imagery: ["可以少图甚至无图", "图片出现时要像海报元素而不是产品配图", "避免素材拼贴失控"],
    motion: ["动效可以更有存在感", "文字进场比图片 hover 更重要", "不要为了实验牺牲基本可用性"],
    avoid: ["每个模块都在尖叫", "给严肃知识库硬套排印海报", "排印实验没有节制导致不可读"]
  },
  "editorial-commerce-catalog": {
    useWhen: ["设计商店", "刊物目录", "内容品牌零售", "家居与文化精选店"],
    palette: ["中性底色更稳", "颜色从物件和刊物封面里来", "不要做强促销电商橱窗"],
    typography: ["标题像刊物目录而不是促销 banner", "商品信息和编辑栏目都要清楚", "serif 与 sans 可以混搭但要克制"],
    layout: ["内容、商品和精选合集要能并列出现", "首页像一期 issue 或一册目录", "转化动作要清楚但不吵"],
    imagery: ["商品图和 editorial 图要共存", "缩略图像 printed catalog 一样整齐", "避免统一成普通电商卡片"],
    motion: ["hover 轻量即可", "重点是浏览节奏和目录感", "不要让商店操作打断品牌阅读"],
    avoid: ["做成大促首页", "只有气质没有购买路径", "商品和内容完全分裂成两个站"]
  }
};

export const currentWebSignalsCatalog = [
  {
    id: "editorial-publishing",
    titleZh: "编辑出版",
    titleEn: "Editorial Publishing",
    summaryZh: "封面式首屏、图文主导、栏目节奏明确，适合内容品牌、文化媒体和专题型首页。",
    styleIds: ["magazine-editorial", "creative-media-editorial", "luxury-fashion-editorial"]
  },
  {
    id: "black-white-grid",
    titleZh: "黑白网格",
    titleEn: "Black-and-White Grid",
    summaryZh: "排印主导、克制留白、项目索引清楚，是工作室、档案站和参考库最稳定的一条当代方向。",
    styleIds: ["swiss-typographic-grid", "monochrome-studio-systems", "dark-studio-gallery"]
  },
  {
    id: "institutional-programs",
    titleZh: "机构项目",
    titleEn: "Institutional Programs",
    summaryZh: "介于文化机构首页、项目计划网和展讯入口之间，重点是同时容纳栏目、program、活动与档案。",
    styleIds: ["institutional-program-grid", "report-storytelling-narrative"]
  },
  {
    id: "developer-platforms",
    titleZh: "开发者平台",
    titleEn: "Developer Platforms",
    summaryZh: "产品说明、可信性能、文档邻接和生态证明同时出现，是 2025-2026 年非常稳定的一条技术网页方向。",
    styleIds: ["developer-infrastructure-aura", "product-precision-interface"]
  },
  {
    id: "template-discovery",
    titleZh: "模板与发现市场",
    titleEn: "Template Discovery",
    summaryZh: "截图优先、分类清楚、拿走路径短，既是一种站型，也是一整套分发生态。",
    styleIds: ["template-market-library", "curated-reference-directory", "networked-visual-board"]
  },
  {
    id: "industrial-hardware",
    titleZh: "工业硬件极简",
    titleEn: "Industrial Hardware Minimal",
    summaryZh: "物体、材质和体块比长解释更重要，适合消费电子、设备旗舰页和工业设计品牌。",
    styleIds: ["industrial-hardware-minimal", "stage-driven-showcase", "neon-techno-futurist-interface"]
  },
  {
    id: "culture-commerce",
    titleZh: "文化品牌零售",
    titleEn: "Editorial Commerce",
    summaryZh: "内容、刊物、会员和精选物件混在同一品牌世界里，靠目录感和策展感而不是促销噪音完成转化。",
    styleIds: ["editorial-commerce-catalog", "quiet-lifestyle-editorial", "humanist-modern-brand"]
  }
];

export const atlasEcosystemCatalog = [
  {
    id: "live-galleries",
    titleZh: "灵感图库",
    titleEn: "Curated Galleries",
    summaryZh: "这一类最接近你的浏览页目标：先看截图，再按标签、类型或场景筛。多数不是开源，但非常适合借首页组织、分类方法和浏览节奏。",
    items: [
      {
        titleZh: "Awwwards",
        titleEn: "Awwwards",
        href: "https://www.awwwards.com/",
        noteZh: "首页把最新、获奖、合集和分类入口并列摆出来，适合借它的强入口组织。",
        tags: ["首屏组织", "高密度展示", "分类入口"],
        openSource: false
      },
      {
        titleZh: "Godly",
        titleEn: "Godly",
        href: "https://godly.website/",
        noteZh: "非常克制、图像优先，适合借它低噪声的 image-first 浏览方式。",
        tags: ["黑白克制", "截图优先", "低噪声"],
        openSource: false
      },
      {
        titleZh: "Land-book",
        titleEn: "Land-book",
        href: "https://land-book.com/",
        noteZh: "筛选维度很丰富，尤其适合借行业、风格、版式与 section 的交叉筛法。",
        tags: ["多维筛选", "section 检索", "案例库"],
        openSource: false
      },
      {
        titleZh: "Mobbin",
        titleEn: "Mobbin",
        href: "https://mobbin.com/",
        noteZh: "最适合借给选型器和下钻流程：从 Screens 到 Flows 的层级非常清楚。",
        tags: ["选择器", "流程浏览", "组件与截图"],
        openSource: false
      },
      {
        titleZh: "Minimal Gallery",
        titleEn: "Minimal Gallery",
        href: "https://minimal.gallery/",
        noteZh: "截图优先，并把网站、模板、工具放在同一套浏览入口里。",
        tags: ["人工策展", "截图聚合", "模板延展"],
        openSource: false
      }
    ]
  },
  {
    id: "template-marketplaces",
    titleZh: "模板市场",
    titleEn: "Template Marketplaces",
    summaryZh: "这一组回答的是“现成模板和资产在哪里分发”，它们是生态和商业路径，不该假装成单一风格。",
    items: [
      {
        titleZh: "Webflow Templates",
        titleEn: "Webflow Templates",
        href: "https://webflow.com/templates",
        noteZh: "模板、行业、组件和价格路径非常清楚，适合借它的 browse-to-take 节奏。",
        tags: ["模板分发", "筛选目录", "转化路径"],
        openSource: false
      },
      {
        titleZh: "Framer Marketplace",
        titleEn: "Framer Marketplace",
        href: "https://www.framer.com/marketplace/",
        noteZh: "更贴近当前建站人群，模板、sections 和插件的并置方式很值得借。",
        tags: ["模板市场", "建站生态", "拖拽站点"],
        openSource: false
      },
      {
        titleZh: "Notion Templates",
        titleEn: "Notion Templates",
        href: "https://www.notion.com/templates",
        noteZh: "分类、标签、封面和使用场景说明同时成立，是模板站视觉与转化都很成熟的一类。",
        tags: ["模板库", "封面浏览", "场景说明"],
        openSource: false
      }
    ]
  },
  {
    id: "design-systems",
    titleZh: "设计系统",
    titleEn: "Design Systems",
    summaryZh: "这一组回答的是“这种网站怎样系统化落地”，更接近规则、组件、模式和治理，而不是风格名词。",
    items: [
      {
        titleZh: "Carbon Design System",
        titleEn: "Carbon",
        href: "https://carbondesignsystem.com/",
        repoHref: "https://github.com/carbon-design-system/carbon",
        noteZh: "产品系统、AI 指南和可访问性并存，很适合补 style -> system -> example 这条链路。",
        tags: ["设计系统", "AI 指南", "产品规范"],
        openSource: true
      },
      {
        titleZh: "Primer",
        titleEn: "Primer",
        href: "https://primer.style/",
        repoHref: "https://github.com/primer/react",
        noteZh: "把 Brand、Product、Accessibility 分开组织，是视觉层和系统层拆分的好例子。",
        tags: ["Brand UI", "Product UI", "Accessibility"],
        openSource: true
      },
      {
        titleZh: "USWDS",
        titleEn: "USWDS",
        href: "https://designsystem.digital.gov/",
        repoHref: "https://github.com/uswds/uswds",
        noteZh: "从 foundations 到 components 到真实站点示例都很清楚，适合借它的文档架构。",
        tags: ["设计系统", "文档层级", "开源"],
        openSource: true
      },
      {
        titleZh: "PatternFly",
        titleEn: "PatternFly",
        href: "https://www.patternfly.org/",
        repoHref: "https://github.com/patternfly/patternfly-react",
        noteZh: "更完整的系统型站点案例，roadmap、docs、community 分层很清楚。",
        tags: ["系统型站点", "社区", "版本治理"],
        openSource: true
      },
      {
        titleZh: "Atlassian Design",
        titleEn: "Atlassian Design",
        href: "https://atlassian.design/",
        noteZh: "更偏大型产品组织的设计系统表达，适合借其模式、组件和文档之间的关系。",
        tags: ["产品组织", "模式库", "设计语言"],
        openSource: false
      },
      {
        titleZh: "Design Systems Repo",
        titleEn: "Design Systems Repo",
        href: "https://designsystemsrepo.com/",
        noteZh: "把系统、书、文章、工具和 talks 都做成资源库，适合作为系统层的延伸入口。",
        tags: ["资源库", "设计系统", "阅读入口"],
        openSource: false
      }
    ]
  },
  {
    id: "component-foundations",
    titleZh: "组件底座",
    titleEn: "Component Foundations",
    summaryZh: "这一层回答的是“交互和组件具体怎么做”，属于工程与实现底座，不应该被混写成视觉风格。",
    items: [
      {
        titleZh: "shadcn/ui",
        titleEn: "shadcn/ui",
        href: "https://ui.shadcn.com/",
        repoHref: "https://github.com/shadcn-ui/ui",
        noteZh: "最值得借的是 example-led docs 和 copy-to-use 的交付方式，不是它的默认视觉。",
        tags: ["可复制交付", "Example-led", "组件文档"],
        openSource: true
      },
      {
        titleZh: "Radix Primitives",
        titleEn: "Radix Primitives",
        href: "https://www.radix-ui.com/primitives",
        repoHref: "https://github.com/radix-ui/primitives",
        noteZh: "适合补稳定的无头组件层，让视觉和交互实现彻底分开。",
        tags: ["无头组件", "交互底座", "Primitives"],
        openSource: true
      },
      {
        titleZh: "React Aria",
        titleEn: "React Aria",
        href: "https://react-spectrum.adobe.com/react-aria/components.html",
        noteZh: "更偏可访问性和交互行为层，适合补复杂控件的实现参考。",
        tags: ["可访问性", "交互行为", "组件实现"],
        openSource: true
      },
      {
        titleZh: "Open UI",
        titleEn: "Open UI",
        href: "https://open-ui.org/",
        noteZh: "更偏底层组件语义、部件、状态和行为研究，适合做交互层参考。",
        tags: ["组件研究", "交互语义", "规范化"],
        openSource: true
      },
      {
        titleZh: "Storybook",
        titleEn: "Storybook",
        href: "https://storybook.js.org/",
        repoHref: "https://github.com/storybookjs/storybook",
        noteZh: "它不是风格，但非常适合回答“组件怎样被展示、测试和复用”。",
        tags: ["组件工作台", "展示与测试", "文档协作"],
        openSource: true
      },
      {
        titleZh: "Magic UI",
        titleEn: "Magic UI",
        href: "https://magicui.design/",
        noteZh: "更接近当代组件与 blocks 生态，适合补“如何快速实现一个方向”的资源层。",
        tags: ["UI blocks", "组件生态", "快速实现"],
        openSource: true
      }
    ]
  },
  {
    id: "historical-archives",
    titleZh: "历史档案",
    titleEn: "Historical Archives",
    summaryZh: "这一类更接近你时间轴与历史流派的外部参照。重点不是模板，而是历史演化、年代感和视觉源流。",
    items: [
      {
        titleZh: "The Design Binders",
        titleEn: "The Design Binders",
        href: "https://www.designbinders.com/en",
        noteZh: "最接近“设计流派时间轴”的外部参照，年代和风格切得很清楚。",
        tags: ["设计流派", "年代轴", "风格概览"],
        openSource: false
      },
      {
        titleZh: "Letterform Archive",
        titleEn: "Letterform Archive",
        href: "https://letterformarchive.org/",
        noteZh: "更像设计研究馆藏，适合借 archive、essay、collection 混合的组织方式。",
        tags: ["设计档案", "研究型内容", "馆藏结构"],
        openSource: false
      },
      {
        titleZh: "Cooper Hewitt Collection",
        titleEn: "Cooper Hewitt Collection",
        href: "https://collection.cooperhewitt.org/",
        noteZh: "馆藏检索、分类和开发者入口都很完整，适合借 serious archive 的信息架构。",
        tags: ["馆藏检索", "主题索引", "开发者接口"],
        openSource: false
      },
      {
        titleZh: "V&A Collections",
        titleEn: "V&A Collections",
        href: "https://www.vam.ac.uk/collections",
        noteZh: "大型博物馆藏品浏览与筛选的成熟案例，适合借浏览层的深度分组。",
        tags: ["博物馆档案", "深度筛选", "主题浏览"],
        openSource: false
      },
      {
        titleZh: "Web Design Museum",
        titleEn: "Web Design Museum",
        href: "https://www.webdesignmuseum.org/",
        noteZh: "把旧网站、Flash、App、软件和展览都纳入同一套历史档案里，更偏 web 历史视角。",
        tags: ["网页历史", "年代索引", "展览结构"],
        openSource: false
      },
      {
        titleZh: "Fonts In Use",
        titleEn: "Fonts In Use",
        href: "https://fontsinuse.com/",
        noteZh: "如果你想把风格 atlas 做得更像可检索档案，Fonts In Use 的元数据密度尤其值得借。",
        tags: ["排印档案", "元数据", "高级搜索"],
        openSource: false
      }
    ]
  },
  {
    id: "collection-frameworks",
    titleZh: "数字馆藏框架",
    titleEn: "Collection Frameworks",
    summaryZh: "如果你之后要把 atlas 做成数字馆藏、策展档案或研究收藏站，真正能落地的底座通常在这里。",
    items: [
      {
        titleZh: "Omeka S",
        titleEn: "Omeka S",
        href: "https://omeka.org/s/",
        repoHref: "https://github.com/omeka/omeka-s",
        noteZh: "如果要把你的站做得更像策展档案馆，collection / exhibit 结构非常值得借。",
        tags: ["数字馆藏", "展览站", "多站点"],
        openSource: true
      },
      {
        titleZh: "CollectionBuilder",
        titleEn: "CollectionBuilder",
        href: "https://collectionbuilder.github.io/cb-docs/",
        noteZh: "适合把截图、元数据、时间轴、地图和主题页做成静态数字收藏网站。",
        tags: ["静态站", "元数据", "时间轴"],
        openSource: true
      }
    ]
  },
  {
    id: "open-design-community",
    titleZh: "开源设计社区",
    titleEn: "Open Design Community",
    summaryZh: "这一层更像社区、索引和参与路径，补的是资源聚合与贡献机制，而不是具体页面长什么样。",
    items: [
      {
        titleZh: "Open Source Design",
        titleEn: "Open Source Design",
        href: "https://opensourcedesign.net/",
        repoHref: "https://github.com/opensourcedesign/opensourcedesign.github.io",
        noteZh: "社区、资源、文章和贡献路径组织得很成熟，适合借社区型资源站的架构。",
        tags: ["社区资源", "开源", "内容与参与"],
        openSource: true
      },
      {
        titleZh: "Component Gallery",
        titleEn: "Component Gallery",
        href: "https://component.gallery/",
        repoHref: "https://github.com/inbn/component-gallery",
        noteZh: "组件、系统、代码示例和开源状态在同一条检索链里，特别适合补 style -> system -> example 的链路。",
        tags: ["组件索引", "系统对比", "代码示例"],
        openSource: true
      },
      {
        titleZh: "Design Systems Repo",
        titleEn: "Design Systems Repo",
        href: "https://designsystemsrepo.com/",
        noteZh: "如果你要把站做得更像开放资源库，它的资源组织和延伸阅读很值得借。",
        tags: ["开放资源", "索引站", "延伸阅读"],
        openSource: false
      }
    ]
  }
];

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
  }
};

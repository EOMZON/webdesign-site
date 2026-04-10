import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distRoot = path.join(root, "dist");
const outputRoot = path.resolve(process.env.DESIGN_SKILLS_OUT || path.join(root, "..", "design-skills"));
const catalogPath = path.join(distRoot, "data", "style-catalog.json");
const downloadsDir = path.join(distRoot, "downloads");
const stylesDir = path.join(outputRoot, "styles");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function cleanUnexpectedStyleDirs(expectedSlugs) {
  if (!fs.existsSync(stylesDir)) return;

  for (const entry of fs.readdirSync(stylesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (expectedSlugs.has(entry.name)) continue;
    fs.rmSync(path.join(stylesDir, entry.name), { recursive: true, force: true });
  }
}

function buildReadme(catalog) {
  const styleList = catalog
    .map(
      (item) =>
        `- [${item.nameZh} (${item.titleEn})](styles/${item.slug}/SKILL.md)  \n  适合做：${item.cardUses.join(" · ")}`
    )
    .join("\n");

  return `# design-skills

中文优先的网站风格技能仓库。这里每个 ` + "`styles/<slug>/SKILL.md`" + ` 都和 [webdesign.zondev.top](https://webdesign.zondev.top/) 上的一个具体风格详情页一一对应。

## 这个仓库解决什么

- 看图选风格之后，直接拿走对应 skill
- 把风格规则喂给 Codex / Cursor / Claude / OpenClaw
- 避免每次都从零描述“我想要这种页面感觉”

## 如何使用

1. 先在 [webdesign.zondev.top/browse](https://webdesign.zondev.top/browse) 找到接近的风格
2. 打开对应详情页，确认“适合做 / 不适合做 / 参考网站”
3. 下载或复制这个仓库里的 ` + "`SKILL.md`" + `，放进你的 skills 目录
4. 再把真实内容需求和这个 skill 一起给 AI

## 收录风格

${styleList}

## 同步规则

- 站点浏览层：` + "`webdesign-site`" + `
- 公共 skills 层：` + "`design-skills`" + `
- 这两个仓库通过 ` + "`npm run build && npm run export:skills`" + ` 保持同步
`;
}

function main() {
  if (!fs.existsSync(catalogPath)) {
    throw new Error(`Missing ${catalogPath}. Run npm run build first.`);
  }

  const catalog = readJson(catalogPath);
  const slimCatalog = catalog.map((item) => ({
    slug: item.slug,
    nameZh: item.nameZh,
    titleEn: item.titleEn,
    summaryZh: item.summaryZh,
    cardUses: item.cardUses,
    lookLike: item.lookLike,
    notFor: item.notFor,
    filterTags: item.filterTags,
    cover: item.cover,
    coverLabel: item.coverLabel,
    demoHref: item.demoHref,
    githubSkillHref: item.githubSkillHref
  }));

  ensureDir(outputRoot);
  ensureDir(stylesDir);
  cleanUnexpectedStyleDirs(new Set(catalog.map((item) => item.slug)));

  writeFile(path.join(outputRoot, ".gitignore"), ".DS_Store\n");
  writeFile(path.join(outputRoot, "catalog.json"), `${JSON.stringify(slimCatalog, null, 2)}\n`);
  writeFile(path.join(outputRoot, "README.md"), `${buildReadme(catalog)}\n`);

  for (const item of catalog) {
    const sourcePath = path.join(downloadsDir, `${item.slug}.md`);
    const targetPath = path.join(stylesDir, item.slug, "SKILL.md");
    const content = fs.readFileSync(sourcePath, "utf8");
    writeFile(targetPath, content);
  }

  process.stdout.write(`Exported ${catalog.length} skills to ${outputRoot}\n`);
}

main();

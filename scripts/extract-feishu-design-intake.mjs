#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";

const DEFAULT_SHEET = "https://my.feishu.cn/sheets/V9vssjG90hwM3ltUNu5cedgXn3f";
const DEFAULT_OUT = path.resolve(process.cwd(), "data", "feishu-design-intake.json");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {
    sheet: DEFAULT_SHEET,
    out: DEFAULT_OUT,
    maxRows: 220,
    maxCols: 12
  };
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    const next = argv[i + 1];
    if (key === "--sheet" && next) {
      args.sheet = next;
      i += 1;
      continue;
    }
    if (key === "--out" && next) {
      args.out = path.resolve(next);
      i += 1;
      continue;
    }
    if (key === "--max-rows" && next) {
      args.maxRows = Number(next) || args.maxRows;
      i += 1;
      continue;
    }
    if (key === "--max-cols" && next) {
      args.maxCols = Number(next) || args.maxCols;
      i += 1;
      continue;
    }
    if (key === "--help" || key === "-h") {
      console.log(`Usage:
  node scripts/extract-feishu-design-intake.mjs [--sheet <url-or-token>] [--out <file>]`);
      process.exit(0);
    }
  }
  return args;
}

function cleanInline(input) {
  return String(input ?? "").replace(/\s+/g, " ").trim();
}

function toColumnName(n) {
  let x = Number(n || 0);
  if (x <= 0) return "A";
  let out = "";
  while (x > 0) {
    const mod = (x - 1) % 26;
    out = String.fromCharCode(65 + mod) + out;
    x = Math.floor((x - 1) / 26);
  }
  return out;
}

function parseSpreadsheetToken(input) {
  const raw = cleanInline(input);
  if (!raw) return "";
  const match = raw.match(/\/sheets\/([A-Za-z0-9]+)/i);
  if (match) return match[1];
  if (/^[A-Za-z0-9]{12,}$/.test(raw)) return raw;
  return "";
}

function cellToText(cell) {
  if (cell == null) return "";
  if (typeof cell === "string" || typeof cell === "number" || typeof cell === "boolean") {
    return cleanInline(String(cell));
  }
  if (Array.isArray(cell)) {
    return cleanInline(cell.map((item) => cellToText(item)).filter(Boolean).join(" "));
  }
  if (typeof cell === "object") {
    const text = cleanInline(String(cell.text || cell.name || cell.title || "").trim());
    const link = cleanInline(String(cell.link || cell.href || "").trim());
    if (text && link) return `${text} ${link}`;
    if (text) return text;
    if (link) return link;
    return cleanInline(Object.values(cell).map((value) => cellToText(value)).filter(Boolean).join(" "));
  }
  return "";
}

function extractFirstUrl(input) {
  const match = String(input || "").match(/https?:\/\/[^\s]+/i);
  return match ? match[0] : "";
}

function inferTags(row) {
  const text = cleanInline(row.join(" ")).toLowerCase();
  const tags = [];
  const push = (tag, test) => {
    if (test && !tags.includes(tag)) tags.push(tag);
  };
  push("editorial", /editorial|杂志|黑白|排版/.test(text));
  push("ui-style", /ui|视觉|风格|界面|样式/.test(text));
  push("ux-flow", /ux|user flow|交互|流程/.test(text));
  push("reference", /参考|灵感|案例|showcase|portfolio/.test(text));
  push("anti-template", /太丑|千篇一律|模板|丑/.test(text));
  push("prompt-dna", /提示词|prompt|风格提示词/.test(text));
  push("layout", /网站|页面|首页|布局|landing/.test(text));
  return tags;
}

function isDesignRelated(row) {
  const text = cleanInline(row.join(" "));
  return /(设计|风格|视觉|页面|网站|排版|杂志|黑白|editorial|布局|界面|ui|ux|landing|参考|灵感|screenshot|截图|首页|作品集|portfolio|showcase|提示词)/i.test(
    text
  );
}

function normalizeItem(row) {
  const originalLink = extractFirstUrl(row[4]);
  const finalLink = extractFirstUrl(row[5]);
  const title = cleanInline(row[2]);
  const seed = finalLink || originalLink || `${row[0]} ${title}`;
  return {
    id: crypto.createHash("sha1").update(seed).digest("hex").slice(0, 12),
    timestamp: cleanInline(row[0]),
    platform: cleanInline(row[1]),
    title,
    source: cleanInline(row[3]),
    originalLink,
    finalLink,
    excerpt: cleanInline(row[6]),
    status: cleanInline(row[7]),
    messageId: cleanInline(row[8]),
    tags: inferTags(row)
  };
}

function dedupeItems(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = item.finalLink || item.originalLink || item.title;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) fail(`Request failed: ${res.status} ${text.slice(0, 240)}`);
  if (data && typeof data === "object" && Number(data.code || 0) !== 0 && Number(data.StatusCode || 0) !== 0) {
    fail(`Feishu API error: ${String(data.msg || data.message || "unknown").slice(0, 240)}`);
  }
  return data;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const spreadsheetToken = parseSpreadsheetToken(args.sheet);
  if (!spreadsheetToken) fail("Could not parse spreadsheet token from --sheet.");

  const cfgPath = path.join(os.homedir(), ".openclaw", "openclaw.json");
  if (!fs.existsSync(cfgPath)) fail(`OpenClaw config not found: ${cfgPath}`);
  const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
  const feishu = cfg?.channels?.feishu || {};
  const appId = String(feishu.appId || "").trim();
  const appSecret = String(feishu.appSecret || "").trim();
  const domain = String(feishu.domain || "feishu").trim().toLowerCase() === "lark" ? "lark" : "feishu";
  if (!appId || !appSecret) fail("Feishu credentials missing in OpenClaw config.");
  const base = domain === "lark" ? "https://open.larksuite.com" : "https://open.feishu.cn";

  const tokenJson = await fetchJson(`${base}/open-apis/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret })
  });
  const token = String(tokenJson?.tenant_access_token || "").trim();
  if (!token) fail("Tenant access token missing.");

  const sheetsJson = await fetchJson(
    `${base}/open-apis/sheets/v3/spreadsheets/${encodeURIComponent(spreadsheetToken)}/sheets/query`,
    {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`
      }
    }
  );
  const firstSheet = Array.isArray(sheetsJson?.data?.sheets) ? sheetsJson.data.sheets[0] : null;
  const sheetId = String(firstSheet?.sheet_id || "").trim();
  const sheetTitle = String(firstSheet?.title || "").trim();
  if (!sheetId) fail("First sheet id missing.");

  const range = `${sheetId}!A1:${toColumnName(args.maxCols)}${Math.max(20, args.maxRows)}`;
  const valuesJson = await fetchJson(
    `${base}/open-apis/sheets/v2/spreadsheets/${encodeURIComponent(spreadsheetToken)}/values/${encodeURIComponent(range)}`,
    {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`
      }
    }
  );
  const values = valuesJson?.data?.valueRange?.values || [];
  const header = (values[0] || []).map((cell) => cellToText(cell));
  const rows = values
    .slice(1)
    .map((row) => (Array.isArray(row) ? row.map((cell) => cellToText(cell)) : []))
    .filter((row) => row.some(Boolean));
  const matched = dedupeItems(rows.filter((row) => isDesignRelated(row)).map((row) => normalizeItem(row)));

  const payload = {
    generatedAt: new Date().toISOString(),
    spreadsheetToken,
    sheetId,
    sheetTitle,
    header,
    totalRows: rows.length,
    matchedRows: matched.length,
    items: matched
  };

  ensureDir(args.out);
  fs.writeFileSync(args.out, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ ok: true, out: args.out, matchedRows: matched.length }, null, 2));
}

main().catch((error) => fail(error instanceof Error ? error.message : String(error)));

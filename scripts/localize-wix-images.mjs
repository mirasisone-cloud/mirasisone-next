#!/usr/bin/env node
/**
 * Wix CDN(static.wixstatic.com)にホットリンクしている画像を
 * public/images/blog/wix/ にダウンロードし、
 * src/content/blog-posts-data.json のURLをローカルパスに書き換える。
 *
 * 使い方: node scripts/localize-wix-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";

const JSON_PATH = "src/content/blog-posts-data.json";
const OUT_DIR = "public/images/blog/wix";
const PUBLIC_PREFIX = "/images/blog/wix";
const HOST = process.env.WIX_HOST ?? "https://static.wixstatic.com";
const URL_RE = new RegExp(
  HOST.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/[^\"'\\s)\\\\]+",
  "g"
);

const EXT_BY_MIME = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "image/svg+xml": ".svg",
};

/** URL から一意なファイル名を作る（WixのメディアID由来） */
function fileNameFor(url) {
  const m = url.match(/\/media\/([^/?]+)/);
  const base = (m ? m[1] : path.basename(new URL(url).pathname))
    .replace(/~mv2/gi, "")
    .replace(/[^A-Za-z0-9._-]/g, "-");
  const ext = (base.match(/\.[A-Za-z0-9]+$/) ?? [""])[0].toLowerCase();
  const stem = ext ? base.slice(0, -ext.length) : base;
  return { stem, ext };
}

async function download(url, dest, attempt = 1) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; image-localizer/1.0)",
      Accept: "image/avif,image/webp,image/png,image/jpeg,*/*",
      Referer: "https://www.mirasisone.com/",
    },
  });
  if (!res.ok) {
    if (attempt < 3 && res.status >= 500) {
      await new Promise((r) => setTimeout(r, 1000 * attempt));
      return download(url, dest, attempt + 1);
    }
    throw new Error(`HTTP ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length === 0) throw new Error("empty body");
  const mime = (res.headers.get("content-type") ?? "").split(";")[0].trim();
  const mimeExt = EXT_BY_MIME[mime];
  const finalDest = mimeExt && path.extname(dest).toLowerCase() !== mimeExt
    ? dest.slice(0, -path.extname(dest).length || undefined) + mimeExt
    : dest;
  await fs.writeFile(finalDest, buf);
  return { file: finalDest, bytes: buf.length };
}

const raw = await fs.readFile(JSON_PATH, "utf8");
JSON.parse(raw); // 事前に妥当性チェック

const urls = [...new Set(raw.match(URL_RE) ?? [])];
console.log(`対象URL: ${urls.length} 件`);
if (urls.length === 0) {
  console.log("書き換え対象がありません。終了します。");
  process.exit(0);
}

await fs.mkdir(OUT_DIR, { recursive: true });

const mapping = new Map();
const failures = [];
const usedNames = new Set();
let done = 0;

const CONCURRENCY = 6;
const queue = [...urls];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    const { stem, ext } = fileNameFor(url);
    let name = stem + (ext || ".png");
    let i = 2;
    while (usedNames.has(name)) name = `${stem}-${i++}${ext || ".png"}`;
    usedNames.add(name);
    try {
      const { file, bytes } = await download(url, path.join(OUT_DIR, name));
      mapping.set(url, `${PUBLIC_PREFIX}/${path.basename(file)}`);
      done++;
      console.log(`  [${done}/${urls.length}] ${path.basename(file)} (${(bytes / 1024).toFixed(0)} KB)`);
    } catch (e) {
      failures.push({ url, error: String(e.message ?? e) });
      console.error(`  [NG] ${url} -> ${e.message ?? e}`);
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// 長いURLから順に置換（部分一致による事故防止）
let out = raw;
for (const [url, local] of [...mapping].sort((a, b) => b[0].length - a[0].length)) {
  out = out.split(url).join(local);
}

JSON.parse(out); // 書き換え後も妥当か確認
await fs.writeFile(JSON_PATH, out, "utf8");

const remaining = (out.match(URL_RE) ?? []).length;
console.log(`\n=== 結果 ===`);
console.log(`ダウンロード成功: ${mapping.size} 件`);
console.log(`失敗: ${failures.length} 件`);
console.log(`JSON内に残った ${HOST} 参照: ${remaining} 件`);
if (failures.length) {
  console.log("\n失敗一覧:");
  for (const f of failures) console.log(`  ${f.url}\n    -> ${f.error}`);
  process.exitCode = 1;
}

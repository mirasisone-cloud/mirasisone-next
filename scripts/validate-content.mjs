#!/usr/bin/env node
/**
 * src/content 配下の JSON を公開前に検証する。
 *
 * なぜ必要か:
 *   2026-10-27 / 11-02 / 11-04 / 11-13 の本番デプロイ失敗は、4件とも
 *   src/content/blog-posts-data.json の JSON 破損が原因だった。
 *   Vercel 側のエラーは `npm run build exited with 1` としか出ないため、
 *   毎回ビルドログを開かないと原因が分からない。
 *   このスクリプトは、壊れている場所を行番号つきで即座に示す。
 *
 * 実行:  npm run validate:content
 *        npm run build でも prebuild として自動実行される
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const DIR = join(process.cwd(), "src", "content");
const errors = [];   // ビルドを止める（放置すると今でもデプロイが落ちるもの）
const warnings = []; // 止めないが直すべきもの
const notes = [];

/** 文字オフセットを「行:桁」に直す */
function at(text, index) {
  const upto = text.slice(0, index);
  const line = upto.split("\n").length;
  const col = index - (upto.lastIndexOf("\n") + 1) + 1;
  return `${line}行目 ${col}文字目`;
}

/** JSON.parse の例外から「行:桁」を取り出す。Node のメッセージ形式が版で揺れるため3通り見る。 */
function whereOf(err, text) {
  const msg = err.message || "";
  // 1) Node 20+ は例外オブジェクトに位置が入る
  if (typeof err.position === "number") return at(text, err.position);
  // 2) メッセージ内の "position N"
  const p = /position (\d+)/.exec(msg);
  if (p) return at(text, Number(p[1]));
  // 3) メッセージ内の "line L column C"
  const lc = /line (\d+) column (\d+)/.exec(msg);
  if (lc) return `${lc[1]}行目 ${lc[2]}文字目`;
  // 4) 古い形式は位置を持たないが、周辺の文字列を引用してくれる:
  //    Unexpected token ']', ..."<抜粋>"... is not valid JSON
  const snip = /\.\.\."([\s\S]{8,})"\.\.\./.exec(msg);
  if (snip) {
    const i = text.indexOf(snip[1]);
    if (i !== -1) return at(text, i);
  }
  return null;
}

/** 「N行目」表記から該当行の中身を返す */
function lineTextOf(where, text) {
  const m = where && /^(\d+)行目/.exec(where);
  if (!m) return "";
  const line = text.split("\n")[Number(m[1]) - 1];
  return line ? `\n    該当行: ${line.trim().slice(0, 120)}` : "";
}

function checkFile(file) {
  const path = join(DIR, file);
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch (e) {
    errors.push(`${file}: 読み込めません (${e.code})`);
    return;
  }

  // 1) Markdown のコードフェンス混入（11/13 の失敗原因そのもの）
  const fence = text.indexOf("```");
  if (fence !== -1) {
    errors.push(
      `${file}: Markdown のコードフェンス \`\`\` が ${at(text, fence)} に混入しています。\n` +
      `    生成結果を貼るときに \`\`\`json と \`\`\` の行ごとコピーしてしまうと起きます。その2行を削除してください。`
    );
    return; // パースしても無意味なのでここで打ち切る
  }

  // 2) BOM（GitHub の Web エディタ経由でまれに付く）
  if (text.charCodeAt(0) === 0xfeff) {
    errors.push(`${file}: 先頭に BOM が付いています。削除してください。`);
    return;
  }

  // 3) JSON として妥当か
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    const where = whereOf(e, text);
    errors.push(
      `${file}: JSON が壊れています（${where ?? "位置不明"}）\n    ${e.message}` +
      lineTextOf(where, text)
    );
    return;
  }

  if (!Array.isArray(data)) {
    errors.push(`${file}: 配列であるべきですが ${typeof data} でした。`);
    return;
  }

  // 4) ファイル固有のチェック
  const required =
    file === "blog-posts-data.json"
      ? ["slug", "title", "description", "category", "publishedAt", "content"]
      : file === "home-works-data.json"
      ? ["title", "image", "href"]
      : [];

  const seen = new Map();
  data.forEach((entry, i) => {
    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
      errors.push(`${file}: ${i + 1}件目がオブジェクトではありません。`);
      return;
    }
    const missing = required.filter(
      (k) => entry[k] === undefined || entry[k] === null || entry[k] === ""
    );
    if (missing.length) {
      errors.push(
        `${file}: ${i + 1}件目（slug: ${entry.slug ?? entry.title ?? "不明"}）に ${missing.join(", ")} がありません。`
      );
    }
    const key = entry.slug ?? entry.href;
    if (key != null) {
      if (seen.has(key)) {
        warnings.push(
          `${file}: slug「${key}」が重複しています（${seen.get(key) + 1}件目と${i + 1}件目）。\n` +
          `    記事ページは片方しか表示されず、一覧には2回出ます。どちらを残すか決めて片方を削除してください。`
        );
      } else {
        seen.set(key, i);
      }
    }
  });

  notes.push(`${file}: ${data.length}件 — 問題なし`);
}

const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
if (files.length === 0) {
  console.error("src/content に JSON がありません。実行場所がリポジトリ直下か確認してください。");
  process.exit(1);
}
files.forEach(checkFile);

if (warnings.length) {
  console.warn("\n⚠ 警告（ビルドは通りますが直してください）\n");
  warnings.forEach((w) => console.warn("  " + w + "\n"));
}

if (errors.length) {
  console.error("\n❌ このままでは本番ビルドが失敗します\n");
  errors.forEach((e) => console.error("  " + e + "\n"));
  console.error(`${errors.length}件。直してから push してください。\n`);
  process.exit(1);
}

console.log("✅ 公開前チェック: ビルドを止める問題はありません");
notes.forEach((n) => console.log("   " + n));
if (warnings.length) console.log(`   （警告 ${warnings.length}件は上記のとおり）`);

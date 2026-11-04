/**
 * サイトで実際に使っている文字だけを収録した日本語フォントを作る。
 *
 * Google Fonts は日本語を約20個のまとまりに分けて配信するため、1文字でも含まれていれば
 * そのまとまり全体(数十KB)が落ちてくる。TOPでは日本語フォントだけで約2.1MBあった。
 *
 * ここで作る自前フォントには unicode-range を付けてあるので、収録していない文字
 * (記事を追加して新しい漢字が出た場合など)は従来どおり Google Fonts 側から落ちる。
 * 表示が欠けることはない。CSSは Google Fonts の <link> より後ろに置くこと。
 *
 * 実行: node scripts/subset-jp-fonts.mjs   （要 pip install fonttools brotli）
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import os from 'os';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'public/fonts');
// 元のフォント(1本3〜4MB)は公開物に混ぜないよう、OSの一時領域に置く
const WORK = path.join(os.tmpdir(), 'mirasisone-jp-fonts');

const FACES = [
  { family: 'Noto Sans JP', gf: 'Noto+Sans+JP', weights: [400, 500, 700], slug: 'noto-sans-jp' },
  { family: 'Noto Serif JP', gf: 'Noto+Serif+JP', weights: [400, 700], slug: 'noto-serif-jp' },
];

// 1) ソースに出てくる文字を全部集める
const chars = new Set();
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx|json)$/.test(e.name)) for (const ch of fs.readFileSync(p, 'utf8')) chars.add(ch);
  }
};
walk(SRC);

// 記事を足したときに崩れにくいよう、かな・英数・記号は全部入れておく
const addRange = (from, to) => { for (let n = from; n <= to; n += 1) chars.add(String.fromCodePoint(n)); };
addRange(0x0020, 0x007e); // 半角英数記号
addRange(0x3000, 0x30ff); // 句読点・ひらがな・カタカナ
addRange(0xff00, 0xff5e); // 全角英数記号
addRange(0xffe0, 0xffe6); // 全角通貨記号
for (const ch of '　、。「」『』・ー〜…‥！？±×÷≒≠←↑→↓△▲▽▼○●◎□■◇◆☆★※〒') chars.add(ch);

const codes = [...chars].map((c) => c.codePointAt(0)).filter((n) => n > 0x1f).sort((a, b) => a - b);
console.log('収録する文字数:', codes.length);

// 2) unicode-range 用に連続する範囲へまとめる
const ranges = [];
for (const n of codes) {
  const last = ranges[ranges.length - 1];
  if (last && n === last[1] + 1) last[1] = n;
  else ranges.push([n, n]);
}
const hex = (n) => n.toString(16).toUpperCase().padStart(4, '0');
const unicodeRange = ranges.map(([a, b]) => (a === b ? `U+${hex(a)}` : `U+${hex(a)}-${hex(b)}`)).join(',');
console.log('unicode-range の範囲数:', ranges.length);

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(WORK, { recursive: true });

const IE = { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko' };
let css = '/* サイトで使う文字だけを収録した日本語フォント。作り直しは scripts/subset-jp-fonts.mjs */\n';
let before = 0;
let after = 0;

for (const face of FACES) {
  // 分割されていない1ファイル版のURLを得る（古いUAだと woff で返ってくる）
  const list = face.weights.join(';');
  const gfCss = await (await fetch(`https://fonts.googleapis.com/css2?family=${face.gf}:wght@${list}`, { headers: IE })).text();
  const blocks = gfCss.split('@font-face').slice(1);

  for (const w of face.weights) {
    const block = blocks.find((b) => new RegExp(`font-weight:\\s*${w}\\b`).test(b));
    if (!block) { console.log('  !! 見つからない', face.family, w); continue; }
    const url = (block.match(/url\(([^)]+)\)/) || [])[1];
    const raw = path.join(WORK, `${face.slug}-${w}.woff`);
    const sub = path.join(OUT, `${face.slug}-${w}.woff2`);
    fs.writeFileSync(raw, Buffer.from(await (await fetch(url)).arrayBuffer()));

    execFileSync('python', ['-m', 'fontTools.subset', raw,
      `--unicodes=${ranges.map(([a, b]) => (a === b ? hex(a) : `${hex(a)}-${hex(b)}`)).join(',')}`,
      '--flavor=woff2', '--layout-features=*', '--no-hinting', `--output-file=${sub}`], { stdio: 'inherit' });

    const b = fs.statSync(raw).size;
    const a = fs.statSync(sub).size;
    before += b; after += a;
    console.log(`  ${face.family} ${w}: ${(b / 1024).toFixed(0)}KB -> ${(a / 1024).toFixed(0)}KB`);

    css += `@font-face{font-family:"${face.family}";font-style:normal;font-weight:${w};font-display:swap;`
      + `src:url("/fonts/${face.slug}-${w}.woff2") format("woff2");unicode-range:${unicodeRange}}\n`;
  }
}

fs.writeFileSync(path.join(OUT, 'jp-subset.css'), css);
console.log(`合計 ${(before / 1e6).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB`);
console.log('CSS:', (fs.statSync(path.join(OUT, 'jp-subset.css')).size / 1024).toFixed(1) + 'KB');

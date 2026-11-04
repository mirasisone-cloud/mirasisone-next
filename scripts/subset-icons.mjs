// 使っているアイコンだけを残したフォントとCSSを作る
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const OUT = 'C:/Users/user/Claude/mirasisone-next/public/fonts';
const WORK = 'C:/Users/user/AppData/Local/Temp/claude/C--Users-user-Claude/11cf9ede-cd5a-4f33-ae4b-b3252ab47b0f/scratchpad/icons';
const SRC = 'C:/Users/user/Claude/mirasisone-next/src';
const BASE = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src';

const WEIGHTS = [
  { key: 'regular', prefix: 'ph', family: 'Phosphor' },
  { key: 'bold', prefix: 'ph-bold', family: 'Phosphor-Bold' },
  { key: 'fill', prefix: 'ph-fill', family: 'Phosphor-Fill' },
];

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(WORK, { recursive: true });

// 1) ソースから「どの太さで、どのアイコンを使っているか」を集める
const used = {};
for (const w of WEIGHTS) used[w.key] = new Set();
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx|json)$/.test(e.name)) {
      const text = fs.readFileSync(p, 'utf8');
      for (const m of text.matchAll(/\bph(-bold|-fill|-thin|-light|-duotone)? ph-([a-z0-9-]+)/g)) {
        const suffix = (m[1] || '').replace('-', '');
        const key = suffix === '' ? 'regular' : suffix;
        if (used[key]) used[key].add(m[2]);
      }
    }
  }
};
walk(SRC);
for (const w of WEIGHTS) console.log(w.key, ':', used[w.key].size, '種類');

// 2) 各太さのCSSを取得し、使うアイコンのコードポイントを引く
let css = '/* 使用しているアイコンだけを収録した自前ホストの Phosphor。元は CDN から全アイコン(各約140KB)を読んでいた */\n';
for (const w of WEIGHTS) {
  const names = [...used[w.key]].sort();
  if (!names.length) continue;
  const srcCss = await (await fetch(`${BASE}/${w.key}/style.css`)).text();

  const map = new Map();
  for (const m of srcCss.matchAll(/\.([a-z0-9.\\-]+):before\s*\{\s*content:\s*"\\([0-9a-fA-F]+)"/g)) {
    for (const cls of m[1].split('.')) {
      const name = cls.replace(/^ph-/, '').replace(/\\/g, '');
      if (name) map.set(name, m[2]);
    }
  }

  const found = [];
  const missing = [];
  for (const n of names) (map.has(n) ? found : missing).push(n);
  if (missing.length) console.log('  !! CSSに無い:', w.key, missing.join(','));

  const fontUrl = (srcCss.match(/url\("?([^")]+\.woff2)"?\)/) || [])[1];
  const abs = new URL(fontUrl, `${BASE}/${w.key}/`).href;
  const raw = path.join(WORK, `${w.key}.woff2`);
  const sub = path.join(OUT, `phosphor-${w.key}.woff2`);
  const buf = Buffer.from(await (await fetch(abs)).arrayBuffer());
  fs.writeFileSync(raw, buf);

  const unicodes = found.map((n) => 'U+' + map.get(n)).join(',');
  execFileSync('python', ['-m', 'fontTools.subset', raw,
    `--unicodes=${unicodes}`, '--flavor=woff2', '--layout-features=', `--output-file=${sub}`], { stdio: 'inherit' });

  const before = fs.statSync(raw).size, after = fs.statSync(sub).size;
  console.log(`  ${w.key}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${found.length}字)`);

  css += `@font-face{font-family:"${w.family}";src:url("/fonts/phosphor-${w.key}.woff2") format("woff2");font-weight:400;font-style:normal;font-display:block}\n`;
  const sel = w.key === 'regular' ? '.ph' : `.${w.prefix}`;
  css += `${sel}{font-family:"${w.family}" !important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block}\n`;
  css += found.map((n) => `${sel}.ph-${n}:before`).join(',') + '{}\n';
  for (const n of found) css += `${sel}.ph-${n}:before{content:"\\${map.get(n)}"}\n`;
}

fs.writeFileSync(path.join(OUT, 'phosphor-subset.css'), css);
console.log('CSS:', (fs.statSync(path.join(OUT, 'phosphor-subset.css')).size / 1024).toFixed(1) + 'KB');

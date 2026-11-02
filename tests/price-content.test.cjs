// /price に載せる金額は、公開中の屋内LP・屋外LPと同じでなければならない。
// 片方だけ直して食い違う事故を防ぐための番人。
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const compiled = ts.transpileModule(fs.readFileSync('src/content/price.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const module_ = { exports: {} };
vm.runInContext(compiled, vm.createContext({ exports: module_.exports, module: module_ }));
const { indoorTiers, outdoorTiers, priceFaqs, priceNotes, priceVariables } = module_.exports;

// 公開中のLPに書かれている金額。変えるときは必ず両LPも直すこと。
const PUBLISHED_INDOOR = ['200', '500', '1,000'];
const PUBLISHED_OUTDOOR = ['500', '1,000', '2,000'];

test('金額が公開中のLPと一致している', () => {
  // VM内で作られた配列は prototype が別realmのため deepStrictEqual では比較できない。
  // 中身を文字列にして比べる。
  assert.equal(indoorTiers.map((t) => t.amount).join('/'), PUBLISHED_INDOOR.join('/'));
  assert.equal(outdoorTiers.map((t) => t.amount).join('/'), PUBLISHED_OUTDOOR.join('/'));
  for (const tier of [...indoorTiers, ...outdoorTiers]) {
    assert.equal(tier.amountUnit, '万円〜', `${tier.scale} の単位が違う`);
  }
});

test('各プランに規模・用途・含まれるものが揃っている', () => {
  for (const tier of [...indoorTiers, ...outdoorTiers]) {
    assert.ok(tier.scale.length > 0, '規模名が空');
    assert.ok(tier.fits.length > 0, `${tier.scale} の用途が空`);
    assert.ok(tier.includes.length >= 3, `${tier.scale} の「含まれるもの」が少なすぎる`);
    assert.ok(Array.isArray(tier.excludes), `${tier.scale} の excludes が配列でない`);
  }
});

test('FAQの回答にも同じ金額が書かれている', () => {
  const indoorAnswer = priceFaqs.find(([q]) => q.includes('屋内'))[1];
  for (const amount of PUBLISHED_INDOOR) {
    assert.ok(indoorAnswer.includes(amount + '万円'), `屋内FAQに ${amount}万円 が無い`);
  }
  const outdoorAnswer = priceFaqs.find(([q]) => q.includes('屋外'))[1];
  for (const amount of PUBLISHED_OUTDOOR) {
    assert.ok(outdoorAnswer.includes(amount + '万円'), `屋外FAQに ${amount}万円 が無い`);
  }
});

test('誤解を招かないための注記が落ちていない', () => {
  const all = priceNotes.join('\n');
  assert.ok(all.includes('下限'), '「下限の目安」である旨が無い');
  assert.ok(all.includes('税抜'), '税抜表記が無い');
  assert.ok(all.includes('現地調査'), '正式見積りは現地調査後である旨が無い');
  assert.ok(all.includes('運用コスト'), '常設の年間運用コストの注記が無い');
});

test('費用を左右する変数に屋外の条件も入っている', () => {
  const all = priceVariables.join('\n');
  for (const word of ['映像の本数', '輝度', '常設', '屋外']) {
    assert.ok(all.includes(word), `変数に「${word}」が無い`);
  }
});

test('FAQは構造化データに出せる形になっている', () => {
  assert.ok(priceFaqs.length >= 3, 'FAQが少なすぎる');
  for (const entry of priceFaqs) {
    assert.equal(entry.length, 2);
    const [q, a] = entry;
    assert.ok(q.endsWith('。') || q.endsWith('？'), `質問の末尾が不自然: ${q}`);
    assert.ok(a.length >= 40, `回答が短すぎる: ${q}`);
  }
});

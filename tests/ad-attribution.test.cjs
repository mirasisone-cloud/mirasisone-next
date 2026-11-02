// 流入元の記録ロジックを、ブラウザを立てずに検証する。
// window / document / sessionStorage を偽装して実際のコードを動かす。
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync('src/components/AdAttribution.tsx', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React },
}).outputText;

const ORIGIN = 'https://mirasisone.com';

function load({ search = '', referrer = '', pathname = '/', storage = null, storageThrows = false } = {}) {
  const store = new Map(Object.entries(storage ?? {}));
  const sessionStorage = {
    getItem(key) { if (storageThrows) throw new Error('blocked'); return store.has(key) ? store.get(key) : null; },
    setItem(key, v) { if (storageThrows) throw new Error('blocked'); store.set(key, v); },
  };
  const module = { exports: {} };
  const context = vm.createContext({
    exports: module.exports, module,
    require: (name) => (name === 'react' ? { useEffect() {} } : require(name)),
    window: { location: { search, pathname, origin: ORIGIN }, sessionStorage },
    document: { referrer },
    URLSearchParams, JSON, Date, Object,
  });
  vm.runInContext(compiled, context);
  return { api: module.exports, store };
}

test('a Google Ads landing is recorded with its campaign id', () => {
  const { api, store } = load({
    search: '?gad_source=1&gad_campaignid=24247049403&gbraid=0AAAAA-Ozck5f',
    referrer: 'https://www.google.com/',
  });
  const record = api.captureAdAttribution();
  assert.ok(record, '広告着地が記録されていない');
  assert.equal(record.params.gad_campaignid, '24247049403');
  assert.equal(record.params.gbraid, '0AAAAA-Ozck5f');
  assert.equal(record.referrer, 'https://www.google.com/');
  assert.ok(store.has('mrs_attr'), 'sessionStorage に保存されていない');
  assert.equal(api.formatAdAttribution(record), 'Google広告 / キャンペーンID 24247049403 / 着地 /');
});

test('first touch wins so moving to /contact does not overwrite the ad landing', () => {
  const first = JSON.stringify({ params: { gclid: 'abc' }, landing: '/', at: '2026-11-02T00:00:00.000Z' });
  const { api, store } = load({ search: '', pathname: '/contact', storage: { mrs_attr: first } });
  assert.equal(api.captureAdAttribution(), null, '既存の記録を上書きしてはいけない');
  assert.equal(store.get('mrs_attr'), first);
});

test('an internal referrer is not stored and a plain visit records nothing', () => {
  const internal = load({ referrer: ORIGIN + '/works' });
  assert.equal(internal.api.captureAdAttribution(), null, '自サイト内の遷移は流入元ではない');
  assert.equal(internal.store.has('mrs_attr'), false);

  const direct = load({});
  assert.equal(direct.api.captureAdAttribution(), null, 'パラメータも参照元も無い訪問は記録しない');
});

test('an organic search landing is recorded by its referrer alone', () => {
  const { api } = load({ referrer: 'https://www.bing.com/search', pathname: '/contact' });
  const record = api.captureAdAttribution();
  assert.ok(record);
  // VM 内で作られたオブジェクトは prototype が別realmのため deepStrictEqual では比較できない。
  // 中身が空であることだけを見る。
  assert.equal(Object.keys(record.params).length, 0);
  assert.equal(api.formatAdAttribution(record), '参照元 https://www.bing.com/search / 着地 /contact');
});

test('utm parameters are formatted when no click id is present', () => {
  const { api } = load({ search: '?utm_source=newsletter&utm_medium=email&utm_campaign=autumn' });
  const record = api.captureAdAttribution();
  assert.equal(
    api.formatAdAttribution(record),
    'utm_source=newsletter / utm_campaign=autumn / utm_medium=email / 着地 /',
  );
});

test('blocked storage never throws and never breaks the enquiry', () => {
  const { api } = load({ search: '?gclid=abc', storageThrows: true });
  assert.equal(api.captureAdAttribution(), null);
  assert.equal(api.readAdAttribution(), null);
});

test('a corrupt stored record reads as absent rather than throwing', () => {
  const { api } = load({ storage: { mrs_attr: 'not json' } });
  assert.equal(api.readAdAttribution(), null);
  assert.equal(api.formatAdAttribution(null), '記録なし');
});

test('over-long values are truncated so the API length limit is never hit', () => {
  const { api } = load({ search: '?gclid=' + 'x'.repeat(6000), referrer: 'https://e.test/' + 'y'.repeat(6000) });
  const record = api.captureAdAttribution();
  assert.equal(record.params.gclid.length, 500);
  assert.equal(record.referrer.length, 500);
});

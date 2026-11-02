// Exercise the real route with an isolated environment and a mocked mail transport.
// No environment files are loaded and no network calls leave this process.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const compiled = ts.transpileModule(fs.readFileSync('src/app/api/contact/route.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const valid = { consultation: 'プロジェクションマッピング', overview: '検証用の架空の相談', status: '情報収集段階', schedule: '未定', budget: '未定', name: '検証担当', kana: 'けんしょうたんとう', email: 'test@example.invalid', privacy: 'accepted' };
function harness({ configured = true, outcomes = [] } = {}) {
  const calls = [];
  const module = { exports: {} };
  const context = vm.createContext({
    exports: module.exports, module, require: (name) => { assert.equal(name, 'next/server'); return require(name); },
    process: { env: configured ? { RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'test@example.invalid', CONTACT_TO_EMAIL: 'team@example.invalid, backup@example.invalid' } : {} },
    console: { error() {} }, AbortSignal,
    fetch: async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      calls.push(JSON.parse(options.body));
      const outcome = outcomes[calls.length - 1] ?? 200;
      if (outcome === 'timeout') throw new DOMException('Timeout', 'TimeoutError');
      return new Response('{}', { status: outcome });
    },
  });
  vm.runInContext(compiled, context);
  return { calls, post: (body, raw = false) => module.exports.POST(new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: raw ? body : JSON.stringify(body) })) };
}
test('reject malformed JSON, null, arrays and non-string fields before delivery', async () => {
  const h = harness();
  for (const body of ['{', 'null', '[]', JSON.stringify({ ...valid, name: {} })]) assert.equal((await h.post(body, true)).status, 400);
  assert.equal(h.calls.length, 0);
});
test('reject missing, whitespace-only, invalid email and missing consent without delivery', async () => {
  const h = harness();
  for (const change of [{ name: '' }, { overview: '   ' }, { email: 'invalid' }, { privacy: '' }, { location: 'x'.repeat(5001) }]) assert.equal((await h.post({ ...valid, ...change })).status, 400);
  assert.equal(h.calls.length, 0);
  assert.equal((await h.post(valid)).status, 200, 'validation corrections must not exhaust the rate limit');
});
test('honeypot drops submissions without sending mail', async () => {
  const h = harness();
  assert.equal((await h.post({ company_website: 'bot' })).status, 200);
  assert.equal(h.calls.length, 0);
});
test('success notifies all recipients, sets reply-to and sends acknowledgement', async () => {
  const h = harness();
  assert.equal((await h.post({ ...valid, overview: '<script>alert(1)</script>' })).status, 200);
  assert.equal(h.calls.length, 2);
  assert.deepEqual(h.calls[0].to, ['team@example.invalid', 'backup@example.invalid']);
  assert.equal(h.calls[0].reply_to, valid.email);
  assert.ok(h.calls[0].html.includes('&lt;script&gt;'));
  assert.ok(!h.calls[0].html.includes('<script>'));
  assert.equal(h.calls[1].to, valid.email);
  assert.equal(h.calls[1].reply_to, 'team@example.invalid');
});
test('missing configuration and failed/timeout delivery return errors', async () => {
  const h = harness({ configured: false });
  assert.equal((await h.post(valid)).status, 500);
  assert.equal(h.calls.length, 0);
  for (const outcome of [503, 'timeout']) {
    const failed = harness({ outcomes: [outcome] });
    assert.equal((await failed.post(valid)).status, 502);
    assert.equal(failed.calls.length, 1);
  }
});
test('acknowledgement failure does not ask the user to resend an accepted inquiry', async () => {
  const h = harness({ outcomes: [200, 503] });
  assert.equal((await h.post(valid)).status, 200);
  assert.equal(h.calls.length, 2);
});
test('rate limit blocks the sixth valid submission before mail delivery', async () => {
  const h = harness();
  for (let i = 0; i < 5; i++) assert.equal((await h.post(valid)).status, 200);
  assert.equal((await h.post(valid)).status, 429);
  assert.equal(h.calls.length, 10);
});
// 2026-11-02 追加。問い合わせの流入元が通知メールに載り、キャンペーンIDが名前に解決され、
// 顧客向けの自動返信には載らないことを確認する。
test('attribution reaches the notification mail, resolves the campaign and stays out of the acknowledgement', async () => {
  const h = harness();
  const attribution = 'Google広告 / キャンペーンID 24247049403 / 着地 /';
  assert.equal((await h.post({ ...valid, attribution })).status, 200);
  assert.equal(h.calls.length, 2);

  const notification = h.calls[0];
  assert.ok(notification.text.includes('流入元:'), '通知メールに流入元の行がない');
  assert.ok(
    notification.text.includes('キャンペーン 屋内_プロジェクションマッピング_検索（24247049403）'),
    'キャンペーンIDが名前に解決されていない',
  );
  assert.ok(!h.calls[1].text.includes('キャンペーン'), '自動返信に流入元が混ざっている');
  assert.ok(!h.calls[1].text.includes('gclid'), '自動返信に広告識別子が混ざっている');
});
test('an unknown campaign id is kept as-is and a missing attribution is recorded as absent', async () => {
  const unknown = harness();
  assert.equal((await unknown.post({ ...valid, attribution: 'Google広告 / キャンペーンID 99999999999' })).status, 200);
  assert.ok(unknown.calls[0].text.includes('キャンペーンID 99999999999'), '未知のIDはそのまま残すべき');

  const none = harness();
  assert.equal((await none.post(valid)).status, 200);
  assert.ok(none.calls[0].text.includes('流入元: 記録なし'), '流入元が無い場合は「記録なし」と書くべき');
});
test('attribution is not a required field and cannot bypass the length limit', async () => {
  const h = harness();
  assert.equal((await h.post({ ...valid, attribution: '' })).status, 200, '流入元は必須ではない');
  assert.equal((await h.post({ ...valid, attribution: 'x'.repeat(5001) })).status, 400, '長さ制限は流入元にも効くべき');
});

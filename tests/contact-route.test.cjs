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

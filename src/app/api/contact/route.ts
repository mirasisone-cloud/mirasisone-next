import { NextResponse } from "next/server";

type ContactPayload = {
  consultation?: string;
  overview?: string;
  status?: string;
  schedule?: string;
  budget?: string;
  location?: string;
  name?: string;
  kana?: string;
  email?: string;
  /** ハニーポット。人間には見えない項目なので、埋まっていればボット */
  company_website?: string;
};

const requiredFields: Array<keyof ContactPayload> = [
  "consultation",
  "overview",
  "status",
  "schedule",
  "budget",
  "name",
  "kana",
  "email",
];

/** 会社の受信先。環境変数 CONTACT_TO_EMAIL が未設定でも正しい宛先に届くようにする */
const FALLBACK_TO_EMAIL = "company@mirasisone.com";

/**
 * 通知の宛先。CONTACT_TO_EMAIL はカンマ区切りで複数指定できる。
 * Resend は複数宛先を配列で受け取る仕様のため、ここで配列に分解する
 * （company@ が迷惑メールに振り分けられても気づけるよう、Gmail にも同時に送る運用）。
 */
function notificationRecipients() {
  const list = (process.env.CONTACT_TO_EMAIL ?? FALLBACK_TO_EMAIL)
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  return list.length > 0 ? list : [FALLBACK_TO_EMAIL];
}
/** 1項目あたりの最大文字数（極端に長い投稿を弾く） */
const MAX_FIELD_LENGTH = 5000;

function value(payload: ContactPayload, key: keyof ContactPayload) {
  return String(payload[key] ?? "").trim();
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

/** 同一IPからの連投を抑える簡易レート制限（インスタンス単位・ベストエフォート） */
const recentSubmissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const history = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  history.push(now);
  recentSubmissions.set(ip, history);

  if (recentSubmissions.size > 500) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentSubmissions.delete(key);
    }
  }

  return history.length > RATE_LIMIT_MAX;
}

function buildMessage(payload: ContactPayload) {
  const rows = [
    ["ご相談内容", value(payload, "consultation")],
    ["プロジェクト概要", value(payload, "overview")],
    ["ご相談ステータス", value(payload, "status")],
    ["実施予定時期", value(payload, "schedule")],
    ["ご予算", value(payload, "budget")],
    ["実施場所", value(payload, "location") || "未入力"],
    ["お名前", value(payload, "name")],
    ["ふりがな", value(payload, "kana")],
    ["メールアドレス", value(payload, "email")],
  ];

  const text = rows.map(([label, rowValue]) => `${label}: ${rowValue}`).join("\n");
  const html = `
    <h2>MIRASISONE お問い合わせ</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">
      ${rows
        .map(
          ([label, rowValue]) => `
            <tr>
              <th align="left" style="border:1px solid #d7e3ec;background:#f6fbff;width:180px">${escapeHtml(label)}</th>
              <td style="border:1px solid #d7e3ec;white-space:pre-wrap">${escapeHtml(rowValue)}</td>
            </tr>
          `,
        )
        .join("")}
    </table>
  `;

  return { text, html };
}

/** 送信者への自動返信メール */
function buildAutoReply(payload: ContactPayload) {
  const name = value(payload, "name");
  const text = `${name} 様

このたびはMIRASISONEへお問い合わせいただき、誠にありがとうございます。
以下の内容で承りました。内容を確認のうえ、2営業日以内に担当者よりご連絡いたします。

──────────────────
ご相談内容: ${value(payload, "consultation")}
実施予定時期: ${value(payload, "schedule")}
ご予算: ${value(payload, "budget")}
実施場所: ${value(payload, "location") || "未入力"}

プロジェクト概要:
${value(payload, "overview")}
──────────────────

※このメールは自動送信です。ご返信いただいても対応いたしかねます。
　お急ぎの場合は ${FALLBACK_TO_EMAIL} までご連絡ください。

MIRASISONE
${FALLBACK_TO_EMAIL}
`;

  const html = `
    <p>${escapeHtml(name)} 様</p>
    <p>このたびはMIRASISONEへお問い合わせいただき、誠にありがとうございます。<br>
    以下の内容で承りました。内容を確認のうえ、2営業日以内に担当者よりご連絡いたします。</p>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px">
      <tr><th align="left" style="border:1px solid #d7e3ec;background:#f6fbff;width:150px">ご相談内容</th><td style="border:1px solid #d7e3ec">${escapeHtml(value(payload, "consultation"))}</td></tr>
      <tr><th align="left" style="border:1px solid #d7e3ec;background:#f6fbff">実施予定時期</th><td style="border:1px solid #d7e3ec">${escapeHtml(value(payload, "schedule"))}</td></tr>
      <tr><th align="left" style="border:1px solid #d7e3ec;background:#f6fbff">ご予算</th><td style="border:1px solid #d7e3ec">${escapeHtml(value(payload, "budget"))}</td></tr>
      <tr><th align="left" style="border:1px solid #d7e3ec;background:#f6fbff">実施場所</th><td style="border:1px solid #d7e3ec">${escapeHtml(value(payload, "location") || "未入力")}</td></tr>
      <tr><th align="left" style="border:1px solid #d7e3ec;background:#f6fbff">プロジェクト概要</th><td style="border:1px solid #d7e3ec;white-space:pre-wrap">${escapeHtml(value(payload, "overview"))}</td></tr>
    </table>
    <p style="color:#667085;font-size:13px">※このメールは自動送信です。ご返信いただいても対応いたしかねます。<br>
    お急ぎの場合は ${FALLBACK_TO_EMAIL} までご連絡ください。</p>
    <p style="color:#233f86"><strong>MIRASISONE</strong><br>${FALLBACK_TO_EMAIL}</p>
  `;

  return { text, html };
}

type SendArgs = {
  apiKey: string;
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

async function sendEmail({ apiKey, from, to, subject, text, html, replyTo }: SendArgs) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text, html, reply_to: replyTo }),
  });

  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${await response.text()}`);
  }

  return response;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "送信内容を読み取れませんでした。" }, { status: 400 });
  }

  // ハニーポットが埋まっていればボット。成功したように見せて黙って破棄する
  if (value(payload, "company_website")) {
    return NextResponse.json({ message: "送信しました。" });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "送信回数の上限に達しました。しばらく時間をおいてお試しください。" },
      { status: 429 },
    );
  }

  const missing = requiredFields.filter((field) => !value(payload, field));

  if (missing.length > 0) {
    return NextResponse.json({ message: "必須項目を入力してください。", missing }, { status: 400 });
  }

  if (requiredFields.some((field) => value(payload, field).length > MAX_FIELD_LENGTH)) {
    return NextResponse.json({ message: "入力内容が長すぎます。" }, { status: 400 });
  }

  const senderEmail = value(payload, "email");

  if (!isValidEmail(senderEmail)) {
    return NextResponse.json(
      { message: "メールアドレスの形式をご確認ください。", missing: ["email"] },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = notificationRecipients();
  const from = process.env.CONTACT_FROM_EMAIL ?? "MIRASISONE <onboarding@resend.dev>";

  const { text, html } = buildMessage(payload);
  const subject = `【MIRASISONE】お問い合わせ: ${value(payload, "name")} 様`;

  if (!apiKey) {
    // 設定漏れで問い合わせを失わないよう、内容をログに残す（Vercel のログから復旧できる）
    console.error("[contact] RESEND_API_KEY 未設定のため送信できませんでした。内容:\n" + text);
    return NextResponse.json(
      {
        message: `送信に失敗しました。お手数ですが ${FALLBACK_TO_EMAIL} まで直接ご連絡ください。`,
      },
      { status: 500 },
    );
  }

  try {
    await sendEmail({ apiKey, from, to, subject, text, html, replyTo: senderEmail });
  } catch (error) {
    // 送信失敗時も内容を失わないようログに残す
    console.error("[contact] 通知メールの送信に失敗しました:", error);
    console.error("[contact] 失われた問い合わせ内容:\n" + text);
    return NextResponse.json(
      {
        message: `送信に失敗しました。お手数ですが ${FALLBACK_TO_EMAIL} まで直接ご連絡ください。`,
      },
      { status: 502 },
    );
  }

  // 自動返信は補助的な機能。失敗しても問い合わせ自体は成功として扱う
  try {
    const autoReply = buildAutoReply(payload);
    await sendEmail({
      apiKey,
      from,
      to: senderEmail,
      subject: "【MIRASISONE】お問い合わせありがとうございます",
      text: autoReply.text,
      html: autoReply.html,
      replyTo: to[0],
    });
  } catch (error) {
    console.error("[contact] 自動返信メールの送信に失敗しました（通知メールは送信済み）:", error);
  }

  return NextResponse.json({ message: "送信しました。" });
}

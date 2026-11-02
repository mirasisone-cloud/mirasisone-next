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
  privacy?: string;
  /**
   * 着地時に拾った流入元を1行にしたもの（src/components/AdAttribution.tsx が作る）。
   * 画面の入力項目ではないため必須判定にも入れない。通知メールにだけ載せる。
   */
  attribution?: string;
  /** ハニーポット。人間には見えない項目なので、埋まっていればボット */
  company_website?: string;
};

// 2026-10-29: 初回の問い合わせで必須9項目は重く、離脱の主因と判断したため
// overview / name / email の3つ（＋別途検証している privacy）だけを必須にした。
// 画面側（src/content/contact.ts）の required とバッジ表記も同じ内容に合わせてある。
// 片方だけ変えると、画面では送れてもここで400になるので必ず両方そろえること。
const requiredFields: Array<keyof ContactPayload> = [
  "overview",
  "name",
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

/** 任意項目が空のとき、通知メールの欄が空白にならないようにする表示用 */
function display(payload: ContactPayload, key: keyof ContactPayload) {
  return value(payload, key) || "未記入";
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

/**
 * 稼働中のキャンペーンID。通知メールで「どのキャンペーン由来か」をその場で読めるようにする。
 * ここに無いIDはそのまま数字で表示する（新しいキャンペーンを作っても壊れない）。
 */
const CAMPAIGN_NAMES: Record<string, string> = {
  "23907107518": "プロジェクションマッピング_検索（主力）",
  "24247049403": "屋内_プロジェクションマッピング_検索",
};

/** 流入元の文字列に含まれるキャンペーンIDを、読める名前に置き換える */
function withCampaignName(attribution: string) {
  return attribution.replace(/キャンペーンID (\d+)/, (whole, id: string) => {
    const name = CAMPAIGN_NAMES[id];
    return name ? `キャンペーン ${name}（${id}）` : whole;
  });
}

function buildMessage(payload: ContactPayload) {
  const attribution = value(payload, "attribution");
  const rows = [
    ["ご相談内容", display(payload, "consultation")],
    ["プロジェクト概要", value(payload, "overview")],
    ["ご相談ステータス", display(payload, "status")],
    ["実施予定時期", display(payload, "schedule")],
    ["ご予算", display(payload, "budget")],
    ["実施場所", value(payload, "location") || "未入力"],
    ["お名前", value(payload, "name")],
    ["ふりがな", display(payload, "kana")],
    ["メールアドレス", value(payload, "email")],
    // 2026-11-02 追加。広告由来かどうかを後から追いかけられるようにする
    ["流入元", attribution ? withCampaignName(attribution) : "記録なし"],
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
ご相談内容: ${display(payload, "consultation")}
実施予定時期: ${display(payload, "schedule")}
ご予算: ${display(payload, "budget")}
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
      <tr><th align="left" style="border:1px solid #d7e3ec;background:#f6fbff;width:150px">ご相談内容</th><td style="border:1px solid #d7e3ec">${escapeHtml(display(payload, "consultation"))}</td></tr>
      <tr><th align="left" style="border:1px solid #d7e3ec;background:#f6fbff">実施予定時期</th><td style="border:1px solid #d7e3ec">${escapeHtml(display(payload, "schedule"))}</td></tr>
      <tr><th align="left" style="border:1px solid #d7e3ec;background:#f6fbff">ご予算</th><td style="border:1px solid #d7e3ec">${escapeHtml(display(payload, "budget"))}</td></tr>
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
    signal: AbortSignal.timeout(15000),
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

  if (!payload || typeof payload !== "object" || Array.isArray(payload) ||
      Object.values(payload).some((entry) => typeof entry !== "string")) {
    return NextResponse.json({ message: "入力内容の形式をご確認ください。" }, { status: 400 });
  }

  // ハニーポットが埋まっていればボット。成功したように見せて黙って破棄する
  if (value(payload, "company_website")) {
    return NextResponse.json({ message: "送信しました。" });
  }

  const missing = requiredFields.filter((field) => !value(payload, field));

  if (missing.length > 0) {
    return NextResponse.json({ message: "必須項目を入力してください。", missing }, { status: 400 });
  }

  if (Object.values(payload).some((entry) => entry.length > MAX_FIELD_LENGTH)) {
    return NextResponse.json({ message: "入力内容が長すぎます。" }, { status: 400 });
  }

  if (value(payload, "privacy") !== "accepted") {
    return NextResponse.json({ message: "プライバシーポリシーへの同意を確認してください。", missing: ["privacy"] }, { status: 400 });
  }

  const senderEmail = value(payload, "email");

  if (!isValidEmail(senderEmail)) {
    return NextResponse.json(
      { message: "メールアドレスの形式をご確認ください。", missing: ["email"] },
      { status: 400 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "送信回数の上限に達しました。しばらく時間をおいてお試しください。" }, { status: 429 });
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

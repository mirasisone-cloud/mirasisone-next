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

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "送信内容を読み取れませんでした。" }, { status: 400 });
  }

  const missing = requiredFields.filter((field) => !value(payload, field));

  if (missing.length > 0) {
    return NextResponse.json({ message: "必須項目を入力してください。", missing }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@mirasisone.co.jp";
  const from = process.env.CONTACT_FROM_EMAIL ?? "MIRASISONE <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { message: "メール送信設定が未設定です。RESEND_API_KEYを設定してください。" },
      { status: 500 },
    );
  }

  const { text, html } = buildMessage(payload);
  const subject = `【MIRASISONE】お問い合わせ: ${value(payload, "name")} 様`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      reply_to: value(payload, "email"),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend error:", errorText);
    return NextResponse.json({ message: "メール送信に失敗しました。" }, { status: 502 });
  }

  return NextResponse.json({ message: "送信しました。" });
}

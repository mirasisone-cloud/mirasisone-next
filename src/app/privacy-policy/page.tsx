import type { Metadata } from "next";
import { LegacyPageShell } from "@/components/LegacyPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MIRASISONEのプライバシーポリシーです。個人情報の取得、利用、管理、第三者提供、開示請求等について定めています。",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | MIRASISONE",
    description:
      "MIRASISONEのプライバシーポリシーです。個人情報の取得、利用、管理、第三者提供、開示請求等について定めています。",
    url: "/privacy-policy",
  },
};

const policies = [
  {
    title: "第1条：個人情報の収集について",
    body: "当サイトでは、お問い合わせ時や各種サービスのご利用時に、氏名、住所、メールアドレス、電話番号、その他サービス利用に必要な情報（例：お支払い情報、アクセス情報）をご提供いただく場合があります。",
  },
  {
    title: "第2条：個人情報の利用目的",
    body: "取得した個人情報は、サービスの提供・運営、お問い合わせへの対応、メールマガジンやキャンペーン情報の送付、サービス改善のための分析・統計に利用します。",
  },
  {
    title: "第3条：個人情報の第三者提供",
    body: "法令に基づく開示請求がある場合、人命・財産の保護のために必要な場合、事業承継に伴う場合を除き、ご本人の同意なく個人情報を第三者へ提供することはありません。",
  },
  {
    title: "第4条：個人情報の管理",
    body: "取得した個人情報は、不正アクセス、漏洩、紛失、改ざん等を防止するために必要な安全管理措置を講じ、専任の管理者を配置して適切に管理します。",
  },
  {
    title: "第5条：個人情報の開示・訂正・削除",
    body: "ご本人から個人情報の開示、訂正、削除等を求められた場合は、本人確認のうえ、法令に基づき適切に対応します。",
  },
  {
    title: "第6条：クッキー（Cookie）の使用について",
    body: "当サイトでは、サービスの利便性向上を目的としてクッキーを使用しています。クッキーはブラウザの設定により拒否することが可能ですが、一部のサービスが正常に動作しない場合があります。",
  },
  {
    title: "第7条：外部リンクについて",
    body: "当サイトに掲載されている外部リンク先のウェブサイトにおける個人情報の取り扱いについては、各サイトの責任において行われるものであり、当社は一切の責任を負いません。",
  },
  {
    title: "第8条：プライバシーポリシーの変更",
    body: "本ポリシーの内容は、法令その他必要に応じて変更することがあります。変更後の内容は当サイトに掲載した時点で有効となります。",
  },
  {
    title: "第9条：お問い合わせ",
    body: "個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegacyPageShell>
      <section className="legacy-hero legacy-hero-policy">
        <p>PRIVACY POLICY</p>
        <h1>Privacy Policy</h1>
      </section>

      <article className="legacy-policy">
        <p className="legacy-policy-lead">
          株式会社MIRASISONEは、個人情報の重要性を認識し、適切な取得、利用、管理を行います。
        </p>
        {policies.map((policy) => (
          <section key={policy.title}>
            <h2>{policy.title}</h2>
            <p>{policy.body}</p>
          </section>
        ))}
        <section className="legacy-policy-contact">
          <h2>お問い合わせ先</h2>
          <address>
            <p>株式会社MIRASISONE</p>
            <p>〒112-0006 東京都文京区小日向3丁目1-8 ヴィラホワイト 2F</p>
            <p>
              TEL：<a href="tel:0507108-0017">050-7108-0017</a>
            </p>
            <p>
              MAIL：<a href="mailto:japan-team@mirasisone.com">japan-team@mirasisone.com</a>
            </p>
          </address>
        </section>
      </article>
    </LegacyPageShell>
  );
}

import type { Metadata } from "next";
import { StaticHtmlPage } from "@/components/StaticHtmlPage";
import { contactPage } from "@/content/contact";
import { appUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "CONTACT",
  description:
    "空間演出、プロジェクションマッピング、3DCGコンテンツ制作のご相談はこちら。企画・設計から実装まで、MIRASISONEがご対応します。",
  alternates: {
    // www 側に /contact は存在しない（404）ため apex の絶対URLを正規URLにする
    canonical: appUrl("/contact"),
  },
  openGraph: {
    title: "CONTACT | MIRASISONE",
    description:
      "空間演出、プロジェクションマッピング、3DCGコンテンツ制作のご相談はこちら。企画・設計から実装まで、MIRASISONEがご対応します。",
    url: appUrl("/contact"),
  },
};

export default function ContactPage() {
  const body = contactPage.body
    .replace('onsubmit="return handleContactPageSubmit(event)"', 'method="post" action="/api/contact"')
    .replace('<input type="checkbox" required>', '<input type="checkbox" name="privacy" value="accepted" required>')
    .replace('id="name" name="name"', 'id="name" name="name" autocomplete="name" maxlength="5000"')
    .replace('id="kana" name="kana"', 'id="kana" name="kana" maxlength="5000"')
    .replace('id="email" name="email"', 'id="email" name="email" autocomplete="email" inputmode="email" maxlength="254"')
    .replace('id="overview" name="overview"', 'id="overview" name="overview" maxlength="5000"')
    .replace('id="location" name="location"', 'id="location" name="location" maxlength="5000"')
    .replace('<button class="form-submit"', '<p class="contact-feedback" role="alert" tabindex="-1" hidden></p><button class="form-submit"');
  const style = contactPage.style + `
    .contact-feedback:not([hidden]) { display: block; margin: 20px 0; padding: 16px; border: 1px solid #b54747; background: #fff4f4; color: #8d2525; font: 400 15px/1.8 "Noto Sans JP",sans-serif; overflow-wrap: anywhere; }
    .contact-form :is(.form-input,.form-select,.form-textarea) { font-size: 16px; }
    .contact-form .form-submit:disabled { cursor: wait; opacity: .7; }
    .nav-drawer { max-height: calc(100dvh - 64px); overflow-y: auto; }
  `;
  return <StaticHtmlPage page={{ ...contactPage, body, style }} />;
}

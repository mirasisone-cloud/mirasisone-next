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
  return <StaticHtmlPage page={contactPage} />;
}

import type { Metadata } from "next";
import { StaticHtmlPage } from "@/components/StaticHtmlPage";
import { worksPage } from "@/content/works";
import { jsonLdScript, servicesJsonLd } from "@/content/structured-data";

export const metadata: Metadata = {
  title: "制作実績・サービス｜プロジェクションマッピング / 3DCG",
  description:
    "プロジェクションマッピング、3DCG映像制作、AR・XRコンテンツ、イマーシブ空間演出の制作領域と実績を紹介します。",
  alternates: {
    canonical: "/works",
  },
  openGraph: {
    title: "SERVICES & WORKS | MIRASISONE",
    description:
      "空間演出・3DCG・AR / XRコンテンツ制作のサービスと制作実績を紹介します。",
    url: "/works",
  },
};

export default function WorksPage() {
  return (
    <>
      {/* 提供サービスの一覧 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(servicesJsonLd)} />
      <StaticHtmlPage page={worksPage} contactLinks />
    </>
  );
}

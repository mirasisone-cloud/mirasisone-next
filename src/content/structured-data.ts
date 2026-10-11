import { APP_ORIGIN, appUrl } from "./site";

/** 会社情報。検索結果のナレッジパネルやロゴ表示のもとになる */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${APP_ORIGIN}/#organization`,
  name: "株式会社MIRASISONE",
  alternateName: "MIRASISONE",
  url: APP_ORIGIN,
  logo: { "@type": "ImageObject", url: appUrl("/icon.png"), width: 512, height: 512 },
  image: appUrl("/top-hero-pm-poster.webp"),
  email: "company@mirasisone.com",
  description:
    "東京のプロジェクションマッピング・空間演出の企画制作会社。企画から3DCG映像制作・機材設置まで一貫して手がけます。",
  address: {
    "@type": "PostalAddress",
    postalCode: "112-0006",
    addressRegion: "東京都",
    addressLocality: "文京区",
    streetAddress: "小日向3-1-8 ヴィラホワイト2F",
    addressCountry: "JP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "company@mirasisone.com",
    areaServed: "JP",
    availableLanguage: ["ja"],
  },
  sameAs: ["https://www.instagram.com/mirasisone/", "https://www.foriio.com/Mirasisone2022"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${APP_ORIGIN}/#website`,
  url: APP_ORIGIN,
  name: "MIRASISONE",
  inLanguage: "ja",
  publisher: { "@id": `${APP_ORIGIN}/#organization` },
};

/** TOP の FAQ セクションと同じ内容 */
const faqs: Array<[string, string]> = [
  [
    "導入期間はどのくらいかかりますか？",
    "規模やコンテンツの内容により異なりますが、ご契約から本番稼働まで、通常1.5ヶ月〜3ヶ月程度頂いております。常設向けのシステム構築を伴う場合は、4ヶ月〜半年程度を見込む場合もございます。",
  ],
  [
    "ガラス面や黒っぽい壁面にも投影可能ですか？",
    "特殊な透過フィルムを貼ることでガラス面への投影を可能にしたり、高輝度プロジェクターを使用して黒い面にもある程度映像を浮き上がらせる技術的アプローチがございます。まずはご相談ください。",
  ],
  [
    "地方や海外への対応は可能ですか？",
    "はい、可能です。日本国内はもちろん、アジア圏を中心に海外のプロジェクト実績も多数ございます。遠方の場合は、事前の図面・写真共有によるリモート検証を行った後、必要最低限の日程でエンジニアが現地入りする等、コストを抑えた進行もご提案可能です。",
  ],
  [
    "コンテンツ（映像）のみの制作依頼はできますか？",
    "制作可能です。すでに機材をお持ちの企業様向けに、既存の環境に最適化された3DCGやモーショングラフィックスの制作のみを請け負うプランもございます。",
  ],
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

/** 提供サービス。WORKS ページで使う */
export const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MIRASISONE のサービス",
  itemListElement: [
    ["プロジェクションマッピング", "店舗・施設・イベント空間への映像投影を、企画から機材設置まで一貫して行います。"],
    ["3DCG映像制作", "商品やブランドの世界観を伝える3DCG映像を制作します。"],
    ["AR・XRコンテンツ制作", "現実の空間に映像を重ねる体験コンテンツを制作します。"],
    ["イマーシブ空間演出", "映像・音・光を組み合わせた没入体験を設計します。"],
  ].map(([name, description], index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name,
      description,
      provider: { "@id": `${APP_ORIGIN}/#organization` },
      areaServed: "JP",
    },
  })),
};

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) };
}

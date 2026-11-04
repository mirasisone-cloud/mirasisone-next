import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { APP_ORIGIN } from "@/content/site";
import { jsonLdScript, organizationJsonLd, websiteJsonLd } from "@/content/structured-data";
import AdAttribution from "@/components/AdAttribution";

export const metadata: Metadata = {
  metadataBase: new URL(APP_ORIGIN),
  title: {
    default: "MIRASISONE",
    template: "%s | MIRASISONE",
  },
  description:
    "MIRASISONEは、プロジェクションマッピング、3DCG、AR・XRを活用し、空間体験の企画から制作、実装まで支援します。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "MIRASISONE",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/*
          日本語フォントの指定を整理した。
          - Shippori Mincho: どのページでも使われていなかったので削除
          - Noto Sans JP 300: 使用箇所が無く一度も読まれていなかったので削除
          - Noto Serif JP 500/900: 会社概要・採用・実績・問い合わせの少数の見出しだけ。
            それぞれ 400 / 700 に寄せた
          ここは jp-subset.css に無い文字(記事を追加して新しい漢字が出た場合など)の
          受け皿としても残してある。
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;700&family=Oswald:wght@600;700&display=swap"
          rel="stylesheet"
        />
        {/*
          サイトで実際に使う文字だけを収録した自前フォント。Google Fonts より後ろに置くことで
          こちらが優先される。収録外の文字は上の Google Fonts 側から落ちる。
          作り直しは scripts/subset-jp-fonts.mjs
        */}
        <link rel="stylesheet" href="/fonts/jp-subset.css" />
        {/*
          アイコンは使っている32種類だけを収録した自前ホストのフォントを読む。
          以前は CDN から全アイコン(約1,500種)のフォントとCSSを3セット落としていて、
          それだけで約660KBあった。作り直す手順は scratchpad/subset-icons.mjs。
        */}
        <link rel="stylesheet" href="/fonts/phosphor-subset.css" />
      </head>
      <body>
        {/* 会社情報とサイト情報。検索結果での表示に使われる */}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd)} />
        {/* 着地時の広告パラメータを拾う。問い合わせの流入元判別に使う */}
        <AdAttribution />
        {children}

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-37LHBTLMGH" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-37LHBTLMGH');
        `}</Script>
      </body>
    </html>
  );
}

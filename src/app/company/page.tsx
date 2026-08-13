import type { Metadata } from "next";
import { LegacyPageShell } from "@/components/LegacyPageLayout";

export const metadata: Metadata = {
  title: "COMPANY",
  description:
    "プロジェクションマッピングや3DCG制作を手掛けるMIRASISONEの会社概要、ミッション、ビジョン、バリューを紹介します。",
  alternates: {
    canonical: "/company",
  },
  openGraph: {
    title: "COMPANY | MIRASISONE",
    description:
      "プロジェクションマッピングや3DCG制作を手掛けるMIRASISONEの会社概要、ミッション、ビジョン、バリューを紹介します。",
    url: "/company",
  },
};

const companyRows = [
  ["屋号", "MIRASISONE"],
  ["代表", "山田 晃平"],
  ["本社", "〒112-0006 東京都文京区小日向３丁目１番８号ヴィラホワイト２Ｆ"],  ["渋谷オフィス", "〒150-0041 東京都渋谷区神南一丁目23番14号 リージャス渋谷公園通りセンター207号室"],
  ["お問い合わせ", "info@mirasisone.co.jp"],
  [
    "事業内容",
    "プロジェクションマッピング制作、3DCG映像制作、VR・AR・XRコンテンツ制作、デジタルサイネージ、空間演出、イベント演出、広告映像制作",
  ],
];

const values = [
  ["Creative", "人の感情を動かす演出を、企画と映像の両面から設計します。"],
  ["Technology", "投影、3DCG、インタラクティブ技術を組み合わせ、空間に最適な表現を実装します。"],
  ["Experience", "ただ映すだけではなく、記憶に残る体験として完成させます。"],
];

export default function CompanyPage() {
  return (
    <LegacyPageShell>
      <section className="legacy-hero legacy-hero-company">
        <p>ABOUT US</p>
        <h1>COMPANY</h1>
      </section>

      <section className="legacy-section legacy-two-column">
        <div>
          <p className="legacy-kicker">TOP MESSAGE</p>
          <h2>
            空間の価値を、
            <br />
            体験へ変える。
          </h2>
        </div>
        <div className="legacy-copy">
          <p>
            MIRASISONEは、プロジェクションマッピング、3DCG、VR・AR・XRなどの技術を活用し、
            空間そのものの価値を高める体験をつくるクリエイティブチームです。
          </p>
          <p>
            店舗、イベント、展示、商業施設など、目的や場所に合わせて企画から制作、現場実装まで伴走します。
            映像をただ映すのではなく、そこにいる人の感情が動く瞬間を設計します。
          </p>
        </div>
      </section>

      <section className="legacy-section">
        <p className="legacy-kicker">COMPANY INFO</p>
        <h2>会社概要</h2>
        <dl className="legacy-table">
          {companyRows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="legacy-section legacy-split-cards">
        <article>
          <p className="legacy-kicker">MISSION</p>
          <h2>映像と空間で、体験価値を拡張する。</h2>
          <p>
            光、映像、音、導線を一体で考え、来場者や顧客の記憶に残るシーンを創出します。
          </p>
        </article>
        <article>
          <p className="legacy-kicker">VISION</p>
          <h2>空間演出を、もっと身近な選択肢へ。</h2>
          <p>
            特別な大型イベントだけではなく、飲食店、ホテル、商業施設、地域の場にも体験設計を届けます。
          </p>
        </article>
      </section>

      <section className="legacy-section">
        <p className="legacy-kicker">VALUES</p>
        <h2>大切にしていること</h2>
        <div className="legacy-value-grid">
          {values.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </LegacyPageShell>
  );
}

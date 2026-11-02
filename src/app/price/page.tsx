import type { Metadata } from "next";
import Link from "next/link";
import { LegacyPageShell } from "@/components/LegacyPageLayout";
import { jsonLdScript } from "@/content/structured-data";
import {
  indoorTiers,
  outdoorTiers,
  priceFaqs,
  priceNotes,
  priceVariables,
  type PriceTier,
} from "@/content/price";
import { appUrl } from "@/content/site";

const DESCRIPTION =
  "プロジェクションマッピングの費用の目安。屋内は200万円から、屋外は500万円から。規模別の金額と含まれるもの、費用を左右する変数を掲載しています。概算見積りだけのご相談も歓迎です。";

export const metadata: Metadata = {
  title: "費用の目安｜プロジェクションマッピングの料金",
  description: DESCRIPTION,
  alternates: {
    canonical: "/price",
  },
  openGraph: {
    title: "PRICING | MIRASISONE",
    description: DESCRIPTION,
    url: "/price",
  },
};

/** 費用のFAQ。検索結果にそのまま出る形にしておく */
const priceFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${appUrl("/price")}#faq`,
  mainEntity: priceFaqs.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

function TierCards({ tiers }: { tiers: readonly PriceTier[] }) {
  return (
    <div className="legacy-value-grid price-grid">
      {tiers.map((tier) => (
        <article key={tier.scale}>
          <h3>{tier.scale}</h3>
          <p className="price-amount">
            <strong>{tier.amount}</strong>
            <span>{tier.amountUnit}</span>
          </p>
          <p className="price-fits">{tier.fits}</p>
          <p className="price-label">含まれるもの</p>
          <ul className="price-list">
            {tier.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {tier.excludes.length > 0 ? (
            <>
              <p className="price-label">含まれないもの</p>
              <ul className="price-list price-list-excluded">
                {tier.excludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="price-label">費用</p>
              <ul className="price-list price-list-excluded">
                <li>内容により個別お見積り</li>
              </ul>
            </>
          )}
        </article>
      ))}
    </div>
  );
}

export default function PricePage() {
  return (
    <LegacyPageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(priceFaqJsonLd)} />

      <section className="legacy-hero">
        <p>PRICING</p>
        <h1>費用の目安</h1>
      </section>

      <section className="legacy-section legacy-two-column">
        <div>
          <p className="legacy-kicker">HOW IT IS PRICED</p>
          <h2>
            費用は、規模と
            <br />
            映像の本数で決まります。
          </h2>
        </div>
        <div className="legacy-copy">
          <p>
            投影面積・映像の本数・設置環境に合わせて、機材と制作内容を組み立てます。
            やることが決まる前に総額をお出しすることはできませんが、
            <strong>規模ごとの下限の金額</strong>は先にお伝えできます。
          </p>
          <p>
            下の金額は、これまでの案件で実際に成立している下限です。
            ご予算が決まっていない段階でも、空間と目的をお聞きすれば規模の目安はお伝えできます。
          </p>
        </div>
      </section>

      <section className="legacy-section">
        <p className="legacy-kicker">INDOOR</p>
        <h2>屋内プロジェクションマッピング</h2>
        <p className="price-section-lead">
          店舗・ホテル・結婚式場・商業施設の壁・床・テーブルへの投影。常設から期間限定まで。
        </p>
        <TierCards tiers={indoorTiers} />
      </section>

      <section className="legacy-section">
        <p className="legacy-kicker">OUTDOOR</p>
        <h2>屋外プロジェクションマッピング</h2>
        <p className="price-section-lead">
          建物外壁・城郭・歴史的建造物への投影。イベント・周年・観光施策に。
        </p>
        <TierCards tiers={outdoorTiers} />
      </section>

      <section className="legacy-section">
        <p className="legacy-kicker">VARIABLES</p>
        <h2>費用を左右する変数</h2>
        <ul className="price-list price-variables">
          {priceVariables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="legacy-section">
        <p className="legacy-kicker">NOTES</p>
        <h2>お読みいただきたいこと</h2>
        <ul className="price-list price-notes">
          {priceNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="legacy-section">
        <p className="legacy-kicker">FAQ</p>
        <h2>費用についてよくいただく質問</h2>
        <dl className="legacy-table">
          {priceFaqs.map(([question, answer]) => (
            <div key={question}>
              <dt>{question}</dt>
              <dd>{answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="legacy-section price-cta">
        <h2>まずは規模の目安だけでも。</h2>
        <p>
          空間・目的・ご予算をお聞きして、規模の目安と概算をお伝えします。
          オンラインでのご相談も可能です。この段階で費用は発生しません。
        </p>
        <Link className="site-chrome-cta" href="/contact">
          無料で相談する
        </Link>
      </section>
    </LegacyPageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { LegacyPageShell } from "@/components/LegacyPageLayout";

export const metadata: Metadata = {
  title: "採用情報｜3DCG・空間演出クリエイター募集",
  description:
    "MIRASISONEの採用情報です。映像制作、3DCG、プロジェクションマッピング、空間演出に関わるクリエイターを募集しています。",
  alternates: {
    canonical: "/recruit",
  },
  openGraph: {
    title: "RECRUIT | MIRASISONE",
    description:
      "MIRASISONEの採用情報です。映像制作、3DCG、プロジェクションマッピング、空間演出に関わるクリエイターを募集しています。",
    url: "/recruit",
  },
};

const requirementRows = [
  ["募集職種", "映像クリエイター、3DCGクリエイター、空間演出プランナー、テクニカルディレクター"],
  ["雇用形態", "業務委託、パートナー、プロジェクト単位での協業"],
  ["業務内容", "プロジェクションマッピング、3DCG映像、VR・AR・XRコンテンツ、デジタルサイネージ等の企画・制作・現場実装"],
  ["歓迎スキル", "After Effects、Cinema 4D、Blender、Unity、TouchDesigner、映像編集、現場施工・機材設計の経験"],
  ["勤務地", "案件によりリモートまたは現場対応"],
  ["応募方法", "ポートフォリオ、制作実績、担当範囲が分かる資料を添えてお問い合わせください。"],
];

const flow = ["お問い合わせ", "実績・ポートフォリオ確認", "オンライン面談", "案件内容の相談", "プロジェクト参加"];

export default function RecruitPage() {
  return (
    <LegacyPageShell>
      <section className="legacy-hero legacy-hero-recruit">
        <p>RECRUIT INFO</p>
        <h1>RECRUIT</h1>
      </section>

      <section className="legacy-section legacy-two-column">
        <div>
          <p className="legacy-kicker">MESSAGE</p>
          <h2>
            未来の体験を、
            <br />
            一緒につくる。
          </h2>
        </div>
        <div className="legacy-copy">
          <p>
            MIRASISONEでは、映像、3DCG、空間演出、テクノロジーを横断しながら、
            人の感情が動く体験づくりに向き合うクリエイター、パートナーを募集しています。
          </p>
          <p>
            企画から制作、現場実装まで、プロジェクトごとに必要なチームを組みながら進行します。
            新しい表現に挑戦したい方からのご連絡をお待ちしています。
          </p>
        </div>
      </section>

      <section className="legacy-section">
        <p className="legacy-kicker">REQUIREMENTS</p>
        <h2>募集要項</h2>
        <dl className="legacy-table">
          {requirementRows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="legacy-section">
        <p className="legacy-kicker">FLOW</p>
        <h2>応募・採用の流れ</h2>
        <ol className="legacy-flow">
          {flow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="legacy-entry">
        <p>制作実績やポートフォリオを添えて、お気軽にお問い合わせください。</p>
        <Link href="/contact">ENTRY / CONTACT</Link>
      </section>
    </LegacyPageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "THANKS",
  description:
    "お問い合わせありがとうございます。内容を拝見し、2営業日以内にご連絡いたします。",
  alternates: {
    canonical: "/thanks",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksPage() {
  return (
    <main className="thanks-page">
      <div className="thanks-grid" aria-hidden="true" />
      <section className="thanks-shell">
        <p className="thanks-kicker">Thank You</p>
        <h1>
          お問い合わせ
          <span>ありがとうございます。</span>
        </h1>
        <div className="thanks-rule" aria-hidden="true">
          <span />
        </div>
        <p className="thanks-lead">
          あなたの空間に、まだ誰も見たことのない光を灯す準備が始まりました。
          <br />
          いただいたメッセージは、私たちのスクリーンにしっかり投影されました。
        </p>
        <p className="thanks-copy">
          内容を拝見し、2営業日以内にご連絡いたします。
          <br />
          どんな空間が、どんな物語を待っているのか、
          <br />
          私たちも今からワクワクしています。
        </p>
        <div className="thanks-actions">
          <Link className="thanks-primary" href="/">
            TOPへ戻る
          </Link>
          <Link className="thanks-secondary" href="/works">
            WORKSを見る
          </Link>
        </div>
      </section>
    </main>
  );
}

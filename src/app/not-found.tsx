import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wix-blog-page not-found-page">
      <p className="not-found-code">404</p>
      <h1>ページが見つかりませんでした</h1>
      <p>
        お探しのページは、移動または削除された可能性があります。
        <br />
        下のリンクからお探しください。
      </p>
      <nav className="not-found-links" aria-label="主なページ">
        <Link href="/">トップページ</Link>
        <Link href="/works">制作実績</Link>
        <Link href="/blog">記事一覧</Link>
        <Link href="/contact">お問い合わせ</Link>
      </nav>
    </main>
      <SiteFooter />
    </>
  );
}

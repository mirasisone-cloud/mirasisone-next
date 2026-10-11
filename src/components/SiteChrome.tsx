import Link from "next/link";

/**
 * ブログ・記事・404 用の共通ヘッダー／フッター。
 * これらのページは検索からの入口になるため、実績や問い合わせへ進める導線を必ず置く。
 */
export function SiteHeader() {
  return (
    <header className="site-chrome-header">
      <Link className="site-chrome-logo" href="/">
        <span className="site-chrome-logo-mark">MIRASISONE</span>
        <span className="site-chrome-logo-sub">プロジェクションマッピング・3DCG映像制作｜東京</span>
      </Link>
      <nav className="site-chrome-nav" aria-label="サイト内の主なページ">
        <Link href="/works">実績・サービス</Link>
        <Link href="/blog">記事</Link>
        <Link href="/company">会社概要</Link>
        <Link className="site-chrome-cta" href="/contact">
          無料相談
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-chrome-footer">
      <div className="site-chrome-footer-cta">
        <p>空間演出・プロジェクションマッピングのご相談は、構想段階からお気軽にどうぞ。</p>
        <Link href="/contact">無料で相談する</Link>
      </div>
      <nav className="site-chrome-footer-nav" aria-label="フッターのリンク">
        <Link href="/">トップ</Link>
        <Link href="/works">実績・サービス</Link>
        <Link href="/blog">記事一覧</Link>
        <Link href="/company">会社概要</Link>
        <Link href="/recruit">採用情報</Link>
        <Link href="/privacy-policy">プライバシーポリシー</Link>
      </nav>
      <p className="site-chrome-copy">© MIRASISONE Inc.</p>
    </footer>
  );
}

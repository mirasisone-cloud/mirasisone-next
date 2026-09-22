// Real project photos, kept distinct from the hero film so phones do not show the same scene twice:
// SHISHA BOUTIQUE FREAKS, the Osaka Expo pavilion, and
// WANOTE's counter projection photo from https://www.mds-fund.com/wanote
// (c43a61_7e65d8f2dc924f02b68bf0b29e29bc2a~mv2.png).
const reasons = [
  {
    en: "DESTINATION",
    issue: "足を運ぶ理由が、見つからない。",
    title: "訪れたくなる、<br>理由をつくる。",
    copy: "その場所でしか味わえない体験を、企画から。食事や買い物の時間に新しい楽しみを重ね、空間そのものを訪れるきっかけにします。",
    image: "/images/works/shisha-freaks.webp",
    alt: "壁一面にランタンの映像を投影したシーシャバーの店内",
  },
  {
    en: "EMOTION",
    issue: "期待を超える体験を、届けたい。",
    title: "心が動く、<br>その瞬間を設計する。",
    copy: "見るだけでなく、触れる、参加する、誰かに伝える。来場者の気持ちと行動を想像し、思わず共有したくなる没入体験を設計します。",
    image: "/images/works/expo-osaka.webp",
    alt: "大阪万博のパビリオンで寿司職人の映像を投影した展示",
  },
  {
    en: "IDENTITY",
    issue: "この場所ならではの魅力を、伝えたい。",
    title: "空間を、<br>ブランドの語り手に。",
    copy: "建物の表情、地域の物語、ブランドの世界観。その場所が持つ個性を光と映像で表現し、訪れる人の記憶に残る風景へと変えていきます。",
    image: "/images/home/why-counter-mapping.webp",
    alt: "カウンターテーブルに青と紫の映像を投影し、料理を彩るプロジェクションマッピング",
  },
];

export const homeWhyUsMarkup = `
<section class="why-editorial" id="why-us" aria-labelledby="why-editorial-title">
  <div class="container">
    <header class="why-editorial-head">
      <div><p class="why-eyebrow">WHY US</p><h2 id="why-editorial-title">なぜ、私たちか</h2></div>
      <p class="why-intro">集客、体験、ブランド。<br>空間の課題から、一つひとつ企画します。</p>
    </header>
    <div class="why-editorial-grid">
      ${reasons.map((reason, index) => `
      <article class="why-editorial-card">
        <figure class="why-editorial-figure">
          <div class="why-editorial-photo">
          <img src="${reason.image}" alt="${reason.alt}" loading="lazy" decoding="async">
          <div class="why-photo-meta" aria-hidden="true"><span>0${index + 1}</span><span>${reason.en}</span></div>
          </div>
        </figure>
        <div class="why-editorial-body">
          <p class="why-challenge">${reason.issue}</p>
          <h3>${reason.title}</h3>
          <p class="why-description">${reason.copy}</p>
        </div>
      </article>`).join("")}
    </div>
    <div class="why-editorial-footer"><p>構想の段階から、ご一緒します。</p><a href="/contact">空間の課題を相談する<span aria-hidden="true">↗</span></a></div>
  </div>
</section>`;

export const homeWhyUsStyles = String.raw`
body #home-page #why-us.why-editorial { padding: 100px 0 88px !important; background: linear-gradient(125deg,#f6f4fa,#f0f6f7) !important; }
body #home-page #why-us .why-editorial-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; margin: 0 0 48px; }
body #home-page #why-us .why-eyebrow { margin: 0 0 18px !important; font: 500 11px/1.8 "Inter",sans-serif !important; letter-spacing: .17em !important; color: #706087 !important; -webkit-text-fill-color: currentColor !important; }
body #home-page #why-us h2 { margin: 0 !important; font: 400 clamp(28px,3vw,40px)/1.7 "Noto Serif JP",serif !important; letter-spacing: .04em !important; color: #27364e !important; -webkit-text-fill-color: currentColor !important; background: none !important; text-shadow: none !important; }
body #home-page #why-us .why-intro { margin: 0 0 5px !important; font: 400 14px/2 "Noto Sans JP",sans-serif !important; letter-spacing: .025em !important; color: #596779 !important; -webkit-text-fill-color: currentColor !important; }
body #home-page #why-us .why-editorial-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 28px; }
body #home-page #why-us .why-editorial-card { min-width: 0; }
body #home-page #why-us .why-editorial-figure { margin: 0; min-width: 0; align-self: start; }
body #home-page #why-us .why-editorial-photo { position: relative; margin: 0; overflow: hidden; aspect-ratio: 4/3; background: #162139; border-radius: 3px; }
body #home-page #why-us .why-editorial-photo::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg,#0b14284d,transparent 40%,#0b142866); }
body #home-page #why-us .why-editorial-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .7s cubic-bezier(.2,.65,.3,1); }
body #home-page #why-us .why-photo-meta { position: absolute; z-index: 1; inset: 20px 20px auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
body #home-page #why-us .why-photo-meta span { color: #fff !important; -webkit-text-fill-color: #fff !important; font: 500 10px/1.8 "Inter",sans-serif !important; letter-spacing: .16em !important; }
body #home-page #why-us .why-photo-meta span:first-child { font-size: 15px !important; letter-spacing: .04em !important; }
body #home-page #why-us .why-editorial-body { padding: 26px 2px 0; }
body #home-page #why-us .why-challenge { margin: 0 0 14px !important; font: 400 11px/1.9 "Noto Sans JP",sans-serif !important; letter-spacing: .02em !important; color: #71677f !important; -webkit-text-fill-color: currentColor !important; }
body #home-page #why-us h3 { margin: 0 0 20px !important; font: 400 clamp(23px,2vw,28px)/1.8 "Noto Serif JP",serif !important; letter-spacing: .025em !important; color: #304b60 !important; -webkit-text-fill-color: currentColor !important; background: none !important; text-shadow: none !important; }
body #home-page #why-us .why-description { margin: 0 !important; font: 400 14px/2 "Noto Sans JP",sans-serif !important; letter-spacing: .01em !important; color: #536175 !important; -webkit-text-fill-color: currentColor !important; }
body #home-page #why-us .why-editorial-footer { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 48px; padding-top: 24px; border-top: 1px solid #c8d2de; }
body #home-page #why-us .why-editorial-footer p { margin: 0 !important; font: 400 14px/1.9 "Noto Serif JP",serif !important; color: #5c697f !important; -webkit-text-fill-color: currentColor !important; }
body #home-page #why-us .why-editorial-footer a { display: flex; align-items: center; justify-content: space-between; gap: 40px; min-height: 48px; font: 500 13px/1.8 "Noto Sans JP",sans-serif !important; color: #426b7b !important; -webkit-text-fill-color: currentColor !important; text-decoration: none; border-bottom: 1px solid #8b9caf; }
body #home-page #why-us .why-editorial-footer a span { color: inherit !important; -webkit-text-fill-color: currentColor !important; font-size: 24px; transition: transform .25s; }
body #home-page #why-us .why-editorial-footer a:focus-visible { outline: 2px solid #7663ad; outline-offset: 6px; }
@media (hover:hover) {
  body #home-page #why-us .why-editorial-card:hover img { transform: scale(1.045); }
  body #home-page #why-us .why-editorial-footer a:hover span { transform: translate(3px,-3px); }
}
@media (max-width:1000px) {
  body #home-page #why-us .why-editorial-grid { gap: 20px; }
  body #home-page #why-us h3 { font-size: 22px !important; }
  body #home-page #why-us .why-description { font-size: 13px !important; }
}
@media (max-width:800px) {
  body #home-page #why-us.why-editorial { padding: 64px 0 !important; }
  body #home-page #why-us .why-editorial-head { flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 32px; }
  body #home-page #why-us .why-editorial-grid { grid-template-columns: minmax(0,1fr); gap: 36px; }
  body #home-page #why-us .why-editorial-card { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 24px; }
  body #home-page #why-us .why-editorial-photo { aspect-ratio: 4/5; }
  body #home-page #why-us .why-editorial-body { padding: 0; }
  body #home-page #why-us .why-editorial-footer { margin-top: 36px; }
}
@media (max-width:540px) {
  body #home-page #why-us .why-editorial-card { display: block; }
  body #home-page #why-us .why-editorial-photo { aspect-ratio: 4/3; }
  body #home-page #why-us .why-editorial-body { padding: 22px 0 0; }
  body #home-page #why-us h3 { font-size: clamp(23px,6.3vw,28px) !important; margin-bottom: 16px !important; }
  body #home-page #why-us .why-description { font-size: 14px !important; }
  body #home-page #why-us .why-editorial-footer { align-items: flex-start; flex-direction: column; gap: 16px; }
  body #home-page #why-us .why-editorial-footer a { width: 100%; }
}
@media (prefers-reduced-motion:reduce) {
  body #home-page #why-us .why-editorial-photo img, body #home-page #why-us .why-editorial-footer a span { transition: none; transform: none !important; }
}
`;

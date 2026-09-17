/** Keep the desktop presentation, with a shorter reading path on phones. */
export function compactHomeContent(body: string) {
  const start = body.indexOf('<div class="about-info">');
  if (start >= 0) {
    const tags = /<div\b[^>]*>|<\/div>/g;
    tags.lastIndex = start;
    let depth = 0;
    let tag: RegExpExecArray | null;
    while ((tag = tags.exec(body))) {
      depth += tag[0].startsWith('</') ? -1 : 1;
      if (depth === 0) {
        body = body.slice(0, start) + '<details class="company-disclosure"><summary>会社情報を見る</summary>' + body.slice(start, tags.lastIndex) + '</details>' + body.slice(tags.lastIndex);
        break;
      }
    }
  }
  const steps = [
    ['相談・現地調査', '空間・目的・ご予算を確認します。'],
    ['企画・演出設計', '体験のコンセプトと演出を設計します。'],
    ['映像制作・機材準備', '映像制作から機材の選定まで。'],
    ['設置・実施・サポート', '現場での調整と運用まで伴走します。'],
  ];
  return body
    .replace(/(<h3 class="svc-new-h2[^"]*">)([^<]+)(<\/h3>)/g, (_, open: string, title: string, close: string) => {
      const lines: Record<string, string[]> = {
        '屋内プロジェクションマッピング': ['屋内プロジェクション', 'マッピング'],
        '屋外イベントマッピング': ['屋外イベント', 'マッピング'],
        '3DCG・映像制作': ['3DCG・映像制作'],
        'AR/VR・メタバース': ['AR/VR・', 'メタバース'],
      };
      return open + (lines[title] ?? [title]).map(line => `<span class="service-title-phrase">${line}</span>`).join('') + close;
    })
    .replace('<span class="contact-cta-line"', '<span class="mobile-contact-label">相談フォームへ</span><span class="contact-cta-line"')
    .replace(/(<div class="about-ceo-message">\s*<p>)\s*空間には、まだ見せていない顔がある。\s*<br\s*\/?\s*>/, '$1')
    .replace('<div class="htl-wrap">', `<ol class="mobile-flow" aria-label="制作の流れ">${steps.map(([title, copy], index) => `<li><span aria-hidden="true">0${index + 1}</span><div><h3>${title}</h3><p>${copy}</p></div></li>`).join('')}</ol><div class="htl-wrap">`)
    .replace('企画から実施まで、<br>8ステップで伴走します。', '企画から実施まで、<br>一貫してサポート。')
    .replace(/<details open>/g, '<details>');
}

export const homeMobileStyles = String.raw`
body #home-page :is(.mobile-flow,.mobile-contact-label) { display: none; }
body #home-page #services .svc-new-h2 { max-width: 100% !important; width: 100% !important; }
body #home-page #services .service-title-phrase { display: inline-block; white-space: nowrap; color: inherit !important; -webkit-text-fill-color: currentColor !important; }
body #home-page .company-disclosure { margin-top: 32px; border-block: 1px solid #cbd4df; }
body #home-page .company-disclosure > summary { padding: 20px 4px; cursor: pointer; color: #34485e; font-size: 15px; }
body #home-page .company-disclosure > summary:focus-visible { outline: 2px solid #7663ad; outline-offset: 4px; }
body #home-page .company-disclosure .about-info { margin: 0; padding-bottom: 20px; }
body #home-page .company-disclosure .about-info-title { display: none; }
@media (max-width:768px), (max-width:1024px) and (max-height:520px) {
  body #home-page :is(#original-home-story,#what-we-do,#our-value,#experience-value,#value-shift,.testimonials-section,#spaces) { display: none !important; }
  body #home-page :is(.services-section,.achievements-section,.works-section,.news-section,.process-section,.faq-section,.about-section), body #home-page #why-us.why-editorial { padding: 40px 0 !important; }
  body #home-page .container { padding-inline: 20px !important; }
  body #home-page :is(.refined-heading,.services-header,.works-header,.news-header,.process-header,.about-header,.faq-header) { margin-bottom: 24px !important; }
  body #home-page .refined-heading h2 { font-size: clamp(23px,6vw,30px) !important; line-height: 1.6 !important; }
  body #home-page .refined-heading p { margin-bottom: 10px !important; }
  body #home-page .svc-card-grid { display: grid !important; grid-template-columns: minmax(0,1fr) !important; gap: 0 !important; }
  body #home-page #services .svc-new-card { display: grid !important; grid-template-columns: 88px minmax(0,1fr) !important; grid-template-rows: auto !important; height: auto !important; align-items: start; gap: 16px !important; padding: 24px 0 !important; border: 0 !important; border-bottom: 1px solid #d0d9e2 !important; min-height: 0 !important; background: transparent !important; box-shadow: none !important; }
  body #home-page #services .svc-new-body { grid-column: 2 !important; grid-row: 1 !important; }
  body #home-page #services :is(.svc-new-h2,.svc-new-text) { height: auto !important; min-height: 0 !important; }
  body #home-page #services .svc-new-visual::before { display: none !important; }
  body #home-page #services .svc-new-cta.btn-grad { display: flex !important; gap: 12px !important; }
  body #home-page #services .svc-new-cta.btn-grad span { font: 500 12px/1.8 'Inter',sans-serif !important; color: #425a70 !important; -webkit-text-fill-color: currentColor !important; letter-spacing: .12em !important; background: none !important; }
  body #home-page #services .svc-new-cta.btn-grad::before, body #home-page #services .svc-new-cta.btn-grad::after, body #home-page #services .svc-new-cta.btn-grad span::before { display: none !important; }
  body #home-page .svc-new-visual { width: 100% !important; height: 112px !important; aspect-ratio: auto !important; margin: 0 !important; }
  body #home-page .svc-new-body { padding: 0 !important; min-width: 0; }
  body #home-page #services .svc-new-h2 { font-size: clamp(17px,4.7vw,19px) !important; line-height: 1.65 !important; letter-spacing: .015em !important; margin: 0 !important; }
  body #home-page .svc-new-sub { display: none !important; }
  body #home-page .svc-new-text { font-size: 13px !important; line-height: 1.85 !important; margin: 10px 0 !important; }
  body #home-page .svc-new-cta { min-height: 44px !important; padding: 10px 0 !important; margin: 0 !important; width: 100% !important; background: none !important; box-shadow: none !important; border: 0 !important; border-bottom: 1px solid #8a9cac !important; color: #425a70 !important; -webkit-text-fill-color: #425a70 !important; justify-content: space-between !important; }
  body #home-page #why-us .why-editorial-head { gap: 12px; margin-bottom: 24px; }
  body #home-page #why-us .why-eyebrow { margin-bottom: 8px !important; }
  body #home-page #why-us h2 { font-size: 28px !important; }
  body #home-page #why-us .why-intro { font-size: 13px !important; }
  body #home-page #why-us .why-editorial-grid { gap: 24px; }
  body #home-page #why-us .why-editorial-card { display: grid; grid-template-columns: 88px minmax(0,1fr); gap: 16px; }
  body #home-page #why-us .why-editorial-photo { aspect-ratio: 4/5; }
  body #home-page #why-us :is(.why-photo-meta,.why-challenge) { display: none; }
  body #home-page #why-us .why-editorial-body { padding: 0; }
  body #home-page #why-us h3 { font-size: 19px !important; line-height: 1.65 !important; margin-bottom: 10px !important; }
  body #home-page #why-us .why-description { font-size: 13px !important; line-height: 1.85 !important; }
  body #home-page #why-us .why-editorial-footer { margin-top: 24px; padding-top: 16px; }
  body #home-page #why-us .why-editorial-footer p { display: none; }
  body #home-page .works-grid { grid-template-columns: repeat(3,minmax(0,1fr)) !important; gap: 10px !important; }
  body #home-page .works-card { min-height: 0 !important; height: auto !important; aspect-ratio: 4/3 !important; }
  body #home-page .works-card img { height: 100% !important; object-fit: cover !important; }
  body #home-page .works-filters { gap: 6px !important; margin-bottom: 20px !important; }
  body #home-page .works-filters button { min-height: 44px; padding: 8px 12px !important; }
  body #home-page .works-card-overlay { padding: 6px !important; }
  body #home-page .works-card-overlay { opacity: 1 !important; transform: none !important; background: linear-gradient(transparent,#08102099) !important; }
  body #home-page .works-tag { font-size: 10px !important; padding: 3px 5px !important; }
  body #home-page :is(.works-footer,.process-cta) { margin-top: 24px !important; }
  body #home-page .news-grid { grid-template-columns: minmax(0,1fr) !important; gap: 0 !important; }
  body #home-page .news-card { display: grid !important; grid-template-columns: 80px minmax(0,1fr); grid-template-rows: auto auto; column-gap: 16px; row-gap: 6px; padding: 18px 0 !important; border-bottom: 1px solid #d0d9e2 !important; }
  body #home-page .news-img-wrap { grid-row: 1/3; aspect-ratio: 1 !important; height: 80px !important; margin: 0 !important; }
  body #home-page .news-meta { margin: 0 !important; gap: 6px !important; flex-wrap: wrap; }
  body #home-page .news-title { font-size: 14px !important; line-height: 1.7 !important; margin: 0 !important; }
  body #home-page .process-section .htl-wrap { display: none !important; }
  body #home-page .mobile-flow { display: grid; padding: 0; margin: 0; list-style: none; }
  body #home-page .mobile-flow li { display: grid; grid-template-columns: 32px minmax(0,1fr); gap: 16px; padding: 18px 0; border-bottom: 1px solid #cbd4df; }
  body #home-page .mobile-flow li > span { color: #786498 !important; font: 400 14px/2 'Inter',sans-serif !important; }
  body #home-page .mobile-flow h3 { margin: 0 0 4px !important; color: #304b60 !important; font: 400 18px/1.6 'Noto Serif JP',serif !important; }
  body #home-page .mobile-flow p { margin: 0 !important; color: #536175 !important; font-size: 13px !important; line-height: 1.8 !important; }
  body #home-page .faq-list summary { padding: 16px 36px 16px 0 !important; font-size: 14px !important; line-height: 1.7 !important; min-height: 48px; }
  body #home-page .about-top { display: block !important; margin-bottom: 0 !important; }
  body #home-page .about-ceo-img-wrap { display: grid !important; grid-template-columns: 112px minmax(0,1fr); align-items: end; gap: 20px; margin-bottom: 24px !important; width: auto !important; }
  body #home-page .about-ceo-placeholder { width: 112px !important; height: 140px !important; aspect-ratio: 4/5 !important; min-height: 0 !important; }
  body #home-page .about-ceo-caption { margin: 0 !important; text-align: left !important; }
  body #home-page .about-ceo-label { display: none !important; }
  body #home-page .about-ceo-heading { font-size: 23px !important; line-height: 1.65 !important; margin-bottom: 16px !important; }
  body #home-page .about-ceo-message p { font-size: 13px !important; line-height: 1.9 !important; }
  body #home-page .about-info-row { padding: 12px 0 !important; }
  body #home-page :is(.contact-steps,.ms-contact-steps,.services-side-h1) { display: none !important; }
  body #home-page .contact-area { padding: 40px 0 !important; }
  body #home-page .contact-header { margin-bottom: 24px !important; }
  body #home-page :is(.contact-cta-en,.contact-cta-title) { display: none !important; }
  body #home-page .contact-cta-card { padding: 24px 20px !important; min-height: 0 !important; }
  body #home-page .mobile-contact-label { display: block; color: #304b60 !important; font-size: 14px !important; font-weight: 600; }
}
@media (max-width:360px) {
  body #home-page #services .svc-new-card { grid-template-columns: 72px minmax(0,1fr) !important; gap: 12px !important; }
}
`;

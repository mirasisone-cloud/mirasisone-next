/** Scoped final layer for the imported homepage, whose legacy styles use !important.
 * Keep responsive layout corrections here so other imported pages are unaffected.
 */
export const homeLayoutStyles = String.raw`
body #home-page { --gray: #53617a; --purple: #6454d5; --teal: #218c91; }
/* The menu must remain scrollable when Safari's bars reduce landscape height. */
body #home-page .nav-drawer { max-height: calc(100svh - 64px) !important; max-height: calc(100dvh - 64px) !important; overflow-y: auto !important; overscroll-behavior-y: contain; }
/* Original hero and STORY, flowing naturally after the opening film. */
body #home-page #original-home-story .ss-phase { position: relative !important; inset: auto !important; min-height: 100svh; height: auto !important; opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; overflow: hidden; }
body #home-page #ss-p2 .ss-hero-content { opacity: 1 !important; transform: none !important; padding: 100px 7vw !important; max-width: 100%; }
body #home-page #original-home-story :is(.ss-reveal-text, .ss-p3-story, .ss-p2-text) { opacity: 1 !important; visibility: visible !important; transform: none !important; clip-path: none !important; animation: none !important; }
body #home-page #original-home-story .ss-reveal-overlay,
body #home-page #original-home-story .ss-reveal-item::after { display: none !important; }
body #home-page #original-home-story .ss-reveal-item { overflow: visible !important; }
body #home-page #ss-p2 .ss-p2-visual { opacity: 1 !important; }
body #home-page #ss-p2 .ss-hero-title { font-family: "Noto Serif JP", serif !important; font-size: clamp(32px, 4.5vw, 66px) !important; line-height: 1.6 !important; }
body #home-page #ss-p2 .ss-title-grad-line .ss-reveal-text,
body #home-page #ss-p3 .ss-p3-heading.is-grad { background: linear-gradient(90deg, #7b6cf6, #359eaa) !important; background-clip: text !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; }
body #home-page #original-home-story :is(.ss-hero-body p, .ss-body-text) { font-size: 15px !important; line-height: 2 !important; color: #43516a !important; -webkit-text-fill-color: #43516a !important; white-space: normal !important; }
body #home-page #ss-p2 .ss-hero-body .ss-hero-body-nowrap { white-space: normal !important; width: auto !important; }
body #home-page #ss-p3 { display: flex !important; flex-direction: column; justify-content: center; gap: 44px; padding: 110px 7vw 80px; }
body #home-page #ss-p3 .ss-p3-story { position: relative !important; inset: auto !important; height: auto !important; width: 100%; padding: 0 !important; order: -1; }
body #home-page #ss-p3 .ss-p2-text { position: relative !important; inset: auto !important; height: auto !important; width: 48%; margin-left: auto; padding: 0 !important; }
body #home-page #ss-p3 .ss-p3-heading { font-family: "Noto Serif JP", serif !important; font-size: clamp(32px, 4.6vw, 68px) !important; line-height: 1.6 !important; }
body #home-page #ss-p3 .ss-p3-body-block .ss-reveal-item { display: block !important; width: 100% !important; }
body #home-page #ss-p3 .story-concept { position: absolute; bottom: calc(100% + 44px); right: 0; width: 100%; margin: 0; padding: 0; }
body #home-page #ss-p3 .story-concept-label { margin: 0 0 24px !important; font: 500 10px/1.6 "Inter", sans-serif !important; letter-spacing: .18em !important; color: #6454a0 !important; -webkit-text-fill-color: #6454a0 !important; text-shadow: none !important; }
body #home-page #ss-p3 .story-concept-steps { display: flex; align-items: center; justify-content: center; list-style: none; padding: 0; margin: 0; }
body #home-page #ss-p3 .story-concept-steps li { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 0 1 146px; aspect-ratio: 1; border: 1px solid #9480d780; border-radius: 50%; background: linear-gradient(135deg, #eee7ff70, #ffffff20); }
body #home-page #ss-p3 .story-concept-steps li + li { margin-left: -12px; }
body #home-page #ss-p3 .story-concept-steps li:nth-child(2) { border-color: #7b9fbc80; background: linear-gradient(135deg, #e6eaff60, #d0f0ef60); }
body #home-page #ss-p3 .story-concept-steps li:last-child { border-color: #419c9f80; background: linear-gradient(135deg, #e3f7f440, #bfe9e850); }
body #home-page #ss-p3 .story-concept-word { font: 400 clamp(24px, 2.1vw, 32px)/1.6 "Noto Serif JP", serif !important; letter-spacing: .12em !important; color: #4e527b !important; -webkit-text-fill-color: #4e527b !important; }
body #home-page #ss-p3 .story-concept-steps li:last-child .story-concept-word { color: #277f83 !important; -webkit-text-fill-color: #277f83 !important; }
body #home-page #ss-p3 .story-concept-en { margin-top: 8px; font: 500 9px/1.4 "Inter", sans-serif !important; letter-spacing: .12em !important; color: #536d7f !important; -webkit-text-fill-color: #536d7f !important; }
body #home-page #ss-p3 .story-concept figcaption { margin-top: 24px; text-align: center; font: 400 14px/1.8 "Noto Serif JP", serif !important; letter-spacing: .03em !important; color: #43516a !important; -webkit-text-fill-color: #43516a !important; }
@media (max-width: 1120px) {
  body #home-page #ss-p2 .ss-p2-visual { display: none !important; }
  body #home-page #ss-p3 .story-concept { position: relative; inset: auto; margin-bottom: 36px; }
  body #home-page #ss-p3 .story-concept-steps li { flex-basis: 120px; }
}
@media (max-width: 768px) {
  body #home-page #original-home-story .ss-phase { min-height: 0 !important; }
  body #home-page #ss-p2 .ss-hero-content { width: 100%; padding: 72px 24px !important; }
  body #home-page #ss-p2 .ss-hero-title { font-size: clamp(30px, 8vw, 52px) !important; letter-spacing: .04em !important; }
  body #home-page #ss-p2 .ss-hero-kicker { font-size: 13px !important; letter-spacing: .04em !important; }
  body #home-page #ss-p3 { padding: 64px 24px !important; gap: 32px; }
  body #home-page #ss-p3 .ss-p2-text { width: 100% !important; margin: 0; }
  body #home-page #ss-p3 .ss-p3-heading { font-size: clamp(24px, 6.7vw, 42px) !important; letter-spacing: .035em !important; }
  body #home-page #ss-p3 .story-concept { padding-block: 8px 28px; border-bottom: 1px solid #829bad40; }
  body #home-page #ss-p3 .story-concept-steps li { flex-basis: 112px; }
  body #home-page #ss-p3 .story-concept-en { font-size: 8px !important; letter-spacing: .04em !important; }
  body #home-page #ss-p3 .story-concept figcaption { font-size: 12px !important; }
}
body #home-page .container { width: 100% !important; max-width: 1280px !important; padding-inline: clamp(24px, 4vw, 56px) !important; min-width: 0; }
body #home-page :is(section, [id]) { scroll-margin-top: 88px; }
body #home-page :is(a, button, summary):focus-visible { outline: 3px solid #6454d5; outline-offset: 5px; }
body #home-page :is(h1, h2, h3, p) { overflow-wrap: break-word; }
body #home-page :is(.wwd-text, .str2-desc, .ia-row-desc, .ia-row-approach-desc, .svc-new-text, .htl-desc, .faq-answer, .about-message-body, .news-title) {
  font-size: 15px !important; line-height: 1.9 !important; letter-spacing: .025em !important;
  color: #47566f !important; -webkit-text-fill-color: #47566f !important; text-shadow: none !important;
}
body #home-page :is(.ia-row-desc, .ia-row-approach-desc, .htl-desc) :is(span, .ms-phrase) { display: inline !important; white-space: normal !important; }
body #home-page .pov-heading-wrap { width: 100% !important; max-width: 100% !important; margin-inline: 0 !important; padding-inline: 0 !important; }
body #home-page .pov-multi-reveal { display: flex !important; flex-wrap: wrap !important; justify-content: flex-start !important; align-items: baseline !important; gap: 12px 20px !important; }
body #home-page .pov-reveal-item { max-width: 100%; min-width: 0; }
body #home-page .pov-en { font-size: clamp(28px, 3.3vw, 46px) !important; line-height: 1.15 !important; letter-spacing: -.025em !important; white-space: normal !important; }
body #home-page .pov-ja { font-size: 16px !important; line-height: 1.7 !important; letter-spacing: .06em !important; white-space: normal !important; }
body #home-page .pov-line-wrap { margin-top: 24px !important; }
body #home-page .wwd-head { text-align: left; }
body #home-page .wwd-title { font-size: clamp(24px, 2.8vw, 38px) !important; line-height: 1.6 !important; letter-spacing: .025em !important; }
body #home-page .wwd-label { color: #6454d5 !important; -webkit-text-fill-color: #6454d5 !important; }
body #home-page .wwd-grid { max-width: none; gap: 20px; }
body #home-page .wwd-card { border: 1px solid #dce4ee; border-radius: 12px; background: rgba(255,255,255,.88); box-shadow: 0 8px 28px #20365908; padding: 28px 24px; }
body #home-page .wwd-name { font-size: 18px; min-height: 3em; }
body #home-page .wwd-nowrap { white-space: normal; }
body #home-page .wwd-more { min-height: 32px; font-weight: 600; }
body #home-page .ia-row { border-radius: 12px !important; }
body #home-page .ia-row-title { font-size: clamp(23px, 2vw, 28px) !important; line-height: 1.5 !important; }
body #home-page .ia-row-catchcopy { font-size: clamp(26px, 2.5vw, 36px) !important; line-height: 1.5 !important; }
body #home-page .ia-row-catchcopy .ms-phrase { display: inline !important; white-space: normal !important; }
body #home-page .svc-new-h2 { font-size: clamp(22px, 2vw, 28px) !important; line-height: 1.55 !important; letter-spacing: .02em !important; }
body #home-page .svc-new-body { min-width: 0 !important; width: 100% !important; max-width: none !important; }
body #home-page :is(.services-section, .venues-section) > .container { display: block !important; }
body #home-page :is(.services-side-h1, .venues-side-h1) { position: relative !important; inset: auto !important; writing-mode: horizontal-tb !important; transform: none !important; width: 100% !important; height: auto !important; max-height: none !important; margin: 0 0 36px !important; font-size: clamp(28px, 3.3vw, 46px) !important; line-height: 1.25 !important; letter-spacing: -.025em !important; white-space: normal !important; }
body #home-page :is(.services-side-h1, .venues-side-h1) > span { writing-mode: horizontal-tb !important; white-space: normal !important; }
body #home-page :is(.services-side-h1, .venues-side-h1) { min-height: 0 !important; justify-content: flex-start !important; align-items: flex-start !important; }
body #home-page .news-meta { flex-wrap: wrap; gap: 8px 12px; }
body #home-page .news-title { font-weight: 600 !important; }
body #home-page .htl-title { font-size: 18px !important; line-height: 1.6 !important; }
body #home-page .htl-steps { display: grid !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 20px !important; }
body #home-page .htl-step { width: auto !important; min-width: 0 !important; height: auto !important; padding: 28px 22px !important; }
body #home-page .htl-line { display: none !important; }
body #home-page .about-info-row dd { overflow-wrap: anywhere; line-height: 1.9; }
body #home-page .vs-card-body p { font-size: 14px !important; line-height: 1.8 !important; color: #47566f !important; -webkit-text-fill-color: #47566f !important; }
@media (min-width: 769px) and (max-width: 1199px) {
  body #home-page .wwd-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  body #home-page .htl-steps { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
}
@media (max-width: 768px) {
  body #home-page .container { padding-inline: 24px !important; }
  body #home-page :is(.wwd-section, .str2-section, .ia-section, .services-section, .works-section, .testimonials-section, .venues-section, .news-section, .process-section, .faq-section, .about-section) { padding: 64px 0 !important; }
  body #home-page .nav-inner { gap: 12px; height: 64px; }
  body #home-page .nav-logo { min-width: 0; gap: 8px; }
  body #home-page .nav-logo .nav-logo-copy { font-size: 9px; white-space: normal; letter-spacing: 0; }
  body #home-page .nav-hamburger { flex-shrink: 0; }
  body #home-page .nav-drawer { max-height: calc(100svh - 64px); overflow-y: auto; }
  body #home-page .pov-multi-reveal { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
  body #home-page .pov-divider { display: none !important; }
  body #home-page .pov-en { font-size: clamp(26px, 7.4vw, 36px) !important; }
  body #home-page .pov-ja { font-size: 14px !important; }
  body #home-page .pov-heading-wrap { margin-bottom: 32px !important; }
  body #home-page .wwd-title { font-size: clamp(22px, 5.6vw, 30px) !important; }
  body #home-page .wwd-grid { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  body #home-page .wwd-name { min-height: 0; font-size: 19px; }
  body #home-page .wwd-card { padding: 24px; }
  body #home-page .str2-layout { gap: 24px !important; }
  body #home-page .str2-image-wrap { height: auto !important; aspect-ratio: 4 / 3; }
  /* The legacy script reparents the comparison into this section. Keep both in flow. */
  body #home-page #experience-value { height: auto !important; padding: 64px 0 !important; }
  body #home-page #experience-value .ev-node-wrap { height: auto !important; min-height: 0 !important; padding: 0 24px !important; overflow: hidden !important; }
  body #home-page #experience-value :is(.core-node, .orbit-nodes, .value-shift-section) { position: relative !important; inset: auto !important; width: 100% !important; height: auto !important; transform: none !important; opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }
  body #home-page #experience-value .core-node { margin: 0 0 32px !important; }
  body #home-page #experience-value .core-label { width: 100% !important; }
  body #home-page #experience-value .core-label h2 { width: 100% !important; font-size: clamp(29px, 8vw, 42px) !important; line-height: 1.4 !important; }
  body #home-page #experience-value .core-label h2 span { display: inline !important; }
  body #home-page #experience-value .core-label h2 :is(small, p) { font-size: 14px !important; line-height: 1.8 !important; }
  body #home-page #experience-value .orbit-nodes { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; }
  body #home-page #experience-value .ev-node { position: relative !important; inset: auto !important; transform: none !important; width: 100% !important; height: auto !important; min-height: 144px !important; border-radius: 12px !important; padding: 16px 10px !important; opacity: 1 !important; visibility: visible !important; }
  body #home-page #experience-value .ev-node:last-child { grid-column: 1 / -1; }
  body #home-page #experience-value .node-inner { width: 100% !important; padding: 0 !important; }
  body #home-page #experience-value .node-en { font-size: 21px !important; }
  body #home-page #experience-value .node-ja { font-size: 14px !important; line-height: 1.7 !important; color: #47566f !important; -webkit-text-fill-color: #47566f !important; }
  body #home-page #experience-value :is(.connector-svg, .ev-popup-card), body #home-page #experience-value .ev-node-wrap::before, body #home-page #experience-value .ev-node-wrap::after, body #home-page #experience-value .ev-node::before, body #home-page #experience-value .ev-node::after { display: none !important; }
  body #home-page #experience-value .value-shift-section { padding: 56px 0 0 !important; margin: 0 !important; }
  body #home-page #experience-value .vs-inner { padding: 0 !important; gap: 24px !important; }
  body #home-page #experience-value .vs-center { min-height: 0 !important; padding: 20px 0 !important; }
  body #home-page #experience-value .vs-center-copy h2 { font-size: clamp(20px, 5.6vw, 27px) !important; line-height: 1.7 !important; }
  body #home-page #experience-value .vs-card-body p { font-size: 14px !important; line-height: 1.8 !important; }
  body #home-page .ia-rows { gap: 24px !important; }
  body #home-page .ia-row { padding: 16px !important; min-height: 0 !important; }
  body #home-page .ia-row-content { width: 100% !important; grid-template-columns: minmax(0, 1fr) !important; gap: 18px !important; padding: 0 !important; }
  body #home-page .ia-row-issue { order: 0 !important; padding: 20px !important; }
  body #home-page .ia-row-arrow { display: none !important; }
  body #home-page .ia-row-approach { order: 1 !important; padding: 20px !important; }
  body #home-page .ia-row-title { font-size: 22px !important; padding-right: 0 !important; }
  body #home-page .ia-row-issue::after { display: none !important; }
  body #home-page .ia-row-catchcopy { font-size: 26px !important; letter-spacing: .015em !important; }
  body #home-page .ia-row-bg { aspect-ratio: 16 / 10 !important; height: auto !important; margin-bottom: 20px !important; }
  body #home-page .ia-row-desc, body #home-page .ia-row-approach-desc { margin-top: 12px !important; }
  body #home-page .services-section > .container { padding-inline: 24px !important; display: block !important; }
  body #home-page .svc-card-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 24px !important; }
  body #home-page .svc-new-card { padding: 16px !important; display: flex !important; flex-direction: column !important; gap: 22px !important; min-width: 0 !important; }
  body #home-page .svc-new-visual { width: 100% !important; height: auto !important; aspect-ratio: 16 / 10 !important; }
  body #home-page .svc-new-body { padding: 0 4px 8px !important; }
  body #home-page .svc-new-h2 { font-size: 22px !important; }
  body #home-page .svc-new-cta { min-height: 48px !important; }
  body #home-page .htl-steps { grid-template-columns: minmax(0, 1fr) !important; gap: 14px !important; }
  body #home-page .htl-step { padding: 24px !important; text-align: left !important; }
  body #home-page .htl-desc { margin-top: 10px !important; }
  body #home-page .htl-title { margin-top: 12px !important; }
  body #home-page .faq-list summary { gap: 12px !important; padding: 20px 16px !important; font-size: 16px !important; }
  body #home-page .faq-answer { padding: 0 16px 24px !important; }
  body #home-page .about-info-row { grid-template-columns: minmax(0, 1fr); padding: 18px; gap: 6px; }
  body #home-page .contact-cta-card { padding: 24px !important; gap: 16px !important; }
  body #home-page .contact-cta-title { font-size: clamp(20px, 5.6vw, 26px) !important; white-space: normal !important; }
  body #home-page .contact-cta-desc { font-size: 14px !important; line-height: 1.8 !important; }
}
@media (prefers-reduced-motion: reduce) {
  body #home-page *, body #home-page *::before, body #home-page *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;

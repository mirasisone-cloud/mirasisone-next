/** Shared photo frames; source dimensions never determine the card layout. */
export const homeMediaStyles = String.raw`
body #home-page { --home-photo-ratio: 4 / 3; --home-thumb-width: 88px; --home-thumb-gap: 16px; }
body #home-page #services .svc-new-visual,
body #home-page #why-us .why-editorial-photo,
body #home-page #updates .news-img-wrap,
body #home-page #venues .works-card,
body #home-page #our-value .str2-image-wrap,
body #home-page #about .about-ceo-placeholder {
  position: relative !important;
  width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  aspect-ratio: var(--home-photo-ratio) !important;
  align-self: start !important;
  overflow: hidden !important;
  border: 0 !important;
  border-radius: 4px !important;
}
body #home-page #services .svc-new-visual img,
body #home-page #why-us .why-editorial-photo img,
body #home-page #updates .news-img-wrap img,
body #home-page #venues .works-card > img,
body #home-page #our-value .str2-img img,
body #home-page #about .about-ceo-photo {
  position: absolute !important;
  inset: 0 !important;
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  max-width: none !important;
  max-height: none !important;
  object-fit: cover !important;
  object-position: center !important;
  margin: 0 !important;
  transform: none !important;
}
body #home-page #our-value .str2-images { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; }
/* Keep the full castle silhouette visible in the alternate service photo. */
body #home-page #services #outdoor-mapping .svc-img-hover { object-fit: contain !important; background: #080d10; }
/* Override the imported stylesheet's reversed main/hover photo states. */
body #home-page #services .svc-new-card .svc-img-main { opacity: 1 !important; }
body #home-page #services .svc-new-card .svc-img-hover { opacity: 0 !important; }
body #home-page #services .svc-new-card:is(:hover,:focus-within) .svc-img-main { opacity: 0 !important; }
body #home-page #services .svc-new-card:is(:hover,:focus-within) .svc-img-hover { opacity: 1 !important; }
/* Let each row contain the full 4:3 photos before placing the next row and CTA. */
body #home-page #venues .works-grid { grid-auto-rows: auto !important; }
/* The story illustration is positioned beside its heading, not inside a card frame. */
body #home-page #original-home-story .ss-p2-visual {
  position: absolute !important;
  inset: 50% 3vw auto auto !important;
  width: 44vw !important;
  max-width: 760px !important;
  height: auto !important;
  aspect-ratio: auto !important;
  transform: translateY(-50%) !important;
  overflow: visible !important;
}
body #home-page #original-home-story .ss-p2-visual img {
  position: static !important;
  display: block !important;
  width: 100% !important;
  height: auto !important;
  object-fit: contain !important;
  transform: none !important;
  -webkit-mask-image: none !important;
  mask-image: none !important;
}
/* Logo artwork keeps its proportions inside identical slots. */
body #home-page #achievements .marquee-item { width: 144px !important; flex: 0 0 144px !important; display: flex !important; align-items: center; justify-content: center; }
body #home-page #achievements .marquee-logo { width: 112px !important; height: 72px !important; object-fit: contain !important; }
@media (max-width:768px), (max-width:1024px) and (max-height:520px) {
  body #home-page #services .svc-new-card,
  body #home-page #why-us .why-editorial-card,
  body #home-page #updates .news-card,
  body #home-page #about .about-ceo-img-wrap {
    display: grid !important;
    grid-template-columns: var(--home-thumb-width) minmax(0,1fr) !important;
    column-gap: var(--home-thumb-gap) !important;
  }
  body #home-page #updates .news-img-wrap { grid-column: 1; grid-row: 1 / 3; }
  body #home-page #about .about-ceo-placeholder { width: var(--home-thumb-width) !important; }
}
@media (max-width:360px) {
  body #home-page { --home-thumb-width: 72px; --home-thumb-gap: 12px; }
}
`;

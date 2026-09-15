/** All public pages are served by the Next.js site after the Wix migration. */
export const APP_ORIGIN = "https://mirasisone.com";

export function appUrl(path: string) {
  return `${APP_ORIGIN}${path}`;
}

export function postCanonicalUrl(slug: string) {
  let decoded = slug;
  try { decoded = decodeURIComponent(slug); } catch { /* Keep literal slugs. */ }
  return appUrl(`/post/${encodeURIComponent(decoded)}`);
}

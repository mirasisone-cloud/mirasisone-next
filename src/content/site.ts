/**
 * 配信ホストの使い分け。
 *
 * - WIX_ORIGIN (www): TOP / company / works / recruit / privacy-policy を Wix が配信する。
 * - APP_ORIGIN (apex): blog / post / contact / thanks をこの Next アプリが配信する（src/proxy.ts 参照）。
 *
 * www 側に /post/* と /contact は存在しない（404）ため、
 * このアプリが配信するページの canonical・sitemap は必ず APP_ORIGIN を使うこと。
 */
export const APP_ORIGIN = "https://mirasisone.com";
export const WIX_ORIGIN = "https://www.mirasisone.com";

/** このアプリが実際に配信するパスの絶対URLを組み立てる */
export function appUrl(path: string) {
  return `${APP_ORIGIN}${path}`;
}

import { seoUrlInventory } from "./seo-url-inventory";

/**
 * 配信ホストの使い分け。
 *
 * - WIX_ORIGIN (www): TOP / company / works / recruit / privacy-policy と、旧ブログ記事を Wix が配信する。
 * - APP_ORIGIN (apex): blog / post / contact / thanks をこの Next アプリが配信する（src/proxy.ts 参照）。
 *
 * ブログ記事は移行途中で、Wix 由来の記事は www と apex の両方に同じ内容で存在する。
 * 検索評価を受けているのは www 側なので、それらの canonical は www を指す。
 * apex にしか無い記事（Wix 移行後に追加した記事）だけ canonical を apex にする。
 * www 側の記事を 301 で apex に寄せたら、このルールを「すべて apex」に切り替える。
 */
export const APP_ORIGIN = "https://mirasisone.com";
export const WIX_ORIGIN = "https://www.mirasisone.com";

/** このアプリが実際に配信するパスの絶対URLを組み立てる */
export function appUrl(path: string) {
  return `${APP_ORIGIN}${path}`;
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Wix(www) 側にも同じ記事が存在する slug。seo-url-inventory の blog-post が正 */
const wixPostSlugs = new Set<string>(
  seoUrlInventory
    .filter((entry) => entry.type === "blog-post")
    .map((entry) => safeDecode(entry.path).replace(/^\/post\//, "")),
);

export function isWixPost(slug: string) {
  return wixPostSlugs.has(safeDecode(slug));
}

/** 記事の正規URL。Wix にもある記事は www、apex にしか無い記事は apex */
export function postCanonicalUrl(slug: string) {
  const path = `/post/${encodeURIComponent(safeDecode(slug))}`;
  return isWixPost(slug) ? `${WIX_ORIGIN}${path}` : appUrl(path);
}

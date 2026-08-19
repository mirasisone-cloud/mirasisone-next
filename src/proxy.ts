import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * apex ドメイン (mirasisone.com) は問い合わせ関連ページのみをこのアプリで配信し、
 * それ以外のパスは既存の Wix サイト (www.mirasisone.com) へ転送する。
 */
const APEX_HOST = "mirasisone.com";
const WIX_ORIGIN = "https://www.mirasisone.com";

// このアプリで配信するパス
const APP_PATHS = ["/contact", "/thanks", "/api/contact"];

function isAppPath(pathname: string) {
  return APP_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

// 拡張子付き（画像・CSS・JS など）はアセットとみなして転送しない
function isAsset(pathname: string) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export default function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (host !== APEX_HOST) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  if (isAppPath(pathname) || isAsset(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(`${WIX_ORIGIN}${pathname}${search}`, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

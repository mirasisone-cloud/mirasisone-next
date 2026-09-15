import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_ORIGIN } from "./content/site";

/** Preserve incoming paths while consolidating www onto the new site. */
export default function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  if (host === "www.mirasisone.com") {
    return NextResponse.redirect(`${APP_ORIGIN}${request.nextUrl.pathname}${request.nextUrl.search}`, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

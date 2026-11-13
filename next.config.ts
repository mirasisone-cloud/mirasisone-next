import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {
          root: __dirname,
    },
    images: {
          remotePatterns: [
            { protocol: "https", hostname: "static.wixstatic.com" },
            { protocol: "https", hostname: "images.microcms-assets.io" },
                ],
    },
    // 最低限のセキュリティヘッダー。別サイトへの埋め込みや MIME 推測を防ぐ
    async headers() {
          return [
            {
                      source: "/:path*",
                      headers: [
                                { key: "X-Content-Type-Options", value: "nosniff" },
                                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                                { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
                      ],
            },
                ];
    },
    async redirects() {
          return [
            {
                      source: "/home",
                      destination: "/",
                      permanent: true,
            },
            {
                      source: "/services-works",
                      destination: "/works",
                      permanent: true,
            },
            {
                      source: "/privacy-polic",
                      destination: "/privacy-policy",
                      permanent: true,
            },
            // 旧広告のリンク先。アクセスはあるのに 404 だった
            {
                      source: "/privacy",
                      destination: "/privacy-policy",
                      permanent: true,
            },
            {
                      source: "/corporate",
                      destination: "/company",
                      permanent: true,
            },
            // よくある綴りで来たときに 404 にしない
            ...["/about", "/kaisha", "/outline", "/company-profile"].map((source) => ({
                      source,
                      destination: "/company",
                      permanent: true,
            })),
            ...["/inquiry", "/contact-us"].map((source) => ({
                      source,
                      destination: "/contact",
                      permanent: true,
            })),
            // 削除済みの旧記事。Search Console が 404 を検出していた（2026-11-01 以降、12日間）。
            // 内容が最も近い費用ガイドへ恒久リダイレクトする。
            {
                      source: "/post/immersive-space-production-cost-guide",
                      destination: "/post/projection-mapping-cost-guide",
                      permanent: true,
            },
            {
                      source: "/news",
                      destination: "/blog",
                      permanent: true,
            },
            {
                      source: "/service",
                      destination: "/works",
                      permanent: true,
            },
                ];
    },
};

export default nextConfig;

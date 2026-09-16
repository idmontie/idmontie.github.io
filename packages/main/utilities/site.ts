import siteConfig from "../site.config.json";

/** Public origin without a trailing slash (e.g. `https://idmontie.github.io`). */
export function getSiteUrl(): string {
    const configured = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.siteUrl;
    return configured.replace(/\/$/, "");
}

/** Absolute URL for a pathname from the site root. Root uses a trailing slash. */
export function absoluteSiteUrl(pathname: string): string {
    const siteUrl = getSiteUrl();
    const path = pathname.split("?")[0].split("#")[0];

    if (path === "" || path === "/") {
        return `${siteUrl}/`;
    }

    const prefixedPath = path.startsWith("/") ? path : `/${path}`;
    return `${siteUrl}${prefixedPath}`;
}

/** Canonical URL for a Next.js `router.asPath` value. */
export function canonicalUrlFromAsPath(asPath: string): string {
    return absoluteSiteUrl(asPath);
}

export function getRobotsTxt(): string {
    return `User-agent: *
Allow: /

Sitemap: ${absoluteSiteUrl("/sitemap.xml")}

Disallow: /admin/
Disallow: /login/
Disallow: /api/
Disallow: /search/
Disallow: /preview/
Disallow: /drafts/

Allow: /_next/static/
Allow: /images/
Allow: /assets/
`;
}

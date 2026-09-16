import fs from "fs";
import path from "path";
import { PAGE_SIZE } from "modules/blog/blog-constants";
import { blog } from "modules/blog/blog.server";
import { groupPostsBySeries } from "modules/blog/series";
import { projects } from "modules/portfolio/portfolio.server";
import { absoluteSiteUrl, getRobotsTxt } from "utilities/site";

interface SitemapEntry {
    loc: string;
    lastmod?: string;
}

function escapeXml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function toLastMod(date: string | Date): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString().slice(0, 10);
}

export async function generateSitemap(): Promise<void> {
    const entries: SitemapEntry[] = [];

    for (const pathname of [
        "/",
        "/portfolio",
        "/blog",
        "/blog/tag",
        "/blog/series",
    ]) {
        entries.push({ loc: absoluteSiteUrl(pathname) });
    }

    const posts = await blog.getAllPostsByDate();
    for (const post of posts) {
        entries.push({
            loc: absoluteSiteUrl(`/blog/post/${encodeURIComponent(post.slug)}`),
            lastmod: toLastMod(post.date),
        });
    }

    const numberOfPages = Math.ceil(posts.length / PAGE_SIZE);
    for (let page = 2; page <= numberOfPages; page++) {
        entries.push({ loc: absoluteSiteUrl(`/blog/${page}`) });
    }

    const groupedTags = await blog.groupPostsByTags();
    for (const tag of Object.keys(groupedTags)) {
        entries.push({
            loc: absoluteSiteUrl(`/blog/tag/${encodeURIComponent(tag)}`),
        });
    }

    const groupedSeries = await groupPostsBySeries();
    for (const series of Object.keys(groupedSeries)) {
        entries.push({
            loc: absoluteSiteUrl(`/blog/series/${encodeURIComponent(series)}`),
        });
    }

    const projectPosts = await projects.getAllPostsByDate();
    for (const project of projectPosts) {
        entries.push({
            loc: absoluteSiteUrl(
                `/projects/${encodeURIComponent(project.slug)}`
            ),
            lastmod: toLastMod(project.date),
        });
    }

    const urlEntries = entries
        .map((entry) => {
            let block = `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>`;
            if (entry.lastmod) {
                block += `\n    <lastmod>${entry.lastmod}</lastmod>`;
            }
            block += "\n  </url>";
            return block;
        })
        .join("\n");

    // eslint-disable-next-line no-secrets/no-secrets -- false positive
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

    const publicDir = path.join(process.cwd(), "public");
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml);
    fs.writeFileSync(path.join(publicDir, "robots.txt"), getRobotsTxt());
}

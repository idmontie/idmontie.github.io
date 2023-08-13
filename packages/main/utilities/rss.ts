import RSS from "rss";
import fs from "fs";
import path from "path";
import { Post } from "nextjs-blog-lib";

export function generateRssFeed(posts: Post[]) {
    // Not the best to hardcode this, but it the blog
    // isn't going anywhere
    const siteUrl = "https://idmontie.github.io";

    const feed = new RSS({
        title: "idmontie's blog",
        description: "idmontie's blog and projects",
        site_url: siteUrl,
        feed_url: `${siteUrl}/rss.xml`,
        image_url: `${siteUrl}/favicon.ico`,
        pubDate: new Date().toISOString(),
        copyright: `All rights reserved ${new Date().getFullYear()}, idmontie`,
    });

    for (const post of posts) {
        feed.item({
            title: post.title,
            description: post.excerptHTML,
            url: `${siteUrl}/blog/post/${post.slug}`,
            guid: post.slug,
            date: post.date,
        });
    }

    // Path to public folder
    const publicDir = path.join(process.cwd(), "packages", "main", "public");

    fs.writeFileSync(
        path.join(publicDir, "rss.xml"),
        feed.xml({ indent: true })
    );
}

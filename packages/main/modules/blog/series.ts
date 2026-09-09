import type { Post } from "nextjs-blog-lib";
import { blog } from "./blog.server";

export async function groupPostsBySeries(): Promise<Record<string, Post[]>> {
    const allPosts = await blog.getAllPostsByDate();
    const result: Record<string, Post[]> = {};

    for (const post of allPosts) {
        const series = post.frontmatter.series;
        if (typeof series !== "string" || !series) continue;
        (result[series] ??= []).push(post);
    }

    for (const key of Object.keys(result)) {
        result[key].sort((a, b) => (a.date > b.date ? 1 : -1));
    }

    return result;
}

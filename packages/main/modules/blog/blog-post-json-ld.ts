import type { Post } from "nextjs-blog-lib";

import { absoluteSiteUrl } from "utilities/site";

const SITE_AUTHOR_NAME = "idmontie";
const SITE_PUBLISHER_NAME = "idmontie's Portfolio";

export function buildBlogPostingJsonLd(
    post: Post,
    options?: { imageUrl?: string }
): Record<string, unknown> {
    const url = absoluteSiteUrl(`/blog/post/${post.slug}`);
    const datePublished = normalizeIsoDate(post.date);
    const updated =
        typeof post.frontmatter.updated === "string"
            ? normalizeIsoDate(post.frontmatter.updated)
            : datePublished;

    const jsonLd: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        url,
        datePublished,
        dateModified: updated,
        description: post.excerptRaw,
        author: {
            "@type": "Person",
            name: SITE_AUTHOR_NAME,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_PUBLISHER_NAME,
            logo: {
                "@type": "ImageObject",
                url: absoluteSiteUrl("/favicon.ico"),
            },
        },
    };

    if (options?.imageUrl) {
        jsonLd.image = options.imageUrl;
    }

    return jsonLd;
}

/** Ensure YYYY-MM-DD or full ISO strings for schema.org date fields. */
function normalizeIsoDate(value: string): string {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return parsed.toISOString().slice(0, 10);
}

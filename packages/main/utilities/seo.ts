import type { Post } from "nextjs-blog-lib";

export const SITE_TITLE_SUFFIX = " - idmontie's Portfolio";

export const DEFAULT_SITE_TITLE = `idmontie's Portfolio`;

export const DEFAULT_SITE_DESCRIPTION =
    "Blog posts and software projects by idmontie — engineering, web development, and related topics.";

export function buildPageTitle(primary: string): string {
    return `${primary}${SITE_TITLE_SUFFIX}`;
}

const KNOWN_ACRONYMS = new Set([
    "ai",
    "api",
    "apis",
    "css",
    "gpu",
    "gpus",
    "html",
    "js",
    "json",
    "nx",
    "rest",
    "seo",
    "tsx",
    "typescript",
    "ui",
    "ux",
]);

export function formatTagLabel(tag: string): string {
    return tag
        .split(/[\s_-]+/)
        .filter(Boolean)
        .map((word) => {
            const lower = word.toLowerCase();
            if (KNOWN_ACRONYMS.has(lower)) {
                return lower.toUpperCase();
            }
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join(" ");
}

export function metaDescription(source: string, maxLength = 160): string {
    const plain = source
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (plain.length <= maxLength) {
        return plain;
    }

    const truncated = plain.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    const cut =
        lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated;

    return `${cut.trim()}…`;
}

export function blogPostHead(post: Pick<Post, "title" | "excerptRaw">): {
    title: string;
    description: string;
} {
    return {
        title: buildPageTitle(post.title),
        description: metaDescription(post.excerptRaw),
    };
}

export function blogTagsIndexHead(): { title: string; description: string } {
    return {
        title: buildPageTitle("Blog tags"),
        description: "Index of topics on idmontie's blog; browse posts by tag.",
    };
}

export function blogTagHead(
    tag: string,
    postCount: number
): { title: string; description: string } {
    const tagLabel = formatTagLabel(tag);
    const articleWord = postCount === 1 ? "article" : "articles";

    return {
        title: buildPageTitle(`${tagLabel} blog posts`),
        description: `${postCount} ${articleWord} tagged “${tag}” — software, engineering, and related writing by idmontie.`,
    };
}

function projectDescriptionSource(project: Post): string {
    const fromFrontmatter = project.frontmatter.description;
    if (typeof fromFrontmatter === "string" && fromFrontmatter.trim()) {
        return fromFrontmatter.trim();
    }
    if (project.excerptRaw.trim()) {
        return project.excerptRaw;
    }
    return project.excerptHTML;
}

export function projectHead(project: Post): {
    title: string;
    description: string;
} {
    return {
        title: buildPageTitle(project.title),
        description: metaDescription(projectDescriptionSource(project)),
    };
}

export function projectsIndexHead(): { title: string; description: string } {
    return {
        title: buildPageTitle("Projects"),
        description:
            "Portfolio of software projects — web apps, tools, and engineering work by idmontie.",
    };
}

import type { Post } from "nextjs-blog-lib";

import {
    blogPostHead,
    blogTagHead,
    buildPageTitle,
    formatTagLabel,
    metaDescription,
    projectHead,
    SITE_TITLE_SUFFIX,
} from "./seo";

describe("buildPageTitle", () => {
    it("appends the site title suffix", () => {
        expect(buildPageTitle("Blog tags")).toBe(
            `Blog tags${SITE_TITLE_SUFFIX}`
        );
    });
});

describe("formatTagLabel", () => {
    it("capitalizes words and uppercases known acronyms", () => {
        expect(formatTagLabel("seo")).toBe("SEO");
        expect(formatTagLabel("machine-learning")).toBe("Machine Learning");
    });
});

describe("metaDescription", () => {
    it("strips HTML tags", () => {
        expect(metaDescription("<p>Hello <strong>world</strong></p>")).toBe(
            "Hello world"
        );
    });

    it("truncates long strings on a word boundary", () => {
        const long = "word ".repeat(50).trim();
        const result = metaDescription(long, 40);

        expect(result.length).toBeLessThanOrEqual(41);
        expect(result.endsWith("…")).toBe(true);
        expect(result).not.toContain("<");
    });
});

describe("blogPostHead", () => {
    it("builds title and sanitized description", () => {
        const head = blogPostHead({
            title: "Example Post",
            excerptRaw: "A short summary.",
        });

        expect(head.title).toBe(`Example Post${SITE_TITLE_SUFFIX}`);
        expect(head.description).toBe("A short summary.");
    });
});

describe("blogTagHead", () => {
    it("uses singular article for one post", () => {
        const head = blogTagHead("seo", 1);

        expect(head.title).toBe(`SEO blog posts${SITE_TITLE_SUFFIX}`);
        expect(head.description).toContain("1 article");
    });
});

describe("projectHead", () => {
    const baseProject: Post = {
        title: "Couchsurfing",
        date: "2026-08-24",
        slug: "2026-08-24-couchsurfing",
        frontmatter: {},
        contentRaw: "",
        contentHTML: "",
        contentCode: "",
        excerptRaw: "Excerpt from body.",
        excerptHTML: "<p>HTML excerpt.</p>",
        excerptCode: "",
        tags: [],
    };

    it("prefers frontmatter description over excerpts", () => {
        const head = projectHead({
            ...baseProject,
            frontmatter: {
                description: "Architected the next-generation stack.",
            },
        });

        expect(head.description).toBe("Architected the next-generation stack.");
    });

    it("falls back to excerptRaw when frontmatter description is missing", () => {
        const head = projectHead(baseProject);

        expect(head.description).toBe("Excerpt from body.");
    });
});

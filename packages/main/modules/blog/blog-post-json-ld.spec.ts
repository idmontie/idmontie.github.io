import type { Post } from "nextjs-blog-lib";

import { buildBlogPostingJsonLd } from "./blog-post-json-ld";

const basePost: Post = {
    title: "Example Post",
    date: "2023-02-24",
    slug: "2023-02-24-example",
    frontmatter: {},
    contentRaw: "",
    contentHTML: "",
    contentCode: "",
    excerptRaw: "A short summary.",
    excerptHTML: "",
    excerptCode: "",
    tags: ["apis"],
};

describe("buildBlogPostingJsonLd", () => {
    it("builds BlogPosting with publisher and author", () => {
        const jsonLd = buildBlogPostingJsonLd(basePost);

        expect(jsonLd["@type"]).toBe("BlogPosting");
        expect(jsonLd.headline).toBe("Example Post");
        expect(jsonLd.url).toBe(
            "https://idmontie.github.io/blog/post/2023-02-24-example"
        );
        expect(jsonLd.datePublished).toBe("2023-02-24");
        expect(jsonLd.dateModified).toBe("2023-02-24");
        expect(jsonLd.description).toBe("A short summary.");
        expect(jsonLd.author).toEqual({
            "@type": "Person",
            name: "idmontie",
        });
        expect(jsonLd.publisher).toMatchObject({
            "@type": "Organization",
            name: "idmontie's Portfolio",
        });
    });

    it("uses frontmatter updated for dateModified when present", () => {
        const jsonLd = buildBlogPostingJsonLd({
            ...basePost,
            frontmatter: { updated: "2023-03-01" },
        });

        expect(jsonLd.datePublished).toBe("2023-02-24");
        expect(jsonLd.dateModified).toBe("2023-03-01");
    });

    it("includes image when provided", () => {
        const jsonLd = buildBlogPostingJsonLd(basePost, {
            imageUrl: "https://idmontie.github.io/media/example/cover.png",
        });

        expect(jsonLd.image).toBe(
            "https://idmontie.github.io/media/example/cover.png"
        );
    });
});

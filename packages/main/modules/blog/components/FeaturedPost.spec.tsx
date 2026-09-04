import { render, screen } from "@testing-library/react";
import { FeaturedPost, getReadingTimeMinutes } from "./FeaturedPost";

jest.mock("./RenderMarkdown", () => ({
    RenderMarkdown: ({ html }: { html: string }) => (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    ),
}));

const post = {
    slug: "why-view-models",
    title: "Why view models?",
    date: "2026-07-03",
    excerptHTML:
        "<p>APIs and user interfaces often have different representations of the same data.</p>",
    excerptCode: "",
    tags: ["architecture", "programming"],
    readingTimeMinutes: 9,
};

describe("getReadingTimeMinutes", () => {
    it("returns at least one minute for empty content", () => {
        expect(getReadingTimeMinutes("")).toBe(1);
        expect(getReadingTimeMinutes("   ")).toBe(1);
    });

    it("rounds word count to minutes at 200 words per minute", () => {
        const words = Array.from({ length: 300 }, () => "word").join(" ");
        expect(getReadingTimeMinutes(words)).toBe(2);
    });
});

describe("FeaturedPost", () => {
    it("renders the featured article content and links", () => {
        render(<FeaturedPost post={post} />);

        expect(screen.getByText("Featured Article")).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "Why view models?" })
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /APIs and user interfaces often have different representations/
            )
        ).toBeInTheDocument();
        expect(screen.getByText("9 min read")).toBeInTheDocument();
        expect(screen.getByText("architecture")).toBeInTheDocument();
        expect(screen.getByText("programming")).toBeInTheDocument();

        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(2);
        for (const link of links) {
            expect(link).toHaveAttribute("href", "/blog/post/why-view-models");
        }
        expect(
            screen.getByRole("link", { name: /Read the article/ })
        ).toBeInTheDocument();
    });

    it("omits the tag when the post has none", () => {
        render(<FeaturedPost post={{ ...post, tags: [] }} />);

        expect(screen.getByText("9 min read")).toBeInTheDocument();
        expect(screen.queryByText("architecture")).not.toBeInTheDocument();
    });
});

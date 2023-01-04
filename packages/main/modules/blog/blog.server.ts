import { join } from "path";
import { BlogOptions, createBlog } from "nextjs-blog-lib";
import { components } from "./blog";

const blogOptions: Partial<BlogOptions> = {
    postsDirectory: join(process.cwd(), "packages", "main", "_posts"),
    rewriteMediaUrls: {
        mediaDirectory: join(
            process.cwd(),
            "packages",
            "main",
            "public",
            "media"
        ),
    },
    mdx: {
        components,
    },
};

export const blog = createBlog(blogOptions);

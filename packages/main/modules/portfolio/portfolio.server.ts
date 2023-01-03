import { join } from "path";
import { BlogOptions, createBlog } from "nextjs-blog-lib";
import { components } from "../blog/blog";

const projectOptions: Partial<BlogOptions> = {
    postsDirectory: join(process.cwd(), "packages", "main", "_projects"),
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

export const projects = createBlog(projectOptions);

import { join } from "path";
import { BlogOptions, createBlog } from "nextjs-blog-lib";
import { components } from "../blog/blog";
import { compiler, runner } from "modules/blog/blog.server";

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
        relativeDirectory: "/media",
    },
    mdx: {
        components,
        compile: compiler,
        run: runner,
    },
};

export const projects = createBlog(projectOptions);

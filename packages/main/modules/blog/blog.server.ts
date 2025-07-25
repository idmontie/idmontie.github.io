import { join } from "path";
import { BlogOptions, createBlog } from "nextjs-blog-lib";
import { compile, run, RunOptions } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { components } from "./blog";
import mdxMermaid from "mdx-mermaid";
import removeImports from "remark-mdx-remove-imports";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export const compiler = async (mdx: string) => {
    const inter = String(
        await compile(mdx, {
            outputFormat: "function-body",
            rehypePlugins: [rehypeKatex],
            remarkPlugins: [remarkGfm, mdxMermaid, removeImports, remarkMath],
        })
    );

    // Hack to remove the import of Mermaid
    // Hack to replace invalid jsxDEV import when in dev mode
    return inter
        .replaceAll("jsxDEV", "jsx")
        .replaceAll(
            `children: "import { Mermaid } from 'mdx-mermaid/lib/Mermaid';"`,
            ""
        );
};

export const runner = async (code: string) => {
    // const scope = {};

    const { default: Component } = await run(code, {
        ...runtime,
    } as RunOptions);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Component;
};

const blogOptions: Partial<BlogOptions> = {
    postsDirectory: join(process.cwd(), "_posts"),
    rewriteMediaUrls: {
        mediaDirectory: join(process.cwd(), "public", "media"),
        relativeDirectory: "/media",
    },
    mdx: {
        components,
        compile: compiler,
        run: runner,
    },
};

export const blog = createBlog(blogOptions);

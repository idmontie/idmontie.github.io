import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import type { Post } from "nextjs-blog-lib";
import { PAGE_SIZE } from "modules/blog/blog";
import { PostPreviewItem } from "modules/blog/components/PostPreviewItem";
import { blog } from "modules/blog/blog.server";
import PageHeader from "modules/base/PageHeader";

export interface BlogIndexProps {
    hasPreviousPage: boolean;
    posts: Post[];
}

function BlogIndex({ hasPreviousPage, posts }: BlogIndexProps) {
    return (
        <div>
            <Head>
                <title>Blog - idmontie&apos;s Portfolio</title>
                <meta name="description" content="Latest blog posts" />
            </Head>
            <div>
                <header>
                    <PageHeader>Blog</PageHeader>
                </header>

                <div>
                    {posts.map((post) => {
                        return <PostPreviewItem post={post} key={post.slug} />;
                    })}
                </div>

                <div>
                    <div />
                    <div>
                        {hasPreviousPage && (
                            <Link href="/blog/2">Older posts</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogIndex;

export const getStaticProps: GetStaticProps = async () => {
    const posts = await blog.getAllPostsByDate();

    const postsToDisplay = posts.slice(0, PAGE_SIZE);

    return {
        props: {
            posts: postsToDisplay,
            hasPreviousPage: posts.length > PAGE_SIZE,
        },
    };
};

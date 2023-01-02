import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { PAGE_SIZE } from "modules/blog/blog";
import { PostPreviewItem } from "modules/blog/components/PostPreviewItem";
import type { Post } from "nextjs-blog-lib";
import { blog } from "modules/blog/blog.server";

export interface BlogIndexProps {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    posts: Post[];
}

function BlogPage({ hasPreviousPage, hasNextPage, posts }: BlogIndexProps) {
    const router = useRouter();
    const page = router.query.page as string;
    const pageInt = Number.parseInt(page, 10);

    return (
        <div>
            <Head>
                <title>Blog Page {page} - Capsule Cat</title>
                <meta
                    name="description"
                    content="Blog posts for the latest updates on Capsule Cat"
                />
            </Head>
            <div>
                <div>Blog Page {page}</div>

                <div>
                    {posts.map((post) => {
                        return <PostPreviewItem post={post} key={post.slug} />;
                    })}
                </div>

                <div>
                    <div>
                        {hasNextPage && (
                            <Link
                                href={
                                    pageInt === 2
                                        ? `/blog`
                                        : `/blog/${pageInt - 1}`
                                }
                            >
                                &lt; Newer posts
                            </Link>
                        )}
                    </div>
                    <div>
                        {hasPreviousPage && (
                            <Link href={`/blog/${pageInt + 1}`}>
                                Older posts &gt;
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await blog.getAllPostsByDate();

    const numberOfPages = Math.ceil(posts.length / PAGE_SIZE);

    return {
        paths: Array.from({ length: numberOfPages }, (_, i) => {
            return {
                params: {
                    page: (i + 1).toString(),
                },
            };
        }),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const page = context.params?.page as string;
    const pageInt = Number.parseInt(page, 10);

    const posts = await blog.getAllPostsByDate();

    // add parsed excerpt to posts
    const postsWithExcerpt = posts.slice(
        (pageInt - 1) * PAGE_SIZE,
        pageInt * PAGE_SIZE
    );

    return {
        props: {
            posts: postsWithExcerpt,
            hasNextPage: pageInt > 1,
            hasPreviousPage: posts.length > PAGE_SIZE * pageInt,
        },
    };
};

export default BlogPage;

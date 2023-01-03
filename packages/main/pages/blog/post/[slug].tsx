import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import type { Post } from "nextjs-blog-lib";
import { useClientSideValue } from "modules/utilities/useClientSideValue";
import { RenderMarkdown } from "modules/blog/components/RenderMarkdown";
import { blog } from "modules/blog/blog.server";
import PageHeader from "modules/base/PageHeader";
import { OutlineButton } from "modules/base/OutlineButton";

export interface BlogSlugProps {
    headTitle: string;
    post: Post;
    previous: Post | null;
    next: Post | null;
}

function BlogSlug({ headTitle, post, previous, next }: BlogSlugProps) {
    const clientSideDate = useClientSideValue(() => {
        return new Date(post.date).toLocaleDateString();
    });

    return (
        <div>
            <Head>
                <title>{headTitle} - idmontie&apos;s Portfolio</title>
                <meta name="description" content={post.excerptHTML} />
            </Head>
            <article className="px-6 md:px-0">
                <header>
                    <PageHeader>{post.title}</PageHeader>

                    <div className="mb-6 text-sm">Posted: {clientSideDate}</div>
                </header>
                <main>
                    <div className="prose dark:prose-dark">
                        <RenderMarkdown
                            html={post.contentHTML}
                            code={post.contentCode}
                        />
                    </div>
                    <footer className="mt-8">
                        <div className="flex justify-between">
                            {previous ? (
                                <OutlineButton
                                    as={Link}
                                    href={`/blog/post/${previous.slug}`}
                                >
                                    <span className="mr-2">←</span>
                                    {previous.title}
                                </OutlineButton>
                            ) : (
                                <div />
                            )}
                            {next ? (
                                <OutlineButton
                                    as={Link}
                                    href={`/blog/post/${next.slug}`}
                                >
                                    {next.title}
                                    <span className="ml-2">→</span>
                                </OutlineButton>
                            ) : (
                                <div />
                            )}
                        </div>
                    </footer>
                </main>
            </article>
        </div>
    );
}

export default BlogSlug;

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await blog.getAllPostsByDate();

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug as string;

    const postData = await blog.getPostBySlug(slug);

    return {
        props: {
            headTitle: `${postData.post.title} - idmontie's Portfolio`,
            post: postData.post,
            previous: postData.previous,
            next: postData.next,
        } as BlogSlugProps,
    };
};

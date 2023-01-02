import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import type { Post } from "nextjs-blog-lib";
import { useClientSideValue } from "modules/utilities/useClientSideValue";
import { RenderMarkdown } from "modules/blog/components/RenderMarkdown";
import { blog } from "modules/blog/blog.server";

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
                <title>{headTitle}</title>
                <meta name="description" content={post.excerptHTML} />
            </Head>
            <div>
                <div>{post.title}</div>
                <div>
                    <div>
                        <div>Posted: {clientSideDate}</div>
                        <RenderMarkdown
                            html={post.contentHTML}
                            code={post.contentCode}
                        />
                    </div>

                    <div>
                        {previous ? (
                            <Link href={`/blog/post/${previous.slug}`}>
                                Newer post: {previous.title}
                            </Link>
                        ) : (
                            <div />
                        )}
                        {next ? (
                            <Link href={`/blog/post/${next.slug}`}>
                                Older post: {next.title}
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
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
            headTitle: `${postData.post.title} - Capsule Cat`,
            post: postData.post,
            previous: postData.previous,
            next: postData.next,
        } as BlogSlugProps,
    };
};

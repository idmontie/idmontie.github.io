import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import type { Post } from "nextjs-blog-lib";
import { blog } from "modules/blog/blog.server";
import PageHeader from "modules/base/PageHeader";
import { PostPreviewItem } from "modules/blog/components/PostPreviewItem";
import { blogTagHead } from "utilities/seo";

export interface BlogTagProps {
    headTitle: string;
    headDescription: string;
    headKeywords: string;
    tag: string;
    posts: Post[];
}

function BlogTag({
    headTitle,
    headDescription,
    headKeywords,
    tag,
    posts,
}: BlogTagProps) {
    return (
        <div>
            <Head>
                <title>{headTitle}</title>
                <meta
                    key="description"
                    name="description"
                    content={headDescription}
                />
                {/* Add tags as meta keywords */}
                <meta name="keywords" content={headKeywords} />
            </Head>
            <div className="px-4">
                <header>
                    <PageHeader>
                        <span className="capitalize">{tag}</span> posts
                    </PageHeader>
                </header>

                <div className="space-y-6">
                    {posts.map((post) => {
                        return <PostPreviewItem post={post} key={post.slug} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default BlogTag;

export const getStaticPaths: GetStaticPaths = async () => {
    const grouped = await blog.groupPostsByTags();
    const tags = Object.keys(grouped);

    return {
        paths: tags.map((tag) => {
            return {
                params: {
                    tag,
                },
            };
        }),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const tag = context.params?.tag as string;

    const grouped = await blog.groupPostsByTags();

    const posts = grouped[tag];
    const { title, description } = blogTagHead(tag, posts.length);

    return {
        props: {
            headTitle: title,
            headDescription: description,
            // Generate on the server to avoid template string interpolation
            headKeywords: tag,
            tag,
            posts,
        } as BlogTagProps,
    };
};

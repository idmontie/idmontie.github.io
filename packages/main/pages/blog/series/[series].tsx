import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import type { Post } from "nextjs-blog-lib";
import PageHeader from "modules/base/PageHeader";
import { PostPreviewItem } from "modules/blog/components/PostPreviewItem";
import { groupPostsBySeries } from "modules/blog/series";

export interface BlogSeriesDetailProps {
    headTitle: string;
    headKeywords: string;
    series: string;
    posts: Post[];
}

function BlogSeriesDetail({
    headTitle,
    headKeywords,
    series,
    posts,
}: BlogSeriesDetailProps) {
    return (
        <div>
            <Head>
                <title>{headTitle}</title>
                <meta name="keywords" content={headKeywords} />
            </Head>
            <div className="px-4">
                <header>
                    <PageHeader>{series}</PageHeader>
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

export default BlogSeriesDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    const grouped = await groupPostsBySeries();
    const seriesList = Object.keys(grouped);

    return {
        paths: seriesList.map((series) => {
            return {
                params: {
                    series,
                },
            };
        }),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const series = context.params?.series as string;

    const grouped = await groupPostsBySeries();

    const posts = grouped[series];

    return {
        props: {
            headTitle: `${series} - idmontie's Portfolio`,
            headKeywords: series,
            series,
            posts,
        } satisfies BlogSeriesDetailProps,
    };
};

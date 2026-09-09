import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Card } from "modules/base/Card";
import PageHeader from "modules/base/PageHeader";
import { PostPreviewItem } from "modules/blog/components/PostPreviewItem";
import { groupPostsBySeries } from "modules/blog/series";

interface SeriesLatestPost {
    slug: string;
    title: string;
    date: string;
    excerptHTML: string;
    excerptCode: string;
    tags: string[];
}

interface SeriesInfo {
    series: string;
    numberOfPosts: number;
    latestPost: SeriesLatestPost;
}

export interface BlogSeriesProps {
    headTitle: string;
    seriesList: SeriesInfo[];
}

function BlogSeries({ headTitle, seriesList }: BlogSeriesProps) {
    return (
        <div>
            <Head>
                <title>{headTitle}</title>
            </Head>
            <div className="px-4">
                <header>
                    <PageHeader>Series</PageHeader>
                </header>

                <div className="flex flex-col gap-4">
                    {seriesList.map((data) => {
                        return (
                            <Card key={data.series}>
                                <div className="flex flex-row items-center gap-4 border-b border-slate-200/80 px-6 py-4 dark:border-slate-700/80">
                                    <Link
                                        href={`/blog/series/${data.series}`}
                                        className="flex-1 text-xl font-bold transition-colors hover:text-blue-700 dark:hover:text-blue-300"
                                    >
                                        {data.series}
                                    </Link>

                                    <div className="text-sm text-slate-500 dark:text-slate-400">
                                        {data.numberOfPosts} post
                                        {data.numberOfPosts === 1 ? "" : "s"}
                                    </div>
                                </div>

                                <PostPreviewItem post={data.latestPost} />
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default BlogSeries;

export const getStaticProps: GetStaticProps = async () => {
    const grouped = await groupPostsBySeries();

    const seriesList: SeriesInfo[] = Object.keys(grouped)
        .sort((a, b) => a.localeCompare(b))
        .map((series) => {
            const posts = grouped[series];
            const latestPost = posts[posts.length - 1];

            return {
                series,
                numberOfPosts: posts.length,
                latestPost: {
                    slug: latestPost.slug,
                    title: latestPost.title,
                    date: latestPost.date,
                    excerptHTML: latestPost.excerptHTML,
                    excerptCode: latestPost.excerptCode,
                    tags: latestPost.tags,
                },
            };
        });

    return {
        props: {
            headTitle: `Series - idmontie's Portfolio`,
            seriesList,
        } satisfies BlogSeriesProps,
    };
};

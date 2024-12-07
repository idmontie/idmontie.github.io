import { GetStaticProps } from "next";
import Head from "next/head";
import { blog } from "modules/blog/blog.server";
import PageHeader from "modules/base/PageHeader";
import Link from "next/link";
import { Card } from "modules/base/Card";

interface TagInfo {
    tag: string;
    numberOfPosts: number;
}

export interface BlogTagsProps {
    headTitle: string;
    tags: TagInfo[];
}
function getSizeOfTag(
    tag: TagInfo,
    averageNumberOfPostsPerTag: number
): string {
    if (tag.numberOfPosts > 2 * averageNumberOfPostsPerTag)
        return "text-3xl md:col-span-2 col-span-1";
    if (tag.numberOfPosts > averageNumberOfPostsPerTag)
        return "text-2xl col-span-1";
    return "text-xl";
}

function BlogTags({ headTitle, tags }: BlogTagsProps) {
    const sum = tags.reduce((acc, tag) => acc + tag.numberOfPosts, 0);
    const averageNumberOfPostsPerTag = sum / tags.length;
    return (
        <div>
            <Head>
                <title>{headTitle}</title>
            </Head>
            <div className="px-4">
                <header>
                    <PageHeader>Tags</PageHeader>
                </header>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {tags.map((data) => {
                        return (
                            <div
                                key={data.tag}
                                className={getSizeOfTag(
                                    data,
                                    averageNumberOfPostsPerTag
                                )}
                            >
                                <Link
                                    href={`/blog/tag/${data.tag}`}
                                    className="flex"
                                >
                                    <Card>
                                        <div className="p-4">
                                            <div className="flex flex-row gap-4">
                                                <div className="flex-1">
                                                    <span className="font-bold">
                                                        {data.tag}
                                                    </span>
                                                </div>

                                                <div>
                                                    {data.numberOfPosts} post
                                                    {data.numberOfPosts === 1
                                                        ? ""
                                                        : "s"}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default BlogTags;

export const getStaticProps: GetStaticProps = async (context) => {
    const grouped = await blog.groupPostsByTags();

    const tags: TagInfo[] = Object.keys(grouped)
        .sort((a, b) => {
            const primarySort = grouped[b].length - grouped[a].length;
            if (primarySort !== 0) {
                return primarySort;
            }
            return a.localeCompare(b);
        })
        .map((tag) => {
            return {
                tag,
                numberOfPosts: grouped[tag].length,
            };
        });

    return {
        props: {
            headTitle: `Tags - idmontie's Portfolio`,
            tags,
        } as BlogTagsProps,
    };
};

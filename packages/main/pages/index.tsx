import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import type { Post } from "nextjs-blog-lib";
import { projects } from "modules/portfolio/portfolio.server";
import { ProjectPreviewItem } from "modules/portfolio/components/ProjectPreviewItem";
import { PostPreviewItem } from "modules/blog/components/PostPreviewItem";
import { blog } from "modules/blog/blog.server";
import Link from "next/link";
import {
    FeaturedPost,
    FeaturedPostProps,
    getReadingTimeMinutes,
} from "modules/blog/components/FeaturedPost";

export interface IndexProps {
    posts: FeaturedPostProps["post"][];
    projects: Post[];
}

function Index({ posts, projects }: IndexProps) {
    const featuredPost = posts[0];

    return (
        <div>
            <Head>
                <title>Welcome - idmontie&apos;s Portfolio</title>
                <meta name="description" content="Latest projects" />
            </Head>
            <div className="px-4">
                {featuredPost ? (
                    <section className="my-4">
                        <FeaturedPost post={featuredPost} />
                    </section>
                ) : null}
                <section className="my-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Latest Posts</h2>
                        <Link
                            href="/blog"
                            className="text-sm text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500"
                        >
                            View all posts →
                        </Link>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4">
                        {posts.map((post) => {
                            return (
                                <PostPreviewItem key={post.slug} post={post} />
                            );
                        })}
                    </div>
                </section>
                <section className="my-4 mt-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Latest Projects</h2>
                        <Link
                            href="/portfolio"
                            className="text-sm text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500"
                        >
                            View all projects →
                        </Link>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {projects.map((project) => {
                            return (
                                <ProjectPreviewItem
                                    key={project.slug}
                                    project={project}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Index;

export const getStaticProps: GetStaticProps = async () => {
    const projectPosts = await projects.getAllPostsByDate();
    const blogPosts = await blog.getAllPostsByDate();

    return {
        props: {
            posts: blogPosts.slice(0, 4).map((post) => ({
                slug: post.slug,
                title: post.title,
                date: post.date,
                excerptHTML: post.excerptHTML,
                excerptCode: post.excerptCode,
                tags: post.tags,
                readingTimeMinutes: getReadingTimeMinutes(post.contentRaw),
            })),
            projects: projectPosts.slice(0, 4),
        },
    };
};

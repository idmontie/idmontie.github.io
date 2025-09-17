import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import type { Post } from "nextjs-blog-lib";
import { projects } from "modules/portfolio/portfolio.server";
import PageHeader from "modules/base/PageHeader";
import { ProjectPreviewItem } from "modules/portfolio/components/ProjectPreviewItem";
import {
    PostPreviewItem,
    PostPreviewItemProps,
} from "modules/blog/components/PostPreviewItem";
import { blog } from "modules/blog/blog.server";
import { PrimaryButton } from "modules/base/PrimaryButton";
import Link from "next/link";
import { SectionHeader } from "modules/base/SectionHeader";

export interface IndexProps {
    posts: PostPreviewItemProps["post"][];
    projects: Post[];
}

function Index({ posts, projects }: IndexProps) {
    return (
        <div>
            <Head>
                <title>Welcome - idmontie&apos;s Portfolio</title>
                <meta name="description" content="Latest projects" />
            </Head>
            <div className="px-4">
                <header>
                    <PageHeader>Ivan&apos;s Portfolio</PageHeader>
                </header>

                <section className="my-4">
                    <SectionHeader>Latest Posts</SectionHeader>

                    <div className="grid grid-cols-1 gap-4">
                        {posts.map((post) => {
                            return (
                                <PostPreviewItem key={post.slug} post={post} />
                            );
                        })}
                    </div>

                    <div className="mt-4 text-center">
                        <PrimaryButton as={Link} href="/blog">
                            View All
                        </PrimaryButton>
                    </div>
                </section>
                <section className="my-4 mt-12">
                    <SectionHeader>Latest Projects</SectionHeader>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {projects.map((project) => {
                            return (
                                <ProjectPreviewItem
                                    key={project.slug}
                                    project={project}
                                />
                            );
                        })}
                    </div>

                    <div className="mt-4 text-center">
                        <PrimaryButton as={Link} href="/portfolio">
                            View All
                        </PrimaryButton>
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
            posts: blogPosts.slice(0, 3).map((post) => ({
                slug: post.slug,
                title: post.title,
                date: post.date,
                excerptHTML: post.excerptHTML,
                excerptCode: post.excerptCode,
            })),
            projects: projectPosts.slice(0, 4),
        },
    };
};

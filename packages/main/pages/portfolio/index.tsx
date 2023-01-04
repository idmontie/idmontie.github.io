import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import type { Post } from "nextjs-blog-lib";
import { projects } from "modules/portfolio/portfolio.server";
import PageHeader from "modules/base/PageHeader";
import { ProjectPreviewItem } from "modules/portfolio/components/ProjectPreviewItem";

export interface ProjectIndexProps {
    projects: Post[];
}

function ProjectIndex({ projects }: ProjectIndexProps) {
    return (
        <div>
            <Head>
                <title>Projects - idmontie&apos;s Portfolio</title>
                <meta name="description" content="Latest projects" />
            </Head>
            <div className="px-4">
                <header>
                    <PageHeader>Portfolio</PageHeader>
                </header>

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
            </div>
        </div>
    );
}

export default ProjectIndex;

export const getStaticProps: GetStaticProps = async () => {
    const projectPosts = await projects.getAllPostsByDate();

    return {
        props: {
            projects: projectPosts,
        },
    };
};

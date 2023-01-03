import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import type { Post } from "nextjs-blog-lib";
import { RenderMarkdown } from "modules/blog/components/RenderMarkdown";
import PageHeader from "modules/base/PageHeader";
import { projects } from "modules/portfolio/portfolio.server";
import { PrimaryButton } from "modules/base/PrimaryButton";
import { SecondaryButton } from "modules/base/SeconaryButton";
import { PrimaryTag } from "modules/base/PrimaryTag";
import { SecondaryTag } from "modules/base/SecondaryTag";
import { OutlineButton } from "modules/base/OutlineButton";
import Link from "next/link";

export interface ProjectSlugProps {
    headTitle: string;
    project: Post;
    next: Post | null;
    previous: Post | null;
}

function ProjectSlug({ headTitle, project, next, previous }: ProjectSlugProps) {
    const image = project.frontmatter.image as string;
    const viewLink = project.frontmatter.view_link as string | undefined;
    const githubLink = project.frontmatter.github_link as string | undefined;
    const languageTags = project.frontmatter.language_tags as
        | string[]
        | undefined;
    const frameworkTags = project.frontmatter.framework_tags as
        | string[]
        | undefined;

    return (
        <div>
            <Head>
                <title>{headTitle}</title>
                <meta name="description" content={project.excerptHTML} />
            </Head>
            <article className="px-6 md:px-0">
                <header>
                    <PageHeader>{project.title}</PageHeader>

                    <div className="mb-4 text-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image}
                            alt={project.title}
                            className="m-auto"
                        />
                    </div>

                    <div className="py-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            {project.frontmatter.description as string}
                        </p>
                    </div>

                    <div className="mb-4 space-x-4">
                        {viewLink && (
                            <PrimaryButton
                                as="a"
                                href={viewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View
                            </PrimaryButton>
                        )}
                        {githubLink && (
                            <SecondaryButton
                                as="a"
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Github
                            </SecondaryButton>
                        )}
                    </div>
                    <div className="mb-4 space-x-2">
                        {languageTags?.map((tag) => (
                            <PrimaryTag key={tag}>{tag}</PrimaryTag>
                        ))}
                        {frameworkTags?.map((tag) => (
                            <SecondaryTag key={tag}>{tag}</SecondaryTag>
                        ))}
                    </div>
                </header>
                <main className="mt-8">
                    <div className="prose dark:prose-dark">
                        <RenderMarkdown
                            html={project.contentHTML}
                            code={project.contentCode}
                        />
                    </div>
                </main>

                <footer className="mt-8">
                    <div className="flex justify-between">
                        {previous ? (
                            <OutlineButton
                                as={Link}
                                href={`/projects/${previous.slug}`}
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
                                href={`/projects/${next.slug}`}
                            >
                                {next.title}
                                <span className="ml-2">→</span>
                            </OutlineButton>
                        ) : (
                            <div />
                        )}
                    </div>
                </footer>
            </article>
        </div>
    );
}

export default ProjectSlug;

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await projects.getAllPostsByDate();

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

    const postData = await projects.getPostBySlug(slug);

    return {
        props: {
            headTitle: `${postData.post.title} - idmontie's Portfolio`,
            project: postData.post,
            next: postData.next,
            previous: postData.previous,
        } as ProjectSlugProps,
    };
};

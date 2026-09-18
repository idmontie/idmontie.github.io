import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import type { Post } from "nextjs-blog-lib";
import { RenderMarkdownWithMermaid } from "modules/blog/components/RenderMarkdownWithMermaid";
import PageHeader from "modules/base/PageHeader";
import { projects } from "modules/portfolio/portfolio.server";
import { PrimaryButton } from "modules/base/PrimaryButton";
import { SecondaryButton } from "modules/base/SeconaryButton";
import { PrimaryTag } from "modules/base/PrimaryTag";
import { SecondaryTag } from "modules/base/SecondaryTag";
import { TagList } from "modules/base/Tag";
import { ContentImage } from "modules/base/ContentImage";
import { OutlineButton } from "modules/base/OutlineButton";
import Link from "next/link";
import { projectHead } from "utilities/seo";

export interface ProjectSlugProps {
    headTitle: string;
    headDescription: string;
    project: Post;
    next: Post | null;
    previous: Post | null;
}

function ProjectSlug({
    headTitle,
    headDescription,
    project,
    next,
    previous,
}: ProjectSlugProps) {
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
                <meta
                    key="description"
                    name="description"
                    content={headDescription}
                />
            </Head>
            <article className="px-6 md:px-0">
                <header>
                    <PageHeader>{project.title}</PageHeader>

                    <div className="mb-4 text-center">
                        <div className="relative m-auto w-full md:w-1/2">
                            <div className="absolute inset-0 z-0" aria-hidden>
                                <ContentImage
                                    src={image}
                                    alt=""
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-contain opacity-80 blur-xl"
                                />
                            </div>
                            <ContentImage
                                src={image}
                                alt={project.title}
                                width={800}
                                height={600}
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="relative z-10 m-auto h-auto w-full"
                            />
                        </div>
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
                    <TagList className="mb-4">
                        {languageTags?.map((tag) => (
                            <PrimaryTag key={tag}>{tag}</PrimaryTag>
                        ))}
                        {frameworkTags?.map((tag) => (
                            <SecondaryTag key={tag}>{tag}</SecondaryTag>
                        ))}
                    </TagList>
                </header>
                <main className="mt-8">
                    <div className="prose dark:prose-dark">
                        <RenderMarkdownWithMermaid
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
    const { title, description } = projectHead(postData.post);

    return {
        props: {
            headTitle: title,
            headDescription: description,
            project: postData.post,
            next: postData.next,
            previous: postData.previous,
        } as ProjectSlugProps,
    };
};

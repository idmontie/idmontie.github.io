import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import type { Post } from "nextjs-blog-lib";
import { useClientSideValue } from "modules/utilities/useClientSideValue";
import { RenderMarkdown } from "modules/blog/components/RenderMarkdown";
import { blog } from "modules/blog/blog.server";
import PageHeader from "modules/base/PageHeader";
import { OutlineButton } from "modules/base/OutlineButton";

export interface BlogSlugProps {
    headTitle: string;
    headKeywords: string;
    post: Post;
    previous: {
        slug: string;
        title: string;
    } | null;
    next: {
        slug: string;
        title: string;
    } | null;
}

// TODO use next/config to get the site url
const SITE_URL = "https://idmontie.github.io";

function BlogSlug({
    headTitle,
    headKeywords,
    post,
    previous,
    next,
}: BlogSlugProps) {
    const imagePartialPath = post.frontmatter.image as string | undefined;
    const imageUrl = imagePartialPath
        ? `${SITE_URL}/media/${post.slug}/${imagePartialPath}`
        : undefined;

    const clientSideDate = useClientSideValue(() => {
        return new Date(post.date).toLocaleDateString();
    });

    return (
        <div>
            <Head>
                <title>{headTitle}</title>
                <meta name="description" content={post.excerptRaw} />
                {/* Add tags as meta keywords */}
                <meta name="keywords" content={headKeywords} />

                <meta property="og:title" content={headTitle} />
                <meta property="og:description" content={post.excerptRaw} />
                {imageUrl && <meta property="og:image" content={imageUrl} />}
                <meta
                    property="og:url"
                    content={`${SITE_URL}/blog/post/${post.slug}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="idmontie's Portfolio" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:article:author" content="idmontie" />
                <meta
                    property="og:article:published_time"
                    content={post.date}
                />
                <meta
                    property="og:article:tag"
                    content={post.tags.join(", ")}
                />
                <meta property="og:article:section" content="Blog" />
            </Head>
            <article className="px-6 md:px-6">
                <header>
                    <PageHeader viewTransitionName={`${post.slug}-title`}>
                        {post.title}
                    </PageHeader>

                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap">
                            {post.tags.map((tag) => {
                                return (
                                    <Link
                                        className="mr-2 mb-2 rounded-md bg-gray-100 px-2 py-1 text-sm capitalize dark:bg-gray-800"
                                        key={tag}
                                        href={`/blog/tag/${tag}`}
                                    >
                                        {tag}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                    <div className="mb-6 text-sm">Posted: {clientSideDate}</div>
                </header>
                <main>
                    <div className="prose dark:prose-dark">
                        <RenderMarkdown
                            html={post.contentHTML}
                            code={post.contentCode}
                        />
                    </div>
                    <footer className="mt-8">
                        <div className="flex justify-between">
                            {previous ? (
                                <OutlineButton
                                    as={Link}
                                    href={`/blog/post/${previous.slug}`}
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
                                    href={`/blog/post/${next.slug}`}
                                >
                                    {next.title}
                                    <span className="ml-2">→</span>
                                </OutlineButton>
                            ) : (
                                <div />
                            )}
                        </div>
                    </footer>
                </main>
            </article>
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
            headTitle: `${postData.post.title} - idmontie's Portfolio`,
            // Generate on the server to avoid template string interpolation
            headKeywords: postData.post.tags.join(", "),
            post: postData.post,
            previous: postData.previous
                ? {
                      slug: postData.previous.slug,
                      title: postData.previous.title,
                  }
                : null,
            next: postData.next
                ? {
                      slug: postData.next.slug,
                      title: postData.next.title,
                  }
                : null,
        } satisfies BlogSlugProps,
    };
};

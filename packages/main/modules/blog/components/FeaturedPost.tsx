import Link from "next/link";
import { PrimaryTag } from "modules/base/PrimaryTag";
import { TagList } from "modules/base/Tag";
import { ClockIcon, FeaturedIllustration } from "./icons";
import { RenderMarkdown } from "./RenderMarkdown";
import { PrimaryButton } from "modules/base/PrimaryButton";

const WORDS_PER_MINUTE = 200;

export function getReadingTimeMinutes(content: string): number {
    const words = content.trim().split(/\s+/u).filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export interface FeaturedPostProps {
    post: {
        slug: string;
        title: string;
        date: string;
        excerptHTML: string;
        excerptCode: string;
        tags: string[];
        readingTimeMinutes: number;
    };
}

export function FeaturedPost({ post }: FeaturedPostProps) {
    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#0B1120] dark:shadow-none sm:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
                <div className="flex min-w-0 flex-1 flex-col">
                    <span className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:bg-slate-800 dark:text-slate-200">
                        Featured Article
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        <Link
                            href={`/blog/post/${post.slug}`}
                            className="transition-colors hover:text-indigo-700 dark:hover:text-indigo-200"
                        >
                            {post.title}
                        </Link>
                    </h2>

                    <div className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 [&_p]:m-0">
                        <RenderMarkdown
                            html={post.excerptHTML}
                            code={post.excerptCode}
                        />
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-700/60 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                            <ClockIcon />
                            {`${post.readingTimeMinutes} min read`}
                        </span>
                        {post.tags.length > 0 ? (
                            <TagList>
                                {post.tags.map((tag) => (
                                    <PrimaryTag key={tag}>{tag}</PrimaryTag>
                                ))}
                            </TagList>
                        ) : null}
                    </div>

                    <div className="mt-8">
                        <PrimaryButton
                            as={Link}
                            href={`/blog/post/${post.slug}`}
                        >
                            Read the article
                            <span aria-hidden="true"> →</span>
                        </PrimaryButton>
                    </div>
                </div>

                <div className="mx-auto hidden w-full max-w-xs shrink-0 sm:max-w-sm md:block lg:w-[40%] lg:max-w-none">
                    <FeaturedIllustration />
                </div>
            </div>
        </article>
    );
}

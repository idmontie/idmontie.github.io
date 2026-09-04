import { useClientSideValue } from "modules/utilities/useClientSideValue";
import Link from "next/link";
import { PrimaryTag } from "modules/base/PrimaryTag";
import { TagList } from "modules/base/Tag";
import { DocumentIcon } from "./icons";
import { RenderMarkdown } from "./RenderMarkdown";

export interface PostPreviewItemProps {
    post: {
        slug: string;
        title: string;
        date: string;
        excerptHTML: string;
        excerptCode: string;
        tags: string[];
    };
}

export function PostPreviewItem({ post }: PostPreviewItemProps) {
    const clientSideDate = useClientSideValue(() => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(post.date));
    });

    return (
        <article>
            <Link
                href={`/blog/post/${post.slug}`}
                className="group grid gap-5 px-6 py-6 transition-colors hover:bg-slate-200/20 dark:hover:bg-slate-800/20 sm:grid-cols-[80px_minmax(0,1fr)] lg:grid-cols-[88px_minmax(0,1fr)_120px]"
            >
                <div className="size-20 lg:size-[88px] flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-blue-400 dark:border-slate-800 dark:bg-slate-900/70 dark:text-blue-400">
                    <DocumentIcon />
                </div>

                <div className="min-w-0">
                    <h3 className="text-slate-950 text-lg font-semibold transition-colors group-hover:text-slate-800 dark:text-slate-100 dark:group-hover:text-white">
                        {post.title}
                    </h3>

                    <div className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-800 dark:text-slate-400">
                        <RenderMarkdown
                            html={post.excerptHTML}
                            code={post.excerptCode}
                        />
                    </div>

                    {post.tags.length > 0 ? (
                        <TagList className="mt-3">
                            {post.tags.map((tag) => (
                                <PrimaryTag key={tag}>{tag}</PrimaryTag>
                            ))}
                        </TagList>
                    ) : null}
                </div>
                <time
                    dateTime={post.date}
                    className="text-sm text-slate-500 sm:col-start-2 lg:col-start-3 lg:text-right"
                >
                    {clientSideDate}
                </time>
            </Link>
        </article>
    );
}

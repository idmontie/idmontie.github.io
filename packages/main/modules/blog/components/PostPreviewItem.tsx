import { Card } from "modules/base/Card";
import { useClientSideValue } from "modules/utilities/useClientSideValue";
import Link from "next/link";
import { Post } from "nextjs-blog-lib";
import { RenderMarkdown } from "./RenderMarkdown";

export interface PostPreviewItemProps {
    post: Post;
}

export function PostPreviewItem({ post }: PostPreviewItemProps) {
    const clientSideDate = useClientSideValue(() => {
        return new Date(post.date).toLocaleDateString();
    });

    return (
        <Card>
            <div className="p-4">
                <Link href={`/blog/post/${post.slug}`}>
                    <h2 className="text-xl font-bold">{post.title}</h2>
                </Link>
                <div className="py-2 text-sm">{clientSideDate}</div>
                <div className="prose dark:prose-dark py-4">
                    <RenderMarkdown
                        html={post.excerptHTML}
                        code={post.excerptCode}
                    />
                </div>
                <div className="pt-2">
                    <Link href={`/blog/post/${post.slug}`}>
                        Continue reading<span className="ml-2">→</span>
                    </Link>
                </div>
            </div>
        </Card>
    );
}

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
        <div>
            <div>{post.title}</div>
            <div>{clientSideDate}</div>
            <div>
                <RenderMarkdown
                    html={post.excerptHTML}
                    code={post.excerptCode}
                />
            </div>
            <Link href={`/blog/post/${post.slug}`}>Continue reading</Link>
        </div>
    );
}

import { Card } from "modules/base/Card";
import { ContentImage } from "modules/base/ContentImage";
import Link from "next/link";
import type { Post } from "nextjs-blog-lib";

export interface ProjectPreviewItemProps {
    project: Post;
}

export function ProjectPreviewItem({ project }: ProjectPreviewItemProps) {
    return (
        <Card>
            <div className="px-6 py-4">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                    <Link href={`/projects/${project.slug}`}>
                        <span
                            style={{
                                viewTransitionName: `${project.slug}-title`,
                            }}
                        >
                            {project.title}
                        </span>
                    </Link>
                </h4>
            </div>
            <Link href={`/projects/${project.slug}`}>
                <div className="relative ml-[-1%] aspect-[5/1] w-[102%] bg-slate-100 shadow-md dark:bg-slate-800">
                    <ContentImage
                        src={project.frontmatter.image as string}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain object-center"
                    />
                </div>
            </Link>
            <div className="px-6 py-4">
                <p className="text-gray-700 dark:text-gray-300">
                    {project.frontmatter.description as string}
                </p>
            </div>
        </Card>
    );
}

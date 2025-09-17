import { Card } from "modules/base/Card";
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
                <div
                    className="ml-[-1%] w-[102%] bg-slate-100 bg-contain bg-center bg-no-repeat pb-[20vw] shadow-md dark:bg-slate-800"
                    style={{
                        backgroundImage: `url('${
                            project.frontmatter.image as string
                        }')`,
                    }}
                ></div>
            </Link>
            <div className="px-6 py-4">
                <p className="text-gray-700 dark:text-gray-300">
                    {project.frontmatter.description as string}
                </p>
            </div>
        </Card>
    );
}

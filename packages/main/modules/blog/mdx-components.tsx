import { CardLink } from "modules/base/Card";
import { ContentImageResponsive } from "modules/base/ContentImage";
import { ComponentProps } from "react";

/** MDX component map shared by server compile and client preview (no Mermaid). */
export const mdxComponentsBase = {
    Separator: () => {
        return (
            <div className="flex w-full items-center justify-center gap-2 py-4">
                <div className="!m-0 h-1 w-1 rounded-full bg-gray-300" />
                <div className="!m-0 h-1 w-1 rounded-full bg-gray-300" />
                <div className="!m-0 h-1 w-1 rounded-full bg-gray-300" />
            </div>
        );
    },
    blockquote: ({ children }: { children: React.ReactNode }) => {
        return (
            <blockquote className="border-l-4 border-gray-300 pl-4">
                {children}
            </blockquote>
        );
    },
    img: ({
        src,
        alt,
        width,
        height,
        ...props
    }: {
        alt?: string;
        src: string;
        width?: number | string;
        height?: number | string;
    }) => {
        return (
            <ContentImageResponsive
                alt={alt ?? ""}
                src={src}
                width={width != null ? Number(width) : undefined}
                height={height != null ? Number(height) : undefined}
                {...props}
            />
        );
    },
    code: (props: ComponentProps<"code">) => {
        return <code {...props} />;
    },
    pre: (props: ComponentProps<"pre">) => {
        return (
            <div className="overflow-auto rounded-2xl bg-[#0e005d6d] p-4 font-mono text-sm dark:bg-[#0e005d6d] dark:text-gray-100">
                <pre {...props} />
            </div>
        );
    },
    DownloadCard: (
        props: ComponentProps<"div"> & {
            href: string;
            title: string;
            description?: string;
        }
    ) => {
        return (
            <CardLink href={props.href}>
                <div className="p-6">
                    <h4 className="!m-0 !p-0 !text-base font-bold !no-underline">
                        {props.title}
                    </h4>
                    {props.description && (
                        <p className="text-sm text-gray-500 !no-underline">
                            {props.description}
                        </p>
                    )}
                </div>
            </CardLink>
        );
    },
};

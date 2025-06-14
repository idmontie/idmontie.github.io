import { Mermaid, MermaidProps } from "mdx-mermaid/lib/Mermaid";
import { CardLink } from "modules/base/Card";
import { ComponentProps } from "react";

export const components = {
    blockquote: ({ children }: { children: React.ReactNode }) => {
        return (
            <blockquote className="border-l-4 border-gray-300 pl-4">
                {children}
            </blockquote>
        );
    },
    img: ({ src, alt, ...props }: { alt?: string; src: string }) => {
        return (
            <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt={alt ?? ""}
                    src={src}
                    {...props}
                    style={{
                        maxHeight: 500,
                        margin: "auto",
                        textAlign: "center",
                    }}
                />
            </>
        );
    },
    code: (props: ComponentProps<"code">) => {
        return <code {...props} />;
    },
    pre: (props: ComponentProps<"pre">) => {
        return (
            <div className="overflow-auto rounded bg-gray-200 p-4 font-mono text-sm dark:bg-gray-800 dark:text-gray-100">
                <pre {...props} />
            </div>
        );
    },
    Mermaid: (props: MermaidProps) => {
        return (
            <div className="py-8 [&_svg]:m-auto">
                <Mermaid {...props} />
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
        /**
         * Create a nice clickable card to download a file.
         */
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

export const PAGE_SIZE = 10;

import { Mermaid, MermaidProps } from "mdx-mermaid/lib/Mermaid";
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
            <div className="overflow-auto rounded bg-gray-200 p-2 font-mono text-sm dark:bg-gray-800 dark:text-gray-100">
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
};

export const PAGE_SIZE = 10;

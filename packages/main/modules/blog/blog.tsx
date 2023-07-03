import { Mermaid, MermaidProps } from "mdx-mermaid/lib/Mermaid";
import { ComponentProps } from "react";

export const components = {
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
    pre: (props: ComponentProps<"pre">) => {
        return (
            <div className="overflow-auto">
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

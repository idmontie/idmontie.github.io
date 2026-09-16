import { run, RunOptions } from "@mdx-js/mdx";
import { useEffect, useMemo, useState } from "react";
import * as runtime from "react/jsx-runtime";
import type { MermaidProps } from "mdx-mermaid/lib/Mermaid";
import { mdxComponentsBase } from "../mdx-components";
import { MermaidDiagram } from "./MermaidDiagram";
import type { MdxRenderType, RenderMarkdownProps } from "./RenderMarkdown";

export function RenderMarkdownWithMermaid({ html, code }: RenderMarkdownProps) {
    const [MdxComponent, setMdxComponent] = useState<MdxRenderType | null>(
        null
    );

    const mdxComponents = useMemo(
        () => ({
            ...mdxComponentsBase,
            Mermaid: MermaidDiagram as React.ComponentType<MermaidProps>,
        }),
        []
    );

    useEffect(() => {
        void (async () => {
            const { default: Jsx } = await run(code, {
                ...runtime,
            } as RunOptions);
            setMdxComponent(() => Jsx as MdxRenderType);
        })();
    }, [code]);

    return (
        <div>
            {MdxComponent ? (
                <MdxComponent components={mdxComponents} />
            ) : (
                <div dangerouslySetInnerHTML={{ __html: html }} />
            )}
        </div>
    );
}

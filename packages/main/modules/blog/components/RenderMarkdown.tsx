import { run } from "@mdx-js/mdx";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { components } from "../blog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MdxRenderType = React.FC<{ components: Record<string, any> }>;

export interface RenderMarkdownProps {
    html: string;
    code: string;
}

export function RenderMarkdown({ html, code }: RenderMarkdownProps) {
    const [MdxComponent, setMdxComponent] = useState<MdxRenderType | null>(
        null
    );
    useEffect(() => {
        void (async () => {
            const { default: Jsx } = await run(code, {
                ...runtime,
                scope: {},
            });
            setMdxComponent(() => Jsx as MdxRenderType);
        })();
    }, [code]);

    return (
        <div>
            {MdxComponent ? (
                <MdxComponent components={components} />
            ) : (
                <div dangerouslySetInnerHTML={{ __html: html }} />
            )}
        </div>
    );
}

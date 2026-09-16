import { Mermaid, MermaidProps } from "mdx-mermaid/lib/Mermaid";

import { mdxComponentsBase } from "./mdx-components";

export const components = {
    ...mdxComponentsBase,
    Mermaid: (props: MermaidProps) => {
        return (
            <div className="py-8 [&_svg]:m-auto">
                <Mermaid {...props} />
            </div>
        );
    },
};

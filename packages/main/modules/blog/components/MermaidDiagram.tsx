import { useEffect, useState } from "react";
import type { MermaidProps } from "mdx-mermaid/lib/Mermaid";

/** Loads mermaid only when a post actually renders a diagram (separate async chunk). */
export function MermaidDiagram(props: MermaidProps) {
    const [Mermaid, setMermaid] =
        useState<React.ComponentType<MermaidProps> | null>(null);

    useEffect(() => {
        void import("mdx-mermaid/lib/Mermaid").then((mod) => {
            setMermaid(() => mod.Mermaid);
        });
    }, []);

    if (!Mermaid) {
        return null;
    }

    return (
        <div className="py-8 [&_svg]:m-auto">
            <Mermaid {...props} />
        </div>
    );
}

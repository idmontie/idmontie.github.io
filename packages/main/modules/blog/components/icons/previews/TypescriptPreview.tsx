import { PreviewChrome } from "./PreviewChrome";

export function TypescriptPreview() {
    return (
        <PreviewChrome>
            {(id) => (
                <>
                    <rect
                        x="24"
                        y="24"
                        width="72"
                        height="72"
                        rx="14"
                        fill={`url(#${id}-top)`}
                        className="stroke-indigo-300/80 dark:stroke-fuchsia-200/40"
                        strokeWidth="1.2"
                    />
                    <text
                        x="84"
                        y="82"
                        textAnchor="end"
                        className="fill-white"
                        fontSize="28"
                        fontWeight="700"
                        fontFamily="ui-sans-serif, system-ui, sans-serif"
                    >
                        TS
                    </text>
                </>
            )}
        </PreviewChrome>
    );
}

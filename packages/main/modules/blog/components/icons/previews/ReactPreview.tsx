import { PreviewChrome } from "./PreviewChrome";

export function ReactPreview() {
    return (
        <PreviewChrome>
            {(id) => (
                <>
                    <ellipse
                        cx="60"
                        cy="60"
                        rx="38"
                        ry="15"
                        className="stroke-indigo-400 dark:stroke-indigo-300"
                        fill="none"
                        strokeWidth="2"
                    />
                    <ellipse
                        cx="60"
                        cy="60"
                        rx="38"
                        ry="15"
                        transform="rotate(60 60 60)"
                        className="stroke-indigo-400 dark:stroke-indigo-300"
                        fill="none"
                        strokeWidth="2"
                    />
                    <ellipse
                        cx="60"
                        cy="60"
                        rx="38"
                        ry="15"
                        transform="rotate(120 60 60)"
                        className="stroke-indigo-400 dark:stroke-indigo-300"
                        fill="none"
                        strokeWidth="2"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="7"
                        fill={`url(#${id}-core)`}
                        className="stroke-indigo-200/80 dark:stroke-sky-200/60"
                        strokeWidth="1"
                    />
                </>
            )}
        </PreviewChrome>
    );
}

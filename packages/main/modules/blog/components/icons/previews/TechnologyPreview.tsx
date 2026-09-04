import { PreviewChrome } from "./PreviewChrome";

export function TechnologyPreview() {
    return (
        <PreviewChrome>
            {(id) => (
                <>
                    <rect
                        x="20"
                        y="20"
                        width="80"
                        height="58"
                        rx="8"
                        fill={`url(#${id}-left)`}
                        className="stroke-indigo-400/80 dark:stroke-indigo-300/60"
                        strokeWidth="1.3"
                    />
                    <rect
                        x="26"
                        y="26"
                        width="68"
                        height="46"
                        rx="4"
                        fill={`url(#${id}-top)`}
                    />
                    <path
                        d="M34 36h24M34 44h36M34 52h18"
                        className="stroke-white/70 dark:stroke-indigo-100/50"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <rect
                        x="56"
                        y="78"
                        width="8"
                        height="10"
                        fill={`url(#${id}-right)`}
                        className="stroke-indigo-400/70 dark:stroke-indigo-300/50"
                        strokeWidth="0.9"
                    />
                    <path
                        d="M36 96h48"
                        className="stroke-indigo-400 dark:stroke-indigo-300"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                </>
            )}
        </PreviewChrome>
    );
}

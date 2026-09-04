import { PreviewChrome } from "./PreviewChrome";

export function ProgrammingPreview() {
    return (
        <PreviewChrome>
            {(id) => (
                <>
                    <rect
                        x="16"
                        y="22"
                        width="88"
                        height="76"
                        rx="10"
                        fill={`url(#${id}-left)`}
                        className="dark:stroke-indigo-300/55 stroke-indigo-400/80"
                        strokeWidth="1.3"
                    />
                    <rect
                        x="16"
                        y="22"
                        width="88"
                        height="16"
                        rx="10"
                        fill={`url(#${id}-top)`}
                    />
                    <rect
                        x="16"
                        y="30"
                        width="88"
                        height="8"
                        fill={`url(#${id}-top)`}
                    />
                    <circle cx="26" cy="30" r="2.4" className="fill-white/80" />
                    <circle cx="34" cy="30" r="2.4" className="fill-white/55" />
                    <circle cx="42" cy="30" r="2.4" className="fill-white/35" />
                    <path
                        d="M46 50h46M46 60h34M46 70h40M46 80h22"
                        className="dark:stroke-indigo-200/55 stroke-indigo-300/90"
                        fill="none"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M24 50h8M24 62h8M24 74h8"
                        className="stroke-indigo-400/70 dark:stroke-indigo-300/50"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </>
            )}
        </PreviewChrome>
    );
}

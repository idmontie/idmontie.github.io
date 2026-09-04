import { useId } from "react";

export function MathematicsPreview() {
    const id = useId().replaceAll(":", "");

    return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
            <defs>
                <linearGradient
                    id={`${id}-top`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        className="[stop-color:#c084fc] dark:[stop-color:#e879f9]"
                    />
                    <stop
                        offset="100%"
                        className="[stop-color:#4f46e5] dark:[stop-color:#4338ca]"
                    />
                </linearGradient>
                <linearGradient
                    id={`${id}-left`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        className="[stop-color:#c7d2fe] dark:[stop-color:#1e1b4b]"
                        stopOpacity="0.55"
                    />
                    <stop
                        offset="100%"
                        className="[stop-color:#818cf8] dark:[stop-color:#312e81]"
                        stopOpacity="0.28"
                    />
                </linearGradient>
                <linearGradient
                    id={`${id}-right`}
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        className="[stop-color:#a5b4fc] dark:[stop-color:#312e81]"
                        stopOpacity="0.45"
                    />
                    <stop
                        offset="100%"
                        className="[stop-color:#6366f1] dark:[stop-color:#1e1b4b]"
                        stopOpacity="0.22"
                    />
                </linearGradient>
                <radialGradient id={`${id}-core`} cx="50%" cy="45%" r="50%">
                    <stop
                        offset="0%"
                        className="[stop-color:#818cf8] dark:[stop-color:#93c5fd]"
                        stopOpacity="0.9"
                    />
                    <stop
                        offset="100%"
                        className="[stop-color:#6366f1] dark:[stop-color:#4338ca]"
                        stopOpacity="0.15"
                    />
                </radialGradient>
            </defs>

            <g
                transform="translate(0 -9)"
                className="dark:[filter:drop-shadow(0_0_12px_rgba(167,139,250,0.35))]"
            >
                <path
                    d="M32 54 L60 70 L60 100 L32 84 Z"
                    fill={`url(#${id}-left)`}
                    className="stroke-indigo-400/70 dark:stroke-indigo-300/50"
                    strokeWidth="1.1"
                />
                <path
                    d="M88 54 L60 70 L60 100 L88 84 Z"
                    fill={`url(#${id}-right)`}
                    className="stroke-indigo-400/70 dark:stroke-indigo-300/50"
                    strokeWidth="1.1"
                />
                <path
                    d="M60 38 L88 54 L60 70 L32 54 Z"
                    fill={`url(#${id}-top)`}
                    className="stroke-indigo-300/80 dark:stroke-fuchsia-200/40"
                    strokeWidth="1.15"
                />

                <path
                    d="M60 56 L72 63 L60 70 L48 63 Z"
                    fill={`url(#${id}-core)`}
                    className="stroke-indigo-300/80 dark:stroke-sky-200/50"
                    strokeWidth="0.9"
                />
                <path
                    d="M48 63 L60 70 L60 82 L48 75 Z"
                    className="dark:fill-indigo-400/15 dark:stroke-indigo-200/35 fill-indigo-400/20 stroke-indigo-400/50"
                    strokeWidth="0.8"
                />
                <path
                    d="M72 63 L60 70 L60 82 L72 75 Z"
                    className="dark:stroke-indigo-200/35 fill-indigo-500/15 stroke-indigo-400/50 dark:fill-indigo-300/10"
                    strokeWidth="0.8"
                />
            </g>
        </svg>
    );
}

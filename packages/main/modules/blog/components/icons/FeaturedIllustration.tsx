import { useId } from "react";

function Pane({
    transform,
    gradientId,
    opacity = 1,
}: {
    transform: string;
    gradientId: string;
    opacity?: number;
}) {
    return (
        <g transform={transform} opacity={opacity}>
            <rect
                width="176"
                height="104"
                rx="14"
                fill={`url(#${gradientId})`}
                className="stroke-indigo-400/80 dark:stroke-indigo-300/70"
                strokeWidth="1.4"
            />
            <circle
                cx="18"
                cy="18"
                r="3.4"
                className="fill-indigo-400 dark:fill-indigo-300"
            />
            <circle
                cx="30"
                cy="18"
                r="3.4"
                className="fill-indigo-400/70 dark:fill-indigo-300/70"
            />
            <circle
                cx="42"
                cy="18"
                r="3.4"
                className="fill-indigo-400/45 dark:fill-indigo-300/45"
            />
            <rect
                x="58"
                y="14"
                width="96"
                height="8"
                rx="4"
                className="fill-indigo-400/35 dark:fill-indigo-200/25"
            />
            <rect
                x="14"
                y="36"
                width="70"
                height="8"
                rx="4"
                className="fill-indigo-500/35 dark:fill-indigo-200/30"
            />
            <rect
                x="14"
                y="50"
                width="112"
                height="6"
                rx="3"
                className="dark:fill-indigo-200/18 fill-indigo-400/25"
            />
            <rect
                x="14"
                y="62"
                width="88"
                height="6"
                rx="3"
                className="dark:fill-indigo-200/14 fill-indigo-400/20"
            />
            <rect
                x="14"
                y="76"
                width="42"
                height="16"
                rx="5"
                className="dark:fill-indigo-400/35 fill-indigo-500/40"
            />
            <rect
                x="64"
                y="76"
                width="28"
                height="16"
                rx="5"
                className="fill-indigo-400/25 dark:fill-indigo-300/20"
            />
            <rect
                x="132"
                y="40"
                width="30"
                height="30"
                rx="8"
                className="stroke-indigo-400/70 dark:stroke-indigo-300/60"
                fill="none"
                strokeWidth="1.3"
            />
            <path
                d="M141 55h12M147 49v12"
                className="stroke-indigo-400 dark:stroke-indigo-200/80"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
        </g>
    );
}

export function FeaturedIllustration() {
    const rawId = useId();
    const id = rawId.replaceAll(":", "");

    return (
        <svg viewBox="0 0 360 300" className="h-auto w-full" aria-hidden="true">
            <defs>
                <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
                    <stop
                        offset="0%"
                        className="[stop-color:#818cf8] dark:[stop-color:#6366f1]"
                        stopOpacity="0.45"
                    />
                    <stop
                        offset="100%"
                        className="[stop-color:#818cf8] dark:[stop-color:#312e81]"
                        stopOpacity="0"
                    />
                </radialGradient>
                <linearGradient
                    id={`${id}-pane`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        className="[stop-color:#eef2ff] dark:[stop-color:#1e1b4b]"
                        stopOpacity="0.95"
                    />
                    <stop
                        offset="100%"
                        className="[stop-color:#c7d2fe] dark:[stop-color:#0f172a]"
                        stopOpacity="0.72"
                    />
                </linearGradient>
            </defs>

            <ellipse
                cx="190"
                cy="158"
                rx="140"
                ry="96"
                fill={`url(#${id}-glow)`}
            />

            <g
                className="stroke-indigo-400/70 dark:stroke-indigo-300/50"
                fill="none"
                strokeWidth="1.2"
                strokeDasharray="2.5 3.5"
            >
                <path d="M118 92 C96 120 90 150 112 188" />
                <path d="M248 78 C268 112 274 150 246 196" />
                <path d="M168 70 C176 110 182 148 176 206" />
            </g>

            <g className="fill-indigo-400 dark:fill-indigo-300/80">
                <circle cx="118" cy="92" r="3.2" />
                <circle cx="112" cy="188" r="3.2" />
                <circle cx="248" cy="78" r="3.2" />
                <circle cx="246" cy="196" r="3.2" />
                <circle cx="176" cy="206" r="3.2" />
            </g>

            <g className="origin-center [filter:none] dark:[filter:drop-shadow(0_0_18px_rgba(99,102,241,0.28))]">
                <Pane
                    gradientId={`${id}-pane`}
                    transform="translate(42 148) skewX(-18) skewY(-6)"
                    opacity={0.72}
                />
                <Pane
                    gradientId={`${id}-pane`}
                    transform="translate(78 94) skewX(-18) skewY(-6)"
                    opacity={0.86}
                />
                <Pane
                    gradientId={`${id}-pane`}
                    transform="translate(114 40) skewX(-18) skewY(-6)"
                />
            </g>
        </svg>
    );
}

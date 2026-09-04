import { ReactNode, useId } from "react";

export function PreviewChrome({
    children,
}: {
    children: (id: string) => ReactNode;
}) {
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
            <g className="dark:[filter:drop-shadow(0_0_12px_rgba(167,139,250,0.35))]">
                {children(id)}
            </g>
        </svg>
    );
}

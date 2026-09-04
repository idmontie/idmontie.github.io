import { PreviewChrome } from "./PreviewChrome";

export function AiPreview() {
    return (
        <PreviewChrome>
            {(id) => (
                <>
                    <path
                        d="M44 22v10M60 20v12M76 22v10M44 88v10M60 88v12M76 88v10M22 44h10M20 60h12M22 76h10M88 44h10M88 60h12M88 76h10"
                        className="stroke-indigo-400 dark:stroke-indigo-300/70"
                        fill="none"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                    />
                    <rect
                        x="32"
                        y="32"
                        width="56"
                        height="56"
                        rx="8"
                        fill={`url(#${id}-left)`}
                        className="dark:stroke-indigo-300/55 stroke-indigo-400/80"
                        strokeWidth="1.4"
                    />
                    <rect
                        x="42"
                        y="42"
                        width="36"
                        height="36"
                        rx="5"
                        fill={`url(#${id}-top)`}
                        className="stroke-indigo-200/50 dark:stroke-fuchsia-200/30"
                        strokeWidth="1"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="8"
                        fill={`url(#${id}-core)`}
                        className="stroke-indigo-100/70 dark:stroke-sky-200/50"
                        strokeWidth="1"
                    />
                    <path
                        d="M48 48h8M64 48h8M48 72h8M64 72h8"
                        className="stroke-white/50 dark:stroke-indigo-100/40"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                    />
                </>
            )}
        </PreviewChrome>
    );
}

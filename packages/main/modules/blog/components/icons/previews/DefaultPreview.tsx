import { PreviewChrome } from "./PreviewChrome";

export function DefaultPreview() {
    return (
        <PreviewChrome>
            {(id) => (
                <>
                    <rect
                        x="24"
                        y="28"
                        width="72"
                        height="8"
                        rx="4"
                        fill={`url(#${id}-top)`}
                    />
                    <rect
                        x="24"
                        y="48"
                        width="64"
                        height="6"
                        rx="3"
                        fill={`url(#${id}-core)`}
                    />
                    <rect
                        x="24"
                        y="62"
                        width="70"
                        height="6"
                        rx="3"
                        fill={`url(#${id}-core)`}
                    />
                    <rect
                        x="24"
                        y="76"
                        width="52"
                        height="6"
                        rx="3"
                        fill={`url(#${id}-core)`}
                    />
                    <rect
                        x="24"
                        y="90"
                        width="40"
                        height="6"
                        rx="3"
                        fill={`url(#${id}-core)`}
                    />
                </>
            )}
        </PreviewChrome>
    );
}

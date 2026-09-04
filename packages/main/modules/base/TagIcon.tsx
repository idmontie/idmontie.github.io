export function TagIcon({
    className = "h-3.5 w-3.5 shrink-0",
}: {
    className?: string;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className={className}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12.75 12 4.5h7.5V12L11.25 20.25a1.5 1.5 0 0 1-2.12 0L3.75 14.87a1.5 1.5 0 0 1 0-2.12Z"
            />
            <circle cx="16.25" cy="8.25" r="1.15" fill="currentColor" />
        </svg>
    );
}

import { ReactNode } from "react";

import { ErrorBoundary } from "../bugsnag";

function FullScreenError() {
    return (
        <div>
            <h1>Oops, there is an error!</h1>
        </div>
    );
}

export interface InlineErrorProps {
    onRetry?: () => void;
}

function InlineError({ onRetry }: InlineErrorProps) {
    return (
        <div>
            <h1>Oops, there is an error!</h1>
            <button onClick={onRetry}>Retry</button>
        </div>
    );
}

export interface ErrorBoundaryProps {
    children: ReactNode;
}

export function FullScreenErrorBoundary({ children }: ErrorBoundaryProps) {
    return (
        <ErrorBoundary FallbackComponent={FullScreenError}>
            {children}
        </ErrorBoundary>
    );
}

export function InlineErrorBoundary({
    children,
    onRetry,
}: ErrorBoundaryProps & InlineErrorProps) {
    return (
        <ErrorBoundary
            FallbackComponent={() => <InlineError onRetry={onRetry} />}
        >
            {children}
        </ErrorBoundary>
    );
}

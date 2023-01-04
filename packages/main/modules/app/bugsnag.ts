import * as React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact, {
    BugsnagErrorBoundary,
} from "@bugsnag/plugin-react";

const shouldReport =
    process.env.NODE_ENV === "production" && typeof window !== "undefined";

if (shouldReport) {
    Bugsnag.start({
        apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY ?? "",
        plugins: [new BugsnagPluginReact()],
    });
}

export function onError(error: Error) {
    if (shouldReport) {
        Bugsnag.notify(error);
    }
}

const PassthroughErrorBoundary: BugsnagErrorBoundary = ({
    children,
}: {
    children: React.ReactElement;
}) => children;

const ErrorBoundary: BugsnagErrorBoundary = shouldReport
    ? Bugsnag.getPlugin?.("react")?.createErrorBoundary(React) ??
      PassthroughErrorBoundary
    : PassthroughErrorBoundary;

export { ErrorBoundary };

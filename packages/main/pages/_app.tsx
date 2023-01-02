import { Hydrate } from "@tanstack/react-query";
import { AppProviders } from "modules/app/components/AppProviders";
import { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics, event } from "nextjs-google-analytics";
import { FullScreenErrorBoundary } from "modules/app/components/ErrorBoundary";
import "./styles.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function reportWebVitals({
    id,
    name,
    label,
    value,
}: {
    id: string;
    name: string;
    label: string;
    value: number;
}) {
    event(name, {
        category:
            label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
        value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
        label: id, // id unique to current page load
        nonInteraction: true, // avoids affecting bounce rate.
        gaMeasurementId,
    });
}

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <FullScreenErrorBoundary>
            <AppProviders>
                <GoogleAnalytics
                    trackPageViews
                    gaMeasurementId={gaMeasurementId}
                />
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                <Hydrate state={pageProps.dehydratedState}>
                    <Head>
                        <title>Nx NextJS Starter</title>
                        <meta
                            name="description"
                            content="Starter kit for NextJS with Nx"
                        />
                        <meta charSet="utf8" />
                    </Head>
                    <main className="app">
                        <Component {...pageProps} />
                    </main>
                </Hydrate>
            </AppProviders>
        </FullScreenErrorBoundary>
    );
}

export default CustomApp;

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@300;400;700&display=swap"
                        rel="stylesheet"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        try {
                            const storage = window && window.localStorage;
                            if (
                                storage.getItem("color-theme") === "dark" ||
                                (!("color-theme" in storage) &&
                                    window.matchMedia("(prefers-color-scheme: dark)").matches)
                            ) {
                                document.documentElement.classList.add("dark");
                            } else {
                                document.documentElement.classList.remove("dark");
                            }
                        } catch (e) {
                            console.error(e);
                        }
                        `,
                        }}
                    ></script>
                </Head>
                <body className="leading-base bg-white text-lg antialiased dark:bg-gray-900 dark:text-white">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

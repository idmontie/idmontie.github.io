export function Footer() {
    return (
        <footer className="width-full border-top bg-gray-light my-4 p-4">
            <div className="flex-justify-between flex px-3 text-gray-700 dark:text-gray-300">
                <div className="flex flex-1 flex-row gap-6">
                    <div>
                        Like this blog and portfolio? Check it out on{" "}
                        <a
                            href="https://github.com/idmontie/idmontie.github.io"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </a>
                    </div>
                    <div>|</div>
                    <div>
                        <a
                            href="/rss.xml"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            RSS Feed
                        </a>
                    </div>
                </div>
                <div className="flex self-end">
                    <button
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                    >
                        Back to top
                    </button>
                </div>
            </div>
        </footer>
    );
}

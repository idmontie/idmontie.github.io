export function Footer() {
    return (
        <footer className="width-full border-top bg-gray-light p-3">
            <div className="container-lg d-flex flex-justify-between px-3">
                <div className="d-flex">
                    Like this blog and portfolio? Check it out on{" "}
                    <a
                        href="https://github.com/idmontie/idmontie.github.io"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github
                    </a>
                </div>
                <div className="d-flex justify-content-end">
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

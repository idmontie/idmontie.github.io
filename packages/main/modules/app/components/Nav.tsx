import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

export function Nav() {
    const router = useRouter();
    const activeLink = (() => {
        switch (router.pathname) {
            case "/":
                return "Home";
            case "/blog":
                return "Blog";
            case "/portfolio":
                return "Portfolio";
        }
    })();

    return (
        <nav className="width-full border-bottom bg-gray-light p-3">
            <div className="container-lg d-flex flex-justify-between px-3">
                <div className="d-flex">
                    <Link
                        href="/"
                        className={classNames({
                            "text-bold": activeLink === "Home",
                        })}
                    >
                        Home
                    </Link>
                    <Link
                        href="/blog"
                        className={classNames({
                            "text-bold": activeLink === "Blog",
                        })}
                    >
                        Blog
                    </Link>
                    <Link
                        href="/portfolio"
                        className={classNames({
                            "text-bold": activeLink === "Portfolio",
                        })}
                    >
                        Portfolio
                    </Link>
                </div>
            </div>
        </nav>
    );
}

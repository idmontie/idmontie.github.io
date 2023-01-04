import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeToggle } from "./ThemeToggle";

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
        <nav className="flex items-center p-3">
            <div className="flex-1 space-x-4">
                <Link
                    href="/"
                    className={classNames({
                        "font-bold": activeLink === "Home",
                    })}
                >
                    Home
                </Link>
                <Link
                    href="/blog"
                    className={classNames({
                        "font-bold": activeLink === "Blog",
                    })}
                >
                    Blog
                </Link>
                <Link
                    href="/portfolio"
                    className={classNames({
                        "font-bold": activeLink === "Portfolio",
                    })}
                >
                    Portfolio
                </Link>
            </div>
            <div className="flex flex-1 justify-end">
                <ThemeToggle />
            </div>
        </nav>
    );
}

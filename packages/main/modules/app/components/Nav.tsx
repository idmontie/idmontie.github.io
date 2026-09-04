import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { label: "Writing", href: "/blog" },
    { label: "Projects", href: "/portfolio" },
    { label: "GitHub", href: "https://github.com/idmontie", external: true },
];

export function Nav() {
    const router = useRouter();
    const activeLink = (() => {
        return navItems.find((item) => item.href === router.pathname)?.label;
    })();

    return (
        <header className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-7 lg:px-10">
                <div className="flex self-start">
                    <Link href="/" className="group">
                        <div className="text-slate-950 text-xl font-semibold uppercase tracking-[0.16em] transition-colors group-hover:text-slate-800 dark:text-slate-50 dark:group-hover:text-white">
                            Ivan Montiel
                        </div>
                    </Link>
                </div>

                <nav
                    aria-label="Primary navigation"
                    className="flex items-center gap-8 self-end text-sm text-slate-500 dark:text-slate-300 lg:px-10"
                >
                    {navItems.map((item) =>
                        item.external ? (
                            <a
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-slate-800 dark:hover:text-white"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={
                                    activeLink === item.label
                                        ? "text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                        : "transition-colors hover:text-slate-800 dark:hover:text-white"
                                }
                            >
                                {item.label}
                            </Link>
                        )
                    )}

                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}

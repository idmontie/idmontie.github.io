import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { label: "Writing", href: "/blog" },
    { label: "Projects", href: "/portfolio" },
    { label: "GitHub", href: "https://github.com/idmontie", external: true },
];

type NavItem = (typeof navItems)[number];

function navLinkClassName(label: string, activeLink?: string) {
    return activeLink === label
        ? "text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        : "transition-colors hover:text-slate-800 dark:hover:text-white";
}

function NavLink({
    item,
    activeLink,
    variant,
}: {
    item: NavItem;
    activeLink?: string;
    variant: "horizontal" | "vertical";
}) {
    const baseClassName = navLinkClassName(item.label, activeLink);
    const className =
        variant === "vertical"
            ? `block w-full rounded px-3 py-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 ${baseClassName}`
            : baseClassName;

    if (item.external) {
        return (
            <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={className}
            >
                {item.label}
            </a>
        );
    }

    return (
        <Link href={item.href} className={className}>
            {item.label}
        </Link>
    );
}

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
                    className="hidden items-center gap-8 self-end text-sm text-slate-500 dark:text-slate-300 lg:flex lg:px-10"
                >
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            item={item}
                            activeLink={activeLink}
                            variant="horizontal"
                        />
                    ))}

                    <ThemeToggle />
                </nav>

                <details className="relative self-end lg:hidden [&[open]_summary_.nav-bar-bottom]:translate-y-0 [&[open]_summary_.nav-bar-bottom]:-rotate-45 [&[open]_summary_.nav-bar-middle]:scale-x-0 [&[open]_summary_.nav-bar-middle]:opacity-0 [&[open]_summary_.nav-bar-top]:translate-y-0 [&[open]_summary_.nav-bar-top]:rotate-45">
                    <summary
                        aria-label="Menu"
                        className="flex cursor-pointer list-none items-center justify-center rounded-md border border-slate-200 p-2 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white [&::-webkit-details-marker]:hidden"
                    >
                        <span className="sr-only">Menu</span>
                        <span
                            className="relative block h-5 w-5"
                            aria-hidden="true"
                        >
                            <span className="nav-bar-top absolute left-0 top-1/2 block h-0.5 w-5 origin-center -translate-y-[6px] rounded-full bg-current transition-all duration-200" />
                            <span className="nav-bar-middle absolute left-0 top-1/2 block h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-200" />
                            <span className="nav-bar-bottom absolute left-0 top-1/2 block h-0.5 w-5 origin-center translate-y-[6px] rounded-full bg-current transition-all duration-200" />
                        </span>
                    </summary>
                    <ul className="absolute right-0 top-full z-10 mt-2 flex min-w-[12rem] flex-col gap-1 rounded-md border border-slate-200 bg-white p-2 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <NavLink
                                    item={item}
                                    activeLink={activeLink}
                                    variant="vertical"
                                />
                            </li>
                        ))}
                        <li className="border-t border-slate-200 pt-2 dark:border-slate-700">
                            <ThemeToggle />
                        </li>
                    </ul>
                </details>
            </div>
        </header>
    );
}

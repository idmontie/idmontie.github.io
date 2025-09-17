import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface CardProps {
    children: ReactNode;
}

export function Card({ children }: CardProps) {
    return (
        <div className="flex-1 overflow-visible rounded-lg bg-gradient-to-br from-slate-100 to-slate-100 shadow-lg dark:from-slate-800/60 dark:to-slate-700/60">
            {children}
        </div>
    );
}

export function CardLink({ children, href, ...props }: CardProps & LinkProps) {
    return (
        <Link
            {...props}
            className="block flex-1 overflow-visible rounded-lg bg-gradient-to-br from-slate-100 to-slate-100 no-underline shadow-lg dark:from-slate-800/60 dark:to-slate-700/60"
            href={href}
        >
            {children}
        </Link>
    );
}

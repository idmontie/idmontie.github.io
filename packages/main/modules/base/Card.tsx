import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface CardProps {
    children: ReactNode;
}

export function Card({ children }: CardProps) {
    return (
        <div className="flex-1 overflow-visible rounded-lg bg-white shadow-lg dark:bg-gray-800">
            {children}
        </div>
    );
}

export function CardLink({ children, href }: CardProps & LinkProps) {
    return (
        <Link
            className="block flex-1 overflow-visible rounded-lg bg-white no-underline shadow-lg dark:bg-gray-800"
            href={href}
        >
            {children}
        </Link>
    );
}

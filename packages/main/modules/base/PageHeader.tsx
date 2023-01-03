import { ReactNode } from "react";

export interface PageHeaderProps {
    children: ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
    return (
        <h1 className="mb-12 text-center text-3xl font-bold dark:text-white md:text-5xl">
            {children}
        </h1>
    );
}

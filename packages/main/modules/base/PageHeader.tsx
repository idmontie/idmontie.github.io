import { ReactNode } from "react";

export interface PageHeaderProps {
    children: ReactNode;
    viewTransitionName?: string;
}

export default function PageHeader({
    children,
    viewTransitionName,
}: PageHeaderProps) {
    return (
        <h1
            className="my-8 text-left text-3xl font-bold dark:text-white sm:text-center md:text-5xl md:leading-normal"
            style={{
                viewTransitionName,
            }}
        >
            {children}
        </h1>
    );
}

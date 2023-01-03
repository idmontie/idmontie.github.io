import { ReactNode } from "react";

export interface PrimaryTagProps {
    children: ReactNode;
}

export function PrimaryTag({ children }: PrimaryTagProps) {
    return (
        <span
            className={`
                inline-block
                whitespace-nowrap
                rounded
                bg-blue-600
                py-1
                px-2.5
                text-center
                align-baseline
                text-xs
                font-bold
                leading-none
                text-white
            `}
        >
            {children}
        </span>
    );
}

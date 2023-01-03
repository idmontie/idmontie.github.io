import { ReactNode } from "react";

export interface SecondaryTagProps {
    children: ReactNode;
}

export function SecondaryTag({ children }: SecondaryTagProps) {
    return (
        <span
            className={`
                inline-block
                whitespace-nowrap
                rounded
                bg-purple-600
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

import { ReactNode } from "react";
import { TagIcon } from "./TagIcon";

const variantClasses = {
    primary:
        "bg-blue-400/20 dark:bg-blue-600/20 text-black dark:text-white hover:bg-blue-300/20 dark:hover:bg-blue-700/20",
    secondary:
        "bg-purple-400/20 dark:bg-purple-600/20 text-black dark:text-white hover:bg-purple-300/20 dark:hover:bg-purple-700/20",
};

export interface TagProps {
    children: ReactNode;
    className?: string;
    variant?: keyof typeof variantClasses;
    as?: React.ElementType;
}

export function Tag<T>({
    children,
    className,
    variant = "primary",
    as: Component = "span",
    ...props
}: TagProps & T) {
    return (
        <Component
            className={`
                inline-flex
                items-center
                gap-1.5
                whitespace-nowrap
                rounded-md
                px-2.5
                py-1
                text-xs
                font-bold
                capitalize
                leading-none
                transition-colors
                ${variantClasses[variant]}
                ${className ?? ""}
            `}
            {...props}
        >
            <TagIcon />
            {children}
        </Component>
    );
}

export function TagList({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
            {children}
        </div>
    );
}

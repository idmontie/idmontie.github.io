import classNames from "classnames";

export interface OutlineButtonProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

export function OutlineButton<T>({
    children,
    className,
    as: Component = "button",
    ...props
}: OutlineButtonProps & T) {
    return (
        <Component
            className={classNames(
                `
                inline-block
                rounded-sm
                border
                border-slate-800
                bg-transparent
                px-6
                py-2.5
                text-xs
                font-semibold
                uppercase
                leading-tight
                text-slate-800
                shadow-md
                transition
                duration-150
                ease-in-out
                hover:bg-gray-400
                hover:bg-opacity-25
                hover:shadow-lg
                focus:bg-gray-400
                focus:bg-opacity-25
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-gray-400
                active:bg-opacity-25
                active:shadow-lg
                dark:border-white
                dark:text-white
                `,
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

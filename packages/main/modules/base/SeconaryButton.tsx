import classNames from "classnames";

export interface SecondaryButtonProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

export function SecondaryButton<T>({
    children,
    className,
    as: Component = "button",
    ...props
}: SecondaryButtonProps & T) {
    return (
        <Component
            className={classNames(
                `
                inline-block
                rounded-sm
                bg-green-600
                px-6
                py-2.5
                text-xs
                font-semibold
                uppercase
                leading-tight
                text-white
                shadow-md
                transition
                duration-150
                ease-in-out
                hover:bg-green-700
                hover:shadow-lg
                focus:bg-green-700
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-green-800
                active:shadow-lg
                `,
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

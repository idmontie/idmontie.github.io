import classNames from "classnames";

export interface PrimaryButtonProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

export function PrimaryButton<T>({
    children,
    className,
    as: Component = "button",
    ...props
}: PrimaryButtonProps & T) {
    return (
        <Component
            className={classNames(
                `
                inline-block
                rounded-sm
                bg-blue-600
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
                hover:bg-blue-700
                hover:shadow-lg
                focus:bg-blue-700
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-blue-800
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

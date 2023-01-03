import classNames from "classnames";
import { ReactNode } from "react";

export interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    prefix?: ReactNode;
    suffix?: ReactNode;
}

export function Toggle({ prefix, suffix, checked, onChange }: ToggleProps) {
    return (
        <label
            htmlFor="toggle"
            className="relative flex w-fit cursor-pointer items-center"
        >
            {prefix}
            <input
                type="checkbox"
                id="toggle"
                className="sr-only"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <div
                className={classNames(
                    `
                        relative
                        h-6
                        w-11
                        rounded-full
                        border-2
                    
                        after:absolute
                        after:h-5
                        after:w-5
                        after:rounded-full
                        after:border
                        after:border-gray-300
                        after:bg-white
                        after:shadow-sm
                        after:transition
                    `,
                    {
                        [`
                            border-blue-600
                            bg-blue-600
                            after:translate-x-[100%]
                            after:border-white
                        `]: checked,
                        [`
                            border-gray-200
                            bg-gray-200
                            dark:border-gray-700
                            dark:bg-gray-700
                        `]: !checked,
                    }
                )}
            />
            {suffix}
        </label>
    );
}

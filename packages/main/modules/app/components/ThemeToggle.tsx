import { Toggle } from "modules/base/Toggle";
import { useCallback, useEffect, useState } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        if (
            localStorage.getItem("color-theme") === "dark" ||
            (!("color-theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
            setTheme("dark");
        } else {
            document.documentElement.classList.remove("dark");
            setTheme("light");
        }
    }, []);

    const toggleTheme = useCallback((value: boolean) => {
        const theme = value ? "light" : "dark";

        localStorage.setItem("color-theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        setTheme(theme);
    }, []);

    return (
        <Toggle
            checked={theme === "light"}
            onChange={toggleTheme}
            prefix="🌑"
            suffix="☀️"
        />
    );
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getStoredTheme(): Theme | null {
    if (typeof window === "undefined") return null;
    const saved = window.localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
        return saved;
    }
    return null;
}

function resolveTheme(theme: Theme): ResolvedTheme {
    if (theme !== "system") return theme;
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? "system");
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
        resolveTheme(getStoredTheme() ?? "system"),
    );

    useEffect(() => {
        const resolved = resolveTheme(theme);
        setResolvedTheme(resolved);
        window.document.documentElement.setAttribute("data-theme", resolved);
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const resolved = mediaQuery.matches ? "dark" : "light";
            setResolvedTheme(resolved);
            window.document.documentElement.setAttribute("data-theme", resolved);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
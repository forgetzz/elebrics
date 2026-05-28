"use client"
import { createContext, useState } from "react";
import { ThemeContextTypes, ThemeProvider } from "../types/index"


export const ThemesContext = createContext<ThemeContextTypes | undefined>(undefined)

export function ThemeProviderContext({ children }: ThemeProvider) {
    const [IsDark, setIsDark] = useState(false)

    const themeToggle = () => setIsDark(prev => !prev)


    return (
        <ThemesContext.Provider value={{IsDark, themeToggle}}>
            {children}
        </ThemesContext.Provider>
    )
}
"use client"
import { createContext, useState } from "react";
import { ThemeContextTypes, ThemeProvider } from "../types/index"


export const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined)

export function ThemeProviderContext({ children }: ThemeProvider) {
    const [IsDark, setIsDark] = useState(false)

    const themeToggle = () => setIsDark(prev => !prev)


    return (
        <ThemeContext.Provider value={{IsDark, themeToggle}}>
            {children}
        </ThemeContext.Provider>
    )
}
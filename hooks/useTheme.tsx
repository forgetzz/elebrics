import { ThemeContext } from "@/context/index";
import { useContext } from "react";

export function useTheme() { 

    const theme = useContext(ThemeContext)
    if(!theme) {
        throw new Error("belum seiap")
    }

    return theme
}
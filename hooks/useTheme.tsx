import { ThemesContext } from "@/context/index";
import { Colors } from "@/utils";
import { useContext } from "react";

export function useTheme() {
    const theme = useContext(ThemesContext)

    if (!theme) {
        throw new Error("belum seiap")
    }
    const Isdarks = theme.IsDark
    const themeToggle = theme.themeToggle

    const ThemeHelper = {
        ThemeBgPrimary: Isdarks ? Colors.PrimaryBg : Colors.SecondryBg,
        TextColor: Isdarks ? Colors.textColorPrimary : Colors.textColorSecondry
    }


    return { ThemeHelper, Isdarks, themeToggle }

}



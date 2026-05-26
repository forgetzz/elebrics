import { ReactNode } from "react";
import type { User as FirebaseUser } from "firebase/auth";
export interface ButtonTypes {
  func: () => void;
  textBtn: string;
}

export interface ButtonTypes2 {
  func: () => void;
  textBtn: string;
  textColor: string;
}


export interface ThemeContextTypes {
    themeToggle: () => void
    IsDark : boolean
}

export interface ThemeProvider {
    children : ReactNode
}

export interface AuthNode {
    children : ReactNode
}


export type AuthType = {

    user : FirebaseUser | null
    isLoading : boolean
}
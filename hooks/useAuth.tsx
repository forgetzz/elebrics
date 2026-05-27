"use client"
import { AuthContext } from "@/context";
import { useContext } from "react";


export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth harus dipakai di dalam AuthContextProvider"
    );
  }

  return context;
}
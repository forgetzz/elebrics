"use client"
import { AuthType, AuthNode } from "@/types";
import {auth } from"../lib/firebase"
import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export const AuthContext = createContext<AuthType | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: AuthNode) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {


    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
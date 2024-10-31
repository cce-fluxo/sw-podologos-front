"use client";
import { createContext, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<null>(null);

  async function signIn(email: string, password: string) {
    const { user } = await signInRequest({ email, password });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: false, setIsAuthenticated: () => {} }}
    >
      {children}
    </AuthContext.Provider>
  );
}

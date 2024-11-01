'use client';
import { SignInRequest } from '@/services/auth';
import { error } from 'console';
import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';

type signInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: signInData) => Promise<void>;
  user: any;
};
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const router = useRouter();
  const [user, setUser] = useState<null>(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: signInData) {
    try {
      console.log('Iniciando signIn com:', { email, password });
      const response = await SignInRequest({ email, password });
      if (response.data) {
        setUser(response.data);
        router.push('/PodologosCadastrados');
      } else {
        console.log('Usuário não encontrado');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

'use client';
import { SignInRequest } from '@/services/auth';
import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/axios';
type signInData = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: signInData) => Promise<void>;
  user: {
    email: string;
    name: string
  } | null;
  signOut: () => void;
};
export const AuthContext = createContext({} as AuthContextType);

// COMEÇO DA FUNÇÃO
export function AuthProvider({ children }: any) {
  const router = useRouter();
  const [user, setUser] = useState<null>(null);
  const isAuthenticated = !!user;
  const [token, setToken] = useState('');

  async function signIn({ email, password }: signInData) {
    try {
      const response = await SignInRequest({ email, password });
      if (response) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.data)
        await getAdmin();
      } else {
        throw new Error('Token não recebido');
      }
    } catch (error) {
      console.log('Erro no signIn:', error);
      throw error; // REPASSA o erro para o componente de Login
    }
  }

  async function getAdmin() {
    try {
      const response = await api.get('/admin');
      const data = response.data;
      console.log(data);
      setUser(data);
      return data;
    } catch (error) {
      console.log('Erro ao encontrar o usuário:', error);
    }
  }

  function signOut() {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

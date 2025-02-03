'use client';
import { SignInRequest } from '@/services/auth';
import { error } from 'console';
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
  user: any;
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
      console.log('Iniciando signIn com:', { email, password });
      const response = await SignInRequest({ email, password });
      console.log('Testando token: ', response.token);
      if (response) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        await getAdmin();
        router.push('/PodologosCadastrados');
      } else {
        console.log('Usuário não encontrado (tratamento)');
      }
    } catch (error) {
      console.log('Erro no signIn:', error);
      console.log(error);
    }
  }

  async function getAdmin() {
    try {
      const response = await api.get('/admin');
      const data = response.data;
      console.log(data);
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

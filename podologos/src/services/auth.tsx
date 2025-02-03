import api from './axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type User = {
  email: string;
  password: string;
};

export async function SignInRequest({ email, password }: User) {
  try {
    const user = { email, password };
    const response = await api.post('auth/admin/signin', user, { cors: true });
    toast.success('Login realizado com sucesso!');
    return response.data;
  } catch (error) {
    toast.error('Erro ao fazer login. Verifique suas credenciais.');
    console.error(error);
  }
}

import api from './axios';

type User = {
  email: string;
  password: string;
};

export async function SignInRequest({ email, password }: User) {
  try {
    const user = { email, password };
    const response = await api.post('auth/admin/signin', user, { cors: true });
    console.log('Responsta:', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

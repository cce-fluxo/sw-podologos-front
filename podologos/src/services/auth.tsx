import api from './axios';

type User = {
  email: string;
  password: string;
};

export async function SignInRequest({ email, password }: User) {
  try {
    const user = { email: email, password: password };
    const response = await api.post('/admin', user, {
      withCredentials: true,
    });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

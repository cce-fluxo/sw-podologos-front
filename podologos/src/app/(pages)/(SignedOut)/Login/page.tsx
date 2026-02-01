'use client';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Button from '@/Components/Button/button';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import PasswordInput from '@/Components/Inputs/PasswordInput';
import Input from '@/Components/Inputs/Input';

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa erro do campo quando o usuário começa a digitar
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const User = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      };
      console.log('Clicou', User)
      
      await signIn(User);

      router.push('/PodologosCadastrados')
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      
      // Tratamento de erros específicos da API
      if (error.response?.status === 401) {
        setErrors(prev => ({
          ...prev,
          email: 'E-mail ou senha inválidos',
          password: 'E-mail ou senha inválidos'
        }));
      } else {
        alert('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função específica para o clique no botão
  const handleButtonClick = () => {
    handleSubmit();
  };


  return (
    <div className='flex h-full w-full flex-col items-center justify-evenly'>
      <h1 className='text-cinza_azulado text-[26px] font-[600]'>Login</h1>
      
      <form 
        onSubmit={handleSubmit}
        className='flex h-auto w-[84%] flex-col gap-6'
        id='formLogin'
      >
        <div className='flex flex-col gap-4'>
          {/* Campo Email */}
          <div className='flex flex-col gap-1'>
            <Input
              label='E-mail'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Digite seu e-mail'
              error={errors.email}
              disabled={loading}
              required
            />
          </div>

          {/* Campo Senha */}
          <div className='flex flex-col gap-1'>
            <PasswordInput
              label='Senha'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Digite sua senha'
              error={errors.password}
              disabled={loading}
              required
            />
          </div>
        </div>

        <Link
          href={'/ForgotPassword'}
          className='mt-[-10px] self-center'
        >
          <p className='text-azul hover:underline'>Esqueci minha senha</p>
        </Link>
      </form>

      <Button
        onClick={handleButtonClick}
        className='w-[84%]'
        disabled={loading}
      >
        {loading ? <ClipLoader size={25} color='white' /> : 'Entrar'}
      </Button>
    </div>
  );
}
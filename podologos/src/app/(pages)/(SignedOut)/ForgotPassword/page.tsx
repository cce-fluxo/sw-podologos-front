'use client';
import Button from '@/Components/Button/button';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/Components/Inputs/Input';

export default function EsqueciSenha() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({
    email: '',
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
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Aqui você faria a chamada à API para enviar o email
      // Exemplo: await api.post('/auth/forgot-password', formData);
      
      console.log('Enviando solicitação para:', formData.email);
      
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Após sucesso, redireciona para a página de código
      router.push('/ForgotPassword/Codigo');
      
    } catch (error: any) {
      console.error('Erro ao enviar email:', error);
      
      // Tratamento de erros específicos
      if (error.response?.status === 404) {
        setErrors(prev => ({
          ...prev,
          email: 'Email não encontrado em nossa base de dados'
        }));
      } else if (error.response?.status === 400) {
        setErrors(prev => ({
          ...prev,
          email: 'Formato de email inválido'
        }));
      } else {
        alert('Erro ao enviar email. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-evenly'>
      <h1 className='text-cinza_azulado text-[26px] font-[600]'>
        Esqueci minha senha
      </h1>
      
      <p className='w-[84%] text-center font-[400] mb-6'>
        Informe o email cadastrado e um email com as instruções de recuperação
        será enviado.
      </p>
      
      <form 
        onSubmit={handleSubmit}
        className='flex h-auto w-[84%] flex-col gap-6'
        id='formEmail'
      >
        <div className='flex flex-col gap-4'>
          <Input
            label='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Digite seu email cadastrado'
            error={errors.email}
            disabled={loading}
            required
          />
        </div>
      </form>
      
      <div className='flex w-full flex-col items-center space-y-3'>
        <Button
          onClick={() => handleSubmit}
          type='submit'
          className='w-[84%]'
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
        
        <Link href={'/Login'} className='w-[84%]'>
          <Button
            className='w-full border-[1px] border-azul bg-white text-azul'
            type='button'
            disabled={loading}
          >
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  );
}
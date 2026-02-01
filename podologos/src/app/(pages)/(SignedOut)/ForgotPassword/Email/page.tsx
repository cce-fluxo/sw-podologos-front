'use client';
import Button from '@/Components/Button/button';
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import PopUpDelete from '@/Components/popUps/popUpDelete';
import api from '@/services/axios';
import { useRouter } from 'next/navigation';
import Input from '@/Components/Inputs/Input';

// Configurar o Modal para acessibilidade
if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

export default function EsqueciSenha() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.patch('auth/admin/forgot-password', formData);
      
      // Mostra o modal de sucesso
      setModal(true);
      
      console.log('Resposta da API:', response.data);
      
    } catch (error: any) {
      console.log('Erro ao enviar email:', error);
      
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
      } else if (error.response?.status === 500) {
        alert('Erro no servidor. Tente novamente mais tarde.');
      } else {
        alert('Erro ao enviar email. Verifique sua conexão e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  function onConcluidoClick() {
    setModal(false);
    // Redireciona para a página de código após fechar o modal
    router.push('/ForgotPassword/Codigo');
  }

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
            type='email'
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
            className='border-[1px] border-azul bg-white text-azul w-full'
            type='button'
            disabled={loading}
          >
            Voltar
          </Button>
        </Link>
      </div>
      
      {/* Modal de confirmação */}
      <PopUpDelete 
        modalIsOpen={modal} 
        onClick={onConcluidoClick}
      />
    </div>
  );
}
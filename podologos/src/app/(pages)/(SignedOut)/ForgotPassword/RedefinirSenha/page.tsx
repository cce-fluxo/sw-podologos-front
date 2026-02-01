'use client';
import React, { useState } from 'react';
import Button from '@/Components/Button/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/Components/Inputs/PasswordInput';

export default function RedefinirSenha() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    novaSenha: '',
    confirmarSenha: '',
  });
  const [errors, setErrors] = useState({
    novaSenha: '',
    confirmarSenha: '',
  });
  const [loading, setLoading] = useState(false);

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
      novaSenha: '',
      confirmarSenha: '',
    };
    let isValid = true;

    // Validação da nova senha
    if (!formData.novaSenha) {
      newErrors.novaSenha = 'Nova senha é obrigatória';
      isValid = false;
    } else if (formData.novaSenha.length < 6) {
      newErrors.novaSenha = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    // Validação da confirmação
    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
      isValid = false;
    } else if (formData.novaSenha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
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
      // Aqui você faria a chamada à API para redefinir a senha
      console.log('Enviando dados:', formData);
      
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Após sucesso, redirecionar para a página de login
      alert('Senha redefinida com sucesso!');
      router.push('/Login');
      
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      alert('Erro ao redefinir senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-evenly'>
      <h1 className='text-cinza_azulado text-[26px] font-[400]'>
        Redefinir Senha
      </h1>
      
      <form 
        onSubmit={handleSubmit}
        className='flex h-auto w-[84%] flex-col gap-6'
        id='formRedefinirSenha'
      >
        <div className='flex flex-col gap-4'>
          {/* Campo Nova Senha */}
          <div className='flex flex-col gap-1'>
            <PasswordInput
              label='Senha'
              name='password'
              value={formData.novaSenha}
              onChange={handleChange}
              placeholder='Digite sua senha'
              error={errors.novaSenha}
              disabled={loading}
              required
            />
          </div>

          {/* Campo Confirmar Senha */}
          <div className='flex flex-col gap-1'>
            <PasswordInput
              label='Confirmar senha'
              name='confirmarSenha'
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder='Confirme a nova senha'
              error={errors.confirmarSenha}
              disabled={loading}
              required
            />
          </div>
        </div>
      </form>

      <div className='w-[84%]'>
        <Button 
          onClick={() => handleSubmit(new Event('submit') as any)}
          type='submit'
          className='w-full'
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Redefinir'}
        </Button>
      </div>
    </div>
  );
}
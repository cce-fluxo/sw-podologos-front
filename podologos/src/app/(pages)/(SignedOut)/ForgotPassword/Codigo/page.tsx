'use client';
import Button from '@/Components/Button/button';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InsiraCodigo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    if (!codigo) {
      setError('Código é obrigatório');
      return;
    }
    
    if (codigo.length !== 6) {
      setError('O código deve ter 6 dígitos');
      return;
    }
    
    if (!/^\d+$/.test(codigo)) {
      setError('O código deve conter apenas números');
      return;
    }

    setLoading(true);
    
    try {
      // Validação do código com a API
      // await api.post('/validate-code', { code: codigo });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Se válido, redireciona
      router.push('/ForgotPassword/RedefinirSenha');
      
    } catch (error: any) {
      console.error('Erro:', error);
      setError('Código inválido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReenviar = async () => {
    setLoading(true);
    
    try {
      // Reenviar código
      // await api.post('/resend-code');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Código reenviado com sucesso!');
      
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao reenviar código.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-evenly'>
      <h1 className='text-cinza_azulado text-[26px] font-[600]'>
        Insira o código recebido
      </h1>
      
      <p className='w-[84%] text-center font-[400] mb-6'>
        Digite o código de 6 dígitos que enviamos para o seu e-mail
      </p>
      
      <form 
        onSubmit={handleSubmit}
        className='w-[84%] space-y-4'
        id='formCodigo'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='codigo' className='text-cinza_azulado font-medium'>
            Código de verificação
          </label>
          <input
            id='codigo'
            name='codigo'
            type='text'
            value={codigo}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ''); // Remove não-números
              if (value.length <= 6) {
                setCodigo(value);
              }
              if (error) setError('');
            }}
            placeholder='123456'
            className={`p-3 rounded-lg border text-center text-lg tracking-widest ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-azul`}
            disabled={loading}
            maxLength={6}
            inputMode="numeric"
          />
          {error && (
            <p className='text-red-500 text-sm mt-1 text-center'>{error}</p>
          )}
        </div>
      </form>
      
      <div className='flex w-full flex-col items-center space-y-3'>
        <Button
          onClick={() => handleSubmit}
          type='submit'
          className='w-[84%]'
          disabled={loading}
        >
          {loading ? 'Validando...' : 'Confirmar código'}
        </Button>
        
        <Button
          onClick={handleReenviar}
          className='w-[84%] border-[1px] border-azul bg-white text-azul'
          type='button'
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Reenviar código'}
        </Button>
      </div>
    </div>
  );
}
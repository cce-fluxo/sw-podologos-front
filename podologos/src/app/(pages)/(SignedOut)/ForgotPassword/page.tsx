'use client';
import { FormData } from '@/Components/FormData';
import { GenericField } from '@/Components/FormData/Input';
import Button from '@/Components/Button/button';
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import Image from 'next/image';
import Concluido from '@/Assets/Concluido.svg';
import PopUpDelete from '@/Components/popUps/popUpDelete';
import { useRouter } from 'next/navigation';

export default function EsqueciSenha() {
  const router = useRouter();

  const column = [
    {
      name: 'email',
      label: 'E-mail',
      placeholder: '',
      component: GenericField,
    },
  ];
  const onSubmit = (data: any) => {
    router.push('/ForgotPassword/Codigo');
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-evenly'>
      <h1 className='text-cinza_azulado text-[26px] font-[600]'>
        Esqueci minha senha
      </h1>
      <p className='w-[84%] text-center font-[400]'>
        Informe o email cadastrado e um email com as instruções de recuperação
        será enviado.
      </p>
      <FormData.Root className='flex h-auto w-[84%]' onSubmit={onSubmit}>
        <FormData.Form
          columns={column}
          id='enviarEmail'
          className='flex w-full flex-1 flex-col gap-4'
        ></FormData.Form>
      </FormData.Root>
      <div className='flex w-full flex-col items-center space-y-3'>
        <Button
          form='enviarEmail'
          type='submit'
          placeholder='Enviar'
          className='w-[84%]'
        ></Button>
        <Link href={'/Login'} className='w-[84%]'>
          <Button
            className='border-[1px] border-azul bg-white text-azul'
            placeholder='Voltar'
          ></Button>
        </Link>
      </div>
    </div>
  );
}

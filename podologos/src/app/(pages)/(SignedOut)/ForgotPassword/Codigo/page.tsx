'use client';
import { GenericField } from '@/Components/FormData/Input';
import Button from '@/Components/Button/button';
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import Image from 'next/image';
import Concluido from '@/Assets/Concluido.svg';
import { FormData } from '@/Components/FormData';
import { useRouter } from 'next/navigation';

export default function InsiraCodigo() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    email: '',
  });

  const column = [
    {
      name: 'email',
      placeholder: '',
      component: GenericField,
    },
  ];

  const onSubmit = (data: any) => {
    router.push('/ForgotPassword/RedefinirSenha');
  };
  return (
    <div className='flex h-full w-full flex-col items-center justify-evenly'>
      <h1 className='text-cinza_azulado text-[26px] font-[600]'>
        Insira o código recebido
      </h1>
      <FormData.Root className='flex h-auto w-[84%]' onSubmit={onSubmit}>
        <FormData.Form
          columns={column}
          id='enviarCodigo'
          className='flex w-full flex-1 flex-col gap-4'
        ></FormData.Form>
      </FormData.Root>
      <div className='flex w-full flex-col items-center space-y-3'>
        <Button
          type='submit'
          form='enviarCodigo'
          placeholder='Confirmar código'
          className='w-[84%]'
        ></Button>
        <Link href={'/Login'} className='w-[84%]'>
          <Button
            className='border-[1px] border-azul bg-white text-azul'
            placeholder='Reenviar código'
          ></Button>
        </Link>
      </div>
    </div>
  );
}

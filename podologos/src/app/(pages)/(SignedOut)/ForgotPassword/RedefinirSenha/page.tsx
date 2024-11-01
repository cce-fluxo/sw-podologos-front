'use client';
import React from 'react';
import Button from '@/Components/Button/button';
import { FormData } from '@/Components/FormData';
import {
  GenericField,
  GenericPasswordField,
} from '@/Components/FormData/Input';
import Link from 'next/link';

export default function RedefinirSenha() {
  const [data, setData] = React.useState({
    novaSenha: '',
    confirmarSenha: '',
  });

  const column = [
    {
      name: 'novaSenha',
      label: 'Nova senha',
      placeholder: '',
      component: GenericPasswordField,
    },
    {
      name: 'confirmarSenha',
      label: 'Confirmar senha',
      placeholder: '',
      component: GenericPasswordField,
    },
  ];

  const onSubmit = (data: any) => {};
  return (
    <div className='flex h-full w-full flex-col items-center justify-evenly'>
      <h1 className='text-cinza_azulado text-[26px] font-[600]'>
        Redefinir Senha
      </h1>
      <FormData.Root className='flex h-auto w-[84%] gap-8' onSubmit={onSubmit}>
        <FormData.Form
          columns={column}
          id='formQuestion'
          className='flex w-full flex-1 flex-col gap-4'
        ></FormData.Form>
      </FormData.Root>
      <Link href={'/Login'} className='w-[84%]'>
        <Button placeholder='Redefinir'></Button>
      </Link>
    </div>
  );
}

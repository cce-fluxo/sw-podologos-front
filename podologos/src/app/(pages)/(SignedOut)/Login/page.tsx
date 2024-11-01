'use client';
import React, { useContext } from 'react';
import {
  GenericField,
  GenericPasswordField,
} from '@/Components/FormData/Input/index';
import Link from 'next/link';
import Button from '@/Components/Button/button';
import { FormData } from '@/Components/FormData';
import { Router } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const User = {
      email: values.email,
      password: values.password,
    };
    signIn(User);
  };

  const column = [
    {
      name: 'email',
      label: 'E-mail',
      component: GenericField,
    },
    {
      name: 'password',
      label: 'password',
      component: GenericPasswordField,
    },
  ];

  const data = {
    email: '',
    password: '',
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-evenly'>
      <h1 className='text-cinza_azulado text-[26px] font-[600]'>Login</h1>
      <FormData.Root
        initialValues={data}
        className='flex h-auto w-[84%] gap-8'
        onSubmit={onSubmit}
      >
        <FormData.Form
          columns={column}
          id='formLogin'
          className='flex w-full flex-1 flex-col gap-4'
        >
          <Link href={'/ForgotPassword'} className='mt-[-15px] self-center'>
            <p className='text-azul'>Esqueci minha senha</p>
          </Link>
        </FormData.Form>
      </FormData.Root>

      <Button
        form={'formLogin'}
        type={'submit'}
        className='w-[84%]'
        placeholder='Entrar'
      ></Button>
    </div>
  );
}

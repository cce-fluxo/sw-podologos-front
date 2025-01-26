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
import api from '@/services/axios';
import { useRouter } from 'next/router';

export default function EsqueciSenha() {
  // const router = useRouter();
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState({
    email: '',
  });
  const column = [
    {
      name: 'email',
      label: 'E-mail',
      placeholder: '',
      component: GenericField,
    },
  ];

  const onSubmit = (data: any) => {};

  function onConcluidoClick() {
    setModal(false);
  }

  async function handleEmailSubmit(values: any) {
    try {
      const response = await api.patch('auth/admin/forgot-password', values);
      setEmail(values.email);
      // router.push('/ForgotPassword/Codigo ');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex h-full w-full flex-col items-center justify-evenly'>
      <h1 className='text-cinza_azulado text-[26px] font-[600]'>
        Esqueci minha senha
      </h1>
      <p className='w-[84%] text-center font-[400]'>
        Informe o email cadastrado e um email com as instruções de recuperação
        será enviado.
      </p>
      <FormData.Root
        className='flex h-auto w-[84%]'
        onSubmit={handleEmailSubmit}
      >
        <FormData.Form
          columns={column}
          id='formQuestion'
          className='flex w-full flex-1 flex-col gap-4'
        ></FormData.Form>
      </FormData.Root>
      <div className='flex w-full flex-col items-center space-y-3'>
        <Button
          form={'formQuestion'}
          type={'submit'}
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
      <PopUpDelete modalIsOpen={modal} onClick={onConcluidoClick}></PopUpDelete>
    </div>
  );
}

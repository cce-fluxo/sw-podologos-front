'use client';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
import Hamburguer from '@/assets/Hamburguer.svg';
import { useContext, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LogOut from '@/assets/LogOut.svg';
import { AuthContext, AuthContextType } from '@/context/AuthContext';
import Button from '../Button/button';
import ModalSimNao from '../popUps/ModalSimNao';

export default function SideBar() {
  const sm640 = useMediaQuery('(max-width: 640px)');
  const [show, setShow] = useState(false);
  const [path, setpath] = useState(usePathname().split('/')[1]);
  const router = useRouter();
  const signOut = useContext(AuthContext);
  const authContext = useContext<AuthContextType>(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    // Your logic here, for example:
    authContext.signOut();
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function Sair() {
    setIsOpen(false);
  }

  return (
    <>
      <Image
        src={Hamburguer}
        alt=''
        className='absolute left-5 top-[34px] -z-30'
        style={{
          display: sm640 ? 'block' : 'none',
          transform: show && sm640 ? 'rotate(-90deg)' : 'rotate(0deg)',
          transition: 'all 0.2s ease',
        }}
        onClick={() => {
          setShow(!show);
        }}
      />
      <div
        id='sidebar'
        className='fixed z-40 flex h-full min-w-[100vw] flex-col bg-white px-8 shadow-lg shadow-cinza sm:static sm:min-w-[200px] lg:w-[clamp(250px,22vw,300px)] lg:min-w-[200px]'
        style={{
          transform: !show && sm640 ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'all 0.2s ease',
        }}
      >
        <h1 className='mt-20 text-2xl font-bold'>
          Bem-vindo <br />
          Gustavo
        </h1>
        <div className='mt-8 flex flex-col gap-4'>
          <button
            className={`text-start font-[550] text-${
              path === 'PodologosCadastrados' ? 'azul' : 'black'
            }`}
            onClick={() => {
              router.push('/PodologosCadastrados');
              setpath('PodologosCadastrados');
              setShow(false);
            }}
          >
            Home
          </button>
          <button
            className={`text-start font-[550] text-${
              path === 'SolicitacaoCadastro' ? 'azul' : 'black'
            }`}
            onClick={() => {
              router.push('/SolicitacaoCadastro');
              setpath('SolicitacaoCadastro');
              setShow(false);
            }}
          >
            Solicitações de cadastro
          </button>
          <button
            className={`text-start font-[550] text-${
              path === 'Informacoes' ? 'azul' : 'black'
            }`}
            onClick={() => {
              router.push('/Informacoes');
              setpath('Informacoes');
              setShow(false);
            }}
          >
            Informações do aplicativo
          </button>
          <button
            className={`text-start font-[550] text-${
              path === 'ListaDenuncia' ? 'azul' : 'black'
            }`}
            onClick={() => {
              router.push('/ListaDenuncia');
              setpath('ListaDenuncia');
              setShow(false);
            }}
          >
            Lista de denúncias
          </button>
        </div>
        <div className='mb-8 mr-40 flex flex-1 items-end justify-end'>
          <Button
            onClick={openModal}
            className='flex gap-2 bg-white text-black'
          >
            <Image src={LogOut} alt=''></Image>
            <p>Sair</p>
          </Button>
        </div>
        <ModalSimNao
          isOpen={isOpen}
          onNoClick={closeModal}
          onYesClick={Sair}
          text='Tem certeza que deseja sair de sua conta?'
        />
      </div>
    </>
  );
}

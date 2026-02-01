'use client';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
// import Hamburguer from '@/assets/Hamburguer.svg';
import { useContext, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// import LogOut from '@/assets/LogOut.svg';
import { AuthContext, AuthContextType } from '@/context/AuthContext';
import Button from '../Button/button';
import ModalSimNao from '../popUps/ModalSimNao';

export default function SideBar() {
  const sm640 = useMediaQuery('(max-width: 640px)');
  const [show, setShow] = useState(false);
  const [path, setpath] = useState(usePathname().split('/')[1]);
  const router = useRouter();
  const authContext = useContext<AuthContextType>(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, user } = useContext(AuthContext); // Obtém signOut do contexto

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function Sair() {
    signOut(); // Agora ele pode ser chamado
    router.push('/Login');
  }

  return (
    <>
      {/* <Image
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
      /> */}
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
          {user?.name}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16.5 17L21.5 12L16.5 7L15.09 8.41L17.67 11H8.5V13H17.67L15.09 15.59L16.5 17Z" fill="black"/>
              <path d="M18.5 19H4.5V5H18.5V7H20.5V5C20.5 3.9 19.61 3 18.5 3H4.5C3.4 3 2.5 3.9 2.5 5V19C2.5 20.1 3.4 21 4.5 21H18.5C19.61 21 20.5 20.1 20.5 19V17H18.5V19Z" fill="black"/>
            </svg>
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

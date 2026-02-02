'use client';
import { useMediaQuery } from '@mantine/hooks';
import { useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext, AuthContextType } from '@/context/AuthContext';
import Button from '../Button/button';
import ModalSimNao from '../popUps/ModalSimNao';

export default function SideBar() {
  const sm640 = useMediaQuery('(max-width: 640px)');
  const [show, setShow] = useState(false);
  const [path, setPath] = useState(usePathname().split('/')[1]);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, user } = useContext(AuthContext);

  // Fechar sidebar ao clicar fora (em mobile)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sm640 && show && !(e.target as Element).closest('#sidebar') && 
          !(e.target as Element).closest('#hamburger-button')) {
        setShow(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sm640, show]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  function Sair() {
    signOut();
    router.push('/Login');
  }

  return (
    <>
      {/* Botão Hamburguer para mobile */}
      <button
        id="hamburger-button"
        className={`fixed left-5 top-[34px] z-50 sm:hidden ${
          show ? 'text-azul' : 'text-black'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
        aria-label="Abrir/fechar menu"
        style={{
          transform: show ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Ícone Hamburguer (≡) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Overlay para mobile */}
      {show && sm640 && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setShow(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id='sidebar'
        className='fixed z-40 flex h-full w-[280px] flex-col bg-white px-8 shadow-lg shadow-cinza sm:static sm:min-w-[200px] lg:w-[clamp(250px,22vw,300px)] lg:min-w-[200px]'
        style={{
          transform: sm640 ? (show ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        <h1 className='mt-20 text-2xl font-bold'>
          Bem-vindo <br />
          {user?.name}
        </h1>
        <div className='mt-8 flex flex-col gap-4'>
          <button
            className={`text-start font-[550] ${
              path === 'PodologosCadastrados' ? 'text-azul' : 'text-black'
            } hover:text-azul transition-colors duration-200`}
            onClick={() => {
              router.push('/PodologosCadastrados');
              setPath('PodologosCadastrados');
              setShow(false);
            }}
          >
            Home
          </button>
          <button
            className={`text-start font-[550] ${
              path === 'SolicitacaoCadastro' ? 'text-azul' : 'text-black'
            } hover:text-azul transition-colors duration-200`}
            onClick={() => {
              router.push('/SolicitacaoCadastro');
              setPath('SolicitacaoCadastro');
              setShow(false);
            }}
          >
            Solicitações de cadastro
          </button>
          <button
            className={`text-start font-[550] ${
              path === 'Informacoes' ? 'text-azul' : 'text-black'
            } hover:text-azul transition-colors duration-200`}
            onClick={() => {
              router.push('/Informacoes');
              setPath('Informacoes');
              setShow(false);
            }}
          >
            Informações do aplicativo
          </button>
          <button
            className={`text-start font-[550] ${
              path === 'ListaDenuncia' ? 'text-azul' : 'text-black'
            } hover:text-azul transition-colors duration-200`}
            onClick={() => {
              router.push('/ListaDenuncia');
              setPath('ListaDenuncia');
              setShow(false);
            }}
          >
            Lista de denúncias
          </button>
        </div>
        <div className='mb-8 mr-40 flex flex-1 items-end justify-end'>
          <Button
            onClick={openModal}
            className='flex gap-2 bg-white text-black hover:bg-gray-50 transition-colors duration-200'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16.5 17L21.5 12L16.5 7L15.09 8.41L17.67 11H8.5V13H17.67L15.09 15.59L16.5 17Z" fill="black"/>
              <path d="M18.5 19H4.5V5H18.5V7H20.5V5C20.5 3.9 19.61 3 18.5 3H4.5C3.4 3 2.5 3.9 2.5 5V19C2.5 20.1 3.4 21 4.5 21H18.5C19.61 21 20.5 20.1 20.5 19V17H18.5V19Z" fill="black"/>
            </svg>
            <p>Sair</p>
          </Button>
        </div>
      </div>
      <ModalSimNao
        isOpen={isOpen}
        onNoClick={closeModal}
        onYesClick={Sair}
        text='Tem certeza que deseja sair de sua conta?'
      />
    </>
  );
}
import React from 'react';
import Button from '../Button/button';
import Modal from 'react-modal';

interface PopupProps {
  isOpen: boolean;
  onYesClick?: () => void;
  onNoClick: () => void;
  text: string;
}

function ModalDenuncia({ isOpen, onNoClick, text }: PopupProps) {
  return (
    <Modal isOpen={isOpen}>
      <div className='bg-black-transparent fixed inset-0 z-50 flex h-screen w-screen items-center justify-center'>
        <div className='w-[80vw] items-center justify-center space-y-2 rounded-2xl bg-white p-1 shadow-md shadow-black'>
          <p>{text}</p>

          <div className='flex w-full items-center justify-center space-y-2 py-2'>
            <Button
              text='text-branco text-[16px]'
              placeholder='Confirmar denúncia'
            ></Button>
            <Button
              text='text-azul text-[16px]'
              placeholder='Voltar'
              className='border-[1px] border-azul bg-white'
            ></Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDenuncia;

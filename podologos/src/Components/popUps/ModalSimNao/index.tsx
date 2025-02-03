import React from 'react';
import Button from '@/Components/Button/button';
import Modal from 'react-modal';

interface PopupProps {
  isOpen: boolean;
  onYesClick?: () => void;
  onNoClick: () => void;
  text: string;
}

function ModalSimNao({ isOpen, onNoClick, text, onYesClick }: PopupProps) {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
      className='w-[30vw] rounded-2xl bg-white p-6 shadow-sm shadow-black'
    >
      <p className='mb-8 p-1 text-center text-base font-semibold'>{text}</p>

      <div className='flex flex-col items-center justify-center gap-2 border-t-[1px] border-zinc-300'>
        <Button onClick={onYesClick} className='mx-auto py-3'>
          <p className='text-lg font-normal text-white'>Sim</p>
        </Button>
        <div className='h-full border-r-[1px] border-zinc-300' />
        <Button
          className='r-2 mx-auto border-2 border-blue-500 bg-white py-3'
          onClick={onNoClick}
        >
          <p className='text-lg font-semibold text-azul'>Não</p>
        </Button>
      </div>
    </Modal>
  );
}

export default ModalSimNao;

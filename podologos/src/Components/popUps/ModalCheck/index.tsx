import React from 'react';
import Button from '@/Components/Button/button';
import Modal from 'react-modal';

interface PopupProps {
  mensagem: string;
  onNoClick: () => void;
  isOpen: boolean;
}

function ModalCheck({ isOpen, mensagem, onNoClick }: PopupProps) {
  return (
      <Modal
        isOpen={isOpen}
        overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
        className='w-[30vw] rounded-2xl bg-white p-6 shadow-sm shadow-black'
      >
          <p className='p-6 text-center text-base font-semibold'>{mensagem}</p>

          <div className='flex items-center justify-center border-t-[1px] border-zinc-300'>
            <Button className='mx-auto py-3' onClick={
              (
                console.log('Tentativa de fechar o check'),
                onNoClick
              )
            }>
              <p className='text-lg font-semibold text-white'>Ok</p>
            </Button>
          </div>
    </Modal>
  );
}

export default ModalCheck;

import React from 'react';
import Button from '../Button/button';
import Modal from 'react-modal';

interface PopupProps {
  mensagem: string;
  onYesClick?: () => void;
  onNoClick: () => void;
  isOpen: boolean;
}

function ModalCheck({ isOpen, mensagem, onNoClick }: PopupProps) {
  return (
    <Modal isOpen={isOpen}>
      <div className='bg-black-transparent fixed inset-0 z-50 flex h-screen w-screen items-center justify-center'>
        <div className='w-[80vw] rounded-2xl bg-white shadow-sm shadow-black'>
          <p className='p-6 text-center text-base font-semibold'>{mensagem}</p>

          <div className='flex items-center justify-center border-t-[1px] border-zinc-300'>
            <Button className='mx-auto py-3' onPress={onNoClick}>
              <p className='text-lg font-semibold text-azul'>Ok</p>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCheck;

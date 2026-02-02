import React from 'react';
import Button from '@/Components/Button/button';

interface PopupProps {
  isOpen: boolean;
  onYesClick?: () => void;
  onNoClick: () => void;
  text: string;
}

function ModalSimNao({ isOpen, onNoClick, text, onYesClick }: PopupProps) {

  if (!isOpen) {
      return (<></>);
  }

  return (
    <>
      {/* Overlay escuro */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => onNoClick()}
      />
        
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-10">
        <div 
        className="relative bg-white px-4 py-4 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        >
        <p className='mb-8 p-1 text-center text-base font-normal text-cinzaTexto'>{text}</p>

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
      </div>
      </div>
    </>
  );
}

export default ModalSimNao;

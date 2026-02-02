import React, { useEffect } from 'react';
import Button from '@/Components/Button/button';

interface PopupProps {
  mensagem: string;
  onNoClick: () => void;
  isOpen: boolean;
}

function ModalCheck({ isOpen, mensagem, onNoClick }: PopupProps) {
  // Impede scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onNoClick();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onNoClick]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onNoClick();
    }
  };

  return (
    <>
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={handleOverlayClick}
    >
      {/* Overlay escuro */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-10">

      {/* Modal */}
        <div 
          className="relative bg-white px-4 py-4 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >        
        {/* Conteúdo */}
        <div className="flex flex-col items-center">
          {/* Ícone de confirmação */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Mensagem */}
          <p className="mb-6 text-center text-base font-normal text-cinzaTexto">
            {mensagem}
          </p>

          {/* Botão OK */}
          <div className="w-full border-t border-zinc-300 pt-4">
            <Button
              className="w-full py-3"
              onClick={onNoClick}
            >
              <p className="text-lg font-semibold text-white">Ok</p>
            </Button>
          </div>

        </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ModalCheck;
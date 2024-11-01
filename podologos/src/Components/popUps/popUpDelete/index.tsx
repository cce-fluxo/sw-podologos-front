import Button from '@/Components/Button/button';
import Image from 'next/image';
import React from 'react';
import Modal from 'react-modal';
import Concluido from '@/Assets/Concluido.svg';

type PopUpDeleteProps = {
  modalIsOpen: boolean;
  onClick: () => void;
};

function PopUpDelete({ modalIsOpen, onClick }: PopUpDeleteProps) {
  return (
    <div>
      <Modal
        style={{
          overlay: { zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
        }}
        className={
          'border-gray flex h-screen w-screen items-center justify-center rounded-xl border p-0'
        }
        isOpen={modalIsOpen}
        ariaHideApp={false}
      >
        <div className='flex h-[273px] w-[404px] flex-col items-center justify-evenly rounded-2xl bg-white'>
          <p className='text-[18px] font-[600]'>Link enviado com sucesso!</p>
          <Image alt='' src={Concluido}></Image>
          <Button
            onClick={onClick}
            placeholder='Concluído'
            className='w-[60.5%]'
          ></Button>
        </div>
      </Modal>
    </div>
  );
}

export default PopUpDelete;

import React from "react";
import Button from "../Button/button";
import Modal from "react-modal"

interface PopupProps {
  mensagem: string;
  onYesClick?: () => void;
  onNoClick: () => void;
  isOpen: boolean;
}

function ModalCheck({isOpen,  mensagem, onNoClick }: PopupProps) {
  return (
    <Modal isOpen={isOpen}>
      <div className="w-screen h-screen z-50 flex items-center justify-center fixed inset-0  bg-black-transparent">
        <div className="bg-white w-[80vw] rounded-2xl shadow-sm shadow-black ">
          <p className="text-base text-center p-6 font-semibold">
            {mensagem}
          </p>

          <div className="flex items-center justify-center border-t-[1px] border-zinc-300 ">
            <Button className="mx-auto py-3" onPress={onNoClick}>
              <p className="text-azul font-semibold text-lg">Ok</p>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCheck;

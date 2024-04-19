import React from "react";
import Button from "../Button/button";
import Modal from "react-modal";

interface PopupProps {
  isOpen: boolean;
  onYesClick?: () => void;
  onNoClick: () => void;
  text:string,
}

function ModalDenuncia({ isOpen, onNoClick, text }: PopupProps) {
  return (
    <Modal isOpen={isOpen} >
      <div className="w-screen h-screen z-50 flex items-center justify-center fixed inset-0  bg-black-transparent">
        <div className="bg-white w-[80vw] rounded-2xl justify-center items-center shadow-md shadow-black p-1 space-y-2 ">
          <p>{text}</p>

          <div className="flex py-2 items-center w-full justify-center space-y-2 ">
            <Button
              text="text-branco text-[16px]"
              placeholder="Confirmar denúncia"
            ></Button>
            <Button
              text="text-azul text-[16px]"
              placeholder="Voltar"
              className=" bg-white border-[1px] border-azul"
            ></Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDenuncia;

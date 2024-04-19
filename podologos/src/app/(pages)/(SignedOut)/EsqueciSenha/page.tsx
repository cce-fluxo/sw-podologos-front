"use client";
import { FormData } from "@/components/FormData";
import { GenericField } from "@/components/FormData/Input";
import Button from "@/components/Button/button";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "react-modal";
import Image from "next/image";
import Concluido from "@/Assets/Concluido.svg";

export default function EsqueciSenha() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    email: "",
  });

  const column = [
    {
      name: "email",
      label: "E-mail",
      placeholder: "",
      component: GenericField,
    },
  ];

  function PopUpDelete() {
    return (
      <div>
        <Modal
          style={{
            overlay: { zIndex: 100, backgroundColor: "rgba(0, 0, 0, 0.4)" },
          }}
          className={
            " flex justify-center  items-center h-screen w-screen p-0 rounded-xl border border-gray "
          }
          isOpen={modal}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-evenly items-center h-[273px] w-[404px] bg-white rounded-2xl">
            <p className="text-[18px] font-[600]">Link enviado com sucesso!</p>
            <Image alt="" src={Concluido}></Image>
            <Button
              onClick={() => setModal(false)}
              placeholder="Concluído"
              className="w-[60.5%]"
            ></Button>
          </div>
        </Modal>
      </div>
    );
  }

  const onSubmit = (data: any) => {};
  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full">
      <h1 className="text-[26px] font-[600] text-cinza_azulado">
        Esqueci minha senha
      </h1>
      <p className="w-[84%] text-center font-[400]">
        Informe o email cadastrado e um email com as instruções de recuperação
        será enviado.
      </p>
      <FormData.Root className="flex h-auto w-[84%]" onSubmit={onSubmit}>
        <FormData.Form
          columns={column}
          id="formQuestion"
          className="flex flex-col gap-4 w-full flex-1"
        ></FormData.Form>
      </FormData.Root>
      <div className="flex flex-col items-center space-y-3 w-full">
        <Button
          onClick={() => setModal(true)}
          placeholder="Enviar"
          className="w-[84%]"
        ></Button>
        <Link href={"/Login"} className="w-[84%]">
          <Button
            className=" border-[1px] border-azul bg-white text-azul"
            placeholder="Voltar"
          ></Button>
        </Link>
      </div>
      <PopUpDelete></PopUpDelete>
    </div>
  );
}

"use client";
import React from "react";
import Button from "@/components/Button/button";
import { FormData } from "@/components/FormData";
import {
  GenericField,
  GenericPasswordField,
} from "@/components/FormData/Input";
import Link from "next/link";

export default function RedefinirSenha() {
  const [data, setData] = React.useState({
    novaSenha: "",
    confirmarSenha: "",
  });

  const column = [
    {
      name: "novaSenha",
      label: "Nova senha",
      placeholder: "",
      component: GenericPasswordField,
    },
    {
      name: "confirmarSenha",
      label: "Confirmar senha",
      placeholder: "",
      component: GenericPasswordField,
    },
  ];

  const onSubmit = (data: any) => {};
  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full">
      <h1 className="text-[26px] font-[600] text-cinza_azulado">
        Redefinir Senha
      </h1>
      <FormData.Root className="flex gap-8 h-auto w-[84%]" onSubmit={onSubmit}>
        <FormData.Form
          columns={column}
          id="formQuestion"
          className="flex flex-col gap-4 w-full flex-1"
        ></FormData.Form>
      </FormData.Root>
      <Link href={"/Login"} className="w-[84%]">
        <Button placeholder="Redefinir"></Button>
      </Link>
    </div>
  );
}

"use client";
import React from "react";
import Button from "@/components/Button/button";
import { FormData } from "@/components/FormData";
import {
  GenericField,
  GenericPasswordField,
} from "@/components/FormData/Input";
import Link from "next/link";

export default function Login() {
  const [data, setData] = React.useState({
    email: "",
    senha: "",
  });

  const column = [
    {
      name: "email",
      label: "E-mail",
      component: GenericField,
    },
    {
      name: "senha",
      label: "Senha",
      component: GenericPasswordField,
    },
  ];

  const onSubmit = (data: any) => {};
  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full">
      <h1 className="text-[26px] font-[600] text-cinza_azulado">Login</h1>
      <FormData.Root
        initialValues={data}
        className="flex gap-8 h-auto w-[84%]"
        onSubmit={onSubmit}
      >
        <FormData.Form
          columns={column}
          id="formQuestion"
          className="flex flex-col gap-4 w-full flex-1"
        >
          <Link href={"/EsqueciSenha"} className="self-center mt-[-15px]">
            <p className="text-azul">Esqueci minha senha</p>
          </Link>
        </FormData.Form>
      </FormData.Root>
      <Button
        form="formQuestion"
        className="w-[84%]"
        placeholder="Entrar"
      ></Button>
    </div>
  );
}

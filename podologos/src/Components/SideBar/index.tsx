"use client";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import Hamburguer from "@/assets/Hamburguer.svg";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LogOut from "@/assets/LogOut.svg";

export default function SideBar() {
  const sm640 = useMediaQuery("(max-width: 640px)");
  const [show, setShow] = useState(false);
  const [path, setpath] = useState(usePathname().split("/")[1]);
  const router = useRouter();

  return (
    <>
      <Image
        src={Hamburguer}
        alt=""
        className="absolute left-5 top-[34px] z-50"
        style={{
          display: sm640 ? "block" : "none",
          transform: show && sm640 ? "rotate(-90deg)" : "rotate(0deg)",
          transition: "all 0.2s ease",
        }}
        onClick={() => {
          setShow(!show);
        }}
      />
      <div
        id="sidebar"
        className="min-w-[100vw] fixed sm:static z-40 flex flex-col h-full sm:min-w-[200px] lg:w-[clamp(250px,22vw,300px)] lg:min-w-[200px] bg-white shadow-lg shadow-cinza px-8"
        style={{
          transform: !show && sm640 ? "translateX(-100%)" : "translateX(0)",
          transition: "all 0.2s ease",
        }}
      >
        <h1 className="text-2xl font-bold mt-20">
          Bem-vindo <br />
          Gustavo
        </h1>
        <div className="flex flex-col gap-4 mt-8">
          <button
            className={`font-[550] text-start text-${
              path === "PodologosCadastrados" ? "azul" : "black"
            }`}
            onClick={() => {
              router.push("/PodologosCadastrados");
              setpath("PodologosCadastrados");
              setShow(false);
            }}
          >
            Home
          </button>
          <button
            className={`font-[550] text-start text-${
              path === "SolicitacaoCadastro" ? "azul" : "black"
            }`}
            onClick={() => {
              router.push("/SolicitacaoCadastro");
              setpath("SolicitacaoCadastro");
              setShow(false);
            }}
          >
            Solicitações de cadastro
          </button>
          <button
            className={`font-[550] text-start text-${
              path === "Informacoes" ? "azul" : "black"
            }`}
            onClick={() => {
              router.push("/Informacoes");
              setpath("Informacoes");
              setShow(false);
            }}
          >
            Informações do aplicativo
          </button>
          <button
            className={`font-[550] text-start text-${
              path === "ListaDenuncia" ? "azul" : "black"
            }`}
            onClick={() => {
              router.push("/ListaDenuncia");
              setpath("ListaDenuncia");
              setShow(false);
            }}
          >
            Lista de denúncias
          </button>
        </div>
        <div className="flex-1 flex items-end mb-8">
          <button className="flex items-center gap-2">
            <Image src={LogOut} alt=""></Image>
            <p>Sair</p>
          </button>
        </div>
      </div>
    </>
  );
}

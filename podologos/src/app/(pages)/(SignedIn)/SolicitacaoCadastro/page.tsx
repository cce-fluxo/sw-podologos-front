"use client";
import { CustomStyles } from "@/Components/TableStyle/index";
import DataTable, { createTheme } from "react-data-table-component";
import Image from "next/image";
import PacienteImage from "@/assets/PacienteImage.svg";

export default function SolicitacaoCadastro() {
  const columns = [
    {
      name: "Nome",
      selector: (row: any) => (
        <div className="flex gap-2 items-center">
          <Image alt="" src={PacienteImage}></Image>
          <p className="whitespace-nowrap">Amaral Joaquim Cardoso</p>
        </div>
      ),
    },
    {
      name: "Formação",
      selector: (row: any) => (
        <p className="whitespace-nowrap">
          Superior em Podologia <br /> UFRJ/2022
        </p>
      ),
    },
    {
      name: "Email",
      selector: (row: any) => "amaraljoaquim@gmail.com",
    },
    {
      name: "Telefone",
      selector: (row: any) => "(21) 12345-6789",
    },
    {
      name: "CEP",
      selector: (row: any) => "12345-678",
    },
  ];

  const data = [
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col px-14 py-6 gap-3 overflow-auto">
      <h1 className="text-azul text-[30px] font-bold">
        Solicitações de cadastro
      </h1>
      <div className="shadow-lg shadow-cinza rounded-2xl">
        <DataTable
          responsive
          columns={columns}
          data={data}
          customStyles={CustomStyles}
        />
      </div>
    </div>
  );
}

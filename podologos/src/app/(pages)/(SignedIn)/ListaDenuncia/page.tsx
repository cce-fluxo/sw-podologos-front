"use client";
import { CustomStyles } from "@/Components/TableStyle/index";
import DataTable, { createTheme } from "react-data-table-component";
import Image from "next/image";
import PacienteImage from "@/assets/PacienteImage.svg";

export default function ListaDenuncia() {
  const columns = [
    {
      name: "Usuário",
      selector: (row: any) => (
        <div className="flex gap-2 items-center">
          <Image alt="" src={PacienteImage}></Image>
          <div className="flex flex-col">
            <p className="whitespace-nowrap">Amaral Joaquim Cardoso</p>
            <p className="whitespace-nowrap text-[#A4AAB2]">Podólogo</p>
          </div>
        </div>
      ),
    },
    {
      name: "Denunciado por",
      selector: (row: any) => (
        <div className="flex gap-2 items-center">
          <Image alt="" src={PacienteImage}></Image>
          <div className="flex flex-col">
            <p className="whitespace-nowrap">Amaral Joaquim Cardoso</p>
            <p className="whitespace-nowrap text-[#A4AAB2]">Paciente</p>
          </div>
        </div>
      ),
    },
    {
      name: "Data",
      selector: (row: any) => "07/03/2024",
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
      <h1 className="text-azul text-[30px] font-bold">Lista de denúncias</h1>
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

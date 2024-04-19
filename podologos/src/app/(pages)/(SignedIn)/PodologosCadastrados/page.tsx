"use client";
import { CustomStyles } from "@/Components/TableStyle/index";
import DataTable, { createTheme } from "react-data-table-component";

export default function PodologosCadastrados() {
  const columns = [
    {
      name: "Nome",
      selector: (row: any) => "Amaral Joaquim Cardoso",
    },
    {
      name: "Formação",
      selector: (row: any) => "Superior em Podologia UFRJ/2022",
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
      name: "Math",
      userTypes: "I woud like to know if I drop...",
      course: "Aug 23",
      questions: "Low",
      answers: "02",
    },
    {
      id: 1,
      name: "Math",
      userTypes: "I woud like to know if I drop...",
      course: "Aug 23",
      questions: "Low",
      answers: "02",
    },
    {
      id: 1,
      name: "Math",
      userTypes: "I woud like to know if I drop...",
      course: "Aug 23",
      questions: "Low",
      answers: "02",
    },
    {
      id: 1,
      name: "Math",
      userTypes: "I woud like to know if I drop...",
      course: "Aug 23",
      questions: "Low",
      answers: "02",
    },
    {
      id: 1,
      name: "Math",
      userTypes: "I woud like to know if I drop...",
      course: "Aug 23",
      questions: "Low",
      answers: "02",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col px-14 gap-3 overflow-auto">
      <h1 className="text-azul text-[30px] font-bold">Podólogos cadastrados</h1>
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

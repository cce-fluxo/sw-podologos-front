'use client';
import { CustomStyles } from '@/Components/TableStyle/index';
import DataTable, { createTheme } from 'react-data-table-component';
import Image from 'next/image';
import PacienteImage from '@/assets/PacienteImage.svg';

export default function SolicitacaoCadastro() {
  const columns = [
    {
      name: 'Nome',
      selector: (row: any) => (
        <div className='flex items-center gap-2'>
          <Image alt='' src={PacienteImage}></Image>
          <p className='whitespace-nowrap'>Amaral Joaquim Cardoso</p>
        </div>
      ),
    },
    {
      name: 'Formação',
      selector: (row: any) => (
        <p className='whitespace-nowrap'>
          Superior em Podologia <br /> UFRJ/2022
        </p>
      ),
    },
    {
      name: 'Email',
      selector: (row: any) => 'amaraljoaquim@gmail.com',
    },
    {
      name: 'Telefone',
      selector: (row: any) => '(21) 12345-6789',
    },
    {
      name: 'CEP',
      selector: (row: any) => '12345-678',
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
    <div className='flex h-full w-full flex-col gap-3 overflow-auto px-14 py-6'>
      <h1 className='text-[30px] font-bold text-azul'>
        Solicitações de cadastro
      </h1>
      <div className='rounded-2xl shadow-lg shadow-cinza'>
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

'use client';
import { CustomStyles } from '@/Components/TableStyle/index';
import DataTable, { createTheme } from 'react-data-table-component';
import Image from 'next/image';
import PacienteImage from '@/assets/PacienteImage.svg';

export default function ListaDenuncia() {
  const columns = [
    {
      name: 'Usuário',
      selector: (row: any) => (
        <div className='flex items-center gap-2'>
          <Image alt='' src={PacienteImage}></Image>
          <div className='flex flex-col'>
            <p className='whitespace-nowrap'>Amaral Joaquim Cardoso</p>
            <p className='whitespace-nowrap text-[#A4AAB2]'>Podólogo</p>
          </div>
        </div>
      ),
    },
    {
      name: 'Denunciado por',
      selector: (row: any) => (
        <div className='flex items-center gap-2'>
          <Image alt='' src={PacienteImage}></Image>
          <div className='flex flex-col'>
            <p className='whitespace-nowrap'>Amaral Joaquim Cardoso</p>
            <p className='whitespace-nowrap text-[#A4AAB2]'>Paciente</p>
          </div>
        </div>
      ),
    },
    {
      name: 'Data',
      selector: (row: any) => '07/03/2024',
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
      <h1 className='text-[30px] font-bold text-azul'>Lista de denúncias</h1>
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

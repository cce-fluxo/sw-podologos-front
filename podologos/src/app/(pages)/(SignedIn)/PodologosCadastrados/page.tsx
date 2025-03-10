'use client';
import { CustomStyles } from '@/Components/TableStyle/index';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import PacienteImage from '@/assets/PacienteImage.svg';
import api from '@/services/axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

export default function PodologosCadastrados() {
  const [dadosPodologos, setDadosPodologos] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

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

  const colunasTabela = [
    {
      name: 'Nome',
      selector: (row : any) => {
        return (
          <div className='flex items-center gap-2'>
            <div className="w-12 h-12 relative">
              <Image alt='' fill src={row.user.profile_picture} className="object-cover rounded-full" />
            </div>
            <p className='whitespace-nowrap'>{row.user.first_name + " " + row.user.last_name}</p>
          </div>
        )
      },
    },
    {
      name: 'Formação',
      selector: (row : any) => {
        return (
          <div className='flex flex-col items-start gap-2'>
            <p className='whitespace-nowrap'>{row.degree_type + " em Podologia"}</p>
            <p className='whitespace-nowrap'>{row.institution + "/" + row.degree_year}</p>
          </div>
        )
      },
    },
    {
      name: 'Email',
      selector: (row : any) => row.user.email,
    },
    {
      name: 'Telefone',
      selector: (row : any) => row.user.phone_number,
    },
    {
      name: 'CEP',
      selector: (row : any) => row.user.cep,
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

  const buscarPodologos = async () => {
    console.log('buscando podologos');
    setIsLoading(true);
    try {
      const response = await api.get('/doctor/medicos-autorizados');
      setDadosPodologos(response.data);
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.status);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    if (isLoading && !dadosPodologos) {
      buscarPodologos();
    }
  });

  return (
    <div className='flex h-full w-full flex-col gap-3 overflow-auto px-14 py-6'>
      <h1 className='text-[30px] font-bold text-azul'>Podólogos cadastrados</h1>
      {isLoading 
      ?
      <ReactLoading
        type="spin"
        color="#2087ed"
        height={"30px"}
        width={"30px"}
        className='m-auto'
      />
      :
      <div className='rounded-2xl shadow-lg shadow-cinza'>
        <DataTable
          responsive
          columns={colunasTabela}
          data={dadosPodologos}
          customStyles={CustomStyles}
        />
      </div>}
    </div>
  );
}

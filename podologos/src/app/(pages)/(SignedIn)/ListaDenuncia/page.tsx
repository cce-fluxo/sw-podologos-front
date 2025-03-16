'use client';
import { CustomStyles } from '@/Components/TableStyle/index';
import DataTable, { createTheme } from 'react-data-table-component';
import Image from 'next/image';
import PacienteImage from '@/assets/PacienteImage.svg';
import { useEffect, useState } from 'react';
import api from '@/services/axios';
import ReactLoading from 'react-loading';

export default function ListaDenuncia() {
  const [dadosDenuncias, setDadosDenuncias] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const colunasTabela = [
    {
      name: 'Usuário',
      selector: (row : any) => {
        if (row.is_doctor_repot) {
          // Se um médico estiver sendo denunciado
          return (
            <div className='flex items-center gap-2'>
              { row.doctor.user.profile_picture &&
              <div className="w-12 h-12 relative">
                <Image alt='' fill src={row.doctor.user.profile_picture} className="object-cover rounded-full" />
              </div>}
              <div className='flex flex-col'>
                <p className='whitespace-nowrap'>{row.doctor.user.first_name + " " + row.doctor.user.last_name}</p>
                <p className='whitespace-nowrap text-xs text-[#A4AAB2]'>Podólogo</p>
              </div>
            </div>
          );
        }
        return (
          <div className='flex items-center gap-2'>
            { row.patient.user.profile_picture &&
            <div className="w-12 h-12 relative">
              <Image alt='' fill src={row.patient.user.profile_picture} className="object-cover rounded-full" />
            </div>}
            <div className='flex flex-col'>
              <p className='whitespace-nowrap'>{row.patient.user.first_name + " " + row.patient.user.last_name}</p>
              <p className='whitespace-nowrap text-xs text-[#A4AAB2]'>Paciente</p>
            </div>
          </div>
        );
      },
    },
    {
      name: 'Denunciado por',
      selector: (row : any) => {
        if (row.is_doctor_repot) {
          // Se um médico estiver sendo denunciado
          return (
            <div className='flex items-center gap-2'>
              { row.patient.user.profile_picture &&
              <div className="w-12 h-12 relative">
                <Image alt='' fill src={row.patient.user.profile_picture} className="object-cover rounded-full" />
              </div>}
              <div className='flex flex-col'>
                <p className='whitespace-nowrap'>{row.patient.user.first_name + " " + row.patient.user.last_name}</p>
                <p className='whitespace-nowrap text-xs text-[#A4AAB2]'>Paciente</p>
              </div>
            </div>
          );
        }

        return (
          <div className='flex items-center gap-2'>
            { row.doctor.user.profile_picture &&
            <div className="w-12 h-12 relative">
              <Image alt='' fill src={row.doctor.user.profile_picture} className="object-cover rounded-full" />
            </div>}
            <div className='flex flex-col'>
              <p className='whitespace-nowrap'>{row.doctor.user.first_name + " " + row.doctor.user.last_name}</p>
              <p className='whitespace-nowrap text-xs text-[#A4AAB2]'>Podólogo</p>
            </div>
          </div>
        )
      },
    },
    {
      name: 'Data',
      selector: (row : any) => new Date(row.CreatedAt).toLocaleDateString(),
    },
  ];

  const buscarDenuncias = async () => {
    console.log('buscando Denuncias');
    setIsLoading(true);
    try {
      const response = await api.get('/report');
      setDadosDenuncias(response.data);
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.status);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    if (isLoading && !dadosDenuncias) {
      buscarDenuncias();
    }
  });

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

  return (
    <div className='flex h-full w-full flex-col gap-3 overflow-auto px-14 py-6'>
      <h1 className='text-[30px] font-bold text-azul'>Lista de denúncias</h1>
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
          data={dadosDenuncias}
          customStyles={CustomStyles}
        />
      </div>}
    </div>
  );
}

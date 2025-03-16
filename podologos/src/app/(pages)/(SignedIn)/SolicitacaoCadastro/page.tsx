'use client';
import { CustomStyles } from '@/Components/TableStyle/index';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/services/axios';
import ReactLoading from 'react-loading';
import Button from '@/Components/Button/button';
import { ModalInfoPodologo } from '@/Components/popUps/ModalInfoPodologo';

export default function SolicitacaoCadastro() {
  const [dadosPodologos, setDadosPodologos] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctorInfo, setSelectedDoctorInfo] = useState();
  const [loadingAceitarCadastro, setLoadingAceitarCadastro] = useState(false);
  const [modalInfoPodologo, setModalInfoPodologo] = useState(false);

  const colunasTabela = [
    {
      name: 'Nome',
      selector: (row : any) => {
        return (
          <div className='flex items-center gap-2'>
            { row.user.profile_picture &&
            <div className="w-12 h-12 relative">
              <Image alt='' fill src={row.user.profile_picture} className="object-cover rounded-full" />
            </div>}
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

  const handleRowClick = async (row: any) => {
    console.log(row);
    setSelectedDoctorInfo(row);
    setModalInfoPodologo(true);
  }

  const buscarPodologos = async () => {
    console.log('buscando podologos');
    setIsLoading(true);
    try {
      const response = await api.get('/doctor/medicos-nao-autorizados');
      setDadosPodologos(response.data);
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.status);
    }
    setIsLoading(false);
  };

  const autorizarPodologo = async () => {
    setLoadingAceitarCadastro(true);
    try {
      if (!selectedDoctorInfo) {
        throw new Error('Selecione um médico');
      }
      const response = await api.patch(`/doctor/autorizar-medico/${selectedDoctorInfo.doctor_id}`);
      setModalInfoPodologo(false);
      setSelectedDoctorInfo(undefined);
      buscarPodologos();
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.status);
    }
    setLoadingAceitarCadastro(false);
  };
  
  useEffect(() => {
    if (isLoading && !dadosPodologos) {
      buscarPodologos();
    }
  });

  return (
    <>
    <ModalInfoPodologo 
      selectedDoctorInfo={selectedDoctorInfo}  
      loadingAceitarCadastro={loadingAceitarCadastro}
      visible={modalInfoPodologo}
      fecharModal={setModalInfoPodologo}
      autorizarPodologo={autorizarPodologo}
    />
    <div className='flex h-full w-full flex-col gap-3 overflow-auto px-14 py-6'>
      <h1 className='text-[30px] font-bold text-azul'>
        Solicitações de cadastro
      </h1>
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
          onRowClicked={handleRowClick}
          pointerOnHover
        />
        </div>}
    </div>
    </>
  );
}

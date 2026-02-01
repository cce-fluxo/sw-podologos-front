'use client';
import { CustomStyles } from '@/Components/TableStyle/index';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import PacienteImage from '@/assets/PacienteImage.svg';
import { useEffect, useState } from 'react';
import api from '@/services/axios';
import ReactLoading from 'react-loading';
import { ModalInfoDenuncia } from '@/Components/popUps/ModalInfoDenuncia';

export default function ListaDenuncia() {
  const [dadosDenuncias, setDadosDenuncias] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReportInfo, setSelectedReportInfo] = useState();
  const [loadingExcluirPodologo, setLoadingExcluirPodologo] = useState(false);
  const [modalInfoReport, setModalInfoReport] = useState(false);

  const colunasTabela = [
    {
      name: 'Usuário',
      selector: (row : any) => {
        if (row.is_doctor_report) {
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
        if (row.is_doctor_report) {
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

  const handleRowClick = async (row: any) => {
    console.log(row);
    setSelectedReportInfo(row);
    setModalInfoReport(true);
  }

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

  // Componente customizado para quando não há dados
  const CustomNoDataComponent = () => (
    <div className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-100">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma denúncia</h3>
      <p className="text-gray-500">Nenhum usuário fez uma denúncia no momento.</p>
    </div>
  );

  return (
    <>
      <ModalInfoDenuncia
        selectedReportInfo={selectedReportInfo}  
        loadingAceitarCadastro={loadingExcluirPodologo}
        visible={modalInfoReport}
        fecharModal={setModalInfoReport}
        excluirPodologo={() => {}}
      />
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
            noDataComponent={<CustomNoDataComponent />}
            columns={colunasTabela}
            data={dadosDenuncias}
            customStyles={CustomStyles}
            onRowClicked={handleRowClick}
            pointerOnHover
          />
        </div>}
      </div>
    </>
  );
}

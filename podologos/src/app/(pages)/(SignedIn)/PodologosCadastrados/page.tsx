'use client';
import { CustomStyles } from '@/Components/TableStyle/index';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import api from '@/services/axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { ModalInfoPodologo } from '@/Components/popUps/ModalInfoPodologo';

interface DadosPodologo {
  degree_type: string;
  institution: string;
  degree_year: string;
  degree_photo: string;
  doctor_id: string;
  user: {
    profile_picture: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    cep: string
  }
}

export default function PodologosCadastrados() {
  const [dadosPodologos, setDadosPodologos] = useState<DadosPodologo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctorInfo, setSelectedDoctorInfo] = useState<DadosPodologo | null>(null);
  const [modalInfoPodologo, setModalInfoPodologo] = useState(false);

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

  const buscarPodologos = async () => {
    console.log('buscando podologos');
    setIsLoading(true);
    try {
      const response = await api.get('/doctor/medicos-autorizados');
      console.log(response.data)
      setDadosPodologos(response.data);
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.status);
    }
    setIsLoading(false);
  };

  const handleRowClick = async (row: any) => {
    console.log(row);
    setSelectedDoctorInfo(row);
    setModalInfoPodologo(true);
  }
  
  useEffect(() => {
    buscarPodologos();
  }, []);

  // Componente customizado para quando não há dados
  const CustomNoDataComponent = () => (
    <div className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-100">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum podólogo</h3>
      <p className="text-gray-500">Não há podólogo cadastrados no momento. Cheque as solicitações.</p>
    </div>
  );

  return (
    <>
      <ModalInfoPodologo 
        selectedDoctorInfo={selectedDoctorInfo}  
        visible={modalInfoPodologo}
        loadingAceitarCadastro
        fecharModal={setModalInfoPodologo}
      />
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
              columns={colunasTabela}
              noDataComponent={<CustomNoDataComponent />}
              data={dadosPodologos}
              customStyles={CustomStyles}
              onRowClicked={handleRowClick}
              pagination
              paginationPerPage={8}
              paginationRowsPerPageOptions={[8, 20, 30, 50]}
              progressPending={isLoading}
              progressComponent={
                  <div className="flex justify-center items-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azul"></div>
                  </div>
              }
              striped
              highlightOnHover
              pointerOnHover
              responsive
              dense={false}
              paginationComponentOptions={{
                  rowsPerPageText: 'Linhas por página:',
                  rangeSeparatorText: 'de',
                  noRowsPerPage: false,
                  selectAllRowsItem: false,
              }}
          />
        </div>}
      </div>
    </>
  );
}

'use client';
import { CustomStyles } from '@/Components/TableStyle/index';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/services/axios';
import ReactLoading from 'react-loading';
import { ModalInfoPodologo } from '@/Components/popUps/ModalInfoPodologo';
import ModalSimNao from '@/Components/popUps/ModalSimNao';
import ModalCheck from '@/Components/popUps/ModalCheck';
import { toast } from 'react-toastify';

// Interface do que temos nas colunas
interface Column {
  name: string;
  selector?: (row: DadosPodologo) => string;
  cell?: (row: DadosPodologo) => JSX.Element | null;
  width?: string;
  sortable?: boolean;
}

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

export default function SolicitacaoCadastro() {
  const [dadosPodologos, setDadosPodologos] = useState<DadosPodologo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctorInfo, setSelectedDoctorInfo] = useState<DadosPodologo | null>(null);
  const [loadingAceitarCadastro, setLoadingAceitarCadastro] = useState(false);
  const [modalInfoPodologo, setModalInfoPodologo] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [modalCheck, setModalCheck] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [loadingAcao, setLoadingAcao] = useState(false);

  const colunasTabela: Column[] = [
    {
      name: 'Foto',
      width: '100px',
      selector: (row: DadosPodologo) => row.user.first_name,
      cell: (row: DadosPodologo) => (
        row.user.profile_picture ? (
          <div className="w-12 h-12 relative" 
          onClick={() => handleRowClick(row)}>
            <Image alt='' fill src={row.user.profile_picture} className="object-cover rounded-full" />
          </div>
        ) : null
      ),
    },
    {
      name: 'Nome',
      selector: (row: DadosPodologo) => row.user.first_name,
      cell: (row : DadosPodologo) => {
        return (
          <p className='whitespace-nowrap'>{row.user.first_name + " " + row.user.last_name}</p>
        )
      },
      sortable: true
    },
    {
      name: 'Formação',
      selector: (row: DadosPodologo) => row.user.first_name,
      width: '250px', // largura mínima
      cell: (row : DadosPodologo) => {
        return (
          <div className='flex flex-col items-start gap-2 py-3 min-w-[200px]' 
            onClick={() => handleRowClick(row)}>
            <p className='whitespace-nowrap'>{row.degree_type + " em Podologia"}</p>
            <p className='whitespace-break-spaces'>{row.institution + "/" + row.degree_year}</p>
          </div>
        )
      }
    },
    {
      name: 'Email',
      selector: (row : DadosPodologo) => row.user.email,
      sortable: true
    },
    {
      name: 'Telefone',
      selector: (row : DadosPodologo) => row.user.phone_number,
      sortable: true
    },
    {
      name: 'CEP',
      selector: (row : DadosPodologo) => row.user.cep,
      sortable: true
    },
  ];

  // Função quando clica em OK no modal de check
  const handleFecharModalCheck = () => {
    setModalCheck(false); // Fecha modal de check
  };

  const handleRowClick = async (row: any) => {
    console.log(row);
    setSelectedDoctorInfo(row);
    setModalInfoPodologo(true);
  }

  // Função quando clica em NÃO no modal de confirmação
  const handleCancelarAcao = () => {
    setModalConfirmacao(false); // Fecha modal de confirmação
    setModalInfoPodologo(true);
  };

  
  // Função quando clica em SIM no modal de confirmação
  const handleConfirmarAcao = async () => {
    if (!selectedDoctorInfo) return;
    
    setLoadingAcao(true);
    try {
      console.log('ID do reporte', selectedDoctorInfo);

      const endpoint = `/doctor/delete/${selectedDoctorInfo?.doctor_id}`;
      const mensagem = 'Podólogo excluído com sucesso!';
      console.log(endpoint)
      
      // Chamada à API
      await api.delete(endpoint);
      
      // Fecha o modal de confirmação e abre o modal de check
      setModalConfirmacao(false);
      setMensagemSucesso(mensagem);
      setModalCheck(true);
      
      // Recarrega os dados
      buscarPodologos();
      
    } catch (error) {
      console.error('Erro ao executar ação:', error);
      toast.error('Erro ao recusar podólogo')
    } finally {
      setLoadingAcao(false);
    }
  };

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
      setSelectedDoctorInfo(null);
      buscarPodologos();
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.status);
    }
    setLoadingAceitarCadastro(false);
  };
  
  const recusarPodologo = async () => {
    setLoadingAceitarCadastro(true);
    try {
      if (!selectedDoctorInfo) {
        throw new Error('Selecione um médico');
      }
      
      setModalInfoPodologo(false)
      setModalConfirmacao(true);

    } catch (err: any) {
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.status);
    }
    setLoadingAceitarCadastro(false);
  };
  
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
      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma solicitação</h3>
      <p className="text-gray-500">Não há solicitações de cadastro pendentes no momento.</p>
    </div>
  );

  return (
    <>
      <ModalInfoPodologo 
        selectedDoctorInfo={selectedDoctorInfo}  
        loadingAceitarCadastro={loadingAceitarCadastro}
        visible={modalInfoPodologo}
        fecharModal={setModalInfoPodologo}
        autorizarPodologo={autorizarPodologo}
        recusarPodologo={recusarPodologo}
        modalDeAceitarPodologo
      />

      {/* Modal de Confirmação (Sim/Não) */}
      <ModalSimNao
        isOpen={modalConfirmacao}
        onYesClick={handleConfirmarAcao}
        onNoClick={handleCancelarAcao}
        text={`Tem certeza que deseja excluir o podólogo ${selectedDoctorInfo?.user?.first_name} ${selectedDoctorInfo?.user?.last_name}? Esta ação é irreversível.`}
      />

      {/* Modal de Check (Sucesso) */}
      <ModalCheck
        isOpen={modalCheck}
        mensagem={mensagemSucesso}
        onNoClick={handleFecharModalCheck}
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
              selectableRows={false} 
              selectableRowsHighlight={false}
              selectableRowsNoSelectAll={false}
            />
          </div>
        }
      </div>
    </>
  );
}
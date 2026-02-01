'use client';
import { CustomStyles } from '@/Components/TableStyle/index';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/services/axios';
import ReactLoading from 'react-loading';
import { ModalInfoDenuncia } from '@/Components/popUps/ModalInfoDenuncia';
import { ModalApenasInfoUser } from '@/Components/popUps/ModalApenasInfoUser';
import ModalSimNao from '@/Components/popUps/ModalSimNao';
import ModalCheck from '@/Components/popUps/ModalCheck';

export default function ListaDenuncia() {
  // Estados para dados e loading
  const [dadosDenuncias, setDadosDenuncias] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para os modais
  const [selectedReportInfo, setSelectedReportInfo] = useState<any>(null);
  const [selectedUserInfo, setSelectedUserInfo] = useState<any>(null);
  
  // Visibilidade dos modais
  const [modalInfoReport, setModalInfoReport] = useState(false);
  const [modalUserInfo, setModalUserInfo] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [modalCheck, setModalCheck] = useState(false);
  
  // Estados para controlar o tipo de ação
  const [acaoTipo, setAcaoTipo] = useState<'excluir_podologo' | 'excluir_denuncia' | null>(null);
  const [loadingAcao, setLoadingAcao] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const colunasTabela = [
    {
      name: 'Usuário',
      selector: (row: any) => {
        if (row.is_doctor_report) {
          return (
            <div className='flex items-center gap-2'>
              {row.doctor?.user?.profile_picture && (
                <div className="w-12 h-12 relative">
                  <Image 
                    alt='' 
                    fill 
                    src={row.doctor.user.profile_picture} 
                    className="object-cover rounded-full" 
                  />
                </div>
              )}
              <div className='flex flex-col'>
                <p className='whitespace-nowrap'>{row.doctor?.user?.first_name || ''} {row.doctor?.user?.last_name || ''}</p>
                <p className='whitespace-nowrap text-xs text-[#A4AAB2]'>Podólogo</p>
              </div>
            </div>
          );
        }
        return (
          <div className='flex items-center gap-2'>
            {row.patient?.user?.profile_picture && (
              <div className="w-12 h-12 relative">
                <Image 
                  alt='' 
                  fill 
                  src={row.patient.user.profile_picture} 
                  className="object-cover rounded-full" 
                />
              </div>
            )}
            <div className='flex flex-col'>
              <p className='whitespace-nowrap'>{row.patient?.user?.first_name || ''} {row.patient?.user?.last_name || ''}</p>
              <p className='whitespace-nowrap text-xs text-[#A4AAB2]'>Paciente</p>
            </div>
          </div>
        );
      },
    },
    {
      name: 'Denunciado por',
      selector: (row: any) => {
        if (row.is_doctor_report) {
          return (
            <div className='flex items-center gap-2'>
              {row.patient?.user?.profile_picture && (
                <div className="w-12 h-12 relative">
                  <Image 
                    alt='' 
                    fill 
                    src={row.patient.user.profile_picture} 
                    className="object-cover rounded-full" 
                  />
                </div>
              )}
              <div className='flex flex-col'>
                <p className='whitespace-nowrap'>{row.patient?.user?.first_name || ''} {row.patient?.user?.last_name || ''}</p>
                <p className='whitespace-nowrap text-xs text-[#A4AAB2]'>Paciente</p>
              </div>
            </div>
          );
        }
        return (
          <div className='flex items-center gap-2'>
            {row.doctor?.user?.profile_picture && (
              <div className="w-12 h-12 relative">
                <Image 
                  alt='' 
                  fill 
                  src={row.doctor.user.profile_picture} 
                  className="object-cover rounded-full" 
                />
              </div>
            )}
            <div className='flex flex-col'>
              <p className='whitespace-nowrap'>{row.doctor?.user?.first_name || ''} {row.doctor?.user?.last_name || ''}</p>
              <p className='whitespace-nowrap text-xs text-[#A4AAB2]'>Podólogo</p>
            </div>
          </div>
        );
      },
    },
    {
      name: 'Data',
      selector: (row: any) => new Date(row.CreatedAt).toLocaleDateString(),
    },
  ];

  // Função para abrir modal de confirmação
  const abrirModalConfirmacao = (tipo: 'excluir_podologo' | 'excluir_denuncia') => {
    setAcaoTipo(tipo);
    setModalInfoReport(false); // Fecha o modal de denúncia
    setModalConfirmacao(true); // Abre o modal de confirmação
  };

  // Função quando clica em SIM no modal de confirmação
  const handleConfirmarAcao = async () => {
    if (!selectedReportInfo || !acaoTipo) return;
    
    setLoadingAcao(true);
    try {
      let endpoint = '';
      let mensagem = '';
      
      if (acaoTipo === 'excluir_podologo') {
        endpoint = `/doctor/${selectedReportInfo.doctor_id}`;
        mensagem = 'Podólogo excluído com sucesso!';
      } else {
        endpoint = `/report/${selectedReportInfo.id}`;
        mensagem = 'Denúncia excluída com sucesso!';
      }
      
      // Chamada à API
      await api.delete(endpoint);
      
      // Define a mensagem de sucesso
      setMensagemSucesso(mensagem);
      
      // Fecha o modal de confirmação e abre o modal de check
      setModalConfirmacao(false);
      setModalCheck(true);
      
      // Recarrega os dados
      buscarDenuncias();
      
    } catch (error) {
      console.error('Erro ao executar ação:', error);
      setMensagemSucesso('Erro ao processar a solicitação.');
      setModalConfirmacao(false);
      setModalCheck(true);
    } finally {
      setLoadingAcao(false);
    }
  };

  // Função quando clica em NÃO no modal de confirmação
  const handleCancelarAcao = () => {
    setModalConfirmacao(false); // Fecha modal de confirmação
    setModalInfoReport(true);   // Volta para o modal de denúncia
  };

  // Função quando clica em OK no modal de check
  const handleFecharModalCheck = () => {
    setModalCheck(false); // Fecha modal de check
    
    // Se ainda tiver o modal de denúncia para reabrir
    if (selectedReportInfo) {
      setModalInfoReport(true);
    }
  };

  // Função para mostrar informações do usuário
  const handleShowUserInfo = (usuario: any) => {
    setSelectedUserInfo(usuario);
    setModalInfoReport(false);
    setModalUserInfo(true);
  };

  // Função para fechar o modal de informações do usuário
  const handleCloseUserInfo = () => {
    setModalUserInfo(false);
    setModalInfoReport(true);
  };

  const handleRowClick = async (row: any) => {
    setSelectedReportInfo(row);
    setModalInfoReport(true);
  };

  const buscarDenuncias = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/report');
      setDadosDenuncias(response.data);
    } catch (err: any) {
      console.error('Erro ao buscar denúncias:', err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading && !dadosDenuncias) {
      buscarDenuncias();
    }
  }, [isLoading, dadosDenuncias]);

  // Textos para o modal de confirmação baseados no tipo de ação
  const getTextoConfirmacao = () => {
    switch (acaoTipo) {
      case 'excluir_podologo':
        return 'Tem certeza que deseja excluir este podólogo? Esta ação é irreversível.';
      case 'excluir_denuncia':
        return 'Tem certeza que deseja excluir esta denúncia? Esta ação é irreversível.';
      default:
        return 'Tem certeza que deseja prosseguir?';
    }
  };

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
      {/* Modal de Informações da Denúncia */}
      {modalInfoReport && selectedReportInfo && (
        <ModalInfoDenuncia
          selectedReportInfo={selectedReportInfo}
          loadingExcluir={loadingAcao}
          visible={modalInfoReport}
          fecharModal={setModalInfoReport}
          excluirPodologo={() => abrirModalConfirmacao('excluir_podologo')}
          excluirDenuncia={() => abrirModalConfirmacao('excluir_denuncia')}
          onShowUserInfo={handleShowUserInfo}
        />
      )}

      {/* Modal de Informações do Usuário */}
      {modalUserInfo && selectedUserInfo && (
        <ModalApenasInfoUser
          selectedUserInfo={selectedUserInfo}
          visible={modalUserInfo}
          fecharModal={handleCloseUserInfo}
        />
      )}

      {/* Modal de Confirmação (Sim/Não) */}
      <ModalSimNao
        isOpen={modalConfirmacao}
        onYesClick={handleConfirmarAcao}
        onNoClick={handleCancelarAcao}
        text={getTextoConfirmacao()}
      />

      {/* Modal de Check (Sucesso) */}
      <ModalCheck
        isOpen={modalCheck}
        mensagem={mensagemSucesso}
        onNoClick={handleFecharModalCheck}
      />

      <div className='flex h-full w-full flex-col gap-3 overflow-auto px-14 py-6'>
        <h1 className='text-[30px] font-bold text-azul'>Lista de denúncias</h1>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <ReactLoading
              type="spin"
              color="#2087ed"
              height={"30px"}
              width={"30px"}
            />
          </div>
        ) : (
          <div className='rounded-2xl shadow-lg shadow-cinza overflow-hidden'>
            <DataTable
              responsive
              noDataComponent={<CustomNoDataComponent />}
              columns={colunasTabela}
              data={dadosDenuncias}
              customStyles={CustomStyles}
              onRowClicked={handleRowClick}
              pointerOnHover
            />
          </div>
        )}
      </div>
    </>
  );
}
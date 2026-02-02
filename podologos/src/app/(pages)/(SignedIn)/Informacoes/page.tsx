'use client';
import Informacao from '@/Components/Informacao';
import Paciente from '@/Assets/Paciente.svg';
import Podologo from '@/Assets/Podologo.svg';
import Calendario from '@/Assets/Calendario.svg';
import CalendarioCheck from '@/Assets/CalendarioCheck.svg';
import Estrela from '@/Assets/Estrela.svg';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import api from '@/services/axios';

interface InformacoesSobreOApp {
  numeroUsuarios: { _all: number; patient_id: number; doctor_id: number };
  numeroUsuarioUltimoMes: { _all: number; patient_id: number; doctor_id: number };
  consultasAceitas: number;
  consultasAceitasUltimoMes: number;
  consultasConcluidas: number;
  consultasConcluidasUltimoMes: number;
  podologosExcelentes: number;
  podologosRuins: number;
}

export default function Informacoes() {
  const [isLoading, setIsLoading] = useState(true);
  const [infoApp, setInfoApp] = useState<InformacoesSobreOApp>({
    numeroUsuarios: { _all: 0, patient_id: 0, doctor_id: 0 },
    numeroUsuarioUltimoMes: { _all: 0, patient_id: 0, doctor_id: 0 },
    consultasAceitas: 0,
    consultasAceitasUltimoMes: 0,
    consultasConcluidas: 0,
    consultasConcluidasUltimoMes: 0,
    podologosExcelentes: 0,
    podologosRuins: 0
  });

  const buscarInfo = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/getInfo');
      setInfoApp(response.data);
    } catch (err: any) {
      console.error('Erro ao buscar informações:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    buscarInfo();
  }, []); // Array vazio executa apenas uma vez

  return (
    <div className='flex h-full w-full flex-col gap-3 overflow-auto px-14 py-6'>
      <h1 className='text-2xl font-bold text-azul lg:text-3xl'>
        Informações do aplicativo
      </h1>
      
      {isLoading ? (
        <div className='flex flex-1 items-center justify-center'>
          <ReactLoading
            type='spin'
            color='#2087ed'
            height={40}
            width={40}
          />
        </div>
      ) : (
        <div className='mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          <Informacao
            imagem={Paciente}
            numero={infoApp.numeroUsuarios.patient_id}
            texto='Pacientes'
            ultimoMes={infoApp.numeroUsuarioUltimoMes.patient_id}
          />
          <Informacao
            imagem={Podologo}
            numero={infoApp.numeroUsuarios.doctor_id}
            texto='Podólogos'
            ultimoMes={infoApp.numeroUsuarioUltimoMes.doctor_id}
          />
          <Informacao
            imagem={Calendario}
            numero={infoApp.consultasAceitas}
            texto='Consultas aceitas'
            ultimoMes={infoApp.consultasAceitasUltimoMes}
          />
          <Informacao
            imagem={CalendarioCheck}
            numero={infoApp.consultasConcluidas}
            texto='Consultas realizadas'
            ultimoMes={infoApp.consultasConcluidasUltimoMes}
          />
          <Informacao
            imagem={Estrela}
            numero={infoApp.podologosExcelentes}
            texto='Podólogos 5 estrelas'
            tresImagens={true}
          />
          <Informacao
            imagem={Estrela}
            numero={infoApp.podologosRuins}
            texto='Podólogos abaixo de 3 estrelas'
          />
        </div>
      )}
    </div>
  );
}
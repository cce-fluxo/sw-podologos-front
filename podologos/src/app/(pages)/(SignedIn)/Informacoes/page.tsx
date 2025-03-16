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

export default function Informacoes() {
  const [isLoading, setIsLoading] = useState(false);
  const [jaObteveDados, setJaObteveDados] = useState(false);
  const [infoApp, setInfoApp] = useState(
    {
      numeroUsuarios: { _all: 0, patient_id: 0, doctor_id: 0 },
      numeroUsuarioUltimoMes: { _all: 0, patient_id: 0, doctor_id: 0 },
      consultasAceitas: 0,
      consultasAceitasUltimoMes: 0,
      consultasConcluidas: 0,
      consultasConcluidasUltimoMes: 0,
      podologosExcelentes: 0,
      podologosRuins: 0
    }
  );

  const buscarInfo = async () => {
    console.log('buscando info');
    setIsLoading(true);
    try {
      const response = await api.get('/admin/getInfo');
      setInfoApp(response.data);
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.status);
    }
    setJaObteveDados(true);
    setIsLoading(false);
  };

  useEffect(() => {
      if (!isLoading && !jaObteveDados) {
        buscarInfo();
      }
    });

  return (
    <div className='flex h-full w-full flex-col gap-3 overflow-auto px-14 py-6'>
      <h1 className='text-[30px] font-bold text-azul'>
        Informações do aplicativo
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
      <div className='mb-10 flex flex-1 flex-wrap gap-10'>
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
      </div>}
    </div>
  );
}

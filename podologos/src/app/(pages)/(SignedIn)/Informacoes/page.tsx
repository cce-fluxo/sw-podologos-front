import Informacao from '@/Components/Informacao';
import Paciente from '@/Assets/Paciente.svg';
import Podologo from '@/Assets/Podologo.svg';
import Calendario from '@/Assets/Calendario.svg';
import CalendarioCheck from '@/Assets/CalendarioCheck.svg';
import Estrela from '@/Assets/Estrela.svg';

export default function Informacoes() {
  return (
    <div className='flex h-full w-full flex-col gap-3 overflow-auto px-14 py-6'>
      <h1 className='text-[30px] font-bold text-azul'>
        Informações do aplicativo
      </h1>
      <div className='mb-10 flex flex-1 flex-wrap gap-10'>
        <Informacao
          imagem={Paciente}
          numero={1.234}
          texto='Pacientes'
          ultimoMes='46 no último mês'
        ></Informacao>
        <Informacao
          imagem={Podologo}
          numero={910}
          texto='Podólogos'
          ultimoMes='302 no último mês'
        ></Informacao>
        <Informacao
          imagem={Calendario}
          numero={2.345}
          texto='Consultas aceitas'
          ultimoMes='687 no último mês'
        ></Informacao>
        <Informacao
          imagem={CalendarioCheck}
          numero={2.147}
          texto='Consultas realizadas'
          ultimoMes='642 no último mês'
        ></Informacao>
        <Informacao
          imagem={Estrela}
          numero={750}
          texto='Podólogos 5 estrelas'
          ultimoMes='284 no último mês'
          tresImagens={true}
        ></Informacao>
        <Informacao
          imagem={Estrela}
          numero={160}
          texto='Podólogos abaixo de 3 estrelas'
          ultimoMes='52 no último mês'
        ></Informacao>
      </div>
    </div>
  );
}

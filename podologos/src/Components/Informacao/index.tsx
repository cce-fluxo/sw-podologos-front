import Image from 'next/image';

interface InformacaoProps {
  imagem: any;
  numero: number;
  texto: string;
  ultimoMes?: number | undefined;
  tresImagens?: boolean;
}

export default function Informacao({
  imagem,
  numero,
  texto,
  ultimoMes = undefined,
  tresImagens,
}: InformacaoProps) {
  return (
    <div className='flex h-[285px] w-[330px] flex-col items-center justify-center gap-1 rounded-2xl shadow-md shadow-cinza'>
      <div className='flex gap-2'>
        <Image
          className={`${tresImagens === true ? 'flex' : 'hidden'}`}
          src={imagem}
          alt=''
        ></Image>
        <Image src={imagem} alt=''></Image>
        <Image
          className={`${tresImagens === true ? 'flex' : 'hidden'}`}
          src={imagem}
          alt=''
        ></Image>
      </div>
      <p className='text-[20px] font-extrabold text-azul'>{numero}</p>
      <p className='font-semibold text-cinzaTexto'>{texto}</p>
      { ultimoMes !== undefined &&
        <p className='text-[12px] font-semibold text-cinzaTextoClaro'>
          {ultimoMes} no último mês
        </p>
      }
    </div>
  );
}

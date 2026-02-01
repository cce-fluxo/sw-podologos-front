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
    <div className='flex h-[285px] min-w-[330px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 shadow-md shadow-cinza'>
      <div className='flex items-center justify-center gap-2'>
        {tresImagens ? (
          <>
            <div className='relative h-10 w-10 opacity-50'>
              <Image
                src={imagem}
                alt=''
                fill
                className='object-contain'
                sizes='40px'
              />
            </div>
            <div className='relative h-12 w-12'>
              <Image
                src={imagem}
                alt=''
                fill
                className='object-contain'
                sizes='48px'
              />
            </div>
            <div className='relative h-10 w-10 opacity-50'>
              <Image
                src={imagem}
                alt=''
                fill
                className='object-contain'
                sizes='40px'
              />
            </div>
          </>
        ) : (
          <div className='relative h-16 w-16'>
            <Image
              src={imagem}
              alt=''
              fill
              className='object-contain'
              sizes='64px'
            />
          </div>
        )}
      </div>
      <p className='text-4xl font-extrabold text-azul'>
        {numero.toLocaleString('pt-BR')}
      </p>
      <p className='text-center font-semibold text-cinzaTexto'>{texto}</p>
      {ultimoMes !== undefined && ultimoMes > 0 && (
        <p className='text-xs font-semibold text-cinzaTextoClaro'>
          +{ultimoMes} no último mês
        </p>
      )}
      {ultimoMes !== undefined && ultimoMes === 0 && (
        <p className='text-xs font-semibold text-cinzaTextoClaro'>
          Nenhum no último mês
        </p>
      )}
    </div>
  );
}
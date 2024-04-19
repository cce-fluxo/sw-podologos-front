import Image from "next/image";

interface InformacaoProps {
  imagem: any;
  numero: number;
  texto: string;
  ultimoMes: string;
}

export default function Informacao({
  imagem,
  numero,
  texto,
  ultimoMes,
}: InformacaoProps) {
  return (
    <div className="flex flex-col items-center gap-4 h-[285px] w-[330px] rounded-2xl shadow-md shadow-cinza">
      <Image src={imagem} alt=""></Image>
      <p>{numero}</p>
      <p>{texto}</p>
      <p>{ultimoMes}</p>
    </div>
  );
}

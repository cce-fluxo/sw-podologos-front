import Image from "next/image";

interface InformacaoProps {
  imagem: any;
  numero: number;
  texto: string;
  ultimoMes: string;
  tresImagens?: boolean;
}

export default function Informacao({
  imagem,
  numero,
  texto,
  ultimoMes,
  tresImagens,
}: InformacaoProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 h-[285px] w-[330px] rounded-2xl shadow-md shadow-cinza">
      <div className="flex gap-2">
        <Image
          className={`${tresImagens === true ? "flex" : "hidden"}`}
          src={imagem}
          alt=""
        ></Image>
        <Image src={imagem} alt=""></Image>
        <Image
          className={`${tresImagens === true ? "flex" : "hidden"}`}
          src={imagem}
          alt=""
        ></Image>
      </div>
      <p className="text-azul text-[20px] font-extrabold">{numero}</p>
      <p className="text-cinzaTexto font-semibold">{texto}</p>
      <p className="text-cinzaTextoClaro font-semibold text-[12px]">
        {ultimoMes}
      </p>
    </div>
  );
}

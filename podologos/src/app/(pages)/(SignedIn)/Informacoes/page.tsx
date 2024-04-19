import Informacao from "@/Components/Informacao";

export default function Informacoes() {
  return (
    <div className="w-full h-full flex flex-col px-14 gap-3 overflow-auto">
      <h1 className="text-azul text-[30px] font-bold">
        Informações do aplicativo
      </h1>
      <div className="flex-1 flex flex-wrap justify-center gap-10 mb-10">
        <Informacao></Informacao>
        <div className="h-[285px] w-[330px] rounded-2xl shadow-md shadow-cinza"></div>
        <div className="h-[285px] w-[330px] rounded-2xl shadow-md shadow-cinza"></div>
        <div className="h-[285px] w-[330px] rounded-2xl shadow-md shadow-cinza"></div>
        <div className="h-[285px] w-[330px] rounded-2xl shadow-md shadow-cinza"></div>
        <div className="h-[285px] w-[330px] rounded-2xl shadow-md shadow-cinza"></div>
      </div>
    </div>
  );
}

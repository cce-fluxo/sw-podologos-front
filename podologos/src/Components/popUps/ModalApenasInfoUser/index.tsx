import Button from "@/Components/Button/button";
import React from "react";
import Image from 'next/image';

interface InfoPodologosProps {
    selectedUserInfo: object;
    visible: boolean;
    fecharModal: (boolean: boolean) => void;
  }

export function ModalApenasInfoUser({
  selectedUserInfo,
  visible,
  fecharModal
}: InfoPodologosProps) {

    if (!visible) {
        return (<></>);
    }
  
    return(
    <div className='absolute h-screen w-full bg-[#00000031] z-50 flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center rounded-xl bg-white px-10 py-6'>
            <svg onClick={() => fecharModal(false)} 
                className='ml-auto cursor-pointer' 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
            >
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#46555A" />
            </svg>
            <h2 className='text-azul text-2xl font-bold mb-6'>Informações do {selectedUserInfo?.degree_type ? 'podólogo' : 'paciente'}</h2>
            <div className='flex flex-row items-center'>
                {
                /* Imagem */
                }
                {selectedUserInfo.user.profile_picture && 
                <div className="w-44 h-44 relative mr-6">
                    <Image alt='' fill src={selectedUserInfo.user.profile_picture} className="object-cover rounded-full" />
                </div>}
                {
                /* Info Podologo */
                }
                <div className='flex flex-col'>
                    <p className='text-left text-cinzaTexto font-semibold'>{selectedUserInfo?.user.first_name + " " + selectedUserInfo?.user.last_name}</p>
                    <p className='text-left text-cinzaTextoClaro'>{selectedUserInfo?.user.email}</p>
                    <p className='text-left text-cinzaTextoClaro'>{selectedUserInfo?.user.phone_number}</p>
                    <p className='text-left text-cinzaTextoClaro'>{selectedUserInfo?.user.cep}</p>
                    {selectedUserInfo?.degree_type &&
                    <>
                        <p className='text-left text-cinzaTextoClaro'>{selectedUserInfo?.degree_type + " em Podologia"}</p>
                        <p className='text-left text-cinzaTextoClaro'>{selectedUserInfo?.institution + "/" + selectedUserInfo?.degree_year}</p>
                    </>}
                </div>
            </div>
        </div>
    </div>
    );
}
  
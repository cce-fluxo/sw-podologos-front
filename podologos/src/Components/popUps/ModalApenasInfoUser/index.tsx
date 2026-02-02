import Button from "@/Components/Button/button";
import React from "react";
import Image from 'next/image';

interface DadosPodologo {
    degree_type: string;
    institution: string;
    degree_year: string;
    degree_photo: string;
    doctor_id: string;
    user: {
        profile_picture: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        email: string;
        cep: string
    }
}

interface InfoPodologosProps {
    selectedUserInfo: DadosPodologo;
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

    return (
    <>
      {/* Overlay escuro */}
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => fecharModal(false)}
        />
        
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10">
            <div 
            className="relative bg-white px-4 py-4 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            >
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
            <h2 className='text-azul text-2xl font-bold mb-6 text-center'>Informações do {selectedUserInfo?.degree_type ? 'podólogo' : 'paciente'}</h2>
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
    </>
    );
}

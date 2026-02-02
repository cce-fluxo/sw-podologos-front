import Button from "@/Components/Button/button";
import React from "react";
import { ClipLoader } from "react-spinners";
import Image from 'next/image';
import Link from "next/link";

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
    selectedDoctorInfo: DadosPodologo | null;
    loadingAceitarCadastro: boolean;
    visible: boolean;
    fecharModal: (boolean: boolean) => void;
    autorizarPodologo?: () => void;
    recusarPodologo?: () => void;
    modalDeAceitarPodologo?: boolean;
}

export function ModalInfoPodologo({
    selectedDoctorInfo,
    loadingAceitarCadastro,
    visible,
    fecharModal,
    autorizarPodologo = () => {},
    recusarPodologo = () => {},
    modalDeAceitarPodologo = false,
}: InfoPodologosProps) {

    if (!visible) {
        return (<></>);
    }

    return(
    <>
      {/* Overlay escuro */}
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => fecharModal}
        />
        
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10">
            <div 
            className="relative bg-white px-4 py-4 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            >
            <svg onClick={() => {
                    fecharModal(false)
                
                }} 
                className='ml-auto cursor-pointer' 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
            >
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#46555A" />
            </svg>
            <h2 className='text-azul text-2xl font-bold mb-6 text-center'>{modalDeAceitarPodologo ? 'Informações da solicitação' : 'Informações do podólogo'}</h2>
            <div className='flex flex-row items-center justify-center'>
                {
                /* Imagem */
                }
                {selectedDoctorInfo?.user.profile_picture && 
                <div className="w-44 h-44 relative mr-6">
                    <Image alt='' fill src={selectedDoctorInfo?.user.profile_picture} className="object-cover rounded-full" />
                </div>}
                {
                /* Info Podologo */
                }
                <div className='flex flex-col'>
                    <p className='text-left text-cinzaTexto font-semibold'>{selectedDoctorInfo?.user.first_name + " " + selectedDoctorInfo?.user.last_name}</p>
                    <p className='text-left text-cinzaTextoClaro'>{selectedDoctorInfo?.user.email}</p>
                    <p className='text-left text-cinzaTextoClaro'>{selectedDoctorInfo?.user.phone_number}</p>
                    <p className='text-left text-cinzaTextoClaro'>{selectedDoctorInfo?.user.cep}</p>
                    <p className='text-left text-cinzaTextoClaro'>{selectedDoctorInfo?.degree_type + " em Podologia"}</p>
                    <p className='text-left text-cinzaTextoClaro'>{selectedDoctorInfo?.institution + "/" + selectedDoctorInfo?.degree_year}</p>
                </div>
            </div>

            {
            /* Botões */
            }
            {
            modalDeAceitarPodologo 
            ?
            <>

                {selectedDoctorInfo?.degree_photo && 
                <div className='flex items-center justify-center'>
                <Link href={selectedDoctorInfo?.degree_photo} rel="noopener noreferrer" target="_blank"> 
                <div className="w-44 h-44 relative mt-2">
                    <Image alt='' fill src={selectedDoctorInfo?.degree_photo} className="object-cover rounded-lg" />
                </div>
                </Link>
                </div>
                }
                
                <div className='flex flex-col items-center justify-center'>
                <Button 
                className='w-[85%] mt-6 items-center' 
                disabled={loadingAceitarCadastro} // Desativa o botão durante o loading
                onClick={() => autorizarPodologo()}
                >
                    {loadingAceitarCadastro ? <ClipLoader size={25} color='white' /> :
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M9.29995 16.4L5.09995 12.2L3.69995 13.6L9.29995 19.2L21.3 7.20005L19.9 5.80005L9.29995 16.4Z" fill="#FBFBFB" />
                    </svg>
                    Aceitar cadastro
                    </>}
                </Button>

                <Button
                    className='w-[85%] mt-2 border-[1px] border-azul bg-white text-azul'
                    onClick={() => recusarPodologo()}
                    disabled={loadingAceitarCadastro}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M19.5 6.91L18.09 5.5L12.5 11.09L6.91 5.5L5.5 6.91L11.09 12.5L5.5 18.09L6.91 19.5L12.5 13.91L18.09 19.5L19.5 18.09L13.91 12.5L19.5 6.91Z" fill="#2087ED"/>
                    </svg>
                    Recusar cadastro
                </Button>
                </div>
            </>
            :
            <div></div>
            }
        </div>
    </div>
    </>
    );
}

import Button from "@/Components/Button/button";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from 'next/image';
import Link from "next/link";
import { ModalApenasInfoUser } from "../ModalApenasInfoUser";

interface InfoDenunciaProps {
    selectedReportInfo: object;
    loadingExcluir: boolean;
    visible: boolean;
    fecharModal: (boolean: boolean) => void;
    excluirPodologo?: () => void;
    excluirDenuncia?: () => void;
    modalDeAceitarPodologo?: boolean;
  }

export function ModalInfoDenuncia({
  selectedReportInfo,
  loadingExcluir,
  visible,
  fecharModal,
  excluirPodologo = () => {},
  excluirDenuncia = () => {},
}: InfoDenunciaProps) {
    const [infoUsuarioSelecionado, setInfoUsuarioSelecionado] = useState({});
    const [modalInfoUsuario, setModalInfoUsuario] = useState(false);

    const handleUserInfo = async (usuario: any) => {
        setInfoUsuarioSelecionado(usuario);
        setModalInfoUsuario(true);
    }

    if (!visible) {
        return (<></>);
    }

    // Caso seja uma denúncia de um médico
    if (!selectedReportInfo.is_doctor_report) {
        return(
            <>
                <ModalApenasInfoUser
                    selectedUserInfo={infoUsuarioSelecionado}
                    visible={modalInfoUsuario}
                    fecharModal={setModalInfoUsuario}
                />
                <div className='absolute h-screen w-full bg-[#00000031] z-40 flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center rounded-xl bg-white px-10 py-6'>
                        <svg onClick={() => {
                            if (!loadingExcluir) {
                                fecharModal(false)
                            }
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
                        <h2 className='text-azul text-2xl font-bold mb-4'>Informações da denúncia</h2>
                        <h2 className='text-cinzaTextoClaro text-sm text-left mr-auto mb-2'>Denunciado em {new Date(selectedReportInfo.CreatedAt).toLocaleDateString()} por:</h2>
                        <div className='flex flex-row items-start w-full'>
                            {
                            /* Imagem */
                            }
                            {selectedReportInfo.doctor.user.profile_picture && 
                            <div className="w-12 h-12 relative mr-6">
                                <Image alt='' fill src={selectedReportInfo.doctor.user.profile_picture} className="object-cover rounded-full" />
                            </div>}
                            {
                            /* Info Podologo */
                            }
                            <div className='flex flex-col'>
                                <p className='text-left text-cinzaTexto font-semibold'>{selectedReportInfo?.doctor.user.first_name + " " + selectedReportInfo?.doctor.user.last_name}</p>
                                <p
                                onClick={() => handleUserInfo(selectedReportInfo?.doctor)}
                                className='text-left text-azul underline cursor-pointer'>
                                    Ver mais informações
                                </p>
                                <p className='text-left text-cinzaTextoClaro whitespace-nowrap'>Motivo: {selectedReportInfo?.reason}</p>
                            </div>
                        </div>
                        <h2 className='text-cinzaTextoClaro text-sm text-left mr-auto mb-2 mt-2'>Paciente denunciado:</h2>
                        <div className='flex flex-row items-start w-full'>
                            {
                            /* Imagem */
                            }
                            {selectedReportInfo.patient.user.profile_picture && 
                            <div className="w-12 h-12 relative mr-6">
                                <Image alt='' fill src={selectedReportInfo.patient.user.profile_picture} className="object-cover rounded-full" />
                            </div>}
                            {
                            /* Info Podologo */
                            }
                            <div className='flex flex-col'>
                                <p className='text-left text-cinzaTexto font-semibold'>{selectedReportInfo?.patient.user.first_name + " " + selectedReportInfo?.patient.user.last_name}</p>
                                <p 
                                onClick={() => handleUserInfo(selectedReportInfo?.patient)}
                                className='text-left text-azul underline cursor-pointer'>
                                    Ver mais informações
                                </p>
                            </div>
                        </div>
                        {
                        /* Botões */
                        }
                        <Button 
                        className='w-[85%] mt-6' 
                        disabled={loadingExcluir} // Desativa o botão durante o loading
                        onClick={() => excluirPodologo()}
                        >
                            {loadingExcluir 
                            ? 
                            <ClipLoader size={25} color='white' /> 
                            :
                            'Excluir podólogo'
                            }
                        </Button>

                        <Button
                            className='w-[85%] mt-2 border-[1px] border-azul bg-white text-azul'
                            onClick={() => fecharModal(false)}
                            disabled={loadingExcluir}
                        >
                            {loadingExcluir 
                            ? 
                            <ClipLoader size={25} color='white' /> 
                            :
                            'Excluir denúncia'
                            }
                        </Button>
                    </div>
                </div>
            </>
        );
    }
  
    // Caso seja uma denúncia de um paciente
    return(
        <>
            <ModalApenasInfoUser
                selectedUserInfo={infoUsuarioSelecionado}
                visible={modalInfoUsuario}
                fecharModal={setModalInfoUsuario}
            />
            <div className='absolute h-screen w-full bg-[#00000031] z-50 flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center rounded-xl bg-white px-10 py-6'>
                    <svg onClick={() => {
                        if (!loadingExcluir) {
                            fecharModal(false)
                        }
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
                    <h2 className='text-azul text-2xl font-bold mb-4'>Informações da denúncia</h2>
                    <h2 className='text-cinzaTextoClaro text-sm text-left mr-auto mb-2'>Denunciado em {new Date(selectedReportInfo.CreatedAt).toLocaleDateString()} por:</h2>
                    <div className='flex flex-row items-start w-full'>
                        {
                        /* Imagem */
                        }
                        {selectedReportInfo.patient.user.profile_picture && 
                        <div className="w-12 h-12 relative mr-6">
                            <Image alt='' fill src={selectedReportInfo.patient.user.profile_picture} className="object-cover rounded-full" />
                        </div>}
                        {
                        /* Info Podologo */
                        }
                        <div className='flex flex-col'>
                            <p className='text-left text-cinzaTexto font-semibold'>{selectedReportInfo?.patient.user.first_name + " " + selectedReportInfo?.patient.user.last_name}</p>
                            <p 
                            onClick={() => handleUserInfo(selectedReportInfo?.patient)}
                            className='text-left text-azul underline cursor-pointer'>
                                Ver mais informações
                            </p>
                            <p className='text-left text-cinzaTextoClaro whitespace-nowrap'>Motivo: {selectedReportInfo?.reason}</p>
                        </div>
                    </div>
                    <h2 className='text-cinzaTextoClaro text-sm text-left mr-auto mb-2 mt-2'>Podólogo denunciado:</h2>
                    <div className='flex flex-row items-start w-full'>
                        {
                        /* Imagem */
                        }
                        {selectedReportInfo.doctor.user.profile_picture && 
                        <div className="w-12 h-12 relative mr-6">
                            <Image alt='' fill src={selectedReportInfo.doctor.user.profile_picture} className="object-cover rounded-full" />
                        </div>}
                        {
                        /* Info Podologo */
                        }
                        <div className='flex flex-col'>
                            <p className='text-left text-cinzaTexto font-semibold'>{selectedReportInfo?.doctor.user.first_name + " " + selectedReportInfo?.doctor.user.last_name}</p>
                            <p 
                            onClick={() => handleUserInfo(selectedReportInfo?.doctor)}
                            className='text-left text-azul underline cursor-pointer'>
                                Ver mais informações
                            </p>
                        </div>
                    </div>
                    {
                    /* Botões */
                    }
                    <Button 
                    className='w-[85%] mt-6' 
                    disabled={loadingExcluir} // Desativa o botão durante o loading
                    onClick={() => excluirPodologo()}
                    >
                        {loadingExcluir 
                        ? 
                        <ClipLoader size={25} color='white' /> 
                        :
                        'Excluir podólogo'
                        }
                    </Button>

                    <Button
                        className='w-[85%] mt-2 border-[1px] border-azul bg-white text-azul'
                        onClick={() => fecharModal(false)}
                        disabled={loadingExcluir}
                    >
                        {loadingExcluir 
                        ? 
                        <ClipLoader size={25} color='white' /> 
                        :
                        'Excluir denúncia'
                        }
                    </Button>
                </div>
            </div>
        </>
    );
}
  
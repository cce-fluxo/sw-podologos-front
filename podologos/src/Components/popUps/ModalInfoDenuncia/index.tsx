import Button from "@/Components/Button/button";
import React from "react";
import { ClipLoader } from "react-spinners";
import Image from 'next/image';

interface DadosDenuncia {
    report_id: string;
    doctor_id: string;
    patient_id: string;
    reason: string;
    is_doctor_report: string;
    CreatedAt: string;
    patient: {
        user: {
            first_name: string;
            last_name: string;
            profile_picture: string
        }
    };
    doctor: {
        user: {
            first_name: string;
            last_name: string;
            profile_picture: string
        }
    }
}

interface InfoDenunciaProps {
    selectedReportInfo: DadosDenuncia;
    loadingExcluir: boolean;
    visible: boolean;
    fecharModal: (boolean: boolean) => void;
    excluirPodologo?: () => void;
    excluirDenuncia?: () => void;
    modalDeAceitarPodologo?: boolean;
    onShowUserInfo?: (usuario: any) => void; // Nova prop
}

export function ModalInfoDenuncia({
    selectedReportInfo,
    loadingExcluir,
    visible,
    fecharModal,
    excluirPodologo = () => {},
    excluirDenuncia = () => {},
    onShowUserInfo, // Nova prop
}: InfoDenunciaProps) {

    if (!visible) {
        return null;
    }

    // Caso seja uma denúncia de um médico
    if (!selectedReportInfo.is_doctor_report) {
        return(
            <div className='fixed inset-0 h-screen w-full bg-[#00000031] z-40 flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center rounded-xl bg-white px-10 py-6 max-w-md mx-4'>
                    <svg 
                        onClick={() => {
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
                    <h2 className='text-cinzaTextoClaro text-sm text-left w-full mb-2'>
                        Denunciado em {new Date(selectedReportInfo.CreatedAt).toLocaleDateString()} por:
                    </h2>
                    <div className='flex flex-row items-start w-full'>
                        {selectedReportInfo.doctor?.user?.profile_picture && 
                            <div className="w-12 h-12 relative mr-6">
                                <Image 
                                    alt='' 
                                    fill 
                                    src={selectedReportInfo.doctor.user.profile_picture} 
                                    className="object-cover rounded-full" 
                                />
                            </div>
                        }
                        <div className='flex flex-col'>
                            <p className='text-left text-cinzaTexto font-semibold'>
                                {selectedReportInfo?.doctor?.user?.first_name + " " + selectedReportInfo?.doctor?.user?.last_name}
                            </p>
                            <p
                                onClick={() => onShowUserInfo?.(selectedReportInfo?.doctor)}
                                className='text-left text-azul underline cursor-pointer hover:text-azul/80'
                            >
                                Ver mais informações
                            </p>
                            <p className='text-left text-cinzaTextoClaro whitespace-nowrap'>
                                Motivo: {selectedReportInfo?.reason}
                            </p>
                        </div>
                    </div>
                    <h2 className='text-cinzaTextoClaro text-sm text-left w-full mb-2 mt-4'>Paciente denunciado:</h2>
                    <div className='flex flex-row items-start w-full'>
                        {selectedReportInfo.patient?.user?.profile_picture && 
                            <div className="w-12 h-12 relative mr-6">
                                <Image 
                                    alt='' 
                                    fill 
                                    src={selectedReportInfo.patient.user.profile_picture} 
                                    className="object-cover rounded-full" 
                                />
                            </div>
                        }
                        <div className='flex flex-col'>
                            <p className='text-left text-cinzaTexto font-semibold'>
                                {selectedReportInfo?.patient?.user?.first_name + " " + selectedReportInfo?.patient?.user?.last_name}
                            </p>
                            <p 
                                onClick={() => onShowUserInfo?.(selectedReportInfo?.patient)}
                                className='text-left text-azul underline cursor-pointer hover:text-azul/80'
                            >
                                Ver mais informações
                            </p>
                        </div>
                    </div>
                    <div className="w-full mt-6 space-y-2">
                        <Button 
                            className='w-full' 
                            disabled={loadingExcluir}
                            onClick={excluirPodologo}
                        >
                            {loadingExcluir 
                                ? <ClipLoader size={25} color='white' /> 
                                : 'Excluir podólogo'
                            }
                        </Button>

                        <Button
                            className='w-full border-[1px] border-azul bg-white text-azul hover:bg-gray-50'
                            onClick={excluirDenuncia}
                            disabled={loadingExcluir}
                        >
                            {loadingExcluir 
                                ? <ClipLoader size={25} color='white' /> 
                                : 'Excluir denúncia'
                            }
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
  
    // Caso seja uma denúncia de um paciente
    return(
        <div className='fixed inset-0 h-screen w-full bg-[#00000031] z-40 flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center rounded-xl bg-white px-10 py-6 max-w-md mx-4'>
                <svg 
                    onClick={() => {
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
                <h2 className='text-cinzaTextoClaro text-sm text-left w-full mb-2'>
                    Denunciado em {new Date(selectedReportInfo.CreatedAt).toLocaleDateString()} por:
                </h2>
                <div className='flex flex-row items-start w-full'>
                    {selectedReportInfo.patient?.user?.profile_picture && 
                        <div className="w-12 h-12 relative mr-6">
                            <Image 
                                alt='' 
                                fill 
                                src={selectedReportInfo.patient.user.profile_picture} 
                                className="object-cover rounded-full" 
                            />
                        </div>
                    }
                    <div className='flex flex-col'>
                        <p className='text-left text-cinzaTexto font-semibold'>
                            {selectedReportInfo?.patient?.user?.first_name + " " + selectedReportInfo?.patient?.user?.last_name}
                        </p>
                        <p 
                            onClick={() => onShowUserInfo?.(selectedReportInfo?.patient)}
                            className='text-left text-azul underline cursor-pointer hover:text-azul/80'
                        >
                            Ver mais informações
                        </p>
                        <p className='text-left text-cinzaTextoClaro whitespace-nowrap'>
                            Motivo: {selectedReportInfo?.reason}
                        </p>
                    </div>
                </div>
                <h2 className='text-cinzaTextoClaro text-sm text-left w-full mb-2 mt-4'>Podólogo denunciado:</h2>
                <div className='flex flex-row items-start w-full'>
                    {selectedReportInfo.doctor?.user?.profile_picture && 
                        <div className="w-12 h-12 relative mr-6">
                            <Image 
                                alt='' 
                                fill 
                                src={selectedReportInfo.doctor.user.profile_picture} 
                                className="object-cover rounded-full" 
                            />
                        </div>
                    }
                    <div className='flex flex-col'>
                        <p className='text-left text-cinzaTexto font-semibold'>
                            {selectedReportInfo?.doctor?.user?.first_name + " " + selectedReportInfo?.doctor?.user?.last_name}
                        </p>
                        <p 
                            onClick={() => onShowUserInfo?.(selectedReportInfo?.doctor)}
                            className='text-left text-azul underline cursor-pointer hover:text-azul/80'
                        >
                            Ver mais informações
                        </p>
                    </div>
                </div>
                <div className="w-full mt-6 space-y-2">
                    <Button 
                        className='w-full' 
                        disabled={loadingExcluir}
                        onClick={excluirPodologo}
                    >
                        {loadingExcluir 
                            ? <ClipLoader size={25} color='white' /> 
                            : 'Excluir podólogo'
                        }
                    </Button>

                    <Button
                        className='w-full border-[1px] border-azul bg-white text-azul hover:bg-gray-50'
                        onClick={excluirDenuncia}
                        disabled={loadingExcluir}
                    >
                        {loadingExcluir 
                            ? <ClipLoader size={25} color='white' /> 
                            : 'Excluir denúncia'
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
}
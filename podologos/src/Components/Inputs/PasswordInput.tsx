'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Ou qualquer ícone que você preferir

interface PasswordInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    disabled,
    required,
    }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='flex flex-col gap-1'>
        <label htmlFor={name} className='text-cinza_azulado font-medium'>
            {label}
        </label>
        <div className='relative'>
            <input
            id={name}
            name={name}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-3 rounded-lg border pr-10 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden ${
                error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-azul`}
            disabled={disabled}
            required={required}
            />
            <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
            disabled={disabled}
            >
            {showPassword ? (
                <EyeOff size={20} />
            ) : (
                <Eye size={20} />
            )}
            </button>
        </div>
        {error && (
            <p className='text-red-500 text-sm mt-1'>{error}</p>
        )}
        </div>
    );
};

export default PasswordInput;
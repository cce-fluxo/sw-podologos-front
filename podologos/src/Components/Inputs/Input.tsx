'use client';
import React from 'react';

interface InputProps {
    label: string;
    name: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    value,
    type,
    onChange,
    placeholder,
    error,
    disabled,
    required,
    }) => {;

    return (
        <div className='flex flex-col gap-1'>
        <label htmlFor={name} className='text-cinza_azulado font-medium'>
            {label}
        </label>
        <div className='relative'>
            <input
            id={name}
            name={name}
            type={type || 'text'}  
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-3 rounded-lg border pr-10 ${
                error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-azul`}
            disabled={disabled}
            required={required}
            />
        </div>
        {error && (
            <p className='text-red-500 text-sm mt-1'>{error}</p>
        )}
        </div>
    );
};

export default Input;
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [x: string]: any;
}

function Button({
  placeholder,
  children,
  className,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'flex h-[50px] w-full items-center justify-center rounded-[8px] bg-azul text-[18px] text-white',
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {placeholder}
      {children}
    </button>
  );
}

export default Button;

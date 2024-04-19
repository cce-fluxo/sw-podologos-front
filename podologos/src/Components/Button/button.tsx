import React from "react";
import { twMerge } from "tailwind-merge";

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
        "flex items-center justify-center w-full h-[50px] rounded-[8px] text-[18px] bg-azul text-white",
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

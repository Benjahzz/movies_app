import React, { ButtonHTMLAttributes, DetailedHTMLProps, SyntheticEvent } from 'react'

interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  disabled?: boolean;
  outline?: boolean;
  type?: 'button' | 'submit' | undefined
  cancel?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  onClick,
  disabled,
  fullWidth,
  large,
  outline,
  type,
  cancel
}) => {

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`disabled:opacity-70 disabled:cursor-not-allowed font-semibold hover:opacity-90 transition border-2 rounded-lg text-center border-none cursor-pointer ${cancel && "bg-red-500"} ${fullWidth ? "w-full" : "w-fit"
        } ${secondary ? "bg-white" : "bg-blue-600"} ${secondary ? "text-black" : "text-white"
        } ${secondary ? "border-black" : "border-blue-600"} ${large ? "text-xl" : "text-md"
        } ${large ? "px-5" : "px-4"} ${large ? "py-3" : "py-2"} ${outline ? "bg-transparent" : ""
        } ${outline ? "border-white text-white hover:bg-gray-700" : ""} `}
    >
      {label}
    </button>
  )
}

export default Button
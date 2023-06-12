import Image from "next/image";
import React from "react";

interface InputProps {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string,
  large?: boolean
}
const Input: React.FC<InputProps> = ({ value, onChange, disabled, placeholder, type,id,large}) => {
  return (
    <input type={type || 'text'} value={value} disabled={disabled} placeholder={placeholder} onChange={onChange} id={id} className={`w-full text-lg border-grayDark  placeholder:text-gray-500 rounded-lg bg-transparent border-2 disabled:opacity-70 disabled:bg-gray-700 disabled:cursor-not-allowed focus:border-white ${large ? 'p-4' : 'px-4 py-2' }`}/>
  )
}

export default Input
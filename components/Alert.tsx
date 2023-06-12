import { alertaProps } from '@/types/types'
import React from 'react'

const Alert: React.FC<alertaProps> = ({msg,type}) => {
  return (
    <div className={`rounded-md px-4 py-2 ${type === 'error' ? 'bg-red-400' : null} text-center text-white font-semibold` }>
        {msg}
    </div>
  )
}

export default Alert
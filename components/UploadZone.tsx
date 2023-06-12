import Image from 'next/image';
import React,{useCallback, useState} from 'react'
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    disabled?: boolean;
    value?: string;
}

const UploadZone: React.FC<ImageUploadProps> = ({onChange,label,value,disabled}) => {
    const [base64, setBase64] = useState('')

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader()
        reader.onload = (event: any) => {
            setBase64(event.target.result);
            onChange(file)
        }
        reader.readAsDataURL(file)
    }, [onChange])

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }

    })
    return (
        <div {...getRootProps({
            className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700'
        })} >
            <input type="text" {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex items-center justify-center relative h-52 w-full">
                        <Image src={base64} fill style={{
                            objectFit: 'contain'
                        }} alt='Uploaded Image' />
                    </div>
                ) : (
                    <p className='text-white'>{label}</p>
                )
            }

        </div>
    )
}

export default UploadZone
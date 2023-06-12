import Button from '@/components/Button';
import Input from '@/components/Input'
import UploadZone from '@/components/UploadZone';
import uploadImage from '@/utils/uploadImage';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { SyntheticEvent, useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';

const Index = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imagen, setImagen] = useState('')
    const [cover, setCover] = useState('')
    const [imdb,setImdb] = useState('')

    
    
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('file', imagen)
        data.append('upload_preset', 'a982asbc');


        const response = await uploadImage(data);
        data.append('file',cover)
        const response2 = await uploadImage(data)
        const {public_id: image} = response
        const {public_id: coverImage} = response2;
        if (image) {
            await axios.post('/api/movies', {
                name,
                description,
                image,
                coverImage,
                imdb

            })
        }


    }
    return (
        <div className='mt-32 p-16'>


            <form >
                <UploadZone label='Imagen' onChange={setImagen} />
                <UploadZone label='Cover Image' onChange={setCover} />
                <Input onChange={(e) => { setName(e.target.value) }} placeholder='nombre' />
                <Input onChange={(e) => { setDescription(e.target.value) }} placeholder='description' />
                <Input onChange={(e) => { setImdb(e.target.value) }} placeholder='IMDB' />
                <Button onClick={handleSubmit} label='Registrar' />
            </form>
        </div>
    )
}

export default Index
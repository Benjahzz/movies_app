import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'
import Button from '@/components/Button';
import Input from '@/components/Input';
import Layout from '@/components/layouts/Layout';
import type { ReactElement } from 'react';

import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios';

import { signIn } from 'next-auth/react'
import { alertaProps } from '@/types/types';
import Alert from '@/components/Alert';
import isValidEmail from '@/utils/isValidEmail';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [alerta, setAlerta] = useState<alertaProps>({
        type: '',
        msg: ''
    })
    const router = useRouter()
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true)
        if ([email, username,password].includes('') || !isValidEmail(email)) {
            setIsLoading(false)
            setAlerta({
                msg: "Ingrese Correctamente los datos",
                type: 'error'
            })
            return;
        }
        try {
            const {data} =  await axios.post('/api/register', {
                email, username,password
            })
            if(!data){
                return setAlerta({
                    msg: "Ha ocurrido algo inesperado",
                    type: "error"
                })
            }
            const loginUser = signIn('credentials', {
                email, password,
                redirect: false,
            })
            setIsLoading(false)
            setAlerta({
                msg: '',
                type: ''
            })
            router.push('/')
        } catch (error) {
            return setAlerta({
                msg: "Ha ocurrido algo inesperado",
                type: "error"
            })
        } finally{
            setIsLoading(false)
        }
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className='flex relative items-center w-full lg:w-3/5 justify-center'>
                <div className='flex flex-col gap-6 w-4/6 lg:w-3/5'>
                    <Image src={"/icons/icon.svg"} alt="Icon Logo" height={100} width={100} style={{
                        objectFit: 'contain',
                        borderRadius: '100%'
                    }} className='self-center' />
                    <h3 className='text-3xl font-semibold'>Register</h3>
                    {
                        alerta.msg && <Alert msg={alerta.msg} type={alerta.type} />
                    }
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="Email" className='text-lg'>Email</label>
                            <Input placeholder='Ingresa tu Email' value={email} disabled={isLoading} onChange={(e) => setEmail(e.target.value)} id='Email' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="Username" className='text-lg'>Usuario</label>
                            <Input placeholder='Ingresa tu nombre de Usuario' value={username} disabled={isLoading} onChange={(e) => setUsername(e.target.value)} id='Username' type='text' />

                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="Password" className='text-lg'>Password</label>
                            <Input placeholder='Ingresa tu Contraseña' value={password} disabled={isLoading} onChange={(e) => setPassword(e.target.value)} id='Password' type='password' />

                        </div>
                        
                        <div className="flex justify-center gap-4">
                            <AiFillGithub size={34} className='cursor-pointer' />
                            <AiFillGoogleCircle size={34} className='cursor-pointer' />
                        </div>
                        <Button label='Registrarme' disabled={isLoading} fullWidth onClick={handleSubmit} large type='submit' />
                    </form>
                    <p className='text-center text-secondary font-normal'>Ya tienes una Cuenta? <Link href={"/login"} className='font-bold hover:underline cursor-pointer'>Ingresa a WatchGO</Link></p>

                </div>


            </div>
        </>
    )
}
Register.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    );
  };
   
export default Register
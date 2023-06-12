import Button from '@/components/Button';
import Input from '@/components/Input';
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'
import type { ReactElement } from 'react';

import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from 'next/link';
import { SyntheticEvent, useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import Alert from '@/components/Alert';
import { alertaProps } from '@/types/types';
import Layout from '@/components/layouts/Layout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [alerta, setAlerta] = useState<alertaProps>({
        type: '',
        msg: ''
    })
    const router = useRouter();
    const handleSubmit = useCallback(async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)
          if ([email, password].includes('')) {
            return;
        }
        try {
            const response = await signIn('credentials', {
                email,
                password,
                redirect: false
            })
            if (response?.error) {
                return setAlerta({
                    msg: response.error,
                    type: 'error'
                })
            }
            const {p} = router.query
            router.push(p? `${p}` : '/')
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [email, password, router])

    const { msg } = alerta
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
                    <h3 className='text-3xl font-semibold'>Sign In</h3>
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                        {
                            msg && <Alert msg={alerta.msg} type={alerta.type} />
                        }
                        <div className="flex flex-col gap-2">
                            <label htmlFor="Email" className='text-lg'>Email</label>
                            <Input placeholder='Ingresa tu Email' value={email} disabled={isLoading} onChange={(e) => setEmail(e.target.value)} id='Email' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="Password" className='text-lg'>Password</label>
                            <Input placeholder='Ingresa tu Contraseña' value={password} disabled={isLoading} onChange={(e) => setPassword(e.target.value)} id='Password' type='password' />

                        </div>
                        <div className="flex justify-center gap-4">
                            <AiFillGithub size={34} className='cursor-pointer' />
                            <AiFillGoogleCircle size={34} className='cursor-pointer' />
                        </div>
                        <Button label='Iniciar sesión' disabled={isLoading} fullWidth large type="submit" />
                    </form>
                    <p className='text-center text-secondary font-normal'>No tienes una Cuenta? <Link href={"/register"} className='font-bold hover:underline cursor-pointer'>Suscríbite a StreamGO</Link></p>

                </div>


            </div>
        </>
    )
}
Login.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    );
};

export default Login
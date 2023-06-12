import React from 'react'
import Navbar from '../Navbar';
import useCurrentUser from '@/hooks/useCurrentUser';
interface LayoutProps {
    children: React.ReactNode;
    secondary?: boolean
}
const LayoutAuth: React.FC<LayoutProps> = ({ children, secondary }) => {
    const { data: fetchedUser } = useCurrentUser();

    return (
        <div className='max-w-[140rem] mx-auto bg-primary min-h-screen'>
            <Navbar {...(!secondary && {nav: true} )} />
            
            {children}
        </div>
    )
}

export default LayoutAuth
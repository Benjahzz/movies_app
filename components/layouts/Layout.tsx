import React, { ReactNode, useEffect } from 'react'
import Banner from '../index/Banner'
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: currentUser, isLoading } = useCurrentUser();
  
  if (isLoading && !currentUser) {
    return (
      <div></div>
    )
  }
  return (
    <main className='flex h-screen bg-blend-darken bg-primary'>
      <Banner />
      {children}
    </main>
  )
}

export default Layout
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import useCurrentUser from '@/hooks/useCurrentUser'

interface NavbarProps {
    nav?: boolean
}
const Navbar: React.FC<NavbarProps> = ({ nav }) => {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const [scrollPosition, setScrollPosition] = useState(0)
    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(scrollY)
        }

        window.addEventListener("scroll", updatePosition)


    }, [])
    return (
        <header className={`fixed py-8 px-16 z-20 top-0 flex justify-between items-center right-0 transition-colors duration-200 left-0 max-w-[140rem] mx-auto ${scrollPosition > 80 ? "bg-primary bg-opacity-90" : ""} `} style={{
            backgroundImage: ' linear-gradient(to bottom, rgb(24 33 37 / 76%) 20%, rgba(0,0,0,0) 80%)'
        }}>
            <div className="flex gap-10 items-center ">
                <Link href={'/'} className='hover:scale-110 hover:rotate-6 transition-transform' >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={58}
                        height={56}
                        fill="currentColor">
                        <path d="M55.885 41.975c-.118.131-12.233 14.211-26.798 14.023C15.763 55.826 9.2 49.4 8.619 48.803a1.98 1.98 0 0 1-.088-.095c-3.295-3.695-1.734-6.604 3.198-6.176l20.632 1.693c10.74.929 20.053-1.273 23.527-2.25a.149.149 0 0 0-.005.001zM2.663 47.457c-.046-.17-5.272-17.995 2.807-30.115C12.861 6.255 21.822 4.243 22.639 4.08a2.78 2.78 0 0 1 .128-.022c4.893-.755 6.485 2.136 3.444 6.043L13.568 26.494c-6.62 8.508-9.838 17.52-10.907 20.967a.39.39 0 0 0 .001-.004zM25.199.019c.174.027 18.584 2.501 26.371 14.81 7.124 11.261 5.318 20.266 5.135 21.079a2.54 2.54 0 0 1-.032.125c-1.3 4.777-4.589 5.056-6.921.689l-9.836-18.216C34.836 8.999 27.91 2.394 25.196.016a.36.36 0 0 0 .003.003z" />
                    </svg>
                </Link>
                {
                    nav && (
                        <nav>
                            <ul className='flex gap-10'>
                                <Link href={'/series'} className={`transition-colors hover:text-orange-400 ${router.pathname === '/category/tvshows' ? 'text-orange-400' : ''}`} >TV Shows</Link>
                                <Link href={'/movies'} className={`transition-colors hover:text-orange-400 ${router.pathname === '/category/movies' ? 'text-orange-400' : ''}`}>Movies</Link>
                                <Link href={'/myList'}>My list</Link>
                            </ul>
                        </nav>
                    )
                }
            </div>
            <Avatar userId={currentUser?.id} hasBorder hasMenu />

        </header>
    )
}

export default Navbar
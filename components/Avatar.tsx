import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import { Menu, Transition } from '@headlessui/react'
import { signOut } from "next-auth/react";
import { IoMdArrowDropdown } from "react-icons/io"
import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean
    hasMenu?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder, hasMenu }) => {
    const router = useRouter()
    const { data: fetchedUser } = useCurrentUser()

    //const {data: fetchedUser} = useUser(userId)

    return (
        <>

            {
                hasMenu ? <Menu as="div" className="relative inline-block text-left" >

                    {({ open }) => (
                        <>
                            <div>
                                <Menu.Button className={` ${isLarge ? 'h-32' : 'h-12'} ${isLarge ? 'w-32' : 'w-18'} rounded-full hover:opacity-90 transition cursor-pointer relative flex items-center gap-2 group`} >
                                    <Image width={50} height={50} className={`${hasBorder ? 'border-2 border-white' : ''}`} style={{
                                        borderRadius: '100%',
                                    }} alt="Avatar" src={`/images/${fetchedUser?.profileImage}`} />
                                    <IoMdArrowDropdown size={24} className={`${open && "rotate-180"}`} />

                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div>
                                        <Menu.Item >
                                            {({ active }) => (
                                                <Link
                                                    href={'/profile'}
                                                    className={`block px-4 rounded-t-md py-3 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-white'}`
                                                    }
                                                >
                                                    My Profile
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={`block px-4 py-3 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-white'}`}
                                                >
                                                    Soporte
                                                </a>
                                            )}
                                        </Menu.Item>

                                        <form method="POST" action="#">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => signOut({ callbackUrl: "/login" })}
                                                        type="submit"
                                                        className={`block w-full rounded-b-md px-4 py-3 text-left text-sm ${active ? 'bg-red-500 ' : 'text-white'}`}>
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </form>
                                    </div>
                                </Menu.Items>
                            </Transition>

                        </>
                    )}
                </Menu> : (
                    <div className={` ${isLarge ? 'h-32' : 'h-12'} ${isLarge ? 'w-32' : 'w-18'} rounded-full hover:opacity-90 transition cursor-pointer relative flex items-center gap-2 group`}  >
                        <Image width={50} height={50} className={`${hasBorder ? 'border-2 border-white' : ''}`} style={{
                            borderRadius: '100%',
                        }} alt="Avatar" src={`/images/${fetchedUser?.profileImage}`} />
                        <p>${fetchedUser?.profileImage}</p>

                    </div>
                )
            }
        </>

    )
}

export default Avatar
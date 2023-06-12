import useCurrentUser from '@/hooks/useCurrentUser'
import Image from 'next/image';
import React from 'react'
import Button from '../Button';
import Input from '../Input';
import { formatearFecha } from '@/utils/formatDate';
import useMediaModal from '@/hooks/useMediaModal';
import useProfileModal from '@/hooks/useProfileModal';

const ProfileInformation = () => {
    const { data: currentUser } = useCurrentUser();
    const {onOpen} = useProfileModal()
    return (
        <div className='flex flex-col gap-8 '>
            <h3>Profile Information</h3>
            <div className="grid grid-cols-2 items-center gap-4 gap-y-10">
                <div className="relative h-36 w-36 border-white border-2">
                    <Image src={`/images/${currentUser?.profileImage || "avatar_1.png"}`} alt="Profile Image" fill style={{
                        objectFit: "contain"
                    }} />
                </div>
                <Button label='Change Avatar' secondary onClick={onOpen} />
                <Input placeholder='Username' onChange={()=>{console.log("a")}} value={currentUser?.username} />
                <Input placeholder='Date' disabled onChange={()=>{console.log("a")}} value={formatearFecha(currentUser?.createdAt)}/>
            </div>

        </div>
    )
}

export default ProfileInformation
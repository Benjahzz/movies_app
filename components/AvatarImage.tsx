import { Avatar } from '@/types/types'
import Image from 'next/image'
import React from 'react'


interface AvatarImage {

    avatar: Avatar
    active?: boolean
    setActive: (avatar: Avatar) => void 
}

const AvatarImage: React.FC<AvatarImage> = ({avatar,active,setActive}) => {
    return (
        <div>
            <Image src={`/images/${avatar.image}`} alt="Profile Image" width={90} height={90} className={`${active && "border-4 border-white"}`} onClick={() => setActive(avatar)}/>
        </div>
    )
}

export default AvatarImage
import React, { useState } from 'react'
import Modal from '../Modal'
import useProfileModal from '@/hooks/useProfileModal'
import Button from '../Button'
import { Avatar } from '@/types/types'
import AvatarImage from '../AvatarImage'
import axios from 'axios'
import useCurrentUser from '@/hooks/useCurrentUser'

const avatars = [
    { id: 1, image: "avatar_1.png" },
    { id: 2, image: "avatar_2.png" },
    { id: 3, image: "avatar_3.png" },
    { id: 4, image: "avatar_4.png" },
    { id: 5, image: "avatar_5.png" },
    { id: 6, image: "avatar_6.png" },
    { id: 7, image: "avatar_7.png" },
    { id: 8, image: "avatar_8.png" },
    { id: 9, image: "avatar_9.png" },
]

const ChangeAvatarModal = () => {
    const { onClose, isOpen } = useProfileModal()
    const [activeAvatar, setActiveAvatar] = useState(avatars[0])
    const {mutate} = useCurrentUser()
    const [disabled,setDisabled] = useState(false)
    const handleClickAvatar = (avatar:Avatar) => {
        setActiveAvatar(avatar)
    }
    const handleClickChange = async () =>{
        setDisabled(true)
        await axios.patch('/api/edit',activeAvatar)
        mutate()
        setDisabled(false)
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <div className="flex flex-col justify-between h-full">
                <div className='flex flex-wrap gap-8 shadow-slate-100 p-2 rounded-md'>
                    {
                        avatars.map((avatar: { id: number, image: string }) => (
                            <AvatarImage key={avatar.id} avatar={avatar} active={avatar === activeAvatar} setActive={handleClickAvatar} />
                        ))
                    }
                </div>
                <div className="flex gap-4 w-3/5 mx-auto mt-16">
                    <Button label='Confirm' secondary fullWidth onClick={handleClickChange} disabled={disabled}/>
                    <Button label='Cancel' cancel fullWidth onClick={onClose} disabled={disabled}/>
                </div>
            </div>
        </Modal>
    )
}

export default ChangeAvatarModal
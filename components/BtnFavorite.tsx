import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import { movieProps, serieProps } from '@/types/types'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { IoMdAdd } from 'react-icons/io'

interface btnFavoriteProps {
  movie: movieProps | serieProps | undefined
  movieType?: string
}


const BtnFavorite: React.FC<btnFavoriteProps> = ({ movie, movieType }) => {
  const { data: currentUser, mutate } = useCurrentUser();
  const [disabled, setDisabled] = useState(false)
  const { mutate: mutateFavorites } = useFavorites();
  const handleAddList = async () => {
    if (disabled) return
    setDisabled(true)
    if (currentUser.wishMovies.find((wish: Record<string, any>) => wish.id === movie?.id)) {
      const res = await axios.patch('/api/favorites', {
        id: movie?.id,
        type: movieType
      })
      console.log("ssss")
      toast.success(res.data.message)

      mutateFavorites()
      await mutate()
      setDisabled(false)
      return
    }
    const res = await axios.post('/api/favorites', {
      id: movie?.id,
      type: movieType
    })
    if (res.status === 200) {
      toast.success(res.data.message)
      mutateFavorites()
    } else {
      toast.error("Couldn't be added")
    }
    await mutate()
    setDisabled(false)
  }

  return (
    <div className={`border-2 border-gray-500 bg-gray-900 rounded-full  hover:border-white transition-colors ${disabled ?"cursor-not-allowed" : "cursor-pointer"}`} onClick={handleAddList}>
      <IoMdAdd size={30} />
    </div>
  )
}

export default BtnFavorite
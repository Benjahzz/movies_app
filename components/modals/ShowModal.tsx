import React from 'react'
import Modal from '../Modal'
import useMediaModal from '@/hooks/useMediaModal'
import { useEffect,useState,Fragment } from 'react'
import useMedia from '@/hooks/useMedia'
import ReactPlayer from 'react-player'
import Button from '../Button'
import BtnFavorite from '../BtnFavorite'
import getGenre from '@/utils/getGenre'
import { Element } from '@/types/types'
const ShowModal = () => {
    const { onClose, media,isOpen} = useMediaModal()
    const { data: currentMedia, isLoading } = useMedia({ id: media?.id ?? null, type: media?.media_type ?? "" })
    const [trailer, setTrailer] = useState("")
    useEffect(() => {
      setTrailer("")
      if (currentMedia) {
        const index = currentMedia?.videos?.results.findIndex((element: Element) => element.type === "Trailer")
        setTrailer(currentMedia.videos?.results[index]?.key)
      }
    }, [currentMedia])
    const handleOnClose = () => {
      onClose()
    }
    console.log(handleOnClose)
    return (
        <Modal isOpen={isOpen} onClose={handleOnClose} >
            <div className="absolute top-10 right-10 z-50 rounded-full cursor-pointer bg-slate-700 p-1" onClick={handleOnClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <div className="relative h-4/6 min-h-[20rem] ">
                {
                    !isLoading ? trailer ? (
                        <>
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer}`} width="100%"
                                height="100%" muted playing style={{ position: 'absolute', top: '0', left: '0', borderRadius: "5rem", pointerEvents: "none" }} loop config={{ youtube: { playerVars: { disablekb: 1 } } }} />
                            <div className="absolute bottom-4 left-10 z-60 cursor-pointer flex items-center gap-4 w-60" >
                                <Button label="Play" fullWidth secondary />
                                <BtnFavorite movie={currentMedia} movieType={media?.media_type} />
                            </div>

                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <span>Video no available</span>
                        </div>
                    ) : (
                        <div className="w-full h-full animate-pulse bg-gray-400">
                        </div>
                    )
                }
            </div>
            <div className="flex items-center gap-4 flex-wrap">
                <h2 className="text-2xl">{currentMedia?.title || currentMedia?.name}</h2>
                <span className={`px-2 rounded-lg uppercase ${media?.media_type === "movie" ? "bg-orange-400" : "bg-green-500"}`}>{media?.media_type}</span>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
                <p className="font-normal w-5/6 text-sm">{currentMedia?.overview}</p>
                <div className="sm:w-2/6 text-sm flex flex-col gap-4  ">
                    <div className="flex gap-2 w-full">
                        <span className="text-gray-400 font-semibold">Genres:</span>
                        <p>
                            {
                                currentMedia?.genres?.map((genre: Record<string, any>, index: number) => (
                                    <Fragment key={genre.id} >
                                        <span >{getGenre(genre.id)}</span>
                                        {index !== currentMedia.genres.length - 1 ? `, ` : ''}
                                    </Fragment>
                                ))
                            }
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-gray-400 font-semibold">Release Date:</p>
                        <p >
                            {currentMedia?.release_date || currentMedia?.first_air_date || !isLoading && "No available"}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-gray-400 font-semibold">Rating:</p>
                        <p className="text-green-400">
                            {currentMedia?.vote_average}%
                        </p>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default ShowModal
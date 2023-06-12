import useMediaModal from '@/hooks/useMediaModal'
import useMovies from '@/hooks/useMovies'
import { movieProps, serieProps } from '@/types/types'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

interface CardMovieProps {
  movie?: movieProps | serieProps
  hasText?: boolean
  isLarge?: boolean
  defaultCard?: boolean
  fullWidth?: boolean
  movieType?: string
}
const CardMovie: React.FC<CardMovieProps> = ({ movie, movieType, defaultCard, hasText, fullWidth }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen, setMedia } = useMediaModal()
  const handleOnClick = () => {
    if (movie) {
      setMedia({
        id: movie.id,
        media_type: movieType 
      })
      onOpen();
    }
  }
  return (

    <>

      {
        defaultCard ? (
          <div className={`block relative h-80 w-full md:max-w-[200px] lg:max-w-[250px] transition-transform  `} onClick={handleOnClick} >
            {
              isLoading || !movie ? (
                <div role="status" className={`space-y-8 h-full  md:space-y-0 md:space-x-8 animate-pulse md:flex md:items-center  `}>
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                  </div>
                </div>

              ) : (
                movie && <>
                  <Image src={`${process.env.NEXT_PUBLIC_TMDB_URL_IMAGE}${movie.poster_path}`} fill style={{
                    objectFit: 'cover',
                  }} alt='Imagen Movie' className='rounded-lg z-10' onLoad={() => console.log("a")} />
                </>
              )
            }
          </div>
        ) :
          (
            <div className={`block relative h-64 md:h-80 md:max-w-[200px] lg:max-w-[232px]  transition-transform cursor-pointer group  overflow-hidden rounded-lg ${isLoading && "animate-pulse bg-gray-500 rounded-lg"} ${fullWidth ? "w-full" : "w-64"}`} onClick={handleOnClick}>
              {
                movie && (
                  <>
                    <Image src={`${process.env.NEXT_PUBLIC_TMDB_URL_IMAGE}${movie?.poster_path}`} fill sizes='50vw' style={{
                      objectFit: 'cover',
                    }} alt='Imagen Movie' className=" opacity-60 group-hover:scale-105 transition-transform" onLoad={() => { setIsLoading(false) }} quality={80} />
                    {
                      !isLoading && (
                        <div className="z-10 absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between px-2 py-4 rounded-lg" style={{
                          boxShadow: 'rgb(0 0 0 / 65%) 1px -12px 20px 4px inset'
                        }}>
                          {
                            hasText && (
                              <>
                                <div className="flex items-center gap-2">
                                  <AiFillStar size={28} className='text-yellow-500' />
                                  <span>{movie.vote_average} / 10</span>
                                </div>
                                {('title' in movie) ? (
                                  <p className='text-lg font-bold'>{movie.title}</p>
                                ) : ('name' in movie) ? (
                                  <p className='text-lg font-bold'>{movie.name}</p>
                                ) : (
                                  <p className='text-lg font-bold'>Sin título ni nombre</p>
                                )}

                              </>
                            )
                          }
                        </div>
                      )
                    }
                  </>
                )
              }
            </div>
          )
      }

    </>
  )
}

export default CardMovie
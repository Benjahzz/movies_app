import { CldImage } from 'next-cloudinary'
import { movieProps, serieProps } from '@/types/types'
import useMovies from '@/hooks/useMovies'
import Button from './Button'


import React, { useState, useMemo, useEffect, useCallback } from 'react'
import Image from 'next/image'
import getGenre from '@/utils/getGenre'
import BtnFavorite from './BtnFavorite'

interface HeroProps {
    popularMovies: [
        movieProps
    ]
}
const Hero: React.FC<HeroProps> = ({ popularMovies }) => {
    const [movie, setMovie] = useState<movieProps |  undefined>()
    useEffect(() => {
        if (popularMovies) {
            setMovie(popularMovies[Math.floor(Math.random() * popularMovies.length)])
        }
    }, [popularMovies])
   
    return (
        <div className='flex flex-col w-full h-80 md:h-auto  relative'>
            <div className=" w-full md:w-4/6 flex h-full self-end absolute">
                {
                    movie && (
                        <Image style={{ objectFit: 'cover' }} fill src={`${process.env.NEXT_PUBLIC_TMDB_URL_IMAGE}${movie?.backdrop_path}`} alt={`Image Banner ${movie?.title}`} />
                    )
                }
            </div>
            <div className=" z-10 left-0 hidden  px-16 h-full md:flex w-full" style={{
                backgroundImage: ' linear-gradient(to right, #182125 40%, rgba(0,0,0,0))'
            }}>
                <div className='mt-40 flex-col gap-4 md:flex '>
                    <h1 className={`text-4xl font-semibold  ${!movie && "animate-pulse min-h-[32px] w-full bg-gray-200 rounded-full dark:bg-gray-700"}`}>{movie?.title}</h1>
                    <p className={`text-secondary ${!movie && "animate-pulse min-h-[24px] w-2/3 bg-gray-200 rounded-full dark:bg-gray-700"}`}>{movie?.genre_ids?.map((idGenre: number) => getGenre(idGenre)).join(' / ')}</p>
                    {
                        !movie ? (
                            <>
                                <div className='w-full min-w-[30rem] animate-pulse min-h-[16px]  bg-gray-200 rounded-full dark:bg-gray-700 font-normal'></div>
                                <div className='w-full  animate-pulse min-h-[16px] w-2/ bg-gray-200 rounded-full dark:bg-gray-700 font-normal'></div>
                                <div className='w-2/6  animate-pulse min-h-[16px] w-2/ bg-gray-200 rounded-full dark:bg-gray-700 font-normal'></div>

                            </>
                        )
                            :
                            (<p className='w-3/6 min-w-[25rem] font-normal'>{movie?.overview}</p>)
                    }
                    <div className="flex gap-4 items-center">
                        <Image src={'/icons/imdb.svg'} width={60} height={10} alt='IMDB LOGO' />
                        <span className='font-semibold'>{movie?.vote_average} / 10</span>
                    </div>
                    <div className="flex gap-4 items-center max-w-[20rem]">
                        <Button label='Ver Ahora' fullWidth />
                        <BtnFavorite movie={movie} movieType='movie'/>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Hero
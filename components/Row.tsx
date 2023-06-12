import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Slider from 'react-slick';
import styles from '@/libs/css/customSlider.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useState } from 'react'
import CardMovie from './CardMovie';
import { movieProps } from '@/types/types';
import useMovies from '@/hooks/useMovies';
interface RowProps {
    movies: [movieProps]
    title: string
    type: string
}

const loaders = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },

]
const Row: React.FC<RowProps> = ({ movies,title,type }) => {
    const refSlider = useRef<Slider>(null)
    const moviesLength = movies?.length
    const { isLoading } = useMovies("top_rated");

    const settings = {
        className: `slider ${styles.slick_slider_movies} w-full`,
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: moviesLength < 5 ? moviesLength : 5,
        slidesToScroll: 5,
        arrows: false,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: moviesLength < 4 ? moviesLength : 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: moviesLength < 3 ? moviesLength : 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: moviesLength < 3 ? moviesLength : 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: moviesLength < 2 ? moviesLength : 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: moviesLength < 1.5 ? moviesLength : 1.5,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: moviesLength < 1 ? moviesLength : 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <h2 className='font-medium text-xl mt-5'>{title}</h2>
            <div className="w-full mt-4">
                <div className="relative">
                    <IoIosArrowBack onClick={() => refSlider.current?.slickPrev()} className='cursor-pointer text-white z-40 absolute top-1/2 -left-10 -translate-y-1/2' size={30} />
                    <Slider  {...settings} ref={refSlider} className='relative'>
                        {
                            !movies ? (
                                loaders.map((loader) => (
                                    <CardMovie key={loader.id} />
                                ))

                            ) : (
                                movies?.map((movie) => (
                                    <CardMovie key={movie.id} movie={movie} movieType={type} hasText />
                                ))
                            )
                        }
                    </Slider>
                    <IoIosArrowForward onClick={() => refSlider.current?.slickNext()} className='cursor-pointer text-white z-40 absolute top-1/2 right-10 -translate-y-1/2' size={30} />

                </div>
            </div>

        </div>
    )
}

export default Row

/*movies?.map((movie) => (
    <CardMovie movie={movie} key={movie.id} />
))*/
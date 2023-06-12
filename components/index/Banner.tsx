import Image from 'next/image'
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '@/libs/css/customSlider.module.scss'
const bannerItems = [
    {
        id: 0,
        imageUrl: '/icons/iconBanner.svg',
        description: "Gran plataforma de películas y series",
        subDescription: "Explora y mira tus películas y series favoritas fácilmente"

    },
    {
        id: 1,
        imageUrl: '/icons/iconBanner.svg',
        description: "Tu eliges cuando y como mirar",
        subDescription: "Guarda series o películas para verlas más tarde en tu celular o computador"

    },
    {
        id: 2,
        imageUrl: '/icons/iconBanner.svg',
        description: "Tenemos planes accesibles para ti",
        subDescription: "Suscribete a uno de nuestros planes y disfruta de nuestro catalogo junto con funciones y mejoras adicionales"

    },
]
const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        dotsClass: `slick-dots ${styles.dots}`,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 8000
    }

    return (
        <div className={`bg-blue-600 w-2/5  items-center justify-center relative hidden lg:flex`}>

            <Slider {...settings} className='w-3/6'>
                {
                    bannerItems?.map((item: Record<string, any>) => (
                        <div key={item.id} >
                            <div className='flex flex-col items-center gap-4 '>
                                <Image src={item.imageUrl} alt='Image Banner' width={160} height={160} priority />
                                <h4 className='text-3xl text-center'>{item.description}</h4>
                                <p className='text-lg text-center text-gray-300'>{item.subDescription}</p>
                            </div>

                        </div>
                    ))
                }
            </Slider>

        </div>
    )
}

export default Banner
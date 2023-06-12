import Hero from '@/components/Hero'

import 'glider-js/glider.min.css';
import Row from '@/components/Row';
import useMovies from '@/hooks/useMovies';
import type { ReactElement } from 'react';
import LayoutAuth from '@/components/layouts/LayoutAuth';
import Head from 'next/head';
import useSeries from '@/hooks/useSeries';
import useFavorites from '@/hooks/useFavorites';
import { movieProps } from '@/types/types';
import CardMovie from '@/components/CardMovie';



const List = () => {

    const {data} = useFavorites();
    return (
        <div className="pt-40 px-16 w-full">
            <div className="flex items-center gap-8 flex-wrap justify-center sm:justify-normal">
                <h1 className="text-3xl">My List</h1>
            </div>
            <div className="grid gap-8 mt-8" style={
                data?.length <= 0 ? {} : {gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,15rem),1fr))"}
            }>
                {
                    data?.length <= 0 && (
                        <div className=''>Aún no has agregado ninguna serie o pelicula</div>
                    )
                }
                {
                    data?.map((result: movieProps) => (
                        <CardMovie movie={result} key={result.id} fullWidth hasText movieType={result.media_type} />
                    ))
                }
            </div>
        </div>
    )
}
List.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutAuth>
            {page}
        </LayoutAuth>
    );
};

export default List
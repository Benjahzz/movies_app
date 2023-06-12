import Hero from '@/components/Hero'

import 'glider-js/glider.min.css';
import Row from '@/components/Row';
import useMovies from '@/hooks/useMovies';
import type { ReactElement } from 'react';
import LayoutAuth from '@/components/layouts/LayoutAuth';
import Head from 'next/head';
import useSeries from '@/hooks/useSeries';



const Index = () => {
  const { data:dataTop, error } = useMovies("top_rated")
  const { data:dataUpComing } = useMovies("upcoming")
  const { data:dataSeries } = useSeries("popular")
  const {results: topMovies} = dataTop || []
  const {results: upComingMovies} = dataUpComing || []
  const {results: popularSeries} = dataSeries || []
  return (
    <>
      <Head>
        <title>WatchToo - Peliculas, series y documentales</title>
      </Head>
      <Hero popularMovies={topMovies} />
      <main className='relative z-[2] pl-16 overflow-hidden pb-10 pt-14 flex flex-col  gap-20' style={{
        boxShadow: 'rgb(24, 33, 37) 0px 0px 15px 17px'
      }} >
        <Row movies={topMovies} title="En Tendencia" type={"movie"} />
        <Row movies={upComingMovies} title="Proximos Lanzamientos" type={"movie"}/>
        <Row movies={popularSeries} title="Series Populares" type={"tv"}/>
      </main>
    </>
  )
}
Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuth>
      {page}
    </LayoutAuth>
  );
};

export default Index
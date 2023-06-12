import CardMovie from "@/components/CardMovie";
import Tab from "@/components/Tab";
import TabsList from "@/components/TabsList";
import LayoutAuth from "@/components/layouts/LayoutAuth";
import useMovie from "@/hooks/useMedia";
import useMovies from "@/hooks/useMovies";
import useSeries from "@/hooks/useSeries";
import useTabs from "@/hooks/useTabs";
import { movieProps } from "@/types/types";
import type { ReactElement } from 'react';
import { useEffect } from 'react';


const tabs: any[] = [
  {
    label: "On The air",
    filter: "on_the_air"
  },
  {
    label: "Popular",
    filter: "popular"

  },
  {
    label: "Top Rated",
    filter: "top_rated"

  }
]


const Series = () => {
  const { filter, setFilter } = useTabs();
  const { data } = useSeries(filter ? filter : "on_the_air")
  
  useEffect(() => {
    setFilter("on_the_air")
  }, [setFilter])
  return (
    <div className="pt-40 pb-14 px-16 w-full">
      <div className="flex items-center gap-8 flex-wrap justify-center sm:justify-normal">
        <h2 className="text-3xl">Series</h2>
        <TabsList tabs={tabs} />
      </div>
      <div className="grid gap-8 mt-8" style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,15rem),1fr))"
      }}>
        {
          data?.results.map((result: movieProps) => (
            <CardMovie movie={result} key={result.id} fullWidth hasText movieType="tv"/>
          ))
        }
      </div>
    </div>
  )
}
Series.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuth >
      {page}
    </LayoutAuth>
  );
};

export default Series
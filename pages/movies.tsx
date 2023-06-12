import CardMovie from "@/components/CardMovie";
import Tab from "@/components/Tab";
import TabsList from "@/components/TabsList";
import LayoutAuth from "@/components/layouts/LayoutAuth";
import useMovie from "@/hooks/useMedia";
import useMovies from "@/hooks/useMovies";
import useTabs from "@/hooks/useTabs";
import { movieProps } from "@/types/types";
import type { ReactElement } from 'react';
import { useEffect } from 'react';


const tabs: any[] = [
  {
    label: "Popular",
    filter: "popular"
  },
  {
    label: "Top Rated",
    filter: "top_rated"

  },
  {
    label: "Upcoming",
    filter: "upcoming"

  }
]


const Movies = () => {
  const { filter, setFilter } = useTabs();
  const { data } = useMovies(filter ? filter : "popular")
  useEffect(() => {
    setFilter("popular")
  }, [setFilter])
  return (
    <div className="pt-40 px-16 w-full">
      <div className="flex items-center gap-8 flex-wrap justify-center sm:justify-normal">
        <h2 className="text-3xl">Movies</h2>
        <TabsList tabs={tabs} />
      </div>
      <div className="grid gap-8 mt-8" style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,15rem),1fr))"
      }}>
        {
          data?.results.map((result: movieProps) => (
            <CardMovie movie={result} key={result.id} fullWidth hasText movieType="movie"/>
          ))
        }
      </div>
    </div>
  )
}
Movies.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuth >
      {page}
    </LayoutAuth>
  );
};

export default Movies
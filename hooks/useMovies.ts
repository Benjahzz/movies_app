

import fetcher from '@/libs/fetcher'
import useSWR from 'swr'
const useMovies = (filter:string = "") => {

    const { data, error, isLoading, mutate } = useSWR(`/api/movies${filter && `?filter=${filter}`}` , fetcher,{
        
        revalidateOnFocus: false,
        revalidateOnReconnect:false,
        revalidateIfStale:false
    })
    
    return {
        data,error,isLoading,mutate
    }

}

export default useMovies
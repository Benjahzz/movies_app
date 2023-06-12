
import fetcher from '@/libs/fetcher'
import useSWR from 'swr'

const useFavorites = () => {

    const { data, error, isLoading, mutate } = useSWR('/api/favorites', fetcher)
    
    return {
        data,error,isLoading,mutate
    }

}
export default useFavorites;
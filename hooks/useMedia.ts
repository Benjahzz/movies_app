

import fetcher from '@/libs/fetcher'
import useSWR from 'swr'

interface useMediaParameters {
    id: number | null
    type: string | undefined
}
const useMedia = ({ id, type }: useMediaParameters) => {
   
    const { data, error, isLoading, mutate } = useSWR(id && type ? `/api/media?id=${id}&type=${type}` : null, fetcher,{
        revalidateOnFocus:false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,

    })
    return {
        data,error,isLoading,mutate
    }

}

export default useMedia
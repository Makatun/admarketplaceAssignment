import useSWR, { KeyedMutator } from 'swr';
import axios from 'axios'


interface DataResponse<T> {
    data: T | undefined;
    isLoading: boolean;
    isError: Error;
    mutate: KeyedMutator<T>;
}

export const fetcher = (url: string) => axios.get(url).then(res => res.data)


function useDataDetch<T>(url: string): DataResponse<T> {

    const { data, error, mutate } = useSWR<T>(url, fetcher);

    return {
        data,
        isLoading: !data && !error,
        isError: error,
        mutate,
    };
}

export default useDataDetch;
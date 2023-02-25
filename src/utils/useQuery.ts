import {useEffect, useState} from 'react';

interface UseQueryReturn<T> {
    data: T | null;
    loading: boolean;
}

export const useQuery = <T = any>(fn: (() => Promise<T>)): UseQueryReturn<T> => {
    const [data, setData] = useState<UseQueryReturn<T>>({
        data: null,
        loading: true,
    });

    useEffect(() => {
        const fetch = async () => {
            const response = await fn();
            setData({
                data: response,
                loading: false,
            });
        };

        fetch();
    }, [setData, fn]);

    return data;
};
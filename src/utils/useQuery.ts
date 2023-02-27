import {useCallback, useEffect, useRef, useState} from 'react';

interface UseQueryReturn<T> {
    data: T | null;
    loading: boolean;
}

export const useQuery = <T = any>(fn: (() => Promise<T>)): UseQueryReturn<T> => {
    const [data, setData] = useState<UseQueryReturn<T>>({
        data: null,
        loading: true,
    });
    const fnRef = useRef(fn);

    const fetch = useCallback(async () => {
        const response = await fnRef.current();
        setData({
            data: response,
            loading: false,
        });
    }, [setData]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return data;
};
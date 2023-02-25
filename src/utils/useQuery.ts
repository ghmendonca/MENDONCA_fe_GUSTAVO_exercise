import {useEffect, useState} from 'react';

export const useQuery = <Response>(fn: (() => Response)) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<Response | null>(null);

    useEffect(() => {
        const fetch = async () => {
            const data = await fn();
            setResponse(data);
            setLoading(false);
        };

        fetch();
    }, [setResponse, setLoading, fn]);

    return {loading, data: response};
};
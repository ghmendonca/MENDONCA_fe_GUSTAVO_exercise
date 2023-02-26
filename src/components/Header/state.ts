import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

export const useComponentState = () => {
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return {
        onClick,
    };
};
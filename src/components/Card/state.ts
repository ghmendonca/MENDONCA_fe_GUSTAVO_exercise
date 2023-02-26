import {MouseEventHandler, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Props} from '.';

export const useComponentState = ({hasNavigation, navigationProps, url}: Props) => {
    const navigate = useNavigate();

    const onClick: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        if (hasNavigation) {
            navigate(url || '', {
                state: navigationProps,
            });
        }
        event.preventDefault();
    }, [navigate, hasNavigation, url, navigationProps]);

    return {
        onClick,
    };
};
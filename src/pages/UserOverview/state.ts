import {useLocation} from 'react-router-dom';
import {UserData} from 'types';

export const useComponentState = () => {
    const location = useLocation();
    const user = location.state as UserData;

    return {user};
};
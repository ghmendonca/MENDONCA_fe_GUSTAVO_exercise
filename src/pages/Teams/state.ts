import {useCallback, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTeams} from 'state/teams';
import {Team} from 'types';

export const useComponentState = () => {
    const [filter, setFilter] = useState<string>('');
    const {data: teams, loading} = useTeams();
    const navigate = useNavigate();
    
    const items = useMemo(() => {
        if(!teams) {
            return [];
        }

        return teams
            .filter((team) => filter.length === 0 || team.name.toLowerCase().includes(filter.toLowerCase()));
    }, [teams, filter]);

    const onChangeFilter: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setFilter(event.target.value);
    }, [setFilter]);

    const onClick = useCallback((team: Team) => {
        navigate(`/team/${team.id}`, {
            state: team,
        });
    }, [navigate]);

    return {
        loading,
        teams: items,
        filter,
        onChangeFilter,
        onClick,
    };
};
import {useMemo} from 'react';
import {ListItem} from 'types';
import {useQuery} from 'utils/useQuery';
import teamsApi from '../../api/teams';

export const useComponentState = () => {
    const {data: teams, loading} = useQuery(() => teamsApi.getAll());
    
    const items: ListItem[] = useMemo(() => {
        if(!teams) {
            return [];
        }

        return teams.map((team) => ({
            id: team.id,
            url: `/team/${team.id}`,
            columns: [
                {
                    key: 'Name',
                    value: team.name,
                },
            ],
            navigationProps: team,
        }));
    }, [teams]);

    return {
        loading,
        teams: items,
    };
};
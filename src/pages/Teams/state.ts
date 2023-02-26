import {useCallback, useMemo, useState} from 'react';
import {ListItem} from 'types';
import {useQuery} from 'utils/useQuery';
import teamsApi from '../../api/teams';

export const useComponentState = () => {
    const [filter, setFilter] = useState<string>('');
    const {data: teams, loading} = useQuery(() => teamsApi.getAll());
    
    const items: ListItem[] = useMemo(() => {
        if(!teams) {
            return [];
        }

        return teams
            .filter((team) => filter.length === 0 || team.name.toLowerCase().startsWith(filter.toLowerCase()))
            .map((team) => ({
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
    }, [teams, filter]);

    const onChangeFilter: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setFilter(event.target.value);
    }, [setFilter]);

    return {
        loading,
        teams: items,
        filter,
        onChangeFilter,
    };
};
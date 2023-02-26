import {useCallback, useMemo, useState} from 'react';
import {useTeams} from 'state/teams';
import {ListItem} from 'types';

export const useComponentState = () => {
    const [filter, setFilter] = useState<string>('');
    const {data: teams, loading} = useTeams();
    
    const items: ListItem[] = useMemo(() => {
        if(!teams) {
            return [];
        }

        return teams
            .filter((team) => filter.length === 0 || team.name.toLowerCase().includes(filter.toLowerCase()))
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
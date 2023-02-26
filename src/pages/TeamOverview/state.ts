import {useCallback, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem} from 'types';
import {useTeam} from 'state/teams';

export const useComponentState = () => {
    const [filter, setFilter] = useState<string>('');
    const location = useLocation();
    const {teamId} = useParams();
    const {data: team, loading} = useTeam(teamId || '');

    const items: ListItem[] = useMemo(() => {
        if (!team) {
            return [];
        }

        return team.teamMembers
            .filter((teamMember) => filter.length === 0 || teamMember.firstName.toLowerCase().includes(filter) || teamMember.lastName.toLowerCase().includes(filter))
            .map((teamMember) => ({
                id: teamMember.id,
                url: `/user/${teamMember.id}`,
                columns: [
                    {
                        key: 'Name',
                        value: `${teamMember.firstName} ${teamMember.lastName}`,
                    },
                    {
                        key: 'Display Name',
                        value: teamMember.displayName,
                    },
                    {
                        key: 'Location',
                        value: teamMember.location,
                    },
                ],
                navigationProps: teamMember,
            }));
    }, [team, filter]);

    const onChangeFilter: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setFilter(event.target.value);
    }, [setFilter]);

    return {
        loading,
        users: items,
        teamLead: team?.teamLead,
        teamName: location.state.name,
        filter,
        onChangeFilter,
    };
};
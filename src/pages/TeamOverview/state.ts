import {useMemo} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem} from 'types';
import {useQuery} from 'utils/useQuery';
import teamsApi from 'api/teams';

export const useComponentState = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const {data: team, loading} = useQuery(() => teamsApi.getById(teamId || ''));

    const items: ListItem[] = useMemo(() => {
        if (!team) {
            return [];
        }

        return team.teamMembers.map((teamMember) => ({
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
    }, [team]);

    return {
        loading,
        users: items,
        teamLead: team?.teamLead,
        teamName: location.state.name,
    };
};
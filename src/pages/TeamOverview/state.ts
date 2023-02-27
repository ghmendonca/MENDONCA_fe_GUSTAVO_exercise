import {useCallback, useMemo, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useTeam} from 'state/teams';
import {UserData} from 'types';

export const useComponentState = () => {
    const [filter, setFilter] = useState<string>('');
    const navigate = useNavigate();
    const location = useLocation();
    const {teamId} = useParams();
    const {data: team, loading} = useTeam(teamId || '');

    const items = useMemo(() => {
        if (!team) {
            return [];
        }

        return team.teamMembers
            .filter((teamMember) => filter.length === 0 || teamMember.firstName.toLowerCase().includes(filter) || teamMember.lastName.toLowerCase().includes(filter));
    }, [team, filter]);

    const onChangeFilter: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setFilter(event.target.value);
    }, [setFilter]);

    const onClick = useCallback((user: UserData) => {
        navigate(`/user/${user.id}`, {
            state: user,
        });
    }, [navigate]);

    return {
        loading,
        users: items,
        teamLead: team?.teamLead,
        teamName: location.state.name,
        filter,
        onChangeFilter,
        onClick,
    };
};
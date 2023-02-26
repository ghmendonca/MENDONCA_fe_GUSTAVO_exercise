import React, {useMemo} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem} from 'types';
import {useQuery} from 'utils/useQuery';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import teamsApi from '../api/teams';

const TeamOverview = () => {
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

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!loading && team?.teamLead && <Card 
                columns={[
                    {
                        key: 'Team Lead',
                        value: '',
                    },
                    {
                        key: 'Name',
                        value: `${team.teamLead.firstName} ${team.teamLead.lastName}`,
                    },
                    {
                        key: 'Display Name',
                        value: team.teamLead.displayName,
                    },
                    {
                        key: 'Location',
                        value: team.teamLead.location,
                    },
                ]}
                url={`/user/${team.teamLead.id}`}
                navigationProps={team.teamLead}
            />}
            <List items={items} isLoading={loading} />
        </Container>
    );
};

export default TeamOverview;

import React, {useMemo} from 'react';
import {ListItem} from 'types';
import {useQuery} from 'utils/useQuery';
import teamsApi from '../api/teams';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const Teams = () => {
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

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={items} isLoading={loading} />
        </Container>
    );
};

export default Teams;

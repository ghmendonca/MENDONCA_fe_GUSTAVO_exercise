import * as React from 'react';
import {ListItem, Team as TeamsList} from 'types';
import {useQuery} from 'utils/useQuery';
import teamsApi from '../api/teams';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

var MapT = (teams: TeamsList[]) => {
    return teams.map(team => {
        var columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const {data: teams, loading} = useQuery(() => teamsApi.getAll());

    if (!teams) {
        return null;
    }

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={MapT(teams)} isLoading={loading} />
        </Container>
    );
};

export default Teams;

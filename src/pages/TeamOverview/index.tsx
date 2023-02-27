import Input from 'components/Input';
import React from 'react';
import Card from '../../components/Card';
import {Container} from '../../components/GlobalComponents';
import Header from '../../components/Header';
import List from '../../components/List';
import {useComponentState} from './state';

const TeamOverview = () => {
    const {loading, teamLead, teamName, users, filter, onChangeFilter, onClick} = useComponentState();

    return (
        <Container>
            <Header title={`Team ${teamName}`} />
            <Input placeholder='Serach by name' value={filter} onChange={onChangeFilter} />
            {!loading && teamLead && <Card 
                item={teamLead}
                onClick={() => onClick(teamLead)}
                columns={[
                    {
                        title: 'Team Lead',
                    },
                    {
                        title: 'Name',
                        render: (item) => `${item.firstName} ${item.lastName}`,
                    },
                    {
                        title: 'Display Name',
                        key: 'displayName',
                    },
                    {
                        title: 'Location',
                        key: 'location',
                    },
                ]}
            />}
            <List items={users} isLoading={loading} columns={[
                {
                    title: 'Name',
                    render: (item) => `${item.firstName} ${item.lastName}`,
                },
                {
                    title: 'Display Name',
                    key: 'displayName',
                },
                {
                    title: 'Location',
                    key: 'location',
                },
            ]} onClick={onClick} />
        </Container>
    );
};

export default TeamOverview;

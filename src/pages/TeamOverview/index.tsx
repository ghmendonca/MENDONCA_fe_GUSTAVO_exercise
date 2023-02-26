import Input from 'components/Input';
import React from 'react';
import Card from '../../components/Card';
import {Container} from '../../components/GlobalComponents';
import Header from '../../components/Header';
import List from '../../components/List';
import {useComponentState} from './state';

const TeamOverview = () => {
    const {loading, teamLead, teamName, users, filter, onChangeFilter} = useComponentState();

    return (
        <Container>
            <Header title={`Team ${teamName}`} />
            <Input placeholder='Serach by name' value={filter} onChange={onChangeFilter} />
            {!loading && teamLead && <Card 
                columns={[
                    {
                        key: 'Team Lead',
                        value: '',
                    },
                    {
                        key: 'Name',
                        value: `${teamLead.firstName} ${teamLead.lastName}`,
                    },
                    {
                        key: 'Display Name',
                        value: teamLead.displayName,
                    },
                    {
                        key: 'Location',
                        value: teamLead.location,
                    },
                ]}
                url={`/user/${teamLead.id}`}
                navigationProps={teamLead}
            />}
            <List items={users} isLoading={loading} />
        </Container>
    );
};

export default TeamOverview;

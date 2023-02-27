import * as React from 'react';
import Card from '../../components/Card';
import {Container} from '../../components/GlobalComponents';
import Header from '../../components/Header';
import {useComponentState} from './state';

const UserOverview = () => {
    const {user} = useComponentState();

    return (
        <Container>
            <Header
                title={`User ${user.firstName} ${user.lastName}`}
            />
            <Card 
                item={user}
                columns={[
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
            />
        </Container>
    );
};

export default UserOverview;

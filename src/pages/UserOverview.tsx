import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {UserData} from 'types';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';

const UserOverview = () => {
    const location = useLocation();
    const user = location.state as UserData;

    return (
        <Container>
            <Header
                title={`User ${user.firstName} ${user.lastName}`}
            />
            <Card 
                hasNavigation={false}
                navigationProps={user}
                columns={[
                    {
                        key: 'Name',
                        value: `${user.firstName} ${user.lastName}`,
                    },
                    {
                        key: 'Display Name',
                        value: user.displayName,
                    },
                    {
                        key: 'Location',
                        value: user.location,
                    },
                ]}
            />
        </Container>
    );
};

export default UserOverview;

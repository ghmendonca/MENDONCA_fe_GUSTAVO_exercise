import React from 'react';
import Header from '../../components/Header';
import List from '../../components/List';
import {Container} from '../../components/GlobalComponents';
import {useComponentState} from './state';

const Teams = () => {
    const {loading, teams} = useComponentState();

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={teams} isLoading={loading} />
        </Container>
    );
};

export default Teams;

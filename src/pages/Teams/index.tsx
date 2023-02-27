import React from 'react';
import Input from 'components/Input';
import Header from '../../components/Header';
import List from '../../components/List';
import {Container} from '../../components/GlobalComponents';
import {useComponentState} from './state';

const Teams = () => {
    const {loading, teams, filter, onChangeFilter, onClick} = useComponentState();
    
    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <Input placeholder='Search by name' value={filter} onChange={onChangeFilter} />
            <List items={teams} isLoading={loading} columns={[
                {
                    title: 'Name',
                    key: 'name',
                },
            ]} onClick={onClick} />
        </Container>
    );
};

export default Teams;

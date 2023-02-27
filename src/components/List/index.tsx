import * as React from 'react';
import {Id} from 'types';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container} from './styles';

interface Props<T> {
    items: T[];
    onClick: (item: T) => void;
    isLoading: boolean;
    columns: {
        title: string,
        key?: keyof T,
        render?: (item: T) => string
    }[];
}

const List = <T extends Id = any>({items, onClick, isLoading, columns}: Props<T>) => {
    return (
        <Container data-testid="list">
            {isLoading && <Spinner />}
            {!isLoading &&
                items.map((item, index) => {
                    return (
                        <Card
                            key={`${item.id}-${index}`}
                            id={item.id}
                            columns={columns}
                            onClick={() => onClick(item)}
                            item={item}
                        />
                    );
                })}
        </Container>
    );
};

export default List;

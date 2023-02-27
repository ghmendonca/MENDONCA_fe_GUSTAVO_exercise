import * as React from 'react';
import {CardItem, Container} from './styles';

export interface Props<T> {
    id?: string;
    columns: {
        title: string,
        key?: keyof T,
        render?: (item: T) => string
    }[];
    item: T,
    onClick?: () => void;
}

const Card = <T = any>({
    id,
    columns,
    item,
    onClick,
}: Props<T>): JSX.Element => {
    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={!!onClick}
            onClick={onClick}
        >
            {columns.map(({title, key, render}) => (
                <CardItem key={title}>
                    <strong>{title}</strong>
                    {
                        render ? <p>{render(item)}</p> : <p>{!key ? '' : item[key] as string}</p>
                    }
                </CardItem>
            ))}
        </Container>
    );
};

export default Card;

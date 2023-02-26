import * as React from 'react';
import {Team, UserData} from 'types';
import {useComponentState} from './state';
import {CardItem, Container} from './styles';

export interface Props {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Team | null;
}

const Card = ({
    id,
    columns,
    url = '',
    hasNavigation = true,
    navigationProps = null,
}: Props): JSX.Element => {
    const {onClick} = useComponentState({
        id,
        columns,
        url,
        hasNavigation,
        navigationProps,
    });

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={onClick}
        >
            {columns.map(({key: columnKey, value}) => (
                <CardItem key={columnKey}>
                    <strong>{columnKey}</strong>
                    <p>{value}</p>
                </CardItem>
            ))}
        </Container>
    );
};

export default Card;

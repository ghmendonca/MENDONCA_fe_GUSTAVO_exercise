import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Team} from 'types';
import {useNavigate} from 'react-router-dom';
import Card from '.';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
    navigator: {
        navigate: () => jest.fn(),
    },
}));

describe('Card', () => {
    it('should render card with single column', () => {
        const item = {
            name: 'columnValue',
        };
        render(<Card item={item} columns={[{title: 'columnKey', key: 'name'}]} />);

        expect(screen.getByText('columnKey')).toBeInTheDocument();
        expect(screen.getByText('columnValue')).toBeInTheDocument();
    });

    it('should render card with multiple columns', () => {
        const item = {
            firstName: 'columnValue1',
            lastName: 'columnValue2',
            age: 'columnValue3',
            location: '',
        };
        render(<Card item={item} columns={[
            {
                title: 'columnKey1',
                key: 'firstName',
            },
            {
                title: 'columnKey2',
                key: 'lastName',
            },
            {
                title: 'columnKey3',
                key: 'age',
            },
            {
                title: 'columnKey4',
                key: 'location',
            },
        ]} />);

        expect(screen.getByText('columnKey1')).toBeInTheDocument();
        expect(screen.getByText('columnValue1')).toBeInTheDocument();
        expect(screen.getByText('columnKey2')).toBeInTheDocument();
        expect(screen.getByText('columnValue2')).toBeInTheDocument();
        expect(screen.getByText('columnKey3')).toBeInTheDocument();
        expect(screen.getByText('columnValue3')).toBeInTheDocument();
        expect(screen.getByText('columnKey4')).toBeInTheDocument();
    });

    it('should navigate when card is clicked and navigation is enabled', () => {
        const team: Team = {
            id: '1',
            name: 'Team 1',
        };

        const TestComponent = () => {
            const navigate = useNavigate();

            return <Card
                item={team}
                columns={[{title: 'columnKey', key: 'name'}]}
                onClick={() => navigate('path', {state: team})}
            />;
        };

        render(
            <TestComponent />
        );

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: team});
    });

    it('should not navigate when card is clicked and navigation is disabled', () => {
        const item = {
            id: 1,
            name: 'columnValue',
        };

        render(<Card item={item} columns={[{title: 'columnKey', key: 'name'}]} />);

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockUseNavigate).not.toHaveBeenCalled();
    });
});

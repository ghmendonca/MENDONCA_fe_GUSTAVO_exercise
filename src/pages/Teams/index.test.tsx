import React from 'react';
import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import Teams from '.';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

jest.mock('../../api/teams', () => ({
    getAll: () => [
        {
            id: '1',
            name: 'Team1',

        },
        {
            id: '2',
            name: 'Team2',
        },
    ],
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        const {getByTestId} = render(<Teams />);

        expect(getByTestId('spinner')).toBeInTheDocument();

        await waitFor(() => expect(() => getByTestId('spinner')).toThrow());
    });

    it('should render teams list', async () => {
        render(<Teams />);

        expect(await screen.findByText('Team1')).toBeInTheDocument();
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });

    it('should filter teams list', async () => {
        render(<Teams />);

        await screen.findByText('Team1');

        const list = await screen.findByTestId('list');

        expect(list.childElementCount).toBe(2);

        
        await waitFor(() => {
            const filter = screen.getByTestId('filter');
            fireEvent.change(filter, {target: {value: 'Team2'}});
        });

        expect(list.childElementCount).toBe(1);
        expect(screen.getByText('Team2')).toBeInTheDocument();
        expect(screen.queryByText('Team1')).toBeNull();
    });
});

import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import TeamOverview from '.';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

jest.mock('../../api/teams', () => ({
    getById: () => ({
        id: 1,
        name: 'Team1',
        teamLead: {
            id: 2,
            firstName: 'Team',
            lastName: 'Lead1',
            displayName: 'teamLead',
            location: 'Brazil',
        },
        teamMembers: [
            {
                id: 3,
                firstName: 'Team',
                lastName: 'Member1',
                displayName: 'teamMember1',
                location: 'US',
            },
            {
                id: 4,
                firstName: 'Team',
                lastName: 'Member2',
                displayName: 'teamMember2',
                location: 'Australia',
            },
        ],
    }),
}));

describe('TeamOverview', () => {
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
        const {getByTestId} = render(<TeamOverview />);

        expect(getByTestId('spinner')).toBeInTheDocument();

        await waitFor(() => expect(() => getByTestId('spinner')).toThrow());
    });

    it('should render team overview users', async () => {
        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).toBeNull();
        });

        const list = await screen.findByTestId('list');

        expect(list.childElementCount).toBe(2);
        expect(screen.getByText('Team Lead1')).toBeInTheDocument();
        expect(screen.getByText('Team Member1')).toBeInTheDocument();
        expect(screen.getByText('Team Member2')).toBeInTheDocument();
    });

    it('should filter users list', async () => {
        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).toBeNull();
        });

        const list = await screen.findByTestId('list');

        expect(list.childElementCount).toBe(2);

        await waitFor(() => {
            const filter = screen.getByTestId('filter');
            fireEvent.change(filter, {target: {value: 'member2'}});
        });

        expect(list.childElementCount).toBe(1);
        expect(screen.getByText('Team Member2')).toBeInTheDocument();
        expect(screen.queryByText('Team Member1')).toBeNull();
    });
});

import React from 'react';
import {render, waitForElementToBeRemoved} from '@testing-library/react';
import {useQuery} from './useQuery';

const fetchMock = (): Promise<{a: number, b: number}> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({a: 1, b: 2}), 1000);
    });
};

const TestComponent = () => {
    const {loading, data} = useQuery(() => fetchMock());

    if (loading) {
        return <div data-testid="loading">Loading...</div>;
    }

    return <div data-testid="data">{JSON.stringify(data)}</div>;
};

describe('useQuery', () => {
    it('should be loading and have null data in first render', async () => {
        const {getByTestId, queryByTestId} = render(<TestComponent />);

        expect(getByTestId('loading')).toHaveTextContent('Loading...');
        expect(queryByTestId('data')).toBeNull();
    });

    it('should return data after promise resolved', async () => {
        const {getByTestId, queryByTestId} = render(<TestComponent />);

        await waitForElementToBeRemoved(() => getByTestId('loading'), {timeout: 2000});

        expect(getByTestId('data')).toHaveTextContent(JSON.stringify({a: 1, b: 2}));
        expect(queryByTestId('loading')).toBeNull();
    });
});
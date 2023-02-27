import styled from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #dedede;
    padding: 20px;
    width: 300px;
    max-height: 200px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    border-radius: 5px;
    margin: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);

    & div:not(:last-child)::after {
        content: '';
        flex-basis: 100%;
        width: 100%;
        margin: 10px 0;
        height: 1px;
        background-color: #aaa;
    }
`;

export const CardItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    & p {
        text-align: right;
    }
`;
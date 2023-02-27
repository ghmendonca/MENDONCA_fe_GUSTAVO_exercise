import React, {InputHTMLAttributes} from 'react';
import styled from 'styled-components';

const Input = styled.input`
    all: unset;
    max-width: 400px;
    width: 100%;
    margin-bottom: 30px;
    height: 40px;
    border-radius: 5px;
    background-color: white;
    padding: 0px 10px;
`;

export default (props: InputHTMLAttributes<HTMLInputElement>) => <Input data-testid="filter" {...props} />;
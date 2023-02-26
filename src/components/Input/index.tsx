import React, {InputHTMLAttributes} from 'react';
import styled from 'styled-components';

const Input = styled.input``;

export default (props: InputHTMLAttributes<HTMLInputElement>) => <Input data-testid="filter" {...props} />;
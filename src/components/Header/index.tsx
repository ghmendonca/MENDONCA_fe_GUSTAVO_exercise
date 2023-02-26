import * as React from 'react';
import {useComponentState} from './state';
import {HeaderContainer, NavigationHeader, BackButton, Title} from './styles';

interface Props {
    title: string;
    showBackButton?: boolean;
}

const Header = ({title, showBackButton = true}: Props) => {
    const {onClick} = useComponentState();

    return (
        <HeaderContainer>
            <NavigationHeader>
                {showBackButton && (
                    <BackButton
                        onClick={onClick}
                    >
                        🔙
                    </BackButton>
                )}
                <Title>{title}</Title>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;

import { HeaderContainer } from './headerstyle';
import { Title, TitleContainer, TitleLink } from '../components/header/title';
import { NavContainer, NavList, NavItem, NavLink, NavButton } from '../components/header/nav';
import React from 'react';
export const Header = () => {
    return (
        <>
            <HeaderContainer>
                <TitleContainer>
                    <TitleLink href="/">
                        <Title>THE INPUT</Title>
                    </TitleLink>
                </TitleContainer>
                <NavContainer>
                    <NavList>
                        <NavItem>
                            <NavLink href="/home">HOME</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/devices">DEVICES</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/gallery">GALLERY</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavButton href="/register">REGISTER</NavButton>
                        </NavItem>
                    </NavList>
                </NavContainer>
            </HeaderContainer>
        </>
    );
};

import { HeaderContainer } from './headerstyle';
import { Title, TitleContainer } from '../components/header/title';
import { NavContainer, NavList, NavItem, NavLink, NavButton } from '../components/header/nav';
import React from 'react';
export const Header = () => {
    return (
        <>
            <HeaderContainer>
                <TitleContainer>
                    <Title>THE INPUT</Title>
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
